## OSRSRaidBot
Discord Bot that provides helpful functionality for OSRS raiding.

## How to start the bot
1. Run `npm install`
2. Fill out the values in the config.json file
3. Run `node buildInitialTable.js` to create the database structure needed for the bot
4. Run `node app.js` to populate the database with item information and start the bot

## Bot commands
* `help`: provides an overview of the bots functionality by listing out all commands the bot can respond to
* `rotation`: Sends a picture of the 2 possible raid rotations
* `item [itemName]`: Displays the drop rate and current price in the database for the specified raid item.
* `drop [points]`: Calculates the % chance of receiving a unique drop based on the amount of points accumulated in a raid based off the [RS Wiki](https://oldschool.runescape.wiki/w/Chambers_of_Xeric#Unique_drop_table)

## Setting config.json values
* `token`: The token of your Discord bot. [This guide](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) goes through the process of creating a Discord bot
* `prefix`: This is the character the bot will look out for when responding to commands, i.e. if the prefix is set to `!` the bot will listen for messages starting with `!`
* `db_user`: The username for your MongoDB Cluster
* `db_password`: The password for your MongoDB Cluster
* `db_url`: The hostname of your MongoDB Cluster
* `db_name`: The name of your database
* `db_collection`: The name of the collection within your database holding the OSRSRaidBot item values
* `update_item_interval`: How often the bot will update the item prices within your database in ms (defaulted to 15 minutes)
