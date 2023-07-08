const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        console.log(`[info] message: `);
        console.log(message);
        message.client.messageCreateCommands.forEach(command => {
            command.execute(message);
        });
    },
};