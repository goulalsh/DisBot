//Gotta get all them files loaded up
const Discord = require('discord.js');
const client = new Discord.Client();
console.log('loading settings');
const settings = require('./settings.json');
console.log('loading interjections');
const interject = require('./interject.json');
console.log('loading commands');
const commands = require('./cmd.json');
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
		/*
        //check if message is on interject list
        reply = interject.triggers.indexOf(message.content);
        if (reply === -1) {
          //message not on list.
          return;
        }
		else {
			//send images
            if (interject.replies[reply].startsWith("images/")) {
                message.channel.sendFile(interject.replies[reply]);
            }
            else {
                message.channel.send(interject.replies[reply]);
            }
            return;
        }
		*/
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

	prefix = settings.hardPrefix;
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

    else if (message.content.startsWith(settings.hardPrefix + 'help')) {
        var Value;
        message.author.send("", {
                            "embed": {
                                "title": "Help for the Under Intact bot (please mind that these commands are not working right now)",
                                "color": 15623782,
                                "fields": [{
                                        "Name": "/givebeer",
                                        "Value": "Give a person a beer. Just sends a picture of someone giving James Hetfield a beer."
                                    },
                                    {
                                        "Name": "/ljn",
                                        "Value": "Sends a picture of James Rolfe aka The Angry Video Game Nerd."
                                    },
                                    {
                                        "Name": "/retardalert",
                                        "Value": "Sends a a South Park gif of Mrs. Garrison sounding off the retard alert."
                                    }
                                ]
                            }
                        })
                    }
};

function sCommand(message) {
	// TODO: soft commands
};

function replyInterject(message) {
	for (let element of interject.triggers){
		if (message.content.includes(element)) {
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
