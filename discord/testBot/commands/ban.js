const { Permissions } = require('discord.js');

module.exports = {
  description: 'Ban user.',
  execute(message, args){
    if(message.mentions.users.size==0){
      message.channel.send("Please mention a valid @user to ban.")
    }else{
      message.mentions.users.forEach((user, i) => {
        if( message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS) ){
          if (user.id === message.member.user.id){
            message.channel.send("You may not ban yourself. To leave the server, please right-click the server icon and select 'Leave Server'.")
          }else{
            targetUser = message.guild.members.cache.get(user.id)
            //targetUser.ban()
            modRole = message.guild.roles.cache.find(r => r.name === "Moderator")
            message.channel.send(`<@&${modRole.id}>, <@${targetUser.id}> has been banned by <@${message.member.id}>.`)
          }
        }else{
          message.channel.send("You do not have the permissions to ban users.")
        }
      })
    }
  }
}