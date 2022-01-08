import {ethers} from 'ethers'

const ADMIN_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE"))
const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"))
const PAUSER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("PAUSER_ROLE"))
const USER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("USER_ROLE"))

const permissionToText = (permission) => {
  switch(permission) {
    case ADMIN_ROLE:
      return 'ADMIN_ROLE'
    case MINTER_ROLE:
      return 'MINTER_ROLE'
    case PAUSER_ROLE:
      return 'PAUSER_ROLE'
    case USER_ROLE:
      return 'USER_ROLE'
    default:
      return 'Role not found'
  }
}

export default permissionToText
