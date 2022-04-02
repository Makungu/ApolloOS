const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("quit").setDescription("Stops the bot and clears the queue"),
	run: async ({ Apollo, interaction }) => {
		try {

			const queue = Apollo.player.getQueue(interaction.guildId)
	
			if (!queue) return await interaction.editReply("There are no songs in the queue")
	
			queue.destroy()
			await interaction.editReply("Bye!")
		} catch (error) {
            console.log(error)
        }
	},
}
