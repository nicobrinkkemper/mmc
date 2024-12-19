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

This is a personal project. Even though I'm trying to say it's a "good" system, it's not. It's a work in progress.
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

```
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

Typescript transpiles using the tsconfig.node.json project. By using the transpiled code directly with node, we avoid any build step complexity and chicken and egg problems. We can look at the code and debug it, and by using source maps and declaration maps we can link them back to our source files.

The output in the /dist/ folder will be called by nodejs to run the server and startup scripts, and those scripts may reference files from the source folder which is intended for cross-environment code.

Vite compiles the app and development server. The `npm run start` command will run default vite development server to work on the website. This will just straight up show you the typescript code in the browser, directly from the source files. If you run `npm run build`, it will make a very basic build of the react app similar to the old `create-react-app` setup, using a single index.html with a empty `<div id="root"></div>`. The entry for this is the `index.html` in the root folder, which imports `/src/index.tsx`

Then we can run `npm run server:start`, once it starts it will generate all the individual html files and prerender the html in a way that's hydratable on the client. Once it's done, the static folder is the portable end-product. You can close the server, but you can also keep it running and visit it using htpp://localhost:3001. This is where it gets interesting, because the server will serve our experimental ssr/rsc entry in `src/ssr.tsx`.





