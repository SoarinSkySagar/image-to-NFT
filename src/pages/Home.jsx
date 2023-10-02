import React, { useState } from 'react'

export default function Home() {

    const [selectedFile, setSelectedFile] = useState(null)
    const [nftName, setNftName] = useState('')
    const [confirmedData, setConfirmedData] = useState(null)

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handleTextChange = (e) => {
        setNftName(e.target.value)
    }

    const handleConfirm = () => {
        if (selectedFile && nftName.trim() !== '') {
            setConfirmedData({
                image: selectedFile,
                name: nftName
            })
        } else {
            alert("Please give NFT image and NFT name before confirming")
        }
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {confirmedData ? (
        <div className='text-center mb-4'> 
            <img className='rounded-lg mx-auto mb-2' src={URL.createObjectURL(confirmedData.image)} alt='NFT to be minted'/>
            <div className='text-lg'>{confirmedData.name}</div>
        </div>
      ) : (
        <div className='mb-4'>
            <input type='file' onChange={handleFileChange} className='mb-2' />
            <input type='text' placeholder='NFT Name' value={nftName} onChange={handleTextChange} className='mb-2 p-2 border border-gray-300 rounded'/>
            <button onClick={handleConfirm} className='bg-blue-500 text-white px-4 py-2 rounded'>Confirm</button>
        </div>
      )}
    </div>
  )
}
