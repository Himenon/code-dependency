# How to develop

## Initialize

Clone後、初回のみ実行します。

```sh
yarn run initialize
```

## Developing

```sh
# root          : TypeScript incremental build
yarn run develop

# packages/cli  : API Server
yarn run server

# packages/view : Hot reload server
yarn run develop
```

## Build

```sh
# root
yarn build
```

このコマンドは、source mapを生成しないため、一度実行するとエディター（vscode）のモジュール参照のサポートが受けられなくなります。
再び参照を活かすためには、`yarn run clean:lib`を実行してから、`yarn run develop`を利用してください。
もし参照が有効にならない場合は、エディター内で起動しているtsc serverを再起動してください。

### View: webapck build

webpackを利用するBuildは`tsBuildInfoFile`をOFFにする必要があります。
tsconfig.jsonをオーバーライドできない関係で、ビルド前後にスクリプトで自動調節しています。

## Test

それぞれのPackage内で`yarn run test:watch`もしくは`yarn run test`を実行してください。

## Linter

git commitにhookさせているので、コミット時にチェックが走ります。
メッセージにしたがってください。

## Cache & Incremental build

開発中は2つのキャッシュと1つのincremental buildが働きます。

* typescript : https://www.typescriptlang.org/docs/handbook/project-references.html
* jest       : https://jestjs.io/docs/en/cli#cache
* eslint     : https://eslint.org/docs/user-guide/command-line-interface#caching

ルートディレクトリに`buildcache`を配置しており、内部をパッケージ名を名前空間としてキャッシュする場所を仕切っています。

## TypeScript: Project References

* https://www.typescriptlang.org/docs/handbook/project-references.html

モノレポ間の参照を有効にしています。具体的には、`@code-dependency/cli`から`@code-dependency/map`へ参照をしているとき、`@code-dependency/map`の成果物（`lib`）に参照がジャンプせず、`src/`以下のファイルに参照がマッチするようになります。

ルートの`build.txt`にはビルド対象とその順序が記述されています。

## View & CLI

viewの開発は2つのPackageを利用します。

* view: Reactのアプリケーションを構築する。開発中はCSR(Client Side Rendering)を利用するため、初期状態を持たない。
* cli : viewに初期状態を与えるためのAPIサーバーを提供する。

viewはインターフェースのみ共有しているため、初期状態を取得するためにwebpackの開発サーバーを再起動する必要はありません。
開発中はCSRになりますが、ビルド後はSSR(Server Side Rendering)を利用できます。

## CI

Travis CIを利用しています。以下のHookでタスクが実行されます。

* Pull Request
    * linter
    * TypeScriptのビルド
    * Jest
* Merge
    * TypeScriptのビルド
    * webpackのビルド
    * npm publish

## package.json scripts / jest / tsconfig.json

共通のスクリプトや設定は以下のスクリプトを用いて更新します。

* bin/setting.share.ts
  * jest + package.json
* bin/tsconfig.share.ts
  * tsconfig.json
