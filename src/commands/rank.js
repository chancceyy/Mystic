const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');
const Levels = require('discord.js-leveling');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Look up ur level'),
        async execute(interaction, client) {
            const user = await Levels.fetch(interaction.user.id, interaction.guild.id); // Selects the target from the database.

            if (!user) return interaction.reply({ content: "Seems like this user has not earned any xp so far." }); // If there isnt such user in the database, we send a message in general.

            return interaction.reply({ content: `> **${interaction.user.tag}** is currently level ${(user.level)} (${user.xp} / ${Levels.xpFor(parseInt(user.level) + 1)}) .`})
        }
}