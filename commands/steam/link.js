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
        
        await interaction.reply("la commande ne fais rien");

        
    }
}
    