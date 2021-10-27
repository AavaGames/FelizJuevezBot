require('dotenv').config();
const fs = require('fs');

discordClient = undefined;

const savedTemplate = {
    timeToPost: { hour: 0, min: 0, day: ""},
    servers: []
}
const serverTemplate = {
    guildID: '',
    channelID: '', 
    lastDayPosted: ''
}

const saveJSON = "saved.json";
const saveJSONTest = "savedTest.json"

const noPostsTimeout = 60 * 10;
const postTimeout = 30;

/*
    Example
        hourToBeGreater = 15
        minToBeGreater = 35

        Post will occur after 3:35 PM
*/
const hourTimeRange = {
    min: 12,
    max: 17
}
const minRange = {
    min: 0,
    max: 60
}

const randomRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;

module.exports = {  
    GetTimeout,
    RandomizePostTime,
    GetTimeToPost,
    GetSavedTemplate, 
    GetServerTemplate, 
    Message, 
    GetSaveJSONName, 
    ReadSaveFile, 
    WriteSaveFile,
    GetToken,
};

function GetTimeout(posted)
{
    if (posted)
        return postTimeout;
    else 
        return noPostsTimeout;
}

function RandomizePostTime(currentDay)
{
    saved = ReadSaveFile();
    saved.timeToPost = {
        hour: randomRange(hourTimeRange.min, hourTimeRange.max),
        min: randomRange(minRange.min, minRange.max),
        day: currentDay
    }
    WriteSaveFile(saved);
}

function GetTimeToPost()
{
    saved = ReadSaveFile();
    return {
        hour: saved.timeToPost.hour,
        min: saved.timeToPost.min
    }
}

function GetSavedTemplate() { return savedTemplate; };

function GetServerTemplate() { return serverTemplate; };

function Message (channel, msg) {
    channel.send(msg).catch(error => {
        console.log(error);
    })
};

function GetSaveJSONName(envTest) {
    if (envTest == 'true')
        return saveJSONTest;
    else
        return saveJSON;
};

function ReadSaveFile() {
    return JSON.parse( fs.readFileSync( GetSaveJSONName(process.env.TEST) ) );
};

function WriteSaveFile(saved) {
    fs.writeFileSync( GetSaveJSONName(process.env.TEST), JSON.stringify(saved) );
};

function GetToken()
{
    if (process.env.TEST == 'true')
        return process.env.TEST_TOKEN
    else
        return process.env.TOKEN
}