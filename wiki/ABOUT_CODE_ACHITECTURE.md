# About the Code Architecture in this repository

The Mario Maker level maker community is a global community of people who love to build.
If you've stumbled upon this repository, you're probably interested in how this code works... you found the right place!

Even though the Mario Maker community might love to build, we might not all be software developers!
That's why, I will explain the code architecture in a way that is easy to understand for everyone.

# geitje/bbmariomaker2's contraption design

If you you don't know who bbmariomaker2 and or geitje is in the Mario Maker community, here's a list of things you may know me for:

- MarI/O / infinite freeze detector contraption level
- Song of Storms, Wrecking Crew, Bombastic Pirates Fortress, Death Mountain, Lost Woods. First of it's kind global looping music levels.
- Larry's Sabotage Mission, super fast and even the first 3DW global reusable jump detector ever made
- Mario Math - The first RNG math level ever made
- First discovery of the hammer bro + claw undo glitch (commonly used for glitch sequences)
- Some post from 2020 still get discussed today, the "resetters/flippers/useless-machines/triggers" always stay relevant
- I've written three long Mario Maker guide. Mario Maker RNG Guide, Mario Maker Global Music Guide and Geitje's contraption building guide.
- Of course, couldn't have done it without the community and everyone in the [discords](https://discord.gg/R8aYkzzH)

To me, seeing my ideas and contraptions being used by other people is a great feeling and also a great motivation to keep on building.

When designing a contraption you intend to share for other people to use, simplicity is key. Any item or object that can be removed, should be removed. Any item or object that can be replaced by a simpler item or object, should be replaced by a simpler item or object. Through constraints, we find that we can come to a contraption design that's technically unbeatable. We also find that it's always nice to have more ways than one way to solve the same problem given different constraints. Last but not least, we want to find solutions that solve more than one problem at once.

Take global music for example. It's a contraption idea that solves multiple problems at once; just inventing that little bit allowed the community to suddenly make awesome looping music levels.
Before, we had to repeat the contraption over and over again - wasting precious space and items. Now, we can just use the global music contraptions from the guide which will stay loaded all the time.
With traditional music you had to force auto-scroll, making the gameplay forced and the playarea limited. Now we can just stand here and listen to our own made song, which is a nice feeling of freedom.

On the other hand, global music levels are technically changeling to create. It requires you to know about how object load into the level and how to make sure the music blocks on track stays in sync. You have to know how to make the track system frame perfect. In that sense, you are really playing the game to it's full make-it-yourself potential. Still, you are making it very hard for yourself! You have to take a certain amount of pleasure in that, or it won't be a fun process.

That's why, just making the contraption is not enough and we can do better helping each other avoid common pitfalls. By understanding the problem ourselves better, we can share it in a way that avoids making those same mistakes we did when we first started.

## Disclaimer

This is a personal project. Even though I'm trying to say it's a "complete" system, it's not. It's a work in progress.
A system like this is perfect if you want to learn about React, TypeScript, ESModules and or you want to host your own event website using the template.

# Architecture Goal

First of all, I never call myself a "full-stack" software developer but I do have 16 years of experience writing code for a living... and most of those had a front-end and back-end.
I've seen many ways on how to build a web application and the many ways it can go wrong. Just like when I started playing Mario Maker all those years ago, I've yet to see a worked out system that I'd say is "complete"... and that's totally fine! If it were, there'd be no problems left to solve.

The main problems with building a web application is that it's very easy to make it too complex. Here are some ways developers try to manage complexity:

## Micro services

This means that you split up your codebase into multiple repositories. This makes each part of the system more manageable, but it also makes it harder to manage the system as a whole.
The key constraint I've heard for micro services is "if it can fit in Bob's head, it's a micro service" - meaning that if you can keep it small & stick to a certain problem to solve: it's a micro service.
Now let's imagine we have some configuration for the system, to make sure all the micro services are working together. How do we do that? Exactly! We'd have to make a "config" service for that.

## Mono repositories

This means that, you have a single repository for the whole system. A mono repository is often combined with a tool that manages the system as a whole. For example, turborepo is a tool that helps you manage your monorepo by breaking it into multiple packages. You'd make a turbo.json and a package.json for each package, and then you'd be able to also install each package as a dependency in other packages using the name for your repository, for example @repo/package-name.

## File based routing

By using specific file names and directories, developers can write glob patterns to match the files they want to include in the build process. This makes some of the things the system should do implicit based on the name of the file. For example, if it's name is "index.ts" it's probably the entry point of the directory.

## Polymorphism

