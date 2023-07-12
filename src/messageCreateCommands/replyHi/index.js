module.exports = {
    data: 
    {
        name: 'replyHi',
    },
    async execute(message) {
        if (message.content !== 'hi') return;
        console.log(`[info] messageCreate: replyHi`)
        await message.reply('hi');
        const messages = message.channel.messages.cache;
        console.log(`[info] messages:`);
        console.log(messages);
    },
};
