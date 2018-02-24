module.exports = (shepherd) => {
  shepherd.startSPV = (coin) => {
    if (coin === 'SAFE+REVS+JUMBLR') {
      shepherd.addElectrumCoin('SAFE');
      shepherd.addElectrumCoin('REVS');
      shepherd.addElectrumCoin('JUMBLR');
    } else {
      shepherd.addElectrumCoin(coin);
    }
  }

  shepherd.startSAFENative = (selection, isManual) => {
    if (isManual) {
      shepherd.safeMainPassiveMode = true;
    }

    if (selection === 'SAFE') {
      const herdData = {
        'ac_name': 'safecoind',
        'ac_options': [
          '-daemon=0',
          '-addnode=35.231.110.175',
        ],
      };

      const options = {
        url: `http://127.0.0.1:${shepherd.appConfig.safewalletPort}/shepherd/herd`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          herd: 'safecoind',
          options: herdData,
        })
      };

      shepherd.request(options, (error, response, body) => {
        if (response &&
            response.statusCode &&
            response.statusCode === 200) {
          //resolve(body);
        } else {
          //resolve(body);
        }
      });
    } else {
      const herdData = [{
        'ac_name': 'safecoind',
        'ac_options': [
          '-daemon=0',
          '-addnode=35.231.110.175',
        ]
      }, {
        'ac_name': 'REVS',
        'ac_options': [
          '-daemon=0',
          '-server',
          `-ac_name=REVS`,
          '-addnode=35.231.110.175',
          '-ac_supply=1300000'
        ]
      }, {
        'ac_name': 'JUMBLR',
        'ac_options': [
          '-daemon=0',
          '-server',
          `-ac_name=JUMBLR`,
          '-addnode=35.231.110.175',
          '-ac_supply=999999'
        ]
      }];

      for (let i = 0; i < herdData.length; i++) {
        setTimeout(() => {
          const options = {
            url: `http://127.0.0.1:${shepherd.appConfig.safewalletPort}/shepherd/herd`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              herd: 'safecoind',
              options: herdData[i],
            })
          };

          shepherd.request(options, (error, response, body) => {
            if (response &&
                response.statusCode &&
                response.statusCode === 200) {
              //resolve(body);
            } else {
              //resolve(body);
            }
          });
        }, 100);
      }
    }
  };

  return shepherd;
};
