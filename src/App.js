import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

function App() {

  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)

  useEffect(() => {
    const loadProvider = () => {
      if (window.ethereum == null) {
        console.log("Metamask not installed")
      } else {
        setProvider(new ethers.BrowserProvider(window.ethereum))
      }
    }
    loadProvider() 
  }, [])

  const loadSigner = async () => {
    if (provider != null) {
      setSigner(await provider.getSigner())
    }
  }

  useEffect(() => {
    console.log(provider)
    console.log(signer)
  }, [signer])

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar connectWallet={loadSigner} signer={signer} provider={provider}/>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact Us</div>}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
