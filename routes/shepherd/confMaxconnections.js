const fs = require('fs-extra');

module.exports = (shepherd) => {
  shepherd.getMaxconSAFEConf = () => {
    return new shepherd.Promise((resolve, reject) => {
      fs.readFile(`${shepherd.safecoinDir}/safecoin.conf`, 'utf8', (err, data) => {
        if (err) {
          shepherd.log('safe conf maxconnections param read failed');
          resolve('unset');
        } else {
          const _maxcon = data.match(/maxconnections=\s*(.*)/);

          if (!_maxcon) {
            shepherd.log('safe conf maxconnections param is unset');
            resolve(false);
          } else {
            shepherd.log(`safe conf maxconnections param is already set to ${_maxcon[1]}`);
            resolve(_maxcon[1]);
          }
        }
      });
    });
  }

  shepherd.setMaxconSAFEConf = (limit) => {
    return new shepherd.Promise((resolve, reject) => {
      fs.readFile(`${shepherd.safecoinDir}/safecoin.conf`, 'utf8', (err, data) => {
        const _maxconVal = limit ? 1 : 10;

        if (err) {
          shepherd.log(`error reading ${shepherd.safecoinDir}/safecoin.conf`);
          resolve(false);
        } else {
          if (data.indexOf('maxconnections=') > -1) {
            const _maxcon = data.match(/maxconnections=\s*(.*)/);

            data = data.replace(`maxconnections=${_maxcon[1]}`, `maxconnections=${_maxconVal}`);
          } else {
            data = `${data}\nmaxconnections=${_maxconVal}\n`;
          }

          fs.writeFile(`${shepherd.safecoinDir}/safecoin.conf`, data, (err) => {
            if (err) {
              shepherd.log(`error writing ${shepherd.safecoinDir}/safecoin.conf maxconnections=${_maxconVal}`);
              resolve(false);
            } else {
              shepherd.log(`safe conf maxconnections is set to ${_maxconVal}`);
              resolve(true);
            }
          });
        }
      });
    });
  }

  return shepherd;
};