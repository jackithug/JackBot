import * as Discord from "discord.js"
import { ClientEvent } from "../clientEvent"

export class ReadyHandler {

    client: Discord.Client

    constructor(client: Discord.Client) {
        this.client = client
    }

    listen = () => {
        this.client.on(ClientEvent.Ready, this.handle)
    }

    private handle = () => {
        console.log("Connected!")
    }

}
