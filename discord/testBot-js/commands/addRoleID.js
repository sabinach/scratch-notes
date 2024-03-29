module.exports = {
  description: 'Adds desired role IDs to user.',
  run: (message, args) => {
    if (args.length === 0){
      message.channel.send('Please include at least one role ID to add.') 
    }else{
      args.forEach((roleId, i) => {
        if(message.member.roles.cache.has(roleId)){
          message.channel.send(`You already have the role ID: ${roleId}.`) 
        }else{
          if (message.guild.roles.cache.get(roleId)){
            message.member.roles.add(roleId)
            message.channel.send(`Added role ID: ${roleId}.`)
          }else{
            message.channel.send(`No such role ID exists: ${roleId}.`) 
          }
        }
      })
    }
  }
}