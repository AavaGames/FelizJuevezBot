module.exports = {
    init: (client) => {
        const checkTime = async ()=> 
        {
            const query = {
                date: {
                    $lte: Date.now()
                }
            }

            const 

            // 10 minutes
            setTimeout(checkTime, 1000 * 60 * 10)
        }
    },
    description: 'ping command',
    execute(message, args)
    {
        message.channel.send('its not juevez');
    }
}