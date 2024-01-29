// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import "@fhenixprotocol/contracts/FHE.sol";
import "./interfaces/IERC20.sol";

contract Pair {

    IERC20 public token0;
    IERC20 public token1;
    address public  factory;

    uint public reserve0;
    uint public reserve1;

    uint public totalSupply;
    mapping(address => uint) public balanceOf;

    constructor() {
        factory = msg.sender;
    }

    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'Only Factory can call this'); // sufficient check
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
    }

    function _mint(address _to, uint _amount) private {
        balanceOf[_to] += _amount;
        totalSupply += _amount;
    }

    function _burn(address _from, uint _amount) private {
        balanceOf[_from] -= _amount;
        totalSupply -= _amount;
    }

    function _update(uint _reserve0, uint _reserve1) private {
        reserve0 = _reserve0;
        reserve1 = _reserve1;
    }

    function swap(address _tokenIn, inEuint32 calldata _amountIn) external returns (uint amountOut) {
        // euint32 x = TFHE.asEuint32(_amountIn);
        // uint32 amountIn = TFHE.decrypt(x);
        euint32 x = FHE.asEuint32(_amountIn);
        uint256 amountIn = FHE.decrypt(x);
        require(
            _tokenIn == address(token0) || _tokenIn == address(token1),
            "invalid token"
        );
        require(uint256(amountIn) > 0, "amount in = 0");

        bool isToken0 = _tokenIn == address(token0);
        (IERC20 tokenIn, IERC20 tokenOut, uint reserveIn, uint reserveOut) = isToken0
            ? (token0, token1, reserve0, reserve1)
            : (token1, token0, reserve1, reserve0);

        tokenIn.transferFrom(msg.sender, address(this), uint256(amountIn));

        uint amountInWithFee = (uint256(amountIn) * 997) / 1000;
        amountOut = (reserveOut * amountInWithFee) / (reserveIn + amountInWithFee);

        tokenOut.transfer(msg.sender, uint256(amountOut));

        _update(token0.balanceOf(address(this)), token1.balanceOf(address(this)));
    }

    function addLiquidity(inEuint32 calldata _amount0, inEuint32 calldata _amount1) external returns (uint shares) {
        // euint32 x = TFHE.asEuint32(_amount0);
        // euint32 y = TFHE.asEuint32(_amount1);
        // uint32 amount0 = TFHE.decrypt(x);
        // uint32 amount1 = TFHE.decrypt(y);

        euint32 x = FHE.asEuint32(_amount0);
        euint32 y = FHE.asEuint32(_amount1);
        uint32 amount0 = FHE.decrypt(x);
        uint32 amount1 = FHE.decrypt(y);
        
        bool t = token0.transferFrom(msg.sender, address(this), uint256(amount0));
        bool tt = token1.transferFrom(msg.sender, address(this), uint256(amount1));
        require(t && tt);

        if (reserve0 > 0 || reserve1 > 0) {
            require(reserve0 * uint256(amount1) == reserve1 * uint256(amount0), "x / y != dx / dy");
        }

        if (totalSupply == 0) {
            shares = _sqrt(uint256(amount0) * uint256(amount1));
        } else {
            shares = _min(
                (uint256(amount0) * totalSupply) / reserve0,
                (uint256(amount1) * totalSupply) / reserve1
            );
        }
        require(shares > 0, "shares = 0");
        _mint(msg.sender, shares);

        _update(token0.balanceOf(address(this)), token1.balanceOf(address(this)));
    }

    function removeLiquidity(
        inEuint32 calldata _shares
    ) external returns (uint amount0, uint amount1) {
        
        euint32 x = FHE.asEuint32(_shares);

        uint32 shares = FHE.decrypt(x);
        uint bal0 = token0.balanceOf(address(this));
        uint bal1 = token1.balanceOf(address(this));

        amount0 = (uint256(shares) * bal0) / totalSupply;
        amount1 = (uint256(shares) * bal1) / totalSupply;
        require(amount0 > 0 && amount1 > 0, "amount0 or amount1 = 0");

        _burn(msg.sender, shares);
        _update(bal0 - amount0, bal1 - amount1);

        token0.transfer(msg.sender, uint256(amount0));
        token1.transfer(msg.sender, uint256(amount1));
    }

    function _sqrt(uint y) private pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    function _min(uint x, uint y) private pure returns (uint) {
        return x <= y ? x : y;
    }
}