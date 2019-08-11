import * as Discord from "discord.js"
import { ClientEvent } from "../clientEvent"

export class ErrorHandler {

    client: Discord.Client

    constructor(client: Discord.Client) {
        this.client = client
    }

    listen = () => {
        this.client.on(ClientEvent.Error, this.handle)
    }

    private handle = (error: Error) => {
        console.log(`Error: ${error.message}`)
    }

}
