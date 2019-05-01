#!/bin/bash

# https://stackoverflow.com/questions/42716734/modify-a-key-value-in-a-json-using-jq
function rewriteValue() {
  tmp=$(mktemp)
  fileName=$1
  echo $fileName
  jq '.extends = "../tsconfig.shared"' $fileName > "$tmp" && mv $tmp $fileName
}

rewriteValue packages/cli/tsconfig.json
rewriteValue packages/code-dependency/tsconfig.json
rewriteValue packages/converter/tsconfig.json
rewriteValue packages/extract/tsconfig.json
rewriteValue packages/interfaces/tsconfig.json
rewriteValue packages/resolver/tsconfig.json
