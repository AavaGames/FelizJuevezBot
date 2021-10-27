const path = require('path');
const global = require(path.join(__dirname, '../global.js'));

module.exports = {
    name: 'hi',
    execute(message, args)
    {
        global.Message(message.channel, 'hi');

        // TODO hi image
        // message.channel.send({
        //     files: [ "hi.png" ]
        // });
    }
}