module.exports = (shepherd) => {
  shepherd.log = (msg, isSpvOut) => {
    if (shepherd.appConfig.dev ||
        shepherd.appConfig.debug) {
      console.log(msg);
    }

    if (!isSpvOut) {
      shepherd.appRuntimeLog.push({
        time: Date.now(),
        msg: msg,
      });
    } else {
      shepherd.appRuntimeSPVLog.push({
        time: Date.now(),
        msg: msg,
      });
    }
  }

  shepherd.writeLog = (data) => {
    const logLocation = `${shepherd.safewalletDir}/shepherd`;
    const timeFormatted = new Date(Date.now()).toLocaleString('en-US', { hour12: false });

    if (shepherd.appConfig.debug) {
      if (shepherd.fs.existsSync(`${logLocation}/safewalletlog.txt`)) {
        shepherd.fs.appendFile(`${logLocation}/safewalletlog.txt`, `${timeFormatted}  ${data}\r\n`, (err) => {
          if (err) {
            shepherd.log('error writing log file');
          }
        });
      } else {
        shepherd.fs.writeFile(`${logLocation}/safewalletlog.txt`, `${timeFormatted}  ${data}\r\n`, (err) => {
          if (err) {
            shepherd.log('error writing log file');
          }
        });
      }
    }
  }

  shepherd.get('/log/runtime', (req, res, next) => {
    const successObj = {
      msg: 'success',
      result: req.query.spv && req.query.spv === 'true' ? shepherd.appRuntimeSPVLog : shepherd.appRuntimeLog,
    };

    res.end(JSON.stringify(successObj));
  });

  shepherd.getAppRuntimeLog = () => {
    return new shepherd.Promise((resolve, reject) => {
      resolve(shepherd.appRuntimeLog);
    });
  };

  /*
   *  type: POST
   *  params: payload
   */
  shepherd.post('/guilog', (req, res, next) => {
    const logLocation = `${shepherd.safewalletDir}/shepherd`;

    if (!shepherd.guiLog[shepherd.appSessionHash]) {
      shepherd.guiLog[shepherd.appSessionHash] = {};
    }

    if (shepherd.guiLog[shepherd.appSessionHash][req.body.timestamp]) {
      shepherd.guiLog[shepherd.appSessionHash][req.body.timestamp].status = req.body.status;
      shepherd.guiLog[shepherd.appSessionHash][req.body.timestamp].response = req.body.response;
    } else {
      shepherd.guiLog[shepherd.appSessionHash][req.body.timestamp] = {
        function: req.body.function,
        type: req.body.type,
        url: req.body.url,
        payload: req.body.payload,
        status: req.body.status,
      };
    }

    shepherd.fs.writeFile(`${logLocation}/safewalletlog.json`, JSON.stringify(shepherd.guiLog), (err) => {
      if (err) {
        shepherd.writeLog('error writing gui log file');
      }

      const returnObj = {
        msg: 'success',
        result: 'gui log entry is added',
      };

      res.end(JSON.stringify(returnObj));
    });
  });

  /*
   *  type: GET
   *  params: type
   */
  shepherd.get('/getlog', (req, res, next) => {
    const logExt = req.query.type === 'txt' ? 'txt' : 'json';

    if (shepherd.fs.existsSync(`${shepherd.safewalletDir}/shepherd/safewalletlog.${logExt}`)) {
      shepherd.fs.readFile(`${shepherd.safewalletDir}/shepherd/safewalletlog.${logExt}`, 'utf8', (err, data) => {
        if (err) {
          const errorObj = {
            msg: 'error',
            result: err,
          };

          res.end(JSON.stringify(errorObj));
        } else {
          const successObj = {
            msg: 'success',
            result: data ? JSON.parse(data) : '',
          };

          res.end(JSON.stringify(successObj));
        }
      });
    } else {
      const errorObj = {
        msg: 'error',
        result: `safewallet.${logExt} doesnt exist`,
      };

      res.end(JSON.stringify(errorObj));
    }
  });

  shepherd.printDirs = () => {
    shepherd.log(`safewallet dir: ${shepherd.safewalletDir}`);
    shepherd.log('--------------------------')
    shepherd.log(`safecoin dir: ${shepherd.safecoindBin}`);
    shepherd.log(`safecoin bin: ${shepherd.safecoinDir}`);
    shepherd.writeLog(`safewallet dir: ${shepherd.safewalletDir}`);
    shepherd.writeLog(`safecoin dir: ${shepherd.safecoindBin}`);
    shepherd.writeLog(`safecoin bin: ${shepherd.safecoinDir}`);
  }

  return shepherd;
};