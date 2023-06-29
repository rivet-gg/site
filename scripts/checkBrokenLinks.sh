#!/bin/sh
set -euf -o pipefail

docker run --init -it -v `pwd`:/input lycheeverse/lychee --config /input/lychee.toml --base src/pages/docs '/input/src/pages/**/*.mdx'
