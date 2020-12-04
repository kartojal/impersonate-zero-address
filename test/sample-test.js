const HRE = require('hardhat');
const { solidity } = require('ethereum-waffle');
const chai = require('chai');
const {ethers} = HRE;
chai.use(solidity);
const {expect} = chai;

describe("Greeter", function() {
  it("Should return the new greeting once it's changed", async function() {
    const [signer,] = await HRE.ethers.getSigners();
    const tenEther = ethers.utils.parseEther('10');

    // Deploy Greeter
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    // Send ether to AddressZero
    await signer.sendTransaction({to: ethers.constants.AddressZero, value: tenEther});
    
    // Impersonate zero address
    await HRE.network.provider.request({method: 'hardhat_impersonateAccount', params: [ethers.constants.AddressZero]})
    const zeroSigner = await ethers.provider.getSigner(ethers.constants.AddressZero);
    const zeroAddressBalance = await zeroSigner.getBalance();

    // Check AddressZero balance to be 10 ether
    expect(zeroAddressBalance).to.equal(tenEther)

    /* Change greeter message with the AddressZero impersonated signer, but fails with:
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
    */
    await greeter.connect(zeroSigner).setGreeting("Hola, mundo!"); // fails here

    // Check updated greeter message
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
