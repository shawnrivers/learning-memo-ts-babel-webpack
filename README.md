# TS-Babel-Webpack

This is my learning memo of the configurations and building process of Typescript with Babel and Webpack (forked from https://github.com/microsoft/TypeScript-Babel-Starter).

## TS-Babel Only Configurations

### TS + Babel basic setups

> Overview: Use Babel to transpile TS to JS, use `tsc` for type checking and generating type declaration files.

1. Install dependencies
   ```bash
   npm install --save-dev typescript @babel/core @babel/cli @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-typescript
   ```
2. Create `tsconfig.json` using `tsc --init`
3. Create `.babelrc` file
   ```json
   {
     "presets": ["@babel/preset-env", "@babel/preset-typescript"],
     "plugins": ["@babel/plugin-proposal-class-properties"]
   }
   ```
4. Setup build tasks in `package.json`
   ```json
   {
     "scripts": {
       "type-check": "tsc --noEmit",
       "type-check:watch": "npm run type-check -- --watch",
       "build": "npm run build:types && npm run build:js",
       "build:types": "tsc --emitDeclarationOnly",
       "build:js": "babel src --out-dir lib --extensions \".ts,.tsx\" --source-maps inline"
     }
   }
   ```

### Build destinations

- compiled JS
  - defined by babel cli `--out-dir` flag
- declaration files
  - defined by `compilerOptions.outDir` property in `tsconfig.json`

### Resolving modules (path alias)

- JS compilation
  - install `babel-plugin-module-resolver`
  - set up `root` and `alias` in `module-resolver` options in `.babelrc`
    ```json
    {
      "compilerOptions": {
        "baseUrl": ".",
        "paths": {
          "utils/*": ["./src/utils/*"],
          "@components/*": ["./src/components"]
        }
      }
    }
    ```
- Type check:
  - set up `compilerOptions.baseUrl` and `compilerOptions.paths` in `tsconfig.json`
    ```json
    {
      "plugins": [
        [
          "module-resolver",
          {
            "alias": {
              "utils": "./src/utils",
              "@components": "./src/components"
            }
          }
        ]
      ]
    }
    ```

NOTE: relative modules importing just works without any configuration.
