const commando = require('discord.js-commando');
const path = require('path');
const Discord = require("discord.js");
const PREFIX = '/';
var mysql = require('mysql');
var cron = require('node-cron');
var MojangAPI = require('mojang-api');
const Auditlog = require("discord-auditlog");
var numPlayers = 0;

var fs = require('fs'),
    request = require('request');

const {
    resolve
} = require('dns');
const {
    get
} = require('http');

const client = new commando.CommandoClient({
    owner: "620845493957951498",
    commandPrefix: "/",

});

var connection = mysql.createConnection({

    host: 'localhost',
    user: 'discord',
    password: 'oFijpowijgwogjioapgejsloi2',
    database: 'server_stats'

});

Auditlog(client, {
    "642489468099493888": {
        auditlog: "logs",	
        movement: "logs",
        auditmsg: "logs",
        voice: "🌎 main",
        trackroles: true, 
    }
});


var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

/*cron.schedule('10 * * * *', () => {
    try{
        console.log('running a task 10 minute');
        connection.query("SELECT * FROM C1", function(error, rows, fields) {
            if (!!error) {
                console.log('Error in the query');
            }
            for (let i = 0; i < numPlayers; i++) {
                MojangAPI.profile(rows[i].UUID, function(err, res) {
                    var url = 'https://mc-heads.net/body/' + res.name + '.png';
                    var destination = '/home/bardia/3d4hbot/' + res.name + '.png';

                    download(url, destination, function() {
                        console.log('done');
                    });

                })

            }
        });
        connection.query("SELECT * FROM C2", function(error, rows, fields) {
            if (!!error) {
                console.log('Error in the query');
            }
            for (let i = 0; i < numPlayers; i++) {
                MojangAPI.profile(rows[i].UUID, function(err, res) {
                    var url = 'https://mc-heads.net/body/' + res.name + '.png';
                    var destination = '/home/bardia/3d4hbot/' + res.name + '.png';

                    download(url, destination, function() {
                        console.log('done');
                    });

                })

            }
        });
        connection.query("SELECT * FROM C3", function(error, rows, fields) {
            if (!!error) {
                console.log('Error in the query');
            }
            for (let i = 0; i < numPlayers; i++) {
                MojangAPI.profile(rows[i].UUID, function(err, res) {
                    var url = 'https://mc-heads.net/body/' + res.name + '.png';
                    var destination = '/home/bardia/3d4hbot/' + res.name + '.png';

                    download(url, destination, function() {
                        console.log('done');
                    });

                })

            }
        });
    }
    catch(err){
        console.log(err);
    }
}); */

client.registry.registerGroups([
    ['guild', 'guild commands'],
    ['profile', 'Profile Commands'],
    ['stats', 'Stats Commands'],
    ['moderation', 'Moderation Commands']
]).registerDefaults()
.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('guildMemberAdd', member => {
    const welcomeEmbed = new Discord.MessageEmbed()
        .setTitle(`[+] ${member.user.username}`)
        .setDescription(`Welcome, ${member} to The Minecraft Dojo!\n We are currently under development but please stick around!`)
        .setURL('https://minecraftdojo.club')
        .setColor(65280)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp(new Date())
        .setFooter(`${member.nickname || member.user.username}`)
        .setAuthor(`New User: ${member.user.tag}`, "https://cdn.discordapp.com/emojis/435119354867220511.png")

    member.guild.channels.cache.get('694339651514925130').send(welcomeEmbed); 

    
})



client.on('guildMemberRemove', member => {


        const welcomeEmbed = new Discord.MessageEmbed()
            .setTitle(`[-] ${member.user.username}`)
            .setDescription(`Goodbye, ${member.user.username}. We hope you enjoyed your stay in The Minecraft Dojo!`)
            .setURL('https://minecraftdojo.club')
            .setColor(16711680)
            .setThumbnail(member.user.displayAvatarURL())
            .setAuthor(`User Left: ${member.user.tag}`, "https://cdn.discordapp.com/emojis/435119363595436042.png")
            .setTimestamp(new Date())
            .setFooter(`${member.nickname || member.user.username}`)


        member.guild.channels.cache.get('694339651514925130').send(welcomeEmbed); 
    
})

client.on('ready', () => {

    client.user.setActivity("mcdojo.club", {
        type: "PLAYING"
    });

    console.log(`Logged in as ${client.user.tag}`);
    connection.connect(function(error) {
        if (!!error) {
            console.log('Error');
        } else {
            console.log('Connected');
        }
    })

    connection.query("SHOW TABLE STATUS", function(error, rows, fields) {

        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful query');
            console.log(rows[0].Rows);
            numPlayers = rows[0].Rows;

        }
    });

})

client.on("messageReactionAdd", async (reaction, user) => {

    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    if(user.bot) return;
    if(!reaction.message.guild) return;

    if(reaction.message.channel.id === "737011411951288370"){

        if(reaction.emoji.name === reactionEmoji){
            await reaction.message.guild.members.cache.get(user.id).roles.add("695083944332492823");
        }

    }

})

client.on('message', msg =>{

    if(msg.content.includes("/help")){

        const helpEmbed = new Discord.MessageEmbed()
            .setTitle("Help")
            .setURL("https://3d4h.world")
            .addField("**Stats**", "```/stats <player>```")
            .addField("**Guild**", "```/guild <player>```")
            .addField("**Friends**", "```/friends <player>```")
            .addField("**Profile**", "```/profile <player>```")
            .addField("**Verify**", '```/verify <token from running "/discord" on 3d4h>```')
            .setColor("#FF00FF")
        msg.channel.send(helpEmbed);

    }
})
//logger.all(client);

client.login("NzU0NDE5ODc2NTAzNzQ4NjY4.X10eQw.YcKkOoDVfMZ3JMtgb5dJ0W_A2vk");