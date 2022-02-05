import { Client } from "discord.js"
import { SlashCommands } from "../SlashCommands"

export default (client: Client):void => {
  client.once("ready", async() => {
    if (!client.user || !client.application) return;
    await client.application.commands.set(SlashCommands)
    console.log(`${client.user.username} is online.`)
  })
}