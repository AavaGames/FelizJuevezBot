require('dotenv').config();
const fs = require('fs');

discordClient = undefined;

const savedTemplate = {
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
const hourToBeGreater = 12;
const minToBeGreater = 5;

module.exports = {  
    GetTimeout,
    GetTimeToPost,
    GetSavedTemplate, 
    GetServerTemplate, 
    Message, 
    GetSaveJSONName, 
    ReadSaveFile, 
    WriteSaveFile,
    GetToken
};

function GetTimeout(posted)
{
    if (posted)
        return postTimeout;
    else 
        return noPostsTimeout;
}

function GetTimeToPost()
{
    return {
        hour: hourToBeGreater,
        min: minToBeGreater
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