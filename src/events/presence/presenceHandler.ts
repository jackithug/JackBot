import * as Discord from "discord.js"
import { ClientEvent } from "../ClientEvent";

export class PresenceHandler {

    client: Discord.Client

    constructor(client: Discord.Client) {
        this.client = client
    }

    listen = () => {
        this.client.on(ClientEvent.Presence, this.handle)
    }

    private handle = (presence: Discord.Presence) => {
        console.log(`Presence: ${presence}`)
    }

}