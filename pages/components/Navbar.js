import React from 'react'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import 'bulma/css/bulma.min.css';
import Head from 'next/head'

import { useState, useEffect } from 'react'
import 'bulma/css/bulma.min.css';

import Web3 from 'web3'

import {VendingMachineContract} from './vending';
 
const Navbar = () => {

    const [web3, setWeb3] = useState(null)
    const [address, setAddress] = useState(null)
    const [vmContract, setVmContract] = useState(null)
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

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
              console.log("web3")
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
        <>
        <div>
      <Head>
        <title>Vending Maching Next DApp</title>
        <meta name="description" content="By priya" />
      </Head>

        <div className='has-background-info-dark'> 
        <div id="navbarBasicExample" className="navbar-menu mb-3">
            <div className="navbar-start hover-color-is-primary">
            <Link href='/'>
            <a className="button is-info is-hovered mx-5 is-size-5 has-text-white" >
                About  
            </a>
            </Link>

            <Link href='/vending_machine'>
                <a className="button is-info is-hovered mx-5 is-size-5 has-text-white" >
                Purchase 
                </a>
            </Link>
            <Link href='/review'>
                <a className="button is-info is-hovered is-size-5 has-text-white">
                Write a Review
                </a>
            </Link>
            </div>

            <div className="navbar-end">
            <div className="navbar-item">
            <div className="buttons">
            <a className="button is-success mx-5 " onClick={connectToMetamask}>
                <strong>Connect to MetaMask</strong>
              </a>
            </div>
            </div>
            </div>
        </div>
        
       

        </div>
        </div>
        </>
    )
}
 
export default Navbar