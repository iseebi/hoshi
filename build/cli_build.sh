#!/bin/sh
webpack --config ./webpack-cli.config.js
pkg --out-path out/cli \
  --targets node18-win-x64,node18-mac-arm64,node18-linux-x64 \
  out/cli/src/index.js

pf=$(uname)
if [ $pf = "Darwin" ]; then
  cert_name=$(security find-certificate -c "Developer ID Application" | grep "alis" | awk -F'"' '{print $4}')
  codesign -f -v -s "$cert_name" out/cli/index-macos-arm64
fi

cp out/cli/index-macos-arm64 out/cli/index-mac
cp out/cli/index-macos-arm64 out/cli/index-mac-arm64
