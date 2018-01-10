const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json')
const interjections = require('./interject.json')
const commands = require ('./cmd.json')
if (settings.token === ''){
	console.log('You must add a valid bot token to settings.json')
}
client.login(settings.token)
client.on('ready' ,() => {
	console.log(settings.motd);
});
client.on('message', message =>{
	//check if message is command or not
	if (iscommand(message)){
		//check if hard command, if not, then run check commands.json
	}
	//check if message is on interject list
	else if(){
		//random to interject based on probability according to interject.json
		if(){
			//interject
		}
	}
}
