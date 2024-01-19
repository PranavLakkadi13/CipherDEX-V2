const { ethers, network } = require("hardhat");
const { createInstance } = require("fhevmjs");
const { getInstance, provider } = require("./InstantiationlocalFhenix");

const signer = new ethers.Wallet(process.env.Private_Key,provider);

async function interaction() {

    // const signer = await ethers.getSigner();

    // zama
    // const MockBTC =  await ethers.getContractAt("MockBTC","0x2B7c20a9Ee37F93E3D31f51E5C8625CE5892b3aD",signer);
    // const MockETH =  await ethers.getContractAt("MockETH","0xA17B8685D96F69A4e182ee99Ee14f5ADE90d8e2a",signer);
    // const Factory = await ethers.getContractAt("FactoryFHE","0x09c96F06493A472e0E658fCf34b14C6f0681BC2c",signer);

    // localfhenix
    const MockBTC =  await ethers.getContractAt("MockBTC","0x779F411FCf7Be2c12e833c0F85ad9e11c2b5fff7",signer);
    const MockETH =  await ethers.getContractAt("MockETH","0x23A2EFb84Fa767D11f5c0d843d3e25Da289DAcFa",signer);
    const Factory = await ethers.getContractAt("FactoryFHE","0xa87A81E9dDADca47051A3E3a881dB3C95eAF7b08",signer);


    const fhevm = await getInstance();
    console.log("The connect val: ", fhevm)

    const accounts = await ethers.getSigners();

    console.log("The address connected to the network " + accounts[0].address);

    // NormalERC20 
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


    const encryptedValue = fhevm.encrypt32(1000);

    console.log("The value has been encrypted!!");

    const x1 = await CPAMM.connect(accounts[0]).addLiquidity(fhevm.encrypt32(1000),fhevm.encrypt32(1000));
    await x1.wait(2); 

    const supplyafterLiquidityAdded = await CPAMM.totalSupply();

    console.log("The after liquidity supply is ", supplyafterLiquidityAdded.toString())
}


interaction()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });