const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits, Collection } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Permet de supprimer un certain nombre de messages.')
        .addIntegerOption(option =>
            option
                .setName("nombre")
                .setDescription("Le nombre de messages à supprimer (Max : 100)")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
        

    async execute(interaction) {        
        const numberOfMessages = interaction.options.getInteger("nombre");

        try {
            const deletedMessages = await interaction.channel.bulkDelete(numberOfMessages, true);

            if (deletedMessages.size == 0)
            {
                return interaction.reply({content: `Aucun messages à supprimer ✅`, flags: MessageFlags.Ephemeral});
            }

            await interaction.reply(`**${deletedMessages.size}** messages ont bien été supprimés ✅`);
            await wait(1_000);
            await interaction.deleteReply();
        } catch (error) {
            await interaction.reply({content: `Une erreur est survenue lors du unban.\nErreur : \`${error}\``, flags: MessageFlags.Ephemeral});
        }
        
    }   
}