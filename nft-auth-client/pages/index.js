import { useEffect, useState } from 'react'
import {ethers} from 'ethers'
import Head from 'next/head'

import Nav from '../components/Nav'
import Button from '../components/Button'

import { mintToken, getOwnedTokens, getPermissions } from '../lib/blockchain/AuthNFT'
import permissionToText from '../lib/util/permissionToText'
import { ADMIN_ROLE, MOD_ROLE, CONTRIBUTOR_ROLE, USER_ROLE } from '../lib/blockchain/permissions'

export default function Home() {
  const [tokenContent, setTokenContent] = useState([])
  const [mintParams, setMintParams] = useState({'text': 'sample', 'special': 0, 'role': ADMIN_ROLE})
  const [userPermissions, setUserPermissions] = useState({'admin': false, 'moderator': false, 'contributor': false, 'user': false})

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

  const handleGetPermissions = async () => {
    const permissions = await getPermissions()
    setUserPermissions(prevState => ({
      ...prevState,
      'admin': permissions[0], 'moderator': permissions[1], 'contributor': permissions[2], 'user': permissions[3]
    }))
  }

  const permissionCard = perm => {
    return (
      <div className='pl-1 pr-1 flex justify-center'>
        <svg className="w-6 h-6 stroke-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        {perm}
      </div>
    )
  }

  useEffect(async () => {
    getFormatOwnedTokens()
  }, [])
  return (
    <>
      <Head>
        <title>Test Page</title>
      </Head>
      <Nav />
      <div className='mx-auto flex flex-col w-2/3 bg-sky-900'>
        <div className='text-white text-5xl mx-auto p-2'>Mint a new token</div>
        <div className='mx-auto flex flex-col w-1/2 justify-evenly'>
          <label className='text-zinc-300'>Message</label>
          <input className='p-1 border-1 border-black rounded text-gray-500' type='text' name='text' value={mintParams.text} onChange={e => handleMintInput(e)} />
          <label className='text-zinc-300'>Special</label>
          <input className='p-1 border-1 border-black rounded text-gray-500' type='text' name='special' value={mintParams.special} onChange={e => handleMintInput(e)} />
          <label className='text-zinc-300'>Role</label>
          <select className='p-1 border-1 border-black rounded text-gray-500' name='role' onChange={e => handleMintInput(e)}>
            <option value={ADMIN_ROLE}>Admin Role</option>
            <option value={MOD_ROLE}>Moderator Role</option>
            <option value={CONTRIBUTOR_ROLE}>Contributor Role</option>
            <option value={USER_ROLE}>User Role</option>
          </select>
        </div>
        <div className='w-1/2 mx-auto flex justify-center mt-4 pb-0'>
          <Button fn={() => handleMintToken()}>Mint Token</Button>
        </div>
      </div>
      <div className='mx-auto w-2/3 bg-green-800 flex justify-evenly flex-col'>
        <div className='flex justify-center'>
          <Button fn={() => handleGetPermissions()}>Token Permissions</Button>
        </div>
        <div className='flex justify-center mb-2'>
          {userPermissions['admin'] ? permissionCard('admin') : ''}
          {userPermissions['moderator'] ? permissionCard('moderator') : ''}
          {userPermissions['contributor'] ? permissionCard('contributor') : ''}
          {userPermissions['user'] ? permissionCard('user') : ''}
        </div>
      </div>
      <div className='flex justify-center'>
        <figure className='md:flex flex flex-col justify-center w-2/3 bg-gray-100 p-8 md:p-0 dark:bg-gray-800'>
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
      <div className='mx-auto bg-gray-500 w-2/3'>
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
