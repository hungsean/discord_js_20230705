const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { loadCommands, saveJson } = require('./function');
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

const rank_data = JSON.parse(fs.readFileSync(path.join(process.env.PATH_DATA, 'rank.json')));
rank_data.rankStarted = false;
rank_data.user = new Collection().toJSON();
saveJson(rank_data, path.join(process.env.PATH_DATA, 'rank.json'));




		

client.login(process.env.TOKEN);