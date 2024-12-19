declare const Ho: any;
declare const qr: any;
declare function Wo({ router: e, ...n }: {
    [x: string]: any;
    router: any;
}): any;
declare function qo(e: any): any;
declare function Vo(e: any): Wr;
declare const Ko: any;
declare function Uo(e: any): Mt;
declare function No(e: any): jr;
declare function or(e: any): {
    readonly location: any;
    readonly length: any;
    subscribers: Set<any>;
    subscribe: (i: any) => () => void;
    push: (i: any, a: any, u: any) => void;
    replace: (i: any, a: any, u: any) => void;
    go: (i: any, a: any) => void;
    back: (i: any) => void;
    forward: (i: any) => void;
    createHref: (i: any) => any;
    block: (i: any) => () => void;
    flush: () => any;
    destroy: () => any;
    notify: (i: any) => void;
};
declare function zo(): {};
declare function Go(n: any): any;
declare class Wr extends Mt {
    addChildren(n: any): this;
    _addFileChildren(n: any): this;
    _addFileTypes(): this;
}
declare class Mt {
    constructor(n: any);
    init: (t: any) => void;
    originalIndex: any;
    parentRoute: any;
    _path: any;
    _id: any;
    _fullPath: any;
    _to: any;
    _ssr: any;
    updateLoader: (t: any) => this;
    update: (t: any) => this;
    lazy: (t: any) => this;
    lazyFn: any;
    useMatch: (t: any) => any;
    useRouteContext: (t: any) => any;
    useSearch: (t: any) => any;
    useParams: (t: any) => any;
    useLoaderDeps: (t: any) => any;
    useLoaderData: (t: any) => any;
    useNavigate: () => any;
    options: any;
    isRoot: boolean;
    $$typeof: symbol;
    get to(): any;
    get id(): any;
    get path(): any;
    get fullPath(): any;
    get ssr(): any;
    addChildren(n: any): this;
    _addFileChildren(n: any): this;
    children: any[] | undefined;
}
declare class jr {
    constructor(n: any);
    tempLocationKey: string;
    resetNextScroll: boolean;
    subscribers: Set<any>;
    startReactTransition: (t: any) => any;
    update: (t: any) => void;
    options: any;
    isServer: any;
    pathParamsDecodeCharMap: Map<any, any> | undefined;
    basepath: string;
    history: any;
    latestLocation: any;
    routeTree: any;
    __store: any;
    isViewTransitionTypesSupported: boolean;
    buildRouteTree: () => void;
    routesById: {};
    routesByPath: {};
    flatRoutes: any[];
    subscribe: (t: any, r: any) => () => void;
    emit: (t: any) => void;
    parseLocation: (t: any, r: any) => {
        pathname: any;
        searchStr: any;
        search: any;
        hash: any;
        href: string;
        state: any;
    } | {
        maskedLocation: {
            pathname: any;
            searchStr: any;
            search: any;
            hash: any;
            href: string;
            state: any;
        };
        pathname: any;
        searchStr: any;
        search: any;
        hash: any;
        href: string;
        state: any;
    };
    resolvePathWithBase: (t: any, r: any) => any;
    getMatchedRoutes: (t: any, r: any) => {
        matchedRoutes: any[];
        routeParams: {};
        foundRoute: any;
    };
    cancelMatch: (t: any) => void;
    cancelMatches: () => void;
    buildLocation: (t: any) => {
        pathname: any;
        search: any;
        searchStr: any;
        state: any;
        hash: any;
        href: string;
        unmaskOnReload: any;
    };
    commitLocation: ({ viewTransition: t, ignoreBlocker: r, ...o }: {
        [x: string]: any;
        viewTransition: any;
        ignoreBlocker: any;
    }) => Promise<any>;
    commitLocationPromise: Promise<any>;
    shouldViewTransition: any;
    buildAndCommitLocation: ({ replace: t, resetScroll: r, hashScrollIntoView: o, viewTransition: s, ignoreBlocker: i, href: a, ...u }?: {}) => Promise<any>;
    navigate: ({ to: t, reloadDocument: r, href: o, ...s }: {
        [x: string]: any;
        to: any;
        reloadDocument: any;
        href: any;
    }) => Promise<any> | undefined;
    load: () => Promise<void>;
    latestLoadPromise: Promise<any>;
    startViewTransition: (t: any) => void;
    updateMatch: (t: any, r: any) => undefined;
    getMatch: (t: any) => any;
    loadMatches: ({ location: t, matches: r, preload: o, onReady: s, updateMatch: i }: {
        location: any;
        matches: any;
        preload: any;
        onReady: any;
        updateMatch?: ((t: any, r: any) => undefined) | undefined;
    }) => Promise<any>;
    invalidate: (t: any) => Promise<void>;
    resolveRedirect: (t: any) => any;
    clearCache: (t: any) => void;
    clearExpiredCache: () => void;
    preloadRoute: (t: any) => any;
    matchRoute: (t: any, r: any) => {};
    dehydrate: () => {
        state: {
            dehydratedMatches: any;
        };
        manifest: any;
    };
    hydrate: () => void;
    dehydratedData: any;
    manifest: any;
    injectedHtml: any[];
    injectHtml: (t: any) => void;
    injectScript: (t: any, r: any) => void;
    streamedKeys: Set<any>;
    getStreamedValue: (t: any) => any;
    streamValue: (t: any, r: any) => void;
    _handleNotFound: (t: any, r: any, { updateMatch: o }?: {
        updateMatch?: ((t: any, r: any) => undefined) | undefined;
    }) => void;
    hasNotFoundMatch: () => any;
    get state(): any;
    get looseRoutesById(): {};
    matchRoutes(n: any, t: any, r: any): any[];
    matchRoutesInternal(n: any, t: any): any[];
}
export { Ho as L, qr as O, Wo as R, qo as a, Vo as b, Ko as c, Uo as d, No as e, or as f, zo as r, Go as s };
//# sourceMappingURL=vendor-DYsoeDPq.d.ts.map