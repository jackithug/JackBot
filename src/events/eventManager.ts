import * as Discord from 'discord.js'
import { ReadyHandler } from './ready/readyHandler'
import { ErrorHandler } from './error/errorHandler'
import { MessageHandler } from './message/messageHandler'
import { PresenceHandler } from './presence/presenceHandler'

export class EventManager {

    client: Discord.Client
    readyHandler: ReadyHandler
    errorHandler: ErrorHandler
    messageHandler: MessageHandler
    presenceHandler: PresenceHandler

    constructor (client: Discord.Client) {
        this.client = client
        this.readyHandler = new ReadyHandler(client)
        this.errorHandler = new ErrorHandler(client)
        this.messageHandler = new MessageHandler(client)
        this.presenceHandler = new PresenceHandler(client)
    }
 
    public listenAll() {
        this.readyHandler.listen()
        this.errorHandler.listen()
        this.messageHandler.listen()
        this.presenceHandler.listen()
    }

}