import React, { useEffect, useState } from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { getAddress, getNetwork } from 'ethers'

const networks = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  4: 'Rinkeby Testnet',
  11155111: 'Sepolia Testnet',
  137: 'Polygon Mainnet',
  80001: 'Mumbai Testnet (Polygon)',
};

export default function Navbar(props) {

  const {connectWallet, signer, provider} = props

  const location = useLocation()
  const navigate = useNavigate()

  const {isOpen, onOpen, onClose} = useDisclosure()
  const btnRef = React.useRef()

  const [address, setAddress] = useState(null)
  const loadAddress = async () => {
    if (signer != null) {
      setAddress(await signer.getAddress())
    }
  }

  const [network, setNetwork] = useState(null)
  const loadNetwork = async () => {
    setNetwork(await window.ethereum.request({method: 'eth_chainId'}))
  }
  useEffect(() => {
    loadAddress()
    loadNetwork()
  }, [signer])

  return (
    <>
      <div className='text-2xl border-b-2  bg-orange-300 flex justify-between shadow-xl'>
      <div className='flex flex-row gap-8 p-5'>
        <div className='cursor-pointer mt-1' ref={btnRef} onClick={onOpen}><AiOutlineMenu/></div>
        <div className='cursor-pointer' onClick={() => navigate('/')}>Logo</div>
      </div>
      <div className='flex flex-row gap-8'>
        <div onClick={() => navigate('/')} className={`p-5 cursor-pointer ${location.pathname === '/' ? "border-b-2 border-black" : ""}`}>Home</div>
        <div onClick={() => navigate('/about')} className={`p-5 cursor-pointer ${location.pathname === '/about' ? "border-b-2 border-black" : ""}`}>About Us</div>
        <div onClick={() => navigate('/contact')} className={`p-5 cursor-pointer ${location.pathname === '/contact' ? "border-b-2 border-black" : ""}`}>Contact Us</div>
        <div className='p-3'><div className='bg-white p-2 rounded-full text-orange-500 cursor-pointer' onClick={address != null ? null : connectWallet}>{address === null ? "Connect Wallet" : address.substring(0,6)+'...'+address.substring(36,42)}</div></div>
      </div>
    </div>

    <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent >
        <DrawerCloseButton/>
        <DrawerHeader>Wallet Details</DrawerHeader>

        <DrawerBody>

          {address === null 
            ? "Connect your wallet to see wallet details!"
            : <div>
                <div className='font-bold mt-2'>Wallet Address:</div>
                {address}
                <br/>
                <div className='font-bold mt-3'>Current Network:</div>
                {networks[parseInt(network, 16)]}
                <br/>
                <div className='font-bold mt-3'>ChainID:</div>
                {parseInt(network, 16)}
                <br/>

              </div>
          }

        </DrawerBody>
      </DrawerContent>
    </Drawer>
    </>
  )
}
