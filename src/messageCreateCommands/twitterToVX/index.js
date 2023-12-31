const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    data:
    { 
        name: 'twitterToVX',
    },
    async execute(message) {
        if (!message.content.startsWith(process.env.TWITTER_URL_PREFIX)) return;

        if (message.embeds.length === 0) ;
        else if (message.embeds[0].image === null) ;
        else return;

        console.log(`[info] messageCreate: twitterToVX`)
        const content = message.content;
        const update = content.replace(process.env.TWITTER_URL_PREFIX, process.env.VXTWITTER_URL_PREFIX);
        let updateMessage = await message.channel.send(`${message.member.displayName} ${update}`);
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        await wait(1000);
        updateMessage = await message.channel.messages.fetch(updateMessage.id);
        
        if (updateMessage.embeds.length === 0)
        {
            // await updateMessage.delete();
            const embed = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('The vxtwitter is not available.')
                .setColor(0xff0000)
                .setTimestamp();
            await message.channel.send({ embeds: [embed] });
        }
        else if (updateMessage.embeds[0].image === null) ;
        {
            await updateMessage.delete();
        }
    },
};

// 偵測embed時除了偵測是否為null, 還要確認image是否為空