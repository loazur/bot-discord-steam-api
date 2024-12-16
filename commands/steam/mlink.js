const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");
const { ownerId, steamAPI_key } = require("../../config.json")

const fs = require("node:fs/promises");
const path = require("node:path");

module.exports = {
    category: "steam",
    data: new SlashCommandBuilder()
		.setName('mlink')
		.setDescription('Permet de lier un compte manuellement.')
        .addUserOption(option =>  
			option
                .setName('user')
				.setDescription('L\'utilisateur à ajouter.')
				.setRequired(true))   
        .addStringOption(option =>  
			option
                .setName('id')
				.setDescription('L\'id de l\'utilisateur.')
				.setRequired(true)),

    async execute(interaction){
        // Bot-owner
        if (interaction.user.id != ownerId) {
            return interaction.reply({ content : "Commande inutilisable pour vous 🛠️", flags : MessageFlags.Ephemeral });
        }
        
        const userToAdd = interaction.options.getUser("user");
        const idOfUser = interaction.options.getString("id");

        const filePath = path.join(__dirname, "data.json")
        const fileContent = await fs.readFile(filePath, {encoding: "utf-8"})

        let existingData = fileContent ? JSON.parse(fileContent) : [];

        for (let donnee of existingData) {
            if (donnee.user === userToAdd.tag)
            {
                return interaction.reply("Le compte est déjà lié ✅")
            }
        };

        let data = {
            user: userToAdd.tag,
            id: userToAdd.id,
            steamId: idOfUser
        };

        existingData.push(data);

        await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
        await interaction.reply(`Le compte de **__${userToAdd.tag}__** a bien été lié ✅`)
    }
}