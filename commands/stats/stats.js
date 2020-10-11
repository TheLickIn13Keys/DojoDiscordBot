const commando = require('discord.js-commando');
const {
    Client,
    MessageEmbed
} = require('discord.js');
const Discord = require("discord.js");
var mysql = require('mysql');
var MojangAPI = require('mojang-api');
const average = require('image-average-color');
var numPlayers = 0;
const rgbHex = require('rgb-hex');

var connection = mysql.createConnection({

    host: 'localhost',
    user: 'discord',
    password: 'oFijpowijgwogjioapgejsloi2',
    database: 'server_stats'

});


module.exports = class stats extends commando.Command {
    constructor(client){
        super(client, {
            name: 'stats',
            group: 'stats',
            memberName: 'stats',
            description: 'shows player stats for different gamemodes',
            argsType: 'multiple'
        })
    }
    async run(msg, args){

        connection.query("SHOW TABLE STATUS", function(error, rows, fields) {

            if (!!error) {
                console.log('Error in the query');
            } else {
                numPlayers = rows[0].Rows;
    
            }
        });

        if(!(args[0])){


            const helpEmbed = new Discord.MessageEmbed()
                .setTitle("Help - Stats")
                .setDescription("```Get Player Stats: /stats <player>```\n")
                .setURL("https://3d4h.world")
                .setColor("#FF00FF")
            msg.channel.send(helpEmbed);
            return;
            
        }
        



       displayEmbed(args, msg);

    }
    
}

