const controller = require('../../interactionCreateCommands/rank/index.js');
const { Collection } = require('discord.js');

module.exports = {
    data: 
    {
        name: 'rankCheck',
    },
    user: new Collection(),

    async execute(message) {
        console.log(`[debug] rankStarted = ${controller.rankStarted}`)
        if (controller.rankStarted === false) return;
        console.log(`[info] messageCreate: rankCheck`)
        if (!this.user.has(message.author.id))
        {
            this.user.set(message.author.id, 1);
        }
        else 
        {
            this.user.set(message.author.id, this.user.get(message.author.id) + 1);
        }
    },
};
