#!/bin/bash

# https://stackoverflow.com/questions/42716734/modify-a-key-value-in-a-json-using-jq
function rewriteValue() {
  tmp=$(mktemp)
  fileName=$1
  echo $fileName/tsconfig.json
  jq '.extends = "../tsconfig.shared"' $fileName/tsconfig.json > "$tmp" && mv $tmp $fileName
  rm $tmp
}

rewriteValue packages/cli
rewriteValue packages/code-dependency
rewriteValue packages/converter
rewriteValue packages/extract
rewriteValue packages/interfaces
rewriteValue packages/resolver
