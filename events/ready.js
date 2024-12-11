const { Events, ActivityType } = require('discord.js');

// Permet de gérer l'affichage du message quand ça ce connecte
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setActivity('X', { type: ActivityType.Watching });

		console.log(`Le bot-discord s'est bien connecté avec le compte: ${client.user.tag}`);
	},
};
