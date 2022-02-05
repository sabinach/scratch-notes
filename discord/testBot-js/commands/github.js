module.exports = {
  description: 'Returns the github repo for this discord testBot.',
  run: (message, args) => {
    message.channel.send('https://github.com/sabinach/scratch-notes/tree/master/discord/testBot-js') 
  }
}