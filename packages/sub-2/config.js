import {terser} from 'rollup-plugin-terser';

// Node JS
export const commonjs = { 
  file: './lib/index.commonjs.js',
  format: 'cjs',
  sourcemap: true
}
// ES module
export const esm = { 
    file: './lib/index.esm.js',
    format: 'es',
    sourcemap: true,
};
//
export const esm_min = { 
    file: './lib/index.esm.min.js',
    format: 'es',
    sourcemap: true,
    plugins: [terser({mangle: false, compress: false})],
};
// Browser iife & umd
export const iife = {
    file: 'lib/index.iife.js',
    format: 'iife',
    name: 'sub2',
    sourcemap: true,
  };
  //
export const iife_min = {
    file: 'lib/index.iife.min.js',
    format: 'iife',
    name: 'sub2',
    sourcemap: true,
    plugins: [terser({mangle: false, compress: false})],
  }
  //
  
export const umd = {
    file: 'lib/index.umd.js',
    format: 'umd',
    name: 'sub2',
    sourcemap: true,
}
  //
export const umd_min = {
    file: 'lib/index.umd.min.js',
    format: 'umd',
    name: 'sub2',
    sourcemap: true,
    plugins: [terser({mangle: false, compress: false})],
};