const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const conf = require("./config.json")
const levels = require("./levels.js")
const { promisify } = require("util");
const sleep = promisify(setTimeout)
const client = new Client({
    disableEveryone: true
});
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);

});
client.permlevel = function (message) {
    let permlvl = 0;

    const permOrder = levels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
        const currentLevel = permOrder.shift();
        if (message.guild && currentLevel.guildOnly) continue;
        if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
        }
    }
    return permlvl;
};

client.permname = function(message){
    return levels.find(l => l.level === client.permlevel(message)).name
}

client.on('ready', async () => {
    client.icon = "https://www.thisiscolossal.com/wp-content/uploads/2018/08/Isopoly_01.gif"
    client.pkg = require("../package.json")
    console.log(`√ Success | ${client.user.tag} is now online!`)


    let GuildSize = await client.guilds.cache.size
    let statuses = [
      `j!help || ${GuildSize} servers`,
      `j!help || What's up? The sky.`,
      `j!help || Yo can I get admin`
    ]
    setInterval(async () => {
      GuildSize = await client.guilds.cache.size
      statuses = [
        `j!help || ${GuildSize} servers`,
        `j!help || What's up? The sky.`,
        `j!help || Yo can I get admin`
      ]
      const index = Math.floor(Math.random() * (statuses.length - 1) + 1); 
      await client.user.setActivity(statuses[index], { type: "LISTENING" })
    }, 25000); // Runs this every 10 seconds.
})

client.on('message', async message => {
    const level = client.permlevel(message);
    if(message.author.bot) return;
    if(!message.content.startsWith("j!")) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(2).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0) return;
    const command = client.commands.get(cmd)
    if(!command) {
        const aliasedCmd = client.commands.get(client.aliases.get(cmd));
        if (!aliasedCmd) return;
    }
    if(command) {
        const permissions = command.level;
        if (level < permissions) {
            const oop = await message.channel.send(`**You don't have permission to run \`j!${command.name}\`. This command requires that you have the level "${levels.find(l => l.level === permissions).name}", but you have the level "${await client.permname(message)}".**`)
            sleep(2500).then(e => {
               oop.delete()
               message.delete()
            })
            return;
          }
        command.run(client, message, args)
    }
})

client.login(conf.token);

