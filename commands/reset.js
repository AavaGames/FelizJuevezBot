const fs = require('fs');
const path = require('path');
const global = require(path.join(__dirname, '../global.js'));

module.exports = {
    name: 'reset',
    execute(message, args)
    {
        const saved = global.ReadSaveFile();

        saved.servers.forEach(server => {
            if (server.guildID == message.guild.id)
            {
                server.lastDayPosted = '';
                global.WriteSaveFile(saved);

                global.Message(message.channel, 'Reset server post status.');
            }
        });
    }
}