/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	REQUIRES: "Laserllama Common Attributes 20261019.js" (import it first).
	Do not import the old LaserLlama files in the same sheet.

	-INFORMATION-
	Content:	Commoner, Magus (+ Expanded), Psion, Savant (+ Expanded), Shaman (+ Expanded), Shifter, Vessel, Warlord (+ Expanded)
	Files:		LaserLlama - Commoner v2.0.0.js
			LaserLlama - Magus v4.3.2.js
			LaserLlama - Magus Expanded v4.3.2.js
			LaserLlama - Psion v2.4.1.js
			LaserLlama - Savant v5.6.1.js
			LaserLlama - Savant Expanded v5.6.1.js
			LaserLlama - Shaman v6.0.1.js
			LaserLlama - Shaman Expanded v6.0.1.js
			LaserLlama - Shifter v2.1.0.js
			LaserLlama - Vessel v4.0.0.js
			LaserLlama - Warlord v3.3.0.js
			LaserLlama - Warlord Expanded v3.3.0.js
	Sheet:		v13.2.3
	Code by:	"ll-updates" release
*/

var iFileName = "Laserllama Original Laserllama.js";
RequiredSheetVersion("13.2.3");

// This file needs "Laserllama Common Attributes 20261019.js": stop with a clear message if it isn't loaded yet
if (typeof LLCommonAttributesVersion === "undefined") {
	throw new Error("\n\nATTENZIONE / WARNING\n\nPer usare \"Laserllama Original Laserllama.js\" devi prima importare \"Laserllama Common Attributes 20261019.js\". Importa quel file e poi importa di nuovo questo.\n\nTo use this file, first import \"Laserllama Common Attributes 20261019.js\", then import this file again.\n");
}

// ======================================================================
// LaserLlama - Commoner v2.0.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Commoner" (a joke class, levels 1-11)
	Effect:		This script adds the Commoner class, its Tall Tales, and its 6 Trades.
				Commoner v2.0.0 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Commoner" in the Class field (e.g. "Farmer Commoner")
*/


if (typeof LLAddFightingStyles !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

LLComLvl = function () { return classes.known["commoner(laserllama)"] ? classes.known["commoner(laserllama)"].level : 0; };
LLGritDie = function (n) { return n < 11 ? "d4" : "d6"; };

var LLTallTales = [
	["Tale of the Big Fish", "Proficiency with fishing tackle and water vehicles; with a body of water I can feed me and my companions for a day; once a day, my fish story makes willing listeners friendly", { toolProfs : ["Fishing tackle", "Vehicles (water)"] }],
	["Tale of the Boisterous Bard", "Proficiency in Performance and one musical instrument; in a new town I can always find shelter if I perform there each night", { skills : ["Performance"], toolProfs : [["Musical instrument", 1]] }],
	["Tale of the Crooked Con Artist", "Proficiency in Deception and with disguise kits; I use Wisdom for Deception; over a long rest I can create a second identity with a disguise", { skills : ["Deception"], toolProfs : ["Disguise kit"] }],
	["Tale of the Fearless Farmer", "Proficiency with one martial melee weapon without heavy, finesse, special, or two-handed; telling this tale, common folk give me food and shelter", { weaponProfs : [false, false, ["one martial melee weapon"]] }],
	["Tale of the Menacing Mercenary Company", "Proficiency with shields and one gaming set; I can pose as a member of the company and gain its benefits", { armorProfs : [false, false, false, true], toolProfs : [["Gaming set", 1]] }],
	["Tale of the Harrowing Haunt", "Proficiency in Religion and Intimidation (I use Wisdom for Intimidation); I add my Wis mod to Int checks about evil, undead, or necromancy", { skills : ["Religion", "Intimidation"] }],
	["Tale of the Midnight Thief", "Proficiency with thieves' tools and I know Thieves' Cant; I can find a den of criminal activity or thieves' guild in any new settlement", { toolProfs : ["Thieves' tools"], languageProfs : ["Thieves' Cant"] }],
	["Tale of the Unfortunate Orphan", "I have a pet mouse trained to obey simple commands; adv. on checks to find hidden routes, passages, and hideouts in towns and cities"],
	["Tale of the Wandering Woodsman", "Proficiency with shortbows and Perception or Survival; if the land isn't barren, I can hunt enough game to feed up to five creatures", { weaponProfs : [false, false, ["shortbow"]], skillstxt : "Choose one from Perception or Survival" }]
];
var LLRusticSpells = ["animal friendship", "bane", "beast bond", "bless", "ceremony", "charm person", "create snare", "create water", "cure wounds", "detect evil & good", "detect magic", "detect poison & disease", "entangle", "fog cloud", "hex", "longstrider", "protection from evil & good", "purify food & drink", "sanctuary", "speak with animals", "unseen servant",
	"aid", "animal messenger", "augury", "awaken plant", "barkskin", "blindness/deafness", "calm emotions", "conjure beast", "enhance ability", "gentle repose", "locate creature", "lock/unlock", "moonbeam", "pass without trace", "protection from poison", "restoration", "silence", "spike growth", "suggestion", "warding bond", "warding wind", "zone of truth"];

ClassList["commoner(laserllama)"] = {
	name : "Commoner",
	regExpSearch : /^(?=.*commoner).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Constitution and Wisdom",
	prereqs : "Constitution 13",
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	saves : ["Str", "Con"],
	abilitySave : 5,
	skillstxt : {
		primary : "Choose two from Animal Handling, Athletics, Insight, Persuasion, Religion, and Survival"
	},
	armorProfs : {
		primary : [true, false, false, false]
	},
	weaponProfs : {
		primary : [false, false, ["club", "dagger", "quarterstaff", "sling", "improvised weapons"]]
	},
	toolProfs : {
		primary : [["Artisan's tools", 1]]
	},
	equipment : "Commoner starting equipment:" +
		"\n \u2022 Leather armor -or- a cloak, a sling, and 20 rocks;" +
		"\n \u2022 A club and a dagger -or- a quarterstaff.",
	subclasses : ["Trade", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	features : {
		"grit" : {
			name : "Grit",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"After I roll the d20 for an attack, check, or save (before the outcome), I can expend Grit Dice up to my Wis mod (min 1) and add them",
				"I have Commoner level + Con mod Grit Dice; I regain all of them on a short or long rest"
			]),
			additional : levels.map(function (n) { return LLGritDie(n) + " Grit Dice"; }),
			usages : "Commoner level + Con mod per ",
			usagescalc : "event.value = Math.max(1, LLComLvl() + Number(What('Con Mod')));",
			recovery : "short rest"
		},
		"rough & ready" : {
			name : "Rough & Ready",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I can use Constitution instead of Dexterity for my Armor Class (unless I already add Constitution)"),
			extraAC : LLAbiForDexAC("Con", false, false, "Rough & Ready")
		},
		"subclassfeature1" : {
			name : "Trade",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc('Choose the Trade I spend my days at and put it in the "Class" field ')
		},
		"old reliable" : {
			name : "Old Reliable",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"One tool or weapon from my Trade becomes my Old Reliable; include \"Old Reliable\" in its attack's name",
				"Tools deal 1d6 bludgeoning, piercing, or slashing as improvised weapons; a weapon's damage die becomes at least 1d6",
				"I can use Wisdom instead of Strength for its attack and damage rolls"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && /old reliable/i.test(v.WeaponTextName)) {
							if (Number(What("Wis Mod")) > Number(What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod"))) fields.Mod = 5;
							if (/^\d?d[1-4]$/i.test(fields.Damage_Die) || fields.Damage_Die == 1 || fields.Damage_Die === "") fields.Damage_Die = "1d6";
							fields.Proficiency = true;
						}
					},
					"If I include 'Old Reliable' in a weapon's name, it deals at least 1d6 damage and can use Wisdom instead of Strength."
				]
			}
		},
		"tall tales" : {
			name : "Tall Tales",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("I know Tall Tales (\"Choose Feature\" button); I can replace one each time I gain a Commoner level"),
			additional : levels.map(function (n) { return n < 2 ? "" : (n < 4 ? 2 : n < 6 ? 3 : n < 9 ? 4 : 5) + " Tall Tales"; }),
			extraname : "Tall Tale",
			extrachoices : [],
			extraTimes : levels.map(function (n) { return n < 2 ? 0 : n < 4 ? 2 : n < 6 ? 3 : n < 9 ? 4 : 5; })
		},
		"gumption" : {
			name : "Gumption",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"When I hit with an Old Reliable attack, I can expend Grit Dice and add them to the damage",
				"As a reaction when I take damage, I can expend a Grit Die to reduce it by the roll + Con mod (min +1)"
			]),
			action : [["reaction", ""]]
		},
		"weather the storm" : {
			name : "Weather the Storm",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("If I make a Con or Wis save for half damage, I take no damage on a success and half on a failure")
		},
		"know-how" : {
			name : "Know-How",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("As a reaction when a creature within 30 ft makes a check or save I'm proficient in, I add my Wis mod (min +1) to it"),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"true grit" : {
			name : "True Grit",
			source : [["GMB:LL", 0]],
			minlevel : 9,
			description : LLdesc("I regain one expended Grit Die at the start of each of my turns in combat")
		},
		"common no more" : {
			name : "Common No More",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc([
				"My Grit Dice become d6s; I take one level in another class, ignoring the multiclassing requirements",
				"If it grants Spellcasting, I use Wisdom; my 11th Commoner level doesn't count against my character level"
			])
		}
	}
};
(function () {
	var oFea = ClassList["commoner(laserllama)"].features["tall tales"];
	for (var i = 0; i < LLTallTales.length; i++) {
		var a = LLTallTales[i];
		oFea.extrachoices.push(a[0]);
		var o = { name : a[0], source : [["GMB:LL", 0]], description : LLdesc(a[1]) };
		if (a[2]) for (var p in a[2]) o[p] = a[2][p];
		oFea[a[0].toLowerCase()] = o;
	}
})();

// ======================= TRADES =======================

AddSubClass("commoner(laserllama)", "farmer", {
	regExpSearch : /^(?=.*farmer)(?=.*commoner).*$/i,
	subname : "Farmer",
	fullname : "Farmer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : {
			name : "Green Thumb",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I gain proficiency with Farmer's tools (hoes, plows, rakes, scythes, shovels) and Animal Handling or Nature"),
			toolProfs : ["Farmer's tools"],
			skillstxt : "Choose one from Animal Handling or Nature"
		},
		"subclassfeature1.1" : {
			name : "Fresh Produce",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("As an action, I expend a Grit Die to produce Produce; I eat it or feed it to a willing creature in reach: Grit Die + Wis mod temp HP"),
			action : [["action", ""]]
		},
		"subclassfeature3" : {
			name : "Loyal Livestock",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"A farm animal (male or female) adventures with me; see the Companion page; only one at a time",
				"It acts on my turn and only acts if I command it (bonus action); if I'm incapacitated it acts on its own",
				"At 0 HP, it makes death saving throws like a player character"
			]),
			action : [["bonus action", "Command Livestock"]],
			creaturesAdd : [["Loyal Livestock (LL)"]],
			creatureOptions : [{
				name : "Loyal Livestock (LL)",
				source : [["GMB:LL", 0]],
				size : 3,
				type : "Beast",
				alignment : "Unaligned",
				ac : "10+Prof",
				hp : 12,
				hd : [1, 12],
				hdLinked : ["commoner(laserllama)"],
				minlevelLinked : ["commoner(laserllama)"],
				speed : "30 ft",
				scores : [16, 10, 15, 4, 10, 4],
				senses : "",
				passivePerception : 10,
				languages : "",
				challengeRating : "1",
				proficiencyBonus : 2,
				proficiencyBonusLinked : true,
				attacksAction : 1,
				attacks : [{
					name : "Stomp",
					ability : 0,
					damage : [2, 4, "bludgeoning"],
					modifiers : ["3+Prof", "Prof"],
					range : "Melee (5 ft)",
					abilitytodamage : false,
					description : "Male: Charge; from Prizewinner (10th), it can Stomp twice when commanded"
				}],
				traits : [{
					name : "Beast of Burden",
					description : "It counts as one size larger for its carrying capacity and the weight it can drag, lift, push, and pull."
				}, {
					name : "Farmer's Bond",
					description : "It adds its Farmer's Proficiency Bonus to its ability checks and saving throws."
				}, {
					name : "Hit Dice",
					description : "It has d12 Hit Dice equal to its Farmer's Commoner level and benefits from short and long rests."
				}, {
					name : "Charge (Male Only)",
					description : "If it moves 20 ft in a line and hits a creature its size or smaller with Stomp, the target makes a Str save (DC 11 + PB) or falls prone."
				}, {
					name : "Mother's Milk (Female Only)",
					description : "During each long rest, the Farmer can spend 1 hour milking it for PB Bottles of Milk that work as potions of healing."
				}, {
					name : "Prizewinner (Farmer 10)",
					minlevel : 10,
					description : "It becomes Large, its HP maximum increases by its Farmer's Commoner level, and it can Stomp twice when commanded."
				}],
				calcChanges : {
					hp : function (totalHD, HDobj, prefix) {
						if (!classes.known["commoner(laserllama)"]) return;
						var lvl = classes.known["commoner(laserllama)"].level;
						var add = lvl >= 10 ? lvl : 0;
						HDobj.alt.push(7 + 5 * lvl + add);
						HDobj.altStr.push(" = 7 as a base\n + 5 \xD7 " + lvl + " from five times its Farmer's Commoner level (" + (5 * lvl) + ")" + (add ? "\n + " + add + " from Prizewinner" : ""));
					},
					setAltHp : true
				}
			}]
		},
		"subclassfeature10" : {
			name : "Prizewinner",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"My Livestock becomes Large, gains HP equal to my Commoner level, and Stomps twice when commanded",
				"Working up to a square mile of farmland for 8 hours gives it the 8-hour effect of plant growth"
			])
		}
	}
});

AddSubClass("commoner(laserllama)", "innkeeper", {
	regExpSearch : /^(?=.*innkeep)(?=.*commoner).*$/i,
	subname : "Innkeeper",
	fullname : "Innkeeper",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : {
			name : "Country Charm",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				var r = n < 10 ? 0 : 1;
				return LLdesc([
					"As an action, I spend Grit Dice to mimic a spell (Wisdom; DC 8 + Prof + Wis mod):",
					"0: friends, guidance, vicious mockery; " + (3 - r) + ": charm person, heroism, hideous laughter",
					(6 - r) + ": calm emotions, enthrall, suggestion; " + (8 - r) + ": catnap, enemies abound"
				]);
			}),
			action : [["action", ""]],
			spellcastingAbility : 5,
			spellcastingBonus : [
				{ name : "Country Charm (0 Grit)", spells : LLSpellList(["friends", "guidance", "vicious mockery"]), selection : LLSpellList(["friends", "guidance", "vicious mockery"]), times : 3, firstCol : "atwill" },
				{ name : "Country Charm (Grit)", spells : LLSpellList(["charm person", "heroism", "hideous laughter", "calm emotions", "enthrall", "suggestion", "catnap", "enemies abound"]), selection : LLSpellList(["charm person", "heroism", "hideous laughter", "calm emotions", "enthrall", "suggestion", "catnap", "enemies abound"]), times : 8, firstCol : "Gr" }
			]
		},
		"subclassfeature1.1" : {
			name : "Rustic Hospitality",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I gain proficiency with brewer's supplies, cook's utensils, and Insight or Persuasion; on checks with these, I treat a d20 roll of 7 or lower as 8"),
			toolProfs : ["Brewer's supplies", "Cook's utensils"],
			skillstxt : "Choose one from Insight or Persuasion"
		},
		"subclassfeature3" : {
			name : "Storyteller",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("After a short or long rest, I can replace one Tall Tale I know; after a long rest in a settlement, I learn one current rumor")
		},
		"subclassfeature10" : {
			name : "Full-Belly-Bravery",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"I and those who finish a rest with me gain Commoner level + Wis mod (min 1) temp HP",
				"While they have them, they can't be charmed or frightened and add my Wis mod (min +1) to saves; Country Charm costs 1 less"
			])
		}
	}
});

AddSubClass("commoner(laserllama)", "laborer", {
	regExpSearch : /^(?=.*(laborer|labourer))(?=.*commoner).*$/i,
	subname : "Laborer",
	fullname : "Laborer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : {
			name : "Bulky",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("My hit point maximum increases by my Commoner level; I count as one size larger for carrying capacity, push, drag, and lift"),
			calcChanges : {
				hp : function (totalHD) {
					if (classes.known["commoner(laserllama)"]) return [classes.known["commoner(laserllama)"].level, "Bulky (Commoner level)"];
				}
			},
			carryingCapacity : 2
		},
		"subclassfeature1.1" : {
			name : "True Craftsman",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I gain proficiency with mauls, warhammers, greataxes, and battleaxes (they look like tools)",
				"I gain proficiency and expertise with two of: carpenter's, mason's, smith's, or woodcarver's tools"
			]),
			weaponProfs : [false, false, ["maul", "warhammer", "greataxe", "battleaxe"]],
			toolProfs : [["Carpenter's, mason's, smith's, or woodcarver's tools", 2]]
		},
		"subclassfeature3" : {
			name : "Fortify",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("With True Craftsman tools and materials, every 10 minutes I build a simple Medium structure (HP 10 \xD7 Commoner level, AC = Wis score)")
		},
		"subclassfeature3.1" : {
			name : "Unflinching",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("As a reaction after I take damage, I expend a Grit Die to gain Grit Die + Con mod temp HP"),
			action : [["reaction", ""]]
		},
		"subclassfeature10" : {
			name : "Great Labor & Iron Body",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"In 10 minutes (can be in a rest), with tools and materials, I replicate passwall or wall of stone, nonmagical and permanent",
				"Using it again within 1 hour gives me 1 level of exhaustion",
				"When I take B/P/S damage, I can expend a Grit Die to resist that instance, then gain Unflinching's benefits"
			])
		}
	}
});

AddSubClass("commoner(laserllama)", "merchant", {
	regExpSearch : /^(?=.*merchant)(?=.*commoner).*$/i,
	subname : "Merchant",
	fullname : "Merchant",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : {
			name : "Haggler",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I learn one language and gain proficiency with one artisan's tools and Deception or Persuasion",
				"Negotiating in a creature's native tongue (not Common), I add my Grit Die to Deception and Persuasion checks"
			]),
			languageProfs : [1],
			toolProfs : [["Artisan's tools", 1]],
			skillstxt : "Choose one from Deception or Persuasion"
		},
		"subclassfeature1.1" : {
			name : "Bottomless Inventory",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"As an action, I expend Grit Dice (up to Wis mod) to pull a nonmagical item I've seen worth up to 10 gp per die from a bag",
					"I must put the previous item back to use it again; otherwise, it vanishes after my next long rest" + (n < 10 ? "" : "; Rare Find: 5 Grit Dice for a common/uncommon magic item")
				]);
			}),
			action : [["action", ""]]
		},
		"subclassfeature3" : {
			name : "Eye for Value",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Examining an object for 1 minute works as identify; once per turn, my Old Reliable hits add my Grit Die to damage")
		},
		"subclassfeature10" : {
			name : "Market Insights & Rare Find",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("My purchases cost a percentage less equal to my Commoner level; Bottomless Inventory can pull a common/uncommon magic item for 5 Grit Dice")
		}
	}
});

AddSubClass("commoner(laserllama)", "old timer", {
	regExpSearch : /^(?=.*old)(?=.*timer)(?=.*commoner).*$/i,
	subname : "Old Timer",
	fullname : "Old Timer",
	source : [["GMB:LL", 0]],
	spellcastingFactor : "rusticll2",
	spellcastingTable : [[0, 0, 0, 0, 0, 0, 0, 0, 0]].concat(levels.map(function (n) {
		return n < 3 ? [0, 0, 0, 0, 0, 0, 0, 0, 0] : n < 7 ? [2, 0, 0, 0, 0, 0, 0, 0, 0] : [0, 2, 0, 0, 0, 0, 0, 0, 0];
	})),
	spellcastingKnown : {
		spells : "list",
		prepared : true
	},
	spellcastingList : {
		spells : LLSpellList(LLRusticSpells)
	},
	features : {
		"subclassfeature1" : {
			name : "Village Elder",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I gain proficiency with one artisan's tools and learn two languages"),
			toolProfs : [["Artisan's tools", 1]],
			languageProfs : [2]
		},
		"subclassfeature1.1" : {
			name : "Sage Advice",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I gain proficiency in History and can use Wisdom for it; I can take the Help action as a bonus action (mildly annoying)"),
			skills : ["History"],
			action : [["bonus action", "Help"]]
		},
		"subclassfeature3" : {
			name : "Rustic Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"I have two " + (n < 7 ? "1st" : "2nd") + "-level spell slots, regained on a short or long rest, to cast prepared Rustic spells",
					"I prepare Wis mod + half my Commoner level Rustic spells at the end of a long rest" + (n < 10 ? "" : " (or a short rest)"),
					"Wisdom is my spellcasting ability"
				]);
			})
		},
		"subclassfeature10" : {
			name : "Rustic Knowledge",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I can change my prepared Rustic spells each time I finish a short or long rest")
		}
	}
});
ClassSubList["commoner(laserllama)-old timer"].abilitySave = 5;
ClassSubList["commoner(laserllama)-old timer"].spellcastingAbility = 5;

LLExploitTables["commoner(laserllama)-town guard"] = {
	cls : "commoner(laserllama)",
	sub : "commoner(laserllama)-town guard",
	factor : 0.5,
	dice : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	die : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
	maxDegree : [0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
};
AddSubClass("commoner(laserllama)", "town guard", {
	regExpSearch : /^(?=.*(town guard|guard))(?=.*commoner).*$/i,
	subname : "Town Guard",
	fullname : "Town Guard",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : {
			name : "Militia Training",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I gain proficiency with medium armor, shields, and one martial weapon without heavy, finesse, special, or two-handed"),
			armorProfs : [false, true, false, true],
			weaponProfs : [false, false, ["one martial weapon (no heavy/finesse/special/two-handed)"]]
		},
		"subclassfeature3" : (function () {
			var oFea = {
				name : "Lieutenant Guard",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : LLdesc("Choose a Fighting Style using the \"Choose Feature\" button above"),
				choices : []
			};
			LLAddFightingStyles(oFea, ["balanced", "defensive", "protection"]);
			return oFea;
		})(),
		"subclassfeature3.1" : LLExploitFeature({
			name : "Simple Exploits",
			minlevel : 3,
			cls : "commoner(laserllama)",
			list : "fighter(laserllama)",
			tableKey : "commoner(laserllama)-town guard",
			sheet : "martial exploits",
			sheetName : "Martial Exploits",
			ability : 5,
			notesTitle : "Town Guard Simple Exploits",
			extraname : "Simple Exploit",
			extraTimes : [0, 0, 5, 5, 5, 5, 5, 5, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
			description : LLdesc([
				"I learn Wis mod (min 1) 1st-degree Martial Exploits of the Alternate Fighter (\"Choose Feature\"; the menu allows up to 5)",
				"I fuel them with Grit Dice instead of Exploit Dice (always roll); max one Exploit per turn",
				"Exploit save DC = 8 + Prof Bonus + Wis mod; at 10th level I learn two 2nd-degree Exploits"
			])
		}),
		"subclassfeature10" : {
			name : "Elite Guardsman & Rustic Fury",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"I learn two 2nd-degree Exploits (added to the Simple Exploits menu); my Old Reliable weapon crits on 19-20",
				"When I take the Attack action, I can expend a Grit Die to attack twice"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && /old reliable/i.test(v.WeaponTextName) && !v.CritChance) {
							v.CritChance = 19;
							fields.Description += (fields.Description ? "; " : "") + "Crit on 19-20";
						}
					},
					"My Old Reliable weapon attacks score a critical hit on a roll of 19 or 20."
				]
			}
		}
	}
});

// ======================================================================
// LaserLlama - Magus v4.3.2.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Magus"
	Effect:		This script adds the Magus class (Intelligence half caster) and its 6 Esoteric Orders.
				Magus v4.3.2 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Magus" in the Class field (e.g. "Order of Blades Magus")
*/


if (typeof LLAddFightingStyles !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

// The official Wizard (and Magus-named options) shouldn't catch the "Magus" class
if (ClassList["wizard"]) ClassList["wizard"].regExpSearch = /^(?=.*(wizard|mage))(?!.*(wild mage|laserllama|magus)).*$/i;
LLMagLvl = function () { return classes.known["magus(laserllama)"] ? classes.known["magus(laserllama)"].level : 0; };

var LLMagusSpells = [
	"acid splash", "blade ward", "booming blade", "dancing lights", "fire bolt", "frostbite", "glitterbeam", "green-flame blade", "light", "lightning lure", "mage hand", "minor illusion", "poison spray", "prestidigitation", "resistance", "ray of frost", "shocking grasp", "sword burst", "tempestuous blade", "true strike",
	"absorb elements", "armor of agathys", "burning hands", "caustic brew", "chromatic orb", "color spray", "detect magic", "earth tremor", "expeditious retreat", "faerie fire", "feather fall", "floating disk", "fog cloud", "grease", "ice knife", "identify", "jump", "mage armor", "magic missile", "ray of sickness", "shield", "sleep", "thunderwave", "torrent", "unseen servant", "witch bolt", "zephyr strike",
	"acid arrow", "aura of frost", "blindness/deafness", "blur", "cloud of daggers", "darkness", "darkvision", "earthen grasp", "elemental blade", "enhance ability", "enlarge/reduce", "gust of wind", "hold person", "invisibility", "levitate", "lock/unlock", "magic aura", "magic weapon", "mirror image", "misty step", "ray of enfeeblement", "scorching ray", "shatter", "snowball swarm", "spider climb",
	"counterspell", "dispel magic", "elemental bane", "elemental weapon", "erupting earth", "fireball", "flame arrows", "fly", "haste", "lightning bolt", "magic circle", "minute meteors", "protection from energy", "sleet storm", "slow", "sonic wave", "tidal wave", "tiny hut", "thunder step", "wall of sand", "wall of water", "wind wall",
	"accursed touch", "arcane eye", "banishment", "dimension door", "divination", "fire shield", "freedom of movement", "greater invisibility", "ice storm", "polymorph", "resilient sphere", "sickening radiance", "stoneskin", "vitriolic sphere", "wall of fire", "wall of ice", "watery sphere",
	"cone of cold", "contact other plane", "contagion", "dispel evil & good", "far step", "hold monster", "immolation", "passwall", "scrying", "skill empowerment", "steel wind strike", "telepathic bond", "teleportation circle", "vorpal blade", "wall of force", "wall of light", "wall of stone"
];
LLAddSpellsToClass("magus(laserllama)", LLMagusSpells);

LLOrderSpells = function (sName, aSpells) {
	return {
		name : sName + " Spells",
		source : [["GMB:LL", 0]],
		minlevel : 3,
		description : LLdesc("I learn my Order Spells at the levels shown; they don't count against my spells known and can't be replaced"),
		spellcastingExtra : LLSpellList(aSpells),
		spellcastingExtraApplyNonconform : true
	};
};

ClassList["magus(laserllama)"] = {
	name : "Magus",
	regExpSearch : /^(?=.*magus).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Strength or Dexterity, and Intelligence",
	prereqs : "Strength or Dexterity 13, and Intelligence 13",
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Con", "Int"],
	abilitySave : 4,
	spellcastingFactor : 2,
	spellcastingKnown : {
		cantrips : [0, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : [0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11]
	},
	spellcastingList : {
		"class" : "magus(laserllama)",
		level : [0, 5]
	},
	skillstxt : {
		primary : "Choose two from Acrobatics, Arcana, Athletics, History, Investigation, Nature, and Performance"
	},
	armorProfs : {
		primary : [true, true, false, true],
		secondary : [true, true, false, true]
	},
	weaponProfs : {
		primary : [true, true],
		secondary : [true, true]
	},
	equipment : "Magus starting equipment:" +
		"\n \u2022 A martial weapon and a shield -or- two martial weapons;" +
		"\n \u2022 Scale mail -or- leather armor;" +
		"\n \u2022 A light crossbow and 20 bolts -or- five javelins;" +
		"\n \u2022 A dungeoneer's pack -or- an explorer's pack." +
		"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Esoteric Order", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"arcane armory" : {
			name : "Arcane Armory",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"With a 1-hour ritual, I add a weapon, shield, armor, or Tiny object to my extradimensional Armory (one must be a melee weapon)",
				"As a bonus action, I summon/equip and shunt/store any number of Armory objects",
				"Armory weapons, shields, and armor are magical; in Armory light/medium armor, I can use Int instead of Dex for AC"
			]),
			additional : levels.map(function (n) { return (1 + n) + " objects"; }),
			action : [["bonus action", "Access Arcane Armory"]],
			extraAC : LLAbiForDexAC("Int", "In light or medium armor from my Arcane Armory, I can use my Intelligence instead of Dexterity for AC.", true, "Arcane Armory")
		},
		"fighting style" : {
			name : "Fighting Style",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("Choose a Fighting Style using the \"Choose Feature\" button above; I can replace it when I gain a Magus level"),
			choices : []
		},
		"spellcasting" : {
			name : "Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I can cast Magus cantrips/spells that I know, using Intelligence as my spellcasting ability",
				"Armory weapons, shields, or arcane foci are my spellcasting focus; Armory weapons/shields can perform somatic components"
			]),
			additional : levels.map(function (n, idx) {
				var aC = [0, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
				var aS = [0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11];
				return n < 2 ? "" : aC[idx] + " cantrips & " + aS[idx] + " spells known";
			})
		},
		"spellstrike" : {
			name : "Spellstrike",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					(n < 11 ? "Once on my turn" : "Once per turn with a spell (cantrips: every attack, +1d8 of its type)") + ", when I attack with a melee Armory weapon, I can cast a 1-action Magus spell through it",
					"It must need a spell attack, force a save, or affect HP worth of creatures; on a miss it fails (slot spent)",
					"On hit: areas larger than a 5-ft cube affect only the target or a 15-ft cone from it; target has disadv. on its save (crit: auto-fail)",
					"Spell attacks use my weapon attack; concentration starts on hit; cantrips change my weapon damage type and apply their effects"
				]);
			})
		},
		"arcane regeneration" : {
			name : "Arcane Regeneration",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Once per long rest during a short rest, I recover spell slots with a combined level up to my Int mod (min one 1st-level)"),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature3" : {
			name : "Esoteric Order",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc('Choose an Esoteric Order of the Magi and put it in the "Class" field ')
		},
		"extra attack" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"I can attack twice, instead of once, whenever I take the Attack action on my turn",
				"If I use my action to cast a spell, I can make one weapon attack as a bonus action"
			]),
			action : [["bonus action", "Attack (after casting)"]]
		},
		"spellsight" : {
			name : "Spellsight",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("As an action, I sense magic as per detect magic for 10 min (concentration); I can end it early to identify an object I touch; 1/SR, then a spell slot"),
			usages : 1,
			recovery : "short rest",
			action : [["action", ""]]
		},
		"ethereal step" : {
			name : "Ethereal Step",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("Once per turn, after I cast a spell or Spellstrike, I can teleport 10 ft (cantrip) + 10 ft per slot level to a space I can see")
		},
		"spellsunder" : {
			name : "Spellsunder",
			source : [["GMB:LL", 0]],
			minlevel : 9,
			description : levels.map(function (n) {
				return LLdesc([
					"As a reaction when I see a spell cast that will affect me" + (n < 14 ? "" : " (or a creature within 30 ft, teleporting within 5 ft of it first)") + ", I expend a slot and strike the spell",
					"If its level \u2264 my slot's, it fails; otherwise, an Armory weapon attack roll above 12 + 2 \xD7 its level makes it fail"
				]);
			}),
			action : [["reaction", ""]]
		},
		"mystical ward" : {
			name : "Mystical Ward",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I'm immune to the effects of Magus spells I cast, unless I want to be affected")
		},
		"arcane conservation" : {
			name : "Arcane Conservation",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : levels.map(function (n) {
				return LLdesc("When I miss with a Spellstrike, I can regain a slot " + (n < 18 ? "at least one level lower than" : "of the same level as") + " the one spent, but then I can't use Ethereal Step for it");
			})
		},
		"prismatic strikes" : {
			name : "Prismatic Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("I can Spellstrike a cantrip with every melee Armory weapon attack; when I do, it deals +1d8 damage of the cantrip's type")
		},
		"superior spellsunder" : {
			name : "Superior Spellsunder",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("When a creature within 30 ft is targeted by a spell I see cast, I can teleport within 5 ft of it as part of my Spellsunder reaction")
		}
	}
};
LLAddFightingStyles(ClassList["magus(laserllama)"].features["fighting style"], ["archery", "balanced", "classical", "defensive", "dual_wielding", "hurler", "protection", "versatile"]);

// ======================= ESOTERIC ORDERS =======================

AddSubClass("magus(laserllama)", "arcanists", {
	regExpSearch : /^(?=.*arcanist)(?=.*magus).*$/i,
	subname : "Order of Arcanists",
	fullname : "Order of Arcanists",
	source : [["GMB:LL", 0]],
	spellcastingKnown : {
		cantrips : [0, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : "book",
		prepared : true
	},
	spellcastingList : {
		"class" : ["magus(laserllama)", "wizard", "wizard(laserllama)"],
		level : [0, 5]
	},
	features : {
		"subclassfeature3" : {
			name : "Arcane Spellbook",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"My spellbook holds my Magus spells known + three 1st-level Magus/Wizard spells; it replaces my spells known",
				"I prepare Int mod + half my Magus level spells from it during a long rest (1 hour); I can cast its rituals unprepared",
				"Each Magus level, I add one Magus or Wizard spell of a level I have slots for"
			])
		},
		"subclassfeature3.1" : {
			name : "Arcane Library",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"On Int checks to recall knowledge from a book, tome, or scroll in my Armory, I treat a d20 roll below my Magus level as my Magus level",
				"I can destroy a Magus/Wizard spell scroll in my Armory to add it to my spellbook; with an Armory spellbook, one spell per ritual"
			])
		},
		"subclassfeature7" : {
			name : "Esoteric Sight",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When I use Spellsight, I gain within 30 ft: darkvision that sees in magical darkness, reading any language, or seeing invisible")
		},
		"subclassfeature15" : {
			name : "Stored Spells",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("During a long rest, a 1-hour ritual stores spellbook spells in vacant Armory slots (2 per spell level; total levels \u2264 Int mod); I can cast each once without a slot")
		},
		"subclassfeature20" : {
			name : "Grand Arcanist",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("I add one 6th and one 7th-level Wizard spell to my spellbook; I can cast each once per long rest without a slot"),
			spellcastingBonus : [
				{ name : "Grand Arcanist (6th)", "class" : "wizard", level : [6, 6], firstCol : "oncelr" },
				{ name : "Grand Arcanist (7th)", "class" : "wizard", level : [7, 7], firstCol : "oncelr" }
			]
		}
	}
});

AddSubClass("magus(laserllama)", "arcane archers", {
	regExpSearch : /^(?=.*arcane)(?=.*archer)(?=.*magus).*$/i,
	subname : "Order of Arcane Archers",
	fullname : "Order of Arcane Archers",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOrderSpells("Arcane Archer", ["ensnaring strike", "hail of thorns", "acid arrow", "cordon of arrows", "conjure volley", "lightning arrow", "accursed touch", "arcane eye", "scrying", "swift quiver"]),
		"subclassfeature3.1" : {
			name : "Arcane Quiver",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I can add quivers with ammunition to my Armory; my required Armory weapon can be a ranged weapon",
				"I can Spellstrike with ranged Armory weapons; spells with an area then only affect my target"
			])
		},
		"subclassfeature3.2" : {
			name : "Eagle Eyed",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Perception and can use Intelligence instead of Wisdom for it"),
			skills : ["Perception"]
		},
		"subclassfeature7" : {
			name : "Enchanted Shot",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("As a reaction when I miss with a ranged Armory weapon attack, I reroll it against another target I see within 60 ft of the first"),
			action : [["reaction", ""]]
		},
		"subclassfeature15" : {
			name : "Ranged Transposition",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc([
				"As an action, I fire one ranged Armory shot at a point (I teleport within 5 ft of where it hits)",
				"or at a creature (Cha save or we swap places, if there's room); 1/SR, then a spell slot"
			]),
			usages : 1,
			recovery : "short rest",
			action : [["action", ""]]
		},
		"subclassfeature20" : {
			name : "Mystic Marksman",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc([
				"As a bonus action, for 1 min (ends if incapacitated or as a bonus action): for each ranged Armory attack, Enchanted Shot",
				"without reaction or Ethereal Step 10 ft; on hit, I can expend a slot for +2d4 force per slot level; 1/LR, then a 5th-level slot"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["bonus action", ""]]
		}
	}
});

AddSubClass("magus(laserllama)", "blades", {
	regExpSearch : /^(?=.*blade)(?=.*magus).*$/i,
	subname : "Order of Blades",
	fullname : "Order of Blades",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Art of the Dance",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Performance and can use Str or Dex for it; without armor, my AC is 10 + Dex mod + Int mod"),
			skills : ["Performance"],
			armorOptions : [{
				regExpSearch : /^(?=.*art)(?=.*dance).*$/i,
				name : "Art of the Dance",
				source : [["GMB:LL", 0]],
				ac : "10+Int",
				affectsWildShape : false,
				selectNow : true
			}]
		},
		"subclassfeature3.1" : {
			name : "Blade Dance",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var ac = n < 7 ? 1 : n < 15 ? 2 : 3;
				return LLdesc([
					"As a bonus action if not in heavy armor or with a heavy weapon, I enter a Blade Dance for 1 min (ends if incapacitated or as a bonus action)",
					"+10 ft walking speed; +" + ac + " AC; + Int mod (min +1) to Acrobatics, Athletics, and Performance checks",
					"Once per turn when I deal damage with an Armory weapon, I roll its damage dice twice (incl. Spellstrike) and use the higher",
					(n < 15 ? "" : "Evasion; + Int mod (min +1) to Spellsunder attacks; ") + (n < 20 ? "1/SR free, then a spell slot" : "Master of Blades: always active; +1 attack with the Attack action")
				]);
			}),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", ""]]
		},
		"subclassfeature3.2" : LLOrderSpells("Blade", ["compelled duel", "zephyr strike", "blur", "misty step", "elemental weapon", "haste", "fire shield", "freedom of movement", "steel wind strike", "vorpal blade"]),
		"subclassfeature7" : {
			name : "Fluid Steps",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("I gain proficiency in Dexterity saves and add my Prof Bonus to initiative; my Blade Dance AC bonus becomes +2"),
			saves : ["Dex"],
			addMod : [{ type : "skill", field : "Init", mod : "Prof", text : "I add my Proficiency Bonus to initiative rolls." }]
		},
		"subclassfeature15" : {
			name : "Deadly Dance",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("In Blade Dance: Evasion (Dex saves for half: none on success, half on fail); + Int mod (min +1) to Spellsunder attack; AC bonus +3")
		},
		"subclassfeature20" : {
			name : "Master of Blades",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("I'm always in Blade Dance unless in heavy armor or with a heavy weapon; in it, I make one extra attack with the Attack action")
		}
	}
});

AddSubClass("magus(laserllama)", "dragon knights", {
	regExpSearch : /^(?=.*dragon)(?=.*knight)(?=.*magus).*$/i,
	subname : "Order of Dragon Knights",
	fullname : "Order of Dragon Knights",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOrderSpells("Dragon Knight", ["absorb elements", "command", "dragon's breath", "warding bond", "elemental bane", "fear", "dominate creature", "freedom of movement", "awaken", "conjure dragon"]),
		"subclassfeature3.1" : {
			name : "Draconic Companion",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"My soul is bound to a Draconic Companion (Companion page) with an Essence: acid, cold, fire, lightning, or poison",
				"It acts on my turn and Dodges unless I order it (bonus action, or instead of one of my attacks); too fragile for a rider",
				"I can store it in my Armory; at 0 HP it makes death saves; if it dies, a 1-hour ritual revives it with 1 HP (+ its Hit Dice)"
			]),
			action : [["bonus action", "Command Companion"]],
			creaturesAdd : [["Draconic Companion (LL)"]],
			creatureOptions : [{
				name : "Draconic Companion (LL)",
				source : [["GMB:LL", 0]],
				size : 4,
				type : "Dragon",
				alignment : "Lawful",
				ac : "14+Prof",
				hp : 20,
				hd : [3, 8],
				hdLinked : ["magus(laserllama)"],
				minlevelLinked : ["magus(laserllama)"],
				speed : "30 ft, fly 30 ft",
				scores : [16, 12, 15, 8, 10, 14],
				damage_immunities : "its Essence type",
				senses : "Darkvision 60 ft",
				passivePerception : 10,
				languages : "Draconic, understands its Magus's languages",
				challengeRating : "1",
				proficiencyBonus : 2,
				proficiencyBonusLinked : true,
				attacksAction : 1,
				attacks : [{
					name : "Claw",
					ability : 0,
					damage : [1, 4, "slashing"],
					modifiers : ["3+Prof", "Prof"],
					range : "Melee (5 ft)",
					abilitytodamage : false,
					description : "+1d4 Essence damage; from 7th level d6s and magical; from 15th level two Claws when ordered"
				}],
				traits : [{
					name : "Hit Dice",
					description : "It has d8 Hit Dice equal to its Magus's level and benefits from short and long rests."
				}, {
					name : "Soul Bound",
					description : "It adds its Magus's Proficiency Bonus to its ability checks and saving throws."
				}, {
					name : "Greater Companion (Magus 7)",
					minlevel : 7,
					description : "It's Medium and can bear its Medium or smaller Magus as a rider (flying speed halved while ridden); its Claws are magical and use d6s."
				}, {
					name : "Elemental Breath & Mythic Companion (Magus 15)",
					minlevel : 15,
					description : "Action: 30-ft cone, Dex save, 10d6 Essence damage (half on save), Int mod times per long rest (then a 3rd+ slot). Action: change size (Small, Medium, Large; Large: no speed penalty with its Magus as rider). Two Claws per order once per turn."
				}],
				calcChanges : {
					hp : function (totalHD, HDobj, prefix) {
						if (!classes.known["magus(laserllama)"]) return;
						var lvl = classes.known["magus(laserllama)"].level;
						HDobj.alt.push(5 + 5 * lvl);
						HDobj.altStr.push(" = 5 as a base\n + 5 \xD7 " + lvl + " from five times its Magus's level (" + (5 * lvl) + ")");
					},
					setAltHp : true
				}
			}, {
				name : "Exalted Companion (LL)",
				source : [["GMB:LL", 0]],
				size : 2,
				type : "Dragon",
				alignment : "Lawful",
				ac : 20,
				hp : 125,
				hd : [20, 10],
				speed : "40 ft, climb 40 ft, fly 60 ft",
				scores : [20, 12, 18, 14, 10, 18],
				damage_immunities : "its Essence type",
				senses : "Blindsight 30 ft, Darkvision 60 ft",
				passivePerception : 10,
				languages : "Draconic, understands its Magus's languages",
				challengeRating : "10",
				proficiencyBonus : 6,
				attacksAction : 2,
				attacks : [{
					name : "Claw",
					ability : 1,
					damage : [2, 6, "slashing"],
					modifiers : [0, ""],
					range : "Melee (5 ft)",
					description : "+1d6 Essence damage; Multiattack: two Claws",
					abilitytodamage : true
				}, {
					name : "Essence Breath (recharge 5-6)",
					ability : 3,
					damage : [12, 6, "Essence"],
					range : "30-ft cone",
					dc : true,
					description : "Dex save, half damage on a success",
					abilitytodamage : false,
					tooltip : "Uses its Magus's spell save DC"
				}],
				actions : [{
					name : "Change Size",
					description : "It becomes Small, Medium, or Large until it uses this again."
				}],
				traits : [{
					name : "Hit Dice",
					description : "It has d10 Hit Dice equal to its Magus's level."
				}, {
					name : "Soul Bound",
					description : "It adds its Magus's Proficiency Bonus to its ability checks and saving throws."
				}, {
					name : "Grand Dragon Knight",
					description : "From Magus level 20, the Draconic Companion uses this stat block."
				}]
			}]
		},
		"subclassfeature3.2" : {
			name : "Wyrmsoul",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I know Draconic; my spells that deal acid, cold, fire, lightning, or poison damage can deal my Companion's Essence type instead"),
			languageProfs : ["Draconic"]
		},
		"subclassfeature7" : {
			name : "Greater Companion",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("My Companion becomes Medium and can carry me as a rider (Medium or smaller; its flying speed is halved); its Claws are magical and use d6s")
		},
		"subclassfeature15" : {
			name : "Elemental Breath & Mythic Companion",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc([
				"Action: my Companion exhales a 30-ft cone, Dex save, 10d6 Essence (half on save); after its uses, a 3rd+ level slot",
				"Action: it changes size (Small/Medium/Large; Large carries only me without halving speed); two Claws per order once per turn"
			]),
			usages : "Int mod per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "long rest"
		},
		"subclassfeature20" : {
			name : "Grand Dragon Knight",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("My Draconic Companion uses the Exalted Companion stat block (select it on the Companion page)")
		}
	}
});

AddSubClass("magus(laserllama)", "spellbreakers", {
	regExpSearch : /^(?=.*spell\s?breaker)(?=.*magus).*$/i,
	subname : "Order of Spellbreakers",
	fullname : "Order of Spellbreakers",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Baleful Mark",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I Mark a creature I see (until I Mark another, it dies, or dispel magic/remove curse): I know its direction (same plane),",
					"its spellcasting ability and highest spell level; when it casts a spell in my reach, I can make an opportunity attack (reaction)",
					"When I damage it, it has disadv. on its next concentration save" + (n < 20 ? "" : "; Master: Mark on initiative, adv. on Spellstrike/Spellsunder vs. it")
				]);
			}),
			action : [["bonus action", ""], ["reaction", "Opportunity attack vs. Mark (spell)"]]
		},
		"subclassfeature3.1" : LLOrderSpells("Spellbreaker", ["bane", "detect evil & good", "blindness/deafness", "silence", "counterspell", "magic circle", "banishment", "resilient sphere", "dispel evil & good", "planar binding"]),
		"subclassfeature7" : {
			name : "Mantle of Defense & Crippling Mark",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"I add my Int mod (min +1) to saves vs. spells and magical effects of my Mark",
				"As a reaction when my Mark makes a check or save within 30 ft, I end the Mark to give it disadv. (can't Mark it again until a long rest)"
			]),
			action : [["reaction", "Crippling Mark"]]
		},
		"subclassfeature15" : {
			name : "Reflective Spellsunder",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When my Spellsunder makes a spell fail, its caster becomes its new target (using its attack/DC; I concentrate if needed)")
		},
		"subclassfeature20" : {
			name : "Master Spellbreaker",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc([
				"When I roll initiative (not surprised), I can Mark a creature I see; I have adv. on Spellstrike and Spellsunder attacks vs. my Mark",
				"When I hit my Mark with a Spellstrike, I can end the Mark for max damage (incl. the spell); can't Mark it again until a long rest"
			])
		}
	}
});

AddSubClass("magus(laserllama)", "warders", {
	regExpSearch : /^(?=.*warder)(?=.*magus).*$/i,
	subname : "Order of Warders",
	fullname : "Order of Warders",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOrderSpells("Warder", ["compelled duel", "sanctuary", "aid", "warding bond", "beacon of hope", "life transference", "faithful hound", "death ward", "antilife shell", "circle of power"]),
		"subclassfeature3.1" : {
			name : "Warder's Bond",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var r = n < 7 ? "10 ft" : n < 15 ? "30 ft" : n < 20 ? "60 ft" : "sight";
				return LLdesc([
					"I gain proficiency with heavy armor; at the end of a long rest, I bond " + (n < 20 ? "a willing creature" : "up to five willing creatures") + " as my Ward",
					"As a reaction when my Ward (within " + r + ", seen) is attacked or must save, we switch places and I become the target"
				]);
			}),
			armorProfs : [false, false, true, false],
			action : [["reaction", ""]]
		},
		"subclassfeature7" : {
			name : "Arcane Aegis",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"With my Warder's Bond reaction, I can expend a slot to reduce the damage I take by 2d8 per slot level",
				"When I start my turn within 10 ft of my Ward, I or my Ward gain Int mod (min 1) temp HP"
			])
		},
		"subclassfeature15" : {
			name : "Bond Perfected",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I resist damage from my Warder's Bond trigger; within 10 ft of each other, my Ward and I are immune to (and suppress) charmed and frightened")
		},
		"subclassfeature20" : {
			name : "High Warder",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("I can bond up to five Wards; when the trigger is a spell, I can Spellsunder (with adv.) as part of the reaction; Arcane Aegis still applies if it fails")
		}
	}
});

// ======================================================================
// LaserLlama - Magus Expanded v4.3.2.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" and "LaserLlama - Magus v4.3.2.js" (import them first).

	-INFORMATION-
	Subject:	Expansion, "Magus Expanded"
	Effect:		This script adds 8 Fighting Styles, 3 feats, and 6 Esoteric Orders for the Magus.
				Magus Expanded v4.3.2 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
*/


if (!ClassList["magus(laserllama)"] || typeof LLOrderSpells !== "function") {
	throw new Error("Please import the 'LaserLlama - Magus v4.3.2.js' file before importing this file.");
}

// ======================= FIGHTING STYLES =======================
LLAddFightingStyles(ClassList["magus(laserllama)"].features["fighting style"], ["arcane warrior", "brawling", "featherweight", "great_weapon", "heavyweight", "mounted", "polearm", "shieldwarrior"]);

// ======================= FEATS =======================
FeatsList["alternate mage slayer (laserllama)"] = {
	name : "Alternate Mage Slayer",
	source : [["GMB:LL", 0]],
	description : "Disrupt Spell: as a reaction when a creature I see in reach casts a spell, I make an opportunity attack; on hit it makes a Con save (as for concentration) or the spell fails and is wasted. Creatures concentrating that I damage have disadv. on the concentration save. I have adv. on saves vs. spells of creatures within 5 ft of me.",
	action : [["reaction", "Disrupt Spell"]]
};
FeatsList["alternate war caster (laserllama)"] = {
	name : "Alternate War Caster",
	source : [["GMB:LL", 0]],
	prerequisite : "The ability to cast at least one spell",
	prereqeval : function (v) { return v.isSpellcaster; },
	description : "Opportune Magic: instead of an opportunity attack, I can cast a 1-action spell that targets only that creature. Resolute Focus: I make concentration saves with my spellcasting ability instead of Con. Warrior Mage: I can perform somatic components with a weapon or shield I'm proficient with."
};
FeatsList["spellsword adept (laserllama)"] = {
	name : "Spellsword Adept",
	source : [["GMB:LL", 0]],
	prerequisite : "Proficiency with a martial weapon",
	description : "I learn two damaging cantrips from my class list or the Magus list (Magus ones use Int, Wis, or Cha). Once on my turn, when I attack with a melee weapon, I can imbue a damaging cantrip I know: on hit, the weapon deals the cantrip's damage type and applies its other effects.",
	spellcastingBonus : [{
		name : "Spellsword Adept",
		"class" : "magus(laserllama)",
		level : [0, 0],
		times : 2
	}],
	spellcastingAbility : [4, 5, 6]
};

// ======================= ESOTERIC ORDERS =======================

AddSubClass("magus(laserllama)", "armorers", {
	regExpSearch : /^(?=.*armou?rer)(?=.*magus).*$/i,
	subname : "Order of Armorers",
	fullname : "Order of Armorers",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOrderSpells("Armorer", ["compelled duel", "hail of thorns", "cloud of daggers", "heat metal", "conjure volley", "haste", "fabricate", "freedom of movement", "steel wind strike", "vorpal blade"]),
		"subclassfeature3.1" : {
			name : "Awakened Armory",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I expend a slot: 1 + slot level one-handed melee Armory weapons levitate in my space for 1 min",
					"They gain thrown " + (n < 7 ? "(20/60)" : "(40/120)") + " and use Int; no Fighting Style benefits, but can Spellstrike",
					"Action: one thrown attack with each levitating weapon; bonus action: recall thrown ones" + (n < 7 ? "; disadv. on concentration saves" : ""),
					"Ends early as a bonus action or if I'm incapacitated; all weapons return to my Armory"
				]);
			}),
			action : [["bonus action", ""], ["action", "Awakened Armory attacks"], ["bonus action", "Recall weapons"]]
		},
		"subclassfeature3.2" : {
			name : "Mythic Swordsmith",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Arcana and smith's tools; I add my Int mod (min +1) to smith's tools checks and craft weapons in half the time"),
			skills : ["Arcana"],
			toolProfs : ["Smith's tools"]
		},
		"subclassfeature7" : {
			name : "Improved Focus",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Awakened Armory no longer gives disadv. on concentration saves; its thrown range becomes (40/120)")
		},
		"subclassfeature15" : {
			name : "Dancing Parry",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("As a reaction when hit during Awakened Armory, I add the number of levitating weapons to my AC against that attack"),
			action : [["reaction", ""]]
		},
		"subclassfeature20" : {
			name : "Mythic Strike",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("Once per turn when I hit with an Armory weapon, I can end its enchantment: chosen creatures within 20 ft of the target make a Dex save, 8d6 force (half on save)")
		}
	}
});

AddSubClass("magus(laserllama)", "conduits", {
	regExpSearch : /^(?=.*conduit)(?=.*magus).*$/i,
	subname : "Order of Conduits",
	fullname : "Order of Conduits",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOrderSpells("Conduit", ["expeditious retreat", "thunderous smite", "blur", "branding smite", "blinding smite", "haste", "dimension door", "staggering smite", "banishing smite", "skill empowerment"]),
		"subclassfeature3.1" : {
			name : "Arcane Conduit",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"Without armor, shield, or weapon: I gain the Brawling Fighting Style (or Featherweight if known) and can use Dex for unarmed strikes",
					"My unarmed strikes are magical, deal " + (n < 7 ? "1d6" : "1d8") + ", can Spellstrike, and serve as material components for my Conduit Spells",
					"Unarmored Defense: my AC equals 10 + Dex mod + Int mod"
				]);
			}),
			armorOptions : [{
				regExpSearch : /^(?=.*conduit)(?=.*(defen[cs]e|unarmored)).*$/i,
				name : "Unarmored Defense (Conduit)",
				source : [["GMB:LL", 0]],
				ac : "10+Int",
				affectsWildShape : false,
				selectNow : true
			}],
			weaponOptions : [{
				baseWeapon : "unarmed strike",
				regExpSearch : /^(?=.*conduit)(?=.*(strike|fist)).*$/i,
				name : "Conduit Strike",
				source : [["GMB:LL", 0]],
				damage : [1, 6, "bludgeoning"],
				description : "Magical; Str or Dex; 1d8 from 7th level; can be used for Spellstrike",
				useHighestMod : true,
				selectNow : true
			}],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (/conduit strike/i.test(v.WeaponTextName) && classes.known["magus(laserllama)"] && classes.known["magus(laserllama)"].level >= 7) fields.Damage_Die = "1d8";
					},
					""
				]
			}
		},
		"subclassfeature3.2" : {
			name : "Ascetic Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("When I roll initiative, I gain temp HP equal to my unused Armory slots; as a bonus action, a 1st+ level slot grants them again"),
			action : [["bonus action", " (spell slot)"]]
		},
		"subclassfeature7" : {
			name : "Ethereal Arts",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When I hit with an unarmed strike, I can push a creature my size or smaller 5 ft or teleport within 5 ft of it; my unarmed strikes deal 1d8")
		},
		"subclassfeature15" : {
			name : "Enchanted Physique",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("While I have Ascetic Resilience temp HP, I resist bludgeoning, piercing, and slashing and have adv. on concentration saves")
		},
		"subclassfeature20" : {
			name : "Ascended Conduit",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc([
				"As a bonus action, for 1 min: four unarmed strikes with the Attack action; flying speed = walking speed;",
				"my Magus teleports can bring a touched (or grappled) creature my size or smaller; 1/LR, then a 5th-level slot"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["bonus action", ""]]
		}
	}
});

AddSubClass("magus(laserllama)", "hexblades", {
	regExpSearch : /^(?=.*hexblade)(?=.*magus).*$/i,
	subname : "Order of Hexblades",
	fullname : "Order of Hexblades",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOrderSpells("Hexblade", ["hex", "wrathful smite", "blindness/deafness", "blur", "bestow curse", "enemies abound", "accursed touch", "phantasmal killer", "enervation", "spiritual sundering"]),
		"subclassfeature3.1" : {
			name : "Hex Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"During a long rest, a 1-hour ritual makes a melee Armory weapon my Hexblade (include \"Hexblade\" in its name):",
				"\u2022 It can use Int for attack and damage and deal necrotic damage",
				"\u2022 Life Drain: necrotic damage to hostile non-construct/undead gives me half as temp HP",
				"\u2022 Vs. creatures under my Hexblade Spells, it crits on 19-20"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && /hexblade/i.test(v.WeaponTextName)) {
							if (Number(What("Int Mod")) > Number(What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod"))) fields.Mod = 4;
							fields.Description += (fields.Description ? "; " : "") + "Can deal necrotic; crit 19-20 vs. my Hexblade Spell targets";
						}
					},
					"If I include 'Hexblade' in a weapon's name, it can use Intelligence and deal necrotic damage."
				]
			}
		},
		"subclassfeature7" : {
			name : "Accursed Armory",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"Instead of Life Drain temp HP, I can store that much life essence (10 per empty Armory slot)",
				"Sinister Spells: cast Hexblade Spells with 10 essence per slot level (no Life Drain with them)",
				"Vile Resilience: 10 essence for adv. on a save forced by a creature under my Hexblade Spells"
			])
		},
		"subclassfeature15" : {
			name : "Sinister Sentience",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : levels.map(function (n) {
				var sc = n < 20 ? 10 : 16, r = n < 20 ? 60 : 120;
				return LLdesc([
					"My Hexblade has Int, Wis, Cha " + sc + ", its own personality and alignment, hears and is telepathic within " + r + " ft",
					"While wielding it, I can concentrate on two spells (one must be a Hexblade Spell); one save for both, with disadv."
				]);
			})
		},
		"subclassfeature20" : {
			name : "Awakened Hexblade",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("My Hexblade's mental scores are 16, range 120 ft; vs. my Hexblade Spell targets, Spellstrike can be necrotic and it ignores necrotic resistance (immunity = resistance)")
		}
	}
});

AddSubClass("magus(laserllama)", "shades", {
	regExpSearch : /^(?=.*shade)(?=.*magus).*$/i,
	subname : "Order of Shades",
	fullname : "Order of Shades",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOrderSpells("Shade", ["disguise self", "sleep", "blindness/deafness", "pass without trace", "hypnotic pattern", "nondetection", "divination", "greater invisibility", "mislead", "modify memory"]),
		"subclassfeature3.1" : {
			name : "Shroud of Darkness",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As an action, I gain a Shroud for 1 hour: in dim light or darkness, as a bonus action I turn invisible for its duration",
					"The invisibility ends if I attack, touch, or force a check or save" + (n < 7 ? "" : "; in darkness, I'm invisible to darkvision") + (n < 20 ? "; 1/SR, then a spell slot" : "; at will")
				]);
			}),
			usages : 1,
			recovery : "short rest",
			action : [["action", "Shroud of Darkness"], ["bonus action", "Turn invisible (Shroud)"]]
		},
		"subclassfeature3.2" : {
			name : "Umbral Sight",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain darkvision out to 60 ft, or +30 ft if I already have it"),
			vision : [["Darkvision", "fixed 60"], ["Darkvision", "+30"]]
		},
		"subclassfeature7" : {
			name : "From the Shadows & Improved Shroud",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"Surprised creatures I hit with a Spellstrike automatically fail their save; in dim light/darkness, Ethereal Step distance is doubled",
				"While my Shroud is active in darkness, I'm invisible to creatures relying on darkvision"
			])
		},
		"subclassfeature15" : {
			name : "Cloud the Mind",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("As an action, a creature I see within 30 ft makes an Int save or can't perceive me for 1 min (ends if I attack, touch, or force a save); success: immune 24 h"),
			usages : "Int mod per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "long rest",
			action : [["action", ""]]
		},
		"subclassfeature20" : {
			name : "One with the Darkness",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("My Shroud is at will; at the start of my turns with it, I gain invisibility and pass without trace (no concentration); bonus action: teleport 60 ft into dim light/darkness"),
			action : [["bonus action", "Shadow teleport"]]
		}
	}
});

LLExploitTables["magus(laserllama)-spellswords"] = {
	cls : "magus(laserllama)",
	sub : "magus(laserllama)-spellswords",
	factor : 0.5,
	dice : [0, 0, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4],
	die : ["", "", "d4", "d4", "d4", "d4", "d6", "d6", "d6", "d6", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d8"],
	maxDegree : [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3]
};
AddSubClass("magus(laserllama)", "spellswords", {
	regExpSearch : /^(?=.*spellsword)(?=.*magus).*$/i,
	subname : "Order of Spellswords",
	fullname : "Order of Spellswords",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLExploitFeature({
			name : "Martial Exploits",
			minlevel : 3,
			cls : "magus(laserllama)",
			list : "fighter(laserllama)",
			tableKey : "magus(laserllama)-spellswords",
			sheet : "martial exploits",
			sheetName : "Martial Exploits",
			ability : 4,
			notesTitle : "Spellsword Martial Exploits",
			extraname : "Martial Exploit",
			extraTimes : [0, 0, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7],
			description : LLdesc([
				"I learn Martial Exploits of the Alternate Fighter (\"Choose Feature\"); I can swap one when I gain a Magus level",
				"One Exploit per check, attack, or save; not together with Spellstrike; Exploits use my Magus spell save DC"
			])
		}),
		"subclassfeature3.0" : LLExploitDiceFeature("magus(laserllama)-spellswords", 3, "Magus"),
		"subclassfeature3.1" : {
			name : "Swift Armory",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I can Access my Armory (summon and shunt objects) as part of each attack I make")
		},
		"subclassfeature7" : {
			name : "Mystic Precision",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When I hit a creature with a weapon attack and Spellstrike it the same turn, I add the slot level to the Spellstrike attack (+0 for cantrips)")
		},
		"subclassfeature15" : {
			name : "Ethereal Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Whenever I Access my Arcane Armory, I can use Ethereal Step to teleport up to 10 ft")
		},
		"subclassfeature20" : {
			name : "Arcane Blademaster",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("Once on each of my turns, I can use an Exploit without an Exploit Die or Spellstrike a 1st-level Magus spell without a slot")
		}
	}
});

AddSubClass("magus(laserllama)", "travelers", {
	regExpSearch : /^(?=.*travell?er)(?=.*magus).*$/i,
	subname : "Order of Travelers",
	fullname : "Order of Travelers",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOrderSpells("Traveler", ["expeditious retreat", "featherfall", "blur", "hold person", "haste", "slow", "banishment", "dimension door", "hold monster", "modify memory"]),
		"subclassfeature3.1" : {
			name : "Temporal Shift",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc("As a reaction when I" + (n < 7 ? "" : " or a creature I see within 30 ft") + " miss an attack or fail a check or save, I reroll the d20 (must use it); out of uses: a spell slot");
			}),
			usages : "Int mod per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature3.2" : {
			name : "Visions of the Past",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in History or Investigation; at the location of the subject, I'm proficient in both (expertise if already)"),
			skillstxt : "Choose one from History or Investigation"
		},
		"subclassfeature7" : {
			name : "Adrift in Time & Greater Shift",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("My age can't be changed by magic and I age 1 year per 10; Temporal Shift also works for creatures I see within 30 ft")
		},
		"subclassfeature15" : {
			name : "Conjure Self",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc([
				"As an action, I expend a 3rd+ level slot to summon my Future Self for 1 hour (or until 0 HP); only one at a time",
				"Same statistics, shares my slots, acts independently on my initiative; I can ask it one question (as commune)"
			]),
			action : [["action", " (3rd+ slot)"]]
		},
		"subclassfeature20" : {
			name : "Untethered Traveler",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("Once per long rest, I cast time stop without a slot (my Future Self in range can act too); then a 5th-level slot"),
			spellcastingBonus : [{ name : "Untethered Traveler", spells : LLSpellList(["time stop"]), selection : LLSpellList(["time stop"]), firstCol : "oncelr" }]
		}
	}
});

// ======================================================================
// LaserLlama - Psion v2.4.1.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first; it contains the Mystic Talents and psionic spells).

	-INFORMATION-
	Subject:	Class, "Psion"
	Effect:		This script adds the Psion class (Psi Points instead of spell slots) and its 6 Psionic Awakenings.
				Psion v2.4.1 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Psion" in the Class field (e.g. "Wilder Psion")
	Note:		The Psion has no spell slots: it manifests spells with the "Psi Points" limited feature.
				The spell selection dialog only offers Psion spells up to the Mental Limit.
*/


if (typeof LLMysticTalentsFeature !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

// The UA Mystic shouldn't catch "Psion"
if (ClassList["mystic"]) ClassList["mystic"].regExpSearch = /^(?=.*mystic)(?!.*psion).*$/i;
LLPsiLvl = function () { return classes.known["psion(laserllama)"] ? classes.known["psion(laserllama)"].level : 0; };
LLPsiPoints = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 16, 17];
LLPsiLimit = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];

var LLPsionSpells = [
	"blade ward", "friends", "guidance", "light", "mage hand", "magic stone", "message", "mind sliver", "mind thrust", "minor illusion", "mystic hammer", "psionic strike", "spare the dying", "sword burst", "thaumaturgy", "toll the dead", "true strike",
	"catapult", "cause fear", "charm person", "command", "comprehend languages", "detect magic", "disguise self", "dissonant whispers", "ethereal anchor", "faerie fire", "hideous laughter", "id insinuation", "identify", "jump", "magic missile", "shield", "sleep",
	"blindness/deafness", "blur", "calm emotions", "crown of madness", "detect thoughts", "enlarge/reduce", "hold person", "invisibility", "levitate", "locate creature", "mind spike", "mind whip", "mirror image", "misty step", "mystic spear", "phantasmal force", "see invisibility", "suggestion",
	"blink", "cerebral blast", "clairvoyance", "enemies abound", "fear", "feign death", "fly", "haste", "hypnotic pattern", "intellect fortress", "life transference", "major image", "nondetection", "sending", "slow", "spectral passage", "tongues", "water walk",
	"arcane eye", "charm monster", "compulsion", "confusion", "dominate creature", "dimension door", "ego scourge", "freedom of movement", "greater invisibility", "phantasmal killer", "resilient sphere",
	"arcane hand", "dream", "far step", "geas", "hold monster", "modify memory", "psychic crush", "scrying", "skill empowerment", "synaptic static", "telekinesis", "telepathic bond", "wall of force",
	"arcane gate", "astral blade", "astral projection", "eyebite", "globe of invulnerability", "mass suggestion", "mental prison", "psionic oppression", "scatter", "true seeing",
	"etherealness", "forcecage", "plane shift", "project image", "reverse gravity", "sequester", "teleport", "time stop",
	"antimagic field", "antipathy", "feeblemind", "maddening darkness", "mind blank", "telepathy",
	"foresight", "invulnerability", "psychic scream", "weird"
];
LLAddSpellsToClass("psion(laserllama)", LLPsionSpells);

LLAwakeningSpells = function (sName, aSpells) {
	return {
		name : sName + " Spells",
		source : [["GMB:LL", 0]],
		minlevel : 1,
		description : LLdesc("I learn my Awakening spells at the levels shown; they don't count against my spells known and can't be replaced"),
		spellcastingExtra : LLSpellList(aSpells),
		spellcastingExtraApplyNonconform : true
	};
};

ClassList["psion(laserllama)"] = {
	name : "Psion",
	regExpSearch : /^(?=.*psion)(?!.*(sorcer|fighter|monk|rogue|warlord)).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Intelligence",
	prereqs : "Intelligence 13",
	die : 6,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Int", "Wis"],
	abilitySave : 4,
	// No spell slots
	spellcastingFactor : "mindll1",
	spellcastingTable : [[0, 0, 0, 0, 0, 0, 0, 0, 0]].concat(levels.map(function (n) { return [0, 0, 0, 0, 0, 0, 0, 0, 0]; })),
	spellcastingKnown : {
		cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]
	},
	spellcastingList : {
		"class" : "psion(laserllama)",
		level : [0, 5]
	},
	skillstxt : {
		primary : "Choose two from Arcana, History, Insight, Investigation, Medicine, Nature, Perception, and Religion"
	},
	armorProfs : {
		primary : [true, false, false, false],
		secondary : [true, false, false, false]
	},
	weaponProfs : {
		primary : [true, false]
	},
	equipment : "Psion starting equipment:" +
		"\n \u2022 Leather armor and a quarterstaff;" +
		"\n \u2022 A light crossbow and 20 bolts -or- a sling;" +
		"\n \u2022 Two daggers -or- any simple weapon;" +
		"\n \u2022 A scholar's pack -or- an explorer's pack." +
		"\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Psionic Awakening", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	features : {
		"subclassfeature1" : {
			name : "Psionic Awakening",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc('Choose how my psionic power awakened and put it in the "Class" field ')
		},
		"psionics" : {
			name : "Psionics",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"I manifest Psion spells I know by spending Psi Points equal to the level I manifest them at (cantrips: 0)",
					"I can't spend more Psi Points at once than my Mental Limit; I regain all Psi Points on a short or long rest",
					"Intelligence is my spellcasting ability; my mind is my focus (free hand for S/M); manifesting is noticeable",
					"Psionics count as spellcasting; I can't use them in medium or heavy armor or with a shield" + (n < 10 ? "" : "; Consumptive Power: 2 HP (current and max) per Psi Point")
				]);
			}),
			additional : levels.map(function (n, idx) { return "Mental Limit: " + ["1st", "2nd", "3rd", "4th", "5th"][LLPsiLimit[idx] - 1] + " level"; }),
			limfeaname : "Psi Points",
			usages : LLPsiPoints,
			recovery : "short rest",
			calcChanges : {
				spellList : [
					function (spList, spName, spType) {
						// Mental Limit: max level of the Psion spells I can learn (Interior Gate spells are bonus spells)
						if (spName !== "psion(laserllama)" || spType.indexOf("bonus") !== -1 || !classes.known["psion(laserllama)"]) return;
						var nMax = LLPsiLimit[Math.min(20, classes.known["psion(laserllama)"].level) - 1];
						var aLvl = spList.level ? spList.level : [0, 9];
						spList.level = [aLvl[0], Math.min(aLvl[1], nMax)];
					},
					"I can only learn Psion spells up to my Mental Limit (Interior Gate spells excluded)."
				]
			}
		},
		"mystic talents" : LLMysticTalentsFeature({
			name : "Mystic Talents",
			minlevel : 2,
			cls : "psion(laserllama)",
			feature : "mystic talents",
			extraTimes : [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10],
			description : LLdesc([
				"I unlock Mystic Talents (\"Choose Feature\" button); I can replace one per level (not a prerequisite of another)",
				"Spells from Talents don't count against my spells known (if already known, I learn another Psion spell of that level)"
			])
		}),
		"psionic recovery" : {
			name : "Psionic Recovery",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("As a bonus action, I regain Psi Points equal to my Int mod (min 1)"),
			usages : levels.map(function (n) { return n < 2 ? "" : n < 11 ? 1 : 2; }),
			recovery : "long rest",
			action : [["bonus action", ""]]
		},
		"consumptive power" : {
			name : "Consumptive Power",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Instead of Psi Points, I can spend 2 current and max HP per Psi Point (can't be reduced; restored after a long rest)")
		},
		"interior gate" : {
			name : "Interior Gate",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("I learn a 6th (11th), 7th (13th), 8th (15th), and 9th-level (17th) Psion spell; each once per long rest at its lowest level without Psi Points; I can swap one per level"),
			spellcastingBonus : [
				{ name : "Interior Gate (6th)", "class" : "psion(laserllama)", level : [6, 6], firstCol : "oncelr" },
				{ name : "Interior Gate (7th)", "class" : "psion(laserllama)", level : [7, 7], firstCol : "oncelr", times : levels.map(function (n) { return n < 13 ? 0 : 1; }) },
				{ name : "Interior Gate (8th)", "class" : "psion(laserllama)", level : [8, 8], firstCol : "oncelr", times : levels.map(function (n) { return n < 15 ? 0 : 1; }) },
				{ name : "Interior Gate (9th)", "class" : "psion(laserllama)", level : [9, 9], firstCol : "oncelr", times : levels.map(function (n) { return n < 17 ? 0 : 1; }) }
			]
		},
		"limitless" : {
			name : "Limitless",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc([
				"I stop aging; I'm immune to disease, poisoned, poison damage, and psychic damage from creatures with lower Int",
				"While not incapacitated, I regain one Psi Point at the start of each of my turns"
			]),
			savetxt : { immune : ["disease", "poisoned", "poison", "psychic (lower Int)"] }
		}
	}
};

// ======================= PSIONIC AWAKENINGS =======================

AddSubClass("psion(laserllama)", "empath", {
	regExpSearch : /^(?=.*empath)(?=.*psion).*$/i,
	subname : "Empath",
	fullname : "Empath",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLAwakeningSpells("Empath", ["charm person", "calm emotions", "fear", "dominate creature", "modify memory"]),
		"subclassfeature1.1" : {
			name : "Aura Sight",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I gain proficiency in Insight and can use Int instead of Wis for it",
				"As an action, I learn the strongest surface emotion of a creature I see within 60 ft; when out of uses, 1 Psi Point"
			]),
			skills : ["Insight"],
			usages : "Int mod per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "long rest",
			action : [["action", ""]]
		},
		"subclassfeature3" : {
			name : "Emotional Flood",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var d = n < 5 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4;
				return LLdesc([
					"As an action, a creature I see within 30 ft makes a Cha save; on a failure, I inflict an emotion:",
					"\u2022 Despair: " + d + "d6 psychic, half speed and no reactions until my next turn",
					"\u2022 Disgust: " + d + "d8 psychic, can't move closer to a creature I choose until my next turn",
					"\u2022 Fury: it uses its reaction to make a melee attack vs. a target in range, or takes " + d + "d10 psychic"
				]);
			}),
			action : [["action", ""]]
		},
		"subclassfeature6" : {
			name : "Mantle of Calm",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc("Chosen creatures within " + (n < 14 ? 10 : n < 18 ? 20 : 30) + " ft of me are proficient in Int, Wis, and Cha saves; Aura Sight on them is free");
			})
		},
		"subclassfeature14" : {
			name : "Empathic Control",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("When I charm or frighten creatures, 1 more Psi Point makes one of them incapacitated with speed 0 for the duration; I'm immune to charmed and frightened"),
			savetxt : { immune : ["charmed", "frightened"] }
		},
		"subclassfeature18" : {
			name : "Ascended Empath",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Creatures I charm defend me regardless of loyalties; creatures I frighten are stunned while within 30 ft and seeing me")
		}
	}
});

AddSubClass("psion(laserllama)", "enlightened", {
	regExpSearch : /^(?=.*enlighten)(?=.*psion).*$/i,
	subname : "Enlightened",
	fullname : "Enlightened",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : (function () {
			var oFea = {
				name : "Enlightened Potential",
				source : [["GMB:LL", 0]],
				minlevel : 1,
				description : LLdesc("I unlock the Telekinesis I or Telepathy I Mystic Talent (\"Choose Feature\"); it doesn't count against my Talents and can't be replaced"),
				choices : ["Telekinesis I", "Telepathy I"]
			};
			var a = ["telekinesis i", "telepathy i"];
			for (var i = 0; i < a.length; i++) {
				var oT = MysticTalentsLL[a[i]];
				var o = {};
				for (var p in oT) if (p !== "talentLevel" && p !== "requires") o[p] = oT[p];
				o.name = "Enlightened Potential: " + oT.name;
				oFea[a[i]] = o;
			}
			return oFea;
		})(),
		"subclassfeature1.1" : LLAwakeningSpells("Enlightened", ["catapult", "levitate", "spectral passage", "resilient sphere", "wall of force"]),
		"subclassfeature3" : {
			name : "Mystical Precision",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("When I manifest a Psion spell, 1 extra Psi Point removes its somatic and verbal components and any outward signs")
		},
		"subclassfeature6" : {
			name : "Focused Psionics",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I deal damage with a Psion spell or Mystic Talent, I add my Int mod to one damage roll (if not already)"),
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (v.isSpell && v.thisWeapon[4] && v.thisWeapon[4].indexOf("psion(laserllama)") !== -1 && /\d/.test(fields.Damage_Die)) {
							output.extraDmg += Number(What("Int Mod"));
						}
					},
					"My Psion spells add my Intelligence modifier to one damage roll."
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (spellObj.psionic || spName.indexOf("psion(laserllama)") === -1 || !What("Int Mod") || Number(What("Int Mod")) <= 0) return;
						return genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Int");
					},
					"My Psion spells add my Intelligence modifier to one damage roll."
				]
			}
		},
		"subclassfeature14" : {
			name : "Telekinetic Flight",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("I gain a flying speed equal to my walking speed and can hover"),
			speed : { fly : { spd : "walk", enc : "walk" } }
		},
		"subclassfeature18" : {
			name : "Ascended Form",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"As a bonus action, for 1 min (ends if incapacitated or as a bonus action): I'm translucent, shed 5 ft bright + 5 ft dim light,",
				"resist all damage, fly 60 ft (or more), and have spectral passage without concentration; 1/LR, then 5 Psi Points"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["bonus action", ""]]
		}
	}
});

AddSubClass("psion(laserllama)", "immortal", {
	regExpSearch : /^(?=.*immortal)(?=.*psion).*$/i,
	subname : "Immortal",
	fullname : "Immortal",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLAwakeningSpells("Immortal", ["jump", "blur", "haste", "death ward", "mislead"]),
		"subclassfeature1.1" : {
			name : "Esoteric Skill",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I gain proficiency in Acrobatics, Athletics, Perception, Sleight of Hand, or Stealth (1 hour of meditation to swap)",
				"On checks with these skills, I can spend 1 Psi Point to add my Int mod (min +1)"
			]),
			skillstxt : "Choose one from Acrobatics, Athletics, Perception, Sleight of Hand, or Stealth"
		},
		"subclassfeature1.2" : {
			name : "Immortal Training",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"My hit point maximum increases by my Psion level",
				"As a bonus action, 1 Psi Point: a weapon I touch (until a rest) is proficient, deals psychic damage, and can use Int",
				"Include \"Immortal\" in the weapon's name to apply this on the attack line"
			]),
			action : [["bonus action", " (1 PP)"]],
			calcChanges : {
				hp : function (totalHD) {
					if (classes.known["psion(laserllama)"]) return [classes.known["psion(laserllama)"].level, "Immortal Training (Psion level)"];
				},
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && /immortal/i.test(v.WeaponTextName)) {
							if (Number(What("Int Mod")) > Number(What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod"))) fields.Mod = 4;
							fields.Proficiency = true;
							fields.Damage_Type = "psychic";
						}
					},
					"If I include 'Immortal' in a weapon's name, it uses Intelligence if higher, I'm proficient, and it deals psychic damage."
				]
			}
		},
		"subclassfeature3" : {
			name : "Immortal Will",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("When I start my turn at 0 HP (not dead), I can spend Psi Points to stand up with 1 HP: 1 PP, +1 PP each further use before a long rest")
		},
		"subclassfeature6" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I attack twice with the Attack action if both use an Immortal Training weapon or unarmed strike; after manifesting a spell with my action, one such attack as a bonus action"),
			attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			action : [["bonus action", "Attack (after a Psion spell)"]]
		},
		"subclassfeature14" : {
			name : "Phase Defense",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As a reaction when hit by an attack, it misses and I move up to half my speed without provoking; when out of uses, 1 Psi Point"),
			usages : "Int mod per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "short rest",
			action : [["reaction", ""]]
		},
		"subclassfeature18" : {
			name : "Eternal Will",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("If I start my turn below half HP (but at least 1), I regain HP equal to my Int mod")
		}
	}
});

AddSubClass("psion(laserllama)", "outsider", {
	regExpSearch : /^(?=.*outsider)(?=.*psion).*$/i,
	subname : "Outsider",
	fullname : "Outsider",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : {
			name : "Aberrant Form",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"At 0 Psi Points I mutate into my Aberrant Form until I regain one; bonus action: spend all (or, from 3rd, any) PP to mutate",
					"AC 10 + Prof + Int; speed 30 ft, climb 30 ft, swim 30 ft; I speak only Deep Speech (still understand my languages)",
					"Aberrant Vigor: 10 temp HP per PP spent to transform; Alien Grip: climb sheer surfaces and ceilings without checks",
					"Tentacle (melee spell attack, 10 ft): 1d8 + Int psychic, no reactions until my next turn" + (n < 6 ? "" : "; " + (n < 11 ? 2 : n < 17 ? 3 : 4) + " Tentacles with the Attack action")
				]);
			}),
			action : [["bonus action", "Aberrant Form"]],
			armorOptions : [{
				regExpSearch : /^(?=.*aberrant)(?=.*form).*$/i,
				name : "Aberrant Form",
				source : [["GMB:LL", 0]],
				ac : "10+Prof+Int",
				dex : -10,
				selectNow : false
			}],
			weaponOptions : [{
				regExpSearch : /^(?=.*aberrant)(?=.*tentacle).*$/i,
				name : "Aberrant Tentacle",
				source : [["GMB:LL", 0]],
				ability : 4,
				type : "Natural",
				damage : [1, 8, "psychic"],
				range : "Melee (10 ft)",
				description : "Melee spell attack; only in Aberrant Form; target can't take reactions until my next turn",
				abilitytodamage : true,
				isAlwaysProf : true,
				selectNow : true
			}]
		},
		"subclassfeature1.1" : LLAwakeningSpells("Outsider", ["arms of hadar", "mind whip", "hunger of hadar", "conjure aberration", "contact other plane"]),
		"subclassfeature3" : {
			name : "Psionic Control",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"As a bonus action, I can spend Psi Points to transform, and revert as a bonus action while I have at least 1 PP",
				"When I hit with a Tentacle, 1 PP: Int save or incapacitated until the start of my next turn"
			])
		},
		"subclassfeature6" : {
			name : "Otherworldly Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("In Aberrant Form, I make two Tentacle attacks with the Attack action (3 at 11th, 4 at 17th); after manifesting a spell, one as a bonus action"),
			action : [["bonus action", "Tentacle (after a Psion spell)"]]
		},
		"subclassfeature14" : {
			name : "Eldritch Rift",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Immediately after I spend Psi Points, I can teleport up to 30 ft to an unoccupied space I can see")
		},
		"subclassfeature18" : {
			name : "Beyond the Veil",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("As an action, a creature I see within 60 ft makes a Cha save (aberrations succeed): it vanishes until my next turn, then takes 10d12 psychic; 1/SR, then 5 PP"),
			usages : 1,
			recovery : "short rest",
			action : [["action", ""]]
		}
	}
});

AddSubClass("psion(laserllama)", "visionary", {
	regExpSearch : /^(?=.*visionary)(?=.*psion).*$/i,
	subname : "Visionary",
	fullname : "Visionary",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : {
			name : "Psionic Projection",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				var r = n < 14 ? 0 : 1;
				return LLdesc([
					"As an action, I create a solid force copy of a nonmagical object I've seen, in my hand or within 10 ft (AC = Int score)",
					"Tiny: free, HP " + n + "; Small: " + Math.max(0, 1 - r) + " PP, HP " + (10 + n) + "; Medium: " + (2 - r) + " PP, HP " + (20 + n) + "; Large: " + (3 - r) + " PP, HP " + (30 + n) + "; Huge: " + (5 - r) + " PP, HP " + (50 + n),
					"It lasts until destroyed, dismissed (action), or I make another" + (n < 14 ? "" : " (up to three at a time; +1 PP: resist nonmagical B/P/S)")
				]);
			}),
			action : [["action", ""]]
		},
		"subclassfeature1.1" : LLAwakeningSpells("Visionary", ["silent image", "shadow blade", "major image", "hallucinatory terrain", "creation"]),
		"subclassfeature3" : {
			name : "Deadly Projections",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("When I create a Projection, I can launch it at a target within 60 ft: Dex save or 2d8 force +2d8 per PP spent on it (half on a success if PP spent); it's destroyed")
		},
		"subclassfeature6" : {
			name : "Projected Defense",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As a reaction when targeted by an attack I see, I create a Projection between us that becomes the target; excess damage hits me"),
			action : [["reaction", ""]]
		},
		"subclassfeature14" : {
			name : "Greater Vision",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Projections cost 1 PP less (min 0); +1 PP gives one resistance to nonmagical B/P/S; I can have three Projections at a time")
		},
		"subclassfeature18" : {
			name : "Visionary Journey",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"I learn astral projection; once per long rest, I cast it as an action on myself only, without PP or components (then 5 PP)",
				"My Astral Form appears within 5 ft of my body and shares its Psi Points; my body can't rest meanwhile"
			]),
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : [{ name : "Visionary Journey", spells : LLSpellList(["astral projection"]), selection : LLSpellList(["astral projection"]), firstCol : "oncelr" }]
		}
	}
});

AddSubClass("psion(laserllama)", "wilder", {
	regExpSearch : /^(?=.*wilder)(?=.*psion).*$/i,
	subname : "Wilder",
	fullname : "Wilder",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : {
			name : "Inscrutable Psyche",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"A creature that reads my mind, contacts me telepathically, or forces an Int, Wis, or Cha save on me takes Int mod (min 1) psychic",
				"I can spend Psi Points to add 2d8 psychic per PP to that damage"
			])
		},
		"subclassfeature1.1" : {
			name : "Wild Psionics",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"After I spend Psi Points, I roll a d6; if it equals the PP spent, a Psionic Surge occurs (d100, see Notes)",
					"Spells from a Surge target or center on me and persist without concentration" + (n < 14 ? "" : "; I roll twice and choose")
				]);
			}),
			toNotesPage : [{
				name : "Psionic Surge Table (Wilder)",
				note : [
					"01-02 Roll on this table at the start of each of your turns for 1 minute, ignoring this result on subsequent rolls.",
					"03-05 You manifest magic missile at 5th level, targeting random creatures in range.",
					"06-08 You are the target of a levitate spell.",
					"09-11 You teleport to a random unoccupied space you can see within 60 feet.",
					"12-14 You can speak only in Deep Speech for the next 10 minutes.",
					"15-17 You gain 1d20 temporary hit points.",
					"18-20 You leave footprints that glow with an otherworldly light for the next hour.",
					"21-23 You gain the benefits of the jump spell.",
					"24-26 You manifest disguise self, taking on the appearance of the nearest humanoid.",
					"27-29 You float 1d10 inches off the ground for the next hour.",
					"30-32 Your skin is translucent for 1 minute.",
					"33-35 You are the target of a confusion spell.",
					"36-38 You lose all distinctive features and appear as an average member of your race.",
					"39-41 You emit bright light out to a 10-foot radius for 1 minute.",
					"42-44 You briefly see a fond childhood memory of a random creature within 60 feet.",
					"45-47 You know every spell on the Psion spell list for the next minute.",
					"48-50 You gain resistance to all damage for 1 minute.",
					"51-53 Up to three creatures of your choice you can see within 30 feet take 4d10 psychic damage.",
					"54-56 You regain all expended Hit Dice.",
					"57-59 Your Strength score becomes 4 for 1 minute.",
					"60-62 You are the target of a sleep spell at a level equal to the Psi Points that triggered this Surge.",
					"63-65 For 1 minute, you can see into the Ethereal Plane out to 30 feet.",
					"66-68 You are the target of a grease spell.",
					"69-71 You are frightened by the nearest creature until the end of your next turn.",
					"72-74 You are the target of a hypnotic pattern spell.",
					"75-77 You regain expended Psi Points equal to your Intelligence modifier.",
					"78-80 For 1 minute, you regain 1 Psi Point at the start of each of your turns.",
					"81-83 You can immediately take one extra action.",
					"84-86 You are the target of a blur spell.",
					"87-89 A fly spell manifests on a random creature within 60 feet of you.",
					"90-92 The first spell you manifest in the next minute deals maximum possible damage.",
					"93-95 For 1 minute, you can teleport up to 20 feet as a bonus action.",
					"96-98 You are the target of an invisibility spell.",
					"99-00 You regain all expended Psi Points."
				].join("\n")
			}]
		},
		"subclassfeature1.2" : LLAwakeningSpells("Wilder", ["hideous laughter", "crown of madness", "cerebral blast", "confusion", "synaptic static"]),
		"subclassfeature3" : {
			name : "Psionic Eruption",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc("As a reaction when hit or when I fail a save, I spend PP: " + (n < 14 ? "creatures" : "chosen creatures") + " within " + (n < 14 ? 10 : n < 18 ? 20 : 30) + " ft make an Int save, 2d8 psychic per PP (half on save)");
			}),
			action : [["reaction", " (PP)"]]
		},
		"subclassfeature6" : {
			name : "Psychic Storm",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I manifest a Psion spell that deals damage, I add 1d8 to one damage roll"),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.isSpell && v.thisWeapon[4] && v.thisWeapon[4].indexOf("psion(laserllama)") !== -1 && /\d/.test(fields.Damage_Die)) {
							fields.Description += (fields.Description ? "; " : "") + "+1d8 dmg (Psychic Storm)";
						}
					},
					"My Psion spells that deal damage add 1d8 to one damage roll."
				]
			}
		},
		"subclassfeature14" : {
			name : "Mental Torrent & Controlled Surge",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : levels.map(function (n) {
				return LLdesc([
					"Creatures within " + (n < 18 ? 20 : 30) + " ft have disadv. on their initial Int, Wis, or Cha save against me",
					"I roll twice on the Psionic Surge table and choose; I choose who must save vs. Psionic Eruption"
				]);
			})
		},
		"subclassfeature18" : {
			name : "Unleashed Wilder",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("When a Psion spell's damage die rolls its maximum, I roll it again and add it, repeating while it rolls the max")
		}
	}
});

// ======================================================================
// LaserLlama - Savant v5.6.1.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Savant"
	Effect:		This script adds the Savant class, its Scholarly Pursuits, and its 6 Academic Disciplines.
				Savant v5.6.1 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Savant" in the Class field (e.g. "Physician Savant")
*/


if (typeof LLAddFightingStyles !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

LLSavLvl = function () { return classes.known["savant(laserllama)"] ? classes.known["savant(laserllama)"].level : 0; };
LLIntDie = function (n) { return n < 5 ? "d4" : n < 9 ? "d6" : n < 13 ? "d8" : n < 17 ? "d10" : "d12"; };
LLSavPursuitPrereq = function (nLvl) {
	return function (v) { return !classes.known["savant(laserllama)"] || LLSavLvl() >= nLvl; };
};

// Scholarly Pursuits: [name, min level, description, extra attributes]; LLScholarlyPursuits is extended by the Savant Expanded file
LLScholarlyPursuits = [
	["Instruction", 0, "In 1 hour (can be a rest), I teach up to Savant level creatures (Int 8+) proficiency with a skill, tool, or weapon I have, or a language I know, until their next long rest"],
	["Perfect Recall", 0, "After observing an object or creature for 1 minute, I can perfectly recall any observable information about it (a map, a page, an inscription...)"],
	["Quick Study", 0, "In 1 hour (can be a rest) with an example to learn from, I gain proficiency with a skill or tool or learn a language until I use this again; I can Search when I roll initiative"],
	["Astrology", 4, "I gain proficiency in Arcana and add my Intellect Die to it; during a long rest seeing the night sky, I roll and record a d20 to replace one d20 roll before my next long rest", { skills : ["Arcana"] }],
	["Falconry", 4, "I gain proficiency in Perception and add my Intellect Die to it; I have a trained Falcon (Hawk, Int 8) on the Companion page, acting on my turn (bonus action to command)", { skills : ["Perception"], creaturesAdd : [["Hawk"]] }],
	["Linguistics", 4, "I gain proficiency in Persuasion and add my Intellect Die to it; I learn bonus languages equal to my Int mod (min 1)", { skills : ["Persuasion"], languageProfs : [1] }],
	["Physical Fitness", 4, "I gain proficiency in Athletics or Acrobatics and add my Intellect Die to it; I gain a climb or swim speed equal to my walking speed (can be taken twice, different choices)", { skillstxt : "Choose one from Athletics or Acrobatics", allowDuplicates : true }],
	["Riddles", 4, "I gain proficiency in Deception and add my Intellect Die to it; I can hide secret messages in riddles; in 1 hour, I teach a creature (Int 8+) to understand them (Int 11+ to reply)", { skills : ["Deception"] }],
	["Secrets & Whispers", 4, "I gain proficiency in Stealth and add my Intellect Die to it; a 1-hour long rest in a settlement reveals a significant (even secret) event from the last week", { skills : ["Stealth"] }],
	["Theology", 4, "I gain proficiency in Religion, know Celestial, and add my Intellect Die to Religion; once per short rest, a 10-min ritual gives the benefits of bless, ceremony, detect evil & good, or prot. from evil & good", { skills : ["Religion"], languageProfs : ["Celestial"], usages : 1, recovery : "short rest" }],
	["Traditions", 4, "I gain proficiency in History and add my Intellect Die to it; using local customs, I can make History checks instead of Charisma checks with locals", { skills : ["History"] }]
];
LLAddPursuits = function () {
	var oFea = ClassList["savant(laserllama)"].features["scholarly pursuits"];
	for (var i = 0; i < LLScholarlyPursuits.length; i++) {
		var a = LLScholarlyPursuits[i];
		var sKey = a[0].toLowerCase();
		if (oFea[sKey]) continue;
		oFea.extrachoices.push(a[0]);
		var o = { name : a[0], source : [["GMB:LL", 0]], description : LLdesc(a[2]) };
		if (a[1]) {
			o.prereqeval = LLSavPursuitPrereq(a[1]);
			o.submenu = "[Savant level 4+]";
		}
		if (a[3]) for (var p in a[3]) o[p] = a[3][p];
		oFea[sKey] = o;
	}
};
// Discipline "Student of" feature that gives skills and a description
LLSavStudent = function (sName, sDesc, oExtra) {
	var o = {
		name : "Student of " + sName,
		source : [["GMB:LL", 0]],
		minlevel : 3,
		description : LLdesc(sDesc)
	};
	if (oExtra) for (var p in oExtra) o[p] = oExtra[p];
	return o;
};

ClassList["savant(laserllama)"] = {
	name : "Savant",
	regExpSearch : /^(?=.*savant).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Intelligence",
	prereqs : "Intelligence 13",
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Int", "Wis"],
	abilitySave : 4,
	skillstxt : {
		primary : "Choose two from Arcana, History, Investigation, Insight, Medicine, Nature, Persuasion, and Religion"
	},
	armorProfs : {
		primary : [true, false, false, false]
	},
	weaponProfs : {
		primary : [true, false, ["rapier", "shortsword", "whip"]]
	},
	toolProfs : {
		primary : [["Artisan's tools", 1]]
	},
	equipment : "Savant starting equipment:" +
		"\n \u2022 A simple weapon -or- a shortsword;" +
		"\n \u2022 A light crossbow and 20 bolts -or- two daggers;" +
		"\n \u2022 A set of artisan's tools, leather armor, and a scholar's pack." +
		"\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Academic Discipline", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	features : {
		"adroit analysis" : {
			name : "Adroit Analysis",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I can Help, Search, or make an Int check; when I Search, I can study a creature within 60 ft as my Focus",
					"I learn one Characteristic: AC, highest/lowest ability score, special senses, resistances/immunities/vulnerabilities, a trait/action",
					"It's my Focus for 1 min (ends if incapacitated or I pick another); while I have a Focus, I can't cast or concentrate on spells",
					"Predictive Dodge: my Focus has disadv. on attacks against me while I can see it",
					"Studied Strike: I can use Int for attacks vs. my Focus; once per turn, +" + LLIntDie(n) + " damage on hit (or learn another Characteristic)",
					"Intellect save DC = 8 + Prof Bonus + Int mod; if I add multiple Intellect Dice, I only apply the highest"
				]);
			}),
			additional : levels.map(function (n) { return "Intellect Die: " + LLIntDie(n); }),
			action : [["bonus action", "Help/Search/Int check"]],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && classes.known["savant(laserllama)"] && (/\bfocus\b/i.test(v.WeaponTextName) || /savant/i.test(fields.Description))) {
							if (Number(What("Int Mod")) > Number(What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod"))) fields.Mod = 4;
							fields.Description += (fields.Description ? "; " : "") + "vs. Focus: +" + LLIntDie(classes.known["savant(laserllama)"].level) + " dmg once per turn";
						}
					},
					"If I include the word 'Focus' in a weapon's name, it uses Intelligence (if higher) and shows my Studied Strike damage."
				]
			}
		},
		"analytical defense" : {
			name : "Analytical Defense",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("Without armor or a shield, my AC equals 10 + Dex mod + Int mod"),
			armorOptions : [{
				regExpSearch : /^(?=.*analytical)(?=.*defen[cs]e).*$/i,
				name : "Analytical Defense",
				source : [["GMB:LL", 0]],
				ac : "10+Int",
				affectsWildShape : false,
				selectNow : true
			}]
		},
		"potent observation" : {
			name : "Potent Observation",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"As a reaction when another creature within 30 ft that hears and understands me " + (n < 10 ? "deals damage to my Focus" : "deals damage (to my Focus: two dice)") + ",",
					"or makes a check with a tool/skill I'm proficient in" + (n < 6 ? "" : ", or makes a saving throw") + ", I add my Intellect Die to its roll"
				]);
			}),
			action : [["reaction", ""]]
		},
		"scholarly pursuits" : {
			name : "Scholarly Pursuits",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("I master Scholarly Pursuits; use the \"Choose Feature\" button above"),
			additional : levels.map(function (n) { return n < 2 ? "" : (n < 5 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4) + " Pursuits"; }),
			extraname : "Scholarly Pursuit",
			extrachoices : [],
			extraTimes : levels.map(function (n) { return n < 2 ? 0 : n < 5 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4; })
		},
		"subclassfeature3" : {
			name : "Academic Discipline",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc('Choose the Academic Discipline I study and put it in the "Class" field ')
		},
		"calculated flourish" : {
			name : "Calculated Flourish",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : levels.map(function (n) {
				return LLdesc("As a reaction when hit by an attack I see, I add my Intellect Die to my AC" + (n < 10 ? "" : "; if it misses, I move 10 ft without provoking or make a weapon attack vs. the attacker"));
			}),
			action : [["reaction", ""]]
		},
		"swift reflexes" : {
			name : "Swift Reflexes",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("I can take more than one reaction each round, but only one per trigger"),
			additional : levels.map(function (n) { return n < 5 ? "" : (n < 11 ? 2 : n < 17 ? 3 : 4) + " reactions per round"; })
		},
		"sharp mind" : {
			name : "Sharp Mind",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("While not incapacitated, I add my Intellect Die to Int, Wis, and Cha saves; Potent Observation also works on saves"),
			savetxt : { text : ["+Intellect Die to Int, Wis, and Cha saves"] }
		},
		"keen awareness" : {
			name : "Keen Awareness",
			source : [["GMB:LL", 0]],
			minlevel : 9,
			description : LLdesc("While not incapacitated, I can't be surprised and I add my Int mod to initiative rolls"),
			addMod : [{ type : "skill", field : "Init", mod : "Int", text : "I add my Intelligence modifier to initiative rolls." }]
		},
		"unrivaled genius" : {
			name : "Unrivaled Genius",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Potent Observation works on any damage (two dice vs. my Focus); after a Calculated Flourish miss, I move 10 ft freely or attack")
		},
		"unyielding will" : {
			name : "Unyielding Will",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("I gain proficiency in Cha saves; adv. on saves my Focus forces and on saves vs. charmed and frightened"),
			saves : ["Cha"],
			savetxt : { adv_vs : ["charmed", "frightened", "my Focus"] }
		},
		"flawless analysis" : {
			name : "Flawless Analysis",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc([
				"As an action, my Focus makes an Int save; fail: until my next turn, it has disadv. on checks, attacks, and saves",
				"and chosen creatures within 30 ft have adv. on saves it forces; once per creature per long rest"
			]),
			action : [["action", ""]]
		},
		"incomparable intellect" : {
			name : "Incomparable Intellect",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("My Intelligence increases by 4 (max 24); I can replace an Intellect Die roll lower than my Int mod with my Int mod"),
			scores : [0, 0, 0, 4, 0, 0],
			scoresMaximum : [0, 0, 0, 24, 0, 0]
		}
	}
};
LLAddPursuits();

// ======================= ACADEMIC DISCIPLINES =======================

AddSubClass("savant(laserllama)", "archaeologist", {
	regExpSearch : /^(?=.*archa?eolog)(?=.*savant).*$/i,
	subname : "Archaeologist",
	fullname : "Archaeologist",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLSavStudent("Archaeology", [
			"I gain proficiency in History and Investigation and add my Intellect Die to both; I learn two languages",
			"I add my Intellect Die to checks related to traps; 1 minute examining an object reveals value, origin, age (and magic as identify)"
		], { skills : ["History", "Investigation"], languageProfs : [2] }),
		"subclassfeature3.1" : {
			name : "Eye for Antiquity",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"During a long rest in a settlement or dungeon, 1 hour of study unearths a Curio: a Tiny " + (n < 7 ? "common" : n < 18 ? "common or uncommon" : "common/uncommon (one rare)") + " magic item",
					"Curios use Int and ignore Single Minded; 1 hour per long rest maintains them (restores expendables); max Int mod Curios"
				]);
			})
		},
		"subclassfeature7" : {
			name : "Adventuring Academic & Ancient Insights",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"I add my Intellect Die to saves vs. traps and have a climb speed equal to my walking speed",
				"I ignore class, race, and alignment requirements of magic items, scrolls, and potions; Curios can be uncommon"
			]),
			speed : { climb : { spd : "walk", enc : "walk" } }
		},
		"subclassfeature13" : {
			name : "Lore Master & Unearthed Arcana",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc([
				"Observing a person, place, or object for 10 min gives me information as legend lore (if any relevant lore exists)",
				"My magic items use my Intellect save DC if higher; after a rest, a Curio regains Int mod (min 1) charges or uses"
			])
		},
		"subclassfeature18" : {
			name : "Master Archaeologist",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I resist damage from spells, magic items, and magical traps; I can have one rare Curio"),
			dmgres : ["Spells", ["Magic items", "Magic items/traps"]]
		}
	}
});

AddSubClass("savant(laserllama)", "investigator", {
	regExpSearch : /^(?=.*investigator)(?=.*savant).*$/i,
	subname : "Investigator",
	fullname : "Investigator",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLSavStudent("Truth", [
			"I gain proficiency in Insight and Investigation (+Intellect Die); I use Int for Insight and Perception (also passive)",
			"Search with an action counts as a full minute of searching; I know Thieves' Cant",
			"Each minute speaking with my Focus, I learn one of its ideals, traits, bonds, or flaws"
		], { skills : ["Insight", "Investigation"], languageProfs : ["Thieves' Cant"] }),
		"subclassfeature3.1" : {
			name : "Rough & Tumble",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"My unarmed strikes deal " + LLIntDie(n) + " + Str bludgeoning; after the Attack action, an unarmed strike as a bonus action",
					"Once per turn when I hit my Focus unarmed, I can forgo Studied Strike: Dex save or blinded, deafened, or can't speak",
					"until my next turn, or knocked prone if Large or smaller" + (n < 7 ? "" : " (two effects: Discombobulate)") + (n < 13 ? "" : "; or stunned until my next turn")
				]);
			}),
			action : [["bonus action", "Unarmed strike (after Attack)"]],
			weaponOptions : [{
				baseWeapon : "unarmed strike",
				regExpSearch : /^(?=.*rough)(?=.*tumble).*$/i,
				name : "Rough & Tumble strike",
				source : [["GMB:LL", 0]],
				damage : [1, 4, "bludgeoning"],
				description : "Die = my Intellect Die; bonus action after Attack",
				selectNow : true
			}],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (/rough.*tumble/i.test(v.WeaponTextName) && classes.known["savant(laserllama)"]) {
							fields.Damage_Die = "1" + LLIntDie(classes.known["savant(laserllama)"].level);
						}
					},
					""
				]
			}
		},
		"subclassfeature7" : {
			name : "Illicit Contacts & Underhanded Brawler",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"I add my Intellect Die to checks to influence others in Thieves' Cant; I master Secrets & Whispers (or Perfect Recall/Traditions)",
				"Cunning Flourish: a Calculated Flourish miss also forces a Rough & Tumble save; Discombobulate: two effects on a failure",
				"Slippery Combatant: as a reaction when attacked, I make the attacker my Focus and impose disadv."
			]),
			action : [["reaction", "Slippery Combatant"]]
		},
		"subclassfeature13" : {
			name : "Piercing Gaze",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("I know if my Focus lies and detect visual illusions and shapeshifters in sight (but don't see through them); Rough & Tumble can stun")
		},
		"subclassfeature18" : {
			name : "Master Investigator",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I have 30 ft truesight in which I detect hidden doors, traps, and lies; once per short rest, a hit or Potent Observation vs. my Focus becomes a critical hit"),
			vision : [["Truesight", 30]],
			usages : 1,
			recovery : "short rest"
		}
	}
});

AddSubClass("savant(laserllama)", "mentor", {
	regExpSearch : /^(?=.*mentor)(?=.*savant).*$/i,
	subname : "Mentor",
	fullname : "Mentor",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLSavStudent("Life", [
			"I gain proficiency in History, Insight, and one artisan's tools (+Intellect Die); I use Int for Insight",
			"I master Instruction (or Quick Study); I can reroll Intellect Die 1s (once); I can Help an ally within 10 ft attack my Focus"
		], { skills : ["History", "Insight"], toolProfs : [["Artisan's tools", 1]] }),
		"subclassfeature3.1" : {
			name : "Astute Advice",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a reaction when a creature within 30 ft that hears and understands me fails a check, attack, or save, it rerolls the d20",
					n < 13 ? "I regain one use on a short rest and all on a long rest" : "It can add my Intellect Die or gain that many temp HP; I regain all uses on a rest and one on initiative"
				]);
			}),
			usages : "Int mod per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature7" : {
			name : "Calm Demeanor & Soothing Presence",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"If I end my turn without dealing damage or forcing a save, I gain Int mod (min 1) temp HP",
				"Creatures finishing a short rest with me have adv. on their Hit Dice rolls"
			])
		},
		"subclassfeature13" : {
			name : "Wondrous Advice & Mystical Intuition",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc([
				"Astute Advice can add my Intellect Die or grant that many temp HP; uses refresh on short rests, +1 when I roll initiative",
				"Once per long rest, 1 minute of meditation answers a question as commune (only if known to a mortal)"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature18" : {
			name : "Master Mentor",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Creatures of my choice (not me) within 15 ft that hear me add my Int mod (min +1) to checks and saves; after each rest I gain Mystical Intuition")
		}
	}
});

AddSubClass("savant(laserllama)", "naturalist", {
	regExpSearch : /^(?=.*naturalist)(?=.*savant).*$/i,
	subname : "Naturalist",
	fullname : "Naturalist",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLSavStudent("Nature", [
			"I gain proficiency in Animal Handling and Nature (+Intellect Die); I use Int for Animal Handling and Survival",
			"I can designate a creature as my Focus by studying its tracks or signs, even if I can't see it"
		], { skills : ["Animal Handling", "Nature"] }),
		"subclassfeature3.1" : {
			name : "Naturalist's Journal",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"During a rest, 1 hour details my Environment or a " + (n < 13 ? "beast, plant, or monstrosity" : n < 18 ? "beast, plant, monstrosity, dragon, giant, ooze, or undead" : "non-humanoid creature") + " that was my Focus in the last 24 hours:",
					"\u2022 Adv. on related Int checks; vs. a detailed Focus, I can trade Studied Strike damage for +Intellect Die to hit" + (n < 18 ? "" : "; adv. on attacks vs. detailed creatures"),
					"\u2022 In a detailed Environment, my group ignores " + (n < 13 ? "nonmagical" : "all") + " difficult terrain and I can't get lost" + (n < 13 ? "" : "; adv. on saves vs. environmental effects")
				]);
			})
		},
		"subclassfeature7" : {
			name : "Call of the Wild",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : levels.map(function (n) {
				return LLdesc([
					"As an action, a creature within 30 ft detailed in my Journal (CR < half my level) makes a Cha save or is charmed by me",
					"It's friendly and obeys my bonus action commands; if damaged, it repeats the save (reaction: -Intellect Die)",
					n < 18 ? "Ends if I'm unconscious, free it, or use this on another; a success makes it immune until its long rest" : "Ends only if I free it, use this on another, or one of us dies"
				]);
			}),
			action : [["action", ""], ["bonus action", "Command charmed creature"]]
		},
		"subclassfeature13" : {
			name : "Advanced Studies",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("I can detail dragons, giants, oozes, and undead; I gain Focus benefits vs. all detailed creatures; better Environment benefits")
		},
		"subclassfeature18" : {
			name : "Master Naturalist",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I can detail any non-humanoid; I have adv. on attacks vs. detailed creatures; Call of the Wild lasts until freed or death")
		}
	}
});

AddSubClass("savant(laserllama)", "physician", {
	regExpSearch : /^(?=.*physician)(?=.*savant).*$/i,
	subname : "Physician",
	fullname : "Physician",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLSavStudent("Medicine", [
			"I gain proficiency in Medicine and Sleight of Hand (+Intellect Die); I use Int for Medicine",
			"Each minute examining my Focus reveals one disease, poison, or curse; I can trade Studied Strike damage for -10 ft speed",
			"In 1 hour (can be a rest) holding a healer's kit, it regains Int mod (min 1) uses"
		], { skills : ["Medicine", "Sleight of Hand"] }),
		"subclassfeature3.1" : {
			name : "Combat Medic",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As an action on another creature" + (n < 7 ? "" : " (or me)") + "; spending a healer's kit use maximizes the Intellect Dice:",
					"\u2022 Adrenaline Jolt: it repeats a save vs. disease, blinded, charmed, deafened, frightened, or poisoned with +Intellect Die",
					"\u2022 Dress Wounds: temp HP = Intellect Die (max its missing HP)",
					"\u2022 Healing Surge: it spends a Hit Die to heal HD + Con mod + Intellect Die; at 0 HP it's stabilized" + (n < 7 ? "" : "; Field Doctor: bonus action Dash, Disengage, or attack")
				]);
			}),
			action : [["action", ""]]
		},
		"subclassfeature7" : {
			name : "Field Doctor & Steady Hands",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When I take a Combat Medic action, I can Dash, Disengage, or attack as a bonus action; I can use Combat Medic on myself (not blinded/incapacitated/paralyzed/restrained)"),
			action : [["bonus action", "Field Doctor"]]
		},
		"subclassfeature13" : {
			name : "Medical Expertise",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc([
				"I can empower Combat Medic actions: Jolt ends a condition (incl. paralyzed, petrified, stunned, exhaustion level, reductions),",
				"Dress Wounds reattaches a limb or grants temp HP = missing HP, Healing Surge revives a creature dead less than 1 minute"
			]),
			usages : "Int mod per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "short rest"
		},
		"subclassfeature18" : {
			name : "Master Physician",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("A creature I'm touching treats Hit Dice it spends as the maximum roll (incl. short rests and Healing Surge)")
		}
	}
});

AddSubClass("savant(laserllama)", "tactician", {
	regExpSearch : /^(?=.*tactician)(?=.*savant).*$/i,
	subname : "Tactician",
	fullname : "Tactician",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLSavStudent("War", [
			"I gain proficiency in History, Persuasion, and two gaming sets (+Intellect Die); medium armor, shields, non-heavy martial weapons",
			"I can use Int instead of Dex for my AC in light and medium armor; I can use Potent Observation on initiative rolls"
		], { skills : ["History", "Persuasion"], toolProfs : [["Gaming set", 2]], armorProfs : [false, true, false, true], weaponProfs : [false, false, ["martial weapons (not heavy)"]], extraAC : LLAbiForDexAC("Int", "In light or medium armor, I can use my Intelligence instead of my Dexterity for AC.", true, "Student of War") }),
		"subclassfeature3.1" : {
			name : "Tactical Command",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"When I take the Attack action, I can forgo attacks to give Orders to creatures within 30 ft that see/hear me" + (n < 18 ? "" : " (+Int mod temp HP)") + ":",
					"\u2022 Attack: +1 attack with its next Attack action; \u2022 Defensive: it gains the Dodge action until my next turn",
					"\u2022 Maneuvering: reaction to move its speed without provoking; \u2022 Support: it can Help, Hide, Search, or Use an Object",
					n < 7 ? "" : "\u2022 Enlivening: Dash + adv. on Str/Dex checks next turn; \u2022 Rejuvenating: repeat a save vs. one condition",
					n < 13 ? "" : "When I roll initiative, I can issue one Order before anyone acts; Potent Observation on attacks vs. my Focus (after the roll)",
					n < 18 ? "" : "Once per rest each: Heroic (resist all, adv. on all until my turn), Revitalizing (revive dead < 1 min with level + Int HP)"
				]);
			})
		},
		"subclassfeature7" : {
			name : "Strategic Superiority",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("I can attack twice when I take the Attack action; after Dash, Dodge, or Disengage, I can attack or issue an Order as a bonus action"),
			attacks : [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			action : [["bonus action", "Attack/Order (after Dash/Dodge/Disengage)"]]
		},
		"subclassfeature13" : {
			name : "Tactical Genius",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("When I roll initiative, I issue one Order before anyone acts; I can use Potent Observation on attacks vs. my Focus after the roll")
		},
		"subclassfeature18" : {
			name : "Master Tactician",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("My Orders grant Int mod (min 1) temp HP; Heroic and Revitalizing Orders once each per short rest"),
			usages : 2,
			recovery : "short rest"
		}
	}
});

// ======================================================================
// LaserLlama - Savant Expanded v5.6.1.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" and "LaserLlama - Savant v5.6.1.js" (import them first).

	-INFORMATION-
	Subject:	Expansion, "Savant Expanded"
	Effect:		This script adds the Personality & Quirks tables, 8 Scholarly Pursuits, 5 feats, 7 magic items, and 6 Academic Disciplines for the Savant.
				Savant Expanded v5.6.1 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
*/


if (!ClassList["savant(laserllama)"] || typeof LLAddPursuits !== "function") {
	throw new Error("Please import the 'LaserLlama - Savant v5.6.1.js' file before importing this file.");
}

// ======================= PERSONALITY & QUIRKS =======================
var LLSavQuirks = [
	["Obsession", "d4", [
		"You discovered a strange script in the margin of a book. The best scholars cannot identify it.",
		"As a child you saw a majestic golden bird fly across the sky that left a rainbow in its wake.",
		"Your father charged you to find the legendary, and most likely fictional, chalice of Bahamut.",
		"You use the word \"inconceivable\" all the time even though you aren't exactly sure what it means."
	]],
	["Eccentricity", "d6", [
		"You assume that every person you talk to cares about the minutiae of your area of expertise.",
		"You have a really bad habit of only speaking in the technical jargon of your field.",
		"You don't understand children.",
		"When someone doesn't understand something, you just haven't explained it enough times.",
		"You take diligent notes on everything even when it isn't socially appropriate.",
		"You are so dedicated to your field of study that you find yourself explaining things to your foes."
	]],
	["Good Luck Charm", "d6", [
		"You refuse to place your faith in a single deity so you carry a multitude of holy symbols.",
		"Your father was a farmer who paid for your education. You wear his hat in his memory.",
		"Despite its ineffectiveness, you carry a whip to impress and intimidate others.",
		"You carry a scroll of insane ramblings. One day you will figure out its meaning.",
		"You wear a pair of crystal spectacles even though you have perfect vision.",
		"You never leave home without a copy of your mentor's thesis on owlbear anatomy."
	]],
	["Irrational Fear", "d6", [
		"You are convinced you contracted a minor form of lycanthropy from a dog that bit you as a child.",
		"You will do literally anything to avoid interacting with fire magic.",
		"You always make sure to sleep with a silver coin in your hand to ward off night hags.",
		"You hate snakes and snake-like creatures.",
		"You are so afraid of undead that the sight of them causes you to vomit.",
		"You give out code words to your allies so they can prove they aren't doppelgangers."
	]]
];
(function () {
	var aNotes = [];
	var oFea = {
		name : "Personality & Quirks",
		source : [["GMB:LL", 0]],
		minlevel : 1,
		description : LLdesc("Optional roleplaying aid: choose (or roll) an Obsession, Eccentricity, Good Luck Charm, and Irrational Fear with \"Choose Feature\" (tables on the Notes page)"),
		extraname : "Savant Quirk",
		extrachoices : [],
		extraTimes : levels.map(function (n) { return 4; })
	};
	for (var t = 0; t < LLSavQuirks.length; t++) {
		var aT = LLSavQuirks[t];
		aNotes.push(aT[0] + " (" + aT[1] + ")");
		for (var i = 0; i < aT[2].length; i++) {
			var sName = aT[0] + " " + (i + 1) + ": " + (aT[2][i].length > 46 ? aT[2][i].substr(0, 46).replace(/\s+\S*$/, "") + "..." : aT[2][i].replace(/\.$/, ""));
			aNotes.push("   " + (i + 1) + ". " + aT[2][i]);
			oFea.extrachoices.push(sName);
			oFea[sName.toLowerCase()] = {
				name : aT[0],
				source : [["GMB:LL", 0]],
				submenu : aT[0] + " (" + aT[1] + ")",
				description : "",
				toNotesPage : [{
					name : "Savant " + aT[0],
					note : desc(aT[2][i]),
					amendTo : "Savant Personality & Quirks"
				}]
			};
		}
	}
	oFea.toNotesPage = [{
		name : "Savant Personality & Quirks",
		note : desc(["Roll or choose one entry from each table (Savant Expanded v5.6.1):"].concat(aNotes))
	}];
	ClassList["savant(laserllama)"].features["personality & quirks"] = oFea;
})();

// ======================= SCHOLARLY PURSUITS =======================
LLScholarlyPursuits = LLScholarlyPursuits.concat([
	["Bushcraft", 4, "I gain proficiency in Nature (+Intellect Die); in 10 min (can be a rest), I craft a club, 1d4 darts, a javelin, a net, 10 ft of rope, or a Bushcraft Snare (action: set; Dex save vs. my DC or restrained; Str check to escape)", { skills : ["Nature"] }],
	["Deduction", 4, "I gain proficiency in Investigation (+Intellect Die); my Focus lasts until I end it or pick another; once per long rest, a yes/no/unclear question about my Focus", { skills : ["Investigation"], usages : 1, recovery : "long rest" }],
	["Equestrianism", 4, "I gain proficiency in Animal Handling (+Intellect Die); my trained mount acts on my turn, adds my Intellect Die to its checks, damage, and saves, and attacks on my bonus action command; 8 hours + 50 gp trains a quadruped", { skills : ["Animal Handling"], action : [["bonus action", "Command mount"]] }],
	["First Aid", 4, "I gain proficiency in Medicine (+Intellect Die); during a long rest, 1 hour with a healer's kit makes Int mod (min 1) potions of healing that last 24 hours", { skills : ["Medicine"] }],
	["Marksmanship", 4, "I gain proficiency in Sleight of Hand (+Intellect Die) and all martial ranged weapons; my ranged weapon attacks can use my Intellect Die as damage die (firearms with DM's approval)", { skills : ["Sleight of Hand"], weaponProfs : [false, false, ["martial ranged weapons"]] }],
	["Mercantilism", 4, "I gain proficiency in Insight (+Intellect Die); trading with creatures with Int and Wis lower than my Int score, I buy 10% cheaper and sell 10% higher", { skills : ["Insight"] }],
	["Musicianship", 4, "I gain proficiency in Performance and one instrument (+Intellect Die); after 1 min of performing for a creature, adv. on social checks with it for 1 hour (ends if we harm it or its allies)", { skills : ["Performance"], toolProfs : [["Musical instrument", 1]] }],
	["Polymath", 4, "Choose two of my skill or tool proficiencies; I add my Intellect Die to checks with them"]
]);
LLAddPursuits();

// ======================= FEATS =======================
FeatsList["classical artist (laserllama)"] = {
	name : "Classical Artist",
	source : [["GMB:LL", 0]],
	description : "I gain proficiency with mason's tools and painter's supplies and treat d20 rolls of 9 or lower as 10 with them. I have adv. on checks to assess the value of art. Each 8-hour workday on a work of Fine Art adds 10 gp to its value. [+1 Intelligence or Dexterity]",
	scorestxt : "+1 Intelligence or Dexterity",
	toolProfs : ["Mason's tools", "Painter's supplies"]
};
FeatsList["helpful insights (laserllama)"] = {
	name : "Helpful Insights",
	source : [["GMB:LL", 0]],
	description : "I can take the Help action as a bonus action. When I Help a creature with a check using a skill or tool I'm proficient with, it treats a d20 roll of 7 or lower as 8. [+1 Intelligence or Wisdom]",
	scorestxt : "+1 Intelligence or Wisdom",
	action : [["bonus action", "Help"]]
};
FeatsList["lifelong learner (laserllama)"] = {
	name : "Lifelong Learner",
	source : [["GMB:LL", 0]],
	description : "I gain the benefits up to my current Int modifier: +1: one language; +2: one artisan's tools; +3: one skill; +4: for one skill I treat d20 rolls of 7 or lower as 8; +5: I can make an Int save instead of a Wis save."
};
FeatsList["mental acuity (laserllama)"] = {
	name : "Mental Acuity",
	source : [["GMB:LL", 0]],
	description : "I gain proficiency with two of Arcana, History, Investigation, Medicine, Nature, or Religion. For two skills from that list, I treat d20 rolls of 7 or lower as 8. [+1 Intelligence]",
	skillstxt : "Choose two from Arcana, History, Investigation, Medicine, Nature, or Religion",
	scores : [0, 0, 0, 1, 0, 0]
};
FeatsList["scholar of lore (laserllama)"] = {
	name : "Scholar of Lore",
	source : [["GMB:LL", 0]],
	description : "I master one Scholarly Pursuit of the Savant (level prerequisites use my total level). If it uses an Intellect Die, I use a d4 (unless mine is higher). [+1 Intelligence]",
	scores : [0, 0, 0, 1, 0, 0]
};

// ======================= MAGIC ITEMS =======================
MagicItemsList["blade of the scribe (ll)"] = {
	name : "Blade of the Scribe",
	source : [["GMB:LL", 0]],
	type : "weapon (rapier)",
	rarity : "rare",
	attunement : true,
	prerequisite : "Requires attunement by a Savant",
	prereqeval : function (v) { return classes.known["savant(laserllama)"] ? true : false; },
	description : "This +1 rapier has 4 charges and regains 1d4 at dawn. When I hit with it, I can expend 1 charge: the target makes a DC 15 Dex save or is blinded for 1 minute (it can use its action to wipe the ink away).",
	usages : 4,
	recovery : "dawn",
	additional : "regains 1d4",
	weaponsAdd : ["Blade of the Scribe"],
	weaponOptions : [{
		baseWeapon : "rapier",
		regExpSearch : /^(?=.*blade)(?=.*scribe).*$/i,
		name : "Blade of the Scribe",
		source : [["GMB:LL", 0]],
		modifiers : [1, 1],
		description : "Finesse; 1 charge on hit: DC 15 Dex save or blinded 1 min"
	}]
};
MagicItemsList["doctoral robes (ll)"] = {
	name : "Doctoral Robes",
	source : [["GMB:LL", 0]],
	type : "wondrous item",
	rarity : "legendary",
	attunement : true,
	prerequisite : "Requires attunement by a Savant",
	prereqeval : function (v) { return classes.known["savant(laserllama)"] ? true : false; },
	description : "Without armor, my AC is 15 + my Int modifier. I add my Int modifier to my saving throws. As a reaction when a creature within 30 ft that can hear me makes an ability check, I can add my Int modifier to it.",
	armorOptions : [{
		regExpSearch : /^(?=.*doctoral)(?=.*robe).*$/i,
		name : "Doctoral Robes",
		source : [["GMB:LL", 0]],
		ac : "15+Int",
		dex : -10
	}],
	armorAdd : "Doctoral Robes",
	addMod : [{ type : "save", field : "all", mod : "Int", text : "While attuned to the Doctoral Robes, I add my Intelligence modifier to my saving throws." }],
	action : [["reaction", "Doctoral Robes (+Int to check)"]]
};
MagicItemsList["living quill (ll)"] = {
	name : "Living Quill",
	source : [["GMB:LL", 0]],
	type : "wondrous item",
	rarity : "common",
	description : "As an action, I speak its command word and touch it to paper or parchment. For 1 hour (or until I speak the command word again), while it can hear me, it transcribes my words exactly.",
	action : [["action", ""]]
};
MagicItemsList["monocle of the linguist (ll)"] = {
	name : "Monocle of the Linguist",
	source : [["GMB:LL", 0]],
	type : "wondrous item",
	rarity : "uncommon",
	attunement : true,
	description : "I can read and understand all writing I view through this monocle as if it were in my native tongue."
};
MagicItemsList["ring of lost lore (ll)"] = {
	name : "Ring of Lost Lore",
	source : [["GMB:LL", 0]],
	type : "ring",
	rarity : "rare",
	attunement : true,
	description : "This ring has 3 charges and regains 1 at dawn. I can expend 1 charge to focus on an object or creature I see and instantly learn one piece of significant, forgotten, or secret knowledge about it, if such information exists.",
	usages : 3,
	recovery : "dawn",
	additional : "regains 1"
};
MagicItemsList["staff of the headmaster (ll)"] = {
	name : "Staff of the Headmaster",
	source : [["GMB:LL", 0]],
	type : "staff",
	rarity : "very rare",
	attunement : true,
	prerequisite : "Requires attunement by a Savant",
	prereqeval : function (v) { return classes.known["savant(laserllama)"] ? true : false; },
	description : "This +2 quarterstaff gives me +2 on ability checks using Intelligence or Wisdom while held. Once per dawn, as an action, I plunge it into the ground to produce private sanctum in a 30-ft radius (looks like an ornate study).",
	usages : 1,
	recovery : "dawn",
	action : [["action", "Private Sanctum"]],
	weaponsAdd : ["Staff of the Headmaster"],
	weaponOptions : [{
		baseWeapon : "quarterstaff",
		regExpSearch : /^(?=.*staff)(?=.*headmaster).*$/i,
		name : "Staff of the Headmaster",
		source : [["GMB:LL", 0]],
		modifiers : [2, 2]
	}]
};
MagicItemsList["tome of everlasting genius (ll)"] = {
	name : "Tome of Everlasting Genius",
	source : [["GMB:LL", 0]],
	type : "wondrous item",
	rarity : "very rare",
	attunement : true,
	prerequisite : "Requires attunement by a Savant",
	prereqeval : function (v) { return classes.known["savant(laserllama)"] ? true : false; },
	description : "It has 1d4+1 entries: Actor (Performance), Psychologist (Insight), Astronomer (Nature), Surgeon (Medicine), Cultist (Deception), Researcher (Investigation), Linguist (Persuasion), Ritualist (Arcana), Magistrate (History), Theologian (Religion). For each, I'm proficient in the skill with +5 to checks. After a year and a day, I add my own entry."
};

// ======================= ACADEMIC DISCIPLINES =======================

AddSubClass("savant(laserllama)", "aristocrat", {
	regExpSearch : /^(?=.*aristocrat)(?=.*savant).*$/i,
	subname : "Aristocrat",
	fullname : "Aristocrat",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLSavStudent("High Society", [
			"I gain proficiency in History, Persuasion, and one artisan's tools (+Intellect Die)",
			"I master Equestrianism, Linguistics, Mercantilism, or Traditions, ignoring its level prerequisite"
		], { skills : ["History", "Persuasion"], toolProfs : [["Artisan's tools", 1]] }),
		"subclassfeature3.1" : {
			name : "Inherited Wealth",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I can withdraw 300 gp once from a bank in a suitable settlement; each new Savant level, a one-time 100 \xD7 level gp"),
			additional : levels.map(function (n) { return n < 3 ? "" : (n === 3 ? "300" : 100 * n) + " gp this level"; })
		},
		"subclassfeature3.2" : {
			name : "Uphold Reputation",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc("When I miss an attack or fail a check or save, I can add my Intellect Die to the result" + (n < 18 ? "; I regain one use on a short rest" : "; I regain all uses on a short rest"));
			}),
			usages : "Int mod per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "long rest"
		},
		"subclassfeature7" : {
			name : "Aversion to Violence",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : levels.map(function (n) {
				return LLdesc([
					"As a reaction when a creature I see targets me with an attack or spell, I swap places with a willing creature within " + (n < 18 ? "5 ft" : "15 ft (or an unwilling one within 5 ft, Wis save; not the attacker)"),
					"which becomes the target; I can grant it temp HP equal to my Intellect Die (Int mod times per short rest)"
				]);
			}),
			usages : "Int mod per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "short rest",
			action : [["reaction", ""]]
		},
		"subclassfeature13" : {
			name : "Well Connected",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("Once per long rest, in a settlement, 1 hour arranges a favor up to a 7th-level spell's effect and 500 gp \xD7 my level (not again there for 1d4 days)"),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature18" : {
			name : "Ascendant House",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Aversion to Violence reaches 15 ft (or an unwilling creature within 5 ft, Wis save); Uphold Reputation fully recharges on a short rest")
		}
	}
});

// Culinarian recipes: [name, min level, description]
var LLRecipes = [
	["Invigorating Morsel", 0, "Sample: beast without fly/swim speed. Regain Intellect Die + Int mod HP"],
	["Limbering Morsel", 0, "Sample: beast with a fly speed. 1 hour: + Int mod (min 1) to initiative, +10 ft walking speed"],
	["Monstrous Morsel", 0, "Sample: monstrosity CR 1+. 1 hour: Change Appearance or Natural Weapons of alter self"],
	["Subterranean Morsel", 0, "Sample: beast with a burrow speed. 1 hour: darkvision 60 ft (or +30 ft)"],
	["Thalassic Morsel", 0, "Sample: beast with a swim speed. 1 hour: swim speed = walking speed, hold breath 10 minutes"],
	["Verdant Morsel", 0, "Sample: plant CR 1+. Ends blinded, deafened, paralyzed, petrified, poisoned, an ability or HP max reduction"],
	["Draconic Morsel", 7, "Sample: dragon CR 1+. 1 hour: resistance to its breath weapon's damage type (one recipe per dragon type)"],
	["Psionic Morsel", 7, "Sample: aberration CR 1+. 1 hour: telepathy 30 ft"],
	["Titanic Morsel", 7, "Sample: giant CR 1+. 1 hour (concentration): size of the giant, + Int mod to Str checks and saves"],
	["Viscous Morsel", 7, "Sample: ooze CR 1+. 1 hour: reduce acid, lightning, poison, slashing damage by Int mod (min 1)"],
	["Aerial Morsel", 13, "Sample: air elemental CR 1+. 1 hour: Dash as a bonus action, hold breath indefinitely"],
	["Aqueous Morsel", 13, "Sample: water elemental CR 1+. 1 hour: breathe air and water, swim speed, reaction: crit becomes a normal hit"],
	["Ignan Morsel", 13, "Sample: fire elemental CR 1+. 1 hour: fire resistance, immune to charmed and frightened"],
	["Terran Morsel", 13, "Sample: earth elemental CR 1+. 1 hour: tremorsense 15 ft, resist nonmagical B/P/S"],
	["Celestial Morsel", 18, "Sample: celestial CR 1+. 1 hour: flying speed equal to walking speed"],
	["Infernal Morsel", 18, "Sample: fiend CR 1+. 1 hour: adv. on saves vs. spells and magical effects"],
	["Sylvan Morsel", 18, "Sample: fey CR 1+. 1 hour: bonus action teleport 30 ft each turn"]
];
AddSubClass("savant(laserllama)", "culinarian", {
	regExpSearch : /^(?=.*culinar)(?=.*savant).*$/i,
	subname : "Culinarian",
	fullname : "Culinarian",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLSavStudent("Flavor", [
			"I gain proficiency in Nature, Sleight of Hand, and cook's utensils (+Intellect Die)",
			"With cook's utensils and food, creatures spending Hit Dice on a short rest with me regain +Intellect Die HP",
			"Cook's utensils are finesse simple melee weapons for me (Intellect Die B/P/S damage); 1 minute detects poison or alteration in food"
		], {
			skills : ["Nature", "Sleight of Hand"],
			toolProfs : ["Cook's utensils"],
			weaponOptions : [{
				regExpSearch : /^(?=.*cook)(?=.*utensil).*$/i,
				name : "Cook's Utensils",
				source : [["GMB:LL", 0]],
				ability : 1,
				type : "Simple",
				damage : [1, 4, "slashing"],
				range : "Melee",
				description : "Finesse; damage die = Intellect Die; bludgeoning, piercing, or slashing",
				abilitytodamage : true,
				isAlwaysProf : true
			}]
		}),
		"subclassfeature3.1" : {
			name : "Culinarian's Cook Book",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"I know two Recipes and add more from Samples (action: harvest from a creature dead within 1 minute; 1 hour to experiment)",
					"After a rest, I prepare Int mod Morsels of known Recipes (they spoil at the next rest); action: eat or feed one",
					"Only one Morsel active per creature" + (n < 7 ? "" : "; Cut Above: action to change a Morsel's Recipe; bonus action attack after feeding") + (n < 13 ? "" : "; eaters gain Savant level temp HP")
				]);
			}),
			action : [["action", "Serve Morsel"]],
			extraname : "Recipe",
			extrachoices : [],
			extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 7 ? 6 : n < 13 ? 10 : n < 18 ? 14 : 17; })
		},
		"subclassfeature7" : {
			name : "Cut Above",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("As an action, I change a Morsel to another Recipe; when I use my action to serve a Morsel, I can make a weapon attack as a bonus action"),
			action : [["action", "Change Morsel"], ["bonus action", "Attack (after Morsel)"]]
		},
		"subclassfeature13" : {
			name : "Improved Recipes",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("A creature that eats one of my Morsels also gains temp HP equal to my Savant level")
		},
		"subclassfeature18" : {
			name : "Master Culinarian",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"In 1 hour (can be a rest), I cook a feast for me and Savant level creatures; after 10 min eating, they're cured of poisons, diseases,",
				"and hostile conditions, and for 24 hours are immune to frightened and poisoned and add my Intellect Die to Wis and Con checks/saves"
			])
		}
	}
});
(function () {
	var oFea = ClassSubList["savant(laserllama)-culinarian"].features["subclassfeature3.1"];
	for (var i = 0; i < LLRecipes.length; i++) {
		var a = LLRecipes[i];
		oFea.extrachoices.push(a[0]);
		var o = { name : a[0], source : [["GMB:LL", 0]], description : LLdesc(a[2]) };
		if (a[1]) {
			o.prereqeval = LLSavPursuitPrereq(a[1]);
			o.submenu = "[Savant level " + (a[1] < 10 ? " " : "") + a[1] + "+]";
		}
		oFea[a[0].toLowerCase()] = o;
	}
})();

AddSubClass("savant(laserllama)", "orator", {
	regExpSearch : /^(?=.*orator)(?=.*savant).*$/i,
	subname : "Orator",
	fullname : "Orator",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLSavStudent("Logic", [
			"I gain proficiency in Deception and Persuasion (+Intellect Die) and use Int for them",
			"I master Instruction, Riddles, or Traditions; I learn Int mod languages and sound like a native in any language"
		], { skills : ["Deception", "Persuasion"], languageProfs : [1] }),
		"subclassfeature3.1" : {
			name : "Rhetorical Superiority",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"Targets must hear and understand me" + (n < 18 ? "" : "; with Int and Wis below my Int score, they have disadv. on saves"),
					"\u2022 Convincing Conversation: after 1 min talking to a non-hostile, Wis save (unaware) or charmed 1 hour (one at a time)",
					"\u2022 Cutting Retort (reaction): a creature within 30 ft attacking makes a Wis save or -Intellect Die" + (n < 7 ? "" : " and Intellect Die psychic") + "; success: immune 24 h",
					"\u2022 Invigorating Word (reaction): after another within 30 ft takes damage, it gains Intellect Die temp HP",
					"\u2022 Uplifting Remark (reaction): another within 30 ft fails an Int, Wis, or Cha save: it rerolls"
				]);
			}),
			action : [["reaction", "Rhetorical Superiority"]]
		},
		"subclassfeature7" : {
			name : "Iron Logic",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("I have adv. on saves vs. enchantment spells and I'm immune to charmed; Cutting Retort deals my Intellect Die psychic"),
			savetxt : { adv_vs : ["enchantment spells"], immune : ["charmed"] }
		},
		"subclassfeature13" : {
			name : "Peerless Rhetoric",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc([
				"After 1 minute of speech to a crowd, up to Savant level creatures that hear and understand me; each once per short rest:",
				"Inspire: Savant level temp HP, while they last adv. vs. enchantment and immune to frightened; Persuade: Wis save or mass suggestion (24 h)"
			]),
			usages : 2,
			recovery : "short rest"
		},
		"subclassfeature18" : {
			name : "Master Orator",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Creatures with Int and Wis both lower than my Int score have disadv. on saves vs. my Rhetorical Superiority and Peerless Rhetoric")
		}
	}
});

AddSubClass("savant(laserllama)", "philosopher", {
	regExpSearch : /^(?=.*philosoph)(?=.*savant).*$/i,
	subname : "Philosopher",
	fullname : "Philosopher",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLSavStudent("Thought", [
			"I gain proficiency in Arcana and Religion (+Intellect Die); +Intellect Die to communicate with creatures not native to the Material Plane",
			"Adroit Analysis can also reveal alignment, native plane, or spellcasting ability and highest spell level"
		], { skills : ["Arcana", "Religion"] }),
		"subclassfeature3.1" : {
			name : "Words of Power",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var d = n < 7 ? "Intellect Die" : (n < 13 ? 2 : n < 18 ? 3 : 4) + " Intellect Dice";
				return LLdesc([
					"Target: " + (n < 7 ? "my Focus" : "any creature") + " within 30 ft that hears me; on a failed save it takes " + d + " psychic and:",
					"\u2022 Confound (reaction, it makes a check/attack): Int save, disadv. on that roll",
					"\u2022 Disorient (action): Wis save, disadv. on its first save before my next turn",
					"\u2022 Dread (action): Wis save, frightened of a creature I choose until my next turn",
					"\u2022 Halt (reaction, it tries to move): Str save, speed 0 until my next turn"
				]);
			}),
			action : [["action", "Word of Power"], ["reaction", "Word of Power"]]
		},
		"subclassfeature7" : {
			name : "Unwavering Focus",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Words of Power affect any creature within 30 ft that can hear me; failed saves take 2 Intellect Dice (3 at 13th, 4 at 18th)")
		},
		"subclassfeature13" : {
			name : "Supreme Understanding",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc([
				"Once each per short rest, as an action vs. my Focus (repeats save each turn, damage again on a failure):",
				"\u2022 Enfeeble: Int save or 3 Intellect Dice psychic and stunned 1 min; \u2022 Shunt: Cha save or 3 dice psychic and banished 1 min"
			]),
			usages : 2,
			recovery : "short rest",
			action : [["action", "Enfeeble/Shunt"]]
		},
		"subclassfeature18" : {
			name : "Master Philosopher",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I'm always under protection from evil and good; once per long rest, I speak a Word replicating power word heal or power word kill"),
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : [{ name : "Master Philosopher", spells : LLSpellList(["power word heal", "power word kill"]), selection : LLSpellList(["power word heal", "power word kill"]), times : 2, firstCol : "oncelr", spellcastingAbility : 4 }]
		}
	}
});

// Runes: [name, min level, description]
var LLRunes = [
	["Rune of Enchantment", 0, "Item: bracelet, diadem, necklace, or ring. Creatures treat the bearer one stage friendlier (ends if it attacks them). Invoke (action): calm emotions, charm person, or command on Int mod creatures"],
	["Rune of Evocation", 0, "Item: simple or martial melee weapon. Choose acid, cold, fire, poison, or lightning: +Intellect Die damage of that type on hit. Invoke: on damage, +3 Intellect Dice of that type"],
	["Rune of Illusion", 0, "Item: cloak, robe, or armor. Action: change appearance (same limbs and size; Investigation vs. my DC). Invoke (action): invisible 10 min or until it attacks or forces a save"],
	["Rune of Necromancy", 0, "Item: belt, ring, or armor. Bonus action: temp HP = my Int mod. Invoke: when reduced to 0 HP (not killed), drop to 1 HP instead"],
	["Rune of Abjuration", 7, "Item: cloak, robe, shield, or armor. Once per turn, reduce damage from a spell or magic effect by my Int mod. Invoke (reaction): a caster within 30 ft makes a Con save or its spell fails"],
	["Rune of Conjuration", 7, "Item: belt, cloak, ring, or armor. Action: spend remaining movement to teleport that distance to a space it sees. Invoke (action): two creatures within 60 ft make Cha saves (can fail); if both fail, they swap places"],
	["Rune of Divination", 13, "Item: wand, staff, robe, or spellcasting focus. Cast comprehend languages, detect magic, and identify as rituals without material components. Invoke (action): truesight 120 ft for 1 hour"],
	["Rune of Transmutation", 13, "Item: bracelet, diadem, ring, or necklace. 30 ft swim, 30 ft climb, or +10 ft walking speed (bonus action to switch). Invoke (action): polymorph into a beast of CR \u2264 my Savant level (no concentration)"]
];
// The WotC "Rune Scribe" prestige class shouldn't catch the Savant's Rune Scribe discipline
if (ClassList["rune scribe"] && ClassList["rune scribe"].regExpSearch && !/savant/.test(ClassList["rune scribe"].regExpSearch.source)) {
	ClassList["rune scribe"].regExpSearch = new RegExp("^(?!.*savant)(?=" + ClassList["rune scribe"].regExpSearch.source + ").*$", "i");
}
AddSubClass("savant(laserllama)", "rune scribe", {
	regExpSearch : /^(?=.*rune)(?=.*scribe)(?=.*savant).*$/i,
	subname : "Rune Scribe",
	fullname : "Rune Scribe",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLSavStudent("Runes", [
			"I gain proficiency in Arcana, History, and calligrapher's supplies (+Intellect Die)",
			"I learn two of these Runic languages: Draconic, Druidic, Dwarvish, Giant, or Primordial"
		], { skills : ["Arcana", "History"], toolProfs : ["Calligrapher's supplies"], languageProfs : [["Draconic, Druidic, Dwarvish, Giant, or Primordial", 2]] }),
		"subclassfeature3.1" : {
			name : "Rune Carving",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"I know Runes (\"Choose Feature\"); in 1 hour with calligrapher's supplies, I inscribe one in an object (one object per Rune)",
					"Its bearer gains the Rune's benefits and, if it speaks the Runic language, can Invoke it once per my long rest" + (n < 7 ? "" : " (Elder Magicks: +1 after a 10-min short rest ritual)"),
					"I ignore Single Minded for spells from Runes; Runic attack = Prof Bonus + Int mod; I can swap one Rune per level"
				]);
			}),
			additional : levels.map(function (n) { return n < 3 ? "" : (n < 7 ? 2 : n < 10 ? 3 : n < 13 ? 4 : n < 18 ? 5 : 6) + " Runes known"; }),
			extraname : "Rune",
			extrachoices : [],
			extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 7 ? 2 : n < 10 ? 3 : n < 13 ? 4 : n < 18 ? 5 : 6; })
		},
		"subclassfeature7" : {
			name : "Elder Magicks",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("My Runic objects are magical; during a short rest, a 10-min ritual lets an Invoked Rune be Invoked once more before my next long rest")
		},
		"subclassfeature13" : {
			name : "Runic Ward",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("Bearers of my Runic objects add my Int mod (min +1) to saves vs. spells and magical effects; I can swap one Rune after each long rest")
		},
		"subclassfeature18" : {
			name : "Master Rune Scribe",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("When reduced to 0 HP (not killed), I can dispel a Runic object within 60 ft to drop to 1 HP instead")
		}
	}
});
(function () {
	var oFea = ClassSubList["savant(laserllama)-rune scribe"].features["subclassfeature3.1"];
	for (var i = 0; i < LLRunes.length; i++) {
		var a = LLRunes[i];
		oFea.extrachoices.push(a[0]);
		var o = { name : a[0], source : [["GMB:LL", 0]], description : LLdesc(a[2]) };
		if (a[1]) {
			o.prereqeval = LLSavPursuitPrereq(a[1]);
			o.submenu = "[Savant level " + (a[1] < 10 ? " " : "") + a[1] + "+]";
		}
		oFea[a[0].toLowerCase()] = o;
	}
})();

AddSubClass("savant(laserllama)", "virtuoso", {
	regExpSearch : /^(?=.*virtuoso)(?=.*savant).*$/i,
	subname : "Virtuoso",
	fullname : "Virtuoso",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLSavStudent("Music", [
			"I gain proficiency in Insight, Performance, and three musical instruments (+Intellect Die); I use Int for Performance",
			"1 hour of practice gives proficiency with one more instrument (one at a time)"
		], { skills : ["Insight", "Performance"], toolProfs : [["Musical instrument", 3]] }),
		"subclassfeature3.1" : {
			name : "Wondrous Theme",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var r = n < 13 ? 30 : 60;
				return LLdesc([
					"As an action, I play my Theme until my next turn (bonus action to continue); it influences creatures within " + r + " ft that hear it" + (n < 18 ? "" : " (even deafened)"),
					"Reactions: Discordant Note: -Intellect Die to an attack; Inspiring Tune: reduce damage by Intellect Die",
					"Raucous Assault: a creature entering/starting its turn makes a Con save or takes " + (n < 13 ? 2 : n < 18 ? 3 : 4) + " Intellect Dice thunder" + (n < 13 ? "" : " (-1 die to deafen)"),
					"Uplifting Melody: auto-succeed a save vs. charmed, frightened, incapacitated, or stunned" + (n < 13 ? "" : "; each reaction also grants Int mod temp HP to another")
				]);
			}),
			action : [["action", "Begin Theme"], ["bonus action", "Continue Theme"], ["reaction", "Theme reaction"]]
		},
		"subclassfeature7" : {
			name : "Disarming Melody",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("A creature under my Theme attacking me makes a Wis save or must attack another target (or miss; success: immune 24 h); starting or continuing the Theme can force a Raucous Assault save")
		},
		"subclassfeature13" : {
			name : "Empowered Theme & Shrill Assault",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("My Theme influences creatures within 60 ft; reactions grant Int mod temp HP to another; Raucous Assault deals 3 dice (4 at 18th), -1 die to deafen")
		},
		"subclassfeature18" : {
			name : "Master Virtuoso",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Creatures in range are influenced even if they can't hear; once per short rest when I begin my Theme, chosen creatures make the Raucous Assault save"),
			usages : 1,
			recovery : "short rest"
		}
	}
});

// ======================================================================
// LaserLlama - Shaman v6.0.1.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Shaman"
	Effect:		This script adds the Shaman class, its Sacred Foci, 47 Totem Spirits, 5 Elder Spirits, and 5 Spiritualities.
				Shaman v6.0.1 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Shaman" in the Class field (e.g. "Witch Doctor Shaman")
*/


if (typeof LLAddFightingStyles !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

// The official Druid shouldn't catch the "Shaman" class
if (ClassList["druid"]) ClassList["druid"].regExpSearch = /^(?=.*druid)(?!.*laserllama).*$/i;
// Neither should other classes catch Shaman subclasses ("Spirit Warrior", "Witch Doctor")
["fighter", "sorcerer", "warlock", "barbarian"].forEach(function (sCl) {
	if (!ClassList[sCl] || !ClassList[sCl].regExpSearch || /shaman/.test(ClassList[sCl].regExpSearch.source)) return;
	ClassList[sCl].regExpSearch = new RegExp("^(?!.*shaman)(?=" + ClassList[sCl].regExpSearch.source + ").*$", "i");
});
LLShaLvl = function () { return classes.known["shaman(laserllama)"] ? classes.known["shaman(laserllama)"].level : 0; };
LLShaFocus = function (sFocus) {
	if (!classes.known["shaman(laserllama)"]) return true;
	var sCh = GetFeatureChoice("classes", "shaman(laserllama)", "sacred focus");
	return sCh && sCh.indexOf(sFocus) !== -1 ? true : false;
};
LLShaSlots = levels.map(function (n) { return n < 2 ? 0 : n < 11 ? 2 : n < 17 ? 3 : 4; });
LLShaSlotLvl = levels.map(function (n) { return n < 2 ? 0 : n < 3 ? 1 : n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : 5; });
LLShaTotems = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9];

var LLShamanSpells = [
	"beckon air", "blade ward", "chill touch", "control flame", "create bonfire", "frostbite", "guidance", "magic stone", "mold earth", "otherworldly grasp", "poison spray", "primal savagery", "shape water", "shillelagh", "spare the dying", "seance", "thaumaturgy", "thorn whip", "thunderclap", "toll the dead",
	"absorb elements", "animal friendship", "bane", "beast bond", "bless", "cause fear", "ceremony", "command", "cure wounds", "detect evil & good", "detect magic", "dissonant whispers", "entangle", "expeditious retreat", "false life", "find familiar", "fog cloud", "ghastly flight", "heroism", "inflict wounds", "longstrider", "protection from evil & good", "purify food & drink", "sanctuary", "shield of faith", "sleep", "unseen servant", "witch bolt",
	"aid", "alter self", "augury", "barkskin", "blur", "continual flame", "darkness", "dust devil", "earthbind", "enhance ability", "gentle repose", "gust of wind", "heat metal", "locate creature", "misty step", "moonbeam", "pass without trace", "protection from poison", "spike growth", "totemic cowl", "warding wind",
	"bestow curse", "clairvoyance", "daylight", "dire wail", "dispel magic", "elemental weapon", "feign death", "gaseous form", "haste", "life transference", "magic circle", "meld into stone", "nondetection", "phantom steed", "plant growth", "protection from energy", "remove curse", "slow", "speak with dead", "spectral passage", "spirit guardians", "stinking cloud", "tiny hut", "tongues", "wall of sand", "wall of water", "wind wall",
	"arcane eye", "banishment", "control water", "divination", "elemental bane", "faithful hound", "fire shield", "freedom of movement", "giant insect", "grasping vine", "guardian of nature", "polymorph", "sickening radiance", "stoneskin", "watery sphere",
	"antilife shell", "awaken", "cloudkill", "commune", "commune with nature", "dawn", "dispel evil & good", "dream", "far step", "planar binding", "reincarnate", "scrying", "skill empowerment", "spiritual sundering", "wrath of nature"
];
LLAddSpellsToClass("shaman(laserllama)", LLShamanSpells);

LLSpiritualitySpells = function (sName, aSpells) {
	return {
		name : sName + " Spells",
		source : [["GMB:LL", 0]],
		minlevel : 2,
		description : LLdesc("My Spirituality Spells are always prepared and don't count against my prepared spells"),
		spellcastingExtra : LLSpellList(aSpells)
	};
};
LLShaPrereq = function (nLvl, sFocus) {
	return function (v) { return LLShaLvl() >= nLvl && (!sFocus || LLShaFocus(sFocus)); };
};
// Totem Spirits: [name, min level, Sacred Focus, description, extra attributes]; LLTotemSpirits is extended by the Shaman Expanded file
LLTotemSpirits = [
	["Spirit of the Autumn Wind", 0, "", "When I damage a creature with a weapon attack or Totemic Assault, it can't regain HP until the start of my next turn"],
	["Spirit of the Bear", 0, "", "As a bonus action, I sprout (or retract) ethereal claws: unarmed strikes using Wis deal 1d6 slashing (1d8 with two free hands)", { action : [["bonus action", "Bear claws"]], weaponOptions : [{ baseWeapon : "unarmed strike", regExpSearch : /^(?=.*bear)(?=.*claw).*$/i, name : "Bear Claws (Totem)", source : [["GMB:LL", 0]], ability : 5, damage : [1, 6, "slashing"], description : "1d8 with two free hands; uses Wisdom", selectNow : true }] }],
	["Spirit of the Bog", 0, "Mind", "Attempts to read my thoughts, emotions, or alignment, Insight checks, and divination spells targeting me fail (I know, and can allow them)"],
	["Spirit of the Eagle", 0, "", "I gain proficiency in Perception and adv. on Perception checks relying on sight", { skills : ["Perception"] }],
	["Spirit of the Earthquake", 0, "", "Once per turn when I hit with a melee weapon attack, I deal extra damage of the weapon's type", { additional : levels.map(function (n) { return "+1d" + (n < 5 ? 6 : n < 11 ? 8 : n < 17 ? 10 : 12) + " damage"; }) }],
	["Spirit of Forest", 0, "Heart", "I'm always under speak with animals while conscious (and speak with plants from 7th level)"],
	["Spirit of the Harvest", 0, "Soul", "After each short or long rest, I cast goodberry without a slot or components; the berries last until my next rest"],
	["Spirit of the Hound", 0, "", "I gain proficiency in Survival and adv. on Survival checks in natural environments", { skills : ["Survival"] }],
	["Spirit of the Mountain", 0, "Body", "Without armor or a shield, my AC equals 13 + my Con mod (min 0)", { armorOptions : [{ regExpSearch : /^(?=.*spirit)(?=.*mountain).*$/i, name : "Spirit of the Mountain", source : [["GMB:LL", 0]], ac : "13+Con", dex : -10, selectNow : true }] }],
	["Spirit of the Panther", 0, "", "I gain proficiency in Stealth and adv. on Stealth checks to hide in natural environments", { skills : ["Stealth"] }],
	["Spirit of the Squall", 0, "", "When I miss with a weapon attack, I can make one attack against that creature as a bonus action", { action : [["bonus action", "Squall attack (after a miss)"]] }],
	["Spirit of the Stream", 0, "", "Adv. on checks and saves vs. being grappled, restrained, or stunned; I can hold my breath for 1 hour", { savetxt : { adv_vs : ["grappled", "restrained", "stunned"] } }],
	["Spirit of the Rains", 0, "", "I resist acid and poison damage and have adv. on saves vs. being poisoned", { dmgres : ["Acid", "Poison"], savetxt : { adv_vs : ["poisoned"] } }],
	["Spirit of Twilight", 0, "", "I have darkvision 120 ft (dim light as bright, darkness as dim); from 7th level, also in magical darkness", { vision : [["Darkvision", "fixed 120"]] }],
	["Spirit of the Waves", 0, "", "As a reaction, I halve one instance of damage I take", { usages : levels.map(function (n) { return n < 9 ? 1 : n < 18 ? 2 : 3; }), recovery : "short rest", action : [["reaction", "Spirit of the Waves"]] }],
	["Spirit of the Winds", 0, "", "My walking speed increases (5 ft; 10 ft at 5th, 15 ft at 11th, 20 ft at 17th)", { speed : { walk : { spd : "+5", enc : "+5" } } }],
	["Spirit of the Bloom", 5, "Soul", "Once per short rest, I cast plant growth without a slot; from 9th level, its 8-hour version affects the land around me each long rest", { usages : 1, recovery : "short rest" }],
	["Spirit of Destruction", 5, "", "Once per turn when I hit with a melee attack, I can expend a Conduit slot for +1d8 cold, fire, lightning, or thunder per Slot Level"],
	["Spirit of Growth", 5, "Body", "Once per short rest, I cast the enlarge version of enlarge/reduce on myself without a slot or concentration", { usages : 1, recovery : "short rest" }],
	["Spirit of the Grave", 5, "", "Once per long rest (short rest from 15th level), I expend a Conduit slot to cast summon undead; the Totem replaces its components", { usages : 1, recovery : "long rest", spellcastingBonus : [{ name : "Spirit of the Grave", spells : LLSpellList(["summon undead"]), selection : LLSpellList(["summon undead"]) }] }],
	["Spirit of Light", 5, "", "When I restore HP to another with a Shaman spell or feature, I gain Wis mod (min 1) temp HP"],
	["Spirit of Mirth", 5, "Heart", "As a bonus action, I gain temp HP equal to my Shaman level", { usages : levels.map(function (n) { return n < 12 ? 1 : n < 18 ? 2 : 3; }), recovery : "short rest", action : [["bonus action", "Spirit of Mirth"]] }],
	["Spirit of Secrets", 5, "Mind", "Once per short rest, I cast detect thoughts without a slot or verbal/somatic components", { usages : 1, recovery : "short rest" }],
	["Spirit of the Swamp", 5, "", "When a creature fails its save vs. Totemic Assault, I can reduce the damage by 1d8 to poison it until the start of my next turn"],
	["Spirit of the Wilds", 5, "", "Once per long rest (short rest from 15th level), I expend a Conduit slot to cast summon beast; the Totem replaces its components", { usages : 1, recovery : "long rest", spellcastingBonus : [{ name : "Spirit of the Wilds", spells : LLSpellList(["summon beast"]), selection : LLSpellList(["summon beast"]) }] }],
	["Spirit of Wrath", 5, "", "I add my Wis mod (min +1) to Totemic Assault damage when a creature fails its save"],
	["Spirit of the Hunt", 7, "", "Once per turn, I have adv. on an attack against a target within 5 ft of one of my allies"],
	["Spirit of the Ooze", 7, "", "As a bonus action, my body becomes pliable (or normal): 5 ft of movement escapes nonmagical restraints/grapples; I move through 1-inch spaces", { action : [["bonus action", "Spirit of the Ooze"]] }],
	["Spirit of the River", 7, "", "I can breathe air and water and have a swimming speed equal to my walking speed", { speed : { swim : { spd : "walk", enc : "walk" } } }],
	["Spirit of the Cave", 9, "", "While touching the ground with a bare foot or hand, I have tremorsense out to 30 ft", { vision : [["Tremorsense", 30]] }],
	["Spirit of the Dawn", 9, "", "At the end of each long rest, I cast death ward on a creature I touch without a slot"],
	["Spirit of the Rockslide", 9, "Body", "My Totemic Assault can force a Str save instead of Cha; on a failure, the target also falls prone"],
	["Spirit of Dread", 9, "Mind", "My Totemic Assault can force an Int save instead of Cha; on a failure, I can reduce damage by 2d8 to frighten it until my next turn"],
	["Spirit of Harmony", 9, "Soul", "When a creature fails its save vs. Totemic Assault, I can deal no damage to apply calm emotions to it until the start of my next turn"],
	["Spirit of Serenity", 9, "Heart", "I have advantage on saves vs. being charmed or frightened and vs. enchantment spells", { savetxt : { adv_vs : ["charmed", "frightened", "enchantment spells"] } }],
	["Spirit of Vengeance", 9, "", "Once per long rest (short rest from 15th level), I expend a Conduit slot to cast summon fey; the Totem replaces its components", { usages : 1, recovery : "long rest", spellcastingBonus : [{ name : "Spirit of Vengeance", spells : LLSpellList(["summon fey"]), selection : LLSpellList(["summon fey"]) }] }],
	["Spirit of Sunlight", 9, "", "When I fail a saving throw, I can reroll it", { usages : levels.map(function (n) { return n < 15 ? 1 : 2; }), recovery : "long rest" }],
	["Spirit of the Vine", 9, "", "I can cast ensnaring strike at 1st level at will, without a spell slot", { spellcastingBonus : [{ name : "Spirit of the Vine", spells : LLSpellList(["ensnaring strike"]), selection : LLSpellList(["ensnaring strike"]), firstCol : "atwill" }] }],
	["Spirit of Awakening", 15, "Mind", "I sense creatures with Int 4+ within 120 ft and can communicate telepathically with them"],
	["Spirit of Bedrock", 15, "Body", "I reduce damage I take by my Wis mod (min 1), except force, necrotic, psychic, thunder, or radiant damage"],
	["Spirit of Binding", 15, "", "Once per long rest, as an action, I regain one expended Conduit Magic spell slot", { usages : 1, recovery : "long rest", action : [["action", "Spirit of Binding"]] }],
	["Spirit of the Eclipse", 15, "", "I have resistance to damage from spells", { dmgres : ["Spells"] }],
	["Spirit of the Elements", 15, "", "Once per short rest, I expend a Conduit slot to cast summon elemental; the Totem replaces its components", { usages : 1, recovery : "short rest", spellcastingBonus : [{ name : "Spirit of the Elements", spells : LLSpellList(["summon elemental"]), selection : LLSpellList(["summon elemental"]) }] }],
	["Spirit of Peace", 15, "Soul", "At the end of each short or long rest, I gain the benefits of sanctuary until my next rest (or until broken)"],
	["Spirit of Majesty", 15, "Heart", "As an action, chosen creatures within 30 ft that see or hear me make a Wis save (adv. if immune to charmed) or fall prone; 1/LR, then a Conduit slot", { usages : 1, recovery : "long rest", action : [["action", "Spirit of Majesty"]] }],
	["Spirit of the Sapling", 15, "", "If I start my turn below half HP (but at least 1), I regain HP equal to my Wis mod"],
	["Spirit of the Skies", 15, "", "I have a flying speed equal to my walking speed; I reduce falling damage by my Shaman level", { speed : { fly : { spd : "walk", enc : "walk" } } }]
];
LLAddTotems = function () {
	var oFea = ClassList["shaman(laserllama)"].features["totem spirits"];
	for (var i = 0; i < LLTotemSpirits.length; i++) {
		var a = LLTotemSpirits[i];
		var sKey = a[0].toLowerCase();
		if (oFea[sKey]) continue;
		oFea.extrachoices.push(a[0]);
		var o = { name : a[0], source : a[5] ? a[5] : [["GMB:LL", 0]], description : LLdesc(a[3]) };
		if (a[1] || a[2]) {
			o.prereqeval = LLShaPrereq(a[1], a[2]);
			o.submenu = "[" + (a[1] ? "Shaman level " + (a[1] < 10 ? " " : "") + a[1] : "") + (a[1] && a[2] ? ", " : "") + (a[2] ? a[2] + " Focus" : "") + "]";
		}
		if (a[4]) for (var p in a[4]) o[p] = a[4][p];
		oFea[sKey] = o;
	}
};
// Elder Spirits: [name, [6th, 7th, 8th, 9th], description]; LLElderSpirits is extended by the Shaman Expanded file
LLElderSpirits = [
	["Elder Spirit of Death", ["flesh to stone", "finger of death", "horrid wilting", "power word: kill"], "Drawn from the Shadowfell, the Hells, or the Abyss"],
	["Elder Spirit of Life", ["heal", "regenerate", "holy aura", "power word: heal"], "From the upper planes or the Feywild"],
	["Elder Spirit of the Moon", ["primordial ward", "reverse gravity", "antimagic field", "astral projection"], "From the Astral Sea or Ethereal Plane"],
	["Elder Spirit of the Sun", ["sunbeam", "resurrection", "sunburst", "true resurrection"], "From places of powerful radiant magic"],
	["Elder Spirit of the Void", ["soul cage", "prismatic spray", "maddening darkness", "psychic scream"], "From outer realms beyond the known planes"]
];
LLAddElderSpirits = function () {
	var oFea = ClassList["shaman(laserllama)"].features["elder spirit"];
	for (var i = 0; i < LLElderSpirits.length; i++) {
		var a = LLElderSpirits[i];
		var sKey = a[0].toLowerCase();
		if (oFea[sKey]) continue;
		oFea.choices.push(a[0]);
		var aBonus = [];
		var aLvl = [11, 13, 15, 17];
		for (var j = 0; j < a[1].length; j++) {
			var aSp = LLSpellList([a[1][j]]);
			if (!aSp.length) continue;
			aBonus.push({
				name : a[0] + " (" + (6 + j) + "th)",
				spells : aSp,
				selection : aSp,
				firstCol : "oncelr",
				times : levels.map(function (n) { return n >= aLvl[j] ? 1 : 0; })
			});
		}
		oFea[sKey] = {
			name : a[0],
			source : a[3] ? a[3] : [["GMB:LL", 0]],
			description : LLdesc([a[2] + "; Elder Spells (once per long rest each at lowest level, without a slot):", a[1][0] + " (11th), " + a[1][1] + " (13th), " + a[1][2] + " (15th), " + a[1][3] + " (17th)"]),
			spellcastingBonus : aBonus
		};
	}
};

ClassList["shaman(laserllama)"] = {
	name : "Shaman",
	regExpSearch : /^(?=.*shaman).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Wisdom",
	prereqs : "Wisdom 13",
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Wis", "Cha"],
	abilitySave : 5,
	spellcastingFactor : "warlock1",
	spellcastingTable : [[0, 0, 0, 0, 0, 0, 0, 0, 0]].concat(levels.map(function (n, idx) {
		var a = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		if (LLShaSlotLvl[idx]) a[LLShaSlotLvl[idx] - 1] = LLShaSlots[idx];
		return a;
	})),
	spellcastingKnown : {
		cantrips : [0, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : "list",
		prepared : true
	},
	spellcastingList : {
		"class" : "shaman(laserllama)",
		level : [0, 5]
	},
	skillstxt : {
		primary : "Choose two from Animal Handling, Arcana, Insight, Medicine, Nature, Performance, and Religion"
	},
	armorProfs : {
		primary : [true, false, false, true]
	},
	weaponProfs : {
		primary : [true, false, ["blowgun", "net"]]
	},
	equipment : "Shaman starting equipment:" +
		"\n \u2022 A quarterstaff -or- any simple weapon;" +
		"\n \u2022 A shortbow and 20 arrows -or- 5 javelins;" +
		"\n \u2022 A priest's pack -or- an explorer's pack;" +
		"\n \u2022 Leather armor and one object used as a Totem." +
		"\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Spirituality", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	features : {
		"sacred focus" : {
			name : "Sacred Focus",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("Choose the Sacred Focus I channel spirits through using the \"Choose Feature\" button above; it can't be changed"),
			choices : ["Body", "Heart", "Mind", "Soul"],
			"body" : {
				name : "Sacred Focus: Body",
				description : LLdesc("My hit point maximum increases by my Shaman level"),
				calcChanges : {
					hp : function (totalHD) {
						if (classes.known["shaman(laserllama)"]) return [classes.known["shaman(laserllama)"].level, "Sacred Focus: Body (Shaman level)"];
					}
				}
			},
			"heart" : {
				name : "Sacred Focus: Heart",
				description : LLdesc("I gain proficiency in Intimidation and Persuasion and can use Wisdom instead of Charisma for them"),
				skills : ["Intimidation", "Persuasion"]
			},
			"mind" : {
				name : "Sacred Focus: Mind",
				description : LLdesc("I can use my Wisdom score instead of my Intelligence score for ability checks and saving throws")
			},
			"soul" : {
				name : "Sacred Focus: Soul",
				description : LLdesc("Without armor or a shield, my AC equals 10 + my Cha mod + my Wis mod"),
				armorOptions : [{
					regExpSearch : /^(?=.*sacred)(?=.*(soul|focus)).*$/i,
					name : "Sacred Focus: Soul",
					source : [["GMB:LL", 0]],
					ac : "10+Cha+Wis",
					dex : -10,
					selectNow : true
				}]
			}
		},
		"totem spirits" : {
			name : "Totem Spirits",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"I bind Totem Spirits to Tiny Totems (\"Choose Feature\"); I can swap one per level" + (n < 5 ? "" : " (Totemic Versatility: or with a 1-hour ritual during a long rest)"),
					"Totemic Assault: as an action (once per turn), a creature I see within 60 ft makes a Cha save or takes " + (n < 5 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4) + "d8 necrotic",
					"The spirits swarm it (until it dies, moves 60+ ft away, or I pick another); bonus action: force the save again",
					"Totem save DC = 8 + Prof Bonus + Wis mod"
				]);
			}),
			additional : levels.map(function (n, idx) { return LLShaTotems[idx] + " Totems bound"; }),
			action : [["action", "Totemic Assault"], ["bonus action", "Totemic Assault (repeat)"]],
			extraname : "Totem Spirit",
			extrachoices : [],
			extraTimes : LLShaTotems
		},
		"conduit magic" : {
			name : "Conduit Magic",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I can cast prepared Shaman cantrips/spells, using Wisdom as my spellcasting ability; all my slots are of my Slot Level",
				"I regain all spell slots on a short or long rest; I prepare Wis mod + Shaman level spells up to my Slot Level",
				"I can cast prepared ritual spells as rituals; a Totem with a bound Spirit is my spellcasting focus"
			]),
			additional : levels.map(function (n, idx) {
				return n < 2 ? "" : LLShaSlots[idx] + " \xD7 " + ["1st", "2nd", "3rd", "4th", "5th"][LLShaSlotLvl[idx] - 1] + "-level slots";
			})
		},
		"subclassfeature2" : {
			name : "Spirituality",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc('Choose the Spirituality I use to channel spirits and put it in the "Class" field ')
		},
		"totemic versatility" : {
			name : "Totemic Versatility",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("During a long rest, a 1-hour ritual replaces one bound Totem Spirit (or my Elder Spirit) with another")
		},
		"elder spirit" : {
			name : "Elder Spirit",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("I bind an Elder Spirit (\"Choose Feature\"; not counted as a Totem); I know its Elder Spells and cast each once per long rest"),
			choices : []
		},
		"spiritual ascension" : {
			name : "Spiritual Ascension",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc([
				"I no longer age and I'm immune to disease, poisoned, and poison damage",
				"When reduced to 0 HP, I can release a Totem's Spirit to drop to my Shaman level in HP instead (lose that Totem until a long rest)"
			]),
			savetxt : { immune : ["disease", "poisoned", "poison"] }
		}
	}
};
LLAddTotems();
LLAddElderSpirits();

// ======================= SPIRITUALITIES =======================

AddSubClass("shaman(laserllama)", "curse binder", {
	regExpSearch : /^(?=.*curse)(?=.*binder)(?=.*shaman).*$/i,
	subname : "Curse Binder",
	fullname : "Curse Binder",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLSpiritualitySpells("Curse Binder", ["bane", "cause fear", "blindness/deafness", "ray of enfeeblement", "bestow curse", "vampiric touch", "blight", "phantasmal killer", "contagion", "enervation"]),
		"subclassfeature2.1" : {
			name : "Evil Eye",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("As a reaction when a creature I see within 60 ft hits with an attack or succeeds on a check or save, I subtract 1d4 from its roll"),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature2.2" : {
			name : "Totemic Curse",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"When a creature fails its save vs. Totemic Assault, until the start of my next turn I inflict one:",
				"\u2022 Half speed and no reactions; \u2022 no healing and +1d4 necrotic when damaged; \u2022 blinded beyond 15 ft"
			])
		},
		"subclassfeature6" : {
			name : "Sinister Vitality",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When my Totemic Assault deals necrotic damage, I gain half as temp HP (not vs. constructs or undead)")
		},
		"subclassfeature10" : {
			name : "Occult Ward",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I resist poison and necrotic damage and have adv. on saves vs. charmed and frightened; on a success, I can Totemic Assault the source as a reaction"),
			dmgres : ["Poison", "Necrotic"],
			savetxt : { adv_vs : ["charmed", "frightened"] },
			action : [["reaction", "Totemic Assault (after save)"]]
		},
		"subclassfeature14" : {
			name : "Foul Conjuration",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Once per long rest, I cast create undead at 6th level without a slot or components; they crumble at the end of my next long rest"),
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : [{ name : "Foul Conjuration", spells : LLSpellList(["create undead"]), selection : LLSpellList(["create undead"]), firstCol : "oncelr" }]
		}
	}
});

AddSubClass("shaman(laserllama)", "far seer", {
	regExpSearch : /^(?=.*far)(?=.*seer)(?=.*shaman).*$/i,
	subname : "Far Seer",
	fullname : "Far Seer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLSpiritualitySpells("Far Seer", ["comprehend languages", "detect magic", "augury", "detect thoughts", "clairvoyance", "tongues", "arcane eye", "divination", "contact other plane", "scrying"]),
		"subclassfeature2.1" : {
			name : "Spirits of Fate",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				var d = n < 6 ? "d4" : n < 10 ? "d6" : n < 14 ? "d8" : "d10";
				return LLdesc([
					"After each short or long rest, I roll two " + d + "s as Fate Dice (unused ones are lost at my next rest)",
					"As a reaction when I or a creature I see within 60 ft makes a check, attack, or save, I add or subtract a Fate Die (after the roll, before the outcome)",
					n < 10 ? "" : "Certain Fate: if it doesn't change the outcome, the die isn't expended"
				]);
			}),
			usages : 2,
			recovery : "short rest",
			action : [["reaction", "Fate Die"]]
		},
		"subclassfeature2.2" : {
			name : "Totemic Ritualist",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("My rituals take only 1 extra minute and a Totem replaces non-consumed components; for divination spells, also costly non-consumed ones")
		},
		"subclassfeature6" : {
			name : "Ascended Awareness",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("While not incapacitated, I can't be surprised and I add my Wis mod (min +1) to initiative"),
			addMod : [{ type : "skill", field : "Init", mod : "max(Wis|1)", text : "I add my Wisdom modifier (min +1) to initiative rolls." }]
		},
		"subclassfeature10" : {
			name : "Certain Fate",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When a Fate Die I apply doesn't change the outcome of the roll, it isn't expended")
		},
		"subclassfeature14" : {
			name : "Tip the Scales",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As a reaction when a creature I see within 60 ft ends its turn, I expend a Fate Die to make it repeat that turn exactly (all dice rerolled)"),
			action : [["reaction", ""]]
		}
	}
});

AddSubClass("shaman(laserllama)", "spirit warrior", {
	regExpSearch : /^(?=.*spirit)(?=.*warrior)(?=.*shaman).*$/i,
	subname : "Spirit Warrior",
	fullname : "Spirit Warrior",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : {
			name : "Ancestral Knowledge",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("I gain proficiency with medium armor and martial weapons"),
			armorProfs : [false, true, false, false],
			weaponProfs : [false, true]
		},
		"subclassfeature2.1" : LLSpiritualitySpells("Spirit Warrior", ["heroism", "shield of faith", "spiritual weapon", "totemic cowl", "clairvoyance", "spirit shroud", "guardian of faith", "staggering smite", "contact other plane", "steel wind strike"]),
		"subclassfeature2.2" : {
			name : "Totemic Weapon",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"During a long rest, a 1-hour ritual binds a warrior Spirit to a melee weapon (\"Choose Feature\"; include \"Totemic\" in its name)",
				"I can use Wis instead of Str for it, and its attacks are magical"
			]),
			choices : ["Spirit of Challenge", "Spirit of Draining", "Spirit of Might"],
			"spirit of challenge" : { name : "Totemic Weapon: Challenge", description : LLdesc("A creature I hit with it has disadv. on attacks vs. others than me until the start of my next turn") },
			"spirit of draining" : { name : "Totemic Weapon: Draining", description : LLdesc("Once per turn when I hit with it, I can deal necrotic damage and gain Wis mod (min 1) temp HP") },
			"spirit of might" : { name : "Totemic Weapon: Might", description : LLdesc("While wielding it, I add my Wis mod (min +1) to Str and Con checks and saves") },
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && v.isMeleeWeapon && /totemic/i.test(v.WeaponTextName)) {
							if (Number(What("Wis Mod")) > Number(What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod"))) fields.Mod = 5;
							fields.Description += (fields.Description ? "; " : "") + "Magical";
						}
					},
					"If I include 'Totemic' in a melee weapon's name, it can use Wisdom and counts as magical."
				]
			}
		},
		"subclassfeature6" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I can attack twice when I take the Attack action; after casting a Shaman spell or Totemic Assault with my action, one Totemic Weapon attack as a bonus action"),
			attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			action : [["bonus action", "Totemic Weapon attack"]]
		},
		"subclassfeature10" : {
			name : "Warrior of the Grave",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("As a reaction after I take damage, I gain temp HP equal to the damage taken"),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature14" : {
			name : "Spiritual Champion",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"As a bonus action, I'm possessed for 1 min: Dash as a bonus action, resist non-silvered B/P/S,",
				"once per turn when I hit with my Totemic Weapon, I apply Totemic Assault; 1/SR, then a Conduit slot"
			]),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", ""]]
		}
	}
});

// Great Beast traits
var LLBestialTraits = [
	["Aggressive", "Dash as a bonus action if it ends closer to a hostile creature it can perceive"],
	["Amphibious", "Breathes air and water; swimming speed equal to walking speed"],
	["Charge", "After moving 20 ft straight, a Claw hit on a smaller creature deals +1d6 and knocks it prone"],
	["Hardened Shell", "+2 AC, but -10 ft speed"],
	["Keen Senses", "Adv. on Wis checks using hearing, sight, or smell"],
	["Large Frame", "Becomes Large; when ridden, it can act independently"],
	["Mighty Leap", "Once per turn, bonus action and 5 ft of movement: 20 ft long or 10 ft high jump without a running start"],
	["Natural Camouflage", "Adv. on Stealth checks to hide in natural environments"],
	["Pack Tactics", "Adv. on attacks vs. creatures within 5 ft of one of its conscious allies"],
	["Powerful Build", "Counts as one size larger for grappling and lifting; speed not halved while grappling"],
	["Savage Grip", "Climbing speed = walking, climbs sheer surfaces and ceilings; adv. on saves vs. being moved, grappled, restrained, or prone"],
	["Strong Jaws", "Bite hit on a smaller creature can grapple it (escape DC = my spell DC); +1d6 Bite damage to it, no Bites on others"],
	["Thermal Vision", "Aware of the location of warm-blooded creatures within 60 ft"],
	["Thick Hide", "Reduces damage taken by 2 (its Con mod), except force, psychic, or radiant"]
];
AddSubClass("shaman(laserllama)", "wild heart", {
	regExpSearch : /^(?=.*wild)(?=.*heart)(?=.*shaman).*$/i,
	subname : "Wild Heart",
	fullname : "Wild Heart",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLSpiritualitySpells("Wild Heart", ["animal friendship", "jump", "locate creature", "pass without trace", "conjure animals", "fear", "dominate beast", "freedom of movement", "hold monster", "tree stride"]),
		"subclassfeature2.1" : {
			name : "Bestial Adaptation",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("My speed increases by 10 ft and I gain climbing and swimming speeds equal to my walking speed"),
			speed : { walk : { spd : "+10", enc : "+10" }, climb : { spd : "walk", enc : "walk" }, swim : { spd : "walk", enc : "walk" } }
		},
		"subclassfeature2.2" : {
			name : "Totemic Wild Shape",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I become the Great Beast for 1 hour (ends as a bonus action or at 0 HP); 1/SR, then a Conduit slot",
					"Medium beast, AC 13 + Prof, speed 40 ft, Str 18, Dex 14, Con 15, darkvision 60 ft; I keep my HP, mental scores, proficiencies, features",
					"I gain " + (2 * n) + " temp HP; +Prof to its Str/Dex/Con checks and saves; I can't cast spells (can concentrate); natural gear merges",
					"Bite: spell attack, 1d6 + Wis piercing; Claw: spell attack, 1d10 + Wis slashing" + (n < 6 ? "" : "; Savage Strikes: two attacks, magical") + (n < 10 ? "" : "; resist B/P/S"),
					"Bestial Traits: as many as my Slot Level (" + Math.max(1, LLShaSlotLvl[Math.min(19, n - 1)]) + "), chosen each transformation" + (n < 14 ? "" : "; bonus action to swap one"),
					"Traits: " + LLBestialTraits.map(function (a) { return a[0]; }).join(", ") + " (see Notes)"
				]);
			}),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", ""]],
			toNotesPage : [{
				name : "Great Beast Bestial Traits",
				note : LLdesc(LLBestialTraits.map(function (a) { return a[0] + ": " + a[1]; }))
			}],
			weaponOptions : [{
				regExpSearch : /^(?=.*great)(?=.*beast)(?=.*bite).*$/i,
				name : "Great Beast Bite",
				source : [["GMB:LL", 0]],
				ability : 5,
				type : "Natural",
				damage : [1, 6, "piercing"],
				range : "Melee",
				description : "Great Beast form only; uses spell attack",
				abilitytodamage : true,
				isAlwaysProf : true
			}, {
				regExpSearch : /^(?=.*great)(?=.*beast)(?=.*claw).*$/i,
				name : "Great Beast Claw",
				source : [["GMB:LL", 0]],
				ability : 5,
				type : "Natural",
				damage : [1, 10, "slashing"],
				range : "Melee",
				description : "Great Beast form only; uses spell attack",
				abilitytodamage : true,
				isAlwaysProf : true
			}]
		},
		"subclassfeature6" : {
			name : "Savage Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("In Great Beast form, I make two Natural Weapon attacks with the Attack action; they count as magical")
		},
		"subclassfeature10" : {
			name : "Mythic Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("In Great Beast form, I resist bludgeoning, piercing, and slashing damage")
		},
		"subclassfeature14" : {
			name : "Legendary Guardian",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("In Great Beast form, as a bonus action, I can replace one Bestial Trait with another"),
			action : [["bonus action", "Swap Bestial Trait"]]
		}
	}
});

AddSubClass("shaman(laserllama)", "witch doctor", {
	regExpSearch : /^(?=.*witch)(?=.*doctor)(?=.*shaman).*$/i,
	subname : "Witch Doctor",
	fullname : "Witch Doctor",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLSpiritualitySpells("Witch Doctor", ["bless", "detect poison & disease", "restoration", "warding bond", "beacon of hope", "revivify", "aura of life", "death ward", "creation", "reincarnate"]),
		"subclassfeature2.1" : {
			name : "Life Bearer",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"My Totemic Assault deals radiant damage; I can instead heal its target (no save) for 2d4 + Wis mod (min 1) HP",
				"Not on constructs or undead; I can heal this way a number of times equal to my Shaman level per long rest"
			]),
			usages : levels.map(function (n) { return n; }),
			recovery : "long rest"
		},
		"subclassfeature2.2" : {
			name : "Totemic Blessing",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc("During a long rest, a 1-hour ritual binds " + (n < 6 ? "one" : n < 10 ? "two" : n < 14 ? "three" : "four") + " of my Totems to willing creatures (one each); they gain, and I lose, their benefits until my next long rest");
			})
		},
		"subclassfeature6" : {
			name : "Benevolent Bearing",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I use my action to cast a Witch Doctor Spell or restore HP, I gain the benefits of the Dodge action")
		},
		"subclassfeature10" : {
			name : "Selfless Ward",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("For each Totem bound to another creature, I gain +1 to saving throws and resistance to one damage type of my choice")
		},
		"subclassfeature14" : {
			name : "Spiritual Awakening",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"My revivify has a 30-ft range, needs no material component, restores 2 \xD7 Shaman level HP, and the target can stand up",
				"When I would make a death save, I can expend a Conduit slot to cast this revivify on myself"
			])
		}
	}
});

// ======================================================================
// LaserLlama - Shaman Expanded v6.0.1.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" and "LaserLlama - Shaman v6.0.1.js" (import them first).

	-INFORMATION-
	Subject:	Class options, "Shaman Expanded"
	Effect:		This script adds 3 Feats, 6 Spiritualities, 10 Totem Spirits, and 5 Elder Spirits for the Shaman,
				plus the Geist Spirit and Spirit Dragon creatures.
				Shaman Expanded v6.0.1 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
*/


if (!ClassList["shaman(laserllama)"] || typeof LLAddTotems !== "function") {
	throw new Error("Please import the 'LaserLlama - Shaman v6.0.1.js' file before importing this file.");
}

// ======================= FEATS =======================

FeatsList["spiritual awakening"] = {
	name : "Spiritual Awakening",
	source : [["GMB:LL", 0]],
	descriptionFull : "You have spent many quiet hours learning to commune with the invisible world of Spirits. You gain the following benefits:\n \u2022 Increase either your Wisdom or Charisma score by 1, up to a maximum of 20.\n \u2022 You learn the mage hand and seance cantrips, but they do not count against your number of Cantrips Known.\n \u2022 You learn the unseen servant spell, and you can cast it at-will without expending a spell slot. When you do so, Wisdom is your spellcasting modifier, and the servant takes the shape of a local Spirit. You can only have one unseen servant conjured at a time. Should you conjure another, the first servant is instantly dispelled.",
	description : "I learn mage hand and seance and can cast unseen servant at will (only one at a time); Wisdom is my spellcasting ability for these. [+1 Wisdom or Charisma]",
	scorestxt : "+1 Wisdom or Charisma",
	spellcastingAbility : 5,
	allowUpCasting : false,
	spellcastingBonus : [{
		name : "Cantrips",
		spells : LLSpellList(["mage hand", "seance"]),
		selection : LLSpellList(["mage hand", "seance"]),
		times : LLSpellList(["mage hand", "seance"]).length
	}, {
		name : "At will",
		spells : LLSpellList(["unseen servant"]),
		selection : LLSpellList(["unseen servant"]),
		firstCol : "atwill"
	}]
};
FeatsList["totemic spirit"] = {
	name : "Totemic Spirit",
	source : [["GMB:LL", 0]],
	descriptionFull : "You have formed a connection with one of the minor Spirits bound to the material world. You gain the following benefits:\n \u2022 Increase your Wisdom, Charisma, or Constitution score by 1, up to a maximum of 20.\n \u2022 You gain the benefits of one Totem Spirit of your choice from those available to the Shaman class. You must meet all prerequisites in order to learn that Totem Spirit.\n \u2022 Whenever you gain a level, you can replace your Totem Spirit with another Totem Spirit of your choice that you also meet all the prerequisites for.",
	description : "I gain the benefits of one Shaman Totem Spirit whose prerequisites I meet (see Notes; Shaman level refers to my character level); I can replace it whenever I gain a level. [+1 Wisdom, Charisma, or Constitution]",
	scorestxt : "+1 Wisdom, Charisma, or Constitution",
	toNotesPage : [{
		name : "Totemic Spirit feat: Totem Spirits",
		note : LLdesc(LLTotemSpirits.map(function (a) { return a[0] + (a[1] || a[2] ? " [" + (a[1] ? "lvl " + a[1] : "") + (a[1] && a[2] ? ", " : "") + (a[2] ? a[2] + " Focus" : "") + "]" : "") + ": " + a[3]; }))
	}]
};
FeatsList["wise one"] = {
	name : "Wise One",
	source : [["GMB:LL", 0]],
	descriptionFull : "You find ways to learn from every experience in life, always growing in wisdom. You gain the benefits on the table below that correspond to your current Wisdom modifier and lower. Should your Wisdom modifier increase, the benefits that you gain from this Feat also increase with your modifier:\n +1: You gain proficiency with one set of artisan's tools of your choice.\n +2: You can make Wisdom (Persuasion) checks in place of Charisma (Persuasion) checks.\n +3: You gain proficiency in either Insight, Medicine, or Perception.\n +4: When you make a Wisdom (Insight) check, you treat a d20 roll of 7 or lower as an 8.\n +5: You have advantage on saving throws to resist enchantment and illusion spells.",
	description : "Based on my Wis mod: +1 artisan's tools proficiency; +2 Wis for Persuasion; +3 proficiency in Insight, Medicine, or Perception; +4 Insight d20 rolls of 7 or lower count as 8; +5 adv. on saves vs. enchantment and illusion spells.",
	toolProfs : [["Artisan's tools", 1]],
	skillstxt : "With Wis mod +3 or higher: choose one from Insight, Medicine, or Perception"
};

// ======================= SPIRITUALITIES =======================

AddSubClass("shaman(laserllama)", "astrologer", {
	regExpSearch : /^(?=.*astrologer)(?=.*shaman).*$/i,
	subname : "Astrologer",
	fullname : "Astrologer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLSpiritualitySpells("Astrologer", ["ceremony", "guiding bolt", "augury", "moonbeam", "daylight", "hypnotic pattern", "divination", "guardian of faith", "commune", "wall of light"]),
		"subclassfeature2.1" : {
			name : "Celestial Guidance",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("I gain History proficiency; History checks about legend or myth use Wis and add double Prof; I can't get lost while I see the stars"),
			skills : ["History"]
		},
		"subclassfeature2.2" : {
			name : "Totemic Radiance",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"My Totemic Assault deals radiant damage; on a failed save, I apply " + (n < 14 ? "one Constellation" : "two Constellations") + " until my next turn:",
					"Champion: disadv. on attacks vs. one creature within 30 ft of it; Leviathan: Totemic Assault uses d12s",
					"Maiden: it sheds 5-ft bright light, disadv. to Hide; Sage: it subtracts 1d4 from its next check or save"
				]);
			})
		},
		"subclassfeature6" : {
			name : "Lure of the Heavens",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I walk 1 inch above the ground, leaving no tracks; I can walk over liquids and dangerous surfaces")
		},
		"subclassfeature10" : {
			name : "Celestial Jaunt",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When a Large or smaller creature fails its save vs. Totemic Assault, I can forgo damage to teleport it to a flat space I see within 30 ft"),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Radiant Burst",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Once per long rest, I cast crown of stars at 7th level without a slot; Totemic Radiance applies two Constellations"),
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : [{ name : "Radiant Burst", spells : LLSpellList(["crown of stars"]), selection : LLSpellList(["crown of stars"]), firstCol : "oncelr" }]
		}
	}
});

AddSubClass("shaman(laserllama)", "blood priest", {
	regExpSearch : /^(?=.*blood)(?=.*priest)(?=.*shaman).*$/i,
	subname : "Blood Priest",
	fullname : "Blood Priest",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLSpiritualitySpells("Blood Priest", ["false life", "ray of sickness", "hold person", "ray of enfeeblement", "bestow curse", "slow", "death ward", "dominate beast", "contagion", "hold monster"]),
		"subclassfeature2.1" : {
			name : "Blood Totems",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"I have " + (n < 14 ? "1 Blood Totem" : "3 Blood Totems") + " (not counted as Bound Totems); after a long rest, I can trade Bound Totems for more",
					"When I deal necrotic, piercing, or slashing damage to a creature within " + (n < 10 ? "10 ft" : "10 ft (any distance with Totemic Assault)") + ", a held Blood Totem gains " + (n < 14 ? "half the damage" : "the damage (Cruel Implements: not halved)") + " as HP",
					"Max 25 HP; when full, I expend it all to cast a Blood Priest spell at my Slot Level without a slot or material components",
					"Not vs. constructs, undead, or bloodless creatures; stored HP vanish at the end of a long rest"
				]);
			})
		},
		"subclassfeature2.2" : {
			name : "Cruel Implements",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("I gain proficiency with all melee weapons that deal piercing or slashing damage"),
			weaponProfs : [false, false, ["Piercing/slashing melee weapons"]],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.isMeleeWeapon && !v.isSpell && /piercing|slashing/i.test(fields.Damage_Type)) {
							fields.Proficiency = true;
							if (classes.known["shaman(laserllama)"] && classes.known["shaman(laserllama)"].level >= 6) fields.Description += (fields.Description ? "; " : "") + "Magical";
						}
					},
					"I'm proficient with all melee weapons that deal piercing or slashing damage; from 6th level, they count as magical."
				]
			}
		},
		"subclassfeature2.3" : {
			name : "Sanguine Shield",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("As a reaction when I take damage while holding a Blood Totem, it takes the damage instead (excess carries over to me)"),
			action : [["reaction", ""]]
		},
		"subclassfeature6" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I can attack twice when I take the Attack action; after casting a Shaman spell or Totemic Assault with my action, one melee attack as a bonus action"),
			attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			action : [["bonus action", "Melee attack (after spell/Totemic Assault)"]]
		},
		"subclassfeature10" : {
			name : "Sanguine Curse",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("A Blood Priest spell cast from a Blood Totem can force a Con save instead (with disadv. if the Totem holds the target's blood)")
		},
		"subclassfeature14" : {
			name : "Crimson Ascendant",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("HP harvested with Cruel Implements aren't halved; I start with three Blood Totems")
		}
	}
});

AddSubClass("shaman(laserllama)", "elementalist", {
	regExpSearch : /^(?=.*elementalist)(?=.*shaman).*$/i,
	subname : "Elementalist",
	fullname : "Elementalist",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : {
			name : "Elemental Sage",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"During a long rest, a 1-hour ritual attunes me to an Elemental Spirit until my next long rest (\"Choose Feature\")",
				"I resist its damage type and always have its Elementalist Spells prepared (not counted against my prepared spells)"
			]),
			choices : ["Air", "Earth", "Fire", "Water"],
			"air" : {
				name : "Elemental Sage: Air",
				description : LLdesc([
					"I resist thunder damage; my Totemic Assault deals thunder and pushes a failed target up to 15 ft (-5 ft per size above Medium)",
					"From 6th level, I can Dash as a bonus action and opportunity attacks vs. me have disadv. while I Dash"
				]),
				dmgres : ["Thunder"],
				spellcastingExtra : LLSpellList(["thunderwave", "shatter", "lightning bolt", "storm sphere", "control winds"]),
				action : [["bonus action", "Dash (Air, 6th level)"]]
			},
			"earth" : {
				name : "Elemental Sage: Earth",
				description : LLdesc([
					"I resist bludgeoning damage; my Totemic Assault deals bludgeoning and knocks a failed Large or smaller target prone",
					"From 6th level, I add my Wis mod (min +1) to Strength checks and saves"
				]),
				dmgres : ["Bludgeoning"],
				spellcastingExtra : LLSpellList(["earth tremor", "earthen grasp", "erupting earth", "stone shape", "wall of stone"])
			},
			"fire" : {
				name : "Elemental Sage: Fire",
				description : LLdesc([
					"I resist fire damage; my Totemic Assault deals fire damage and its damage dice become d12s",
					"From 6th level, I add my Wis mod (min +1) to saves vs. being charmed or frightened"
				]),
				dmgres : ["Fire"],
				spellcastingExtra : LLSpellList(["burning hands", "flaming sphere", "fireball", "wall of fire", "immolation"])
			},
			"water" : {
				name : "Elemental Sage: Water",
				description : LLdesc([
					"I resist cold damage; my Totemic Assault deals cold, and a failed target can't react and has -10 ft speed until my next turn",
					"From 6th level, I gain a swimming speed equal to my walking speed and can hold my breath for 1 hour"
				]),
				dmgres : ["Cold"],
				spellcastingExtra : LLSpellList(["torrent", "snowball swarm", "tidal wave", "ice storm", "cone of cold"])
			}
		},
		"subclassfeature2.1" : {
			name : "Totemic Destruction",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("My Totemic Assault gains the damage type and effect of my current Elemental Spirit (see Elemental Sage)")
		},
		"subclassfeature6" : {
			name : "Elemental Wrath",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"I bind a Spirit of Wrath not counted against my Bound Totems (another Totem if I already have it)",
				"Its bonus damage also applies to Shaman spells and features dealing my Elemental Spirit's damage type"
			])
		},
		"subclassfeature6.1" : {
			name : "Elemental Empowerment",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I gain my current Elemental Spirit's 6th-level benefit (see Elemental Sage)")
		},
		"subclassfeature10" : {
			name : "Primordial Conduit",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"Once per short rest, I cast an Elementalist Spell at my Slot Level without a slot",
				"When I deal my Elemental Spirit's damage type, I gain temp HP equal to half the damage dealt to a single target"
			]),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature14" : {
			name : "Elder Elemental Spirits",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"I also gain the Elder Spirit of my Elemental Spirit: Air: Storm, Earth: Fissure, Fire: Inferno, Water: Sea",
				"I can still cast only one Elder Spirit spell of each level per long rest"
			])
		},
		"subclassfeature14.1" : {
			name : "Master of the Elements",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"As a bonus action for 1 min: fly speed = walking; resist bludgeoning, cold, fire, thunder; Totemic Assault picks any element's effect",
				"Reaction when a creature moves within 10 ft or hits me: Dex save or Totemic Assault effects; 1/LR, then a Conduit slot"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["bonus action", ""], ["reaction", "Master of the Elements"]]
		}
	}
});

AddSubClass("shaman(laserllama)", "idolater", {
	regExpSearch : /^(?=.*idolater)(?=.*shaman).*$/i,
	subname : "Idolater",
	fullname : "Idolater",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLSpiritualitySpells("Idolater", ["bless", "fog cloud", "healing spirit", "spike growth", "beacon of hope", "sleet storm", "aura of life", "summon construct", "antilife shell", "control winds"]),
		"subclassfeature2.1" : {
			name : "Totemic Idol",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"In 1 hour (can be a rest), I craft a Small stone Idol (" + (n < 14 ? "max 1" : "max 2") + "): AC = my spell DC, HP 10 + Shaman level, resists nonmagical B/P/S",
					"As an action, I plant it and cast a 1-action/bonus action concentration Shaman spell through it; it doesn't need my concentration",
					"Self spells center on the Idol; it lasts until the Idol is destroyed or moved; targets 60+ ft away from it lose the effect"
				]);
			}),
			toolProfs : ["Mason's tools"],
			action : [["action", "Plant Totemic Idol"]]
		},
		"subclassfeature6" : {
			name : "Spiritual Vortex",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("My Totemic Assault can target my planted Idol: chosen creatures within 20 ft of it make the Cha save; a planted Idol is immune to nonmagical B/P/S")
		},
		"subclassfeature10" : {
			name : "Guardian Idol",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"As an action, I cast summon construct (stone) on my Idol at my Slot Level, without a slot, component, or concentration",
				"It gains temp HP equal to the Idol's HP; I can use Spiritual Vortex on it; when it ends, the Idol is destroyed"
			]),
			action : [["action", ""]]
		},
		"subclassfeature14" : {
			name : "High Idolater",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("I can have two active Idols (one Guardian); when one is destroyed, chosen creatures within 30 ft make a Dex save or suffer Totemic Assault (half damage on a success)")
		}
	}
});

AddSubClass("shaman(laserllama)", "spirit guide", {
	regExpSearch : /^(?=.*spirit)(?=.*guide)(?=.*shaman).*$/i,
	subname : "Spirit Guide",
	fullname : "Spirit Guide",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : {
			name : "Totemic Bond",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I bond with a Geist (see Companion page); during a long rest, a 1-hour ritual conjures or fully heals it",
				"At 0 HP it's banished; as an action, I expend a Conduit slot to conjure it at full HP within 5 ft",
				"It acts on my turn and takes the Dodge action unless I use a bonus action to command it"
			]),
			action : [["bonus action", "Command Geist"], ["action", "Conjure Geist (Conduit slot)"]],
			creaturesAdd : [["Geist Spirit"]]
		},
		"subclassfeature2.1" : LLSpiritualitySpells("Spirit Guide", ["ghastly flight", "shield of faith", "spiritual weapon", "warding bond", "spectral passage", "spirit guardians", "death ward", "guardian of faith", "arcane hand", "wall of light"]),
		"subclassfeature6" : {
			name : "Spectral Empowerment",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc("As a bonus action, I touch my Geist to merge with it and gain the benefits of spectral passage; we separate when it ends" + (n < 14 ? "" : " (no concentration; I resist all damage but force, psychic, radiant, and thunder)"));
			}),
			action : [["bonus action", ""]]
		},
		"subclassfeature10" : {
			name : "Soul Bound",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("As a bonus action, I swap places with my Geist within 120 ft that I see; as a reaction when either of us takes damage, swap and the other takes it"),
			action : [["bonus action", ""], ["reaction", "Soul Bound"]]
		},
		"subclassfeature14" : {
			name : "Ethereal Mastery",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("My Geist flies normally and is always under spectral passage; Spectral Empowerment needs no concentration and I gain resistances")
		}
	}
});
CreatureList["geist spirit"] = {
	name : "Geist Spirit",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Undead",
	alignment : "Unaligned",
	ac : "13+Prof",
	hp : 10,
	hd : [1, 8],
	hdLinked : ["shaman(laserllama)"],
	minlevelLinked : ["shaman(laserllama)"],
	speed : "0 ft, fly 30 ft (hover)",
	scores : [6, 14, 11, 8, 16, 13],
	senses : "",
	passivePerception : 13,
	languages : "understands the languages of its Spirit Guide, but can't speak",
	challengeRating : "0",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	attacksAction : 1,
	attacks : [{
		name : "Spectral Grasp",
		ability : 5,
		damage : [1, 8, "Totemic"],
		range : "Melee (5 ft)",
		description : "Melee spell attack; instead of this damage, the target suffers the effects of its Shaman's Totemic Assault",
		abilitytodamage : false,
		useSpellMod : "shaman(laserllama)"
	}],
	traits : [{
		name : "Conduit",
		description : "Whenever its Shaman casts a Shaman spell, the spell can originate from the Geist."
	}, {
		name : "Ethereal Bond",
		description : "It adds its Shaman's PB to any ability check or saving throw it makes."
	}, {
		name : "Ghastly Glide",
		description : "It can fly only up to 10 ft above a surface (until its Shaman reaches 14th level: Ethereal Mastery)."
	}, {
		name : "Totem Bearer",
		description : "When conjured, its Shaman can transfer any number of Bound Totems to it; the Geist gains their benefits and the Shaman loses them until the end of the next long rest."
	}],
	calcChanges : {
		hp : function (totalHD, HDobj, prefix) {
			if (!classes.known["shaman(laserllama)"]) return;
			var lvl = classes.known["shaman(laserllama)"].level;
			HDobj.alt.push(5 + 5 * lvl);
			HDobj.altStr.push(" = 5 as a base\n + 5 \xD7 " + lvl + " from five times its Shaman's level (" + (5 * lvl) + ")");
		},
		setAltHp : true
	}
};

AddSubClass("shaman(laserllama)", "wyrmbound", {
	regExpSearch : /^(?=.*wyrmbound)(?=.*shaman).*$/i,
	subname : "Wyrmbound",
	fullname : "Wyrmbound",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : {
			name : "Draconic Conduit",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("I can speak, read, and write Draconic; I add my Wis mod (min +1) to Charisma checks to interact with dragons"),
			languageProfs : ["Draconic"]
		},
		"subclassfeature2.1" : {
			name : "Totemic Wyrmshape",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I become a Spirit Dragon for 1 min (see Companion page), gaining my Shaman level in temp HP" + (n < 14 ? "" : " (1/SR or with a Conduit slot)"),
					"I keep my HP, mental scores, proficiencies, and features; I can't cast spells but can keep concentrating; natural gear merges",
					"I can still use Totemic Assault and my Bound Totems; ends as a bonus action or at 0 HP; " + (n < 14 ? "1/SR, then a Conduit slot" : "Flawless Conduit: at will")
				]);
			}),
			usages : levels.map(function (n) { return n < 14 ? 1 : "\u221E\xD7 per "; }),
			recovery : "short rest",
			action : [["bonus action", ""]],
			creaturesAdd : [["Spirit Dragon"]]
		},
		"subclassfeature2.2" : LLSpiritualitySpells("Wyrmbound", ["chromatic orb", "command", "dragon's breath", "suggestion", "fear", "spectral passage", "dominate beast", "polymorph", "geas", "summon draconic spirit"]),
		"subclassfeature6" : {
			name : "Ancient Fury",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As a Spirit Dragon, I make two Spectral Slashes with the Attack action (one can be Spirit Breath); after a Totemic Assault action, one Slash as a bonus action"),
			action : [["bonus action", "Spectral Slash (after Totemic Assault)"]]
		},
		"subclassfeature10" : {
			name : "Serpentine Speed",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I can Dash as a bonus action; when I do, opportunity attacks against me have disadvantage"),
			action : [["bonus action", "Dash"]]
		},
		"subclassfeature14" : {
			name : "Flawless Conduit",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("I can become a Spirit Dragon at will; I gain the temp HP only once per short rest (or by expending a Conduit slot)")
		},
		"subclassfeature14.1" : {
			name : "Exalted Spirit Dragon",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Once per long rest, I become an Exalted Spirit Dragon (Large or Huge) for 1 min (see Companion page); I can cast Shaman spells in this form"),
			usages : 1,
			recovery : "long rest",
			creaturesAdd : [["Exalted Spirit Dragon"]]
		}
	}
});
var LLSpiritDragonTraits = [{
	name : "Ethereal Agility",
	description : "Whenever it makes an ability check or saving throw using Dexterity, it adds its Shaman's Wisdom modifier to the result."
}];
CreatureList["spirit dragon"] = {
	name : "Spirit Dragon",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Dragon",
	alignment : "",
	ac : "14+Prof",
	hp : 1,
	hd : [1, 10],
	speed : "10 ft, fly 30 ft",
	scores : [8, 18, 12, 10, 10, 10],
	damage_resistances : "necrotic, poison",
	senses : "Blindsight 10 ft, Darkvision 60 ft",
	passivePerception : 10,
	languages : "Draconic",
	challengeRating : "0",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	attacksAction : 1,
	attacks : [{
		name : "Spectral Slash",
		ability : 5,
		damage : [2, 4, "necrotic"],
		modifiers : ["", "oWis"],
		abilitytodamage : false,
		range : "Melee (5 ft)",
		description : "Uses its Shaman's spell attack modifier; from 6th level, two attacks with the Attack action",
		useSpellMod : "shaman(laserllama)"
	}, {
		name : "Spirit Breath",
		ability : 5,
		damage : [1, 8, "Totemic"],
		range : "30-ft line",
		description : "Dex save; failure: Totemic Assault (its damage dice and effects); success: half damage, no extra effects",
		dc : true,
		useSpellMod : "shaman(laserllama)"
	}],
	traits : LLSpiritDragonTraits.concat([{
		name : "Serpentine",
		description : "It counts as Medium for carrying capacity, the spaces it can move through, and all features except the space it occupies."
	}, {
		name : "Wyrmshape",
		description : "The Shaman keeps their HP, Int/Wis/Cha, skill and save proficiencies, and features; INT, WIS, and CHA above are placeholders."
	}])
};
CreatureList["exalted spirit dragon"] = {
	name : "Exalted Spirit Dragon",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Dragon",
	alignment : "",
	ac : "15+Prof",
	hp : 1,
	hd : [1, 10],
	speed : "30 ft, fly 60 ft",
	scores : [12, 20, 16, 10, 10, 10],
	damage_resistances : "necrotic, poison; bludgeoning, piercing, and slashing from nonmagical attacks",
	senses : "Blindsight 20 ft, Darkvision 120 ft",
	passivePerception : 10,
	languages : "Draconic",
	challengeRating : "0",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	attacksAction : 2,
	attacks : [{
		name : "Spectral Slash",
		ability : 5,
		damage : [2, 6, "necrotic"],
		modifiers : ["", "oWis"],
		abilitytodamage : false,
		range : "Melee (5 ft)",
		description : "Uses its Shaman's spell attack modifier",
		useSpellMod : "shaman(laserllama)"
	}, {
		name : "Spirit Breath",
		ability : 5,
		damage : [1, 8, "Totemic"],
		range : "60-ft line or 30-ft cone",
		description : "Dex save; failure: Totemic Assault (its damage dice and effects); success: half damage, no extra effects",
		dc : true,
		useSpellMod : "shaman(laserllama)"
	}],
	traits : LLSpiritDragonTraits.concat([{
		name : "Serpentine",
		description : "It counts as one size smaller for carrying capacity, the spaces it can move through, and all features except the space it occupies (Large or Huge, chosen on transforming)."
	}, {
		name : "Exalted",
		description : "The Shaman can cast Shaman spells as normal in this form."
	}])
};

// ======================= TOTEM & ELDER SPIRITS =======================

LLTotemSpirits = LLTotemSpirits.concat([
	["Spirit of Blight", 7, "", "My Shaman spells and Totemic Assault can deal poison damage; then I can reduce Totemic Assault by 1d8 to force a Con save instead: blinded until my next turn"],
	["Spirit of Corrosion", 7, "", "My Shaman spells and Totemic Assault can deal acid damage; then I can reduce Totemic Assault by 1d8 to lower the target's AC by 2 (min 10) until my next turn"],
	["Spirit of Drought", 7, "", "My Shaman spells and Totemic Assault can deal fire damage; then I can reduce Totemic Assault by 1d8 to deal Wis mod fire damage to all within 5 ft of the target"],
	["Spirit of Frost", 7, "", "My Shaman spells and Totemic Assault can deal cold damage; then I can reduce Totemic Assault by 1d8 to force a Str save instead: speed 0 until my next turn"],
	["Spirit of Lightning", 7, "", "My Shaman spells and Totemic Assault can deal lightning damage; then a Totemic Assault target can't take reactions until my next turn"],
	["Spirit of Servitude", 7, "", "This Totem is always under the tiny servant spell; if reduced to 0 HP, it regenerates at the end of my next rest"],
	["Spirit of Midnight", 9, "", "Once per long rest (short rest from 15th level), I expend a Conduit slot to cast summon shadowspawn; the Totem replaces its components", { usages : 1, recovery : "long rest", spellcastingBonus : [{ name : "Spirit of Midnight", spells : LLSpellList(["summon shadowspawn"]), selection : LLSpellList(["summon shadowspawn"]) }] }],
	["Spirit of the Guardian", 15, "", "Once per short rest, I expend a Conduit slot to cast summon construct (clay or stone only); the Totem replaces its components", { usages : 1, recovery : "short rest", spellcastingBonus : [{ name : "Spirit of the Guardian", spells : LLSpellList(["summon construct"]), selection : LLSpellList(["summon construct"]) }] }],
	["Spirit of Judgment", 15, "", "Once per short rest, I expend a Conduit slot to cast summon celestial; the Totem replaces its components", { usages : 1, recovery : "short rest", spellcastingBonus : [{ name : "Spirit of Judgment", spells : LLSpellList(["summon celestial"]), selection : LLSpellList(["summon celestial"]) }] }],
	["Spirit of Purgation", 15, "", "Once per short rest, I expend a Conduit slot to cast summon greater demon; the Totem replaces its components", { usages : 1, recovery : "short rest", spellcastingBonus : [{ name : "Spirit of Purgation", spells : LLSpellList(["summon greater demon"]), selection : LLSpellList(["summon greater demon"]) }] }]
]);
LLElderSpirits = LLElderSpirits.concat([
	["Elder Spirit of the Fissure", ["bones of the earth", "symbol", "earthquake", "invulnerability"], "From the Plane of Earth"],
	["Elder Spirit of the Inferno", ["investiture of flame", "fire storm", "incendiary cloud", "meteor swarm"], "From the Plane of Fire"],
	["Elder Spirit of the Mystic", ["true seeing", "divine word", "holy aura", "foresight"], "Souls of powerful Shamans"],
	["Elder Spirit of the Sea", ["freezing sphere", "etherealness", "tsunami", "invulnerability"], "From the Plane of Water"],
	["Elder Spirit of the Storm", ["chain lightning", "whirlwind", "control weather", "storm of vengeance"], "From the Plane of Air"]
]);
LLAddTotems();
LLAddElderSpirits();

// ======================================================================
// LaserLlama - Shifter v2.1.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).
	The Beast Shapes are in "LaserLlama - Compendium of Beasts v3.1.0.js" (optional; add them on the Wild Shape pages).

	-INFORMATION-
	Subject:	Class, "Shifter"
	Effect:		This script adds the Shifter class and its 7 Bloodlines.
				Shifter v2.1.0 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Shifter" in the Class field (e.g. "Carnivore Shifter")
*/


if (typeof LLAddFightingStyles !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

LLShfMaxCR = ["0", "1/4", "1/2", "1", "1", "1", "2", "2", "2", "3", "3", "3", "4", "4", "5", "5", "5", "6", "6", "6"];
LLShfSurgeTxt = "Adrenaline Surge";
// Bloodline traits builder: natural armor & natural weapons
LLShfNatural = function (sBloodline, sAC, bNoDex, aDmg, sAbiTxt, nAbi, sProps) {
	var oRet = {
		armorOptions : [{
			regExpSearch : new RegExp("^(?=.*" + sBloodline.toLowerCase() + ")(?=.*natural)(?=.*armou?r).*$", "i"),
			name : sBloodline + " Natural Armor",
			source : [["GMB:LL", 0]],
			ac : sAC,
			dex : bNoDex ? -10 : undefined,
			affectsWildShape : true,
			selectNow : true
		}],
		weaponOptions : [{
			regExpSearch : new RegExp("^(?=.*" + sBloodline.toLowerCase() + ")(?=.*natural)(?=.*weapon).*$", "i"),
			name : sBloodline + " Natural Weapon",
			source : [["GMB:LL", 0]],
			ability : nAbi,
			type : "Natural",
			damage : aDmg,
			range : "Melee",
			description : sProps + (sProps ? "; " : "") + "magical from 5th level",
			abilitytodamage : true,
			isAlwaysProf : true,
			selectNow : true
		}]
	};
	if (!bNoDex) delete oRet.armorOptions[0].dex;
	return oRet;
};
LLShfBloodlineFea = function (sName, oNat, aTraits, oExtra) {
	var o = {
		name : sName,
		source : [["GMB:LL", 0]],
		minlevel : 1,
		description : LLdesc(["When not in Beast Shape, I have these traits:"].concat(aTraits))
	};
	for (var p in oNat) o[p] = oNat[p];
	if (oExtra) for (var q in oExtra) o[q] = oExtra[q];
	return o;
};
LLShfShapes = function (sBloodline, sList) {
	return {
		name : sBloodline + " Shapes",
		source : [["GMB:LL", 0]],
		minlevel : 1,
		description : LLdesc("All Beasts with the " + sBloodline + " subtype are my Bloodline Shapes (see Notes)"),
		toNotesPage : [{
			name : sBloodline + " Bloodline Shapes (Compendium of Beasts)",
			note : LLdesc(sList.split("; "))
		}]
	};
};

ClassList["shifter(laserllama)"] = {
	name : "Shifter",
	regExpSearch : /^(?=.*shifter).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Constitution",
	prereqs : "Constitution 13",
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Str", "Dex"],
	abilitySave : 3,
	skillstxt : {
		primary : "Choose two from Acrobatics, Animal Handling, Athletics, Nature, Perception, Stealth, and Survival"
	},
	armorProfs : {
		primary : [true, false, false, false]
	},
	weaponProfs : {
		primary : [true, false, ["blowgun", "longbow", "net"]],
		secondary : [true, false]
	},
	equipment : "Shifter starting equipment:" +
		"\n \u2022 Two clubs -or- a greatclub -or- a quarterstaff;" +
		"\n \u2022 A shortbow and 20 arrows -or- four javelins;" +
		"\n \u2022 Leather armor, a dagger, and an explorer's pack." +
		"\n\nAlternatively, choose 2d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Bloodline", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature1" : {
			name : "Bloodline",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc('Choose the Bloodline that represents my primal abilities and put it in the "Class" field ')
		},
		"wild shape" : {
			name : "Wild Shape",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n, idx) {
				return LLdesc([
					"As a bonus action, I Shift into a known Beast Shape (max CR " + LLShfMaxCR[idx] + "); I revert as a bonus action, when incapacitated, or after 1 hour",
					"I keep my alignment, personality, HP, Int/Wis/Cha, skill and save proficiencies, and features; I can't cast spells but keep concentration",
					"I learn one Bloodline Shape each time my Max CR increases; Diminutive shapes revert when I take damage or fail a save",
					"Mystic Empowerment: Beast Shapes can use my Shifter save DC and attack modifier (Prof + my Con mod) if higher",
					"Natural Armor: unless better, my Bloodline's Natural Armor AC applies (using my normal ability scores); natural gear merges"
				]);
			}),
			additional : levels.map(function (n, idx) { return "Max CR " + LLShfMaxCR[idx]; }),
			action : [["bonus action", "Shift / Revert"]]
		},
		"primal bond" : {
			name : "Primal Bond",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I can verbally communicate with and understand Beasts (limited by their Intelligence)",
				"As an action, I touch a live, non-hostile Beast within my Max CR to learn its Beast Shape (no limit)"
			]),
			action : [["action", "Learn Beast Shape"]]
		},
		"bestial instincts" : {
			name : "Bestial Instincts",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("If not incapacitated or surprised, I have adv. on initiative and can Shift into a Beast Shape when I roll it"),
			advantages : [["Initiative", true]]
		},
		"feral warrior" : {
			name : "Feral Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"After I Dash or Disengage with my action, I can make one Natural Weapon attack as a bonus action",
				"With the Attack action in normal form, I make two Natural Weapon attacks; in Beast Shape I use two of its actions (Multiattack once per turn)"
			]),
			action : [["bonus action", "Natural Weapon (after Dash/Disengage)"]]
		},
		"mystic strikes" : {
			name : "Mystic Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("My Natural Weapon attacks, in normal form and Beast Shape, count as magical"),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.theWea && v.theWea.type === "Natural" && !v.isSpell && !/magical/i.test(fields.Description)) fields.Description += (fields.Description ? "; " : "") + "Magical";
					},
					"My Natural Weapon attacks count as magical."
				]
			}
		},
		"adrenaline surge" : {
			name : "Adrenaline Surge",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc([
					"As a reaction when I take damage, I gain temp HP equal to the damage taken (they last 1 minute)",
					n < 10 ? "" : "Primal Resilience: when I fail a save, I can expend a use to add my normal form's Con mod (min +1)",
					n < 20 ? "" : "Force of Nature: I regain one use at the start of each of my turns in combat"
				]);
			}),
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "short rest",
			action : [["reaction", ""]]
		},
		"wild awareness" : {
			name : "Wild Awareness",
			source : [["GMB:LL", 0]],
			minlevel : 9,
			description : LLdesc("When I finish a short or long rest, I gain the benefits of the commune with nature spell")
		},
		"primal resilience" : {
			name : "Primal Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I fail a saving throw, I can expend an Adrenaline Surge to add my normal form's Con mod (min +1) to the roll")
		},
		"primeval form" : {
			name : "Primeval Form",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : levels.map(function (n) {
				return LLdesc([
					(n < 17 ? "When I Shift into a Bloodline Shape, I can infuse it with primeval power:" : "Primeval Resurgence: any time I Shift into a Bloodline Shape, it gains:"),
					"One size larger (if room), resistance to nonmagical B/P/S, and adv. on Str and Dex checks and saves"
				]);
			}),
			usages : levels.map(function (n) { return n < 17 ? 3 : ""; }),
			recovery : levels.map(function (n) { return n < 17 ? "long rest" : ""; }),
			additional : levels.map(function (n) { return n < 11 ? "" : n < 17 ? "regain 1 use on a short rest" : "at will"; })
		},
		"feral senses" : {
			name : "Feral Senses",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("I can't have disadvantage on Natural Weapon attacks against targets within 30 ft of me")
		},
		"mythic forms" : {
			name : "Mythic Forms",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : levels.map(function (n) {
				return LLdesc(n < 20 ? "I can Shift into each Beast Shape I know of CR 5 or higher only once per short or long rest" : "Force of Nature: I can Shift into Beast Shapes of CR 5 and 6 without limit");
			})
		},
		"primeval resurgence" : {
			name : "Primeval Resurgence",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("I can gain the benefits of Primeval Form any time I Shift into a Bloodline Shape")
		},
		"force of nature" : {
			name : "Force of Nature",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("I Shift into CR 5 and 6 Beast Shapes without limit; in combat, I regain one Adrenaline Surge at the start of each of my turns")
		}
	}
};

// ======================= BLOODLINES =======================

AddSubClass("shifter(laserllama)", "aquatic", {
	regExpSearch : /^(?=.*aquatic)(?=.*shifter).*$/i,
	subname : "Aquatic Bloodline",
	fullname : "Aquatic Shifter",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLShfBloodlineFea("Aquatic Adaptation", LLShfNatural("Aquatic", "10+Con", false, [1, 6, "slashing"], "", 0, "Finesse, light"), [
			"Darkvision 60 ft (doubled underwater); Natural Armor: AC 10 + Dex mod + Con mod",
			"Natural Weapons (fins/claws): finesse, light, 1d6 slashing",
			"Cold resistance, immune to deep water's negative effects; I breathe air and water, swim speed = walking speed"
		], {
			vision : [["Darkvision", 60]],
			dmgres : ["Cold"],
			speed : { swim : { spd : "walk", enc : "walk" } }
		}),
		"subclassfeature1.1" : LLShfShapes("Aquatic", "CR 0: Crab, Fish, Octopus; CR 1/8: Crab (Giant), Dolphin, Piranha; CR 1/4: Electric Eel, Fish (Giant), Reef Shark; CR 1/2: Walrus; CR 1: Octopus (Giant); CR 2: Hunter Shark; CR 3: Electric Eel (Giant), Killer Whale; CR 4: Walrus (Giant); CR 5: Crab (Colossal), Giant Squid; CR 6: Shark (Giant)"),
		"subclassfeature7" : {
			name : "Crushing Force",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : levels.map(function (n) {
				var d = n < 13 ? 10 : n < 18 ? 20 : 30;
				return LLdesc("Once per turn when I hit with a Natural Weapon, the target makes a Str save (adv. if larger) or is pushed " + d + " ft or has -" + d + " ft speed until its next turn" + (n < 18 ? "" : "; underwater, I can instead give it 1 level of exhaustion"));
			})
		},
		"subclassfeature13" : {
			name : "Mystical Waters",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("When I Shift into a Bloodline Shape, I can expend an Adrenaline Surge: it gains a fly speed equal to its swim speed and treats air as water")
		},
		"subclassfeature18" : {
			name : "Terror of the Deep",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("In a Bloodline Shape underwater, the area within 60 ft (30 ft with Mystical Waters) is difficult terrain for creatures I choose")
		}
	}
});

AddSubClass("shifter(laserllama)", "avian", {
	regExpSearch : /^(?=.*avian)(?=.*shifter).*$/i,
	subname : "Avian Bloodline",
	fullname : "Avian Shifter",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLShfShapes("Avian", "CR 0: Owl, Raven, Rooster; CR 1/8: Hawk, Heron, Vulture; CR 1/4: Falcon, Rooster (Giant); CR 1/2: Emu; CR 1: Eagle, Owl (Giant), Vulture (Giant); CR 2: Emu (Giant), Hawk (Giant); CR 3: Falcon (Giant); CR 4: Heron (Giant); CR 5: Terror Bird; CR 6: Royal Eagle"),
		"subclassfeature1.1" : LLShfBloodlineFea("Avian Anatomy", LLShfNatural("Avian", "10+Con", false, [1, 6, "slashing"], "", 2, "Light; uses Dex"), [
			"Featherweight Frame: Dash as a bonus action; then opportunity attacks vs. me have disadv. and I have adv. on Acrobatics this turn",
			"Natural Armor: AC 10 + Dex mod + Con mod; Natural Weapons (talons): light, 1d6 slashing, use Dex"
		], {
			action : [["bonus action", "Dash (Featherweight Frame)"]]
		}),
		"subclassfeature7" : {
			name : "Swift Wing",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When I Dash without a fly speed, I gain a fly speed equal to my walking speed until the end of my turn; I have adv. on Dex saves while I have a fly speed")
		},
		"subclassfeature13" : {
			name : "Driving Squall",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("As a bonus action in a Bloodline Shape, creatures in a 20-ft cone, 30\xD75-ft line, or 10-ft radius make a Str save or are thrown 20 ft away (halved per size larger)"),
			action : [["bonus action", ""]]
		},
		"subclassfeature18" : {
			name : "Master of the Winds",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("As a bonus action, Driving Squall can create a whirlwind adjacent to me (no concentration, I'm immune); a later bonus action moves it 30 ft"),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", ""]]
		}
	}
});

AddSubClass("shifter(laserllama)", "brute", {
	regExpSearch : /^(?=.*brute)(?=.*shifter).*$/i,
	subname : "Brute Bloodline",
	fullname : "Brute Shifter",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLShfShapes("Brute", "CR 0: Goat, Hare, Monkey; CR 1/8: Camel, Llama, Pony; CR 1/4: Boar, Ox, Stag; CR 1/2: Chimpanzee, Goat (Giant), Horse; CR 1: Aurochs, Gorilla, Giraffe; CR 2: Boar (Giant), Stag (Giant); CR 3: Hippopotamus, Rhinoceros; CR 4: Elephant; CR 5: Sloth (Giant); CR 6: Gorilla (Giant), Mammoth"),
		"subclassfeature1.1" : LLShfBloodlineFea("Brutish Biology", LLShfNatural("Brute", "10+Con+Str", true, [1, 10, "bludgeoning"], "", 1, ""), [
			"Natural Armor: AC 10 + Con mod + Str mod; Natural Weapons (horns/skull): 1d10 bludgeoning",
			"Primal Fortitude: I add my normal form's Con mod (min +1) to Str checks and saves",
			"Stout Frame: my HP maximum increases by 1 per Shifter level"
		], {
			calcChanges : {
				hp : function (totalHD) {
					if (classes.known["shifter(laserllama)"]) return [classes.known["shifter(laserllama)"].level, "Stout Frame (Shifter level)"];
				}
			}
		}),
		"subclassfeature7" : {
			name : "Resilient Hide",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When I start my turn in a Bloodline Shape, I can gain its Con mod (min 1) in temp HP; while I have temp HP, I resist B/P/S damage")
		},
		"subclassfeature13" : {
			name : "Stampede",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc([
				"As an action, I move up to my speed in a line; creatures I pass make a Str save or take bludgeoning (half on a save)",
				"Damage by my size: Tiny 1d12, Small 2d12, Medium 3d12, Large 4d12, Huge 5d12, Gargantuan 6d12; smaller ones fall prone on a failure"
			]),
			action : [["action", ""]]
		},
		"subclassfeature18" : {
			name : "Great Behemoth",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("With Primeval Form, I can become Huge: smaller creatures have disadv. vs. Stampede, Natural Weapons +1d12, resist all but force and psychic"),
			usages : 1,
			recovery : "short rest"
		}
	}
});

AddSubClass("shifter(laserllama)", "carnivore", {
	regExpSearch : /^(?=.*carnivore)(?=.*shifter).*$/i,
	subname : "Carnivore Bloodline",
	fullname : "Carnivore Shifter",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLShfShapes("Carnivore", "CR 0: Cat, Fox; CR 1/8: Hunting Dog, Lynx, Wild Dog; CR 1/4: Panther, Wolf; CR 1/2: Black Bear, Cheetah, Dire Wolf; CR 1: Lion, Tiger, Wild Dog (Giant); CR 2: Grizzly Bear, Polar Bear; CR 3: Saber-Toothed Tiger; CR 4: Cave Bear; CR 5: Dire Tiger; CR 6: Cave Bear (Giant)"),
		"subclassfeature1.1" : LLShfBloodlineFea("Carnivorous Physique", LLShfNatural("Carnivore", "10+Str+Con", true, [1, 6, "slashing"], "", 1, "Finesse, light"), [
			"Natural Armor: AC 10 + Str mod + Con mod; Natural Weapons (claws/fangs): finesse, light, 1d6 slashing",
			"Primal Senses: on smell-based ability checks, a d20 roll of 7 or lower counts as 8"
		]),
		"subclassfeature1.2" : {
			name : "Prey Drive",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				var c = n < 13 ? "19-20" : n < 18 ? "18-20" : "17-20";
				return LLdesc([
					"When I Shift into a Bloodline Shape, I can mark a hostile creature I see as my Prey (or track one with an action)",
					"For 1 hour (until slain, new Prey, or I leave the shape): Natural Weapon crits vs. it on " + c + ", disadv. on attacks vs. others",
					"Adv. on smell-based checks to track it; my walking speed increases by 10 ft"
				]);
			}),
			action : [["action", "Mark Prey (tracks)"]]
		},
		"subclassfeature7" : {
			name : "Primal Bloodlust",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When I hit my Prey with a Natural Weapon, I can expend an Adrenaline Surge: adv. on Natural Weapon attacks vs. it and I can't be grappled, paralyzed, or restrained")
		},
		"subclassfeature13" : {
			name : "Apex Predator",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("I have adv. on saves my Prey forces me to make; my Natural Weapon crit range vs. Prey improves (18-20, 17-20 at 18th)")
		},
		"subclassfeature18" : {
			name : "Primeval Frenzy",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("If reduced to 0 HP with Prey Drive active, I don't fall unconscious and can gain temp HP; I keep making death saves until I regain HP")
		}
	}
});

AddSubClass("shifter(laserllama)", "insect", {
	regExpSearch : /^(?=.*insect)(?=.*shifter).*$/i,
	subname : "Insect Bloodline",
	fullname : "Insect Shifter",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLShfShapes("Insect", "CR 0: Firefly, Scorpion, Spider; CR 1/8: Beetle (Giant), Hellwasp, Scarab (Giant); CR 1/4: Centipede (Giant), Swarm of Bugs*, Wolf Spider (Giant); CR 1/2: Soldier Ant (Giant), Swarm of Spiders*, Wasp (Giant); CR 1: Mantis (Giant), Spider (Giant), Swarm of Wasps*; CR 2: Stag Beetle (Giant), Swarm of Fire Ants*; CR 3: Ant Queen (Giant), Scorpion (Giant); CR 4: Rhino Beetle (Giant), Swarm of Scarabs*; CR 5: Centipede (Colossal), Wasp Queen (Giant); CR 6: Spider (Colossal); * swarms from 7th level"),
		"subclassfeature1.1" : LLShfBloodlineFea("Insectoid Evolution", LLShfNatural("Insect", "10+Con", false, [1, 8, "piercing"], "", 1, "Finesse"), [
			"Arachnoid Grip: climbing speed = walking speed; I climb difficult and sheer surfaces (even upside down) without checks",
			"Natural Armor: AC 10 + Con mod + Dex mod; Natural Weapons (stingers): finesse, 1d8 piercing"
		], {
			speed : { climb : { spd : "walk", enc : "walk" } }
		}),
		"subclassfeature1.2" : {
			name : "Stinging Strike",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc("Once per turn when I hit with a Natural Weapon, the target makes a Con save or takes +" + (n < 7 ? 1 : n < 13 ? 2 : n < 18 ? 3 : 4) + "d8 poison and is poisoned until my next turn" + (n < 18 ? "" : " (Deadly Neurotoxin: Int save instead; fail by 5+: paralyzed instead)"));
			})
		},
		"subclassfeature7" : {
			name : "Corrosive Stings",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When a Bloodline or Beast Shape feature deals poison damage, I can make it deal acid damage instead")
		},
		"subclassfeature7.1" : {
			name : "Swarm Shape",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"I can learn and Shift into Insect Swarms; I gain 2 \xD7 Shifter level + Con mod temp HP (at 0, I revert and take the rest)",
				"Its Flurry damage uses these temp HP instead of my HP; 1/SR free, then an Adrenaline Surge"
			]),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature13" : {
			name : "Iridescent Escape",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("When I expend an Adrenaline Surge, I can move 30 ft without provoking opportunity attacks and Shift into a Bloodline Shape")
		},
		"subclassfeature18" : {
			name : "Deadly Neurotoxin",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("My saves vs. being poisoned can be Int saves instead; if the target fails by 5 or more, it's paralyzed instead of poisoned")
		}
	}
});

AddSubClass("shifter(laserllama)", "reptilian", {
	regExpSearch : /^(?=.*reptil)(?=.*shifter).*$/i,
	subname : "Reptilian Bloodline",
	fullname : "Reptilian Shifter",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLShfShapes("Reptilian", "CR 0: Frog, Lizard, Tortoise; CR 1/8: Alligator Turtle, Viper; CR 1/4: Boa Constrictor, Frog (Giant), Lizard (Giant); CR 1/2: Komodo Dragon, Tortoise (Giant); CR 1: Crocodile, King Cobra, Toad (Giant); CR 2: Anaconda; CR 3: Alligator Turtle (Giant); CR 4: Toad (Colossal); CR 5: Titanoboa; CR 6: Crocodile (Giant)"),
		"subclassfeature1.1" : LLShfBloodlineFea("Reptilian Physiology", LLShfNatural("Reptilian", "10+Con", false, [1, 6, "slashing"], "", 1, "Finesse, light"), [
			"Natural Armor: AC 10 + Dex mod + Con mod; Natural Weapons (claws): finesse, light, 1d6 slashing",
			"Sticky Grip: climbing speed = walking speed; I climb difficult and sheer surfaces (even ceilings) without checks"
		], {
			speed : { climb : { spd : "walk", enc : "walk" } }
		}),
		"subclassfeature1.2" : {
			name : "Serpentine Stalker",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I gain Stealth proficiency (if already proficient, Stealth d20 rolls of 7 or lower count as 8); in a Bloodline Shape, I can Disengage as a bonus action"),
			skills : ["Stealth"],
			action : [["bonus action", "Disengage (Bloodline Shape)"]]
		},
		"subclassfeature7" : {
			name : "Adaptive Camouflage",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("As an action, I expend an Adrenaline Surge to become invisible for 10 minutes, as the invisibility spell but without concentration"),
			action : [["action", ""]]
		},
		"subclassfeature7.1" : {
			name : "Coiled Strike",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"In a Bloodline Shape, I have adv. on opportunity attacks; as a reaction after a creature I sense attacks me, I make one against it",
				"If I already used my reaction this round, I can expend an Adrenaline Surge to take another"
			]),
			action : [["reaction", "Coiled Strike"]]
		},
		"subclassfeature13" : {
			name : "Crushing Might",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("A creature starting its turn grappled/restrained by me makes a Str save (reaction in Bloodline Shape: disadv.) or takes my level in bludgeoning and has disadv. on all d20 rolls that turn"),
			action : [["reaction", "Crushing Might (disadv.)"]]
		},
		"subclassfeature18" : {
			name : "Primeval Predator",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I gain heat-sensing blindsight 120 ft and a second reaction each round (only one per trigger)"),
			vision : [["Blindsight (heat)", 120]]
		}
	}
});

AddSubClass("shifter(laserllama)", "vermin", {
	regExpSearch : /^(?=.*vermin)(?=.*shifter).*$/i,
	subname : "Vermin Bloodline",
	fullname : "Vermin Shifter",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLShfShapes("Vermin", "CR 0: Bat, Mole, Racoon, Rodent; CR 1/8: Badger, Beaver, Rodent (Giant), Vampire Bat; CR 1/4: Racoon (Giant), Swarm of Bats*; CR 1/2: Porcupine (Giant), Swarm of Rodents*; CR 1: Badger (Giant), Bat (Giant); CR 2: Dire Beaver, Rodent of Unusual Size; CR 3: Mole (Giant), Swarm of Vampire Bats*; CR 4: Elder Vampire Bat; CR 5: Deep Mole, Swarm of Plague Rats*; CR 6: Badger Lord; * swarms from 7th level"),
		"subclassfeature1.1" : LLShfBloodlineFea("Verminous Anatomy", LLShfNatural("Vermin", "10+Con", false, [1, 6, "piercing"], "", 1, "Finesse, light"), [
			"Darkvision 60 ft (or +60 ft); Natural Armor: AC 10 + Con mod + Dex mod",
			"Natural Weapons (fangs): finesse, light, 1d6 piercing",
			"Scamper: when I Shift into a Bloodline Shape, I also gain the benefits of the Disengage or Hide action"
		], {
			vision : [["Darkvision", 60]]
		}),
		"subclassfeature1.2" : {
			name : "Plague Bearer",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("A creature I hit with a Natural Weapon attack can't regain HP until the start of my next turn")
		},
		"subclassfeature7" : {
			name : "Swarm Shape",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"I learn one Vermin Swarm and can learn/Shift into Vermin Swarms; I gain 2 \xD7 Shifter level + Con mod temp HP (at 0, I revert)",
				"Its Flurry damage uses these temp HP and counts as a Natural Weapon attack; 1/SR free, then an Adrenaline Surge"
			]),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature13" : {
			name : "Unseen Infiltrators",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("With Wild Awareness, I also learn what all Vermin within 3 miles know: pathways, hiding spots, dangerous creatures, and traps")
		},
		"subclassfeature18" : {
			name : "Overwhelming Horde",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"As an action, a creature I see within 30 ft makes a Dex save; it's covered in Vermin until it takes 2 \xD7 my level damage (my level on a success)",
				"While covered after a failure: speed halved, disadv. on attacks, ability checks, and Dex saves"
			]),
			usages : 1,
			recovery : "short rest",
			action : [["action", ""]]
		}
	}
});

// ======================================================================
// LaserLlama - Vessel v4.0.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Vessel"
	Effect:		This script adds the Vessel class, its 25 Unsealed Aspects, and 6 Sealed Spirits (with Archon Forms on the Notes page)
				Vessel v4.0.0 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Vessel" in the Class field (e.g. "Fallen Vessel")
*/


if (typeof LLAddFightingStyles !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

LLVslLvl = function () { return classes.known["vessel(laserllama)"] ? classes.known["vessel(laserllama)"].level : 0; };
LLVslSlots = levels.map(function (n) { return n < 2 ? 0 : n < 11 ? 2 : n < 17 ? 3 : 4; });
LLVslSlotLvl = levels.map(function (n) { return n < 2 ? 0 : n < 5 ? 1 : n < 9 ? 2 : n < 13 ? 3 : n < 17 ? 4 : 5; });
LLVslDie = levels.map(function (n) { return n < 5 ? 6 : n < 11 ? 8 : n < 17 ? 10 : 12; });

LLAddSpellsToClass("vessel(laserllama)", [
	"chill touch", "create bonfire", "dancing lights", "friends", "frostbite", "glitterbeam", "infestation", "lightning lure", "mage hand", "message", "minor illusion", "otherworldly grasp", "thaumaturgy", "thunderclap",
	"absorb elements", "armor of agathys", "arms of hadar", "bane", "cause fear", "charm person", "command", "dissonant whispers", "ensnaring strike", "ethereal anchor", "faerie fire", "feather fall", "hellish rebuke", "inflict wounds", "jump", "longstrider", "protection from evil & good", "sanctuary", "sleep", "thunderwave", "witch bolt",
	"alter self", "augury", "blindness/deafness", "blur", "darkness", "darkvision", "detect thoughts", "enhance ability", "enlarge/reduce", "enthrall", "flame whip", "hold person", "invisibility", "magic aura", "mind spike", "mind whip", "misty step", "see invisibility", "shadow blade", "silence", "spider climb", "suggestion",
	"bestow curse", "clairvoyance", "dire wail", "dispel magic", "fear", "fly", "gaseous form", "haste", "hunger of hadar", "life transference", "nondetection", "protection from energy", "slow", "spectral passage", "spirit shroud", "thunder step", "vampiric touch",
	"banishment", "eldritch tentacles", "blight", "charm monster", "death ward", "dimension door", "fire shield", "freedom of movement", "greater invisibility", "phantasmal killer", "polymorph", "shadow of moil", "sickening radiance",
	"arcane hand", "circle of power", "cloudkill", "contact other plane", "destructive wave", "dispel evil & good", "enervation", "far step", "hold monster", "spiritual sundering", "wall of light"
]);

// Sealed Magic: learned spells that don't count against Spells Known
LLVslSealedMagic = function (sName, aSpells, sDmg, oExtra) {
	var o = {
		name : sName + " Magic",
		source : [["GMB:LL", 0]],
		minlevel : 3,
		description : LLdesc([
			"I learn my Sealed Magic spells at the listed levels; they don't count against my Spells Known and can't be replaced",
			sDmg ? "My Iridescent Strikes can also deal " + sDmg + " damage" : ""
		]),
		spellcastingExtra : LLSpellList(aSpells),
		spellcastingExtraApplyNonconform : true
	};
	if (oExtra) for (var p in oExtra) o[p] = oExtra[p];
	return o;
};
LLVslArchon = function (sName, aLines) {
	return [{
		name : sName,
		note : LLdesc(aLines.concat([
			"Archon Form rules: bonus action from Spirit Mantle (also cloaked); 10 min (1 hour from 7th; indefinite from 18th), extend with a slot",
			"I keep my alignment, personality, ability scores, HP, and proficiencies; I gain 2 \xD7 Vessel level temp HP (lost on reverting)",
			"Its AC Bonus applies only to Ethereal Armor; I can still cast Vessel spells; 1/SR, then a Vessel Magic slot"
		]))
	}];
};

// Unsealed Aspects: [name, min level, prerequisite aspect, description, extra attributes]
LLUnsealedAspects = [
	["Ethereal Tendril", 0, "", "As an action, I extend (or retract) a 10-ft reach Tendril (20 ft in Mantle) with Str = my Cha; it can make Iridescent Strikes, Shoves, Grapples", { action : [["action", "Ethereal Tendril"]] }],
	["Spirit Sense", 0, "", "In my Mantle, I can see magic as detect magic (concentration); I learn the type, spellcasting ability, and highest spell of celestials, elementals, fey, and fiends of CR \u2264 my level"],
	["Striking Presence", 0, "", "I gain proficiency in Deception, Intimidation, or Persuasion; in my Mantle, I have adv. on checks with one of these", { skillstxt : "Choose one from Deception, Intimidation, or Persuasion" }],
	["Uncanny Strength", 0, "", "I gain Athletics proficiency; in my Mantle, I can use Cha instead of Str for Athletics (incl. grapples and shoves)", { skills : ["Athletics"] }],
	["Iridescent Shield", 2, "", "In my Mantle, as a reaction when I or a creature within my reach takes damage, I reduce it by my Vessel level + Cha mod", { action : [["reaction", "Iridescent Shield"]] }],
	["Opalescent Armor", 2, "", "When I cloak myself in my Mantle, I can resist (nonsilvered) B/P/S damage but my speed is reduced by 10 ft"],
	["Shimmering Lance", 2, "", "An Iridescent Strike made with the Attack action can be a ranged spell attack (30/90 ft)"],
	["Vexing Strike", 2, "", "A creature hit by my melee Iridescent Strike has disadv. on attacks vs. others than me until my next turn (not if immune to charmed)"],
	["Dire Stature", 7, "", "My Archon Form can grow one size: per size above Medium, +5 ft reach, +1d4 melee damage, +1 AC Bonus"],
	["Ethereal Grasp", 7, "Uncanny Strength", "Creatures I grapple in my Mantle use Cha instead of Str to escape"],
	["Evoke Spirit", 7, "", "I learn conjure familiar (also as a ritual; not counted); my familiar is a Spirit Familiar with my Archon's type", { spellcastingBonus : [{ name : "Evoke Spirit", spells : LLSpellList(["conjure familiar"]), selection : LLSpellList(["conjure familiar"]) }], creaturesAdd : [["Spirit Familiar"]] }],
	["Minor Magick", 7, "", "Once per long rest, I cast one of my Sealed Magic spells at its lowest level without a slot (can be taken more than once)", { usages : 1, recovery : "long rest" }],
	["Iridescent Aegis", 7, "Iridescent Shield", "When I Iridescent Shield another and it still takes damage, I can take half the remaining damage instead"],
	["Otherworldly Maw", 7, "", "Once per turn in Archon Form, I forgo an attack: a creature in reach makes a Cha save or takes 2d6 necrotic, my temp HP rise by half (max 2 \xD7 level)"],
	["Piercing Gaze", 7, "Spirit Sense", "In my Mantle, I add Cha mod to sight checks, see normally in magical darkness, and detect illusion magic and shapeshifters"],
	["Dazzling Lance", 10, "Shimmering Lance", "My Shimmering Lance has range 100/300, ignores half cover; on a ranged hit, a slot: all within 30 ft Dex save or 6d8 (7d8 at 13th, 8d8 at 17th), half on a save"],
	["Perilous Visage", 10, "", "When I become my Archon, chosen creatures within 60 ft that see me make a Wis save or are frightened 1 min (save each turn, disadv. if they see me)"],
	["Sundering Strike", 10, "", "Once per turn on an Iridescent Strike hit, the target makes a Cha save or can't cast or concentrate on spells until my next turn"],
	["Primeval Thirst", 14, "Otherworldly Maw", "As a reaction in Archon Form when a creature within 30 ft casts a spell, it saves with its spellcasting ability or the spell fails; if the level \u2265 my Slot Level, I regain a slot", { usages : "Cha mod per ", usagescalc : "event.value = Math.max(1, What('Cha Mod'));", recovery : "long rest", action : [["reaction", "Primeval Thirst"]] }],
	["Aether Wings", 14, "", "In my Mantle, I have ethereal wings granting a flying speed of 60 ft and I can hover"],
	["Twilight Steps", 14, "", "I learn spectral passage (not counted); as a bonus action, I cast it without a slot or concentration until the end of my turn", { spellcastingBonus : [{ name : "Twilight Steps", spells : LLSpellList(["spectral passage"]), selection : LLSpellList(["spectral passage"]) }], action : [["bonus action", "Twilight Steps"]] }],
	["Colossal Archon", 18, "Dire Stature", "With Dire Stature, my Archon Form can grow to Huge, gaining its benefits for each size"],
	["Lord of Spirits", 18, "", "As an action, I conjure a CR 6 or lower creature of my Archon's type that I have seen, within 30 ft, loyal for 1 hour, acting on my turn", { usages : 1, recovery : "long rest", action : [["action", "Lord of Spirits"]] }],
	["Primordial Bulwark", 18, "Opalescent Armor", "My Archon resists all damage but force, psychic, and radiant; as a bonus action, I reduce damage by my Cha mod until my next turn", { action : [["bonus action", "Primordial Bulwark"]] }]
];
LLAddUnsealedAspects = function () {
	var oFea = ClassList["vessel(laserllama)"].features["unsealed aspects"];
	for (var i = 0; i < LLUnsealedAspects.length; i++) {
		var a = LLUnsealedAspects[i];
		var sKey = a[0].toLowerCase();
		if (oFea[sKey]) continue;
		oFea.extrachoices.push(a[0]);
		var o = { name : a[0], source : [["GMB:LL", 0]], description : LLdesc(a[3]) };
		if (a[1] || a[2]) {
			o.prereqeval = (function (nLvl, sReq) {
				return function (v) {
					return LLVslLvl() >= nLvl && (!sReq || GetFeatureChoice("classes", "vessel(laserllama)", "unsealed aspects", true).indexOf(sReq.toLowerCase()) !== -1);
				};
			})(a[1], a[2]);
			o.submenu = "[Vessel level " + (a[1] < 10 ? " " : "") + a[1] + (a[2] ? ", " + a[2] : "") + "]";
		}
		if (a[4]) for (var p in a[4]) o[p] = a[4][p];
		oFea[sKey] = o;
	}
};

ClassList["vessel(laserllama)"] = {
	name : "Vessel",
	regExpSearch : /^(?=.*vessel).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Charisma",
	prereqs : "Constitution 13 and Charisma 13",
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Con", "Cha"],
	abilitySave : 6,
	spellcastingFactor : "warlock1",
	spellcastingTable : [[0, 0, 0, 0, 0, 0, 0, 0, 0]].concat(levels.map(function (n, idx) {
		var a = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		if (LLVslSlotLvl[idx]) a[LLVslSlotLvl[idx] - 1] = LLVslSlots[idx];
		return a;
	})),
	spellcastingKnown : {
		cantrips : [0, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : [0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11]
	},
	spellcastingList : {
		"class" : "vessel(laserllama)",
		level : [0, 5]
	},
	skillstxt : {
		primary : "Choose two from Acrobatics, Athletics, Insight, Intimidation, Perception, Religion, and Survival"
	},
	armorProfs : {
		primary : [true, false, false, false],
		secondary : [true, false, false, false]
	},
	weaponProfs : {
		primary : [true, false, ["scimitar", "shortsword"]],
		secondary : [true, false]
	},
	equipment : "Vessel starting equipment:" +
		"\n \u2022 A scimitar -or- two daggers;" +
		"\n \u2022 A simple weapon -or- a shortbow and 20 arrows;" +
		"\n \u2022 An explorer's pack -or- a priest's pack;" +
		"\n \u2022 Leather armor and a quarterstaff." +
		"\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Sealed Spirit", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"spirit mantle" : {
			name : "Spirit Mantle",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n, idx) {
				return LLdesc([
					"As a bonus action, I cloak myself in (or dismiss) my Spirit Mantle, resembling my Sealed Spirit; while cloaked:",
					"Ethereal Armor: without armor or a shield, my AC is 10 + Con mod + Cha mod",
					"Iridescent Strikes: unarmed strikes use Cha and deal 1d" + LLVslDie[idx] + " + Cha mod radiant; after the Attack action, one as a bonus action",
					n < 2 ? "" : "My Mantle is my spellcasting focus; I must be cloaked to cast Vessel spells"
				]);
			}),
			additional : levels.map(function (n, idx) { return "Iridescent Strike 1d" + LLVslDie[idx]; }),
			action : [["bonus action", "Spirit Mantle (cloak/dismiss)"], ["bonus action", "Iridescent Strike (after Attack)"]],
			armorOptions : [{
				regExpSearch : /^(?=.*ethereal)(?=.*armou?r).*$/i,
				name : "Ethereal Armor (Spirit Mantle)",
				source : [["GMB:LL", 0]],
				ac : "10+Con+Cha",
				dex : -10,
				selectNow : true
			}],
			weaponOptions : [{
				baseWeapon : "unarmed strike",
				regExpSearch : /^(?=.*iridescent)(?=.*strike).*$/i,
				name : "Iridescent Strike",
				source : [["GMB:LL", 0]],
				ability : 6,
				damage : [1, 6, "radiant"],
				description : "Spirit Mantle only; damage type can change with my Sealed Spirit",
				selectNow : true
			}],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (/iridescent/i.test(v.WeaponTextName) && classes.known["vessel(laserllama)"]) {
							var aDie = [6, 6, 6, 6, 8, 8, 8, 8, 8, 8, 10, 10, 10, 10, 10, 10, 12, 12, 12, 12];
							fields.Damage_Die = "1d" + aDie[Math.min(20, classes.known["vessel(laserllama)"].level) - 1];
						}
					},
					"My Iridescent Strikes use Charisma and their damage die increases at 5th (d8), 11th (d10), and 17th level (d12)."
				]
			}
		},
		"unsealed aspects" : {
			name : "Unsealed Aspects",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I unlock Unsealed Aspects (\"Choose Feature\"); when I unlock a new one, I can replace one (not a prerequisite)"),
			additional : [1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7].map(function (n) { return n + " aspects"; }),
			extraname : "Unsealed Aspect",
			extrachoices : [],
			extraTimes : [1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7]
		},
		"vessel magic" : {
			name : "Vessel Magic",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I can cast known Vessel cantrips/spells, using Charisma as my spellcasting ability; all my slots are of my Slot Level",
				"I regain all spell slots on a short or long rest; I can swap one known spell when I gain a level"
			]),
			additional : levels.map(function (n, idx) {
				return n < 2 ? "" : LLVslSlots[idx] + " \xD7 " + ["1st", "2nd", "3rd", "4th", "5th"][LLVslSlotLvl[idx] - 1] + "-level slots";
			})
		},
		"subclassfeature3" : {
			name : "Sealed Spirit",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc('Choose the Sealed Spirit bound to my soul and put it in the "Class" field ')
		},
		"archon form" : {
			name : "Archon Form",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"When I cloak in my Mantle, I can become my Archon Form (see Notes) for " + (n < 7 ? "10 min" : n < 18 ? "1 hour" : "indefinitely") + (n < 18 ? "; a Vessel Magic slot extends it by 10 min" : ""),
					"I keep my alignment, personality, ability scores, HP, proficiencies, and features (incl. Vessel Magic); I gain " + (2 * n) + " temp HP",
					"Its AC Bonus applies to Ethereal Armor; ends " + (n < 7 ? "if unconscious, at 0 HP, or as a bonus action" : "at 0 HP or as a bonus action (no resting in it)"),
					n < 7 ? "" : "Controlled Transformation: when I roll initiative (not incapacitated/surprised), I can transform instantly",
					n < 11 ? "" : "Elder Archon: when I transform, I can cast a 1-action or bonus action Sealed Magic spell without a slot",
					n < 14 ? "" : "Dire Preservation: when reduced to 0 HP (not killed), I can transform (expending as normal) and drop to 1 HP instead"
				]);
			}),
			usages : 1,
			recovery : "short rest",
			altResource : "Slot"
		},
		"extra attack" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("I attack twice with the Attack action; after casting a Vessel spell with my action, one Iridescent Strike as a bonus action"),
			action : [["bonus action", "Iridescent Strike (after spell)"]]
		},
		"controlled transformation" : {
			name : "Controlled Transformation",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("My Archon Form lasts up to 1 hour and ends only at 0 HP or as a bonus action; I can transform when I roll initiative")
		},
		"primeval will" : {
			name : "Primeval Will",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I fail an Int, Wis, Cha, or concentration save, I can add my Cha mod (min +1) to the roll"),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest"
		},
		"elder archon" : {
			name : "Elder Archon",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("When I transform into Archon Form, I can cast a Sealed Magic spell (1 action or bonus action) without a slot")
		},
		"dire preservation" : {
			name : "Dire Preservation",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("When reduced to 0 HP but not killed, I can transform into Archon Form (expending as normal) and drop to 1 HP instead")
		},
		"unchained power" : {
			name : "Unchained Power",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("My Archon Form lasts indefinitely; it ends only if I'm killed or I end it as a bonus action")
		}
	}
};
LLAddUnsealedAspects();

CreatureList["spirit familiar"] = {
	name : "Spirit Familiar",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Celestial, Elemental, Fey, Fiend, or Ooze",
	alignment : "",
	ac : "8+Prof",
	hp : 10,
	hd : [1, 4],
	hdLinked : ["vessel(laserllama)"],
	minlevelLinked : ["vessel(laserllama)"],
	speed : "20 ft, fly 40 ft",
	scores : [3, 12, 7, 8, 10, 16],
	saves : ["", 2, "", "", 0, 3],
	senses : "Darkvision 60 ft",
	passivePerception : 10,
	languages : "understands its Vessel",
	challengeRating : "0",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	attacksAction : 1,
	attacks : [{
		name : "Spirit Strike",
		ability : 6,
		damage : [1, 4, "Iridescent"],
		modifiers : ["", "Prof"],
		range : "Melee (5 ft)",
		description : "Melee spell attack with its Vessel's spell attack mod; damage of one of its Vessel's Iridescent Strike types",
		abilitytodamage : false,
		useSpellMod : "vessel(laserllama)"
	}],
	actions : [{
		name : "Invisibility",
		description : "It turns invisible (with its gear) until it attacks or forces a check or save; requires concentration."
	}],
	traits : [{
		name : "Hit Dice",
		description : "It has d4 Hit Dice equal to its Vessel's level and benefits from short and long rests."
	}, {
		name : "Magic Resistance",
		description : "Advantage on saving throws against spells and other magical effects."
	}, {
		name : "Vessel Bond",
		description : "It adds its Vessel's PB to its ability checks and saving throws; it shares its Archon Form's skills and creature type."
	}],
	calcChanges : {
		hp : function (totalHD, HDobj, prefix) {
			if (!classes.known["vessel(laserllama)"]) return;
			var lvl = classes.known["vessel(laserllama)"].level;
			HDobj.alt.push(5 + 5 * lvl);
			HDobj.altStr.push(" = 5 as a base\n + 5 \xD7 " + lvl + " from five times its Vessel's level (" + (5 * lvl) + ")");
		},
		setAltHp : true
	}
};

// ======================= SEALED SPIRITS =======================

AddSubClass("vessel(laserllama)", "the ascended", {
	regExpSearch : /^(?=.*ascended)(?=.*vessel).*$/i,
	subname : "The Ascended",
	fullname : "Ascended Vessel",
	source : [["GMB:LL", 0]],
	spellcastingList : {
		"class" : ["vessel(laserllama)", "wizard"],
		level : [0, 5]
	},
	features : {
		"subclassfeature3" : {
			name : "Ancient Knowledge",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"During a long rest, I prepare Vessel or Wizard spells (up to my Slot Level) in place of my Spells Known",
				"I can cast any spell I prepare as a ritual if it has the ritual tag"
			]),
			toNotesPage : LLVslArchon("Ascended Archon (Medium Humanoid, Shapechanger)", [
				"Speed 30 ft, fly 10 ft (hover); AC Bonus +0; resistance to all damage from spells; skills Arcana, History, Religion; Primordial",
				"Arcane Blast: once on its turn, forgo an attack: all within 5 ft of a point within 60 ft make a Dex save or take Iridescent Strike damage",
				"Astral Step: after casting a spell, teleport 10 ft \xD7 spell level (min 10 ft) to a space I can see",
				"Archmage Reborn (20th): fly 30 ft, Astral Step doubled, bonus action 30-ft teleport, Arcane Blast radius 15 ft"
			])
		},
		"subclassfeature3.1" : LLVslSealedMagic("Ascended", ["identify", "shield", "locate creature", "invisibility", "counterspell", "minute meteors", "divination", "resilient sphere", "arcane hand", "commune"], "", {
			name : "Ascended Magic",
			description : LLdesc("My Ascended spells are always prepared; my Iridescent Strikes can deal the damage type of any spell I have prepared")
		}),
		"subclassfeature6" : {
			name : "Potent Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I deal damage with a Vessel or Wizard spell, I add my Cha mod (min +1) to one damage roll"),
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (v.isSpell && v.thisWeapon[4] && v.thisWeapon[4].join(",").match(/vessel|wizard/i)) output.extraDmg += Math.max(1, Number(What("Cha Mod")));
					},
					"My Vessel and Wizard cantrips/spells add my Charisma modifier (min +1) to one damage roll."
				]
			}
		},
		"subclassfeature15" : {
			name : "Ascended Arcanum",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I learn a 5th-level Wizard spell (and a 6th-level one at 20th) that I can each cast once per long rest without a slot"),
			spellcastingBonus : [{
				name : "Ascended Arcanum (5th)",
				"class" : "wizard",
				level : [5, 5],
				firstCol : "oncelr"
			}, {
				name : "Ascended Arcanum (6th)",
				"class" : "wizard",
				level : [6, 6],
				firstCol : "oncelr",
				times : levels.map(function (n) { return n < 20 ? 0 : 1; })
			}]
		},
		"subclassfeature20" : {
			name : "Archmage Reborn",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("My Archon Form takes my Ascended's appearance: fly 30 ft, Astral Step doubled, 30-ft teleport as a bonus action, Arcane Blast 15-ft radius"),
			action : [["bonus action", "Teleport 30 ft (Archon)"]]
		}
	}
});

var LLVslElements = {
	"air" : ["Air", "Thunder", ["beckon air", "thunderwave", "dust devil", "sonic wave", "storm sphere", "control winds"], ["Speed 20 ft, fly 30 ft (hover); AC Bonus +0; resist thunder, lightning; skills Acrobatics, Stealth; Auran", "Bluster: thunder Iridescent Strikes push 10 ft (halved per size larger)", "Gaseous: moves through 1-inch gaps; opportunity attacks have disadv. while it flies"]],
	"earth" : ["Earth", "Bludgeoning", ["mold earth", "earth tremor", "spike growth", "erupting earth", "pillars of earth", "wall of stone"], ["Speed 30 ft, climb 30 ft, burrow 10 ft; AC Bonus +2; resist acid, poison; tremorsense 10 ft; skills Athletics, Intimidation; Terran", "Rock Solid: bludgeoning Iridescent Strikes halve the target's speed until my next turn", "Siege Monster: maximum bludgeoning damage to nonmagical objects and structures"]],
	"fire" : ["Fire", "Fire", ["control flame", "hellish rebuke", "flaming sphere", "fireball", "wall of fire", "flame strike"], ["Speed 40 ft; AC Bonus +0; resist fire, radiant; skills Acrobatics, Intimidation; Ignan", "Searing Flame: fire damage is rolled twice, using either total", "Illumination: bright light 30 ft, dim 30 ft beyond"]],
	"water" : ["Water", "Cold", ["shape water", "torrent", "misty step", "tidal wave", "watery sphere", "maelstrom"], ["Speed 30 ft, swim 50 ft; AC Bonus +0; resist acid, cold; darkvision 120 ft; skills Acrobatics, Stealth; Aquan", "Aqueous: breathes air and water; moves through 1-inch gaps", "Fluid Resilience: reaction when damaged (not force/psychic): reduce by my Cha mod, move 15 ft without opportunity attacks"]]
};
var LLVslCataclysmAffinity = {
	name : "Elemental Affinity",
	source : [["GMB:LL", 0]],
	minlevel : 3,
	description : LLdesc("Choose my elder elemental Spirit (\"Choose Feature\"): it grants Affinity with and resistance to a damage type, Cataclysm Magic, and my Archon Form"),
	choices : []
};
for (var sEl in LLVslElements) {
	var aEl = LLVslElements[sEl];
	LLVslCataclysmAffinity.choices.push(aEl[0]);
	LLVslCataclysmAffinity[sEl] = {
		name : "Elemental Affinity: " + aEl[0],
		description : LLdesc([
			"I have Affinity with and resistance to " + aEl[1].toLowerCase() + " damage; my Iridescent Strikes can deal it (always magical)",
			"Cataclysm Magic (not counted, always known): absorb elements, elemental blade, elemental bane, resilient sphere, far step,",
			aEl[2].join(", ")
		]),
		dmgres : [aEl[1]],
		spellcastingExtra : LLSpellList(["absorb elements", "elemental blade", "elemental bane", "resilient sphere", "far step"].concat(aEl[2])),
		spellcastingExtraApplyNonconform : true,
		toNotesPage : LLVslArchon(aEl[0] + " Archon (Medium Elemental, Shapechanger)", aEl[3].concat(["Elder Elemental: its Affinity damage ignores resistance and treats immunity as resistance"]))
	};
}
AddSubClass("vessel(laserllama)", "the cataclysm", {
	regExpSearch : /^(?=.*cataclysm)(?=.*vessel).*$/i,
	subname : "The Cataclysm",
	fullname : "Cataclysm Vessel",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLVslCataclysmAffinity,
		"subclassfeature6" : {
			name : "Elder Power",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("In my Mantle, I'm immune to Affinity damage I inflict; in Archon Form, Affinity damage dice of 1 or 2 count as 3")
		},
		"subclassfeature15" : {
			name : "Cataclysmic Eruption",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : levels.map(function (n) {
				return LLdesc("As an action, a 15-ft diameter, 60-ft high pillar erupts within 30 ft: Dex save or 9d6 Affinity damage (half on a save); then a slot" + (n < 20 ? "" : "; at will in Archon Form"));
			}),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest",
			altResource : "Slot",
			action : [["action", ""]]
		},
		"subclassfeature20" : {
			name : "Cataclysm Reborn",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("In Archon Form, I take my Cataclysm's appearance, the weather within 1 mile reflects it, and I can use Cataclysmic Eruption at will")
		}
	}
});

AddSubClass("vessel(laserllama)", "the cursed", {
	regExpSearch : /^(?=.*cursed)(?=.*vessel).*$/i,
	subname : "The Cursed",
	fullname : "Cursed Vessel",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Malignant Aura",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain the Striking Presence Aspect (not counted, can't be replaced); if I already have it, another Aspect or Striking Presence for another skill"),
			bonusClassExtrachoices : [{
				"class" : "vessel(laserllama)",
				"feature" : "unsealed aspects",
				"bonus" : 1
			}],
			toNotesPage : LLVslArchon("Cursed Archon (Medium Fiend, Shapechanger)", [
				"Speed 40 ft, climb 40 ft; AC Bonus +1; resist fire, poison; darkvision 60 ft; skills Intimidation, Stealth; Infernal",
				"Frenzy: when it takes the Attack action, until its next turn all its attacks and attacks vs. it have advantage",
				"Infernal Drain: once per turn on a fire Iridescent Strike, temp HP increase by my Cha mod (max 2 \xD7 Vessel level)",
				"Lord of Darkness (20th): immune to charmed, frightened, poisoned, poison, fire; +1 Iridescent Strike with Attack; fire strikes frighten"
			])
		},
		"subclassfeature3.1" : LLVslSealedMagic("Cursed", ["hellish rebuke", "jump", "flame whip", "scorching ray", "fireball", "haste", "dominate creature", "wall of fire", "destructive wave", "insect plague"], "fire"),
		"subclassfeature6" : {
			name : "Hellfire",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("My fire damage ignores resistance and treats immunity as resistance; a creature I deal fire damage can't regain HP until my next turn")
		},
		"subclassfeature15" : {
			name : "Dark Sacrifice",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("As a bonus action, I reduce my current and max HP by 10 to regain a Vessel Magic slot; max HP returns at the end of a long rest"),
			action : [["bonus action", ""]]
		},
		"subclassfeature20" : {
			name : "Lord of Darkness",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc([
				"In Archon Form: true appearance; immune to charmed, frightened, poisoned, and poison and fire damage",
				"+1 Iridescent Strike with the Attack action; once per turn, a fire Iridescent Strike frightens the target until my next turn"
			])
		}
	}
});

AddSubClass("vessel(laserllama)", "the fallen", {
	regExpSearch : /^(?=.*fallen)(?=.*vessel).*$/i,
	subname : "The Fallen",
	fullname : "Fallen Vessel",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Celestial Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Insight and martial weapons; in my Mantle, I add my Cha mod to Insight checks"),
			skills : ["Insight"],
			weaponProfs : [false, true],
			toNotesPage : LLVslArchon("Fallen Archon (Medium Celestial, Shapechanger)", [
				"Speed 30 ft; AC Bonus +2; resist necrotic, radiant; darkvision 60 ft; skills Intimidation, Religion; Celestial",
				"Divine Ward: bonus action, a creature within 30 ft gains my Cha mod temp HP for 1 min",
				"Wings of Wrath: Divine Wrath weapons gain thrown (20/60) and return to my hand after the attack"
			])
		},
		"subclassfeature3.1" : {
			name : "Divine Wrath",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("In my Mantle, a melee weapon attack can use Cha, deal radiant damage, and count as an Iridescent Strike (include \"Wrath\" in its name)"),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.isMeleeWeapon && !v.isSpell && /wrath/i.test(v.WeaponTextName)) {
							fields.Mod = 6;
							fields.Damage_Type = "radiant";
							fields.Description += (fields.Description ? "; " : "") + "Counts as Iridescent Strike";
						}
					},
					"If I include 'Wrath' in a melee weapon's name, it uses Charisma, deals radiant damage, and counts as an Iridescent Strike."
				]
			}
		},
		"subclassfeature3.2" : LLVslSealedMagic("Fallen", ["divine favor", "ethereal anchor", "branding smite", "spiritual weapon", "crusader's mantle", "revivify", "banishment", "guardian of faith", "circle of power", "flame strike"], ""),
		"subclassfeature6" : {
			name : "Condemnation",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc("Once per Archon transformation, a Divine Wrath hit in Archon Form Condemns the target: it spends 2 ft per foot moving away from me and my Divine Wrath crits on " + (n < 15 ? "19-20" : "18-20"));
			})
		},
		"subclassfeature15" : {
			name : "Heavenly Zeal",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I gain the Aether Wings Aspect (not counted; another if I have it); Divine Wrath vs. Condemned creatures crits on 18-20"),
			bonusClassExtrachoices : [{
				"class" : "vessel(laserllama)",
				"feature" : "unsealed aspects",
				"bonus" : 1
			}]
		},
		"subclassfeature20" : {
			name : "Divine Avenger",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("In Archon Form: true appearance; after a weapon miss, adv. on my next attack vs. that target; a crit blinds, deafens, and mutes it until my next turn")
		}
	}
});

AddSubClass("vessel(laserllama)", "the formless", {
	regExpSearch : /^(?=.*formless)(?=.*vessel).*$/i,
	subname : "The Formless",
	fullname : "Formless Vessel",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Amorphous Shape",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("In my Mantle, I move through 1-inch gaps without squeezing; I gain the Ethereal Tendril Aspect (not counted; another if I have it)"),
			bonusClassExtrachoices : [{
				"class" : "vessel(laserllama)",
				"feature" : "unsealed aspects",
				"bonus" : 1
			}],
			toNotesPage : LLVslArchon("Formless Archon (Medium Ooze, Shapechanger)", [
				"Speed 30 ft, climb 30 ft; AC Bonus +1; resist acid, poison; immune grappled, restrained; blindsight 60 ft (blind beyond); Primordial",
				"Pseudopods: Cha mod extra limbs with 10-ft reach, only for melee Iridescent Strikes, grapples, and shoves",
				"Sticky Slime: a melee Iridescent Strike hit on a same-size or smaller creature: Dex save or grappled (escape: action, Str save)"
			])
		},
		"subclassfeature3.1" : LLVslSealedMagic("Formless", ["caustic brew", "entangle", "hold person", "web", "grasping vine", "slow", "eldritch tentacles", "vitriolic sphere", "contagion", "hold monster"], "acid"),
		"subclassfeature6" : {
			name : "Drain Vitality",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc("As a bonus action in Archon Form, creatures under my Formless Magic or grappled by me make a Con save or take " + (n < 9 ? 2 : n < 13 ? 3 : n < 17 ? 4 : n < 20 ? 5 : 6) + "d8 acid; my temp HP rise by half (max 2 \xD7 level)");
			}),
			action : [["bonus action", ""]]
		},
		"subclassfeature15" : {
			name : "Consume Strike",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("As a reaction when my Archon is hit, my next Iridescent Strike before the end of my next turn applies that attack's damage and effects instead"),
			action : [["reaction", ""]]
		},
		"subclassfeature20" : {
			name : "Primordial Hunger",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("In Archon Form: true appearance; immune to acid, my acid ignores resistance (immunity as resistance); action: one Iridescent Strike per Pseudopod"),
			action : [["action", "Strike with each Pseudopod"]]
		}
	}
});

AddSubClass("vessel(laserllama)", "the trickster", {
	regExpSearch : /^(?=.*trickster)(?=.*vessel).*$/i,
	subname : "The Trickster",
	fullname : "Trickster Vessel",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLVslSealedMagic("Trickster", ["charm person", "disguise self", "invisibility", "misty step", "enemies abound", "hypnotic pattern", "charm monster", "dimension door", "dream", "mislead"], "psychic", {
			toNotesPage : LLVslArchon("Trickster Archon (Medium Fey, Shapechanger)", [
				"Speed 30 ft; AC Bonus +0; immune charmed, frightened; darkvision 60 ft; skills Deception, Stealth; Sylvan",
				"Juxtapose: bonus action, a creature within 60 ft makes a Cha save (may fail willingly) or swaps places with the Archon",
				"Stolen Memory: once per turn on a psychic Iridescent Strike, Int save or it can't perceive or target the Archon until its next turn"
			])
		}),
		"subclassfeature3.1" : {
			name : "Shifting Visage",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("In my Mantle, I can cast disguise self without a slot and unerringly mimic sounds and voices I have heard"),
			spellcastingBonus : [{ name : "Shifting Visage", spells : LLSpellList(["disguise self"]), selection : LLSpellList(["disguise self"]), firstCol : "atwill" }]
		},
		"subclassfeature6" : {
			name : "Illusory Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc("When I'd make an Iridescent Strike on my turn, I can instead conjure " + (n < 20 ? "an illusory copy within 30 ft" : "an illusory copy (two once per turn) within 60 ft") + " that makes the Strike, then vanishes");
			})
		},
		"subclassfeature15" : {
			name : "Fey Retribution",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("As a reaction when I succeed on a save vs. a spell, the caster makes a Wis save or is affected by charm person or charm monster (once per dawn each)"),
			action : [["reaction", ""]]
		},
		"subclassfeature20" : {
			name : "Lord of Mischief",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("In Archon Form: true appearance; Illusory Strikes range 60 ft and two copies once per turn; my Iridescent Strike hits impose disadv. on the next Wis save")
		}
	}
});

// ======================================================================
// LaserLlama - Warlord v3.3.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first; it contains the Tactical Exploits).

	-INFORMATION-
	Subject:	Class, "Warlord"
	Effect:		This script adds the Warlord class, its Leadership Styles, and 6 Academies of War.
				Warlord v3.3.0 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Warlord" in the Class field (e.g. "Chivalry Warlord")
*/


if (typeof LLExploitFeature !== "function" || typeof LLWarlordAbility !== "function" || !SpellsList["attack order"] || !SpellsList["attack order"].isExploit) {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

// Tactical Exploits from the Warlord document that the Compendium of Exploits doesn't give to the Warlord
LLAddSpellsToClass("warlord(laserllama)", ["defensive stance", "dirty hit"]);

LLExploitTables["warlord(laserllama)"] = {
	cls : "warlord(laserllama)",
	factor : 1,
	dice : [0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5],
	die : ["", "d4", "d4", "d4", "d6", "d6", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10"],
	// Academy of Tactics (Advanced Tactics): +1 Exploit Die, d6 (d8 at 5th, d10 at 11th, d12 at 17th)
	alt : {
		sub : "warlord(laserllama)-academy of tactics",
		dice : [0, 2, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6],
		die : ["", "d4", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12"]
	}
};
var LLWrlExpl = { cls : "warlord(laserllama)", sheet : "tactical exploits", sheetName : "Tactical Exploits", ability : LLWarlordAbility };
LLWrlLvl = function () { return classes.known["warlord(laserllama)"] ? classes.known["warlord(laserllama)"].level : 0; };
LLWrlDie = function (n) {
	var oT = LLExploitTables["warlord(laserllama)"];
	var oCl = classes.known["warlord(laserllama)"];
	var aDie = oCl && oCl.subclass === oT.alt.sub ? oT.alt.die : oT.die;
	return aDie[Math.min(20, Math.max(2, n)) - 1];
};
// Set the Leadership ability (Exploit save DC, Tactical Exploits and Gallantry spells)
LLWrlSetAbi = function (n) {
	if (!CurrentVars) return;
	if (n) CurrentVars.LLWrlAbi = n; else delete CurrentVars.LLWrlAbi;
	SetStringifieds("vars");
	var nUse = n ? n : 4;
	if (CurrentClasses["warlord(laserllama)"]) CurrentClasses["warlord(laserllama)"].abilitySave = nUse;
	var bSp = false;
	["warlord(laserllama)", "tactical exploits"].forEach(function (sSp) {
		if (!CurrentSpells[sSp]) return;
		CurrentSpells[sSp].ability = nUse;
		bSp = true;
	});
	if (bSp) {
		SetStringifieds("spells");
		CurrentUpdates.types.push("spells");
	}
	if (typeof SetTheAbilitySaveDCs === "function") SetTheAbilitySaveDCs();
};
LLWrlLeadership = function (sName, nAbi, sStyle, aLines, oExtra) {
	var o = {
		name : "Leadership Style: " + sName,
		description : levels.map(function (n) {
			return LLdesc(["My Leadership ability is " + sStyle].concat(aLines[0]).concat(n < 7 ? [] : aLines[1]).concat(n < 15 ? [] : aLines[2]));
		}),
		eval : function () { LLWrlSetAbi(nAbi); },
		changeeval : function () { LLWrlSetAbi(nAbi); },
		removeeval : function () { LLWrlSetAbi(); }
	};
	if (oExtra) for (var p in oExtra) o[p] = oExtra[p];
	return o;
};

ClassList["warlord(laserllama)"] = {
	name : "Warlord",
	regExpSearch : /^(?=.*warlord).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Strength or Dexterity, and Intelligence, Wisdom, or Charisma",
	prereqs : "Strength 13 or Dexterity 13, and Intelligence 13, Wisdom 13, or Charisma 13",
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Wis", "Cha"],
	abilitySave : 4,
	skillstxt : {
		primary : "Choose two from Athletics, Deception, History, Insight, Intimidation, Investigation, and Persuasion"
	},
	toolProfs : {
		primary : [["Gaming set", 1]],
		secondary : [["Gaming set", 1]]
	},
	armorProfs : {
		primary : [true, true, false, true],
		secondary : [true, true, false, true]
	},
	weaponProfs : {
		primary : [true, false, ["hand crossbow", "longbow", "longsword", "rapier", "scimitar", "shortsword"]],
		secondary : [true, false]
	},
	equipment : "Warlord starting equipment:" +
		"\n \u2022 Scale mail -or- leather armor;" +
		"\n \u2022 A simple weapon -or- a longsword -or- a rapier;" +
		"\n \u2022 A light crossbow and 20 bolts -or- five javelins;" +
		"\n \u2022 A scholar's pack -or- an explorer's pack." +
		"\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Academy of War", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"leadership style" : {
			name : "Leadership Style",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("Choose my Leadership Style using the \"Choose Feature\" button above; it sets my Leadership ability (Exploit save DC)"),
			choices : ["Captain", "Mentor", "Strategist"],
			changeeval : function () { if (CurrentVars && CurrentVars.LLWrlAbi) LLWrlSetAbi(CurrentVars.LLWrlAbi); },
			"captain" : LLWrlLeadership("Captain", 6, "Charisma", [
				["I gain proficiency with heavy armor and in Intimidation or Persuasion"],
				["Valiant Leader: my Inspiring Word can target unconscious (not dead) creatures, even if they can't hear me"],
				["Exalted Leader: creatures I target with Inspiring Word, Rallying Cry, or an Exploit gain Cha mod temp HP (1 min)"]
			], {
				armorProfs : [false, false, true, false],
				skillstxt : "Choose one from Intimidation or Persuasion"
			}),
			"mentor" : LLWrlLeadership("Mentor", 5, "Wisdom", [
				["As a reaction when a creature within 15 ft that can hear me misses an attack or fails a check, it adds 1d4 to the roll"],
				["Valiant Leader: my Mentor reaction has a 30-ft range and adds my Exploit Die instead"],
				["Exalted Leader: my Inspiring Word can end blinded, charmed, deafened, frightened, poisoned, or stunned instead of healing"]
			], {
				action : [["reaction", "Mentor"]]
			}),
			"strategist" : LLWrlLeadership("Strategist", 4, "Intelligence", [
				["After I roll initiative, I can switch places in the initiative order with a willing creature"],
				["Valiant Leader: I and chosen creatures within 15 ft add my Int mod to initiative (if I'm not surprised/incapacitated)"],
				["Exalted Leader: a target of my Inspiring Word can move up to its speed without provoking opportunity attacks"]
			])
		},
		"inspiring word" : {
			name : "Inspiring Word",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, a creature within " + (n < 11 ? 30 : 60) + " ft that can hear me regains " + (n < 20 ? "one roll of its Hit Die" : "the maximum of its Hit Die") + " + my Leadership mod HP",
					"It doesn't expend a Hit Die" + (n < 11 ? "" : "; Tactical Superiority: I regain one use when I roll initiative")
				]);
			}),
			usages : [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7],
			recovery : "short rest",
			action : [["bonus action", ""]]
		},
		"fighting style" : LLAddFightingStyles({
			name : "Fighting Style",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I learn a Fighting Style (I must meet its prerequisites); use \"Choose Feature\"; I can replace it when I gain a level"),
			extraname : "Fighting Style",
			extraTimes : levels.map(function (n) { return 1; })
		}, LLFightingStyleLists["warlord"], true),
		"tactical exploits" : LLExploitFeature({
			name : "Tactical Exploits",
			minlevel : 2,
			cls : "warlord(laserllama)",
			sheet : "tactical exploits",
			sheetName : "Tactical Exploits",
			ability : LLWarlordAbility,
			extraTimes : [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 10, 10],
			description : LLdesc([
				"I know Tactical Exploits fueled by my Exploit Dice; use one Exploit per attack, check, or save",
				"Use the \"Choose Feature\" button above to select Exploits; I can swap one when I gain a level",
				"Tactical Skill: I can add an Exploit Die to a check with a skill or tool I'm proficient in (after rolling)",
				"Exploit save DC = 8 + Prof Bonus + Leadership mod"
			])
		}),
		"exploit dice" : LLExploitDiceFeature("warlord(laserllama)", 2, "Warlord", {
			description : levels.map(function (n) {
				if (n < 2) return "";
				return LLdesc([
					"I have Exploit Dice (see the Limited Features); I regain all of them when I finish a short or long rest",
					"Exploit save DC = 8 + Prof Bonus + my Leadership mod"
				]);
			})
		}),
		"subclassfeature3" : {
			name : "Academy of War",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc('Choose the Academy of War that represents my training and put it in the "Class" field ')
		},
		"extra attack" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("I attack twice with the Attack action; after I Dash or Disengage with my action, one weapon attack as a bonus action"),
			action : [["bonus action", "Attack (after Dash/Disengage)"]]
		},
		"valiant leader" : {
			name : "Valiant Leader",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("My Leadership Style grants additional benefits (see Leadership Style)")
		},
		"rallying cry" : {
			name : "Rallying Cry",
			source : [["GMB:LL", 0]],
			minlevel : 9,
			description : levels.map(function (n) {
				return LLdesc("As a reaction when a creature within " + (n < 11 ? 30 : 60) + " ft that can hear me fails a save, it rerolls and adds my Leadership mod to the new roll");
			}),
			usages : levels.map(function (n) { return n < 9 ? "" : n < 13 ? 1 : n < 17 ? 2 : n < 20 ? 3 : ""; }),
			recovery : "short rest",
			additional : levels.map(function (n) { return n < 20 ? "" : "unlimited (Dauntless)"; }),
			action : [["reaction", ""]]
		},
		"unwavering will" : {
			name : "Unwavering Will",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I have advantage on saving throws to resist being charmed, frightened, or stunned"),
			savetxt : { adv_vs : ["charmed", "frightened", "stunned"] }
		},
		"tactical superiority" : {
			name : "Tactical Superiority",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("When I roll initiative, I regain one use of Inspiring Word and Rallying Cry; the range of my Tactical Exploits, Inspiring Word, and Rallying Cry is doubled")
		},
		"exalted leader" : {
			name : "Exalted Leader",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("My Leadership Style grants additional benefits (see Leadership Style)")
		},
		"dauntless" : {
			name : "Dauntless",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("I can use Rallying Cry an unlimited number of times; my Inspiring Word restores the maximum possible HP")
		}
	}
};

// ======================= ACADEMIES OF WAR =======================

AddSubClass("warlord(laserllama)", "academy of chivalry", {
	regExpSearch : /^(?=.*chival)(?=.*warlord).*$/i,
	subname : "Academy of Chivalry",
	fullname : "Chivalry Warlord",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLPathExploits("Chivalric", [[3, ["attack order", "taunting strike"]], [5, ["hold the line", "rejuvenating order"]], [9, ["daring rescue"]]], LLWrlExpl),
		"subclassfeature3.1" : {
			name : "Inspiring Shout",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("When I roll initiative, I can expend an Inspiring Word: Leadership mod creatures within 30 ft gain Exploit Die + Leadership mod temp HP")
		},
		"subclassfeature3.2" : {
			name : "Knighthood",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency with martial weapons, one musical instrument, and History, Performance, or Religion"),
			weaponProfs : [false, true],
			toolProfs : [["Musical instrument", 1]],
			skillstxt : "Choose one from History, Performance, or Religion"
		},
		"subclassfeature6" : {
			name : "Lead the Charge",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I take the Attack action and make at least one melee attack, I can issue an attack order as a bonus action"),
			action : [["bonus action", "Attack Order (Lead the Charge)"]]
		},
		"subclassfeature14" : {
			name : "Flames of Hope",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"As an action, creatures within 30 ft that hear me: allies gain Exploit Die + Leadership mod temp HP (can't be charmed/frightened while they last);",
				"enemies make a Wis save or are frightened of me (save at end of each turn and when damaged)"
			]),
			usages : 1,
			recovery : "short rest",
			action : [["action", ""]]
		},
		"subclassfeature18" : {
			name : "Paragon of Chivalry",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I'm immune to being charmed and frightened; chosen creatures within 30 ft that see me have adv. on saves vs. those conditions"),
			savetxt : { immune : ["charmed", "frightened"] }
		}
	}
});

AddSubClass("warlord(laserllama)", "academy of dread", {
	regExpSearch : /^(?=.*dread)(?=.*warlord).*$/i,
	subname : "Academy of Dread",
	fullname : "Dread Warlord",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Dark Captain",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency with martial weapons and Intimidation; Intimidation can use my Leadership ability and d20 rolls of 7 or lower count as 8"),
			weaponProfs : [false, true],
			skills : ["Intimidation"]
		},
		"subclassfeature3.1" : LLPathExploits("Dread", [[3, ["attack order", "imposing presence"]], [5, ["intimidating command", "menacing shout"]], [9, ["war cry"]]], LLWrlExpl),
		"subclassfeature3.2" : {
			name : "Dread Presence",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I expend an Inspiring Word: a creature within 30 ft that sees me makes a Wis save" + (n < 14 ? "" : " (disadv. if hit by me or my Exploit targets since my last turn)") + " or is frightened for 1 min",
					"It ends if it sees me take damage; out of my sight, it can end it with its action"
				]);
			}),
			action : [["bonus action", ""]]
		},
		"subclassfeature6" : {
			name : "Merciless",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I can use intimidating command and menacing shout without an Exploit Die; once per turn when I frighten a creature, I can issue an attack order"),
			usages : "Leadership mod per ",
			usagescalc : "event.value = Math.max(1, What(AbilityScores.abbreviations[LLWarlordAbility() - 1] + ' Mod'));",
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Ruthless Command",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Creatures I target with Inspiring Word or a Tactical Exploit have adv. on attacks vs. frightened creatures until the end of their next turn")
		},
		"subclassfeature18" : {
			name : "Baleful Presence",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Creatures within 30 ft have disadv. on saves vs. my frightened effects; those frightened of me have speed 0 while they see me")
		},
		"subclassfeature18.1" : {
			name : "Dreadlord",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I'm immune to being frightened and add my Leadership mod (min +1) to attacks vs. creatures frightened of me"),
			savetxt : { immune : ["frightened"] }
		}
	}
});

AddSubClass("warlord(laserllama)", "academy of ferocity", {
	regExpSearch : /^(?=.*feroc)(?=.*warlord).*$/i,
	subname : "Academy of Ferocity",
	fullname : "Ferocity Warlord",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLPathExploits("Ferocious", [[3, ["feint", "maneuvering order"]], [5, ["crescendo of violence", "wild charge"]], [9, ["pack tactics"]]], LLWrlExpl),
		"subclassfeature3.1" : {
			name : "Packleader",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"As a bonus action, I mark a creature within 30 ft as my Prey for 1 min (ends at its 0 HP, if I'm incapacitated, or a new Prey)",
				"Creatures I target with Inspiring Word or an Exploit add my Exploit Die to their first attack vs. my Prey before my next turn"
			]),
			usages : "Leadership mod per ",
			usagescalc : "event.value = Math.max(1, What(AbilityScores.abbreviations[LLWarlordAbility() - 1] + ' Mod'));",
			recovery : "long rest",
			additional : "regain 1 on a short rest",
			action : [["bonus action", ""]]
		},
		"subclassfeature3.2" : {
			name : "Predatory Instinct",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency with martial weapons and in Perception or Survival; on those checks using smell or hearing, d20 rolls of 7 or lower count as 8"),
			weaponProfs : [false, true],
			skillstxt : "Choose one from Perception or Survival"
		},
		"subclassfeature6" : {
			name : "Silent Stalker",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I and chosen creatures within 30 ft have adv. on Stealth and travel stealthily at a normal pace; with a Prey, I can issue a maneuvering order as a bonus action"),
			action : [["bonus action", "Maneuvering Order (with Prey)"]]
		},
		"subclassfeature14" : {
			name : "Thrill of the Hunt",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As a reaction when my Prey is killed, I mark another and gain Warlord level temp HP, an Inspiring Word use, or an Exploit Die"),
			action : [["reaction", ""]]
		},
		"subclassfeature18" : {
			name : "Apex Predator",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("+10 ft speed and my weapon attacks vs. my Prey deal +Exploit Die damage; targets of my Inspiring Word, Rallying Cry, or Exploits share this until my next turn"),
			speed : { walk : { spd : "+10", enc : "+10" } }
		}
	}
});

AddSubClass("warlord(laserllama)", "academy of gallantry", {
	regExpSearch : /^(?=.*gallant)(?=.*warlord).*$/i,
	subname : "Academy of Gallantry",
	fullname : "Gallantry Warlord",
	source : [["GMB:LL", 0]],
	spellcastingFactor : 3,
	spellcastingList : {
		spells : LLSpellList(["bless", "bane", "cause fear", "charm person", "command", "compelled duel", "disguise self", "dissonant whispers", "faerie fire", "heroism", "hideous laughter", "longstrider", "sleep", "thunderous smite", "thunderwave", "aid", "calm emotions", "enhance ability", "find steed", "magic mouth", "magic weapon", "mirror image", "pyrotechnics", "restoration", "shatter", "silence", "suggestion", "warding bond", "beacon of hope", "crusader's mantle", "dire wail", "dispel magic", "fear", "haste", "hypnotic pattern", "irresistible dance", "nondetection", "sending", "slow", "sonic wave", "aura of life", "aura of purity", "charm monster", "compulsion", "confusion", "death ward", "freedom of movement"])
	},
	spellcastingKnown : {
		spells : [0, 0, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12]
	},
	features : {
		"subclassfeature3" : LLPathExploits("Gallant", [[3, ["attack order", "steadfast order"]], [5, ["enlivening order", "heroic will"]], [9, ["stand the fallen"]]], LLWrlExpl),
		"subclassfeature3.1" : {
			name : "Gallant Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I can cast known Gallantry spells, using my Leadership ability; a proficient musical instrument is my spellcasting focus",
				"I can swap one known spell when I gain a Warlord level"
			]),
			eval : function () { if (CurrentVars && CurrentVars.LLWrlAbi) LLWrlSetAbi(CurrentVars.LLWrlAbi); },
			changeeval : function () { if (CurrentVars && CurrentVars.LLWrlAbi && CurrentSpells["warlord(laserllama)"] && CurrentSpells["warlord(laserllama)"].ability !== CurrentVars.LLWrlAbi) LLWrlSetAbi(CurrentVars.LLWrlAbi); }
		},
		"subclassfeature3.2" : {
			name : "Warrior Poet",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency with two musical instruments and in Performance; Performance with a weapon and an instrument adds my Warlord level"),
			toolProfs : [["Musical instrument", 2]],
			skills : ["Performance"]
		},
		"subclassfeature6" : {
			name : "Heroic Charge",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc("When I roll initiative (not surprised/incapacitated), I expend an Inspiring Word: I and chosen creatures within " + (n < 11 ? 15 : 30) + " ft that hear me gain the Dash action on our first turn");
			})
		},
		"subclassfeature6.1" : {
			name : "Songs of War & Peace",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I expend a spell slot or Exploit Die as part of my action, I can make a weapon attack as a bonus action; creatures resting with me have adv. on Hit Dice rolls"),
			action : [["bonus action", "Attack (after slot/Exploit Die)"]]
		},
		"subclassfeature14" : {
			name : "Warsong",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Targets of my Inspiring Word or Tactical Exploits have adv. on their next check, attack, or save before my next turn and can't be charmed or frightened")
		},
		"subclassfeature18" : {
			name : "Mythic Voice",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I can expend an Inspiring Word instead of a spell slot to cast a 1st-level Gallantry spell (using a musical instrument as focus)")
		}
	}
});

AddSubClass("warlord(laserllama)", "academy of schemes", {
	regExpSearch : /^(?=.*scheme)(?=.*warlord).*$/i,
	subname : "Academy of Schemes",
	fullname : "Schemes Warlord",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Cheap Shot",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"Once per turn on a weapon hit, the target makes a Dex save: on a failure, no reactions, half speed, and only an action or bonus action (not both) until my next turn",
					n < 6 ? "" : "Ruthless Focus: on a failure, I can issue an insightful order (benefits only vs. that target)",
					n < 18 ? "" : "Marked for Death (1/SR): on a failure, the first hit on it before my next turn is a critical hit"
				]);
			})
		},
		"subclassfeature3.1" : {
			name : "Dastardly Talents",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Deception, disguise kits, and poisoner's kits; Deception checks can use my Leadership ability"),
			skills : ["Deception"],
			toolProfs : ["Disguise kit", "Poisoner's kit"]
		},
		"subclassfeature3.2" : LLPathExploits("Scheming", [[3, ["feint", "maneuvering order"]], [5, ["exposing strike", "insightful order"]], [9, ["perilous gambit"]]], LLWrlExpl),
		"subclassfeature6" : {
			name : "Ruthless Focus",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("A failed Cheap Shot lets me issue an insightful order (vs. that target only); if I use a Tactical Exploit as part of my action, I can Disengage or Hide as a bonus action"),
			action : [["bonus action", "Disengage/Hide (after Exploit)"]]
		},
		"subclassfeature14" : {
			name : "Devious Tactics",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As a reaction when targeted by an attack or save, a creature within 5 ft (not the attacker) makes a Dex save or swaps places and becomes the target"),
			action : [["reaction", ""]]
		},
		"subclassfeature18" : {
			name : "Inscrutable Mind",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("My thoughts and dreams can't be read by magic unless I allow it; I can feed false thoughts with a Deception check")
		},
		"subclassfeature18.1" : {
			name : "Marked for Death",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("When a creature fails its Cheap Shot save, I can mark it: the first attack to hit it before my next turn is a critical hit"),
			usages : 1,
			recovery : "short rest"
		}
	}
});

AddSubClass("warlord(laserllama)", "academy of tactics", {
	regExpSearch : /^(?=.*tactic)(?=.*warlord).*$/i,
	subname : "Academy of Tactics",
	fullname : "Tactics Warlord",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : (function () {
			var oFea = LLExploitFeature({
				name : "Advanced Tactics",
				minlevel : 3,
				cls : "warlord(laserllama)",
				sheet : "tactical exploits",
				sheetName : "Tactical Exploits",
				ability : LLWarlordAbility,
				notesTitle : "Advanced Tactics Exploits",
				bonusName : "Advanced Tactics",
				extraname : "Advanced Tactics Exploit",
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 5 ? 2 : n < 9 ? 4 : 5; }),
				description : levels.map(function (n) {
					return LLdesc([
						"I learn bonus Tactical Exploits: two of 1st degree, two of 2nd degree at 5th level, one of 3rd at 9th level (they can be replaced)",
						"+1 Exploit Die and my Exploit Dice are " + LLWrlDie(n) + "s (see the Limited Features)"
					]);
				})
			});
			for (var i = 0; i < oFea.extrachoices.length; i++) {
				var oCh = oFea[oFea.extrachoices[i].toLowerCase()];
				if (!oCh) continue;
				oCh.prereqeval = (function (sName) {
					return function (v) {
						var oSp = SpellsList[sName.toLowerCase()];
						var lvl = LLWrlLvl();
						var nMax = lvl < 5 ? 1 : lvl < 9 ? 2 : 3;
						return oSp ? oSp.level <= nMax : false;
					};
				})(oFea.extrachoices[i]);
			}
			return oFea;
		})(),
		"subclassfeature3.1" : {
			name : "The Art of War",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in History and two gaming sets, and add double my Prof Bonus to checks using them"),
			skills : [["History", "full"]],
			toolProfs : [["Gaming set", 2]]
		},
		"subclassfeature3.2" : {
			name : "Strategic Adjustments",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc("During a " + (n < 6 ? "long" : "short or long") + " rest, 1 hour of study replaces a Tactical Exploit I know with another of the same degree");
			})
		},
		"subclassfeature6" : {
			name : "Brains over Brawn",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("If I use only Tactical Exploits with my entire action, I can Disengage, Search, or use an Order Exploit as a bonus action"),
			action : [["bonus action", "Disengage/Search/Order (Brains over Brawn)"]]
		},
		"subclassfeature6.1" : {
			name : "Know your Enemy",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"With the Search action, I study a creature within 30 ft (DC 8 + its CR; +Warlord level if I saw it get hit)",
				"Success: AC, senses, resistances/immunities/vulnerabilities, highest/lowest ability, or one trait/action; failure: not again until it's hit"
			])
		},
		"subclassfeature14" : {
			name : "Gifted Strategist",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("I can't be surprised while conscious; when I roll initiative, I can use one Tactical Exploit or take the Ready action")
		},
		"subclassfeature18" : LLPathExploits("Master Tactician", [[18, ["contingency plan"]]], {
			cls : "warlord(laserllama)", sheet : "tactical exploits", sheetName : "Tactical Exploits", ability : LLWarlordAbility,
			name : "Master Tactician",
			minlevel : 18
		})
	}
});
// Master Tactician: free contingency plan after a long rest
if (ClassSubList["warlord(laserllama)-academy of tactics"]) {
	ClassSubList["warlord(laserllama)-academy of tactics"].features["subclassfeature18"].description = LLdesc([
		"I learn contingency plan (not counted); at the end of a long rest, I can use it without an Exploit Die",
		"I can only have one contingency plan in place at a time"
	]);
}

// ======================================================================
// LaserLlama - Warlord Expanded v3.3.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" and "LaserLlama - Warlord v3.3.0.js" (import them first).
	The Fighting Styles and Advanced Tactical Exploits of this document are already in the Common Attributes file.

	-INFORMATION-
	Subject:	Class options, "Warlord Expanded"
	Effect:		This script adds 4 Tactical Feats and 6 Academies of War for the Warlord, plus the Protege creatures.
				Warlord Expanded v3.3.0 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
*/


if (!ClassList["warlord(laserllama)"] || typeof LLWrlSetAbi !== "function") {
	throw new Error("Please import the 'LaserLlama - Warlord v3.3.0.js' file before importing this file.");
}

LLWrlLeadMod = function () {
	return Math.max(1, Number(What(AbilityScores.abbreviations[LLWarlordAbility() - 1] + " Mod")));
};

// ======================= TACTICAL FEATS =======================

FeatsList["alternate inspiring leader"] = {
	name : "Alternate Inspiring Leader",
	source : [["GMB:LL", 0]],
	prerequisite : "Wisdom or Charisma 13 or higher",
	prereqeval : function (v) { return What("Wis") >= 13 || What("Cha") >= 13; },
	descriptionFull : "If you do not have a Leadership Ability, choose your Wisdom or Charisma to be your Leadership Ability and modifier.\n   Over the course of 10 minutes, which can be during a short or long rest, you can inspire allies and shore up their resolve to fight. When you do, creatures equal to 1 + your Leadership modifier that can hear you within 30 feet gain temporary hit points equal to your level + your Leadership modifier.\n   A creature cannot gain temporary hit points from this Feat again until it finishes a short or long rest.",
	description : "In 10 minutes (can be during a rest), 1 + Leadership mod creatures within 30 ft that hear me gain temp HP equal to my level + Leadership mod (once per short rest per creature). Without a Leadership ability, I choose Wis or Cha."
};
FeatsList["natural magnetism"] = {
	name : "Natural Magnetism",
	source : [["GMB:LL", 0]],
	descriptionFull : "Something about your personality and bearing makes others want to be near you. You gain the benefits on the table below that correspond to your Charisma modifier and lower. If your Charisma modifier increases, the benefits you gain from this Feat also increase with your Charisma modifier:\n +1: You gain proficiency with one Gaming Set of your choice.\n +2: The first time you meet a Humanoid, they treat you as Friendly instead of Indifferent.\n +3: You gain proficiency in your choice of Performance, Persuasion, or Intimidation.\n +4: Whenever you make a Persuasion check, you treat a d20 roll of 7 or lower as an 8.\n +5: When you make a Wisdom saving throw, you can make a Charisma saving throw instead.",
	description : "By Cha mod: +1 gaming set proficiency; +2 Humanoids I first meet are Friendly; +3 proficiency in Performance, Persuasion, or Intimidation; +4 Persuasion d20 rolls of 7 or lower count as 8; +5 I can make Cha saves instead of Wis saves.",
	toolProfs : [["Gaming set", 1]],
	skillstxt : "With Cha mod +3 or higher: choose one from Performance, Persuasion, or Intimidation"
};
FeatsList["strategic insight"] = {
	name : "Strategic Insight",
	source : [["GMB:LL", 0]],
	prerequisite : "Intelligence or Wisdom 13 or higher",
	prereqeval : function (v) { return What("Int") >= 13 || What("Wis") >= 13; },
	descriptionFull : "You have a gift for identifying weaknesses. When you take the Search action, you can target a creature you can see within 30 feet (DC = 8 + its Challenge Rating). If you can observe it for at least 1 minute, add your level to the roll.\n   On a success, you learn one characteristic of your choice: Armor Class, all special senses, resistances, immunities & vulnerabilities, highest ability score, lowest ability score, or one trait or action from its stat block. Once you use this feature on a creature you cannot target it again until you finish a long rest.",
	description : "With the Search action, I study a creature within 30 ft (DC 8 + its CR; +my level if observed for 1 min). Success: its AC, senses, resistances/immunities/vulnerabilities, highest/lowest ability, or one trait/action. Once per creature per long rest."
};
FeatsList["tactical training"] = {
	name : "Tactical Training",
	source : [["GMB:LL", 0]],
	allowDuplicates : true,
	descriptionFull : "You have studied greater combat strategies that allow you to perform Tactical Exploits. You gain the following benefits:\n \u2022 Ability Score Increase. Increase your Wisdom, Charisma, or Intelligence score by 1, up to a maximum of 20. It becomes your Leadership ability if you do not already have one.\n \u2022 Tactical Exploits Known. You learn one of the following Tactical Exploits of your choice from the Warlord Class: attack order, defensive order, maneuvering order, steadfast order, or support order.\n \u2022 Issuing an Order. Once per turn, when you take the Attack action, you can use the Tactical Exploit in place of one attack. You can't use this Exploit more than once per turn unless you learn Tactical Exploits from a source other than this Feat.\n \u2022 Repeatable. You can choose this Feat multiple times. Each time you do, raise one of the ability scores above by one, and learn one new Tactical Exploit from the list above.",
	description : "I learn one Order Exploit (see the spell sheet); once per turn when I take the Attack action, I can use it in place of one attack. Repeatable. [+1 Intelligence, Wisdom, or Charisma (my Leadership ability if I have none)]",
	scorestxt : "+1 Intelligence, Wisdom, or Charisma",
	spellcastingBonus : [{
		name : "Tactical Training",
		spells : LLSpellList(["attack order", "defensive order", "maneuvering order", "steadfast order", "support order"]),
		spellcastingAbility : 4
	}]
};

// ======================= ACADEMIES OF WAR =======================

var LLWrlExplX = { cls : "warlord(laserllama)", sheet : "tactical exploits", sheetName : "Tactical Exploits", ability : LLWarlordAbility };

AddSubClass("warlord(laserllama)", "academy of claws", {
	regExpSearch : /^(?=.*claw)(?=.*warlord).*$/i,
	subname : "Academy of Claws",
	fullname : "Claws Warlord",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Monstrous Minion",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As an action, a " + (n < 14 ? "Beast or Monstrosity" : "Beast, Monstrosity, Aberration, Dragon, Giant, Ooze, Plant, or Undead") + " of CR \u2264 " + Math.floor(n / 3) + " within 10 ft that hears me makes a Cha save (friendly: auto-fail)",
					"Failure: it becomes my loyal Minion (one at a time); success: immune for 24 hours",
					"It acts on my turn, Dodging unless I command it as a bonus action; it reverts if I'm incapacitated or it can't see/hear me for 1 hour",
					n < 14 ? "" : "Monstrous Menagerie: after 24 hours as my Minion, it stays friendly indefinitely"
				]);
			}),
			action : [["action", "Subjugate Minion"], ["bonus action", "Command Minion"]]
		},
		"subclassfeature3.1" : LLPathExploits("Claw", [[3, ["attack order", "imposing presence"]], [5, ["rending strike", "wild charge"]], [9, ["survey wilderness"]]], LLWrlExplX),
		"subclassfeature6" : {
			name : "Iron Command",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc("As a reaction when my Minion within " + (n < 18 ? 15 : 30) + " ft makes an attack, check, or save, I add my Leadership mod to its roll" + (n < 18 ? "" : "; within that range, it resists B/P/S damage"));
			}),
			action : [["reaction", ""]]
		},
		"subclassfeature14" : {
			name : "Monstrous Menagerie",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("My Minion can be an Aberration, Dragon, Giant, Ooze, Plant, or Undead; after 24 hours as my Minion, it stays friendly indefinitely")
		},
		"subclassfeature18" : {
			name : "Total Domination",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Iron Command has a 30-ft range; while within that range, my Minion resists bludgeoning, piercing, and slashing damage")
		}
	}
});

AddSubClass("warlord(laserllama)", "academy of counsel", {
	regExpSearch : /^(?=.*counsel)(?=.*warlord).*$/i,
	subname : "Academy of Counsel",
	fullname : "Counsel Warlord",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Counselor's Protege",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I train a loyal Protege (see Companion page); it acts on my turn, Dodging unless I command it as a bonus action",
				"At 0 HP it makes death saves; as an action, I touch it and expend an Exploit Die to stabilize it",
				"If it dies, I can spend 8 hours recruiting a new willing Humanoid Protege"
			]),
			action : [["bonus action", "Command Protege"]],
			creaturesAdd : [["Protege"]]
		},
		"subclassfeature3.1" : LLPathExploits("Counselor", [[3, ["defensive order", "support order"]], [5, ["insightful order", "soothing speech"]], [9, ["forgotten knowledge"]]], LLWrlExplX),
		"subclassfeature6" : {
			name : "Invigorating Orders",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I target my Protege with an Exploit, it has adv. on its next check, attack, or save; it gains proficiency in Wis saves, heavy armor, and martial weapons")
		},
		"subclassfeature14" : {
			name : "Exalted Protege",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("My Protege uses the Exalted Protege stat block; I learn heroic order (not counted) and can use it on my Protege once per long rest without its usual limit"),
			creaturesAdd : [["Exalted Protege"]]
		},
		"subclassfeature14.1" : LLPathExploits("Exalted Protege", [[14, ["heroic order"]]], {
			cls : "warlord(laserllama)", sheet : "tactical exploits", sheetName : "Tactical Exploits", ability : LLWarlordAbility,
			name : "Exalted Protege Exploit",
			minlevel : 14
		}),
		"subclassfeature18" : {
			name : "Legendary Tandem",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : levels.map(function (n) {
				return LLdesc("Within 30 ft of each other, my Protege and I have adv. on saves and can't have disadv. on attacks; its Heroic Determination recharges on a short rest" + (n < 20 ? "" : " (on an attack, it's a critical hit)"));
			})
		}
	}
});
var LLProtegeHP = {
	hp : function (totalHD, HDobj, prefix) {
		if (!classes.known["warlord(laserllama)"]) return;
		var lvl = classes.known["warlord(laserllama)"].level;
		HDobj.alt.push(5 + 5 * lvl);
		HDobj.altStr.push(" = 5 as a base\n + 5 \xD7 " + lvl + " from five times its Warlord's level (" + (5 * lvl) + ")");
	},
	setAltHp : true
};
CreatureList["protege"] = {
	name : "Protege",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Humanoid",
	alignment : "Same as its Warlord",
	ac : 16,
	hp : 20,
	hd : [3, 8],
	hdLinked : ["warlord(laserllama)"],
	minlevelLinked : ["warlord(laserllama)"],
	speed : "30 ft",
	scores : [12, 16, 14, 13, 8, 10],
	saves : ["", 5, "", "", "", ""],
	skills : { "athletics" : 3, "history" : 3 },
	senses : "",
	passivePerception : 9,
	languages : "Common and one additional language",
	challengeRating : "1",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	attacksAction : 1,
	attacks : [{
		name : "Dagger",
		ability : 2,
		damage : [1, 4, "slashing"],
		range : "Melee (5 ft)",
		description : "Finesse, light, thrown"
	}, {
		name : "Shortbow",
		ability : 2,
		damage : [1, 6, "piercing"],
		range : "80/320 ft",
		description : "Ammunition, two-handed"
	}],
	traits : [{
		name : "Equipment",
		description : "Proficient with light and medium armor, shields, and simple weapons (from 6th level: Wis saves, heavy armor, martial weapons); equipped with leather armor, a shield, a shortbow, and a dagger."
	}, {
		name : "Hit Dice",
		description : "It has d8 Hit Dice equal to its Warlord's level and benefits from short and long rests."
	}, {
		name : "Quick Student",
		description : "Its save, skill, and attack bonuses increase with its Warlord's Proficiency Bonus. It makes death saving throws like a player character."
	}],
	calcChanges : LLProtegeHP
};
CreatureList["exalted protege"] = {
	name : "Exalted Protege",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Humanoid",
	alignment : "Same as its Warlord",
	ac : 18,
	hp : 75,
	hd : [14, 8],
	hdLinked : ["warlord(laserllama)"],
	minlevelLinked : ["warlord(laserllama)"],
	speed : "30 ft",
	scores : [18, 16, 16, 15, 11, 12],
	saves : ["", 8, "", "", 5, ""],
	skills : { "athletics" : 9, "history" : 7 },
	senses : "",
	passivePerception : 10,
	languages : "Common and one additional language",
	challengeRating : "5",
	proficiencyBonus : 5,
	proficiencyBonusLinked : true,
	attacksAction : 2,
	attacks : [{
		name : "Greatsword",
		ability : 1,
		damage : [2, 6, "slashing"],
		range : "Melee (5 ft)",
		description : "Heavy, two-handed; two attacks when commanded to make a weapon attack"
	}, {
		name : "Longbow",
		ability : 2,
		damage : [1, 8, "piercing"],
		range : "150/600 ft",
		description : "Ammunition, heavy, two-handed; two attacks when commanded to make a weapon attack"
	}],
	traits : [{
		name : "Heroic Determination",
		description : "Once per long rest (short rest from its Warlord's 18th level), when it misses an attack or fails a check or save, it can replace its d20 roll with its Warlord's level."
	}, {
		name : "Hit Dice",
		description : "It has d8 Hit Dice equal to its Warlord's level and benefits from short and long rests; it wears plate."
	}, {
		name : "Quick Student",
		description : "Its save, skill, and attack bonuses increase with its Warlord's Proficiency Bonus. It makes death saving throws like a player character."
	}],
	calcChanges : LLProtegeHP
};

AddSubClass("warlord(laserllama)", "academy of liberty", {
	regExpSearch : /^(?=.*liberty)(?=.*warlord).*$/i,
	subname : "Academy of Liberty",
	fullname : "Liberty Warlord",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Coordinated Assault",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I can issue a support order as a bonus action on each of my turns"),
			action : [["bonus action", "Support Order"]]
		},
		"subclassfeature3.1" : LLPathExploits("Liberty", [[3, ["first aid", "support order"]], [5, ["rejuvenating order", "surprise attack"]], [9, ["inspirational speech"]], [14, ["equip militia"]]], LLWrlExplX),
		"subclassfeature3.2" : {
			name : "Salt of the Earth",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("My HP maximum increases by my Warlord level; I add my Exploit Die to checks to interact with common folk"),
			calcChanges : {
				hp : function (totalHD) {
					if (classes.known["warlord(laserllama)"]) return [classes.known["warlord(laserllama)"].level, "Salt of the Earth (Warlord level)"];
				}
			}
		},
		"subclassfeature6" : {
			name : "Band Together",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				var r = n < 18 ? 15 : 30;
				return LLdesc("As a reaction when a creature within " + r + " ft takes damage, I divide it evenly among willing creatures within " + r + " ft of it that hear me");
			}),
			action : [["reaction", ""]]
		},
		"subclassfeature14" : {
			name : "Strength in Numbers",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : levels.map(function (n) {
				return LLdesc([
					"When I roll initiative, I regain an Exploit Die per allied creature within " + (n < 18 ? 15 : 30) + " ft",
					"I learn equip militia (not counted); I can use it during a rest, once per long rest without an Exploit Die"
				]);
			}),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature18" : {
			name : "Grand Revolutionary",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Band Together and Strength in Numbers reach 30 ft; Inspiring Word and Rallying Cry can target up to three creatures (Rallying Cry: same failed save)")
		}
	}
});

AddSubClass("warlord(laserllama)", "academy of navigators", {
	regExpSearch : /^(?=.*navigat)(?=.*warlord).*$/i,
	subname : "Academy of Navigators",
	fullname : "Navigator Warlord",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLPathExploits("Navigator", [[3, ["maneuvering order", "roguish charm"]], [5, ["intimidating command", "resilient order"]], [9, ["recruit mercenary"]]], LLWrlExplX),
		"subclassfeature3.1" : {
			name : "Parley",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc("As an action, " + (n < 18 ? "I expend an Inspiring Word to" : "I") + " improve the attitude of a creature within 15 ft that sees, hears, and understands me by one step (once per 24 hours; not if attacked by us in 24 hours)");
			}),
			action : [["action", ""]]
		},
		"subclassfeature3.2" : LLAddFightingStyles({
			name : "Seafarer",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency with navigator's tools, water vehicles, and Perception, using my Leadership ability for them",
				"I learn the Mariner Fighting Style (another Warlord Style if I know it) as an extra Style; use \"Choose Feature\""
			]),
			skills : ["Perception"],
			toolProfs : ["Navigator's tools", "Vehicles (water)"],
			extraname : "Seafarer Fighting Style",
			extraTimes : levels.map(function (n) { return n < 3 ? 0 : 1; })
		}, LLFightingStyleLists["warlord"], false),
		"subclassfeature6" : {
			name : "Navigator's Crew",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("During a long rest, I pact with up to my Leadership mod willing creatures as my Crew; aboard our vessel, they add my Leadership mod to related checks")
		},
		"subclassfeature6.1" : {
			name : "Rally the Crew",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				var r = n < 18 ? 15 : 30;
				return LLdesc("Crew within " + r + " ft add their Prof Bonus to saves they aren't proficient in; as a bonus action, I issue an Order to a Crew member within " + r + " ft");
			}),
			action : [["bonus action", "Order (Crew member)"]]
		},
		"subclassfeature14" : {
			name : "First Mate",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("A Mercenary from recruit mercenary (I regain the Exploit Die as normal) or a Crew member can be my First Mate: it gains Seafarer and doesn't count against my Crew")
		},
		"subclassfeature18" : {
			name : "Illustrious Admiral",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Rally the Crew reaches 30 ft; I can use Parley on a creature I speak with without expending an Inspiring Word")
		}
	}
});

AddSubClass("warlord(laserllama)", "academy of order", {
	regExpSearch : /^(?=.*order)(?=.*warlord).*$/i,
	subname : "Academy of Order",
	fullname : "Order Warlord",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLPathExploits("Order", [[3, ["defensive order", "disarm"]], [5, ["hold the line", "soothing speech"]], [9, ["survey settlement"]]], LLWrlExplX),
		"subclassfeature3.1" : {
			name : "Keeper of Order",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency in Insight or Investigation and can use my Leadership ability for both",
				"When I drop a creature to 0 HP with a nonlethal melee attack, I can restrain it as a bonus action (escape DC = my Exploit DC)"
			]),
			skillstxt : "Choose one from Insight or Investigation",
			action : [["bonus action", "Restrain (Keeper of Order)"]]
		},
		"subclassfeature3.2" : {
			name : "Law's Shield",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("As a reaction when a creature I see within 15 ft is hit, I issue it a defensive order, imposing disadv. on that attack; then an Inspiring Word"),
			usages : "Leadership mod per ",
			usagescalc : "event.value = LLWrlLeadMod();",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature6" : {
			name : "Halt",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc("As a reaction when a creature I see within 30 ft moves, I expend an Inspiring Word: Wis save (if it understands me) or speed 0 until its next turn" + (n < 18 ? "" : " and restrained") + "; success: immune 24 hours");
			}),
			action : [["reaction", ""]]
		},
		"subclassfeature6.1" : {
			name : "Stalwart Defender",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("Once per short rest, I use hold the line without an Exploit Die; my hold the line reaches 15 ft and I can issue a defensive order as a bonus action each turn"),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", "Defensive Order (Hold the Line)"]]
		},
		"subclassfeature14" : {
			name : "Bastion of Order",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("While using hold the line, Law's Shield and Halt cost no uses; I can move 10 ft without ending hold the line")
		},
		"subclassfeature14.1" : {
			name : "Unerring Eye",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("I automatically detect the presence of illusion magic and shapeshifters (but not their true forms)")
		},
		"subclassfeature18" : {
			name : "High Authority",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I always exude hold the line to chosen creatures within 15 ft while moving and acting normally; a failed Halt save also restrains")
		}
	}
});

var LLZealSlots = levels.map(function (n) { return n < 3 ? 0 : n < 5 ? 1 : 2; });
var LLZealSlotLvl = levels.map(function (n) { return n < 3 ? 0 : n < 7 ? 1 : n < 13 ? 2 : n < 19 ? 3 : 4; });
AddSubClass("warlord(laserllama)", "academy of zeal", {
	regExpSearch : /^(?=.*zeal)(?=.*warlord).*$/i,
	subname : "Academy of Zeal",
	fullname : "Zeal Warlord",
	source : [["GMB:LL", 0]],
	spellcastingFactor : "warlock1",
	spellcastingTable : [[0, 0, 0, 0, 0, 0, 0, 0, 0]].concat(levels.map(function (n, idx) {
		var a = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		if (LLZealSlotLvl[idx]) a[LLZealSlotLvl[idx] - 1] = LLZealSlots[idx];
		return a;
	})),
	spellcastingList : {
		spells : LLSpellList(["blade ward", "booming blade", "green-flame blade", "light", "message", "resistance", "sacred flame", "spare the dying", "sword burst", "thaumaturgy", "toll the dead", "true strike", "bless", "command", "compelled duel", "cure wounds", "divine favor", "ethereal anchor", "guiding bolt", "heroism", "inflict wounds", "jump", "protection from evil & good", "sanctuary", "searing smite", "shield of faith", "thunderous smite", "wrathful smite", "aid", "blindness/deafness", "branding smite", "darkness", "find steed", "magic weapon", "restoration", "spiritual weapon", "warding bond", "zone of truth", "aura of vitality", "beacon of hope", "blinding smite", "conjure volley", "crusader's mantle", "flame arrows", "protection from energy", "remove curse", "revivify", "spirit guardians", "aura of life", "aura of purity", "banishment", "death ward", "guardian of faith", "staggering smite"])
	},
	spellcastingKnown : {
		cantrips : [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		spells : [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
	},
	features : {
		"subclassfeature3" : {
			name : "Anointed Magic",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I can cast known Zeal cantrips/spells, using my Leadership ability; all my slots are of my Slot Level",
				"I regain all slots on a short or long rest; a holy symbol (can be on my shield) is my spellcasting focus"
			]),
			additional : levels.map(function (n, idx) {
				return n < 3 ? "" : LLZealSlots[idx] + " \xD7 " + ["1st", "2nd", "3rd", "4th"][LLZealSlotLvl[idx] - 1] + "-level slot" + (LLZealSlots[idx] > 1 ? "s" : "");
			}),
			eval : function () { if (CurrentVars && CurrentVars.LLWrlAbi) LLWrlSetAbi(CurrentVars.LLWrlAbi); },
			changeeval : function () { if (CurrentVars && CurrentVars.LLWrlAbi && CurrentSpells["warlord(laserllama)"] && CurrentSpells["warlord(laserllama)"].ability !== CurrentVars.LLWrlAbi) LLWrlSetAbi(CurrentVars.LLWrlAbi); }
		},
		"subclassfeature3.1" : LLPathExploits("Divine Mandate", [[3, ["attack order"]]], {
			cls : "warlord(laserllama)", sheet : "tactical exploits", sheetName : "Tactical Exploits", ability : LLWarlordAbility,
			name : "Divine Mandate",
			minlevel : 3
		}),
		"subclassfeature3.2" : {
			name : "Divine Mandate: Religion",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Religion and add my Leadership mod to Religion checks; I know attack order (not counted)"),
			skills : ["Religion"]
		},
		"subclassfeature6" : {
			name : "Channel Divinity",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"As an action, I hold my holy symbol aloft for one effect; when out of uses, I can expend an Anointed Magic slot",
				"Anointed Disciple: for 10 min, I add my Exploit Die to checks using my Leadership ability",
				"Mantle of Command: for 1 min, as a bonus action each turn, I make a weapon attack or issue one Order"
			]),
			usages : 2,
			recovery : "long rest",
			additional : "regain 1 on a short rest",
			action : [["action", ""], ["bonus action", "Attack/Order (Mantle of Command)"]]
		},
		"subclassfeature14" : {
			name : "Words of Zeal",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("My Inspiring Word restores the maximum HP; targets of my attack order can deal radiant damage with their weapon attacks that turn")
		},
		"subclassfeature18" : {
			name : "Favored Servant",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("When I take the Attack action, I can cast a 1-action Zeal spell in place of one attack; when I expend an Anointed Magic slot, I regain my level in HP, an Exploit Die, or an Inspiring Word")
		}
	}
});

// Make the LaserLlama subclasses selectable in the Class/Subclass selection dialogs
if (typeof LLFixSubclassNames === "function") {
	LLFixSubclassNames();
	// and again after all add-on scripts have run (other scripts may add or change subclasses)
	if (typeof RunFunctionAtEnd === "function") RunFunctionAtEnd(function () { LLFixSubclassNames(); });
}
