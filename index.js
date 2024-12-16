// Importe les différentes bibliothèques
const fs = require("node:fs");
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token, serverPort } = require('./config.json');

// Créé une nouvelle instance de client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Pour avoir la liste des commandes
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');	
const commandFolders = fs.readdirSync(foldersPath);

// Pour les commandes
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {

		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}

	}
}

// Pour les events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

/*
// EXPRESS
const express = require('express');
const app = express();

app.get('/', (request, response) => {
	return response.sendFile('./index.html', { root: '.' });
});

app.listen(serverPort, () => console.log(`App listening at http://localhost:${serverPort}`));
*/

// Se connecte
client.login(token);