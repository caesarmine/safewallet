module.exports = (shepherd) => {
  /*
   *  type: POST
   *  params: herd, lastLines
   */
  shepherd.post('/debuglog', (req, res) => {
    let _herd = req.body.herdname;
    let _ac = req.body.ac;
    let _lastNLines = req.body.lastLines;
    let _location;

    if (shepherd.os.platform() === 'darwin') {
      shepherd.safecoinDir = shepherd.appConfig.dataDir.length ? shepherd.appConfig.dataDir : `${process.env.HOME}/Library/Application Support/Safecoin`;
    }

    if (shepherd.os.platform() === 'linux') {
      shepherd.safecoinDir = shepherd.appConfig.dataDir.length ? shepherd.appConfig.dataDir : `${process.env.HOME}/.safecoin`;
    }

    if (shepherd.os.platform() === 'win32') {
      shepherd.safecoinDir = shepherd.appConfig.dataDir.length ? shepherd.appConfig.dataDir : `${process.env.APPDATA}/Safecoin`;
      shepherd.safecoinDir = shepherd.path.normalize(shepherd.safecoinDir);
    }

    if (_herd === 'safecoin') {
      _location = shepherd.safecoinDir;
    }

    if (_ac) {
      _location = `${shepherd.safecoinDir}/${_ac}`;

      if (_ac === 'CHIPS') {
        _location = shepherd.chipsDir;
      }
    }

    shepherd.readDebugLog(`${_location}/debug.log`, _lastNLines)
    .then((result) => {
      const _obj = {
        msg: 'success',
        result: result,
      };

      res.end(JSON.stringify(_obj));
    }, (result) => {
      const _obj = {
        msg: 'error',
        result: result,
      };

      res.end(JSON.stringify(_obj));
    });
  });

  shepherd.get('/coind/stdout', (req, res) => {
    const _daemonName = req.query.chain !== 'safecoind' ? req.query.chain : 'safecoind';
    const _daemonLogName = `${shepherd.safewalletDir}/${_daemonName}.log`;

    shepherd.readDebugLog(_daemonLogName, 'all')
    .then((result) => {
      const _obj = {
        msg: 'success',
        result: result,
      };

      res.end(JSON.stringify(_obj));
    }, (result) => {
      const _obj = {
        msg: 'error',
        result: result,
      };

      res.end(JSON.stringify(_obj));
    });
  });

  shepherd.readDebugLog = (fileLocation, lastNLines) => {
    return new shepherd.Promise(
      (resolve, reject) => {
        if (lastNLines) {
          try {
            shepherd._fs.access(fileLocation, shepherd.fs.constants.R_OK, (err) => {
              if (err) {
                shepherd.log(`error reading ${fileLocation}`);
                shepherd.writeLog(`error reading ${fileLocation}`);
                reject(`readDebugLog error: ${err}`);
              } else {
                shepherd.log(`reading ${fileLocation}`);
                shepherd._fs.readFile(fileLocation, 'utf-8', (err, data) => {
                  if (err) {
                    shepherd.writeLog(`readDebugLog err: ${err}`);
                    shepherd.log(`readDebugLog err: ${err}`);
                  }

                  const lines = data.trim().split('\n');
                  let lastLine;

                  if (lastNLines === 'all') {
                    lastLine = data.trim();
                  } else {
                    lastLine = lines.slice(lines.length - lastNLines, lines.length).join('\n');
                  }

                  resolve(lastLine);
                });
              }
            });
          } catch (e) {
            reject(`readDebugLog error: ${e}`);
          }
        } else {
          reject('readDebugLog error: lastNLines param is not provided!');
        }
      }
    );
  };

  return shepherd;
};