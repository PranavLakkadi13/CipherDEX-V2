const { network , ethers } = require("hardhat");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deployer} = await getNamedAccounts();
    const {deploy,log} = deployments;
    const chainid = network.config.chainId;
    log("deploy to the chainId " + chainid);

    const MockBTC = await deployments.get("MockBTC");
    const MockETH = await deployments.get("MockETH");

    // args = [MockBTC.address,MockETH.address];
    // const args = ["0x369B5466d3797f808b7b5C033d5175CdBcD8E9F0","0x9f7c110794c259088Eaa22B608b508f968E0c6b7"];

    const SimpleFHE = await deploy("SimpleFHE", {
        args: [],
        from: deployer,
        log: true,
    });

    log(`The address of the deployed contract ${SimpleFHE.address}`);
    log("------------------------------------------------------------------------");

}

module.exports.tags = ["all", "SimpleFHE"];