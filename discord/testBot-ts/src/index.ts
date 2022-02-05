import 'dotenv/config'

import { Client, Intents, Interaction } from "discord.js"
import ready from "./events/ready"
import interactionCreate from "./events/interactionCreate"
import messageCreate from "./events/messageCreate"

// initialize bot
console.log("Bot is starting...");

// initialize client
const client = new Client({
  partials: [
    'MESSAGE', 
    'CHANNEL', 
    'REACTION'
  ],
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES
  ] 
});

// events
ready(client)
messageCreate(client)
interactionCreate(client)

// login to bot
client.login(process.env.TOKEN)