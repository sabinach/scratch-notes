module.exports = {
  description: 'Removes desired roles from user.',
  execute(message, args){
    if (args.length === 0){
      message.channel.send('Please include at least one role to remove.') 
    }else{
      args.forEach((role, i) => {
        roleId = message.guild.roles.cache.find(r => r.name === role)
        if(roleId){
          if(message.member.roles.cache.some(r => r.name === role)){
            message.member.roles.remove(roleId)
            message.channel.send(`Removed role: ${role}.`)
          }else{
            message.channel.send(`You already don't have the role: ${role}.`) 
          }
        }else{
          message.channel.send(`No such role exists. Note that roles are case-sensitive!`) 
        }
      })
    }
  }
}