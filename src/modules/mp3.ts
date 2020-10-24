import * as _ from 'lodash';
import * as Discord from 'discord.js';
import * as path from 'path';

export enum MP3 {
    GUINEA = 'guinea',
    NASTY = 'nasty'
}

export const transmit = async (voiceChannel: Discord.VoiceChannel, mp3: MP3): Promise<any> => {
    try  {
        let connection = await voiceChannel.join();
        let dispatcher = connection.playFile(mp3Path(mp3));
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
    } catch(e) {
        throw Error('Something went wrong!')
    }
}

const mp3Path = (mp3: MP3) => {
    let ttsFile = `../../assets/${mp3}.mp3`;
    return path.resolve(__dirname, ttsFile);
}