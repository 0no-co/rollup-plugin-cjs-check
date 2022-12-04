import { Plugin } from 'rollup';
import { FilterPattern } from '@rollup/pluginutils';

export interface CJSCheckOptions {
   /**
   * A picomatch pattern, or array of patterns, which specifies the files in
   * the build the plugin should operate on. By default, all files with
   * extension `".cjs"` or those in `extensions` are included, but you can
   * narrow this list by only including specific files. These files will be
   * analyzed and transpiled if either the analysis does not find ES module
   * specific statements or `transformMixedEsModules` is `true`.
   * @default undefined
   */
  include?: FilterPattern;
  /**
   * A picomatch pattern, or array of patterns, which specifies the files in
   * the build the plugin should _ignore_. By default, all files with
   * extensions other than those in `extensions` or `".cjs"` are ignored, but you
   * can exclude additional files. See also the `include` option.
   * @default undefined
   */
  exclude?: FilterPattern;
}

/** A Rollup plugin for checking CommonJS exports against `cjs-module-lexer`. */
export default function cjsCheck(options?: CJSCheckOptions): Plugin;
