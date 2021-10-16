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

async function checkTime (client) 
{
    // 10 minutes
    const timeOutTime = 60 * 10;

    const date = new Date();
    const day = date.getDay();
    const currentDay = date.getMonth() + '-' + date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const saved = JSON.parse(fs.readFileSync('saved.json'));

    let posted = false;
    saved.servers.forEach(server => {
        // day check
        if (server.lastDayPosted != currentDay)
        {
            // time check
            if ((hour == hourToBeGreater && min >= minToBeGreater) || hour > hourToBeGreater)
            {
                posted = true;
                server.lastDayPosted = currentDay;

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
                                    foundChannel = true;
                                    let channel = client.channels.cache.get(c.id);
                                    channel.send('Missing designated channel, please type -channel in the appropriate location. Type -reset after to recieve images today.');
                                }
                            });
                        }
                    });
                }
                else
                {
                    console.log("posting for day " + day);
                    showTodaysImage(client, server, day);
                }
            }
        }
        else
            console.log("already posted for the day");
    });
    
    if (posted)
        fs.writeFileSync('saved.json', JSON.stringify(saved));

    console.log('checking again in ' + timeOutTime/60 + ' minutes');
    setTimeout(checkTime, 1000 * timeOutTime)
}

function showTodaysImage(client, server, day)
{
    const channel = client.channels.cache.get(server.channelID);

    let allPaths;
    let allText;

    switch (day)
    {
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
        case 7:
            allText = postPaths.sunday.text;
            allPaths = postPaths.sunday.paths;
            break;
    }

    console.log(allPaths);

    allText.forEach(text => {
        channel.send(text);
    });

    allPaths.forEach(thePath => {
        channel.send({
            files: [thePath]
        });
    });
}