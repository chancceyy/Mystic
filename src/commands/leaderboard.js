const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');
const Levels = require('discord.js-leveling');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Look up leaderboard'),
        async execute(interaction, client) {
            const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 5, true); // We grab top 10 users with most xp in the current server.

            if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
            
            const lb = rawLeaderboard.map(e => `<@${e.userID}>\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.
            const embed = new MessageEmbed()
                .setTitle('Leaderboard (Top 5)')
                .setColor('BLUE')
                .setDescription(`${lb.join("\n\n")}`)
            
            return interaction.reply({ embeds: [embed] });
    }
}