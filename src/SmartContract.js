import React, { useState } from 'react';
import getBlockchain from './ethereum.js';
import { ethers } from 'ethers';

function SmartContract({eth,address}) {
  const [simpleStorage, setSimpleStorage] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  const [url, setUrl] = useState(undefined);

  const smartContractRead = async() => {
    const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
    const { simpleStorage } = await getBlockchain(provider);
    console.log(simpleStorage);
    const data = await simpleStorage.decimals();
    setProvider(provider);
    setSimpleStorage(simpleStorage);
    setData(data);
  };

  const updateData = async e => {
    e.preventDefault();
    //const dataInput = e.target.elements[0].value;
    console.log(simpleStorage);
    //const { data } = await simpleStorage.populateTransaction['updateData(uint256)'](dataInput);

    const unsignedTx = {
      //to: simpleStorage.address,
      to: "0xee325C9c0d7e8b6A747eC016318A6b1e2d0248aD",
      value: ethers.utils.hexlify(100000),
      gasPrice: (await provider.getGasPrice())._hex,
      gasLimit: ethers.utils.hexlify(100000),
      nonce: await provider.getTransactionCount(address, "latest"),
      chainId: 97,
      data: "",
    }
    console.log(unsignedTx);
    const serializedTx = ethers.utils.serializeTransaction(unsignedTx).slice(2);

    console.log(serializedTx);
    const signature = await eth.signTransaction(
      "44'/60'/0'/0/0",
      serializedTx
    );

    console.log(signature);
    //Parse the signature
    signature.r = "0x"+signature.r;
    signature.s = "0x"+signature.s;
    signature.v = parseInt("0x"+signature.v);
    signature.from = address;
    console.log(signature);

    //Serialize the same transaction as before, but adding the signature on it
    const signedTx = ethers.utils.serializeTransaction(unsignedTx, signature);
    console.log(signedTx);

    const hash = (await provider.sendTransaction(signedTx)).hash;
    console.log(hash);
    setUrl("https://testnet.bscscan.com/tx" + hash);
  };


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-4'>
          <p>Data:</p>
          <p>{data ? data.toString() : "..." }</p>
          <button onClick={() => smartContractRead()}>Get Data</button>
        </div>
        <div className='col-sm-4'>
          <p>Change data</p>
          <form className="form-inline" onSubmit={e => updateData(e)}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="data"
            />
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="mt-5 mx-auto d-flex flex-column">
          <p>
            HASH :
          </p>
          <p><a href={url} target="_blank" rel="noreferrer">{url}</a></p>
        </div>
      </div>
    </div>
  );
}

export default SmartContract;
