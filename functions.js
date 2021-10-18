const fs = require('fs');
const path = require('path');
const postPaths = require(path.join(__dirname, '/postPaths.js'));

module.exports = { checkTime };

/*
    Example
        hourToBeGreater = 15
        minToBeGreater = 35

        Post will occur after 3:35 PM
*/
const hourToBeGreater = 12
const minToBeGreater = 5
// TODO can randomize the time range which bot posts (between 12-8pm)

async function checkTime (client) 
{
    const timeOutTime = 60 * 5; // 10 minutes

    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();
    const min = date.getMinutes();
    const currentDay = date.getMonth() + '-' + date.getDate();

    const saved = JSON.parse(fs.readFileSync('saved.json'));

    console.log("checking post time at " + hour + ":" + min);

    let shouldSave = false;
    saved.servers.forEach(server => {
        let posted = false;
        // day check
        if (server.lastDayPosted != currentDay)
        {
            // time check
            if (hour > hourToBeGreater || (hour == hourToBeGreater && min >= minToBeGreater))
            {
                if (server.channelID == "")
                {
                    // msg server to add channel
                    client.guilds.cache.forEach(g => {
                        if (g.id == server.guildID)
                        {
                            foundChannel = false;
                            g.channels.cache.forEach(c => {
                                if (!foundChannel && c.type === 'GUILD_TEXT')
                                {
                                    posted = true;
                                    foundChannel = true;
                                    let channel = client.channels.cache.get(c.id);
                                    if (channel != undefined)
                                    {
                                        channel.send('Missing designated channel, please type -channel in the appropriate location. Type -reset after to recieve images today.');
                                    }
                                    else
                                    {
                                        console.log("failed to get channel of guild = " + server.guildID + " to notify of lack of saved channelID");
                                    }
                                }
                            });
                        }
                    });
                }
                else
                {
                    console.log("posting for day " + day);
                    posted = showTodaysImage(client, server, day);
                }
            }
        }
        else
        {
            console.log("already posted for the day");
        }

        if (posted)
        {
            server.lastDayPosted = currentDay;
            shouldSave = true;
        }   
    });
    
    if (shouldSave)
    {
        console.log("saving post dates");
        fs.writeFileSync('saved.json', JSON.stringify(saved));
    }

    console.log('checking again in ' + timeOutTime/60 + ' minutes');
    setTimeout(function() { checkTime(client) } , 1000 * timeOutTime)
}

function showTodaysImage(client, server, day)
{
    const channel = client.channels.cache.get(server.channelID);
    if (channel != undefined)
    {
        let allPaths = [];
        let allText = [];
    
        switch (day)
        {
            case 0:
                allText = postPaths.sunday.text;
                allPaths = postPaths.sunday.paths;
                break;
            case 1:
                allText = postPaths.monday.text;
                allPaths = postPaths.monday.paths;
                break;
            case 2:
                allText = postPaths.tuesday.text;
                allPaths = postPaths.tuesday.paths;
                break;
            case 3:
                allText = postPaths.wednesday.text;
                allPaths = postPaths.wednesday.paths;
                break;
            case 4:
                allText = postPaths.thursday.text;
                allPaths = postPaths.thursday.paths;
                break;
            case 5:
                allText = postPaths.friday.text;
                allPaths = postPaths.friday.paths;
                break;
            case 6:
                allText = postPaths.saturday.text;
                allPaths = postPaths.saturday.paths;
                break;
        }
    
        console.log(allText);
        console.log(allPaths);
    
        allText.forEach(text => {
            if (text != "")
                channel.send(text);
        });
        
        allPaths.forEach(thePath => {
            if (thePath != "")
                channel.send({ files: [thePath] });
        });
    
        return true;
    }
    else
    {
        console.log("channel undefined = " + server.channelID + " server = " + server.guildID);
        console.log("has the bot been removed?")
        return false; 
    }    
}