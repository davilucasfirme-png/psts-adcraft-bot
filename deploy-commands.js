require('dotenv').config({ override: true });

const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

/* 🔎 DEBUG (remova depois que funcionar) */
console.log('DEBUG TOKEN:', process.env.TOKEN);
console.log('DEBUG CLIENT_ID:', process.env.CLIENT_ID);
console.log('DEBUG GUILD_ID:', process.env.GUILD_ID);

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(`⚠️ Comando inválido em ${filePath}`);
    }
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(`🚀 Enviando ${commands.length} comandos...`);

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('✅ Comandos registrados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao registrar comandos:', error);
  }
})();
