# ledger-test
Ledger Nano X repository for test  
크롬 브라우저와 Ledger Nano X의 블루투스 연결이 자주 끊깁니다.  
매번 Nonce 값을 불러와서 서명하기 때문에 Nonce 값이 변하지 않았다면 같은 트랜잭션이 두번 요청되지 않습니다.  
요청이 처리되지 않으면 다시 요청하면 됩니다.  

## Page
| Page | Link |
| ------ | ------ |
| Remix | https://remix.ethereum.org/ |
| BSC scan | https://bscscan.com/ |
| BSC testnet scan | https://testnet.bscscan.com/ |
| Ledger | https://www.ledger.com/start/ |

## Deploy Process
multiSigWallet.sol >> saraBEP20.sol 순서로 배포
- multiSigWallet contract 배포 시 required 값, 모든 owner의 address 배열을 input으로 넣고 배포
- saraBEP20 contract 배포 직후 Token contract owner를 MultiSigWallet contract address로 변경

## Run
컨트랙트 배포 후 repo/src/contract/contract.json 수정 필요
```
npm install
npm run start
```

## Multi Signature Wallet
BNB 전송 시 input 값은 다음과 같이 입력 후 submitTransaction() 호출
| key | value |
| ------ | ------ |
| destination | recipient address |
| value | amount |
| data | 미입력 |

SARA 전송 및 transaction 요청 시 input 값은 다음과 같이 입력 후 submitTransaction() 호출
| key | value |
| ------ | ------ |
| destination | contract address |
| value | 0 |
| data | 웹페이지에서 추출한 contract method의  dataPayload 값 |
