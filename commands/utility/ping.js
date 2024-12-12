const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Affiche le ping du bot."),

    async execute(interaction) {
        const sent = await interaction.deferReply({ content: '*Recherche du ping...🔎*', fetchReply: true });

        const pingEmbed = new EmbedBuilder()
            .setColor("NotQuiteBlack")
            .setTitle('__/ping__')
            .setDescription(`\`${sent.createdTimestamp - interaction.createdTimestamp}ms\``)
            .setThumbnail(`https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjFiOHoweXhncDluNmE2aGZpdWk3cnhrZXQzNnB3Zms5ODNvN3VqNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LiT8C58iDYSZBKgf1S/giphy.gif`)
            .setFooter({ text: `${interaction.client.user.username}`, iconURL: `${interaction.client.user.avatarURL()}` });

        await interaction.editReply({embeds: [pingEmbed]});

    }
}