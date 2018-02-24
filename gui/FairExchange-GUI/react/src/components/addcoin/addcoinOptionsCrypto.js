import { translate } from '../../translate/translate';
import mainWindow from '../../util/mainWindow';

const addCoinOptionsCrypto = () => {
  const availableSAFEModes = mainWindow.arch === 'x64' ? 'spv|native' : 'spv';

  return [{
    label: 'Safecoin (SAFE)',
    icon: 'SAFE',
    value: `SAFE|${availableSAFEModes}`,
  },
  {
    label: 'Chips (CHIPS)',
    icon: 'CHIPS',
    value: `CHIPS|spv`,
  }];
}

export default addCoinOptionsCrypto;
