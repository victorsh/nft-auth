# AuthNFT

This is a sample project showcasing NFTs with User Authorization levels. Each nft minted to a user gives that user a certain permission level. The permission
level determines what can be accessed within the frontend of the application.

#### Client Install & Run
The client is built using NextJS and TailwindCSS

`cd nft-auth-client`
`npm run dev`

#### Hardhat Test & Deploy
env: Rename `.env.config` to `.env`, set your ethereum private key
test: `npx hardhat test test/AuthNFT-test.js`
deploy-local: `npx hardhat run --network localhost scripts/deploy-nft-auth.js`
deploy-mumbai: `npx hardhat run --network mumbai scripts/deploy-nft-auth.js`

#### Hardhat Commands
```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
