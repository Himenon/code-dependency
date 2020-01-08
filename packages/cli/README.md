# @code-dependency/cli

**Quick Start**

```sh
code-dependency --source ./src
```

## Option

**-s --source** (required)

Source directory path

```bash
code-dependency --source ./src
code-dependency --source /home/app/src
```

**-p --port**

Server port number (default 3000).

```bash
code-dependency --source ./src --p 4000
code-dependency --source ./src --port 4000
```

**--ts-config**

`tsconfig.json` path. [see](https://github.com/sverweij/dependency-cruiser/blob/develop/doc/cli.md#--ts-config-use-a-typescript-configuration-file-project)

```bash
code-dependency --source ./src --ts-config ./tsconfig.json
```

**--webpack-config**

`webpack.config.js` path. (JavaScript only) [see](https://github.com/sverweij/dependency-cruiser/blob/develop/doc/cli.md#--webpack-config-use-the-resolution-options-of-a-webpack-configuration)

```bash
code-dependency --source ./src --webpack-config webpack.config.js
code-dependency --source ./src --webpack-config your.config.js
```

**--exclude**

cruise ignore pattern (default: "node_modules"). [see](https://github.com/sverweij/dependency-cruiser/blob/develop/doc/cli.md#--exclude-exclude-dependencies-from-being-cruised)

```bash
code-dependency --source ./src --exclude node_modules
```

## License

@code-dependency/cli is [MIT licensed](https://github.com/Himenon/code-dependency/blob/master/LICENSE).
