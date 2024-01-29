const { network , ethers } = require("hardhat");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deployer} = await getNamedAccounts();
    const {deploy,log} = deployments;
    const chainid = network.config.chainId;
    log("deploy to the chainId " + chainid);

    args = [];

    const MockFHE = await deploy("MockFHE", {
        args: args,
        from: deployer,
        log: true,
    });

    log(`The address of the deployed contract ${MockFHE.address}`);
    log("------------------------------------------------------------------------");

}

module.exports.tags = ["all", "MockFHE"];