const { Permissions } = require('discord.js');

module.exports = {
  description: 'Kick user.',
  execute(message, args){
    if(message.mentions.users.size==0){
      message.channel.send("Please mention a valid @user to kick.")
    }else{
      message.mentions.users.forEach((user, i) => {
        if( message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) ){
          if (user.id === message.member.user.id){
            message.channel.send("You may not kick yourself. To leave the server, please right-click the server icon and select 'Leave Server'.")
          }else{
            targetUser = message.guild.members.cache.get(user.id)
            targetUser.kick()
            modRole = message.guild.roles.cache.find(r => r.name === "Moderator")
            message.channel.send(`<@&${modRole.id}>, <@${targetUser.id}> has been kicked by <@${message.member.id}>.`)
          }
        }else{
          message.channel.send("You do not have the permissions to kick users.")
        }
      })
    }
  }
}