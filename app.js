const Discord = require("discord.js");
const bot = new Discord.Client();
const getItemID = require('./utils.js');
const config = require("./config.json");

const ROTATIONS_IMAGE_URL = "https://i.redd.it/hdfsf45xwzqy.png";

bot.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log('Bot has started successfully!');
  console.log('Users interacting with bot:', bot.users.size)
  console.log('Channels with bot:', bot.channels.size);
  console.log('Guilds with bot:', bot.guilds.size);

  bot.user.setPresence({
    status: 'Online',
    game: {
      name: 'Old School RuneScape',
      type: 'LISTENING',
    },
  });
});

bot.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

bot.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


bot.on("message", async message => {
  if (message.author.bot || message.content.indexOf(config.prefix) !== 0) {
    return;
  }

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch(command) {
    case "rotation":
    case "rotations":
      message.channel.send(ROTATIONS_IMAGE_URL);
      break;
    default:
      break;
  }
});

bot.login(config.token);
