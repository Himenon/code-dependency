#! /bin/bash

# Local Test
node packages/cli/lib/index.js --static-dist ./docs/sample --public-path /sample
# node packages/cli/lib/index.js --static-dist ./docs/sample --public-path https://himenon.github.io/code-dependency/sample

node packages/cli/lib/index.js -f packages/interfaces/src -o docs/sample/projects/interfaces.json -c
node packages/cli/lib/index.js -f packages/test-project/src -o docs/sample/projects/test-project.json -c
node packages/cli/lib/index.js -f packages/extract/src -o docs/sample/projects/extract.json -c
node packages/cli/lib/index.js -f packages/resolver/src -o docs/sample/projects/resolver.json -c
node packages/cli/lib/index.js -f packages/map/src -o docs/sample/projects/map.json -c
node packages/cli/lib/index.js -f packages/converter/src -o docs/sample/projects/converter.json -c
node packages/cli/lib/index.js -f packages/view/src -o docs/sample/projects/view.json -c
node packages/cli/lib/index.js -f packages/cli/src -o docs/sample/projects/cli.json -c
