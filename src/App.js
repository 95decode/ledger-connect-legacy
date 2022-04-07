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

  return (
    <div className='container'>
      <br></br>{ !transport ? null : "My wallet address : " + address }<br></br><br></br><br></br>
      { !transport ? <ConnectLedger onTransport={(info) => saveInfo(info)}></ConnectLedger> : <SaraModule address={address} eth={eth}></SaraModule> }
      <br></br><br></br><br></br><br></br>
      { !transport ? null : <MultiSigModule address={address} eth={eth}></MultiSigModule> }
    </div>
  );
}

export default App;
