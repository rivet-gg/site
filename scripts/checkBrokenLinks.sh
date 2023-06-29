#!/bin/sh
set -euf -o pipefail

docker run --init -it -v `pwd`:/input lycheeverse/lychee --config /input/lychee.toml --base /input/src/pages '/input/src/pages/**/*.mdx'
