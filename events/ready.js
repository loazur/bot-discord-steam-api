const { Events } = require('discord.js');

// Permet de gérer l'affichage du message quand ça ce connecte
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Le client s'est bien connecté avec le compte : ${client.user.tag} !`);
	},
};
