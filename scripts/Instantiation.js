const { createInstance } = require("fhevmjs");
const {  ethers } = require("hardhat");
const { DEVNET_URL, zama_devnet } = require("../helper-hardhat-config");

let instance;
let provider;
let chainID;

provider =  new ethers.providers.JsonRpcProvider(zama_devnet)
chainID = 8011;

const getInstance = async () => {
    if (instance) return instance;

    // const network = new ethers.providers.getNetwork();

    let fhePublicKey;
    fhePublicKey = await provider.call({ to: "0x0000000000000000000000000000000000000044" });

    instance = await createInstance({
        chainId: 8009,
        publicKey: fhePublicKey,
      });

    console.log("ran the instance successfully")
    
    return instance;
}

module.exports = {
    getInstance,
    provider
}