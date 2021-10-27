const path = require('path');
const global = require(path.join(__dirname, '../global.js'));
const functions = require(path.join(__dirname, '../functions.js'));

module.exports = {
    name: 'checktime',
    execute(message, args)
    {
        console.log('checking time through command');
        functions.checkTime(global.discordClient);
        global.Message(message.channel, "Checked post time.");
    }
}