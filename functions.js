const fs = require('fs');
const path = require('path');
const postPaths = require(path.join(__dirname, '/postPaths.js'));

module.exports = { checkTime };

async function checkTime (client) 
{
    // 10 minutes
    const timeOutTime = 60 * 10;

    const date = new Date();
    const day = date.getDay();
    const currentDay = date.getMonth() + '-' + date.getDate();
    const hour = date.getHours();
    const saved = JSON.parse(fs.readFileSync('saved.json'));

    // day check
    if (saved.lastDayPosted != currentDay)
    {
        // hour check
        if (hour > 11)
        {
            if (saved.channelID == "")
            {
                console.log("Error: Specify a channel with the -channel command.");
            }
            else
            {
                console.log("posting for day " + day);

                saved.lastDayPosted = currentDay;
                fs.writeFileSync('saved.json', JSON.stringify(saved));

                showTodaysImage(client, saved, day);
            }
        }
    }
    else
        console.log("posted for the day");

    console.log('checking again in ' + timeOutTime/60 + ' minutes');
    setTimeout(checkTime, 1000 * timeOutTime)
}

function showTodaysImage(client, saved, day)
{
    const channel = client.channels.cache.get(saved.channelID);

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