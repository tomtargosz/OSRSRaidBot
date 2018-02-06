// Util to retrieve an item's key via a variety of spellings/shorthands
getItemKey = (item) => {
  if (!item) {
    return null;
  }

  const searchTerm =  item.toLowerCase();
  switch(searchTerm) {
    case "dex":
    case "dext":
    case "dex scroll":
    case "dexterous prayer scroll":
      return "dexterous";
    case "arcane":
    case "arc":
    case "arcane scroll":
    case "arcane prayer scroll":
      return "arcane";
    case "dragon sword":
    case "sword":
      return "sword";
    case "dragon harpoon":
    case "harpoon":
    case "harp":
      return "harpoon";
    case "dragon thrownaxe":
    case "axe":
    case "axes":
    case "thrownaxe":
    case "thrownaxes":
      return "thrownaxes";
    case "twisted buckler":
    case "buck":
    case "buckler":
      return "buckler";
    case "dragon hunter crossbow":
    case "crossbow":
    case "hunter":
    case "cbow":
    case "xbow":
      return "crossbow";
    case "dinh's bulwark":
    case "dinhs bulwark":
    case "dinh":
    case "dinhs":
    case "bulwark":
    case "shield":
      return "bulwark";
    case "ancestral hat":
    case "hat":
      return "hat";
    case "ancestral robe top":
    case "top":
    case "robe top":
      return "top";
    case "ancestral robe bottom":
    case "bottom":
    case "bottoms":
    case "robe bottom":
    case "robe bottoms":
      return "bottom";
    case "dragon claws":
    case "claws":
    case "claw":
      return "claws";
    case "elder maul":
    case "maul":
    case "elder":
      return "maul";
    case "kodai insignia":
    case "kodai":
    case "insignia":
    case "insig":
      return "kodai";
    case "tbow":
    case "twisted bow":
    case "bow":
    case "t bow":
      return "tbow";
    default:
      return null;
  }
}

module.exports = getItemKey;
