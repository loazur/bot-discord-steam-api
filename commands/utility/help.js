const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require("discord.js");

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Affiche un message d\'aide.'),
	 
    async execute(interaction) {
        const commandsList = interaction.client.commands;
		
        // ! utiliser un embed
        let textHelp = "***__Help :__*** \n";

        commandsList.forEach(command => {
            textHelp += `- **${command.data.name}** (${command.category}) | ${command.data.description} \n`;
        });
        
        await interaction.reply(textHelp);

    }

}