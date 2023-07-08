
module.exports = {
    data:
    {
        name: 'twitterEmbeds',
    },
    async execute(message) {
        if (!message.content.startsWith(process.env.VXTWITTER_URL_PREFIX)) return;
        if (message.embeds === null) return;
        console.log(`[info] messageCreate: twitterEmbeds`);
        console.log(`[info] embeds[0]: `);
        console.log(message.embeds[0]);
        console.log(`[info] embeds[0].author: `);
        console.log(message.embeds[0].author);
        console.log(`[info] embeds[0].fields: `);
        console.log(message.embeds[0].fields);
        console.log(`[info] embeds[0].footer: `);
        console.log(message.embeds[0].footer);
        console.log(`[info] embeds[0].image: `);
        console.log(message.embeds[0].image);

    },
};