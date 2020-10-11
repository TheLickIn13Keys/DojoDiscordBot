const commando = require('discord.js-commando');
const path = require('path');
const Discord = require("discord.js");
const PREFIX = '/';
var mysql = require('mysql');
var cron = require('node-cron');
var MojangAPI = require('mojang-api');
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

var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

cron.schedule('*/10 * * * *', () => {
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
});

client.registry.registerGroups([
    ['guild', 'guild commands'],
    ['profile', 'Profile Commands'],
    ['stats', 'Stats Commands']
]).registerDefaults()
.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {

    client.user.setActivity("play.3d4h.world", {
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
client.on('message', msg =>{
    if(msg.content.includes("/help")){

        const helpEmbed = new Discord.MessageEmbed()
            .setTitle("Help")
            .setURL("https://3d4h.world")
            .addField("**Stats**", "```/stats <player>```")
            .addField("**Guild**", "```/guild <player>```")
            .addField("**Friends**", "```/friends <player>```")
            .addField("**Profile**", "```/profile <player>```")
            .setColor("#FF00FF")
        msg.channel.send(helpEmbed);

    }
})

client.login("NzU0NDE5ODc2NTAzNzQ4NjY4.X10eQw.YcKkOoDVfMZ3JMtgb5dJ0W_A2vk");