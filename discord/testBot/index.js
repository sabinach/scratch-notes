const fs = require('fs')
const discord = require('discord.js')
const dotenv = require('dotenv')

// constants
const COMMAND_DIR = './commands'
const PREFIX = '-'

// load in .env file
dotenv.config();

// create new client instance
const client = new discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'] }); 
client.commands = new discord.Collection()

// initialize command list
const files = fs.readdirSync(COMMAND_DIR).filter(file => file.endsWith('.js'))
files.forEach((file, i) => {
  commandName = file.split('.js')[0]
  command = require(`${COMMAND_DIR}/${file}`)
  client.commands.set(commandName.toLowerCase(), command) // force all command names to lowercase
})

// initialize client
client.once('ready', () => {
  console.log('testBot is online!')
  client.user.setActivity("With Bugs",{ type: "PLAYING" })
})

// new member joined
client.on('guildMemberAdd', async guildMember => {
  let memberRole = guildMember.guild.roles.cache.find(role => role.name === 'Member')
  guildMember.roles.add(memberRole)
  guildMember.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID).send(`Welcome <@${guildMember.user.id}> to the TestServer!`)
})

// message commands
client.on('messageCreate', message => {
  if(!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).split(/ +/)
  const command = args.shift().toLowerCase() // pop first arg, force command input to lowercase

  if(client.commands.has(command)){
    client.commands.get(command).execute(message, args)
  }else{
    message.channel.send('Command not found.') 
  }
})

// start bot
client.login(process.env.CLIENT_TOKEN)