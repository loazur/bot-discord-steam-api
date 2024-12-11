const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require("discord.js");

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Affiche un message d\'aide'),
	 
    async execute(interaction) {
        const commandsList = interaction.client.commands;
		
        // ! Pas fini (y ajouter plus d'infos) -> utiliser un embed
        let textHelp = "***__Help :__*** \n";
        
        for (let [key, value] of commandsList)
        {
            if (key == "help")
            {
                textHelp += `- **__${key}__**\n`;
                continue;
            }

            textHelp += `- **${key}** \n`;
        }

        await interaction.reply(textHelp);

    }

}