function getExtClutcherStats(args, msg){
    return new Promise((resolve, reject) => {
        if (args[0].length > 16) {

            reject("Invalid Player Name");
            return;

        }
        connection.query("SELECT * FROM C3", function(error, rows, fields) {
            if (!!error) {
                reject('Error in the query');
            } 
            else {
                
                MojangAPI.nameToUuid(args[0], function(err, res) {

                    if (err) {
                        reject(err);
                    } else {
                        for (let i = 0; i < numPlayers; i++) {
                            if (res[0]) {
                                if (rows[i].UUID == args[0] || rows[i].UUID == res[0].id) {
                                    playerNum = i;
                                    foundPlayer = true;
                                    break;
                                }
                            }
                            var foundPlayer = false;

                        }

                        if (foundPlayer == false) {

                            reject("Either player does not exist, or they have not played on the specified gamemode");
                            return;

                        }


                        else if (foundPlayer == true) {

                            MojangAPI.profile(rows[playerNum].UUID, function(err, res) {

                                if (err)
                                    reject(err);
                                else {

                                    try {

                                        average(`/home/bardia/3d4hbot/${res.name}.png`, (err, color) => {
                                            if (err) throw err;
                                            var [red, green, blue, alpha] = color;
                                            var hexii = '#' + rgbHex(red, green, blue);
                                            if (foundPlayer == true) {
                                                var descSend = "```Blocks Placed: " + rows[playerNum].blocksPlaced + "```" + "\n" + "```Best Streak: " + rows[playerNum].bestStreak + "```" + "\n" + "```Current Streak: " + rows[playerNum].currentStreak + "```" + "\n" +"```Longest Extension: " + rows[playerNum].longestExtension + "```" + "\n" + "```Shards Earned: " + rows[playerNum].shardsEarned + "```" + "\n" + "```Successful Attempts: " + rows[playerNum].successfulAttempts + "```" + "\n" + "```Failed Attempts: " + rows[playerNum].failedAttempts + "```" + "\n";
                                                var extclutchEmbed = new Discord.MessageEmbed()
                                                    .setTitle(':straight_ruler: Extension Clutch')
                                                    .setDescription(descSend)
                                                    .setURL(`https://3d4h.world`)
                                                    .setColor(hexii)
                                                    .setAuthor(res.name, `https://mc-heads.net/head/${res.name}.png`, `https://namemc.com/profile/${res.name}`)
                                                    .setThumbnail(`https://mc-heads.net/body/${res.name}.png`)
                                                extembed = extclutchEmbed;
                                                resolve(extclutchEmbed)
                                                return
                                            }
                                            else{
                                                reject('Player Not Found');
                                                return
                                            }
                                        });


                                    } catch (error) {

                                        if (foundPlayer == true) {

                                            var straight 

                                            var descSend = "```Blocks Placed: " + rows[playerNum].blocksPlaced + "```" + "\n" + "```Best Streak: " + rows[playerNum].bestStreak + "```" + "\n" + "```Current Streak: " + rows[playerNum].currentStreak + "```" + "\n" +"```Best Time: " + rows[playerNum].bestTime + "```" + "\n" + "```Shards Earned: " + rows[playerNum].shardsEarned + "```" + "\n" + "```Successful Attempts: " + rows[playerNum].successfulAttempts + "```" + "\n" + "```Failed Attempts: " + rows[playerNum].failedAttempts + "```" + "\n";
                                            const extclutchEmbed = new Discord.MessageEmbed()
                                                .setTitle(':straight_ruler: Omni Clutch')
                                                .setDescription(descSend)
                                                .setURL(`https://3d4h.world`)
                                                .setColor('#FF00FF')
                                                .setAuthor(res.name, `https://mc-heads.net/head/${res.name}.png`, `https://namemc.com/profile/${res.name}`)
                                                .setThumbnail(`https://mc-heads.net/body/${res.name}.png`);
                                            resolve(extclutchEmbed)
                                            return extclutchEmbed;
                                        }
                                        else{
                                            reject('Player Not Found');
                                            return
                                        }


                                    }
                                }

                            })
                        }
                        else{
                            reject('Player Not Found');
                            return
                        }
                    }









                });
            }

            });
    });
}
function getOmniClutcherStats(args, msg){

    return new Promise((resolve, reject) => {
    
    if (args[0].length > 16) {

        reject("Invalid Player Name");
        return;

    }
    connection.query("SELECT * FROM C2", function(error, rows, fields) {
        if (!!error) {
            reject('Error in the query');
        } 
        else {
            
            MojangAPI.nameToUuid(args[0], function(err, res) {

                if (err) {
                    reject(err);
                } else {
                    for (let i = 0; i < numPlayers; i++) {
                        if (res[0]) {
                            if (rows[i].UUID == args[0] || rows[i].UUID == res[0].id) {
                                playerNum = i;
                                foundPlayer = true;
                                break;
                            }
                        }
                        var foundPlayer = false;

                    }

                    if (foundPlayer == false) {

                        reject("Either player does not exist, or they have not played on the specified gamemode");
                        return;

                    }


                    else if (foundPlayer == true) {

                        MojangAPI.profile(rows[playerNum].UUID, function(err, res) {

                            if (err)
                                reject(err);
                            else {

                                try {

                                    average(`/home/bardia/3d4hbot/${res.name}.png`, (err, color) => {
                                        if (err) throw err;
                                        var [red, green, blue, alpha] = color;
                                        var hexii = '#' + rgbHex(red, green, blue);
                                        if (foundPlayer == true) {
                                            var descSend = "```Blocks Placed: " + rows[playerNum].blocksPlaced + "```" + "\n" + "```Best Streak: " + rows[playerNum].bestStreak + "```" + "\n" + "```Current Streak: " + rows[playerNum].currentStreak + "```" + "\n" +"```Best Time: " + rows[playerNum].bestTime + "```" + "\n" + "```Shards Earned: " + rows[playerNum].shardsEarned + "```" + "\n" + "```Successful Attempts: " + rows[playerNum].successfulAttempts + "```" + "\n" + "```Failed Attempts: " + rows[playerNum].failedAttempts + "```" + "\n";
                                            var omniclutchEmbed = new Discord.MessageEmbed()
                                                .setTitle(':atom: Omni Clutch')
                                                .setDescription(descSend)
                                                .setURL(`https://3d4h.world`)
                                                .setColor(hexii)
                                                .setAuthor(res.name, `https://mc-heads.net/head/${res.name}.png`, `https://namemc.com/profile/${res.name}`)
                                                .setThumbnail(`https://mc-heads.net/body/${res.name}.png`)
                                            resolve(omniclutchEmbed);
                                            return;
                                        }
                                        else{
                                            reject('Player Not Found');
                                            return
                                        }
                                    });


                                } catch (error) {

                                    if (foundPlayer == true) {


                                        var descSend = "```Blocks Placed: " + rows[playerNum].blocksPlaced + "```" + "\n" + "```Best Streak: " + rows[playerNum].bestStreak + "```" + "\n" + "```Current Streak: " + rows[playerNum].currentStreak + "```" + "\n" +"```Best Time: " + rows[playerNum].bestTime + "```" + "\n" + "```Shards Earned: " + rows[playerNum].shardsEarned + "```" + "\n" + "```Successful Attempts: " + rows[playerNum].successfulAttempts + "```" + "\n" + "```Failed Attempts: " + rows[playerNum].failedAttempts + "```" + "\n";
                                        const omniclutchEmbed = new Discord.MessageEmbed()
                                            .setTitle(':atom: Omni Clutch')
                                            .setDescription(descSend)
                                            .setURL(`https://3d4h.world`)
                                            .setColor('#FF00FF')
                                            .setAuthor(res.name, `https://mc-heads.net/head/${res.name}.png`, `https://namemc.com/profile/${res.name}`)
                                            .setThumbnail(`https://mc-heads.net/body/${res.name}.png`);
                                        resolve(omniclutchEmbed);
                                        return;
                                    }
                                    else{
                                        reject('Player Not Found');
                                        return
                                    }


                                }
                            }

                        })
                    }
                    else{
                        reject('Player Not Found');
                        return
                    }
                }









            });
        }

    });

    });

}

