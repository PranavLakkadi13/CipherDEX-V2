const { network , ethers } = require("hardhat");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deployer} = await getNamedAccounts();
    const {deploy,log} = deployments;
    const chainid = network.config.chainId;
    log("deploy to the chainId " + chainid);

    const accounts = await ethers.getSigners();

    args = [];

    const Pair = await deploy("EncryptedPair", {
        args: args,
        from: deployer,
        log: true,
    });

    log(`The address of the deployed contract ${Pair.address}`);
    log("------------------------------------------------------------------------");

}

module.exports.tags = ["all", "PairZAMA"];