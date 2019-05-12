# code-dependency · [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Himenon/code-dependency/blob/master/LICENSE)[![Build Status](https://travis-ci.com/Himenon/code-dependency.svg?branch=master)](https://travis-ci.com/Himenon/code-dependency)[![codecov](https://codecov.io/gh/Himenon/code-dependency/branch/master/graph/badge.svg)](https://codecov.io/gh/Himenon/code-dependency)![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

code-dependencyはコードの依存関係を可視化するためのツールです。

* **可視化：** コードの依存関係をグラフを用いて可視化します。
* **共有：** ブラウザベースで動作するため、ホスティングすれば簡単に共有できます。また、クエリパラメーターに検索クエリを保存するため、再現性を保ちます。
* **検索：** 開発中

## Installation

```sh
# npm
npm i -g @code-dependency/cli
# yarn
yarn add -g @code-dependency/cli
```

## Quick Start

```sh
code-dependency [Target file | Project directory]
```

[more...](./packages/cli/README.md)

## How to develop.

[see docs](./HOW_TO_DEVELOP.md).

## License

code-dependency is [MIT licensed](https://github.com/Himenon/code-dependency/blob/master/LICENSE).
