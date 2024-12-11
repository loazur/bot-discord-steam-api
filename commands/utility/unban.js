const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require("discord.js");

module.exports = {
    category: "admin",
    data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Permet de unban un membre')
		.addUserOption(option =>  
			option
                .setName('target')
				.setDescription('Le membre à unban')
				.setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        
        try {
            await interaction.guild.members.unban(user);
            await interaction.reply(`${user} a bien été unban.`);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: `Une erreur est survenue lors du unban.\nErreur : \`${error}\``, flags: MessageFlags.Ephemeral})
        }
    }

}