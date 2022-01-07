import nftAuthAbi from '../components/abis/nftAuthAbi.json'

export const mintToken = async () => {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum, "any"
  )
  const signer = await provider.getSigner()
  let userAddr = await signer.getAddress()

  const AuthNFTContract = new ethers.Contract(nftAuthAddr, nftAuthAbi.abi, signer)
  let tx = await AuthNFTContract.mint(userAddr, "hello2", 20, ADMIN_ROLE)
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
  const AuthNFTContract = new ethers.Contract(nftAuthAddr, nftAuthAbi.abi, signer)

  let tx = await AuthNFTContract.getTokenIds(userAddr)
  tx.forEach(async tid => {
    let tx2 = await AuthNFTContract.getTokenContent(Number(tid.toString()))
    console.log(tx2)
  })
}

export const getRoles = async () => {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum, "any"
  )
  const signer = await provider.getSigner()
  let userAddr = await signer.getAddress()
  const AuthNFTContract = new ethers.Contract('0x5fbdb2315678afecb367f032d93f642f64180aa3', nftAuthAbi.abi, signer)
  let tx = await AuthNFTContract.getRoles()
  return tx
}