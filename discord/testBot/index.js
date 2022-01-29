const discord = require('discord.js')
const tokens = require('./utils/tokens')

const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] }); 

client.once('ready', () => {
  console.log('testBot is online!')
})

client.login(tokens.CLIENT_TOKEN)