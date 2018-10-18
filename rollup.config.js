import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  output: {
    name: 'storybook-addon-comments',
    format: 'cjs',
  },
  plugins: [
    babel({
      runtimeHelpers: true,
    }),
    commonjs({
      ignoreGlobal: true,
    }),
    terser(),
  ],
};
