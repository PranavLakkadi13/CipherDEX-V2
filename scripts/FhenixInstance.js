const { FhenixClient,getPermit,Permission } = require("fhenixjs");
const { ethers } = require("hardhat");

let instance;
let permission;

async function Instance() {

  const provider = ethers.provider;
  instance = new FhenixClient(provider);


  // return Promise.all([instance]).then(([instance]) => ({ instance}));
  return instance;
}

Instance()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

