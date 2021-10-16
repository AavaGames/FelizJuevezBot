const fs = require('fs');
const path = require('path');
const functions = require(path.join(__dirname, '../functions.js'));

module.exports = {
    name: 'channel',
    description: 'Set channel',
    execute(message, args)
    {
        const saved = JSON.parse(fs.readFileSync('saved.json'));
        
        if (saved.channelID != message.channel.id)
        {
            saved.channelID = message.channel.id;
            fs.writeFileSync('saved.json', JSON.stringify(saved));

            message.channel.send('Updated channel to this one');
        }
        else
        {
            message.channel.send('Already posting to this channel');
        } 
    }
}