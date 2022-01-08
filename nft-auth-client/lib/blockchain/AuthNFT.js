import nftAuthAbi from '../../components/abis/nftAuthAbi.json'
import AuthNFTAddr from './AuthNFTAddr.json'
import {ethers} from 'ethers'

const ADMIN_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE"))
const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"))
const PAUSER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("PAUSER_ROLE"))
const USER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("USER_ROLE"))

export const mintToken = async (text, special, role) => {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum, "any"
  )
  const signer = await provider.getSigner()
  let userAddr = await signer.getAddress()

  const AuthNFTContract = new ethers.Contract(AuthNFTAddr.addr, nftAuthAbi.abi, signer)
  let tx = await AuthNFTContract.mint(userAddr, text, special, role)
  await tx.wait()

  tx = await AuthNFTContract.getTokenIds(userAddr)
  console.log(tx.toString())
}

export const getOwnedTokens = async () => {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum, "any"
  )
  const signer = await provider.getSigner()
  let userAddr = await signer.getAddress()
  const AuthNFTContract = new ethers.Contract(AuthNFTAddr.addr, nftAuthAbi.abi, signer)

  let tx = await AuthNFTContract.getTokenIds(userAddr)
  let tokenContent = []

  for (const tid of tx) {
    let tx2 = await AuthNFTContract.getTokenContent(Number(tid.toString()))
    const content = {
      id: Number(tid.toString()),
      text: tx2[0],
      special: tx2[1].toString(),
      random: tx2[2].toString(),
      permission: tx2[3]
    }
    tokenContent.push(content)
  }
  return tokenContent
}

export const getRoles = async () => {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum, "any"
  )
  const signer = await provider.getSigner()
  const AuthNFTContract = new ethers.Contract(AuthNFTAddr.addr, nftAuthAbi.abi, signer)

  return await AuthNFTContract.getRoles()
}