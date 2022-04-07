import React, { useState } from 'react';
import getSara from './getSara.js';
import { ethers } from 'ethers';

function SaraModule({eth,address}) {
  const contract = require('../contract/contract.json');
  const [saraContract, setSaraModule] = useState(undefined);
  const [provider, setProvider] = useState(undefined);

  // Query
  const [owner, setOwner] = useState(undefined);
  const [decimals, setDecimals] = useState(undefined);

  // Tx Url
  const [getAuthUrl, setGetAuthUrl] = useState(undefined);
  const [getTransferFromUrl, setTransferFromUrl] = useState(undefined);

  const getOwner = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
    const { saraContract } = await getSara(provider);
    const owner = await saraContract.getOwner();
    setProvider(provider);
    setSaraModule(saraContract);
    setOwner(owner);
  };
  
  const getDecimals = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
    const { saraContract } = await getSara(provider);
    const decimals = await saraContract.decimals();
    setProvider(provider);
    setSaraModule(saraContract);
    setDecimals(decimals);
  };

  const getAuth = async (e) => {
    e.preventDefault();
    const dataInput = e.target.elements[0].value;
    const { data } = await saraContract.populateTransaction['getAuth(uint256)'](dataInput);
    const unsignedTx = {
      to: contract.sara.address,
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

    setGetAuthUrl("https://testnet.bscscan.com/tx/" + hash);
  };

  const transferFrom = async (e) => {
    e.preventDefault();
    const from = e.target.elements[0].value;
    const to = e.target.elements[1].value;
    const value = e.target.elements[2].value;
    const { data } = await saraContract.populateTransaction['transferFrom(address,address,uint256)'](from, to, value);
    const unsignedTx = {
      to: contract.sara.address,
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

    setTransferFromUrl("https://testnet.bscscan.com/tx/" + hash);
  };

  return (
    <div className='container'>
      <div className='row'>

        <div className='col-sm-4'>
          <p>Decimals : {decimals ? decimals.toString() : "unknown" }</p>
          <button onClick={() => getDecimals()}>Query</button><hr/>
        </div>

        <div className='col-sm-4'>
          <p>Owner : {owner ? owner.toString() : "unknown" }</p>
          <button onClick={() => getOwner()}>Query</button><hr/>
        </div>

        <div className='col-sm-4'>
          <p>getAuth, Tx Hash : <a href={getAuthUrl} target="_blank" rel="noreferrer">{getAuthUrl}</a></p>
          <form className="form-inline" onSubmit={e => getAuth(e)}>
            <input type="text" className="form-control" placeholder="Value(uint256)"/>
            <button type="submit" className="btn btn-primary">Transact</button><hr/>
          </form>
        </div>

        <div className='col-sm-4'>
          <p>transferFrom, Tx Hash : <a href={getTransferFromUrl} target="_blank" rel="noreferrer">{getTransferFromUrl}</a></p>
          <form className="form-inline" onSubmit={e => transferFrom(e)}>
            <input type="text" className="form-control" placeholder="From(address)"/>
            <input type="text" className="form-control" placeholder="To(address)"/>
            <input type="text" className="form-control" placeholder="Value(uint256)"/>
            <button type="submit" className="btn btn-primary">Transact</button><hr/>
          </form>
        </div>

      </div>
    </div>
  );
}

export default SaraModule;
