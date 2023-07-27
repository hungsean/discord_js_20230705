const {SlashCommandBuilder} = require('discord.js');
const data_path = process.env.PATH_DATA + '\\rank.json';
const data = require(data_path);
const {saveJson} = require(process.env.PATH_FUNCTION);

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
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'start') {
            data.rankStarted = true;
            saveJson(data, data_path);
            await interaction.reply('Rank started!');
        
        }
        else if (interaction.options.getSubcommand() === 'end') {
            data.rankStarted = false;
            saveJson(data, data_path);
            await interaction.reply('Rank ended!');
        }
    }
}
