const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");
const { guildId, steamAPI_key } = require("../../config.json")
const SteamUser = require('steamapi-node');
const steam = new SteamUser(steamAPI_key);

const axios = require('axios');
const cheerio = require('cheerio'); // Pour analyser le HTML

module.exports = {
    category: "steam",
    data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Affiche les stats d\'un utilisateur choisit')
        .addStringOption(option =>
            option
                .setName("username")
                .setDescription("Le nom du compte Steam a afficher.")
                .setRequired(true)
        ),
	 
    async execute(interaction) {
        const username = interaction.options.getString("username");
        
        try {
            const id = await steam.others.resolve(`/id/${username}`);
            const result = await steam.users.getUserSummary(id);

            console.log(result);
            
            const statsEmbed = new EmbedBuilder()
                .setColor("Blurple")
                .setTitle(`Profil de **__${result.nickname}__**`)
                .addFields(
                    {name: "SteamID", value: `*${result.steamID}*`},
                    {name: "Compte crée", value: `*${new Date(result.created * 1000).toLocaleString()}*`},
                    {name: "Statut", value: `*${result.personaState === 0 ? `__Hors ligne__` : "__En ligne__"}*`},
                    {name: "URL du Profil", value: `${result.profileURL}`}
                )
                .setImage(result.avatar.large)
                .setTimestamp()
                .setFooter({ text: `SteamStats`, iconURL: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1024px-Steam_icon_logo.svg.png` });

            await interaction.reply({embeds: [statsEmbed]});
                
             
        } catch (error) {
            await interaction.reply({content: `Une erreur est survenue lors du changement de status.\nErreur : \`${error}\``, flags: MessageFlags.Ephemeral})
        }
        
    }
        
}