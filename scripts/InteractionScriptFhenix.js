const { EncryptionTypes, FhenixClient, EncryptedUint8 } = require("fhenixjs");
const { JsonRpcProvider } = require("ethers");
const { ethers } = require("hardhat");
const { FhenixTestnet } = require("../helper-hardhat-config");

const provider = new ethers.providers.JsonRpcProvider(FhenixTestnet);

// initialize Fhenix Client
const instance = new FhenixClient({provider});

// const inst = instance.Create({provider});

async function interactionFhenix() {

    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const MockBTC =  await ethers.getContractAt("MockBTC","0x2e1771fcEFFA28Fd49910AC8aAc647f01A86b58A",signer);
    const MockETH =  await ethers.getContractAt("MockETH","0x6B1b2bed91137659E08e56d6CbC11DbF9e18bDaB",signer);
    const Factory = await ethers.getContractAt("FactoryFHE","0x1f963AE34BB6DAf6F5c04A2f2121E6e065456f66",signer);

    const beforeMint_hashBTC = await MockBTC.connect(accounts[0]).balanceOf(accounts[0].address);

    console.log("The Balance of BTC before mint " + beforeMint_hashBTC);

    // NormalERC20
    const beforeMint_hashETH = await MockETH.balanceOf(accounts[0].address);

    console.log("The Balance of ETH before mint " + beforeMint_hashETH);
    
    // await Factory.connect(accounts[0]).createPair(MockBTC.address,MockETH.address); 

    const pair = await Factory.getPair(MockETH.address,MockBTC.address);

    console.log(`The pair address that is created ${pair}`);

    const CPAMM = await ethers.getContractAt("Pair",pair,signer);
    
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

    const resultUint32 = await instance.encrypt_uint32(5000);

    console.log("The value has been encrypted!!");

    const x1 = await CPAMM.connect(accounts[0]).addLiquidity(resultUint32,resultUint32);
    // await x1.wait(2); 

    const supplyafterLiquidityAdded = await CPAMM.totalSupply();

    console.log("The after liquidity supply is ", supplyafterLiquidityAdded.toString())
}


interactionFhenix()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });