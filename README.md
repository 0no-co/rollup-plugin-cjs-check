# rollup-plugin-cjs-check

A Rollup plugin for checking CommonJS exports against `cjs-module-lexer`.

## Why?

As Node.js defines it, CommonJS modules consist of a `module.exports` object which can be of any type.
When importing a `CommonJS`, while Node.js is in ESM mode, a CommonJS module will always be reliably
importable via a default import.

For modern modules, it's common to use Rollup to bundle and build both CommonJS and ECMAScript Modules (ESM)
outputs for any given module. This means that to achieve compatibility between both modules either requires
the module to only have a default-export, or to rely on Node.js' compatibility mode.

For better compatibility, Node.js attempts to detect the CommonJS exports of every CommonJS module that's
exported. Since sometimes, especially in legacy CommonJS mode, the import of a given CommonJS module built with
Rollup cannot be prevented entirely, the module has to be compatible with `cjs-module-lexer`.

The [`cjs-module-lexer` library](https://github.com/nodejs/cjs-module-lexer) is what Node.js uses to detect
exports of a given CommonJS module and hence, when choosing how to configure Rollup, the Rollup bundle outputs
have to be compatible with it, or otherwise, the module's exports won't be detected.

**This plugin checks that `cjs-module-lexer` agrees with the ECMAScript modules exports that Rollup detects.**

For more information, check out [the Node.js documentation on CommonJS namespaces.](https://nodejs.org/api/esm.html#commonjs-namespaces)

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v14.0.0+) and Rollup v1.20.0+.

## Install

```console
npm install --save-dev rollup-plugin-cjs-check
# or
yarn add -D rollup-plugin-cjs-check
# or
pnpm add --save-dev rollup-plugin-cjs-check
```

## Usage

Import the `rollup-plugin-cjs-check` plugin in your [Rollup configuration file](https://www.rollupjs.org/guide/en/#configuration-files),
and add it to your plugins:

```js
import cjsCheck from 'rollup-plugin-cjs-check';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [
    cjsCheck(),
  ]
};
```
