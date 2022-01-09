const { expect } = require("chai");
const { ethers } = require("hardhat");

let owner, tx, authNFT
const accounts = []
const ADMIN_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE"))
const USER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("USER_ROLE"))
const MOD_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MOD_ROLE"))
const CONTRIBUTOR_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("CONTRIBUTOR_ROLE"))

const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"))
const PAUSER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("PAUSER_ROLE"))

describe("AuthNFT", function () {
  before(async () => {
    const signers = await ethers.getSigners()
    for (let i = 0; i < 10; i++) {
      accounts.push(signers[i])
    }
    owner = accounts[0]
  })

  describe("Minting Tokens", async () => {
    before(async () => {
      const AuthNFT = await ethers.getContractFactory("AuthNFT")
      authNFT = await AuthNFT.deploy('AuthNFT', 'ANFT', 'https://authnft.com')
      await authNFT.deployed()
    })
    it("Should mint a token with admin role", async () => {
      tx = await authNFT.mint(accounts[1].address, "hi1", 99, ADMIN_ROLE)
      await tx.wait()
  
      tx = await authNFT.getTokenIds(accounts[1].address)
      tx.forEach(async tid => {
        const txc = await authNFT.getTokenContent(Number(tid.toString()))
        expect(txc[3]).to.equal(ADMIN_ROLE)
      })
    })
    it("Should mint a token with user role", async () => {
      tx = await authNFT.mint(accounts[3].address, "hi1", 91, USER_ROLE)
      await tx.wait()
  
      tx = await authNFT.getTokenIds(accounts[3].address)
      tx.forEach(async tid => {
        const txc = await authNFT.getTokenContent(Number(tid.toString()))
        console.log(txc)
        expect(txc[3]).to.equal(USER_ROLE)
      })
    })
    // ADMIN, MOD, CONTRIBUTOR, USER
    it("Should mint a token and check it's roles", async () => {
      tx = await authNFT.mint(accounts[4].address, "hi1", 91, USER_ROLE)
      await tx.wait()

      tx = await authNFT.getTokenPermissions(accounts[4].address)
      console.log(tx)

      tx = await authNFT.mint(accounts[5].address, "hi1", 91, MOD_ROLE)
      await tx.wait()

      tx = await authNFT.getTokenPermissions(accounts[5].address)
      console.log(tx)
    })
    // it("Should fail to mint without permission", async () => {
    //   await expect(authNFT.connect(accounts[1]).mint(accounts[1].address, "hi1", 99, ADMIN_ROLE))
    //     .to.be.revertedWith("AuthNFT: Must have minter role to mint.")
    // })
  })

  describe("Transfer Tokens", async () => {
    before(async () => {
      const AuthNFT = await ethers.getContractFactory("AuthNFT")
      authNFT = await AuthNFT.deploy('AuthNFT', 'ANFT', 'https://authnft.com')
      await authNFT.deployed()
    })
    it("Should transfer tokens from one user to another", async () => {
      tx = await authNFT.mint(accounts[4].address, "hi1", 99, USER_ROLE)
      await tx.wait()

      tx = await authNFT.mint(accounts[5].address, "hi1", 99, USER_ROLE)
      await tx.wait()

      let usr1Tokens = await authNFT.getTokenIds(accounts[4].address)
      expect(usr1Tokens.length).to.equal(1)

      let usr2Tokens = await authNFT.getTokenIds(accounts[5].address)
      expect(usr2Tokens.length).to.equal(1)

      tx = await authNFT.connect(accounts[5]).transferFrom(accounts[5].address, accounts[4].address, Number(usr2Tokens[0].toString()))

      usr1Tokens = await authNFT.getTokenIds(accounts[4].address)
      expect(usr1Tokens.length).to.equal(2)

      usr2Tokens = await authNFT.getTokenIds(accounts[5].address)
      expect(usr2Tokens.length).to.equal(0)
    })
    it("Should emit transfer event", async () => {
      tx = await authNFT.mint(accounts[6].address, "hi", 99, USER_ROLE)
      await tx.wait()

      tx = await authNFT.mint(accounts[7].address, "hi", 99, USER_ROLE)
      await tx.wait()

      let usr1Tokens = await authNFT.getTokenIds(accounts[6].address)
      console.log(usr1Tokens)
      let usr2Tokens = await authNFT.getTokenIds(accounts[7].address)

      expect(await authNFT.connect(accounts[6]).transferFrom(accounts[6].address, accounts[7].address, Number(usr1Tokens[0].toString())))
        .to.emit(authNFT, 'Transfer').withArgs(accounts[6].address, accounts[7].address, Number(usr1Tokens[0].toString()))
    })
    it("Should emit transfer event and filter", async () => {
      tx = await authNFT.mint(accounts[7].address, "hi", 99, USER_ROLE)
      await tx.wait()

      tx = await authNFT.mint(accounts[8].address, "hi", 99, USER_ROLE)
      await tx.wait()

      let usr1Tokens = await authNFT.getTokenIds(accounts[7].address)
      console.log(usr1Tokens)
      let usr2Tokens = await authNFT.getTokenIds(accounts[8].address)

      tx = await authNFT.connect(accounts[7]).transferFrom(accounts[7].address, accounts[8].address, Number(usr1Tokens[0].toString()))
      let receipt = await tx.wait()

      console.log(receipt.events?.filter((x) => {return x.event == "Transfer"}))
    })
  })
  
  // it("general", async function () {
  //   tx = await authNFT.mint(accounts[1].address, "hi1", 99, ADMIN_ROLE)
  //   await tx.wait()

  //   tx = await authNFT.connect(accounts[1]).getRoles()
  //   console.log(tx)

  //   tx = await authNFT.getTokenContent(0)
  //   console.log(tx)

  //   tx = await authNFT.getTokenIds(accounts[1].address)
  //   console.log('account 1 tokens: ', tx)

  //   tx = await authNFT.mint(accounts[2].address, "act2-1", 60, USER_ROLE);
  //   await tx.wait()

  //   tx = await authNFT.mint(accounts[2].address, "act2-2", 67, ADMIN_ROLE);
  //   await tx.wait()

  //   tx = await authNFT.mint(accounts[2].address, "act2-3", 99, MINTER_ROLE);
  //   await tx.wait()

  //   tx = await authNFT.mint(accounts[2].address, "act2-4", 78, PAUSER_ROLE);
  //   await tx.wait()

  //   tx = await authNFT.getTokenIds(accounts[2].address)
  //   console.log('account 2 tokens: ', tx)

  //   tx = await authNFT.getTokenIds(accounts[1].address)
  //   console.log('account 1 tokens: ', tx)

  //   // tx.forEach(async tid => {
  //   //   console.log(Number(tid.toString()))
  //   //   let tx2 = await authNFT.getTokenContent(Number(tid.toString()))
  //   //   console.log(tx2)
  //   // })

  //   // tx = await authNFT.connect(accounts[1]).transferFrom(accounts[1].address, accounts[2].address, 5)
  //   // await tx.wait()

  //   // tx = await authNFT.getTokenIds(accounts[1].address)
  //   // console.log('account 1 tokens: ', tx)

  //   // tx = await authNFT.getTokenIds(accounts[2].address)
  //   // console.log('account 2 tokens: ', tx)

  //   // tx = await authNFT.connect(accounts[2]).burn(3)
  //   // await tx.wait()

  //   // tx = await authNFT.connect(accounts[2]).getTokenContent(3)
  //   // console.log(tx)

  //   // tx = await authNFT.getTokenIds(accounts[2].address)
  //   // console.log('account 2 tokens: ', tx)
  // });
});
