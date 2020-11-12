const commando = require('discord.js-commando');
const Discord = require("discord.js");

module.exports = class ticketSetup extends commando.Command {
    constructor(client){
        super(client, {
            name: 'ticket-setup',
            aliases: ['ticket-close'],
            group: 'moderation',
            memberName: 'ticket setup',
            description: 'initializes the ticket system',
            argsType: 'multiple',
            userPermissions: ['MANAGE_GUILD']
        })
    }
    async run(msg, args){

    }
}
