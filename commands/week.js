//const fs = require('fs');

module.exports = {
    name: 'week',
    description: 'ping command',
    execute(message, args)
    {
        let date = new Date();
        date = date.getHours();
        message.channel.send('' + date);
    }
}