const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "feed",
    aliases: ["alimentar"],
    run: async (client, message, args) => {

        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (!target) return message.reply("Por favor, etiqueta un usuario válido");

        const { url } = await fetch('https://nekos.life/api/v2/img/feed')
            .then(res => res.json());

        let embed = new EmbedBuilder()
            .setDescription(`${message.author.username} alimentó a ${target.user.username}`)
            .setImage(url)
            .setTimestamp()

        message.channel.send({ embeds: [embed] });

    }
}