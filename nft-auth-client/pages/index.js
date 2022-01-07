import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/Nav'
import {useEffect} from 'react'
import {ethers} from 'ethers'
import nftAuthAbi from '../components/abis/nftAuthAbi.json'
import { mintToken, getOwnedTokens } from '../lib/AuthNFT'

export default function Home() {
  useEffect(() => {

  }, [])
  const nftAuthAddr = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

  const ADMIN_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE"))
  const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"))
  const PAUSER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("PAUSER_ROLE"))
  const USER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("USER_ROLE"))
  
  return (
    <>
      <Head>
        <title>Test Page</title>
      </Head>
      <Nav />
      <div className='flex justify-center'>
        <figure className='md:flex flex flex-col justify-center w-6/12 bg-gray-100 rounded-xl p-8 md:p-0 dark:bg-gray-800 shadow-3xl'>
          <div className="pt-6 md:p-8 text-center md:text-left space-y-4 w-full flex justify-center">
            <blockquote>
              <p className="text-lg font-medium text-white">
                "Tokens can only be minted by address that deployed the contract"
              </p>
            </blockquote>
          </div>
          <div className='w-full h-20 flex justify-evenly'>
            <button
              className='mt-2 mb-8 w-24 py-2 px-4 bg-blue-500 hover:bg-blue-400 text-white font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded'
            >
              hehe
            </button>
            <button
              className='mt-2 mb-8 w-30 py-2 px-4 bg-blue-500 hover:bg-blue-400 text-white font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded'
              onClick={() => mintToken()}
            >
              Mint Token
            </button>
            <button
              className='mt-2 mb-8 w-30 py-2 px-4 bg-blue-500 hover:bg-blue-400 text-white font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded'
              onClick={() => getOwnedTokens()}
            >
              Token Content
            </button>
          </div>
        </figure>
      </div>
    </>
  )
}
