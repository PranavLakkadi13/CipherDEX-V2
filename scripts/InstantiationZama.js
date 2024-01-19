const { createInstance } = require("fhevmjs");
const { ethers } = require("ethers");
const { DEVNET_URL, zama_devnet } = require("../helper-hardhat-config");

let instance;
let provider;
let chainID;

provider = new ethers.providers.JsonRpcProvider(zama_devnet);
chainID = 8011;

const getInstance = async () => {
   if (instance) return instance;

   // 1. Get chain id
   const network = await provider.detectNetwork();
   const chainId = +network.chainId.toString();
   console.log("The chainId of zama is " + chainId)

   // 2. Get blockchain public key
   const ret = await provider.call({
    // fhe lib address, may need to be changed depending on network
    to: "0x000000000000000000000000000000000000005d",
    // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
    data: "0xd9d47bb001",
  });

   console.log("Got the public key");

   const { defaultAbiCoder } = ethers.utils;
   const decoded = defaultAbiCoder.decode(["bytes"], ret);
  const publicKey = decoded[0];

   // 3. Create instance
   instance = createInstance({ chainId, publicKey });

   console.log("Initiated!!!");
   return instance;
}

module.exports = {
   getInstance,
   provider
}
