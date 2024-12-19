Everything is distilled to the `outDir` in `tsconfig.json`. We need to reason our files as operating from the dist folder instead of our source folder. There's two ways of managing this:
- put the dist folder directly next to the source folder. Since the folders are right next to each other, we can assume all the paths like `../` are still relative and valid.
- use something like monorepo and completely make a seperate config for each package, through the use of another package that'd merge different configs.
- use micro services and start a new repository for each package.
- Use typescript references to all files.

 and we can run any file there using Node.js. One thing we can now run is the startup script, which is the next and most opiniated step I will explain. Before we'll go over that I wanted to exaplain why Typescript always needs to be transpiled. Often times this is part of the compilation step. I wanted to explain why it should be seen as a seperate step in the equation.

The TypeScript team is very strict on this matter and for good reason. However it also makes their hands tied when it comes to delivering certain features. By comitting to the "transpilation only" philosophy, we can be sure that whatever TypeScript outputs is exactly like how we wrote it. However, it also means that they can't simply go and change certain aspects of the code. That's where the compile step comes in, and it's why people often see transpilation and compilation as the same step. When using something like Bun, this is indeed true and Typescript runs natively. (by doing all of this under the hood)

However, if we start using Bun we vendor lock ourselves into using Bun and can't be portable to other languages without that very same compiler. That's why, in this project we're not beating around the bush and just use tsconfig.node.json that includes every typescript file in the project. We simply transpile this codebase to dist, and all the files will be exactly like how we wrote them except without the types.

We can still configure vscode to understand that the startup and server folders are node only and not browser, by adding a tsconfig.json file to those folders. The tsconfig file is the same for every folder and all it does is tell vscode that we are using the node.tsconfig.json here and that we want to be able to reference any files in the project.

What we end up with is this:
The main tsconfig.node.json file:
```json
"composite": true
```

Node only folders:
```json
{
    "extends": "../tsconfig.node.json",
    "include": [
        "src/**/*"
    ],
    "compilerOptions": {
        "outDir": "./dist"
    },
    "references": [
        {
            "path": "../tsconfig.node.json"
        }
    ]
}
```