// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {

    function getPrice() internal view returns (uint256){
        // Chainlink ETH/USD contract address: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        (, int256 price, , , ) = priceFeed.latestRoundData();
        // ETH in USD
        return uint256(price * 1e10);
    }

    function getVersion() internal view returns(uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        return  priceFeed.version(); // returns ABI from chainlink
    }

    function getConvertionRate(uint256 ethAmount) internal view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUsd;
    }
}