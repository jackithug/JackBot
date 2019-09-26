import * as _ from 'lodash';
import * as Discord from 'discord.js';
import * as txtToMp3 from 'text-to-mp3';
import * as fs from 'fs';
import * as uuidv4 from 'uuid/v4';

export const transmit = async (text: string, voiceChannel: Discord.VoiceChannel): Promise<any> => {
    let connection = await voiceChannel.join();
    let ttsFile = await generateFile(text);
    let stream = fs.createReadStream(ttsFile)
    let dispatcher = connection.playStream(stream);

    try {
        await new Promise((resolve, reject) => {
            dispatcher.on('end', resolve);
            dispatcher.on('error', reject);
        });
    } catch (e) {
        console.error(e);
    }
    
    removeFile(ttsFile);
}

const generateFile = async (text: string): Promise<string> => {
    let filename = `${uuidv4()}.mp3`;
    let file = fs.createWriteStream(filename);
    file.write(await txtToMp3.getMp3(text));
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