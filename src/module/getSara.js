import { Contract } from 'ethers';

const abi = require('../abi/saraBEP20.json');
const contract = require('../contract/contract.json');

const getSara = (provider) =>
  new Promise( async (resolve, reject) => {
    if(provider) {
      const saraContract = new Contract(
        contract.sara.address,
        abi,
        provider
      );
      resolve({saraContract});
      return;
    }
    reject('Provider not recognized');
  });

export default getSara;
