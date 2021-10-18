//Ever since I been with Asuka, anything feels possible.

const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const postPaths = require(path.join(__dirname, '/postPaths.js'));

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES']});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const functions = require(path.join(__dirname, 'functions.js'));

const prefix = '-';


const savedTemplate = {
    servers: []
}
const serverTemplate = {
    guildID: '',
    channelID: '', 
    lastDayPosted: ''
}

client.on('guildCreate', guild => {

    let saved = JSON.parse(fs.readFileSync('saved.json'));
    saved.servers.push(serverTemplate);
    saved.servers[saved.servers.length-1].guildID = guild.id;
    fs.writeFileSync('saved.json', JSON.stringify(saved));

    const welcomeText = "Use *-help* to see all commands. Setup requires *-channel* to be sent in the desired location for where this bot should post."

    foundChannel = false;
    //TODO update this to prioritise announcment channels, and then channels that the bot can type in

    //finds first text channel in server
    guild.channels.cache.forEach(c => {
        if (!foundChannel && c.type === 'GUILD_TEXT')
        {
            foundChannel = true;
            let channel = client.channels.cache.get(c.id);
            channel.send({
                files: [postPaths.joinImage]
            });
            channel.send(welcomeText); 
        }
    }) 
});

client.on("guildDelete", guild => {
    //Not run when bot is offline
    let saved = JSON.parse(fs.readFileSync('saved.json'));
    let i = 0;
    let foundServer = false;
    saved.servers.forEach(server => {
        if (server.guildID == guild.id)
            foundServer = true;
        else if (!foundServer)
            i++;
    });
    saved.servers.splice(i, 1);
    fs.writeFileSync('saved.json', JSON.stringify(saved));
    console.log('leaving guild & removing from saved list');
});

client.on("ready", client => {
    console.log("\nF E L I Z  J U E V E Z  B O T\n")
    if (!fs.existsSync('saved.json'))
    {
        console.log('Creating saved JSON file');
        const jsonTemplate = JSON.stringify(savedTemplate);
        fs.writeFileSync('saved.json', jsonTemplate);
    }

    functions.checkTime(client);
})

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandText = args.shift().toLowerCase();

    const command = client.commands.get(commandText);

    if (commandText == "checktime")
    {
        console.log('checking time through command');
        functions.checkTime(client);
    }
    else if (command != null)
    {
        command.execute(message, args);
    }
});

client.login(process.env.TOKEN);