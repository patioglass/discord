const { Intents, Client } = require("discord.js");

const options = {
    intents: Intents.FLAGS.GUILDS | Intents.FLAGS.GUILD_MESSAGES,
};
const client = new Client(options);

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', message =>{
    client.user.setPresence({ activity: { name: '絵文字' } });
});

client.on("messageCreate", message => {
    // botは返さない
    if (message.author.id == client.user.id) {
        return;
    }
    // メンションを付けた場合のみ
    if (message.mentions.has(client.user)) {
        if (message.content.match(/test/)) {
            message.reply("test").then(() => {
                console.log("success");
            }).catch(console.error)
        }
        return;
    }
});