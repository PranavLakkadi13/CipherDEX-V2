// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {MockETH} from  "../src/test/MockETH.sol";
import {MockBTC} from "../src/test/MockBTC.sol";
import {FactoryFHE} from  "../src/Factory.sol";

contract testFactory {

    FactoryFHE public factory;
    MockBTC public btc;
    MockETH public eth;

    function setUp() public {
        factory = new FactoryFHE();
        btc = new MockBTC();
        eth = new MockETH();
    }

    function testCheckPairs() public view {
        uint256 x = factory.allPairsLength();
        assert(x == 0);
    }

    function testCreatePair() public {
        address x = factory.createPair(address(btc),address(eth));
        assertEq(x, factory.getPair(address(eth),address(btc)));
    }
}