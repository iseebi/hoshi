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

  base="${npm_package_name}-cli-${npm_package_version}-$tag"
  out_base="out/cli/$base"

  xcrun notarytool submit "$out_base.zip" --key "$KEY_PATH" --key-id "$KEY_ID" --issuer "$ISSUER_ID"
  xcrun notarytool submit --wait "$out_base.dmg" --key "$KEY_PATH" --key-id "$KEY_ID" --issuer "$ISSUER_ID"
  xcrun stapler staple "$out_base.dmg"
}

buildPackage "win" "x64" ".exe"
buildPackage "mac" "arm64" ""
buildPackage "linux" "x64" ""

buildMacDmg
notarizeMacPackages

cp out/cli/*.zip dist/
cp out/cli/*.dmg dist/
