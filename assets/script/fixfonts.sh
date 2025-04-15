#!/bin/bash
# fixfonts.sh

declare folder="$1"
if [[ -d "$folder" && -n "$folder" ]]; then
  pushd "$folder" > /dev/null || exit 1
  shopt -s nullglob

  # file .ttf
  for file in *.ttf; do
    declare normalized="$(echo "${file//-/_}" | tr '[:upper:]' '[:lower:]')"
    if [[ "$file" != "$normalized" ]]; then
      mv "$file" "$normalized"
    fi
  done

  # file.otf
  for file in *.otf; do
    declare normalized="$(echo "${file//-/_}" | tr '[:upper:]' '[:lower:]')"
    if [[ "$file" != "$normalized" ]]; then
      mv "$file" "$normalized"
    fi
  done

  shopt -u nullglob
  popd > /dev/null || exit 1
fi
