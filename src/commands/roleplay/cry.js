const { EmbedBuilder } = require("discord.js");
const { Kawaii } = require("kawaii-api");
const api = new Kawaii("825566872555618344.z7TAUVbsy2eIY026IIUA");

module.exports = {
    name: "cry",
    aliases: ["llorar"],
    run: async (client, message, args) => {

        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (!target) return message.reply("Por favor, etiqueta un usuario válido");

        const { url } = await fetch('https://api.otakugifs.xyz/gif?reaction=cry').then(res => res.json());
        let embed = new EmbedBuilder()
            .setDescription(`${target.user.username} hizo llorar a ${message.author.username}`)
            .setImage(url)
            .setTimestamp()

        message.channel.send({ embeds: [embed] });

    }
}