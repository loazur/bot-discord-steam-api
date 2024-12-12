const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
    category: "bot-owner",
    data: new SlashCommandBuilder()
		.setName('set-presence')
		.setDescription('Change le status du bot.')
		.addStringOption(option =>  
			option
                .setName('status')
				.setDescription('Le nouveau status à attribuer')
				.setRequired(true)),

	async execute(interaction) {
        // ID de loazur
        if (interaction.user.id != '496730516234436618') {
            return interaction.reply({ content : "Commande inutilisable pour vous 🛠️", flags : MessageFlags.Ephemeral })
        }

        //TODO
        await interaction.reply("caca");
    },
};