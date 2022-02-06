const { 
  Client, 
  Message,
  MessageActionRow,
  MessageButton
} = require("discord.js")

module.exports = {
  run: async(message, args, client) => {
    const row = new MessageActionRow().addComponents( // max 5 items per row
      new MessageButton()
        .setCustomId('primary-button')
        .setLabel('primary')
        .setStyle('PRIMARY')
        .setDisabled(true),
      new MessageButton()
        .setCustomId('secondary-button')
        .setLabel('secondary')
        .setStyle('SECONDARY')
        .setDisabled(false),
      new MessageButton()
        .setCustomId('success-button')
        .setLabel('success')
        .setStyle('SUCCESS')
        .setDisabled(true),
      new MessageButton()
        .setCustomId('danger-button')
        .setLabel('danger')
        .setStyle('DANGER')
        .setDisabled(false),
      new MessageButton()
        .setLabel('github')
        .setURL('https://github.com/sabinach/scratch-notes/tree/master/discord/testBot-js')
        .setStyle('LINK')
    )
    message.channel.send({ 
      content: "Test Button",
      components: [row] // max 5 rows
    })
  }

}