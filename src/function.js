const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    loadCommands(commands, eventName) {
        const foldersPath = path.join(__dirname, eventName);// src/XXX Commands
        const commandFolders = fs.readdirSync(foldersPath);// XXX Commands 底下的資料夾們

        for (const folder of commandFolders) { // XXX(Command的資料夾)
            const commandsPath = path.join(foldersPath, folder);// 把command的資料夾變成完整路徑
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file === 'index.js'); // 掃描資料夾底下的.js然後放進去物件裡
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                if ('data' in command && 'execute' in command) {
                    commands.set(command.data.name, command);
                    console.log(`${command.data.name} => ${eventName}`);
                }
                else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }
    }
}