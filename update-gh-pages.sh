#!/usr/bin/env bash

set -eux

rm -rf gh-pages
git clone git@github.com:wwwtyro/dis-gui.git gh-pages
cd gh-pages
git checkout gh-pages
cd ..
cp example/index.html gh-pages
npm run build
cd gh-pages
git add .
git commit -am 'gh-pages update' || true
git push || true
cd ..
rm -rf gh-pages
