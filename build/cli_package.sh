#!/bin/sh
mkdir -p dist

function buildPackage() {
  pf=$1
  arch=$2
  ext=$3

  tag="$pf-$arch"

  pushd "out/cli/$tag"
  zip "../${npm_package_name}-cli-${npm_package_version}-$tag.zip" "hoshi-cli$ext"
  popd
}

function buildMacDmg() {
  pf="mac"
  arch="arm64"
  tag="$pf-$arch"

  hdiutil create -volname "YourVolumeName" -srcfolder "out/cli/$tag" -ov -format UDZO out/cli/${npm_package_name}-cli-${npm_package_version}-$tag.dmg
}

function notarizeMacPackages() {
  pf="mac"
  arch="arm64"
  tag="$pf-$arch"

  base="out/cli/$tag/${npm_package_name}-cli-${npm_package_version}-$tag."

  xcrun notarytool submit "$base.zip" --key "$KEY_PATH" --key-id "$KEY_ID" --key-issuer "$ISSUER_ID"
  xcrun notarytool submit --wait "$base.dmg"
  xcrun stapler staple "$base.dmg"
}

buildPackage "win" "x64" ".exe"
buildPackage "mac" "arm64" ""
buildPackage "linux" "x64" ""

buildMacDmg
notarizeMacPackages

cp out/cli/*.zip dist/
