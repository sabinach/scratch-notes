module.exports = {
  description: 'Clears messages (includes command itself).',
  async execute(message, args){
    MAX_CLEAR = 5
    if(args.length===0){
      message.channel.send("Please enter the number of messages that you want to clear.")
    }else if (args.length==1){
      numClear = args[0]
      if(isNaN(numClear)){
        message.channel.send("Please enter a real number.")
      }else{
        MAX_CLEAR = 5
        if(numClear <= 0){
          message.channel.send("You cannot delete zero or negative messages.")
        }else if(numClear >= MAX_CLEAR){
          message.channel.send(`You may not delete more than ${MAX_CLEAR} messages at a time.`)
        }else{
          await message.channel.messages.fetch({limit: numClear}).then(messages => {
            message.channel.bulkDelete(messages)
          })
        }
      }
    }
  }
}