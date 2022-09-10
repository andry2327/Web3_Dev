// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

import "./SimpleStorage.sol";

contract ExtraStorage is SimpleStorage{ // extends SimpleStorage: += 100 

    function store(uint256 _favouriteNumber) public override {
        favouriteNumber = _favouriteNumber + 100;
    }
}