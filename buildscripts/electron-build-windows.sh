#!/bin/bash
### Build script for Iguana application for Windows x64 platform.
### Created by mmaxian, 3/2017

cd $(dirname $0)/..

SAFEWALLET_VERSION=$(node -p "require('./package.json').version")
[ ! -d build ] && mkdir build

echo
echo "Build script for Iguana application for Windows x64 platform."
echo "Preparing electron package $SAFEWALLET_VERSION"

./node_modules/.bin/electron-packager . --platform=win32 \
  --arch=x64 \
  --icon=assets/icons/safewallet_app_icon.ico \
  --out=build/ \
  --buildVersion=$SAFEWALLET_VERSION \
  --ignore=assets/bin/osx \
  --ignore=assets/bin/linux64 \
  --ignore=react/node_modules \
  --ignore=react/src \
  --ignore=react/www \
  --overwrite \
  --version-string.CompanyName="SuperNET" \
  --version-string.FileDescription="Safewallet" \
  --version-string.OriginalFilename="Safewallet" \
  --version-string.ProductName="Safewallet" \
  --version-string.InternalName="Safewallet" \
  --app-copyright="Copyright (C) 2017 SuperNET. All rights reserved."
