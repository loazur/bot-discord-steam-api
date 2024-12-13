const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");
const { guildId, steamAPI_key } = require("../../config.json")

const SteamUser = require('steamapi-node');
const steam = new SteamUser(steamAPI_key);

const { getColor } = require("get-palette");

module.exports = {
    category: "steam",
    data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Affiche les stats d\'un utilisateur choisit.')
        .addStringOption(option =>
            option
                .setName("username")
                .setDescription("Le nom du compte Steam a afficher.")
                .setRequired(true)
        ),
	 
    async execute(interaction) {
        const username = interaction.options.getString("username");
        
        try {
            await interaction.deferReply();

            // Toutes les données
            const id = await steam.others.resolve(`/id/${username}`);
            const infos = await steam.users.getUserSummary(id) || {};
            const lvl = (await steam.users.getUserLevel(id)) || "Inconnu";
            const friends = (await steam.users.getUserFriends(id)) || [];
        
            // Jeu le plus joué
            let mostPlayedGameDetails = null;
            let gamesOwned = null;
            let mostPlaytime = 0;
        
            // Vérifier l'accès aux jeux
            try {
                gamesOwned = await steam.users.getUserOwnedGames(id);

                // Si la liste est remplis
                if (Array.isArray(gamesOwned) && gamesOwned.length > 0) {
                    // Sélection du jeu le plus joué
                    let mostPlayedGameID = 0;
        
                    // On prend le plus joué
                    for (let i = 0; i < gamesOwned.length; ++i) {
                        if (gamesOwned[i].playTime > mostPlaytime) {
                            mostPlaytime = gamesOwned[i].playTime;
                            mostPlayedGameID = gamesOwned[i].appID;
                        }
                    }
        
                    if (mostPlayedGameID > 0) {
                        mostPlayedGameDetails = await steam.games.getGameDetails(mostPlayedGameID);
                    }
                }
            } catch (error) {
                // On continue le programme sans les jeux.
            }
        
            // Calcul du temps de jeu (si disponible)
            let playTimeText = "Non disponible";

            if (mostPlaytime > 0) {
                const hours = Math.floor(mostPlaytime / 60);
                const minutes = mostPlaytime % 60;

                playTimeText = `${hours}h ${minutes}m`;
            }

            // Couleur de l'embed
            const mainColor = await getColor(infos.avatar.large);
        
            // Création de l'embed
            const statsEmbed = new EmbedBuilder()
                .setColor(mainColor) 
                .setTitle(`Profil de **__${infos.nickname || "Inconnu"}__**`)
                .setThumbnail(infos.avatar.large)
                .addFields(
                    { name: "SteamID", value: `\`${infos.steamID || "Inconnu"}\``, inline: true },
                    { name: "Niveau", value: `\`${lvl}\``, inline: true },
                    { name: "Date de création", value: `\`${new Date(infos.created * 1000).toLocaleString() || "Inconnu"}\``},
                    { name: "Nombre d'amis", value: `${friends.length} ${friends.length === 0 ? "ami" : "amis"}` },
                );

        
            // Ajouter la section des jeux si elle est disponible
            if (gamesOwned) {
                statsEmbed.addFields(
                    { name: "Jeux possédés", value: `${gamesOwned.length} jeux \nPlus joué: **${mostPlayedGameDetails.name}** - ${playTimeText}`});
            } 
            else {
                statsEmbed.addFields(
                    { name: "Jeux possédés", value: "Non accessible" }
                );
            }

            // Pour les ajoutés à la fin
            statsEmbed.addFields(
                { name: "Statut", value: `*${infos.personaState === 0 ? `__Hors ligne__` : "__En ligne__"}*` },
                { name: "URL du Profil", value: `${infos.profileURL || "Non disponible"}` }
            )
        
            await interaction.editReply({ embeds: [statsEmbed] });
        } catch (error) {
            await interaction.editReply({content: `Une erreur est survenue lors de l'affichage des stats Steam.\nErreur : \`${error.message}\``, flags: MessageFlags.Ephemeral});
        }
        
    }
        
}