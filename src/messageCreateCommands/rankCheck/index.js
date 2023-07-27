const data_path = process.env.PATH_DATA + '\\rank.json';
const data = require(data_path);
const {saveJson} = require(process.env.PATH_FUNCTION);
const { Collection } = require('discord.js');

module.exports = {
    data: 
    {
        name: 'rankCheck',
    },
    async execute(message) {
        if (data.rankStarted === false) return;
        console.log(`[info] messageCreate: rankCheck`)
        console.log(`[debug] data.user: ${data.user}`);
        let users = new Collection(data.user);
        console.log(`[debug] users: ${users}`);
        if (!users.has(message.author.id))
        {
            users.set(message.author.id, 1);
        }
        else 
        {
            users.set(message.author.id, user.get(message.author.id) + 1);
        }
        data.user = users.toJSON();
        saveJson(data, data_path);
    },
};
