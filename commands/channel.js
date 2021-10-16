const fs = require('fs');
const path = require('path');
const functions = require(path.join(__dirname, '../functions.js'));

module.exports = {
    name: 'channel',
    description: 'Set channel',
    execute(message, args)
    {
        const saved = JSON.parse(fs.readFileSync('saved.json'));
        
        let foundServer = false;

        saved.servers.forEach(server => {
            if (server.guildID == message.guild.id)
            {
                foundServer = true;
                if (server.channelID != message.channel.id)
                {
                    server.channelID = message.channel.id;
                    fs.writeFileSync('saved.json', JSON.stringify(saved));
        
                    message.channel.send('Updated channel to this one.');
                }
                else
                {
                    message.channel.send('Already posting to this channel.');
                } 
            }
        });

        if (!foundServer)
        {
            // make function
            let saved = JSON.parse(fs.readFileSync('saved.json'));
            saved.servers.push(serverTemplate);
            saved.servers[saved.servers.length-1].guildID = message.guild.id;
            fs.writeFileSync('saved.json', JSON.stringify(saved));

            message.channel.send('Server added to database.');
        
            this.execute(message, args);
        }
        
    }
}

const serverTemplate = {
    guildID: '',
    channelID: '', 
    lastDayPosted: ''
}