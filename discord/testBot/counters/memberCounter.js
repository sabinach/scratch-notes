const dotenv = require('dotenv')

module.exports = async (client) => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID)
  setInterval(() => {
    const memberCount = guild.memberCount
    const memberCountChannel = guild.channels.cache.get(process.env.MEMBERCOUNT_CHANNEL_ID)
    memberCountChannel.setName(`Total Members: ${memberCount.toLocaleString()}`)
  }, 5000) // 5000 millsec = 5 sec, should be like 10min
}