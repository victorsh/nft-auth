import { useEffect, useState } from 'react'
import {ethers} from 'ethers'
import Head from 'next/head'

import Nav from '../components/Nav'
import Button from '../components/Button'

import nftAuthAbi from '../components/abis/nftAuthAbi.json'
import { mintToken, getOwnedTokens } from '../lib/blockchain/AuthNFT'
import permissionToText from '../lib/util/permissionToText'

const ADMIN_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE"))
const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"))
const PAUSER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("PAUSER_ROLE"))
const USER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("USER_ROLE"))

export default function Home() {
  const [tokenContent, setTokenContent] = useState([])
  const [mintParams, setMintParams] = useState({'text': 'sample', 'special': 0, 'role': USER_ROLE})
  useEffect(async () => {
    getFormatOwnedTokens()
  }, [])

  const getFormatOwnedTokens = async () => {
    const ownedTokens = await getOwnedTokens() 
    setTokenContent(ownedTokens)
  }

  const handleMintInput = (e) => {
    console.log(e.target.name, e.target.value)
    const name = e.target.name
    setMintParams(prevState => ({...prevState, [name]: e.target.value}))
  }

  const handleMintToken = () => {
    mintToken(mintParams.text, mintParams.special, mintParams.role)
  }
  
  return (
    <>
      <Head>
        <title>Test Page</title>
      </Head>
      <Nav />
      <div className='mx-auto flex flex-col w-1/2 bg-sky-900'>
        <div className='text-black text-5xl mx-auto p-2'>Mint a new token</div>
        <div className='mx-auto flex flex-col w-1/2 justify-evenly'>
          <label className='text-zinc-300'>Message</label>
          <input className='p-1 border-1 border-black rounded text-gray-500' type='text' name='text' value={mintParams.text} onChange={e => handleMintInput(e)} />
          <label className='text-zinc-300'>Special</label>
          <input className='p-1 border-1 border-black rounded text-gray-500' type='text' name='special' value={mintParams.special} onChange={e => handleMintInput(e)} />
          <label className='text-zinc-300'>Role</label>
          <select className='p-1 border-1 border-black rounded text-gray-500' name='role' onChange={e => handleMintInput(e)}>
            <option value={ADMIN_ROLE}>Admin Role</option>
            <option value={MINTER_ROLE}>Minter Role</option>
            <option value={PAUSER_ROLE}>Pauser Role</option>
            <option value={USER_ROLE}>User Role</option>
          </select>
        </div>
        <div className='w-1/2 mx-auto'>
          <Button fn={() => handleMintToken()}>Mint Token</Button>
        </div>
      </div>
      <div className='flex justify-center'>
        <figure className='md:flex flex flex-col justify-center w-6/12 bg-gray-100 p-8 md:p-0 dark:bg-gray-800'>
          <div className="pt-6 md:p-8 text-center md:text-left space-y-4 w-full flex justify-center">
            <blockquote>
              <p className="text-lg font-medium text-white">
                Click the button below to get all the tokens that you own.
              </p>
            </blockquote>
          </div>
          <div className='w-full h-20 flex justify-evenly'>
            <Button fn={() => getFormatOwnedTokens()}>Token Content</Button>
          </div>
        </figure>
      </div>
      <div className='mx-auto bg-gray-500 w-1/2'>
        {tokenContent.map(({id, text, special, random, permission}) => {
          return (
            <div key={id}>
              <hr />
              <div>text: {text}</div>
              <div>special: {special}</div>
              <div>random: <span className=''>{random}</span></div>
              <div>permission: {permissionToText(permission)}</div>
              <hr />
            </div>
          )
        })}
      </div>
    </>
  )
}
