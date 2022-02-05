const ms = require('ms')

module.exports = {
  description: 'Mute user.',
  run: (message, args) => {
    const targetUser = message.mentions.users.first()
    if(targetUser){
      let memberRole = message.guild.roles.cache.find(role => role.name === 'Member')
      let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
      let memberTarget = message.guild.members.cache.get(targetUser.id)

      memberTarget.roles.remove(memberRole.id)
      memberTarget.roles.add(muteRole.id)

      muteTime = args[1]
      if(muteTime){
        message.channel.send(`${targetUser} has been muted for ${muteTime}.`)
        setTimeout(() => {
          memberTarget.roles.remove(muteRole.id)
          memberTarget.roles.add(memberRole.id)
          message.channel.send(`${targetUser} has been unmuted.`)
        }, ms(muteTime))
      }else{
        message.channel.send(`${targetUser} has been muted.`)
      }
    }else{
      message.channel.send(`Unable to find user: ${targetUser}.`) 
    }
  }
}