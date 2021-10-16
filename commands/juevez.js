module.exports = {
    name: 'juevez',
    description: 'Is it juevez?',
    execute(message, args)
    {
        if (new Date().getDay() == 4)
        {
            message.channel.send('🇫 🇪 🇱 🇮 🇿     🇯 🇺 🇪 🇻 🇪 🇸');
        }
        else
        {
            message.channel.send('it\'s not juevez :(');
        }
    }
}