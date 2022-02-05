import { BaseCommandInteraction, Client, Interaction, Message } from "discord.js"
import { SlashCommands } from "../SlashCommands"

export default (client: Client): void => {
  client.on("messageCreate", async (message: Message) => {
    console.log(message)
  })
}