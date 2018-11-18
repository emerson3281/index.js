const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply('_**__ATENÇÃO__ você não possui permissões suficientes.**_');
  
      let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      let cargo = args[1];
  
      if (!member) return message.channel.send('_Você deve mencionar um usuário._');
      if (!cargo) return message.channel.send('_Você deve informar um cargo._');
  
      let nomeCargo = message.guild.roles.find('name', cargo);
      if (!nomeCargo) return message.channel.send('O cargo informado **não está presente** no servidor!');
  
      member.addRole(nomeCargo.id);
      await message.channel.send(`O usuário ${member.user.username} recebeu o cargo \`${args[1]}\`_`);;
}

module.exports.help = {
    name:"addrole"
}
