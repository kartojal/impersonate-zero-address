# impersonate-zero-address
Repository to explain a possible bug at `Hardhat` or `ethereumjs-util`, while trying to impersonate the 20-bytes long zero address.

## Get started
To see the stacktrace of the possible bug, a small test have been done. Run the next commands to execute tests.
```
npm i
npm run test 
```

The output should be:

```
  0 passing (637ms)
  1 failing

  1) Greeter
       Should return the new greeting once it's changed:
     Error: The nonce generation function failed, or the private key was invalid
      at Object.ecdsaSign (node_modules/secp256k1/lib/index.js:265:17)
      at Object.exports.sign (node_modules/ethereumjs-util/src/secp256k1v3-adapter.ts:334:25)
      at Object.exports.ecsign (node_modules/ethereumjs-util/src/signature.ts:20:25)
      at FakeTransaction.Transaction.sign (node_modules/ethereumjs-tx/src/transaction.ts:270:17)
      at FakeTransaction.hash (node_modules/ethereumjs-tx/src/fake.ts:57:12)
      at HardhatNode._transactionWasSuccessful (node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:1131:70)
      at HardhatNode._validateTransaction (node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:1152:14)
      at HardhatNode.runTransactionInNewBlock (node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:265:16)
      at EthModule._sendTransactionAndReturnHash (node_modules/hardhat/src/internal/hardhat-network/provider/modules/eth.ts:1303:26)
      at EthModule._sendTransactionAction (node_modules/hardhat/src/internal/hardhat-network/provider/modules/eth.ts:867:17)
      at processTicksAndRejections (internal/process/task_queues.js:97:5)
      at HardhatNetworkProvider.request (node_modules/hardhat/src/internal/hardhat-network/provider/provider.ts:102:18)
      at EthersProviderWrapper.send (node_modules/@nomiclabs/hardhat-ethers/src/ethers-provider-wrapper.ts:13:20)

```
