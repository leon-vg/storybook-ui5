# Storybook UI5

This repo contains both the `storybook-ui5` package as well as a demo.

[Run the demo](https://leon-vg.github.io/storybook-ui5/)

## Working on this repository

The npm package is in the folder [app/ui5](app/ui5). It is based on [typescript]([https://link](https://www.typescriptlang.org/)), so it requires a build-step before it can be consumed.

An example project is in [examples/ui5-kitchen-sink](examples/ui5-kitchen-sink).

The project works with [yarn workspaces](https://yarnpkg.com/).

### Installation

First: install yarn
```
npm install -g yarn
```

Then run
```
yarn
```

### Building the package

```
yarn package:build
```

### Working on the package

```
yarn package:watch
```

This command waits for changes and builds the project with every change.

### Working on the examples

```
yarn demo:run-watch
```

Due to the use of yarn, the example project makes automatic use of the package.

Changing any story hot reloads the example page.

### Contributing

File an issue or send me a pull request.