import * as _ from 'lodash';
import * as Discord from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
var uuidv4 = require('uuid/v4');
var txtToMp3 = require('text-to-mp3');

const LENGTH_LIMIT = 200

const ttsOptions = {
    tl: 'vi'
}

export const transmit = async (text: string, voiceChannel: Discord.VoiceChannel): Promise<any> => {
    if(text.length >= LENGTH_LIMIT) throw Error('TTS message must be less than 200 characters in length.');

    try  {
        let connection = await voiceChannel.join();
        let ttsFile = await generateFile(encodeURIComponent(text));
        let filePath = path.resolve(ttsFile);
        let dispatcher = connection.playFile(filePath);
        dispatcher.setVolume(1);
    
        try {
            await new Promise((resolve, reject) => {
                dispatcher.on('end', resolve);
                dispatcher.on('error', reject);
            });
        } catch (e) {
            console.error(e);
        }
        
        voiceChannel.leave();
        removeFile(ttsFile);
    } catch(e) {
        throw Error('Something went wrong!')
    }
}

const generateFile = async (text: string): Promise<string> => {
    let filename = `${uuidv4()}.mp3`;
    let file = fs.createWriteStream(filename);
    file.write(await txtToMp3.getMp3(text, ttsOptions));
    file.end();
    return filename
}

const removeFile = async (filename: string) => {
    try {
        let path: fs.PathLike = filename
        fs.unlinkSync(path)
    } catch(e) {
        console.error(e)
    }
}
