# Typescript, how does it work?

It allows us to write code in a way that if it compiles, it'll probably work. Most of it is globally available in the types folder, and you can use the predefined types there like 
```ts
ThemeStaticData
```
If you want to be more specific about the types..
```ts
type MyComponentProps = Pick<ThemeStaticData, 'pathInfo'>
```

# Dist folder
Everything is distilled to the `outDir` in `tsconfig.node.json`. We need to reason our files as operating from the dist folder instead of our source folder.

The TypeScript team is very strict on this matter and for good reason. However it also makes their hands tied when it comes to delivering certain features. By comitting to the "transpilation only" philosophy, we can be sure that whatever TypeScript outputs is exactly like how we wrote it. However, it also means that they can't simply go and change certain aspects of the code. That's where the compile step comes in, and it's why people often see transpilation and compilation as the same step. When using something like Bun, this is indeed true and Typescript runs natively. (by doing all of this under the hood)

However, if we start using Bun we vendor lock ourselves into using Bun and can't be portable to other languages without that very same compiler. That's why, in this project we're not beating around the bush and just use tsconfig.node.json that includes every typescript file in the project. We simply transpile this codebase to dist, and all the files will be exactly like how we wrote them except without the types.

We can still configure vscode to understand that the startup and server folders are node only and not browser, by adding a tsconfig.json file to those folders. The tsconfig file is the same for every folder and all it does is tell vscode that we are using the node.tsconfig.json here and that we want to be able to reference any files in the project.

# Making a new node folder
in root tsconfig.node.json
```json
"composite": true
...
"include": [
   // add it to the list of includes
]
```
Then in the new node only folder, add this file:
```json
{
    // this file is here to let vscode know that this folder is intended to be run using our node config
    "extends": "../tsconfig.node.json",
    "references": [
        {
            "path": "../tsconfig.node.json"
        }
    ]
}
```
As long as this file is in the folder, it'll have the global types-node folder available as well as the global types folder.

# Making a new browser folder / cross-environment folder

Just add any folder to `src` and it'll use the normal `tsconfig.json`. 