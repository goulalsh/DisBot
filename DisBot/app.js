const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json')
const interjections = require('./interject.json')
const commands = require('./cmd.json')
if (settings.token === '') {
    console.log('You must add a valid bot token to settings.json');
}
client.login(settings.token)
client.on('ready', () => {
    console.log(settings.motd);
});

function Command(message) {
    if (message.startsWith(settings.hardPrefix)) {
        //isolate args
        prefix = settings.hardPrefix;
        var args = message.content.split(' ').slice(1);
        var argresult = args.join(' ');

        //hard commands
        //toDo: require role to use commmands
        if (message.content === prefix + 'setgame') {
            client.user.setGame(argresult);
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
}
});

client.on('message', message => {
    //Do not reply to bots
    if (message.author.bot) {
        return;
    };

    //reroute commands to the appropriate function
    if (message.startsWith(settings.hardPrefix) || message.startsWith(
            settings.softPrefix) Command(message);
        return;
    }
    else {
        //check if message is on interject list
        reply = interject.triggers.findIndex(message);
        if (reply === -1) {
            return;
        } else {
            client.user.send(interject.replies[reply]);
            return;
        }
    }
}
});