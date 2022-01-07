const fs = require('fs')
const util = require('util')
const path = require('path')

const run = async () => {
  const abiFile = await fs.readFileSync(path.join(__dirname, 'artifacts/contracts/AuthNFT.sol/AuthNFT.json'), 'utf-8')
  const parsedAbiFile = JSON.parse(abiFile)
  console.log(parsedAbiFile['abi'])
  const abiObject = {
    abi: parsedAbiFile['abi']
  }

  await fs.writeFileSync(path.join(__dirname, '/nft-auth-client/components/abis/nftAuthAbi.json'), JSON.stringify(abiObject))
}

run()