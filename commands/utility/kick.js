const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require("discord.js");

module.exports = {
    category: "admin",
    data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Permet de kick un membre')
		.addUserOption(option =>  
			option
                .setName('cible')
				.setDescription('Le membre à kick')
				.setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    
    async execute(interaction) {
        const user = interaction.options.getUser('cible');

        // Impossibilité de se kick sois même 
        if (interaction.user.id == user.id)
        {
            return interaction.reply({content: `Vous ne pouvez pas vous kick vous même ❌`, flags: MessageFlags.Ephemeral});
        }
        
        try {
            await interaction.guild.members.kick(user);
            await interaction.reply(`${user} a bien été kick ✅`);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: `Une erreur est survenue lors du kick.\nErreur : \`${error}\``, flags: MessageFlags.Ephemeral})
        }
    }

}