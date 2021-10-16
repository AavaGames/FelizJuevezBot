const fs = require('fs');

module.exports = {
    name: 'ping',
    description: 'ping command',
    execute(message, args)
    {
        const date = new Date();
        const day = date.getDay();
        const currentDay = 'm' + date.getMonth() + 'd' + date.getDate();

        const saved = JSON.parse(fs.readFileSync('saved.json'));

        if (saved.lastDayPosted != currentDay)
        {
            saved.lastDayPosted = currentDay;
            fs.writeFileSync('saved.json', JSON.stringify(saved));
        }

        console.log(currentDay);

        message.channel.send(saved.channel + '\n' + saved.lastDayPosted);
    }
}