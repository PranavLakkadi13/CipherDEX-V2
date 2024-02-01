const { ethers } = require("hardhat");

async function deployPair() {
    const accounts = await ethers.getSigners();
    const contractOwner = accounts[0];

    const contractFactory = await ethers.deployContract("Pair",contractOwner);
    // const contract = await contractFactory.deploy(); 
    const address = await contract.getAddress();

    console.log("Contract has been deployed!!!")

    return {address, contract}
}

module.exports = {
    deployPair
};