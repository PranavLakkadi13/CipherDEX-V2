async function deployPair() {
    const accounts = await hre.ethers.getSigners();
    const contractOwner = accounts[0];

    const contractFactory = await ethers.getContractFactory("Pair");
    const contract = await contractFactory.connect(contractOwner).deploy(); 
    await contract.waitForDeployment();
    const address = await contract.getAddress();

    console.log("Contract has been deployed!!!")

    return {address, contract}
}

module.exports = {
    deployPair
};