import { ComponentProps } from "react";
import {
    type ContentComponent,
    type ContentKey,
    contentsKeys,
} from "./contents";
import { useContent } from "./useContent";

function ContentAt<
    Key extends ContentKey,
    P extends ComponentProps<ContentComponent<Key>>,
>({ at, ...props }: Readonly<{ at: Key } & P>) {
    const Component: ContentComponent<ContentKey> = useContent(at);
    return <Component {...(props ?? {})} />;
}

export const Content = Object.fromEntries(
    contentsKeys.map((at) => [
        at,
        (props) => <ContentAt at={at} {...(props ?? {})} />
    ])
) as {
        [Key in ContentKey]: ContentComponent<Key>;
    };