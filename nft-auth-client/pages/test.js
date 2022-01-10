import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import {ethers} from 'ethers'
import Nav from '../components/Nav'
import {useState, useEffect} from 'react'

export default function Test() {
  return (
    <>
      <Head>
        <title>Test Page</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly. window.FB has been populated`)
        }
      />
      <Nav />
      <Image src="/images/basic-heart-1024.png" height={256} width={256} alt="basic-heart-1024" />
      <h1 className="text-3xl font-bold underline">
        hi
      </h1>
      <div className='flex justify-center'>
        <figure className='md:flex flex flex-col justify-center w-6/12 bg-gray-100 rounded-xl p-8 md:p-0 dark:bg-gray-800 shadow-3xl'>
          <div className="pt-6 md:p-8 text-center md:text-left space-y-4 w-full flex justify-center">
            <blockquote>
              <p className="text-lg font-medium text-white">
                something so mething something else and some more something to go along with it
              </p>
            </blockquote>
          </div>
          <div className='w-full flex justify-center'>
            <button className='mt-2 mb-8 w-24 py-2 px-4 bg-blue-500 hover:bg-blue-400 text-white font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded'>hehe</button>
          </div>
        </figure>
      </div>
    </>
  )
}