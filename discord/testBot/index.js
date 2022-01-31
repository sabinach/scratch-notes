const fs = require('fs')
const discord = require('discord.js')
const dotenv = require('dotenv')

const memberCounter = require('./counters/memberCounter')

// constants
const COMMAND_DIR = './commands'
const PREFIX = '-'

// load in .env file
dotenv.config();

// create new client instance
const client = new discord.Client({ 
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS'] 
}); 
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
  memberCounter(client)
})

// new member joined
client.on('guildMemberAdd', async guildMember => {
  let memberRole = guildMember.guild.roles.cache.find(role => role.name === 'Member')
  guildMember.roles.add(memberRole)
  guildMember.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID).send(`Welcome <@${guildMember.user.id}> to the TestServer! :raised_hands:`)
})

// message commands
client.on('messageCreate', message => {
  if(!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).split(/ +/)
  const command = args.shift().toLowerCase() // pop first arg, force command input to lowercase

  if(command === 'reactionrole'){ // TODO - make a less repetitive way to do this?
    client.commands.get(command).execute(message, args, client)
  }else if(client.commands.has(command)){
    client.commands.get(command).execute(message, args)
  }else{
    message.channel.send('Command not found.') 
  }
})

// start bot
client.login(process.env.CLIENT_TOKEN)