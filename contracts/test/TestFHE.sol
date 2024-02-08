// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhenixprotocol/contracts/FHE.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract TestFHE {

    IERC20 public immutable test;

    constructor (address _test) {
        test = IERC20(_test);
    }

    function addValueEncrypted(inEuint32 calldata _amount) public returns (uint amount){
        amount = uint256(decrytVal(_amount));
        console.log("The amount is ", amount);
        test.transferFrom(msg.sender,address(this),amount);
    }

    function decrytVal(inEuint32 calldata _amount) public pure returns (uint32 x) {
        x = FHE.decrypt(FHE.asEuint32(_amount));
    }

    function addValue(uint256 _amount) public {
        test.transferFrom(msg.sender,address(this),_amount);
    }

    function sum(inEuint32 calldata _amount) public pure returns (uint32 x) {
        uint32 y = decrytVal(_amount);
        x = y + 223;
    }

    function sumExistingBalance(inEuint32 calldata _amount) public view returns (uint32 x) {
        uint32 y = decrytVal(_amount);
        uint32 z = uint32(test.balanceOf(address(this)));
        x = y + z; 
    }
}