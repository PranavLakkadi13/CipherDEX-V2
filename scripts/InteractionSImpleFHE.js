const { EncryptionTypes, FhenixClient, EncryptedUint8,getPermit,permission } = require("fhenixjs");
const { Instance} = require("./FhenixInstance");
const { ethers } = require("hardhat");
const { FhenixTestnet } = require("../helper-hardhat-config");

const provider =  ethers.provider;
let SimpleInstance;

async function interaction() {

    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const Simple = await ethers.getContractAt("SimpleFHE","0x7a73d48557e3f3Ac6Eda0Ad078ebfE8421db7d8C",signer);

    SimpleInstance = await Instance();

    const InitialValue = await Simple.x();

    console.log("The initial value is : ", InitialValue.toString());

    const UpdatedValue = await SimpleInstance.encrypt_uint32(22);

    const sendUpdatedValue = await Simple.changeValue(UpdatedValue);

    const AfterUpdatedValue = await Simple.x();

    console.log("The updated value : " , AfterUpdatedValue);
}

interaction()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });