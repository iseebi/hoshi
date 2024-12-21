#!/bin/bash
notarization_script="./build/notarization.sh"

wait_pids() {
  for pid in "$@"; do
    #echo "wait $pid"
    if ! wait "$pid"; then
      echo "Error detected" 1>&2
      exit 1
    fi
  done
}

pids=()

find ./dist -name '*mac*.zip' -or -name '*.dmg' | while IFS= read -r file; do
  $notarization_script "$file" &
  pids+=($!)
done

wait_pids "${pids[@]}"
