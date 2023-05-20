const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "kiss",
    aliases: ["besar"],
    run: async (client, message, args) => {

        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (!target) return message.reply("Por favor, etiqueta un usuario válido");

        const { url } = await fetch('https://nekos.life/api/v2/img/kiss')
            .then(res => res.json());

        let embed = new EmbedBuilder()
            .setDescription(`${message.author.username} besó a ${target.user.username}`)
            .setImage(url)
            .setTimestamp()

        message.channel.send({ embeds: [embed] });
    }
}