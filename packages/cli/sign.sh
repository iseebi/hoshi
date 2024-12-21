#!/bin/sh

pf=$(uname)
if [ $pf = "Darwin" ]; then
  cert_name=$(security find-certificate -c "Developer ID Application" | grep "alis" | awk -F'"' '{print $4}')
  codesign -f -v --sign "$cert_name" -o runtime --deep --entitlements hoshi.entitlements out/mac-arm64/hoshi
fi
