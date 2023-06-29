#!/bin/sh
set -euf -o pipefail

# docker run --init -it -v `pwd`:/input lycheeverse/lychee --config /input/lychee.toml --base /input/src/pages '/input/src/pages/**/*.mdx'
# muffet --verbose --max-connections=16 --exclude='(hub.rivet.gg|tanks.rivet.game|discord.gg|twitter.com|github.com|cdn-cgi)' https://staging.rivet.gg

npx linkinator --config linkinator.config.json https://c4594a48.site-ckd.pages.dev/
