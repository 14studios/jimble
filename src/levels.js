const levels = [
    {
        level: 1,
        name: "Member",
        staff: false,
        check: () => true
    },
    {
        level: 25,
        name: "Moderator",
        staff: false,
        check: (message) => {	
            try {	
              return (message.member.hasPermission("MANAGE_MESSAGES"));	
            } catch (e) {	
              try {	
                return (message.member.hasPermission("MANAGE_ROLES"));	
              } catch (e) {	
                try {	
                  return (message.member.hasPermission("KICK_MEMBERS"));	
                } catch (e) {	
                  try {	
                    return (message.member.hasPermission("BAN_MEMBERS"));	
                  } catch (e) {	
                    return false;
                  }	
                }	
             }	
            }	
        }
    },
    {
        level: 50,
        name: "Administrator",
        staff: false,
        check: (message) => {
            try {	
            return (message.member.hasPermission("MANAGE_GUILD", { checkAdmin: true }));	 
          } catch (e) {	
            return false;	
          }	
        }
    },
    {
        level: 75,
        name: "Server Owner",
        staff: false,
        check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false	
    },
    {
        level: 99,
        name: "System Administrator",
        staff: true,
        check: (message) => {
          try {
            if(message.client.guilds.cache.get("736344227088433152").members.cache.get(message.author.id).roles.cache.has("737374051231727666") == true) return true;
            if(message.client.guilds.cache.get("736344227088433152").members.cache.get(message.author.id).roles.cache.has("737374051231727666") == false) return false;
          }catch (e){
            if (message.client.guilds.cache.get("736344227088433152").members.resolve(message.author.id) == undefined) return false; 
          }
        }
    },
    {
        level: 100,
        name: "Jimble Team",
        staff: true,
        check: (message) => {
          try {
            if(message.client.guilds.cache.get("736344227088433152").members.cache.get(message.author.id).roles.cache.has("767813879069409320") == true) return true;
            if(message.client.guilds.cache.get("736344227088433152").members.cache.get(message.author.id).roles.cache.has("767813879069409320") == false) return false;
          }catch (e){
            if (message.client.guilds.cache.get("736344227088433152").members.resolve(message.author.id) == undefined) return false; 
          }
        }
    }
]

module.exports = levels;