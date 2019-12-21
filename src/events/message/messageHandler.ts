import * as Discord from "discord.js"
import * as Wolfram from '../../modules/wolfram'
import * as TTS from '../../modules/tts'
import * as _ from 'lodash'
import { ClientEvent } from "../clientEvent"

enum MessageType {
    Help = "help",
    Greeting = "greeting",
    Evaluate = "evaluate",
    TTS = "tts"
}

export class MessageHandler {

    private prefix: string = '!'

    client: Discord.Client

    constructor(client: Discord.Client) {
        this.client = client
    }

    listen = () => {
        this.client.on(ClientEvent.Message, this.handle)
    }

    private handle = (message: Discord.Message) => {
        if (message.mentions.users.filter((user) => { return user.bot }).size > 0) {
            message.reply("Please don't @ me. Type !help to see a list of available commands.")
        }

        //this.filterLeagueSpam(message)

        if (message.author.bot || message.content.indexOf(this.prefix) !== 0) return

        const args = message.content.slice(this.prefix.length).trim().split(/ +/g)
        const command = args.shift().toLowerCase()

        switch (command) {
            case MessageType.Help:
                this.sendHelpInfo(message)
                break
            case MessageType.Evaluate:
                this.evalutate(message, args)
                break
            case MessageType.Greeting:
                this.greeting(message)
                break
            case MessageType.TTS:
                this.tts(message, args)
                break
        }
    }

    private filterLeagueSpam = (message: Discord.Message) => {
        if (message.member.user.bot) return

        if (message.content.includes('LoL') || message.content.toLowerCase().includes('league of legends')) {
            return message.reply('NEVER DISCUSS LEAGUE OF LEGENDS IN THIS SERVER EVER AGAIN!')
        }

        const triggerWords: string[] = [
            'worlds', 'league', 'legends', 'champions', 'skins', 'c9', 'cc', 'ad', 'ap',
            'garen', 'nasus', 'shyvana', 'voli', 'annie', 'morgana', 'caitlyn', 'ashe', 'leona', 'janna'
        ]
        const wordsUsed: string[] = _.split(message.content.toLowerCase(), ' ')
        
        if (!_.isEmpty(_.intersection(triggerWords, wordsUsed)))
            return message.reply('You better not be talking about League of Legends!')
    }

    private sendHelpInfo = (message: Discord.Message) => {
        message.reply("Under construction. My apologies. Try !greeting. You can also try !evaluate ___.")
    }

    private evalutate = async (message: Discord.Message, args: string[]) => {
        const badNames = ["timmons", "ross", "matt"]
        const goodNames = ["jack"]
        
        let hasEvaluatedName = false
        
        badNames.forEach(badName => {
            if(hasEvaluatedName) return
            
            if(_.includes(message.content.toLowerCase(), `about ${badName}`)) {
               message.reply(`${badName} is a lil hoe!`)
               return hasEvaluatedName = true
            }
            
            if(_.includes(message.content.toLowerCase(), `is ${badName}`)) {
               message.reply(`${badName} is a lil hoe!`)
               return hasEvaluatedName = true
            }
            
            if(_.includes(message.content.toLowerCase(), `${badName} is`)) {
               message.reply(`${badName} is a lil hoe!`)
               return hasEvaluatedName = true
            }
        })
        
        goodNames.forEach(goodName => {
            if(hasEvaluatedName) return
            
            if(_.includes(message.content.toLowerCase(), `about ${goodName}`)) {
               message.reply(`${goodName} is da best!`)
               return hasEvaluatedName = true
            }
            
            if(_.includes(message.content.toLowerCase(), `is ${goodName}`)) {
               message.reply(`${goodName} is da best!`)
               return hasEvaluatedName = true
            }
            
            if(_.includes(message.content.toLowerCase(), `${goodName} is`)) {
               message.reply(`${goodName} is da best!`)
               return hasEvaluatedName = true
            }
        })
        
        if(hasEvaluatedName) return
                      
        let result = await Wolfram.evaluate(args.join(' '))
        message.reply(result)
    }

    private greeting = (message: Discord.Message) => {
        let replies = [
            "Hello! I hope you are doing well.",
            "What a lovely day to be on Discord.",
            "Fancy seeing you here.",
            "Greetings, kind sir.",
            "The day is young. Carpe diem!",
            "Bonjour! Comment ca va?",
            "Hola! Que tal?"
        ]

        let date = new Date()

        let reply = replies[date.getTime() % (replies.length)]

        message.reply(reply)
    }

    private tts = async (message: Discord.Message, args: string[]) => {
        try {
            if(!message.guild) throw Error('TTS is only supported in servers. Not DMs.');
            if(_.isEmpty(args)) throw Error('TTS text must not be empty.');

            let voiceChannel: Discord.VoiceChannel = _.get(message, 'member.voiceChannel', null);
            let ttsText: string = args.join(' ');

            if(_.isNil(voiceChannel)) throw Error('Must be in a voice channel to use TTS.');

            if (message.member.id == "172193487645704193") {
                return message.reply("you have a little baby dick.")
            }

            await TTS.transmit(ttsText, voiceChannel)
        } catch(error) {
            message.reply(error.message)
        }
    }

}
