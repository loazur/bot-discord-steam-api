const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require("discord.js");
const { guildId } = require('../../config.json');

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Permet de supprimer un certain nombre de messages.')
        .addIntegerOption(option =>
            option
                .setName("nombre")
                .setDescription("Le nombre de messages à supprimer.")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
        

    async execute(interaction) {
        // Commande en développement. 
        if (interaction.guildId != guildId)
        {
            return interaction.reply({content: "*Commande en cours d'implémentation...*", flags: MessageFlags.Ephemeral});
        }

        const numberOfMessages = interaction.options.getInteger("nombre");

        // TODO
        await interaction.reply("caca");
    }
}