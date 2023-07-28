const { SlashCommandBuilder, Collection } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('twitter')
        .setDescription('Twitter command')
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Set channel to check embeds')
                .addChannelOption(option =>
                    option.setName('channel')
                        .setDescription('Channel to check embeds')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('cancel')
                .setDescription('Cancel channel to check embeds')
                .addChannelOption(option =>
                    option.setName('channel')
                        .setDescription('Channel to check embeds')
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has('Administrator')) {
            await interaction.editReply('You do not have permission to use this command.');
            return;
        }

        await interaction.deferReply();
        this.channel_data = await this.updateData();
        
        if (interaction.options.getSubcommand() === 'set') {
            const channel = interaction.options.getChannel('channel');
            if (this.channel_data.get(interaction.guild.id) === undefined)
            {
                this.channel_data.set(interaction.guild.id, [channel.id]);
            }
            else if (this.channel_data.get(interaction.guild.id).includes(channel.id))
            {
                await interaction.editReply(`Channel ${channel} is already set to check embeds`);
                return;
            }
            else
            {
                this.channel_data.get(interaction.guild.id).push(channel.id);
                // debug ---
                console.log(`[debug] this.channel_data.get(interaction.guild.id): \n${this.channel_data.get(interaction.guild.id)[0]}`);
                // debug end ---
                await interaction.editReply(`Set channel to check embeds to ${channel}`);
                return; 
            }
        }
        if (interaction.options.getSubcommand() === 'cancel') {
            const channel = interaction.options.getChannel('channel');
            await interaction.editReply(`Cancelled channel to check embeds to ${channel}`);
            return;
        }
    },
    async updateData(){
        var dataToString;
        var readFileFinished = false;
        await fs.readFile('src\\interactionCreateCommands\\twitter\\data.sav', function(err, data){
            if (err) throw err;
            dataToString = data.toString();
            readFileFinished = true;
            console.log('[info] read file finished');
        })

        while(!readFileFinished)
        {
            console.log('[info] waiting for read to finish');
            await new Promise(resolve => setTimeout(resolve, 1000));
        };
        
        var dataCollection = new Collection();
        var guilds = dataToString.split('\n');
        

        for (var guild of guilds)
        {
            
            var guildID = guild.split(':')[0];
            var channels = guild.split(':')[1].split(',');
            

            dataCollection.set(guildID, channels);
        }
        
        



        return dataCollection;
    },
    channel_data: new Collection(),

}