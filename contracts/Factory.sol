// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

import "./EncryptedPairFHE.sol";

import "hardhat/console.sol";

contract FactoryFHE {

    mapping(address => mapping(address => address)) public getPair;

    address[] public allPairs;

    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }

    function createPair(address tokenA, address tokenB) external returns (address pair) {
        console.log("done");
        require(tokenA != tokenB, 'IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        console.log("The address of token0 ", token0);
        require(token0 != address(0), 'ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'PAIR_EXISTS'); // single check is sufficient
        bytes memory bytecode = type(EncryptedPair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1,msg.sender));
        assembly {
            pair := create2(0xff, add(bytecode, 32), mload(bytecode), salt)
        }
        // require(pair != address(0),"Pair not created");
        if (pair == address(0)) {
            revert();
        }
        EncryptedPair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
        return pair;
    }
}
