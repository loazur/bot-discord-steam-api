const { Events, MessageFlags } = require('discord.js');

// Permet de gérer chaque commandes
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`La commande : ${interaction.commandName} n'existe pas.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'Une erreur est survenu lors de la commande.', flags: MessageFlags.Ephemeral });
			} else {
				await interaction.reply({ content: 'Une erreur est survenu lors de la commande.', flags: MessageFlags.Ephemeral });
			}
		}
	},
};
