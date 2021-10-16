//https://discord.com/oauth2/authorize?client_id=898762351732457492&scope=bot&permissions=67624000

const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES']});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const prefix = '-';

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

client.login(process.env.TOKEN);