module.exports = {
  description: 'Removes desired role IDs from user.',
  execute(message, args){
    if (args.length === 0){
      message.channel.send('Please include at least one role ID to remove.') 
    }else{
      args.forEach((roleId, i) => {
        if(message.member.roles.cache.has(roleId)){
          message.member.roles.remove(roleId)
          message.channel.send(`Removed role ID: ${roleId}.`)
        }else{
          if (message.guild.roles.cache.get(roleId)){
            message.channel.send(`You already don't have the role ID: ${roleId}.`)
          }else{
            message.channel.send(`No such role ID exists: ${roleId}.`) 
          }
        }
      })
    }
  }
}