import React, { useState } from 'react';
import getMultiSigWallet from './getMultiSigWallet.js';
import { ethers } from 'ethers';

///////////////////// 양식임
function MultiSigModule({eth,address}) {
  const [multiSigContract, setMultiSigModule] = useState(undefined);
  //const [decimals, setDecimals] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  const [url, setUrl] = useState(undefined);

  const getDecimals = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
    const { multiSigContract } = await getMultiSigWallet(provider);
    const decimals = await multiSigContract.decimals();
    setProvider(provider);
    setMultiSigModule(multiSigContract);
    setDecimals(decimals);
  };

  const updateData = async (e) => {
    e.preventDefault();
    const dataInput = e.target.elements[0].value;
    console.log(dataInput);
    console.log(multiSigContract);
    //const { data } = await multiSigContract.populateTransaction['updateData(uint256)'](dataInput);

    const unsignedTx = {
      //to: multiSigContract.address,
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
    setUrl("https://testnet.bscscan.com/tx/" + hash);
  };


  return (
    <div className='container'>
      <div className='row'>

        <div className='col-sm-4'>
          <p>Decimals : {decimals ? decimals.toString() : "unknown" }</p>
          <button onClick={() => getDecimals()}>Query</button><hr/>
        </div>

        <div className='col-sm-4'>
          <p>Change data</p>
          <form className="form-inline" onSubmit={e => updateData(e)}>
            <input type="text" className="form-control" placeholder="data"/>
            <button type="submit" className="btn btn-primary">Submit</button><hr/>
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

export default MultiSigModule;
