/**
 * Type for a path to a nested value
 */
type ArrayPath = { type: "array"; index: number | "push" };
type ObjectPath = { type: "object"; key: string };
type PathSegment = ArrayPath | ObjectPath;
type NestedPath = PathSegment[] | readonly PathSegment[];

import { get, merge, set } from 'lodash-es';

function setNestedValue(obj: any, path: NestedPath, value: any, rowIndex: number): void {
  if (!obj || !path?.length) {
    if (value && typeof value === 'object') {
      merge(obj, value);
    }
    return;
  }
  
  const pathKeys = path.map(segment => 
    segment.type === "array" 
      ? (segment.index === "push" ? rowIndex : segment.index)
      : segment.key
  );
  
  const existingValue = get(obj, pathKeys, {});
  set(obj, pathKeys, merge({}, existingValue, value));
}

type ExtractPathValue<R, P extends NestedPath> = P extends [infer First, ...infer Rest]
  ? First extends { type: "object"; key: infer Key }
    ? { [K in Key & string]: Rest extends NestedPath
        ? ExtractPathValue<R, Rest> 
        : R 
      }
    : First extends { type: "array"; index: any }
    ? Array<Rest extends PathSegment[] 
        ? ExtractPathValue<R, Rest> 
        : R
      >
    : R
  : R;

type ExtractPathTypes<T> = UnionToIntersection<{
  [K in keyof T]: T[K] extends { 
    path: infer P;
    transform: (v: string) => infer R;
  } 
    ? P extends PathSegment[]
      ? ExtractPathValue<R, P>
      : never
    : never
}[keyof T]>;

type MergeMapperResults<T> = ExtractPathTypes<T>;

export function createNestedMapper<
  const T extends Record<string, any>,
  const M extends {
    [K in keyof T]: {
      path: PathSegment[];
      transform: (value: string) => any;
    };
  }
>(mappers: M): (value: string, header?: keyof T, rowIndex?: number) => MergeMapperResults<M> {
  const result = {};
  let currentRowIndex = 0;
  
  return function mapper(value: string, header?: keyof T, rowIndex?: number) {
    if (!header) {
      currentRowIndex = 0;
      return result as MergeMapperResults<M>;
    }

    if (rowIndex !== undefined) {
      currentRowIndex = rowIndex;
    }
    
    const fieldMapper = mappers[header as keyof M] ?? mappers['default' as keyof M];
    if (!fieldMapper) {
      throw new Error(`No mapper found for header "${String(header)}" and no default mapper provided`);
    }
    
    const transformedValue = fieldMapper.transform(value);
    setNestedValue(result, fieldMapper.path, transformedValue, currentRowIndex);
    
    return result as MergeMapperResults<M>;
  };
}
