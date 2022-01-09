import {useState, useEffect} from 'react'
import {ethers} from 'ethers'

import Link from 'next/link'
import { connectWallet, checkMetamaskConnected } from '../lib/blockchain/wallet'

export default function Nav() {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [metamaskConnected, setMetamaskConnected] = useState('connect')
  const handleMenuToggle = () => {
    toggleMenu ? setToggleMenu(false) : setToggleMenu(true)
  }

  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined
    })

    useEffect(() => {
      if (typeof window !== 'undefined') {
        function handleResize() {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
          })
        }

        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
      }
    }, [])
    return windowSize
  }

  const windowSize = useWindowSize()

  useEffect(async () => {
    if (await checkMetamaskConnected()) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum, "any"
      )
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      setMetamaskConnected(address)
    }
  }, [])
  return (
    <>
      <nav className="w-1/2 mx-auto flex items-center justify-between flex-wrap bg-gray-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
            />
          </svg>
          <span className="font-semibold text-xl tracking-tight">NFT Auth</span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => handleMenuToggle()}
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        {toggleMenu || windowSize.width > 1024 ?
          <div className="text-sm lg:flex-grow">
            <Link href="/">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Home</a>
            </Link>
            <Link href="/admin">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Admin</a>
            </Link>
            <Link href="/">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">About</a>
            </Link>
            <Link href="/">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Example</a>
            </Link>
          </div>
          : ''}
          <div>
            <button
              onClick={() => connectWallet()}
              className="\
                inline-block text-sm px-4 py-2 mt-4 lg:mt-0 w-20\
                leading-none border rounded text-white border-white \
                hover:border-transparent hover:text-teal-500 hover:bg-white"
            >
              <div className="w-20 overflow-clip">
                {metamaskConnected}
              </div>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}