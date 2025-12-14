const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ajuda')
    .setDescription('Mostra todos os comandos do bot'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle('📘 Comandos Disponíveis')
      .setDescription('Confira abaixo tudo o que eu posso fazer 👇')
      .addFields(
        {
          name: '🧠 IA',
          value: '`/anuncio` → Gera anúncios com IA',
        },
        {
          name: '🛡️ Moderação',
          value:
            '`/kick` → Expulsa um membro\n' +
            '`/ban` → Bane um membro\n' +
            '`/mute` → Silencia um membro\n' +
            '`/unmute` → Remove o silêncio\n' +
            '`/clear` → Limpa mensagens\n' +
            '`/slowmode` → Controla o modo lento do chat',
        },
        {
          name: '⚙️ Sistema',
          value: '`/ping` → Mostra a latência\n`/ajuda` → Mostra este menu',
        }
      )
      .setFooter({
        text: 'Bot de anúncios com IA • Online 24/7',
      });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
