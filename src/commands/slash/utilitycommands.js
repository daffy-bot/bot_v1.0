const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('utility')
        .setDescription('Commandos de Utilidad')
        .addSubcommand(subcommand => subcommand
            .setName('ping')
            .setDescription('muestra el ping del bot')
        )
        .addSubcommand(subcommand => subcommand
            .setName('botinfo')
            .setDescription('Muestra información sobre el bot')
        )
        .addSubcommand(subcommand => subcommand
            .setName('say')
            .setDescription('repite lo que dices')
            .addStringOption(option => option
                .setName('texto')
                .setDescription('Di lo que quieras aqui')
                .setRequired(true)
            )
        ),
    run: async (client, interaction) => {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'ping')
            switch (subcommand) {
                case 'ping':
                    interaction.reply(`Pong 🏓, ${Math.round(client.ws.ping)} `)
            };
        if (subcommand === 'botinfo') {
            const embed = new EmbedBuilder()
                .setTitle('Información sobre el bot')
                .addFields(
                    { name: 'Nombre del Bot', value: client.user.username },
                    { name: 'ID del Bot', value: client.user.id },
                    { name: 'Severs', value: `${client.guilds.cache.size} servidores` },
                    { name: 'Creado', value: `${client.user.createdAt.toLocaleString()}` },

                )
            interaction.reply({ embeds: [embed] });
        }

        switch (subcommand) {
            case 'say':
                const permissions = interaction.member.permissions;
                if (permissions.has('MANAGE_MESSAGES')) {
                    const mensaje = interaction.options.getString('texto');

                    const embed = new EmbedBuilder()
                        .addFields(
                            { name: "Mensaje", value: `${mensaje}` }
                        )
                        .setTimestamp()

                    await interaction.channel.send({ embeds: [embed] });
                } else {
                    interaction.reply({ content: 'No tienes permisos para enviar mensajes' });
                }
        }

    }
}
