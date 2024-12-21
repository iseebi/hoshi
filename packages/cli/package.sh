#!/bin/sh
base_name="hoshi-$npm_package_version"

mkdir -p ./dist
zip -j "./dist/$base_name-linux-x64.zip" ./out/linux-x64/hoshi
zip -j "./dist/$base_name-win-x64.zip" ./out/win-x64/hoshi.exe
ditto -c -k --sequesterRsrc ./out/mac-arm64/hoshi "./dist/$base_name-mac-arm64.zip"
hdiutil create -volname "hoshi" -srcfolder "out/mac-arm64" -ov -format UDZO dist/${base_name}-mac-arm64.dmg
