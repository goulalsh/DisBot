//Gotta get all them files loaded up
const Discord = require('discord.js');
const client = new Discord.Client();
console.log('loading settings');
const settings = require('./settings.json');
console.log('loading interjections');
const interject = require('./interject.json');
console.log('loading commands');
const cmd = require('./cmd.json');
console.log('loading token.json');
const token = require('./token.json');

if (token.token === '') {
    console.log('You must add a valid bot token to token.json');
}

client.login(token.token)
client.on('ready', () => {
    console.log(settings.motd);
    client.user.setGame(settings.defaultGame);
});

client.on('message', message => {
    //Do not reply to bots
    if (message.author.bot) {
        return;
    };

    //Uncomment this line and replace "Moderator" with the name of the role you're looking for
    //console.log(message.guild.roles.find("name", "Moderator"));

    //reroute commands to the appropriate function
	if (message.content.startsWith(settings.hardPrefix)) {
		hCommand(message);
		return;
	}
	else if (message.content.startsWith(settings.softPrefix)){
		sCommand(message);
		return;
	}

	//interject if enabled
    else if (settings.interject) {
		replyInterject(message);
    }

});

//TODO: Real permissions instead of this crap
function rolecheck(userroles, role) {
    //iterate though collection of roles to check for the mod role
    for (let element of userroles) {
        if (element[1].name === role) {
			console.log("boop");
			return true;
        }
    };
    return false;
};

function hCommand(message){

	var prefix = settings.hardPrefix;
	var args = message.content.split(' ').slice(1);
	var argresult = args.join(' ');

  	if (message.content.startsWith(settings.hardPrefix + 'setgame')) {
    	if (rolecheck(message.member.roles, "Moderator")) {
			console.log("Setting game to " + argresult)
			client.user.setGame(argresult);
        	return;
      	}
    	else {
        	message.channel.send("You do not have the required role");
        	return;
    	}
	}

  	else if (message.content === settings.hardPrefix + 'setstatus') {
    	if (rolecheck(message.member.roles, settings.modrole)) {
        	client.user.setStatus(argresult);
        	return;
      	}
      	else {
        	message.channel.send("You do not have the required role");
        	return;
      	}
	}

  	else if (message.content.startsWith(settings.hardPrefix + 'getroleinfo')) {
		var out = message.guild.roles.find("name", argresult);
      	message.channel.send(out.name + ": " + out.id);
      	console.log(out);
	  	return;
  	}
};

function sCommand(message) {
	// TODO: soft commands
    var prefix = settings.softPrefix
    var args = message.content.split(' ').slice(1);
    var argsresult = args.join(' ');
    for (let element of cmd.triggers){
        if (message.content.startsWith(prefix + element)) {
            reply = cmd.replies[cmd.triggers.indexOf(element)]

            if (reply.startsWith("images/")){
                message.channel.sendFile(reply);
            }

            else {
                message.channel.send(reply);
            }

            return;

        }
    }
    return;

};

function replyInterject(message) {
	for (let element of interject.triggers){
		if (message.content.toLowerCase().includes(element)) {
			reply = interject.replies[interject.triggers.indexOf(element)];

			if (reply.startsWith("images/")){
				message.channel.sendFile(reply);
			}

			else {
				message.channel.send(reply);
			}

			return;
		}
	}
	return;
};
