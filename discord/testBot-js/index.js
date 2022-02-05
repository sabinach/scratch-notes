const fs = require('fs')
const { Client, Intents, Collection } = require('discord.js');
const dotenv = require('dotenv')
const memberCounter = require('./counters/memberCounter')

// constants
const COMMAND_DIR = './commands'
const PREFIX = '~'

// load in .env file
dotenv.config();

// initialize bot
console.log('Bot is starting...')

// create new client instance
const client = new Client({ 
  partials: [
    'MESSAGE', 
    'CHANNEL', 
    'REACTION'
  ],
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ] 
}); 
client.commands = new Collection()

// initialize command list
const files = fs.readdirSync(COMMAND_DIR).filter(file => file.endsWith('.js'))
files.forEach((file, i) => {
  commandName = file.split('.js')[0]
  command = require(`${COMMAND_DIR}/${file}`)
  client.commands.set(commandName.toLowerCase(), command) // force all command names to lowercase
})

// initialize client
client.once('ready', () => {
  console.log(`${client.user.username} is online.`)
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
    client.commands.get(command).run(message, args, client)
  }else if(client.commands.has(command)){
    client.commands.get(command).run(message, args)
  }else{
    message.channel.send('Command not found.') 
  }
})

// interaction commands
client.on('interactionCreate', async(interaction) => {
  if(interaction.isButton()){
    console.log('interactionCreate Button')
    if(interaction.customId === "primaryID-button"){
      interaction.reply({
        content: "You clicked the primary button."
      })
    }else if (interaction.customId === "secondary-button"){
      interaction.reply({
        content: "You clicked the secondary button."
      })
    }else{
      return interaction.reply({
        content: "You clicked the wrong button."
      })
    }
  }
})

// login to bot
client.login(process.env.TOKEN)