const path = require('path');
const global = require(path.join(__dirname, '../global.js'));

module.exports = {
    name: 'help',
    execute(message, args)
    {
        helpMsg =
        "**-channel** | designate this channel for the bot to post in\n"+
        "**-hi**\n"+
        "**-juevez**\n"+
        "**-checktime** | to see if its posting time (automatically called every 10 minutes)\n"+
        "**-reset** | Reset posting for the day" +
        "**-birthday [User#0000]** | Wishes happy birthday to the person :)"
        global.Message(message.channel, helpMsg);
    }
}