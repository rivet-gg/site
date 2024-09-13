#!/bin/sh
# Clone modules repository to parent directory
cd ..
git clone https://github.com/rivet-gg/modules.git 
cd repo
next build && cp _redirects out/_redirects