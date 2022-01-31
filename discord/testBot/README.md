# testBot

### Specs
- NodeJS
- Discord.js

### Setup [[video](https://youtu.be/j_sD9udZnCk)]
- ```npm init```
- ```npm install discord.js``` (requires node version >16)

### To Run
- ```npm ci```
- ```node index.js```

### Functionalities [[playlist](https://www.youtube.com/playlist?list=PLbbLC0BLaGjpyzN1rg-gK4dUqbn8eJQq4)]
- Command Handlers [[video 1](https://youtu.be/nTGtiCC3iQM)] [[video 2](https://youtu.be/AUOb9_aAk7U)]
- Permissions & Roles [[video 1](https://youtu.be/5BArCspxauI)] [[video 2](https://youtu.be/xpdIzcK3v3E)]
  * Permission Guides: https://discordjs.guide/popular-topics/permissions.html#roles-as-bot-permissions
  * Permission Flags: https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
- Embeds [[video](https://youtu.be/I7eZY-SBmf8)]
  * Embed Methods: https://discordjs.guide/popular-topics/embeds.html#embed-preview
- Clear Messages [[video](https://youtu.be/INQgI-MQcj0)]
- Kick & Ban Commands [[video](https://youtu.be/LFL5BWHurR4)]
- Mute & Timed Mute [[video](https://youtu.be/PHGdIm7iHhI)]
- Join Role & Message [[video](https://youtu.be/kjw6Hl-ZYIE)]
  * In order for the `addGuildMember()` event to work on new member join:
    - Include: `const client = new discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'] }); `
    - Turn on `Server Members Intent` on the [Discord Developers Portal](https://discord.com/developers/applications).
- Reaction Roles [[video](https://youtu.be/wXjsCiUjUqo)]
    - https://emojipedia.org/
      * emoji name = shortcode ie. `:emojiName:`
      * emoji unicode = click COPY on the website
- Member Counter [[video](https://youtu.be/Re20s6RVUb4)]
  * Turn on `Presence Members Intent` and `Server Members Intent` on the [Discord Developers Portal](https://discord.com/developers/applications).
  * There will be a delay. Member count will update when Discord updates its cache.

### TODO
- Aliases [[video](https://youtu.be/QBUJ3cdofqc)]
- Cooldowns [[video](https://youtu.be/WGTZgZVVclw)]
- YouTube Music Bot [[video 1](https://youtu.be/3wJJDM7jUsk)] [[video 2](https://youtu.be/riyHsgI2IDs)]
  * Commands: `-play`, `-pause`, `-resume`, `-queue`, `-skip`, `-clearQueue`, `-leave`
- Buttons [[video](XXX)]
- Google Image Scraper [[video](XXX)]
- Suggestions [[video](XXX)]
- MongoDB [[video](XXX)]
- Apache Cassandra [[video](XXX)]
