const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { loadCommands } = require('./function');
const { dotenv } = require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMembers,
    ],
});

client.cooldowns = new Collection();
client.interactionCreateCommands = new Collection();
client.messageCreateCommands = new Collection();

loadCommands(client.interactionCreateCommands, 'interactionCreateCommands');
loadCommands(client.messageCreateCommands, 'messageCreateCommands');

// console.log(client.interactionCreateCommands);

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
	console.log(`${event.name} => Events`);
}

client.login(process.env.TOKEN);