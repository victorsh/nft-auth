const { expect } = require("chai");
const { ethers } = require("hardhat");

let owner, tx
const accounts = []

describe("AuthNFT", function () {
  before(async () => {
    const signers = await ethers.getSigners()
    for (let i = 0; i < 10; i++) {
      accounts.push(signers[i])
    }
    owner = accounts[0]
  })
  it("It should mint tokens", async function () {
    const AuthNFT = await ethers.getContractFactory("AuthNFT")
    const authNFT = await AuthNFT.deploy('AuthNFT', 'ANFT', 'https://authnft.com')
    await authNFT.deployed()

    tx = await authNFT.mint(accounts[1].address, "hi", 100)
    await tx.wait()

    tx = await authNFT.mint(accounts[1].address, "hi2", 99)
    await tx.wait()

    tx = await authNFT.connect(accounts[1]).getRoles()
    console.log(tx)

    tx = await authNFT.getTokenContent(0)
    console.log(tx)

    tx = await authNFT.getTokenContent(1)
    console.log(tx)

    tx = await authNFT.getTokenIds(accounts[1].address)
    console.log('account 1 tokens: ', tx)

    tx = await authNFT.mint(accounts[2].address, "act2-1", 88);
    await tx.wait()

    tx = await authNFT.mint(accounts[2].address, "act2-2", 81);
    await tx.wait()

    tx = await authNFT.mint(accounts[2].address, "act2-3", 85);
    await tx.wait()

    tx = await authNFT.mint(accounts[1].address, "act1-3", 78);
    await tx.wait()

    tx = await authNFT.getTokenIds(accounts[2].address)
    console.log('account 2 tokens: ', tx)

    tx = await authNFT.getTokenIds(accounts[1].address)
    console.log('account 1 tokens: ', tx)

    tx.forEach(async tid => {
      console.log(Number(tid.toString()))
      let tx2 = await authNFT.getTokenContent(Number(tid.toString()))
      console.log(tx2)
    })

    tx = await authNFT.connect(accounts[1]).transferFrom(accounts[1].address, accounts[2].address, 5)
    await tx.wait()

    tx = await authNFT.getTokenIds(accounts[1].address)
    console.log('account 1 tokens: ', tx)

    tx = await authNFT.getTokenIds(accounts[2].address)
    console.log('account 2 tokens: ', tx)

    tx = await authNFT.connect(accounts[2]).burn(3)
    await tx.wait()

    tx = await authNFT.connect(accounts[2]).getTokenContent(3)
    console.log(tx)

    tx = await authNFT.getTokenIds(accounts[2].address)
    console.log('account 2 tokens: ', tx)
  });
});
