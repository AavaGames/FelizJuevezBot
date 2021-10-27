const fs = require('fs');
const path = require('path');
const global = require(path.join(__dirname, '../global.js'));

module.exports = {
    name: 'channel',
    description: 'Set channel',
    execute(message, args)
    {
        const saved = global.ReadSaveFile();
        
        let foundServer = false;

        saved.servers.forEach(server => {
            if (server.guildID == message.guild.id)
            {
                foundServer = true;
                if (server.channelID != message.channel.id)
                {
                    server.channelID = message.channel.id;
                    global.ReadSaveFile();
        
                    global.Message(message.channel, 'Updated channel to this one.');
                    global.WriteSaveFile(saved);
                }
                else
                {
                    global.Message(message.channel, 'Already posting to this channel.');
                } 
            }
        });

        if (!foundServer)
        {
            saved.servers.push(global.GetServerTemplate());
            saved.servers[saved.servers.length-1].guildID = message.guild.id;
            global.WriteSaveFile(saved);

            global.Message(message.channel, 'Server added to database.');
        
            this.execute(message, args);
        }
    }
}