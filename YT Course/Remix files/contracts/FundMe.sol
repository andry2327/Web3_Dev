// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

import "./PriceConverter.sol";

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    uint256 public MINIMUM_USD = 25 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    address public immutable i_owner;

    constructor(){
        i_owner = msg.sender; // owner will be set when contract is deployed
    }

    function fund() public payable {
        // ability to set a minimum fund amount
        require(msg.value.getConvertionRate() >= MINIMUM_USD, "did not send enough"); // 1*10^18 wei = 1 Eth, 'require' is a checker
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner { // first check onlyOwner first, then underscore
        // for loop
        for(uint256 i=0; i < funders.length; i++){
            address funder = funders[i];
            addressToAmountFunded[funder] = 0;
        }
        // reset array
        funders = new address[](0); // 0 elem in array

        // actually withdraw funds
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

    modifier onlyOwner{
        // require(msg.sender == i_owner, "Sender is not owner");
        if(msg.sender != i_owner){
            revert NotOwner();
        }
        _; // rest of the code, can also be placed above the function
    }

    // ETH not from Fund() ?

    // if someone tries to send maoney without the fund() function 
    // -> these two function will be triggered 

    receive() external payable {
        fund();
    }

    fallback() external payable { // it is triggered when some data are sent to the contract (calldata in Remix)
        fund();
    }
}