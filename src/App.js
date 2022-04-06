import React, { useState } from 'react';
import ConnectLedger from './module/connectLedger.js';
import SaraModule from './module/saraModule.js';

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
      { !transport ?
        <ConnectLedger onTransport={(info) => saveInfo(info)}></ConnectLedger> :
        <SaraModule address={address} eth={eth}></SaraModule>
      }
    </div>
  );
}

export default App;
