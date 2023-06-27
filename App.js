import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import React, { useState } from 'react';
import { ethers } from "ethers"

import './App.css';
import MarketplaceAbi from './contractsData/Marketplace.json'
import MarketplaceAddress from './contractsData/Marketplace-address.json'
import NFTAbi from './contractsData/NFT.json'
import NFTAddress from './contractsData/NFT-address.json'
import ordermanagement from './frontend/ABIS/OrderManagement.sol/OrderManagement.json'

// import ordermanagementaddress from 'ABIS/OrderManagement.sol/OrderManagement.json'


function App() {
  let Exchange, OrderManagement, ERC721Mock, ERC20Mock, NFTRouter, WETH9;
  let exchange, orderManagement, erc721, erc20, nftRouter, weth9;
  let owner, maker, taker;

  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
  // MetaMask Login/Connect

// 实例化一个web3实例以供操作
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    const provider = new ethers.BrowserProvider(window.ethereum)
    // Set signer
    const signer = provider.getSigner()
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    loadContracts(signer)
  }

// 加载智能合约的abi
  const loadContracts = async (signer) => {
    // Get deployed copies of ABIS
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    const orders = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(nft)
    setLoading(false)
     Exchange = await ethers.Contract("Exchange");
        exchange = await Exchange.deploy(orderManagement.address, nftRouter.address, weth9.address);
        await exchange.deployed();
        console.log("exchange deployed at:", exchange.address);
  }

  // return这里写HTML，在app.js里组织文件路由
  return (
    <BrowserRouter>
    </BrowserRouter>

  );
}

export default App;
