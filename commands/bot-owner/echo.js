const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
    category: "bot-owner",
    data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Permet d\'envoyer un message via le bot.')
        .addStringOption(option => 
            option
                .setName("message")
                .setDescription("Le message à envoyer.")
                .setRequired(true)),

	async execute(interaction) {
        // ID de loazur
        if (interaction.user.id != '496730516234436618') {
            return interaction.reply({ content : "Commande inutilisable pour vous 🛠️", flags : MessageFlags.Ephemeral })
        }

        const message = interaction.options.getString("message");
        await interaction.channel.send(message);

        // Pour ne pas crée d'erreur
        await interaction.reply({content: ".", flags: MessageFlags.Ephemeral});
        await interaction.deleteReply();
    }
}