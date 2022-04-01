const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("shuffle").setDescription("shuffles the songs in the current queue"),
	run: async ({ Apollo, interaction }) => {
		const queue = Apollo.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

		queue.shuffle()
        await interaction.editReply("Bye!")
	},
}
