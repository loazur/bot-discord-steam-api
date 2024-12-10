const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('ding')
		.setDescription('Répond avec Dong'),
		
	async execute(interaction) {
		await interaction.reply('DONNGG');
	},
};

    