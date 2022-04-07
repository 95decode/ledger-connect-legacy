import React, { useState } from 'react';
import getMultiSigWallet from './getMultiSigWallet.js';
import { ethers } from 'ethers';

function MultiSigModule({eth,address}) {
  const [multiSigContract, setMultiSigModule] = useState(undefined);
  const [provider, setProvider] = useState(undefined);

  // Query state
  const [owners, setOwners] = useState(undefined);

  // Tx Url
  const [getSubmitTransactionUrl, setSubmitTransactionUrl] = useState(undefined);

  // Query
  const getOwners = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
    const { multiSigContract } = await getMultiSigWallet(provider);
    const owners = await multiSigContract.getOwners();
    setProvider(provider);
    setMultiSigModule(multiSigContract);
    setOwners(owners);
  };

  // Transaction
  const submitTransaction = async (e) => {
    e.preventDefault();
    const _to = e.target.elements[0].value;
    const _value = e.target.elements[1].value;
    const _data = e.target.elements[2].value;
    const { data } = await multiSigContract.populateTransaction['submitTransaction(address,uint256,bytes)'](_to, _value, _data);
    const unsignedTx = {
      to: contract.multiSigWallet.address,
      value: 0,
      gasPrice: (await provider.getGasPrice())._hex,
      gasLimit: ethers.utils.hexlify(100000),
      nonce: await provider.getTransactionCount(address, "latest"),
      chainId: 97,
      data: data,
    }

    const serializedTx = ethers.utils.serializeTransaction(unsignedTx).slice(2);
    const signature = await eth.signTransaction(
      "44'/60'/0'/0/0",
      serializedTx
    );

    signature.r = "0x"+signature.r;
    signature.s = "0x"+signature.s;
    signature.v = parseInt("0x"+signature.v);
    signature.from = address;

    const signedTx = ethers.utils.serializeTransaction(unsignedTx, signature);
    const hash = (await provider.sendTransaction(signedTx)).hash;

    setSubmitTransactionUrl("https://testnet.bscscan.com/tx/" + hash);
  };

  return (
    <div className='container'>
      <h2>Multi Signature Wallet</h2><hr/>
      <div className='row'>

        <br></br><br></br><h4>Query</h4><hr/>

        <div className='col-sm-4'>
          <p>Owners : {owners ? owners.toString() : "unknown" }</p>
          <button onClick={() => getOwners()}>Query</button><hr/>
        </div>

        <br></br><br></br><h4>Transaction (회사 지갑 전용)</h4><hr/>

        <div className='col-sm-4'>
          <p>submitTransaction, Tx Hash : <a href={getSubmitTransactionUrl} target="_blank" rel="noreferrer">{getSubmitTransactionUrl}</a></p>
          <form className="form-inline" onSubmit={e => submitTransaction(e)}>
            <input type="text" className="form-control" placeholder="To(address)"/>
            <input type="text" className="form-control" placeholder="Value(uint256)"/>
            <input type="text" className="form-control" placeholder="Data(bytes)"/>
            <button type="submit" className="btn btn-primary">Transact</button><hr/>
          </form>
        </div>

      </div>
    </div>
  );
}

export default MultiSigModule;
