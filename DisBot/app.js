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
});

function Command(message) {
    if (message.content.startsWith(settings.hardPrefix)) {
        //isolate args
        prefix = settings.hardPrefix;
        var args = message.content.split(' ').slice(1);
        var argresult = args.join(' ');


        //hard commands
        //toDo: require role to use commmands
        if (message.content === prefix + 'setgame') {
            if (rolecheck(message.member.roles, settings.modrole)) {
                client.user.setGame(argresult);
            }
            else {
                message.channel.send("You do not have the required role");
            }
            return;
        } else if (message.content === prefix + 'setstatus') {
            client.user.setStatus(argresult);
            return;
        }
    } else if (message.startsWith(settings.softPrefix)) {
        //todo: this entire feature
        return;
    } else {
        throw 'Command function was passed a non command';
        return;
    }
    return;
};

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
        foo = "bar"
        reply = interject.triggers.indexOf(message.content);
        if (reply === -1) {
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
});
function rolecheck(userroles, roleid) {
    //iterate though collection of roles to check for the mod role
    var roles = userroles;
    roles.foreach(function (element) {
        if (element === roleid) {
            return true;
        }
    });
    return false;
});