const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Levels = require('discord.js-leveling');
const canvacord = require('canvacord')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Look up ur level')
        .addUserOption(option =>
            option.setName('user')
                    .setDescription('Search a user')),
        async execute(interaction, client) {
            const member = interaction.options.getUser('user') || interaction.user;

            const user = await Levels.fetch(member.id, interaction.guild.id, true); 
            if (!user) return interaction.reply({ content: "Seems like this user has not earned any xp so far."})

            const rank = new canvacord.Rank()
            .setAvatar(member.displayAvatarURL({ format: "png", dynamic: false }))
            .setCurrentXP(user.xp)
            .setRequiredXP(Levels.xpFor(parseInt(user.level) + 1))
            .setLevel(user.level)
            .setRank(user.position)
            .setProgressBar("BLUE")
            .setUsername(member.username)
            .setDiscriminator(member. discriminator);

        rank.build()
            .then(data => {
                const attachment = new MessageAttachment(data, "RankCard.png");
                interaction.reply({ files: [attachment] })
            });
        }
}