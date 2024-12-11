const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require("discord.js");

module.exports = {
    category: "admin",
    data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Permet de bannir un membre')
		.addUserOption(option =>  
			option
                .setName('target')
				.setDescription('Le membre à kick')
				.setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        
        try {
            await interaction.guild.members.ban(user);
            await interaction.reply(`${user} a bien été banni.`);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: `Une erreur est survenue lors du bannissement.\nErreur : \`${error}\``, flags: MessageFlags.Ephemeral})
        }
    }

}