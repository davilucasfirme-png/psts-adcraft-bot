const { REST, Routes } = require('discord.js');
require('dotenv').config({ override: true });
console.log('TOKEN:', process.env.TOKEN);
console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('GUILD_ID:', process.env.GUILD_ID);
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('🧹 Limpando comandos globais...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: [] }
    );

    console.log('🧹 Limpando comandos do servidor...');
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: [] }
    );

    console.log('✅ Todos os comandos foram apagados');
  } catch (error) {
    console.error('Erro ao limpar comandos:', error);
  }
})();
