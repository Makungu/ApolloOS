const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("game").setDescription("suggests a game to play from a list of server approved choices."),
	run: async ({ Apollo, interaction }) => {
		try {	
			let Games = ["League of legends", "Golf with your friends", "Northguard", "Alien Swarm: Reactive Drop", "OverCooked 2", "Risk of Rain 2", "Minecraft"]
			let index = Math.floor(Math.random()* Games.length) 
			await interaction.Reply(`you should play ${Games[index]}`)
		} catch (error) {
            console.log(error)
       
        }
	},
}
