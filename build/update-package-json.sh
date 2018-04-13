#!/bin/bash -x

echo "Updating to version ${1}"
sed -E "s#^  \"version\": \"([0-9]+\\.[0-9]+\\.[0-9]+)(-SNAPSHOT)?\",\$#  \"version\": \"${1}\",#" -i package.json
sed -E "s#^  \"version\": \"([0-9]+\\.[0-9]+\\.[0-9]+)(-SNAPSHOT)?\",\$#  \"version\": \"${1}\",#" -i package-lock.json