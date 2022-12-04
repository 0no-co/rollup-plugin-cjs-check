import { parse, init } from 'cjs-module-lexer';
import { createFilter } from '@rollup/pluginutils';

function cjsCheck(opts = {}) {
  const filter = createFilter(opts.include, opts.exclude, {
    resolve: false
  });

  return {
    name: "cjs-check",

    outputOptions(output) {
      this.enabled = output.format === 'cjs' || output.format === 'umd';
      return null;
    },

    async renderChunk(code, chunk) {
      if (!this.enabled) {
        return null;
      } else if (!filter(chunk.fileName)) {
        return null;
      } else if (!chunk.exports || !chunk.exports.length) {
        return null;
      }

      await init()

      let output;
      try {
        output = parse(code);
      } catch (error) {
        this.warn(error);
        return null;
      }

      const missingReexports = [];
      const missingExports = [];

      let hasMissing = false;
      for (const mod of chunk.exports) {
        if (mod[0] == '*' && !output.reexports.includes(mod.slice(1))) {
          hasMissing = true;
          missingReexports.push(mod.slice(1));
        } else if (mod[0] != '*' && !output.exports.includes(mod)) {
          hasMissing = true;
          missingExports.push(mod);
        }
      }

      if (hasMissing) {
        let message = '';
        if (missingReexports.length) {
          message += 'The following re-exports are undetected:\n';
          message += missingReexports.map(x => `- ${x}\n`).join('');
        }

        if (missingExports.length) {
          message += 'The following exports are undetected:\n';
          message += missingExports.map(x => `- ${x}\n`).join('');
        }

        if (missingExports.length + missingReexports.length >= chunk.exports.length) {
          message = 'All chunk exports have not been detected. Is the chunk a CommonJS module?'
        }

        throw new Error(
          `cjs-module-lexer did not agree with Rollup\'s exports for ${chunk.fileName}.\n${message}`
        );
      }

      return null;
    }
  };
}

export default cjsCheck;
