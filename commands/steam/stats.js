const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");
const { guildId, steamAPI_key } = require("../../config.json")
const SteamUser = require('steamapi-node');
const steam = new SteamUser(steamAPI_key);

module.exports = {
    category: "steam",
    data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Affiche des stats d\'un utilisateur choisi.'),
	 
    async execute(interaction) {
        // En dév
        if (interaction.guildId != guildId) 
        {
            return interaction.reply({content: "*Commande en cours d'implémentation...*", flags: MessageFlags.Ephemeral})
        }

        try {
            steam.others.resolve('profiles/76561199223943541/').then(id => {
                // handle returned data
                steam.users.getUserSummary(id).then(result => {
                    console.log(result);
                })
            })

            await interaction.reply("command reçu");
        } catch (error) {
            await interaction.reply({content: `Une erreur est survenue lors du changement de status.\nErreur : \`${error}\``, flags: MessageFlags.Ephemeral})
        }
        
    }
        
}