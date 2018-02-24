const path = require('path');
const fixPath = require('fix-path');
const os = require('os');

module.exports = (shepherd) => {
  shepherd.pathsSafewallet = () => {
    switch (os.platform()) {
      case 'darwin':
        fixPath();
        shepherd.safewalletDir = `${process.env.HOME}/Library/Application Support/Safewallet`;
        break;

      case 'linux':
        shepherd.safewalletDir = `${process.env.HOME}/.safewallet`;
        break;

      case 'win32':
        shepherd.safewalletDir = `${process.env.APPDATA}/Safewallet`;
        shepherd.safewalletDir = path.normalize(shepherd.safewalletDir);
        break;
    }
  }

  shepherd.pathsDaemons = () => {
    switch (os.platform()) {
      case 'darwin':
        fixPath();
        shepherd.safewalletTestDir = `${process.env.HOME}/Library/Application Support/Safewallet/test`,
        shepherd.safecoindBin = path.join(__dirname, '../../assets/bin/osx/safecoind'),
        shepherd.safecoincliBin = path.join(__dirname, '../../assets/bin/osx/safecoin-cli'),
        shepherd.safecoinDir = shepherd.appConfig.dataDir.length ? shepherd.appConfig.dataDir : `${process.env.HOME}/Library/Application Support/Safecoin`,
        shepherd.zcashdBin = '/Applications/ZCashSwingWalletUI.app/Contents/MacOS/zcashd',
        shepherd.zcashcliBin = '/Applications/ZCashSwingWalletUI.app/Contents/MacOS/zcash-cli',
        shepherd.zcashDir = `${process.env.HOME}/Library/Application Support/Zcash`,
        shepherd.zcashParamsDir = `${process.env.HOME}/Library/Application Support/ZcashParams`,
        shepherd.chipsBin = path.join(__dirname, '../../assets/bin/osx/chipsd'),
        shepherd.chipscliBin = path.join(__dirname, '../../assets/bin/osx/chips-cli'),
        shepherd.chipsDir = `${process.env.HOME}/Library/Application Support/Chips`,
        shepherd.coindRootDir = path.join(__dirname, '../../assets/bin/osx/dex/coind'),
        shepherd.mmBin = path.join(__dirname, '../../node_modules/marketmaker/bin/darwin/x64/marketmaker');
        break;

      case 'linux':
        shepherd.safewalletTestDir = `${process.env.HOME}/.safewallet/test`,
        shepherd.safecoindBin = path.join(__dirname, '../../assets/bin/linux64/safecoind'),
        shepherd.safecoincliBin = path.join(__dirname, '../../assets/bin/linux64/safecoin-cli'),
        shepherd.safecoinDir = shepherd.appConfig.dataDir.length ? shepherd.appConfig.dataDir : `${process.env.HOME}/.safecoin`,
        shepherd.zcashParamsDir = `${process.env.HOME}/.zcash-params`,
        shepherd.chipsBin = path.join(__dirname, '../../assets/bin/linux64/chipsd'),
        shepherd.chipscliBin = path.join(__dirname, '../../assets/bin/linux64/chips-cli'),
        shepherd.chipsDir = `${process.env.HOME}/.chips`,
        shepherd.coindRootDir = path.join(__dirname, '../../assets/bin/linux64/dex/coind'),
        shepherd.mmBin = path.join(__dirname, '../../node_modules/marketmaker/bin/linux/x64/marketmaker');
        break;

      case 'win32':
        shepherd.safewalletTestDir = `${process.env.APPDATA}/Safewallet/test`;
        shepherd.safewalletTestDir = path.normalize(shepherd.safewalletTestDir);
        shepherd.safecoindBin = path.join(__dirname, '../../assets/bin/win64/safecoind.exe'),
        shepherd.safecoindBin = path.normalize(shepherd.safecoindBin),
        shepherd.safecoincliBin = path.join(__dirname, '../../assets/bin/win64/safecoin-cli.exe'),
        shepherd.safecoincliBin = path.normalize(shepherd.safecoincliBin),
        shepherd.safecoinDir = shepherd.appConfig.dataDir.length ? shepherd.appConfig.dataDir : `${process.env.APPDATA}/Safecoin`,
        shepherd.safecoinDir = path.normalize(shepherd.safecoinDir);
        shepherd.chipsBin = path.join(__dirname, '../../assets/bin/win64/chipsd.exe'),
        shepherd.chipsBin = path.normalize(shepherd.chipsBin),
        shepherd.chipscliBin = path.join(__dirname, '../../assets/bin/win64/chips-cli.exe'),
        shepherd.chipscliBin = path.normalize(shepherd.chipscliBin),
        shepherd.chipsDir = `${process.env.APPDATA}/Chips`,
        shepherd.chipsDir = path.normalize(shepherd.chipsDir);
        shepherd.zcashParamsDir = `${process.env.APPDATA}/ZcashParams`;
        shepherd.zcashParamsDir = path.normalize(shepherd.zcashParamsDir);
        shepherd.coindRootDir = path.join(__dirname, '../../assets/bin/osx/dex/coind');
        shepherd.coindRootDir = path.normalize(shepherd.coindRootDir);
        shepherd.mmBin = path.join(__dirname, '../../node_modules/marketmaker/bin/win32/x64/marketmaker.exe');
        shepherd.mmBin = path.normalize(shepherd.mmBin);
        break;
    }
  }

  return shepherd;
};