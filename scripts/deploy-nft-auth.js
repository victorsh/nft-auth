async function main() {
  const AuthNFT = await ethers.getContractFactory("AuthNFT")
  const authNFT = await AuthNFT.deploy('AuthNFT', 'ANFT', 'http://localhost:3000')
  await authNFT.deployed()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });