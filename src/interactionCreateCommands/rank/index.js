const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('About rank commands')
        .addSubcommand(subcommand =>
            subcommand
                .setName('start')
                .setDescription('Start a rank')
        ),
    rankStarted: false,
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'start') {
            await interaction.reply('Rank started!');
            this.rankStarted = true;
        }
    }
}
