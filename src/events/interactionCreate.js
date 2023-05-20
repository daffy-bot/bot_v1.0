const { InteractionType } = require("discord.js");

module.exports = {
	name: 'interactionCreate',
	execute: async (interaction) => {
		let client = interaction.client;
		if (interaction.type == InteractionType.ApplicationCommand) {
			if (interaction.user.bot) return;
			try {
				const command = client.slashcommands.get(interaction.commandName)
				command.run(client, interaction)
			} catch (e) {
				console.error(e)
				interaction.reply({ content: "¡Se encontró un problema al ejecutar el comando! Inténtalo de nuevo.", ephemeral: true })
			}
		}
	}
}
