import * as Discord from 'discord.io'

const token = process.env.DISCORD_TOKEN

const bot = new Discord.Client({
    token: token,
    autorun: true
})

bot.on('ready', () => {
    console.log("Logged in as %s - %s", bot.username, bot.id)
})

bot.on('message', (user, userId, channelId, message, event) => {
    if (message === "What color?") {
        bot.sendMessage({
            to: channelId,
            message: Math.random().toString()
        })
    }
})