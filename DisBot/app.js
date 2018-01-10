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
<<<<<<< HEAD
=======
client.on('message', message => {
    //autoresponses to phrases
    if (!message.author.bot) {
        if (message.content.includes("megadeath")) {
            message.channel.send('IT IS SPELLED MEGADETH YOU UNCULTURED MOTHERFUCKIN GOD DAMN FUCKIN CUNTFUCK');
        } else

            if (message.content === 'Hello me') {
                message.channel.send('Meet the real me');
            } else

                if (message.content.includes("thighs")) {
                    message.channel.send('I heard thighs! Where the thighs at!?');
                } else

                    if (message.content.includes("Megadeath")) {
                        message.channel.send('IT IS SPELLED MEGADETH YOU UNCULTURED MOTHERFUCKIN GOD DAMN FUCKIN CUNTFUCK');
                    } else

                        if (message.content.includes("beer")) {
                            message.channel.send("https://youtu.be/O-jOEAufDQ4");
                        }
    }
>>>>>>> master

function Command(message) {
    if (message.startsWith(settings.hardPrefix)) {
        //isolate args
        prefix = settings.hardPrefix;
        var args = message.content.split(' ').slice(1);
        var argresult = args.join(' ');


<<<<<<< HEAD
        //hard commands
        //toDo: require role to use commmands
        if (message.content === prefix + 'setgame') {
=======
        if (message.content.includes("Fuck you")) {
            message.channel.sendFile("images/dealwithit.jpg");
        } else

            if (message.content === "hey under") {
                message.channel.sendFile("images/lars_spaghetti.jpg");
            } else

                if (message.content === "Hey under") {
                    message.channel.sendFile("images/lars_spaghetti.jpg");
                } else

                    if (message.content === "Hey Under") {
                        message.channel.sendFile("images/lars_spaghetti.jpg");
                    } else

                        if (message.content.includes("180325308967157760")) {
                            message.channel.sendFile("images/lars_spaghetti.jpg");
                        }
                        
        //commands
        var prefix = "/"
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.split(' ').slice(1);
    var argresult = args.join(' ');
    console.log('Yep it is pretty much there');
    if (message.author === client.user) return;

    if (message.content === prefix + 'youthere?') {
        message.channel.sendMessage('Yes what do you want?');

    } else

        if (message.content.startsWith(prefix + 'setgame')) {
>>>>>>> master
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
};

<<<<<<< HEAD
client.on('message', message => {
    //Do not reply to bots
    if (message.author.bot) {
        return;
    };

    //reroute commands to the appropriate function
    if (message.content.startsWith(settings.hardPrefix) || message.content.startsWith(settings.softPrefix)) {
        Command(message);
        return;
    }
    else {
        //check if message is on interject list
        reply = interject.triggers.indexOf(message.content);
        if (reply === -1) {
            return;
        } else {
            message.channel.send(interject.replies[reply]);
            return;
        }
    }
});
=======
        } else

            if (message.content.startsWith(prefix + 'setstatus')) {
                if (!argresult) argresult = 'online';
                client.user.setStatus(argresult);

            } else

                if (message.content.startsWith(prefix + 'help')) {
                    message.author.send('/youthere? checks if I am up and barely functioning. /ljn will send a picture of James Rolfe, /givebooze will give a beer to you. Uhh, that is it so far.');

                } else

                    if (message.content.startsWith(prefix + 'ljn')) {
                        message.channel.sendFile("images/whatfff.jpg");
                    } else

                        if (message.content.startsWith(prefix + 'givebooze')) {
                            message.channel.sendFile("images/hetbeer.jpg");
                        }
});
                    
            
>>>>>>> master
