const { FhenixClient } = require("fhenixjs");
const {ethers} = require("ethers");
const { FhenixTestnet } = require("../helper-hardhat-config");

const provider = new ethers.providers.JsonRpcProvider(FhenixTestnet);

let _instance;

const getInstance = async () => {
    // if you want to use a singleton pattern
    if (_instance) return _instance;
    
    // Get chain id
    const chainId = await provider.getNetwork()
    console.log(`what dis: ${chainId.chainId}`)
  
    // Get blockchain public key
    const publicKey = await provider.call({ 
      to: '0x0000000000000000000000000000000000000044' 
    });
  
    // Create instance
    _instance = C({ chainId, publicKey });

    console.log("instance has been created ");

    return _instance;
};

getInstance()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });