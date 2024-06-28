#!/bin/sh
set -euf -o pipefail

cp "$OPENGB_MODULES_PATH/tests/basic/.opengb/meta.json" "./src/generated/meta.json"