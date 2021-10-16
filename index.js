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

//Post image on join
//Create help command
client.on("ready", (message) => {
    checkTime();
});

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

//

const checkTime = async ()=> 
{
    // 10 minutes
    const timeOut = 60 * 10;

    const date = new Date();
    const day = date.getDay();
    const currentDay = date.getMonth() + '-' + date.getDate();
    const hour = date.getHours();
    const saved = JSON.parse(fs.readFileSync('saved.json'));

    // day check
    if (saved.lastDayPosted != currentDay)
    {
        console.log("can post today");
        // hour check
        if (hour > 11)
        {
            console.log("posting now");

            saved.lastDayPosted = currentDay;
            fs.writeFileSync('saved.json', JSON.stringify(saved));
            
            // Post Image(s)
            /*
                Struct 
                    Day x 7
                        Holds an array of links 
            */
        }
    }
    else
        console.log("posted for the day");

    setTimeout(checkTime, 1000 * 5)
    //setTimeout(checkTime, 1000 * timeOut)
}