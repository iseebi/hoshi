#!/bin/bash

target="$1"

xcrun notarytool submit --wait "$target" --key "$KEY_PATH" --key-id "$KEY_ID" --issuer "$ISSUER_ID"

# dmgの場合はstaple
if [[ $target == *.dmg ]]; then
  sleep 5
  xcrun stapler staple "$target"
fi

