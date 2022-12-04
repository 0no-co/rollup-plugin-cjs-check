import { builtinModules } from 'module';
import { readFileSync } from 'fs';

import cjsCheck from './src/index.mjs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

const output = format => {
  const extension = format === 'esm' ? '.mjs' : '.js';
  return {
    chunkFileNames: '[hash]' + extension,
    entryFileNames: '[name]' + extension,
    dir: './dist',
    exports: 'named',
    sourcemap: true,
    indent: false,
    freeze: false,
    strict: false,
    format,
    esModule: format !== 'esm',
    externalLiveBindings: format !== 'esm',
    generatedCode: {
      preset: 'es5',
      reservedNamesAsProps: false,
      objectShorthand: false,
      constBindings: false,
    },
  };
};

export default {
  input: {
    'rollup-plugin-cjs-check': './src/index.mjs',
  },
  external: [
    ...builtinModules,
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  onwarn() {},
  plugins: [
    cjsCheck(),
  ],
  treeshake: {
    unknownGlobalSideEffects: false,
    tryCatchDeoptimization: false,
    moduleSideEffects: false,
  },
  output: [
    output('esm'),
    output('cjs')
  ],
};
