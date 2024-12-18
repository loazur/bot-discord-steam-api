const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { ownerId, serverPort} = require("../../config.json");

module.exports = {
    category: "bot-owner",
    data: new SlashCommandBuilder()
		.setName('t')
		.setDescription('hah'),

	async execute(interaction) {
        // Reserved Bot-owner command
        if (interaction.user.id != ownerId) {
            return interaction.reply({ content : "Commande inutilisable pour vous 🛠️", flags : MessageFlags.Ephemeral });
        }

        await interaction.reply(`Check: http://localhost:${serverPort}`);
    }
}