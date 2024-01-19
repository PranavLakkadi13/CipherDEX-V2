require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("@nomicfoundation/hardhat-network-helpers");
require("dotenv").config();

const RPC_URL_Alchemy_SEPOLIA = process.env.RPC_URL_Alchemy_SEPOLIA;
const Private_Key = process.env.Private_Key;
const RPC_URL_POLYGON = process.env.RPC_URL_POLYGON;
const PolygonScan_API_KEY = process.env.PolygonScan_API_KEY;
const Etherscan_API_KEY = process.env.Etherscan_API_KEY;
const Coinmarketcap_API_KEY = process.env.Coinmarketcap_API_KEY;
const RPC_URL_Alchemy_MAINNET = process.env.RPC_URL_Alchemy_MAINNET;
const ZAMAMNEMONIC = process.env.ZAMAMNEMONIC;

const Private_Key_G = process.env.Private_Key_G;
const RPC_URL_G = process.env.RPC_URL_G;
const Mnemonic =  process.env.MNEMONIC;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      blockGasLimit: 100000000429720,
      chainId: 31337,
      blockConfirmations: 1,
      // forking: {
      //   url: RPC_URL_Alchemy_MAINNET,
      // },
    },
    sepolia: {
      url: RPC_URL_Alchemy_SEPOLIA,
      accounts: [Private_Key],
      chainId: 11155111,
      blockConfirmations: 6,
    },
    polygon: {
      url: RPC_URL_POLYGON,
      accounts: [Private_Key],
      chainId: 80001,
      blockConfirmations: 6,
    },
    localzama: {
      // pubkey1 : 0x4281d1Ef85F13747761Ea76961b3ACA13C7A8957
      // accounts: ["0x6ce6cbc11dea3db360b9c6e9ae229e2c17ef9104fecedb552f0e4e7da6b80af0"],
      accounts:{ mnemonic : ZAMAMNEMONIC},
      chainid: 9000,
      url: "http://127.0.0.1:8545",
    },
    localfhenix: {
      // pubkey1 : 0x0319069ca5e383e40d6d19fb3e76e8b22b91cf4b0df661850c8e1de01624ab1d10
      accounts: ["0x6ce6cbc11dea3db360b9c6e9ae229e2c17ef9104fecedb552f0e4e7da6b80af0"],
      // accounts:{ mnemonic : Mnemonic},
      chainId: 5432,
      url: "http://localhost:8545",
    },
    fhenix: {
      url: "https://fhenode.fhenix.io/new/evm",
      chainId: 5432,
      accounts: [Private_Key]
    },
    zama: {
      accounts: [Private_Key],
      chainId: 8009,
      url: "https://devnet.zama.ai",
    }
  },
  solidity: {
    compilers: [
      { version: "0.4.19" },
      { version: "0.8.20" },
      { version: "0.6.6" },
      { version: "0.8.19"}
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
  etherscan: {
    apiKey: Etherscan_API_KEY,
    customChains: [
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://sepolia.etherscan.io",
        },
      },
    ],
  },
  polygonscan: {
    apiKey: PolygonScan_API_KEY,
  },
  gasReporter: {
    enabled: true,
    // outputFile: "gas-reporter.txt",
    noColors: true,
    currency: "USD",
    // coinmarketcap: Coinmarketcap_API_KEY,
    token: "ETH",
  },
  mocha: {
    timeout: 2000000,
  },
};