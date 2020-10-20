const commando = require('discord.js-commando');
const Discord = require("discord.js");
var reactionEmoji;
//const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});



module.exports = class stats extends commando.Command {
    constructor(client){
        super(client, {
            name: 'rr',
            aliases: ['reaction', 'reactionroles'],
            group: 'moderation',
            memberName: 'reaction roles',
            description: 'creates a reaction role message',
            argsType: 'multiple',
            userPermissions: ['MANAGE_GUILD']
        })
    }
    async run(msg, args){

        const embed = new Discord.MessageEmbed()
        .setTitle("Captcha")
        .setAuthor('The Minecraft Dojo', "https://cdn.discordapp.com/emojis/765413127624982558.png")
        .setURL("https://minecraftdojo.club")
        .setDescription("React below to complete the captcha!\nThis gives you access to all channels!")
        .setThumbnail("https://cdn.discordapp.com/emojis/765413127624982558.png")
        .setColor("ff00ff")
        let msgEmbed = await msg.channel.send(embed)
        reactionEmoji = msgEmbed.guild.emojis.cache.find(emoji => emoji.name === 'logo');
        msgEmbed.react(reactionEmoji);

        

    }
}

