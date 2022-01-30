const getRoleFromId = (guild, roleId) =>
  guild.roles.cache.get(roleId)

const getRoleFromName = (guild, roleName) =>
  guild.roles.cache.find(r => r.name === roleName)

const getUserFromId = (guild, userId) =>
  guild.members.cache.get(userId)

const getUserFromName = (guild, userName) =>
  guild.members.cache.find(u => u.name === userName)

const isRoleExist = (guild, roleName) =>
  getRoleFromName(guild, roleName) !== undefined

const isRoleIdExist = (guild, roleId) =>
  getRoleFromId(guild, roleId) !== undefined

const isUserExist = (guild, userName) =>
  getUserFromName(guild, userName) !== undefined

const isUserIdExist = (guild, userId) =>
  getUserFromId(guild, userId) !== undefined

const hasRole = (member, roleName) =>
  member.roles.cache.some(r => r.name === roleName)

const hasRoleId = (member, roleId) =>
  member.roles.cache.has(roleId)

const hasPerm = (member, permId) =>
  member.permissions.has(permId)

const createRoleMention = (roleId) =>
  `<@&${roleId}>`

const createRoleMention = (userId) =>
  `<@${userId}>`