const { EncryptionTypes, FhenixClient, EncryptedUint8,getPermit,permission } = require("fhenixjs");
const { Instance} = require("./FhenixInstance");
const { ethers } = require("hardhat");
const { FhenixTestnet } = require("../helper-hardhat-config");

const provider =  ethers.provider;
let CPAMMInstance;

async function interactionFhenix() {

    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const MockBTC =  await ethers.getContractAt("MockBTC","0x369B5466d3797f808b7b5C033d5175CdBcD8E9F0",signer);
    const MockETH =  await ethers.getContractAt("MockETH","0x9f7c110794c259088Eaa22B608b508f968E0c6b7",signer);
    const Factory =  await ethers.getContractAt("FactoryFHE","0xA8F1F3Cab3286F8BfD9223E0081E80e2c2375993",signer);
    const MockFHE =  await ethers.getContractAt("MockFHE","0x28b2665b61168A6F16F458C2F014c9a16b7c46A0",signer);

    const beforeMint_hashBTC = await MockBTC.connect(accounts[0]).balanceOf(accounts[0].address);

    console.log("The Balance of BTC before mint " + beforeMint_hashBTC);

    // NormalERC20
    const beforeMint_hashETH = await MockETH.balanceOf(accounts[0].address);

    console.log("The Balance of ETH before mint " + beforeMint_hashETH);
    
    // await Factory.createPair(MockETH.address,MockBTC.address); 

    // const pair = await Factory.getPair(MockETH.address,MockFHE.address);
    const pair = "0xFBA8B065A4BedB6169681C8B27B4238CFaB9e6ED"

    console.log(`The pair address that is created ${pair}`);

    CPAMMInstance = await Instance(pair);

    // const permit = await getPermit(contractAddress, provider);
    // CPAMMInstance.storePermit(permit);
    // const permission = CPAMMInstance.extractPermitPermission(permit);

    const CPAMM = await ethers.getContractAt("CPAMM",pair,signer);
    
    // CPAMM.initialize(MockBTC.address,MockETH.address);
    
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

    const resultUint32 = await CPAMMInstance.encrypt_uint32(5000);

    console.log("The value has been encrypted!!");

    await CPAMM.connect(accounts[0]).addLiquidity(resultUint32,resultUint32);
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