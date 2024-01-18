const { ethers, network } = require("hardhat");
const { createInstance } = require("fhevmjs");
const { getInstance, provider } = require("./Instantiation.js");

const signer = new ethers.Wallet(process.env.Private_Key,provider);

async function interaction() {

    // const signer = await ethers.getSigner();

    // zama
    const MockBTC =  await ethers.getContractAt("MockBTC","0x2B7c20a9Ee37F93E3D31f51E5C8625CE5892b3aD",signer);
    const MockETH =  await ethers.getContractAt("MockETH","0xA17B8685D96F69A4e182ee99Ee14f5ADE90d8e2a",signer);
    const Factory = await ethers.getContractAt("FactoryFHE","0x09c96F06493A472e0E658fCf34b14C6f0681BC2c",signer);

    const fhevm = await getInstance();

    const accounts = await ethers.getSigners();

    console.log("The address connected to the network " + accounts[0].address);

    // NormalERC20 
    const beforeMint_hashBTC = await MockBTC.balanceOf(accounts[0].address);

    console.log("The Balance of BTC before mint " + beforeMint_hashBTC);

    // NormalERC20
    const beforeMint_hashETH = await MockETH.balanceOf(accounts[0].address);

    console.log("The Balance of ETH before mint " + beforeMint_hashETH);
    
    // await Factory.createPair(MockBTC.address,MockETH.address); 

    const pair = await Factory.getPair(MockETH.address,MockBTC.address);

    console.log(`The pair address that is created ${pair}`);

    const CPAMM = await ethers.getContractAt("Pair",pair,signer);
    
    const x = await CPAMM.totalSupply();
   
    console.log("The initial supply ", x.toString());
   
    const token = await CPAMM.token0();
   
    console.log(`the token initalized is ${token}`);

    await MockBTC.connect(signer).approve("0xcae3547ae1aCDEE7c531E280AB9193D219FCAd49",parseInt(1000));

    console.log("BTC Mock approved!!");

    await MockETH.connect(signer).approve("0xcae3547ae1aCDEE7c531E280AB9193D219FCAd49",parseInt(1000));

    console.log("ETH Mock approved!!");

    const encryptedValue = await fhevm.encrypt32(parseInt(1000));

    console.log("The value has been encrypted!!");

    const x1 = await CPAMM.connect(signer).addLiquidity(encryptedValue,encryptedValue);
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