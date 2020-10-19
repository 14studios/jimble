const {MessageEmbed} = require("discord.js")
module.exports = {
    name: "help",
    category: "information",
    level: 1,
    description: "This command displays a help guide for the bot.",
    run: async(client, message, args) => {
        
        const embed = new MessageEmbed()
        .setTitle("Help | Jimble", client.pkg.homepage)
        .setThumbnail(client.icon)
        .setDescription(`Jimble does not have a proper commands command at the moment. Click [here](https://discord.gg/h8dAHAA) to join our support server.`)
        .setTimestamp()
        .setFooter(`Jimble ${client.pkg.version} | by Artemis Studios`)
        .setColor("RANDOM");
        message.channel.send({embed: embed})
        
    }
}