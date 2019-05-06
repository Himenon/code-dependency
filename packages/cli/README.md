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

## License

@code-dependency/cli is [MIT licensed](https://github.com/Himenon/code-dependency/blob/master/LICENSE).
