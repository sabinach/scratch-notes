import { BaseCommandInteraction, Client } from "discord.js"
import { SlashCommand } from "../SlashCommand"

export const HelloWorld: SlashCommand = {
  name: "helloworld",
  description: "Returns a greeting",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const content = "Hello World!"
    await interaction.followUp({
      ephemeral: true,
      content
    })
  }
}
