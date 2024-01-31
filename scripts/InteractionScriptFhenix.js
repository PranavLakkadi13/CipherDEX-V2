const { EncryptionTypes, FhenixClient, EncryptedUint8,getPermit,permission } = require("fhenixjs");
const { Instance} = require("./FhenixInstance");
const { ethers } = require("hardhat");
const { FhenixTestnet } = require("../helper-hardhat-config");

// const provider =  ethers.provider;
// let CPAMMInstance;

async function interactionFhenix() {

    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const MockBTC =  await ethers.getContractAt("MockBTC","0x2e1771fcEFFA28Fd49910AC8aAc647f01A86b58A",signer);
    const MockETH =  await ethers.getContractAt("MockETH","0x6B1b2bed91137659E08e56d6CbC11DbF9e18bDaB",signer);
    const Factory =  await ethers.getContractAt("FactoryFHE","0xA8F1F3Cab3286F8BfD9223E0081E80e2c2375993",signer);
    const MockFHE =  await ethers.getContractAt("MockFHE","0x28b2665b61168A6F16F458C2F014c9a16b7c46A0",signer);

    const beforeMint_hashBTC = await MockBTC.connect(accounts[0]).balanceOf(accounts[0].address);

    console.log("The Balance of BTC before mint " + beforeMint_hashBTC);

    // NormalERC20
    const beforeMint_hashETH = await MockETH.balanceOf(accounts[0].address);

    console.log("The Balance of ETH before mint " + beforeMint_hashETH);
    
    // await Factory.createPair(MockETH.address,MockBTC.address); 

    // const pair = await Factory.getPair(MockETH.address,MockFHE.address);
    const pair = "0xC5F8b43D47FAa13FCd5f803153Ed28a7c58853F9"

    console.log(`The pair address that is created ${pair}`);

    const CPAMMInstance = await Instance();

    // const permit = await getPermit(contractAddress, provider);
    // CPAMMInstance.storePermit(permit);
    // const permission = CPAMMInstance.extractPermitPermission(permit);

    const CPAMM = await ethers.getContractAt("Pair",pair,signer);
    
    await CPAMM.initialize(MockBTC.address,MockETH.address);
    
    const x = await CPAMM.totalSupply();
   
    console.log("The initial supply ", x.toString());
   
    const token = await CPAMM.token0();
   
    console.log(`the token initalized is ${token}`);

    await MockBTC.connect(accounts[0]).approve(pair,10000);

    console.log("BTC Mock approved!!");

    await MockETH.connect(accounts[0]).approve(pair,10000);

    console.log("ETH Mock approved!!");
    
    const approveedBTCValue = await MockBTC.allowance(accounts[0].address,pair);
    console.log("The value approved in BTC is " + approveedBTCValue.toString());

    const approveedETHValue = await MockETH.allowance(accounts[0].address,pair);
    console.log("The value approved in ETH is " + approveedETHValue.toString());

    const resultUint32 = await CPAMMInstance.encrypt_uint32(500)

    console.log("The value has been encrypted!!");

    const amount = await CPAMM.addLiquidity(resultUint32,resultUint32);

    console.log("The amount of shares minted: ",amount.toString());
    // await x1.wait(2); 

    const supplyafterLiquidityAdded = await CPAMM.totalSupply();

    console.log("The after liquidity supply is ", supplyafterLiquidityAdded.toString());
}


interactionFhenix()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });