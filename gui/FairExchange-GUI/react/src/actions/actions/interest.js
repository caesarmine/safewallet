import { triggerToaster } from '../actionCreators';
import Config from '../../config';
import Store from '../../store';

export function getListUnspent(coin) {
  return new Promise((resolve, reject) => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: 'listunspent',
    };

    const _fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'payload': payload }),
    };

    fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/cli`,
      _fetchConfig
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'getListUnspent',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      if (json &&
          json.result &&
          json.result.length) {
        let _spendable = [];

        for (let i = 0; i < json.result.length; i++) {
          if (json.result[i].spendable) {
            _spendable.push(json.result[i]);
          }
        }

        json.result = _spendable;
      }

      resolve(json.result ? json.result : json);
    })
  });
}

export function getRawTransaction(coin, txid) {
  return new Promise((resolve, reject) => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: 'getrawtransaction',
      params: [
        txid,
        1
      ],
    };

    const _fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'payload': payload }),
    };

    fetch(
      `http://127.0.0.1:${Config.safewalletPort}/shepherd/cli`,
      _fetchConfig
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'getTransaction',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(json.result ? json.result : json);
    })
  });
}