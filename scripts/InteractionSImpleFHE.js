const { EncryptionTypes, FhenixClient, EncryptedUint8,getPermit,permission } = require("fhenixjs");
const { Instance} = require("./FhenixInstance");
const { ethers } = require("hardhat");
const { FhenixTestnet } = require("../helper-hardhat-config");

const provider =  ethers.provider;
let SimpleInstance;

async function interaction() {

    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const Simple = await ethers.getContractAt("SimpleFHE","0x4545EC7D366F62439b3AebE1ec80863c0Ab070Ed",signer);

    SimpleInstance = await Instance();

    const InitialValue = await Simple.x();

    console.log("The initial value is : ", InitialValue.toString());

    const UpdatedValue = await SimpleInstance.encrypt_uint32(2992);

    const sendUpdatedValue = await Simple.changeValue(UpdatedValue);

    const AfterUpdatedValue = await Simple.x();

    console.log("The updated value : " , AfterUpdatedValue.toString());

    const x = await SimpleInstance.encrypt_uint32(2232);

    await Simple.changeValue(x);

    const AfterUpdatedValue2 = await Simple.x();

    console.log("The updated value : " , AfterUpdatedValue2.toString());
}

interaction()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });