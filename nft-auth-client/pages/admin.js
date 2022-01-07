import {useEffect, useState} from 'react'
import {ethers} from 'ethers'
import nftAuthAbi from '../components/abis/nftAuthAbi'
import Nav from '../components/Nav'

export default function Admin() {
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum, "any"
      )
      const signer = await provider.getSigner()
      let userAddr = await signer.getAddress()
      const AuthNFTContract = new ethers.Contract('0x5fbdb2315678afecb367f032d93f642f64180aa3', nftAuthAbi.abi, signer)
      let tx = await AuthNFTContract.getRoles()
      console.log(tx)
      if (tx[0] !== "FALSE") {
        setApproved(true)
      }
    })()
  }, [])
  return (
    <div>
      <Nav />
      {approved ?
        <div>This account is approved</div>
      : 
        <div>This account is not approved</div>
      }
    </div>
  )
}