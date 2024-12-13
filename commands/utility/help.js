const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Affiche un message d\'aide.'),
	 
    async execute(interaction) {
        const commandsList = interaction.client.commands;
		
        const helpEmbed = new EmbedBuilder()
            .setColor("White")
            .setTitle('__/help:__')
            .setDescription("Voici les informations sur les commandes existantes.")
            .setThumbnail(`${interaction.client.user.avatarURL()}`)
            .setTimestamp()
            .setFooter({ text: `${interaction.client.user.username}`, iconURL: `${interaction.client.user.avatarURL()}` });

        let field_utility = "";
        let field_moderation = "";
        let field_steam = "";

        commandsList.forEach(command => {
            switch (command.category) {
                case "utility":
                    field_utility += `- **/${command.data.name}** - ${command.data.description} \n`;
                    break;

                case "moderation":
                    field_moderation += `- **/${command.data.name}** - ${command.data.description} \n`;
                    break;

                case "steam":
                    field_steam += `- **/${command.data.name}** - ${command.data.description} \n`;
                    break;
            }
        });

        
        helpEmbed.addFields(
            { name: '__Utility ♣__', value: field_utility },
            { name: '__Moderation 🛠__', value: field_moderation },
            { name: '__Steam 📱__', value: field_steam },
            { name: '\u200b', value: '*D\'autres commandes seront ajoutées prochainement.*' }
        )

        await interaction.reply({embeds: [helpEmbed]});

    }

}