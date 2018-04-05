#!/bin/bash
### Build script for Iguana application for MacOS platform.
### Created by mmaxian, 3/2017

cd $(dirname $0)/..

[ -z $SAFEWALLET_VERSION ] && SAFEWALLET_VERSION=$(node -p "require('./package.json').version")
[ ! -d build ] && mkdir build

echo
echo "Build script for Iguana application for MacOS platform."
echo "Preparing electron package $SAFEWALLET_VERSION"

./node_modules/.bin/electron-packager . --platform=darwin --arch=x64 \
  --icon=assets/icons/safewallet_app_icon.icns \
  --out=build/ --buildVersion=$SAFEWALLET_VERSION \
  --ignore=assets/bin/win64 \
  --ignore=assets/bin/linux64 \
  --ignore=react/node_modules \
  --ignore=react/src \
  --ignore=react/www \
  --overwrite
