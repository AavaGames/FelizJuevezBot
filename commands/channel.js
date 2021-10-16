const fs = require('fs');

module.exports = {
    name: 'channel',
    description: 'Set channel',
    execute(message, args)
    {
        const saved = JSON.parse(fs.readFileSync('saved.json'));
        
        if (saved.channel != message.channel)
        {
            saved.channel = message.channel;
            fs.writeFileSync('saved.json', JSON.stringify(saved));
        }

        message.channel.send('Updated channel to this one');
    }
}