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
    let signer;

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;

        accounts = await ethers.getSigners();
        signer = accounts[0]; // Get the first signer

        mockBTC = await ethers.getContractAt("MockBTC","0x2e1771fcEFFA28Fd49910AC8aAc647f01A86b58A",signer);
        mockETH = await ethers.getContractAt("MockETH","0x6B1b2bed91137659E08e56d6CbC11DbF9e18bDaB",signer);
        
        const {address , contract} = await deployPair();
        
        Pair = await ethers.getContractAt("Pair", address.toString(), signer);

        mockBTC.approve(Pair.address,"10000");
        mockETH.approve(Pair.address, "10000");

        Pair.initialize(mockBTC.address,mockETH.address);

        FHEinstance = await Instance();
    });

    describe('Initailzed test', () => {
        it("To test the initailized contract MockBTC", async () => {
            const initialBal = await mockBTC.balanceOf(signer.address);
            // const initialBal = await mockBTC.totalSupply();
            assert.equal(initialBal.toString(),"1000000");
        });
        it("To test the initailized contract MockETH", async () => {
            const initialBal = await mockETH.balanceOf(signer.address);
            // const initialBal = await mockBTC.totalSupply();
            assert.equal(initialBal.toString(),"1000000");
        });
    })

    describe("AddLiquidity function ", () => {
        it("Testing the deposit ", async () => {
            const x = await FHEinstance.encrypt_uint32(1000);
            await Pair.addLiquidity(x,x);
        });
        it("transfers the balance to the pair contract", async () => {
            const x = await FHEinstance.encrypt_uint32(1000);
            const z = await Pair.addLiquidity(x,x);

            console.log("The amount that is coming in is ", z);

            const SenderBalanceBefore = await mockBTC.balanceOf(signer.address);
            console.log("The balance of owner before liquidity added : ", SenderBalanceBefore);

            const bal = await mockBTC.balanceOf(Pair.address);
            // assert.equal(bal.toString(),1000)
            console.log("balance of the contract ", bal.toString());

            const SenderBalanceAfter = await mockBTC.balanceOf(accounts[0].address);
            console.log("The balance of owner before liquidity added : ", SenderBalanceAfter);
        });
    })
})
}
