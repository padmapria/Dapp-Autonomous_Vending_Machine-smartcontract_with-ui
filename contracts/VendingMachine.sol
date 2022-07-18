// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract VendingMachine {

    // state variables
    address public owner;
    mapping (address => uint) public addressToQuantity;
    uint goldBars;
    address[] public buyers;

    // set the owner as th address that deployed the contract
    // set the initial vending machine balance to 1000
    constructor() {
        owner = msg.sender;
        goldBars= 1000;
    }

    // Purchase coffee from the vending machine
    function purchase(uint quantity) public payable {

        require(msg.value >= quantity * 3 ether, "You must pay at least 3 ether per item");
        require(goldBars >= quantity, "Not enough items in stock to complete this purchase");

        //Create an entry to map the purchaser address and quantity purchased
        addressToQuantity[msg.sender] += quantity;  
        buyers.push(msg.sender);
        
        // Reduce the item from total stock
        goldBars-=quantity;
    }

     function getBuyers() public view returns (address [] memory) {
        return buyers;
    }


    function getVendingMachineBalance() public view returns (uint) {
        return goldBars;
    }


    modifier onlyOwner() {
            require(msg.sender == owner);
            _;
        }

    // Let the owner restock the vending machine
    function restock(uint quantity) public onlyOwner{
        goldBars += quantity;
    }

    // https://ethereum.stackexchange.com/questions/21448/how-to-get-a-contracts-balance-in-solidity
    function sales_amount() public view onlyOwner returns (uint256){
        return payable(address(this)).balance;
    }

    //Closing the sales for the day
    function close_sales()  public payable onlyOwner{
         payable(msg.sender).transfer(address(this).balance);

        //iterate through all the mappings and make them 0 as the sales amount is credited to the seller
        for (uint256 i=0; i < buyers.length; i++){
            address buyer = buyers[i];
            addressToQuantity[buyer] = 0;
        }
         // Reset the buyers list 
         buyers = new address[](0);

    }
}