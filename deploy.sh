#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git checkout -b develop
git add -A
git commit -m 'deploy'


git push -f git@github.com:nemeritskyy/my-trello-frontend.git develop:gh-pages

cd -