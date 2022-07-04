const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Levels = require('discord.js-leveling');
const canvacord = require('canvacord')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Look up ur level'),
        async execute(interaction, client) {
            const user = await Levels.fetch(interaction.user.id, interaction.guild.id, true); 

            const rank = new canvacord.Rank()
            .setAvatar(interaction.user.displayAvatarURL({ format: "png", dynamic: false }))
            .setCurrentXP(user.xp)
            .setRequiredXP(Levels.xpFor(parseInt(user.level) + 1))
            .setLevel(user.level)
            .setRank(user.position)
            .setProgressBar("BLUE")
            .setUsername(interaction.user.username)
            .setDiscriminator(interaction.user.discriminator);


        rank.build()
            .then(data => {
                const attachment = new MessageAttachment(data, "RankCard.png");
                interaction.reply({ files: [attachment] })
            });
        }
}