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
    const order = message.content.split(" ");
    const splitNum = order[1].split("-");
    // メンションを付けた命令のみうけとる
    if (!message.mentions.has(client.user) || !order[1]) {
        return;
    }
    // 絵文字取得
    let emojiInfo = [];
    message.guild.emojis.fetch().then(emojis => {
        emojis.map((guildEmoji) => {
            emojiInfo.push({
                "id": guildEmoji.id,
                "name": guildEmoji.name
            });
        })
        if (order[1] === "slot") {
            const min = 1;
            const max = emojiInfo.length - 1;

            message.reply(createRandomEmojis(min, max, emojiInfo)).then(() => {
                console.log("success");
            }).catch(console.error)

        } else if (splitNum.length === 2) {
            const min = parseInt(splitNum[0]);
            const max = parseInt(splitNum[1]);
            console.log(min);
            console.log(max);
            if ((min && max) && min <= max) {
                message.reply(createRandomEmojis(min, max, emojiInfo)).then(() => {
                    console.log("success");
                }).catch(console.error)
            } else {
                message.reply("@emoji-master help を参照してください。").then(() => {
                    console.log("success");
                }).catch(console.error)
            }
        } else if (order[1] === "help") {
            message.reply(getHelpMessage()).then(() => {
                console.log("success");
            }).catch(console.error)
        } else {
            message.reply(getHelpMessage()).then(() => {
                console.log("success");
            }).catch(console.error)
        }
    }).catch(console.error)

    return;
});

function getHelpMessage() {
    return `
        emoji-masterの使い方\n
        @emoji-master help\t:emoji-masterの使い方\n
        @emoji-master slot\t:1~30文字のカスタム絵文字をランダムに錬成する
        @emoji-master [n]-[m]\t:n文字~m文字のカスタム絵文字をランダムに錬成する（max:30）
    `;
}

/**
 * @param {number} min
 * @param {number} max
 * @return {string}
 */
function createRandomEmojis(min, max, emojis) {
    let randomEmojis = "";
    // min~max文字
    if (max > 30) {
        max = 30;
    }
    const loopNum = Math.floor( Math.random() * (max + 1 - min) ) + min ;
    for (i = 0; i < loopNum; i++) {
        // ランダムな絵文字取得
        const randomNum = Math.floor( Math.random() * ((emojis.length - 1) + 1 - 0) ) + 0;
        randomEmojis += `<:${emojis[randomNum].name}:${emojis[randomNum].id}>`;
    }
    return randomEmojis;
}