const DEVNET_URL = "https://fhenode.fhenix.io/new/evm";
const zama_devnet = "https://devnet.zama.ai";

const localFhenix = "docker run -it -p 8545:8545 -p 6000:6000 \
--name localfhenix ghcr.io/fhenixprotocol/fhenix-devnet:0.1.6"

module.exports = {
    DEVNET_URL,
    zama_devnet
}