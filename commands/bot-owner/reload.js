const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { ownerId } = require("../../config.json");

module.exports = {
    category: "bot-owner",
    data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Redémarre une commande.')
		.addStringOption(option =>  
			option
                .setName('commande')
				.setDescription('La commande à redémarrer.')
				.setRequired(true)),

	async execute(interaction) {
        // Reserved Bot-owner command
        if (interaction.user.id != ownerId) {
            return interaction.reply({ content : "Commande inutilisable pour vous 🛠️", flags : MessageFlags.Ephemeral });
        }   

		const commandName = interaction.options.getString("commande", true).toLowerCase();
        const command = interaction.client.commands.get(commandName);

        if (!command)
        {
            return interaction.reply({ content : `La commande **__${commandName}__** n'existe pas ❌`, flags: MessageFlags.Ephemeral });
        }

        delete require.cache[require.resolve(`../${command.category}/${command.data.name}.js`)];

        try {
            const newCommand = require(`../${command.category}/${command.data.name}.js`);

            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply({ content : `La commande **__${newCommand.data.name}__** a été mise à jour ✅`, flags: MessageFlags.Ephemeral });

        } catch (error) {
            console.error(error);
            await interaction.reply({ content : `Une erreur est survenu lors du redémarrage de **__${command.data.name}__**:\n ${error.message}`, flags: MessageFlags.Ephemeral });
        }
	},
};