By using a component language like React, developers can create components that can contain a lot of information using little space and code. We can use these components on the server, in the browser, and on our phones in the form of React Native. This is the write once, use anywhere philosophy.

## What would bbmariomaker2 do?

What's a nice feeling is when you come up with a solution that says "yes" to all the problems you've been trying to solve for ages.
Here's the plan:
- No more extra build tooling
- No more extra configuration
- No more extra dependencies

The project consists of five important parts:

- Transpile
  - Startup
    - Compile
      - Server
        - App

Each of these is a part in the equation: ```
 transpile(
    startup(
        compile(
            server(
                app
            )
        )
    )
)
 ```
As you'd see a mathematician do in a movie, you want to be able to cross out any part of the equation as you go along.

1.
Once you run the transpile command (tsc), you can cross out the transpile part. The type information is stripped from the code and the files are now just regular ESModules. We now have our distilled code. By default, typescript puts these files right next to the source files. I've seen many people keep it like this and simply never think about it, or maybe they haven't figured out a way to remove all these files easily. Like, how do you select all of them when they the important source files are right next to them? That's why we use a dist folder, which is configured through the (outDir).

The caveat with using the `outDir` in a `tsconfig.json` file is that we need to reason our files as operating from a different folder (the dist folder) instead of our source folder. There's two ways of managing this:
- put the dist folder directly next to the source folder. Since the folders are right next to each other, we can assume all the paths like `../` are still relative and valid.
- use something like monorepo and completely make a seperate config for each package, through the use of another package that'd merge different configs.
- use micro services and start a new repository for each package.
- Use typescript references to reference the files in the dist folder.



 and we can run any file there using Node.js. One thing we can now run is the startup script, which is the next and most opiniated step I will explain. Before we'll go over that I wanted to exaplain why Typescript always needs to be transpiled. Often times this is part of the compilation step. I wanted to explain why it should be seen as a seperate step in the equation.

The TypeScript team is very strict on this matter and for good reason. However it also makes their hands tied when it comes to delivering certain features. By comitting to the "transpilation only" philosophy, we can be sure that whatever TypeScript outputs is exactly like how we wrote it. However, it also means that they can't simply go and change certain aspects of the code. That's where the compile step comes in, and it's why people often see transpilation and compilation as the same step. When using something like Bun, this is indeed true and Typescript runs natively. (by doing all of this under the hood)

However, if we start using Bun we vendor lock ourselves into using Bun and can't be portable to other languages without that very same compiler. That's why, in this project we're not beating around the bush and just use tsconfig.node.json that includes every typescript file in the project. We simply transpile this codebase to dist, and all the files will be exactly like how we wrote them except without the types.

We can still configure vscode to understand that the startup and server folders are node only and not browser, by adding a tsconfig.json file to those folders. The tsconfig file is the same for every folder and all it does is tell vscode that we are using the node.tsconfig.json here and that we want to be able to reference any files in the project.

What we end up with is this:
The main tsconfig.json file:
```json
{
  "compilerOptions": {
    "allowJs": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react",
    "jsxFactory": "React.createElement",
    "jsxFragmentFactory": "React.Fragment",
    "lib": [
      "ESNext",
      "es2023",
      "dom.iterable",
      "DOM"
    ],
    "module": "nodenext",
    "moduleDetection": "force",
    "moduleResolution": "nodenext",
    "noEmit": false,
    "noFallthroughCasesInSwitch": true,
    "noPropertyAccessFromIndexSignature": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ESNext",
    "rootDirs": [
      "src",
      "startup/src",
      "server"
    ],
    "outDir": "dist",
    "types": [
      "vite/client",
      "@types/react/experimental",
      "react/experimental"
    ],
    "plugins": [
      {
        "name": "typescript-plugin-css-modules"
      }
    ]
  },
  "include": [
    "src/**/*",
    "src/**/*.json",
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
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

2. Once you run the compile command, you can cross out the compile part. The code is now compiled to a format that can be run in the browser or server. At one point we needed the compile step to make sure the bundles were neatly organized and minified.
3. 




Can compile be crossed out? Yes, it can. ESModules support is there for browsers and servers given the right configuration.

Can startup be crossed out? Yes, it can. By hosting a server we can stay connected to our CSV file and keep it in sync with the website - we do not have to run the startup script manually.
Can server be crossed out? Yes, it can. We can statically generate the website and host it on any server hosting platform available - including ghpages - and manually trigger a rebuild to update the website.
Can client be crossed out? Yes, it can. .


RCS server: serves RSC components. Run it with `npm run server:rsc`.