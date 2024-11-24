#!/bin/sh
webpack --config ./webpack-cli.config.js
if [ $? -ne 0 ]; then
  echo "Failed to build cli"
  exit 1
fi

pkg -o out/cli/win-x64/hoshi-cli.exe --targets node18-win-x64 out/cli/src/index.js
pkg -o out/cli/mac-arm64/hoshi-cli --targets node18-mac-arm64 out/cli/src/index.js
pkg -o out/cli/linux-x64/hoshi-cli --targets node18-linux-x64 out/cli/src/index.js

pf=$(uname)
if [ $pf = "Darwin" ]; then
  cert_name=$(security find-certificate -c "Developer ID Application" | grep "alis" | awk -F'"' '{print $4}')
  codesign -f -v --sign "$cert_name" -o runtime --deep --entitlements hoshi-cli.entitlements out/cli/mac-arm64/hoshi-cli
fi
