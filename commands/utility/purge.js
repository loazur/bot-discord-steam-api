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

        const channelMessages = interaction.channel.messages;
        const numberOfMessages = interaction.options.getInteger("nombre");

        //TODO
        /*
        channelMessages.fetch({ limit: numberOfMessages, cache: false })
            .then(messages => 
                console.log(messages)
            )
            .catch(console.error);
        */
        await interaction.reply("*pas fini*");
    }   
}