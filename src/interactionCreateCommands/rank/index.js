const {SlashCommandBuilder} = require('discord.js');
// const user = require('../../messageCreateCommands/rankCheck/index.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('About rank commands')
        .addSubcommand(subcommand =>
            subcommand
                .setName('start')
                .setDescription('Start a rank')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('end')
                .setDescription('End a rank')
        ),
    rankStarted: false,
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'start') {
            await interaction.reply('Rank started!');
            this.rankStarted = true;
        }
        else if (interaction.options.getSubcommand() === 'end') {
            await interaction.reply('Rank ended!');
            this.rankStarted = false;

            console.log(`[info] rank: `)
            // console.log(user);
        }
    }
}
