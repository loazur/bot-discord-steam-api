const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits, flatten } = require("discord.js");

module.exports = {
    category: "moderation",
    data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Permet de bannir un membre.')
		.addUserOption(option =>  
			option
                .setName('cible')
				.setDescription('Le membre à ban.')
				.setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    
    async execute(interaction) {
        const user = interaction.options.getUser('cible');

        // Impossibilité de se bannir sois même 
        if (interaction.user.id == user.id)
        {
            return interaction.reply({content: `Vous ne pouvez pas vous bannir vous même ❌`, flags: MessageFlags.Ephemeral});
        }
        
        try {
            await interaction.guild.members.ban(user);
            await interaction.reply(`${user} a bien été banni ✅`);
        } catch (error) {
            await interaction.reply({content: `Une erreur est survenue lors du bannissement.\nErreur : \`${error.message}\``, flags: MessageFlags.Ephemeral});
        }
    }

}