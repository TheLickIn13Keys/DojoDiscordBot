const commando = require('discord.js-commando');
const Discord = require("discord.js");
var mysql = require('mysql');
var MojangAPI = require('mojang-api');

var numPlayers = 0;
foundPlayer = false;

var connection = mysql.createConnection({

    host: 'localhost',
    user: 'discord',
    password: 'oFijpowijgwogjioapgejsloi2',
    database: 'server_players'

});

module.exports = class stats extends commando.Command {
    constructor(client){
        super(client, {
            name: 'verify',
            group: 'profile',
            memberName: 'verify',
            description: 'Connects Discord to Minecraft',
            argsType: 'multiple'
        })
    }
    async run(msg, args){

        connection.query("SHOW TABLE STATUS where name = 'discord_verification'", function(error, rows, fields) {

            if (!!error) {
                console.log('Error in the query');
            } else {
                numPlayers = rows[0].Rows;
            }
        });

        if(!(args[0])){


            const helpEmbed = new Discord.MessageEmbed()
                .setTitle("Help - Verification")
                .setDescription("```Verify with Minecraft: /verify <token from running /discord on 3d4h>```\n")
                .setURL("https://3d4h.world")
                .setColor("#FF00FF")
            msg.channel.send(helpEmbed);
            return;
            
        }
        else{

            try {
                var UUID = await verify(args, msg);
            } catch (error) {
                msg.channel.send(error);
                return;
            }
            var toSend = "The UUID: " + UUID + " has been linked to " + msg.author.tag;  
            const successEmbed = new Discord.MessageEmbed()
            .setTitle("Success!")
            .setDescription(toSend)
            .setURL("https://3d4h.world")
            .setColor("#FF00FF")
            msg.channel.send(successEmbed);
        }


    }

}

function verify(args, msg) {

    return new Promise((resolve, reject) => {
        
        connection.query("SELECT * FROM discord_verification", function(error, rows, fields) {

            if (!!error) {

                console.log('Error in the query');

            } else {

                for (let i = 0; i < numPlayers; i++) {
                    
                    if(rows[i].Token == args[0] && rows[i].discordID == "open"){

                        connection.query("UPDATE `discord_verification` SET `discordID` = " + msg.author.id + " WHERE `discord_verification`.`id` = " + rows[i].id, function (err, result){

                            if (err) throw err;
                            console.log(result.affectedRows + " record(s) updated");

                            resolve(rows[i].UUID);
                            return;

                        });

                    }

                }

                reject("Sorry, the token is invalid or your account has already been linked!");
                return;

            }
        });

    })


        
}