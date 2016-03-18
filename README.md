# Class 1: Introduction to React & ES6 Tooling
Welcome! This course assumes you're comfortable with JavaScript, and looking to dive into the React ecosystem. In this first class, we'll be gearing up and looking at the following:

- Introduction to React
  - _What it is_
  - _How it's different_
  - _Why it's valuable_
- Setting up a React development environment
  - _Node & npm_
  - _Webpack & Babel (ES6)_
  - _React_
- How React applications are structured
  - _Component Structure_
  - _Lifecycle methods_
  - _JSX_
  - _Events_

You'll need to ensure you have a few things set up for this:

- **[node.js](https://nodejs.org/)**
- Your favorite code editor


## Introduction to React
**[React](https://facebook.github.io/react/)** is a performance-focused JavaScript library originally created by Facebook. At a glance, it seems less full-featured than other approaches (EmberJS, AngularJS), but once you pull back the curtain it becomes clear that it brings a number of interesting things to the table.


### How It's Different
Web browsers have a dirty little secret: they're horribly inefficient when it comes to rendering changes. Traditional JavaScript frameworks and libraries apply changes from your code as soon as possible, and often don't batch these changes. This results in what's called "reflow", which ultimately can manifest itself in a number of ways - visible end-user lag, hanging pages, or stuttering animations, just to name a few.

#### The Virtual DOM
React takes a different approach, utilizing what's known as a _Virtual DOM_. Internally, all your changes are compared to an in-memory representation of the current DOM, from which it determines what changes actually need to be applied. These changes are then batched and set as necessary, ensuring that you (and your users) get a smooth experience. A good example is a list of 100 items - if only one item out of the 100 has changed, your update pass will touch only that one. This optimizes page reflow in a way that's beneficial to browsers.

#### JSX
Another significant difference you'll encounter is JSX - it's React's unique method for writing UI code. For the most part it looks like you have HTML or XML in your JavaScript, and while it can take some getting used to, it's highly recommended to go with it - tightly coupling the UI for a component to the logic that dictates how it operates is one of React's biggest benefits. Take the following example:


``` javascript
import React from 'react';
import {render} from 'react-dom';

class Header extends React.Component {
    render() {
        return <div id="header"></div>;
    }
}

// For the sake of example, we'll assume there's a div named "root"
// on the page
render(<Header />, document.getElementById('root'));
```

That's a complete (albeit simple) React component. You can keep everything in (mostly) one place, and think of components as functioning independent objects in your layout.


### Why It's Valuable
React ultimately streamlines development in a way traditional frameworks haven't achieved yet, by enabling you to couple UI components and logic in the same file. The focus on performance with the Virtual DOM allows you to avoid overthinking about browser rendering intricacies. On top of all that, the surrounding ecosystem is incredibly healthy, with many open source projects building on top of it and many companies embracing it as a core part of their technology stack.

React is also usable in different environments, such as mobile development for iOS and Android (via **[React Native](https://facebook.github.io/react-native/)**). As a result, you're not just learning a set of skills that apply only to frontend web development, but many different development environments.


## Setting Up a React Development Environment
We're going to go ahead and set up an easy to use development environment for React. You may have noticed in the example above that we used some newer syntax; this is ES6, an evolution of JavaScript that bolts on some very useful features:

- A native module specification/system
- A native Class system
- Shorthand definitions for Functions and Methods

The caveat (at least for the moment) is that not all browsers support this newer syntax just yet. This is where **[Babel](http://babeljs.io/)** comes in: we're going to configure our development setup to _"transpile"_ this syntax into standard ES5 (the type of JavaScript commonly supported by browsers). This is important, as many development setups and projects are moving towards ES6 development environments for the benefit of these more powerful features.

Powering this entire setup is **[Webpack](https://webpack.github.io/)**, a JavaScript module bundler that provides hooks for plugins and transformers. Some projects may use an alternative build system powered by **[Browserify](http://browserify.org/)**, which is powerful in its own right, but lacks some of the features that Webpack provides (such as automatic bundle reloading, or a live development server). Webpack's configuration can be a bit daunting at first, but we'll walk through the entire process to make sure you're equipped to build React applications without issue.

### Installing and Configuring Webpack
`npm` is the package manager we'll be using to install everything in this class, so let's kick things off by creating a workspace and installing Webpack:

``` bash
mkdir -p react-project
cd react-project
npm init
```

`npm init` will walk you through configuring your project to use with npm itself - it's pretty self explanatory and shouldn't require any explanation.

Now we can actually start installing and configuring things - let's start with `webpack`.

``` bash
npm install --save-dev webpack webpack-dev-server
```

We'll also need Babel installed, in order to transpile our code. With Babel 6, the packages we'll need are split up - let's install them by running the command below, and then review what they're actually for. We'll also go ahead and install React, because we're going to need it.

``` bash
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
npm install --save-dev babel-polyfill react react-dom
```

- **babel-core** and **babel-loader** are the core of our transpiler; it moves code from ES6 to ES5. Think of it like your engine.
- **babel-preset-es2015** is the module babel requires for moving code from ES6 to ES5. Think of it like an engine part.
- **babel-preset-react** is a module that handles some React-specific pieces, like JSX parsing. Another engine part.
- **babel-polyfill** is a module that will fill in missing features in browsers as necessary.
- **react** is the core React library.
- **react-dom** is the browser-rendering portion of React.
  - _This used to be part of React core, but has been split out so that the core React library can see reuse across environments where the rendering process differs. Older tutorials you may run into still reference React.render(), though - note that this is now deprecated!_


### Bringing it All Together
With everything installed, we need to instruct Webpack how to properly build our project. This is done with a config file, which is more or less just JavaScript - `webpack.config.js`. The most basic form would look something like this:

``` javascript
const path = require('path');
const PATHS = {
    src: path.join(__dirname + '/src'),
    dist: path.join(__dirname + '/dist'),
};

module.exports = {
    entry: [path.join(PATHS.src, '/app.js')],
    output: {
        path: PATHS.dist,
        filename: 'app.js'
    }
};
```

Here, we're establishing that we've got a source directory (`src`), and we want to transpile our code into the `dist` directory. Create a simple `app.js` inside the src folder, and then run `webpack` - you should see some output indicating that the build was successful.

``` bash
mkdir -p src
echo 'console.log' > src/app.js
webpack
```

Good to go! Now let's beef up our Webpack configuration to handle parsing ES6 and JSX, which we need for modules and React components:

``` javascript
const path = require('path');
const PATHS = {
    src: path.join(__dirname + '/src'),
    dist: path.join(__dirname + '/dist'),
};

module.exports = {
    entry: ['babel-polyfill', path.join(PATHS.src, '/app.js')],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    output: {
        path: PATHS.dist,
        filename: 'app.js'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/,
            include: PATHS.src,

            // Note! This can also be done via a .babelrc file, but for
            // clarity purposes we've done it here. Either is fine!
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react']
            }
        }]
    }
};
```

Here we're adding a few things. The `resolve` section lists extensions that we're concerned about - we'll primarily look for JavaScript files, and JavaScript files that contain JSX (a common development pattern is to save files that utilize JSX with a `.jsx` suffix). Our output section remains the same; `module` provides `loaders`, which we'll take a minute to explain further.


### Working with Loaders
Webpack functions with a concept of `loaders`, which act as a way for you to take files and pass them through a set of transformations and/or plugins. The setup can be a bit confusing at first, but once you've done it once it gets easier to parse.

- In the `entry` Array, we pass in `babel-polyfill`. This will automatically include `babel-polyfill` into our generated bundle.
- The `test` key contains a regular expression that is automatically applied to the filename(s) picked up by Webpack; we've supplied one that will catch both `.js` and `.jsx` files.
- Our `loader` is Babel, which is responsible for the bulk of the work in terms of transpiling code.
- We exclude the node modules folder, as we don't need to parse anything in there.
- `query` is where you can specify options to pass to Babel; this could be plugins, presents, transformers or more.
  - Notice that we pass the `cacheDirectory` option; this instructs Babel to cache already transpiled plugins, and will attempt to use those cached versions in later builds if the source file hasn't changed. By setting it to `true` it will use the Operating System's temporary files directory, but you can specify a directory here if you want.
  - The `presets` Array passes in the presets we require - these handle transformation of ES6 and JSX into JavaScript that runs in today's web browsers.

Some projects may have multiple loaders working together; some projects may use a different loader for CSS or HTML. Webpack provides you the flexibility to handle this however you need. At this point, we've got a functioning Webpack setup! Let's build a basic React component now to tie it all together.


## How React applications are structured
Webpack has given us a structure with which to build applications: we can now treat components as individual modules, and import them around as necessary. We'll build an example, but let's stub out an `index.html` in the root of our project first:

``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>React</title>
    <!-- Your CSS, et al as necessary -->
</head>
<body>
    <div id="app"></div>
    <script type="text/javascript" src="dist/app.js"></script>
</body>
</html>
```

We only need a single `<div>`, which is the hook where we'll render our React component into. Let's head back to our `src/app.js` file, and set up a basic component:

``` javascript
import React from 'react';
import {render} from 'react-dom';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
        this.increment = this.increment.bind(this);
    }

    increment() {
        this.setState({
            count: this.state.count + 1
        });
    }

    render() {
        return <div>
            {this.state.count} <button onClick={this.increment}>Increment Me</button>
        </div>;
    }
};

render(<Counter />, document.getElementById('app'));
```

Here we've created a button, which increments a count each time it's clicked. While the concept is simple, it illustrates a few things:

- React components extend from React.Component
- All components need to call their `constructor` method
  - We bind a callback to the Counter component itself (`this.increment`), as ES6 classes don't (by default) keep context bound.
- All components have a `render` method, which returns the structure of the component
  - Events are handled by way of an inline style. Behind the scenes, React resolves this to the proper API calls for event handling.

Run the `webpack` command again to build it, then load index.html in your browser. Open the console, and voila! Your first React component is up and running. There's a few parts worth noting about React before we conclude this week's class:

### Props and State
Every component has a concept of `props` and `state`. Props are immutable; they should never change, and in fact React considers this to be an error. Props are supplied to the component at instantiation time, and remain for the lifecycle of the component. State can change; it defines the current state of the component. Note that when we call setState, it's an asynchronous call - behind the scenes, each time you call `setState`, React will apply a `render` pass. This isn't immediate due to the optimizations React makes for performance, so you'll need to add a callback to work with the updated value.

### JSX
JSX is likely familiar in appearance - it just resembles HTML or XML. Your custom components are also treated as JSX tags; this allows you to easily compose UI interfaces by making use of the natural nesting functionality. Behind the scenes JSX is turned into JavaScript Function calls; in fact, the JSX below is just an easier and more succinct way of expressing the compiled JS below it:

``` javascript
// This...
render(<Head />, document.getElementById('root'));

// ...ultimately compiles down to this
render(React.createElement(Header, null), document.getElementById('root'));
```

Much easier to work with, especially as your UI grows and becomes complex. If you want to try this out and see it for yourself, you can use the online **[Babel REPL](https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=%3CHeader%20%2F%3E)**.

Good reading on this can be found over at the official **[React Documentation on JSX](https://facebook.github.io/react/docs/jsx-in-depth.html)**.

### Events
In React, components get event handling baked-in. While you attach them inline, in an older style, they're transpiled behind the scenes into the proper new-age equivalents. Keeping event handler attachments inline helps to write streamlined code - you see where an element displays in the heirarchy, and you know what events it has on it at a glance.

ES6 classes don't auto-bind, but this is easy to fix - we can bind our methods in the constructor, or make use of the newer ES6 arrow functions. Either will ensure that at call-time, our `this` value will be accurate. React's event system provides most of what you'll need - **[view the full list here](https://facebook.github.io/react/docs/events.html)**.

### Lifecycle Methods
React provides various lifecycle methods on each component. These methods are essentially hooks for you to use; for example, `componentWillMount()` fires when a component is about to mount. `componentDidMount()` fires when a component has fully mounted and is ready. These lifecycle methods are a good place to do things like AJAX calls or to schedule animations or timers, keeping you in-sync with the inner workings of your application.

``` javascript
import React from 'react';
import {render} from 'react-dom';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 1};
        this.increment = this.increment.bind(this);
    }

    componentWillMount() {
        console.log('Counter about to mount!');
    }

    componentDidMount() {
        console.log('Counter has mounted!');
    }

    increment() {
        this.setState({
            count: this.state.count + 1
        });
    }

    render() {
        return <div>
            {this.state.count} <button onClick={this.increment}>Increment Me</button>
        </div>;
    }
};

render(<Counter />, document.getElementById('app'));
```


## Wrapping Up
So far we've looked at setting up and configuring Webpack and Babel. By now, you've got a functioning build system that can be extended as necessary! For a fun exercise, try enabling the **[Webpack Dev Server](https://webpack.github.io/docs/webpack-dev-server.html)** for automatic reloading as you make edits. Absolutely feel free to reach out with questions on it!

We also examined how to construct React components using ES6 syntax, complete with basic event binding and lifecycle methods. In our next session we'll be digging into Flux, which enables you to easily manage state and associated data across your React application. Recommended reading would be the **[React Flux Overview](https://facebook.github.io/flux/docs/overview.html)**, as it provides a solid base on which to think about how your data will live inside your application.
