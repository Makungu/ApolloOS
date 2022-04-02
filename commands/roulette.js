const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("roulette").setDescription("Feeling lucky? play for a one in 6 chance to get kick from the server"),
	run: async ({ Apollo, interaction }) => {
		try {
			let index = Math.floor(Math.random()* 6) 
		} catch (error) {
            console.log(error)
       
        }
	},
}
