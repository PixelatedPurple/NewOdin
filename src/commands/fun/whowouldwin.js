const Command = require('../Command.js');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const {fail, load} = require("../../utils/emojis.json")
const fetch = require('node-fetch')
module.exports = class whowouldwinCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'whowouldwin',
      aliases: ['www', 'vs'],
      usage: 'whowouldwin <user mention/id>',
      description: 'Generates a whowouldwin image',
      type: client.types.FUN,
      examples: ['whowouldwin @split']
    });
  }
  async run(message, args) {
    const member = await this.getMemberFromMention(message, args[0]) || await message.guild.members.cache.get(args[0]) || message.author;
    const member2 = await this.getMemberFromMention(message, args[1]) || await message.guild.members.cache.get(args[1]) ||  message.guild.members.cache.random() ||message.author;

    message.channel.send({embeds: [new MessageEmbed().setDescription(`${load} Loading...`)]}).then(async msg=>{
      try {
        const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=whowouldwin&user1=${this.getAvatarURL(member)}&user2=${this.getAvatarURL(member2)}`));
        const json = await res.json();
        const attachment = new MessageAttachment(json.message, "whowouldwin.png");

        await message.channel.send({files: [attachment]})
        await msg.delete()
      }
      catch (e) {
        await msg.edit({embeds: [new MessageEmbed().setDescription(`${fail} ${e}`)]})
      }
    })
  }
};
