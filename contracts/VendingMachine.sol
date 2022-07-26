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
        
		//https://blog.polymath.network/solidity-tips-and-tricks-to-save-gas-and-reduce-bytecode-size-c44580b218e6
		// safemath already in 0.8 https://ethereum.stackexchange.com/questions/91367/is-the-safemath-library-obsolete-in-solidity-0-8-0
		//require(goldBars > quantity, "Stock is less");
        require(msg.value >= quantity * 3 ether, "1 item is 3 ether");


		// Reduce the item from total stock
        goldBars-=quantity;
		
        //For gas optimization
        //https://dev.to/javier123454321/solidity-gas-optimization-pt1-4271
        //https://mudit.blog/solidity-gas-optimization-tips/
        address sender = msg.sender;
        
        //Create an entry to map the purchaser address and quantity purchased
        addressToQuantity[sender] += quantity;  
        buyers.push(sender); 
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
    function close_sales() public payable onlyOwner{
         payable(owner).transfer(address(this).balance);

        //To save gas cost
        address[] memory buyerMaping = buyers;
        
        //iterate through all the mappings and make them 0 as the sales amount is credited to the seller
        for (uint256 i=0; i < buyerMaping.length; i++){
            address buyer = buyerMaping[i];
            addressToQuantity[buyer] = 0;
        }
         // Reset the buyers list 
         buyers = new address[](0);

    }
}