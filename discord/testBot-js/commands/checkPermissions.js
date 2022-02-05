const { Permissions } = require('discord.js');

module.exports = {
  description: 'Check if user has the desired permission.',
  run: (message, args) => {
    if (args.length === 0){
      message.channel.send('Please include at least one permission flag.') 
    }else{
      args.forEach((permission, i) => {
        if(permission in Permissions.FLAGS){
          if( message.member.permissions.has(Permissions.FLAGS[permission]) ){
            message.channel.send(`User has the permission: ${permission}.`)
          }else{
            message.channel.send(`User does NOT have the permission: ${permission}.`)
          }
        }else{
          message.channel.send('Permission does not exist. Please use one of the valid flags here: https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS')
        }
      })
    }
  }
}