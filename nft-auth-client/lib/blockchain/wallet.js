import {ethers} from 'ethers'

export const connectWallet = async () => {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum, "any"
  )

  await provider.send("eth_requestAccounts", [])
  const signer = provider.getSigner()
  let userAddress = await signer.getAddress()
  console.log(userAddress)
  let balance = await provider.getBalance(userAddress)
  console.log(balance)
  // let mySig = await signer.signMessage('Signed NFTAuth')
  // console.log(mySig)
  return { userAddr: userAddress, userBalance: balance }
}

export const checkMetamaskConnected = async () => {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum, "any"
  )
  const accounts = await provider.listAccounts()
  return accounts.length > 0
}

export const checkNetwork = async () => {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum, "any"
  )
  const { chainId } = await provider.getNetwork()
  return chainId === 80001
}