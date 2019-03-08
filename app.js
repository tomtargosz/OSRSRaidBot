const Discord = require("discord.js");
const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');
const request = require('request');
const moment = require('moment');

const bot = new Discord.Client();
const getItemID = require('./utils.js');
const config = require("./config.json");

const ITEM_DATA = require("./itemData.json");

const DB_URI = `mongodb+srv://${config.db_user}:${config.db_password}@${config.db_url}`;
const ROTATIONS_IMAGE_URL = "https://i.redd.it/hdfsf45xwzqy.png";
const OSRS_GE_BASE_URL = "http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=";

bot.on("ready", () => {
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

  updateDBItems();
  setInterval(() => {
    updateDBItems();
  }, config.update_item_interval);
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
    case "item":
      if (!_.isEmpty(args)) {
        const itemID = getItemID(args.join(' '));
        if (!!itemID) {
          const retVal = await getSingleItem(itemID, buildSingleItemTable);
          if (!!retVal) {
            message.channel.send(buildSingleItemTable(retVal));
          }
        } else {
          message.channel.send("ERROR: Item not found!");
        }
      } else {
        message.channel.send("ERROR: Supply an item to look up!");
      }
      break;
    default:
      break;
  }
});

bot.login(config.token);

const getExchangePrice = (itemID, callback) => {
  const url = OSRS_GE_BASE_URL + itemID;

  request({
    url: url,
    json: true
  }, (error, response) => {
    if (error || response.statusCode !== 200) {
      return callback(error || {statusCode: response.statusCode});
    }
    callback(itemID, response);
  });
}

// Updates a single item by id
const updateDBItem = (itemID, response) => {
  const currentPrice = _.get(response, 'body.item.current.price');
  if (!currentPrice) {
    console.log("Error retrieving response for item:", itemID);
  }

  MongoClient.connect(DB_URI, (err, client) => {
    if (err) throw err;

    const items = client.db(config.db_name).collection(config.db_collection);
    const itemQuery = { id: itemID };
    const updateQuery = { $set: { value: currentPrice, lastUpdated: moment() } };

    items.updateOne(itemQuery, updateQuery, (err, res) => {
      if (err) {
        console.log("Error updating item:", itemID);
        console.log("Error:", err);
      }
      client.close();
    });
  });
}

// Updates all items in the DB
const updateDBItems = () => {
  console.log("Updating items in DB...");

  _.forEach(ITEM_DATA.items, item => {
    getExchangePrice(item.id, updateDBItem);
  });
  
  console.log("Items updated!");
}

async function getSingleItem(itemID) {
  const client = await MongoClient.connect(DB_URI);
  const result = await client.db(config.db_name).collection(config.db_collection).find({ id: itemID }).toArray();

  return result;
}

const buildSingleItemTable = (response) => {
  if (!response) {
    console.log('null response');
    return null;
  }
  const itemName = _.get(response[0], 'itemName', 'N/A');
  const value = _.get(response[0], 'value', 'N/A');
  const probability = _.get(response[0], 'probability', 'N/A');

  let message = new Discord.RichEmbed();
  message
    .addField("Item", itemName, true)
    .addField("Price",  value, true)
    .addField("Drop Rate",  probability, true);

  return message;
}
