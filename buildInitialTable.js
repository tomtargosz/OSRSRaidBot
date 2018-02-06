const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');

const config = require("./config.json");
const ITEM_DATA = require("./itemData.json");

const DB_URI = `mongodb+srv://${config.db_user}:${config.db_password}@${config.db_url}`;

let itemsObject = [];
_.forEach(ITEM_DATA.items, item => {
  let newItem = {
    id: item.id,
    itemName: item.itemName,
    probability: item.probability,
    value: "0",
  };
  itemsObject.push(newItem);
});

MongoClient.connect(DB_URI, (err, client) => {
  if (err) throw err;
  console.log("Connected to MongoDB successfully!");

  const items = client.db(config.db_name).collection(config.db_collection);

  items.insertMany(itemsObject, function(err, res) {
    if (err) throw err;
    console.log(`Table successfully built with ${res.insertedCount} items!`);
    client.close();
  });
});
