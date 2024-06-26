// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockFHE is ERC20 {
    constructor () ERC20("MockFHE", "MFHE"){
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function decimals() public view virtual override returns (uint8) {
        return 3;
    }
}