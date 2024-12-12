const { SlashCommandBuilder, MessageFlags, ActivityType } = require("discord.js");

module.exports = {
    category: "bot-owner",
    data: new SlashCommandBuilder()
		.setName('set-presence')
		.setDescription('Change le status du bot.')
        .addStringOption(option => 
            option
                .setName("activity")
                .setDescription("La nouvelle activité à attribuer")
                .setRequired(true)
                .addChoices(
                    {name: "Watching (-> Regarde ...)", value: "watching"},
                    {name: "Listening (-> Écoute ...)", value: "listening"},
                    {name: "Playing (-> Joue à ...)", value: "playing"},
                ))
		.addStringOption(option =>  
			option
                .setName('status')
				.setDescription('Le nouveau status à attribuer')
				.setRequired(true)),

	async execute(interaction) {
        // ID de loazur
        if (interaction.user.id != '496730516234436618') {
            return interaction.reply({ content : "Commande inutilisable pour vous 🛠️", flags : MessageFlags.Ephemeral })
        }

        const activity = interaction.options.getString("activity");
        const status = interaction.options.getString("status");

        try {
            switch(activity) {
                case "watching":
                    interaction.client.user.setActivity(status, { type: ActivityType.Watching });
                    break;
    
                case "listening":
                    interaction.client.user.setActivity(status, { type: ActivityType.Listening });
                    break;
    
                case "playing":
                    interaction.client.user.setActivity(status, { type: ActivityType.Playing });
                    break;
            }

            await interaction.reply({content: `Le status de __**${interaction.client.user.username}**__ a été changé avec succés ✅`, flags: MessageFlags.Ephemeral});
        } catch (error) {
            console.error(error);
            await interaction.reply({content: `Une erreur est survenue lors du changement de status.\nErreur : \`${error}\``, flags: MessageFlags.Ephemeral})
        }
   
    },
};