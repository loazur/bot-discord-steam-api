const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require("discord.js");

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Affiche un message d\'aide.'),
	 
    async execute(interaction) {
        const commandsList = interaction.client.commands;
		
        const helpEmbed = new EmbedBuilder()
            .setColor("White")
            .setTitle('__Help:__')
            .setDescription("Voici les informations sur les commandes existantes.")
            .setThumbnail(`${interaction.client.user.avatarURL()}`)
            .setTimestamp()
            .setFooter({ text: `${interaction.client.user.username}`, iconURL: `${interaction.client.user.avatarURL()}` });

        let field_utility = "";
        let field_moderation = "";
        let field_botOwner = "";

        commandsList.forEach(command => {
            switch (command.category) {
                case "utility":
                    
                    field_utility += `- **/${command.data.name}** - ${command.data.description} \n`;
                    break;

                case "moderation":
                    field_moderation += `- **/${command.data.name}** - ${command.data.description} \n`;
                    break;

                case "bot-owner":
                    field_botOwner += `- **/${command.data.name}** - ${command.data.description} \n`;
                    break;
            }
        });

        
        helpEmbed.addFields(
            { name: '__Utility:__', value: field_utility },
            { name: '__Moderation:__', value: field_moderation },
            { name: '__Bot-owner:__', value: field_botOwner },
            { name: '\u200b', value: '*D\'autres commandes seront ajoutées prochainement.*' }
        )

        await interaction.reply({embeds: [helpEmbed]});

    }

}