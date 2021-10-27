const path = require('path');
const global = require(path.join(__dirname, '../global.js'));
const postPaths = require(path.join(__dirname, '../postPaths.js'));

module.exports = {
    name: 'birthday',
    execute(message, args)
    {
        theUser = null;
        foundUser = false;

        global.discordClient.users.cache.forEach(user => {
            fullName = user.username + "#" + user.discriminator
            if (fullName == args[0])
            {
                foundUser = true;
                theUser = user;
            }
        });

        if (foundUser)
        {
            day = new Date().getDay();

            if (day == 4)
                global.Message(message.channel, 'Feliz  🇯 🇺 🇪 🇻 🇪 🇸  Cumpleaños ' + "<@" + theUser.id + ">");
            else
                global.Message(message.channel, 'Feliz Cumpleaños ' + "<@" + theUser.id + ">");

            global.Message(message.channel, {
                 files: [ postPaths.birthdayImage ]
            });
        }
        else
            global.Message(message.channel, "I can't find that person. I need the full username (User#0000) :(");
    }
}