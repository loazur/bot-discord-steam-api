const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require("discord.js");
const { ownerId } = require("../../config.json");

const fs = require("node:fs/promises");
const path = require("node:path");

module.exports = {
    category: "steam",
    data: new SlashCommandBuilder()
		.setName('list-linked')
		.setDescription('Affiche la liste des utilisateurs liés.'),

	async execute(interaction) {
        // Reserved Bot-owner command
        if (interaction.user.id != ownerId) {
            return interaction.reply({ content : "Commande inutilisable pour vous 🛠️", flags : MessageFlags.Ephemeral });
        }

        const filePath = path.join(__dirname, "data.json")
        const fileContent = await fs.readFile(filePath, {encoding: "utf-8"})

        let existingData = fileContent ? JSON.parse(fileContent) : [];

        let texteDesc = " ";

        
        for (let donnee of existingData) {
            texteDesc += `**${donnee.user}** (${donnee.id}) \n`;
        };
        
            
        const linkedEmbed = new EmbedBuilder()
            .setColor("NotQuiteBlack")
            .setTitle('__Liste comptes liés:__')
            .setDescription(texteDesc)
            .setTimestamp()
            .setFooter({ text: `${interaction.client.user.username}`, iconURL: `${interaction.client.user.avatarURL()}` });

        await interaction.reply({embeds: [linkedEmbed]});
    }
}