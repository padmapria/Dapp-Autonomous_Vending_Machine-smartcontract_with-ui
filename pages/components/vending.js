import VendingMachine from "../../artifacts/contracts/VendingMachine.sol/VendingMachine.json";

import Web3 from 'web3'
import * as contract_end_point from '../../contract_deployed_endpoint';


const VendingMachineContract = web3 =>  {
    return new web3.eth.Contract(VendingMachine.abi, contract_end_point.vending_contract_Addr) 
}

export {VendingMachineContract}