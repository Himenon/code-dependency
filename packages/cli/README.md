# @code-dependency/cli

code-dependencyのライブラリを使用するためのコマンドラインツールです。

**Quick Start**

```sh
code-dependency index.ts
```

## Other usage

**help**

```sh
code-dependency -h
```

**Generate CSR Props in local.**

```sh
code-dependency -f ./index.ts -o ./csr-props.json
```

Don't want to mix absolute path. (developing)

```sh
code-dependency -f ./index.ts -o ./csr-props.json -c
```

**Start serve with local csr props data.**

```sh
code-dependency -s -i ./csr-props-json
```

## Static Hosting

```
code-dependency --static-dist /output/path --public-path /host/path
```

`output/path/config.json`

```json
{
  "projects": [
    {
      "name": "test project",
      "path": "/projects/sample-test-project.json"
    },
    {
      "name": "sample view",
      "path": "/projects/sample-view.json"
    }
  ]
}
```

Save csr props.

```
output/path/projects/
├── sample-test-project.json
└── sample-view.json
```

## License

@code-dependency/cli is [MIT licensed](https://github.com/Himenon/code-dependency/blob/master/LICENSE).
