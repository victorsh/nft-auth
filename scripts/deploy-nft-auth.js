const fs = require('fs')
const path = require('path')

async function main() {
  const AuthNFT = await ethers.getContractFactory("AuthNFT")
  const authNFT = await AuthNFT.deploy('AuthNFT', 'ANFT', 'http://localhost:3000')
  await authNFT.deployed()

  const addrObj = { 'addr': authNFT.address}
  await fs.writeFileSync(path.join(__dirname, '../nft-auth-client/lib/blockchain/AuthNFTAddr.json'), JSON.stringify(addrObj))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });