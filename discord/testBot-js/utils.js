export const getRoleFromId = (guild, roleId) =>
  guild.roles.cache.get(roleId)

export const getRoleFromName = (guild, roleName) =>
  guild.roles.cache.find(r => r.name === roleName)

export const getUserFromId = (guild, userId) =>
  guild.members.cache.get(userId)

export const getUserFromName = (guild, userName) =>
  guild.members.cache.find(u => u.name === userName)

export const isRoleExist = (guild, roleName) =>
  getRoleFromName(guild, roleName) !== undefined

export const isRoleIdExist = (guild, roleId) =>
  getRoleFromId(guild, roleId) !== undefined

export const isUserExist = (guild, userName) =>
  getUserFromName(guild, userName) !== undefined

export const isUserIdExist = (guild, userId) =>
  getUserFromId(guild, userId) !== undefined

export const hasRole = (member, roleName) =>
  member.roles.cache.some(r => r.name === roleName)

export const hasRoleId = (member, roleId) =>
  member.roles.cache.has(roleId)

export const hasPerm = (member, permId) =>
  member.permissions.has(permId)

export const createRoleMention = (roleId) =>
  `<@&${roleId}>`

export const createRoleMention = (userId) =>
  `<@${userId}>`