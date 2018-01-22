const Discord = require('discord.js');
const client = new Discord.Client();
console.log('loading settings');
const settings = require('./settings.json');
console.log('loading interjections');
const interject = require('./interject.json');
console.log('loading commands');
const commands = require('./cmd.json');
console.log('boop');
if (settings.token === '') {
    console.log('You must add a valid bot token to settings.json');
}
client.login(settings.token)
client.on('ready', () => {
    console.log(settings.motd);
    client.user.setGame("with spaghetti");
});
client.on('message', message => {
    //Do not reply to bots
    if (message.author.bot) {
        return;
    };

    //Uncomment this line and replace "Moderator" with the name of the role you're looking for
    //console.log(message.guild.roles.find("name", "Moderator"));

    //reroute commands to the appropriate function
    if (message.content.startsWith(settings.hardPrefix) || message.content.startsWith(settings.softPrefix)) {
        Command(message);
        return;
    }
    else {
        //check if message is on interject list
        reply = interject.triggers.indexOf(message.content);
        if (reply === -1) {
          //message not on list
          return;
        }

        else {
            if (interject.replies[reply].startsWith("images/")) {
                message.channel.sendFile(interject.replies[reply]);
            }
            else {
                message.channel.send(interject.replies[reply]);
            }
            return;
        }
    }
    reply = cmd.triggers.indexOf(message.content);
    if (reply === -1) {
       return;
   }

   else {
     if (cmd.replies[reply].startsWith("images/")) {
        message.channel.sendFile(cmd.replies[reply]);
     }
        else {
            message.channel.send(cmd.replies[reply]);
     }
      return;
    }
});

function Command(message) {
    if (message.content.startsWith(settings.hardPrefix)) {
        //isolate args
        prefix = settings.hardPrefix;
        var args = message.content.split(' ').slice(1);
        var argresult = args.join(' ');

        console.log(message.content);
        //hard commands
        if (message.content.startsWith(prefix + 'setgame')) {
            if (rolecheck(message.member.roles, settings.modrole)) {
                client.user.setGame(argresult);
                return;
            }
            else {
                message.channel.send("You do not have the required role");
                return;
            }
            return;

        } else if (message.content.startsWith(prefix + 'setstatus')) {
                    if (rolecheck(message.member.roles, settings.modrole)) {
                    client.user.setStatus(argresult);
                    return;
        } else {
              message.channel.send("You do not have the required role");
              return;
        }

    } else if (message.startsWith(settings.softPrefix)) {
        sCommand(message);
        return;
    } else {
        throw 'Command function was passed as a non command';
        return;
    }
};

function rolecheck(userroles, roleid) {
    //iterate though collection of roles to check for the mod role
    userroles.forEach(function (element) {
        if (element === roleid) {
            return true;
        }
    });
    return false;
};

function hCommand(message){
  if (message.content.startsWith(settings.hardPrefix + 'setgame')) {
      if (rolecheck(message.member.roles, settings.modrole)) {
          client.user.setGame(argresult);
          return;
      }
      else {
          message.channel.send("You do not have the required role");
          return;
      }
      return;
  } else if (message.content === prefix + 'setstatus') {
      client.user.setStatus(argresult);
      return;
  }
};

function sCommand(message){

};
