module.exports = {
    name: 'juevez',
    description: 'Is it juevez?',
    execute(message, args)
    {
        const day = 4;//new Date().getDay();
        if (day == 4)
        {
            message.channel.send('🇫 🇪 🇱 🇮 🇿     🇯 🇺 🇪 🇻 🇪 🇸');
        }
        else
        {
            message.channel.send('its not juevez :(');
        }
    }
}