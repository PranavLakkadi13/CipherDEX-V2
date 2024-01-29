const { FhenixClient } = require("fhenixjs");
const { ethers } = require("hardhat");

let instance;
let permission;

async function Instance(contractAddress) {

  const provider = ethers.provider;
  instance = new FhenixClient({provider});
  
  console.log("The Instance has been created");
  return instance;
}

module.exports = {
  Instance
}
