# About Project
A template to implement typescript library

- Main components:
 Implement libraries in three formats: `ECMAScript`, `standard`, `CommonJS`, and `UMD`.
 I used some main tools:
 * [Rollup](https://github.com/rollup/rollup): Package bundler
 * [Jest](https://github.com/facebook/jest): Test js script
 * [Karma](https://github.com/karma-runner/karma): Test ES & UMD modules
  - Config
    - In `package.json` file 
    ```js
      ...
      "main": "dist/index.common.js", //  CommonJS format.
      "module": "dist/index.esm.js", // ES Modules format
      "browser": "dist/index.js", // UMD format.
      "types": "types/index.d.ts", // Set the typescript declaration file.
      ...
    ```
    - Config rollup bundler in `rollup.config.js`
     ```js
      import typescript from 'rollup-plugin-typescript2';
      import { terser } from "rollup-plugin-terser";
      import pkg from './package.json';
      export default {
        external: Object.keys(pkg['dependencies'] || []),
        input: './src/index.ts', // depend on customize library-name
        plugins: [
          typescript({
            tsconfigDefaults: { compilerOptions: {} },
            tsconfig: "tsconfig.json",
            tsconfigOverride: { compilerOptions: {} },
            useTsconfigDeclarationDir: true
          }),
          terser()
        ],
        output: [
          // ES module (for bundlers) build.
          {
            format: 'esm',
            file: pkg.module
          },
          // CommonJS (for Node) build.
          {
            format: 'cjs',
            file: pkg.main
          },
          // browser-friendly UMD build
          {
            format: 'umd',
            file: pkg.browser,
            name: pkg.browser
              .replace(/^.*\/|\.js$/g, '')
              .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))
          }
        ]
      }
    ```
    Explained some keyword config in rollup and add on config test roll up in `rollup.tests.config.js` [see more in project]
      |Name|Description|
      |--|--|
      |external|Comma-separate list of module IDs to exclude.|
      |input|The bundle's entry point(s) (e.g. your main.js or app.js or index.js).|
      |plugins|Plugins allow you to customise Rollup's behaviour by, for example,<br>transpiling code before bundling, or finding third-party modules in your node_modules folder.<br>Use rollup-plugin-typescript2 and rollup-plugin-terser.<br>rollup-plugin-typescript2 is a TypeScript loader, and this plugin reads "tsconfig.json" by default.<br>rollup-plugin-terser compresses source code.|
      |output|The output destination of the bundle.<br>Three types of libraries, ES Modules, CommonJS, and UMD, are output.|
    - 
      
   
  - Output format library in `dist`
    |ES Module|UMD|CommonJS|
    |--|--|--|
    |index.esm.js|index.js|index.common.js|
  - Dependencies library support
    
    |Name|Description|
    |--|--|
    |typescript|Used to compile TypeScript source code into JavaScript.|
    |ts-node|Used to execute TypeScript code on a node and immediately check the result.|
    |tsconfig-paths|Used to resolve paths (alias) in tsconfig.json at runtime with ts-node.|
    |rollup|Rollup is a module bundler.<br>Used to bundle ES Modules, CommonJS, and UMD libraries for distribution to clients.|
    |rollup-plugin-typescript2|Plug-in for processing typescript with rollup.|
    |rollup-plugin-terser|Used to compress bundle files.|
    |jest|Jest is a library for testing JavaScript code.|
    |@types/jest|Jest's type declaration.|
    |ts-jest|A TypeScript preprocessor required to test projects written in TypeScript using Jest.|

# Build & Publish package
  - Install dependencies
    ```sh
      npm run install
    ```
  - Test with jest
    ```sh
      npm run test
    ```
  - Build
    ```sh
      npm run build
    ```
  - Test rollup
    ```sh
      npm run test-dist
    ```
    
# Usage Import Library
  - Nodejs
    When publish on `npm package`, install and import
    ```sh
      import {add, div} from "package-name"
    ```
  - ES Modules Browser:
    ```sh
      <script type="module">
        import { ethers } from "path/to/index.esm.js";
      </script>
    ```

  - UMD Browser:

    ```sh
      <script src="path/to/umd.index.umd.js" type="text/javascript">
      </script>
    ```

# Examples
   [Pendding Todo]

# TODO
  - [ ] Add test UMD in browser
  - [ ] Add test ESM in browser
  - [ ] Test with karma
  - [ ] Cli script

# Resource References
