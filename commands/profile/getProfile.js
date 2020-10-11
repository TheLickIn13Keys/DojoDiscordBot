const commando = require('discord.js-commando');
const Discord = require("discord.js");
var mysql = require('mysql');
var MojangAPI = require('mojang-api');

module.exports = class stats extends commando.Command {
    constructor(client){
        super(client, {
            name: 'profile',
            group: 'profile',
            memberName: 'profile',
            description: 'shows player profile',
            argsType: 'multiple'
        })
    }
    async run(msg, args){

    }
}