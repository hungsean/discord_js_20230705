
module.exports = {
    data:
    {
        name: 'twitterEmbeds',
    },
    async execute(message) {
        if (!message.content.startsWith(process.env.TWITTER_URL_PREFIX)) return;
        if (message.embeds.length === 0) return;
        console.log(`[info] messageCreate: twitterEmbeds`);
        console.log(`[info] embeds[0]: `);
        console.log(message.embeds[0]);
        console.log(`[info] embeds[0].image: `);
        console.log(message.embeds[0].image);

    },
};