const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");
const { steamAPI_key } = require("../../config.json")

const SteamUser = require('steamapi-node');
const steam = new SteamUser(steamAPI_key);

const { getColor } = require("get-palette");

const fs = require("node:fs/promises");
const path = require("node:path");

module.exports = {
    category: "steam",
    data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Affiche les stats d\'un utilisateur choisit.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('url-perso')
                .setDescription('Affiche les stats d\'un utilisateur grâce à son url perso.')
                .addStringOption(option => option.setName('url').setDescription('Le nom du compte Steam à afficher.').setRequired(true)))

        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Affiche les stats d\'un utilisateur grâce à son user')
                .addUserOption(option => option.setName('user').setDescription('Le compte Discord de l\'utilisateur à afficher.').setRequired(true))),
        
	 
    async execute(interaction) {
        const command = interaction.options.getSubcommand();

        await interaction.deferReply();

        // Pour pouvoir le changer dans chaque subcommand
        let id;

        switch(command) {
            case "url-perso": //* Commande en utilisant l'url perso
                
                const urlperso = interaction.options.getString("url");
                id = await steam.others.resolve(`/id/${urlperso}`);
                break;

            case "user": //* Commande en utilisant l'user
                
                const userToCheck = interaction.options.getUser("user");
                
                const filePath = path.join(__dirname, "data.json")
                const fileContent = await fs.readFile(filePath, {encoding: "utf-8"})
                
                let existingData = fileContent ? JSON.parse(fileContent) : [];
                
                let hasFoundAcc = false;

                // On vérifie si il est dans le data.json
                for (let donnee of existingData) {
                    if (donnee.id === userToCheck.id)
                    {
                        hasFoundAcc = true;

                        id = await steam.others.resolve(`/profiles/${donnee.steamId}`);
                        break;
                    }
                };


                if (!hasFoundAcc)
                {
                    return interaction.editReply(`**__${userToCheck.tag}__** n'a pas lié son compte Steam ❌`)
                }
                

                break;
            }

            

        // * Le reste de la commande qui se fais pour les deux cas
        try {
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
                )
                .setTimestamp()
                .setFooter({ text: `SteamStats`, iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1024px-Steam_icon_logo.svg.png' });
    
            
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