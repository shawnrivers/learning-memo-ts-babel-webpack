# TS-Babel-Webpack

This is a project to help me learn the configurations and building process of Typescript with Babel and Webpack

## TS-Babel Only

Use Babel to transpile TS to JS, use `tsc` for type checking and generating type declaration files.

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
