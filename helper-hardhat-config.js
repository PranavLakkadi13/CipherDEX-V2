const DEVNET_URL = "https://fhenode.fhenix.io/new/evm";
const zama_devnet = "https://devnet.zama.ai";

const localFhenix = "docker run -it -p 8545:8545 -p 6000:6000 \
--name localfhenix ghcr.io/fhenixprotocol/fhenix-devnet:0.1.6"

const localzama = "docker run -i -p 8545:8545 -p 8546:8546 --rm --name fhevm ghcr.io/zama-ai/ethermint-dev-node:v0.2.3"

module.exports = {
    DEVNET_URL,
    zama_devnet
}