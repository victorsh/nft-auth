import {ethers} from 'ethers'

export const ADMIN_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE"))
export const CONTRIBUTOR_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("CONTRIBUTOR_ROLE"))
export const MOD_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MOD_ROLE"))
export const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"))
export const PAUSER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("PAUSER_ROLE"))
export const USER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("USER_ROLE"))
