const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
        .setName("delayed-ding")
        .setDescription("Répond avec Dong mais après 3 secondes"),

    async execute(interaction) {
        await interaction.deferReply();
        await wait(3_000);
        await interaction.editReply("DONGG!");
    },
};