const _ = require("lodash");

// Util to retrieve an item's ID via a variety of spellings/shorthands
getItemID = item => {
  if (!item) {
    return null;
  }

  const searchTerm = item.toLowerCase();
  switch (searchTerm) {
    case "dex":
    case "dext":
    case "dex scroll":
    case "dexterous prayer scroll":
      return 21034;
    case "arcane":
    case "arc":
    case "arcane scroll":
    case "arcane prayer scroll":
      return 21079;
    case "dragon sword":
    case "sword":
      return 21009;
    case "dragon harpoon":
    case "harpoon":
    case "harp":
      return 21028;
    case "dragon thrownaxe":
    case "axe":
    case "axes":
    case "thrownaxe":
    case "thrownaxes":
      return 20849;
    case "twisted buckler":
    case "buck":
    case "buckler":
      return 21000;
    case "dragon hunter crossbow":
    case "crossbow":
    case "hunter":
    case "cbow":
    case "xbow":
      return 21012;
    case "dinh's bulwark":
    case "dinhs bulwark":
    case "dinh":
    case "dinhs":
    case "bulwark":
    case "shield":
      return 21015;
    case "ancestral hat":
    case "hat":
      return 21018;
    case "ancestral robe top":
    case "top":
    case "robe top":
      return 21024;
    case "ancestral robe bottom":
    case "bottom":
    case "bottoms":
    case "robe bottom":
    case "robe bottoms":
      return 21021;
    case "dragon claws":
    case "claws":
    case "claw":
      return 13652;
    case "elder maul":
    case "maul":
    case "elder":
      return 21003;
    case "kodai insignia":
    case "kodai":
    case "insignia":
    case "insig":
      return 21043;
    case "tbow":
    case "twisted bow":
    case "bow":
    case "t bow":
      return 20997;
    default:
      return null;
  }
};

// Calculates % chance of recieving a unique drop based on numuber of points accumulated: https://oldschool.runescape.wiki/w/Chambers_of_Xeric#Unique_drop_table
calculateUniqueProbability = points => {
  const MAX_POINTS_PER_CHANCE = 570000;
  const POINTS_PER_1_PERCENT_CHANCE = 8675;
  const formattedPoints = Number(points);

  if (_.isNaN(formattedPoints) || formattedPoints < 0) {
    return "ERROR: Incorrect number format";
  }
  if (formattedPoints < MAX_POINTS_PER_CHANCE) {
    return (
      "Chance of unique: " +
      (formattedPoints / POINTS_PER_1_PERCENT_CHANCE).toFixed(2) +
      "%"
    );
  } else if (formattedPoints < MAX_POINTS_PER_CHANCE * 2) {
    return (
      "Chance of 1st unique: " +
      (MAX_POINTS_PER_CHANCE / POINTS_PER_1_PERCENT_CHANCE).toFixed(2) +
      "%\nChance of 2nd unique: " +
      (
        (formattedPoints - MAX_POINTS_PER_CHANCE) /
        POINTS_PER_1_PERCENT_CHANCE
      ).toFixed(2) +
      "%"
    );
  }
};

module.exports = { getItemID, calculateUniqueProbability };
