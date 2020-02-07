# @code-dependency/cli

**Quick Start**

```sh
code-dependency --source ./src
```

## Option

### -s --source\*\* (required)

Source directory path

```bash
code-dependency --source ./src
code-dependency --source /home/app/src
```

### -p --port

Server port number (default 3000).

```bash
code-dependency --source ./src --p 4000
code-dependency --source ./src --port 4000
```

### --ts-config

`tsconfig.json` path. [see](https://github.com/sverweij/dependency-cruiser/blob/develop/doc/cli.md#--ts-config-use-a-typescript-configuration-file-project)

```bash
code-dependency --source ./src --ts-config ./tsconfig.json
```

### --webpack-config

`webpack.config.js` path. (JavaScript only) [see](https://github.com/sverweij/dependency-cruiser/blob/develop/doc/cli.md#--webpack-config-use-the-resolution-options-of-a-webpack-configuration)

```bash
code-dependency --source ./src --webpack-config webpack.config.js
code-dependency --source ./src --webpack-config your.config.js
```

### --exclude

cruise ignore pattern (default: "node_modules"). [see](https://github.com/sverweij/dependency-cruiser/blob/develop/doc/cli.md#--exclude-exclude-dependencies-from-being-cruised)

```bash
code-dependency --source ./src --exclude node_modules
```

### --export-static

generate static site.

```bash
code-dependency --source ./src --exclude node_modules --export-static ./docs
```

### --public-path

```bash
code-dependency --source ./src --exclude node_modules --export-static ./docs --public-path /docs

# If export GitHub Pages
code-dependency --source ./src --exclude node_modules --export-static ./docs --public-path https://himenon.github.io/code-dependency/
```

Directory Structure

```
./docs/
├── assets            // provide from @code-dependency/view
│   ├── scripts
│   └── stylesheets
└── project
    └── src           // `--source` target : Browser entrypoint -> /project/src/index.html
```

### --engine

Use native graphviz engine. (https://www.graphviz.org/)

Option: `dot` (recommended)

```bash
code-dependency --source ./src --exclude node_modules --export-static ./docs --public-path /docs --engine dot
```

### --dry-run (experimental)

if failed generate static file and retry generate static file only unfinished path.

```bash
code-dependency --source ./src --exclude node_modules --export-static ./docs --dry-run
```

## License

@code-dependency/cli is [MIT licensed](https://github.com/Himenon/code-dependency/blob/master/LICENSE).
