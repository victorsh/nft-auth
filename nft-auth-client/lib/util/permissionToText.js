import { ADMIN_ROLE, MOD_ROLE, CONTRIBUTOR_ROLE, MINTER_ROLE, PAUSER_ROLE, USER_ROLE } from '../blockchain/permissions'

const permissionToText = (permission) => {
  switch(permission) {
    case ADMIN_ROLE:
      return 'ADMIN_ROLE'
    case MOD_ROLE:
      return 'MOD_ROLE'
    case CONTRIBUTOR_ROLE:
      return 'CONTRIBUTOR_ROLE'
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
