import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import 'bulma/css/bulma.min.css';

import VendingMachine from "../artifacts/contracts/VendingMachine.sol/VendingMachine.json";

import Web3 from 'web3'
import * as contract_end_point from '../contract_deployed_endpoint';
import {VendingMachineContract} from './components/vending';

export default function vending_machine() {

  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [web3, setWeb3] = useState(null)
  const [address, setAddress] = useState(null)
  const [vmContract, setVmContract] = useState(null)

  //Appln specific
  const [stock_balance, setStock_balance] = useState('')
  const [buyCount, setBuyCount] = useState('')
  const [totalSales, setTotalSales] = useState('')
  const [restockCount, setRestockCount] = useState('')

  const [buyers, setBuyers] = useState([])
  const [owner, setOwner] = useState(null)

  const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545");
  const web = new Web3(provider);
  const vm_contract = new web.eth.Contract(VendingMachine.abi, contract_end_point.vending_contract_Addr);

  useEffect(() => {
    updateState()
  }, [vm_contract])

  const updateState = () => {
   // if (contract) getBuyers()
    if (vm_contract) find_StockBalance()
    if (vm_contract) getOwner()
    if (vmContract) getTotalSales()
  }

  const find_StockBalance = async () => {
    let balance = await vm_contract.methods.getVendingMachineBalance().call();
    setStock_balance(balance);
  }


  const getOwner = async () => {
    const owner = await vm_contract.methods.owner().call();
    setOwner(owner);
  }

  const getBuyers = async () => {
    const buyers = await vmContract.methods.getBuyers().call();
    setBuyers(buyers);
  }


  const getTotalSales = async () => {
    const sales_amt = await vmContract.methods.sales_amount().call();
    setTotalSales(sales_amt);
  }

  const restock = async () => {
    connectToMetamask();
    if(address == owner){
      await vmContract.methods.restock(parseInt(restockCount)).send({
        from: address,
        gas: 3000000,
        gasPrice: null
      })
      if (vmContract) find_StockBalance();
      setRestockCount('');
    }
    else{
      alert("Unautorized only owner is allowed to restock");
    }
  }


  const closeSales = async () => {
    connectToMetamask();
    if(address == owner){
      await vmContract.methods.close_sales().send({
        from: address,
        gas: 3000000,
        gasPrice: null
      });
      const etherValue = Web3.utils.fromWei(totalSales, 'ether');
      console.log("Total sales in Ether: ",etherValue);
      alert("Total sales in Ether: ",+etherValue);
      if (vmContract) find_StockBalance();
      if (vmContract) getBuyers();
    }
    else{
      alert("Unautorized only owner is allowed to perform");
    }
  }


  const purchase = async () => {
    if(buyCount==0){
      alert("Quantity cannot be null")
    }
    else{
      try {
        connectToMetamask();
        await vmContract.methods.purchase(parseInt(buyCount)).send({
          from: address,
          value: web3.utils.toWei('3', 'ether') * buyCount,
          gas: 3000000,
          gasPrice: null
        })
        setSuccessMsg(`${buyCount} items purchased!`)
        setError('')
        setBuyCount("")

         if (vmContract) find_StockBalance()
         if (vmContract) getBuyers();
        //if (vmContract && address) getMyAccountToQty(address)
      } catch(err) {
        setBuyCount("")
        setError(err.message)
      }
    }
  }

  //https://www.youtube.com/watch?v=Qu6GloG0dQk&t=5902s
  const connectToMetamask = async () => {
    alert("Connecting to metamask")
    /* To check if metamask is installed */
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          /* request wallet connect */
          await window.ethereum.request({ method: "eth_requestAccounts" })
          /* create web3 instance and set to state var */
          const web3 = new Web3(window.ethereum)
          /* set web3 instance */
          setWeb3(web3)
          /* get list of accounts */
          const accounts = await web3.eth.getAccounts()
          /* set Account 1 to React state var */
          setAddress(accounts[0])
          console.log("Accounts 0",+accounts[0])

          const vm = VendingMachineContract(web3);
          //vm.methods.getVendingMachineBalance().call().then(console.log);
          setVmContract(vm);
        } catch(err) {
          setError(err.message)
        }
    } else {
        // meta mask is not installed use ganache
        console.log("install MetaMask use ganache instead")
    }
  }
  return (
    //https://surajsharma.net/blog/background-image-in-react
  <div  className={styles.container}  style={{ 
    backgroundImage: `url('/eth_logo.jpg')`,  
    backgroundSize: '100% 100%',   backgroundRepeat:'no-repeat'}}>
<div className="mt-5"> 
<div >
  <section>
    <div className="columns">
      
      <div className="column is-half mx-6 mt-5" >
      <section className="mt-12 is-size-17 has-text-white" >

        <h2> Store Owner :{owner}</h2>
        <h2> Stock in hand :{stock_balance}</h2>
          
      </section>

      <section className="mt-5">
          <div className="container has-text-centered">
            <div className="field">
            <div className="buttons">
             
            </div>
              <div className="control column is-4">
              <label className="label has-text-white">Buy 1 item for 3 ether</label>
                <input value={buyCount} onChange={(e) => setBuyCount(e.target.value)} className="input is-hovered" type="type" placeholder="Enter quantity..." />
              </div>
            </div>
          </div>
          <div>
          <button 
                onClick={purchase} 
                className="button is-white mx-5"
              >Buy</button>
          </div>

      </section>
      <section>
        <div className="container has-text-danger mt-5">
          <p>{error}</p>
        </div>
      </section>
      <section>
        <div className="container has-text-success mt-5">
          <p>{successMsg}</p>
        </div>
      </section>
      </div>
      
      
      <div className="column is-half margin-right: 5px;">
      <div>
      <section className="mt-5">
        <div className="card has-background-warning-light column is-two-thirds is-offset-three-quarter"  >
          <div className="card-content">
            <div className="content">
              <h5>Today's Buyers ({buyers.length})</h5>
              <ul className="ml-0">
                {
                  (buyers && buyers.length > 0) && buyers.map((buyer, index) => {
                    return <li key={`${buyer}-${index}`}>
                      <a href={`https://etherscan.io/address/${buyer}`} target="_blank">
                        {buyer}
                      </a>
                    </li>
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="card has-background-link-light column is-two-thirds is-offset-three-quarter">
          <div className="card-content">
            <div className="content">
            <b>Admin only: </b>ReStock
            <div className="field is-grouped is-grouped-centered column is-9">
              <input value={restockCount} onChange={(e) => setRestockCount(e.target.value)} className="input is-hovered mx-4 mt-3" type="type" placeholder="Quantity..." />
              <button onClick={restock} className="button is-warning is-medium mt-2">ReStock</button>
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 mb-7">
        <div className="card has-background-warning-light column is-two-thirds is-offset-three-quarter">
          <div className="card-content">
            <div className="content">
            <p><b>Admin only: </b>Close Sales for the day</p>
              <button onClick={closeSales} className="button is-danger is-medium mt-2">Close Sales</button>
            </div>
          </div>
        </div>
      </section>
      </div>
      </div>

    </div>
  </section>
</div>

<div>
  <br/>
  <br/>
</div>
<div>
  <br/>
  <br/>
</div>
  <footer className="footer" style={{ 
      backgroundColor: 'transparent', marginTop: 'auto'}} >
    

    <div className="navbar-brand">
    <a className="navbar-item" href="https://www.google.com">
      <img src="http://www.google.com/logos/doodles/2020/stay-and-play-at-home-with-popular-past-google-doodles-coding-2017-6753651837108765-2xa.gif" width="112" height="28" />
    </a>

    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div className="content has-text-centered  mt-15">
      <p>
        <strong  className="has-text-white">Blockchain based Vending Machine by priya</strong> 
      </p>
    </div>
  </footer>

</div>


  </div>
)}