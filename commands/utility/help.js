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
            .setDescription(" ")
            .addFields({ name: '\u200b', value: '*D\'autres commandes seront ajoutées prochainement.*' })
            .setThumbnail(`${interaction.client.user.avatarURL()}`)
            .setTimestamp()
            .setFooter({ text: `${interaction.client.user.username}`, iconURL: `${interaction.client.user.avatarURL()}` });

        let textHelp = "";

        commandsList.forEach(command => {
            textHelp += `- **${command.data.name}** (${command.category}) | ${command.data.description} \n`;
        });
        
        helpEmbed.setDescription(textHelp);

        await interaction.reply({embeds: [helpEmbed]});

    }

}