module.exports = {
    name: 'help',
    execute(message, args)
    {
        helpMsg =
        "**-channel** | designate this channel for the bot to post in\n"+
        "**-hi**\n"+
        "**-juevez**"
        "**-checkTime** | to see if its posting time (automatically called every 10 minutes)"

        message.channel.send(helpMsg);
    }
}