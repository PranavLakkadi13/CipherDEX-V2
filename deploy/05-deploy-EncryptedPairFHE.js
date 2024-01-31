const { network , ethers } = require("hardhat");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deployer} = await getNamedAccounts();
    const {deploy,log} = deployments;
    const chainid = network.config.chainId;
    log("deploy to the chainId " + chainid);

    const MockBTC = await deployments.get("MockBTC");
    const MockETH = await deployments.get("MockETH");
    const accounts = await ethers.getSigners();

    args = [];

    const Pair = await deploy("Pair", {
        args: args,
        from: deployer,
        log: true,
    });

    log(`The address of the deployed contract ${Pair.address}`);
    log("------------------------------------------------------------------------");

}

module.exports.tags = ["all", "Pair"];