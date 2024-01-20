const { createInstance } = require("fhevmjs");
const {  ethers, network } = require("hardhat");

let instance;
let provider;
let chainID;

provider = new ethers.providers.Web3Provider(network.provider)
chainID = 8011;

const getInstance = async () => {
    if (instance) return instance;

    const network =  await provider.getNetwork();

    let fhePublicKey = await provider.call({ to: "0x0000000000000000000000000000000000000044" });
    // const fhePublicKey = await provider.call({
    //     // fhe lib address, may need to be changed depending on network
    //     to: "0x000000000000000000000000000000000000005d",
    //     // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
    //     // data: "0xd9d47bb001",
    //   });

    instance = await createInstance({
        chainId: chainID,
        publicKey: fhePublicKey,
      });

    console.log("ran the instance successfully")
    
    return instance;
}

module.exports = {
    getInstance,
    provider
 }