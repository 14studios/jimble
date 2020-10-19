const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const conf = require("./config.json")
const client = new Client({
    disableEveryone: true
});
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);

});

client.on('ready', () => {
    client.pkg = require("../package.json")
    console.log(`√ Success | ${client.user.tag} is now online!`)
    client.user.setActivity("gaming", {type: "WATCHING"})
})

client.on('message', async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith("j!")) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(2).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0) return;
    const command = client.commands.get(cmd)
    if(!command) client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args)
})

client.login(conf.token);

