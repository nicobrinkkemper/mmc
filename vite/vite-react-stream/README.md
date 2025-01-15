This is the React 19 stream plugin. It uses experimental dependencies from React.
Specifically `react-server-dom-esm/server.node`, which should be retrieved from React's github repository build.

## How to use


in your vite.config.ts

```ts
import { viteReactStreamPlugin } from "vite-react-stream-plugin";

// this can be any router implementation, turn a url in to a file to load
// in this case, we want the props and page files next to each other
// but you can give different logic to each.
const createRouter = (fileName: string) => (url: string) => {
  try {
    // * handle any dynamic variables here *
    return new URL(`file://./src/page${url}/${fileName}`).pathname
  } catch (e) {
    return `src/page/404/${fileName}`
  }
};

export default defineConfig({
  plugins: [
    // will add client references for server components based on "use client"
    // this moduleId is essential for the client references to work
    viteReactClientTransformPlugin({
        projectRoot: __dirname
    }),
    // This plugin requires the `NODE_OPTIONS="--conditions="react server"`
    // for the vite process itself. It will stream the components, if
    // the accept headers are text/x-component.
    viteReactStreamPlugin({
      moduleBase: "/src",
      Page: createRouter("page.tsx"),
      props: createRouter("page.ts"),
      pageExportName: "Page",
      propsExportName: "props",
      build: {
        pages: "src/page/pages.tsx",
        output: {
          dir: "dist",
          rsc: "rsc",
        },
      },
  })],
});
```

Now we can make a prop file, we can start simple
```ts
// whats that pokemon?
export const props = {
  pokemon: ()=>{
    return fetch("https://pokeapi.co/api/v2/pokemon-form/399/").then(res => res.json())
  }
}
```
Our page
```tsx
export default function Page({ pokemon }: {pokemon: {name: string}}) {
  return <div>It's a {pokemon.name}</div>
}
```

Now, we have everything we need to make pages and it'll only stream the components and props you are visiting.
It'll also collect the css and add them to the stream.

There's one more thing, the entry point:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link href="src/index.css" rel="stylesheet" />
  <body>
    <div id="root"></div>
    <script type="module" src="/src/client.tsx"></script>
    </body>
</html>
```

So far so good. We do not need a title, because we can stream it at any time.

```tsx
import * as React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createFromFetch } from "react-server-dom-esm/client";

const domNode = document.getElementById("root");
const hasDomNode = domNode?.hasChildNodes();
const pathInfo = new URL(window.location.href);
const rscData = createFromFetch(
  fetch(window.location.href, {
    headers: { Accept: "text/x-component" },
  }),
  {
    moduleBaseURL: window.location.origin + '/',
  }
);
if (hasDomNode && !import.meta.env.DEV) {
  hydrateRoot(
    domNode!,
    <Client url={pathInfo as any}>
      {rscData as any as React.ReactNode}
    </Client>
  );
} else if (!hasDomNode) {
  const root = createRoot(domNode!);
  root.render(
    <Client url={pathInfo as any}>
      {rscData as any as React.ReactNode}
    </Client>
  );
  if (import.meta.hot) {
    import.meta.hot.accept();
  }
}
```



