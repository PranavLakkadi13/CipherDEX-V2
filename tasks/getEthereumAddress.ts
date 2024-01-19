import dotenv from "dotenv";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

dotenv.config();

const getEthereumAddress =
 (index: number = 0) =>
 async (_taskArgs: unknown, hre: HardhatRuntimeEnvironment) => {
   const { ethers } = hre;
   const words = process.env.MNEMONIC!;
   const mnemonic = ethers.utils.mnemonicToSeed(words);
  //  if (!mnemonic) {
  //    throw new Error("No MNEMONIC in .env file");
  //  }
   const wallet = ethers.utils.HDNode.fromMnemonic(mnemonic, `m/44'/60'/0'/0`);
  //  console.log(wallet.);
 };

task(
 "task:getEthereumAddress",
 "Gets the first address derived from a mnemonic phrase defined in .env",
 getEthereumAddress(0),
);

const accounts = ["Alice", "Bob", "Carol", "Dave"];

accounts.forEach((name, index) => {
 task(
   `task:getEthereumAddress${name}`,
   "Gets the first address derived from a mnemonic phrase defined in .env",
   getEthereumAddress(index),
 );
});