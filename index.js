//Ever since I been with Asuka, anything feels possible.

require('dotenv').config();


const fs = require('fs');
const path = require('path');
const postPaths = require(path.join(__dirname, '/postPaths.js'));
const global = require(path.join(__dirname, '/global.js'));

const Discord = require('discord.js');
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

client.on('guildCreate', guild => {

    let saved = global.ReadSaveFile();
    saved.servers.push(global.GetServerTemplate());
    saved.servers[saved.servers.length-1].guildID = guild.id;
    global.WriteSaveFile(saved);

    const welcomeText = "Use *-help* to see all commands. Setup requires *-channel* to be sent in the desired location for where this bot should post."

    foundChannel = false;

    //TODO update this to prioritise announcment channels, and then channels that the bot can type in
    
    //finds first text channel in server
    guild.channels.cache.forEach(c => {
        if (!foundChannel && c.type === 'GUILD_TEXT')
        {
            foundChannel = true;
            let channel = client.channels.cache.get(c.id);
            global.Message(channel, { files: [postPaths.joinImage] })
            global.Message(channel, welcomeText);
        }
    }) 
});

client.on("guildDelete", guild => {
    //Not run when bot is offline
    let saved = global.ReadSaveFile();
    let i = 0;
    let foundServer = false;
    saved.servers.forEach(server => {
        if (server.guildID == guild.id)
            foundServer = true;
        else if (!foundServer)
            i++;
    });
    saved.servers.splice(i, 1);
    global.WriteSaveFile(saved);
    console.log('leaving guild & removing from saved list');
});

client.on("ready", client => {
    console.log("\nF E L I Z  J U E V E Z  B O T\n")
    if (process.env.TEST == 'true')
        console.log("\nT E S T I N G\n")

    global.discordClient = client;

    if (!fs.existsSync(global.GetSaveJSONName(process.env.TEST)))
    {
        console.log('Creating ' + global.GetSaveJSONName(process.env.TEST) + ' file');
        const jsonTemplate = JSON.stringify(global.GetSavedTemplate());
        fs.writeFileSync(global.GetSaveJSONName(process.env.TEST), jsonTemplate);
    }

    functions.checkTime(client);
})

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandText = args.shift().toLowerCase();

    const command = client.commands.get(commandText);

    if (command != null)
    {
        command.execute(message, args);
    }
});

client.login(global.GetToken());