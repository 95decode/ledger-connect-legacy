import { Contract } from 'ethers';

const abi = require('../abi/multiSigWallet.json');
const contract = require('../contract/contract.json');

const getMultiSigWallet = (provider) =>
  new Promise( async (resolve, reject) => {
    if(provider) {
      const multiSigContract = new Contract(
        contract.multiSigWallet.address,
        abi,
        provider
      );
      resolve({multiSigContract});
      return;
    }
    reject('Provider not recognized');
  });

export default getMultiSigWallet;
