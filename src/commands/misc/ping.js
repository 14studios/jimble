const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "ping",
    category: "misc",
    level: 1,
    description: "Returns WS Latency",
    run: async(client, message, args) => {
        
        const embed = new MessageEmbed()
        .setTitle("Pong!")
        .setThumbnail(client.icon)
        .setDescription(`It took \`${client.ws.ping}\` miliseconds for the Discord WebSocket connection to respond.`)
        .setTimestamp()
        .setFooter(`Jimble ${client.pkg.version}`)
        .setColor("GREEN");
        message.channel.send({embed: embed})
        
    }

}