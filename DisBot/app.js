const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json')
client.login(settings.token)
client.on('ready' ,() => {
	console.log('Lets fuckin go');
});
client.on('message', message => {
    //autoresponses to phrases
    if (!message.author.bot)   {
        if (message.content.includes("megadeath")) {
            message.channel.send('IT IS SPELLED MEGADETH YOU UNCULTURED MOTHERFUCKIN GOD DAMN FUCKIN CUNTFUCK');
        } else

            if (message.content === 'Hello me') {
                message.channel.send('Meet the real me');
            } else

                if (message.content.includes("thighs")) {
                    message.channel.send('I heard thighs! Where the thighs at!?');
                }
    }

    //Picure responses

    if (message.content.includes("fuck you")) {
        message.channel.sendFile("images/dealwithit.jpg");
    } else

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
            client.user.setGame(argresult);

        } else

            if (message.content.startsWith(prefix + 'setstatus')) {
                if (!argresult) argresult = 'online';
                client.user.setStatus(argresult);

            } else

                if (message.content.startsWith(prefix + 'help')) {
                    message.author.send('/youthere? checks if I am up and barely functioning. /ratethighs rates the thighs you sent. Uhh, that is it so far.');

                } else

                    if (message.content.startsWith(prefix + 'ljn')) {
                        message.channel.sendFile("images/whatfff");
                    }
});
                    
            
