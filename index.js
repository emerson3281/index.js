console.log("Conectando...")

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
var Jimp = require("jimp");
const active = new Map();
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
var database = require("./database.js");
const DBL = require('dblapi.js')
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 30;

fs.readdir("./commands/", (err, files) => {

	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
	  console.log("Não foi possível encontrar o(s) comando(s).");
	  return;
	}
  
	jsfile.forEach((f, i) =>{
	  let props = require(`./commands/${f}`);
	  console.log(`${f} Carregado!`);
	  bot.commands.set(props.help.name, props);
	});
});

fs.readdir("./commands/administração", (err, files) => {

	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
	  console.log("Couldn't find commands.");
	  return;
	}
  
	jsfile.forEach((f, i) =>{
	  let props = require(`./commands/administração/${f}`);
	  bot.commands.set(props.help.name, props);
	});
});

fs.readdir("./commands/diversão", (err, files) => {

	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
	  console.log("Couldn't find commands.");
	  return;
	}
  
	jsfile.forEach((f, i) =>{
	  let props = require(`./commands/diversão/${f}`);
	  bot.commands.set(props.help.name, props);
	});
})

bot.on('message', async message => {

    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
  
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
	
});

bot.on('guildMemberAdd', member => {
  if(member.guild.id == "313515019272847371") {
  const embed = new Discord.RichEmbed()
      .setThumbnail(member.user.displayAvatarURL)
      .addField("ID do usuário:", member.id)
      .setTitle(`Bem-vindo(a)`)
      .setDescription(`<@${member.id}>, entrou no servidor! Obrigado por entrar na ${member.guild.name} Leia as <#363377156308598794>, antes de se interagir no servidor!!`)
      .setColor('#FF0000')
      .setImage("")
      bot.channels.get('371645473150337024').send(embed)
      let role = member.guild.roles.find(role => role.name == 'Viewers');
    member.addRole(role);
}})

bot.on('guildMemberRemove', member => {
    var embed = new Discord.RichEmbed()
    .setTitle('Ate logo')
    .setDescription('acaba de sair do servidor!\n \nNos estamos esperando a volta dele!')
    .setColor('RANDOM')
    .setAuthor(member.user.tag, member.user.displayAvatarURL)
   
    bot.channels.get('371645473150337024').send(embed)
})

bot.login(botconfig.token);
