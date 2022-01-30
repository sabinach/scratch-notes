module.exports = {
  description: 'Returns \'pong!\'.',
  execute(message, args){
    message.channel.send('pong!')
  }
}