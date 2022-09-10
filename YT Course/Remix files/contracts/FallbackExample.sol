// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

// ETH not from Fund() function ?

contract FallBackExample {
    uint256 public result;

    receive() external payable { // it is triggered when the contract receive some ETH
        result = 1;
    }

    fallback() external payable { // it is triggered when some data are sent to the contract (calldata in Remix)
        result = 2;
    }
}