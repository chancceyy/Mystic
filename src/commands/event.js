const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('event')
        .setDescription('Send a message letting staff know of an event')
        .addStringOption(option =>
            option.setName('what')
                .setDescription('What the event is')
                .setRequired(true))
        .addStringOption(option =>
                    option.setName('where')
                        .setDescription('Where the event is')
                        .setRequired(true))
        .addStringOption(option =>
                            option.setName('when')
                                .setDescription('When the event is')
                                .setRequired(true))
        .addStringOption(option =>
                        option.setName('prize')
                            .setDescription('What the prize is')
                            .setRequired(true)),
        async execute(interaction, client) {
            const what = interaction.options.getString('what');
            const where = interaction.options.getString('where');
            const when = interaction.options.getString('when');
            const prize = interaction.options.getString('prize');
            
            const embed = new MessageEmbed()
                .setTitle(`<:partypopper:968383344545001522> **__Event__** <:partypopper:968383344545001522>`)
                .setColor('BLUE')
                .setDescription(`
<:gaming:968380770483834910> **What**:
\`${what}\`

<:mysticdoor:968380791459561482> **Where:**
\`${where}\`

<:MysticClock:978019063454388347> **When:**
\`${when}\`

<:MysticCoin:978018981388632064> **Prize:**
\`${prize}\`
        `)    
                
            await interaction.reply({ embeds: [embed]})
            return interaction.followUp({ content: '<@&967514477010501633>' })
        }
}