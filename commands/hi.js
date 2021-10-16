module.exports = {
    name: 'hi',
    execute(message, args)
    {
        message.channel.send("hi");

        // TODO hi image
        // message.channel.send({
        //     files: [ "hi.png" ]
        // });
    }
}