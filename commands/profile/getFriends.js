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
            name: 'friends',
            group: 'profile',
            memberName: 'friends',
            description: 'shows player friends',
            argsType: 'multiple'
        })
    }
    async run(msg, args){

        connection.query("SHOW TABLE STATUS where name = 'friends'", function(error, rows, fields) {

            if (!!error) {
                console.log('Error in the query');
            } else {
                numPlayers = rows[0].Rows;
            }
        });
        if(!(args[0])){


            const helpEmbed = new Discord.MessageEmbed()
                .setTitle("Help - Friends")
                .setDescription("```Get Player Friends: /friends <player>```\n")
                .setURL("https://3d4h.world")
                .setColor("#FF00FF")
            msg.channel.send(helpEmbed);
            return;
            
        }
        else{

            var friends = [];
            var names = [];

            try {

                friends = await getFriends1to2(msg, args);   
                for(let l = 0; l<friends.length; l++){
                    names.push(await subContractor1(friends[l]));
                }  

                
            } catch (error) {

                console.log(error);
                
            }

            try {

                friends = await getFriends2to1(msg, args);   
                for(let l = 0; l<friends.length; l++){
                    names.push(await subContractor1(friends[l]));
                }  

                
            } catch (error) {

                console.log(error);
                
            }
            

            connection.query("SELECT * FROM friends", function(error, rows, fields) {

                var dates = [];

        
                if (!!error) {
                    console.log('Error in the query -> friends');
                    console.log(error);
                } 
                else {
        
                    MojangAPI.nameToUuid(args[0], function(err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            for (let i = 0; i < numPlayers; i++) {
                                if (res[0]) {
                                    if (rows[i].UUID2 == args[0] || rows[i].UUID2 == res[0].id || rows[i].UUID1 == args[0] || rows[i].UUID1 == res[0].id) {
                                        

                                        dates.push(rows[i].dateAdded);

                                        foundPlayer = true;
                                        

                        
                                 
                                        
                                    }
                                }
                                else{
                                    var foundPlayer = false;
                                }
                            }

        
                            if (foundPlayer == false) {
        
                                msg.channel.send("Either player does not exist, or they have no friends");
                                return;
        
                            }    

                            if(foundPlayer == true){
                                var FOutput = new Discord.MessageEmbed()
                                .setTitle(args[0] + "'s Friends")
                                .setURL(`https://namemc.com/profile/${args[0]}`)
                                .setColor("#FF00FF");
                                var date;
                            

                                for(let t = 0; t<names.length; t++){

                                    date = new Date(dates[t] * 1000);

                                    FOutput.addField(names[t], `Date added: ${date.toLocaleDateString()}`);
                                    
                                }
                                msg.channel.send(FOutput);
                                return;
                                
                            }
                            
                                                       
                        }
                    })
                }
        
        
            })
            

            


        }
        
               


    }
}


async function subContractor1(uuid) {

    return new Promise((resolve, reject) =>{
        MojangAPI.profile(uuid, function(err, res) {
            if (err)
                console.log(err);
            else {
                resolve(res.name);
            }
        });
    })
}

function getFriends1to2(msg, args) {

    return new Promise((resolve, reject) => {

        connection.query("SELECT * FROM friends", function(error, rows, fields) {

            var friends = [];
    
            if (!!error) {
                console.log('Error in the query -> friends');
                console.log(error);
            } 
            else {
    
                MojangAPI.nameToUuid(args[0], function(err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        for (let i = 0; i < numPlayers; i++) {
                            if (res[0]) {
                                if (rows[i].UUID1 == args[0] || rows[i].UUID1 == res[0].id) {
                                    
                                    playerNum = i;

                                    friends.push(rows[i].UUID2);

                                    foundPlayer = true;

                                    
                                }
                            }
                            else{
                                var foundPlayer = false;
                            }
                        }
    
                        if (foundPlayer == false) {
    
                            msg.channel.send("Either player does not exist, or they have no friends");
                            return;
    
                        }
                        
                        resolve(friends);
                        
                        
                    }
                })
            }
    
    
        })


    })

}
function getFriends2to1(msg, args) {

    return new Promise((resolve, reject) => {

        connection.query("SELECT * FROM friends", function(error, rows, fields) {

            var friends = [];
    
            if (!!error) {
                console.log('Error in the query -> friends');
                console.log(error);
            } 
            else {
    
                MojangAPI.nameToUuid(args[0], function(err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        for (let i = 0; i < numPlayers; i++) {
                            if (res[0]) {
                                if (rows[i].UUID2 == args[0] || rows[i].UUID2 == res[0].id) {
                                    
                                    playerNum = i;

                                    friends.push(rows[i].UUID1);

                                    foundPlayer = true;

                                    
                                }
                            }
                            else{
                                var foundPlayer = false;
                            }
                        }
    
                        if (foundPlayer == false) {
    
                            msg.channel.send("Either player does not exist, or they have no friends");
                            return;
    
                        }
                        
                        resolve(friends);
                        
                        
                    }
                })
            }
    
    
        })


    })

}