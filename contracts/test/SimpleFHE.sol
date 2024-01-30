// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@fhenixprotocol/contracts/FHE.sol";

contract SimpleFHE {
    uint32 public x;

    function changeValue(inEuint32 calldata _x) external {
        euint32 y = FHE.asEuint32(_x);
        x = FHE.decrypt(y);
    } 
}