function getBridgeClutcherStats(args, msg) {
    
    return new Promise((resolve, reject) => {

    if (args[0].length > 16) {

        reject("Invalid Player Name");
        return;


    }
    connection.query("SELECT * FROM C1", function(error, rows, fields) {
        if (!!error) {
            reject('Error in the query');
        } else {

            MojangAPI.nameToUuid(args[0], function(err, res) {

                if (err) {
                    reject(err);
                } else {
                    for (let i = 0; i < numPlayers; i++) {
                        if (res[0]) {
                            if (rows[i].UUID == args[0] || rows[i].UUID == res[0].id) {
                                playerNum = i;
                                foundPlayer = true;
                                break;
                            }
                        }
                        var foundPlayer = false;

                    }

                    if (foundPlayer == false) {

                        reject("Either player does not exist, or they have not played on the specified gamemode");
                        return;

                    }


                    else if (foundPlayer == true) {

                        MojangAPI.profile(rows[playerNum].UUID, function(err, res) {

                            if (err)
                                reject(err);
                            else {

                                try {

                                    average(`/home/bardia/3d4hbot/${res.name}.png`, (err, color) => {
                                        if (err) throw err;
                                        var [red, green, blue, alpha] = color;
                                        var hexii = '#' + rgbHex(red, green, blue);
                                        if (foundPlayer == true) {
                                            var descSend = "```Blocks Placed: " + rows[playerNum].blocksPlaced + "```" + "\n" + "```Best Streak: " + rows[playerNum].bestStreak + "```" + "\n" + "```Current Streak: " + rows[playerNum].currentStreak + "```" + "\n" +"```Best Time: " + rows[playerNum].bestTime + "```" + "\n" + "```Shards Earned: " + rows[playerNum].shardsEarned + "```" + "\n" + "```Successful Attempts: " + rows[playerNum].successfulAttempts + "```" + "\n" + "```Failed Attempts: " + rows[playerNum].failedAttempts + "```" + "\n";
                                            var bridgeclutchEmbed = new Discord.MessageEmbed()
                                                .setTitle(':bricks: Bridge Clutch')
                                                .setDescription(descSend)
                                                .setURL(`https://3d4h.world`)
                                                .setColor(hexii)
                                                .setAuthor(res.name, `https://mc-heads.net/head/${res.name}.png`, `https://namemc.com/profile/${res.name}`)
                                                .setThumbnail(`https://mc-heads.net/body/${res.name}.png`)
                                            resolve(bridgeclutchEmbed);
                                            return;
                                        }
                                        else{
                                            reject('Player Not Found');
                                            return
                                        }
                                    });


                                } catch (error) {

                                    if (foundPlayer == true) {

                                    


                                        var descSend = "```Blocks Placed: " + rows[playerNum].blocksPlaced + "```" + "\n" + "```Best Streak: " + rows[playerNum].bestStreak + "```" + "\n" + "```Current Streak: " + rows[playerNum].currentStreak + "```" + "\n" +"```Best Time: " + rows[playerNum].bestTime + "```" + "\n" + "```Shards Earned: " + rows[playerNum].shardsEarned + "```" + "\n" + "```Successful Attempts: " + rows[playerNum].successfulAttempts + "```" + "\n" + "```Failed Attempts: " + rows[playerNum].failedAttempts + "```" + "\n";
                                        const bridgeclutchEmbed = new Discord.MessageEmbed()
                                            .setTitle(':bricks: Bridge Clutch')
                                            .setDescription(descSend)
                                            .setURL(`https://3d4h.world`)
                                            .setColor('#FF00FF')
                                            .setAuthor(res.name, `https://mc-heads.net/head/${res.name}.png`, `https://namemc.com/profile/${res.name}`)
                                            .setThumbnail(`https://mc-heads.net/body/${res.name}.png`);
                                            bridgeembed = bridgeclutchEmbed;
                                            resolve(bridgeclutchEmbed);
                                            return;
                                    }
                                    else{
                                        reject('Player Not Found');
                                        return
                                    }


                                }
                            }

                        })
                    }

                    else{
                        reject('Player Not Found');
                        return
                    }
                }


            });




        }

    });

    });




}
function getColor(msg, args){
    return new Promise((resolve, reject) => {
        average(`/home/bardia/3d4hbot/${args[0]}.png`, (err, color) => {
            if (err) reject(console.log(err));
            var [red, green, blue, alpha] = color;
            var hexii = '#' + rgbHex(red, green, blue);
            resolve(hexii);
        });

    });
}
async function displayEmbed(args, msg) {

    msg.channel.send('Fetching Stats...')
    .then(msg => {
    msg.delete({ timeout: 1000 })})


    try {

            
        try {
            var extembed = await getExtClutcherStats(args, msg);


            var bridgeembed = await getBridgeClutcherStats(args, msg);
        

            var omniembed = await getOmniClutcherStats(args, msg);

            
        } catch (error) {

            msg.channel.send(error);
            return;
            
        }

            var desccc = "```Bridge Clutch: 🧱```\n" + "```Omni Clutch: ⚛```\n" + "```Extension Clutch: 📏```\n";

            try {
                var coloor = await getColor(msg, args);
            } catch (error) {

                console.error(error);
                
            }

            const mainembed = new MessageEmbed({
                title: "Please Choose a Gamemode",
                description: desccc,
                url: "https://3d4h.world",
                color: coloor,
                author: {
                    name: args[0],
                    url: `https://namemc.com/profile/${args[0]}`,
                    icon_url: `https://cravatar.eu/helmhead/${args[0]}.png`
                }
            })   

            const options = {
                limit: 15 * 1000,
                min: 1,
                max: 4, 
                page: 1
            }
            
            const m = await msg.channel.send(mainembed);

            await m.react('🚫');
            await m.react('🧱');
            await m.react('⚛');     
            await m.react('📏');  
                    
            const filter = (reaction, user) => {
                return ['🚫', '🧱', '⚛', '📏'].includes(reaction.emoji.name) && user.id == msg.author.id;
            };
            
            /*const removeReaction = async (m, msg, emoji) => {
                try { 
                   await m.reactions.find(r => r.emoji.name == emoji).users.remove(msg.author.id); 
                } catch(err) {}
            }
            */
           
            
            async function awaitReactions(msg, m, options, filter){

                const { min, max, page, limit } = options;
                
                m.awaitReactions(filter, { max: 1, time: limit, errors: ['time'] })
                .then(async (collected) => {

                    
                    const reaction = collected.first();


                    if (reaction.emoji.name === '🚫') {
                        return await m.delete();       
                    }
                    else if (reaction.emoji.name === '🧱') {

                        await m.edit(bridgeembed);  

                        const userReactions = m.reactions.cache.filter(reaction => reaction.users.cache.has(msg.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                await reaction.users.remove(msg.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }                        
                    
                        awaitReactions(msg, m, options, filter);

                    }
                    else if (reaction.emoji.name === '⚛') {

                        await m.edit(omniembed);

                        const userReactions = m.reactions.cache.filter(reaction => reaction.users.cache.has(msg.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                await reaction.users.remove(msg.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }
                        
                        awaitReactions(msg, m, options, filter);

                    }
                    else if (reaction.emoji.name === '📏') {

                        await m.edit(extembed);

                        const userReactions = m.reactions.cache.filter(reaction => reaction.users.cache.has(msg.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                await reaction.users.remove(msg.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }

                        awaitReactions(msg, m, options, filter);

                    }
                    else {
                        awaitReactions(msg, m, options, filter);
                    }
                    





                }).catch(() => {});
            
            
            }

            await awaitReactions(msg, m, options, filter);
            
            
    } catch (error) {
        console.log(error);
    }


}