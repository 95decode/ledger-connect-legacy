import React, { useState } from 'react';
import getMultiSigWallet from './getMultiSigWallet.js';
import { ethers } from 'ethers';

function MultiSigModule({eth,address}) {
  const contract = require('../contract/contract.json');
  const ref = require('../reference/reference.json');
  const chainId = ref.bsc.testnet.id;
  const network = ref.bsc.testnet.network;
  const scanUrl = ref.bsc.testnet.scan.tx;
  const addrUrl = ref.bsc.testnet.scan.addr;

  // Query state
  const [owners, setOwners] = useState(undefined);
  const [transactionCount, setTransactionCount] = useState(undefined);
  const [transaction, setTransaction] = useState(undefined);

  // Tx Url
  const [getSubmitTransactionUrl, setSubmitTransactionUrl] = useState(undefined);
  const [getConfirmTransactionUrl, setConfirmTransactionUrl] = useState(undefined);
  const [getRevokeTransactionUrl, setRevokeTransactionUrl] = useState(undefined);
  const [getExecuteTransactionUrl, setExecuteTransactionUrl] = useState(undefined);

  // Data Payload
  const [getAddOwnerData, setAddOwnerData] = useState(undefined);
  const [getRemoveOwnerData, setRemoveOwnerData] = useState(undefined);
  const [getChangeRequirementData, setChangeRequirementData] = useState(undefined);

  // Query
  const getOwners = async () => {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { multiSigContract } = await getMultiSigWallet(provider);
    const owners = await multiSigContract.getOwners();

    setOwners(owners);
  };

  const getTransactionCount = async () => {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { multiSigContract } = await getMultiSigWallet(provider);
    const transactionCount = await multiSigContract.getTransactionCount();

    setTransactionCount(transactionCount);
  };

  const getTransaction = async (e) => {
    e.preventDefault();
    const _txIndex = e.target.elements[0].value;
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { multiSigContract } = await getMultiSigWallet(provider);
    const transaction = await multiSigContract.getTransaction(_txIndex);

    setTransaction(JSON.stringify(transaction));
  };

  // Transaction
  const submitTransaction = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { multiSigContract } = await getMultiSigWallet(provider);
    const _to = e.target.elements[0].value;
    const _value = e.target.elements[1].value;
    const _data = e.target.elements[2].value;
    const { data } = await multiSigContract.populateTransaction['submitTransaction(address,uint256,bytes)'](_to, _value, _data);
    const unsignedTx = {
      to: contract.multiSigWallet.address,
      value: 0,
      gasPrice: (await provider.getGasPrice())._hex,
      gasLimit: ethers.utils.hexlify(400000),
      nonce: await provider.getTransactionCount(address, "latest"),
      chainId: chainId,
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

    setSubmitTransactionUrl(scanUrl + hash);
  };

  const confirmTransaction = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { multiSigContract } = await getMultiSigWallet(provider);
    const _txIndex = e.target.elements[0].value;
    const { data } = await multiSigContract.populateTransaction['confirmTransaction(uint256)'](_txIndex);
    const unsignedTx = {
      to: contract.multiSigWallet.address,
      value: 0,
      gasPrice: (await provider.getGasPrice())._hex,
      gasLimit: ethers.utils.hexlify(210000),
      nonce: await provider.getTransactionCount(address, "latest"),
      chainId: chainId,
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

    setConfirmTransactionUrl(scanUrl + hash);
  };

  const revokeTransaction = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { multiSigContract } = await getMultiSigWallet(provider);
    const _txIndex = e.target.elements[0].value;
    const { data } = await multiSigContract.populateTransaction['revokeTransaction(uint256)'](_txIndex);
    const unsignedTx = {
      to: contract.multiSigWallet.address,
      value: 0,
      gasPrice: (await provider.getGasPrice())._hex,
      gasLimit: ethers.utils.hexlify(210000),
      nonce: await provider.getTransactionCount(address, "latest"),
      chainId: chainId,
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

    setRevokeTransactionUrl(scanUrl + hash);
  };

  const executeTransaction = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { multiSigContract } = await getMultiSigWallet(provider);
    const _txIndex = e.target.elements[0].value;
    const { data } = await multiSigContract.populateTransaction['executeTransaction(uint256)'](_txIndex);
    const unsignedTx = {
      to: contract.multiSigWallet.address,
      value: 0,
      gasPrice: (await provider.getGasPrice())._hex,
      gasLimit: ethers.utils.hexlify(400000),
      nonce: await provider.getTransactionCount(address, "latest"),
      chainId: chainId,
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

    setExecuteTransactionUrl(scanUrl + hash);
  };

  const addOwnerEncode = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { multiSigContract } = await getMultiSigWallet(provider);
    const _owner = e.target.elements[0].value;
    const { data } = await multiSigContract.populateTransaction['addOwner(address)'](_owner);

    setAddOwnerData(data);
  };

  const removeOwnerEncode = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { multiSigContract } = await getMultiSigWallet(provider);
    const _owner = e.target.elements[0].value;
    const { data } = await multiSigContract.populateTransaction['removeOwner(address)'](_owner);

    setRemoveOwnerData(data);
  };

  const changeRequirementEncode = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.JsonRpcProvider(network);
    const { multiSigContract } = await getMultiSigWallet(provider);
    const _requirement = e.target.elements[0].value;
    const { data } = await multiSigContract.populateTransaction['changeRequirement(uint256)'](_requirement);

    setChangeRequirementData(data);
  };

  return (
    <div className='container'>
      <h2>Multi Signature Wallet</h2>
      <p>Contract Address : <a href={addrUrl + contract.multiSigWallet.address} target="_blank" rel="noreferrer">{contract.multiSigWallet.address}</a></p><hr/>
      <div className='row'>

        <br></br><br></br><h4>Query</h4><hr/>
        
        <div className='col-sm-4'>
          <p>Owners : {owners ? owners.toString() : "unknown" }</p>
          <button onClick={() => getOwners()}>Query</button><hr/>
        </div>

        <div className='col-sm-4'>
          <p>TransactionCount : {transactionCount ? transactionCount.toString() : "unknown" }</p>
          <button onClick={() => getTransactionCount()}>Query</button><hr/>
        </div>

        <div className='col-sm-4'>
          <p>Transaction : {transaction ? transaction.toString() : "unknown" }</p>
          <form className="form-inline" onSubmit={e => getTransaction(e)}>
            <input type="text" className="form-control" placeholder="TxIndex(uint256)"/>
            <button type="submit" className="btn btn-primary">Query</button>
            <p>JSON Parser : <a href="http://json.parser.online.fr/" target="_blank" rel="noreferrer">json.parser.online.kr</a></p><hr/>
          </form>
        </div>

        <br></br><br></br><h4>Transaction</h4><hr/>

        <div className='col-sm-4'>
          <p>SubmitTransaction</p>
          <p>Tx Hash : <a href={getSubmitTransactionUrl} target="_blank" rel="noreferrer">{getSubmitTransactionUrl}</a></p>
          <form className="form-inline" onSubmit={e => submitTransaction(e)}>
            <input type="text" className="form-control" placeholder="To(address)"/>
            <input type="text" className="form-control" placeholder="Value(uint256)"/>
            <input type="text" className="form-control" placeholder="Data(bytes)"/>
            <button type="submit" className="btn btn-primary">Transact</button><hr/>
          </form>
        </div>

        <div className='col-sm-4'>
          <p>ConfirmTransaction</p>
          <p>Tx Hash : <a href={getConfirmTransactionUrl} target="_blank" rel="noreferrer">{getConfirmTransactionUrl}</a></p>
          <form className="form-inline" onSubmit={e => confirmTransaction(e)}>
            <input type="text" className="form-control" placeholder="TxIndex(uint256)"/>
            <button type="submit" className="btn btn-primary">Transact</button><hr/>
          </form>
        </div>

        <div className='col-sm-4'>
          <p>RevokeTransaction</p>
          <p>Tx Hash : <a href={getRevokeTransactionUrl} target="_blank" rel="noreferrer">{getRevokeTransactionUrl}</a></p>
          <form className="form-inline" onSubmit={e => revokeTransaction(e)}>
            <input type="text" className="form-control" placeholder="TxIndex(uint256)"/>
            <button type="submit" className="btn btn-primary">Transact</button><hr/>
          </form>
        </div>

        <div className='col-sm-4'>
          <p>ExecuteTransaction</p>
          <p>Tx Hash : <a href={getExecuteTransactionUrl} target="_blank" rel="noreferrer">{getExecuteTransactionUrl}</a></p>
          <form className="form-inline" onSubmit={e => executeTransaction(e)}>
            <input type="text" className="form-control" placeholder="TxIndex(uint256)"/>
            <button type="submit" className="btn btn-primary">Transact</button><hr/>
          </form>
        </div>

        <div className='col-sm-4'>
          <p>AddOwner</p>
          <p>Data Payload : {getAddOwnerData}</p>
          <form className="form-inline" onSubmit={e => addOwnerEncode(e)}>
            <input type="text" className="form-control" placeholder="Owner(address)"/>
            <button type="submit" className="btn btn-primary">GetData</button><hr/>
          </form>
        </div>

        <div className='col-sm-4'>
          <p>RemoveOwner</p>
          <p>Data Payload : {getRemoveOwnerData}</p>
          <form className="form-inline" onSubmit={e => removeOwnerEncode(e)}>
            <input type="text" className="form-control" placeholder="Owner(address)"/>
            <button type="submit" className="btn btn-primary">GetData</button><hr/>
          </form>
        </div>

        <div className='col-sm-4'>
          <p>ChangeRequirement</p>
          <p>Data Payload : {getChangeRequirementData}</p>
          <form className="form-inline" onSubmit={e => changeRequirementEncode(e)}>
            <input type="text" className="form-control" placeholder="Requirement(uint256)"/>
            <button type="submit" className="btn btn-primary">GetData</button><hr/>
          </form>
        </div>

      </div>
    </div>
  );
}

export default MultiSigModule;
