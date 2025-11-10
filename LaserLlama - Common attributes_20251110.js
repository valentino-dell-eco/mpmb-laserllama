/*  -WHAT IS THIS?-
    This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
    Import this file using the "Add Extra Materials" bookmark.

    -KEEP IN MIND-
    It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	
    -INFORMATION-
    Subject:    Compilation of attributes shared across several of Laserllama's classes which are required to make the other imports work
          Currently, this includes: Exploits, Spells and Fighting styles

    Effect:     This script adds Laserllama's Exploits as spells (with both regular spell attributes, and some unique attributes, see doc below)
          It also adds some modified or new spells from LL's spell compendium
          It also defines a global variable (FightingStylesLL) containing Fighting styles
          It also defines a global variable (KnacksLL) containing Knacks
          It also defines a global variable (MysticTalentsLL) containing Mystic Talents

          Those exploits were published by Laserllama in GM Binder under the Fan Content policy.
          Laserllama: https://www.gmbinder.com/profile/laserllama

          SOURCE FOR MARTIAL EXPLOITS
          Alternate Fighter: https://www.gmbinder.com/share/-MSfA82gv8V69JAoqFVq
          Alternate Fighter expanded: https://www.gmbinder.com/share/-MUkP55cdNMTFYMKlDUL
          Version: 4.3.1

          SOURCE FOR DEVIOUS EXPLOITS
          Alternate Rogue: https://www.gmbinder.com/share/-N8o6KduyOA2qhUGBQqA
          Alternate Rogue expanded: https://www.gmbinder.com/share/-NJ8-9uVQcpeQLxLx5RS
          Version: 2.2.1

          SOURCE FOR SAVAGE EXPLOITS
          Alternate Barbarian: https://www.gmbinder.com/share/-N2gn3QXALCVqwAFJe5v
          Alternate Barbarian expanded: https://www.gmbinder.com/share/-N7MhiHnBhzmgxFtkzBO
          Version: 2.1.1

          SOURCE FOR KNACKS
          Alternate Ranger: https://www.gmbinder.com/share/-M7iu19Af89SH2G_5RGa
          Alternate Ranger expanded: https://www.gmbinder.com/share/-MW4c30CbGMWLRNgJxgb
          Version: 4.2.0

          SOURCE FOR MYSTIC TALENTS
          Psion Class: https://www.gmbinder.com/share/-MPkCSxSj0OETiEd3Pyf
          Version: 2.3.0

          SOURCE FOR SPELLS
          Spell compendium: https://www.gmbinder.com/share/-NQcEN32m0-1u_UMFV5h
          Version: 0.2

          SOURCE FOR FIGHTING STYLES
          Alternate Martial Multiclassing: https://www.gmbinder.com/share/-NGUL51kfZCPlESxL1wq
          Version: 0.1

    Sheet:      v13.0.06 and newer
 
    Code by:    Original script by CalypsoMoonlace
          Thanks to @garnaul (t-santana on github) for helping out with some exploits
          With revision from Valentino dell'Eco
*/

/* HOW TO ADD AN EXPLOIT 
  Exploits attributes are split into two parts:
  1. Exploit exclusive attributes
  2. Regular spell attributes
	
  Exploit exclusive attributes are detailed below:
  isExploit // REQUIRED // 
    TYPE: boolean
    Has to be set to true for ALL Exploits
    Setting it to false is the same as not putting it

  submenu // OPTIONAL //
    TYPE: string
    Determines the submenu in which the Exploit will be added, if any
    It is recommended to use a submenu related to the degree of the Exploit

  prereqeval // OPTIONAL //
    TYPE: function or, for backwards-compatibility, string that is evaluated using eval()
    This should return 'true' if the prerequisite is met or 'false' otherwise
    NOTE: Do not add the class level preqrequisite, as it is calculated using the spell level attribute
    For more details: https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/blob/master/additional%20content%20syntax/feat%20(FeatsList).js#L146

  addMod // OPTIONAL //
    TYPE: array of objects (variable length)
    This should only be used if the exploit gives a passive bonus (eg, replacing a skill check with another ability)
    For more details: https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/blob/master/additional%20content%20syntax/_common%20attributes.js#L2108 

  Regular spell attributes are detailed below:
  classes // REQUIRED //
    TYPE: array (variable length)
    This determines which classes can access this Exploit

  level // REQUIRED //
    TYPE: number (0-5)
    This is the exploit's degree

  school // OPTIONAL //
    TYPE: string
    This determines the school in which the spell belongs
    For Exploits, there are currently the following schools: Combat, Skill & Order

    You can also define a new spell school abbreviation by adding it to the "spellSchoolList" object, like so:
      spellSchoolList["NewSc"] = "new school";
    Be aware that the object name can use capitalization but the entered string can't.

  components // OPTIONAL //
    TYPE: string
    This determines the required components for the spell
    For Exploits, there might be components such as a ranged weapon, a melee weapon, a free hand, etc.

  All other spell attributes can be found at:
  https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/blob/master/additional%20content%20syntax/spell%20(SpellsList).js

*/

// Meta information
var iFileName = "LaserLlama - Common attributes_20250718.js";
RequiredSheetVersion("13.0.6");

// Source information
SourceList["GMB:LL"] = {
  name: "LaserLlama",
  abbreviation: "GMB:LL",
  abbreviationSpellsheet: "LL",
  group: "GM Binder",
  url: "https://www.gmbinder.com/profile/laserllama",
  date: "2018/04/22",
};

function hasExpertAccess(fs) {
  const cls = CurrentFeatureChoices.classes;
  if (
    cls &&
    cls["fighter(laserllama)"] &&
    cls["fighter(laserllama)"]["fighting style"] &&
    Array.isArray(cls["fighter(laserllama)"]["fighting style"].extrachoices)
  ) {
    return cls["fighter(laserllama)"]["fighting style"].extrachoices.indexOf(fs) !== -1;
  }
  return false;
}
function doubleRange(rangeString) {
  if (typeof rangeString !== "string") {
    return rangeString;
  }
  var numbers = rangeString.match(/\d+/g);

  if (!numbers || numbers.length === 0) {
    return rangeString;
  }
  var doubledNumbers = [];
  for (var i = 0; i < numbers.length; i++) {
    doubledNumbers.push(parseInt(numbers[i], 10) * 2);
  }

  var currentIndex = 0;
  var newRangeString = rangeString.replace(/\d+/g, function (match) {
    var doubledValue = doubledNumbers[currentIndex];
    currentIndex++;
    return doubledValue.toString();
  });

  return newRangeString;
}
function returnShieldBonus() {
  return What("AC Shield Bonus").length > 0 ? What("AC Shield Bonus") : 0;
}
// New spell schools
spellSchoolList["Combat"] = "combat";
spellSchoolList["Skill"] = "skill";
spellSchoolList["Speech"] = "speech";
spellSchoolList["Craft"] = "craft";
spellSchoolList["Order"] = "order";

// 1st degree exploits
SpellsList["aerial maneuver"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Dex") >= 11 && v.skillProfs.indexOf("Acrobatics") !== -1;
  },
  prerequisite: "Dexterity of 11, Acrobatics proficiency",
  // Regular spell attributes
  name: "Aerial Maneuver",
  classes: ["rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "1 rea",
  timeFull: "1 reaction, which you take when you fall",
  range: "Self",
  duration: "Instantaneous",
  description: "Reduce fall damage by five times my level",
  descriptionFull:
    "When you fall, you can use a reaction to expend an Exploit Die to control your fall. You reduce any falling damage that you would take by an amount equal to five times your level, and when you land, you can choose to land on your feet.",
};

SpellsList["alchemical adept"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Int") >= 11 || What("Wis") >= 11;
  },
  prerequisite: "Intelligence or Wisdom of 11",
  // Regular spell attributes
  name: "Alchemical Adept",
  classes: ["rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Check",
  range: "Self",
  components: "M",
  compMaterial: "alchemist's supplies, herbalism kit, or poisoner's kit",
  duration: "Instantaneous",
  description:
    "Add Exploit Die to a alchemist's supplies, herbalism kit, or poisoner's kit check",
  descriptionFull:
    "When you make an alchemist's supplies, herbalism kit, or poisoner's kit check you can expend one Exploit Die, roll it, and add the result to your ability check. You can do so after you roll the d20, but before you know if you succeed or fail.",
};

SpellsList["arresting strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  // Regular spell attributes
  name: "Arresting Strike",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "Hit",
  timeFull: "No action required, on hit with a weapon attack",
  range: "Attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  duration: "Instantaneous",
  save: "Dex",
  description:
    "On hit, target makes Dex saving throw or speed halved and takes an Exploit Die of bonus dmg",
  descriptionFull:
    "When you hit a target with a weapon attack, you can expend one Exploit Die and force it to make a Dexterity saving throw. On a failure, it takes bonus damage equal to one roll of your Exploit Die and its speed is halved until the start of your next turn.",
};

SpellsList["attack order"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (order)]",
  // Regular spell attributes
  name: "Attack Order",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Order",
  time: "attack",
  timeFull: "No action required, you can forgo an attack",
  range: "30 feet",
  duration: "Instantaneous",
  description:
    "Can forgo an attack to order an ally It can hear/see me within 30 feet to make an extra attack their turn before my next one",
  descriptionFull:
    "When you take the Attack action, you can forgo an attack to issue this Order to another creature that can see or hear you within 30 feet. If it takes the Attack action before the start o fyour next turn, it makes one additional attack.",
};

SpellsList["brace up"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Con") >= 11;
  },
  // Regular spell attributes
  name: "Brace Up",
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "1 bns",
  range: "Self",
  duration: "Instantaneous",
  description: "Gain 1 ED+Con temporary hit points, they last 1 minute",
  descriptionFull:
    "You steel yourself for combat, preparing yourself to take a hit. As a bonus action, you can expend one Exploit Die and gain temporary hit points equal to 1 + your Constitution modifier. Temporary hitpoints from this Exploit only last for 1 minute.",
};

SpellsList["commanding presence"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Str") >= 11 || What("Cha") >= 11;
  },
  addMod: {
    type: "skill",
    field: "Intimidation",
    mod: "max(Str-Cha|0)",
    text: "I can replace Charisma (Intimidation) checks with Strength (Intimidation)",
  },
  // Regular spell attributes
  name: "Commanding Presence",
  classes: [
    "fighter(laserllama)",
    "barbarian(laserllama)",
    "rogue(laserllama)",
    "warlord(laserllama)"
  ],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Check",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Add Exploit Die to Persuasion and Intimidation checks; Can make Str (Intimidation) checks (passive)",
  descriptionFull:
    "When making a Charisma (Persuasion) or Charisma (Intimidation) check, you can expend one Exploit Die, roll it, and add the result to your ability check after rolling the d20 but before determining success.\n\nAdditionally, when required to make a Charisma (Intimidation) check, you can opt to make a Strength (Intimidation) check instead.",
};

SpellsList["cunning instinct"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Wis") >= 11;
  },
  // Regular spell attributes
  name: "Cunning Instinct",
  classes: [
    "fighter(laserllama)",
    "rogue(laserllama)",
    "barbarian(laserllama)",
    "warlord(laserllama)"
  ],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Check",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Add Exploit Die to a Wisdom (Perception) or Wisdom (Survival) check",
  descriptionFull:
    "When making a Wisdom (Perception) or Wisdom (Survival) check, you can expend one Exploit Die, roll it, and add the result to your ability check after rolling but before determining success or failure.",
};

SpellsList["defensive order"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (order)]",
  // Regular spell attributes
  name: "Defensive Order",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Order",
  time: "attack",
  timeFull: "No action required, you can forgo an attack",
  range: "30 feet",
  duration: "Instantaneous",
  description:
    "Can forgo an attack to order an ally It can hear/see me within 30 feet to have the benefits of Dodge action until start of my next turn",
  descriptionFull:
    "When you take the Attack action, you can forgo an attack to issue this Order to another creature that can hear or see you within 30 feet, granting it the benefits of the Dodge action until the start of your next turn.",
};

SpellsList["disarm"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  // Regular spell attributes
  name: "Disarm",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "Hit",
  timeFull: "No action required, on hit with a weapon attack",
  range: "Attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  duration: "Instantaneous",
  save: "Str",
  description:
    "On hit, target makes Str saving throw or drops one item and takes an Exploit Die of bonus dmg",
  descriptionFull:
    "When you hit a creature with a weapon attack, you can expend an Exploit Die and attempt to disarm it. It must succeed on a Strength saving throw, or it takes additional damage equal to one roll of your Exploit Die, and it drops one item of your choice that it is currently holding on the ground in the space that it is currently occupying.",
};

SpellsList["feat of strength"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Str") >= 11 || What("Con") >= 11;
  },
  prerequisite: "Strength or Constitution of 11",
  // Regular spell attributes
  name: "Feat of Strength",
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Check",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Add any Exploit Die up to my Prof Bonus to a Str or Con ability check",
  descriptionFull:
    "Whenever you make a Strength or Constitution ability check you can expend Exploit Dice (up to your proficiency bonus), roll those dice, and add the total to the result of your ability check. You can do so after you roll the d20, but before you know if you succeed or fail.",
};

SpellsList["feint"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  // Regular spell attributes
  name: "Feint",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "1 bns",
  range: "15 ft",
  duration: "Instantaneous",
  description:
    "One creature makes Wis save or I have adv on all my attacks against them until the end of my turn",
  descriptionFull:
    "As a bonus action, you can expend one Exploit Die to feint, forcing a creature that can see you within 15 feet to make a Wisdom saving throw. On a failed save, you have advantage on your attacks against it until the end of your current turn.",
};

SpellsList["first aid"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return v.skillProfs.indexOf("Medicine") !== -1;
  },
  prerequisite: "Medicine proficiency",
  // Regular spell attributes
  name: "First Aid",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "1 a",
  range: "Touch",
  duration: "Instantaneous",
  description:
    "Touch a willing creature, expend any Exploit Die up to Prof Bonus to heal it (see book)",
  descriptionFull:
    "As an action, you touch a willing, living creature and expend Exploit Dice (up to your Proficiency Bonus). For every Exploit Die you spent, that creature regains hit points equal to one roll of its Hit Die + its Constitution modifier (minimum of 0).",
};

SpellsList["heroic fortitude"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  // Regular spell attributes
  name: "Heroic Fortitude",
  classes: ["fighter(laserllama)", "barbarian(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Save",
  range: "Self",
  duration: "Instantaneous",
  description: "Add Exploit Die to a Str, Dex or Con saving throw",
  descriptionFull:
    "Whenever you are forced to make a Strength, Dexterity, or Constitution saving throw you can expend an Exploit Die, roll it, and add the result to your saving throw. You can do so after you roll the d20, but before you know if you succeed or fail.",
};

SpellsList["hurl"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Str") >= 11 && v.skillProfs.indexOf("Athletics") !== -1;
  },
  // Regular spell attributes
  name: "Hurl",
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "Attack",
  timeFull: "In place of an attack",
  range: "60/120 ft",
  duration: "Instantaneous",
  save: "Dex",
  description:
    "1 crea makes Dex saving throw or both crea and thrown object take Exploit Die + Str bludg dmg",
  descriptionFull:
    "In place of an attack, you can expend an Exploit Die to throw an object that you are holding at a target you can see within 60 feet. The target must succeed on a Dexterity saving throw or both the object and target take bludgeoning damage equal to one roll of your Exploit Die + your Strength modifier.\n\nAt 11th level, the range of this Exploit becomes 120 feet",
};

SpellsList["inquisitive eye"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Int") >= 11 || What("Wis") >= 11;
  },
  prerequisite: "Intelligence or Wisdom of 11",
  // Regular spell attributes
  name: "Inquisitive Eye",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Check",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Add Exploit Die to an Intelligence (Investigation) or a Wisdom (Insight) check",
  descriptionFull:
    "When you make an Intelligence (Investigation) or a Wisdom (Insight) check you can expend one Exploit Die, roll it, and add the result to your ability check. You can do so after you roll the d20, but before you know if you succeed or fail.",
};

SpellsList["lightstep"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Dex") >= 11;
  },
  prerequisite: "Dexterity of 11",
  // Regular spell attributes
  name: "Lightstep",
  classes: [
    "fighter(laserllama)",
    "rogue(laserllama)",
    "barbarian(laserllama)",
    "warlord(laserllama)"
  ],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Check",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Add Exploit Die to a Dexterity (Acrobatics) or a Dexterity (Stealth) check",
  descriptionFull:
    "When you make a Dexterity (Acrobatics) or a Dexterity (Stealth) check you can expend one Exploit Die, roll it, and add the result to your ability check. You can do so after you roll the d20, but before you know if you succeed or fail.",
};

SpellsList["maneuvering order"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (order)]",
  // Regular spell attributes
  name: "Maneuvering Order",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Order",
  time: "attack",
  timeFull: "No action required, you can forgo an attack",
  range: "30 feet",
  duration: "Instantaneous",
  description:
    "Can forgo an attack to order an ally It can hear/see me within 30 feet to move half its speed",
  descriptionFull:
    "When you take the Attack action, you can forgo an attack to issue this Order to another creature that can see or hear you within 30 feet, and that creature can use its reaction to move up to its speed without provoking opportunity attacks.",
};

SpellsList["mighty leap"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Str") >= 11 && v.skillProfs.indexOf("Athletics") !== -1;
  },
  // Regular spell attributes
  name: "Mighty Leap",
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "1 bns",
  timeFull: "After moving at least 10 ft",
  range: "Self",
  duration: "Instantaneous",
  description:
    "After run 10 ft, expend a Exploit Die to Jump up to 30 feet in a line as bonus action, even exceeding you remaining speed",
  descriptionFull:
    "After you run 10 feet in a straight line, you use a bonus action to expend an Exploit Die to long jump up to 30 feet in a line, even if this distance would exceed your remaining speed",
};

SpellsList["mighty thrust"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Str") >= 11 && v.skillProfs.indexOf("Athletics") !== -1;
  },
  // Regular spell attributes
  name: "Mighty Thrust",
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "Attack",
  timeFull: "In place of an attack",
  range: "Touch",
  duration: "Instantaneous",
  save: "Str",
  description:
    "One crea makes Str save or knocked back in line by 5 ft times my Str mod (min 5). Distance halved every size larger than you",
  descriptionFull:
    "In place of an attack, you expend an Exploit Die to force onetarget that you touch to make a Strength saving throw. On afailure, it is knocked back in a line number of feet equal to 5times your Strength modifier (minimum 5 feet). This distance is halved for every size category the target is larger than you.",
};

SpellsList["oil bomb"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    // Prerequisites: proficiency with alchemist's supplies
    if (
      /alchemist.*?/i.test(What("Too Text")) &&
      tDoc.getField("Too Prof").isBoxChecked(0)
    ) {
      return tDoc.getField("Too Exp").isBoxChecked(0) ? "markButDisable" : true;
    } else {
      return (
        CurrentProfs.tool["Alchemist's supplies"] ||
        /alchemist.*?/i.test(v.toolProfs.toString())
      );
    }
  },
  prerequisite: "Alchemist's Supplies proficiency",
  // Regular spell attributes
  name: "Oil Bomb",
  classes: ["rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Craft",
  time: "1 a",
  range: "60 ft",
  save: "Dex",
  duration: "1 min",
  description:
    "Craft oil bomb who can be launched; Each crea in 10 ft square make Dex save or prone (see book)",
  descriptionFull: desc([
    "As an action, you can expend one Exploit Die to use a set of alchemist's supplies to craft one Oil Bomb. It retains potency until the end of your next long rest, but you cannot regain this Exploit Die until this Oil Bomb is spent.",
    " With the Use an Object action, a creature can throw this Oil Bomb at a point it can see within 60 feet. It explodes on impact, covering a 10-foot square centered on that point with Alchemical Oil, turning it into difficult terrain. Creatures in that area on impact, and any creature that enters the area must succeed on a Dexterity saving throw or fall prone.",
    " The Oil retains its potency on the ground for 1 minute.",
  ]),
};

SpellsList["parry"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Dex") >= 11;
  },
  prerequisite: "Dexterity of 11",
  // Regular spell attributes
  name: "Parry",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "1 rea",
  timeFull:
    "1 reaction, which you take when someone hits you with a melee attack",
  components: "W*", // W = weapon, adding a * so the user knows it's more specific
  compMaterial: "Finesse or versatile weapon",
  range: "Self",
  duration: "Instantaneous",
  description: "Add Exploit Die to AC against 1 attack;",
  descriptionFull:
    "While you are wielding a finesse or versatile weapon, and a creature you can see hits you with a melee attack, you can use your reaction to expend one Exploit Die, roll it, and add it to your Armor Class against that attack.",
};

SpellsList["precision strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Dex") >= 11;
  },
  prerequisite: "Dexterity of 11",
  // Regular spell attributes
  name: "Precision Strike",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "Attack",
  timeFull: "No action required, as part of a weapon attack",
  range: "Self",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  duration: "Instantaneous",
  description: "Add Exploit Die to attack roll",
  descriptionFull:
    "As part of a weapon attack you can expend one Exploit Die, roll it, and add the result to your attack roll. You can use this Exploit after you roll, but before you know if you hit or miss.",
};

SpellsList["riposte"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Dex") >= 11;
  },
  prerequisite: "Dexterity of 11",
  // Regular spell attributes
  name: "Riposte",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "1 rea",
  timeFull:
    "1 reaction, which you take when someone misses you with a melee attack",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Make a melee weapon attack against it. On hit, add one Exploit Die to damage",
  descriptionFull:
    "When a creature misses you with a melee attack, you use a reaction to expend an Exploit Die to make a melee weaponattack against it. On hit, add your Exploit Die to the damage.",
};

SpellsList["quick quip"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Int") >= 11 || What("Cha") >= 11;
  },
  prerequisite: "Intelligence or Charisma of 11",
  // Regular spell attributes
  name: "Quick Quip",
  classes: ["rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Speech",
  time: "Special",
  range: "10 ft",
  components: "V",
  duration: "Instantaneous",
  description:
    "Creatures of my choice that can hear me forget everything I said in the last 10 seconds (see book)",
  descriptionFull:
    "While speaking, you can expend an Exploit Die to tell a short joke, quip, or another humorous anecdote. Creatures of your choice within 10 feet that can both hear and understand you forget everything you said during the 10 seconds proceeding this Exploit, and instead only remember your quip.\n\nCreatures that are immune to being charmed are immune to this Exploit. Once you use this Exploit on a creature, it is immune to the effects of this Exploit for the next 24 hours.",
};

SpellsList["reliable skill"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  // Regular spell attributes
  name: "Reliable Skill",
  classes: ["rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Check",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Treat a roll of 7 or lower on the d20 as an 8 on proficient skill/tool",
  descriptionFull:
    "Whenever you make an ability check using a skill or tool that you are proficient in and roll a 7 or lower on the d20, you can expend one Exploit Die to treat the d20 roll as an 8.",
};

SpellsList["roguish charm"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Cha") >= 11 && v.skillProfs.indexOf("Persuasion") !== -1;
  },
  prerequisite: "Charisma of 11, Persuasion proficiency",
  // Regular spell attributes
  name: "Roguish Charm",
  classes: ["rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Speech",
  time: "1 a",
  range: "10 ft",
  components: "V",
  duration: "1 h",
  save: "Wis",
  description:
    "One crea save or charmed; adv. on save if me/ally is fighting it (see book)",
  descriptionFull:
    "As an action, you can expend an Exploit Die and force a creature within 10 feet that can hear and understand you to make a Wisdom saving throw, and it does so with advantage if you or your allies are fighting it. On a failure, it is charmed by you for 1 hour, and regards you as a friendly acquaintance for the duration. Though, it will not risk its life for you.\n\nThis effect immediately ends if you or your companions do anything harmful to the creature, and when the effect ends this way, the target realizes that it was deceived by you.\n\nOnce a creature succeeds on its saving throw against this Exploit it is immune to this Exploit for the next 24 hours.",
};

SpellsList["rustic intuition"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Wis") >= 11;
  },
  prerequisite: "Wisdom of 11",
  // Regular spell attributes
  name: "Rustic Intuition",
  classes: [
    "fighter(laserllama)",
    "rogue(laserllama)",
    "barbarian(laserllama)",
    "warlord(laserllama)"
  ],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Check",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Add Exploit Die to an Intelligence (Nature), Wisdom (Animal Handling), or Wisdom (Medicine) check",
  descriptionFull:
    "When you make an Intelligence (Nature), Wisdom (Animal Handling), or Wisdom (Medicine) check you can expend an Exploit Die, roll it, and add the result to your ability check. You can do so after you roll, but before you know the result.",
};

SpellsList["ruthless strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Str") >= 11;
  },
  prerequisite: "Strength of 11",
  // Regular spell attributes
  name: "Ruthless Strike",
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "Hit",
  timeFull:
    "No action required, when you hit a target with a melee weapon attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  range: "Melee",
  duration: "Instantaneous",
  description: "On hit, expend any Exploit Die up to Prof Bonus as bonus dmg",
  descriptionFull:
    "When you hit a target with a melee weapon attack, you can expend Exploit Dice (up to your proficiency bonus), roll the dice, and add them to the damage roll of that attack.",
};

SpellsList["scholarly recall"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Int") >= 11;
  },
  prerequisite: "Intelligence of 11",
  // Regular spell attributes
  name: "Scholarly Recall",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Check",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Add Exploit Die to an Intelligence (Arcana), Intelligence (History), or Intelligence (Religion) check",
  descriptionFull:
    "Whenever you make an Intelligence (Arcana), Intelligence (History), or Intelligence (Religion) check you can expend an Exploit Die, roll it, and add the result to your ability check. You can do so after you roll, but before you know the result.",
};

SpellsList["shield impact"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Str") >= 11;
  },
  // Regular spell attributes
  name: "Shield Impact",
  classes: ["fighter(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "1 rea",
  timeFull:
    "1 reaction, which you take when someone you can see hits you with an attack",
  components: "Shield",
  range: "Self",
  duration: "Instantaneous",
  description: "Reduce dmg taken by Exploit Die (up to my Prof Bonus) + Str",
  descriptionFull:
    "When a creature you can see hits you with an attack, you can use a reaction to expend Exploit Dice (up to your proficiency bonus), roll those dice, and reduce the damage of that attack by an amount equal to the total you rolled + your Strength modifier (minimum of 1). You must be wielding a shield to use this Exploit.",
};

SpellsList["skilled rider"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return v.skillProfs.indexOf("Animal Handling") !== -1;
  },
  // Regular spell attributes
  name: "Skilled Rider",
  classes: ["fighter(laserllama)", "barbarian(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Check",
  range: "Touch",
  components: "A trained mount",
  duration: "Instantaneous",
  description: "Add Exploit Die to any d20 roll my mount makes",
  descriptionFull:
    "When a trained mount you are riding makes an attack roll,damage roll, ability check, or saving throw, you expend an Exploit Die and add it to your mount's roll. You can do so after it rolls, but before you know if it succeeds or fails.",
};

SpellsList["steadfast order"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (order)]",
  // Regular spell attributes
  name: "Steadfast Order",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Order",
  time: "attack",
  timeFull: "No action required, you can forgo an attack",
  range: "30 feet",
  duration: "Instantaneous",
  description:
    "Can forgo an attack to order an ally It can hear/see me within 30 feet to add my Leader mod to its Str/Dex/Con saves until my next turn",
  descriptionFull:
    "When you take the Attack action, you can forgo an attack to issue this Order to another creature that can see or hear you within 30 feet. Until the beginning of your next turn, it can add your Leadership modifier (minimum of +1) to Strength, Dexterity, and Constitution saving throws.",
};

SpellsList["support order"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (order)]",
  // Regular spell attributes
  name: "Support Order",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Order",
  time: "attack",
  timeFull: "No action required, you can forgo an attack",
  range: "30 feet",
  duration: "Instantaneous",
  description:
    "Can forgo an attack to order an ally It can hear/see me within 30 feet to use Help, Hide, Search or Use an Object",
  descriptionFull:
    "When you take the Attack action, you can forgo an attack to issue this Order to another creature that can see or hear you within 30 feet. Until the beginning of your next turn, it can add your Leadership modifier (minimum of +1) to Strength, Dexterity, and Constitution saving throws.",
};

SpellsList["bonebreaking critical"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Str") >= 11;
  },
  // Regular spell attributes
  name: "Bonebreaking Critical",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "Crit",
  timeFull:
    "No action required, when you score a critical hit on a creature with a weapon attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  range: "Weapon",
  save: "Con",
  duration: "1 min",
  description:
    "On crit, the crea does half dmg with weapon attacks that use Str; save at end of each turn to end",
  descriptionFull:
    "When you score a critical hit on a creature with a weapon attack, you can expend one Exploit Die to cripple the target. For 1 minute, that creature deals only half damage with any attacks it makes that use its Strength.\nThe creature can make a Constitution saving throw at the end of each of its turns, ending this effect on a success.",
};

SpellsList["crushing grip"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Str") >= 11 && v.skillProfs.indexOf("Athletics") !== -1;
  },
  prerequisite: "Strength of 11, Athletics proficiency",
  // Regular spell attributes
  name: "Crushing Grip",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "Grap", // Grapple doesn't fit
  timeFull: "No action required, when you grapple a creature",
  range: "Grapple",
  duration: "Grapple",
  description:
    "On grapple, crea takes Exploit Die of bludg damage and again at start of each of its turn",
  descriptionFull:
    "When you grapple a creature, you can expend one Exploit Die to enhance your grip. When you initiate this grapple, and at the start of each of the grappled creature's turns, it takes bludgeoning damage equal to one roll of your Exploit Die.",
};

SpellsList["breathless critical"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Str") >= 11;
  },
  prerequisite: "Strength of 11",
  // Regular spell attributes
  name: "Breathless Critical",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "Crit",
  timeFull:
    "No action required, when you score a critical hit on a creature with a weapon attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  range: "Weapon",
  save: "Con",
  duration: "1 min",
  description:
    "On crit, the crea cannot speak and has speed halved; save at end of each turn to end",
  descriptionFull:
    "When you score a critical hit on a creature with a weapon attack, you can expend one Exploit Die to knock the air from its lungs. The creature cannot speak, and its speed is halved for 1 minute. It can make a Constitution saving throw at the end of each of its turns, ending this effect on a success.",
};

SpellsList["savage rebuke"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  // Regular spell attributes
  name: "Savage Rebuke",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "1 rea",
  timeFull:
    "1 reaction, which you take when someone you can see hits you with a melee attack",
  components: "W", // W = weapon
  compMaterial: "Melee weapon attack",
  range: "Melee",
  duration: "Instantaneous",
  description:
    "When you are hit, make a melee weapon attack against the attacker and add Exploit Die to damage",
  descriptionFull:
    "When a creature you can see hits you with a melee attack, you can use your reaction to expend one Exploit Die to make a melee weapon attack against that creature. On hit, you deal additional damage equal to one roll of your Exploit Die.",
};

SpellsList["trampling rush"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Str") >= 11;
  },
  prerequisite: "Strength of 11",
  // Regular spell attributes
  name: "Trampling Rush",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "Hit",
  timeFull:
    "No action required, when you hit a creature with a melee weapon attack after moving at least 20 ft towards",
  components: "W", // W = weapon
  compMaterial: "Melee weapon attack",
  range: "Melee",
  save: "Str",
  duration: "Instantaneous",
  description:
    "On hit after moving 20 ft toward, crea must make a save or take Exploit Die of damage and fall prone",
  descriptionFull:
    "When you move at least 20 feet toward a creature and hit it with a melee weapon attack, you can expend an Exploit Die and attempt to trample the creature. It must succeed on a Strength saving throw, or it takes additional damage equal to one roll of your Exploit Die and is knocked prone.",
};

SpellsList["smoke bomb"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    // Prerequisites: proficiency with alchemist's supplies
    if (
      /alchemist.*?/i.test(What("Too Text")) &&
      tDoc.getField("Too Prof").isBoxChecked(0)
    ) {
      return tDoc.getField("Too Exp").isBoxChecked(0) ? "markButDisable" : true;
    } else {
      return (
        CurrentProfs.tool["Alchemist's supplies"] ||
        /alchemist.*?/i.test(v.toolProfs.toString())
      );
    }
  },
  prerequisite: "Alchemist's Supplies Proficiency",
  // Regular spell attributes
  name: "Smoke Bomb",
  classes: ["rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Craft",
  time: "1 a",
  range: "60 ft",
  save: "Dex",
  duration: "1 min",
  description:
    "Craft oil bomb who can be launched; 20 ft rad fog that heavily obscures (see book)",
  descriptionFull:
    "As an action, you can expend one Exploit Die and use your alchemist's supplies to craft a Smoke Bomb, which retains its potency until the end of your next long rest. However, you can't regain this Exploit Die until you use the Smoke Bomb\n\nA creature can take the Use an Object action to throw this Smoke Bomb at a point it can see within 60 feet. It explodes on impact, creating a 20-foot-radius sphere of smoke, which spreads around corners, centered on the impact. The smoke heavily obscures the area and lasts for 10 minutes. It can be dispersed by a moderate wind of at least 10 miles per hour.",
};

SpellsList["subtle con"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Dex") >= 11 || What("Cha") >= 11;
  },
  prerequisite: "Dexterity or Charisma of 11",
  // Regular spell attributes
  name: "Subtle Con",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Check",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Add Exploit Die to a Dex (Sleight of Hand), a Cha (Deception), or a Cha (Performance) check",
  descriptionFull:
    "When you make a Dexterity (Sleight of Hand), a Charisma (Deception), or a Charisma (Performance) check you can expend an Exploit Die, roll it, and add it to your ability check. You can do so after you roll, but before you know the result.",
};

SpellsList["sweeping strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  // Regular spell attributes
  name: "Sweeping Strike",
  classes: [
    "fighter(laserllama)",
    "rogue(laserllama)",
    "barbarian(laserllama)",
    "warlord(laserllama)"
  ],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "Hit",
  timeFull:
    "No action required, when you hit a creature with a melee weapon attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  range: "Melee",
  save: "Dex",
  duration: "Instantaneous",
  description:
    "On hit, force target to make a Str/Dex (its choice) saving throw or take Exploit Die bonus dmg and fall prone",
  descriptionFull:
    "If you hit a creature with a melee weapon attack, you expendan Exploit Die and force it to make its choice of a Strength or Dexterity saving throw. On a failure, add your Exploit Die to the damage roll and the creature is knocked prone.",
};

SpellsList["warding strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  // Regular spell attributes
  name: "Warding Strike",
  classes: ["fighter(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "1 rea",
  timeFull:
    "1 reaction, which you take when someone moves within the reach of a melee weapon you are wielding",
  range: "Melee",
  duration: "Instantaneous",
  description:
    "When a crea moves within my melee reach; Use my reaction for melee attack; Add exploit die to dmg",
  descriptionFull:
    "When a creature moves within the reach of a melee weapon you are wielding, you can use a reaction to expend an Exploit Die and make a single attack against it with that weapon. On hit, you add one roll of your Exploit Die to your damage roll.",
};

// From the expanded classes
SpellsList["destructive strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Str") >= 11;
  },
  // Regular spell attributes
  name: "Destructive Strike",
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "Hit",
  timeFull:
    "No action required, when you hit a nonmagical object with an attack",
  range: "Attack",
  duration: "Instantaneous",
  description:
    "On hit on a non-magical item, treat attack dmg as maximum dmg and add roll of Exploit Die to dmg",
  descriptionFull:
    "When you hit a non-magical object with an attack, you can expend an Exploit Die, add it to the damage roll, and cause that attack to deal maximum damage in place of rolling.",
};

SpellsList["eloquent speech"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Int") >= 11;
  },
  prerequisite: "Intelligence of 11",
  addMod: [
    {
      type: "skill",
      field: "Persuasion",
      mod: "max(Int-Cha|0)",
      text: "I can replace Charisma (Persuasion) checks with Intelligence (Persuasion)",
    },
    {
      type: "skill",
      field: "Deception",
      mod: "max(Int-Cha|0)",
      text: "I can replace Charisma (Deception) checks with Intelligence (Deception)",
    },
  ],
  // Regular spell attributes
  name: "Eloquent Speech",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Check",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Add Exploit Die to Pers and Decep checks; Can make Int (Deception) & Int (Persuasion) checks (passive)",
  descriptionFull:
    "Whenever you would normally make a Charisma (Deception) or Charisma (Persuasion) check, you can choose to use your Intelligence in place of Charisma for that ability check.\n\nAlso, whenever you make an Intelligence (Deception) or Intelligence (Persuasion) check you can expend one Exploit Die, roll it, and add the result to your check. You can do so after you roll the d20, but before you know if you succeed.",
};

SpellsList["mechanical insight"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Int") >= 11;
  },
  // Regular spell attributes
  name: "Mechanical Insight",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Check",
  components: "M",
  compMaterial: "Thieves' tools or tinker's tools",
  range: "Self",
  duration: "Instantaneous",
  description: "Add Exploit Die to a thieves' tools or tinker's tools check",
  descriptionFull:
    "Whenever you make an ability check with a set of thieves' tools or tinker's tools you can expend one Exploit Die, roll it, and add the result to your ability check. You can do so after you roll the d20, but before you know if you succeed or fail.",
};

SpellsList["modify device"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    // Prerequisites: proficiency with tinker's or thieves' tools
    if (
      /tinker.?s.*tools/i.test(What("Too Text")) &&
      tDoc.getField("Too Prof").isBoxChecked(0)
    ) {
      return tDoc.getField("Too Exp").isBoxChecked(0) ? "markButDisable" : true;
    } else if (
      CurrentProfs.tool["tinker's tools"] ||
      /tinker.?s.{1,3}tools/i.test(v.toolProfs.toString())
    ) {
      return true;
    }

    if (
      /thieve.?s.*tools/i.test(What("Too Text")) &&
      tDoc.getField("Too Prof").isBoxChecked(0)
    ) {
      return tDoc.getField("Too Exp").isBoxChecked(0) ? "markButDisable" : true;
    } else {
      return (
        CurrentProfs.tool["thieves' tools"] ||
        /thieve.?s.{1,3}tools/i.test(v.toolProfs.toString())
      );
    }
  },
  prerequisite: "Tinker's or Thieves' tools proficiency",
  // Regular spell attributes
  name: "Modify Device",
  classes: ["rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "1 min",
  components: "M",
  compMaterial: "Thieves' tools or tinker's tools",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Modify DC of deactivated or unlocked trap to my Exploit DC or increase it by 5 ",
  descriptionFull: desc([
    "You can expend one Exploit Die and spend 1 minute using either tinker's or thieves' tools to adjust one trap or lock you touch. The DC of that trap or lock either increases by 5, or changes to equal your Exploit save DC (your choice).",
    "To use this Exploit, the trap or lock must be deactivated or unlocked, and you must have access to its inner mechanisms. You cannot use this Exploit to modify a trap or lock that can't be reset, or one that has been destroyed beyond repair.",
  ]),
};

SpellsList["reposition"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  // Regular spell attributes
  name: "Reposition",
  classes: ["fighter(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "1 bns",
  range: "5 ft",
  duration: "Instantaneous",
  description:
    "Switch place with a conscious and willing creature, either me or target gains Exploit Die of temp HP",
  descriptionFull:
    "As a bonus action, you can expend one Exploit Die to switch places with a conscious and willing creature within 5 feet of you. This movement does not provoke opportunity attacks. Either you or the creature you switched places with gains temporary hit points equal to one roll of your Exploit Die.",
};

SpellsList["lunge"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  // Regular spell attributes
  name: "Lunge",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "Attack",
  timeFull: "No action required, as part of a weapon attack",
  range: "Melee",
  components: "W", // W = weapon
  compMaterial: "Melee weapon attack",
  duration: "Instantaneous",
  description:
    "Move 10 feet before attack even if exceed remaining speed; Add Exploit Die to dmg",
  descriptionFull:
    "When you make an attack on your turn, you can expend anExploit Die to move up to 10 feet immediately before making that attack, even if this would exceed your remaining speed. On hit, add your Exploit Die to the damage roll.",
};

SpellsList["streetwise"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (checks)]",
  prereqeval: function (v) {
    return What("Cha") >= 11;
  },
  addMod: [
    {
      type: "skill",
      field: "History",
      mod: "max(Cha-Int|0)",
      text: "I can replace Intelligence (History) checks with Charisma (History)",
    },
    {
      type: "skill",
      field: "Investigation",
      mod: "max(Cha-Int|0)",
      text: "I can replace Intelligence (Investigation) checks with Charisma (Investigation)",
    },
  ],
  // Regular spell attributes
  name: "Streetwise",
  classes: ["fighter(laserllama)", "rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Skill",
  time: "Check",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Add Exploit Die to Hist and Invest checks; Can make Cha (History) & Cha (Investigation) checks (passive)",
  descriptionFull:
    "If you are in a settlement, you can make Charisma (History) and Charisma (Investigation) checks instead of the normal Intelligence (History) or Intelligence (Investigation) checks.\n\nAlso, when you make a Charisma (History) or a Charisma (Investigation) check you can expend one Exploit Die, roll it, and add the result to your ability check. You can do so after you roll the d20, but before you know if you succeed or fail.",
};

SpellsList["take down"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Str") >= 11;
  },
  // Regular spell attributes
  name: "Take Down",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "1 bns",
  range: "Touch",
  duration: "Instantaneous",
  description:
    "Attempt to shove or grapple a creature and add Exploit Die to the Strength (Athletics) check",
  descriptionFull:
    "As a bonus action, you can expend one Exploit Die to touch a creature and attempt to Shove or Grapple it, and add one roll of your Exploit Die to your Strength (Athletics) check.",
};

SpellsList["taunting strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[1st-degree exploits (combat)]",
  prereqeval: function (v) {
    return What("Cha") >= 11;
  },
  prerequisite: "Charisma of 11",
  // Regular spell attributes
  name: "Taunting Strike",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "Hit",
  timeFull:
    "No action required, when you hit a creature within 15 feet that can see or her you",
  range: "15 feet",
  duration: "Instantaneous",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  description:
    "I can expend an Exploit Die to taunt the crea I hit until start of my next turn",
  descriptionFull:
    "When you hit a creature within 15 feet that can see or hear you with a weapon attack, you can expend one Exploit Die totaunt it. Until the start of your next turn, it has disadvantageon all attacks against targets other than you.",
};

// 2nd degree Exploits
SpellsList["alchemical oil"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    // Prerequisites: proficiency with alchemist's supplies
    if (
      /alchemist.*?/i.test(What("Too Text")) &&
      tDoc.getField("Too Prof").isBoxChecked(0)
    ) {
      return tDoc.getField("Too Exp").isBoxChecked(0) ? "markButDisable" : true;
    } else {
      return (
        CurrentProfs.tool["Alchemist's supplies"] ||
        /alchemist.*?/i.test(v.toolProfs.toString())
      );
    }
  },
  prerequisite: "Alchemist's Supplies Proficiency",
  // Regular spell attributes
  name: "Alchemical Oil",
  classes: ["rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Craft",
  time: "1 a",
  range: "Self",
  duration: "10 min (D)",
  description:
    "Craft alchemical oil who changes a weapon's dmg type to acid, cold, fire, or lightning (my choice)",
  descriptionFull:
    "As an action, you can expend one Exploit Die and use your alchemist's supplies to craft a vial of Alchemical Oil, which retains its potency until the end of your next long rest. Upon creation, you choose either acid, cold, fire, or lightning as the damage type for that vial of oil. You cannot regain the Exploit Die spent on this oil until you expend this Alchemical Oil.\n\nA creature can take the Use an Object action to expend the vial and apply its contents to one weapon it is holding. For the next 10 minutes, that weapon deals the damage type chosen for that Alchemical Oil in place of its normal damage.",
};

SpellsList["blinding debris"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Dex") >= 13;
  },
  prerequisite: "Dexterity of 13",
  // Regular spell attributes
  name: "Blinding Debris",
  classes: ["fighter(laserllama)", "rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Combat",
  time: "1 bns",
  range: "10 ft",
  save: "Con",
  duration: "Until removed",
  description: "One crea Con saving throw or blinded until it clears its eyes",
  descriptionFull:
    "As a bonus action, you expend one Exploit Die to force one creature within 10 feet to make a Constitution saving throw. On a failed save, the creature is Blinded until it uses its action to clear the debris from its eyes.",
};

SpellsList["concussive blow"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 13;
  },
  // Regular spell attributes
  name: "Concussive Blow",
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Combat",
  time: "Hit",
  timeFull: "No action required, on hit with a melee weapon attack",
  range: "Melee",
  components: "W", // W = weapon
  compMaterial: "Melee weapon attack",
  save: "Con",
  duration: "1 rnd",
  description:
    "On fail, 0 speed, can't speak, disadv. on attacks, skills and dex saving throws and attacks have adv.",
  descriptionFull:
    "When you hit a creature with a melee weapon attack, you can expend an Exploit Die to empower your attack and force it to make a Constitution saving throw. On a failed save, the target suffers the effects below until the beginning of your next turn:" +
    "\n\u2022 Its speed becomes 0, and it can't speak.'" +
    "\n\u2022 It has disadvantage on Dexterity saving throws." +
    "\n\u2022 Attack rolls against it have advantage.",
};

SpellsList["craft minor poison"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    // Prerequisites: proficiency with poisoner's kit
    if (
      /poisoner.*?/i.test(What("Too Text")) &&
      tDoc.getField("Too Prof").isBoxChecked(0)
    ) {
      return tDoc.getField("Too Exp").isBoxChecked(0) ? "markButDisable" : true;
    } else {
      return (
        CurrentProfs.tool["Poisoner's kit"] ||
        /poisoner.*?/i.test(v.toolProfs.toString())
      );
    }
  },
  prerequisite: "Poisoner's Kit Proficiency",
  // Regular spell attributes
  name: "Craft Minor Poison",
  classes: ["rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Craft",
  time: "1 a",
  range: "Self",
  save: "Con",
  duration: "1 min",
  description:
    "Craft poison who forces one crea to make Con save or poisoned for 1 min; extra save each turn",
  descriptionFull:
    "As an action, you can expend one Exploit Die and use your poisoner's kit to craft one vial of Minor Poison, which retains its potency until the end of your next long rest. However, you cannot regain this Exploit Die until you expend this poison.\n\nA creature can take the Use an Object action to expend the vial and apply it to one weapon or a piece of ammunition it is holding. On its next hit, the weapon deals poison damage in place of its normal damage, and the target must succeed on a Constitution saving throw or it is poisoned for 1 minute.\n\nThe poisoned creature can repeat this saving throw at the end of each of its turns, ending the effect on a success.",
};

SpellsList["crescendo of violence"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  // Regular spell attributes
  name: "Crescendo of Violence",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 1,
  school: "Combat",
  time: "1 rea",
  timeFull: "When another creature that can see or hear you score a critical hit",
  range: "30 feet",
  duration: "1 minute",
  description:
    "Can expend Expl Die (up to Prof) to give the attacker temp HP",
  descriptionFull:
    "When another creature within 30 feet that can see or hearyou scores a critical hit, you can use your reaction to spendExploit Dice (up to your Proficiency Bonus), and grant thatcreature temporary hit points equal to the Exploit Dice youspent + your Leadership modifier." +
    " \nTemporary hit points from this Exploit last for 1 minute.",
};

SpellsList["crippling strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  // Regular spell attributes
  name: "Crippling Strike",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  level: 2,
  school: "Combat",
  time: "Hit",
  timeFull: "No action required, on hit with a weapon attack",
  range: "Attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  duration: "1 rnd",
  save: "Con",
  description:
    "On hit, one crea save or Exploit Die of bonus dmg and blinded or deafened or can't speak (my choice)",
  descriptionFull:
    "When you hit a target with a weapon attack, you can expend an Exploit Die to attack one of its senses, forcing it to make a Constitution saving throw. On a failure, add your Exploit Die to the damage roll, and it is Blinded, Deafened, or can't speak (your choice) until the beginning of your next turn.",
};

SpellsList["defensive stance"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  // Regular spell attributes
  prereqeval: function (v) {
    return What("Con") >= 13;
  },
  prerequisite: "Strength of 13",
  name: "Defensive Stance",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)"],
  level: 2,
  school: "Combat",
  time: "1 bns",
  range: "Self",
  duration: "Until move or incapacitated",
  description: "Add Exploit Die to my AC",
  descriptionFull:
    "As a bonus action, you can expend one Exploit Die to enter adefensive stance and add an Exploit Die to your Armor Class." +
    "\nThis stance, and the bonus to your Armor Class, lasts untilyou move from your space or you are incapacitated.",
};

SpellsList["dirty hit"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Dex") >= 13;
  },
  prerequisite: "Dexterity of 13",
  // Regular spell attributes
  name: "Dirty Hit",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "rogue(laserllama)"],
  level: 2,
  school: "Combat",
  time: "Hit",
  timeFull: "No action required, on hit with a melee weapon attack",
  range: "Melee",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  duration: "1 rnd",
  save: "Con",
  description:
    "On hit, one crea save or Exploit Die of bonus dmg and prone and can't take reactions",
  descriptionFull:
    "When you hit a creature with a melee weapon attack, you can expend an Exploit Die to strike at a vulnerable area. It must succeed on a Constitution saving throw or it takes additional damage equal to a roll of your Exploit Die, falls prone, and it cannot take reactions until the start of your next turn.",
};

SpellsList["enlivening order"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits (order)]",
  // Regular spell attributes
  name: "Enlivening Order",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Order",
  time: "attack",
  timeFull: "No action required, you can forgo an attack",
  range: "30 feet",
  duration: "1 rnd",
  description:
    "Boost target abilities for the duration (see book)",
  descriptionFull:
    "When you take the Attack action, you can forgo an attack to issue this Order to a creature that can see or hear you within 30 feet. Until the start of your next turn, that creature's speed increases by 5 times your Leadership modifier (a minimum of 5 feet), the distance it can long and high jump doubles, and it has advantage on all Acrobatics and Athletics checks.",
};

SpellsList["flash bomb"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    // Prerequisites: proficiency with alchemist's supplies
    if (
      /alchemist.*?/i.test(What("Too Text")) &&
      tDoc.getField("Too Prof").isBoxChecked(0)
    ) {
      return tDoc.getField("Too Exp").isBoxChecked(0) ? "markButDisable" : true;
    } else {
      return (
        CurrentProfs.tool["Alchemist's supplies"] ||
        /alchemist.*?/i.test(v.toolProfs.toString())
      );
    }
  },
  prerequisite: "Alchemist's tools proficiency",
  // Regular spell attributes
  name: "Flash Bomb",
  classes: ["rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Craft",
  time: "1 a",
  range: "60 ft",
  save: "Dex",
  duration: "1 min",
  description:
    "Craft flash bomb who can be launched; Each crea in 20 ft square make Con save or blinded (see book)",
  descriptionFull:
    "As an action, you can expend one Exploit Die and use your alchemist's supplies to craft a Flash Bomb, which retains its potency until the end of your next long rest. However, you can't regain this Exploit Die until you use the Flash Bomb.\n\nA creature can take the Use an Object action to throw this Flash Bomb at a point it can see within 60 feet. It explodes on impact, and any creature within 20 feet of the impact that can see must succeed on a Constitution saving throw or be blinded for 1 minute. A creature with the sunlight sensitivity trait makes its initial saving throw with disadvantage.\n\nA blinded creature can repeat this saving throw at the end of each of its turns, ending the effect on a success.",
};

SpellsList["heroic will"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  // Regular spell attributes
  name: "Heroic Will",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "warlord(laserllama)"],
  level: 2,
  school: "Skill",
  time: "Save",
  range: "Self",
  duration: "Instantaneous",
  description: "Add Exploit Die to an Int, Wis or Cha saving throw",
  descriptionFull:
    "Whenever you are forced to make an Intelligence, Wisdom, or Charisma saving throw you can expend an Exploit Die, roll it, and add the result to your saving throw. You can do so after you roll the d20, but before you know if you succeed or fail.",
};

SpellsList["honor duel"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Cha") >= 13;
  },
  prerequisite: "Charisma of 13",
  // Regular spell attributes
  name: "Honor Duel",
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Combat",
  time: "1 bns",
  range: "15 ft",
  components: "V",
  duration: "1 min",
  save: "Wis",
  description:
    "One crea save or dis. on attacks vs. not-me; Extra save each turn; Ends if I attack of force a save someone else",
  descriptionFull:
    "As a bonus action, you shout a challenge at one creature that can hear and understand you within 15 ft., forcing it to make a Wisdom saving throw. On a failure, it has disadvantage on attacks against targets other than you for 1 minute, or until you attack or force another creature to make a saving throw. The creature repeats this Wisdom saving throw at the end of each of its turns, ending this effect on a success.",
};

SpellsList["insightful order"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits (order)]",
  prereqeval: function (v) {
    return What("Int") >= 13;
  },
  prerequisite: "Intelligence of 13",
  // Regular spell attributes
  name: "Insightful Order",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Order",
  time: "attack",
  timeFull: "No action required, you can forgo an attack",
  range: "30 feet",
  duration: "1 rnd",
  description:
    "Can forgo an attack to give an ally within 30 feet my Lead mod as bonus to the first attack",
  descriptionFull:
    "When you take the Attack action, you can forgo an attack toissue this Order to another creature that can see or hear youwithin 30 feet. The target adds your Leadership modifier tothe first attack roll it makes before the start of your next turn.",
};

SpellsList["martial focus"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  // Regular spell attributes
  name: "Martial Focus",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  level: 2,
  school: "Combat",
  time: "Attack",
  timeFull: "No action required, as part of a weapon attack",
  range: "Attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  duration: "Instantaneous",
  description: "As part of the attack, grant myself advantage",
  descriptionFull:
    "As part of a weapon attack you can expend an Exploit Die to grant yourself advantage on your attack roll. You can use this Exploit after you roll, but before you know if you hit or miss.",
};

SpellsList["menacing shout"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Con") >= 13 || What("Cha") >= 13;
  },
  prerequisite: "Constitution or Charisma of 13",
  // Regular spell attributes
  name: "Menacing Shout",
  classes: ["fighter(laserllama)", "barbarian(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Combat",
  time: "1 bns",
  range: "30 ft",
  components: "V",
  duration: "1 rnd",
  save: "Wis",
  description:
    "One crea save or frightened of me and must use their action to move away (without harming itself)",
  descriptionFull:
    "As a bonus action, you can expend one Exploit Die and force one creature within 30 feet that can see or hear you to make a Wisdom saving throw. On a failed save, it is frightened of you until the end of your next turnor until you ar incapacitated.",
};

SpellsList["redirect"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  // Regular spell attributes
  name: "Redirect",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  level: 2,
  school: "Combat",
  time: "1 rea",
  timeFull:
    "1 reaction, which you take when a creature you can see misses you with a melee attack",
  range: "Melee",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  duration: "Instantaneous",
  description:
    "Redirect melee attack to another target of my choice within range, adding Exploit Die to attack roll",
  descriptionFull:
    "When a creature you can see misses you with a melee attack, you can use your reaction to expend an Exploit Die and force it to attack another creature of your choice within range of its attack, adding one roll of your Exploit Die to its attack roll.",
};

SpellsList["rejuvenating order"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits (order)]",
  // Regular spell attributes
  name: "Rejuvenating Order",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Order",
  time: "attack",
  timeFull: "No action required, you can forgo an attack",
  range: "30 feet",
  duration: "Instantaneous",
  description:
    "Can forgo an attack to make an ally reroll a save against one condition",
  descriptionFull:
    "When you take the Attack action, you can forgo an attack to issue this Order to a creature that can see or hear you within 30 feet. That creature can instantly repeat one saving throw to end one condition currently affecting it.",
};

SpellsList["rending strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 13;
  },
  prerequisite: "Strength of 13",
  // Regular spell attributes
  name: "Rending Strike",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  level: 2,
  school: "Combat",
  time: "Hit",
  timeFull: "No action required, on hit with a melee weapon attack",
  range: "Melee",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  duration: "Until repaired",
  save: "Dex",
  description:
    "On hit, Dex saving throw or -1 to AC and Exploit Die of bonus dmg. Cumulative",
  descriptionFull:
    "When you hit a target with a melee weapon attack, you can expend one Exploit Die to target its defenses and force it to make a Dexterity saving throw. On a failure, add your Exploit Die to your damage roll, and its Armor Class is reduced by 1 until the damage is repaired. This effect is cumulative.",
};

SpellsList["resilient order"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits (order)]",
  // Regular spell attributes
  name: "Rejuvenating Order",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Order",
  time: "attack",
  timeFull: "No action required, you can forgo an attack",
  range: "30 feet",
  duration: "1 rnd",
  description:
    "Can forgo an attack to give an ally reroll a bonus to Int, Wis and Cha saves for the duration",
  descriptionFull:
    "When you take the Attack action, you can forgo an attack to issue this Order to a creature that can see or hear you within 30 feet. Until the beginning of your next turn, it can add your Leadership modifier (minimum of +1) to Wisdom, Charisma, and Intelligence saving throws.",
};

SpellsList["surprise attack"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits (order)]",
  prereqeval: function (v) {
    return What("Int") >= 13;
  },
  prerequisite: "Intelligence of 13",
  // Regular spell attributes
  name: "Surprise Attack",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Order",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  duration: "Instantaneous",
  description:
    "Issue an order to a crea to attack with advan. and on hit deals Expl Die bonus dmg",
  descriptionFull:
    "As an action, you can expend one Exploit Die to command another creature that can see or hear you within 30 feet to immediately make a single weapon attack with advantage." +
    "\n On hit, it deals bonus damage equal to your Exploit Die.",
};

SpellsList["volley"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Dex") >= 13;
  },
  prerequisite: "Dexterity of 13",
  // Regular spell attributes
  name: "Volley",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)"],
  level: 2,
  school: "Combat",
  time: "1 a",
  range: "Attack",
  components: "W", // W = weapon
  compMaterial: "Ranged weapon",
  duration: "Instantaneous",
  description:
    "All crea of my choice within 5 ft of chosen point save or take weapon dmg (half on success)",
  descriptionFull:
    "As an action, you can expend one Exploit Die to fire a volley of ammunition at a point you can see within normal range ofyour weapon, forcing creatures of your choice within 5 feet ofthat point to make a Dexterity saving throw. Creatures takedamage as if they were hit by your weapon on a failure, andhalf as much damage on a success.",
};

SpellsList["whirlwind strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 13 || What("Dex") >= 13;
  },
  prerequisite: "Strength or Dexterity of 13",
  // Regular spell attributes
  name: "Whirlwind Strike",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  level: 2,
  school: "Combat",
  time: "Attack",
  range: "Melee",
  components: "W", // W = weapon
  compMaterial: "Melee weapon",
  duration: "Instantaneous",
  description:
    "Targets of your choice within reach of melee weapon must Dex save or take weapon dmg (half on success)",
  descriptionFull:
    "In place of an attack, you expend one Exploit Die to force targets of your choice within your reach to make a Dexterity saving throw. Targets take the damage as if they were hit by your weapon on a failure, and half damage on a success.",
};

SpellsList["wild charge"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits (order)]",
  // Regular spell attributes
  name: "Wild Charge",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Order",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  duration: "Instantaneous",
  save: "Str",
  description:
    "Issue an order to a crea to charge and attack another creature",
  descriptionFull:
    "As an action, you can expend one Exploit Die and choose another creature that can see or hear you within 30 feet. It can immediately move up to its speed toward a hostile creature and make one melee weapon attack against it." +
    "\n On hit, it deals additional damage equal to your Exploit Die, and if the target is equal to its size or smaller, it must succeed on a Strength saving throw or fall prone.",
};

// From the expanded classes
SpellsList["exposing strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  // Regular spell attributes
  name: "Exposing Strike",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  level: 2,
  school: "Combat",
  time: "Hit",
  timeFull: "No action required, on hit with a weapon attack",
  range: "Attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  duration: "1 rnd",
  description:
    "On hit, the next attack against that crea before my turn has adv and adds Exploit Die to dmg",
  descriptionFull:
    "When you hit a creature with a weapon attack, you can expend an Exploit Die to temporarily weaken it. The first attack made against that creature before the start of your next turn has advantage, and on hit, that attack deals additional damage equal to one roll of your Exploit Die.",
};

SpellsList["glancing blow"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  // Regular spell attributes
  name: "Glancing Blow",
  source: ["GMB:LL", 0],
  classes: [
    "fighter(laserllama)",
    "rogue(laserllama)",
    "barbarian(laserllama)",
    "warlord(laserllama)"
  ],
  level: 2,
  school: "Combat",
  time: "Miss",
  timeFull: "No action required, on miss with a melee weapon attack",
  range: "Melee",
  components: "W", // W = weapon
  compMaterial: "Melee weapon attack",
  duration: "Instantaneous",
  description:
    "On miss, repeat my attack against another target within reach of my weapon",
  descriptionFull:
    "When you make a melee weapon attack and miss, you can expend an Exploit Die to immediately repeat your attack against another target within the reach of your weapon.",
};

SpellsList["grasp of night"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Wis") >= 13;
  },
  prerequisite: "Wisdom of 13",
  // Regular spell attributes
  name: "Grasp of Night",
  source: ["GMB:LL", 0],
  classes: ["rogue(laserllama)"],
  level: 2,
  school: "Combat",
  time: "Attack",
  timeFull: "In place of an attack",
  range: "Touch",
  duration: "10 min",
  description:
    "Roll (3*ED) * ED spent (up to my PB) + Wis mod; If crea has less hp than total, it falls asleep",
  descriptionFull:
    "In place of an attack, you can expend Exploit Dice (up to your proficiency bonus) to touch a creature, attempting to knock it out. For each Exploit Die that you spent you roll three Exploit Dice, adding your Wisdom modifier to the total of all the dice. If the total meets or exceeds the creature's remaining hit points, it instantly falls asleep, and is unconscious for 10 minutes. The creature instantly wakes up if it takes damage or another creature uses an action on its turn to shake or slap the sleeping creature awake.",
};

SpellsList["hold the line"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 13 || What("Con") >= 13;
  },
  prerequisite: "Strength of Constitution of 13",
  // Regular spell attributes
  name: "Hold the Line",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "warlord(laserllama)"],
  level: 2,
  school: "Combat",
  time: "1 bns",
  range: "S:10ft rad",
  duration: "Until move",
  description:
    "Me and all allied creatures with a weapon/shield within range gain half cover (see book)",
  descriptionFull:
    "As a bonus action, you can expend an Exploit Die to form your allies into a defensive position. You and allied creatures within 10 feet that are wielding a weapon or shield gain the benefits of half cover, which also apply to ability checks and saving throws made to avoid being moved against your will.\n\nThe benefits of this Exploit instantly end if you leave your space, and they have no effect on incapacitated creatures.",
};

SpellsList["immovable stance"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 13 || What("Con") >= 13;
  },
  prerequisite: "Strength of Constitution of 13",
  // Regular spell attributes
  name: "Immovable Stance",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  level: 2,
  school: "Combat",
  time: "1 bns",
  range: "Self",
  duration: "Until move",
  save: "Str",
  description:
    "Each time a crea tries to grapple, move me or move in my space, Str saving throw or is grappled/prone",
  descriptionFull:
    "As a bonus action, you can expend an Exploit Die to enter an immovable stance that lasts until you move from the space. Each time a creature attempts to grapple, move you against your will, or move through your space while you are in this stance it must first succeed on a Strength saving throw. On a failed save, you can instantly grapple it or knock it prone.",
};

SpellsList["improvised skill"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  // Regular spell attributes
  name: "Improvised Skill",
  classes: ["rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Skill",
  time: "Check",
  range: "Self",
  duration: "Instantaneous",
  description: "Add Exploit Die to a non proficient check",
  descriptionFull:
    "When you make an ability check that doesn't include your proficiency bonus, you can expend an Exploit Die and add it to your roll. You can use this Exploit after you roll, but before you know if you succeed or fail.",
};

SpellsList["intimidating command"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Cha") >= 13;
  },
  prerequisite: "Charisma of 13",
  // Regular spell attributes
  name: "Intimidating Command",
  classes: ["fighter(laserllama)", "barbarian(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Combat",
  time: "1 bns",
  range: "30 ft",
  components: "V",
  duration: "1 rnd",
  save: "Wis",
  description:
    "1 crea save or follow one word command (cannot be directly harmful), e.g. approach, drop, flee, halt",
  descriptionFull:
    "As a bonus action, you can expend an Exploit Die to shout a one-word command at one creature that can hear you within 30 feet. It must succeed on a Wisdom saving throw, or it is compelled to obey your command to the best of its ability on its next turn unless its actions would be directly harmful to it",
};

SpellsList["ringing strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 13;
  },
  prerequisite: "Strength of 13",
  // Regular spell attributes
  name: "Ringing Strike",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  level: 2,
  school: "Combat",
  time: "Hit",
  range: "Melee",
  duration: "1 min",
  save: "Wis",
  description:
    "On hit, one crea save or -1d4 penalty to all d20 rolls it makes; extra save end of each turn",
  descriptionFull:
    "When you hit a creature with a melee weapon attack, you canexpend an Exploit Die and force it to make a Wisdom savingthrow. On a failure, it must subtract 1d4 from all attack rolls,ability checks, and saving throws the next minute.\n The creature can repeat this Wisdom saving throw at theend of each of its turns, ending this effect on a success.",
};

SpellsList["shattering slam"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 13;
  },
  prerequisite: "Strength of 13",
  // Regular spell attributes
  name: "Shattering Slam",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  level: 2,
  school: "Combat",
  time: "Attack",
  range: "S:5ft rad",
  components: "W", // W = weapon
  compMaterial: "Melee weapon attack",
  duration: "Instantaneous",
  save: "Dex",
  description:
    "All crea within range Dex save or fall prone and take Exploit Dice spent + Str dmg (half on save); diff. terrain",
  descriptionFull:
    "In place of an attack, you can spend Exploit Dice (up to your Proficiency Bonus) and strike the ground, forcing all targets within 5 feet to make a Strength saving throw. On a failure, targets take bludgeoning damage equal to the Exploit Dicespent + your Strength modifier and fall prone. On a success, they take half as much damage and do not fall prone.\n Terrain in this area that is loose earth or stone becomes difficult terrain until a creature uses its action to clear it.",
};

SpellsList["soothing speech"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return v.skillProfs.indexOf("Persuasion") !== -1;
  },
  prerequisite: "Persuasion proficiency",
  // Regular spell attributes
  name: "Soothing Speech",
  classes: ["rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Speech",
  time: "1 a",
  range: "20 ft",
  save: "Cha",
  components: "V",
  duration: "10 min",
  description:
    "Crea of my choice make Cha save or stop being hostile to crea of my choice for the duration",
  descriptionFull:
    "As an action, you can expend an Exploit Die and speak to all creatures that can hear and understand you within 20 feet, and force them to make a Charisma saving throw. On a failed save, creatures become indifferent toward creatures of your choice that they are currently hostile toward for 10 minutes.\n\nThis indifference ends if a creature takes damage, is forced to make a saving throw, or it witnesses an ally being harmed. When the effect ends, the creature becomes hostile again.",
};

SpellsList["survey dungeon"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Dex") >= 13 || What("Int") >= 13;
  },
  prerequisite: "Dexterity or Intelligence of 13",
  // Regular spell attributes
  name: "Survey Dungeon",
  classes: ["rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Skill",
  time: "10 min",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Learn three of: one trap, one active spell, one secret compartment, door or passageway (see book)",
  descriptionFull:
    "You can expend an Exploit Die to spend 10 minutes carefully examining a room you currently occupy. At the end of the 10 minutes, you gain knowledge about one of the following:\n" +
    "\n\u2022 One trap in the area. This includes any mechanical or natural effect that was intended to harm an intruder." +
    "\n\u2022 One active spell in the area that was cast at a level equal to your Intelligence modifier or lower." +
    "\n\u2022 One secret compartment, door, or passageway." +
    "\n\nOnce you use this Exploit to survey a room you must finish a long rest before you can use it in that location again.",
};

SpellsList["thunderous blow"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 13;
  },
  prerequisite: "Strength of 13",
  // Regular spell attributes
  name: "Thunderous Blow",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  level: 2,
  school: "Combat",
  time: "Attack",
  range: "Melee",
  time: "Hit",
  timeFull: "No action required, on hit with a melee weapon attack",
  components: "W", // W = weapon
  compMaterial: "Melee weapon attack",
  duration: "Instantaneous",
  save: "Dex",
  description:
    "On hit, one crea save (larger crea have adv.) or Expl Die of extra dmg and pushed 5 ft times my Str mod",
  descriptionFull:
    "When you hit a creature with a melee weapon attack, you can expend an Exploit Die to empower your attack with immense force. The creature must succeed on a Strength saving throw or take additional damage equal to a roll of your Exploit Die and be knocked back in a straight line number of feet equal to 5 times your Strength modifier. Creatures more than one size larger than you have advantage on their saving throw.",
};

SpellsList["trick shot"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Dex") >= 13 || What("Int") >= 13;
  },
  prerequisite: "Dexterity or Intelligence of 13",
  // Regular spell attributes
  name: "Trick Shot",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "rogue(laserllama)"],
  level: 2,
  school: "Combat",
  time: "Attack",
  range: "Melee",
  time: "1 bns",
  components: "W*", // W = weapon
  compMaterial: "Ranged weapon that has both the finesse and thrown properties",
  duration: "Instantaneous",
  description:
    "Attack that ignores cover if it can ricochet; Ignore disadv; Add Exploit Die to dmg",
  descriptionFull:
    "As a bonus action, you can expend an Exploit Die to make a special ranged weapon attack with a weapon that has both the finesse and thrown properties.\n\nThis attack ignores the benefits of cover, so long as it can ricochet off one surface and hit a target in range. If this attack would normally have disadvantage, it does not, and on hit, it deals additional damage equal to one roll of your Exploit Die.",
};

SpellsList["zephyr slash"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 13 || What("Dex") >= 13;
  },
  prerequisite: "Strength or Dexterity of 13",
  // Regular spell attributes
  name: "Zephyr Slash",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)"],
  level: 2,
  school: "Combat",
  time: "1 a",
  range: "S:30ft line",
  components: "W", // W = weapon
  compMaterial: "Melee weapon",
  duration: "Instantaneous",
  description:
    "Move up to 30 ft, all crea I go through Dex save or take 2 Exploit Die + Str/Dex dmg",
  descriptionFull:
    "As an action, you can expend an Exploit Die and flourish your melee weapon instantly move up to 30 feet in a straight line, without provoking attacks of opportunity. Any creatures that you pass through must succeed on a Dexterity saving throw or take damage equal to two rolls of your Exploit Die + either your Strength or Dexterity modifier.",
};

SpellsList["arresting critical"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 13;
  },
  prerequisite: "Strenght of 13",
  // Regular spell attributes
  name: "Arresting Critical",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Combat",
  time: "Crit",
  timeFull:
    "No action required, when you score a critical hit on a creature with a weapon attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  range: "Weapon",
  save: "Con",
  duration: "1 min",
  description:
    "On crit, the crea's speed is reduced to 0; save at start of each turn to end",
  descriptionFull:
    "When you score a critical hit on a creature with a weapon attack, you can expend one Exploit Die to critically disable its movement. For 1 minute, its speed is reduced to 0.\nThe creature can make a Constitution saving throw at the start of each of its turns, ending this effect on a success.",
};

SpellsList["bloodthirsty critical"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 13;
  },
  // Regular spell attributes
  name: "Bloodthirsty Critical",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Combat",
  time: "Crit",
  timeFull:
    "No action required, when you score a critical hit on a creature with a weapon attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  range: "Weapon",
  duration: "Instantaneous",
  description:
    "On crit, make another attack against the same creature; cannot use this exploit again on that attack",
  descriptionFull:
    "When you score a critical hit on a creature with a weapon attack, you can expend an Exploit Die to instantly make one additional weapon attack against that creature. On hit, you deal additional damage equal to one roll of your Exploit Die.\nIf you score a critical hit with the attack granted by this Exploit, you cannot use this Exploit again to make another attack.",
};

SpellsList["ringing critical"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 13;
  },
  prerequisite: "Strength of 13",
  // Regular spell attributes
  name: "Ringing Critical",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Combat",
  time: "Crit",
  timeFull:
    "No action required, when you score a critical hit on a creature with a weapon attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  range: "Weapon",
  save: "Wis",
  duration: "1 min",
  description:
    "On crit, the crea has to subtract 1d4 on every attack or save; save at start of each turn to end",
  descriptionFull:
    "When you score a critical hit on a creature with a weapon attack, you can expend one Exploit Die to daze your target.\nFor 1 minute, that creature must roll a d4 and subtract the result from any attack roll and saving throw it makes.\nThe creature can make a Wisdom saving throw at the beginning of each of its turns, ending this effect on a success.",
};

SpellsList["greater hurl"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 13 && v.skillProfs.indexOf("Athletics") !== -1;
  },
  prerequisite: "Strenght of 13, Athletics proficiency",
  // Regular spell attributes
  name: "Greater Hurl",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Combat",
  time: "1 a",
  range: "Touch",
  save: "Str",
  duration: "Instantaneous",
  description:
    "Throw a crea at least one size smaller than me to a space within 30 ft (see book)",
  descriptionFull:
    "In place of an attack, you can expend an Exploit Die to touch a target at least one size smaller than you, forcing it to make a Strength saving throw. On a failure, you throw it to a space you can see within 30 feet. The target can choose to fail." +
    "\n An unwilling target falls Prone if it lands in an unoccupied space. If it hits another target, that target must succeed on a Dexterity saving throw or it takes bludgeoning damage equal to your Exploit Die + your Strength modifier." +
    "\n A feature that increases the size of targets you can Grapple increases the size of targets you can throw with this Exploit.",
};

SpellsList["primal senses"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Con") >= 13 || What("Wis") >= 13;
  },
  // Regular spell attributes
  name: "Primal Senses",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Skill",
  time: "1 a",
  range: "Self",
  duration: "10 min",
  description:
    "Add Exploit Die to all Wisdom (Insight, Perception and Survival) checks, smell poison (see book)",
  descriptionFull:
    "As an action, you can expend an Exploit Die to temporarily heighten your senses. For 10 minutes you gain a bonus to any Wisdom (Insight) Wisdom (Perception) or Wisdom (Survival) checks you make equal to one roll of your Exploit Die, so long as the checks rely on your sense of sight or smell.\nYou can also smell the presence and location of poisons, poisonous creatures, and diseases within 30 feet of you, and identify the kind of poison, poisonous creature, or disease.\nYour senses cannot detect anything behind full cover.",
};

SpellsList["pinning shot"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[2nd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 13 || What("Dex") >= 13;
  },
  prerequisite: "Strength or Dexterity of 13",
  // Regular spell attributes
  name: "Pinning Shot",
  classes: ["fighter(laserllama)", "rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 2,
  school: "Combat",
  time: "Attack",
  range: "Ranged",
  components: "W", // W = weapon
  compMaterial: "Ranged/Thrown weapon attack",
  duration: "Instantaneous",
  save: "Str/Dex",
  description:
    "Add Exploit Die damage and target speed becomes 0 until it use an action to repeat save",
  descriptionFull:
    "When you hit a creature with a ranged or thrown weapon attack, you can expend an Exploit Die to force a Str/Dex save (its choice). On a failure, add the Exploit Die to the damage and its speed becomes 0. \nAs an action, the creature can make a Strength check to end the effects of this Exploit with a success.",
};

// 3rd degree exploits
SpellsList["adrenaline rush"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Con") >= 15;
  },
  prerequisite: "Constitution of 15",
  // Regular spell attributes
  name: "Adrenaline Rush",
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "1 bns",
  range: "Self",
  duration: "1 min",
  description: "I can take Dash action as a bonus action for the duration",
  descriptionFull:
    "As a bonus action, you can expend an Exploit Die to increase your speed, if only temporarily. For the next minute, you can take the Dash action as a bonus action on each of your turns, including the bonus action you used to use this Exploit.",
};

SpellsList["craft greater poison"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    // Prerequisites: proficiency with poisoner's kit
    if (
      /poisoner.*?/i.test(What("Too Text")) &&
      tDoc.getField("Too Prof").isBoxChecked(0)
    ) {
      return tDoc.getField("Too Exp").isBoxChecked(0) ? "markButDisable" : true;
    } else {
      return (
        CurrentProfs.tool["Poisoner's kit"] ||
        /poisoner.*?/i.test(v.toolProfs.toString())
      );
    }
  },
  prerequisite: "Poisoner's Kit Proficiency",
  // Regular spell attributes
  name: "Craft Greater Poison",
  classes: ["rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Craft",
  time: "1 a",
  range: "Self",
  save: "Con",
  duration: "1 min",
  description:
    "Craft great poison who forces one crea to make Con save or half speed, no reactions and disadv. on attacks for 1 min; extra save each turn",
  descriptionFull:
    "As an action, you expend Exploit Dice (up to your Proficiency Bonus) and use your poisoner's kit to craft one vial of Greater Poison. It retains potency until the end of your next long rest. You can't regain your Exploit Dice until this Poison is spent." +
    "\n With the Use an Object action, a creature can apply the vial of poison to a weapon or piece of ammunition. On its next hit, it deals bonus poison damage equal to the Exploit Dice spent, and the target must succeed on a Constitution saving throw or for 1 minute it has disadvantage on attack rolls and ability checks, its speed is halved, and it can't take reactions." +
    "\n The affected creature can repeat this saving throw at theend of each of its turns. On a success, the effect ends, but ona failure, it takes poison damage equal to your Exploit Die.",
};

SpellsList["daring rescue"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  // Regular spell attributes
  name: "Daring Rescue",
  classes: ["fighter(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "1 rea",
  timeFull:
    "As a reaction when a creature you can see within 30 feet is reduced to 0 hit points",
  range: "Self",
  duration: "1 min",
  description:
    "Gain two Expl Dice temp HP and move up to twice my move speed to an ally, who heals and gains temp HP (see book)",
  descriptionFull:
    "When a friendly creature that you can see within 30 feet isreduced to 0 hit points, you can use your reaction to expendan Exploit Die, gaining temporary hit points equal to twiceyour Exploit Die, then move up to twice your speed. \nIf you move within 5 feet of the downed creature, you canpick them up so long as you have a free hand, carrying themup to the remaining distance. If this movement provokes anyopportunity attacks, these attacks must target you, not the creature that you are carrying. \nAt the end of this special movement, your remaining temporary hit points are transferred to the creature you carried, it regains 1 hit point, and can stand up.",
};

SpellsList["destructive slam"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 15;
  },
  prerequisite: "Strength of 15",
  // Regular spell attributes
  name: "Destructive Slam",
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "Attack",
  range: "S:20ft cube",
  duration: "Instantaneous",
  save: "Dex",
  description:
    "All crea within range Str save or fall prone and take dmg (see book, half on save); diff. terrain",
  descriptionFull:
    "In place of an attack, you can expend Exploit Dice (up to yourProficiency Bonus) and strike the ground, forcing all targetsin an adjacent 20-foot cube to make a Strength saving throw.On a failure, targets take bludgeoning damage equal to twice your Exploit Die for each Exploit Die spent + your Strength modifier and fall prone. On a success, they take half as muchdamage and do not fall prone. Objects within this area takethe maximum amount of damage. \nThe area becomes difficult terrain. A creature can spend 1 minute to clear one 5-foot square of this difficult terrain.",
};

SpellsList["disorienting blow"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 15;
  },
  prerequisite: "Strength of 15",
  // Regular spell attributes
  name: "Disorienting Blow",
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "Hit",
  timeFull: "No action required, on hit with a melee weapon attack",
  components: "W", // W = weapon
  compMaterial: "Melee weapon attack",
  range: "Melee",
  duration: "1 min",
  save: "Wis",
  description:
    "Add 2 Expl Dice to dmg; save or -2 AC, speed halved, disadv. on Dex saves, no rea, only 1 a (1 atk) or 1 bns",
  descriptionFull:
    "When you hit with a creature with a melee weapon attack, you can expend an Exploit Die to strike with great force, dealing bonus damage equal to two rolls of your Exploit Die and forcing it to make a Wisdom saving throw. \nOn a failure, it suffers the following effects for 1 minute: \n\u2022 Its speed is halved and it cannot take reactions. \n\u2022 Its Armor Class is reduced by 2. \n\u2022 It has disadvantage on Dexterity saving throws. \n\u2022 On its turn it can only take an action or a bonus action. \n\u2022 It cannot make more than one attack during its turn, even if a feature would allow it to make multiple.\n\nThe creature can make a Wisdom saving throw at the endof each of its turns, ending this Exploit's effects on a success. \nThis Exploit's effects do not stack with the slow spell.",
};

SpellsList["forgotten knowledge"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return v.skillProfs.indexOf("History") !== -1;
  },
  prerequisite: "History proficiency",
  // Regular spell attributes
  name: "Forgotten Knowledge",
  source: ["GMB:LL", 0],
  classes: ["rogue(laserllama)", "warlord(laserllama)"],
  level: 3,
  school: "Skill",
  time: "10 min",
  range: "Self",
  duration: "Instantaneous",
  description:
    "Remember a piece of lore of person, object, or location you can see (see book)",
  descriptionFull:
    "You can expend an Exploit Die to spend 10 minutes focused on a person, object, or location you can see, after which, you remember a piece of lore about the thing you focused on.\n\nThis lore might consist of current tales, forgotten stories, or even secret lore that has never been widely known. The more information you have about the thing, the more precise and detailed the information you seem to remember about it.",
};

SpellsList["gale slash"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 15 || What("Dex") >= 15;
  },
  prerequisite: "Strength or Dexterity of 15",
  // Regular spell attributes
  name: "Gale Slash",
  classes: ["fighter(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "Attack",
  range: "S:20ft cone",
  components: "W", // W = weapon
  compMaterial: "Melee weapon",
  duration: "Instantaneous",
  save: "Con",
  description:
    "All crea within range Con save or take dmg (see book, half on save)",
  descriptionFull:
    "In place of an attack, you can expend Exploit Dice (up to your proficiency bonus) to rend the air in front of you with a melee weapon, forcing targets in an adjacent 20-foot cone to make a Constitution saving throw. On a failure, targets take slashing damage equal to two rolls of your Exploit Die for each Exploit Die spent + either your Strength or Dexterity modifier. On a successful save, targets take half as much damage.",
};

SpellsList["heroic focus"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Con") >= 15;
  },
  prerequisite: "Constitution of 15",
  // Regular spell attributes
  name: "Heroic Focus",
  classes: ["fighter(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "1 bns",
  range: "Self",
  duration: "Conc, 1 min",
  description:
    "+2 AC, various speeds doubles, adv. on Dex saves, extra action (1 attack, dash, disengage, hide, search, object)",
  descriptionFull:
    "As a bonus action, you can expend one Exploit Die to enter a heightened state of focus, which requires your concentration. While concentrating on this Exploit, you gain these benefits:\n\u2022 Your walking, climbing and swimming speed is doubled \n\u2022 You gain a +2 bonus to your Armor Class \n\u2022 You have advantage on all Dexterity saving throws \n\u2022 You gain an additional action on each of my turns. That action can be used only to take the Attack (one weapon attack only), Dash, Disengage, Hide, Search or Use an Object action.\n\n The effects of this Exploit lasts for up to 1 minute, but theyend early if you are incapacitated or you choose to end them. \n This Exploit's effects do not stack with the haste spell.",
};

SpellsList["incite violence"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return v.skillProfs.indexOf("Deception") !== -1;
  },
  prerequisite: "Deception proficiency",
  // Regular spell attributes
  name: "Incite Violence",
  source: ["GMB:LL", 0],
  classes: ["rogue(laserllama)", "warlord(laserllama)"],
  level: 3,
  school: "Skill",
  time: "1 min",
  range: "Self",
  duration: "10 min",
  description:
    "Remember a piece of lore of person, object, or location you can see (see book)",
  descriptionFull:
    "You can expend an Exploit Die to spend 1 minute giving acunning speech to a number of creatures that can hear you equal to your level. At the conclusion, creatures who heard the entire speech must make a Wisdom saving throw." +
    "\n All creatures who fail this saving throw become hostile toward a creature or location of your choice for 10 minutes.",
};

SpellsList["inspirational speech"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Cha") >= 15;
  },
  prerequisite: "Charisma of 15",
  // Regular spell attributes
  name: "Inspirational Speech",
  classes: ["fighter(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Speech",
  time: "1 min",
  range: "Voice",
  components: "V",
  duration: "Instantaneous",
  description:
    "Give temp HP equal to my lvl to 1 + Cha mod creatures and adv. on Wis saves while the temp HP lasts",
  descriptionFull:
    "You can expend an Exploit Die and spend 1 minute giving an inspirational speech to a number of creatures that can hear you equal to 1 + your Charisma modifier. At the end of this speech, targets gain temporary hit points equal to your level.\nWhile the temporary hit points from this Exploit last, the creatures have advantage on Wisdom saving throws.",
};

SpellsList["mythic athleticism"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 15 || What("Con") >= 15;
  },
  prerequisite: "Strength or Constitution of 15",
  // Regular spell attributes
  name: "Mythic Athleticism",
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "1 bns",
  range: "Self",
  duration: "Conc, ED*10m",
  description:
    "Str & Con check cannot be <10, various speeds doubles, one size larger carry/grap, double jump distance",
  descriptionFull:
    "As a bonus action, you can expend Exploit Dice (up to your proficiency bonus) to enter a heightened state of physical performance which you must concentrate on as if you were concentrating on a spell. You gain the benefits listed below:\n\u2022 Whenever you make a Strength or Constitution check, you can treat a roll of 9 or lower on the d20 as a 10.\n\u2022 Your walking, climbing and swimming speed is doubled \n\u2022 You count as one size larger for the purposes of carrying capacity and the size of creatures that you can grapple.\n\u2022 Both your long and high jump distances double, even if that distance would exceed your remaining movement.\n\n The effects of this Exploit last for 10 minutes per Exploit Die spent, and they end early if you are incapacitated.",
};

SpellsList["mythic resilience"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Con") >= 15;
  },
  prerequisite: "Constitution of 15",
  // Regular spell attributes
  name: "Mythic Resilience",
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "Special",
  timeFull:
    "No action required, when you take damage from a source you can see", // NOTE: RAW it doesn't consume the reaction, though I'm not sure if it's intended
  range: "Self",
  duration: "Instantaneous",
  description:
    "Reduce dmg by (3*ED+Con) * ED spent (up to my prof bns); Excess dmg reduction becomes temp HP",
  descriptionFull:
    "When you take damage from a source you can see, you can expend Exploit Dice (up to your proficiency bonus) to reduce the damage by three Exploit Dice per Exploit Die spent.\n If the total rolled exceeds the amount of damage, you gain temporary hit points equal to the remaining amount.",
};

SpellsList["perilous gambit"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  // Regular spell attributes
  name: "Perilous Gambit",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Speech",
  time: "1 bns",
  range: "30 feet",
  components: "V",
  duration: "1 minute",
  description:
    "Taunt the target and apply effect on it (see Book)",
  descriptionFull:
    "As a bonus action, you can taunt a creature that can see you within 30 feet, imposing the effects below for up to 1 minute. This Exploit fails if the creature cannot be Charmed." +
    "\n \u2022 It has advantage on any attack roll it makes against you, but it has disadvantage on all other attack rolls." +
    "\n \u2022 If it moves, it can only move closer to you." +
    "\n \u2022 Any creature under the effect of one of your Exploits has advantage on its attack rolls against this creature." +
    "\n \u2022 The creature can make a Wisdom saving throw at the end of each of its turns, ending the effect on a success. If you are within 30 feet of it, it has disadvantage on this saving throw.",
};

SpellsList["recruit informant"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Int") >= 15 || What("Cha") >= 15;
  },
  prerequisite: "Intelligence or Charisma of 15",
  // Regular spell attributes
  name: "Recruit Informant",
  classes: ["rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Speech",
  time: "1 h",
  timeFull:
    "No action required, when you take damage from a source you can see", // NOTE: RAW it doesn't consume the reaction, though I'm not sure if it's intended
  range: "Settlement",
  duration: "Instantaneous",
  description: "Recruit an informant that gathers info for me (see book)",
  descriptionFull:
    "You can expend an Exploit Die and spend 1 hour to recruit a humanoid Informant from a settlement you currently occupy. For this Exploit to work, there must be a willing humanoid,such as an urchin, criminal, thief, spy, or another rapscallion in a settlement of significant size, as determined by the DM." +
    "\n They won't aid you in combat or risk their life for you, but they will gather information, rumors, news, and secrets from that settlement. During each long rest, they will seek you out and deliver this information if you are in that settlement." +
    "\n Your Informant remains in your service until you dismiss them or they die. However, you do not regain the Exploit Die spent on this Exploit until they leave your service." +
    "\n Having more than one Informant in a settlement increases the accuracy and secrecy of information they can gather.",
};

SpellsList["recruit mercenary"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Int") >= 15 || What("Cha") >= 15;
  },
  prerequisite: "Intelligence or Charisma of 15",
  // Regular spell attributes
  name: "Recruit Mercenary",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Speech",
  time: "1 h",
  range: "Settlement",
  duration: "Instantaneous",
  description:
    "Recruit Brute or Scout who follows my orders in combat (see book)",
  descriptionFull:
    "You can expend an Exploit Die and spend 1 hour to recruit a humanoid Mercenary from a settlement you currently occupy. For this Exploit to work, there must be a willing humanoid, such as a bounty hunter, adventurer, or other sellsword in a settlement of significant size, as determined by the DM.\nYou choose to recruit a Brute or Scout, which determines certain traits in their stat block. They use the Mercenary stat block (can be added to Companion page) and roll their own initiative in combat. On their turn, they do their best to follow any orders you have given. If not, they will defend themselves to the best of their ability.\nThe Mercenary remains in your service until you dismiss them, they abandon you, or they die. You do not regain the Exploit Die spent on this Exploit until they leave your service.\nYou can only have one Mercenary in your service at a time. Recruiting another causes others to abandon you.",
};

// Brute Mercenary statblock
CreatureList["mercenary, brute"] = {
  name: "Mercenary, Brute",
  source: ["GMB:LL", 0],
  size: 3,
  type: "Humanoid",
  alignment: "any Non-Lawful Alignment",
  ac: 18,
  hp: 21,
  hd: [3, 10],
  hdLinked: ["fighter(laserllama)", "fighter"],
  minlevelLinked: ["fighter(laserllama)", "fighter"],
  speed: "30 ft",
  scores: [16, 16, 13, 10, 12, 8],
  saves: [3, 3, "", "", "", ""],
  senses: "",
  passivePerception: 12, // The page overrides this to 11 which honestly I think is better since it was probably an oversight to have this set to 12
  languages: "Common and one other language",
  challengeRating: "0", // Not included in document
  proficiencyBonus: 3,
  attacksAction: 1,
  attacks: [
    {
      name: "Battleaxe",
      ability: 1,
      damage: [1, 8, "slashing"],
      range: "Melee (5 ft)",
      description: "",
      abilitytodamage: true,
    },
  ],
  skills: {
    Athletics: 6,
  } /*
	features : [{
		name : "Leader",
		description : "-"
	}], */,
  traits: [
    {
      name: "Morale",
      description:
        "If you fall to 0 hit points the Mercenary does everything in its power to flee and return home.",
    },
    {
      name: "Rough & Tumble",
      description:
        "The Mercenary can use a bonus action to attempt a Shove or Grapple.",
    },
  ],
  notes: [
    {
      name: "The Mercenary roll their own initiative in combat",
      description:
        "On their turn, they do their best to follow any orders you have given. If not, they will defend themselves to the best of their ability.",
      joinString: " ",
    },
    {
      name: "The Mercenary has a number of d10 Hit Dice equal to your level.",
      description:
        "It also gains all the normal benefits of both short and long rests.",
      joinString: " ",
    },
  ],
  calcChanges: {
    hp: function (totalHD, HDobj, prefix) {
      if (!classes.known["fighter(laserllama)"] && !classes.known.fighter)
        return;
      var rngrLvl = classes.known["fighter(laserllama)"]
        ? classes.known["fighter(laserllama)"].level
        : classes.known.fighter.level;
      var rngrLvlM = 5 * rngrLvl;
      HDobj.alt.push(6 + rngrLvlM);
      HDobj.altStr.push(
        " = 6 as a base\n + 5 \xD7 " +
        rngrLvl +
        " from five times its leader's fighter level (" +
        rngrLvlM +
        ")"
      );
    },
    setAltHp: true,
  },
};

// Scout Mercenary statblock
CreatureList["mercenary, scout"] = {
  name: "Mercenary, Scout",
  source: ["GMB:LL", 0],
  size: 3,
  type: "Humanoid",
  alignment: "any Non-Lawful Alignment",
  ac: 18,
  hp: 21,
  hd: [3, 10],
  hdLinked: ["fighter(laserllama)", "fighter"],
  minlevelLinked: ["fighter(laserllama)", "fighter"],
  speed: "30 ft",
  scores: [16, 16, 13, 10, 12, 8],
  saves: [3, 3, "", "", "", ""],
  senses: "",
  passivePerception: 12, // The page overrides this to 11 which honestly I think is better since it was probably an oversight to have this set to 12
  languages: "Common and one other language",
  challengeRating: "0", // Not included in document
  proficiencyBonus: 3,
  attacksAction: 1,
  attacks: [
    {
      name: "Shortsword",
      ability: 2,
      damage: [1, 6, "slashing"],
      range: "Melee (5 ft)",
      description: "Finesse, light",
      abilitytodamage: true,
    },
    {
      name: "Shortbow",
      ability: 2,
      damage: [1, 6, "piercing"],
      range: "80/320 ft",
      description: "Ammunition, two-handed",
      abilitytodamage: true,
    },
  ],
  skills: {
    Stealth: 6,
  } /*
	features : [{
		name : "Leader",
		description : "-"
	}], */,
  traits: [
    {
      name: "Morale",
      description:
        "If you fall to 0 hit points the Mercenary does everything in its power to flee and return home.",
    },
    {
      name: "Slippery",
      description:
        "The Mercenary can use a bonus action to take the Disengage or Hide action.",
    },
  ],
  notes: [
    {
      name: "The Mercenary roll their own initiative in combat",
      description:
        "On their turn, they do their best to follow any orders you have given. If not, they will defend themselves to the best of their ability.",
      joinString: " ",
    },
    {
      name: "The Mercenary has a number of d10 Hit Dice equal to your level.",
      description:
        "It also gains all the normal benefits of both short and long rests.",
      joinString: " ",
    },
  ],
  calcChanges: {
    hp: function (totalHD, HDobj, prefix) {
      if (!classes.known["fighter(laserllama)"] && !classes.known.fighter)
        return;
      var rngrLvl = classes.known["fighter(laserllama)"]
        ? classes.known["fighter(laserllama)"].level
        : classes.known.fighter.level;
      var rngrLvlM = 5 * rngrLvl;
      HDobj.alt.push(6 + rngrLvlM);
      HDobj.altStr.push(
        " = 6 as a base\n + 5 \xD7 " +
        rngrLvl +
        " from five times its leader's fighter level (" +
        rngrLvlM +
        ")"
      );
    },
    setAltHp: true,
  },
};

SpellsList["thunderous shot"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 15 || What("Dex") >= 15;
  },
  prerequisite: "Strength or Dexterity of 15",
  // Regular spell attributes
  name: "Thunderous Shot",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)"],
  level: 3,
  school: "Combat",
  time: "Attack",
  range: "Line (W)",
  components: "W", // W = weapon
  compMaterial: "Ranged/Thrown weapon",
  duration: "Instantaneous",
  description:
    "All crea in line save or take (2 ED) * ED spent (up to my PB) + Str/Dex dmg and prone (half on success)",
  descriptionFull:
    "In place of an attack, you can expend Exploit Dice (up to yourProficiency Bonus) and make a single attack with a ranged orthrown weapon, forcing creatures in straight line out to theweapon's normal range to make a Dexterity saving throw.\n On a failure, creatures take damage as if they were hit byyour weapon + two Exploit Dice per Die spent, and if they areLarge or smaller, they are knocked prone. On a success, theytake half as much damage and are not knocked prone.",
};

SpellsList["stand the fallen"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  // Regular spell attributes
  name: "Stand the Fallen",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Speech",
  time: "1 a",
  range: "30 feet",
  components: "V",
  duration: "Instantaneous",
  description:
    "Any crea of my choice within range regain 1 Expl Die + my Lead mod",
  descriptionFull:
    "As an action, you expend Exploit Dice (up to your Proficiency Bonus) to let forth an inspiring shout. Choose allied creatures that can hear you within 30 feet to regain hit points equal to the Exploit Dice you spent + your Leadership modifier." +
    "\n You can target Unconscious creatures at 0 hit points.",
};

SpellsList["survey settlement"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Dex") >= 15 || What("Cha") >= 15;
  },
  prerequisite: "Dexterity or Charisma of 15",
  // Regular spell attributes
  name: "Survey Settlement",
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Speech",
  time: "1 h",
  range: "1 mile",
  duration: "Instantaneous",
  description:
    "Learn three of: factions, buildings, leaders, beliefs or secret places (see book)",
  descriptionFull:
    "You can expend an Exploit Die and spend 1 hour gathering information on up to 1 square mile of a settlement that you currently occupy. At the end of the hour, you gain knowledge about three of the following as they relate to the area:" +
    "\n\u2022 Any active factions and faction outposts within the area." +
    "\n\u2022 Prominent buildings, gathering places, and cultural sites." +
    "\n\u2022 Powerful (CR 1 or higher) politicians or military leaders." +
    "\n\u2022 Loyalties, beliefs, rumors, and fears of the local populace." +
    "\n\u2022 Secret alleyways, doors, hideouts, or storefronts.",
};

SpellsList["survey wilderness"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 15 || What("Wis") >= 15;
  },
  prerequisite: "Strength or Wisdom of 15",
  // Regular spell attributes
  name: "Survey Wilderness",
  classes: ["fighter(laserllama)", "barbarian(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Speech",
  time: "1 h",
  range: "1 mile",
  duration: "Instantaneous",
  description:
    "Learn three of: camps, nature, ecosystems, creatures or secret places (see book)",
  descriptionFull:
    " You can expend an Exploit Die and spend 1 hour gathering information on up to 1 square mile of a wilderness that you currently occupy. At the end of the hour, you gain knowledge about three of the following as they relate to the area:" +
    "\n\u2022 Any settlements or camps with five or more occupants." +
    "\n\u2022 Prominent natural formations, bodies of water, and ruins." +
    "\n\u2022 Local plants, animals, weather, and ecosystems." +
    "\n\u2022 Powerful (CR 1 or higher) creatures that reside within, or have passed through the area within the last 24 hours." +
    "\n\u2022 Secret trails, entrances, groves, or monster lairs.",
};

SpellsList["tactical reposition"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Int") >= 15;
  },
  prerequisite: "Intelligence of 15",
  // Regular spell attributes
  name: "Tactical Reposition",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Speech",
  time: "1 a",
  range: "30 feet",
  components: "V",
  duration: "Instantaneous",
  description:
    "Up to my Lead mod creas can use a reaction to move without provoking opportunity attacks",
  descriptionFull:
    "As an action, you can expend one Exploit Die and dictate a strategic course of action to a number of creatures equal to your Leadership modifier (minimum of 1) within 30 feet that can see or hear you. Creatures can use their reaction to move up to their speed without provoking opportunity attacks.",
};

SpellsList["war cry"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Con") >= 15 || What("Cha") >= 15;
  },
  prerequisite: "Constitution or Charisma of 15",
  // Regular spell attributes
  name: "War Cry",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "barbarian(laserllama)", "warlord(laserllama)"],
  level: 3,
  school: "Combat",
  time: "1 a",
  range: "S:30" + (typePF ? "-" : "") + "ft cone",
  components: "V",
  duration: "1 min",
  save: "Wis",
  description:
    "All crea save or drop what it is holding and frightened; extra save with action if can't see or hear you",
  descriptionFull:
    "As an action, you can expend an Exploit Die to issue forth amighty cry, forcing creatures of your choice that can hear youin an adjacent 30-foot cone to make a Wisdom saving throw.On a failed save, creatures drop whatever they are holdingand are Frightened of you for 1 minute.\n If a Frightened creature can't see or hear you, it can use its action to repeat the saving throw, ending the effect on a success.",
};

SpellsList["confounding critical"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 15;
  },
  // Regular spell attributes
  name: "Confounding Critical",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "Crit",
  timeFull:
    "No action required, when you score a critical hit on a creature with a weapon attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  range: "Weapon",
  save: "Int",
  duration: "1 min",
  description:
    "On crit, crea has -1d6 on every attack, check and concentration save; save at start of each turn to end",
  descriptionFull:
    "When you score a critical hit on a creature with a weapon attack, you can expend one Exploit Die to strike at the head, weakening its ability to think. For 1 minute, its thoughts are muddled and whenever it makes an attack roll, ability check, or Constitution saving throw to maintain its concentration, it must roll a d6 and subtract the result from its roll.\nThe creature can make an Intelligence saving throw at the start of each of its turns, ending this effect on a success.",
};

SpellsList["primal sense"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  // Regular spell attributes
  name: "Primal Sense",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Skill",
  time: "1 a",
  range: "Self",
  duration: "10 min",
  description:
    "ED bonus to Insight, Perception and Survival check; can smell poison and disease (see book)",
  descriptionFull:
    "As an action, you can expend one Exploit Die to temporarily heighten your senses. For 10 minutes, you gain a bonus to allInsight, Perception, and Survival checks equal to your Exploit Die, so long as the checks rely on your sense of sight or smell." +
    "\n You can also smell the presence and location of all poisons,poisonous creatures, and diseases within 30 feet, and identifythe kind of poison, poisonous creature, or disease." +
    "\n This heightened sense of smell cannot penetrate full cover.",
};

SpellsList["primal terror"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  // Regular spell attributes
  name: "Primal Terror",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "1 a",
  range: "5 ft",
  save: "Wis",
  duration: "1 min",
  description:
    "One crea save or sees all creatures as enemies, attacks randomly; extra save each time it takes damage",
  descriptionFull:
    "As an action, you spend an Exploit Die and attempt to drive a creature within 5 feet into a fit of primal fear. It must succeeda Wisdom saving throw or it regards all creatures as enemies for 1 minute. Each time it takes damage, it repeats the saving throw, ending this effect on a success." +
    "\n The creature chooses the targets of its attacks, spells, and abilities at random, and it must take all opportunity attacks.",
};

SpellsList["roar of triumph"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 15;
  },
  // Regular spell attributes
  name: "Roar of Triumph",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "Crit",
  timeFull: "No action required, when you score a critical hit on a creature",
  components: "V",
  range: "S:300-ft rad",
  duration: "Instantaneous",
  description:
    "On crit, me and Con mod creatures of my choice gain temp HP equal to my level + my Con mod",
  descriptionFull:
    "When you score a critical hit, you can expend an Exploit Die to let out a cry that can be heard up to 300 feet away. You and a number of creatures of your choice who can hear you equal to your Constitution modifier (minimum of 1) gain temporary hit points equal to your level + your Constitution modifier.",
};

SpellsList["savage defiance"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  // Regular spell attributes
  name: "Savage Defiance",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "1 a",
  range: "S:60-ft rad",
  duration: "1 min",
  description:
    "Creas of my choice have disadv. on attacks against not me for 1 min or until they hit me",
  descriptionFull:
    "As an action you can expend an Exploit Die to issue a savage challenge. Creatures of your choice within 60 feet that can hear you have disadvantage on attacks against targets other than you for 1 minute, or until they hit you with an attack.",
};

SpellsList["bewildering blow"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 15 || What("Dex") >= 15;
  },
  prerequisite: "Strength or Dexterity of 15",
  // Regular spell attributes
  name: "Bewildering Blow",
  classes: ["barbarian(laserllama)", "rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "Hit",
  timeFull: "No action required, on hit with a melee weapon attack",
  range: "Melee",
  components: "W", // W = weapon
  compMaterial: "Melee weapon attack",
  save: "Wis",
  duration: "1 min",
  description:
    "On hit, crea must make a save or cannot take reactions and moves in random direction (see book)",
  descriptionFull:
    "When you hit a creature with a melee weapon attack, you canexpend an Exploit Die and strike with precise force, dealingadditional damage equal to two rolls of your Exploit Die andforcing it to make a Wisdom saving throw." +
    "\n On a failed save, it cannot take reactions and on each of itsturns it must move half its speed in a random direction thenmake a melee attack against a random creature in range." +
    "\n To determine the random direction and attack, assign adirection (or target) to an appropriate die and roll it. For thedirection, use a d8, and for target use a d4 or larger." +
    "\n This lasts for 1 minute, but it repeats this saving throw atthe end of each of its turns, ending the effect on a success.",
};

SpellsList["pack tactics"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits]",
  prereqeval: function (v) {
    return What("Wis") >= 15;
  },
  prerequisite: "Wisdom of 15",
  // Regular spell attributes
  name: "Pack Tactics",
  classes: ["barbarian(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "1 bns",
  range: "S:30-ft rad",
  duration: "Up to 1 min",
  description:
    "Until next turn, creas of my choice have adv. on attacks if has another ally within 5 ft; extend with 1 bns",
  descriptionFull:
    "As a bonus action, you can spend an ExploitDie to signal creatures of your choice that can see or hear you within 30 feet to fight together as a pack. Until the end of your following turn, you and these creatures have advantage on attack rolls, so long as another creature under the effects of this Exploit is within 5 feet of your target." +
    "\n On subsequent turns, you can use a bonus action to extendthis effect until the end of your next turn without spending anExploit Die, for a maximum duration of 1 minute.",
};

// 4th degree exploits
SpellsList["agonizing strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits]",
  prereqeval: function (v) {
    return What("Dex") >= 17;
  },
  prerequisite: "Dexterity of 17",
  // Regular spell attributes
  name: "Agonizing Strike",
  source: ["GMB:LL", 0],
  classes: ["rogue(laserllama)"],
  level: 4,
  school: "Combat",
  time: "Hit",
  timeFull: "When you hit a creature",
  range: "Melee",
  components: "W", // W = weapon
  compMaterial: "Melee weapon",
  duration: "1 min",
  description:
    "On hit, Con save or half speed, disadv. on all attacks, checks, saving throws and difficulty casting spells (see book)",
  descriptionFull:
    "When you hit a creature with a melee weapon attack, you can expend an Exploit Die to strike as to inflict crippling pain and force the creature to make a Constitution saving throw." +
    "\n On a failure, its speed is halved; it has disadvantage on all attack rolls, ability checks, and saving throws; and to cast a spell it must first succeed on a Constitution saving throw or its spell slot (or use of that feature) is wasted." +
    "\n This effect lasts for 1 minute, but the creature can maks a Constitution saving throw without disadvantage at the end of each of its turns, ending this effect success.",
};

SpellsList["befuddling critical"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 17;
  },
  prerequisite: "Strength of 17",
  // Regular spell attributes
  name: "Befuddling Critical",
  classes: ["barbarian(laserllama)"],
  source: ["GMB:LL", 0],
  level: 3,
  school: "Combat",
  time: "Crit",
  timeFull:
    "No action required, when you score a critical hit on a creature with a weapon attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  range: "Weapon",
  save: "Int",
  duration: "1 min",
  description:
    "On crit, crea loses concentration and disadv. on Wis, Int and Cha saves; save at start of each turn to end",
  descriptionFull:
    "When you score a critical hit on a creature with a weapon attack, you can expend one Exploit Die to shatter its focus. If it was concentrating on a spell or effect, it automatically loses concentration, and for 1 minute, it has disadvantage on all Intelligence, Wisdom, and Charisma saving throws, and any saving throws it makes to maintain concentration.\nThe creature can make an Intelligence saving throw at the start of each of its turns, ending this effect on a success.",
};

SpellsList["clandestine source"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits]",
  prereqeval: function (v) {
    return v.languageProfs.indexOf("Thieves' Cant") !== -1;
  },
  prerequisite: "Knowledge of Thieves' Cant",
  // Regular spell attributes
  name: "Clandestine Source",
  classes: ["rogue(laserllama)", "warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 4,
  school: "Speech",
  time: "1 h",
  range: "Settlement",
  duration: "Instantaneous",
  description: "Search a mob boss to ask up to 5 questions (see book)",
  descriptionFull:
    "While in a settlement of sufficient size, you can expend one Exploit Die and spend 1 hour using the Thieves' Cant found throughout the settlement to track down a significant figure of the criminal underworld to ask questions of." +
    "\n Should the DM decide that such a figure exists within the settlement, you must approach them alone, and must make a DC 15 Intelligence or Charisma saving throw (your choice) to convince them to grant you an audience. On a failed save, you are reduced to 0 hit points, and your body is left unconscious in an alleyway or gutter somewhere in that settlement." +
    '\n On a successful save, you have 5 minutes to ask the figure up to five questions. The figure answers each question with one word, such as "yes," "no," "maybe," "never," "irrelevant,"or "unclear" (if they do not know the answer). If a one-word answer would be misleading, the figure might instead offer a short phrase as an answer to that question.' +
    "Once you use this Exploit in a settlement, regardless if you succeed or fail on your initial ability check, you cannot use it in there again until 7 days have passed.",
};

SpellsList["craft advanced poison"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits]",
  prereqeval: function (v) {
    // Prerequisites: proficiency with poisoner's kit
    if (
      /poisoner.*?/i.test(What("Too Text")) &&
      tDoc.getField("Too Prof").isBoxChecked(0)
    ) {
      return tDoc.getField("Too Exp").isBoxChecked(0) ? "markButDisable" : true;
    } else {
      return (
        CurrentProfs.tool["Poisoner's kit"] ||
        /poisoner.*?/i.test(v.toolProfs.toString())
      );
    }
  },
  prerequisite: "Poisoner's Kit Proficiency",
  // Regular spell attributes
  name: "Craft Advanced Poison",
  classes: ["rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 4,
  school: "Craft",
  time: "1 a",
  range: "Self",
  save: "Con",
  duration: "1 h",
  description: "Craft advanced poison (see book)",
  descriptionFull:
    "As an action, you expend Exploit Dice (up to your Proficiency Bonus) and use your poisoner's kit to craft one vial of Advanced Poison. It retains potency until the end of your next long rest. You can't regain your Exploit Dice until this Poison is spent." +
    "\n With the Use an Object action, a creature can apply the vial of poison to a weapon or piece of ammunition. On its next hit, it deals bonus acid damage equal to the Exploit Dice spent, and the target must succeed on a Constitution saving throw or for 1 hour it has disadvantage on attack rolls and ability checks. If it fails by 5 or more, it is Blinded fo the duration." +
    "\n The affected creature can repeat this saving throw at the end of each of its turns. On a success, the effect ends, but on a failure, it takes acid damage equal to your Exploit Die.",
};

SpellsList["dance of death"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits]",
  prereqeval: function (v) {
    return What("Dex") >= 17;
  },
  prerequisite: "Dexterity of 17",
  // Regular spell attributes
  name: "Dance of Death",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)"],
  level: 4,
  school: "Combat",
  time: "1 a",
  range: "30 ft",
  save: "Dex",
  components: "W", // W = weapon
  compMaterial: "Melee weapon",
  duration: "Instantaneous",
  description:
    "Deal 2*ED+Dex dmg (half on save) to 1+ED expended (up to PB) creatures; +1 creature per kill",
  descriptionFull:
    "As an action on your turn, you can expend Exploit Dice (up to your Proficiency Bonus) and choose a number of targetsyou can see within 30 feet equal to 1 + the number of Diceexpended, forcing them to make a Dexterity saving throw.Creatures take damage of one hit with your weapon + yourExploit Die on a failure, and half as much on a success." +
    "\n For each creature you reduce to 0 hit points, you can forceanother creature in range to make the Dexterity saving throw." +
    "\n Once the Exploit ends, you appear in an unoccupied spaceof your choice next to the last target of this Exploit.",
};

SpellsList["equip militia"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits]",
  // Regular spell attributes
  name: "Equip Militia",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "warlord(laserllama)"],
  level: 4,
  school: "Skill",
  time: "1 h",
  range: "Special",
  duration: "Special",
  description:
    "Train humanoid creatures (up to my lvl) to fight; They gain 2 benefits of my choice (see book)",
  descriptionFull:
    "You can expend one Exploit Die and spend 1 hour training a number of humanoid creatures equal to your level to fight. Creatures that spend the full hour listening and training with you gain two of the following benefits of your choice:" +
    "\n\u2022 They gain proficiency with one martial weapon." +
    "\n\u2022 They gain proficiency with light armor and shields." +
    "\n\u2022 They gain temporary hit points equal to your level." +
    "\n\u2022 They gain proficiency in one of the following skills: Animal Handling, Athletics, Medicine, Survival, or Stealth." +
    "\n\u2022 They gain proficiency in Wisdom saving throws." +
    "\n These benefits last for each creature until it finishes a longrest. You can't regain this Exploit Die while the benefits last.",
};

SpellsList["expert focus"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits]",
  // Regular spell attributes
  name: "Expert Focus",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
  level: 4,
  school: "Skill",
  time: "1 a",
  range: "Self",
  duration: "1 h",
  description:
    "Choose one skill/tool I'm proficient in; Add Exploit die to all checks for this skill/tool",
  descriptionFull:
    "As an action, you expend one Exploit Die to temporarily focuson one of your skills. Choose a skill or tool you are proficient in. For 1 hour, when you make an ability check with that skill you gain a bonus to your roll equal to your Exploit Die.",
};

SpellsList["fluid movements"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits]",
  prereqeval: function (v) {
    return What("Dex") >= 17;
  },
  prerequisite: "Dexterity of 17",
  // Regular spell attributes
  name: "Fluid Movements",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "rogue(laserllama)"],
  level: 4,
  school: "Combat",
  time: "1 bns",
  range: "Self",
  duration: "Conc, 1 min",
  description:
    "Speed cannot be reduced, imnmunity to paralyze, restrain and grappled, opportunity attacks have disadv.",
  descriptionFull:
    "As a bonus action, you can expend one Exploit Die to enter aheightened state of focus, which requires your concentration.For the next minute, your speed can't be reduced, opportunityattacks against you have disadvantage, and you are immuneto the Grappled, Paralyzed, and Restrained conditions.",
};

SpellsList["heroic order"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits (order)]",
  // Regular spell attributes
  name: "Heroic Order",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 4,
  school: "Speech",
  time: "attack",
  timeFull: "No action required, you can forgo an attack",
  range: "30 feet",
  components: "V",
  duration: "1 rnd",
  description:
    "Issue an order to a crea to boost her defenses (see book)",
  descriptionFull:
    "When you take the Attack action, you can forgo an attack to issue this Order to another creature that can see or hear you within 30 feet. Until the start of your next turn, that creature is resistant to all damage, and it has advantage on all attack rolls, ability checks, and saving throws.",
};

SpellsList["quick draw"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits]",
  prereqeval: function (v) {
    return What("Dex") >= 17;
  },
  prerequisite: "Dexterity of 17",
  // Regular spell attributes
  name: "Quick Draw",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "rogue(laserllama)"],
  level: 4,
  school: "Combat",
  time: "1 bns",
  range: "Self",
  components: "W", // W = weapon
  compMaterial: "Ranged weapon",
  duration: "Conc, 1 min",
  description:
    "Use bns (including when activating this expl) to make 2 ranged weapon atks as long as I have ammo",
  descriptionFull:
    "As a bonus action, you can expend an Exploit Die to enter aheightened state of focus which requires concentration. For the next minute, you can use your bonus action, including the bonus action used to activate this Exploit to make two ranged weapon attacks so long as you have ammunition. This Exploit's effects don't stack with the swift quiver spell.",
};

SpellsList["revitalizing order"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits (order)]",
  // Regular spell attributes
  name: "Revitalizing Order",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 4,
  school: "Speech",
  time: "attack",
  timeFull: "No action required, you can forgo an attack",
  range: "30 feet",
  components: "V",
  duration: "Intanteneous",
  description:
    "Issue an order to a dead crea less than a minute ago to not die and stand up (see book)",
  descriptionFull:
    "When you take the Attack action, you can forgo an attack to issue this Order to another creature within 30 feet that died within the last minute. It regains hit points equal to your level + your Leadership modifier and can stand up." +
    "\n This Exploit can't return a creature to life that has died of old age, nor does it restore missing body parts.",
};

SpellsList["subjugate beast"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits]",
  prereqeval: function (v) {
    return (
      v.skillProfs.indexOf("Animal Handling") !== -1 ||
      v.skillProfs.indexOf("Intimidation") !== -1
    );
  },
  prerequisite: "Animal Handling or Intimidation proficiency",
  // Regular spell attributes
  name: "Subjugate Beast",
  source: ["GMB:LL", 0],
  classes: ["barbarian(laserllama)"],
  level: 4,
  school: "Order",
  time: "1 a",
  range: "30 ft",
  duration: "1 min",
  save: "Wis",
  description:
    "1 beast save or charmed, I can give it an order as a bonus action; extra save when damaged",
  descriptionFull:
    "As an action, you can expend an Exploit Die and attempt todominate one Beast that can see or hear you within 30 feet,forcing it to make a Wisdom saving throw. On a failure, it isCharmed by you. This effect lasts for 1 minute, but any timethe Beast takes damage, it repeats this saving throw, ending this effect on a success." +
    "\n While Charmed, you can use your bonus action to issue acommand to the Beast, specifying a simple course of action,which it follows to the best of its ability. If it doesn't receive acommand, it instead defends itself to the best of its ability.",
};

SpellsList["sundering strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 17;
  },
  prerequisite: "Strength of 17",
  // Regular spell attributes
  name: "Sundering Strike",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  level: 4,
  school: "Combat",
  time: "Attack",
  timeFull: "In place of an attack",
  range: "Melee",
  components: "W", // W = weapon
  compMaterial: "Melee weapon",
  duration: "Instantaneous",
  description:
    "Destroy magical force field; if above SL 3, DC 10+SL strength check",
  descriptionFull:
    "In place of an attack, you can expend an Exploit Die to strike a creation of magical force, such as a prismatic wall, resilient sphere, or forcecage with a melee weapon. Magical creations created with a spell slot of 3rd-level or lower are instantly destroyed by your strike.\nIf the magical creation was created with a spell of 4th-level or higher, make a Strength check. The DC equals 10 + the level of the spell slot used to create it. On a success, the magical creation is instantly destroyed.",
};

SpellsList["staggering blow"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 17;
  },
  prerequisite: "Strength of 17",
  // Regular spell attributes
  name: "Staggering Blow",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  level: 4,
  school: "Combat",
  time: "Hit",
  timeFull: "No action required, on hit with a melee weapon attack",
  range: "Melee",
  components: "W", // W = weapon
  compMaterial: "Melee weapon",
  duration: "1 min",
  save: "Wis",
  description:
    "Add 3 expl die to dmg; Wis save or disadv. on checks & attack rolls and can't take reactions",
  descriptionFull:
    "When you hit a creature with a melee weapon attack, you can expend an Exploit Die to strike with near-supernatural power, dealing bonus damage equal to three times your Exploit Die. The target must succeed on a Wisdom saving throw, or for 1 minute it has disadvantage on attack rolls and ability checks and it cannot take reactions. \nIt can make a Wisdom saving throw at the start of each of its turns, ending this effect on a success.",
};

SpellsList["colossal strength"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 17;
  },
  prerequisite: "Strength of 17",
  // Regular spell attributes
  name: "Colossal Strength",
  source: ["GMB:LL", 0],
  classes: ["barbarian(laserllama)"],
  level: 4,
  school: "Skill",
  time: "1 bns",
  range: "Self",
  duration: "Conc, 10 min",
  save: "Con",
  description:
    "My push/drag/lift capacity increases greatly; when it ends, DC17 Con save or exhaustion (see book)",
  descriptionFull: desc([
    "As a bonus action, you can expend Exploit Dice (up to your proficiency bonus) to enhance your strength to mythic levels,though this Exploit's effect requires your concentration.",
    "\n For 10 minutes, the amount of weight you can push, drag,pull, or lift is multiplied by the amount in the table below:",
    "\n>>Exploit Dice\tTotal Weight<<",
    "Normal Total\t30 x Strength score",
    "1\t50 x Strength score",
    "2\t100 x Strength score",
    "3\t150 x Strength score",
    "4\t200 x Strength score",
    "5\t250 x Strength score",
    "6\t300 x Strength score",
    "\n For each size category you are above Medium, the amount of weight you can move as part of this Exploit is doubled.",
    "\n For example, a Medium-sized Barbarian with 20 Strengthcould expend 3 Exploit Dice to use this Exploit, multiplyingtheir 20 Strength by 150, to lift up to 3,000 pounds. If theywere Large, they'd double this weight to 6,000 pounds.",
  ]),
};

SpellsList["unbreakable"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[4th-degree exploits]",
  prereqeval: function (v) {
    return What("Con") >= 17;
  },
  prerequisite: "Constituion of 17",
  // Regular spell attributes
  name: "Unbreakable",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "barbarian(laserllama)", "warlord(laserllama)"],
  level: 4,
  school: "Combat",
  time: "Special",
  timeFull:
    "No action required, when you take damage that would reduce you to 0 hit points, even if that damage would kill you outright",
  range: "Self",
  duration: "1 min",
  description:
    "Fall to 1 HP and gain temp HP equal to (2 expl die) * Expl die spent (up to prof bonus)",
  descriptionFull:
    "When you take damage that would reduce you to 0 hit points,even if that damage would kill you outright, you can expendExploit Dice (up to your Proficiency Bonus) and fall to 1 hitpoint instead. Then, you gain temporary hit points equal totwo Exploit Dice per Exploit Die spent",
};

SpellsList["victory surge"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[3rd-degree exploits (order)]",
  // Regular spell attributes
  name: "Victory Surge",
  classes: ["warlord(laserllama)"],
  source: ["GMB:LL", 0],
  level: 4,
  school: "Speech",
  time: "1 a",
  range: "30 feet",
  components: "V",
  duration: "Intanteneous",
  description:
    "Issue an order to a crea to use its reaction to move up its speed and take 1 single action or bns action",
  descriptionFull:
    "As an action, you can expend an Exploit Die to drive another creature within 30 feet that can see or hear you to fight as never before. The creature can use its reaction to move up to its full speed and take a single action or bonus action.",
};

// 5th degree exploits
SpellsList["banishing strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[5th-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 19;
  },
  prerequisite: "Strength of 19",
  // Regular spell attributes
  name: "Banishing Strike",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  level: 5,
  school: "Combat",
  time: "Hit",
  timeFull: "No action required, on hit with a melee weapon attack",
  range: "30 ft",
  components: "W", // W = weapon
  compMaterial: "Melee weapon",
  save: "Cha",
  duration: "1 rnd",
  description:
    "On hit, 4 ED bonus force dmg and save or banished to harmless demiplane until start of my next turn",
  descriptionFull:
    "When you hit a creature with a melee weapon attack, you can expend an Exploit Die to strike with legendary power, dealing bonus force damage equal to four rolls of your Exploit Die. It must succeed on a Charisma saving throw, or be shunted to a harmless demiplane where it is incapacitated. At the start of your next turn it reappears in the unoccupied space nearest to the last space it occupied when you hit it with this attack.",
};

SpellsList["cataclysmic slam"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[5th-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 19;
  },
  prerequisite: "Strength of 19",
  // Regular spell attributes
  name: "Cataclysmic Slam",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)", "barbarian(laserllama)"],
  level: 5,
  school: "Combat",
  time: "1 a",
  range: "30 ft",
  save: "Con",
  duration: "Instantaneous",
  description:
    "All targets within range save or fall prone and take (2*ED spent)+Str dmg (half on save); difficult terrain",
  descriptionFull:
    "As an action on your turn, you can expend Exploit Dice (up to your Proficiency Bonus) to strike the ground with mythicforce. A shockwave ripples out from you, forcing all targetswithin 30 feet to make a Strength saving throw. On a failure,targets take bludgeoning damage equal to twice your ExploitDie for each Exploit Die spent + your Strength modifier andfall prone. On a success, they take half damage and don't fallprone. Objects in this area take maximum damage. \n The area becomes difficult terrain. A creature can spend 1 minute to clear one 5-foot square of this difficult terrain.",
};

SpellsList["contingency plan"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[5th-degree exploits]",
  prereqeval: function (v) {
    return What("Int") >= 19;
  },
  prerequisite: "Intelligence of 19",
  // Regular spell attributes
  name: "Contingency Plan",
  source: ["GMB:LL", 0],
  classes: ["rogue(laserllama)", "warlord(laserllama)"],
  level: 5,
  school: "Craft",
  time: "End of LR",
  range: "Self",
  duration: "Until activated",
  description:
    "At the end of a long rest you craft a contingency plan that can be activated later (see book)",
  descriptionFull:
    "At the end of a long rest, you can expend one of your Exploit Dice to put an undisclosed contingency plan into place. Until you activate this Exploit again you cannot regain this Exploit Die. You can only have one contingency plan at a time." +
    "\n As an action, you can reveal your previously undisclosed plan (which you make up at the time of its reveal) and make a DC 20 Intelligence check. You may add a skill the DM deems appropriate to your plan. On a success, your secret plans and preparations take effect perfectly as you described them." +
    "\n The cost to execute the plan cannot exceed 5,000 gold, and the effects should not exceed those of a 7th-level spell." +
    "\n For example, you might reveal that you secretly purchaseda perfect spell scroll last time you were in a town, or that you paid a mercenary band or airship to come to your rescue.",
};

SpellsList["craft masterwork poison"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[5th-degree exploits]",
  prereqeval: function (v) {
    // Prerequisites: proficiency with poisoner's kit
    if (
      /poisoner.*?/i.test(What("Too Text")) &&
      tDoc.getField("Too Prof").isBoxChecked(0)
    ) {
      return tDoc.getField("Too Exp").isBoxChecked(0) ? "markButDisable" : true;
    } else {
      return (
        CurrentProfs.tool["Poisoner's kit"] ||
        /poisoner.*?/i.test(v.toolProfs.toString())
      );
    }
  },
  prerequisite: "Poisoner's Kit Proficiency",
  // Regular spell attributes
  name: "Craft Masterwork Poison",
  classes: ["rogue(laserllama)"],
  source: ["GMB:LL", 0],
  level: 5,
  school: "Craft",
  time: "1 a",
  range: "Self",
  save: "Con",
  duration: "1 h",
  description: "Craft masterwork poison (see book)",
  descriptionFull:
    "As an action, you expend Exploit Dice (up to your Proficiency Bonus) and use your poisoner's kit to craft one vial of Masterwork Poison. It retains potency until the end of your next long rest. You can't regain your Exploit Dice until this Poison is spent." +
    "\n With the Use an Object action, a creature can apply the vial of poison to a weapon or piece of ammunition. On its next hit, it deals bonus necrotic damage equal to the Exploit Dice spent, and the target must succeed on a Constitution saving throw. On a failure, it has disadvantage on attack rolls, ability checks, and saving throws until a spell of 5th-level or higher (ie: greater restoration) is used to neutralize the poison." +
    "\n If the creature fails by 5 or more, it is Incapacitated, and it cannot move or speak until it is cured of this poison.",
};

SpellsList["final strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[5th-degree exploits (order)]",
  // Regular spell attributes
  name: "Final Strike",
  source: ["GMB:LL", 0],
  classes: ["warlord(laserllama)"],
  level: 5,
  school: "Order",
  time: "1 a",
  range: "30 ft",
  duration: "Instantaneous",
  description:
    "Issue an order to up my Lead mod allies crea to make a full on attacks/spells against the target",
  descriptionFull:
    "As an action you expend one Exploit Die and order allies to strike at a foe of your choice. Creatures of your choice (up your Leadership modifier) within 30 feet that can hear youcan immediately take the Attack action (including Extra Attacks), or cast a spell of 5th-level or lower with a casting time of one action. All attacks and spells must target the creature you designated with this Exploit.",
};

SpellsList["inconceivable dodge"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[5th-degree exploits]",
  prereqeval: function (v) {
    return What("Dex") >= 19;
  },
  prerequisite: "Dexterity of 19",
  // Regular spell attributes
  name: "Inconceivable dodge",
  source: ["GMB:LL", 0],
  classes: ["rogue(laserllama)"],
  level: 5,
  school: "Combat",
  time: "1 rea",
  range: "Self",
  duration: "Instantaneous",
  description:
    "On damage, you move 10 feet avoiding triggering damage as if it never affected you",
  descriptionFull:
    "When you take damage, you can use your reaction to expendone Exploit Die and move with supernatural agility and speedto an unoccupied space within 10 feet, somehow avoiding thetriggering damaging effect as if it never affected you at all.",
};

SpellsList["mortal blow"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[5th-degree exploits]",
  // Regular spell attributes
  name: "Mortal Blow",
  source: ["GMB:LL", 0],
  classes: ["rogue(laserllama)"],
  level: 5,
  school: "Combat",
  time: "Hit",
  timeFull: "On hit with melee weapon",
  range: "Melee",
  components: "W", // W = weapon
  compMaterial: "Melee weapon",
  duration: "Instantaneous",
  save: "Con",
  description:
    "Add 4 ED to dmg; Con save or vurnerable to attack damage; If reduced to 50<= HP... (see book)",
  descriptionFull:
    "When you hit a creature with a melee weapon attack, you canexpend an Exploit Die to strike with supernatural accuracy atits most vulnerable point. It must succeed on a Constitutionsaving throw or it is considered vulnerable to the damage ofthis attack. If you had advantage on your attack roll, it makesthis Constitution save with disadvantage." +
    "\n Regardless if the creature succeeds or fails on this savingthrow, it takes bonus damage equal to four times your ExploitDie. If this attack reduces the target to 50 hit points or fewer,it falls Prone and is Stunned until the start of its next turn." +
    "\n A creature can expend a Legendary Resistance to avoid this effect.",
};

SpellsList["mythic focus"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[5th-degree exploits]",
  // Regular spell attributes
  name: "Mythic Focus",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)"],
  level: 5,
  school: "Combat",
  time: "1 bns",
  range: "Self",
  duration: "Conc, 1 min",
  description:
    "50 temp HP; add ED to Str/Dex/Con save; add ED to dmg (1/round); +1 atk; adv on weap atks",
  descriptionFull:
    "As a bonus action, you can expend one Exploit Die to enter a heightened state of focus, which requires your concentration.While concentrating on this Exploit, you gain these benefits:" +
    "\n\u2022 You gain 50 temporary hit points. If any of these remain when the effects of this Exploit end, they are lost." +
    "\n\u2022 You have advantage on any weapon attacks you make." +
    "\n\u2022 Once per turn when you hit with a weapon attack, you deal bonus damage equal to one roll of your Exploit Die." +
    "\n\u2022 You gain a bonus to Strength, Dexterity, and Constitution saving throws equal to one roll of your Exploit Die." +
    "\n\u2022 When you take the Attack action on your turn, you can make one additional weapon attack as part of that action. " +
    "\nThe effects of this Exploit lasts for up to 1 minute, but theyend early if you are incapacitated or you choose to end them. This Exploit doesn't stack with tenser's transformation.",
};

SpellsList["storm of arrows"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[5th-degree exploits]",
  prereqeval: function (v) {
    return What("Dex") >= 19;
  },
  prerequisite: "Dexterity of 19",
  // Regular spell attributes
  name: "Storm of Arrows",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)"],
  level: 5,
  school: "Combat",
  time: "1 a",
  range: "Attack",
  components: "W", // W = weapon
  compMaterial: "Ranged weapon",
  duration: "Instantaneous",
  description:
    "All crea I choose within 30 ft; Dex saving throw or (2 ED) * ED spent (up to PB) + Dex dmg (half on save)",
  descriptionFull:
    "As an action on your turn, you can expend Exploit Dice (up to your proficiency bonus) to fire a volley of ammunition at a point you can see within the range of your weapon. Creatures of your choice within 30 feet of that point must succeed on a Dexterity saving throw or they take piercing damage equal to two rolls of your Exploit Die for each Exploit Die you spent + your Dexterity modifier. Any creature that succeeds on its saving throw takes half as much piercing damage. You must have enough ammunition to hit each target.",
};

SpellsList["steel wind slash"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[5th-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 19 || What("Dex") >= 19;
  },
  prerequisite: "Strength or Dexterity of 19",
  // Regular spell attributes
  name: "Steel Wind Slash",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)"],
  level: 5,
  school: "Combat",
  time: "1 a",
  range: "30 ft",
  components: "W", // W = weapon
  compMaterial: "Melee weapon",
  duration: "Instantaneous",
  description:
    "Melee attack vs 5 crea in range; (2 ED) * ED spent (up to PB) + Dex/Str dmg; Teleport next to one target",
  descriptionFull:
    "As an action on your turn, you can expend Exploit Dice (up to your Proficiency Bonus) and flourish a melee weapon thenvanish. Choose up to five different targets you can see within30 feet and make a melee weapon attack against each one.\n On a hit, each target takes damage equal to one hit by thatweapon + twice your Exploit Die for each Exploit Die spent.\n You then appear in an unoccupied space of your choice within 5 feet of one of the targets that you hit.",
};

SpellsList["trickster blessing"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[5th-degree exploits]",
  prereqeval: function (v) {
    return What("Dex") >= 19;
  },
  prerequisite: "Dexterity of 19",
  // Regular spell attributes
  name: "Trickster Blessing",
  source: ["GMB:LL", 0],
  classes: ["rogue(laserllama)"],
  level: 5,
  school: "Combat",
  time: "1 a",
  timeFull: "When you take Hide action",
  range: "60 feet",
  duration: "Instantaneous",
  description:
    "When you Hide, you can teleport in a hidden location within range automatically hidden from all crea and spells",
  descriptionFull:
    "When you take the Hide action, you can expend one Exploit Die to hide with inconceivable and supernatural skill. So longas there is a place to hide within 60 feet, you instantly appearin one such hidden location of your choice within 60 feet, andare automatically considered to be hidden from all spells and creatures, no matter what senses or magic they might have.",
};

SpellsList["vorpal strike"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[5th-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 19 || What("Dex") >= 19;
  },
  prerequisite: "Strength or Dexterity of 19",
  // Regular spell attributes
  name: "Vorpal Strike",
  source: ["GMB:LL", 0],
  classes: ["fighter(laserllama)"],
  level: 5,
  school: "Combat",
  time: "Hit",
  timeFull: "On hit with melee weapon",
  range: "Melee",
  components: "W", // W = weapon
  compMaterial: "Melee weapon",
  duration: "Instantaneous",
  description:
    "Add 4 ED to dmg; If <50 HP, cut the crea's head (or use legendary res); If no more head, the crea dies",
  descriptionFull:
    "When you hit a creature with a melee weapon attack, you can expend one Exploit Die to strike with legendary force, dealing additional damage equal to four rolls of your Exploit Die.\nIf the damage of this Exploit reduces the target's remaining hit points to 50 or fewer, you cut off one of the its heads. If the creature cannot survive without the lost head, it is killed.\nCreatures can use a Legendary Resistance to avoid being beheaded. Any creatures that don't have or don't need a head are immune to this Exploit's effects, but still take the damage.",
};

SpellsList["vorpal critical"] = {
  // Exploit exclusive attributes
  isExploit: true,
  submenu: "[5th-degree exploits]",
  prereqeval: function (v) {
    return What("Str") >= 19;
  },
  // Regular spell attributes
  name: "Vorpal Critical",
  source: ["GMB:LL", 0],
  classes: ["barbarian(laserllama)"],
  level: 5,
  school: "Combat",
  time: "Crit",
  timeFull:
    "No action required, when you score a critical hit on a creature with a melee weapon attack",
  components: "W", // W = weapon
  compMaterial: "Weapon attack",
  range: "Weapon",
  duration: "Instantaneous",
  description:
    "Add 3 ED to dmg; If <50 HP, cut the crea's head (or use legendary res); If no more head, the crea dies",
  descriptionFull:
    "When you score a critical hit with a melee attack on a creature, you can expend one Exploit Die to strike with legendary force, dealing additional damage equal to three rolls of your Exploit Die.\nIf the damage of this Exploit reduces the target's remaining hit points to 50 or fewer, you cut off one of the its heads. If the creature cannot survive without the lost head, it is killed.\nCreatures can use a Legendary Resistance to avoid being beheaded. Any creatures that don't have or don't need a head are immune to this Exploit's effects, but still take the damage.",
};

// Spells from LL's spell compendium
// ##### Cantrips ##### \\

SpellsList["acid splash"] = {
  name: "Acid Splash (LL)",
  nameShort: "Acid Splash (LL)",
  regExpSearch: /^(?=.*acid)(?=.*splash).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "magus", "sorcerer", "wizard"],
  level: 0,
  school: "Evoc",
  time: "1 a",
  timeFull: "1 action",
  range: "60 ft",
  rangeMetric: "18 m",
  components: "V,S",
  duration: "Instantaneous",
  save: "Dex",
  description: "5-ft rad all crea or `CD`d6 Acid dmg",
  descriptionCantripDie: "5-ft rad all crea or `CD`d6 Acid dmg",
  descriptionMetric: "1.5-m rad all crea or `CD`d6 Acid dmg",
  descriptionFull:
    "You hurl an orb of caustic acid at a point you can see within range. Creatures within 5 feet of that point must succeed on a Dexterity saving throw or take 1d6 acid damage." +
    AtHigherLevels +
    "The damage of this spell increases by 1d6 at 5th (2d6), 11th (3d6), and 17th level (4d6).",
  firstCol: "6",
  allowUpCasting: false,
  descriptionShorter: "5-ft rad all crea or `CD`d6 Acid dmg",
  descriptionShorterMetric: "1.5-m rad all crea or `CD`d6 Acid dmg",
  dynamicDamageBonus: {
    doNotProcess: true,
    multipleDmgMoments: false,
    allDmgTypesSingleMoment: true,
    extraDmgGroupsSameType: /((?:\+?\d+d?\d*)+)( crit)/i,
  },
};

// Beckon Air
SpellsList["beckon air"] = {
  name: "Beckon Air",
  nameShort: "Beckon Air",
  regExpSearch: /^(?=.*beckon)(?=.*air).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "shaman", "sorcerer", "wizard"],
  level: 0,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "60 ft",
  rangeMetric: "18 m",
  components: "V,S",
  duration: "Instantaneous",
  save: "Str",
  description: "sensory effect // 1 crea or `CD`d6 Thunder dmg",
  descriptionCantripDie: "sensory effect // 1 crea or `CD`d6 Thunder dmg",
  descriptionMetric: "sensory effect // 1 crea or `CD`d6 Thunder dmg",
  descriptionFull:
    "You can manipulate the winds and use them to assault foes. When you cast this spell choose one of the following effects:" +
    "\n   " +
    toUni("Manipulate Air.") +
    " You manipulate the air in a 5-foot cube within range, creating a small sensory effect such as causing leaves to rustle, shutters to slam shut, or clothing to ripple." +
    "\n   " +
    toUni("Hurl Squall") +
    " You create a small wind squall in your hand and hurl it at a target you can see within range, forcing it to make a Strength saving throw. On a failed save, it takes 1d6 thunder damage and a Medium or smaller target is knocked back 10 feet in a straight line." +
    AtHigherLevels +
    "The damage of this Cantrip and the size target it can knock back increases by 1d6 at 5th (2d6, Large), 11th (3d6, Huge), and 17th level (4d6, Gargantuan).",
  firstCol: "6",
  allowUpCasting: false,
  descriptionShorter: "sensory effect // 1 crea or `CD`d6 Thunder dmg",
};

// Booming Blade (LL)
SpellsList["booming blade"] = {
  name: "Booming Blade (LL)",
  nameShort: "Booming Blade (LL)",
  regExpSearch: /^(?=.*booming)(?=.*blade).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "bard", "magus", "sorcerer", "warlock"],
  level: 0,
  school: "Evoc",
  time: "1 bns",
  timeFull: "1 bonus action",
  range: "S",
  rangeMetric: "S",
  components: "V,M",
  compMaterial: "a simple or martial melee weapon",
  duration: "1 round",
  description: "wreathe weapon with thunder // 1 crea or 1d6 Thunder dmg if moves",
  descriptionCantripDie: "wreathe weapon with thunder // 1 crea or 1d6 Thunder dmg if moves",
  descriptionMetric: "wreathe weapon with thunder // 1 crea or 1d6 Thunder dmg if moves",
  descriptionFull: "As a bonus action, you wreathe the melee weapon used in the casting of this spell with thunderous magic. Until the start of your next turn, your attacks with that weapon deal thunder damage in place of the weapon's normal damage type." + "\n    Once per casting when you deal thunder damage with this spell, you can envelop your target in thunderous energy until the start of your next turn. If the target willingly moves 5 feet or more before then, this thunderous energy explodes and it takes 1d6 thunder damage, then the energy dissipates." + AtHigherLevels + "The thunder damage dealt by this spell when the creature moves at least 5 feet increases at 5th level (1d8), 11th level (1d10), and 17th level (1d12).",
  firstCol: "6",
  allowUpCasting: false,
  descriptionShorter: "wreathe weapon with thunder // 1 crea or 1d6 Thunder dmg if moves",
};

// Blade Ward (LL)
SpellsList["blade ward"] = {
  name: "Blade Ward (LL)",
  nameShort: "Blade Ward (LL)",
  regExpSearch: /^(?=.*blade)(?=.*ward).*$/i,
  source: ["GMB:LL", 0],
  classes: ["bard", "magus", "psion(laserllama)", "sorcerer", "warlock", "wizard"],
  level: 0,
  school: "Abju",
  time: "1 bns",
  timeFull: "1 bonus action",
  range: "S",
  rangeMetric: "S",
  components: "V,S",
  duration: "Conc., 1 min",
  description: "1d4 bludgeoning, piercing, slashing damage reduction",
  descriptionCantripDie: "1d4 bludgeoning, piercing, slashing damage reduction",
  descriptionMetric: "bludgeoning, piercing, slashing damage reduction",
  descriptionFull:
    "You trace a sigil of warding into the air. Whenever you take bludgeoning, piercing, or slashing damage for the duration of this spell, you can reduce the damage you would take by 1d4.",
  firstCol: "6",
  allowUpCasting: false,
  descriptionShorter: "1d4 bludgeoning, piercing, slashing damage reduction",
};

// Control Flame (LL)
SpellsList["control flame"] = {
  name: "Control Flame (LL)",
  nameShort: "Control Flame (LL)",
  regExpSearch: /^(?=.*control)(?=.*flame).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "shaman", "wizard", "sorcerer"],
  level: 0,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "60 feet",
  rangeMetric: "18 m",
  components: "V,S",
  duration: "Instantaneous",
  description: "control flames // 60-feet 1 target on hit `CD`d8 Fire dmg",
  descriptionCantripDie:
    "control flames // 60-feet 1 target on hit `CD`d8 Fire dmg",
  descriptionMetric: "control flames // 18-m 1 target on hit `CD`d8 Fire dmg",
  descriptionFull:
    "You can manipulate fire and use it to assault your foes. When you cast this spell choose one of the following effects:" +
    "\n   " +
    toUni("Manipulate Fire.") +
    " You choose nonmagical flame you can see within range and that fits within a 5-foot cube and cause the flame to grow to fill the cube, extinguish all flame within the cube, change its color, or cause simple animated shapes to appear within the flames, such as creatures or locations." +
    "\n   " +
    toUni("Hurl Flame.") +
    " You create a small ball of flickering flame in your hand and hurl it at a target that you can see within range, making a ranged spell attack against it. On hit, it takes 1d8 fire damage. Flammable objects that aren't being worn or carried are ignited when hit by this spell attack." +
    AtHigherLevels +
    " The damage of this Cantrip increases by 1d8 at 5th (2d8), 11th (3d8), and 17th level (4d8).",
  firstCol: "6",
  allowUpCasting: false,
  descriptionShorter:
    "control flames // 60-feet 1 target on hit `CD`d8 Fire dmg",
};

// Friends (LL)
SpellsList["friends"] = {
  name: "Friends (LL)",
  nameShort: "Friends (LL)",
  regExpSearch: /^(?=.*friends).*$/i,
  source: ["GMB:LL", 0],
  classes: ["bard", "psion(laserllama)", "sorcerer", "vessel", "wizard"],
  level: 0,
  school: "Ench",
  time: "1 a",
  timeFull: "1 action",
  range: "S",
  rangeMetric: "S",
  components: "S,M",
  compMaterial: "a small amount of makeup applied to the face as this spell is cast",
  duration: "Conc., 1 min",
  description: "1 crea that can understand and hear you, Wis save or adv on CHA checks",
  descriptionCantripDie: "1 crea that can understand and hear you, Wis save or adv on CHA checks",
  descriptionMetric: "1 crea that can understand and hear you, Wis save or adv on CHA checks",
  descriptionFull: "You lace your words with soothing magic and force a creature of your choice that can hear and understand you to make a Wisdom saving throw. On a failure, you have advantage on all Charisma checks directed at that creature for the duration." + "\n   On a successful save, the creature realizes that you used magic to attempt to influence it and becomes hostile toward you. A creature prone to violence might attack you, and other creatures might seek retribution against you in other ways.",
  firstCol: "6",
  allowUpCasting: false,
  descriptionShorter: "1 crea that can understand and hear you, Wis save or adv on CHA checks", // Correggere la descrizione
};

// Glitterbeam
SpellsList["glitterbeam"] = {
  name: "Glitterbeam",
  nameShort: "Glitterbeam",
  regExpSearch: /^(?=.*glitterbeam).*$/i,
  source: ["GMB:LL", 0],
  classes: ["bard", "magus", "vessel"],
  level: 0,
  school: "Evoc",
  time: "1 a",
  timeFull: "1 action",
  range: "120 feet",
  rangeMetric: "36 m",
  components: "V,S",
  duration: "Instantaneous",
  description: "120-feet 1 target on hit `CD`d8 Radiant dmg and dis on stealth",
  descriptionCantripDie:
    "120-feet 1 target on hit `CD`d8 Radiant dmg and dis on stealth",
  descriptionMetric:
    "36-m 1 target on hit `CD`d8 Radiant dmg and dis on stealth",
  descriptionFull:
    "You project a beam of twinkling lights at a creature or object within range. Make a ranged spell attack against the target." +
    "\n   On a hit, it takes 1d8 radiant damage. Until a creature uses an action to remove the glitter, a target hit by this spell emits bright light in a 5-foot radius and has disadvantage on any Dexterity (Stealth) checks it makes to hide or conceal itself." +
    AtHigherLevels +
    " The damage of this spell increases by 1d8 at 5th (2d8), 11th (3d8), and 17th level (4d8).",
  firstCol: "6",
  allowUpCasting: false,
  descriptionShorter:
    "120-feet 1 target on hit `CD`d8 Radiant dmg and dis on stealth",
};

// Green-Flame Blade (LL)
SpellsList["green-flame blade"] = {
  name: "Green-Flame Blade (LL)",
  nameShort: "G.F. Blade (LL)",
  regExpSearch: /^(?=.*green)(?=.*flame)(?=.*blade).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "magus", "sorcerer", "warlock"],
  level: 0,
  school: "Evoc",
  time: "1 bns",
  timeFull: "1 bonus action",
  range: "S",
  rangeMetric: "S",
  components: "V,M",
  compMaterial: "a simple or martial melee weapon",
  duration: "Instantaneous",
  description: "wreathe weapon, on hit 5-feet another crea Fire damage once",
  descriptionCantripDie:
    "wreathe weapon, on hit 5-feet another crea Fire damage once",
  descriptionMetric:
    "wreathe weapon, on hit 1.5-m another crea Fire damage once",
  descriptionFull:
    "As a bonus action, you wreathe the melee weapon used in the casting of this spell with emerald flames. Until the start of your next turn, your attacks with that weapon deal fire damage in place of the weapon's normal damage type." +
    "\nOnce per casting when you deal fire damage with this spell, you can cause the flames to leap to another creature you can see within 5 feet of your target, dealing 1d6 fire damage to it." +
    AtHigherLevels +
    " The fire damage dealt to the second creature by this spell increases at 5th level (1d8), 11th level (1d10), and 17th level (1d12).",
  firstCol: "6",
  allowUpCasting: false,
  descriptionShorter:
    "wreathe weapon, on hit 1.5-m another crea Fire damage once",
};

// Guidance (LL)
SpellsList["guidance"] = {
  name: "Guidance (LL)",
  nameShort: "Guidance (LL)",
  regExpSearch: /^(?=.*guidance).*$/i,
  source: ["GMB:LL", 0],
  classes: ["bard", "cleric", "druid", "psion(laserllama)", "shaman", "wizard"],
  level: 0,
  school: "Div",
  time: "1 a",
  timeFull: "1 action",
  range: "Touch",
  rangeMetric: "Touch",
  components: "V,S",
  duration: "Conc., 1 min",
  description: "touch another crea, bonus on chosen skill",
  descriptionCantripDie: "touch another crea, bonus on chosen skill",
  descriptionMetric: "touch another crea, bonus on chosen skill",
  descriptionFull:
    "You touch another creature and infuse it with otherworldly knowledge of a skill of your choice. For the duration, it gains a 1d4 bonus to any ability checks it makes with that skill." +
    "\nIf you are proficient in the skill, this bonus becomes 1d6.",
  allowUpCasting: false,
  descriptionShorter: "touch another crea, bonus on chosen skill",
};

// Lightning Lure (LL)
SpellsList["lightning lure"] = {
  name: "Lightning Lure (LL)",
  nameShort: "L. Lure (LL)",
  regExpSearch: /^(?=.*lightning)(?=.*lure).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "magus", "sorcerer", "vessel", "warlock", "wizard"],
  level: 0,
  school: "Evoc",
  time: "1 att",
  timeFull: "1 attack",
  range: "S:15ftradius",
  rangeMetric: "S:4.5-m radius",
  components: "V",
  duration: "Instantaneous",
  description: "1 crea in range, Str save or 1d8 Lightning dmg and drag 10 ft",
  descriptionCantripDie: "1 crea in range, Str save or 1d8 Lightning dmg and drag 10 ft",
  descriptionMetric: "1 crea in range, Str save or 1d8 Lightning dmg and drag 3 m",
  descriptionFull: "You create a lash of arcane lightning and strike at a creature of your choice you can see within 15 feet. It must succeed on a Strength saving throw or take 1d8 lightning damage and be pulled in a straight line up to 10 feet toward you." + AtHigherLevels + " The range of this spell increases at 5th level (20 feet), 11th level (25 feet), and 17th level (30 feet).",
  allowUpCasting: false,
  descriptionShorter: "1 crea in range, Str save or 1d8 Lightning dmg and drag 10 ft",
};

// Mind Thrust (LL)
SpellsList["mind thrust"] = {
  name: "Mind Thrust (LL)",
  nameShort: "Mind Thrust (LL)",
  regExpSearch: /^(?=.*mind)(?=.*thrust).*$/i,
  source: ["GMB:LL", 0],
  classes: ["psion(laserllama)"],
  level: 0,
  school: "Evoc",
  time: "1 a",
  timeFull: "1 action",
  range: "120 feet",
  rangeMetric: "36 m",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "120-feet 1 crea, on hit `CD`d10 Psychic dmg and no reaction until start your next turn",
  descriptionCantripDie:
    "120-feet 1 crea, on hit `CD`d10 Psychic dmg and no reaction until start your next turn",
  descriptionMetric:
    "36-m 1 crea, on hit `CD`d10 Psychic dmg and no reaction until start your next turn",
  descriptionFull:
    "You assault the mind of a creature within range with a torrent of psionic power. Make a ranged spell attack against the target." +
    "\nOn hit, the creature takes 1d10 psychic damage and it cannot take reactions until the start of your next turn." +
    AtHigherLevels +
    " This spell’s damage increases by 1d10 at 5th level (2d10), 11th level (3d10), and 17th level (4d10).",
  allowUpCasting: false,
  descriptionShorter:
    "120-feet 1 crea, on hit `CD`d10 Psychic dmg and no reaction until start your next turn",
};

// Mold Earth (LL)
SpellsList["mold earth"] = {
  name: "Mold Earth (LL)",
  nameShort: "Mold Earth (LL)",
  regExpSearch: /^(?=.*mold)(?=.*earth).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "shaman", "sorcerer", "wizard"], // Correggere le classi
  level: 0,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "60 feet",
  rangeMetric: "18 m",
  components: "V,S",
  duration: "Instantaneous",
  description: "manipulate earth // 1 target, on hit `CD`d6 Bludgeoning/Piercing dmg and prone if Small or smaller",
  descriptionCantripDie: "manipulate earth // 1 target, on hit `CD`d6 Bludgeoning/Piercing dmg and prone if Small or smaller",
  descriptionMetric: "manipulate earth // 1 target, on hit `CD`d6 Bludgeoning/Piercing dmg and prone if Small or smaller",
  descriptionFull: "You can manipulate the earth and use it to assault your foes. When you cast this spell choose one of the following effects:" +
    "\n" + toUni("Manipulate Earth") + " You manipulate loose earth and stone in a 5-foot cube within range, harmlessly excavating, moving, and depositing it up to 5 feet away, changing it into difficult terrain, or changing difficult terrain into normal terrain." +
    "\n" + toUni("Hurl Stone") + " You create a small ball of loose stone and dirt in your hand and hurl it at a target you can see within range, making a ranged spell attack against it. On hit, it takes your choice of either 1d6 bludgeoning or piercing damage, and if the target is Small or smaller it is knocked prone." +
    AtHigherLevels + " The damage of this Cantrip and the size of targets that it knocks prone increases by 1d6 at 5th (2d6, Medium), 11th (3d6, Large), and 17th level (4d6, Huge).",
  allowUpCasting: false,
  descriptionShorter: "manipulate earth // 1 target, on hit `CD`d6 Bludgeoning/Piercing dmg and prone if Small or smaller",
};

// Mystic Hammer (LL)
SpellsList["mystic hammer"] = {
  name: "Mystic Hammer (LL)",
  nameShort: "Mystic Hammer (LL)",
  regExpSearch: /^(?=.*mystic)(?=.*hammer).*$/i,
  source: ["GMB:LL", 0],
  classes: ["psion(laserllama)"],
  level: 0,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "60 feet",
  rangeMetric: "18 m",
  components: "V,S",
  duration: "Instantaneous",
  description: "1 crea, Str save or `CD`d6 Force damage and prone",
  descriptionCantripDie: "1 crea, Str save or `CD`d6 Force damage and prone",
  descriptionMetric: "1 crea, Str save or `CD`d6 Force damage and prone",
  descriptionFull:
    "You batter a creature within range with psionic force, forcing it to make a Strength saving throw. On a failed save, it takes 1d6 force damage and is knocked prone. Large and larger creatures have advantage on this Strength saving throw." +
    AtHigherLevels +
    " The damage of this Cantrip and the size of creature that makes the saving throw normally grows at 5th level (2d6, Large), 11th level (3d6, Huge), and 17th level (4d6).",
  allowUpCasting: false,
  descriptionShorter: "1 crea, Str save or `CD`d6 Force damage and prone",
};

// Otherworldly Grasp
SpellsList["otherworldly grasp"] = {
  name: "Otherworldly Grasp (LL)",
  nameShort: "Otherworldly Grasp (LL)",
  regExpSearch: /^(?=.*otherworldly)(?=.*grasp).*$/i,
  source: ["GMB:LL", 0],
  classes: ["shaman", "sorcerer", "vessel", "warlock"], // Correggere le classi
  level: 0,
  school: "Necro",
  time: "1 a",
  timeFull: "1 action",
  range: "S",
  components: "S, M",
  compMaterial: "an empty hand",
  duration: "Instantaneous",
  description: "1 crea, on hit 1d8 Necrotic dmg, gain temp HP = 1/2 dmg dealt",
  descriptionCantripDie: "1 crea, on hit `CD`d8 Necrotic dmg, gain temp HP = 1/2 dmg dealt",
  descriptionMetric: "1 crea, on hit `CD`d8 Necrotic dmg, gain temp HP = 1/2 dmg dealt",
  descriptionFull: "You channel necrotic spiritual power to your hand, changing it into a withered specter of itself. Make a melee spell attack against one creature within your reach. On a hit, it takes 1d8 necrotic damage, and you can choose to gain temporary hit points equal to half the necrotic damage dealt." + AtHigherLevels + " The damage of this spell increases by 1d8 at 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
  allowUpCasting: false,
  descriptionShorter: "1 crea, on hit `CD`d8 Necrotic dmg, gain temp HP = 1/2 dmg dealt",
};

// Poison Spray (LL)
SpellsList["poison spray"] = {
  name: "Poison Spray (LL)",
  nameShort: "Poison Spray (LL)",
  regExpSearch: /^(?=.*poison)(?=.*spray).*$/i,
  source: ["GMB:LL", 0],
  classes: [
    "artificer",
    "druid",
    "magus",
    "shaman",
    "sorcerer",
    "warlock",
    "wizard",
  ],
  level: 0,
  school: "Necro",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  rangeMetric: "9 m",
  components: "V,S",
  duration: "Instantaneous",
  description: "1 crea, on hit `CD`d12 Poison dmg",
  descriptionCantripDie: "1 crea, on hit `CD`d12 Poison dmg",
  descriptionMetric: "1 crea, on hit `CD`d12 Poison dmg",
  descriptionFull:
    "You raise your hand and project a toxic mist at a creature you can see within range. Make a ranged spell attack against the target. On a hit, the target takes 1d12 poison damage." +
    AtHigherLevels +
    " The damage of this spell increases by 1d12 at 5th level (2d12), 11th level (3d12), and 17th level (4d12).",
  allowUpCasting: false,
  descriptionShorter: "1 crea, on hit `CD`d12 Poison dmg",
};

// Primal Savagery (LL)
SpellsList["primal savagery"] = {
  name: "Primal Savagery (LL)",
  nameShort: "Primal Savagery (LL)",
  regExpSearch: /^(?=.*primal)(?=.*savagery).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "shaman"],
  level: 0,
  school: "Trans",
  time: "1 a", // Cambiare da "1 att" a "1 a" per consistency
  timeFull: "1 action",
  range: "S",
  components: "S, M",
  compMaterial: "an empty hand",
  duration: "Instantaneous",
  description: "claws until next turn, on hit 1d6 Slashing dmg + spell mod",
  descriptionCantripDie: "claws until next turn, on hit 1d6 Slashing dmg + spell mod",
  descriptionMetric: "claws until next turn, on hit 1d6 Slashing dmg + spell mod",
  descriptionFull: "Your fingers transform into sharp claws until the start of your next turn. As part of the action used to cast this spell you can make a melee spell attack with these claws. On hit, they deal slashing damage equal to 1d6 + your spellcasting modifier." + AtHigherLevels + " The number of attacks you make with the claws as part of the action to cast this spell increases at 5th level (two), 11th level (three), and 17th level (four).",
  allowUpCasting: false,
  descriptionShorter: "claws until next turn, on hit 1d6 Slashing dmg + spell mod",
};

// Psionic Strike
SpellsList["psionic strike"] = {
  name: "Psionic Strike",
  nameShort: "Psionic Strike",
  regExpSearch: /^(?=.*psionic)(?=.*strike).*$/i,
  source: ["GMB:LL", 0],
  classes: ["psion(laserllama)"],
  level: 0,
  school: "Evoc",
  time: "1 att",
  timeFull: "1 attack",
  range: "S",
  components: "S, M",
  compMaterial: "an empty hand",
  duration: "Instantaneous",
  description: "1 target, on hit Psychic dmg instead of normal dmg",
  descriptionCantripDie: "1 target, on hit Psychic dmg instead of normal dmg",
  descriptionMetric: "1 target, on hit Psychic dmg instead of normal dmg",
  descriptionFull:
    "As part of an unarmed strike, you manifest a blade of psionic energy in your hand. On hit, the target takes psychic damage equal to 1d6 + your Strength modifier, in place of the normal damage of your unarmed strike. Your hand instantly reverts to its normal appearance after your attack." +
    AtHigherLevels +
    " The damage die of this spell increases at 5th level (1d8), 11th level (1d10), and 17th level (1d12).",
  allowUpCasting: false,
  descriptionShorter: "1 target, on hit Psychic dmg instead of normal dmg",
};

// Resistance (LL)
SpellsList["resistance"] = {
  name: "Resistance (LL)",
  nameShort: "Resistance (LL)",
  regExpSearch: /^(?=.*resistance).*$/i,
  source: ["GMB:LL", 0],
  classes: ["bard", "cleric", "druid", "magus", "wizard"],
  level: 0,
  school: "Abju",
  time: "1 a",
  timeFull: "1 action",
  range: "Touch",
  components: "V,S",
  duration: "Conc., 1 min",
  description: "1 crea, 1d4 bonus to 1 save per turn",
  descriptionCantripDie: "1 crea, 1d4 bonus to 1 save per turn",
  descriptionMetric: "1 crea, 1d4 bonus to 1 save per turn",
  descriptionFull: "You weave a protective mantle of magic around one willing creature you touch. Once per turn, when the target is forced to make a saving throw, it can gain a 1d4 bonus to its roll.",
  allowUpCasting: false,
  descriptionShorter: "1 crea, 1d4 bonus to 1 save per turn",
};

// Seance
SpellsList["seance"] = {
  name: "Seance",
  nameShort: "Seance",
  regExpSearch: /^(?=.*seance).*$/i,
  source: ["GMB:LL", 0],
  classes: ["shaman"],
  level: 0,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  rangeMetric: "9 m",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "Create harmless sensory effects, reveal ley lines, or a mote points to spiritual power or death",
  descriptionCantripDie:
    "Create harmless sensory effects, reveal ley lines, or a mote points to spiritual power or death",
  descriptionMetric:
    "Create harmless sensory effects, reveal ley lines, or a mote points to spiritual power or death",
  descriptionFull:
    "You channel minor spirits, allowing them to work through you so that they may once again affect change in the material world. You create one of the following effects within range:\n\n" +
    "- You create an instantaneous, harmless sensory effect, such as a flickering azure flame, an unnaturally chill breeze, rhythmic chanting, or the smell of incense.\n" +
    "- A minor spirit briefly appears and fades away.\n" +
    "- You instantaneously light or snuff out a candle, torch, or a small campfire.\n" +
    "- A mote of iridescent light points to the closest place of spiritual power, recent death, or new birth.\n" +
    "- Ley lines within range briefly reveal themselves as they flicker with otherworldly light.",
  allowUpCasting: false,
  descriptionShorter:
    "Create harmless sensory effects, reveal ley lines, or a mote points to spiritual power or death",
};

// Shape Water (LL)
SpellsList["shape water"] = {
  name: "Shape Water (LL)",
  nameShort: "Shape Water (LL)",
  regExpSearch: /^(?=.*shape)(?=.*water).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "shaman", "wizard", "sorcerer"],
  level: 0,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "60 feet",
  rangeMetric: "18 m",
  components: "V,S",
  duration: "Instantaneous",
  description: "Manipulate water // 1 crea, Dex save or `CD`d8 Cold dmg",
  descriptionCantripDie:
    "Manipulate water // 1 crea, Dex save or `CD`d8 Cold dmg",
  descriptionMetric: "Manipulate water // 1 crea, Dex save or `CD`d8 Cold dmg",
  descriptionFull:
    "You can manipulate water and use it to assault your enemies. When you cast this spell, choose one of the following effects:" +
    "\n   " +
    toUni("Manipulate Water.") +
    " You manipulate water in a 5-foot cube within range, harmlessly changing the direction it is flowing, altering its color or opacity, causing simple animated shapes to appear, or if there are no creatures in it, you can freeze it.\n" +
    "\n   " +
    toUni("Hurl Wave.") +
    " You create a small orb of tempestuous water in your hand and hurl it at one target you can see within range, forcing it to make a Dexterity saving throw. On a failed save, the target takes 1d8 cold damage, and any non-magical flame it is holding or within 5 feet of it is instantly extinguished." +
    AtHigherLevels +
    " The damage of this Cantrip increases by 1d8 at 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
  allowUpCasting: false,
  descriptionShorter: "Manipulate water // 1 crea, Dex save or `CD`d8 Cold dmg",
};

// Sword Burst (LL)
SpellsList["sword burst"] = {
  name: "Sword Burst (LL)",
  nameShort: "S. Burst (LL)",
  regExpSearch: /^(?=.*sword)(?=.*burst).*$/i,
  source: ["GMB:LL", 0],
  classes: ["magus", "warlock", "psion(laserllama)"],
  level: 0,
  school: "Abj",
  time: "1 att",
  timeFull: "1 attack",
  range: "S",
  components: "V,S",
  duration: "Instantaneous",
  description: "5-ft radius all creas, Dex save or Slashing dmg",
  descriptionCantripDie: "5-ft radius all creas, Dex save or Slashing dmg",
  descriptionMetric: "5-ft radius all creas, Dex save or Slashing dmg",
  descriptionFull:
    "You conjure a defensive ring of spectral blades that sweep around you. Creatures within 5 feet of you must succeed on a Dexterity saving throw or take 1d6 slashing damage." +
    AtHigherLevels +
    " The damage die of this spell increases at 5th level (1d8), 11th level (1d10), and 17th level (1d12).",
  allowUpCasting: false,
  descriptionShorter: "5-ft radius all creas, Dex save or Slashing dmg",
};

SpellsList["tempestuous blade"] = {
  name: "Tempestuous Blade (LL)",
  nameShort: "Tempestuous Blade (LL)",
  regExpSearch: /^(?=.*tempestuous)(?=.*blade).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "magus", "warlock"],
  level: 0,
  school: "Evoc",
  time: "1 bonus action",
  timeFull: "1 bonus action",
  range: "S",
  components: "V,M",
  compMaterial: "a simple or martial melee weapon",
  duration: "1 round",
  description: "infuse weapon, trigger for lightning dmg",
  descriptionCantripDie: "infuse weapon, trigger for lightning dmg",
  descriptionMetric: "infuse weapon, trigger for lightning dmg",
  descriptionFull:
    "As a bonus action, you infuse the melee weapon used in the casting of this spell with electrified magic. Until the start of your next turn, your attacks with that weapon deal lightning damage in place of the weapon's normal damage type.\n   " +
    "Once per casting, when you deal lightning damage with this spell, you can infuse your target with an electrical charge until the start of your next turn. If the target uses a reaction of any kind before then, this tempestuous charge is unleashed, and it takes 1d6 lightning damage." +
    AtHigherLevels +
    " The lightning damage dealt by this spell when the target uses its reaction increases at 5th level (1d8), 11th level (1d10), and 17th level (1d12).",
  allowUpCasting: false,
  descriptionShorter: "infuse weapon, trigger for lightning dmg",
};

SpellsList["true strike"] = {
  name: "True Strike (LL)",
  nameShort: "T. Strike (LL)",
  regExpSearch: /^(?=.*true)(?=.*strike).*$/i,
  source: ["GMB:LL", 0],
  classes: ["bard", "magus", "psion(laserllama)", "warlock", "wizard"],
  level: 0,
  school: "Div",
  time: "1 bonus action",
  timeFull: "1 bonus action",
  range: "S",
  components: "S,M",
  compMaterial: "a melee weapon worth at least 1 sp",
  duration: "Conc., 1 rnd",
  description: "Add bonus to your next melee attack roll",
  descriptionCantripDie: "Add bonus to your next melee attack roll",
  descriptionMetric: "Add bonus to your next melee attack roll",
  descriptionFull:
    "You infuse your weapon with divination magic and point it at one creature you can see. The next time you make a melee attack with this weapon against that target before the start of your next turn, you add 1d4 to your attack roll." +
    AtHigherLevels +
    " This spell's attack roll bonus increases when you reach 5th level (1d6), 11th level (1d8), and 17th level (1d10).",
  allowUpCasting: false,
  descriptionShorter: "Add bonus to your next melee attack roll",
};

SpellsList["vicious mockery"] = {
  name: "Vicious Mockery (LL)",
  nameShort: "Vicious Mockery (LL)",
  regExpSearch: /^(?=.*vicious)(?=.*mockery).*$/i,
  source: ["GMB:LL", 0],
  classes: ["bard"],
  level: 0,
  school: "Ench",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  components: "V",
  duration: "Instantaneous",
  description:
    "1 crea that can hear and understand, Wis save or `CD`d6 psychic dmg and disv on attack others",
  descriptionMetric:
    "1 crea that can hear and understand, Wis save or `CD`d6 psychic and dmg disv on attack others",
  descriptionFull:
    "You unleash a string of provoking words at a creature that can hear and understand you within range. The target must succeed on a Wisdom saving throw, or it takes 1d6 psychic damage and has disadvantage on every attack roll against targets other than you until the start of your next turn." +
    AtHigherLevels +
    " This spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
  allowUpCasting: false,
  descriptionShorter:
    "1 crea that can hear and understand, Wis save or `CD`d6 psychic and dmg disv on attack others",
};

// ##### 1st Level Spells ##### \\

SpellsList["arcane lance"] = {
  name: "Arcane Lance (LL)",
  nameShort: "Arcane Lance (LL)",
  regExpSearch: /^(?=.*arcane)(?=.*lance).*$/i,
  source: ["GMB:LL", 0],
  classes: ["magus", "wizard"],
  level: 1,
  school: "Evoc",
  time: "1 a",
  timeFull: "1 action",
  range: "90 feet",
  rangeMetric: "27 m",
  components: "V,S,M",
  compMaterial: "a clear 1-inch crystal",
  duration: "Instantaneous",
  description: "1 target, on hit 5d4 Force dmg",
  descriptionMetric: "1 target, on hit 5d4 Force dmg",
  descriptionFull:
    "You conjure a lance of pure arcane energy in your hand and make a ranged spell attack against a creature you can see within range. On a hit, the target takes 5d4 force damage." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 2d4 for each slot level above 1st.",
  allowUpCasting: true,
  descriptionShorter: "1 target, on hit 5d4 Force dmg",
};

SpellsList["beast bond"] = {
  name: "Beast Bond (LL)",
  nameShort: "Beast Bond (LL)",
  regExpSearch: /^(?=.*beast)(?=.*bond).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "ranger"],
  level: 1,
  school: "Div",
  time: "1 a",
  timeFull: "1 action",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "saliva from both you and the target",
  duration: "1 hour",
  description: "Telepathy with a Beast, it has adv, against targets I can see within 5ft",
  descriptionFull:
    "You touch a Beast that is either friendly or Charmed by you and establish a mental link with it. This spell automatically fails if the Beast's Intelligence is 4 or higher." +
    "\n For the duration, your minds are linked so long as you can see each other. You can communicate telepathically through this link, even if you do not share a language. Lastly, the link grants the Beast advantage on attack rolls against any target you can see within 5 feet of you." +
    "\n If you cast this spell on another Beast, previous instancesof this spell are immediately dispelled.",
  descriptionShorter: "Telepathy with a Beast, adv. attacks",
};

SpellsList["compelled duel"] = {
  name: "Compelled Duel (LL)",
  nameShort: "Compelled Duel (LL)",
  regExpSearch: /^(?=.*compelled)(?=.*duel).*$/i,
  source: ["GMB:LL", 0],
  classes: ["paladin"],
  level: 1,
  school: "Ench",
  time: "1 bns",
  timeFull: "1 bonus action",
  range: "30 feet",
  rangeMetric: "9 m",
  components: "V",
  duration: "1 min",
  description: "Challenge a crea to duel, It has disadv. attacking all but me",
  descriptionFull:
    "You utter a challenge infused with divine authority, targeting one creature within range that can both hear and understand you. For the duration, it has disadvantage on attacks against targets other than you, it cannot willingly move more than 30feet from you, and if it casts a spell that targets creatures you must be one of the targets of that spell." +
    "\n At the end of each of its turns, the creature can make a Wisdom saving throw, ending this effect on a success." +
    "\n The spell also ends early if you cast this spell again, if you attack or force another creature to make an ability check or asaving throw, if you are Incapacitated, or if your allies attack the target or force it to make an ability check or saving throw.",
  descriptionShorter: "Challenge a crea to duel, It has disadv. attacking all but me",
};

SpellsList["conjure familiar"] = {
  name: "Conjure Familiar (LL)",
  nameShort: "Conjure Familiar (LL)",
  regExpSearch: /^(?=.*conjure)(?=.*familiar).*$/i,
  source: ["GMB:LL", 0],
  classes: ["wizard"],
  level: 1,
  school: "Conj",
  ritual: true,
  time: "1 h",
  timeFull: "1 hour",
  range: "10 feet",
  rangeMetric: "3 m",
  components: "V,S,M",
  compMaterial: "(a drop of the spellcaster's blood, consumed by the spell)",
  duration: "Instantaneous",
  description: "Conjure a familiar (see book)",
  descriptionFull: desc([
    "Offering a drop of blood, reduce your maximum hit points by 1 to conjure a Familiar. It is Friendly to you and it obeys your commands. Your Familiar uses the following rules:",
    " \x1bStatistics.\x1b Your Familiar manifests as a CR 0 Beast of your choice, but its creature type is Celestial, Fey, or Fiend. Familiars often reflect the true nature of the caster's soul in appearance and alignment. You can only have one Familiar, but you can perform the ritual again to change its form.",
    " \x1bControl.\x1b In combat, the Familiar shares your initiative and acts during your turn. It cannot attack, but can otherwise act normally. If it drops to 0 hit points your Familiar is destroyed. If it is destroyed, you regain the maximum hit points spent in its creation at the end of your next long rest.",
    " \x1bDismissal.\x1b As an action, you can shunt your Familiar to a unique pocket dimension, or dismiss it forever. As an action, you can recall your Familiar from its pocket dimension, and it reappears in an unoccupied space you can see within 10 ft.",
    " \x1bSoul Bound.\x1b While your Familiar is within 100 ft., you can communicate with it Telepathically. As an action, you can use your Familiar's senses in place of your own until you end this effect (no action required) or you are Incapacitated. While you do so, you are blind and deaf to your own surroundings.",
    " \x1bSpellcasting.\x1b When you cast a spell with a range of touch and your Familiar is within 100 ft., your Familiar can use its reaction to deliver that spell using your Spellcasting ability.",
  ]),
  descriptionShorter: "Conjure a familiar (see book)",
};

SpellsList["create snare"] = {
  name: "Create Snare (LL)",
  nameShort: "Create Snare (LL)",
  regExpSearch: /^(?=.*create)(?=.*snare).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "druid", "ranger", "wizard"],
  level: 1,
  school: "Abj",
  time: "1 a",
  timeFull: "1 action",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "30 feet of cord or rope, which is consumed by the spell",
  duration: "disp/trigg",
  durationFull: "Until dispelled or triggered",
  description: "Create trap; Dex save or trapped",
  descriptionFull:
    "You infuse a length of cord or rope with magic, transformingit into a magic Snare, pointing it toward an unoccupied space you can see within 30 feet. It unfurls in that space and turnsinvisible. It can only be detected by a successful Investigationcheck against your Spell save DC." +
    "\n The first Small or larger creature to move into that spacetriggers your Snare and must make a Dexterity saving throwor fall Prone in its space and be Restrained by the Snare. If acreature is unaware of the Snare, it makes this saving throwwith disadvantage. If a creature is in the space when you setthe Snare, the Snare is instantly triggered." +
    "\n A Restrained creature makes a Strength saving throw atthe end of each of its turns, escaping the Snare on a success.Another creature can use its action to touch the Restratinedcreature make a Strength check against your Spell save DC,destroying the Snare on a success."
    + AtHigherLevels +
    "If you cast this spell using a 2nd levelspell slot, the Snare deals 2d6 slashing damage whenever acreature fails a saving throw to avoid or escape the Snare." +
    "\n If you cast this spell using a spell slot of 3rd-level or higher,this damage increases by 1d6 for each slot level above 2nd.",
  allowUpCasting: true,
  descriptionShorter: "Create trap; Dex save or trapped",
};

SpellsList["create water"] = {
  name: "Create Water (LL)",
  nameShort: "Create Water (LL)",
  regExpSearch: /^(?=.*create)(?=.*water).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "ranger"],
  level: 1,
  school: "Trans",
  time: "1 min",
  timeFull: "1 minute",
  range: "30 feet",
  components: "V,S,M",
  compMaterial: "a drop of water if creating water, or a grain of sand if destroying water",
  duration: "Instantaneous",
  description: "Create or destroy 10(per level) gallons of water",
  descriptionFull: "You create up to 10 gallons of clean water within range. The water appears in open containers you can see, or falls as rain in a 30-foot radius centered on you, extinguishing all flames."
    + toUni("Inverse Casting.") + "You can use this spell to destroy water. You destroy up to 10 gallons of water in open containers in range, or destroy fog in a 30-foot radius centered on you."
    + AtHigherLevels +
    "If you cast this spell with a spell slot of 2nd level or higher, you can create (or destroy) an additional 10 gallons of water, or the radius of this spell effect increases by 10 feet, for each slot level above 1st.",
  allowUpCasting: true,
  descriptionShorter: "Create or destroy 10(per level) gallons of water",
};

SpellsList["divine favor"] = {
  name: "Divine Favor (LL)",
  nameShort: "Divine Favor (LL)",
  regExpSearch: /^(?=.*divine)(?=.*favor).*$/i,
  source: ["GMB:LL", 0],
  classes: ["paladin"],
  level: 1,
  school: "Evoc",
  time: "1 bns",
  timeFull: "1 bonus action",
  range: "S",
  components: "V,S",
  duration: "Conc., 1 min",
  description:
    "Your prayer empowers one weapon of your choice within 10 feet of you with divine radiance. Until the spell ends, attacks with that weapon deal an extra 1d4 radiant damage on a hit.",
  descriptionCantripDie:
    "Your prayer empowers one weapon of your choice within 10 feet of you.",
  descriptionMetric:
    "Your prayer empowers one weapon of your choice within 10 feet of you.",
  descriptionFull:
    "Your prayer empowers one weapon of your choice within 10 feet of you with divine radiance. Until the spell ends, attacks with that weapon deal an extra 1d4 radiant damage on a hit." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 2nd level or higher, you target one additional weapon within 10 feet of you for each slot level above 1st.",
  allowUpCasting: true,
  descriptionShorter: "Empowers a weapon to deal an extra 1d4 radiant dmg.",
};

SpellsList["ensnaring strike"] = {
  name: "Ensnaring Strike (LL)",
  nameShort: "Ensnare Str. (LL)",
  regExpSearch: /^(?=.*ensnaring)(?=.*strike).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "ranger"],
  level: 1,
  school: "Conj",
  time: "On hit",
  timeFull: "On hit",
  range: "Self",
  components: "V,M",
  compMaterial: "a weapon worth at least 1 sp",
  duration: "Conc., 1 min",
  description: "On hit, target Str save or restrained and takes 1d6 piercing damage each turn",
  descriptionFull: "When you hit a creature with a weapon attack, you can cause the point of impact to explode with a writhing mass of thorny vines. The target must succeed on a Strength saving throw or be restrained by the vines until the spell ends. Creatures that are Large or larger have advantage on this saving throw. The restrained creature takes 1d6 piercing damage at the start of each of its turns. The restrained creature, or another creature within 5 feet, can use its action to make a Strength check against your Spell save DC, freeing it on a success." + AtHigherLevels + " When you cast this spell using a spell slot of 2nd level or higher, the damage it takes at the start of each turn increases by 1d6 for each slot level above 1st.",
  allowUpCasting: true
};

SpellsList["ethereal anchor"] = {
  name: "Ethereal Anchor",
  nameShort: "Eth. Anchor",
  regExpSearch: /^(?=.*ethereal)(?=.*anchor).*$/i,
  source: ["GMB:LL", 0],
  classes: ["paladin", "psion(laserllama)", "vessel"],
  level: 1,
  school: "Evoc",
  time: "1 a",
  timeFull: "1 action",
  range: "60 feet",
  components: "V,S,M",
  compMaterial: "a silver nail",
  duration: "Conc., 1 min",
  description:
    "Ranged spell attack; 3d6 radiant dmg. On hit, target's speed is reduced to 0 for the duration.",
  descriptionMetric:
    "Ranged spell attack; radiant dmg. On hit, target's speed is reduced to 0 for the duration.",
  descriptionFull:
    "You hurl a bolt of pure spirit at a creature within range. Make a ranged spell attack against your target. On hit, it takes 3d6 radiant damage and for the duration, its speed is reduced to 0 as it is pinned in place by the spiritual bolt. As an action, any creature can make a Strength ability check against your Spell save DC, ending this spell's effects on a success." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 2nd level or higher, the radiant damage increases by 1d6 for each slot level above 1st.",
  allowUpCasting: true,
  descriptionShorter:
    "Ranged spell attack; radiant dmg. On hit, target's speed is reduced to 0 for the duration.",
};

SpellsList["ghastly flight"] = {
  name: "Ghastly Flight",
  nameShort: "Ghast. Flight",
  regExpSearch: /^(?=.*ghastly)(?=.*flight).*$/i,
  source: ["GMB:LL", 0],
  classes: ["shaman", "warlock"],
  level: 1,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "S:60-ft line",
  components: "V,S,M",
  compMaterial: "the powdered remains of a creature",
  duration: "Instantaneous",
  description:
    "60-ft long, 5-ft wide line; Con save or Necrotic dmg, can't regain hp until the start of your next turn. Success: half dmg, can regain hp as normal.",
  descriptionMetric:
    "18-m long, 1.5-m wide line; Necrotic dmg, can't regain hp until next turn.",
  descriptionFull:
    "You release a malevolent spirit that flies out from you in a direction of your choice in a 60-foot long, 5-foot wide line, at which point it fades away. Each creature within the line must make a Constitution saving throw. On a failed save, creatures take 2d8 necrotic damage and cannot regain hit points until the start of your next turn. On a successful save, creatures take half as much damage and can regain hit points as normal." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
  allowUpCasting: true,
  descriptionShorter:
    "60-ft line; Con save or Necrotic dmg, can't regain hp until next turn.",
};

SpellsList["goodberry"] = {
  name: "Goodberry (LL)",
  nameShort: "Goodberry (LL)",
  regExpSearch: /^(?=.*goodberry).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "ranger"],
  level: 1,
  school: "Trans",
  time: "1 min",
  timeFull: "1 minute",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "up to 10 fresh-picked berries, which are consumed by the casting of this spell",
  duration: "Instantaneous",
  description:
    "Magically enhance up to 10 fresh berries",
  descriptionFull:
    "You hold up to ten berries in your hands and infuse them withprimal magic. As an action, a creature can eat a berry. It thenregains 1 hit point and nourishment for one day." +
    "\n The berries wither and lose their potency if they have notbeen consumed within 24 hours of the casting of this spell.",
};

SpellsList["hail of thorns"] = {
  name: "Hail of Thorns (LL)",
  nameShort: "Hail Thorns (LL)",
  regExpSearch: /^(?=.*hail)(?=.*thorns).*$/i,
  source: ["GMB:LL", 0],
  classes: ["ranger"],
  level: 1,
  school: "Conj",
  time: "On hit",
  timeFull: "On hit",
  range: "60 feet",
  components: "V",
  duration: "Instantaneous",
  description:
    "On hit, ammunition explodes; each creature within 5 ft must Dex save or take Piercing dmg (half on success).",
  descriptionMetric:
    "Ammunition explodes; Piercing dmg in a 1.5 m radius (Dex save for half).",
  descriptionFull:
    "When you hit a creature within range with a ranged weapon attack, you can cause the piece of ammunition to explode into a hail of thorns. In addition to the normal effect of the attack, the target of your attack and each creature within 5 feet must make a Dexterity saving throw. On a failed save, creatures take 1d10 piercing damage, or half as much damage on a successful save." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d10 for each slot level above 1st.",
  allowUpCasting: true,
  descriptionShorter:
    "On hit, explode; Piercing dmg in 5-ft radius, Dex save for half.",
};

SpellsList["id insinuation"] = {
  name: "Id Insinuation",
  nameShort: "Id Insin.",
  regExpSearch: /^(?=.*id)(?=.*insinuation).*$/i,
  source: ["GMB:LL", 0],
  classes: ["psion(laserllama)"],
  level: 1,
  school: "Ench",
  time: "1 a",
  timeFull: "1 action",
  range: "60 feet",
  components: "V,S",
  duration: "con, 1 min",
  description: "1 crea, Wis save or be incapacitated.",
  descriptionCantripDie: "1 crea, Wis save or be incapacitated.",
  descriptionMetric: "1 crea, Wis save or be incapacitated.",
  descriptionFull:
    "You unleash a storm of conflicting desires within the mind of one creature you can see within range. The target must succeed on a Wisdom saving throw or be incapacitated for the duration. The creature can repeat this Wisdom saving throw at the end of each of its turns and each time it takes damage, ending the effects of the spell on a successful save." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.",
  allowUpCasting: true,
  descriptionShorter: "1 crea, Wis save or be incapacitated.",
};

SpellsList["jump"] = {
  name: "Jump (LL)",
  nameShort: "Jump (LL)",
  regExpSearch: /^(?=.*jump).*$/i,
  source: ["GMB:LL", 0], // Correct source
  classes: [
    "artificer",
    "druid",
    "magus",
    "psion(laserllama)",
    "ranger",
    "sorcerer",
    "vessel",
    "warlock",
    "wizard",
  ],
  level: 1,
  school: "Trans",
  time: "1 bns",
  timeFull: "1 bonus action",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "A grasshopper's hind leg",
  duration: "1 minute",
  description:
    "Touch a willing creature; it can jump up to 30 ft using 10 ft of movement. Can use once on each turn.",
  descriptionMetric:
    "Touch a willing creature; it can jump `CD` m using 3 m of movement.",
  descriptionFull:
    "You touch a willing creature and greatly alter its buoyancy. Once on each of its turns until the spell ends, the target can spend 10 feet of its movement to jump up to 30 feet." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 2nd level or higher, the distance of this magical jump increases by 10 feet for each slot level above 1st.",
  allowUpCasting: true,
  descriptionShorter:
    "Touch a creature; it can jump up to `CD` ft using 10 ft of movement.",
};

SpellsList["searing smite"] = {
  name: "Searing Smite (LL)",
  nameShort: "Searing Smite (LL)",
  regExpSearch: /^(?=.*searing)(?=.*smite).*$/i,
  source: ["GMB:LL", 0], // Correct source
  classes: ["paladin"],
  level: 1,
  school: "Evoc",
  time: "On hit",
  timeFull: "On hit",
  range: "S",
  components: "V,M",
  compMaterial: "A melee weapon worth at least 1 sp",
  duration: "Instantaneous",
  description:
    "On hit, 1d8 Fire dmg. Target must make a Con save or take 1d8 Fire dmg at the start of its turns until extinguished.",
  descriptionCantripDie:
    "On hit, Fire dmg. Target must make a Con save or take 1Fire dmg at the start of its turns until extinguished.",
  descriptionMetric:
    "On hit, Fire dmg. Target must make a Con save or take 1Fire dmg at the start of its turns until extinguished.",
  descriptionFull:
    "When you hit with a melee weapon attack, you can cause the weapon to ignite with white-hot intensity. This attack deals 1d8 additional fire damage, and the target bursts into flames. At the start of each of its turns, it must make a Constitution saving throw. On a failed save, it takes 1d8 fire damage; on a success, the flames are extinguished. Another creature can use an action to extinguish these magical flames." +
    " If your target is a plant, both the initial fire damage and the fire damage dealt on a failed saving throw increase by 1d8." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 2nd level or higher, both the initial fire damage dealt by the attack and the fire damage dealt to the creature on a failed saving throw increase by 1d8 for each slot above 1st.",
  allowUpCasting: true,
  descriptionShorter:
    "On hit, Fire dmg. Target must make a Con save or take 1Fire dmg at the start of its turns until extinguished.",
};

SpellsList["shield"] = {
  name: "Shield (LL)",
  nameShort: "Shield (LL)",
  regExpSearch: /^(?=.*shield).*$/i,
  source: ["GMB:LL", 0], // Correct source
  classes: ["magus", "psion(laserllama)", "sorcerer", "wizard"],
  level: 1,
  school: "Abju",
  time: "1 r",
  timeFull:
    "1 reaction, which you take when you are hit by an attack you can see or targeted by magic missile",
  range: "S",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "Until the end of the turn, bonus to AC and take no damage from magic missile.",
  descriptionMetric:
    "Until the end of the turn, bonus to AC and take no damage from magic missile.",
  descriptionFull:
    "A shimmering barrier of magical force appears to protect you. Until the end of the current turn, you gain a bonus to your Armor Class equal to 1 + your Spellcasting modifier, and you take no damage from the magic missile spell." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 2nd level or higher, the bonus to your Armor Class increases by 1 for each slot level above 1st.",
  allowUpCasting: true,
  descriptionShorter:
    "Until the end of the turn, bonus to AC and take no damage from magic missile.",
};

SpellsList["shield"] = {
  name: "Shield (LL)",
  nameShort: "Shield (LL)",
  regExpSearch: /^(?=.*shield).*$/i,
  source: ["GMB:LL", 0],
  classes: ["magus", "psion(laserllama)", "sorcerer", "wizard"],
  level: 1,
  school: "Abju",
  time: "1 r",
  timeFull: "1 reaction, which you take when you are hit by an attack you can see or targeted by magic missile",
  range: "S",
  components: "V,S",
  duration: "Instantaneous",
  description: "Until the end of the turn, gain bonus to AC equal to 1 + Spellcasting modifier and take no damage from magic missile.",
  descriptionFull: "A shimmering barrier of magical force appears to protect you. Until the end of the current turn, you gain a bonus to your Armor Class equal to 1 + your Spellcasting modifier, and you take no damage from the magic missile spell." + AtHigherLevels + " When you cast this spell using a spell slot of 2nd-level or higher, the bonus to your Armor Class increases by 1 for each slot level above 1st.",
  allowUpCasting: true
};

SpellsList["thunderous smite"] = {
  name: "Thunderous Smite (LL)",
  nameShort: "Thunderous Smite (LL)",
  regExpSearch: /^(?=.*thunderous)(?=.*smite).*$/i,
  source: ["GMB:LL", 0], // Correct source
  classes: ["bard", "paladin"],
  level: 1,
  school: "Evoc",
  time: "On hit",
  timeFull: "On hit",
  range: "S",
  components: "V,M",
  compMaterial: "A melee weapon worth at least 1 sp",
  duration: "Instantaneous",
  description:
    "On hit, 1d8 Thunder dmg. Target Str save or pushed 10ft and prone. Bonus vs constructs/earth elementals.",
  descriptionMetric:
    "On hit, Thunder dmg. Target must make a Str save or be pushed 10 ft away and fall prone.",
  descriptionFull:
    "When you hit with a melee weapon attack, you can cause the weapon to explode with a thunderous shockwave audible out to 300 feet. This attack deals 1d8 additional thunder damage, and the target must succeed on a Strength saving throw or be pushed 10 feet away from you in a line and fall prone. Huge and larger targets have advantage on this saving throw." +
    " If your target is a construct or an earth elemental, the bonus thunder damage increases by 1d8, and it has disadvantage on the Strength saving throw." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 2nd level or higher, the thunder damage increases by 1d8, and the target is pushed an additional 10 feet away from you in a straight line for each spell slot level above 1st.",
  allowUpCasting: true,
  descriptionShorter:
    "On hit, Thunder dmg. Target must make a Str save or be pushed 10 ft away and fall prone.",
};

SpellsList["torrent"] = {
  name: "Torrent",
  nameShort: "Torrent",
  regExpSearch: /^(?=.*torrent).*$/i,
  source: ["GMB:LL", 0], // Correct source
  classes: ["druid", "magus", "sorcerer", "wizard"],
  level: 1,
  school: "Evoc",
  time: "1 a",
  timeFull: "1 action",
  range: "S:30-ft line",
  components: "V,S,M",
  compMaterial: "A mirror",
  duration: "Instantaneous",
  description:
    "30-ft line; Str save or 1d12 Cold dmg, knocked back 10ft and prone. Huge+ creatures have advantage.",
  descriptionMetric:
    "A burst of elemental water erupts in a 9 m line. Str save or take Cold dmg, be knocked back 10 and fall prone.",
  descriptionFull:
    "A burst of elemental water erupts from you in a line 30 feet long and 5 feet wide in a direction you choose, forcing any creature in that area to make a Strength saving throw. On a failure, it takes 1d12 cold damage and is knocked back 10 feet in a straight line and falls prone. On a success, it takes half as much damage and is not moved or knocked prone. A Huge or larger creature has advantage on its saving throw." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d12 and it knocks back 10 additional feet for each slot level above 1st.",
  allowUpCasting: true,
  descriptionShorter:
    "A burst of elemental water erupts in a 30 ft line. Str save or take Cold dmg, be knocked back and fall prone.",
};

// Witch Bolt ALT
SpellsList["witch bolt"] = {
  name: "Witch Bolt (LL)",
  nameShort: "W. Bolt (LL)",
  regExpSearch: /^(?=.*witch)(?=.*bolt).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "magus", "shaman", "sorcerer", "vessel", "warlock", "wizard"],
  level: 1,
  school: "Conj",
  time: "1 action",
  timeFull: "1 action",
  range: "30-ft",
  components: "V,S,M",
  compMaterial: "a piece of wood struck by lightning",
  duration: "Conc., 1 min",
  description: "On hit, 1d12 Lightning dmg. Cannot move >30ft apart. Action to deal 1d12 Lightning dmg each turn.",
  descriptionFull: "A beam of crackling energy lances out toward a creature within range, forming a sustained arc of lightning between you and the target. Make a ranged spell attack against that creature. On a hit, the target takes 1d12 lightning damage, and neither you nor the target can move more than 30 feet away from each other while this spell lasts. You can use an action on each subsequent turn to deal an additional 1d12 lightning damage to the creature. A creature can attempt to move beyond the range of the spell by using its action to make a Strength check against your Spell save DC. If another creature attempts to move the target of this spell beyond the range of this spell it can use its action to make a Strength check against your Spell save DC. Any attempts by the target or another creature (magical or mundane) to move the target beyond this range automatically fail. The spell immediately ends if you are forced to move more than 30 feet away from the target of this spell." + AtHigherLevels + " When you cast this spell using a spell slot of 2nd level or higher, both the initial and subsequent damage increases by 1d12 for each slot level above 1st.",
  allowUpCasting: true
};

// Wrathful Smite ALT
SpellsList["wrathful smite"] = {
  name: "Wrathful Smite (LL)",
  nameShort: "Wrath. Smite (LL)",
  regExpSearch: /^(?=.*wrathful)(?=.*smite).*$/i,
  source: ["GMB:LL", 0],
  classes: ["paladin"],
  level: 1,
  school: "Evoc",
  time: "On hit",
  timeFull: "On hit",
  range: "S",
  components: "V,M",
  compMaterial: "a melee weapon worth at least 1 sp",
  duration: "Conc., 1 min",
  description:
    "On hit, 1d8 Psychic dmg. Target Wis save or frightened. Bonus vs aberrations/telepaths.",
  descriptionFull:
    "When you hit with a melee weapon attack, you can cause the weapon to strike at both body and mind. This attack deals an additional 1d8 psychic damage, and the target must succeed on a Wisdom saving throw, or it is frightened of you until the spell ends. As an action, the creature can repeat this Wisdom saving throw, ending the effects of the spell on a success." +
    " If your target is an aberration or can speak telepathically, this bonus psychic damage increases by 1d8." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 2nd-level or higher, the psychic damage increases by 1d8 for each spell slot level above 1st.",
  allowUpCasting: true,
};

// ##### 2nd Level Spells ##### \\
// Animate Objects
SpellsList["animate object"] = {
  name: "Animate Object (LL)",
  nameShort: "Animate Object (LL)",
  regExpSearch: /^(?=.*animate)(?=.*object).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "bard", "sorcerer", "wizard"],
  level: 2,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "60 feet",
  components: "V,S",
  duration: "Conc., 1 hour",
  description: "Animate Small/smaller object. Bonus action to command within 500ft. Scales with slot level.",
  descriptionFull: "You infuse one Small or smaller nonmagical object you can see with life, temporarily animating it under your control. For the duration, or until destroyed, it uses the Animated Object stat block and follows your commands." +
    "\n\n" + toUni("Statistics.") + " The Animated Object uses your Spell save DC, spell slot level, Spell Attack Modifier, and Proficiency Bonus. HP: 10 × Spell Slot. Slam: 2d4 + PB damage." +
    "\n" + toUni("Control.") + " Shares your initiative. Bonus action to command telepathically within 500ft." +
    AtHigherLevels + " When you cast this spell with a slot of a higher level, you can animate larger objects:\n" +
    "• 3rd: Medium (2d6 Slam)\n" +
    "• 4th: Large (2d10 Slam)\n" +
    "• 5th: Huge (2d12 Slam)",
  allowUpCasting: true
};

//Awaken Plant
SpellsList["awaken plant"] = {
  name: "Awaken Plant",
  nameShort: "Awaken Plant",
  regExpSearch: /^(?=.*awaken)(?=.*plant).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid"],
  level: 2,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  components: "V,S",
  duration: "Conc., 1 hour",
  description: "Animate Small/smaller plant. Bonus action to command within 60ft. Scales with slot level.",
  descriptionFull: "You infuse a Small or smaller plant you can see with magic, animating it under your control. For the duration, or until destroyed, it uses the Awakened Plant stat block." +
    "\n\n" + toUni("Statistics.") + " HP: 20 × Spell Slot. Vulnerable: Fire. Resist: Bludgeoning, Piercing. Slam: 2d4 + PB damage and grapples." +
    "\n" + toUni("Control.") + " Shares your initiative. Bonus action to command within 60ft. Default: defend itself." +
    "\n" + toUni("False Appearance.") + " While motionless, indistinguishable from normal plant." +
    AtHigherLevels + " When you cast this spell with a higher slot, animate larger plants:\n" +
    "• 3rd: Medium (2d6 Slam)\n" +
    "• 4th: Large (2d10 Slam)\n" +
    "• 5th: Huge (2d12 Slam)",
  allowUpCasting: true
};

// Aura of Frost
SpellsList["aura of frost"] = {
  name: "Aura of Frost",
  nameShort: "Aura of Frost",
  regExpSearch: /^(?=.*aura)(?=.*frost).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "magus", "sorcerer"],
  level: 2,
  school: "Conj",
  time: "1 action",
  timeFull: "1 action",
  range: "Self",
  components: "V",
  duration: "Conc., 1 min",
  description: "10 ft radius; Cold dmg & speed -20 ft on failed Con save.",
  descriptionFull:
    "Arcane frost, snow, and wind swirl about you in an aura with a 10-foot radius, and until the spell ends, the aura moves with you, centered on you. When a creature other than you enters the area for the first time on a turn or starts its turn there, it must succeed on a Constitution saving throw or it takes 2d8 cold damage and its speed is reduced by 20 feet until the start of its next turn. On a successful save, it takes half as much cold damage and its speed isn't reduced." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 3rd-level or higher, a creature that fails its save takes an additional 1d8 cold damage and has its speed reduced by an additional 10 feet for each spell level above 2nd.",
  allowUpCasting: true,
};

SpellsList["barkskin"] = {
  name: "Barkskin (LL)",
  nameShort: "Barkskin (LL)",
  regExpSearch: /^(?=.*barkskin).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "ranger"],
  level: 2,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "Touch",
  components: "V, S, M",
  compMaterial: "strip of oak bark",
  duration: "1 hour",
  description: "CA of willing crea is 16 and cannot be reduced",
  descriptionFull:
    "You touch a willing creature that is not wearing metal armor. For the duration, it's skin has a rough, bark-like appearance, and its Armor Class cannot be lower than 16. The spell ends if the target is Incapacitated or dons metal armor, but it can wield a shield and retain this benefit.",
};
// Branding Smite
SpellsList["branding smite"] = {
  name: "Branding Smite (LL)",
  nameShort: "Branding Smite (LL)",
  regExpSearch: /^(?=.*branding)(?=.*smite).*$/i,
  source: ["GMB:LL", 0],
  classes: ["paladin"],
  level: 2,
  school: "Evoc",
  time: "On hit",
  timeFull: "On hit",
  range: "Self",
  components: "V, M",
  compMaterial: "a melee weapon worth at least 1 sp",
  duration: "Conc., 1 min",
  description: "Radiant damage, target sheds dim light and is visible.",
  descriptionFull:
    "When you hit with a melee weapon attack, you can cause the weapon to gleam with an otherworldly astral radiance. This attack deals 2d8 bonus radiant damage, and the target sheds dim light out to a 5-foot radius until the spell ends. The target also becomes visible if it was invisible and cannot become invisible by magical or mundane means for the duration." +
    " If your target is a fiend or undead, or if it has the sunlight sensitivity trait, the bonus radiant damage increases by 1d8." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 3rd-level or higher, the radiant damage increases by 1d8 for each spell slot level above 2nd.",
  allowUpCasting: true,
};

//Conjure Beast
SpellsList["conjure beast"] = {
  name: "Conjure Beast (LL)",
  nameShort: "Conjure Beast (LL)",
  regExpSearch: /^(?=.*conjure)(?=.*beast).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "ranger"],
  level: 2,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  components: "V,S,M",
  compMaterial: "a silver bone, feather, scale, or hair worth at least 1 gold, willingly gifted to you by a Fey spirit",
  duration: "Conc., 1 h",
  description: "Conjure Fey spirit as CR 1 or lower Beast. Verbal commands, shares initiative.",
  descriptionFull: "You grasp the material component and call a Fey spirit to your aid. It appears in an unoccupied space you can see, taking the form of a Beast of CR 1 or lower that you have seen before. It is friendly and obeys your commands." +
    "\n" + toUni("Combat.") + " Shares your initiative. Verbal commands (no action). If no commands, defends itself." +
    "\n" + toUni("Statistics.") + " Uses the Beast's stat block. Disappears at 0 HP." +
    AtHigherLevels + " When you cast this spell using a spell slot of 3rd level or higher, the CR of the Beast increases by 1 for each slot level above 2nd.",
  allowUpCasting: true
};

// Cordon of Arrows
SpellsList["cordon of arrows"] = {
  name: "Cordon of Arrows (LL)",
  nameShort: "Cordon of Arrows (LL)",
  regExpSearch: /^(?=.*cordon)(?=.*arrows).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "ranger"],
  level: 2,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "5 feet",
  components: "V, S, M",
  compMaterial: "three or more arrows or bolts",
  duration: "8 hours",
  description: "Plant 3 ammunition in ground. First creature within 30ft must Dex save or take 3d6 piercing damage.",
  descriptionFull: "You plant three pieces of ranged weapon ammunition in the ground within range and transmute them to protect the area. The first creature to move within 30 feet of this enchanted ammunition must make a Dexterity saving throw. The target takes 3d6 piercing damage on a failed save, and half as much piercing damage on a successful save." +
    " As part of casting this spell, you can designate any number of creatures you choose, and the spell ignores them." +
    AtHigherLevels + " When you cast this spell using a spell slot of 3rd-level or higher, the amount of ammunition that can be transmuted increases by two for each slot level above 2nd. For each additional piece of ammunition you transmute with this spell, the damage increases by 1d6.",
  allowUpCasting: true
};

// Create Ooze 
SpellsList["create ooze"] = {
  name: "Create Ooze (LL)",
  nameShort: "Create Ooze (LL)",
  regExpSearch: /^(?=.*create)(?=.*ooze).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "warlock", "wizard"],
  level: 2,
  school: "Trans",
  time: "1 min",
  timeFull: "1 minute",
  range: "5 feet",
  components: "V,S,M",
  compMaterial: "a vial of acid and the ground bones of a Medium or larger Beast or Humanoid",
  duration: "Instantaneous",
  description: "Underground only. Create Oblex Spawn. Bonus action to command within 120ft. Cannot regain slot while controlled.",
  descriptionFull: "This spell can only be cast underground. You mix the components to create an Oblex Spawn under your control." +
    "\n" + toUni("Control.") + " Bonus action to mentally command Oozes within 120ft. Shares your initiative. Without commands, defends itself." +
    "\n" + toUni("Slimy Bond.") + " While controlled, cannot regain spell slot. Release after long rest to regain slot." +
    "\n" + toUni("When Released.") + " Becomes hostile, seeks underground dungeon." +
    AtHigherLevels + " Create more powerful Oozes:\n" +
    "• 2nd: Oblex Spawn\n" +
    "• 3rd: Gray Ooze\n" +
    "• 4th: Psychic Gray Ooze\n" +
    "• 5th: Ochre Jelly\n" +
    "• 6th: Gelatinous Cube\n" +
    "• 7th: Slithering Tracker\n" +
    "• 8th: Black Pudding\n" +
    "• 9th: Adult Oblex",
  allowUpCasting: true
};



// Elemental Blade
SpellsList["elemental blade"] = {
  name: "Elemental Blade",
  nameShort: "Elemental Blade",
  regExpSearch: /^(?=.*elemental)(?=.*blade).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "magus", "sorcerer"],
  level: 2,
  school: "Conj",
  time: "1 bns",
  timeFull: "1 bonus action",
  range: "Self",
  components: "V, S, M",
  compMaterial: "a charred wooden hilt",
  duration: "Conc., 10 min",
  description: "Evokes a melee elemental blade that deals chosen damage type.",
  descriptionFull:
    "You evoke an elemental blade in a free hand, choosing one of the following damage types: acid, cold, fire, lightning, poison, or thunder. The elemental blade appears as if it were made of the chosen element and lasts for the duration. If you let go of the blade, it disappears, but you can evoke the blade again as a bonus action without expending a spell slot." +
    " Whenever you would make a melee attack, you can make a melee spell attack with the elemental blade against a target within your reach. On hit, it takes damage of the chosen type equal to 2d6 + your spellcasting modifier." +
    " While in your hand, the blade sheds bright light in a 10-foot radius and dim light an additional 10 feet beyond that." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for every two slot levels above 2nd.",
  allowUpCasting: true,
};

// Find Steed
SpellsList["find steed"] = {
  name: "Find Steed (LL)",
  nameShort: "Find Steed (LL)",
  regExpSearch: /^(?=.*find)(?=.*steed).*$/i,
  source: ["GMB:LL", 0],
  classes: ["paladin"],
  level: 2,
  school: "Conj",
  time: "1 min",
  timeFull: "1 minute",
  range: "30 feet",
  components: "V, S",
  duration: "Instantaneous",
  description: "Conjures a loyal steed that bonds to you.",
  descriptionFull:
    "You conjure a spirit in an unoccupied space within range that assumes the form of a supernaturally intelligent, strong, and loyal steed, which is instantly bonded to you. The Steed takes on the form of a Medium or Large quadrupedal beast that you have seen before with a CR of 1/2 or lower that does not have a climbing, flying, or swimming speed. Examples include: elk, camel, giant goat, mastiff, pony, or warhorse." +
    " Your Steed uses the stat block of the form chosen for it, but its creature type now reflects your alignment: celestial (good), fey (neutral), or fiend (evil). The Steed's Intelligence becomes 6 if it was lower, and it understands one language you speak." +
    " In combat, the Steed shares your initiative and acts during your turn. You control the Steed and choose how it acts, both in and out of combat. While mounted on it, you can make any spell you cast that targets only you also target your steed." +
    " While you and your Steed are within 1 mile of one another, you can use a special form of telepathy to communicate." +
    " If your Steed is reduced to 0 hit points, it disappears. You can also use a bonus action to dismiss your Steed, causing it to disappear. Should you cast this spell again, you can choose to either conjure the same Steed, and it reappears in range at its maximum hit points, or to conjure a new Steed, releasing your previous Steed from its bond in the process." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 4th-level or higher, your Steed can take on the form of any Medium or Large quadrupedal or winged beast, celestial, or monstrosity that you have seen before that has a CR of 2 or lower. Examples include: dire wolf, griffon, pegasus, peryton, polar bear, or rhinoceros.",
  allowUpCasting: true,
};

// Flame Whip
SpellsList["flame whip"] = {
  name: "Flame Whip (LL)",
  nameShort: "Flame Whip (LL)",
  regExpSearch: /^(?=.*flame)(?=.*whip).*$/i,
  source: ["GMB:LL", 0],
  classes: ["vessel", "warlock"],
  level: 2,
  school: "Evoc",
  time: "1 att",
  timeFull: "1 attack",
  range: "Self",
  components: "V, S, M ",
  compMaterial: "a charred wooden hilt",
  duration: "Conc., 10 min",
  description: "Evokes a whip of pure flame to grapple and damage enemies.",
  descriptionFull:
    "In place of an attack, you can evoke a whip of pure flame in a free hand that lasts for the duration. If you let go of the whip, it disappears, but you can evoke this Flame Whip again in place of another attack without expending a spell slot." +
    " Whenever you could make an attack, you can instead make a melee spell attack with your Flame Whip against one target within 10 feet that you can see. On hit, it takes fire damage equal to 1d10 + your spellcasting modifier, and if the target is Large or smaller, you can instantly grapple it with the Whip." +
    " You cannot attack with the Whip while it is grappling a creature, but a grappled creature takes 1d10 fire damage at the start of its turn and can use its action to make a Strength check against your spell save DC, escaping on a success." +
    " While in your hand, your Flame Whip sheds bright light in a 10-foot radius and dim light for an additional 10 feet." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 4th level or higher, both instances of fire damage dealt increase by 1d10 for every two slot levels above 2nd.",
  allowUpCasting: true,
};

// Locate Creature
SpellsList["locate creature"] = {
  name: "Locate Creature (LL)",
  nameShort: "Locate Creature (LL)",
  regExpSearch: /^(?=.*locate)(?=.*creature).*$/i,
  source: ["GMB:LL", 0],
  classes: [
    "bard",
    "cleric",
    "druid",
    "paladin",
    "psion(laserllama)",
    "ranger",
    "wizard",
  ],
  level: 2,
  school: "Div",
  time: "1 a",
  timeFull: "1 action",
  range: "Self",
  components: "V, S, M",
  compMaterial: "a magnet dipped in holy water",
  duration: "Conc., 1 hr",
  description: "Locates a specific kind of beast or plant.",
  descriptionFull:
    "Describe or name a specific kind of beast or plant. It can be a specific creature known to you, or the nearest creature of a specific kind (such as a bear, oak, or horse), so long as you have seen such a creature within 30 feet at least once." +
    " If one is within 1 mile, the material component of this spell points to it as if it were a compass. If the target is in motion, it points to it for as long as it remains in range." +
    " If the creature is in a different form, such as under the effect of the polymorph spell, this spell doesn't locate the creature." +
    " This spell can't locate its target if any thickness of lead or 10 feet of running water blocks a straight line to the target." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 3rd level or higher, the range and the type of creature you can locate increase as shown in the table below:\n\n" +
    "Slot Level | Range         | Creature Types\n" +
    "-----------|---------------|----------------\n" +
    "3rd        | 2 miles       | Dragon, Giant, Humanoid, Monstrosity, Ooze\n" +
    "4th        | 3 miles       | Aberration, Construct, Undead\n" +
    "5th        | 5 miles       | Celestial, Elemental, Fey, Fiend",
  allowUpCasting: true,
};

// Lock/Unlock
SpellsList["lock unlock"] = {
  name: "Lock/Unlock (LL)",
  nameShort: "Lock/Unlock (LL)",
  regExpSearch: /^(?=.*lock)(?=.*unlock).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "wizard"],
  level: 2,
  school: "Abj",
  time: "1 a",
  timeFull: "1 action",
  range: "Touch",
  components: "V, S, M",
  compMaterial: "a piton, which the spell consumes",
  duration: "Instantaneous",
  description: "Lock: password protection, DC check to bypass. Unlock: instant, loud knock 300ft.",
  descriptionFull: "You touch one closed door, window, gate, chest, or another entryway, and either lock or unlock it, using the rules below:\n   " +
    toUni("Lock.") +
    " You and the creatures you designate when you cast this spell can open the object normally. You can also choose a password that, when spoken aloud within 5 feet of the object, suppresses the spell for 1 minute. " +
    "This lock can be bypassed by a successful Strength check or thieves' tools check against your Spell save DC, at which point the spell is dispelled.\n   " +
    toUni("Unlock.") +
    " If the object is held shut by a mundane lock or it is stuck or barred, it is instantly unlocked, unstuck, or unbarred. If the object has multiple locks, only one of them is unlocked. Regardless, when you cast the spell, a loud knock, audible out to 300 feet, emanates from the target object."
};

// Magic Weapon
SpellsList["magic weapon"] = {
  name: "Magic Weapon (LL)",
  nameShort: "Magic Weapon (LL)",
  regExpSearch: /^(?=.*magic)(?=.*weapon).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "druid", "paladin", "magus", "ranger", "sorcerer", "wizard"],
  level: 2,
  school: "Trans",
  time: "1 bns",
  timeFull: "1 bonus action",
  range: "Touch",
  components: "V, S",
  duration: "1 hour",
  description: "Touch nonmagical weapon: becomes +1 magic weapon. Scales to +2/+3 with higher slots.",
  descriptionFull: "You touch a nonmagical weapon and imbue it with arcane power. For the duration, it becomes a magical weapon with a +1 bonus to attack and damage rolls." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd-level or higher, the bonus is +2. When you use a spell slot of 6th-level or higher, the bonus increases to +3.",
  allowUpCasting: true
};

SpellsList["totemic cowl"] = {
  name: "Totemic Cowl (LL)",
  nameShort: "Totemic Cowl (LL)",
  regExpSearch: /^(?=.*totemic)(?=.*cowl).*$/i,
  source: ["GMB:LL", 0],
  classes: ["shaman"],
  level: 2,
  school: "Abj",
  time: "1 a",
  timeFull: "1 action",
  range: "Touch",
  components: "V",
  compMaterial: "a leaf from the first day of fall",
  duration: "1 hour",
  description: "Touch willing creature: reduces all damage by 2. Scales +1 per slot level above 2nd.",
  descriptionFull: "You touch a willing creature. Until the spell ends, it is cloaked in a ghostly cowl, and any damage it takes is reduced by 2." + AtHigherLevels + " When you cast this spell using a spell slot of 3rd-level or higher, the damage reduction from the cowl increases by 1 for each slot level above 2nd.",
  allowUpCasting: true
};

// Mystic Spear
SpellsList["mystic spear"] = {
  name: "Mystic Spear (LL)",
  nameShort: "Mystic Spear (LL)",
  regExpSearch: /^(?=.*mystic)(?=.*spear).*$/i,
  source: ["GMB:LL", 0],
  classes: ["psion(laserllama)", "warlock"],
  level: 2,
  school: "Ench",
  time: "1 a",
  timeFull: "1 action",
  range: "120 feet",
  components: "V",
  duration: "Instantaneous",
  description: "4d6 Psychic dmg, Int save or incapacitated until your next turn. Speak name to target without seeing.",
  descriptionFull: "You project a violent bolt of mental power at a creature you can see within range. You do not need to see the target if you speak its name as part of the verbal component of this spell.\n   " +
    "The creature must make an Intelligence saving throw. On a failed save, it takes 4d6 psychic damage and is incapacitated until the start of your next turn. On a successful save, it takes half as much psychic damage and is not incapacitated." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd.",
  allowUpCasting: true
};

// Pass Without Trace ALT
SpellsList["pass without trace"] = {
  name: "Pass Without Trace (LL)",
  nameShort: "Pass Without Trace (LL)",
  regExpSearch: /^(?=.*pass)(?=.*without)(?=.*trace).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "ranger", "shaman"],
  level: 2,
  school: "Abju",
  time: "1 a",
  timeFull: "1 action",
  range: "S",
  components: "V, S, M ",
  compMaterial: "Ashes from a burned leaf of mistletoe",
  duration: "Conc., 1 hr",
  description:
    "Masks you and your companions from detection, granting stealth bonuses.",
  descriptionFull:
    "A veil of shadows and silence radiates from you, masking you and your companions from detection. For the duration, you and creatures of your choice within 30 feet are considered to be lightly obscured and gain a bonus to all Dexterity (Stealth) checks equal to your Spellcasting modifier. Creatures under the effect of this spell leave no track or trace of their passing.",
};

// Restoration
SpellsList["restoration"] = {
  name: "Restoration",
  nameShort: "Restoration",
  regExpSearch: /^(?=.*restoration).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "bard", "cleric", "druid", "paladin", "ranger"],
  level: 2,
  school: "Abju",
  time: "1 a",
  timeFull: "1 action",
  range: "Touch",
  components: "V, S",
  duration: "Instantaneous",
  description:
    "Ends one disease or condition (blinded, deafened, frightened, paralyzed, or poisoned).",
  descriptionFull:
    "You touch a willing creature and instantly end one disease or one of the following conditions currently afflicting it: blinded, deafened, frightened, paralyzed, or poisoned." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 3rd-level or higher, the conditions and effects you can end increase, but the spell requires you to expend diamond dust of a certain value, which is consumed during casting:\n\nSlot Level | Value | Conditions/Effects\n3rd | 10 gp | Charmed, Exhaustion (1 level)\n4th | 50 gp | Reduction to one Ability Score or Hit Point Maximum\n5th | 100 gp | Petrified, One Curse, or Attunement to a Cursed Item",
  allowUpCasting: true,
};

// ##### 3rd Level Spells ##### \\

SpellsList["animate dead"] = {
  name: "Animate Dead (LL)",
  nameShort: "Animate Dead (LL)",
  regExpSearch: /^(?=.*animate)(?=.*dead).*$/i,
  source: ["GMB:LL", 0],
  classes: [
    "cleric",
    "wizard"
  ],
  level: 3,
  school: "Necro", // Cambiato da "Conj" a "Necro"
  time: "1 min",
  timeFull: "1 minute",
  range: "10 feet",
  rangeMetric: "3 m",
  components: "V,S,M",
  compMaterial: "(a corpse or pile of bones, consumed by the casting of the spell to create the Undead Thrall)",
  duration: "Instantaneous",
  description: "Animate a corpse of CR 3 or lower creature as Undead Thrall",
  descriptionFull: desc([
    "You use dark magic to reanimate the bones or corpse of a creature of CR 3 or lower, transforming it into your Undead Thrall. Until destroyed, this Thrall uses the rules below:",
    toUni("Statistics.") + " The Undead Thrall is a shambling corpse with no memory of any abilities it had in life. It uses the same stat block, but its creature type becomes Undead, it has hit points equal to 7 times the level of the spell slot you spent to create it, and it uses your Spellcasting ability for attack and damage rolls. If commanded to attack, it only makes a single attack, even if it could have made more attacks in life.",
    "Thralls cannot benefit from short or long rests or regain hit points. They are immune to the Exhaustion condition. If it is destroyed, it cannot be raised as an Undead Thrall again.",
    toUni("Control.") + " Undead Thralls follow your commands without question. If not given commands, a Thrall will not move and will only act to defend itself. In combat, all Undead Thralls share your initiative and act during your turn.",
    "As a bonus action, you can mentally command any number of Thralls created with this spell so long as they are all within 120 feet. You can issue an individual command to each where you determine exactly how it acts, or you set a general course of action for it ('defend this hall'). So long as it is under your control, Thralls will follow commands until completed.",
    toUni("Spellcasting.") + " If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots.",
    toUni("Undead Bond.") + " While a Thrall is under your control, you cannot regain the spell slot you spent to create it. However, when you finish a long rest, you can end your control over a Thrall to regain the slot. If you do so, that Thrall is freed and is hostile to all living things, the spellcaster in particular.",
    AtHigherLevels + " If you cast this spell with a spell slot of 4th level or higher, the CR of the creatures you can raise as Undead Thralls increases by 1 for each slot level above 3rd."
  ]),
  descriptionShorter: "Animate corpse of CR 3 or lower creature as Undead Thrall",
};

// Blinding Smite ALT
SpellsList["blinding smite"] = {
  name: "Blinding Smite (LL)",
  nameShort: "Blinding Smite (LL)",
  regExpSearch: /^(?=.*blinding)(?=.*smite).*$/i,
  source: ["GMB:LL", 0],
  classes: ["paladin"],
  level: 3,
  school: "Evoc",
  time: "On hit",
  timeFull: "On hit",
  range: "Self",
  components: "V, M",
  compMaterial: "a melee weapon worth at least 1 sp",
  duration: "Conc., 1 min",
  description: "Deal 3d8 radiant damage, target must save or be blinded.",
  descriptionFull:
    "When you hit with a melee weapon attack you can cause the weapon to flare with an overwhelming blinding light. This attack deals 3d8 bonus radiant damage, and the target must succeed on a Constitution saving throw or become blinded until the spell ends. The target can repeat this saving throw at the end of each of its turns, ending the effect on a success.\n\nIf your target is a fiend or undead, or if it has the sunlight sensitivity trait, the bonus radiant damage increases by 1d8." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 4thd-level or higher, the radiant damage increases by 1d8 for each spell slot level above 3rd.",
  allowUpCasting: true,
};

// Cerebral Blast
SpellsList["cerebral blast"] = {
  name: "Cerebral Blast (LL)",
  nameShort: "Cerebral Blast (LL)",
  regExpSearch: /^(?=.*cerebral)(?=.*blast).*$/i,
  source: ["GMB:LL", 0],
  classes: ["psion(laserllama)"],
  level: 3,
  school: "Evoc",
  time: "1 a",
  timeFull: "1 action",
  range: "Self (30-foot cone)",
  components: "V",
  duration: "Instantaneous",
  description: "5d8 psychic damage, push target 20 ft, prone on fail.",
  descriptionFull:
    "Your mind unleashes a blast of overwhelming mental force in a 30-foot cone. Creatures in the area of this spell must make a Strength saving throw. On a failed save, a creature takes 5d8 psychic damage and is pushed 20 feet directly away from you in a line, then falls prone. On a success, creatures take half as much damage, remain in place, and don't fall prone." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 4th-level or higher, the psychic damage increases by 1d8 for each spell slot level above 3rd.",
  allowUpCasting: true,
};

SpellsList["conjure elemental"] = {
  name: "Conjure Elemental (LL)",
  nameShort: "Conjure Elemental (LL)",
  regExpSearch: /^(?=.*conjure)(?=.*elemental).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "ranger", "warlock", "wizard"],
  level: 3,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  components: "V, S, M",
  compMaterial: "a gemstone containing a mote of pure elemental air, earth, fire, or water, worth at least 50 gold",
  duration: "Concentration, 1 hour",
  description: "Conjure CR 3 elemental that obeys commands while concentration lasts.",
  descriptionFull: desc([
    "Grasping the material component of the spell, you conjure an Elemental whose makeup matches the material component. While your concentration lasts, the Elemental is Friendly to you and your allies and obeys all of your commands. For the duration, the Elemental uses the rules below:",
    toUni("Statistics.") + " The Elemental appears in an unoccupied space of your choice you can see in range. It takes on the statistics and appearance of an Elemental of CR 3 or lower, so long as its makeup matches that of the material component.",
    toUni("Combat.") + " The Elemental shares your initiative and it acts during your turn. You can give it verbal commands (no action required). If the Elemental does not receive a command, or its commands are completed, it will only defend itself.",
    toUni("Spellcasting.") + " If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots.",
    toUni("Control.") + " If your concentration on this spell is broken, the Elemental remains, but is no longer under your control. For the duration of the spell, or until it is reduced to 0 hit points, the Elemental will act according to its alignment, spreading chaos and destruction wherever it can.",
    AtHigherLevels + " When you cast this spell using a spell slot of 4th level or higher, the CR of Elemental that you can conjure increases by 1 for each slot level above 3rd."
  ]),
  descriptionShorter: "Conjure CR 3 elemental that obeys commands while concentration lasts.",
  allowUpCasting: true
};

// Conjure Volley ALT
SpellsList["conjure volley"] = {
  name: "Conjure Volley (LL)",
  nameShort: "Conjure Volley (LL)",
  regExpSearch: /^(?=.*conjure)(?=.*volley).*$/i,
  source: ["GMB:LL", 0],
  classes: ["ranger"],
  level: 3,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "Self",
  components: "V,S,M",
  compMaterial: "a single piece of ammunition and a ranged weapon, or one thrown weapon, all nonmagical", // Aggiunto ", all nonmagical"
  duration: "Instantaneous",
  description: "6d8 weapon damage in a 30-ft-radius, 20-ft-high cylinder",
  descriptionFull:
    "You fire one piece of nonmagical ammunition from a ranged weapon or throw a nonmagical thrown weapon into the air and choose a point within 60 feet. " + // Corretto "within the normal range" in "within 60 feet"
    "The ammunition or weapon explodes into a multitude of exact copies of it, which fall in a 30-foot-radius, 20-foot-high cylinder centered on the point you chose. Creatures within that area must make a Dexterity saving throw. They take 6d8 damage of the weapon's type on a failure, and half as much on a success. " + // Corretto "weapon or ammunition's type" e "failed/successful save"
    "The ammunition or weapons created by this spell disintegrate once the effects of this spell are resolved." + // Corretto "Any pieces of" e "disintegrate"
    AtHigherLevels +
    " When you cast this spell using a spell slot of 4th-level or higher, the damage of this spell increases by 1d8, and the radius of the cylinder increases by 5 feet for each slot level above 3rd.",
  allowUpCasting: true,
};

SpellsList["conjure fey"] = {
  name: "Conjure Fey (LL)",
  nameShort: "Conjure Fey (LL)",
  regExpSearch: /^(?=.*conjure)(?=.*fey).*$/i,
  source: ["GMB:LL", 0],
  classes: [
    "druid",
    "ranger",
    "warlock",
    "wizard"
  ],
  level: 3,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  rangeMetric: "9 m",
  components: "V,S,M",
  compMaterial: "(a Tiny object worth at least 50 gold containing the promise of a Fey, willingly gifted to you)",
  duration: "Conc., 1 h",
  description: "Conjure a fey (see book)",
  descriptionFull: desc([
    "You grasp the material component of this spell and call its Fey spirit to your aid. While your concentration lasts, the Fey is Friendly to you and your allies and obeys your commands to the letter. For the duration, the Fey uses the rules below:",
    " \x1bStatistics.\x1b The Fey spirit appears in an unoccupied space of your choice that you can see within range. It takes on the appearance and statistics of any Fey of CR 3 or lower.",
    " \x1bCombat.\x1b The Fey shares your initiative and it acts on your turn. You can give it verbal commands (no action required). If the Fey does not receive any commands, or its commands are completed, it moves and defends itself as best it can.",
    " \x1bSpellcasting.\x1b If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots.",
    " \x1bControl.\x1b If the spell ends because your concentration was broken, the Fey remains, but is no longer under your control. For the duration of the spell, or until reduced to 0 hit points,the Fey acts according to its alignment, and either becomes Hostile toward you and your allies or flees." +
    AtHigherLevels + " When you cast this spell using a spellslot of 4th level or higher, the CR of Fey this spirit can take on increases by 1 for each slot level above 3rd.",
  ]),
  descriptionShorter: "Conjure a fey (see book)",
};

SpellsList["conjure fiend"] = {
  name: "Conjure Fiend",
  nameShort: "Conjure Fiend",
  regExpSearch: /^(?=.*conjure)(?=.*fiend).*$/i,
  source: ["GMB:LL", 0],
  classes: [
    "warlock",
    "wizard"
  ],
  level: 3,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  rangeMetric: "9 m",
  components: "V,S",
  compMaterial: "(a Fiend's true name)",
  duration: "Conc., 1 hour",
  description: "Conjure a fiend (see book)",
  descriptionFull: desc([
    "Speaking its true name, you conjure a Fiend of CR 4 or lower to your aid. While your concentration lasts, it is Indifferent to you and your allies and follows your commands to the letter. For the duration, the Fiend uses the rules below:",
    toUni("Statistics.") + " The Fiend appears in an unoccupied space of your choice you can see within range. When it appears, you can force the Fiend to take on the appearance and statistics of another Fiend of your choice equal to its CR, or lower.",
    toUni("Combat.") + " The Fiend shares your initiative and acts on your turn. You can give it verbal commands (no action required). If the Fiend does not receive any commands, or its commands are completed, it can move and defend itself with prejudice.", // Aggiunto "and" mancante
    toUni("Spellcasting.") + " If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots.",
    toUni("Control.") + " If your concentration on this spell is broken, the Fiend remains. It instantly returns to its true form and is no longer under your control. For the duration of the spell, or until it is reduced to 0 hit points, it is Hostile to you and your allies, and will act according to its alignment. Devils seek to kill the spellcaster, and Demons kill indiscriminately." +
    AtHigherLevels + " When you cast this spell using a spell slot of 4th level or higher, the CR of the Fiends that you can conjure increases by 1 for each slot level above 3rd." // Corretto "spell slot"
  ]),
  descriptionShorter: "Conjure a fiend (see book)",
  allowUpCasting: true
};

// Counterspell ALT
SpellsList["counterspell"] = {
  name: "Counterspell (LL)",
  nameShort: "Counterspell (LL)",
  regExpSearch: /^(?=.*counterspell).*$/i,
  source: ["GMB:LL", 0],
  classes: ["magus", "sorcerer", "warlock", "wizard"],
  level: 3,
  school: "Abjur",
  time: "1 r",
  timeFull: "1 action",
  range: "60 feet",
  components: "V,S",
  duration: "Instantaneous",
  description: "Contest: cancel spell if you win vs spellcasting ability check",
  descriptionFull:
    "You attempt to interrupt a creature in the process of casting a spell. You and the target both make an ability check with your respective spellcasting abilities. The target adds the level of the spell it is casting to its ability check, and you add the level at which you cast this counterspell to your ability check.\n   If you know the spell the creature is attempting to cast or if you have it prepared, you have advantage on this ability check, unless you are using this spell against another counterspell.\n   If the result of your ability check is greater than the result of the target's ability check, its spell fails and has no effect.",
  allowUpCasting: true
};

// Dire Wail
SpellsList["dire wail"] = {
  name: "Dire Wail",
  nameShort: "Dire Wail",
  regExpSearch: /^(?=.*dire)(?=.*wail).*$/i,
  source: ["GMB:LL", 0],
  classes: ["bard", "shaman", "vessel"],
  level: 3,
  school: "Necro",
  time: "1 a",
  timeFull: "1 action",
  range: "Self (30-ft radius)",
  components: "V",
  duration: "1 minute",
  description:
    "Creatures within 30 ft take 4d10 thunder damage (Con save half), deafened for duration",
  descriptionFull:
    "You let forth a wail filled with otherworldly power. Creatures of your choice within 30 feet must succeed on a Constitution saving throw or take 4d10 thunder damage and be deafened for the duration. At the end of each turn, targets can make a Constitution saving throw, ending the spell on a success. On a successful save, the creature takes half damage and is not deafened." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 4th-level or higher, the damage increases by 1d10 for each slot level above 3rd.",
  allowUpCasting: true,
};

//Flame Arrows ALT
SpellsList["flame arrows"] = {
  name: "Flame Arrows (LL)",
  nameShort: "Flame Arrows (LL)",
  regExpSearch: /^(?=.*flame)(?=.*arrows).*$/i,
  source: ["GMB:LL", 0],
  classes: ["ranger", "artificer", "magus"],
  level: 3,
  school: "Trans",
  time: "1 bns",
  timeFull: "1 bonus action",
  range: "Touch",
  components: "V, S",
  duration: "1 hour",
  description:
    "First 12 arrows in a quiver deal 1d6 extra fire damage; fire bursts in flammable objects",
  descriptionFull:
    "You touch a quiver containing ranged weapon ammunition. The first twelve pieces of ammunition drawn from the quiver deal fire damage in place of their normal damage type, plus an additional 1d6 fire damage on hit. If fired into a flammable object, it bursts into flame on hit. The magic of this spell ends for each piece of ammunition when it hits or misses, and the spell ends after twelve pieces of ammunition are fired." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 4th-level or higher, you can draw two additional pieces of ammunition from the quiver for each slot level above 3rd.",
  allowUpCasting: true,
};

SpellsList["grasping vine"] = {
  name: "Grasping Vine (LL)",
  nameShort: "Grasping Vine (LL)",
  regExpSearch: /^(?=.*grasping)(?=.*vine).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "ranger"],
  level: 3,
  school: "Conj",
  time: "1 bns",
  timeFull: "1 bonus action",
  range: "30 feet",
  rangeMetric: "9 m",
  components: "V, S",
  duration: "Concentration, up to 1 minute",
  description:
    "2d8 bludg. dmg, if Large or smaller is pulled 30 ft and restrained",
  descriptionFull:
    "You cause a vine to sprout from the ground in an unoccupied space you can see within range. When you cast this spell, the vine strikes at a target you can see within 30 feet of it. Make a melee spell attack against the target, and on hit, it takes 2d8 bludgeoning damage. If the target is Large or smaller, then it is pulled up to 30 feet toward the vine and Restrained by it." +
    "\n   As an action, a Restrained creature can make a Strength or Dexterity check against your Spell save DC to escape." +
    "\n   As a bonus action on each subsequent turn, you can cause the vine to strike at another target. If the vine is Restraining a creature, it instead deals 2d8 bludgeoning damage to it." +
    AtHigherLevels +
    " If you cast this spell with a spell slot of 4th-level or higher, the vine deals an additional 1d8 damage on hit for each slot level above 3rd.",
  allowUpCasting: true,
};

//Hunger of Hadar ALT
SpellsList["hunger of hadar"] = {
  name: "Hunger of Hadar (LL)",
  nameShort: "Hunger of Hadar (LL)",
  regExpSearch: /^(?=.*hunger)(?=.*hadar).*$/i,
  source: ["GMB:LL", 0],
  classes: ["vessel", "warlock"],
  level: 3,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "120 feet",
  components: "V, S, M",
  compMaterial: "pickled octopus tentacle",
  duration: "Concentration, up to 1 minute",
  description:
    "20-ft-radius of cold and darkness, 2d6 cold/acid dmg; creatures are blinded in the area",
  descriptionFull:
    "You open a gateway to the dark between the stars, a region infested with unknown horrors. A 20-foot-radius sphere of blackness and bitter cold appears, centered on a point with range and lasting for the duration. This void is filled with a cacophony of soft whispers and slurping noises that can be heard up to 30 feet away. No light, magical or otherwise, can illuminate the area, and creatures in the area are blinded." + // Corretto "within range" in "with range"
    "\n\nThe void creates a warp in the fabric of space, and the area is difficult terrain. Any creature that starts its turn in the area takes 2d6 cold damage. Any creature that ends its turn in the area must succeed on a Dexterity saving throw or take 2d6 acid damage as milky, otherworldly tentacles rub against it." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 4th level or higher, the radius of the spell increases by 5 feet and both the cold and acid damage each increase by 1d6 for each slot level above 3rd.",
  allowUpCasting: true,
};

//Hypnotic Pattern ALT
SpellsList["hypnotic pattern"] = {
  name: "Hypnotic Pattern (LL)",
  nameShort: "Hypnotic Pattern (LL)",
  regExpSearch: /^(?=.*hypnotic)(?=.*pattern).*$/i,
  source: ["GMB:LL", 0],
  classes: ["bard", "psion(laserllama)", "sorcerer", "warlock", "wizard"],
  level: 3,
  school: "Illus",
  time: "1 a",
  timeFull: "1 action",
  range: "60 feet",
  components: "S, M",
  compMaterial: "A glowing stick of incense",
  duration: "Conc., 1 min",
  description:
    "30-ft cube; creatures see a pattern, Wis save or be charmed, incapacitated, speed 0; ends if dmg or shaken",
  descriptionFull:
    "You create a twisting pattern of colors that weaves through the air inside a 30-foot cube within range. This psychedelic pattern appears for a moment and vanishes. Each creature in the area who sees the pattern must make a Wisdom saving throw. On a failed save, the creature becomes charmed for the duration. While charmed by this spell, the creature is incapacitated and has a speed of 0.\n\nAn affected creature can repeat this saving throw at the end of each of its turns, ending the effect on a success. The spell also ends for an affected creature if it takes any damage or if someone else uses an action to shake it out of its stupor."
};

//Irresistible Dance ALT
SpellsList["irresistible dance"] = {
  name: "Irresistible Dance (LL)",
  nameShort: "Irresistible Dance (LL)",
  regExpSearch: /^(?=.*irresistible)(?=.*dance).*$/i,
  source: ["GMB:LL", 0],
  classes: ["bard"],
  level: 3,
  school: "Ench",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  components: "V",
  duration: "Conc., up to 1 min",
  description:
    "Forces a creature to dance, disadv. on Dex saves & attacks, others have adv. on attacks; Wis save to end",
  descriptionFull:
    "You force a creature that can hear you within range to make a Wisdom saving throw. On a failure, it begins a comic dance in place: shuffling, tapping feet, and capering for the duration. Creatures that can't be charmed are immune to this spell.\n\nThis creature must use all its movement to dance without leaving its space and has disadvantage on Dexterity saving throws and attack rolls. While the target is affected by this spell, creatures have advantage on attack rolls against it. As an action, a dancing creature makes a Wisdom saving throw to regain control of itself, ending the spell on a success." + // Corretto "The creature" in "This creature" e "the dancing creature can make" in "a dancing creature makes"
    AtHigherLevels +
    " When you cast this spell using a spell slot of 4th-level or higher, you target one additional creature who can hear you within range for each slot level above 3rd.", // Corretto "4th level" in "4th-level"
  allowUpCasting: true,
};

//Lightning Arrow ALT
SpellsList["lightning arrow"] = {
  name: "Lightning Arrow (LL)",
  nameShort: "Lightning Arrow (LL)",
  regExpSearch: /^(?=.*lightning)(?=.*arrow).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "ranger"],
  level: 3,
  school: "Trans",
  time: "1 att",
  timeFull: "1 attack",
  range: "Self",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "Normal damage + 4d8 lightning; on miss, half lightning damage; all within 10 ft. take 2d8 lightning; can't take reactions",
  descriptionFull:
    "As part of a ranged weapon attack, you can transmute a piece of ammunition, or the thrown weapon, into a bolt of lightning. On hit, the target takes the normal damage of the attack, plus a bonus 4d8 lightning damage. On a miss, the target takes half as much lightning damage, and none of the normal damage." +
    "\n\nRegardless if this attack hits or misses, all creatures within 10 feet of the target must make a Dexterity saving throw. On a failed save, creatures take 2d8 lightning damage, and half as much lightning damage on a success. The piece of ammunition or thrown weapon then returns to its normal form." +
    "\n\nAny creature that takes lightning damage from this spell cannot take reactions until the beginning of your next turn." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 4th-level or higher, the damage for both effects of the spell increases by 1d8 for each slot level above 3rd.",
  allowUpCasting: true,
};

//Spectral Passage
SpellsList["spectral passage"] = {
  name: "Spectral Passage",
  nameShort: "Spectral Passage",
  regExpSearch: /^(?=.*spectral)(?=.*passage).*$/i,
  source: ["GMB:LL", 0],
  classes: ["psion(laserllama)", "shaman", "sorcerer", "vessel", "warlock"],
  level: 3,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "An object a spirit has passed through",
  duration: "Conc., 1 min",
  description:
    "Become semi-incorporeal; move through objects as difficult terrain",
  descriptionFull:
    "You touch a willing creature. Until the spell ends, it becomes semi-incorporeal and can move through other creatures and objects as if they were difficult terrain. If the creature ends its movement inside another object or creature, it is immediately shunted to the nearest unoccupied space, taking 1d10 force damage for every 5 feet it was forced to travel." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 4th-level or higher, you can target one additional creature for each slot level above 3rd.",
  allowUpCasting: true,
};

//Sonic Wave
SpellsList["sonic wave"] = {
  name: "Sonic Wave",
  nameShort: "Sonic Wave",
  regExpSearch: /^(?=.*sonic)(?=.*wave).*$/i,
  source: ["GMB:LL", 0],
  classes: ["bard", "magus", "sorcerer"],
  level: 3,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "Self (30-foot cone)",
  components: "V,S",
  duration: "Instantaneous",
  description: "4d8 thunder damage in a 30-ft cone; prone & deafened on fail",
  descriptionFull:
    "You forcefully clasp your hands and a shockwave of booming force shoots forth from you and emits a boom audible out to 500 feet. All creatures in a 30-foot cone must succeed on a Constitution saving throw or take 4d8 thunder damage, fall prone, and be deafened for 1 minute. On a success, creatures take half damage and are not knocked prone or deafened." +
    "\n\nA creature can repeat this saving throw at the end of each of its turns, ending the effect on a success." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 4th-level or higher, the damage increases by 1d8, and the cone increases by 5 feet for each slot level above 3rd.",
  allowUpCasting: true,
};

//Tiny Hut ALT
SpellsList["leomund's tiny hut"] = {
  name: "Leomund's Tiny Hut (LL)",
  nameShort: "Leomund's Tiny Hut (LL)",
  regExpSearch: /^(?=.*tiny)(?=.*hut).*$/i,
  source: ["GMB:LL", 0],
  classes: ["bard", "magus", "ranger", "shaman", "wizard"],
  level: 3,
  school: "Abjur",
  time: "1 min",
  timeFull: "1 minute",
  range: "Self (10-foot radius hemisphere)",
  components: "V,S,M",
  compMaterial: "A pearl cut perfectly in half",
  duration: "8 hours",
  ritual: true,
  description: "Immobile dome of arcane force, 10-ft radius",
  descriptionFull:
    "A 10-foot-radius immobile dome of arcane force springs into existence around and above you and remains stationary for the duration. The spell ends if you leave its area.\n   Nine creatures of Medium size or smaller can fit inside the dome with you. The spell fails if its area includes any Large creatures or more than nine creatures. Creatures and objects within the dome when you cast this spell can move through it freely. All other creatures and objects cannot pass through it. Spells and other magical effects cannot extend through the dome or be cast through it. The atmosphere inside the dome is comfortable and dry, regardless of the weather outside.\n   Until the spell ends, you can command the interior to be dimly lit or dark. The dome is opaque and dull in color as to blend in with surroundings. It is transparent from the inside." +
    toUni("Statistics.") +
    " The dome has 100 hit points and Armor Class equal to your Spell save DC. It is immune to poison, psychic, and non-magical bludgeoning, piercing, and slashing damage; it is vulnerable to force and all magical bludgeoning, piercing, and slashing damage, and it is resistant to all other damage types. A disintegrate spell destroys it instantly.",
};

// ##### 4th Level Spells ##### \\

//Accursed Touch
SpellsList["accursed touch"] = {
  name: "Accursed Touch (LL)",
  nameShort: "Accursed Touch (LL)",
  regExpSearch: /^(?=.*accursed)(?=.*touch).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "cleric", "magus", "sorcerer", "warlock"],
  level: 4,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "a basilisk scale",
  duration: "Conc., up to 1 min",
  description: "Transmute a creature into stone; Constitution saving throw",
  descriptionFull:
    "You attempt to transmute a creature into stone. As an action, you touch a creature, forcing it to make a Constitution saving throw. On a failed save, the creature is Restrained as its flesh begins to harden. On a successful save, it is not affected." +
    "\n\nA creature Restrained by this spell must make another Constitution saving throw at the end of each of its turns. If it saves against this spell three times, the spell ends. Should it fail three saves, it is turned to stone and Petrified. Successes and failures don't need to be consecutive; keep track of both until the creature fails or passes three saves." +
    "\n\nIf the target is physically broken while Petrified, it suffers from similar deformities if it reverts to its original state." +
    "\n\nIf you maintain your concentration for the entire duration, the creature is turned to stone until the effect is removed." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 5th level or higher, the number of saves that the target must fail before it is turned to stone and Petrified is reduced by 1 (to a minimum of 1) for each level above 4th.",
  allowUpCasting: true,
};

SpellsList["create undead"] = {
  name: "Create Undead (LL)",
  nameShort: "Create Undead (LL)",
  regExpSearch: /^(?=.*create)(?=.*undead).*$/i,
  source: ["GMB:LL", 0],
  classes: ["cleric", "warlock", "wizard"],
  level: 4,
  school: "Necro",
  time: "10 min",
  timeFull: "10 minutes",
  range: "30 feet",
  rangeMetric: "9 m",
  components: "V,S,M",
  compMaterial: "the corpse of a creature slain within the last day, and blood from the spellcaster, both of which are consumed by the casting of this spell", // Aggiunto virgola
  duration: "Instantaneous",
  description: "Only at night. Create an Undead (see book)",
  descriptionFull: desc([
    "This spell can only be cast at night. You spill your blood onto the corpse as part of a sinister ritual, reducing your maximum hit points by 2 and creating a Skeleton or Zombie under your control. Undead created by this spell use the rules below:", // Corretto "1" in "2"
    toUni("Control.") + " Undead follow your commands without question. If not given a command, an Undead won't move and will only act to defend itself. In combat, any Undead you created share your initiative and act during your turn.", // Corretto testo completo
    "As a bonus action, you can mentally command any number of Undead you created with this spell so long as they are all within 120 feet. You can issue an individual command to each, determining exactly how it will act, or setting a general course of action ('defend this hall'). So long as they remain under your control, your Undead will follow commands until completed.", // Corretto raggio e testo
    toUni("Spellcasting.") + " If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots.", // Aggiunta sezione mancante
    toUni("Undead Bond.") + " While an Undead is under your control, you cannot regain the maximum hit points you spent to create it. However, when you finish a long rest, you can release control over any Undead that you created to regain the maximum hit points you spent to create them. When freed, Undead become hostile to all living things, the spellcaster in particular.", // Corretto testo
    AtHigherLevels + " You can cast this spell with a spell slot of a higher level, and expend additional maximum hit points (Max. HP) to create more powerful Undead, as shown here:",
    "• 5th level — Max HP cost: 3 — Undead: Ghoul", // Corretto valori
    "• 6th level — Max HP cost: 6 — Undead: Ghast", // Corretto valori
    "• 7th level — Max HP cost: 9 — Undead: Mummy, Wight", // Corretto valori
    "• 8th level — Max HP cost: 12 — Undead: Flameskull", // Corretto valori
    "• 9th level — Max HP cost: 15 — Undead: Revenant, Vampire Spawn" // Corretto valori
  ]),
  allowUpCasting: true,
};

SpellsList["conjure aberration"] = {
  name: "Conjure Aberration (LL)",
  nameShort: "Conjure Aberration (LL)",
  regExpSearch: /^(?=.*conjure)(?=.*aberration).*$/i,
  source: ["GMB:LL", 0],
  classes: ["warlock", "wizard"],
  level: 4,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  components: "V,S,M",
  compMaterial: "a prism worth at least 50 gold, bathed in the aberrant energies of the Far Realm",
  duration: "Concentration, 1 hour",
  description: "Conjure an aberration (see book)",
  descriptionFull: desc([
    "You grasp the material component of this spell, tearing a rift in reality, causing an Aberration to appear in range. For the duration, the Aberration uses the rules below:",
    toUni("Statistics.") + " When you cast the spell, roll a d4 and consult the table below. The Aberration corresponding to your result appears, using its stat block. Alternately, you can choose any result lower than yours to appear in its place.",
    toUni("Combat.") + " The Aberration shares your initiative and acts on your turn. You can give it verbal orders (no action required). If the Aberration does not receive any orders, or its orders are completed, it moves and defends itself with prejudice.",
    toUni("Spellcasting.") + " If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots.",
    toUni("Control.") + " If the spell ends because your concentration was broken, the Aberration remains, but is no longer under your control. For the duration of the spell, or until it is reduced to 0 hit points, the Aberration acts according to its alignment.",
    AtHigherLevels + " When you cast this spell using a spell slot of 5th-level or higher, you gain a +1 bonus to your roll to determine the Aberration conjured for each slot above 4th.",
    "Die Roll | Aberration",
    "1 | Flumph",
    "2 | Spectator",
    "3 | Chull",
    "4 | Red Slaad",
    "5 | Blue Slaad",
    "6+ | Mind Flayer"
  ]),
  descriptionShorter: "Conjure an aberration (see book)",
  allowUpCasting: true
};

//Ego Scourge
SpellsList["ego scourge"] = {
  name: "Ego Scourge (LL)",
  nameShort: "Ego Scourge (LL)",
  regExpSearch: /^(?=.*ego)(?=.*scourge).*$/i,
  source: ["GMB:LL", 0],
  classes: ["psion(laserllama)"],
  level: 4,
  school: "Ench",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  components: "V",
  duration: "Conc., 1 min",
  description: "Attack the mind, disadvantage on attacks and checks",
  descriptionFull:
    "You strike at the mind of a creature you can see within range, attacking its sense of self. It must succeed on an Intelligence saving throw or suffer disadvantage on attack rolls and ability checks, and be unable to cast spells for the duration.\n   At the end of each of its turns, the creature can repeat this saving throw, ending the effect of this spell on a success.",
};

//Eldritch Tentacles
SpellsList["eldritch tentacles"] = {
  name: "Eldritch Tentacles (LL)",
  nameShort: "Eldritch Tentacles (LL)",
  regExpSearch: /^(?=.*eldritch)(?=.*tentacles).*$/i,
  source: ["GMB:LL", 0],
  classes: ["warlock", "vessel"],
  level: 4,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "90 feet",
  components: "V,S,M",
  compMaterial: "A piece of tentacle from a giant squid",
  duration: "Conc., 1 min",
  description: "Alien tentacles fill a 20-ft square, difficult terrain",
  descriptionFull:
    "Alien tentacles fill a 20-foot square on the ground you can see within range. For the duration, this area is difficult terrain.\n\nWhen a creature enters this area for the first time on a turn or starts its turn there, it must succeed on a Dexterity saving throw or take 3d6 bludgeoning damage and be restrained by the tentacles until the spell ends. Any creature that begins its turn in the area and is restrained by the tentacles takes 3d6 bludgeoning damage at the start of its turn.\n\nA creature restrained by the tentacles can use its action to make a Strength or Dexterity check (its choice) against your spell save DC. On a success, it frees itself from the tentacles." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 5th level or higher, both instances of damage from this spell increase by 1d6 for each slot level above 4th.",
  allowUpCasting: true,
};

//Pillars of Earth
SpellsList["pillars of earth"] = {
  name: "Pillars of Earth (LL)",
  nameShort: "Pillars Earth (LL)",
  regExpSearch: /^(?=.*pillars)(?=.*earth).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid"],
  level: 4,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "120 feet",
  components: "V,S",
  duration: "Instantaneous",
  description: "Raise pillars of earth that can restrain creatures",
  descriptionFull:
    "You cause up to two pillars of stone to burst forth from places on the ground that you can see within range. Both pillars are cylinders with a diameter of 5 feet and a height up to 30 feet." +
    "\n\nThe ground where a pillar appears must be wide enough for its diameter, and you can target ground under a creature if that creature is Medium or smaller. Each pillar has an Armor Class of 5 and 30 hit points. If reduced to 0 hit points, a pillar crumbles into rubble, creating an area of difficult terrain with a 10-foot radius. This rubble lasts until cleared." +
    "\n\nIf a pillar is created under a creature, that creature must succeed on a Dexterity saving throw or be lifted by the pillar. A creature can choose to fail the save." +
    "\n\nIf a pillar is prevented from reaching its full height because of a ceiling or other obstacle, any creature on the pillar takes 6d6 bludgeoning damage and is Restrained, pinched between the pillar and the obstacle. A Restrained creature can use its action to make either a Strength or Dexterity check against your Spell save DC. On a success, it is no longer Restrained and must either move off the pillar or fall off it." +
    AtHigherLevels +
    " If you cast this spell with a spell slot of 5th level or higher, you create two additional pillars for each slot level above 4th.", // Aggiunto spazio dopo AtHigherLevels
  allowUpCasting: true,
};

//Polymorph ALT
SpellsList["polymorph"] = {
  name: "Polymorph (LL)",
  nameShort: "Polymorph (LL)",
  regExpSearch: /^(?=.*polymorph).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "magus", "sorcerer", "vessel", "warlock", "wizard"], // Corretto ordine classi
  level: 4,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  components: "V,S,M",
  compMaterial: "a caterpillar cocoon", // Corretto "A" in "a" (minuscolo)
  duration: "Concentration, up to 10 minutes", // Corretto da "Conc., 10 min"
  description: "Transform a creature into a beast (see book)",
  descriptionFull: desc([
    "You attempt to transform a creature you can see within range into a Beast using the rules below. An unwilling target makes a Charisma saving throw to resist this effect. Shapechangers automatically succeed on this saving throw.", // Aggiunto spazio dopo "makes"
    toUni("Form.") + " The new form can be any living Beast you have seen before. Creatures can only be transformed into a Beast with a CR equal to (or lower then) half its level or CR.",
    toUni("Statistics.") + " The creature's game statistics are replaced by those of the Beast. However, while transformed, it retains its alignment, personality, its Hit Points, and Charisma score.",
    toUni("Actions.") + " The creature can only take the actions that would be available to that Beast. It cannot speak, cast spells, or take any actions that require hands or speech.", // Aggiunti spazi
    toUni("Equipment.") + " Its clothing, weapons, armor, and objects it is holding meld into the new form. However, it can't activate, use, wield, or otherwise benefit from any of its equipment.",
    toUni("Reverting.") + " The creature instantly reverts to its true form if it is reduced to 0 hit points. It can also repeat this Charisma saving throw at the end of each of its turns, reverting to its true form on a successful save.", // Aggiunto spazio dopo "if"
    AtHigherLevels + " When you cast this spell with a slot of 5th-level or higher, you can target one additional creature for each slot level above 4th. You can choose the Beast that you transform each target into individually."
  ]),
  allowUpCasting: true,
};

//Staggering Smite ALT
SpellsList["staggering smite"] = {
  name: "Staggering Smite (LL)",
  nameShort: "Staggering Smite (LL)",
  regExpSearch: /^(?=.*staggering)(?=.*smite).*$/i,
  source: ["GMB:LL", 0],
  classes: ["paladin"],
  level: 4,
  school: "Evoc",
  time: "On hit",
  timeFull: "On hit",
  range: "Self",
  components: "V,M",
  compMaterial: "a melee weapon worth at least 1 sp",
  duration: "Instantaneous",
  description: "Add 4d6 psychic damage; Wisdom save for disadvantage",
  descriptionFull:
    "The next time you hit a creature with a melee weapon attack during this spell's duration, you can cause the weapon to pierce both body and mind. This attack deals 4d6 additional psychic damage, and the target must succeed on a Wisdom saving throw or until the start of its next turn, it has disadvantage on attack rolls and ability checks and it cannot take reactions." +
    "\n\nIf your target is an aberration or it can speak telepathically this bonus psychic damage increases by 1d6." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 5th-level or higher, the psychic damage increases by 1d6 for each spell slot level above 4th.",
  allowUpCasting: true,
};

SpellsList["wall of thorns"] = {
  name: "Wall of Thorns (LL)",
  nameShort: "Wall of Thorns (LL)",
  regExpSearch: /^(?=.*wall)(?=.*thorns).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "ranger"],
  level: 4,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "120 feet",
  components: "V,S,M",
  compMaterial: "a handful of thorns",
  duration: "Concentration, up to 10 minutes",
  description: "Conjure wall of thorny plants, 5d8 piercing damage, difficult terrain",
  descriptionFull: desc([
    "You conjure a wall of thick plant growth bristling with thorns hard as iron. It appears in range on a solid surface. The wall can be up to 60 feet long, 10 feet high, and 5 feet thick. Or, it forms a 20-foot diameter circle, 20 feet high and 5 feet thick.",
    "When it appears, creatures within it must make a Dexterity saving throw. On a failure, they take 5d8 piercing damage and remain within the wall. On a successful save, they take half as much damage and move to an adjacent space of its choice not within the area of the wall.",
    toUni("Moving Through.") + " Any creature can painfully move through the wall, but it must spend 4 feet of movement for every 1 foot it moves within it. The first time a creature enters the wall or begins its turn in it, it must make a Dexterity saving throw. It takes 5d8 piercing damage on a failure, half on a success.",
    AtHigherLevels + " When you cast this spell using a slot of 5th level or higher, both instances of damage increase by 1d8 for each slot level above 4th."
  ]),
  descriptionShorter: "Conjure wall of thorny plants, 5d8 piercing damage, difficult terrain",
  allowUpCasting: true
};
//###### 5TH LEVEL SPELLS ######\\

//Banishing Smite ALT
SpellsList["banishing smite"] = {
  name: "Banishing Smite (LL)",
  nameShort: "Banishing Smite (LL)",
  regExpSearch: /^(?=.*banishing)(?=.*smite).*$/i,
  source: ["GMB:LL", 0],
  classes: ["paladin"],
  level: 5,
  school: "Evoc",
  time: "On hit",
  timeFull: "On hit",
  range: "Self",
  components: "V,M",
  compMaterial: "A melee weapon worth at least 1 sp",
  duration: "Conc., 1 min",
  description: "Add 5d10 force damage; banished if at 50 HP or fewer",
  descriptionFull:
    "When you hit with a melee weapon attack, you can cause the weapon to crackle with pure arcane force. This attack deals 5d10 bonus force damage, and if it reduces the target to 50 hit points or fewer, it is banished from the current plane.\n   If the target is native to a different plane of existence than the one you are currently on, it disappears, returning to its home plane. If the target is native to your current plane, it is banished to a harmless demiplane where it is incapacitated. When the spell ends, the target returns to the space it was banished from, or the nearest unoccupied space.\n   If the target is not native to your current plane of existence, this bonus force damage increases by 1d10." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 6th level or higher, the bonus force damage increases by 1d10 for each spell slot level above 5th.",
  allowUpCasting: true,
};

//Conjure Celestial
SpellsList["conjure celestial"] = {
  name: "Conjure Celestial (LL)",
  nameShort: "Conjure Celestial (LL)",
  regExpSearch: /^(?=.*conjure)(?=.*celestial).*$/i,
  source: ["GMB:LL", 0],
  classes: ["cleric", "paladin"],
  level: 5,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  rangeMetric: "9 m",
  components: "V,S",
  compMaterial: "(a Celestial's true name)", // Aggiunto compMaterial mancante
  duration: "Conc., 1 h",
  description: "Conjure a celestial (see book)",
  descriptionFull: desc([
    "Speaking its true name, you conjure a Celestial of CR 5 or lower to aid you. This Celestial is Friendly to you and your allies, obeys your commands, and uses the rules below:",
    toUni("Statistics.") + " The Celestial appears in an unoccupied space of your choice you can see in range. When it appears, you can cause it to take on the appearance and statistics of a different Celestial of your choice equal to its CR, or lower.",
    toUni("Combat.") + " This Celestial shares your initiative and it acts during your turn. You can give it verbal commands (no action required). If the Celestial does not receive a command, or its commands are completed, it will move and defend itself.",
    toUni("Spellcasting.") + " If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots.",
    AtHigherLevels + " When you cast this spell using a spell slot of 6th level or higher, the CR of the Celestials that you can conjure increases by 1 for each slot level above 5th." // Corretto testo upcasting
  ]),
  descriptionShorter: "Conjure a celestial (see book)",
  allowUpCasting: true
};

//Conjure Dragon
SpellsList["conjure dragon"] = {
  name: "Conjure Dragon (LL)",
  nameShort: "Conjure Dragon (LL)",
  regExpSearch: /^(?=.*conjure)(?=.*dragon).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "wizard"],
  level: 5,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  rangeMetric: "9 m",
  components: "V,S,M",
  compMaterial: "the scale of an Ancient Dragon, inlaid with gems worth at least 500 gold, willingly gifted to you",
  duration: "Conc., up to 1 h",
  description: "Conjure a dragon (see book)",
  descriptionFull: desc([
    "Grasping the material component of this spell, you conjure a portion of that Ancient Dragon's essence to your aid. While your concentration lasts, it is Friendly to you and your allies and obeys your commands. For the duration, this draconic essence uses the rules below:",
    toUni("Statistics.") + " The draconic essence manifests in the form of a Dragon of your choice of CR 5 or lower, however, the color of its scales, its damage resistance, and the damage dealt by its breath weapon change to match that of the dragon which provided the material component of this spell. It appears in an unoccupied space of your choice within range.",
    toUni("Combat.") + " In combat, this Dragon shares your initiative and acts on your turn. You can give it verbal commands (no action required). If the Dragon does not receive any commands, or if its commands are completed, it defend itself with prejudice.",
    toUni("Spellcasting.") + " If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots.",
    toUni("Control.") + " If your concentration ends, the Dragon instantly disappears, the essence returning to the Ancient Dragon." +
    AtHigherLevels + " When you cast this spell using a spell slot of 6th level or higher, the CR of Dragon this essence can manifest increases by 1 for each slot level above 5th."
  ]),
  descriptionShorter: "Conjure a dragon (see book)",
  allowUpCasting: true
};

//Conjure Giant
SpellsList["conjure giant"] = {
  name: "Conjure Giant (LL)",
  nameShort: "Conjure Giant (LL)",
  regExpSearch: /^(?=.*conjure)(?=.*giant).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "wizard"],
  level: 5,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  components: "V,S,M",
  compMaterial: "a gemstone worth at least 500 gold, personally inscribed with the Rune of a Storm Giant",
  duration: "Concentration, up to 1 hour",
  description: "Conjure a giant (see book)",
  descriptionFull: desc([
    "Grasping the material component of this spell, you conjure a portion of that Storm Giant's essence to your aid. While your concentration lasts, it is Friendly to you and your allies and obeys your commands. For the duration, this titanic essence uses the rules below:",
    toUni("Statistics.") + " The titanic essence manifests in the form of a Hill Giant, and uses the corresponding stat block. It appears in an unoccupied space of your choice within range.",
    toUni("Combat.") + " In combat, this Giant shares your initiative and acts on your turn. You can give it verbal commands (no action required). If the Giant does not receive any commands, or if its commands are completed, it defend itself with prejudice.",
    toUni("Spellcasting.") + " If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots.",
    toUni("Control.") + " If your concentration ends, the Giant instantly disappears, the essence returning to the Storm Giant.",
    AtHigherLevels + " You can cast this spell with higher level spell slots to cause this titanic essence to take on the form of more powerful Giants, as shown in the table below:",
    "Spell Slot | Giant",
    "6th | Stone Giant",
    "7th | Frost Giant",
    "8th | Fire Giant",
    "9th | Cloud Giant"
  ]),
  descriptionShorter: "Conjure a giant (see book)",
  allowUpCasting: true
};

//Create Construct
SpellsList["create construct"] = {
  name: "Create Construct (LL)",
  nameShort: "Create Construct (LL)",
  regExpSearch: /^(?=.*create)(?=.*construct).*$/i,
  source: ["GMB:LL", 0],
  classes: ["artificer", "wizard"],
  level: 5,
  school: "Trans",
  time: "1 h",
  timeFull: "1 hour",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "high quality materials worth at least 200 gold per level of the spell, all of which are consumed",
  duration: "Instantaneous",
  description: "Create a Golem Servant (see book)",
  descriptionFull: desc([
    "Using a set of artisan's tools with which you are proficient, you set to work creating a creation of arcane power. Once the spell is complete, the material components are transformed into a Golem Servant, which uses the rules below:",
    toUni("Statistics.") + " The Golem Servant uses the stat block below. It uses your Spellcasting Ability, the Spell Slot spent to cast this spell, your Spell Attack Modifier, and Proficiency Bonus (PB) in several places throughout the stat block. You choose if your Golem is Medium or Large sized, and its appearance reflects the materials you used in its creation.",
    toUni("Control.") + " Your Golem has no mind of its own and obeys you absolutely. In combat, it shares your initiative and acts during your turn. However, unless you give it a command, the Golem Servant remains in its space and will only act in self defense. If you are within 500 feet of your Golem, you can use a bonus action to Telepathically issue it a command, determining how it will act on its turn or to set a general course of action for it (ie: 'defend this creature') until you give it another command.",
    toUni("Magical Nature.") + " The Golem cannot benefit from healing spells, nor short or long rests. The only way for it to regain hit points is for a creature to touch it and spend one spell slot. It then regains hit points equal to 10 times the slot's level.",
    toUni("Creator's Bond.") + " While the Golem lives, you cannot regain the spell slot you expended to create it, and casting this spell again instantly destroys any previous Golem Servants."
  ]),
  descriptionShorter: "Create a Golem Servant (see book)"
};

//Psychic Crush
SpellsList["psychic crush"] = {
  name: "Psychic Crush (LL)",
  nameShort: "Psychic Crush (LL)",
  regExpSearch: /^(?=.*psychic)(?=.*crush).*$/i,
  source: ["GMB:LL", 0],
  classes: ["psion(laserllama)"],
  level: 5,
  school: "Evoc",
  time: "1 a",
  timeFull: "1 action",
  range: "90 feet",
  components: "V",
  duration: "Conc., 1 min",
  description: "5d8 force damage; repeat save for additional damage",
  descriptionFull:
    "You exert the full force of your will upon a creature you can see within range. It must succeed on a Strength saving throw, taking 5d8 force damage on a failure and half as much force damage on a success. It must repeat this saving throw at the end of each of its turns, taking 2d8 force damage on a failure, and ending the effects of this spell on a success.\n   If this spell reduces a creature to 0 hit points, it is crushed into a flesh-colored ball, roughly the size of your fist." +
    AtHigherLevels +
    " When you cast this spell using a spell slot of 6th-level or higher, each instance of force damage it deals increases by 1d8 for each spell slot level above 5th.",
  allowUpCasting: true,
};

//Spiritual Sundering
SpellsList["spiritual sundering"] = {
  name: "Spiritual Sundering (LL)",
  nameShort: "Spiritual Sundering (LL)",
  regExpSearch: /^(?=.*spiritual)(?=.*sundering).*$/i,
  source: ["GMB:LL", 0],
  classes: ["cleric", "shaman", "warlock"],
  level: 5,
  school: "Ench",
  time: "1 a",
  timeFull: "1 action",
  range: "120 feet",
  components: "V,S",
  duration: "Instantaneous",
  description: "8d6 necrotic damage; penalty on mental saves",
  descriptionFull:
    "Creatures in a 20-foot-radius sphere centered on a point of your choice within range have their soul rent and must make a Charisma saving throw. On a failure, they take 8d6 necrotic damage, and for the next minute, they have a muddied sense of self and subtract 1d6 from any Intelligence, Wisdom, or Charisma saving throw they make. On a success, they take half damage and suffer no saving throw penalty.\n\nTargets can make a Charisma saving throw at the end of each of their turns, ending the effect on a successful save.",
};

//Steel Wind Strike ALT
SpellsList["steel wind strike"] = {
  name: "Steel Wind Strike (LL)",
  nameShort: "Steel Wind Strike (LL)",
  regExpSearch: /^(?=.*steel)(?=.*wind)(?=.*strike).*$/i,
  source: ["GMB:LL", 0],
  classes: ["magus", "ranger"],
  level: 5,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  components: "V,M",
  compMaterial: "A melee weapon worth at least 1 sp",
  duration: "Instantaneous",
  description: "Attack up to 5 targets; add 5d10 force damage",
  descriptionFull:
    "You flourish the weapon used in the casting and then vanish to strike like the wind. Choose up to five targets you can see within range. Make one melee weapon attack against each target using the weapon used in the casting. On a hit, targets take the normal damage of an attack with that weapon plus an additional 5d10 force damage.\n   You can then teleport to an unoccupied space you can see within 5 feet of one of the targets you hit or missed.",
};

//Swift Quiver ALT
SpellsList["swift quiver"] = {
  name: "Swift Quiver (LL)",
  nameShort: "Swift Quiver (LL)",
  regExpSearch: /^(?=.*swift)(?=.*quiver).*$/i,
  source: ["GMB:LL", 0],
  classes: ["ranger"],
  level: 5,
  school: "Trans",
  time: "1 bns",
  timeFull: "1 bonus action",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "A quiver with a piece of ammunition",
  duration: "Conc., 1 min",
  description: "Endless nonmagical ammunition; make 2 attacks per turn",
  descriptionFull:
    "You transmute your quiver so it produces an endless supply of nonmagical ammunition, which seems to leap into your hand when you reach for it.\n\nOn each of your turns until the spell ends, you can use a bonus action (including the bonus action used to cast this spell) to make two attacks with a ranged weapon that uses ammunition from this quiver. When you make such a ranged attack, your quiver magically replaces the ammunition you used with a nonmagical copy of that ammunition. Pieces of ammunition created by this spell disintegrate when the spell ends. If the quiver leaves your possession, the spell ends.",
};

//Vorpal Blade
SpellsList["vorpal blade"] = {
  name: "Vorpal Blade (LL)",
  nameShort: "Vorpal Blade (LL)",
  regExpSearch: /^(?=.*vorpal)(?=.*blade).*$/i,
  source: ["GMB:LL", 0],
  classes: ["magus", "paladin"],
  level: 5,
  school: "Trans",
  time: "On hit",
  timeFull: "On hit",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "The finger bone of a necromancer",
  duration: "Instantaneous",
  description: "6d8 force damage; behead if reduced to 50 HP or fewer",
  descriptionFull:
    "You conjure a blade of pure negative energy in your empty hand and make one melee weapon attack against a creature within your reach, attempting to behead it. On hit, it takes force damage equal to 6d8 + your spellcasting modifier.\n  If this damage reduces the creature to 50 hit points or fewer, you instantly cut off one of its heads of your choice. The creature instantly dies if it cannot survive without the lost head. The creature's head is not removed if it is immune to slashing damage or if it doesn't have or need a head.",
};

//Wall of Force ALT
SpellsList["wall of force"] = {
  name: "Wall of Force (LL)",
  nameShort: "Wall of Force (LL)",
  regExpSearch: /^(?=.*wall)(?=.*force).*$/i,
  source: ["GMB:LL", 0],
  classes: ["magus", "sorcerer", "psion(laserllama)", "wizard"],
  level: 5,
  school: "Abjur",
  time: "1 a",
  timeFull: "1 action",
  range: "60 feet",
  components: "V,S,M",
  compMaterial: "Powder from crushed clear gemstone",
  duration: "Conc., 10 min",
  description: "150 hit points; creates an opaque wall of force",
  descriptionFull: desc([
    "A shimmering wall of magical force springs into existence at a point you choose within range and lasts for the duration.", // Corretto "opaque wall of force" in "wall of magical force"
    toUni("Orientation & Shape.") + " The wall appears in any orientation you choose, as a horizontal or vertical barrier or an angle. It can be free floating or rest on a solid surface. You can form it into a hemispherical dome, a sphere with a radius of up to 10 feet, or you can shape a flat surface made up of ten 10-by-10-foot panels. Each panel must be contiguous with another. In any form, the wall is 1/4 inch thick. Nothing can pass through the wall physically, and anything viewed through it is lightly obscured. The wall extends into the Ethereal Plane, blocking ethereal travel through the wall. If it cuts through a creature's space when it appears, the creatures must make a Dexterity saving throw. On a success, it chooses which side of the wall it moves to. On a failure, you choose the side it moves to.", // Corretto "free-floating" in "free floating"
    toUni("Statistics.") + " The wall has 150 hit points and its Armor Class equals your Spell save DC. It is immune to poison, psychic, and non-magical bludgeoning, piercing, and slashing damage, vulnerable to force and magical bludgeoning, piercing, and slashing damage, and resistant to all other damage types. It cannot be dispelled by a dispel magic spell, but a disintegrate spell destroys the wall it instantly.", // Aggiunto "it" dopo "destroys the wall"
    AtHigherLevels + " When you cast this spell using a spell slot of 6th-level or higher, the hit points of the wall created by this spell increase by 25 for each spell slot level above 5th." // Corretto "6th level" in "6th-level"
  ]),
  allowUpCasting: true,
};

//###### 6TH LEVEL SPELLS ######\\
//Create Monstrosity
SpellsList["create monstrosity"] = {
  name: "Create Monstrosity (LL)",
  nameShort: "Create Monstrosity (LL)",
  regExpSearch: /^(?=.*create)(?=.*monstrosity).*$/i,
  source: ["GMB:LL", 0],
  classes: ["wizard"],
  level: 6,
  school: "Trans",
  time: "1 h",
  timeFull: "1 hour",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "the corpses of the appropriate Beasts and blood of the spellcaster, both of which are consumed",
  duration: "Instantaneous",
  description: "Create a monstrosity (see book)",
  descriptionFull: desc([
    "You spill your blood onto the corpses binding them together into a new form, reducing your maximum hit points by 5 and creating a Hippogriff, Griffon, or Peryton under your control. Monstrosities created by this spell use the rules below:",
    toUni("Control.") + " As a bonus action, you can mentally command any Monstrosities created by this spell, so long as they are within 60 feet. You determine how they act or set a general course of action for them ('defend this dungeon'). Monstrosities follow commands until they are complete. If your Monstrosity is not given a command, it defends itself with extreme prejudice.",
    toUni("Creator's Bond.") + " While a Monstrosity is under your control you can't regain the maximum hit points spent in its creation. However, when you finish a long rest, you can release control over a Monstrosity to regain the maximum hit points spent to create it. When released, Monstrosities becomes hostile to all living things, the spellcaster that created it in particular.",
    AtHigherLevels + " You can cast this spell with a spell slot of a higher level, and expend maximum hit points (Max. HP) to create more powerful Monstrosities, as shown here:",
    "Slot Level | Max. HP | Monstrosity",
    "7th | 8 | Manticore, Owlbear",
    "8th | 10 | Bulette, Girallon",
    "9th | 15 | Chimera"
  ]),
  descriptionShorter: "Create a monstrosity (see book)",
  allowUpCasting: true
};

//Create Homunculus
SpellsList["create homunculus"] = {
  name: "Create Homunculus (LL)",
  nameShort: "Create Homunculus (LL)",
  regExpSearch: /^(?=.*create)(?=.*homunculus).*$/i,
  source: ["GMB:LL", 0],
  classes: ["wizard"],
  level: 6,
  school: "Trans",
  time: "1 h",
  timeFull: "1 hour",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "clay, a sapphire worth 500 gold, and blood from the spellcaster, all of which are consumed",
  duration: "Instantaneous",
  description: "Create a homunculus servant (see book)",
  descriptionFull: desc([
    "While muttering incantations, you spill your blood onto the sapphire and place it at the heart of the clay, which you shape into your Homunculus. Your maximum hit points are reduced by 2d4 (this can't be lessened in any way), and a Homunculus comes to life under your control using the rules below:",
    toUni("Statistics.") + " The Homunculus uses the stat block below. It uses your Spellcasting Ability, the Spell Slot spent to cast this spell, your Spell Attack Modifier, and Proficiency Bonus (PB) in several places throughout the stat block.",
    toUni("Control.") + " Your Homunculus is absolutely loyal to you as its creator. It acts independently of you, but you can choose how it acts. In combat, it shares your initiative and your turn.",
    toUni("Lifeblood Bond.") + " While your Homunculus lives, you cannot regain the maximum hit points spent in its creation. Casting this spell again instantly destroys any previous Homunculus.",
    "The Homunculus cannot benefit from healing spells, short, or long rests. However, whenever you regain hit points (from a spell or rest), you can forgo regaining any number of those hit points and cause the Homunculus to regain them in your stead, so long as you are on the same plane of existence.",
    "Finally, if you should die, the Homunculus dies instantly."
  ]),
  descriptionShorter: "Create a homunculus servant (see book)"
};

//Psionic Oppression
SpellsList["psionic oppression"] = {
  name: "Psionic Oppression (LL)",
  nameShort: "Psionic Oppression (LL)",
  regExpSearch: /^(?=.*psionic)(?=.*oppression).*$/i,
  source: ["GMB:LL", 0],
  classes: ["psion(laserllama)"],
  level: 6,
  school: "Ench",
  time: "1 a",
  timeFull: "1 action",
  range: "60 feet",
  components: "V,S",
  duration: "1 minute",
  description: "12d6 psychic damage; stunned on failed save",
  descriptionFull:
    "You psionically overwhelm the mind of one creature you can see within range. It must succeed on an Intelligence saving throw or it takes 12d6 psychic damage and is stunned for 1 minute. On a successful save, the target takes half as much psychic damage and is not stunned.\n  The stunned target can repeat the saving throw at the end of each of its turns, ending the effect on a success.",
};

//###### 7TH LEVEL SPELLS ######\\

//Simulacrum ALT
SpellsList["create simulacrum"] = {
  name: "Create Simulacrum (LL)",
  nameShort: "Create Simulacrum (LL)",
  regExpSearch: /^(?=.*create)(?=.*simulacrum).*$/i,
  source: ["GMB:LL", 0],
  classes: ["wizard"],
  level: 7,
  school: "Illus",
  time: "12 h",
  timeFull: "12 hours",
  range: "10 feet",
  components: "V,S,M",
  compMaterial: "snow, the severed finger of the target, and two rubies worth 500 gold, all of which is consumed",
  duration: "Until Dispelled",
  description: "Create a duplicate of a humanoid (see book)",
  descriptionFull: desc([
    "While maintaining unwavering focus, you sculpt snow into a duplicate of a Humanoid within range for the entire casting. Placing its severed finger in its place and using the rubies as eyes, the Simulacrum comes to life, using these rules:",
    toUni("Statistics.") + " The Simulacrum uses the same statistics as the target Humanoid, but its creature type is Construct, it cannot regain hit points or benefit from short or long rests, and it is vulnerable to fire damage (due to being made of snow).",
    toUni("Control.") + " The Simulacrum is absolutely loyal to you and it obeys any orders you give it without hesitation. In combat, the Simulacrum shares your initiative and acts during your turn.",
    toUni("Illusory Being.") + " The Simulacrum cannot gain experience or levels, and it can't learn new abilities or spells of any kind.",
    "The only way for the Simulacrum to regain hit points is for a creature to touch it and spend a spell slot. The Simulacrum then regains hit points equal to 10 times that slot's level.",
    toUni("Spellcasting.") + " If the target creature can cast spells, you can command the Simulacrum to cast them, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast spells without expending spell slots.",
    toUni("Paradoxical Prevention.") + " Casting this spell again instantly destroys any other Simulacrums you have created. Moreover, each individual creature can only have one Simulacrum of it created at a time. Should another spellcaster uses this spell to craft a Simulacrum of a creature for which a Simulacrum already exists, the spell instantly fails and the slot is wasted."
  ]),
  descriptionShorter: "Create a duplicate of a humanoid (see book)"
};

//Force Cage ALT
SpellsList["forcecage"] = {
  name: "Forcecage (LL)",
  nameShort: "Forcecage (LL)",
  regExpSearch: /^(?=.*forcecage).*$/i,
  source: ["GMB:LL", 0],
  classes: ["psion(laserllama)", "warlock", "wizard"],
  level: 7,
  school: "Conj",
  time: "1 action",
  range: "60 feet",
  components: "V,S,M",
  compMaterial: "an ornate jade box worth 1,500 gp",
  duration: "Conc., 1 hr",
  description:
    "Creates a force prison (20ft cage/10ft box), teleportation requires a Cha save.",
  descriptionFull: desc([
    "A shimmering, immobile, cube-shaped prison composed of magical force springs into existence around an area of your choice within range. You choose whether this magic prison is shaped like a cage with bars or a solid box.",
    toUni("Shape.") + " If you choose cage, it can be up to 20 feet on a side and made from 1/2-inch diameter bars spaced 1/2 inch apart. If you choose box, it can be up to 10 feet on a side, creating a solid barrier that prevents any matter from passing through it and blocking any spells cast into or out of the area. The cage extends into the Ethereal Plane, blocking ethereal travel.",
    toUni("Creatures Inside.") + " When you cast the spell, any creatures that are completely inside the area of the cage are trapped. Any creatures partially within the area, or too large to fit are pushed away until they are completely outside of the cage.",
    "A creature inside the cage cannot leave it by non-magical means. If the creature tries to use teleportation or interplanar travel to leave the cage, it must first make a Charisma saving throw. The spell or effect is wasted on a failed save, but on a success the creature uses the spell or effect to escape.",
    toUni("Statistics.") + " The cage's Armor Class equals your Spell save DC and it has 200 hit points. It is immune to poison, psychic, and non-magical bludgeoning, piercing, and slashing damage, vulnerable to force and magical bludgeoning, piercing, and slashing damage, and resistant to all other damage types. It cannot be dispelled by a dispel magic spell, but a disintegrate spell destroys the cage it instantly.", // Aggiunto "it" dopo "destroys the cage"
    AtHigherLevels + " When you cast this spell using a spell slot of 8th-level or higher, the hit points of the cage created by this spell increase by 25 for each spell slot level above 7th." // Corretto "8th level" in "8th-level"
  ]),
  allowUpCasting: true,
};


//###### 8TH LEVEL SPELLS ######\\

//Animal Shapes ALT
SpellsList["animal shapes"] = {
  name: "Animal Shapes (LL)",
  nameShort: "Animal Shapes (LL)",
  regExpSearch: /^(?=.*animal)(?=.*shapes).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid"],
  level: 8,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  components: "V,S",
  duration: "Concentration, up to 24 hours",
  description: "Transform willing creatures into beasts (see book)",
  descriptionFull: desc([
    "You use elder magicks to transmute yourself and others into animal forms. Choose any number of willing creatures within range to transform into Beasts, using the following rules:",
    toUni("Form.") + " Each creature is transformed into a Beast of CR 4 or lower that you have seen before. You can choose different form for each target. On subsequent turns, you can use your action to transform one target of this spell within 30 feet into another Beast, using the same restrictions.", // Corretto "Youu" in "You" e "form" in "forms"
    toUni("Statistics.") + " The creature's game statistics are replaced by those of the Beast. However, while transformed, it retains its alignment, personality, its Hit Points, and Charisma score.",
    toUni("Actions.") + " The creature can only take the actions that would be available to that Beast. It cannot speak, cast spells, or take any actions that require hands or speech.",
    toUni("Equipment.") + " Its clothing, weapons, armor, and objects it is holding meld into the new form. However, it can't activate, use, wield, or otherwise benefit from any of its equipment.",
    toUni("Reverting.") + " A creature instantly reverts to its true form if it is reduced to 0 hit points. It can also revert to its normal form early as an action. However, once it returns to its normal form the effects of this spell end for it."
  ]),
  descriptionShorter: "Transform willing creatures into beasts (see book)"
};

//Antipathy ALT
SpellsList["antipathy"] = {
  name: "Antipathy (LL)",
  nameShort: "Antipathy (LL)",
  regExpSearch: /^(?=.*antipathy).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "psion", "shaman", "wizard"],
  level: 8,
  school: "Ench",
  time: "1 h",
  timeFull: "1 hour",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "a spoonful of vinegar for antipathy, or a drop of honey for sympathy",
  duration: "10 days",
  description: "Infuse object with repulsive or attractive magic (see book)",
  descriptionFull: desc([
    "You infuse a Huge or smaller object with powerful repulsive magic, choosing a type of intelligent creature such as bronze dragons, trolls, or hags. For the duration, this object emits a 60-foot aura of magic which repels that type of creature.",
    toUni("Effects.") + " If the chosen creature can see the object or enters its magic aura, it feels an intense urge to flee, and must make a Wisdom saving throw or become Frightened of the object.",
    "It is Frightened so long as it can see the object, or while it remains in its magical aura. While Frightened, it must use its movement to flee from the object to the nearest safe location outside of its magic aura where it cannot see the object. Once a creature does so, it is no longer Frightened of the object.",
    "The creature becomes Frightened of this object again if it can see it or if it reenters the object's magical aura.",
    toUni("Ending this Effect.") + " If an effected creature can no longer see the object and is outside of its magic aura, it can use its action to repeat the Wisdom saving throw. On a successful save, the creature knows the effect is magical in nature, and it gains immunity to the effect for 1 minute.",
    toUni("Inverse Casting.") + " You can use this spell to infuse sympathy into an object instead. If a chosen creature can see the object or moves within its magic aura, it must succeed on a Wisdom saving throw or use all its movement on each turn to move as close to the object as it can. Once it does so, it can't willingly move away from the object. If the target takes damage while under this effect, it can end the effect as described above."
  ]),
  descriptionShorter: "Infuse object with repulsive or attractive magic (see book)"
};


//###### 9TH LEVEL SPELLS ######\\

//Shapechange ALT
SpellsList["shapechange"] = {
  name: "Shapechange (LL)",
  nameShort: "Shapechange (LL)",
  regExpSearch: /^(?=.*shapechange).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid", "wizard"],
  level: 9,
  school: "Trans",
  time: "1 a",
  timeFull: "1 action",
  range: "30 feet",
  components: "V,S,M",
  compMaterial: "three interwoven circlets of gold, platinum, and lead, worth at least 1,500 gold",
  duration: "Concentration, up to 10 minutes",
  description: "Transform into a creature of CR equal to half your level (see book)",
  descriptionFull: desc([
    "You place the material component of this spell on your head and transform into a creature of CR equal to half your level, or lower. It cannot be a Construct or Undead, and you must have seen a living specimen of that creature before. It is an average specimen of that creature, and it cannot have class levels or the Spellcasting feature.",
    toUni("Statistics.") + " Your game statistics are replaced by the chosen creature's, though, you retain your alignment, personality, hit points, and Intelligence, Wisdom, and Charisma scores. You retain your proficiencies and gain those of the creature. If you both share a proficiency, you can use the higher bonus.", // Corretto "hitpoints" in "hit points"
    "You cannot use Legendary Resistances, Legendary Actions, or Lair Actions even if the chosen creature has them.",
    toUni("Features.") + " You retain your features and can use them so long as the chosen creature is capable of doing so. You don't retain special senses, but use the senses of the creature.",
    toUni("Equipment.") + " You choose whether your equipment falls to the ground, merges with your new form, or is worn by it. Your equipment does not change size to fit your new form, and you only retain its benefits if the creature you transform into can wear and use the object.",
    toUni("Shifting.") + " While the spell lasts, you can use your action to transform again, taking the shape of another creature of your choice, following the same rules and restrictions above."
  ]),
  descriptionShorter: "Transform into a creature of CR equal to half your level (see book)"
};

SpellsList["storm of vengeance"] = {
  name: "Storm of Vengeance (LL)",
  nameShort: "Storm of Vengeance (LL)",
  regExpSearch: /^(?=.*storm)(?=.*vengeance).*$/i,
  source: ["GMB:LL", 0],
  classes: ["druid"],
  level: 8,
  school: "Conj",
  time: "1 a",
  timeFull: "1 action",
  range: "Sight",
  components: "V,S",
  duration: "Conc., 1 hour",
  description:
    "You conjure a terrifying mass of storm clouds (see book)",
  descriptionFull:
    "You conjure a terrifying mass of storm clouds centered on a point you can see, spreading outward to a radius of 360 feet. You are completely immune to the effects of this dark storm. Violent winds, thunder, and lighting fill the storm, forcing all creatures within and below the storm to make a Constitution saving throw. On a failed save, they take 2d6 thunder damage and are Deafened while they remain in the area.\n   " +
    "Each subsequent round the storm lasts, you can use youraction to add (or end) one of the weather effects below, which lasts for the duration. They affect all creatures and objects inand below the storm, and each can only be added once:\n   " +
    toUni("Acid Rain") +
    " Acidic rain falls from the clouds, dealing 1d6 acid damage to all creatures at the end of each of your turns.\n   " +
    toUni("Freezing Rain") +
    " Frigid rain falls from the clouds. The area becomes difficult terrain and heavily obscured. Targets in the area take 1d6 cold damage at the end of each of your turns.\n   " +
    toUni("Hail Stones") +
    " You infuse the storm with bitter cold. At the end of each of your turns, creatures and objects in the area take 2d6 bludgeoning damage and crops are destroyed." +
    toUni("High Winds") +
    " Strong winds up to 50 miles per hour rage, instantly dispersing all fog, mist, or similar effects, mundane or magical. Ranged attacks in the area become impossible." +
    toUni("Lightning Strikes") +
    " You charge the storm with lightning. As a bonus action on each turn, you can call six bolts of lighting from the cloud, each striking targets of your choice within the area. They must make a Dexterity saving throw, taking 10d6 lighting damage on a failure, and half on a success."
};

//Weird ALT
SpellsList["weird"] = {
  name: "Weird (LL)",
  nameShort: "Weird (LL)",
  regExpSearch: /^(?=.*weird).*$/i,
  source: ["GMB:LL", 0],
  classes: ["psion(laserllama)", "warlock", "wizard"],
  level: 9,
  school: "Ench",
  time: "1 a",
  timeFull: "1 action",
  range: "120 feet",
  components: "V, S",
  duration: "Conc., 1 min",
  description:
    "Frighten multiple creatures within a 30-foot radius. Frightened creatures take 4d10 psychic damage each turn (Wis save ends).",
  descriptionFull:
    "Drawing on the deepest fears, regrets, and primal instincts of a creature, you create the illusion of the most horrifying thing imaginable to them, which is visible only to that creature.\n   Choose a point within range, and creatures of your choice within a 30-foot radius of the point become frightened for the duration. If a target is immune to the frightened condition, it must make a Wisdom saving throw or be frightened anyway.\n   At the end of each of a frightened creature's turns, it must succeed on a Wisdom saving throw or it takes 4d10 psychic damage. On a success, the spell ends for that target.",
};

// Fighting styles
// NOTE: See the lack of "var" keyword, it is important as this variable has to be global to be used in other imports
FightingStylesLL = {
  archery: {
    name: "Archery Fighting Style",
    description: desc(
      "+1 bonus to attack rolls I make with ranged weapons, ignore half-cover and treat three-quarter's cover as half-cover"
    ),
    prereqeval: function (v) {
      return What("Dex") >= 13;
    },
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          if (v.isRangedWeapon && !v.isNaturalWeapon && !v.isDC)
            output.extraHit += 1;
        },
        "My ranged weapons get a +1 bonus on the To Hit.",
      ],
    },
  },

  archery_expert: {
    name: "Archery Expert Fighting Style",
    description: desc(
      "additional +1 bonus to attack rolls I make with ranged weapons, long range no longer imposes disadvantage"
    ),
    prereqeval: function (v) {
      return hasExpertAccess("archery");
    },
    level: 6,
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          if (v.isRangedWeapon && !v.isNaturalWeapon && !v.isDC)
            output.extraHit += 1;
        },
        "My ranged weapons get an additional +1 bonus on the To Hit.",
      ],
    },
  },
  balanced: {
    name: "Balanced Fighting Style",
    description: desc(
      "+2 bonus to damage rolls I make with one-hand melee weapon and no other weapons, I can use a shield and still gain this benefit"
    ),
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          if (
            v.isMeleeWeapon &&
            !v.isNaturalWeapon &&
            !v.isDC &&
            v.theWea &&
            v.theWea.description &&
            v.theWea.description.indexOf("two-handed") == -1
          )
            output.extraDmg += 2;
        },
        "+2 bonus to damage rolls I make with one-hand melee weapon",
      ],
    },
  },

  balanced_expert: {
    name: "Balanced Expert Fighting Style",
    description: desc(
      "When I have a versatile melee weapon in one hand and a shield in the other, I use the weapon's larger damage die and I can shove with the shield as a bonus action"
    ),
    prereqeval: function (v) {
      return hasExpertAccess("balanced");
    },
    level: 6,
    action: ["bonus action", " Shove (shield)"],
  },

  brawling: {
    name: "Brawling Fighting Style",
    prereqeval: function (v) {
      return v.skillProfs.indexOf("Athletics") !== -1;
    },
    description: desc([
      "My unarmed strikes deal 1d6 damage. If I have both hands free and used my action to make only unarmed strikes, I can make a single unarmed strike, shove or grapple as bonus action.",
    ]),
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (v.baseWeaponName == "unarmed strike") {
            if (fields.Damage_Die == 1 || fields.Damage_Die == "1d4")
              fields.Damage_Die = "1d6";
          }
        },
        "My unarmed strikes deal 1d6 damage. If I have both hands free and used my action to make only unarmed strikes, I can make a single unarmed strike, shove or grapple as bonus action.",
        1,
      ],
    },
    action: ["bonus action", ""],
  },

  druidic_warrior: {
    name: "Druidic Warrior Fighting Style",
    description: desc([
      "I learn two druid cantrips that count as ranger spells for me and use Wis for spellcasting",
      "Whenever I gain a ranger level, I can swap one of these for another druid cantrip"
    ]),
    spellcastingBonus: [{
      name: "Druid cantrip",
      spellcastingAbility: 5,
      'class': 'druid',
      level: [0, 0],
      firstCol: "atwill",
      times: 2
    }]
  },

  classical: {
    name: "Classical Swordplay Fighting Style",
    description: desc(
      "+2 bonus to attack rolls and +1 to AC when wielding a finesse weapon and no other weapon, heavy armor nor shield"
    ),
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          for (var i = 1; i <= FieldNumbers.actions; i++) {
            if (/off.hand.attack/i.test(What("Bonus Action " + i))) return;
          }
          if (/\bfinesse\b/i.test(fields.Description)) output.extraHit += 2;
        },
        "When I'm wielding a finesse weapon in one hand and no weapon nor shield in my other hand, I do +2 on the attack roll with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists.",
      ],
    },
    extraAC: {
      name: "Classical Swordplay Fighting Style", // necessary for features referring to fighting style properties directly
      mod: 1,
      text: "I gain a +1 bonus to AC when wielding a finesse weapon and no other weapon, heavy armor nor shield.",
      stopeval: function (v) {
        return v.heavyArmor || v.usingShield;
      },
    },
  },
  classical_expert: {
    name: "Classical Swordplay Expert Fighting Style",
    description: desc(
      "While in Classical Swordplay, I can use a reation to add my Dex mod to my AC when hit by an attack"
    ),
    prereqeval: function (v) {
      return hasExpertAccess("classical swordplay");
    },
    level: 6,
    action: ["reaction", ""],
  },

  defensive: {
    name: "Defensive Fighting Style",
    description: desc(
      "+1 bonus to AC when I'm wearing medium, heavy armor or wielding a shield"
    ),
    extraAC: {
      name: "Defensive Fighting Style", // necessary for features referring to fighting style properties directly
      mod: 1,
      text: "I gain a +1 bonus to AC while wearing medium, heavy armor or wielding a shield.",
      stopeval: function (v) {
        return (
          !v.wearingArmor &&
          !v.usingShield &&
          v.theArmor &&
          v.theArmor.type == "light"
        );
      },
    },
  },

  defensive_expert: {
    name: "Defensive Expert Fighting Style",
    description: desc(
      "While wearing heavy armor, I reduce all non-magical bludgeoning, piercing, or slashing damage I take by my Con mod (minimum of 1). If my armor is magical, I even reduce the magical damage of those types"
    ),
    prereqeval: function (v) {
      return hasExpertAccess("defensive");
    },
    savetxt: { text: ["Damage reducing (see Defensive Expert)"] },
    level: 6,
  },

  dual_wielding: {
    name: "Dual Wielding Fighting Style",
    description: desc([
      "I can add make an additional attack when two-weapon fighting as part of my attack action",
      "When I do, I can add my ability modifier to the damage of my off-hand attacks but cannot attack with bonus action that turn",
    ]),
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          if (v.isOffHand) output.modToDmg = true;
        },
        "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks. If a melee weapon includes 'off-hand' or 'secondary' in its name or description, it is considered an off-hand attack.",
      ],
    },
    action: ["action", "Dual Wielding (one additional attack)"],
  },

  dual_wielding_expert: {
    name: "Dual Wielding Expert Fighting Style",
    description: desc([
      "When engaging in two-weapon fighting, I have +1 to my AC",
      "One-handed melee weapons are considered to have the Light property for me",
    ]),
    prereqeval: function (v) {
      return hasExpertAccess("dual wielding");
    },
    level: 6,
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          if (
            v.isRangedWeapon &&
            !v.isNaturalWeapon &&
            !v.isDC &&
            v.theWea &&
            v.theWea.description &&
            v.theWea.description.indexOf("two-handed") == -1 &&
            v.theWea.description.indexOf("light") == -1
          )
            v.description += ", light";
        },
        "One-handed melee weapons are considered to have the Light property for me",
      ],
    },
    extraAC: {
      name: "Dual Wielding Expert Fighting Style", // necessary for features referring to fighting style properties directly
      mod: 1,
      text: "I gain a +1 bonus to AC when wielding two melee weapons.",
      stopeval: function (v) {
        return v.usingShield;
      },
    },
  },

  great_weapon: {
    name: "Great Weapon Fighting Style",
    description: desc([
      "While wielding a heavy melee weapon in two hands and making an attack with my action, I treat total damage dice rolls lower than avarage as: d4 (2), d6 (3), d8 (4), d10 (5), d12 (6)",
    ]),
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (v.isMeleeWeapon && /\bheavy\b/i.test(fields.Description)) {
            fields.Description +=
              (fields.Description ? "; " : "") +
              "Treat total damage dice rolls lower than avarage as: d4 (2), d6 (3), d8 (4), d10 (5), d12 (6)";
          }
        },
        "While wielding a heavy melee weapon in two hands and making an attack with my action, I treat total damage dice rolls lower than avarage as: d4 (2), d6 (3), d8 (4), d10 (5), d12 (6)",
      ],
    },
  },

  great_weapon_expert: {
    name: "Great Weapon Expert Fighting Style",
    description: desc([
      "Whenever I reduce a creature to 0 hit points with a heavy melee weapon attack, I make an additional attack with that action, bonus action or reaction",
    ]),
    prereqeval: function (v) {
      return hasExpertAccess("great weapon fighting");
    },
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (v.isMeleeWeapon && /\bheavy\b/i.test(fields.Description)) {
            fields.Description +=
              (fields.Description ? "; " : "") +
              "I make an additional attack if I reduce the creature to 0";
          }
        },
        "Whenever I reduce a creature to 0 hit points with a heavy melee weapon attack, I make an additional attack with that action, bonus action or reaction",
      ],
    },
    action: ["action", "Great Weapon Expert (one additional attack)"],
  },

  mounted: {
    name: "Mounted Warrior Fighting Style",
    description: desc(
      "+1 bonus to AC to me and my mount when riding, I can use my bonus action to command"
    ),
    prereqeval: function (v) {
      return v.skillProfs.indexOf("Animal Handling") !== -1;
    },
    extraAC: {
      name: "Mounted Warrior Fighting Style",
      mod: 1,
      text: "I gain a +1 bonus to AC when riding a controlled mount",
    },
    action: ["bonus action", " (command)"],
  },
  // Note: it is not possible to check for AC bonus easily here, so I'll leave it like this

  polearm: {
    name: "Polearm Fighting Style",
    description: desc(
      "+1 bonus to attack rolls I make with glaives, halberds, pikes, quaterstaffs and spears wielding only that weapon and no shield",
      "While Polearm Fighting, creatures provoke opportunity attacks from me when entering my reach"
    ),
    prereqeval: function (v) {
      return What("Dex") >= 11 || What("Str") >= 11;
    },
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          var testRegex =
            /\b(polearm|glaive|halberd|lance|pike|quarterstaff|spear)\b/i;
          if (v.isMeleeWeapon && testRegex.test(v.thisWeapon[0])) {
            output.extraDmg += 1;
          }
        },
        "+1 bonus to attack rolls I make with glaives, halberds, pikes, quaterstaffs and spears wielding only that weapon and no shield",
      ],
    },
    action: ["reaction", "Attack (enter reach)"],
    weaponProfs: [false, false, ["polearm butt end"]],
  },

  polearm_expert: {
    name: "Polearm Fighting Style",
    description: desc(
      "When I take the attack action while in Polearm fighting, I can use my bonus action to attack with the end of the weapon (1d4 + Str bludg)"
    ),
    prereqeval: function (v) {
      return hasExpertAccess("polearm fighting");
    },
    weaponOptions: [
      {
        regExpSearch:
          /^(?=.*(polearm|(glaive|guandao|bisento|naginata)|(halberd|\bji\b|kamayari)|(quarterstaff|\bstaff\b|\bbo\b)|(spear|qiang|\byaris?\b)))(?=.*butt)(?=.*end).*$/i,
        name: "Polearm Butt End",
        source: [["GMB:LL", 2]],
        ability: 1,
        type: "polearm butt end",
        damage: [1, 4, "bludgeoning"],
        range: "Melee",
        description:
          "As bonus action after Attack action with only a glaive, halberd, spear, or quarterstaff",
        abilitytodamage: true,
        selectNow: true,
      },
    ],
    action: ["bonus action", "Butt End Attack (after attack with polearm)"],
    weaponProfs: [false, false, ["polearm butt end"]],
  },

  protection: {
    name: "Protection Fighting Style",
    description: desc([
      "As a reaction, I can add my prof bonus to AC against an attack made vs. me or someone within 5 ft of me. I need to be wielding a shield or a melee weapon to do this.",
    ]),
    action: ["reaction", ""],
  },

  protection_expert: {
    name: "Protection Expert Fighting Style",
    description: desc([
      "As a reaction, I can add my prof bonus to Dexterity Save for someone within 5 ft of me. I need to be wielding a shield to do this after the roll but before I know the outcome.",
    ]),
    prereqeval: function (v) {
      return hasExpertAccess("protection");
    },
    action: ["reaction", ""],
    level: 6,
  },

  strongbow: {
    name: "Strongbow Fighting Style",
    description: desc(
      "I can use Strength for ranged attacks with longbows and shortbows, +1 damage when I do"
    ),
    calcChanges: {
      atkAdd: [
        function (fields, v, output) {
          if (
            v.isRangedWeapon &&
            (v.WeaponName == "shortbow" ||
              v.baseWeaponName == "shortbow" ||
              v.WeaponName == "longbow" ||
              v.baseWeaponName == "longbow")
          ) {
            fields.Mod = 1;
          }
        },
        "Strength-based attacks with longbows and shortbows get a +1 bonus damage",
      ],
      atkCalc: [
        function (fields, v, output) {
          if (
            v.isRangedWeapon &&
            (v.WeaponName == "shortbow" ||
              v.baseWeaponName == "shortbow" ||
              v.WeaponName == "longbow" ||
              v.baseWeaponName == "longbow")
          ) {
            output.extraDmg += 1;
          }
        },
        "Strength-based attacks with longbows and shortbows get a +1 bonus damage",
      ],
    },
  },

  versatile: {
    name: "Versatile Fighting Style",
    description: desc([
      "+1 bonus to attack rolls when wielding a single versatile weapon and no shield",
      "When attacking with it, I can take a bonus action to grapple, shove or use an object",
    ]),
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          for (var i = 1; i <= FieldNumbers.actions; i++) {
            if (/off.hand.attack/i.test(What("Bonus Action " + i))) return;
          }
          if (/\bversatile\b/i.test(fields.Description)) output.extraHit += 1;
        },
        "I get a +1 bonus to attack rolls when wielding a single versatile weapon and no shield",
      ],
    },
    action: [
      "bonus action",
      "Grapple, shove or use an object (with Attack action)",
    ],
  },

  // Fighting styles from expanded alternate fighter
  blind: {
    name: "Blind Warrior Fighting Style",
    description: desc([
      "I gain blindsight for a range of 5 times my prof bonus",
      "In that range, I can see invisible creatures and anything that isn't behind total cover or hidden",
    ]),
    changeeval: function (lvl, chc) {
      var srcNm = "Blind Warrior Fighting Style";
      var curRange =
        CurrentProfs.vision.blindsight &&
        CurrentProfs.vision.blindsight.ranges[srcNm];
      var newRange = lvl[1] && Number(How("Proficiency Bonus")) * 5;

      // Only do something if the range changed
      if (curRange !== newRange) {
        // First remove the old range, if any
        if (curRange) SetProf("vision", false, "Blindsight", srcNm, curRange);
        // Then set the new range, unless the feature is removed (i.e. lvl[1] === 0)
        if (newRange) SetProf("vision", true, "Blindsight", srcNm, newRange);
      }
    },
  },

  brawling_expert: {
    name: "Brawling Expert Fighting Style",
    description: desc(
      "+1 damage to my unarmed strikes and I gain the benefits below while grappling creatures:",
      "\n\u2022 I can drag grappled creatures up to my full speed." +
      "\n\u2022 In place of an attack on a grappled creature by me, I can grapple check again to restrain the creature."
    ),
    prereqeval: function (v) {
      return hasExpertAccess("brawling");
    },
    actrion: ["action", "Restrain grapple (one attack on grappled)"],
    level: 6,
  },

  featherweight: {
    name: "Featherweight Fighting Style",
    description: desc(
      "+1 bonus to damage rolls and +10 ft to speed when wielding only light weapons and not wearing medium or heavy armor nor shield"
    ),
    prereqeval: function (v) {
      return What("Dex") >= 13 && v.skillProfs.indexOf("Acrobatics") !== -1;
    },
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          if (
            v.baseWeaponName == "unarmed strike" ||
            /\blight\b/i.test(fields.Description)
          )
            output.extraDmg += 1;
        },
        "When I'm wielding light weapons and not wearing medium or heavy armor nor a shield, I do +1 damage with light weapons and unarmed strikes.",
      ],
    },
    speed: {
      allModes: "+10",
    },
  },

  featherweight_expert: {
    name: "Featherweight Expert Fighting Style",
    description: desc(
      "While Featherweight fighting, creatures do opportunity attacks against me with disadv. and I can Disengage with bonus action"
    ),
    prereqeval: function (v) {
      return hasExpertAccess("featherweight");
    },
    actrion: ["bonus action", "Disengage"],
    level: 6,
  },

  heavyweight: {
    name: "Heavyweight Fighting Style",
    description: desc(
      "+1 damage to damage rolls and I can shove with a bonus action and advantage a creature I hit with a heavy melee weapon"
    ),
    prereqeval: function (v) {
      return What("Str") >= 13;
    },
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (v.isMeleeWeapon && /\bheavy\b/i.test(fields.Description)) {
            fields.Description +=
              (fields.Description ? "; " : "") +
              "Adv. on Strength (Athletics) checks to shove";
          }
        },
        "I can shove with a bonus action and advantage a creature I hit with a heavy melee weapon",
      ],
      atkCalc: [
        function (fields, v, output) {
          if (v.isMeleeWeapon && /\bheavy\b/i.test(fields.Description)) {
            output.extraDmg += 1;
          }
        },
        "+1 damage to damage rolls",
      ],
    },
  },

  heavyweight_expert: {
    name: "Heavyweight Expert Fighting Style",
    description: desc(
      "When I hit a creature my size or smaller, it is knock 5 feet away from me in straight line as long the space behind is unoccupied"
    ),
    prereqeval: function (v) {
      return hasExpertAccess("featherweight");
    },
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (v.isMeleeWeapon && /\bheavy\b/i.test(fields.Description)) {
            fields.Description +=
              (fields.Description ? "; " : "") +
              "knock 5 feet away from me my size or smaller";
          }
        },
        "When I hit a creature my size or smaller, it is knock 5 feet away from me in straight line as long the space behind is unoccupied",
      ],
    },
    level: 6,
  },

  hurler: {
    name: "Hurler Fighting Style",
    description: desc([
      "I can draw the thrown weapon as part of a ranged attack",
      "The range of my thrown weapon attacks is doubled",
      "If I am wielding only thrown weapons I can make a single throw ranged attack as a bonus action",
    ]),
    prereqeval: function (v) {
      return What("Str") >= 11 || What("Dex") >= 11;
    },
    calcChanges: {
      atkAdd: [
        function (fields, v, output) {
          if (/\bthrown\b/i.test(fields.Description)) {
            var newRange = doubleRange(fields.Range);
            fields.Range = newRange;
          }
        },
        "My thrown weapons attack range is doubled.",
      ],
    },
  },

  improvised: {
    name: "Improvised Fighting Style",
    description: desc([
      "I am proficient with improvised weapons",
      "I can choose to deal maximum damage with a non-magical object but it destroys the object",
    ]),
    weaponProfs: [false, false, ["Improvised weapons"]],
  },

  exotic: {
    name: "Exotic Warrior Fighting Style",
    description: desc([
      "I am proficient with two exotic weapons of my choice",
      "I do 1d8(1d10) pierce damage with Tridents",
      "I do not have disadv. on net's attacks against a creature within 5 feet",
      "I can throw the net in place of one attack",
    ]),
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (v.WeaponName == "net" || v.baseWeaponName == "net") {
            fields.Description =
              "Thrown, no disadv. in melee, can throw net in place of one attack";
          }

          if (
            (v.WeaponName == "trident" || v.baseWeaponName == "trident") &&
            (fields.Damage_Die == "1d4" || fields.Damage_Die == "1d6")
          ) {
            fields.Damage_Die = "1d8";
            fields.Description = "Thrown, versatile (1d10)";
          }
        },
        "Nets attack only replace one attack, no disadv. in melee and my tridents deal 1d8 (1d10) damage",
      ],
    },
    weaponProfs: [false, false, ["exotic 1", "exotic 2"]],
  },

  marksman: {
    name: "Melee Marksman Fighting Style",
    description: desc([
      "I don't suffer disadv. on ranged attack rolls for being within 5 ft of a hostile creature if I target a creature within 5 feet",
      "When I make a ranged attack in my Attack action against a creature within 5 ft, It cannot target me with opportunity attacks regardless hit or miss for the rest of that turn",
    ]),
  },

  mariner: {
    name: "Mariner Fighting Style",
    description: desc([
      "+1 bonus to AC and swimming speed when not wearing heavy armor nor shield",
      "I suffer none of the normal drawbacks of underwater combat",
    ]),
    extraAC: {
      name: "Mariner Fighting Style",
      mod: 1,
      text: "I gain a +1 bonus to AC when not wearing heavy armor nor shield.",
      stopeval: function (v) {
        return v.heavyArmor || v.usingShield;
      },
    },
    speed: {
      swim: { spd: "walk", enc: 0 },
    },
  },

  mountaineer: {
    name: "Mountaineer Fighting Style",
    description: desc([
      "+1 bonus to AC and climbing speed when not wearing heavy armor nor shield",
      "I can use my reaction to reduce fall damage by twice my level",
    ]),
    extraAC: {
      name: "Mountaineer Fighting Style",
      mod: 1,
      text: "I gain a +1 bonus to AC when not wearing heavy armor nor shield.",
      stopeval: function (v) {
        return v.heavyArmor || v.usingShield;
      },
    },
    speed: {
      climb: { spd: "walk", enc: 0 },
    },
    action: ["reaction", "Reduce Fall Damage"],
  },
  mounted_expert: {
    name: "Mounted Expert Fighting Style",
    description: desc([
      "While Mounted Warrior Fighting, I have advantage on melee attacks against unmounted creatures smaller than my mount",
      "When my mountd takes damage I can use my reaction to take damage instead of it",
    ]),
    prereqeval: function (v) {
      return hasExpertAccess("mounted warrior");
    },
    action: ["reaction", "Take Damage Instead Mount"],
  },

  shieldwarrior: {
    name: "Shield Warrior Fighting Style",
    description: desc([
      "I gain proficiency with shields as martial melee weapon, which deal 2d4 bludg. damage on hit",
      "When I'm wielding a shield and nothing else, +1 to AC and attack rolls with that shield",
    ]),
    extraAC: {
      name: "Shield Warrior Fighting Style",
      mod: 1,
      text: "I gain a +1 bonus to AC while wielding a shield and nothing else.",
      stopeval: function (v) {
        return !v.usingShield;
      },
    },
    weaponOptions: {
      regExpSearch: /(shield|bash)/i,
      name: "Shield Melee Attack",
      ability: 1,
      type: "shield melee attack",
      damage: [2, 4, "bludgeoning"],
      range: "Melee",
      list: "melee",
      abilitytodamage: true,
    },
    weaponsAdd: ["Shield Melee Attack"],
    weaponProfs: [false, false, ["shield melee attack"]],
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          for (var i = 1; i <= FieldNumbers.actions; i++) {
            if (/off.hand.attack/i.test(What("Bonus Action " + i))) return;
          }

          if (/shield melee attack/i.test(v.baseWeaponName)) {
            output.extraHit += 1;
          }
        },
        "When wielding a shield and nothing else, my shield attacks get a +1 bonus on the To Hit. This condition will always be false if the bonus action 'Off-hand Attack' exists.",
      ],
    },
  },

  shieldwarrior_expert: {
    name: "Shield Expert Fighting Style",
    description: desc([
      "While wearing a shield I can Shove with a bonus action, even without attacking",
      "While wearing a shield I add my shield bonus to the dexterity saving throws I make",
    ]),
    prereqeval: function (v) {
      return hasExpertAccess("shield warrior");
    },
    action: ["bonus action", "Shield Shove"],

    savetxt: { text: ["shield bonus to dex save (shield on)"] },
  },

  standardbearer: {
    name: "Standard Bearer Fighting Style",
    description: desc([
      "As a reaction, I can give adv. to an attack made by friendly creature within 5 ft of me if I see the target",
      "I need to be wielding a standard or banner to do this",
    ]),
    prereqeval: function (v) {
      return What("Cha") >= 13;
    },
    action: ["reaction", ""],
  },

  superior_technique: {
    name: "Superior Technique Fighting Style",
    description: desc([
      "I learn a 1st-degree Martial Exploit from those avaible for Fighter(Laserllama),",
      " it doesn't count against my total Exploit Known",
      "I gain one additional Exploit Die",
    ]),
    prereqeval: function (v) {
      if (classes.known["fighter(laserllama)"]) {
        return classes.known["fighter(laserllama)"].level >= 6;
      }
      return false;
    },
    extraLimitedFeatures: [
      {
        name: "Exploit Dice",
        usages: 1,
        additional: [
          "",
          "d6",
          "d6",
          "d6",
          "d8",
          "d8",
          "d8",
          "d8",
          "d8",
          "d8",
          "d10",
          "d10",
          "d10",
          "d10",
          "d10",
          "d10",
          "d12",
          "d12",
          "d12",
          "d12",
        ],
        recovery: "short rest",
        addToExisting: true,
      },
    ],
    bonusClassExtrachoices: [
      {
        class: "fighter(laserllama)",
        subclass: "fighter(laserllama)-master at arms",
        feature: "subclassfeature7",
        bonus: 1,
      },
    ],
  },
  //Warlord Fighting Style
  tactical: {
    name: "Tactical Fighting Style",
    description: desc([
      "I can Help or Search with a bonus action",
      " Help has a range of 30 so long as the attacker can hear me",
    ]),
    prereqeval: function (v) {
      return What("Int") >= 13;
    },

  }
};
// Mystic Talents
// NOTE: See the lack of "var" keyword, it is important as this variable has to be global to be used in other imports
MysticTalentsLL = {
  "celerity i": {
    name: "Celerity I",
    description: desc([
      "My speed +10 feet, and I can take the Dash or Disengage action as a bonus action.",
    ]),
    submenu: "[psion level 1+]",
    speed: { walk: { spd: "+10", enc: "+10" } },
    source: [["GMB:LL", 0]],
  },
  "celerity ii": {
    name: "Celerity II",
    submenu: "[psion level 5+]",
    description: desc([
      "prereq: 5th-Level Psion, Celerity I",
      "My speed additional +5 feet, I ignore difficult terrain on dash or disingage and I can move across liquids and vertical surfaces without falling until the end of my turn.",
    ]),
    speed: { walk: { spd: "+5", enc: "+5" } },
    talentLevel: 5,
  },
  "celerity iii": {
    name: "Celerity III",
    submenu: "[psion level 11+]",
    description: desc([
      "prereq: 11th-Level Psion, Celerity I, II",
      "My speed additional +5 feet, I became invisible on dash or disingage until I stop moving or until the end of my turn.",
    ]),
    speed: { walk: { spd: "+5", enc: "+5" } },
    talentLevel: 11,
  },
  "celerity iv": {
    name: "Celerity IV",
    submenu: "[psion level 16+]",
    description: desc([
      "prereq: 16th-Level Psion, Celerity I, II, III",
      "I can take a second action but only for dash, disingage or dodge.",
    ]),
    talentLevel: 16,
  },
  "iron durability i": {
    name: "Iron Durability I",
    description: desc([
      "Without armor, my AC is 10 + Constitution modifier + Intelligence modifier + shield",
    ]),
    submenu: "[psion level 1+]",
    source: [["GMB:LL", 0]],
    armorOptions: [
      {
        regExpSearch: /^(?=.*(iron))(?=.*durability)(?=.*i).*$/i,
        name: "Iron Durability I",
        source: [["GMB:LL", 0]],
        ac: "10+Con+Int",
        dex: -10,
        affectsWildShape: true,
        selectNow: true,
        type: "light",
      },
    ],
    armorAdd: "Iron Durability I",
  },
  "iron durability ii": {
    name: "Iron Durability II",
    description: desc([
      "prereq: 5th-Level Psion, Iron Durability I",
      "As a bonus action I gain temp hp to equal my Int Mod (min of 1).",
    ]),
    talentLevel: 5,
    submenu: "[psion level 5+]",
    source: [["GMB:LL", 0]],
    action: ["bonus action", ""],
  },
  "iron durability iii": {
    name: "Iron Durability III",
    description: desc([
      "prereq: 11th-Level Psion, Iron Durability I, II",
      "As a reaction I can spend 3 Psi Points ot gain resistance of to the incoming damage's type.",
      "The resistance last until I use this ability again.",
    ]),
    talentLevel: 11,
    submenu: "[psion level 11+]",
    source: [["GMB:LL", 0]],
    action: ["reaction", ""],
  },
  "iron durability iv": {
    name: "Iron Durability IV",
    description: desc([
      "prereq: 16th-Level Psion, Iron Durability I, II, III",
      "I have resistance to all bludgeoning, piercing, slashing damage.",
      "Whenever I take damage, it is reduced by an amount equal to my Int Mod (min of 1).",
    ]),
    talentLevel: 16,
    submenu: "[psion level 16+]",
    source: [["GMB:LL", 0]],
    dmgres: ["Bludgeoning", "Piercing", "Slashing"],
  },
  "metamorphosis i": {
    name: "Metamorphosis I",
    description: desc([
      "I learn the psionic strike Cantrip. I can use my Intelligence for that Cantrip, Strength checks and unarmed strikes.",
    ]),
    submenu: "[psion level 1+]",
    source: [["GMB:LL", 0]],
    spellcastingBonus: [
      {
        name: "Metamorphosis I",
        firstCol: "M1C",
        spells: ["psionic strike"],
        selection: ["psionic strike"],
        times: 1,
      },
    ],
    spellChanges: {
      "psionic strike": {
        changes:
          "You can use Intelligence instead of Strength to calculate the damage of this spell.",
      },
    },
  },
  "metamorphosis ii": {
    name: "Metamorphosis II",
    description: desc([
      "prereq: 5th-Level Psion, Metamorphosis I",
      "As a bonus action I can spend 2 Psi Points to change my size (Large or Tiny) unitl 1 min or incapacitated or bonus action to end it.",
      "Large (temp hp equal to my Int Mod, +1d4 damage melee atks, adv on Str checks and saves).",
      "Tiny (I can move through 6-inches space w/out squeeze, bonus on Stealth checks equal to my Int Mod -min of 1-).",
    ]),
    talentLevel: 5,
    submenu: "[psion level 5+]",
    source: [["GMB:LL", 0]],
    action: [
      ["bonus action", "Meta. Large (start)"],
      ["bonus action", "Meta. Large (end)"],
      ["bonus action", "Meta. Tiny (start)"],
      ["bonus action", "Meta. Tiny (end)"],
    ],
  },
  "metamorphosis iii": {
    name: "Metamorphosis III",
    description: desc([
      "prereq: 11th-Level Psion, Metamorphosis I, II",
      "As a bonus action I can spend 4 Psi Points to cast Polymorph (LL) targeting myself.",
    ]),
    talentLevel: 11,
    submenu: "[psion level 11+]",
    source: [["GMB:LL", 0]],
    action: [["bonus action", "Meta. III Polymorph"]],
    spellcastingBonus: [
      {
        name: "Metamorphosis III",
        firstCol: "M-3",
        spells: ["polymorph ll"],
        selection: ["polymorph ll"],
        times: 1,
      },
    ],
    spellChanges: {
      "polymorph ll": {
        changes:
          "You can cast it only targeting yourself" +
          "\n   " +
          "You retain your mental ability scores, the ability to use Psionics, and any Awakening features or Mystic Talents that your new form is physically capable of using with its anatomy.",
      },
    },
  },
  "metamorphosis iv": {
    name: "Metamorphosis IV",
    description: desc([
      "prereq: 16th-Level Psion, Metamorphosis I, II, III",
      "As a bonus action I can spend 5 Psi Points to change my size (Huge or Diminutive) unitl 1 min or incapacitated or bonus action to end it.",
      "Huge (temp hp equal to twice my Int Mod, +2d6 damage melee atks, adv on Str checks and saves).",
      "Diminutive (1-inch height, I cannot makes weapon atks, bonus on Stealth checks equal to my Psion Level).",
    ]),
    talentLevel: 16,
    submenu: "[psion level 16+]",
    source: [["GMB:LL", 0]],
    action: [
      ["bonus action", "Meta. Huge (start)"],
      ["bonus action", "Meta. Huge (end)"],
      ["bonus action", "Meta. Diminutive (start)"],
      ["bonus action", "Meta. Diminutive (end)"],
    ],
  },
  "precognition i": {
    name: "Precognition I",
    description: desc([
      "I cannot be surprised unless unconscious, asleep or incapacitated. I have a bonus to my initiative rolls equal to my Intelligence modifier (minimun of +1)",
    ]),
    submenu: "[psion level 1+]",
    source: [["GMB:LL", 0]],
  },
  "precognition ii": {
    name: "Precognition II",
    description: desc([
      "prereq: 5th-Level Psion, Precognition I",
      "When I am hit by an attack I can see, I can use my reaction to have 1d4 bonus on my AC against that attack.",
    ]),
    talentLevel: 5,
    submenu: "[psion level 5+]",
    source: [["GMB:LL", 0]],
    action: [["reaction", "Precognition II"]],
  },
  "precognition iii": {
    name: "Precognition III",
    description: desc([
      "prereq: 11th-Level Psion, Precognition I, II",
      "As a bonus action, I can enter a state (con. on it like a spell). For duration, I add 1d4 to checks, attacks amd saves.",
    ]),
    talentLevel: 11,
    submenu: "[psion level 11+]",
    source: [["GMB:LL", 0]],
    action: [["bonus action", "Precognition III"]],
  },
  "precognition iv": {
    name: "Precognition IV",
    description: desc([
      "prereq: 16th-Level Psion, Precognition I, II, III",
      "As a reaction, when rolling initiative, I can take a turn before any other creatures." +
      "Additionally, when in precognitive state I gain an additional reaction each round, but only one reaction per trigger.",
    ]),
    talentLevel: 16,
    submenu: "[psion level 16+]",
    source: [["GMB:LL", 0]],
    action: [["reaction", "Precognition IV"]],
  },
  "restoration i": {
    name: "Restoration I",
    description: desc([
      "I have a Restoration Pool hit points equal my Psion Level x5. As an action, I can touch a creature to restore its HP up to what left in my pool",
    ]),
    submenu: "[psion level 1+]",
    source: [["GMB:LL", 0]],
    action: [["action", "Restoration Talent"]],
    extraLimitedFeatures: [
      {
        name: "Rest. Pool Points",
        usages: "Psion level × 5",
        usagescalc: "event.value = (classes.known['psion(laserllama)'] ? classes.known['psion(laserllama)'].level : 0) * 5;",
        recovery: "long rest",
      },
    ],
  },
  "restoration ii": {
    name: "Restoration II",
    description: desc([
      "prereq: 5th-Level Psion, Restoration I",
      "As an action, I can touch a creature to end blinded, charmed, defened, frightened,paralyzed, poisoned and/or stunned condition per 5 Restoration Pool points each." +
      "I can use my other Restoration Talent powers as part of one touch, expending points for each effect.",
    ]),
    talentLevel: 5,
    submenu: "[psion level 5+]",
    source: [["GMB:LL", 0]],
  },
  "restoration iii": {
    name: "Restoration III",
    description: desc([
      "prereq: 11th-Level Psion, Restoration I, II",
      "As an action, I can touch a dead creature died no longer than 10 minutes, spending 10 Restoration Pool Points, to bring it back to life with 1 Hit Point, that is not died of old age or natural causes." +
      "I can use my other Restoration Talent powers as part of one touch, expending points for each effect.",
    ]),
    talentLevel: 11,
    submenu: "[psion level 11+]",
    source: [["GMB:LL", 0]],
  },
  "restoration iv": {
    name: "Restoration IV",
    description: desc([
      "prereq: 16th-Level Psion, Restoration I, II, III",
      "I can use my Restoration Talent powers on any once creature that I can see within 120 feet." +
      "As an action, with 10 Restoration Pool Points, I can end the following effects: petrified, on level one level of exhaustation, reduction to an ability score or reduction to hit point maximum.",
    ]),
    talentLevel: 16,
    submenu: "[psion level 16+]",
    source: [["GMB:LL", 0]],
  },
  "telekinesis i": {
    name: "Telekinesis I",
    description: desc([
      "I learn the mage hand Cantrip. It can use my Intelligence instead of Strength and some extras.",
    ]),
    submenu: "[psion level 1+]",
    source: [["GMB:LL", 0]],
    spellcastingBonus: [
      {
        name: "Telekinesis I",
        firstCol: "TkI",
        spells: ["mage hand"],
        selection: ["mage hand"],
        times: 1,
      },
    ],
    spellChanges: {
      "mage hand": {
        changes:
          "You can cast it without V,S components." +
          "\n   " +
          "The hand is invisible and is capable of anything you can would be capable of doing with one of your hands, including shoving, grappling, and using tools. However, it uses my Intelligence, in place of my Strength, for ability checks." +
          "\n   " +
          "The hand can push, pull, drag, or lift a number of pounds equals ot 10 times your Intelligence score (minimum of 10).",
      },
    },
  },
  "telekinesis ii": {
    name: "Telekinesis II",
    description: desc([
      "prereq: 5th-Level Psion, Telekinesis I",
      "When I manifest mage hand, I manifest two hands that use the rules of Telekinesis I.",
    ]),
    talentLevel: 5,
    submenu: "[psion level 5+]",
    source: [["GMB:LL", 0]],
    spellChanges: {
      "mage hand": {
        changes:
          "You manifest two hands instead of one." +
          "\n   " +
          "You can move one of the hands as an action or bonus action (but not both). If the mage hands are in the same space you can use both of them together, andthey are capable of anything you would be capable of doingwith both of your hands at one time." +
          "\n   " +
          "If they are in the same space and used together, the mage hands can push, pull, drag, or lift a number of pounds equal to 30 times your Intelligence score (minimum of 30).",
      },
    },
  },
  "telekinesis iii": {
    name: "Telekinesis III",
    description: desc([
      "prereq: 11th-Level Psion, Telekinesis I, II",
      "I learn the Telekinesis spell. I can cast it w/out V,S conponents (but I always need to spend Psi Points to cast it), and it last as long as I can mantain concentration.",
    ]),
    talentLevel: 11,
    submenu: "[psion level 11+]",
    source: [["GMB:LL", 0]],
    spellcastingBonus: [
      {
        name: "Telekinesis III",
        firstCol: "TkIII",
        spells: ["telekinesis"],
        selection: ["telekinesis"],
        times: 1,
      },
    ],
    spellChanges: {
      telekinesis: {
        changes:
          "You  cast it without V,S components." +
          "\n   " +
          "It last as long as You can mantain concentration.",
      },
    },
  },
  "telekinesis iv": {
    name: "Telekinesis IV",
    description: desc([
      "prereq: 16th-Level Psion, Telekinesis I, II, III",
      "I can cast Telekinesis at will without spending Psi Points (regardless of Telekinesis III).",
      "Whenever I make a check by Mage Hand or Telekinesis, I can spend 1 Psi Points to gain advantage on the roll.",
    ]),
    talentLevel: 16,
    submenu: "[psion level 16+]",
    source: [["GMB:LL", 0]],
  },
  "telepathy i": {
    name: "Telepathy I",
    description: desc([
      "I can communicate with any crea I can see w/in 60 feet that can speak at least a language. I can telepathic fullfill V component for one of the spells' targets so long It fullfill the Telepathy I requirements.",
    ]),
    submenu: "[psion level 1+]",
    source: [["GMB:LL", 0]],
  },
  "telepathy ii": {
    name: "Telepathy II",
    description: desc([
      "prereq: 5th-Level Psion, Telepathy I",
      "The range of my telepathy becomes 1000 feet." +
      "As an action I can telepatically link creatures eligible for Telepathy I up to my Int Mod to a Telepathic Network. Linked creature can communicate telepathically while within 1000 feet of me.",
    ]),
    talentLevel: 5,
    submenu: "[psion level 5+]",
    source: [["GMB:LL", 0]],
    action: [["action", "Telepathic Network"]],
  },
  "telepathy iii": {
    name: "Telepathy III",
    description: desc([
      "prereq: 11th-Level Psion, Telepathy I, II",
      "The range of my telepathy becomes 1 mile." +
      "I can link a creature I cannot see only if it was linked previously to my Telepathic Network.",
    ]),
    talentLevel: 11,
    submenu: "[psion level 11+]",
    source: [["GMB:LL", 0]],
  },
  "telepathy iv": {
    name: "Telepathy IV",
    description: desc([
      "prereq: 16th-Level Psion, Telepathy I, II, III",
      "My telepathy has no range limit." +
      "Whenever a creature linked to my Telepathic Network is forced to make a save I can use my reaction, and expending 1 Psi Point, to add my Int Mod to the result of the roll.",
    ]),
    talentLevel: 16,
    submenu: "[psion level 16+]",
    source: [["GMB:LL", 0]],
    action: [["reaction", "TN Save Bonus"]],
  },
};
// Eldritch Invocations
// NOTE: See the lack of "var" keyword, it is important as this variable has to be global to be used in other imports
EldritchInvocationsLL = {
  "armor of shadows": {
    name: "Armor of Shadows",
    description: "While I have no armor or shield, I can use an action to ward myself (or dismiss) with living shadows. While unarmored and unshielded, my AC is 13 + my Pact ability modifier.",
    action: ["action", " (ward/dismiss)"],
    armorOptions: [
      {
        name: "Armor of Shadows",
        source: ["HB", 0],
        regExpSearch: /^(?=.*armor)(?=.*shadows).*$/i,
        ac: "13+Int",
        dex: -10,
        type: "",
        list: "magic",
        stealthdis: false,
        isMagicArmor: true,
        weight: 0,
        invName: "Armor of Shadows",
        affectsWildShape: true,
      },
    ],
    armorAdd: "Armor of Shadows"
  },
  "aspect of the moon": {
    name: "Aspect of the Moon",
    description: "\n    I do not need to sleep and cannot be forced to sleep by any means." +
      "\n    I gain the benefits of long rest if I spend 8 hours doing only light activity ",
    savetxt: { immune: ["sleep"] }
  },
  "eyes of the rune keeper": {
    name: "Eyes of the Rune Keeper",
    description: "\n    I can read and understand any writtern words, symbols, or scripts as if they were written in my native tongue",
    languageProfs: ["Any written language"],
  }
};
// Knacks
// NOTE: See the lack of "var" keyword, it is important as this variable has to be global to be used in other imports
KnacksLL = {
  "alpine adept": {
    name: "Alpine Adept",
    description: "You gain a 30-foot climbing speed, and you can use your reaction to reduce any falling damage you take by an amount equal to your Ranger level. If you already have a climbing speed it increases by 10 feet.",
    speed: [["climb", { spd: "30 ft" }], ["climb", { bonus: "+10" }]],
    action: [["reaction", ""]]
  },
  "aquatic adept": {
    name: "Aquatic Adept",
    description: "You gain a 30-foot swimming speed, and while you are underwater, you can hold your breath for up to 1 hour. If you already have a swimming speed it increases by 10 feet.",
    speed: [["swim", { spd: "30 ft" }], ["swim", { bonus: "+10" }]],
  },
  "favored foe": {
    name: "Favored Foe",
    description: desc([
      "You are especially adept at studying, tracking, and hunting aspecific type of enemy. Choose one creature type, two races of humanoid (such as gnolls and orcs), or one organization(like a thieves' guild or an evil cult) as your Favored Foe.",
      " Whenever you make a Wisdom check to hunt or track, oran Intelligence check to recall knowledge about a FavoredFoe, you can treat a roll of 9 or lower on the d20 as a 10.",
      " You can choose to learn this Knack more than once, butyou must choose a new Favored Foe each time you do so."
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 3;
    },
  },
  "herbalist i": {
    name: "Herbalist I",
    description: "You gain proficiency with herbalism kits, and you automatically succeed on your Wisdom (Medicine) checks to stabilize creatures at 0 hit points if you use a herbalism kit.",
    toolProfs: ["Herbalism Kit"],
  },
  "herbalist ii": {
    name: "Herbalist II",
    description: "Over the course of a long rest, you can spend 1 hour using an herbalism kit to create one potion of healing. These potions of healing retain their potency until the end of your next long rest, at which point they become inert.",
    prereqeval: function (v) {
      // Prerequisites: proficiency with poisoner's kit
      if (!classes.known["ranger(laserllama)"].level > 3) {
        return false;
      }
      if (
        /herbalism.*?/i.test(What("Too Text")) &&
        tDoc.getField("Too Prof").isBoxChecked(0)
      ) {
        return tDoc.getField("Too Exp").isBoxChecked(0) ? "markButDisable" : true;
      } else {
        return (
          CurrentProfs.tool["Herbalism Kit"] ||
          /herbalism.*?/i.test(v.toolProfs.toString())
        );
      }
    },
  },
  "herbalist iii": {
    name: "Herbalist III",
    description: "When you use your herbalism kit to craft potions of healing during a long rest, you craft a number of potions of healing equal to 1 + your Wisdom modifier (minimum of 2).",
    prereqeval: function (v) {
      // Prerequisites: proficiency with poisoner's kit
      if (!classes.known["ranger(laserllama)"].level > 6) {
        return false;
      }
      if (
        /herbalism.*?/i.test(What("Too Text")) &&
        tDoc.getField("Too Prof").isBoxChecked(0)
      ) {
        return tDoc.getField("Too Exp").isBoxChecked(0) ? "markButDisable" : true;
      } else {
        return (
          CurrentProfs.tool["Herbalism Kit"] ||
          /herbalism.*?/i.test(v.toolProfs.toString())
        );
      }
    },
  },
  "naturalist i": {
    name: "Naturalist I",
    description: desc([
      "Whenever you would make an Intelligence (Nature) check in the wilderness, you can choose to make a Wisdom (Nature) check instead.",
      " Also, you can make Wisdom (Nature) checks as a bonus action to recall knowledge about one beast or plant you see."
    ]),
    addMod: [
      {
        type: "skill",
        field: "Nature",
        mod: "max(Wis-Int|0)",
        text: "I can replace Intelligence (Nature) checks with Wisdom (Nature)",
      }
    ],
  },
  "naturalist ii": {
    name: "Naturalist II",
    description: desc([
      "At the end of a long rest, you can attune to your surrounding environment. Examples include, but are not limited to: arctic, coast, desert, forest, grassland, mountain, or swamp. While in your attuned environment, you gain the following benefits:",
      " \u2022 You have advantage on Wisdom (Nature) checks related to the local plants, animals, ecosystem, and weather.",
      " \u2022 You find twice as much food when foraging or hunting.",
      " \u2022 You have advantage on your initiative rolls so long as youare not surprised or incapacitated.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 6;
    },
  },
  "natural regeneration": {
    name: "Natural Regeneration",
    description: desc([
      "During a short rest, you can recover spell slots of a combined level equal to your Wisdom modifier. Once you do, you must finish a long rest before you can use this feature again.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 3;
    },
    usages: 1,
    recovery: "long rest"
  },
  "slayer i": {
    name: "Slayer I",
    description: desc([
      "When you hit a creature with a weapon attack you can mark it as your Quarry as part of the attack, applying your Quarry damage bonus and other benefits to the damage roll.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 3;
    },
    action: [["action", " (on hit, weapon attack)"]]
  },
  "slayer ii": {
    name: "Slayer II",
    description: desc([
      "Your tracking abilities have become supernaturally accurate. You can mark a creature as your Quarry by studying signs ofits passing, such as tracks, that were left within 24 hours.",
      "Moreover, whenever you make a Wisdom (Perception) or aWisdom (Survival) check to locate or track your Quarry, youcan treat a roll of 7 or lower on the d20 as an 8.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 6;
    },
  },
  "slayer iii": {
    name: "Slayer III",
    description: desc([
      "When you hit a Quarry with a weapon attack, you can force it to make a Constitution saving throw against your Spell save DC. On a failed save, it is blinded, cannot speak, deafened, or restrained (your choice) until the start of your next turn. You can only use this feature on your Quarry once per turn.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 14;
    },
  },
  "stalker i": {
    name: "Stalker I",
    description: desc([
      "You have advantage on Dexterity (Stealth) checks you make to hide while you are in natural environments.",
    ]),
  },
  "stalker ii": {
    name: "Stalker II",
    description: desc([
      "You can take the Hide action as a bonus action on your turn.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 3;
    },
    action: [["bonus action", "Hide"]]
  },
  "stalker iii": {
    name: "Stalker III",
    description: desc([
      "You are always underthe effects of the Nondetection spell, and you can't be trackedby divination magic or magical means unless you wish to be.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 9;
    },
    spellcastingBonus: [
      {
        name: "Stalker III",
        firstCol: "Stalker",
        spells: ["nondetection"],
        selection: ["nondetection"],
        times: 1,
      },
    ],
    spellChanges: {
      nondetection: {
        changes:
          "I'm alwayes under the effects of this spell.",
      },
    },
  },
  "stalker iv": {
    name: "Stalker IV",
    description: desc([
      "When you take the Hide action, you, along with anything you are wearing or carrying, become invisible until the start of your next turn. This ends early if you attack or cast a spell.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 14;
    },
  },
  "strider i": {
    name: "Strider I",
    description: desc([
      "You ignore the effects of difficult terrain imposed by naturalenvironments, such as undergrowth, snow, or swamp. Youalso can't become lost so long as you can see the night sky.",
      "Finally, you and up to 10 creatures who travel with youdon't have your travel slowed by natural difficult terrain.",
    ]),
    savetxt: { immune: ["natural diff. terrain"] }
  },
  "strider ii": {
    name: "Strider II",
    description: desc([
      "You can take the Dash action as a bonus action on your turn.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 3;
    },
    action: [["bonus action", "Dash"]]
  },
  "strider iii": {
    name: "Strider II",
    description: desc([
      "Your walking speed increases by 10 feet, and you ignore the effects of any difficult terrain imposed by spells, magical phenomena, or any other supernatural effect.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 6;
    },
    savetxt: { immune: ["non-natural diff. terrain"] },
    speed: { walk: { bonus: "+10" } },
  },
  "strider iv": {
    name: "Strider IV",
    description: desc([
      "You are always under theeffects of the freedom of movement spell while conscious.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 14;
    },
    spellcastingBonus: [
      {
        name: "Strider IV",
        firstCol: "Strider",
        spells: ["freedom of movement"],
        selection: ["freedom of movement"],
        times: 1,
      },
    ],
    spellChanges: {
      "freedom of movement": {
        changes:
          "I'm alwayes under the effects of this spell while conscious.",
      },
    },
  },
  "survivor i": {
    name: "Survivor I",
    description: desc([
      "As a bonus action on your turn, you can grant yourself temporary hit points equal to your Constitution modifier (minimum of 1).",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 6;
    },
    action: [["bonus action", ""]]
  },
  "survivor ii": {
    name: "Survivor II",
    description: desc([
      "When you expend a Hit Die to regain hit points, you regain additional hit points equal to your Wisdom modifier (minimum of 1 hit point).",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 9;
    },
  },
  "survivor iii": {
    name: "Survivor III",
    description: desc([
      "When you make a death saving throw, you add your Wisdom modifier to the roll (minimum of +1). If the result of your roll is 20 or higher, it is as if you had rolled a 20 on the d20",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 14;
    },
  },
  "trapper": {
    name: "Trapper",
    description: desc([
      "You can construct natural traps. Over the course of 1 hour, which can be during a short or long rest, you can use a knife, natural materials, and expend 10 feet of rope to craft a Trap.",
      " As an action, you can set one of these Traps in an adjacent unoccupied 5-foot space. The first Large or smaller creature to move into that space must succeed on a Dexterity saving throw against your Spell save DC or become restrained.",
      " As an action, the restrained creature, or another creature within 5 feet of it, can use an action to make a Strength check against your Spell save DC, freeing the creature on a success.",
      "As an action (separate from setting the Trap), you can hide the Trap. If hidden, a successful Intelligence (Investigation) against your Spell save DC is required to detect the Trap."
    ]),
    action: [
      ["action", " (set Trap)"],
      ["action", " (hide Trap)"],
    ]
  },
  "wild insight i": {
    name: "Wild Insight I",
    description: desc([
      "You can communicate with beasts as if you were always under the effect of a Speak with Animals spell.",
    ]),
  },
  "wild insight ii": {
    name: "Wild Insight II",
    description: desc([
      "You have bound yourself with a minor nature spirit. You learn the Conjure Familiar spell. It is a Ranger spell for you and it is always prepared, but it does not count against the number of spells you prepare each day. When you cast this spell your summoned Familiar is always a Fey creature.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 3;
    },
    spellcastingBonus: [
      {
        name: "Wild Insight II",
        firstCol: "WI2",
        spells: ["conjure familiar"],
        selection: ["conjure familiar"],
        times: 1,
      },
    ],
    spellChanges: {
      "conjure familiar": {
        changes:
          "Your familiar is always a Fey.",
      },
    },
  },
  "wild insight iii": {
    name: "Wild Insight III",
    description: desc([
      "When you cast conjure familiar, it can take the form of a Beast of CR 1/2 or lower.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 3;
    },
    spellChanges: {
      "conjure familiar": {
        changes:
          "Your familiar is always a Fey and it can take the form of a Beast of CR 1/2 or lower.",
      },
    },
  },
  //from expanded Ranger
  "arctic adept": {
    name: "Arctic Adept",
    description: "You gain resistance to cold damage. Also, you and up to 10 creatures who travel with you have advantage on any saving throws they make to resist the hostile effects of arctic environments.",
    dmgres: ["Cold"],
  },
  "desert adept": {
    name: "Desert Adept",
    description: "You gain resistance to fire damage. Also, you and up to 10 creatures who travel with you have advantage on any saving throws they make to resist the hostile effects of desert environments.",
    dmgres: ["Fire"],
  },
  "fell handed i": {
    name: "Fell Handed I",
    description: desc([
      "When you score a critical hit with a weapon attack against a creature, you have advantage on the next attack you make against that creature before the end of your next turn.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 6;
    },
  },
  "fell handed ii": {
    name: "Fell Handed II",
    description: desc([
      "When you score a critical hit against a creature, your criticalhit range for attack rolls against that creature expands by 1.",
      " For example, if you score a critical hit against a creature for the first time, you then score a critical hit on a roll of 19 or 20 when you make an attack roll against it, and so on.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 9;
    },
  },
  "hedge knight i": {
    name: "Hedge Knight I",
    description: desc([
      "You gain proficiency in heavy armor.",
    ]),
    armorProfs: [false, false, true, false]
  },
  "hedge knight ii": {
    name: "Hedge Knight II",
    description: desc([
      "Whenever you make an Intelligence (History) or Charisma (Persuasion) check, you can use Wisdom in place of Intelligence or Charisma, respectively.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 3;
    },
    addMod: [
      {
        type: "skill",
        field: "Persuasion",
        mod: "max(Wis-Cha|0)",
        text: "I can replace Wisdom (Persuasion) checks with Wisdom (Persuasion)",
      },
      {
        type: "skill",
        field: "History",
        mod: "max(Wis-Int|0)",
        text: "I can replace Intelligence (History) checks with Wisdom (History)",
      },
    ],
  },
  "jungle adept": {
    name: "Artic Adept",
    description: "You gain resistance to poison damage. Also, you and up to 10 creatures who travel with you have advantage on any saving throws they make to resist the hostile effects of jungle environments.",
    dmgres: ["Poison"],
  },
  "planar adept (astral sea)": {
    name: "Planar Adept (Astral Sea)",
    description: "You gain resistance to radiant damage. Also, you and up to 10 creatures who travel with you have advantage on any saving throws they make to resist the hostile effects of astral sea plane environments.",
    dmgres: ["Radiant"],
    submenu: "Planar Adept",
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 9;
    },
  },
  "planar adept (feywild)": {
    name: "Planar Adept (Feywild)",
    description: "You gain resistance to psychic damage. Also, you and up to 10 creatures who travel with you have advantage on any saving throws they make to resist the hostile effects of feywild plane environments.",
    dmgres: ["Psychic"],
    submenu: "Planar Adept",
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 9;
    },
  },
  "planar adept (mechanus)": {
    name: "Planar Adept (Mechanus)",
    description: "You gain resistance to force damage. Also, you and up to 10 creatures who travel with you have advantage on any saving throws they make to resist the hostile effects of mechanus plane environments.",
    dmgres: ["Force"],
    submenu: "Planar Adept",
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 9;
    },
  },
  "planar adept (shadowfell)": {
    name: "Planar Adept (Shadowfell)",
    description: "You gain resistance to necrotic damage. Also, you and up to 10 creatures who travel with you have advantage on any saving throws they make to resist the hostile effects of shadowfell plane environments.",
    dmgres: ["Necrotic"],
    submenu: "Planar Adept",
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 9;
    },
  },
  "planar adept (air)": {
    name: "Planar Adept (Air)",
    description: "You gain resistance to thunder damage. Also, you and up to 10 creatures who travel with you have advantage on any saving throws they make to resist the hostile effects of air plane environments.",
    dmgres: ["Thunder"],
    submenu: "Planar Adept",
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 9;
    },
  },
  "planar adept (earth)": {
    name: "Planar Adept (Earth)",
    description: "You gain resistance to force damage. Also, you and up to 10 creatures who travel with you have advantage on any saving throws they make to resist the hostile effects of earth plane environments.",
    dmgres: ["acid"],
    submenu: "Planar Adept",
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 9;
    },
  },
  "planar adept (fire)": {
    name: "Planar Adept (fire)",
    description: "You gain resistance to fire damage. Also, you and up to 10 creatures who travel with you have advantage on any saving throws they make to resist the hostile effects of fire plane environments.",
    dmgres: ["Fire"],
    submenu: "Planar Adept",
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 9;
    },
  },
  "planar adept (water)": {
    name: "Planar Adept (Water)",
    description: "You gain resistance to cold damage. Also, you and up to 10 creatures who travel with you have advantage on any saving throws they make to resist the hostile effects of water plane environments.",
    dmgres: ["Cold"],
    submenu: "Planar Adept",
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 9;
    },
  },
  "rider i": {
    name: "Rider I",
    description: desc([
      "Whenever you make a Wisdom (Animal Handling) check to control, train, or tame a mount, you can treat a roll of 7 orlower on a d20 as an 8.",
      " Also, dismounting from a trained mount only costs you 5 feet of your movement.",
    ]),
  },
  "rider ii": (function () {
    // copies the main class feature, avoids having to copy all fighting styles
    var FSfea = {};
    if (ClassList["ranger(laserllama)"]) {
      var FSfea = newObj(
        ClassList["ranger(laserllama)"].features["fighting style"]
      );
      FSfea.name = "Rider II";
      (FSfea.description = desc([
        "I learn the Mounted Warrior Fighting Style and it doesn't count to the max of Fighting Styles I know, and I can ride trained mounts that are equal to my size or larger",
        " If you already know the Mounted Warrior Fighting Style you learn another Ranger Fighting Style of your choice. "
      ])),
        (FSfea.extraname = "Rider II Fighting Style");
      FSfea.extraTimes = [];
      if (classes.known["ranger(laserllama)"] && CurrentFeatureChoices.classes &&
        CurrentFeatureChoices.classes["ranger(laserllama)"] &&
        CurrentFeatureChoices.classes["ranger(laserllama)"][
          "fighting style"
        ].choice.indexOf("mounted warrior") !== -1) {
        FSfea.choices = FSfea.choices.filter(el => el.name !== "Mounted Warrior Fighting Style");
      } else {
        FSfea.choices = ["Mounted Warrior"];
      }
      FSfea.prereqeval = function (v) {
        return classes.known["ranger(laserllama)"].level >= 3;
      };
    }

    return FSfea;
  })(),
  "rider iii": {
    name: "Rider III",
    description: desc([
      "When you are riding mount and it is hit by an attack, you can use a reaction to become the target of that attack instead. Also, if your mount is forced to make a saving throw while you are riding it, you can use your reaction to grant it advantage on its roll.",
    ]),
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 6;
    },
    action: [["reaction", ""]]
  },
  "underground adept": {
    name: "Underground Adept",
    description: "You gain darkvision out to a range of 60 feet.If you already have darkvision its range increases by 30 feet. As an action you can close your eyes to gain tremorsenseout to a 60-foot radius. In that radius, you can sense anythingtouching the ground. This special sense lasts for 1 minute, oruntil you open your eyes. Once you use this action you mustfinish a short or long rest before you can use it again.",
    vision: [["Darkvision", "fixed 60"], ["Darkvision", "+30"]],
    action: [["action", ""]],
    usages: 1,
    recovery: "short rest"
  },
  "woodsman i": {
    name: "Woodsman I",
    description: desc([
      "You gain proficiency with woodcarver's tools, and you have advantage on ability checks to identify and construct things from wood.",
      " Also, at the end of each long rest, you can use woodcarver'stools and raw timber to craft a number of arrows, bolts, clubs, javelins, and quarterstaffs equal to your proficiency bonus.",
    ]),
    toolProfs: ["Woodcarver's tools"]
  },
  "woodsman ii": {
    name: "Woodsman II",
    description: desc([
      "You gain the following benefits:",
      " \u2022 You gain proficiency with carpenter's tools. Anything you construct from wood has twice as many hit points.",
      " \u2022 If you hit a tree, raw timber, or a wooden structure with a melee weapon attack, it is an automatic critical hit.",
      " \u2022 If you hit a plant or wood construct with a melee weapon attack, you score a critical hit on a roll of 18 through 20.",
    ]),
    toolProfs: ["Carpenter's tools"],
    prereqeval: function (v) {
      return classes.known["ranger(laserllama)"].level >= 3;
    },
  },
};


// Artificer LL Infusions
// NOTE: See the lack of "var" keyword, it is important as this variable has to be global to be used in other imports
InfusionsLL = {
  "arm launcher": {
    name: "Arm Launcher",
    source: [["HB", 0]],
    description: desc([
      "Item: glove or gauntlet",
      "As an action, this magical launcher can be loaded with up to five Tiny objects",
      "As a bonus action, the wearer can activate the launcher to fire one loaded object",
      "Make a ranged weapon attack against a target or space within 20 feet"
    ]),
    action: [["action", "Load"], ["bonus action", "Fire"]]
  },
  "enhanced arcane focus": {
    name: "Enhanced Arcane Focus",
    source: [["HB", 0]],
    description: desc([
      "Item: arcane focus (requires attunement)",
      "Grants +1 bonus to spell attack rolls and ignores half cover when making spell attacks",
      "Bonus increases to +2 at 11th level and +3 at 17th level"
    ]),
    additional: levels.map(n => n < 11 ? "+1 bonus" : n < 17 ? "+2 bonus" : "+3 bonus"),
    prereqeval: function (v) { return true; }
  },
  "enhanced defense": {
    name: "Enhanced Defense",
    source: [["HB", 0]],
    description: desc([
      "Item: suit of armor or a shield",
      "Grants +1 bonus to Armor Class while wearing or wielding this infused item",
      "Bonus increases to +2 at 11th level and +3 at 17th level"
    ]),
    additional: levels.map(n => n < 11 ? "+1 AC" : n < 17 ? "+2 AC" : "+3 AC"),
    prereqeval: function (v) { return true; }
  },
  "enhanced weapon": {
    name: "Enhanced Weapon",
    source: [["HB", 0]],
    description: desc([
      "Item: simple or martial weapon",
      "Grants +1 bonus to attack and damage rolls with this infused weapon",
      "Bonus increases to +2 at 11th level and +3 at 17th level"
    ]),
    additional: levels.map(n => n < 11 ? "+1 bonus" : n < 17 ? "+2 bonus" : "+3 bonus"),
    prereqeval: function (v) { return true; }
  },
  "featherweight belt": {
    name: "Featherweight Belt",
    source: [["HB", 0]],
    description: desc([
      "Item: belt or cloak (requires attunement)",
      "Reduces wearer to one-tenth of its weight without decreasing physical abilities",
      "At 11th level, reduces to one-hundredth of its weight"
    ]),
    prereqeval: function (v) { return true; }
  },
  "featherweight weapon": {
    name: "Featherweight Weapon",
    source: [["HB", 0]],
    description: desc([
      "Item: simple or martial melee weapon (requires attunement)",
      "Removes heavy and two-handed properties; if it doesn't have them, gains light property",
      "At 11th level, gains +1 bonus to attack/damage (increases to +2 at 17th level)"
    ]),
    additional: levels.map(n => n < 11 ? "No heavy/two-handed" : n < 17 ? "+1 bonus" : "+2 bonus"),
    prereqeval: function (v) { return true; }
  },
  "goggles of clearsight": {
    name: "Goggles of Clearsight",
    source: [["HB", 0]],
    description: desc([
      "Item: helm, goggles, or glasses",
      "See normally through light/heavy obscurement within 120 feet",
      "No negative effects from Sunlight Sensitivity; advantage vs blinded condition"
    ]),
    vision: [["Darkvision", 120]],
    advantages: [["Perception", true]],
    prereqeval: function (v) { return true; }
  },
  "lightning cannon": {
    name: "Lightning Cannon",
    source: [["HB", 0]],
    description: desc([
      "Item: gauntlet, arcane focus, or metal rod",
      "In place of an attack, make ranged spell attack (60 ft) for 2d6 lightning damage",
      "Uses Intelligence for spellcasting ability"
    ]),
    action: [["action", "Lightning Attack"]],
    prereqeval: function (v) { return true; }
  },
  "power whip": {
    name: "Power Whip",
    source: [["HB", 0]],
    description: desc([
      "Item: whip or chain",
      "Damage die becomes d10; once per turn can knock Large or smaller target prone",
      "At 11th level, gains +1 bonus to attack/damage (increases to +2 at 17th level)"
    ]),
    additional: levels.map(n => n < 11 ? "d10 damage" : n < 17 ? "+1 bonus" : "+2 bonus"),
    prereqeval: function (v) { return true; }
  },
  "repeating shot": {
    name: "Repeating Shot",
    source: [["HB", 0]],
    description: desc([
      "Item: ranged weapon (requires attunement)",
      "Ignores loading property; produces own magic ammunition if none loaded",
      "At 11th level, gains +1 bonus to attack/damage (increases to +2 at 17th level)"
    ]),
    additional: levels.map(n => n < 11 ? "Magic ammunition" : n < 17 ? "+1 bonus" : "+2 bonus"),
    prereqeval: function (v) { return true; }
  },
  "returning weapon": {
    name: "Returning Weapon",
    source: [["HB", 0]],
    description: desc([
      "Item: weapon with thrown property",
      "Weapon immediately flies back to wielder's hand after thrown attack",
      "At 11th level, gains +1 bonus to attack/damage (increases to +2 at 17th level)"
    ]),
    additional: levels.map(n => n < 11 ? "Returns to hand" : n < 17 ? "+1 bonus" : "+2 bonus"),
    prereqeval: function (v) { return true; }
  },
  "gem of warding": {
    name: "Gem of Warding",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: gem worth at least 100 gold",
      "As action, expend Charge to throw gem (30 ft); as bonus action move 20 ft or grant temp HP",
      "Gem has HP = Artificer level, AC = Intelligence score, lasts 1 minute",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    action: [["action", "Deploy Gem"], ["bonus action", "Move/Grant Temp HP"]],
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "homing weapon": {
    name: "Homing Weapon",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: weapon with ranged or thrown property",
      "Wielder ignores disadvantage when attacking at weapon's long range",
      "At 11th level, gains +1 bonus to attack/damage (increases to +2 at 17th level)"
    ]),
    additional: levels.map(n => n < 11 ? "Ignore long range disadv." : n < 17 ? "+1 bonus" : "+2 bonus"),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "homunculus servant": {
    name: "Homunculus Servant",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: gem worth at least 100 gold",
      "Create loyal Homunculus Servant using provided stat block",
      "Acts on your turn; use bonus action to command it to take actions",
      "Can repair with spell slot and 1 minute if destroyed"
    ]),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; },
    // Nota: Per un'implementazione completa, servirebbe un foglio compagno
  },
  "immovable boots": {
    name: "Immovable Boots",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: pair of boots (requires attunement)",
      "As action, fix in place with magic; cannot move until deactivated",
      "DC 30 Strength check required to move wearer"
    ]),
    action: [["action", "Activate/Deactivate"]],
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "infiltrator armor": {
    name: "Infiltrator Armor",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: suit of armor (requires attunement)",
      "Formfitting, wearable under clothes without detection",
      "Advantage on Dexterity (Stealth) checks",
      "At 11th level, +1 AC (increases to +2 at 17th level)"
    ]),
    advantages: [["Stealth", true]],
    additional: levels.map(n => n < 11 ? "Advantage Stealth" : n < 17 ? "+1 AC" : "+2 AC"),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "light blade": {
    name: "Light Blade",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: sword hilt or arcane focus (requires attunement)",
      "Bonus action to create blade of radiance (1d8 radiant damage, finesse)",
      "Emits bright light 15 ft, dim light additional 15 ft",
      "At 11th level, +1 bonus to attack/damage (increases to +2 at 17th level)"
    ]),
    action: [["bonus action", "Create Blade"]],
    additional: levels.map(n => n < 11 ? "1d8 radiant" : n < 17 ? "+1 bonus" : "+2 bonus"),
    vision: [["Bright Light", 15], ["Dim Light", 30]],
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "mind sharpener": {
    name: "Mind Sharpener",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: helmet, diadem, armor, or robes",
      "When failing Constitution save for concentration, use reaction to expend Charge to succeed",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    action: [["reaction", ""]],
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "minor arcane item": {
    name: "Minor Arcane Item",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: Tiny object, tool, or arcane focus (requires attunement)",
      "Imbue with 1st-level Artificer spell; wielder can cast using Charges",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "radiant weapon": {
    name: "Radiant Weapon",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: melee weapon (requires attunement)",
      "Bonus action to emit bright light 30 ft, dim light 30 ft",
      "Expend Charge on hit to force Constitution save or blinded until your next turn",
      "At 11th level, +1 bonus to attack/damage (increases to +2 at 17th level)",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    action: [["bonus action", "Toggle Light"], ["bonus action", "Blind"]],
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    vision: [["Bright Light", 30], ["Dim Light", 60]],
    additional: levels.map(n => n < 11 ? "Blind effect" : n < 17 ? "+1 bonus" : "+2 bonus"),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "repulsion gauntlets": {
    name: "Repulsion Gauntlets",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: gloves or gauntlets (requires attunement)",
      "On hit with unarmed/gauntlet attack, expend Charge to force Strength save or knock back 15 ft",
      "Large+ creatures have advantage on save",
      "At 11th level, +1 bonus to attack/damage (increases to +2 at 17th level)",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    additional: levels.map(n => n < 11 ? "Knockback" : n < 17 ? "+1 bonus" : "+2 bonus"),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "repulsion shield": {
    name: "Repulsion Shield",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: shield (requires attunement)",
      "When hit by melee attack, expend Charge to force Strength save - knock back 15 ft and prone",
      "Large+ creatures have advantage on save",
      "At 11th level, +1 AC (increases to +2 at 17th level)",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    action: [["reaction", "Repel"]],
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    additional: levels.map(n => n < 11 ? "Knockback+prone" : n < 17 ? "+1 AC" : "+2 AC"),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "armor of strength": {
    name: "Armor of Strength",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 11th-level Artificer",
      "Item: suit of armor (requires attunement)",
      "+1 AC; use Intelligence for Strength-based checks/saves",
      "Expend Charge to avoid being knocked prone or moved against will",
      "At 17th level, +2 AC",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    action: [["reaction", "Avoid Movement"]],
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    additional: levels.map(n => n < 17 ? "+1 AC" : "+2 AC"),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 11; }
  },
  "chameleon armor": {
    name: "Chameleon Armor",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 11th-level Artificer",
      "Item: suit of armor (requires attunement)",
      "+1 AC; use action to expend Charges to cast: disguise self (1), invisibility (2), greater invisibility (4)",
      "At 17th level, +2 AC",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    action: [["action", "Cast Spell"]],
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    additional: levels.map(n => n < 17 ? "+1 AC" : "+2 AC"),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 11; }
  },
  "elemental armor": {
    name: "Elemental Armor",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 11th-level Artificer",
      "Item: suit of armor (requires attunement)",
      "+1 AC; resistance to acid, cold, fire, lightning, necrotic, poison, radiant, or thunder",
      "At 17th level, +2 AC and can choose psychic or force resistance"
    ]),
    additional: levels.map(n => n < 17 ? "+1 AC, elemental resist" : "+2 AC, psychic/force resist"),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 11; }
  },
  "elemental ring": {
    name: "Elemental Ring",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 11th-level Artificer",
      "Item: ring (requires attunement)",
      "Choose acid, cold, fire, poison, or lightning damage type",
      "When casting spell of 3rd-level or lower of chosen type, speak command word to deal maximum damage",
      "Once per day use",
      "At 17th level, works on spells of 5th-level or lower"
    ]),
    usages: "1 per",
    recovery: "day",
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 11; }
  },
  "elemental weapon": {
    name: "Elemental Weapon",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 11th-level Artificer",
      "Item: melee weapon (requires attunement)",
      "Choose acid, cold, fire, poison, or lightning damage type",
      "Bonus action to activate - deals extra 1d6 of chosen damage type on hit",
      "At 17th level, bonus damage becomes 2d6"
    ]),
    action: [["bonus action", "Activate Elemental"]],
    additional: levels.map(n => n < 17 ? "+1d6 elemental" : "+2d6 elemental"),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 11; }
  },
  "greater arcane item": {
    name: "Greater Arcane Item",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 11th-level Artificer",
      "Item: Tiny object, tool, or arcane focus (requires attunement)",
      "Imbue with 2nd-level Artificer spell; wielder can cast using Charges",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 11; }
  },
  "helm of awareness": {
    name: "Helm of Awareness",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 11th-level Artificer",
      "Item: helmet or diadem (requires attunement)",
      "Cannot be surprised unless incapacitated",
      "Add Intelligence modifier (minimum +1) to initiative rolls"
    ]),
    addMod: [{
      type: "skill",
      field: "Init",
      mod: "max(Int|1)",
      text: "Helm of Awareness adds Intelligence modifier to initiative (minimum +1)"
    }],
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 11; }
  },
  "voyager boots": {
    name: "Voyager Boots",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 11th-level Artificer",
      "Item: pair of boots (requires attunement)",
      "Bonus action to teleport up to 15 feet to unoccupied space you can see",
      "At 17th level, teleport up to 30 feet"
    ]),
    action: [["bonus action", "Teleport"]],
    additional: levels.map(n => n < 17 ? "15 ft teleport" : "30 ft teleport"),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 11; }
  },
  "guardian gauntlets": {
    name: "Guardian Gauntlets",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 17th-level Artificer",
      "Item: pair of gauntlets (requires attunement)",
      "When creature ends turn within 30 ft, use reaction to expend Charge to pull it 30 ft toward you",
      "Huge+ creatures have advantage on save; if pulled within 5 ft, make melee attack",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    action: [["reaction", "Pull Creature"]],
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 17; }
  },
  "masterwork arcane item": {
    name: "Masterwork Arcane Item",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 17th-level Artificer",
      "Item: Tiny object, tool, or arcane focus (requires attunement)",
      "Imbue with 3rd-level Artificer spell; wielder can cast using Charges",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 17; }
  },
  "masterwork homunculus": {
    name: "Masterwork Homunculus",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 17th-level Artificer",
      "Learn clone spell (Artificer spell, doesn't count against Spells Known)",
      "Can cast clone without spell slot with material components",
      "Clone matures in 12 days; can only have one clone",
      "If infusion replaced before maturity, spell fails"
    ]),
    spellcastingBonus: {
      name: "Masterwork Homunculus",
      spells: ["clone"],
      atwill: true
    },
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 17; }
  },
  "mind shield": {
    name: "Mind Shield",
    source: [["HB", 0]],
    description: desc([
      "Prerequisite: 17th-level Artificer",
      "Item: helmet or diadem (requires attunement)",
      "Resistance to psychic damage",
      "Immunity to charmed and frightened conditions",
      "Immune to thought/dream reading; cannot be targeted by telepathy unless willing"
    ]),
    dmgres: ["Psychic"],
    savetxt: {
      immune: ["charmed", "frightened"]
    },
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 17; }
  },
  "adjustable tool set": {
    name: "Adjustable Tool Set",
    source: [["HB:LL", 0]],
    description: desc([
      "Item: set of artisan's tools or tinker's tools",
      "Wielder is considered proficient with this magical set of tools",
      "As an action, can transform into another set of artisan's tools of choice",
      "At 11th level: +1 bonus to ability checks (increases to +2 at 17th level)"
    ]),
    action: [["action", "Transform Tools"]],
    additional: levels.map(n => n < 11 ? "Tool proficiency" : n < 17 ? "+1 bonus" : "+2 bonus"),
    prereqeval: function (v) { return true; }
  },
  "artificial limb": {
    name: "Artificial Limb",
    source: [["HB:LL", 0]],
    description: desc([
      "Item: humanoid-shaped prosthetic limb",
      "Attaches to creature, covering or replacing a limb",
      "As bonus action, extend or retract limb up to 10 feet"
    ]),
    action: [["bonus action", "Extend/Retract"]],
    prereqeval: function (v) { return true; }
  },
  "belt of utility": {
    name: "Belt of Utility",
    source: [["HB:LL", 0]],
    description: desc([
      "Item: belt or vest with ten pockets",
      "Ten Tiny pockets each holding Tiny or smaller objects",
      "As action, bonus action, or part of attack: summon object to hand",
      "If no free hand, shunts held object into pouch automatically"
    ]),
    action: [["action", "Summon Object"], ["bonus action", "Summon Object"]],
    prereqeval: function (v) { return true; }
  },
  "enhanced instrument": {
    name: "Enhanced Instrument",
    source: [["HB:LL", 0]],
    description: desc([
      "Item: musical instrument (requires attunement)",
      "Wielder proficient with instrument, can use as spellcasting focus",
      "Add Intelligence modifier (minimum +1) to ability checks with instrument",
      "At 11th level: +1 bonus to Spell save DC when used as focus (increases to +2 at 17th level)"
    ]),
    additional: levels.map(n => n < 11 ? "Int to checks" : n < 17 ? "+1 Spell DC" : "+2 Spell DC"),
    prereqeval: function (v) { return true; }
  },
  "ring of knowledge": {
    name: "Ring of Knowledge",
    source: [["HB:LL", 0]],
    description: desc([
      "Item: ring (requires attunement)",
      "Choose one skill, tool, weapon proficiency, or language you know",
      "Wearer gains proficiency in chosen skill/tool/weapon or knows chosen language"
    ]),
    prereqeval: function (v) { return true; }
  },
  "thought blade": {
    name: "Thought Blade",
    source: [["HB:LL", 0]],
    description: desc([
      "Item: silvered melee weapon (requires attunement)",
      "Use Intelligence instead of Strength/Dexterity for attack and damage rolls",
      "At 11th level: +1 bonus to attack/damage (increases to +2 at 17th level)"
    ]),
    additional: levels.map(n => n < 11 ? "Int for attacks" : n < 17 ? "+1 bonus" : "+2 bonus"),
    prereqeval: function (v) { return true; }
  },
  "wondrous translator": {
    name: "Wondrous Translator",
    source: [["HB:LL", 0]],
    description: desc([
      "Item: ring, diadem, or necklace (requires attunement)",
      "Understand any spoken language as if native tongue",
      "At 5th level: no attunement required",
      "At 11th level: can also speak any language heard"
    ]),
    prereqeval: function (v) { return true; }
  },
  "wondrous whip": {
    name: "Wondrous Whip",
    source: [["HB:LL", 0]],
    description: desc([
      "Item: whip, gauntlet, or weaver's tools",
      "Can cast thorn whip cantrip using Intelligence as spellcasting ability",
      "Can choose to do 0 damage: pull Small+ targets 30 ft closer or pull self to Large+ targets",
      "At 11th level: +1 bonus to attack/damage (increases to +2 at 17th level)"
    ]),
    additional: levels.map(n => n < 11 ? "Thorn whip" : n < 17 ? "+1 bonus" : "+2 bonus"),
    prereqeval: function (v) { return true; }
  },
  "many-handed pouch": {
    name: "Many-Handed Pouch",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: four Tiny pouches, pockets, or sacks",
      "All pouches share one interdimensional space (single pouch capacity)",
      "Operates within 100 miles of another pouch",
      "If infusion ends: items move to random pouch"
    ]),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "ring of potential": {
    name: "Ring of Potential",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: ring (requires attunement)",
      "Bonus action: expend Charges to regain expended spell slot (slot level = Charges expended)",
      "3 Charges, regain all at dawn"
    ]),
    action: [["bonus action", "Regain Spell Slot"]],
    usages: "3 Charges per",
    recovery: "day",
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "skittering servant": {
    name: "Skittering Servant",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: fine mechanical components worth 100 gold",
      "Create Tiny arachnoid construct with 8 legs",
      "Action: attach/remove weapon or object to Servant",
      "Action + Charge: throw to space within 30 ft",
      "Bonus action: move 20 ft and use attached object",
      "HP = Artificer level, AC = Intelligence score",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    action: [["action", "Deploy"], ["bonus action", "Command"]],
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "skyfall harness": {
    name: "Skyfall Harness",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: cloak, vest, or harness",
      "Subtract up to 100 ft when calculating falling damage",
      "When falling at least 10 ft: glide 2 ft horizontally per 1 ft fallen"
    ]),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "wildfire cannon": {
    name: "Wildfire Cannon",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: gauntlet, arcane focus, or metal rod",
      "Action + Charges: cast spells using Intelligence:",
      "• firebolt (0 Charges), burning hands (1 Charge)",
      "• scorching ray (2 Charges), fireball (3 Charges)",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    action: [["action", "Cast Spell"]],
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "wall shield": {
    name: "Wall Shield",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: shield (requires attunement)",
      "Action: slam shield into ground, expend Charges for wall of stone effect",
      "Creates panels equal to Charges spent, no concentration, lasts 1 minute",
      "At 11th level: +1 AC (increases to +2 at 17th level)",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    action: [["action", "Create Wall"]],
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    additional: levels.map(n => n < 11 ? "Wall creation" : n < 17 ? "+1 AC" : "+2 AC"),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "war gauntlet": {
    name: "War Gauntlet",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 5th-level Artificer",
      "Item: armored gauntlet and martial weapon or shield",
      "Attach shield or martial weapon to gauntlet",
      "Wielder proficient with attached item, cannot be disarmed",
      "At 11th level: +1 AC (increases to +2 at 17th level)"
    ]),
    additional: levels.map(n => n < 11 ? "Cannot be disarmed" : n < 17 ? "+1 AC" : "+2 AC"),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; }
  },
  "collar of taming": {
    name: "Collar of Taming",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 11th-level Artificer",
      "Item: metal circlet or collar (requires attunement)",
      "When worn by beast with CR ≤ Intelligence modifier: absolute control",
      "Beast is friendly, obeys orders completely, shares initiative",
      "Bonus action to command actions from stat block",
      "At 17th level: can control monstrosities"
    ]),
    action: [["bonus action", "Command Beast"]],
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 11; }
  },
  "elemental prism": {
    name: "Elemental Prism",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 11th-level Artificer",
      "Item: diamond worth 50+ gold and arcane focus",
      "When casting damage spell: change damage to acid, cold, fire, lightning, poison, or thunder",
      "At 17th level: +1 bonus to spell attack rolls and Spell save DC"
    ]),
    additional: levels.map(n => n < 17 ? "Damage conversion" : "+1 spell attacks/DC"),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 11; }
  },
  "levitating weapon": {
    name: "Levitating Weapon",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 11th-level Artificer",
      "Item: one-handed melee weapon (requires attunement)",
      "Bonus action + Charge: weapon hovers, attacks targets within 5 ft using Intelligence",
      "While hovering: bonus action to attack each turn",
      "Lasts 1 minute or until deactivated",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    action: [["bonus action", "Activate"], ["bonus action", "Attack"]],
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 11; }
  },
  "metamorphosis armor": {
    name: "Metamorphosis Armor",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 11th-level Artificer",
      "Item: suit of armor (requires attunement)",
      "Bonus action + Charge: cast enlarge/reduce on self without spell slot or concentration",
      "At 17th level: expend 2 Charges to change size by two categories",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    action: [["bonus action", "Enlarge/Reduce"]],
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 11; }
  },
  "vampiric weapon": {
    name: "Vampiric Weapon",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 11th-level Artificer",
      "Item: melee weapon (requires attunement)",
      "On hit: +1d6 necrotic damage, gain temporary HP equal to half necrotic damage",
      "No effect vs undead or constructs",
      "At 17th level: bonus damage becomes 2d6"
    ]),
    additional: levels.map(n => n < 17 ? "+1d6 necrotic" : "+2d6 necrotic"),
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 11; }
  },
  "astral cannon": {
    name: "Astral Cannon",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 17th-level Artificer",
      "Item: gauntlet, arcane focus, or metal rod",
      "In place of attack: ranged spell attack (60 ft) for 2d10 force damage",
      "Action + Charge: create portal between two 5-ft surfaces within 60 ft",
      "Portal lasts 1 minute, closes after 5 creatures pass through",
      "Charges: Intelligence modifier (minimum 1), regain at dawn"
    ]),
    action: [["action", "Create Portal"]],
    usages: "Int mod per",
    usagescalc: "event.value = Math.max(1, What('Int Mod'));",
    recovery: "day",
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 17; }
  },
  "boots of destruction": {
    name: "Boots of Destruction",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 17th-level Artificer",
      "Item: pair of boots (requires attunement)",
      "Cannot be knocked prone or moved against will",
      "Knows destructive wave, can cast once without spell slot",
      "Regain ability to cast at dawn"
    ]),
    spellcastingBonus: {
      name: "Boots of Destruction",
      spells: ["destructive wave"],
      onceper: true
    },
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 17; }
  },
  "mystic armament": {
    name: "Mystic Armament",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 17th-level Artificer",
      "Item: melee weapon (requires attunement)",
      "Critical hit on 18-20, can use as spellcasting focus",
      "Knows steel wind strike, can cast once without spell slot",
      "Regain ability to cast at dawn"
    ]),
    spellcastingBonus: {
      name: "Mystic Armament",
      spells: ["steel wind strike"],
      onceper: true
    },
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 17; }
  },
  "mystic shot": {
    name: "Mystic Shot",
    source: [["HB:LL", 0]],
    description: desc([
      "Prerequisite: 17th-level Artificer",
      "Item: ranged weapon (requires attunement)",
      "Can choose to deal force damage instead of normal damage",
      "Can use as spellcasting focus",
      "Knows swift quiver, can cast once without spell slot",
      "Regain ability to cast at dawn"
    ]),
    spellcastingBonus: {
      name: "Mystic Shot",
      spells: ["swift quiver"],
      onceper: true
    },
    prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 17; }
  }

};


// Alchemist Artificer LL Elixir Infusions
// NOTE: See the lack of "var" keyword, it is important as this variable has to be global to be used in other imports
ElixirInfusionsLL = {
  "create minor elixir": {
    name: "Create Minor Elixir",
    source: [["GMB:LL", 0]],
    description: desc([
      "Prerequisite: 3rd-level Alchemist Artificer",
      "Each time you learn this Infusion, you learn Elixirs for two spell effects from the 1st-level spell list",
      "To create additional minor elixirs, you must expend a spell slot of 1st-level or higher",
      "Available spells: armor of agathys, caustic brew, color spray, cure wounds, disguise self, fog cloud, grease, heroism, jump, longstrider, sanctuary, sleep"
    ]),
    prereqeval: function (v) {
      return classes.known["artificer(laserllama)"] &&
        classes.known["artificer(laserllama)"].level >= 3;
    },
    additional: "Choose two 1st-level spell Elixirs",
    spellcastingBonusElsewhere: {
      addTo: "artificer(laserllama)",
      spellcastingBonus: {
        name: "Minor Elixir Spells",
        spellcastingAbility: 4,
        spells: ["armor of agathys", "caustic brew", "color spray", "cure wounds", "disguise self", "fog cloud", "grease", "heroism", "jump", "longstrider", "sanctuary", "sleep"],
        selection: [],
        times: 2,
        firstCol: "Elixir"
      }
    }
  },
  "create greater elixir": {
    name: "Create Greater Elixir",
    source: [["GMB:LL", 0]],
    description: desc([
      "Prerequisite: 5th-level Alchemist Artificer",
      "Each time you learn this Infusion, you learn the Elixir for one spell effect from the 2nd-level spell list",
      "To create additional greater elixirs, you must expend a spell slot of 2nd-level or higher",
      "Available spells: aura of frost, barkskin, blindness/deafness, darkvision, dragon's breath, enhance ability, enlarge/reduce, invisibility, levitate, mirror image, restoration, spider climb"
    ]),
    prereqeval: function (v) {
      return classes.known["artificer(laserllama)"] &&
        classes.known["artificer(laserllama)"].level >= 5;
    },
    additional: "Choose one 2nd-level spell Elixir",
    spellcastingBonusElsewhere: {
      addTo: "artificer(laserllama)",
      spellcastingBonus: {
        name: "Greater Elixir Spells",
        spellcastingAbility: 4,
        spells: ["aura of frost", "barkskin", "blindness/deafness", "darkvision", "dragon's breath", "enhance ability", "enlarge/reduce", "invisibility", "levitate", "mirror image", "restoration", "spider climb"],
        selection: [],
        times: 1,
        firstCol: "Elixir"
      }
    }
  },
  "create advanced elixir": {
    name: "Create Advanced Elixir",
    source: [["GMB:LL", 0]],
    description: desc([
      "Prerequisite: 9th-level Alchemist Artificer",
      "Each time you learn this Infusion, you learn the Elixir for one spell effect from the 3rd-level spell list",
      "To create additional advanced elixirs, you must expend a spell slot of 3rd-level or higher",
      "Available spells: animate dead, blink, daylight, fireball, gaseous form, haste, meld into stone, remove curse, stinking cloud, water breathing"
    ]),
    prereqeval: function (v) {
      return classes.known["artificer(laserllama)"] &&
        classes.known["artificer(laserllama)"].level >= 9;
    },
    additional: "Choose one 3rd-level spell Elixir",
    spellcastingBonusElsewhere: {
      addTo: "artificer(laserllama)",
      spellcastingBonus: {
        name: "Advanced Elixir Spells",
        spellcastingAbility: 4,
        spells: ["animate dead", "blink", "daylight", "fireball", "gaseous form", "haste", "meld into stone", "remove curse", "stinking cloud", "water breathing"],
        selection: [],
        times: 1,
        firstCol: "Elixir"
      }
    }
  },
  "create expert elixir": {
    name: "Create Expert Elixir",
    source: [["GMB:LL", 0]],
    description: desc([
      "Prerequisite: 13th-level Alchemist Artificer",
      "Each time you learn this Infusion, you learn the Elixir for one spell effect from the 4th-level spell list",
      "To create additional expert elixirs, you must expend a spell slot of 4th-level or higher",
      "Available spells: banishment, freedom of movement, giant insect, greater invisibility, polymorph, sickening radiance, vitriolic sphere, watery sphere"
    ]),
    prereqeval: function (v) {
      return classes.known["artificer(laserllama)"] &&
        classes.known["artificer(laserllama)"].level >= 13;
    },
    additional: "Choose one 4th-level spell Elixir",
    spellcastingBonusElsewhere: {
      addTo: "artificer(laserllama)",
      spellcastingBonus: {
        name: "Expert Elixir Spells",
        spellcastingAbility: 4,
        spells: ["banishment", "freedom of movement", "giant insect", "greater invisibility", "polymorph", "sickening radiance", "vitriolic sphere", "watery sphere"],
        selection: [],
        times: 1,
        firstCol: "Elixir"
      }
    }
  },
  "create masterwork elixir": {
    name: "Create Masterwork Elixir",
    source: [["GMB:LL", 0]],
    description: desc([
      "Prerequisite: 17th-level Alchemist Artificer",
      "Each time you learn this Infusion, you learn the Elixir for one spell effect from the 5th-level spell list",
      "To create additional masterwork elixirs, you must expend a spell slot of 5th-level or higher",
      "Available spells: cloudkill, dawn, globe of invulnerability, heal, immolation, true seeing"
    ]),
    prereqeval: function (v) {
      return classes.known["artificer(laserllama)"] &&
        classes.known["artificer(laserllama)"].level >= 17;
    },
    additional: "Choose one 5th-level spell Elixir",
    spellcastingBonusElsewhere: {
      addTo: "artificer(laserllama)",
      spellcastingBonus: {
        name: "Masterwork Elixir Spells",
        spellcastingAbility: 4,
        spells: ["cloudkill", "dawn", "globe of invulnerability", "heal", "immolation", "true seeing"],
        selection: [],
        times: 1,
        firstCol: "Elixir"
      }
    }
  }
};

// Biomancer Artificer LL Modifications
// NOTE: See the lack of "var" keyword, it is important as this variable has to be global to be used in other imports
BiomancerModificationsLL = {
    "amphibian physiology": {
        name: "Amphibian Physiology",
        source: [["HB:LL", 0]],
        description: desc([
            "Your neck sprouts gills or your skin becomes permeable like an amphibious creature",
            "You gain a swimming speed equal to your walking speed",
            "You can breathe both air and water"
        ]),
        speed: {
            swim: { number: "walk", condition: "Permanent" }
        },
        additional: "Swim speed, water breathing"
    },
    "bestial senses": {
        name: "Bestial Senses",
        source: [["HB:LL", 0]],
        description: desc([
            "Your eyes and ears resemble those of predators",
            "When you make a Wisdom (Perception) or Wisdom (Survival) check based on your sense of hearing, sight, or smell",
            "You add your Intelligence modifier (minimum of +1) to your roll"
        ]),
        addMod: [{
            type: "skill",
            field: "Perception",
            mod: "max(Int|1)",
            text: "Bestial Senses: Add Intelligence modifier to Perception and Survival checks based on senses"
        }, {
            type: "skill", 
            field: "Survival",
            mod: "max(Int|1)",
            text: "Bestial Senses: Add Intelligence modifier to Perception and Survival checks based on senses"
        }],
        additional: "Int to Perception/Survival"
    },
    "enhanced physicality": {
        name: "Enhanced Physicality",
        source: [["HB:LL", 0]],
        description: desc([
            "Your muscles and veins engorge with arcane power",
            "When you make a Strength ability check or saving throw",
            "You add your Intelligence modifier (minimum of +1) to your roll"
        ]),
        addMod: [{
            type: "skill",
            field: "Strength", 
            mod: "max(Int|1)",
            text: "Enhanced Physicality: Add Intelligence modifier to Strength checks and saves"
        }, {
            type: "save",
            field: "Strength",
            mod: "max(Int|1)",
            text: "Enhanced Physicality: Add Intelligence modifier to Strength checks and saves" 
        }],
        additional: "Int to Strength checks/saves"
    },
    "monstrous claw": {
        name: "Monstrous Claw",
        source: [["HB:LL", 0]],
        description: desc([
            "You transform one of your limbs into a monstrous arm ending in a massive pincer",
            "Your unarmed strikes with this claw deal slashing damage equal to 1d8 + your Strength modifier",
            "On hit, you can choose to automatically grapple your target if it is equal to your size or smaller"
        ]),
        additional: "1d8 slashing unarmed, auto-grapple"
    },
    "resilient hide": {
        name: "Resilient Hide", 
        source: [["HB:LL", 0]],
        description: desc([
            "Your flesh grows hideously thick",
            "When not wearing armor, your Armor Class equals 10 + your Intelligence modifier + your Constitution modifier"
        ]),
        ac: "10 + Int + Con",
        condition: "When not wearing armor",
        additional: "Natural armor AC"
    },
    "winged glide": {
        name: "Winged Glide",
        source: [["HB:LL", 0]],
        description: desc([
            "You grow bat-like skin flaps that you use to glide",
            "When you fall at least 10 feet and aren't incapacitated, you can subtract up to 100 feet from your fall when you calculate fall damage",
            "You can move horizontally 2 feet for every 1 foot you fall"
        ]),
        additional: "Glide, reduced fall damage"
    },
    "arachnoid grip": {
        name: "Arachnoid Grip",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 5th-level Artificer",
            "Your hands and feet secrete a sticky substance",
            "You gain a climbing speed equal to your walking speed",
            "You can climb difficult surfaces without needing to make an ability check",
            "Creatures have disadvantage on ability checks or saving throws they make to escape being grappled by you"
        ]),
        speed: {
            climb: { number: "walk", condition: "Permanent" }
        },
        prereqeval: function(v) { return classes.known["artificer(laserllama)"].level >= 5; },
        additional: "Climb speed, better grappling"
    },
    "greater physique": {
        name: "Greater Physique",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 5th-level Biomancer",
            "Magic forcefully enlarges your body, giving you hideous size",
            "You grow by one size category (for example, from Medium to Large)",
            "Your reach increases by 5 feet",
            "Your weight is multiplied by eight",
            "Your melee weapon attacks deal a bonus 1d4 damage"
        ]),
        prereqeval: function(v) { 
            return classes.known["artificer(laserllama)"] && 
                   classes.known["artificer(laserllama)"].subclass == "biomancer" &&
                   classes.known["artificer(laserllama)"].level >= 5; 
        },
        additional: "+1 size, +5 ft reach, +1d4 melee damage"
    },
    "vestigial limb": {
        name: "Vestigial Limb", 
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 5th-level Artificer",
            "You grow an additional grotesque limb that resembles your other limbs in a place of your choice",
            "It can perform any task your limbs can including the ability to use weapons, shields, magic items, tools, and other objects"
        ]),
        prereqeval: function(v) { return classes.known["artificer(laserllama)"].level >= 5; },
        additional: "Extra functional limb"
    },
    "avian flight": {
        name: "Avian Flight",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 15th-level Artificer",
            "A pair of feathered or leathery wings sprout forth from your back",
            "You gain a flying speed equal to your walking speed"
        ]),
        speed: {
            fly: { number: "walk", condition: "Permanent" }
        },
        prereqeval: function(v) { return classes.known["artificer(laserllama)"].level >= 15; },
        additional: "Flight speed"
    },
    "hideous regeneration": {
        name: "Hideous Regeneration",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 15th-level Artificer", 
            "If you begin your turn with less than half of your hit points remaining, but at least 1 hit point",
            "You instantly regain hit points equal to your Intelligence modifier (minimum of 1)"
        ]),
        regen: "max(Int|1)",
        condition: "When below half HP at start of turn",
        prereqeval: function(v) { return classes.known["artificer(laserllama)"].level >= 15; },
        additional: "Regeneration when wounded"
    }
};

// Gunslinger Artificer LL Upgrades
// NOTE: See the lack of "var" keyword, it is important as this variable has to be global to be used in other imports
GunslingerUpgrades = {
    "close shot": {
        name: "Close Shot",
        source: [["HB:LL", 0]],
        description: desc([
            "When making ranged attack with Arcane Firearm while hostile creature within 5 ft",
            "Do not have disadvantage on attack roll"
        ]),
        additional: "No disadvantage in melee"
    },
    "deadly accuracy": {
        name: "Deadly Accuracy",
        source: [["HB:LL", 0]],
        description: desc([
            "+2 bonus to Arcane Firearm attack rolls",
            "Does not stack with Archery Fighting Style"
        ]),
        addMod: [{
            type: "skill",
            field: "Attack with Arcane Firearm",
            mod: 2,
            text: "Deadly Accuracy: +2 bonus to Arcane Firearm attack rolls"
        }],
        additional: "+2 to attack rolls"
    },
    "elemental shot": {
        name: "Elemental Shot",
        source: [["HB:LL", 0]],
        description: desc([
            "Bonus action: touch Arcane Firearm and expend spell slot (1st-level+)",
            "Choose acid, cold, fire, lightning, or poison damage type",
            "For 1 minute: Arcane Firearm deals additional damage of chosen type on hit",
            "Bonus damage: 1d4 for 1st-level slot + 1d4 per slot level above 1st"
        ]),
        action: [["bonus action", "Activate Elemental"]],
        additional: "Elemental damage boost"
    },
    "grooved barrel": {
        name: "Grooved Barrel",
        source: [["HB:LL", 0]],
        description: desc([
            "Ignore disadvantage on Arcane Firearm attacks at long range"
        ]),
        additional: "No long range disadvantage"
    },
    "high caliber": {
        name: "High Caliber",
        source: [["HB:LL", 0]],
        description: desc([
            "Range increases to (100/400)",
            "Damage die increases from 1d10 to 2d6",
            "Gains heavy and two-handed properties"
        ]),
        additional: "Increased range and damage"
    },
    "replaceable parts": {
        name: "Replaceable Parts",
        source: [["HB:LL", 0]],
        description: desc([
            "Spend 10 minutes with smith's tools to replace one Upgrade with another",
            "Can be done during short rest"
        ]),
        additional: "Flexible upgrades"
    },
    "blinding rounds": {
        name: "Blinding Rounds",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 5th-level Artificer",
            "Once per turn when hitting target: force Constitution save",
            "On failure: blinded until start of your next turn"
        ]),
        prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; },
        additional: "Blind on hit"
    },
    "concussive rounds": {
        name: "Concussive Rounds",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 5th-level Artificer",
            "Once per turn when hitting target: force Constitution save",
            "On failure: cannot take reactions and speed halved until start of your next turn"
        ]),
        prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; },
        additional: "Slow and no reactions"
    },
    "explosive rounds": {
        name: "Explosive Rounds",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 5th-level Artificer",
            "Once per turn when hitting target: all creatures within 5 ft make Dexterity save",
            "On failed save: take damage as if hit by your Arcane Firearm attack"
        ]),
        prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 5; },
        additional: "Splash damage"
    },
    "incapacitating rounds": {
        name: "Incapacitating Rounds",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 10th-level Artificer",
            "Once per turn when hitting target: force Strength save",
            "On failed save: incapacitated until start of your next turn, or until taking damage or making save",
            "Large+ creatures have advantage on the save"
        ]),
        prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 10; },
        additional: "Incapacitate on hit"
    },
    "arcane railgun": {
        name: "Arcane Railgun",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 15th-level Artificer",
            "Once per turn in place of attack: 60-ft line Dexterity save",
            "Failed save: 4d6 force damage, half damage on success"
        ]),
        action: [["action", "Railgun Attack"]],
        prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 15; },
        additional: "Line area attack"
    },
    "independent turret": {
        name: "Independent Turret",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 15th-level Artificer",
            "Action: set Arcane Firearm as turret in 5-ft space",
            "While within 120 ft: bonus action to make attack or use ability through turret"
        ]),
        action: [["action", "Deploy Turret"], ["bonus action", "Command Turret"]],
        prereqeval: function (v) { return classes.known["artificer(laserllama)"].level >= 15; },
        additional: "Deployable turret"
    }
};

// Machinist Artificer LL Automaton Models
// NOTE: See the lack of "var" keyword, it is important as this variable has to be global to be used in other imports
AutomatonModels = {
    "agent model": {
        name: "Agent Model",
        source: [["HB:LL", 0]],
        description: desc([
            "Action: perceive through Automaton's senses, become blind to own senses",
            "Bonus action to end",
            "Must be within 1 mile of Automaton"
        ]),
        action: [["action", "Perceive through Automaton"]],
        additional: "Remote sensing"
    },
    "anchor model": {
        name: "Anchor Model",
        source: [["HB:LL", 0]],
        description: desc([
            "Action: latch onto target within 5 ft, reduce speed by 5 × Intelligence modifier (min 5 ft)",
            "Automaton can still be targeted while attached",
            "Creature can use action to make Strength check vs Spell DC to remove"
        ]),
        action: [["action", "Latch onto Target"]],
        additional: "Movement reduction"
    },
    "arcane model": {
        name: "Arcane Model",
        source: [["HB:LL", 0]],
        description: desc([
            "When casting Artificer spell: can originate from this Automaton instead of self",
            "Must be within 60 ft of Automaton",
            "Automaton's Slam attack deals force damage"
        ]),
        additional: "Spell redirection, force damage"
    },
    "artisan model": {
        name: "Artisan Model",
        source: [["HB:LL", 0]],
        description: desc([
            "Automaton proficient with one set of tools (chosen at creation)",
            "Action: use tools to make ability check, add Intelligence modifier (min +1) to result"
        ]),
        action: [["action", "Use Tools"]],
        additional: "Tool proficiency and bonus"
    },
    "assault model": {
        name: "Assault Model",
        source: [["HB:LL", 0]],
        description: desc([
            "Slam attack damage increases to 1d10",
            "Deals force damage instead of bludgeoning"
        ]),
        additional: "1d10 force damage"
    },
    "amphibian model": {
        name: "Amphibian Model",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 5th-level Artificer",
            "Gains 30-foot swimming speed",
            "While swimming: advantage on Slam attack rolls"
        ]),
        prereqeval: function(v) { return classes.known["artificer(laserllama)"].level >= 5; },
        additional: "Swim speed, advantage in water"
    },
    "arachnid model": {
        name: "Arachnid Model",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 5th-level Artificer",
            "Gains 30-foot climbing speed",
            "Can climb difficult surfaces including sheer walls and ceilings without checks"
        ]),
        prereqeval: function(v) { return classes.known["artificer(laserllama)"].level >= 5; },
        additional: "Spider climb"
    },
    "archer model": {
        name: "Archer Model",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 5th-level Artificer",
            "Slam attack can be ranged weapon attack against target within 60 ft",
            "Deals piercing damage on hit"
        ]),
        prereqeval: function(v) { return classes.known["artificer(laserllama)"].level >= 5; },
        additional: "Ranged attacks"
    },
    "armor model": {
        name: "Armor Model",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 5th-level Artificer",
            "Action: attach to willing creature within 5 ft, grant AC bonus equal to Intelligence modifier (min +1)",
            "Automaton can still be targeted while attached",
            "Action to detach from target"
        ]),
        action: [["action", "Attach/Detach"]],
        prereqeval: function(v) { return classes.known["artificer(laserllama)"].level >= 5; },
        additional: "AC bonus for allies"
    },
    "avenger model": {
        name: "Avenger Model",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 10th-level Artificer",
            "Reaction when creature within 25 ft attacks or forces save: order Automaton to move and Slam attack",
            "On hit: bonus 1d6 bludgeoning damage"
        ]),
        action: [["reaction", "Retaliate"]],
        prereqeval: function(v) { return classes.known["artificer(laserllama)"].level >= 10; },
        additional: "Reaction attacks with bonus damage"
    },
    "avian model": {
        name: "Avian Model",
        source: [["HB:LL", 0]],
        description: desc([
            "Prerequisite: 10th-level Artificer",
            "Gains 30-foot flying speed",
            "While flying: opportunity attacks against Automaton have disadvantage"
        ]),
        prereqeval: function(v) { return classes.known["artificer(laserllama)"].level >= 10; },
        additional: "Flight, disadv. on opportunity attacks"
    }
};
