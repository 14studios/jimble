const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "ping",
    category: "misc",
    description: "Returns WS Latency",
    run: async(client, message, args) => {
        
        const embed = new MessageEmbed()
        .setTitle("Pong!")
        .setDescription(`Websocket latency is \`${client.ws.ping}\`ms.`)
        .setTimestamp()
        .setFooter(`Jimble ${client.pkg.version}`)
        .setColor("GREEN");
        message.channel.send({embed: embed})
        
    }

}