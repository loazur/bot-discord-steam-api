const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");
const { guildId, steamAPI_key } = require("../../config.json")

const fs = require("node:fs/promises");
const path = require("node:path");

const SteamUser = require('steamapi-node');
const steam = new SteamUser(steamAPI_key);

module.exports = {
    category: "steam",
    data: new SlashCommandBuilder()
		.setName('link')
		.setDescription('Permet de lier son compte Steam.'),

    async execute(interaction){
        // En cours d'implémentation...
        if (interaction.guildId != guildId) {
            return interaction.reply({content: "*En cours d'implémentation...*", flags: MessageFlags.Ephemeral})
        }
        
        const filePath = path.join(__dirname, "data.json")
        const fileContent = await fs.readFile(filePath, {encoding: "utf-8"})

        let existingData = fileContent ? JSON.parse(fileContent) : [];

        for (let donnee of existingData) {
            if (donnee.user === interaction.user.tag)
            {
                return interaction.reply("Vous etes deja lier.")
            }
        };

        let data = {
            user: interaction.user.tag,
            id: interaction.user.id
        };

        existingData.push(data);

        await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
        await interaction.reply("Vous avez bien été lier.");

        
    }
}
    