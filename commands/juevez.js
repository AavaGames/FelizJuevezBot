const path = require('path');
const global = require(path.join(__dirname, '../global.js'));

module.exports = {
    name: 'juevez',
    description: 'Is it juevez?',
    execute(message, args)
    {
        if (new Date().getDay() == 4)
        {
            global.Message(message.channel, '🇫 🇪 🇱 🇮 🇿     🇯 🇺 🇪 🇻 🇪 🇸');
        }
        else
        {
            global.Message(message.channel, 'it\'s not juevez :(');
        }
    }
}