import { Contract } from 'ethers';

const abi = require('../abi/saraBEP20.json');

const getSara = (provider) =>
  new Promise( async (resolve, reject) => {
    if(provider) {
      const saraContract = new Contract(
        "0x1fEF9e08e1d5851a31c1106a8dF776Be2eF65fDf",
        abi,
        provider
      );
      resolve({saraContract});
      return;
    }
    reject('Provider not recognized');
  });

export default getSara;
