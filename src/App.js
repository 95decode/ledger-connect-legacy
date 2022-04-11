import React, { useState } from 'react';
import ConnectLedger from './module/connectLedger.js';
import SaraModule from './module/saraModule.js';
import MultiSigModule from './module/multiSigModule.js';

function App() {
  const [transport, setTransport] = useState(undefined);
  const [eth, setEth] = useState(undefined);
  const [address, setAddress] = useState(undefined);

  const saveInfo = (info) => {
    setAddress(info.address);
    setEth(info.eth);
    setTransport(info.transport);
  }

  const ref = require('./reference/reference.json');

  return (
    <div className='container'>
      <br></br>{ !transport ? null : "My Wallet Address : "}
      <a href={ref.bsc.testnet.scan.addr + address} target="_blank" rel="noreferrer">{ !transport ? null : address }</a><br></br><br></br><br></br>
      { !transport ? <ConnectLedger onTransport={(info) => saveInfo(info)}></ConnectLedger> : <SaraModule address={address} eth={eth}></SaraModule> }
      <br></br><br></br><br></br><br></br>
      { !transport ? null : <MultiSigModule address={address} eth={eth}></MultiSigModule> }
    </div>
  );
}

export default App;
