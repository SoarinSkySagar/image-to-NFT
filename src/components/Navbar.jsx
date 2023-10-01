import React from 'react'
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

export default function Navbar(props) {

  const {connectWallet} = props

  const location = useLocation()
  const navigate = useNavigate()

  const {isOpen, onOpen, onClose} = useDisclosure()
  const btnRef = React.useRef()

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
        <div className='p-3'><div className='bg-white p-2 rounded-full text-orange-500 cursor-pointer' onClick={connectWallet}>Connect Wallet</div></div>
      </div>
    </div>

    <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent >
        <DrawerCloseButton/>
        <DrawerHeader>Wallet Details</DrawerHeader>

        <DrawerBody>

          Connect your wallet to see wallet details!

        </DrawerBody>
      </DrawerContent>
    </Drawer>
    </>
  )
}
