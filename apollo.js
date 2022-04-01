const Discord = require("discord.js")
const dotenv = require("dotenv")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10")
const fs = require("fs")
const { Player } = require("discord-player")
const Apollo =  new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_VOICE_STATES",
        "GUILD_MESSAGES"
    ]
})

dotenv.config();
const TOKEN = process.env.TOKEN;

const LOAD_COMMANDS = process.argv[2] === "load"

const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID

Apollo.slashcommands = new Discord.Collection()
Apollo.player = new Player(Apollo, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMar: 1 << 25
    }
})

let commands = []

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
for (const file of commandFiles) {
    const cmd = require(`./commands/${file}`)
    Apollo.slashcommands.set(cmd.data.name, cmd)
    if (LOAD_COMMANDS) commands.push(cmd.data.toJSON())
}

if (LOAD_COMMANDS) {
    const rest = new REST({ version: "9"}).setToken(TOKEN)
    console.log("Deploying commands")
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
    .then(() => {
        console.log("successfully loaded")
        process.exit(0)
    })
    .catch((err) => {
        if (err) {
            console.log(err)
            process.exit(1)
        }
    })
} else {
  Apollo.on("ready", () => {
      console.log(`logged in as ${Apollo.user.tag}`)
      Apollo.user.setPresence({ activities: [{ name: 'the public beta test' }], status: 'online' })
  })
  Apollo.on("interactionCreate", async interaction => {
      async function handleCommand() {
          if (!interaction.isCommand()) return
          const cmd = Apollo.slashcommands.get(interaction.commandName)
          await interaction.deferReply()
          await cmd.run({ Apollo, interaction })
      }
      handleCommand()
  })
  Apollo.login(TOKEN)

}
