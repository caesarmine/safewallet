# Safewallet Desktop App
Desktop App forked from SuperNet's Agama and FairExchange-GUI

#### For Developers
You must have `node.js` (v8.9 LTS works)  and `npm` installed on your machine.

Clone Safewallet Desktop App with FairExchange-GUI submodule
```shell
1) git clone https://github.com/safe-exchange/safewallet 
2) cd safewallet && cd gui/FairExchange-GUI/
3) npm install && npm install webpack
4) cd ../ && ./binary_artifacts.sh
5) npm start      (in project root folder)
6) cd gui/FairExchange-GUI/react/src
7) npm start    (npm install is sometimes required if npm start gives error)
8) toggle dev and debug options in settings
9) restart the app
10) sync safecoind and/or asset chains

You are ready to dev
```

### Important dev notes

#### Sockets.io
In dev mode backend is configured to send/receive messages from/to http://127.0.0.1:3000 address. If you open it as http://localhost:3000 sockets server will reject any messages.

#### Coin daemon binaries
Run binary_artifacts.sh from under safewallet folder you cloned previously. The script will fetch

#### For end users
The instructions to make production build of Safewallet App will be updated soon.

To build the production ready app, install `electron-packager` and `electron-prebuilt` packages from npm
```shell
npm install electron-packager -g
```


#### **Build the Wallet-App**
Refer to the original [electron-packager](https://github.com/electron-userland/electron-packager) repository for more detailed information.

##### Linux
Change directory to iguana and execute the following command to build the Linux app
```shell
cd iguana
electron-packager . --platform=linux --arch=x64 --icon=assets/icons/safewallet_icons/128x128.png --out=build/ --buildVersion=VERSION_NUMBER_HERE --ignore=assets/bin/win64 --ignore=assets/bin/osx --overwrite
```
change architecture build parameter to ```--arch=x32``` for 32 bit build

##### OSX
Change directory to iguana and execute the following command to build the OSX app
```shell
cd iguana
electron-packager . --platform=darwin --arch=x64 --icon=assets/icons/safewallet_icons/safewallet_app_icon.icns --out=build/ --buildVersion=VERSION_NUMBER_HERE --ignore=assets/bin/win64 --ignore=assets/bin/linux64 --overwrite
```

##### Windows
Change directory to iguana and execute the following command to build the Windows app
```shell
dir iguana
electron-packager . --platform=win32 --arch=x64 --icon=assets/icons/safewallet_icons/safewallet_app_icon.ico --out=build/ --buildVersion=VERSION_NUMBER_HERE --ignore=assets/bin/osx --ignore=assets/bin/linux64 --overwrite

# If generating 32bit desktop package
electron-packager . --platform=win32 --arch=ia32 --icon=assets/icons/safewallet_icons/safewallet_app_icon.ico --out=build/ --buildVersion=VERSION_NUMBER_HERE --ignore=assets/bin/osx --ignore=assets/bin/linux64 --overwrite

# To build both x64 and x86 desktop package
electron-packager . --platform=win32 --arch=all --icon=assets/icons/safewallet_icons/safewallet_app_icon.ico --out=build/ --buildVersion=VERSION_NUMBER_HERE --ignore=assets/bin/osx --ignore=assets/bin/linux64 --overwrite
```
change architecture build parameter to ```--arch=x64``` for 64 bit build



## Troubleshooting Instructions

### Remember if you are running the binary, you are not in DEV mode anymore and will need to toggle that off or it will not run

### Windows DLL issues
On Windows it's noticed iguana.exe complains about `VCRUNTIME140D.DLL` and `ucrtbased.dll` file.

Please see **windeps** directory and README file for instructions to install the required DLL files on Windows, and then try again running Safewallet App.
