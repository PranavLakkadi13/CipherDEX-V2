const { assert, expect } = require("chai");
const { deployments, getNamedAccounts, ethers, network, getChainId } = require("hardhat");
const { deployPair } = require("./PairFHEFixture.test");
const { Instance } = require("../scripts/FhenixInstance");

const chainId = network.chainId;

if ( chainId != "31337") {
describe("Pair", () => {
    let mockBTC;
    let mockETH;
    let deployer;
    let Pair;
    let accounts;
    let FHEinstance;

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        
        await deployments.fixture(["all"]);

        mockBTC = await ethers.getContractAt("MockBTC",deployer);
        mockETH = await ethers.getContractAt("MockETH",deployer);
        
        const {address , contract} = await deployPair();
        
        Pair = await ethers.getContractAt("Pair", address.toString(), deployer);

        accounts = await ethers.getSigners();

        mockBTC.approve(Pair.address,"10000");
        mockETH.approve(Pair.address, "10000");

        FHEinstance = await Instance();
    });

    describe('Initailzed test', () => {
        it("To test the initailized contract", async () => {
            const initialBal = await mockBTC.balanceOf(accounts[0].address);
            // assert.equal(initialBal.toString(),"10000");
            console.log(initialBal.toString(), " The balance ");
        });
    })
})
}