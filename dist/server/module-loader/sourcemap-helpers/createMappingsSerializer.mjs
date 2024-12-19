import { createFullMappingsSerializer } from "./createFullMappingsSeriralizer.mjs";
import { createLinesOnlyMappingsSerializer } from "./createLinesOnlyMappingsSerializer.mjs";
/**
 * Creates a mappings serializer based on provided options
 * @param options - Configuration options for the serializer
 * @returns A function that serializes source mappings
 */
const createMappingsSerializer = (options) => {
    const linesOnly = options && options.columns === false;
    return linesOnly
        ? createLinesOnlyMappingsSerializer()
        : createFullMappingsSerializer();
};
export { createMappingsSerializer };
//# sourceMappingURL=createMappingsSerializer.mjs.map