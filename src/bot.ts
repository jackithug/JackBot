import * as Discord from 'discord.js'
import { EventManager } from './events/eventManager'
import * as config from './config'
import { EnvVariable } from './config'

try {
    config.verifyEnv()
} catch (error) {
    console.error(error.message)
    process.exit(1)
}

const token = config.getVariable(EnvVariable.Discord)
const client = new Discord.Client()
const eventHandler = new EventManager(client)

// Listen for events
eventHandler.listenAll()

// Login
client.login(token)