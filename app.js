const commando = require('discord.js-commando');
const path = require('path');
const Discord = require("discord.js");
const prefix = '/';
var mysql = require('mysql');
var cron = require('node-cron');
var MojangAPI = require('mojang-api');
const Auditlog = require("discord-auditlog");
var numPlayers = 0;
const enmap = require("enmap");

const settings = new enmap({
  name: "settings",
  autoFetch: true,
  cloneLevel: "deep",
  fetchAll: true
});

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
    unknownCommandResponse: false,
    disableEveryone: true,
    partials: ["MESSAGE", "USER", "REACTION"],
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

    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'mcdojo.club',
            type: 'STREAMING',
            url: 'https://www.twitch.tv/TrashToggled'
        }
    })

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

client.on('message', async msg =>{

    /*if(msg.content == "lebruh"){
        msg.channel.send("Legend has it that 4 messages were lost in the void...")
    }
    */

    if(msg.channel.id == "767911106542567424"){



        try {
            const message = await msg.channel.messages.fetch('767985355814207498');
            let str = message.content;
            let arr = str.split(' ');
            let res = arr[4];
            let count = res.match(/\d*$/);
            await message.edit("legend has it that " + res.substr(0, count.index) + (++count[0]) + " messages were lost in the void...");
        } catch(err) {
            console.error(err);
        }
        msg.delete();
        
    }
    /*if(msg.content.startsWith("legend has it that")){
        if (msg.author.bot) {return};
        let str = msg.content;
        let arr = str.split(' ');
        let res = arr[4];
        var count = res.match(/\d*$/);
        msg.channel.send("legend has it that " + res.substr(0, count.index) + (++count[0]) + " messages were lost in the void...");
    }*/
    /*cron.schedule('*//*10 * * * *', async () => {
        const message = await msg.channel.messages.fetch('767985355814207498');
        let str = message.content;
        let arr = str.split(' ');
        let res = arr[4];
        let count = res.match(/\d*$/);
        message.channel.setTopic("legend has it that " + res.substr(0, count.index) + (++count[0]) + " messages were lost in the void...");
        console.log("Updating topic");
      });*/



    

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

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
  
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
  
    if (command == "ticket-setup") {
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.reply(`You do not permission to run this command!`);
      let channel = message.mentions.channels.first();
      if (!channel) return message.reply("Usage: `/ticket-setup #channel`");
      const rle = message.guild.roles.cache.find(role => role.name === "STAFF");
      if (!rle)
        return message.reply(
          "Hmmm I coudl't find a role called `STAFF` Make sure you have a role called `STAFF`"
        );
  
      let sent = await channel.send(
        new Discord.MessageEmbed()
          .setTitle("Ticket System")
          .setDescription("React to open a ticket!")
          .setFooter("Ticket System")
          .setColor("ff00ff")
          .setThumbnail("https://i.imgur.com/xKOe84J.png")
      );
  
      sent.react("🎫");
      settings.set(`${message.guild.id}-ticket`, sent.id);
  
      message.channel.send("Ticket System Setup Done!");
    }

  
  if (command == "ticket-close") {
      if (!message.channel.name.includes("ticket-"))
        return message.channel.send("You cannot use that here!");
      let channel = message.channel
      channel.messages.fetch({limit:80})
      .then(function(messages) {
          let content = messages.map(message => message.content && message.content).join("\n");
          message.author.send(`Transcript for your ticket in ${message.guild.name} Server`);
          message.author.send({ files: [{ name: "transcript.txt", attachment: Buffer.from(content) }] });
        message.channel.send(`I have dmed you transcript if your dms are opened. Deleting channel in 20 seconds`)
        message.channel.send(`Just in case Your dms are closed here is transcript`)
        message.channel.send({ files: [{ name: "transcript.txt", attachment: Buffer.from(content) }] });  
  
  
        })
         setTimeout(function() {
          message.channel.delete();
                      }, 20000);
    }
  });
  
  client.on("messageReactionAdd", async (reaction, user, message) => {
    if (user.partial) await user.fetch();
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();
    if (user.bot) return;
  
    let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);
    /*let nameOfChannel = `ticket-${user.username}`;

    if ((reaction.message.guild.channels.cache.find(c => c.name === nameOfChannel))){
        reaction.message.guild.channels.cache.find(c => nameOfChannel).send(`${user}, you already have an open ticket!`)
    }*/
    if (!ticketid) return;
    
    if (reaction.message.id == ticketid && reaction.emoji.name == "🎫") {
      reaction.users.remove(user);
  
      reaction.message.guild.channels
        .create(`ticket-${user.username}`, {
          permissionOverwrites: [
            {
              id: user.id,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            },
            {
              id: reaction.message.guild.roles.everyone,
              deny: ["VIEW_CHANNEL"]
            },
            {
              id: reaction.message.guild.roles.cache.find(
                role => role.name === "ADMIN"
              ),
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            },
            {
                id: reaction.message.guild.roles.cache.find(
                  role => role.name === "MOD"
                ),
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            },
            {
                id: reaction.message.guild.roles.cache.find(
                  role => role.name === "HELPER"
                ),
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            },
            {
                id: reaction.message.guild.roles.cache.find(
                  role => role.name === "MANAGER"
                ),
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            }
          ],
          type: "text"
        })
        .then(async channel => {
            let category = channel.guild.channels.cache.find(c => c.name == "💓| Support" && c.type == "category");

            if (!category) throw new Error("Category channel does not exist");
            channel.setParent(category.id);
          channel.send(
            `<@${user.id}>`,
            new Discord.MessageEmbed()
              .setTitle("Welcome to your ticket!")
              .setDescription("Support Team will be with you shortly")
              .setColor("ff00ff")
              .setThumbnail("https://i.imgur.com/xKOe84J.png")
          );
        });
    }
  });
//logger.all(client);

client.login("NzU0NDE5ODc2NTAzNzQ4NjY4.X10eQw.YcKkOoDVfMZ3JMtgb5dJ0W_A2vk");