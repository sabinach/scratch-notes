module.exports = {
  description: 'Returns \'pong!\'.',
  run: (message, args) => {
    message.channel.send('pong!')
  }
}