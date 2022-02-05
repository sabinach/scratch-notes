module.exports = {
  description: 'Adds desired roles to user.',
  run: (message, args) => {
    if (args.length === 0){
      message.channel.send('Please include at least one role to add.') 
    }else{
      args.forEach((role, i) => {
        roleId = message.guild.roles.cache.find(r => r.name === role)
        if(roleId){
          if(message.member.roles.cache.some(r => r.name === role)){
            message.channel.send(`You already have the role: ${role}.`) 
          }else{
            message.member.roles.add(roleId)
            message.channel.send(`Added role: ${role}.`)
          }
        }else{
          message.channel.send(`No such role exists. Note that roles are case-sensitive!`) 
        }
      })
    }
  }
}