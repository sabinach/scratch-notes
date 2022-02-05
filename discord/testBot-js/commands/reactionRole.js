const { MessageEmbed } = require('discord.js')
const dotenv = require('dotenv')

module.exports = {
  description: 'Sets up a reaction role message.',
  run: async (message, args, client) => {
    const rolesChannelId = process.env.ROLES_CHANNEL_ID
    const rolesChannel = message.member.guild.channels.cache.get(rolesChannelId)
    const roleA = message.guild.roles.cache.find(role => role.name === "Team A")
    const roleB = message.guild.roles.cache.find(role => role.name === "Team B")
    const emojiA = ':white_heart:'
    const emojiB = ':yellow_heart:'
    const unicodeA = '🤍'
    const unicodeB = '💛'

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Choose a team!')
      .setDescription(`${emojiA} for Team A\n${emojiB} for Team B`)

    const messageEmbed = await rolesChannel.send({ embeds: [ embed ] });
    messageEmbed.react(unicodeA)
    messageEmbed.react(unicodeB)

    // add role
    client.on('messageReactionAdd', async (reaction, user) => {
      if(reaction.message.partial) await reaction.message.fetch()
      if(reaction.partial) await reaction.fetch()
      if(user.bot) return
      if(!reaction.message.guild) return

      if(reaction.message.channel.id == rolesChannelId){
        if(reaction.emoji.name == unicodeA){
          await reaction.message.guild.members.cache.get(user.id).roles.add(roleA)
        }
        if(reaction.emoji.name === unicodeB){
          await reaction.message.guild.members.cache.get(user.id).roles.add(roleB)
        }
      }else{
        return
      }
    })

    // remove role
    client.on('messageReactionRemove', async (reaction, user) => {
      if(reaction.message.partial) await reaction.message.fetch()
      if(reaction.partial) await reaction.fetch()
      if(user.bot) return
      if(!reaction.message.guild) return

      if(reaction.message.channel.id == rolesChannelId){
        if(reaction.emoji.name == unicodeA){
          await reaction.message.guild.members.cache.get(user.id).roles.remove(roleA)
        }
        if(reaction.emoji.name === unicodeB){
          await reaction.message.guild.members.cache.get(user.id).roles.remove(roleB)
        }
      }else{
        return
      }
    })
  }
}