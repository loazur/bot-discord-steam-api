const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require("discord.js");

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Affiche un message d\'aide'),
	 
    async execute(interaction) {
        await interaction.reply("*En cours d'implémentation...*");
    }

}