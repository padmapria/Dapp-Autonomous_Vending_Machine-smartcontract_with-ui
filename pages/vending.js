import VendingMachine from "../artifacts/contracts/VendingMachine.sol/VendingMachine.json";

import Web3 from 'web3'
import * as contract_end_point from '../contract_deployed_endpoint';


const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545");
const web = new Web3(provider);
const vm_contract = new web.eth.Contract(VendingMachine.abi, contract_end_point.vending_contract_Addr);

export {vm_contract}