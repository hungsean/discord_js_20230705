module.exports = {
    data:
    { 
        name: 'twitterToVX',
    },
    async execute(message) {
        if (!message.content.startsWith(process.env.TWITTER_URL_PREFIX)) return;
        if (message.embeds !== null) return;
        console.log(`[info] messageCreate: twitterToVX`)
        const content = message.content;
        const update = content.replace(process.env.TWITTER_URL_PREFIX, process.env.VXTWITTER_URL_PREFIX);
        await message.channel.send(`${message.member.displayName} ${update}`);
    },
};

// 偵測embed時除了偵測是否為null, 還要確認image是否為空