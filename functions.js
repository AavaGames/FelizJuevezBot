const fs = require('fs');
const path = require('path');
const postPaths = require(path.join(__dirname, '/postPaths.js'));
const global = require(path.join(__dirname, '/global.js'));

module.exports = { checkTime };

// TODO can randomize the time range which bot posts (between 12-8pm)

async function checkTime (client) 
{
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();
    const min = date.getMinutes();
    const currentDay = date.getMonth() + '-' + date.getDate();

    const saved = global.ReadSaveFile();

    console.log("checking post time at " + hour + ":" + min);

    let shouldSave = false;

    let posted = false;
    saved.servers.forEach(server => {
        if (!posted)
        {
            // day check
            if (server.lastDayPosted != currentDay)
            {
                timeToPost = global.GetTimeToPost();
                // time check
                if (hour > timeToPost.hour || (hour == timeToPost.hour && min >= timeToPost.min))
                {
                    if (server.channelID == "")
                    {
                        // SERVER HAS NO CHANNEL - msg server to add channel
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
                                            global.Message(channel, 'Missing designated channel, please type -channel in the appropriate location. Type -reset after to recieve images today.');
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
                        if (posted)
                        {
                            server.lastDayPosted = currentDay;
                            shouldSave = true;
                        }
                    }
                }
                else
                {
                    console.log("can't post yet");
                }
            }
            else
            {
                console.log("already posted for the day");
            }
        }   
    });
    
    if (shouldSave)
    {
        console.log("saving post date");
        global.WriteSaveFile(saved);
    }

    timeout = global.GetTimeout(posted);
    prefix = "";
    if (posted)
        prefix = 'posted to a server';
    else
        prefix = 'no posts';
    console.log(prefix + ', checking in ' + timeout + ' seconds');
    setTimeout(function() { checkTime(client) } , 1000 * timeout);
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
    
        console.log('text')
        console.log(allText);
        console.log('paths');
        console.log(allPaths);
    
        allText.forEach(text => {
            if (text != "")
                global.Message(channel, text);
        });
        
        allPaths.forEach(thePath => {
            if (thePath != "")
                global.Message(channel, { files: [thePath] });
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