import React, { useState } from 'react';
import getSara from './getSara.js';
import { ethers } from 'ethers';

function SaraModule({eth,address}) {
  const contract = require('../contract/contract.json');
  const network = 'https://data-seed-prebsc-1-s1.binance.org:8545';
  const scanUrl = 'https://testnet.bscscan.com/tx/';

  const [saraContract, setSaraModule] = useState(undefined);
  const [provider, setProvider] = useState(undefined);

  // Query state
  const [owner, setOwner] = useState(undefined);
  const [decimals, setDecimals] = useState(undefined);
  const [symbol, setSymbol] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [totalSupply, setTotalSupply] = useState(undefined);
  const [balanceOf, setBalanceOf] = useState(undefined);
  const [allowance, setAllowance] = useState(undefined);

  // Tx Url
  const [getAuthUrl, setGetAuthUrl] = useState(undefined);
  const [getTransferFromUrl, setTransferFromUrl] = useState(undefined);
  const [getMintUrl, setMintUrl] = useState(undefined);
  const [getApproveUrl, setApproveUrl] = useState(undefined);
  const [getTransferUrl, setTransferUrl] = useState(undefined);
  const [getIncreaseAllowanceUrl, setIncreaseAllowanceUrl] = useState(undefined);
  const [getDecreaseAllowanceUrl, setDecreaseAllowanceUrl] = useState(undefined);

  // Query
  const getOwner = async () => {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { saraContract } = await getSara(provider);
    const owner = await saraContract.getOwner();
    setProvider(provider);
    setSaraModule(saraContract);
    setOwner(owner);
  };
  
  const getDecimals = async () => {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { saraContract } = await getSara(provider);
    const decimals = await saraContract.decimals();
    setProvider(provider);
    setSaraModule(saraContract);
    setDecimals(decimals);
  };

  const getSymbol = async () => {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { saraContract } = await getSara(provider);
    const symbol = await saraContract.symbol();
    setProvider(provider);
    setSaraModule(saraContract);
    setSymbol(symbol);
  };

  const getName = async () => {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { saraContract } = await getSara(provider);
    const name = await saraContract.name();
    setProvider(provider);
    setSaraModule(saraContract);
    setName(name);
  };

  const getTotalSupply = async () => {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { saraContract } = await getSara(provider);
    const totalSupply = await saraContract.totalSupply();
    setProvider(provider);
    setSaraModule(saraContract);
    setTotalSupply(totalSupply);
  };

  const getBalanceOf = async (e) => {
    e.preventDefault();
    const _account = e.target.elements[0].value;
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { saraContract } = await getSara(provider);
    const balanceOf = await saraContract.balanceOf(_account);
    setProvider(provider);
    setSaraModule(saraContract);
    setBalanceOf(balanceOf);
  };

  const getAllowance = async (e) => {
    e.preventDefault();
    const _owner = e.target.elements[0].value;
    const _spender = e.target.elements[0].value;
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { saraContract } = await getSara(provider);
    const allowance = await saraContract.allowance(_owner, _spender);
    setProvider(provider);
    setSaraModule(saraContract);
    setAllowance(allowance);
  };

  // Transaction
  const transfer = async (e) => {
    e.preventDefault();
    const _recipient = e.target.elements[0].value;
    const _amount = e.target.elements[1].value;
    const { data } = await saraContract.populateTransaction['transfer(address,uint256)'](_recipient, _amount);
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

    setTransferUrl(scanUrl + hash);
  };

  const approve = async (e) => {
    e.preventDefault();
    const _spender = e.target.elements[0].value;
    const _amount = e.target.elements[1].value;
    const { data } = await saraContract.populateTransaction['approve(address,uint256)'](_spender, _amount);
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

    setApproveUrl(scanUrl + hash);
  };

  const increaseAllowance = async (e) => {
    e.preventDefault();
    const _spender = e.target.elements[0].value;
    const _addedValue = e.target.elements[1].value;
    const { data } = await saraContract.populateTransaction['increaseAllowance(address,uint256)'](_spender, _addedValue);
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

    setIncreaseAllowanceUrl(scanUrl + hash);
  };

  const decreaseAllowance = async (e) => {
    e.preventDefault();
    const _spender = e.target.elements[0].value;
    const _subtractedValue = e.target.elements[1].value;
    const { data } = await saraContract.populateTransaction['decreaseAllowance(address,uint256)'](_spender, _subtractedValue);
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

    setDecreaseAllowanceUrl(scanUrl + hash);
  };

  const mint = async (e) => {
    e.preventDefault();
    const _amount = e.target.elements[0].value;
    const { data } = await saraContract.populateTransaction['mint(uint256)'](_amount);
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

    setMintUrl(scanUrl + hash);
  };

  const getAuth = async (e) => {
    e.preventDefault();
    const _amount = e.target.elements[0].value;
    const { data } = await saraContract.populateTransaction['getAuth(uint256)'](_amount);
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

    setGetAuthUrl(scanUrl + hash);
  };

  const transferFrom = async (e) => {
    e.preventDefault();
    const _sender = e.target.elements[0].value;
    const _recipient = e.target.elements[1].value;
    const _amount = e.target.elements[2].value;
    const { data } = await saraContract.populateTransaction['transferFrom(address,address,uint256)'](_sender, _recipient, _amount);
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

    setTransferFromUrl(scanUrl + hash);
  };

  return (
    <div className='container'>
      <h2>Sara Token</h2>
      <p>Contract Address : {contract.sara.address}</p><hr/>
      <div className='row'>

        <br></br><br></br><h4>Query</h4><hr/>

        <div className='col-sm-4'>
          <p>Decimals : {decimals ? decimals.toString() : "unknown" }</p>
          <button onClick={() => getDecimals()}>Query</button><hr/>
        </div>

        <div className='col-sm-4'>
          <p>Owner : {owner ? owner.toString() : "unknown" }</p>
          <button onClick={() => getOwner()}>Query</button><hr/>
        </div>

        <div className='col-sm-4'>
          <p>Symbol : {symbol ? symbol.toString() : "unknown" }</p>
          <button onClick={() => getSymbol()}>Query</button><hr/>
        </div>

        <div className='col-sm-4'>
          <p>Name : {name ? name.toString() : "unknown" }</p>
          <button onClick={() => getName()}>Query</button><hr/>
        </div>

        <div className='col-sm-4'>
          <p>TotalSupply : {totalSupply ? totalSupply.toString() : "unknown" }</p>
          <button onClick={() => getTotalSupply()}>Query</button><hr/>
        </div>

        <div className='col-sm-4'>
          <p>BalanceOf : {balanceOf ? balanceOf.toString() : "unknown" }</p>
          <form className="form-inline" onSubmit={e => getBalanceOf(e)}>
            <input type="text" className="form-control" placeholder="Account(address)"/>
            <button type="submit" className="btn btn-primary">Query</button><hr/>
          </form>
        </div>

        <div className='col-sm-4'>
          <p>Allowance : {allowance ? allowance.toString() : "unknown" }</p>
          <form className="form-inline" onSubmit={e => getAllowance(e)}>
            <input type="text" className="form-control" placeholder="Owner(address)"/>
            <input type="text" className="form-control" placeholder="Spender(address)"/>
            <button type="submit" className="btn btn-primary">Query</button><hr/>
          </form>
        </div>

        <br></br><br></br><h4>Transaction (개인 지갑 전용)</h4><hr/>

        <div className='col-sm-4'>
          <p>GetAuth, Tx Hash : <a href={getAuthUrl} target="_blank" rel="noreferrer">{getAuthUrl}</a></p>
          <form className="form-inline" onSubmit={e => getAuth(e)}>
            <input type="text" className="form-control" placeholder="Amount(uint256)"/>
            <button type="submit" className="btn btn-primary">Transact</button><hr/>
          </form>
        </div>

        <div className='col-sm-4'>
          <p>TransferFrom, Tx Hash : <a href={getTransferFromUrl} target="_blank" rel="noreferrer">{getTransferFromUrl}</a></p>
          <form className="form-inline" onSubmit={e => transferFrom(e)}>
            <input type="text" className="form-control" placeholder="Sender(address)"/>
            <input type="text" className="form-control" placeholder="Recipient(address)"/>
            <input type="text" className="form-control" placeholder="Amount(uint256)"/>
            <button type="submit" className="btn btn-primary">Transact</button><hr/>
          </form>
        </div>

        <div className='col-sm-4'>
          <p>Mint, Tx Hash : <a href={getMintUrl} target="_blank" rel="noreferrer">{getMintUrl}</a></p>
          <form className="form-inline" onSubmit={e => mint(e)}>
            <input type="text" className="form-control" placeholder="Amount(uint256)"/>
            <button type="submit" className="btn btn-primary">Transact</button><hr/>
          </form>
        </div>

        <div className='col-sm-4'>
          <p>Approve, Tx Hash : <a href={getApproveUrl} target="_blank" rel="noreferrer">{getApproveUrl}</a></p>
          <form className="form-inline" onSubmit={e => approve(e)}>
            <input type="text" className="form-control" placeholder="Spender(address)"/>
            <input type="text" className="form-control" placeholder="Amount(uint256)"/>
            <button type="submit" className="btn btn-primary">Transact</button><hr/>
          </form>
        </div>

        <div className='col-sm-4'>
          <p>IncreaseAllowance, Tx Hash : <a href={getIncreaseAllowanceUrl} target="_blank" rel="noreferrer">{getIncreaseAllowanceUrl}</a></p>
          <form className="form-inline" onSubmit={e => increaseAllowance(e)}>
            <input type="text" className="form-control" placeholder="Spender(address)"/>
            <input type="text" className="form-control" placeholder="AddedValue(uint256)"/>
            <button type="submit" className="btn btn-primary">Transact</button><hr/>
          </form>
        </div>

        <div className='col-sm-4'>
          <p>DecreaseAllowance, Tx Hash : <a href={getDecreaseAllowanceUrl} target="_blank" rel="noreferrer">{getDecreaseAllowanceUrl}</a></p>
          <form className="form-inline" onSubmit={e => decreaseAllowance(e)}>
            <input type="text" className="form-control" placeholder="Spender(address)"/>
            <input type="text" className="form-control" placeholder="SubtractedValue(uint256)"/>
            <button type="submit" className="btn btn-primary">Transact</button><hr/>
          </form>
        </div>

        <div className='col-sm-4'>
          <p>Transfer, Tx Hash : <a href={getTransferUrl} target="_blank" rel="noreferrer">{getTransferUrl}</a></p>
          <form className="form-inline" onSubmit={e => transfer(e)}>
            <input type="text" className="form-control" placeholder="Recipient(address)"/>
            <input type="text" className="form-control" placeholder="Amount(uint256)"/>
            <button type="submit" className="btn btn-primary">Transact</button><hr/>
          </form>
        </div>

      </div>
    </div>
  );
}

export default SaraModule;
