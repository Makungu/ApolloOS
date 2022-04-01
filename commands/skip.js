const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("skip").setDescription("skips the current song in the queue."),
	run: async ({ Apollo, interaction }) => {
		const queue = Apollo.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

		queue.skip()
        await interaction.editReply({
            embeds: [
                new MessageEmbed().setDescription(`${currentSong.title} has been skipped!`).setThumbnail(currentSong.thumbnail)
            ]
        })
	},
}
