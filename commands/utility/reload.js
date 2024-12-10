const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    category: "bot-admin",
    data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Redémarre une commande')
		.addStringOption(option =>  
			option.setName('command')
				.setDescription('La commande à redémarrer')
				.setRequired(true)),

	async execute(interaction) {
        // ID de loazur
        if (interaction.user.id != '496730516234436618') {
            return interaction.reply("Commande inutilisable pour vous.")
        }

		const commandName = interaction.options.getString("command", true).toLowerCase();
        const command = interaction.client.commands.get(commandName);

        if (!command)
        {
            return interaction.reply(`La commande : '${commandName}' n'existe pas.`);
        }

        delete require.cache[require.resolve(`./${command.data.name}.js`)];

        try {
            const newCommand = require(`./${command.data.name}.js`);

            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`La commande : '${newCommand.data.name}', a été mise à jour.`);

        } catch (error) {
            console.error(error);
            await interaction.reply(`Une erreur est survenu lors du redémarrage de : '${command.data.name}':\n ${error.message}`);
        }

	},
};
