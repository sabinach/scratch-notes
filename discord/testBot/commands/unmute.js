module.exports = {
  description: 'Unmute user.',
  execute(message, args){
    const targetUser = message.mentions.users.first()
    if(targetUser){
      let memberRole = message.guild.roles.cache.find(role => role.name === 'Member')
      let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')

      let memberTarget = message.guild.members.cache.get(targetUser.id)

      memberTarget.roles.remove(muteRole.id)
      memberTarget.roles.add(memberRole.id)

      message.channel.send(`${targetUser} has been unmuted.`)
    }else{
      message.channel.send(`Unable to find user: ${targetUser}.`) 
    }
  }
}