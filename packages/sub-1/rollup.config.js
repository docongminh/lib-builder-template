import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import * as opt_config from './config';

const extensions = ['.js', '.ts'];
const cjs_external = [
	/@babel\/runtime/,
];
//
function initConfig(type, format){
	const browser = type === 'browser';
	const bundle = format === 'iife';

	// base config
	let config = {
		input: 'src/index.ts',
		plugins: [
			commonjs(),
			nodePolyfills(),
			nodeResolve({
				browser: browser,
				dedupe: ['bn.js', 'buffer'],
				extensions,
				preferBuiltins: !browser,
			}),
			babel({
				exclude: './node_modules/**',
				extensions,
				babelHelpers: bundle ? 'bundled' : 'runtime',
				plugins: bundle ? [] : ['@babel/plugin-transform-runtime'],
			}),
			replace({
				preventAssignment: true,
			}),
			json()
		],
		onwarn: function (warning, rollupWarn) {
			// warning.code !== 'THIS_IS_UNDEFINED' || 
      if (warning.code !== 'CIRCULAR_DEPENDENCY'){
        rollupWarn(warning)
      }
    },
		treeshake: {
			moduleSideEffects: false,
		},
		context: 'window'
	}
	
	// browser config
	if(type=='browser'){
		if(format === 'esm'){
			// Bundling ES Module ...
			config.output = [opt_config.esm, opt_config.esm_min];
		}
		else if (format === 'iife'){
			// Bundling IIFE Module ...
			// config.external = ['http', 'https'];
			config.output = [opt_config.iife, opt_config.iife_min];
		} 
		else if (format === 'umd'){
			// Bundling UMD Module ...
			// config.external = ['http', 'https'];
			config.output = [opt_config.umd, opt_config.umd_min];
		}
		else{
			throw new Error(`Unknown format: ${format}`);
		}
	}
	// node config
	else if(type=='node'){
		// Bundling Node Module ...
		config.external = cjs_external;
		config.output = [opt_config.commonjs]
	}
	return config

}

export default [
	initConfig('node'),
	initConfig('browser', 'esm'),
	initConfig('browser', 'iife'),
	initConfig('browser', 'umd'),
]