const Levels = require('discord.js-leveling');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (!message.guild) return;
        if (message.author.bot) return; 
        const user = await Levels.fetch(message.author.id, message.guild.id); // Selects the target from the database.

       const requiredXp = Levels.xpFor(parseInt(user.level) + 1)
      
       const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
       const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
      
       if(hasLeveledUp) {
          
              const user = await Levels.fetch(message.author.id, message.guild.id);

              if (user.level === 5) {
                    message.member.roles.add('967504801619390464');
              }
              if (user.level === 10) {
                    message.member.roles.add('')
              }

              const levelEmbed = new MessageEmbed()
              .setTitle('New Level!')
              .setDescription(`**GG** ${message.author}, you just leveled up to level **${user.level + 1}**! <:partypopper:968383344545001522>`)
              .setColor('GREEN')
      
              const channel = client.channels.cache.get('967495791503618130');
              await channel.send({ content: `${message.author}`, embeds: [levelEmbed] });
        }
    }
}