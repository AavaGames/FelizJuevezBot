const fs = require('fs');

module.exports = {
    name: 'reset',
    execute(message, args)
    {
        const saved = JSON.parse(fs.readFileSync('saved.json'));

        let posted = false;
        saved.servers.forEach(server => {
            if (server.guildID == message.guild.id)
            {
                server.lastDayPosted = '';
                fs.writeFileSync('saved.json', JSON.stringify(saved));

                message.channel.send('Reset server post status.');
            }
        });
    }
}