#!/bin/sh
mkdir -p dist

function buildPackage() {
  pf=$1
  arch=$2
  ext=$3

  echo "test $pf $arch $ext"

  tag="$pf-$arch"

  mkdir -p "out/cli/$tag"
  cp "out/cli/index-$tag$ext" "out/cli/$tag/hoshi-cli$ext"
  pushd "out/cli/$tag"
  zip "../${npm_package_name}-cli-${npm_package_version}-$tag.zip" "hoshi-cli$ext"
  popd
}

buildPackage "win" "x64" ".exe"
buildPackage "mac" "arm64" ""
buildPackage "linux" "x64" ""

cp out/cli/*.zip dist/
