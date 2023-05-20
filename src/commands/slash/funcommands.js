const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('fun')
        .setDescription('Commandos Fun')
        .addSubcommand(subcommando => subcommando
            .setName('8ball')
            .setDescription('juego de 8ball')
            .addStringOption(option => option
                .setName('pregunta')
                .setDescription('la pregunta')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('flipcoin')
            .setDescription('Lanza una moneda al aire'),
        ),
    run: async (client, interaction) => {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === '8ball') {
            switch (subcommand) {
                case '8ball':

                    let replies = [
                        "Creo que sí",
                        "Sí",
                        "Supongo",
                        "Si absolutamente",
                        "Tal vez",
                        "Posiblemente",
                        "No",
                        "Yo no pregunté",
                        "No sé",
                        "Sin duda",
                        "En efecto",
                        "No me importa"
                    ];

                    let result = Math.floor(Math.random() * replies.length);
                    let question = interaction.options.getString('pregunta');

                    let embed = new EmbedBuilder()

                        .setColor("#000488")
                        .addFields(
                            { name: `**${interaction.user.username} pregunta**`, value: question },
                            { name: "**La bola dice**", value: replies[result] }
                        )
                        .setThumbnail(interaction.user.displayAvatarURL());

                    interaction.reply({ embeds: [embed] });

            }
        };

        if (subcommand === 'flipcoin') {
            const coin = Math.random() < 0.5 ? 'Cara' : 'Sello';

            let embed = new EmbedBuilder()
                .setColor("#000488")
                .setDescription(`Has lanzado la moneda al aire y ha salido ${coin}!`)
                .setThumbnail(interaction.user.displayAvatarURL());

            await interaction.reply({ embeds: [embed] });


        }

    }
}
