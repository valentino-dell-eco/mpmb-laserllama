/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	REQUIRES: "Laserllama Common Attributes 20261019.js" (import it first).
	Do not import the old LaserLlama files in the same sheet.

	-INFORMATION-
	Content:	Alternate Bard, Cleric, Druid, Sorcerer (+ Expanded), Warlock (+ Expanded), Wizard
	Files:		LaserLlama - Alternate Bard v2.0.0.js
			LaserLlama - Alternate Cleric v1.1.0.js
			LaserLlama - Alternate Druid v1.1.0.js
			LaserLlama - Alternate Sorcerer v4.0.1.js
			LaserLlama - Alternate Sorcerer Expanded v4.0.1.js
			LaserLlama - Alternate Warlock v3.2.0.js
			LaserLlama - Alternate Warlock Expanded v3.2.0.js
			LaserLlama - Alternate Wizard v1.3.0.js
	Sheet:		v13.2.3
	Code by:	"ll-updates" release
*/

var iFileName = "Laserllama Alternate Spellcasters.js";
RequiredSheetVersion("13.2.3");

// This file needs "Laserllama Common Attributes 20261019.js": stop with a clear message if it isn't loaded yet
if (typeof LLCommonAttributesVersion === "undefined") {
	throw new Error("\n\nATTENZIONE / WARNING\n\nPer usare \"Laserllama Alternate Spellcasters.js\" devi prima importare \"Laserllama Common Attributes 20261019.js\". Importa quel file e poi importa di nuovo questo.\n\nTo use this file, first import \"Laserllama Common Attributes 20261019.js\", then import this file again.\n");
}

// ======================================================================
// LaserLlama - Alternate Bard v2.0.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Alternate Bard"
	Effect:		This script adds the Alternate Bard class (half caster), its Chords of Power, and its 8 Bardic Traditions.
				Alternate Bard v2.0.0 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Bard (LaserLlama)" in the Class field (e.g. "Skald Bard (LaserLlama)")
*/


if (typeof LLAddFightingStyles !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

if (ClassList["bard"]) ClassList["bard"].regExpSearch = /^(?=.*(bard|minstrel|troubadour|jongleur))(?!.*laserllama).*$/i;

LLBardDie = function (n, bTrue) {
	if (bTrue) return n < 5 ? "d6" : n < 11 ? "d8" : n < 17 ? "d10" : "d12";
	return n < 5 ? "d4" : n < 11 ? "d6" : n < 17 ? "d8" : "d10";
};
LLBardLvl = function () { return classes.known["bard(laserllama)"] ? classes.known["bard(laserllama)"].level : 0; };

var LLBardSpells = [
	"blade ward", "booming blade", "dancing lights", "friends", "glitterbeam", "guidance", "light", "mage hand", "mending", "message", "minor illusion", "prestidigitation", "resistance", "thunderclap", "true strike", "vicious mockery",
	"bane", "cause fear", "charm person", "color spray", "command", "comprehend languages", "cure wounds", "detect magic", "disguise self", "dissonant whispers", "faerie fire", "feather fall", "healing word", "heroism", "hideous laughter", "identify", "illusory script", "longstrider", "silent image", "sleep", "thunderwave",
	"aid", "blindness/deafness", "calm emotions", "crown of madness", "detect thoughts", "enhance ability", "enlarge/reduce", "heat metal", "hold person", "invisibility", "restoration", "locate creature", "locate object", "magic mouth", "mirror image", "phantasmal force", "pyrotechnics", "see invisibility", "shatter", "silence", "skywrite", "suggestion", "zone of truth",
	"bestow curse", "clairvoyance", "dire wail", "dispel magic", "enemies abound", "fear", "haste", "hypnotic pattern", "irresistible dance", "major image", "mass healing word", "nondetection", "sending", "slow", "sonic wave", "tiny hut", "tongues",
	"banishment", "charm monster", "compulsion", "confusion", "dimension door", "fabricate", "freedom of movement", "greater invisibility", "hallucinatory terrain", "phantasmal killer",
	"animate objects", "dominate person", "dream", "geas", "hold monster", "legend lore", "mass cure wounds", "mislead", "modify memory", "seeming", "skill empowerment"
];
LLAddSpellsToClass("bard(laserllama)", LLBardSpells);

// Bardic Inspiration feature (also used by the True Singer with bigger dice)
LLBardInspiration = function (bTrue) {
	return {
		name : "Bardic Inspiration",
		source : [["GMB:LL", 0]],
		minlevel : 1,
		description : LLdesc([
			"As a reaction when a creature within 30 ft that can hear me fails a check or save or misses an attack,",
			"I can expend a Bardic Inspiration Die, roll it, and add it to the roll (possibly turning it into a success)",
			"I have half my bard level + Cha mod Bardic Inspiration Dice; I regain all on a short or long rest"
		]),
		additional : levels.map(function (n) { return LLBardDie(n, bTrue) + (bTrue && n >= 3 ? " (True Inspiration)" : ""); }),
		usages : "\u00BD bard level + Cha mod per ",
		usagescalc : "event.value = Math.max(1, Math.floor(LLBardLvl() / 2) + Number(What('Cha Mod')));",
		recovery : "short rest",
		action : [["reaction", ""]]
	};
};

// Chords of Power: [name, minimum level, description]
var LLChords = [
	["Inspiring Melody", 0, ["As an action, I expend up to Cha mod Inspiration Dice, choosing a creature that can hear me within 30 ft for each", "Each gains temp HP equal to the maximum roll of my Bardic Inspiration Die"], "action"],
	["Enthralling Performance", 0, ["After performing for 1 minute, I expend 1 die: listeners of my choice within 90 ft make a Wis save", "Fail: charmed for 1 hour (ends if we're hostile to the audience), they idolize me; success: unaware of the attempt"], ""],
	["Irritating Tune", 0, ["As an action, I expend 1 die for a performance until the start of my next turn (concentration)", "Creatures of my choice in 30 ft that hear it at the start of their turn: Wis save or disadv. on attacks vs. others than me"], "action"],
	["Lay of Alacrity", 0, ["As an action, I expend 1 die for a performance until the start of my next turn (concentration)", "Creatures of my choice in 30 ft that hear it at the start of their turn gain 5 \xD7 Cha mod ft (min 5 ft) speed that turn"], "action"],
	["Song of Rest", 0, ["During a short rest, I expend and roll any number of dice and restore that many HP, divided among resting listeners", "A creature can benefit from this only once per long rest"], ""],
	["Countersong", 6, ["When I hear a creature within 30 ft cast a spell, I can expend and roll 1 die (reaction)", "The caster makes a spellcasting ability check + spell level; if lower than 10 + my roll, the spell fails"], "reaction"],
	["Disorienting Dirge", 6, ["As an action, I expend 1 die for a performance until the start of my next turn (concentration)", "Creatures of my choice in 30 ft that hear it have disadv. on Wis saves and saves to maintain concentration"], "action"],
	["Hymn of Courage", 6, ["As an action, I expend 1 die for a performance until the start of my next turn (concentration)", "Creatures of my choice in 30 ft that hear it are immune to (and unaffected by) charmed and frightened"], "action"],
	["Song of Confidence", 6, ["As an action, I expend 1 die for a performance until the start of my next turn (concentration)", "Creatures of my choice in 30 ft that hear it are proficient in all saving throws"], "action"],
	["Heroic Anthem", 10, ["As an action, I expend 1 die for a performance until the start of my next turn (concentration)", "Creatures of my choice in 30 ft that hear it add my Cha mod (min +1) to their first damage roll before then"], "action"],
	["Confounding Canticle", 10, ["As an action, I expend 1 die for a performance until the start of my next turn (concentration)", "Creatures of my choice in 30 ft hearing it at the start of their turn: Wis save or half speed, no reactions,", "and disadv. on ability checks and attack rolls until the start of my next turn"], "action"],
	["Mythic Anthem", 18, ["As an action, I expend 1 die for a performance until the start of my next turn (concentration)", "Creatures of my choice in 30 ft that hear it resist damage from spells and magical effects; ends if I move"], "action"],
	["Legendary Chord", 18, ["As an action, I expend up to Cha mod dice, choosing a creature that can hear me within 30 ft for each", "Each can immediately make one weapon attack or cast a spell of 1st level or lower"], "action"]
];
LLChordPrereq = function (nLvl) {
	return function (v) { return LLBardLvl() >= nLvl; };
};

ClassList["bard(laserllama)"] = {
	name : "Bard (LaserLlama)",
	regExpSearch : /^(?=.*bard)(?=.*laserllama).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Charisma",
	prereqs : "Charisma 13",
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Dex", "Cha"],
	abilitySave : 6,
	spellcastingFactor : 2,
	spellcastingKnown : {
		cantrips : [0, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11]
	},
	spellcastingList : {
		"class" : "bard(laserllama)",
		level : [0, 5]
	},
	skillstxt : {
		primary : "Choose three from Acrobatics, Arcana, Deception, History, Insight, Investigation, Perception, Performance, Persuasion, Religion, Sleight of Hand, and Stealth",
		secondary : "Choose one from Acrobatics, Arcana, Deception, History, Insight, Investigation, Perception, Performance, Persuasion, Religion, Sleight of Hand, and Stealth"
	},
	armorProfs : {
		primary : [true, true, false, false],
		secondary : [true, false, false, false]
	},
	weaponProfs : {
		primary : [true, false, ["rapier", "shortsword"]]
	},
	toolProfs : {
		primary : [["Musical instrument", 1], ["Any tool", 1]],
		secondary : [["Musical instrument", 1]]
	},
	equipment : "Bard (LaserLlama) starting equipment:" +
		"\n \u2022 A rapier -or- a shortsword -or- any simple weapon;" +
		"\n \u2022 Leather armor -or- a chain shirt;" +
		"\n \u2022 A diplomat's pack -or- an entertainer's pack;" +
		"\n \u2022 One musical instrument of my choice and a dagger." +
		"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Bardic Tradition", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	features : {
		"bardic inspiration" : LLBardInspiration(false),
		"folklore" : {
			name : "Folklore",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I gain proficiency with a skill and with a tool or a language of my choice",
				"If I choose a skill or tool I'm already proficient with, I gain expertise with it instead",
				"I gain this benefit again at 6th, 10th, 14th, and 18th level"
			]),
			additional : levels.map(function (n) {
				var x = n < 6 ? 1 : n < 10 ? 2 : n < 14 ? 3 : n < 18 ? 4 : 5;
				return x + " skill" + (x > 1 ? "s" : "") + " + " + x + " tool" + (x > 1 ? "s" : "") + "/language" + (x > 1 ? "s" : "");
			}),
			skillstxt : "Choose one skill and one tool or language (gain expertise if already proficient)"
		},
		"spellcasting" : {
			name : "Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I can cast bard cantrips/spells that I know, using Charisma as my spellcasting ability",
				"I can use a musical instrument I'm proficient with as a spellcasting focus for my bard spells",
				"I can cast my known bard spells as rituals if they have the ritual tag"
			]),
			additional : levels.map(function (n, idx) {
				var aC = [0, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
				var aS = [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11];
				return n < 2 ? "" : aC[idx] + " cantrips & " + aS[idx] + " spells known";
			})
		},
		"chords of power" : {
			name : "Chords of Power",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I know Chords of Power that use my Bardic Inspiration Die and spell save DC; use \"Choose Feature\" to select them",
				"During a long rest, I can spend 1 hour to replace one Chord I know with another"
			]),
			additional : levels.map(function (n) { return n < 2 ? "" : (n < 6 ? 2 : n < 10 ? 3 : n < 14 ? 4 : n < 18 ? 5 : 6) + " Chords known"; }),
			extraname : "Chord of Power",
			extrachoices : [],
			extraTimes : levels.map(function (n) { return n < 2 ? 0 : n < 6 ? 2 : n < 10 ? 3 : n < 14 ? 4 : n < 18 ? 5 : 6; })
		},
		"subclassfeature3" : {
			name : "Bardic Tradition",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc('Choose a Bardic Tradition that shapes my art and put it in the "Class" field ')
		},
		"magical secrets" : {
			name : "Magical Secrets",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I learn two spells from any class list at 3rd (1st-level), 5th (2nd), 9th (3rd), 13th (4th), and 17th level (5th)",
				"They count as bard spells, but not against my spells known, and can't be replaced"
			]),
			additional : levels.map(function (n) { return n < 3 ? "" : (n < 5 ? 2 : n < 9 ? 4 : n < 13 ? 6 : n < 17 ? 8 : 10) + " spells"; }),
			spellcastingBonus : [
				{ name : "Magical Secrets (1st)", "class" : "any", level : [1, 1], times : 2 },
				{ name : "Magical Secrets (2nd)", "class" : "any", level : [2, 2], times : levels.map(function (n) { return n < 5 ? 0 : 2; }) },
				{ name : "Magical Secrets (3rd)", "class" : "any", level : [3, 3], times : levels.map(function (n) { return n < 9 ? 0 : 2; }) },
				{ name : "Magical Secrets (4th)", "class" : "any", level : [4, 4], times : levels.map(function (n) { return n < 13 ? 0 : 2; }) },
				{ name : "Magical Secrets (5th)", "class" : "any", level : [5, 5], times : levels.map(function (n) { return n < 17 ? 0 : 2; }) }
			]
		},
		"harmonious recovery" : {
			name : "Harmonious Recovery",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Once per long rest during a short rest, I can perform for 10 minutes to regain expended spell slots"),
			additional : "Cha mod slots (min one 1st-level)",
			usages : 1,
			recovery : "long rest"
		},
		"bardic virtuoso" : {
			name : "Bardic Virtuoso",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"I add double my Prof Bonus to ability checks that incorporate a musical instrument",
				"I can use my action on the next turn to continue a Chord that lasts until my next turn without expending a die"
			])
		},
		"font of inspiration" : {
			name : "Font of Inspiration",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"When I roll initiative, I regain one expended Bardic Inspiration Die",
				"As a bonus action, I can expend a spell slot to regain Inspiration Dice equal to the slot's level"
			]),
			action : [["bonus action", "Font of Inspiration (slot)"]]
		},
		"mythic secrets" : {
			name : "Mythic Secrets",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("I learn a 6th and a 7th-level spell from any class list; I can cast each once per long rest at its lowest level"),
			spellcastingBonus : [
				{ name : "Mythic Secrets (6th)", "class" : "any", level : [6, 6], firstCol : "oncelr" },
				{ name : "Mythic Secrets (7th)", "class" : "any", level : [7, 7], firstCol : "oncelr" }
			]
		}
	}
};
(function () {
	var oFea = ClassList["bard(laserllama)"].features["chords of power"];
	for (var i = 0; i < LLChords.length; i++) {
		var a = LLChords[i];
		oFea.extrachoices.push(a[0]);
		var oCh = {
			name : a[0],
			source : [["GMB:LL", 0]],
			description : LLdesc(a[2])
		};
		if (a[1]) {
			oCh.prereqeval = LLChordPrereq(a[1]);
			oCh.submenu = "[bard level " + a[1] + "+]";
		}
		if (a[3]) oCh.action = [[a[3], a[0]]];
		oFea[a[0].toLowerCase()] = oCh;
	}
})();

// ======================= BARDIC TRADITIONS =======================

AddSubClass("bard(laserllama)", "fool", {
	regExpSearch : /^(?=.*fool)(?=.*bard).*$/i,
	subname : "Fool",
	fullname : "Fool",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Satirical Theatrics",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency in Acrobatics, Performance, or Sleight of Hand (my choice)",
				"I learn vicious mockery (or another bard cantrip if I know it); it doesn't count against my cantrips known"
			]),
			skillstxt : "Choose one from Acrobatics, Performance, or Sleight of Hand",
			spellcastingBonus : [{ name : "Satirical Theatrics", spells : LLSpellList(["vicious mockery"]), selection : LLSpellList(["vicious mockery"]), firstCol : "atwill" }]
		},
		"subclassfeature3.1" : {
			name : "Cutting Words",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"As a reaction when a creature within 30 ft that can hear and understand me makes a check or attack roll,",
				"I expend an Inspiration Die and subtract it from the roll (after the roll, before knowing the outcome)"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature3.2" : {
			name : "Tumbling Fool",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"As a bonus action, I start Tumbling until the end of my turn: +10 ft walking speed, climb speed = walking,",
				"opportunity attacks against me have disadv., I move through spaces of creatures my size or larger at no extra cost,",
				"and I reduce falling damage by bard level + Dex mod (min 1)"
			]),
			action : [["bonus action", "Start Tumbling"]]
		},
		"subclassfeature5" : {
			name : "Tumbling Strike",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"Once per turn when I hit with a melee weapon attack while Tumbling, I deal extra damage (rolls of my Inspiration Die)",
				"Instead, I can force a Dex save vs. my spell DC or it falls prone (auto success if it's at least a size larger than me)"
			]),
			additional : levels.map(function (n) { return n < 5 ? "" : (n < 11 ? 1 : n < 15 ? 2 : 3) + " \xD7 " + LLBardDie(n) + " damage"; })
		},
		"subclassfeature11" : {
			name : "Wondrous Tumbler",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc([
				"When I start Tumbling, I can turn invisible and teleport up to 30 ft to a space I can see",
				"I stay invisible until the end of my turn or until I attack, cast a spell, or touch a creature",
				"When out of uses, I can expend a Bardic Inspiration Die to use it again"
			]),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature15" : {
			name : "Fool's Luck",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I miss with an attack roll or fail a saving throw, I can regain one expended Bardic Inspiration Die"),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest"
		}
	}
});

AddSubClass("bard(laserllama)", "loremaster", {
	regExpSearch : /^(?=.*lore)(?=.*master)(?=.*bard).*$/i,
	subname : "Loremaster",
	fullname : "Loremaster",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Bardic Lore",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I learn three spells (instead of two) of each level when I gain Magical Secrets",
				"I gain proficiency in Arcana, History, Medicine, Nature, or Religion (my choice)",
				"I can use Charisma instead of the normal ability for checks with any of these five skills"
			]),
			skillstxt : "Choose one from Arcana, History, Medicine, Nature, or Religion",
			spellcastingBonus : [
				{ name : "Bardic Lore (1st)", "class" : "any", level : [1, 1] },
				{ name : "Bardic Lore (2nd)", "class" : "any", level : [2, 2], times : levels.map(function (n) { return n < 5 ? 0 : 1; }) },
				{ name : "Bardic Lore (3rd)", "class" : "any", level : [3, 3], times : levels.map(function (n) { return n < 9 ? 0 : 1; }) },
				{ name : "Bardic Lore (4th)", "class" : "any", level : [4, 4], times : levels.map(function (n) { return n < 13 ? 0 : 1; }) },
				{ name : "Bardic Lore (5th)", "class" : "any", level : [5, 5], times : levels.map(function (n) { return n < 17 ? 0 : 1; }) }
			]
		},
		"subclassfeature3.1" : {
			name : "Jack of All Trades",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I add half my Proficiency Bonus (rounded down) to any ability check that doesn't already include it"),
			eval : function () { Checkbox('Jack of All Trades', true); },
			removeeval : function () { Checkbox('Jack of All Trades', false); }
		},
		"subclassfeature5" : {
			name : "Potent Performer",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"My bard spells that deal damage or restore HP add one roll of my Inspiration Die to the damage or HP restored",
				"Whenever I roll a Bardic Inspiration Die, I can roll it twice and choose the result"
			])
		},
		"subclassfeature11" : {
			name : "Peerless Skill",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("When I miss an attack or fail a check or save, I can expend an Inspiration Die and add it to the roll")
		},
		"subclassfeature15" : {
			name : "Wondrous Success",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I add an Inspiration Die to a creature's attack, check, or save, I can replace its d20 roll with my bard level"),
			usages : 1,
			recovery : "short rest"
		}
	}
});

AddSubClass("bard(laserllama)", "skald", {
	regExpSearch : /^(?=.*skald)(?=.*bard).*$/i,
	subname : "Skald",
	fullname : "Skald",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Bardic Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency with martial weapons, shields, and heavy armor",
				"I can use my weapon or shield as a spellcasting focus for my bard spells",
				"My hit point maximum increases by 3 + 1 per bard level after 3rd (= my bard level)"
			]),
			armorProfs : [false, false, true, true],
			weaponProfs : [false, true],
			calcChanges : {
				hp : function (totalHD) {
					if (classes.known["bard(laserllama)"]) {
						return [classes.known["bard(laserllama)"].level, "Bardic Warrior (bard level)"];
					}
				}
			}
		},
		"subclassfeature3.1" : {
			name : "Combat Inspiration",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"When my Inspiration Die makes another's weapon attack hit, it also adds one roll of my Inspiration Die to the damage",
				"When I miss with a weapon attack, I can expend an Inspiration Die and add it to the roll"
			])
		},
		"subclassfeature5" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"I can attack twice, instead of once, whenever I take the Attack action on my turn",
				"If I use my action to cast a bard spell or perform a Chord of Power, I can make a weapon attack as a bonus action"
			]),
			attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			action : [["bonus action", "Attack (after spell/Chord)"]]
		},
		"subclassfeature5.1" : {
			name : "Gallant Charge",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("As a reaction when I roll initiative, I expend an Inspiration Die: creatures of my choice within 30 ft that hear me add its roll to initiative"),
			action : [["reaction", ""]]
		},
		"subclassfeature11" : {
			name : "Ringing Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("My weapon attacks deal one roll of my Inspiration Die extra thunder damage; I can forgo it to attack with advantage"),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && (v.isMeleeWeapon || v.isRangedWeapon) && classes.known["bard(laserllama)"]) {
							var n = classes.known["bard(laserllama)"].level;
							fields.Description += (fields.Description ? "; " : "") + "+1" + LLBardDie(n, false) + " thunder dmg (or forgo for adv.)";
						}
					},
					"My weapon attacks deal one roll of my Bardic Inspiration Die extra thunder damage, or I can forgo it to attack with advantage."
				]
			}
		},
		"subclassfeature15" : {
			name : "Heroic Inspiration",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I add an Inspiration Die to another's roll, it also gains Cha mod (min 1) temp HP; while it has them, +10 ft speed")
		}
	}
});

LLExploitTables["bard(laserllama)-blade"] = {
	cls : "bard(laserllama)",
	sub : "bard(laserllama)-blade",
	factor : 0.5,
	dice : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	die : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
	maxDegree : [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3]
};
AddSubClass("bard(laserllama)", "blade", {
	regExpSearch : /^(?=.*(blade|sword))(?=.*bard).*$/i,
	subname : "Blade",
	fullname : "Blade",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Elegant Duelist",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency with scimitars and Performance; I can use melee weapons as a spellcasting focus",
				"I can make Dexterity (Performance) checks incorporating a bladed weapon I'm proficient with instead of Charisma"
			]),
			weaponProfs : [false, false, ["scimitar"]],
			skills : ["Performance"]
		},
		"subclassfeature3.1" : (function () {
			var oFea = {
				name : "Fighting Style",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : LLdesc("Choose a Fighting Style using the \"Choose Feature\" button above; I can replace it when I gain a bard level"),
				choices : []
			};
			LLAddFightingStyles(oFea, ["classical", "dueling", "dual_wielding", "featherweight", "hurler", "versatile"]);
			return oFea;
		})(),
		"subclassfeature3.2" : LLExploitFeature({
			name : "Blade Exploits",
			minlevel : 3,
			cls : "bard(laserllama)",
			list : "fighter(laserllama)",
			tableKey : "bard(laserllama)-blade",
			sheet : "martial exploits",
			sheetName : "Martial Exploits",
			ability : 2,
			notesTitle : "Blade Martial Exploits",
			extraname : "Martial Exploit",
			extraTimes : [0, 0, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7],
			description : LLdesc([
				"I learn Martial Exploits of the Alternate Fighter (use \"Choose Feature\"); I can swap one when I gain a bard level",
				"To use one, I expend a Bardic Inspiration Die, which I roll in place of an Exploit Die; one Exploit per roll",
				"Exploit save DC = 8 + Prof Bonus + Dex mod"
			])
		}),
		"subclassfeature5" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"I can attack twice, instead of once, whenever I take the Attack action on my turn",
				"If I use my action to cast a bard spell or perform a Chord of Power, I can make a melee weapon attack as a bonus action"
			]),
			attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			action : [["bonus action", "Melee attack (after spell/Chord)"]]
		},
		"subclassfeature11" : {
			name : "Deadly Reprisal",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc([
				"As a reaction when a creature I see hits me with a melee weapon attack, I make a melee weapon attack with adv. against it",
				"When I use an Exploit during my action, I can Dash or Disengage as a bonus action"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature15" : {
			name : "Master of Blades",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc([
				"Once per turn, I can use an Exploit without expending an Inspiration Die, rolling a d6 instead",
				"At the end of each long rest, I can replace one Martial Exploit I know with another"
			])
		}
	}
});

AddSubClass("bard(laserllama)", "conspirator", {
	regExpSearch : /^(?=.*(conspirator|whispers))(?=.*bard).*$/i,
	subname : "Conspirator",
	fullname : "Conspirator",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Cunning Influence",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency in Deception and two of: disguise kit, forgery kit, poisoner's kit, or thieves' tools",
				"When I cast a bard spell with a verbal component targeting one creature within 10 ft, only it can hear the component"
			]),
			skills : ["Deception"],
			toolProfs : [["Disguise kit, forgery kit, poisoner's kit, or thieves' tools", 2]]
		},
		"subclassfeature3.1" : {
			name : "Psychic Assault",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc("When I hit with a weapon attack, I can expend an Inspiration Die for two rolls of it extra psychic damage" + (n < 11 ? "" : "; Wis save or frightened of me until my next turn ends"));
			})
		},
		"subclassfeature3.2" : {
			name : "Seeds of Terror",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"After speaking with a creature for 1 min" + (n < 15 ? "" : " (or as an action)") + ", I expend an Inspiration Die to force a Wis save",
					"Fail: for 1 hour, it's frightened of a creature we both see (my choice) and treats it as an enemy",
					"Ends if it or its allies are harmed by me or my allies; the target is unaware of my attempt either way"
				]);
			})
		},
		"subclassfeature5" : {
			name : "Devious Strike",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("Once per turn when I hit a creature with a weapon attack, I deal extra damage (rolls of my Inspiration Die)"),
			additional : levels.map(function (n) { return n < 5 ? "" : (n < 11 ? 1 : n < 15 ? 2 : 3) + " \xD7 " + LLBardDie(n) + " damage"; })
		},
		"subclassfeature5.1" : {
			name : "Stolen Visage",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"As a reaction when a humanoid I see dies within 30 ft, I capture its Visage (only one at a time)",
				"As an action, I consume it to look like it did in life for 1 hour and know what it'd tell a casual acquaintance",
				"Insight vs. my Deception check to see through it; I can end it as an action"
			]),
			action : [["reaction", "Capture Visage"], ["action", "Consume Visage"]]
		},
		"subclassfeature11" : {
			name : "Mental Anguish",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc([
				"My Psychic Assault forces a Wis save or the target is frightened of me until the end of my next turn",
				"When I hit a creature frightened of me with a weapon attack, I can end the condition to make it a critical hit"
			])
		},
		"subclassfeature15" : {
			name : "Sinister Manipulation",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc([
				"I can use Seeds of Terror as an action; on a fail, I can instead make the target believe I know its darkest secret",
				"It's then charmed indefinitely (until hostility) and secretly aids me, short of fighting or risking its life; one at a time"
			]),
			action : [["action", "Seeds of Terror"]]
		}
	}
});

AddSubClass("bard(laserllama)", "counselor", {
	regExpSearch : /^(?=.*(counselor|counsellor|eloquence))(?=.*bard).*$/i,
	subname : "Counselor",
	fullname : "Counselor",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Bardic Counsel",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency in History and either Deception or Persuasion",
				"On History checks about local law or tradition, and on Deception and Persuasion checks, I treat a d20 roll of 7 or lower as 8"
			]),
			skills : ["History"],
			skillstxt : "Choose one from Deception or Persuasion"
		},
		"subclassfeature3.1" : {
			name : "Cutting Logic",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("As a reaction when a creature within 30 ft that can hear and understand me must save vs. another's effect, I subtract an Inspiration Die from its save"),
			action : [["reaction", ""]]
		},
		"subclassfeature3.2" : {
			name : "Potent Advice",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("If my Bardic Inspiration reaction still doesn't make the creature succeed, the die isn't expended")
		},
		"subclassfeature5" : {
			name : "Confounding Logic",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("As an action, a creature within 30 ft that can hear and understand me makes an Int save; fail: psychic damage, no reactions and half speed until my next turn"),
			additional : levels.map(function (n) { return n < 5 ? "" : (n < 11 ? 1 : n < 15 ? 2 : 3) + " \xD7 " + LLBardDie(n) + " psychic damage"; }),
			action : [["action", ""]]
		},
		"subclassfeature5.1" : {
			name : "Elder Tongue",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("As an action, for 1 hour, creatures within 60 ft that know a language understand me as if I spoke their native tongue"),
			action : [["action", ""]]
		},
		"subclassfeature11" : {
			name : "Reliable Counsel",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("On Int checks to recall information or Cha checks to convince a creature, I can replace my d20 roll with my bard level")
		},
		"subclassfeature15" : {
			name : "Peerless Inspiration",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I use my Bardic Inspiration reaction, I can use the die's maximum value instead of rolling it"),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest"
		}
	}
});

AddSubClass("bard(laserllama)", "mesmer", {
	regExpSearch : /^(?=.*(mesmer|glamou?r))(?=.*bard).*$/i,
	subname : "Mesmer",
	fullname : "Mesmer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Glamorous Mantle",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I expend and roll an Inspiration Die: up to Cha mod creatures that see me within 30 ft",
					"gain temp HP equal to the roll and can move up to their speed without provoking opportunity attacks",
					n < 5 ? "" : "The Mantle lasts 1 min (ends if incapacitated or as a bonus action); see Otherworldly Visage"
				]);
			}),
			action : [["bonus action", ""]]
		},
		"subclassfeature3.1" : {
			name : "Mesmerizing Presence",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I learn friends, charm person, and command; they don't count against my cantrips or spells known",
				"I always know the Enthralling Performance Chord; it doesn't count against my Chords known"
			]),
			spellcastingBonus : [
				{ name : "Mesmerizing Presence", spells : LLSpellList(["friends"]), selection : LLSpellList(["friends"]), firstCol : "atwill" },
				{ name : "Mesmerizing Presence", spells : LLSpellList(["charm person", "command"]), selection : LLSpellList(["charm person", "command"]), times : 2 }
			],
			autoSelectExtrachoices : [{ extrachoice : "enthralling performance" }],
			"enthralling performance" : {
				name : "Enthralling Performance (Mesmer)",
				source : [["GMB:LL", 0]],
				description : LLdesc(LLChords[1][2])
			}
		},
		"subclassfeature5" : {
			name : "Otherworldly Visage",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"While my Glamorous Mantle is active, as a bonus action targeting a creature that sees or hears me within 30 ft:",
				"\u2022 I cast charm person or command without a spell slot (effects last only for the Mantle's duration)",
				"\u2022 It gains temp HP equal to one roll of my Inspiration Die and moves up to its speed without provoking"
			]),
			action : [["bonus action", "Otherworldly Visage"]]
		},
		"subclassfeature5.1" : {
			name : "Reflexive Charm",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("As a reaction when a creature that sees me hits me, I expend an Inspiration Die and add it to my AC (free while my Mantle is active)"),
			action : [["reaction", ""]]
		},
		"subclassfeature11" : {
			name : "Mantle of Protection",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc([
				"While my Mantle is active or I perform a Chord, I and chosen creatures within 30 ft that see or hear me:",
				"have adv. on saves vs. charmed, frightened, paralyzed, and stunned, and see through illusions of spell level \u2264 my Cha mod",
				"As a reaction when I roll initiative (not surprised/incapacitated), I can expend an Inspiration Die to activate my Mantle"
			]),
			action : [["reaction", "Activate Mantle (initiative)"]]
		},
		"subclassfeature15" : {
			name : "Majestic Presence",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I cast an enchantment spell on a creature that sees me within 30 ft, I expend an Inspiration Die (free with Mantle) to give it disadv. on the save")
		}
	}
});

AddSubClass("bard(laserllama)", "true singer", {
	regExpSearch : /^(?=.*(true singer|creation))(?=.*bard).*$/i,
	subname : "True Singer",
	fullname : "True Singer",
	source : [["GMB:LL", 0]],
	features : {
		"bardic inspiration" : LLBardInspiration(true),
		"subclassfeature3" : {
			name : "Creator's Song",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As an action, I create a hand-sized inanimate object I'm familiar with, in my hand or within 10 ft (artisan items need tools)",
					"It's visibly magical; HP = bard level, AC = Cha score; it vanishes after 1 hour, at 0 HP, or when I make another",
					"Spell slot for bigger: 1st Tiny, 2nd Small, 3rd Medium, 4th Large, 5th Huge" + (n < 15 ? "" : " (these are permanent)")
				]);
			}),
			action : [["action", ""]]
		},
		"subclassfeature3.1" : {
			name : "True Inspiration",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("My Bardic Inspiration Dice are d6s, d8s at 5th level, d10s at 11th, and d12s at 17th level"),
			additional : levels.map(function (n) { return n < 3 ? "" : LLBardDie(n, true); })
		},
		"subclassfeature5" : {
			name : "Dancing Creation",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : levels.map(function (n) {
				return LLdesc([
					"As an action, I animate a Large or smaller object not worn or carried as a Living Object (see Companion page)",
					"It obeys me and acts on my turn, taking the Dodge action unless I command it as a bonus action",
					n < 15 ? "It lasts 1 min, until I'm incapacitated, I animate another, or it drops to 0 HP" : "It lasts until I animate another object or it's destroyed",
					"When out of uses, I can expend a 1st-level or higher spell slot to use it again"
				]);
			}),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""], ["bonus action", "Command Living Object"]],
			creaturesAdd : [["Living Object (LL)"]],
			creatureOptions : [{
				name : "Living Object (LL)",
				source : [["GMB:LL", 0]],
				size : 2,
				type : "Construct",
				alignment : "Chaotic Good",
				ac : "10+oCha+Prof",
				hp : 10,
				hd : [1, 8],
				speed : "30 ft, fly 30 ft (hover)",
				scores : [12, 16, 16, 2, 4, 8],
				damage_immunities : "poison, psychic",
				condition_immunities : "charmed, exhaustion, poisoned",
				passivePerception : 7,
				senses : "",
				languages : "understands the languages of its creator",
				challengeRating : "1",
				proficiencyBonus : 2,
				proficiencyBonusLinked : true,
				attacksAction : 1,
				attacks : [{
					name : "Slam",
					ability : 0,
					damage : [1, 8, "bludgeoning"],
					modifiers : ["oCha+Prof", "oCha"],
					range : "Melee (5 ft)",
					abilitytodamage : false,
					description : "Magical; die = creator's Bardic Inspiration Die; once per turn on hit: Wis save or half speed until creator's next turn"
				}],
				traits : [{
					name : "Creator's Bond",
					description : "It adds its creator's Proficiency Bonus to any ability check or saving throw it makes."
				}, {
					name : "Enchanting Touch",
					description : "Once per turn when it hits a creature with its Slam, the target must succeed on a Wisdom saving throw against its creator's spell save DC or its speed is halved until the start of its creator's next turn as it dances."
				}, {
					name : "Lively Dance",
					description : "When it makes a Dexterity ability check or saving throw, it adds one roll of its creator's Bardic Inspiration Die."
				}],
				calcChanges : {
					hp : function (totalHD, HDobj, prefix) {
						if (!classes.known["bard(laserllama)"]) return;
						var lvl = classes.known["bard(laserllama)"].level;
						HDobj.alt.push(5 + 5 * lvl);
						HDobj.altStr.push(" = 5 as a base\n + 5 \xD7 " + lvl + " from five times its creator's bard level (" + (5 * lvl) + ")");
					},
					setAltHp : true
				}
			}]
		},
		"subclassfeature5.1" : {
			name : "Moving Inspiration",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("After my Bardic Inspiration reaction resolves, the target can move up to 15 ft without provoking opportunity attacks")
		},
		"subclassfeature11" : {
			name : "Wondrous Chords",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("When I perform a Chord, I can perform two at once (one die each); Bardic Virtuoso continues both with one action")
		},
		"subclassfeature15" : {
			name : "True Song",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc([
				"I learn awaken and can cast it without its material component; then I must finish 1d4 long rests to do so again",
				"My Living Object lasts until I animate another or it's destroyed; awaken on it makes it an independent creature",
				"Objects I create with Creator's Song by expending a spell slot are permanent"
			]),
			spellcastingBonus : [{ name : "True Song", spells : LLSpellList(["awaken"]), selection : LLSpellList(["awaken"]) }]
		}
	}
});

// ======================================================================
// LaserLlama - Alternate Cleric v1.1.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Alternate Cleric"
	Effect:		This script adds the Alternate Cleric class, its Sacred Callings, and its 8 Divine Domains.
				Alternate Cleric v1.1.0 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Cleric (LaserLlama)" in the Class field (e.g. "Life Domain Cleric (LaserLlama)")
*/


if (typeof LLAddFightingStyles !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

if (ClassList["cleric"]) ClassList["cleric"].regExpSearch = /^(?=.*(cleric|priest|clergy|acolyte))(?!.*laserllama).*$/i;
LLClrLvl = function () { return classes.known["cleric(laserllama)"] ? classes.known["cleric(laserllama)"].level : 0; };

var LLClericSpells = [
	"glitterbeam", "guidance", "light", "mending", "resistance", "sacred flame", "spare the dying", "thaumaturgy", "toll the dead", "word of radiance",
	"bane", "bless", "ceremony", "command", "create water", "cure wounds", "detect evil & good", "detect magic", "detect poison & disease", "divine favor", "guiding bolt", "healing word", "heroism", "inflict wounds", "protection from evil & good", "purify food & drink", "sanctuary", "shield of faith",
	"aid", "augury", "blindness/deafness", "calm emotions", "continual flame", "enhance ability", "gentle repose", "hold person", "restoration", "locate creature", "locate object", "prayer of healing", "protection from poison", "silence", "spiritual weapon", "warding bond", "zone of truth",
	"animate dead", "aura of vitality", "beacon of hope", "bestow curse", "clairvoyance", "create food & water", "daylight", "dispel magic", "feign death", "glyph of warding", "life transference", "magic circle", "mass healing word", "meld into stone", "protection from energy", "remove curse", "revivify", "sending", "speak with dead", "spirit guardians", "tongues", "water walk",
	"accursed touch", "aura of life", "aura of purity", "banishment", "control water", "create undead", "death ward", "divination", "freedom of movement", "guardian of faith", "stone shape",
	"commune", "conjure celestial", "contagion", "dawn", "dispel evil & good", "flame strike", "geas", "hallow", "holy weapon", "insect plague", "legend lore", "mass cure wounds", "planar binding", "raise dead", "scrying", "spiritual sundering", "wall of light",
	"astral projection", "blade barrier", "find the path", "forbiddance", "harm", "heal", "heroes' feast", "sunbeam", "true seeing", "word of recall",
	"divine word", "etherealness", "fire storm", "plane shift", "regenerate", "resurrection", "symbol", "temple of the gods",
	"antimagic field", "control weather", "earthquake", "holy aura", "sunburst",
	"gate", "mass heal", "power word: heal", "storm of vengeance", "true resurrection"
];
LLAddSpellsToClass("cleric(laserllama)", LLClericSpells);

LLDomainSpells = function (sName, aSpells, sExtra) {
	return {
		name : sName + " Domain Spells",
		source : [["GMB:LL", 0]],
		minlevel : 2,
		description : LLdesc(["My Domain Spells are always prepared and don't count against my prepared spells"].concat(sExtra ? [sExtra] : [])),
		spellcastingExtra : LLSpellList(aSpells)
	};
};
LLTurnUndead = function (sName) {
	return {
		name : "Channel Divinity: Turn Undead",
		source : [["GMB:LL", 0]],
		minlevel : 3,
		description : LLdesc([
			"As an action, undead within 30 ft make a Wis save; fail: radiant damage (5 \xD7 cleric level) and turned for 1 min",
			"Turned (until it takes damage): no reactions, moves away from me, escapes restraints, or Dodges"
		]),
		additional : levels.map(function (n) { return n < 3 ? "" : (5 * n) + " radiant damage"; }),
		action : [["action", ""]]
	};
};

ClassList["cleric(laserllama)"] = {
	name : "Cleric (LaserLlama)",
	regExpSearch : /^(?=.*cleric)(?=.*laserllama).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Wisdom",
	prereqs : "Wisdom 13",
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Wis", "Cha"],
	abilitySave : 5,
	spellcastingFactor : 1,
	spellcastingKnown : {
		cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : "list",
		prepared : true
	},
	spellcastingList : {
		"class" : "cleric(laserllama)"
	},
	skillstxt : {
		primary : "Choose two from History, Insight, Intimidation, Medicine, Performance, Persuasion, and Religion"
	},
	armorProfs : {
		primary : [true, true, false, true],
		secondary : [true, true, false, true]
	},
	weaponProfs : {
		primary : [true, false]
	},
	toolProfs : {
		primary : [["Musical instrument", 1]]
	},
	equipment : "Cleric (LaserLlama) starting equipment:" +
		"\n \u2022 A mace -or- two daggers -or- a warhammer;" +
		"\n \u2022 Scale mail -or- leather armor -or- chain mail;" +
		"\n \u2022 A light crossbow and 20 bolts -or- any simple weapon;" +
		"\n \u2022 A shield, a holy symbol, and a priest's pack." +
		"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Divine Domain", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	features : {
		"sacred calling" : {
			name : "Sacred Calling",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("Choose the Sacred Calling that represents how I serve my deity using the \"Choose Feature\" button above; it can't be changed"),
			choices : ["Crusader", "Monastic", "Scholastic"],
			"crusader" : {
				name : "Sacred Calling: Crusader",
				description : LLdesc("I gain proficiency with heavy armor and with one martial weapon of my choice"),
				armorProfs : [false, false, true, false],
				weaponProfs : [false, false, ["one martial weapon of choice"]]
			},
			"monastic" : {
				name : "Sacred Calling: Monastic",
				description : LLdesc([
					"I gain proficiency with one set of artisan's tools and with Insight, Medicine, or Perception",
					"Without armor or shield and wielding only bludgeoning weapons, my AC is 10 + Dex mod + Wis mod"
				]),
				toolProfs : [["Artisan's tools", 1]],
				skillstxt : "Choose one from Insight, Medicine, or Perception",
				armorOptions : [{
					regExpSearch : /^(?=.*monastic)(?=.*(defen[cs]e|calling)).*$/i,
					name : "Monastic Defense",
					source : [["GMB:LL", 0]],
					ac : "10+Wis",
					affectsWildShape : true,
					selectNow : true
				}]
			},
			"scholastic" : {
				name : "Sacred Calling: Scholastic",
				description : LLdesc([
					"I learn Celestial (or another sacred language) and gain proficiency with History or Religion (expertise if proficient)",
					"I learn one additional cleric cantrip that doesn't count against my cantrips known"
				]),
				languageProfs : ["Celestial"],
				skillstxt : "Choose one from History or Religion; if already proficient, gain expertise instead",
				spellcastingBonus : [{ name : "Scholastic", "class" : "cleric(laserllama)", level : [0, 0] }]
			}
		},
		"spellcasting" : {
			name : "Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I can cast prepared cleric cantrips/spells, using Wisdom as my spellcasting ability",
				"I prepare Wis mod + cleric level spells during a long rest (1 hour of prayer)",
				"I can use a holy symbol as a spellcasting focus; I can cast prepared ritual spells as rituals"
			]),
			additional : levels.map(function (n, idx) {
				return [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4][idx] + " cantrips known";
			})
		},
		"subclassfeature2" : {
			name : "Divine Domain",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc('Choose a Divine Domain and put it in the "Class" field ')
		},
		"channel divinity" : {
			name : "Channel Divinity",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I can channel divine energy for Divine Restoration and the effects granted by my Divine Domain",
				"Divine Restoration: as a bonus action, I expend X uses to regain one expended spell slot of level X",
				"I regain one expended use after a short rest, and all uses after a long rest"
			]),
			usages : levels.map(function (n) { return n < 3 ? "" : n < 7 ? 2 : n < 15 ? 3 : 4; }),
			recovery : "long rest",
			additional : "1 regained on a short rest",
			action : [["bonus action", "Divine Restoration"]]
		},
		"greater calling" : {
			name : "Greater Calling",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Choose the benefit matching my Sacred Calling using the \"Choose Feature\" button above"),
			choices : ["Greater Crusader", "Greater Monastic", "Greater Scholastic"],
			"greater crusader" : {
				name : "Greater Crusader",
				description : levels.map(function (n) {
					return LLdesc("Once per turn when I hit with a weapon attack, I deal +" + (n < 14 ? "1d8" : "2d8") + " damage of my chosen type (cold, fire, lightning, necrotic, poison, thunder, or radiant)");
				}),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (!v.isSpell && (v.isMeleeWeapon || v.isRangedWeapon) && classes.known["cleric(laserllama)"]) {
								fields.Description += (fields.Description ? "; " : "") + "Once per turn +" + (classes.known["cleric(laserllama)"].level < 14 ? "1d8" : "2d8") + " divine damage";
							}
						},
						"Once per turn when I hit with a weapon attack, I deal extra damage of my chosen type: 1d8 (2d8 from 14th level)."
					]
				}
			},
			"greater monastic" : {
				name : "Greater Monastic",
				description : LLdesc("I have advantage on saves to resist and end the charmed, frightened, and poisoned conditions"),
				savetxt : { adv_vs : ["charmed", "frightened", "poisoned"] }
			},
			"greater scholastic" : {
				name : "Greater Scholastic",
				description : LLdesc("When I deal damage with a cleric cantrip, I add my Wisdom modifier (min +1) to the damage roll"),
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (v.isSpell && v.thisWeapon[3] && SpellsList[v.thisWeapon[3]] && SpellsList[v.thisWeapon[3]].level === 0 && v.thisWeapon[4] && v.thisWeapon[4].indexOf("cleric(laserllama)") !== -1 && /\d/.test(fields.Damage_Die)) {
								output.extraDmg += Math.max(1, Number(What("Wis Mod")));
							}
						},
						"My cleric cantrips add my Wisdom modifier (min +1) to their damage."
					],
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (spellObj.psionic || spellObj.level !== 0 || spName.indexOf("cleric(laserllama)") === -1) return;
							return genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Wis");
						},
						"My cleric cantrips add my Wisdom modifier (min +1) to their damage."
					]
				}
			}
		},
		"divine intervention" : {
			name : "Divine Intervention",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : levels.map(function (n) {
				return LLdesc([
					"As an action, one of my Domain Spells takes effect at a level of my choice (max 5th) without slot or components",
					"Or my deity intervenes within the bounds of my Domain, equal to a 5th-level spell (DM decides)"
				].concat(n < 20 ? [] : ["Miraculous Intervention: once per 2d4 long rests, any cleric spell up to 9th level instead (or a 9th-level-equivalent effect)", "A 24-hour ritual of sacrifice and prayer restores Miraculous Intervention after my next long rest"]));
			}),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		},
		"sanctified calling" : {
			name : "Sanctified Calling",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Choose the benefit matching my Sacred Calling using the \"Choose Feature\" button above"),
			choices : ["Sanctified Crusader", "Sanctified Monastic", "Sanctified Scholastic"],
			"sanctified crusader" : {
				name : "Sanctified Crusader",
				description : LLdesc("The bonus damage of my Greater Crusader feature becomes 2d8")
			},
			"sanctified monastic" : {
				name : "Sanctified Monastic",
				description : LLdesc("With a 10-minute prayer, I gain the benefits of sanctuary on myself until the end of my next long rest (can end early)")
			},
			"sanctified scholastic" : {
				name : "Sanctified Scholastic",
				description : LLdesc("During a short rest, I can replace a number of my prepared spells up to my Wisdom modifier")
			}
		},
		"miraculous intervention" : {
			name : "Miraculous Intervention",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("When I use Divine Intervention, I can cast any cleric spell of up to 9th level; see Divine Intervention"),
			usages : 1,
			recovery : "2d4 LR"
		}
	}
};

// ======================= DIVINE DOMAINS =======================

AddSubClass("cleric(laserllama)", "arcana", {
	regExpSearch : /^(?=.*arcan)(?=.*(domain|cleric)).*$/i,
	subname : "Arcana Domain",
	fullname : "Arcana Domain",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLDomainSpells("Arcana", ["detect magic", "magic missile", "magic weapon", "rope trick", "counterspell", "dispel magic", "arcane eye", "resilient sphere", "arcane hand", "wall of force"], "When I gain a cleric level, I can replace one with a wizard abjuration, divination, or transmutation spell of the same level"),
		"subclassfeature2.1" : {
			name : "Divine Arcana",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I gain proficiency in Arcana (expertise if already proficient) and use Wisdom for Arcana checks",
				"I learn two wizard cantrips that count as cleric spells but not against my cantrips known"
			]),
			skills : [["Arcana", "increment"]],
			spellcastingBonus : [{ name : "Divine Arcana", "class" : "wizard", level : [0, 0], times : 2 }]
		},
		"subclassfeature3" : {
			name : "Channel Divinity: Abjure the Arcane",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"As an action, hostile spellcasters within 30 ft make a Cha save (disadv. if concentrating or celestial, elemental, fey, fiend)",
				"Fail: 5 \xD7 cleric level force damage and turned for 1 min (no reactions, flees or Dodges; ends if damaged)"
			]),
			additional : levels.map(function (n) { return n < 3 ? "" : (5 * n) + " force damage"; }),
			action : [["action", ""]]
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Spellcraft",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"When I cast a cleric spell, I can Channel Divinity for one modification:",
				"\u2022 Elemental Transmutation: change its damage to acid, cold, fire, lightning, or poison and add my Wis mod to it",
				"\u2022 Potent Casting: one target makes its initial save against the spell with disadvantage"
			])
		},
		"subclassfeature6" : {
			name : "Purifying Magic",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I restore HP with a cleric spell, I can also end one spell on the target of a level up to the slot expended")
		},
		"subclassfeature17" : {
			name : "Arcane Archpriest",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("I add one wizard abjuration, divination, or transmutation spell each of 6th, 7th, 8th, and 9th level to my Domain Spells"),
			spellcastingBonus : [
				{ name : "Arcane Archpriest (6th)", "class" : "wizard", school : ["Abjur", "Div", "Trans"], level : [6, 6], prepared : true },
				{ name : "Arcane Archpriest (7th)", "class" : "wizard", school : ["Abjur", "Div", "Trans"], level : [7, 7], prepared : true },
				{ name : "Arcane Archpriest (8th)", "class" : "wizard", school : ["Abjur", "Div", "Trans"], level : [8, 8], prepared : true },
				{ name : "Arcane Archpriest (9th)", "class" : "wizard", school : ["Abjur", "Div", "Trans"], level : [9, 9], prepared : true }
			]
		}
	}
});

AddSubClass("cleric(laserllama)", "death", {
	regExpSearch : /^(?=.*death)(?=.*(domain|cleric)).*$/i,
	subname : "Death Domain",
	fullname : "Death Domain",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLDomainSpells("Death", ["false life", "healing word", "gentle repose", "ray of enfeeblement", "revivify", "speak with dead", "blight", "death ward", "antilife shell", "mass cure wounds"]),
		"subclassfeature2.1" : {
			name : "Grave Guardian",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("Undead targeted by my cleric healing spells make a Cha save instead: radiant damage equal to the healing (half on a success)")
		},
		"subclassfeature2.2" : {
			name : "Keeper of the Veil",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("When my cleric spell restores HP to a creature at 0 HP, I treat any healing dice as their maximum roll")
		},
		"subclassfeature3" : {
			name : "Channel Divinity: Doomed to Die",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("As an action, I curse a creature I see within 30 ft; the first time it's hit before the end of my next turn, it's vulnerable to all that attack's damage"),
			action : [["action", ""]]
		},
		"subclassfeature3.1" : LLTurnUndead(),
		"subclassfeature6" : {
			name : "Grave Guardian (Reaction)",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As a reaction when I or a creature I see within 30 ft suffers a critical hit, I can turn it into a normal hit"),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature18" : {
			name : "Vital Reaping",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Once per turn when a hostile creature dies within 30 ft, I or a creature within 30 ft regain HP equal to its CR (not constructs/undead)")
		}
	}
});

AddSubClass("cleric(laserllama)", "forge", {
	regExpSearch : /^(?=.*forge)(?=.*(domain|cleric)).*$/i,
	subname : "Forge Domain",
	fullname : "Forge Domain",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLDomainSpells("Forge", ["identify", "searing smite", "animate object", "heat metal", "elemental weapon", "minute meteors", "fabricate", "wall of fire", "create construct", "creation"]),
		"subclassfeature2.1" : {
			name : "Disciple of the Forge",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I gain proficiency with smith's tools (or other artisan's tools if already proficient); artisan's tools can be my holy symbol",
				"During a long rest, a 1-hour ritual makes a nonmagical armor/shield (+1 AC) or weapon (+1 attack/damage) magic until I do it again"
			]),
			toolProfs : ["Smith's tools"]
		},
		"subclassfeature3" : {
			name : "Channel Divinity: Divine Artisan",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("With smith's tools and a 1-hour ritual, I transmute metal (incl. coins) into a nonmagical object of equal value (max 100 gp \xD7 cleric level)"),
			additional : levels.map(function (n) { return n < 3 ? "" : "max " + (100 * n) + " gp"; })
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Forge Assistant",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("As an action, I animate a set of artisan's tools as per unseen servant for Wis mod hours; they're proficient with themselves"),
			action : [["action", ""]]
		},
		"subclassfeature6" : {
			name : "Forged in Fire",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I have resistance to fire damage and +1 AC while wearing armor"),
			dmgres : ["Fire"],
			extraAC : [{
				mod : 1,
				text : "I gain a +1 bonus to AC while wearing armor.",
				stopeval : function (v) { return !v.wearingArmor; }
			}]
		},
		"subclassfeature18" : {
			name : "Master Smith",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I'm immune to fire damage; while wearing armor, I resist nonmagical bludgeoning, piercing, and slashing damage"),
			savetxt : { immune : ["fire"] },
			dmgres : [["Bludgeoning", "Bludg. (nonmagical, in armor)"], ["Piercing", "Pierc. (nonmagical, in armor)"], ["Slashing", "Slash. (nonmagical, in armor)"]]
		}
	}
});

AddSubClass("cleric(laserllama)", "life", {
	regExpSearch : /^(?=.*life)(?=.*(domain|cleric)).*$/i,
	subname : "Life Domain",
	fullname : "Life Domain",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLDomainSpells("Life", ["bless", "cure wounds", "aid", "restoration", "mass healing word", "revivify", "aura of life", "death ward", "mass cure wounds", "raise dead"]),
		"subclassfeature2.1" : {
			name : "Disciple of Life",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"When my cleric spells restore HP to a creature, it regains an additional 2 \xD7 the spell slot level",
				'Note that "X/SL" on the spell page means per spell slot level above the spell\'s normal level'
			]),
			calcChanges : {
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (spellObj.psionic || !spellObj.level || spName !== "cleric(laserllama)") return;
						if (spellKey === "mass heal") return;
						if (!genericSpellDmgEdit(spellKey, spellObj, "heal", (2 * spellObj.level))) return;
						if (spellObj.level < 9) genericSpellDmgEdit(spellKey, spellObj, "heal", "2/SL");
						return true;
					},
					"My cleric spells that restore hit points restore an additional 2 \xD7 the spell slot level."
				]
			}
		},
		"subclassfeature3" : {
			name : "Channel Divinity: Preserve Life",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("As an action, I restore 5 \xD7 cleric level HP divided among creatures of my choice within 30 ft (not constructs/undead)"),
			additional : levels.map(function (n) { return n < 3 ? "" : (5 * n) + " HP"; }),
			action : [["action", ""]]
		},
		"subclassfeature3.1" : LLTurnUndead(),
		"subclassfeature6" : {
			name : "Blessed Healer",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I cast a cleric spell that restores HP to another, I regain 2 \xD7 the spell slot level in HP")
		},
		"subclassfeature18" : {
			name : "Conduit of Life",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("When I restore HP with a cleric spell, I treat any healing dice as their maximum roll")
		}
	}
});

AddSubClass("cleric(laserllama)", "light", {
	regExpSearch : /^(?=.*\blight\b)(?=.*(domain|cleric)).*$/i,
	subname : "Light Domain",
	fullname : "Light Domain",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLDomainSpells("Light", ["faerie fire", "guiding bolt", "flaming sphere", "scorching ray", "daylight", "fireball", "guardian of faith", "wall of fire", "dawn", "flame strike"]),
		"subclassfeature2.1" : {
			name : "Light Bearer",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, my eyes glow (or stop), letting me see normally in darkness and dim light out to 30 ft" + (n < 6 ? "" : n < 18 ? "; this includes blindsight" : "; this includes blindsight and truesight"),
					"I learn the light cantrip (or another cleric cantrip if I know it); it doesn't count against my cantrips known"
				]);
			}),
			action : [["bonus action", ""]],
			spellcastingBonus : [{ name : "Light Bearer", spells : ["light"], selection : ["light"], firstCol : "atwill" }]
		},
		"subclassfeature3" : {
			name : "Channel Divinity: Radiant Flare",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a reaction when a creature I see within 30 ft hits " + (n < 6 ? "me" : "with any attack") + ", it makes a Con save if it can see",
					"Fail: its attack misses and it's blinded until the start of my next turn"
				]);
			}),
			action : [["reaction", ""]]
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Dispel Darkness",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"As an action, magical darkness within 30 ft of my highest spell slot level or lower is dispelled",
				"Creatures of my choice make a Con save: 2d8 + cleric level radiant damage and blinded until my next turn (half, not blinded on success)"
			]),
			action : [["action", ""]]
		},
		"subclassfeature6" : {
			name : "Piercing Sight",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) { return LLdesc("My Light Bearer also grants blindsight" + (n < 18 ? "" : " and truesight") + " within its 30-ft radius"); })
		},
		"subclassfeature18" : {
			name : "Luminous Form",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"As a bonus action, for 1 minute (ends early as a bonus action or if incapacitated), I emit 30-ft bright sunlight + 30 ft dim",
				"Creatures in this light have disadv. on saves vs. my Light Domain spells and features; I gain Light Bearer benefits",
				"Once per short rest; after that, I need to expend a 5th-level or higher spell slot"
			]),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", ""]]
		}
	}
});

AddSubClass("cleric(laserllama)", "tempest", {
	regExpSearch : /^(?=.*tempest)(?=.*(domain|cleric)).*$/i,
	subname : "Tempest Domain",
	fullname : "Tempest Domain",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLDomainSpells("Tempest", ["fog cloud", "thunderwave", "shatter", "warding wind", "call lightning", "thunder step", "ice storm", "storm sphere", "control winds", "destructive wave"]),
		"subclassfeature2.1" : {
			name : "Storm Priest",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I learn a cantrip that deals thunder or lightning damage from any list; it doesn't count against my cantrips known",
				"I can perfectly predict the weather for the next 24 hours while I can see the sky"
			]),
			spellcastingBonus : [{ name : "Storm Priest", spells : LLSpellList(["booming blade", "lightning lure", "shocking grasp", "thunderclap"]) }]
		},
		"subclassfeature3" : {
			name : "Channel Divinity: Destructive Wrath",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("When I deal lightning or thunder damage with a cleric spell or feature, I can deal maximum damage instead of rolling")
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Tempestuous Rebuke",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"As a reaction when a creature I see within 30 ft damages me, it makes a Dex save",
				"Fail: 2d8 + cleric level lightning or thunder damage and no reactions until my next turn; success: half damage"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature6" : {
			name : "Thunderous Magic",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc("When I deal lightning or thunder damage to a target, I can push it " + (n < 12 ? 10 : n < 18 ? 15 : 20) + " ft away (halved per size above Large)");
			})
		},
		"subclassfeature18" : {
			name : "Divine Tempest",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I always have storm of vengeance prepared; it doesn't count against my prepared spells"),
			spellcastingBonus : [{ name : "Divine Tempest", spells : LLSpellList(["storm of vengeance"]), selection : LLSpellList(["storm of vengeance"]), prepared : true }]
		},
		"subclassfeature18.1" : {
			name : "Stormlord",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I have a flying speed equal to my walking speed while not indoors or underground; there, I can Channel Divinity as an action for 1 hour of flight"),
			speed : { fly : { spd : "walk", enc : "walk" } },
			action : [["action", "Stormlord (indoors, Channel)"]]
		}
	}
});

AddSubClass("cleric(laserllama)", "trickery", {
	regExpSearch : /^(?=.*trick)(?=.*(domain|cleric)).*$/i,
	subname : "Trickery Domain",
	fullname : "Trickery Domain",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLDomainSpells("Trickery", ["charm person", "sleep", "invisibility", "pass without trace", "dispel magic", "hypnotic pattern", "dominate creature", "polymorph", "modify memory", "seeming"]),
		"subclassfeature2.1" : {
			name : "Trickster's Mantle",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"As an action, I touch a creature (or me) to grant proficiency in Stealth (expertise if already proficient)",
				"Lasts until I use this on another, end it, finish a long rest, or die"
			]),
			action : [["action", ""]]
		},
		"subclassfeature3" : {
			name : "Channel Divinity: Illusory Duplicate",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As an action, I create an incorporeal duplicate of me within 30 ft for 1 min (ends if incapacitated, 120+ ft away, or dismissed)",
					"Bonus action: move it 30 ft (within 120 ft); I can cast cleric spells from its space using my senses",
					"I have adv. on attacks vs. creatures within 5 ft of both of us" + (n < 6 ? "" : "; when I create or move it, I can swap places with it")
				]);
			}),
			action : [["action", ""], ["bonus action", "Move Illusory Duplicate"]]
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Mischievous Mask",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("As an action, I cast disguise self on myself or a creature I touch; unwilling targets make a Con save"),
			action : [["action", ""]]
		},
		"subclassfeature6" : {
			name : "Tricky Transposition",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("Whenever I conjure or move my Illusory Duplicate, I can undetectably switch places with it")
		},
		"subclassfeature18" : {
			name : "Perfect Prank",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"When I cast a cleric spell on a creature within 5 ft of my duplicate, I can dismiss the duplicate for an effect:",
				"\u2022 Debilitating Distraction: it subtracts my Wis mod (min 1) from its initial save against the spell",
				"\u2022 Healing Hoax: it regains (additional) HP equal to my cleric level"
			])
		}
	}
});

AddSubClass("cleric(laserllama)", "war", {
	regExpSearch : /^(?=.*\bwar\b)(?=.*(domain|cleric)).*$/i,
	subname : "War Domain",
	fullname : "War Domain",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLDomainSpells("War", ["divine favor", "shield of faith", "branding smite", "spiritual weapon", "conjure volley", "crusader's mantle", "freedom of movement", "guardian of faith", "holy weapon", "steel wind strike"]),
		"subclassfeature2.1" : {
			name : "Celestial Armory",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"Melee weapons I'm proficient with count as holy symbols for my cleric spells and features",
				"I can cast divine favor or shield of faith at 1st level on myself without a spell slot"
			]),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			spellcastingBonus : [{ name : "Celestial Armory", spells : LLSpellList(["divine favor", "shield of faith"]), selection : LLSpellList(["divine favor", "shield of faith"]), times : 2, firstCol : "Sp" }]
		},
		"subclassfeature3" : {
			name : "Channel Divinity: Blessed Fortitude",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("When I cast a Domain Spell that requires concentration, taking damage can't break my concentration on it")
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Divine Strike",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc("When I miss with a melee weapon attack, I add my cleric level to the roll" + (n < 6 ? "" : "; as a reaction, I can do this for a creature I see within 30 ft"));
			}),
			action : [["reaction", "Divine Strike (ally)"]]
		},
		"subclassfeature6" : {
			name : "War Magic",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I use my action to cast a cleric spell, I can make one melee weapon attack as a bonus action"),
			action : [["bonus action", "Melee attack (after spell)"]]
		},
		"subclassfeature18" : {
			name : "Paragon of War",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"I can attack twice when I take the Attack action; after Dash or Disengage, one melee attack as a bonus action",
				"I have resistance to bludgeoning, piercing, and slashing damage from weapon attacks"
			]),
			attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
			dmgres : [["Bludgeoning", "Bludg. (weapons)"], ["Piercing", "Pierc. (weapons)"], ["Slashing", "Slash. (weapons)"]]
		}
	}
});

// ======================================================================
// LaserLlama - Alternate Druid v1.1.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).
	For the Circle of the Moon, the "LaserLlama - Compendium of Beasts" file is recommended.

	-INFORMATION-
	Subject:	Class, "Alternate Druid"
	Effect:		This script adds the Alternate Druid class, its Primal Surges, and its 4 Druidic Circles.
				Alternate Druid v1.1.0 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Druid (LaserLlama)" in the Class field (e.g. "Circle of the Moon Druid (LaserLlama)")
*/


if (typeof LLAddFightingStyles !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

if (ClassList["druid"]) ClassList["druid"].regExpSearch = /^(?=.*(druid|shaman))(?!.*laserllama).*$/i;
LLDruLvl = function () { return classes.known["druid(laserllama)"] ? classes.known["druid(laserllama)"].level : 0; };

var LLDruidSpells = [
	"beckon air", "control flame", "create bonfire", "druidcraft", "frostbite", "guidance", "infestation", "magic stone", "mending", "mold earth", "poison spray", "primal savagery", "resistance", "shape water", "shillelagh", "thorn whip", "thunderclap",
	"absorb elements", "animal friendship", "beast bond", "charm person", "create snare", "create water", "cure wounds", "detect magic", "detect poison & disease", "earth tremor", "entangle", "faerie fire", "fog cloud", "goodberry", "healing word", "ice knife", "jump", "longstrider", "protection from good & evil", "purify food & drink", "speak with animals", "thunderwave", "torrent",
	"animal messenger", "augury", "aura of frost", "awaken plant", "barkskin", "beast sense", "conjure beast", "continual flame", "darkvision", "dust devil", "earthbind", "elemental blade", "enhance ability", "enlarge/reduce", "flaming sphere", "gust of wind", "healing spirit", "heat metal", "hold person", "locate creature", "locate object", "magic weapon", "moonbeam", "pass without trace", "restoration", "skywrite", "spike growth", "warding wind",
	"aura of vitality", "call lightning", "conjure elemental", "conjure fey", "daylight", "dispel magic", "elemental weapon", "erupting earth", "feign death", "grasping vine", "meld into stone", "plant growth", "protection from energy", "revivify", "sleet storm", "speak with plants", "tidal wave", "wall of water", "water breathing", "water walk", "wind wall",
	"accursed touch", "blight", "charm monster", "control water", "divination", "dominate beast", "elemental bane", "fire shield", "freedom of movement", "giant insect", "guardian of nature", "hallucinatory terrain", "ice storm", "pillars of earth", "polymorph", "stone shape", "stoneskin", "wall of fire", "watery sphere",
	"antilife shell", "awaken", "conjure dragon", "conjure giant", "commune with nature", "cone of cold", "contagion", "control winds", "insect plague", "maelstrom", "mass cure wounds", "planar binding", "reincarnate", "scrying", "transmute rock", "tree stride", "wall of stone", "wrath of nature",
	"druid grove", "heal", "heroes' feast", "investiture of flame", "investiture of ice", "investiture of stone", "investiture of wind", "move earth", "primordial ward", "sunbeam", "transport via plants", "wind walk",
	"fire storm", "mirage arcane", "plane shift", "regenerate", "reverse gravity", "symbol", "wall of thorns", "whirlwind",
	"antipathy", "control weather", "earthquake", "feeblemind", "incendiary cloud", "sunburst", "tsunami",
	"foresight", "shapechange", "storm of vengeance", "true resurrection"
];
LLAddSpellsToClass("druid(laserllama)", LLDruidSpells);

LLWildShapeCR = function (n) { return n < 4 ? "1/4" : n < 8 ? "1/2" : n < 16 ? "1" : "2"; };

// Primal Surges: [name, description (string or levels array), action]
var LLPrimalSurges = [
	["Ancient Rites", LLdesc("As an action, I expend a Primal Surge to instantly cast a prepared druid ritual spell"), "action"],
	["Elder Magick", LLdesc("When I cast a druid spell, I can expend a Primal Surge to cast it as if with a slot one level higher (even beyond my max)"), ""],
	["Elemental Eruption", levels.map(function (n) {
		return LLdesc([
			"As an action, I create " + (n < 8 ? "a" : n < 16 ? "2 (non-overlapping)" : "3 (non-overlapping)") + " 30-ft tall, 5-ft radius cylinder" + (n < 8 ? "" : "s") + " of elemental power within 30 ft",
			"Air (thunder), Earth (bludgeoning), Fire (fire), or Water (cold): Dex save or 2d6 + druid level damage, half on a success"
		]);
	}), "action"],
	["Primal Bond", levels.map(function (n) {
		var cr = n < 4 ? "0" : n < 8 ? "1/8" : n < 12 ? "1/4" : n < 16 ? "1/2" : "1";
		return LLdesc([
			"As an action, I touch a non-hostile beast or plant of CR " + cr + " or lower and bond it to me as per conjure familiar",
			"It keeps its type and can't go to a pocket dimension; I can't regain this Primal Surge while the bond lasts",
			"The bond lasts until I end it (action), bond another, or it dies; then, action + Primal Surge: revive it at full HP"
		]);
	}), "action"],
	["Verdant Growth", levels.map(function (n) {
		return LLdesc("As an action, for 1 min (until incapacitated), the area within " + (n < 8 ? 15 : n < 16 ? 20 : 25) + " ft of me is difficult terrain for creatures of my choice");
	}), "action"],
	["Wild Shape", levels.map(function (n) {
		return LLdesc([
			"As a bonus action, I shift into a known Beast Shape (CR " + LLWildShapeCR(n) + " or lower) for up to 1 hour; see the Wild Shape page",
			"I start with two Tiny Beast Shapes I've seen; action + Primal Surge: touch a friendly beast to learn its shape",
			"I keep my alignment, personality, HP, Int, Wis, Cha, features, and proficiencies; I can't cast spells",
			"I revert as a bonus action or if unconscious; as a Diminutive shape, also if I take damage or fail a save"
		]);
	}), "bonus action"]
];

ClassList["druid(laserllama)"] = {
	name : "Druid (LaserLlama)",
	regExpSearch : /^(?=.*druid)(?=.*laserllama).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Wisdom",
	prereqs : "Wisdom 13",
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Int", "Wis"],
	abilitySave : 5,
	spellcastingFactor : 1,
	spellcastingKnown : {
		cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : "list",
		prepared : true
	},
	spellcastingList : {
		"class" : "druid(laserllama)"
	},
	skillstxt : {
		primary : "Choose two from Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, and Survival"
	},
	armorProfs : {
		primary : [true, true, false, true],
		secondary : [true, true, false, true]
	},
	weaponProfs : {
		primary : [true, false, ["scimitar"]]
	},
	toolProfs : {
		primary : ["Herbalism kit"]
	},
	equipment : "Druid (LaserLlama) starting equipment:" +
		"\n \u2022 A sickle -or- a dagger;" +
		"\n \u2022 A scimitar -or- any simple weapon;" +
		"\n \u2022 A scholar's pack -or- an explorer's pack;" +
		"\n \u2022 Leather armor and a druidic focus." +
		"\n\nAlternatively, choose 2d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Druidic Circle", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	features : {
		"druidic initiate" : {
			name : "Druidic Initiate",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I know Druidic and can leave hidden messages with it",
				"I gain proficiency in Nature (expertise if already proficient) and can use Wisdom for Nature checks"
			]),
			languageProfs : ["Druidic"],
			skills : [["Nature", "increment"]]
		},
		"spellcasting" : {
			name : "Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I can cast prepared druid cantrips/spells, using Wisdom as my spellcasting ability",
				"I prepare Wis mod + druid level spells during a long rest; I can cast prepared ritual spells as rituals",
				"I can use a druidic focus as a spellcasting focus; I can't cast druid spells in metal armor or with a metal shield"
			]),
			additional : levels.map(function (n, idx) {
				return [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4][idx] + " cantrips known";
			})
		},
		"primal surge" : {
			name : "Primal Surge",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"I know two Primal Surges (\"Choose Feature\" button); I can swap one whenever I gain a druid level",
					"I regain one expended use after a short rest, and all after a long rest" + (n < 20 ? "" : "; Archdruid: I regain one at the start of each of my turns in combat")
				]);
			}),
			usages : levels.map(function (n) { return n < 2 ? "" : n < 7 ? 2 : n < 15 ? 3 : 4; }),
			recovery : "long rest",
			additional : "1 regained on a short rest",
			extraname : "Primal Surge",
			extrachoices : [],
			extraTimes : levels.map(function (n) { return n < 2 ? 0 : 2; })
		},
		"subclassfeature3" : {
			name : "Druidic Circle",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc('Choose a Druidic Circle and put it in the "Class" field ')
		},
		"elder body" : {
			name : "Elder Body",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"I age only 1 year per 10 years and suffer none of the frailty of old age",
				"As a reaction when I fail a saving throw, I can expend a Primal Surge to reroll it"
			]),
			action : [["reaction", "Elder Body (reroll save)"]]
		},
		"archdruid" : {
			name : "Archdruid",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("I regain one use of Primal Surge at the start of each of my turns in combat")
		}
	}
};
(function () {
	var oFea = ClassList["druid(laserllama)"].features["primal surge"];
	for (var i = 0; i < LLPrimalSurges.length; i++) {
		var a = LLPrimalSurges[i];
		oFea.extrachoices.push(a[0]);
		oFea[a[0].toLowerCase()] = {
			name : a[0],
			source : [["GMB:LL", 0]],
			description : a[1]
		};
		if (a[2]) oFea[a[0].toLowerCase()].action = [[a[2], a[0] + " (Primal Surge)"]];
	}
})();

// ======================= DRUIDIC CIRCLES =======================

AddSubClass("druid(laserllama)", "decay", {
	regExpSearch : /^(?=.*decay)(?=.*(circle|druid)).*$/i,
	subname : "Circle of Decay",
	fullname : "Circle of Decay",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Decay Spells",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("My Circle Spells are always prepared and don't count against my prepared spells"),
			spellcastingExtra : LLSpellList(["inflict wounds", "gentle repose", "animate dead", "blight", "cloudkill"])
		},
		"subclassfeature3.1" : {
			name : "Fungal Host",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"Deadly Spores: I learn chill touch (doesn't count against my cantrips known)",
					"Elder Necrosis: when I damage with an attack or druid spell, I can make the damage necrotic",
					"Symbiotic Colony: when I deal necrotic damage within 15 ft, I gain that much temp HP (max " + n + "; not vs. constructs/undead)" + (n < 18 ? "" : "; below half HP, I can regain HP instead")
				]);
			}),
			spellcastingBonus : [{ name : "Deadly Spores", spells : ["chill touch"], selection : ["chill touch"], firstCol : "atwill" }]
		},
		"subclassfeature3.2" : {
			name : "Fungal Guardian",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I expend a Primal Surge to become a Fungal Guardian for 10 min (ends if incapacitated or as a bonus action)",
					"Fungal Shell: " + (2 * n) + " temp HP; Symbiotic Colony temp HP add to this (max " + (2 * n) + ")",
					"Miasma: living creatures of my choice starting their turn within " + (n < 10 ? 10 : 15) + " ft: Con save or " + (n < 6 ? 1 : n < 10 ? 2 : n < 18 ? 3 : 4) + "d8 necrotic damage" + (n < 18 ? "" : "; the area is difficult terrain for creatures of my choice")
				]);
			}),
			action : [["bonus action", ""]]
		},
		"subclassfeature6" : {
			name : "Symbiotic Thrall",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"When I kill a creature of CR \u2264 druid level with necrotic damage, I can cast animate dead on it without a slot",
				"The thrall has 2 \xD7 druid level HP and crumbles after 1 minute or when destroyed"
			]),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest"
		},
		"subclassfeature10" : {
			name : "Virulent Spores",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("My Miasma of Spores has a 15-ft radius; my thralls also emanate a 5-ft Miasma (they don't gain temp HP from it)")
		},
		"subclassfeature18" : {
			name : "Elder Colony",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Below half HP, Symbiotic Colony can restore HP instead of temp HP; the Miasma of me and my thralls is difficult terrain for creatures of my choice")
		}
	}
});

// Terrain spells: [cantrip, 3rd, 3rd, 5th, 7th, 9th]
var LLTerrains = {
	"Coast" : ["shape water", "fog cloud", "misty step", "tidal wave", "watery sphere", "maelstrom"],
	"Desert" : ["control flame", "silent image", "dust devil", "wall of sand", "hallucinatory terrain", "seeming"],
	"Forest" : ["thorn whip", "entangle", "barkskin", "grasping vine", "wall of thorns", "tree stride"],
	"Plains" : ["primal savagery", "longstrider", "pass without trace", "haste", "freedom of movement", "far step"],
	"Mountains" : ["mold earth", "earth tremor", "spike growth", "call lightning", "pillars of earth", "wall of stone"],
	"Swamp" : ["infestation", "grease", "spider climb", "stinking cloud", "giant insect", "insect plague"],
	"Tundra" : ["frostbite", "ice knife", "hold person", "slow", "ice storm", "cone of cold"],
	"Underground" : ["poison spray", "sleep", "blindness/deafness", "enemies abound", "stone shape", "passwall"]
};
LLTerrainFeature = function (bSecond) {
	var oFea = {
		name : bSecond ? "Elder Magician" : "Terrain Spells",
		source : [["GMB:LL", 0]],
		minlevel : bSecond ? 18 : 3,
		description : bSecond ? LLdesc([
			"I can be attuned to two Terrains at once, having both sets of Terrain Spells prepared (\"Choose Feature\")",
			"When I perform the ritual, I can replace one of my lists with any Terrain I previously attuned to"
		]) : LLdesc([
			"With a 1-hour ritual (can be during a rest), I attune to my current Terrain (\"Choose Feature\"), ending any previous one",
			"While attuned, I always have its Terrain Spells prepared; they don't count against my prepared spells"
		])
	};
	oFea[bSecond ? "extrachoices" : "choices"] = [];
	if (bSecond) {
		oFea.extraname = "Second Terrain";
		oFea.extraTimes = levels.map(function (n) { return n < 18 ? 0 : 1; });
	}
	for (var sT in LLTerrains) {
		var aSp = LLTerrains[sT];
		oFea[bSecond ? "extrachoices" : "choices"].push(sT);
		var oCh = {
			name : (bSecond ? "Second Terrain: " : "Terrain: ") + sT,
			description : LLdesc("Terrain Spells: " + aSp.slice(1).join(", ") + "; cantrip: " + aSp[0]),
			spellcastingBonus : [{ name : sT + " Terrain cantrip", spells : LLSpellList([aSp[0]]), selection : LLSpellList([aSp[0]]), firstCol : "atwill" }]
		};
		if (bSecond) {
			oCh.spellcastingBonus.push({ name : sT + " Terrain Spells", spells : LLSpellList(aSp.slice(1)), selection : LLSpellList(aSp.slice(1)), times : LLSpellList(aSp.slice(1)).length, prepared : true });
		} else {
			oCh.spellcastingExtra = LLSpellList(aSp.slice(1));
		}
		oFea[sT.toLowerCase()] = oCh;
	}
	return oFea;
};

AddSubClass("druid(laserllama)", "land", {
	regExpSearch : /^(?=.*\bland\b)(?=.*(circle|druid)).*$/i,
	subname : "Circle of the Land",
	fullname : "Circle of the Land",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Acolyte of Nature",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I ignore difficult terrain imposed by natural environments (deep snow, swampland, dense jungle, etc.)")
		},
		"subclassfeature3.1" : {
			name : "Natural Regeneration",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("When I finish a short rest, I can forgo regaining a Primal Surge to regain one spell slot of a level \u2264 Wis mod (min 1st)")
		},
		"subclassfeature3.2" : LLTerrainFeature(false),
		"subclassfeature3.3" : {
			name : "Overgrowth",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var d = n < 6 ? 3 : n < 10 ? 4 : n < 18 ? 6 : 9;
				return LLdesc([
					"As an action, I expend a Primal Surge: a 15-ft cube within 30 ft erupts with plants; Dex save or " + d + "d6 magical slashing (half on save)",
					"It's difficult terrain for 1 hour (or until destroyed/used again); moving through it deals 1d6 magical slashing per 5 ft",
					n < 6 ? "" : "Primeval Growth: chosen creatures ignore its effects and have half cover while in it"
				]);
			}),
			action : [["action", " (Primal Surge)"]]
		},
		"subclassfeature6" : {
			name : "Primeval Growth",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("Creatures I choose ignore my Overgrowth and have half cover in it; its damage increases (see Overgrowth)")
		},
		"subclassfeature10" : {
			name : "Natural Ward",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("As a reaction when I take acid, cold, fire, lightning, poison, or thunder damage, I expend a Primal Surge to resist that type (until I do this again)"),
			action : [["reaction", " (Primal Surge)"]]
		},
		"subclassfeature18" : LLTerrainFeature(true)
	}
});

AddSubClass("druid(laserllama)", "moon", {
	regExpSearch : /^(?=.*moon)(?=.*(circle|druid)).*$/i,
	subname : "Circle of the Moon",
	fullname : "Circle of the Moon",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Lunar Wild Shape",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var cr = n < 3 ? 0 : n < 5 ? 1 : n < 7 ? 2 : n < 9 ? 3 : n < 11 ? 4 : n < 13 ? 5 : n < 15 ? 6 : n < 17 ? 7 : 8;
				return LLdesc([
					"I learn the Wild Shape Primal Surge (another if I knew it); I can expend a spell slot instead of a Primal Surge for it:",
					"Greater Beast Shapes: slot 2nd: CR 1, 3rd: CR 2, 4th: CR 3 ... 9th: CR 8 (now up to CR " + cr + "); I learn two CR 1 shapes",
					"Lunar Fortitude: I gain 2 \xD7 druid level temp HP for the transformation" + (n < 10 ? "" : "; Elder Wild Shape: resistance to B/P/S (not silvered)"),
					"Lunar Warrior: my natural weapons and save DCs use my spell attack and spell save DC, unless the beast's is higher"
				]);
			}),
			autoSelectExtrachoices : [{ extrachoice : "wild shape" }],
			"wild shape" : {
				name : "Wild Shape (Moon)",
				source : [["GMB:LL", 0]],
				description : LLPrimalSurges[5][1],
				action : [["bonus action", "Wild Shape"]]
			}
		},
		"subclassfeature3.1" : {
			name : "Wild Empathy",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("While speaking Druidic, I can verbally communicate with beasts (limited by their Intelligence)")
		},
		"subclassfeature6" : {
			name : "Mystical Forms",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("My natural weapons count as magical in Beast Shape; I learn primal savagery and can cast it in Beast Shape"),
			spellcastingBonus : [{ name : "Mystical Forms", spells : LLSpellList(["primal savagery"]), selection : LLSpellList(["primal savagery"]), firstCol : "atwill" }]
		},
		"subclassfeature10" : {
			name : "Elder Wild Shape",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I empower a transformation with Lunar Wild Shape, I resist bludgeoning, piercing, and slashing damage (not silvered)")
		},
		"subclassfeature18" : {
			name : "Beast Spells",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I can cast druid spells in Beast Shape, as long as they don't have a material component")
		}
	}
});

AddSubClass("druid(laserllama)", "tides", {
	regExpSearch : /^(?=.*tide)(?=.*(circle|druid)).*$/i,
	subname : "Circle of the Tides",
	fullname : "Circle of the Tides",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Disciple of the Waters",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain a swimming speed equal to my walking speed and can breathe air and water; I learn shape water (doesn't count against cantrips known)"),
			speed : { swim : { spd : "walk", enc : "walk" } },
			spellcastingBonus : [{ name : "Disciple of the Waters", spells : LLSpellList(["shape water"]), selection : LLSpellList(["shape water"]), firstCol : "atwill" }]
		},
		"subclassfeature3.1" : {
			name : "Tidal Aura",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I expend a Primal Surge for a " + (n < 18 ? 15 : 30) + "-ft radius aura for 1 min (ends if incapacitated):",
					"\u2022 Rip Tide: it's difficult terrain for creatures of my choice without a swimming speed",
					"\u2022 Tidal Restoration: when my druid spell heals, one target in the aura regains +Wis mod (min 1) HP",
					n < 10 ? "" : "\u2022 Waters of Life: on activation, I distribute druid level + Wis mod temp HP among me and chosen creatures in it"
				]);
			}),
			action : [["bonus action", " (Primal Surge)"]]
		},
		"subclassfeature3.2" : {
			name : "Tidal Spells",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("My Circle Spells are always prepared and don't count against my prepared spells"),
			spellcastingExtra : LLSpellList(["healing word", "torrent", "misty step", "prayer of healing", "mass healing word", "tidal wave", "control water", "watery sphere", "maelstrom", "raise dead"])
		},
		"subclassfeature6" : {
			name : "Undertow",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc([
					"While my Tidal Aura is active, as an action, creatures of my choice in it make a Str save or " + (n < 18 ? "fall prone" : "are pushed 15 ft away and fall prone") + " (adv. if larger than me)",
					"Creatures in my Tidal Aura have disadvantage on their initial save against my Tidal Spells"
				]);
			}),
			action : [["action", ""]]
		},
		"subclassfeature10" : {
			name : "Waters of Life",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I activate Tidal Aura, I distribute druid level + Wis mod temp HP among me and creatures of my choice in it (lost when it ends)")
		},
		"subclassfeature18" : {
			name : "Master of the Waves",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"I can cast control water at will (concentration); my Tidal Aura has a 30-ft radius; Undertow pushes 15 ft before prone",
				"I always have tsunami prepared; once per long rest, I can cast it without a slot in a large enough body of water"
			]),
			spellcastingBonus : [
				{ name : "Master of the Waves", spells : ["control water"], selection : ["control water"], firstCol : "atwill" },
				{ name : "Master of the Waves", spells : LLSpellList(["tsunami"]), selection : LLSpellList(["tsunami"]), firstCol : "oncelr", prepared : true }
			]
		}
	}
});

// ======================================================================
// LaserLlama - Alternate Sorcerer v4.0.1.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Alternate Sorcerer"
	Effect:		This script adds the Alternate Sorcerer class (Sorcery Points instead of spell slots), its Metamagics, and its 10 Sorcerous Origins.
				Alternate Sorcerer v4.0.1 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Sorcerer (LaserLlama)" in the Class field (e.g. "Draconic Sorcery Sorcerer (LaserLlama)")
	Note:		The Sorcerer has no spell slots: it casts with the "Sorcery Points" limited feature.
				The spell slot rows on the sheet only show the Innate Arcanum slots (6th-9th level, from 11th level).
				The spell selection dialog only offers spells up to the Spell Limit (or the highest Innate Arcanum slot).
*/


if (typeof LLAddFightingStyles !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

if (ClassList["sorcerer"]) ClassList["sorcerer"].regExpSearch = /^(?=.*sorcerer)(?!.*laserllama).*$/i;
LLSorLvl = function () { return classes.known["sorcerer(laserllama)"] ? classes.known["sorcerer(laserllama)"].level : 0; };
LLSorLimit = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
LLSorPoints = [4, 6, 9, 12, 17, 22, 28, 34, 41, 48, 48, 50, 50, 52, 52, 54, 54, 56, 58, 60];

var LLSorcererSpells = [
	"acid splash", "beckon air", "blade ward", "booming blade", "chill touch", "control flame", "dancing lights", "fire bolt", "friends", "frostbite", "green-flame blade", "infestation", "light", "lightning lure", "mage hand", "mending", "message", "mind sliver", "minor illusion", "mold earth", "otherworldly grasp", "poison spray", "prestidigitation", "ray of frost", "shape water", "shocking grasp", "thunderclap",
	"absorb elements", "burning hands", "catapult", "caustic brew", "chaos bolt", "charm person", "chromatic orb", "color spray", "command", "comprehend languages", "detect magic", "disguise self", "earth tremor", "expeditious retreat", "false life", "featherfall", "fog cloud", "grease", "ice knife", "jump", "mage armor", "magic missile", "ray of sickness", "shield", "silent image", "sleep", "thunderwave", "torrent", "witch bolt",
	"acid arrow", "arcane scorcher", "alter self", "aura of frost", "blindness/deafness", "blur", "cloud of daggers", "crown of madness", "darkness", "darkvision", "detect thoughts", "dragon's breath", "dust devil", "earthbind", "earthen grasp", "elemental blade", "enhance ability", "enlarge/reduce", "flaming sphere", "gust of wind", "hold person", "invisibility", "levitate", "magic weapon", "mind spike", "mind whip", "mirror image", "misty step", "phantasmal force", "pyrotechnics", "scorching ray", "see invisibility", "shadow blade", "shatter", "snowball swarm", "spider climb", "suggestion", "warding wind", "web",
	"blink", "call lightning", "catnap", "clairvoyance", "counterspell", "daylight", "dispel magic", "enemies abound", "erupting earth", "fear", "fireball", "fly", "gaseous form", "haste", "hypnotic pattern", "intellect fortress", "life transference", "lightning bolt", "major image", "meld into stone", "minute meteors", "nondetection", "protection from energy", "sending", "sleet storm", "slow", "sonic wave", "spectral passage", "stinking cloud", "thunder step", "tidal wave", "tongues", "vampiric touch", "wall of sand", "wall of water", "water breathing", "water walk", "wind wall",
	"accursed touch", "banishment", "blight", "charm monster", "confusion", "dimension door", "elemental bane", "fire shield", "greater invisibility", "ice storm", "polymorph", "resilient sphere", "sickening radiance", "stoneskin", "storm sphere", "vitriolic sphere", "wall of fire", "watery sphere",
	"animate objects", "arcane hand", "cloudkill", "cone of cold", "control winds", "creation", "dominate person", "enervation", "far step", "hold monster", "immolation", "seeming", "skill empowerment", "synaptic static", "telekinesis", "teleportation circle", "wall of force", "wall of light", "wall of stone",
	"arcane gate", "chain lightning", "circle of death", "disintegrate", "eyebite", "flesh to stone", "freezing sphere", "globe of invulnerability", "investiture of flame", "investiture of ice", "investiture of stone", "investiture of wind", "mass suggestion", "mental prison", "move earth", "otherworldly guise", "scatter", "sunbeam", "true seeing", "wall of ice",
	"crown of stars", "delayed blast fireball", "etherealness", "finger of death", "fire storm", "plane shift", "power word: pain", "prismatic spray", "reverse gravity", "teleport", "whirlwind",
	"antimagic field", "dominate monster", "earthquake", "horrid wilting", "incendiary cloud", "maddening darkness", "mass polymorph", "power word: stun", "sunburst",
	"gate", "meteor swarm", "power word: kill", "psychic scream", "time stop", "wish"
];
LLAddSpellsToClass("sorcerer(laserllama)", LLSorcererSpells);

// Metamagic options: [name, description]; LLMetamagic is extended by the "Alternate Sorcerer Expanded" file
LLMetamagic = [
	["Careful Spell", "1 SP: up to Cha mod (min 1) creatures (can include me) ignore the effects of my spell that deals damage or forces a save"],
	["Cerebral Spell", "3 SP: change the initial Int save of my spell to a Cha save, or vice versa"],
	["Distant Spell", "1 SP: double the range of a spell with a range of 5 ft or more; touch becomes 30 ft"],
	["Empowered Spell", "1 SP: reroll up to Cha mod (min 1) damage dice of my spell; can be combined with other Metamagic"],
	["Esoteric Spell", "1 SP: change the force, necrotic, psychic, or radiant damage of my spell to another of these types"],
	["Extended Spell", "1 SP: double the duration of a spell of 1 minute or longer (max 24 hours)"],
	["Heightened Spell", "3 SP: one target of my spell has disadvantage on its initial saving throw"],
	["Illusory Spell", "1 SP: my spell appears to originate from a creature/object I see in range; counterspell etc. checks have disadv."],
	["Imbued Spell", "1 SP: a spell with a range of self gets a range of touch on a willing creature (it concentrates on it, not me)"],
	["Kinetic Spell", "2 SP: change the initial Str save of my spell to a Dex save, or vice versa"],
	["Piercing Spell", "1 SP: one damage type of my spell ignores resistance and treats immunity as resistance"],
	["Prismatic Spell", "1 SP: change the acid, cold, fire, lightning, poison, or thunder damage of my spell to another of these types"],
	["Quickened Spell", "2 SP: cast a spell with a casting time of 1 action as a bonus action"],
	["Resolute Spell", "2 SP: change the initial Wis save of my spell to a Con save, or vice versa"],
	["Seeking Spell", "2 SP: when I miss with a spell attack, reroll the d20 (must use it); can be combined with other Metamagic"],
	["Sturdy Spell", "1 SP: as a reaction when I make a Con save to maintain concentration, I gain advantage on it"],
	["Subtle Spell", "1 SP: cast a spell without its somatic or verbal components"],
	["Twinned Spell", "SP = spell level (min 1): a spell that can only target one creature (not self) targets a second one in range"],
	["Unerring Spell", "1 SP: my spell attack or Dex save spell ignores half and three-quarters cover"],
	["Unstable Spell", "2 SP: roll a d12 to change the initial save: 1 spell fails (only these 2 SP lost), 2-3 Str, 4-5 Dex, 6-7 Con, 8-9 Wis, 10 Int, 11 Cha, 12 my choice"]
];
LLMetamagicCount = levels.map(function (n) { return n < 2 ? 0 : n < 5 ? 2 : n < 9 ? 3 : n < 14 ? 4 : n < 18 ? 5 : 6; });
// Add all LLMetamagic entries not yet present to the Metamagic feature (also called by the Expanded file)
LLAddMetamagics = function () {
	var oFea = ClassList["sorcerer(laserllama)"].features["metamagic"];
	for (var i = 0; i < LLMetamagic.length; i++) {
		var a = LLMetamagic[i];
		var sKey = a[0].toLowerCase();
		if (oFea[sKey]) continue;
		oFea.extrachoices.push(a[0]);
		oFea[sKey] = {
			name : a[0],
			source : a[2] ? a[2] : [["GMB:LL", 0]],
			description : LLdesc(a[1])
		};
		if (a[3]) {
			for (var p in a[3]) oFea[sKey][p] = a[3][p];
		}
	}
};
// Origin spell feature (known, don't count against spells known)
LLOriginSpells = function (sName, aSpells, sExtra) {
	return {
		name : sName + " Spells",
		source : [["GMB:LL", 0]],
		minlevel : 1,
		description : LLdesc(["I learn my Origin Spells at the levels shown; they don't count against my spells known and can't be replaced"].concat(sExtra ? [sExtra] : [])),
		spellcastingExtra : LLSpellList(aSpells),
		spellcastingExtraApplyNonconform : true
	};
};
// Learn spells from another class list (Psion, Cleric, Warlock, Bard, Druid)
LLSorcListAdd = function (sName, aClasses, sCantripCls) {
	var aCls = [];
	for (var i = 0; i < aClasses.length; i++) if (ClassList[aClasses[i]] || aClasses[i].indexOf("(") === -1) aCls.push(aClasses[i]);
	var sCls = aCls.length ? aCls[0] : aClasses[aClasses.length - 1];
	return {
		spellcastingBonus : [{ name : sName, "class" : sCantripCls ? sCantripCls : sCls, level : [0, 0] }],
		calcChanges : {
			spellList : [
				function (spList, spName, spType) {
					if (spName !== "sorcerer(laserllama)" || spType.indexOf("bonus") !== -1) return;
					var aAdd = LLSorcExtraLists();
					if (!aAdd.length) return;
					spList["class"] = [].concat(spList["class"] ? spList["class"] : [], aAdd);
				},
				"When I learn a sorcerer spell, I can choose it from the sorcerer list or the extra class list granted by my Sorcerous Origin."
			]
		}
	};
};
// The extra class lists, based on the current subclass (global, so it works after reopening the sheet)
LLSorcExtraLists = function () {
	var oC = classes.known["sorcerer(laserllama)"];
	if (!oC || !oC.subclass) return [];
	var oMap = {
		"sorcerer(laserllama)-aberrant" : ["psion(laserllama)", "psion"],
		"sorcerer(laserllama)-divine" : ["cleric(laserllama)", "cleric"],
		"sorcerer(laserllama)-elder" : ["warlock(laserllama)", "warlock"],
		"sorcerer(laserllama)-fey" : ["bard(laserllama)", "bard"],
		"sorcerer(laserllama)-verdant" : ["druid(laserllama)", "druid"]
	};
	var a = oMap[oC.subclass];
	if (!a) return [];
	for (var i = 0; i < a.length; i++) if (ClassList[a[i]]) return [a[i]];
	return [];
};
LLSorcExtraCantripClass = function (aOpts) {
	for (var i = 0; i < aOpts.length; i++) if (ClassList[aOpts[i]]) return aOpts[i];
	return aOpts[aOpts.length - 1];
};

ClassList["sorcerer(laserllama)"] = {
	name : "Sorcerer (LaserLlama)",
	regExpSearch : /^(?=.*sorcerer)(?=.*laserllama).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Charisma",
	prereqs : "Charisma 13",
	die : 6,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Con", "Cha"],
	abilitySave : 6,
	// No spell slots: only the Innate Arcanum slots (6th-9th level)
	spellcastingFactor : "sorcererll1",
	spellcastingTable : [[0, 0, 0, 0, 0, 0, 0, 0, 0]].concat(levels.map(function (n) {
		return [0, 0, 0, 0, 0, n >= 11 ? 1 : 0, n >= 13 ? 1 : 0, n >= 15 ? 1 : 0, n >= 17 ? 1 : 0];
	})),
	spellcastingKnown : {
		cantrips : [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
		spells : [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
	},
	spellcastingList : {
		"class" : "sorcerer(laserllama)",
		level : [0, 9]
	},
	skillstxt : {
		primary : "Choose two from Arcana, Deception, Insight, Intimidation, Persuasion, and Religion"
	},
	weaponProfs : {
		primary : [false, false, ["dagger", "dart", "light crossbow", "quarterstaff", "sling"]]
	},
	equipment : "Sorcerer (LaserLlama) starting equipment:" +
		"\n \u2022 A light crossbow and 20 bolts -or- a sling;" +
		"\n \u2022 A quarterstaff -or- two daggers;" +
		"\n \u2022 A dungeoneer's pack -or- an explorer's pack." +
		"\n\nAlternatively, choose 3d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Sorcerous Origin", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	features : {
		"sorcery" : {
			name : "Sorcery",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I cast sorcerer spells I know by expending Sorcery Points (SP); I regain all SP on a long rest",
				"Cost: cantrip 0, 1st 2, 2nd 3, 3rd 5, 4th 6, 5th 7 SP; I can't spend more SP on a feature than my Spell Limit costs",
				"I know cantrips and spells up to my Spell Limit (swap one per level); Charisma is my spellcasting ability",
				"My body is my focus (free hand needed); I can't cast sorcerer spells in armor or with a shield",
				"Multiclass: SP can cast spells of other classes and their slots can cast my sorcerer spells"
			]),
			additional : levels.map(function (n, idx) { return "Spell Limit: " + ["1st", "2nd", "3rd", "4th", "5th"][LLSorLimit[idx] - 1] + " level"; }),
			limfeaname : "Sorcery Points",
			usages : LLSorPoints,
			recovery : "long rest",
			calcChanges : {
				spellList : [
					function (spList, spName, spType) {
						// Spell Limit (1st-10th level) or highest Innate Arcanum slot (11th+): max level of sorcerer spells I can learn
						if (spName !== "sorcerer(laserllama)" || spType.indexOf("bonus") !== -1 || !classes.known["sorcerer(laserllama)"]) return;
						var lvl = Math.min(20, classes.known["sorcerer(laserllama)"].level);
						var nMax = lvl < 11 ? LLSorLimit[lvl - 1] : Math.min(9, 6 + Math.floor((lvl - 11) / 2));
						var aLvl = spList.level ? spList.level : [0, 9];
						spList.level = [aLvl[0], Math.min(aLvl[1], nMax)];
					},
					"I can only learn sorcerer spells up to my Spell Limit (or up to my highest Innate Arcanum slot from 11th level)."
				]
			}
		},
		"subclassfeature1" : {
			name : "Sorcerous Origin",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc('Choose the Sorcerous Origin for my innate powers and put it in the "Class" field ')
		},
		"metamagic" : {
			name : "Metamagic",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"I know Metamagic options (\"Choose Feature\" button); I can apply one per spell by expending Sorcery Points",
					n < 20 ? "Some options can be combined with others; see their descriptions" : "Magic Incarnate: Metamagic costs 1 SP less (min 0) and I can apply any number to a spell"
				]);
			}),
			additional : levels.map(function (n, idx) { return n < 2 ? "" : LLMetamagicCount[idx] + " known"; }),
			extraname : "Metamagic",
			extrachoices : [],
			extraTimes : LLMetamagicCount
		},
		"sorcerous regeneration" : {
			name : "Sorcerous Regeneration",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("At the end of a short rest, I can regain Sorcery Points equal to my sorcerer level"),
			additional : levels.map(function (n) { return n < 3 ? "" : n + " Sorcery Points"; })
		},
		"magical flux" : {
			name : "Magical Flux",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("When I finish a long rest, I can replace one sorcerer spell I know (up to my Spell Limit) or one Metamagic I know")
		},
		"font of magic" : {
			name : "Font of Magic",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Once per long rest, I can cast any sorcerer spell up to my Spell Limit that I don't know, expending SP and using Metamagic as normal"),
			usages : 1,
			recovery : "long rest"
		},
		"innate arcanum" : {
			name : "Innate Arcanum",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc([
				"I gain Arcanum spell slots to cast my sorcerer spells, regained on a long rest (shown in the spell slots)",
				"When I learn a sorcerer spell, it can be of a level up to my highest Arcanum slot",
				"As a bonus action, I can expend an Arcanum slot to regain Sorcery Points equal to its level"
			]),
			additional : levels.map(function (n) {
				return n < 11 ? "" : n < 13 ? "6th" : n < 15 ? "6th, 7th" : n < 17 ? "6th, 7th, 8th" : "6th, 7th, 8th, 9th";
			}),
			action : [["bonus action", "Arcanum slot to SP"]]
		},
		"magic incarnate" : {
			name : "Magic Incarnate",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("My Metamagic costs 1 Sorcery Point less (min 0) and I can apply any number of Metamagics to a spell")
		}
	}
};
LLAddMetamagics();

// ======================= SORCEROUS ORIGINS =======================

// Draconic ancestries: [name, damage type, 1st, 3rd, 5th, 7th, 9th, gem?]
var LLDragonAncestries = [
	["Black", "Acid", "caustic brew", "acid arrow", "gaseous form", "vitriolic sphere", "contagion"],
	["Copper", "Acid", "caustic brew", "acid arrow", "gaseous form", "vitriolic sphere", "contagion"],
	["Blue", "Lightning", "witch bolt", "dust devil", "lightning bolt", "storm sphere", "control winds"],
	["Bronze", "Lightning", "witch bolt", "dust devil", "lightning bolt", "storm sphere", "control winds"],
	["Brass", "Fire", "burning hands", "scorching ray", "fireball", "wall of fire", "immolation"],
	["Red", "Fire", "burning hands", "scorching ray", "fireball", "wall of fire", "immolation"],
	["Gold", "Fire", "sleep", "warding wind", "slow", "resilient sphere", "flame strike"],
	["Green", "Poison", "ray of sickness", "suggestion", "stinking cloud", "dominate beast", "cloudkill"],
	["White", "Cold", "ice knife", "snowball swarm", "sleet storm", "ice storm", "cone of cold"],
	["Silver", "Cold", "ice knife", "snowball swarm", "sleet storm", "ice storm", "cone of cold"],
	["Amethyst", "Force", "magic missile", "locate object", "dispel magic", "resilient sphere", "legend lore", true],
	["Crystal", "Radiant", "guiding bolt", "invisibility", "hypnotic pattern", "divination", "wall of light", true],
	["Emerald", "Psychic", "silent image", "detect thoughts", "major image", "phantasmal killer", "mislead", true],
	["Sapphire", "Thunder", "thunderwave", "shatter", "meld into stone", "stone shape", "hold monster", true],
	["Steel", "Acid", "disguise self", "acid arrow", "nondetection", "polymorph", "far step", true],
	["Topaz", "Necrotic", "inflict wounds", "blindness/deafness", "vampiric touch", "blight", "antilife shell", true]
];
LLDraconicAncestor = (function () {
	var oFea = {
		name : "Dragon Ancestor",
		source : [["GMB:LL", 0]],
		minlevel : 1,
		description : LLdesc([
			"Choose the type of dragon my sorcery comes from using the \"Choose Feature\" button above; it can't be changed",
			"I learn my Draconic Sorcery Spells (command, dragon's breath, fear, elemental bane, dominate person) and Ancestry Spells"
		]),
		choices : []
	};
	for (var i = 0; i < LLDragonAncestries.length; i++) {
		var a = LLDragonAncestries[i];
		var sCh = a[0] + " Dragon (" + a[1] + ")" + (a[7] ? " [gem, DM's choice]" : "");
		oFea.choices.push(sCh);
		oFea[sCh.toLowerCase()] = {
			name : a[0] + " Dragon Ancestor",
			description : LLdesc([
				"My draconic ancestry is " + a[0] + " dragon, which deals " + a[1].toLowerCase() + " damage",
				"Ancestry Spells: " + a.slice(2, 7).join(", ")
			]),
			spellcastingExtra : LLSpellList(["command", "dragon's breath", "fear", "elemental bane", "dominate person"].concat(a.slice(2, 7))),
			spellcastingExtraApplyNonconform : true
		};
	}
	return oFea;
})();

AddSubClass("sorcerer(laserllama)", "draconic", {
	regExpSearch : /^(?=.*(draconic|dragon))(?=.*sorcer).*$/i,
	subname : "Draconic Sorcery",
	fullname : "Draconic Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLDraconicAncestor,
		"subclassfeature1.1" : {
			name : "Draconic Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("My hit point maximum increases by my sorcerer level; without armor, my AC is 10 + Dex mod + Cha mod"),
			calcChanges : {
				hp : function (totalHD) {
					if (classes.known["sorcerer(laserllama)"]) return [classes.known["sorcerer(laserllama)"].level, "Draconic Resilience (sorcerer level)"];
				}
			},
			armorOptions : [{
				regExpSearch : /^(?=.*(dragon|draconic))(?=.*(hide|skin|scales|resilience)).*$/i,
				name : "Draconic Resilience",
				source : [["GMB:LL", 0]],
				ac : "10+Cha",
				affectsWildShape : true,
				selectNow : true
			}]
		},
		"subclassfeature6" : {
			name : "Elemental Affinity",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"I resist my ancestry's damage type; I add my Cha mod (min +1) to one damage roll of my sorcerer spells of that type",
				"I learn Prismatic Spell (or Esoteric Spell for gem dragons; another if known), free when changing to my ancestry's type"
			]),
			choices : ["Acid", "Cold", "Fire", "Force", "Lightning", "Necrotic", "Poison", "Psychic", "Radiant", "Thunder"]
		},
		"subclassfeature14" : {
			name : "Draconic Flight",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As a bonus action, I manifest (or dismiss) draconic wings, gaining a flying speed equal to my walking speed"),
			action : [["bonus action", ""]]
		},
		"subclassfeature18" : {
			name : "Draconic Apotheosis",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"As a bonus action, I transform into a dragon of CR \u2264 half my sorcerer level for up to 1 hour (ends if incapacitated or as bonus action)",
				"I keep my personality, alignment, HP, skill/save proficiencies, Int, Wis, Cha, and sorcerer and origin features",
				"Its acid/cold/fire/lightning/poison damage becomes my ancestry's type; after the free use, it costs 10 SP"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["bonus action", ""]]
		}
	}
});
// Elemental Affinity sub choices
(function () {
	var oFea = ClassSubList["sorcerer(laserllama)-draconic"].features["subclassfeature6"];
	for (var i = 0; i < oFea.choices.length; i++) {
		var sDmg = oFea.choices[i];
		oFea[sDmg.toLowerCase()] = {
			name : "Elemental Affinity (" + sDmg + ")",
			description : oFea.description,
			dmgres : [sDmg],
			calcChanges : {
				atkCalc : [
					eval("(function (fields, v, output) { if (v.isSpell && v.thisWeapon[4] && v.thisWeapon[4].indexOf('sorcerer(laserllama)') !== -1 && /" + sDmg.toLowerCase() + "/i.test(fields.Damage_Type) && /\\d/.test(fields.Damage_Die)) { output.extraDmg += Math.max(1, Number(What('Cha Mod'))); } })"),
					"My sorcerer spells that deal " + sDmg.toLowerCase() + " damage add my Charisma modifier (min +1) to one damage roll."
				]
			}
		};
	}
})();

AddSubClass("sorcerer(laserllama)", "flame", {
	regExpSearch : /^(?=.*(flame|fire|ember))(?=.*sorcer).*$/i,
	subname : "Flame Sorcery",
	fullname : "Flame Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLOriginSpells("Flame Sorcery", ["burning hands", "hellish rebuke", "flaming sphere", "scorching ray", "fireball", "minute meteors", "summon elemental (fire)", "wall of fire", "flame strike", "immolation"]),
		"subclassfeature1.1" : {
			name : "Emberheart",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I resist fire damage, know Ignan, and learn control flame (doesn't count against cantrips known; +Cha mod (min 1) to its damage)"),
			dmgres : ["Fire"],
			languageProfs : ["Ignan"],
			spellcastingBonus : [{ name : "Emberheart", spells : LLSpellList(["control flame"]), selection : LLSpellList(["control flame"]), firstCol : "atwill" }]
		},
		"subclassfeature6" : {
			name : "Wild Fire",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc([
					"Once per turn when I deal fire damage to a creature, I can spend SP: other targets of my choice within " + (n < 18 ? 10 : 30) + " ft of it",
					"make a Dex save, taking 1d6 fire damage per SP on a failure, half on a success",
					"I learn Piercing Spell (not counted); it's free on my Flame Sorcery Spells"
				]);
			})
		},
		"subclassfeature14" : {
			name : "Consumptive Flame",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("When I cast a Flame Sorcery Spell, I can pay HP instead of SP: -2 current and max HP per SP (max HP restored after next long rest)")
		},
		"subclassfeature18" : {
			name : "Primordial Inferno",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"I'm immune to fire and resist radiant damage; Wild Fire's radius becomes 30 ft",
				"When a creature I see within 120 ft damages me, I can cast hellish rebuke at 4th level on it without SP, + Cha mod damage"
			]),
			savetxt : { immune : ["fire"] },
			dmgres : ["Radiant"],
			action : [["reaction", "Hellish Rebuke (4th, free)"]]
		}
	}
});

AddSubClass("sorcerer(laserllama)", "oceanic", {
	regExpSearch : /^(?=.*(oceanic|ocean|water|wave))(?=.*sorcer).*$/i,
	subname : "Oceanic Sorcery",
	fullname : "Oceanic Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLOriginSpells("Oceanic Sorcery", ["create or destroy water", "torrent", "blur", "hold person", "tidal wave", "wall of water", "summon elemental (water)", "watery sphere", "hold monster", "maelstrom"]),
		"subclassfeature1.1" : {
			name : "Waveborn",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I gain a swimming speed equal to my walking speed, can breathe air and water, and know Aquan",
				"I resist cold damage, have adv. on saves vs. harsh underwater conditions, and see underwater as in bright light"
			]),
			speed : { swim : { spd : "walk", enc : "walk" } },
			dmgres : ["Cold"],
			languageProfs : ["Aquan"]
		},
		"subclassfeature1.2" : {
			name : "Crashing Wave",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"I learn shape water (not counted); when I damage with it or an Oceanic Sorcery Spell, I can push the target",
					"5 ft per SP spent on the spell incl. Metamagic (min 5 ft), halved per size above Medium" + (n < 6 ? "" : "; I choose the direction (straight line)")
				]);
			}),
			spellcastingBonus : [{ name : "Crashing Wave", spells : LLSpellList(["shape water"]), selection : LLSpellList(["shape water"]), firstCol : "atwill" }]
		},
		"subclassfeature6" : {
			name : "Oceanic Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc([
					"As a reaction when hit by an attack, I halve its cold, bludgeoning, piercing, and slashing damage",
					"and move up to half my speed without provoking; when out of uses, it costs 2 SP" + (n < 18 ? "" : "; Primordial Deluge: see below")
				]);
			}),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature6.1" : {
			name : "Crushing Tide",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I choose the direction of Crashing Wave; I learn Piercing Spell (not counted), free on my Oceanic Sorcery Spells")
		},
		"subclassfeature14" : {
			name : "Watery Form",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"As a bonus action, 1 SP: until the end of the turn, I move through 1-inch gaps and enemies' spaces and resist opportunity attacks",
				"While using my swimming speed, I can Dash as a bonus action"
			]),
			action : [["bonus action", "Watery Form (1 SP)"]]
		},
		"subclassfeature18" : {
			name : "Primordial Deluge",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"I'm immune to cold, resist bludgeoning, piercing, and slashing damage, and am always in Watery Form if I want",
				"With Oceanic Resilience, I can spend SP: chosen creatures within 30 ft make a Str save, 1d10 cold per SP (half on save) + Crashing Wave"
			]),
			savetxt : { immune : ["cold"] },
			dmgres : ["Bludgeoning", "Piercing", "Slashing"]
		}
	}
});

AddSubClass("sorcerer(laserllama)", "stone", {
	regExpSearch : /^(?=.*(stone|earth))(?=.*sorcer).*$/i,
	subname : "Stone Sorcery",
	fullname : "Stone Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLOriginSpells("Stone Sorcery", ["earth tremor", "sanctuary", "earthen grasp", "spike growth", "erupting earth", "wall of sand", "stone shape", "summon elemental (earth)", "steel wind strike", "wall of stone"]),
		"subclassfeature1.1" : {
			name : "Stoneblood",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("My hit point maximum increases by my sorcerer level; I know Terran and learn mold earth (doesn't count against cantrips known)"),
			languageProfs : ["Terran"],
			calcChanges : {
				hp : function (totalHD) {
					if (classes.known["sorcerer(laserllama)"]) return [classes.known["sorcerer(laserllama)"].level, "Stoneblood (sorcerer level)"];
				}
			},
			spellcastingBonus : [{ name : "Stoneblood", spells : LLSpellList(["mold earth"]), selection : LLSpellList(["mold earth"]), firstCol : "atwill" }]
		},
		"subclassfeature1.2" : {
			name : "Earthen Form",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I encase myself in stone for 1 min" + (n < 14 ? " (ends if incapacitated or as a bonus action)" : " (permanent unless I end it, no SP cost)") + ":",
					"\u2022 Without armor/shield, my AC is 10 + Con mod + Cha mod; bonus action: gain Cha mod (min 1) temp HP",
					"\u2022 My unarmed strikes deal 1d6 (1d8 with two free hands) and can use Con instead of Str" + (n < 6 ? "" : "; they're magical"),
					n < 14 ? "When out of uses, I can spend 3 SP to transform again" : "While I have its temp HP, I resist nonmagical B/P/S damage" + (n < 18 ? "" : "; Monolith: immune to nonmagical B/P/S, can't be moved")
				]);
			}),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest",
			action : [["bonus action", ""], ["bonus action", "Earthen Form temp HP"]],
			armorOptions : [{
				regExpSearch : /^(?=.*earthen)(?=.*form).*$/i,
				name : "Earthen Form",
				source : [["GMB:LL", 0]],
				ac : "10+Con+Cha",
				dex : -10,
				selectNow : false
			}],
			weaponOptions : [{
				baseWeapon : "unarmed strike",
				regExpSearch : /^(?=.*earthen)(?=.*(form|strike|fist)).*$/i,
				name : "Earthen Form Strike",
				source : [["GMB:LL", 0]],
				ability : 3,
				damage : [1, 6, "bludgeoning"],
				description : "Only in Earthen Form; d8 with two free hands; Con or Str",
				useHighestMod : true,
				abilitytodamage : true,
				selectNow : true
			}]
		},
		"subclassfeature6" : {
			name : "Aegis of Stone",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I touch a willing creature and spend SP to give it 1d4 temp HP per SP" + (n < 18 ? "" : " (maximized)"),
					"Reaction when it's hit by a melee attack within 60 ft (same surface): I teleport within 5 ft of it and make an unarmed strike at the attacker"
				]);
			}),
			action : [["bonus action", ""], ["reaction", "Aegis of Stone strike"]]
		},
		"subclassfeature6.1" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"I can attack twice, instead of once, whenever I take the Attack action on my turn",
				"When I cast a 1-action spell, I can make a melee attack, shove, or grapple as a bonus action"
			]),
			attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			action : [["bonus action", "Attack/shove/grapple (after spell)"]]
		},
		"subclassfeature14" : {
			name : "Mountain's Heart",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Creatures with my Aegis temp HP (and I with Earthen Form temp HP) resist nonmagical B/P/S damage; Earthen Form is permanent and free")
		},
		"subclassfeature18" : {
			name : "Primordial Monolith",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("In Earthen Form, I'm immune to nonmagical B/P/S damage and can't be moved against my will; Aegis of Stone dice are maximized")
		}
	}
});

AddSubClass("sorcerer(laserllama)", "storm", {
	regExpSearch : /^(?=.*(storm|tempest|wind))(?=.*sorcer).*$/i,
	subname : "Storm Sorcery",
	fullname : "Storm Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLOriginSpells("Storm Sorcery", ["feather fall", "thunderwave", "gust of wind", "shatter", "call lightning", "wind wall", "storm sphere", "summon elemental (air)", "arcane hand", "control winds"]),
		"subclassfeature1.1" : {
			name : "Stormsoul",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"Whenever I expend SP, I can fly 5 ft per SP spent without provoking opportunity attacks",
				"I know Auran and learn beckon air (doesn't count against cantrips known, can't be replaced)"
			]),
			languageProfs : ["Auran"],
			spellcastingBonus : [{ name : "Stormsoul", spells : LLSpellList(["beckon air"]), selection : LLSpellList(["beckon air"]), firstCol : "atwill" }]
		},
		"subclassfeature6" : {
			name : "Eye of the Storm",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc([
					"As an action, I alter the weather within " + (n < 18 ? 100 : 300) + " ft in harmless ways",
					"As a bonus action, I spend SP: creatures of my choice within " + (n < 18 ? 10 : 30) + " ft make a Dex save, 1d6 lightning or thunder per SP (half on save)"
				]);
			}),
			action : [["action", "Alter Weather"], ["bonus action", "Storm Eruption (SP)"]]
		},
		"subclassfeature6.1" : {
			name : "Inner Tempest",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I resist lightning and thunder damage; I learn Piercing Spell (not counted), free on my Storm Sorcery Spells"),
			dmgres : ["Lightning", "Thunder"]
		},
		"subclassfeature14" : {
			name : "Windcaller",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("I gain a flying speed equal to my walking speed and learn wind walk (doesn't count against spells known)"),
			speed : { fly : { spd : "walk", enc : "walk" } },
			spellcastingBonus : [{ name : "Windcaller", spells : LLSpellList(["wind walk"]), selection : LLSpellList(["wind walk"]) }]
		},
		"subclassfeature18" : {
			name : "Primordial Storm",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I'm immune to lightning and thunder damage, and the range of both Eye of the Storm features is tripled"),
			savetxt : { immune : ["lightning", "thunder"] }
		}
	}
});

AddSubClass("sorcerer(laserllama)", "wild", {
	regExpSearch : /^(?=.*(wild|chaos))(?=.*sorcer).*$/i,
	subname : "Wild Sorcery",
	fullname : "Wild Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLOriginSpells("Wild Sorcery", ["chaos bolt", "color spray", "enlarge/reduce", "misty step", "blink", "hypnotic pattern", "confusion", "polymorph", "animate objects", "reincarnate"]),
		"subclassfeature1.1" : {
			name : "Wild Magic Surge",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"Whenever I expend SP, I roll a d8; if it equals the SP spent, a Wild Magic Surge occurs right after (see Notes)",
					"Surge spells target or center on me, use my DC, can't get Metamagic, and persist without concentration" + (n < 14 ? "" : "; I roll twice on the table and choose")
				]);
			}),
			toNotesPage : [{
				name : "Wild Magic Surge Table (Alternate Sorcerer)",
				note : [
					"01-02 Roll on this table at the start of each of your turns for 1 minute, ignoring this result on subsequent rolls.",
					"03-04 You cast magic missile, firing a single dart at every creature within 30 feet.",
					"05-06 A mischievous pixie appears within 30 feet under the DM's control, causing as much mischief as possible.",
					"07-08 You cast fireball as a 3rd-level spell centered on yourself.",
					"09-11 You teleport to a random unoccupied space you can see within 60 feet.",
					"12-14 You can only communicate in song for the next 1d8 hours.",
					"15-17 You gain 1d20 temporary hit points.",
					"18-20 Roll a d10: your height changes by that many inches (odd: shrink, even: grow).",
					"21-23 You gain the benefits of the jump spell.",
					"24-26 You gain the benefits of disguise self, looking like the nearest humanoid for the next 3d10 hours.",
					"27-29 You cast polymorph on yourself; if you fail the save, you turn into a llama for the spell's duration.",
					"30-32 For the next minute, you regain 5 hit points at the start of each of your turns.",
					"33-35 You cast grease centered on yourself.",
					"36-38 Creatures have disadvantage on saves against the first sorcerer spell you cast within the next minute.",
					"39-41 Your skin turns the color of the closest flower (remove curse ends this).",
					"42-44 You turn into a potted plant until the start of your next turn: incapacitated, vulnerable to all damage; at 0 HP the pot breaks and you revert.",
					"45-47 You know every spell on the sorcerer spell list for the next minute.",
					"48-50 For the next minute, your spells with a casting time of 1 action have a casting time of 1 bonus action.",
					"51-53 Up to three creatures of your choice you can see within 30 feet take 4d10 force damage.",
					"54-56 You regain all expended Hit Dice.",
					"57-58 Roll a d10: your age changes by that many years (odd: younger, min 1 year; even: older).",
					"59-60 Maximize the damage of the first spell you cast within the next minute.",
					"61-62 For the next minute, you can teleport up to 20 feet as a bonus action on each of your turns.",
					"63-65 You briefly see a fond childhood memory of a random creature within 60 feet.",
					"66-68 You can't speak for the next 1d6 minutes; pink bubbles float out of your mouth when you try.",
					"69-71 Your hair falls out but grows back in 2d10 minutes.",
					"72-74 You cast fog cloud centered on yourself.",
					"75-77 You are frightened by the nearest creature until the end of your next turn.",
					"78-80 Each creature within 30 feet of you becomes invisible for 1 minute (ends for a creature when it attacks or casts a spell).",
					"81-83 You gain resistance to all damage for 1 minute.",
					"84-86 You cast confusion centered on yourself.",
					"87-89 Illusory butterflies and flower petals flutter within 10 feet of you for 1d20 hours.",
					"90-92 Each creature within 30 feet takes 1d10 necrotic damage; you gain temp HP equal to the total dealt.",
					"93-95 You cast color spray at 9th level, targeting a 15-foot radius centered on you.",
					"96-98 The next time you die, you instantly return to life as if by the reincarnate spell.",
					"99-00 You regain all expended Sorcery Points."
				].join("\n")
			}]
		},
		"subclassfeature1.2" : {
			name : "Tides of Chaos",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I can give myself advantage on an ability check, attack roll, or saving throw",
				"Then, I can't until I trigger a Wild Magic Surge or finish a long rest; my next SP expenditure automatically triggers a Surge"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature6" : {
			name : "Twist Fate",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As a reaction when a creature I see within 30 ft makes a check, attack, or save, I expend Tides of Chaos (or 2 SP) to add or subtract 1d4"),
			action : [["reaction", ""]]
		},
		"subclassfeature6.1" : {
			name : "Unstable Sorcery",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I learn the Unstable Spell Metamagic (not counted, can't be replaced); for me it costs only 1 SP")
		},
		"subclassfeature14" : {
			name : "Focused Wild Magic",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Whenever I roll on the Wild Magic Surge table, I can roll twice and choose which effect occurs")
		},
		"subclassfeature18" : {
			name : "Sorcery Unleashed",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("When I roll the highest number on a spell's damage die, I roll that die again and add it, repeating while it rolls the max")
		}
	}
});

AddSubClass("sorcerer(laserllama)", "aberrant", {
	regExpSearch : /^(?=.*aberra)(?=.*sorcer).*$/i,
	subname : "Aberrant Sorcery",
	fullname : "Aberrant Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLOriginSpells("Aberrant Sorcery", ["arms of hadar", "dissonant whispers", "detect thoughts", "mystic spear", "cerebral blast", "hunger of hadar", "eldritch tentacles", "summon aberration", "psychic crush", "telekinesis"]),
		"subclassfeature1.1" : (function () {
			var o = LLSorcListAdd("Psionic Awakening", ["psion(laserllama)", "psion", "wizard"]);
			o.name = "Psionic Awakening";
			o.source = [["GMB:LL", 0]];
			o.minlevel = 1;
			o.description = LLdesc([
				"I learn one Psion cantrip (doesn't count against cantrips known); it's a sorcerer cantrip for me",
				"When I learn a sorcerer spell, I can choose it from the Psion spell list instead"
			]);
			o.spellcastingBonus[0]["class"] = LLSorcExtraCantripClass(["psion(laserllama)", "psion", "wizard"]);
			return o;
		})(),
		"subclassfeature1.2" : {
			name : "Telepathic Link",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("As a bonus action, I link with a creature I see: we can communicate telepathically (if it speaks a language) up to 1 mile"),
			action : [["bonus action", ""]]
		},
		"subclassfeature6" : {
			name : "Psionic Sorcery",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I learn Subtle Spell (not counted, can't be replaced); I can use it without SP Cha mod times per long rest"),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Alien Evolution",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("I gain one mutation (\"Choose Feature\"); as a bonus action, 2 SP: replace it with another"),
			action : [["bonus action", "Change mutation (2 SP)"]],
			choices : ["Glistening Flight", "Sensory Tendrils", "Thalassic Form", "Unnatural Flesh"],
			"glistening flight" : { name : "Alien Evolution: Glistening Flight", description : LLdesc("I emit an otherworldly light and have a flying speed equal to my walking speed; I can hover"), speed : { fly : { spd : "walk", enc : "walk" } } },
			"sensory tendrils" : { name : "Alien Evolution: Sensory Tendrils", description : LLdesc("My eyes become sensory stalks, granting me blindsight out to 30 ft"), vision : [["Blindsight", 30]] },
			"thalassic form" : { name : "Alien Evolution: Thalassic Form", description : LLdesc("I gain a swimming speed equal to twice my walking speed and can breathe air and water") },
			"unnatural flesh" : { name : "Alien Evolution: Unnatural Flesh", description : LLdesc("I move through 1-inch spaces without squeezing; 5 ft of movement escapes nonmagical restraints or grapples") }
		},
		"subclassfeature18" : {
			name : "Aberrant Anomaly",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"As an action, I teleport up to 120 ft to a space I see; creatures within 30 ft of where I left make a Str save",
				"Fail: 3d10 force damage and pulled toward that space; success: half and not pulled; after the free use, 7 SP"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		}
	}
});

AddSubClass("sorcerer(laserllama)", "divine", {
	regExpSearch : /^(?=.*divine)(?=.*sorcer).*$/i,
	subname : "Divine Sorcery",
	fullname : "Divine Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLOriginSpells("Divine Sorcery", ["bless", "guiding bolt", "aid", "restoration", "beacon of hope", "revivify", "divination", "guardian of faith", "dispel evil & good", "summon celestial"], "Optional: replace this list with the Domain Spells of a fitting Divine Domain"),
		"subclassfeature1.1" : (function () {
			var o = LLSorcListAdd("Consecrated Soul", ["cleric(laserllama)", "cleric"]);
			o.name = "Consecrated Soul";
			o.source = [["GMB:LL", 0]];
			o.minlevel = 1;
			o.description = LLdesc([
				"I learn one cleric cantrip (doesn't count against cantrips known); it's a sorcerer cantrip for me",
				"When I learn a sorcerer spell, I can choose it from the cleric spell list instead"
			]);
			o.spellcastingBonus[0]["class"] = LLSorcExtraCantripClass(["cleric(laserllama)", "cleric"]);
			return o;
		})(),
		"subclassfeature1.2" : {
			name : "Blessed by Fate",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("When I fail a check or save or miss an attack, I can spend SP to add 1d4; costs 1 SP, +1 SP per use since my last long rest")
		},
		"subclassfeature6" : {
			name : "Divine Empowerment",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I learn Empowered Spell (not counted); with it, I can reroll any number of dice of spells that heal or grant temp HP (1 SP)")
		},
		"subclassfeature14" : {
			name : "Celestial Flight",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As a bonus action, I manifest or dismiss luminescent wings: 30 ft flying speed, bright light 10 ft + dim light 10 ft"),
			action : [["bonus action", ""]]
		},
		"subclassfeature18" : {
			name : "Divine Regeneration",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"If I start my turn with less than half my HP (but at least 1), I regain 5 + Cha mod HP",
				"If I die, my body is permanently under the effect of gentle repose (only divine intervention or wish ends it)"
			])
		}
	}
});

AddSubClass("sorcerer(laserllama)", "prime", {
	regExpSearch : /^(?=.*(prime|clockwork|order))(?=.*sorcer).*$/i,
	subname : "Prime Sorcery",
	fullname : "Prime Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLOriginSpells("Prime Sorcery", ["protection from evil & good", "sanctuary", "aid", "restoration", "dispel magic", "counterspell", "banishment", "resilient sphere", "dispel evil & good", "wall of force"]),
		"subclassfeature1.1" : {
			name : "Impose Balance",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("As a reaction when a creature I see within 30 ft is about to roll with advantage or disadvantage, I remove them all"),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature6" : {
			name : "Shield of Law",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"As an action, I spend SP to ward me or a creature I see within 30 ft with 1d6 per SP until my next long rest",
				"When it takes damage, it can roll any number of the remaining dice to reduce the damage by the total"
			]),
			action : [["action", ""]]
		},
		"subclassfeature6.1" : {
			name : "Unbreakable Order",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I learn Sturdy Spell (not counted, can't be replaced); I can use it without SP Cha mod times per long rest"),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Restore Balance",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"As an action, I affect an adjacent 20-ft cube; after the free use, it costs 5 SP:",
				"Regenerate: 4 \xD7 my level HP divided among chosen creatures; Repair: objects/structures repaired and aging undone;",
				"Restore: spells of 5th level or lower of my choice on creatures or objects in the area end"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		},
		"subclassfeature18" : {
			name : "Aura of Order",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"As a bonus action, I emit a 30-ft aura for 1 min (concentration); for chosen creatures in it, including me:",
				"Attacks against them can't have advantage; they treat d20 rolls of 9 or lower on checks, attacks, and saves as a 10",
				"After the free use, it costs 7 SP"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["bonus action", ""]]
		}
	}
});

AddSubClass("sorcerer(laserllama)", "shadow", {
	regExpSearch : /^(?=.*shadow)(?=.*sorcer).*$/i,
	subname : "Shadow Sorcery",
	fullname : "Shadow Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLOriginSpells("Shadow Sorcery", ["false life", "ray of sickness", "darkness", "shadow blade", "enemies abound", "summon undead", "phantasmal killer", "shadow of moil", "enervation", "negative energy flood"]),
		"subclassfeature1.1" : {
			name : "Dark Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"Instead of a death saving throw, I can regain sorcerer level + Cha mod HP and take my turn as normal",
				"The first use per long rest is free; each further use gives me one level of exhaustion"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature1.2" : {
			name : "Umbral Sight",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I can see normally in darkness and dim light out to 120 ft, including magical darkness I create with my Sorcery"),
			vision : [["Umbral Sight", 120]]
		},
		"subclassfeature6" : {
			name : "Accursed Shadow",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"I can cast summon undead using my shadow as component: Ghostly form only, duration 10 min, it appears within 5 ft",
				"of a creature I see within 120 ft; while within 5 ft of it, that creature has disadv. on saves vs. my spells",
				"Once per long rest, I can cast it this way at my Spell Limit level without SP"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Shadow Step",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("When in dim light or darkness, as a bonus action, I teleport up to 120 ft to a space of dim light or darkness I can see"),
			action : [["bonus action", ""]]
		},
		"subclassfeature18" : {
			name : "Dark Ascension",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"As a bonus action, I become pure shadow for 1 min (ends if incapacitated or as a bonus action); after the free use, 7 SP",
				"I resist all damage except force and radiant and move through nonmagical creatures and objects as difficult terrain",
				"Ending inside an object shunts me to the nearest space, taking 1d10 force damage per 5 ft"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["bonus action", ""]]
		}
	}
});

// ======================================================================
// LaserLlama - Alternate Sorcerer Expanded v4.0.1.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" and "LaserLlama - Alternate Sorcerer v4.0.1.js" (import them first).

	-INFORMATION-
	Subject:	Expansion, "Alternate Sorcerer Expanded"
	Effect:		This script adds 18 Metamagics, 2 feats, and 9 Sorcerous Origins for the Alternate Sorcerer.
				Alternate Sorcerer Expanded v4.0.1 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
*/


if (!ClassList["sorcerer(laserllama)"] || typeof LLAddMetamagics !== "function") {
	throw new Error("Please import the 'LaserLlama - Alternate Sorcerer v4.0.1.js' file before importing this file.");
}

// ======================= METAMAGIC =======================
LLMetamagic = LLMetamagic.concat([
	["Adamant Spell", "SP = spell level: my spell is immune to counterspell, dispel magic, antimagic field, etc.; can exceed my Spell Limit"],
	["Blinding Spell", "X SP: X targets of my fire/radiant damage spell make a Con save or are blinded up to 1 min (save at start of each turn)"],
	["Brutal Spell", "2 SP before rolling damage: each damage die that rolls its max is rolled again and added"],
	["Concussive Spell", "X SP: X targets of my bludgeoning/thunder damage spell make a Str save or fall prone (Large+ have adv.)"],
	["Dynamic Presence", "Proficiency in Deception, Intimidation, or Persuasion; 1 SP before rolling: add double my Prof Bonus (can be taken more than once)", undefined, { skillstxt : "Choose one from Deception, Intimidation, or Persuasion" }],
	["Empowered Cantrip", "1 SP: cast a sorcerer cantrip as if I were at the next cantrip damage tier"],
	["Imbuing Touch", "Bonus action, 1 SP: a nonmagical weapon I touch deals force damage instead of its normal type for 1 minute", undefined, { action : [["bonus action", "Imbuing Touch (1 SP)"]] }],
	["Immutable Will", "Reaction when I fail a save, 3 SP: reroll it with a bonus equal to my Cha mod (min +1)", undefined, { action : [["reaction", "Immutable Will (3 SP)"]] }],
	["Linked Spell", "1 SP: touch a willing creature within 5 ft and expend one of its spell slots to cast my spell instead of SP"],
	["Magical Guidance", "Reaction when I make an ability check, 2 SP: reroll the d20 (must use the new roll)", undefined, { action : [["reaction", "Magical Guidance (2 SP)"]] }],
	["Overcharged Spell", "X SP: single-target spell attack scores a critical hit on a roll X lower than normal (e.g. 3 SP: 17-20)"],
	["Precise Spell", "1 SP: my spell attack roll ignores all sources of disadvantage"],
	["Recycled Spell", "When my spell fails, I can use my action next turn to regain half the SP spent on it (rounded down, incl. Metamagic)"],
	["Savage Spell", "1 SP: change the bludgeoning, piercing, or slashing damage of my spell to another of these types"],
	["Siphoning Spell", "2 SP when I damage with a spell: gain temp HP = half the damage dealt to one target (lasts 10 min)"],
	["Sorcerous Fortitude", "As an action, I spend X SP to gain Xd4 temp HP (lasts 10 min)", undefined, { action : [["action", "Sorcerous Fortitude (SP)"]] }],
	["Terrifying Spell", "X SP: X targets of my necrotic/psychic damage spell make a Wis save or are frightened of me for 1 min (save each turn)"],
	["Venomous Spell", "X SP: X targets of my acid/poison damage spell make a Con save or are poisoned up to 1 min (save each turn)"]
]);
LLAddMetamagics();

// ======================= FEATS =======================
FeatsList["alternate metamagic adept (laserllama)"] = {
	name : "Alternate Metamagic Adept",
	source : [["GMB:LL", 0]],
	prerequisite : "The ability to cast at least one spell",
	prereqeval : function (v) { return v.isSpellcaster; },
	description : "I learn one Metamagic of the Alternate Sorcerer (use the \"Choose Feat\" choice). Once per short rest, I can use it without spending Sorcery Points, as if I spent the minimum. [+1 to a spellcasting ability score]",
	scorestxt : "+1 to one ability score I use as a spellcasting ability",
	usages : 1,
	recovery : "short rest",
	choices : []
};
(function () {
	var oFeat = FeatsList["alternate metamagic adept (laserllama)"];
	for (var i = 0; i < LLMetamagic.length; i++) {
		var a = LLMetamagic[i];
		oFeat.choices.push(a[0]);
		oFeat[a[0].toLowerCase()] = {
			description : "I learn the " + a[0] + " Metamagic: " + a[1] + ". Once per short rest, I can use it for free (as if I spent the minimum SP). [+1 to a spellcasting ability score]",
			scorestxt : "+1 to one ability score I use as a spellcasting ability"
		};
	}
})();

FeatsList["sorcerous spark (laserllama)"] = {
	name : "Sorcerous Spark",
	source : [["GMB:LL", 0]],
	description : "I learn two cantrips and one 1st-level spell from the Alternate Sorcerer list, using Charisma (or my existing spellcasting ability). I gain 2 Sorcery Points to cast spells I know as a sorcerer would (added to my pool if I have one), regained on a long rest.",
	spellcastingBonus : [{
		name : "Sorcerous Spark cantrips",
		"class" : "sorcerer(laserllama)",
		level : [0, 0],
		times : 2
	}, {
		name : "Sorcerous Spark 1st-level",
		"class" : "sorcerer(laserllama)",
		level : [1, 1]
	}],
	spellcastingAbility : 6,
	allowUpCasting : true,
	usages : 2,
	recovery : "long rest",
	limfeaname : "Sorcery Points (Sorcerous Spark)"
};

// ======================= SORCEROUS ORIGINS =======================

AddSubClass("sorcerer(laserllama)", "cosmic", {
	regExpSearch : /^(?=.*(cosmic|star))(?=.*sorcer).*$/i,
	subname : "Cosmic Sorcery",
	fullname : "Cosmic Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLOriginSpells("Cosmic Sorcery", ["guiding bolt", "jump", "hold person", "moonbeam", "daylight", "minute meteors", "fire shield", "sickening radiance", "dawn", "wall of light"]),
		"subclassfeature1.1" : {
			name : "Radiant Soul",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"I learn glitterbeam (not counted) and add my Cha mod to its damage",
					"As a bonus action, I emit (or stop) 30-ft bright light + 30 ft dim light, with stars on my body" + (n < 14 ? "" : "; then I can fly (hover) at my walking speed")
				]);
			}),
			action : [["bonus action", ""]],
			spellcastingBonus : [{ name : "Radiant Soul", spells : LLSpellList(["glitterbeam"]), selection : LLSpellList(["glitterbeam"]), firstCol : "atwill" }]
		},
		"subclassfeature6" : {
			name : "Blinding Defense",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As a reaction when hit by an attacker within 30 ft, 2 SP: it makes a Con save or is blinded until my next turn and the attack misses"),
			action : [["reaction", " (2 SP)"]]
		},
		"subclassfeature6.1" : {
			name : "Searing Light",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I learn Blinding Spell (not counted, can't be replaced); I can use it without SP Cha mod times per long rest"),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Celestial Ascension",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("While emitting light with Radiant Soul, I fly (hover) at my walking speed; creatures in its bright light have disadv. on saves vs. blinded")
		},
		"subclassfeature18" : {
			name : "Luminous Mastery",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I resist radiant damage and learn crown of stars; at the end of each long rest I gain its effect until my next long rest (ends early if all motes are used)"),
			dmgres : ["Radiant"],
			spellcastingBonus : [{ name : "Luminous Mastery", spells : LLSpellList(["crown of stars"]), selection : LLSpellList(["crown of stars"]) }]
		}
	}
});

AddSubClass("sorcerer(laserllama)", "elder", {
	regExpSearch : /^(?=.*elder)(?=.*sorcer).*$/i,
	subname : "Elder Sorcery",
	fullname : "Elder Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : {
			name : "Ancient Mind",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I gain proficiency in History and learn two exotic languages",
				"While sleeping in a long rest, I focus on a person/place/object from the last 24 hours: Cha (History) check to learn one (forgotten) fact"
			]),
			skills : ["History"],
			languageProfs : [2]
		},
		"subclassfeature1.1" : (function () {
			var o = LLSorcListAdd("Chained Power", ["warlock(laserllama)", "warlock"]);
			o.name = "Chained Power";
			o.source = [["GMB:LL", 0]];
			o.minlevel = 1;
			o.description = LLdesc([
				"I learn one warlock cantrip (doesn't count against cantrips known); it's a sorcerer cantrip for me",
				"When I learn a sorcerer spell, I can choose it from the warlock spell list instead"
			]);
			o.spellcastingBonus[0]["class"] = LLSorcExtraCantripClass(["warlock(laserllama)", "warlock"]);
			return o;
		})(),
		"subclassfeature1.2" : LLOriginSpells("Elder Sorcery", ["arms of hadar", "hideous laughter", "augury", "crown of madness", "clairvoyance", "hunger of hadar", "arcane eye", "eldritch tentacles", "contact other plane", "dream"]),
		"subclassfeature6" : {
			name : "Inscrutable Mind",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"I have advantage on saves vs. being charmed, frightened, or having my thoughts read",
				"Once per long rest, as a reaction when I must make an Int, Wis, or Cha save vs. a spell, a creature I see within 30 ft (not the caster) becomes its target instead"
			]),
			savetxt : { adv_vs : ["charmed", "frightened", "thoughts read"] },
			usages : 1,
			recovery : "long rest",
			action : [["reaction", "Redirect Spell"]]
		},
		"subclassfeature14" : {
			name : "Otherworldly Step",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("When I spend SP, I can teleport 5 ft per SP spent to an unoccupied space")
		},
		"subclassfeature18" : {
			name : "Eldritch Revelation",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"As an action, chosen creatures within 60 ft that see me make a Wis save: fail: hideous laughter (no concentration) + 4d8 psychic",
				"Success: half damage; they repeat saves as normal; after the free use, it costs 7 SP"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		}
	}
});

AddSubClass("sorcerer(laserllama)", "entropic", {
	regExpSearch : /^(?=.*(entropic|entropy|void))(?=.*sorcer).*$/i,
	subname : "Entropic Sorcery",
	fullname : "Entropic Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLOriginSpells("Entropic Sorcery", ["inflict wounds", "ray of sickness", "darkness", "ray of enfeeblement", "counterspell", "dispel magic", "blight", "sickening radiance", "antilife shell", "maelstrom"]),
		"subclassfeature1.1" : {
			name : "Entropic Touch",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc("As an action, 2 SP: a nonmagical object not worn or carried I touch (max " + (n < 6 ? "Small" : n < 14 ? "Medium" : n < 17 ? "Large" : "Huge") + ") turns to dust");
			}),
			action : [["action", " (2 SP)"]]
		},
		"subclassfeature1.2" : {
			name : "Null Magic",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("A creature I damage with an Entropic Sorcery Spell can't regain HP or gain temp HP until the start of my next turn")
		},
		"subclassfeature6" : {
			name : "Negate Spell",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I can cast counterspell or dispel magic at 3rd level without SP"),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Ray of Annihilation",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("I learn disintegrate (not counted); besides Arcanum slots, I can cast it at 6th level for 9 SP"),
			spellcastingBonus : [{ name : "Ray of Annihilation", spells : LLSpellList(["disintegrate"]), selection : LLSpellList(["disintegrate"]) }]
		},
		"subclassfeature18" : {
			name : "Disciple of the Void",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"As a bonus action, 1 SP: until the end of my turn, my spells can deal force damage and I move through creatures/objects as difficult terrain",
				"Ending inside one shunts me out (1d10 force per 5 ft); a creature I pass through makes a Con save or takes 1d10 force (once per turn)"
			]),
			action : [["bonus action", " (1 SP)"]]
		}
	}
});

AddSubClass("sorcerer(laserllama)", "fey", {
	regExpSearch : /^(?=.*(fey|fae))(?=.*sorcer).*$/i,
	subname : "Fey Sorcery",
	fullname : "Fey Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLOriginSpells("Fey Sorcery", ["color spray", "faerie fire", "calm emotions", "misty step", "blink", "hypnotic pattern", "compulsion", "dominate beast", "dominate person", "seeming"]),
		"subclassfeature1.1" : (function () {
			var o = LLSorcListAdd("Faeblood", ["bard(laserllama)", "bard"]);
			o.name = "Faeblood";
			o.source = [["GMB:LL", 0]];
			o.minlevel = 1;
			o.description = LLdesc([
				"I learn one bard cantrip (doesn't count against cantrips known); it's a sorcerer cantrip for me",
				"When I learn a sorcerer spell, I can choose it from the bard spell list instead"
			]);
			o.spellcastingBonus[0]["class"] = LLSorcExtraCantripClass(["bard(laserllama)", "bard"]);
			return o;
		})(),
		"subclassfeature1.2" : {
			name : "Heartsight",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I gain proficiency in Insight and add my Cha mod (min +1) to Insight checks",
				"As an action, I touch a creature: Insight check vs. its CR to learn its alignment and strongest surface emotion (it's unaware)"
			]),
			skills : ["Insight"],
			addMod : [{ type : "skill", field : "Insight", mod : "max(Cha|1)", text : "I add my Charisma modifier (min +1) to Wisdom (Insight) checks." }],
			action : [["action", ""]]
		},
		"subclassfeature6" : {
			name : "Emotional Focus",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("At the end of each long rest, I choose an emotion (\"Choose Feature\"): until my next long rest, I resist its damage and am immune to its condition"),
			choices : ["Anger", "Disgust", "Envy", "Joy", "Sorrow"],
			"anger" : { name : "Emotional Focus: Anger", description : LLdesc("I resist fire damage and am immune to being frightened"), dmgres : ["Fire"], savetxt : { immune : ["frightened"] } },
			"disgust" : { name : "Emotional Focus: Disgust", description : LLdesc("I resist acid damage and am immune to being charmed"), dmgres : ["Acid"], savetxt : { immune : ["charmed"] } },
			"envy" : { name : "Emotional Focus: Envy", description : LLdesc("I resist poison damage and am immune to being poisoned"), dmgres : ["Poison"], savetxt : { immune : ["poisoned"] } },
			"joy" : { name : "Emotional Focus: Joy", description : LLdesc("I resist lightning damage and am immune to being frightened"), dmgres : ["Lightning"], savetxt : { immune : ["frightened"] } },
			"sorrow" : { name : "Emotional Focus: Sorrow", description : LLdesc("I resist cold damage and am immune to being charmed"), dmgres : ["Cold"], savetxt : { immune : ["charmed"] } }
		},
		"subclassfeature14" : {
			name : "Fleeting Step",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As a reaction when I must make a save, I teleport up to 60 ft to a space I see and automatically succeed; after the free use, 7 SP"),
			usages : 1,
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature18" : {
			name : "Intoxicating Presence",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("When I cast an enchantment spell on a creature within 30 ft that can see or hear me, it has disadv. on its initial save")
		}
	}
});

AddSubClass("sorcerer(laserllama)", "infernal", {
	regExpSearch : /^(?=.*(infernal|fiend))(?=.*sorcer).*$/i,
	subname : "Infernal Sorcery",
	fullname : "Infernal Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : {
			name : "Fiendish Lineage",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I gain proficiency in Deception or Intimidation and learn Abyssal or Infernal"),
			skillstxt : "Choose one from Deception or Intimidation",
			languageProfs : [["Abyssal or Infernal", 1]]
		},
		"subclassfeature1.1" : {
			name : "Infernal Form",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I take on an Infernal Form for " + (n < 18 ? "1 min (ends if incapacitated or as a bonus action)" : "as long as I want") + ":",
					"\u2022 Claws: unarmed strikes deal " + (n < 18 ? "1d8" : "2d8") + " slashing and can use Cha instead of Str" + (n < 6 ? "" : "; they're magical"),
					"\u2022 Without armor, my AC is 10 + Dex mod + Cha mod; +10 ft walking speed; bonus action: Cha mod (min 1) temp HP",
					n < 18 ? "When out of uses, I can spend 3 SP to transform again" : "\u2022 Flying speed = walking speed; immune to nonmagical bludgeoning, piercing, and slashing damage"
				]);
			}),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest",
			action : [["bonus action", ""], ["bonus action", "Infernal Form temp HP"]],
			armorOptions : [{
				regExpSearch : /^(?=.*infernal)(?=.*form).*$/i,
				name : "Infernal Form",
				source : [["GMB:LL", 0]],
				ac : "10+Cha",
				selectNow : false
			}],
			weaponOptions : [{
				baseWeapon : "unarmed strike",
				regExpSearch : /^(?=.*infernal)(?=.*claw).*$/i,
				name : "Infernal Claws",
				source : [["GMB:LL", 0]],
				ability : 6,
				damage : [1, 8, "slashing"],
				description : "Only in Infernal Form; Cha or Str; 2d8 from 18th level",
				useHighestMod : true,
				abilitytodamage : true,
				selectNow : true
			}]
		},
		"subclassfeature1.2" : LLOriginSpells("Infernal Sorcery", ["hellish rebuke", "wrathful smite", "flame whip", "scorching ray", "bestow curse", "blinding smite", "shadow of moil", "staggering smite", "insect plague", "spiritual sundering"]),
		"subclassfeature6" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"I can attack twice, instead of once, whenever I take the Attack action on my turn",
				"When I use my action to cast a 1-action spell or Dash, I can make one melee attack as a bonus action"
			]),
			attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			action : [["bonus action", "Melee attack (after spell/Dash)"]]
		},
		"subclassfeature14" : {
			name : "Fiendish Resistance",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As a reaction when I take damage, I spend SP to reduce it by 1d4 per SP (1d6 per SP in Infernal Form)"),
			action : [["reaction", " (SP)"]]
		},
		"subclassfeature18" : {
			name : "Sinister Apotheosis",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("My Infernal Form lasts until I end it; in it, I fly at my walking speed, am immune to nonmagical B/P/S damage, and my claws deal +1d8")
		}
	}
});

AddSubClass("sorcerer(laserllama)", "iron", {
	regExpSearch : /^(?=.*(iron|ironmonger))(?=.*sorcer).*$/i,
	subname : "Iron Sorcery",
	fullname : "Iron Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : {
			name : "Blade of Strife",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I conjure a Blade of Strife within 60 ft for 1 min, and make a melee spell attack vs. a target within 10 ft of it",
					"It deals " + (n < 14 ? "1d8" : "2d8") + " force damage" + (n < 6 ? "" : " + Cha mod (min +1); once per turn: a Large or smaller target makes a Str save or falls prone"),
					"On later turns, as a bonus action, I move it up to 30 ft and repeat the attack; when out of uses, 3 SP"
				]);
			}),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest",
			action : [["bonus action", ""]],
			weaponOptions : [{
				regExpSearch : /^(?=.*blade)(?=.*strife).*$/i,
				name : "Blade of Strife",
				source : [["GMB:LL", 0]],
				ability : 6,
				type : "Spell",
				damage : [1, 8, "force"],
				range : "10 ft of the Blade",
				description : "Bonus action to move 30 ft and attack; +1d8 from 14th level; Str save or prone (6th)",
				abilitytodamage : false,
				isAlwaysProf : true,
				selectNow : true
			}],
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (/blade of strife/i.test(v.WeaponName + " " + fields.Weapon_Name) && classes.known["sorcerer(laserllama)"] && classes.known["sorcerer(laserllama)"].level >= 6) {
							output.extraDmg += Math.max(1, Number(What("Cha Mod")));
						}
					},
					"From 6th level, my Blade of Strife adds my Charisma modifier (min +1) to its damage."
				],
				atkAdd : [
					function (fields, v) {
						if (/blade of strife/i.test(v.WeaponName + " " + fields.Weapon_Name) && classes.known["sorcerer(laserllama)"] && classes.known["sorcerer(laserllama)"].level >= 14) {
							fields.Damage_Die = "2d8";
						}
					},
					"From 14th level, my Blade of Strife deals an extra 1d8 damage."
				]
			}
		},
		"subclassfeature1.1" : {
			name : "Ironmonger",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I gain proficiency with light and medium armor, shields, and simple and martial weapons without heavy or two-handed",
				"I can cast sorcerer spells while wearing light or medium armor or using a shield"
			]),
			armorProfs : [true, true, false, true],
			weaponProfs : [true, false, ["martial weapons without heavy/two-handed"]]
		},
		"subclassfeature1.2" : LLOriginSpells("Iron Sorcery", ["command", "compelled duel", "cloud of daggers", "magic weapon", "conjure volley", "elemental weapon", "fabricate", "summon construct (metal)", "animate objects", "steel wind strike"]),
		"subclassfeature6" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I can attack twice when I take the Attack action; I can replace one or both with Blade of Strife attacks"),
			attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
		},
		"subclassfeature6.1" : {
			name : "Iron Smite",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("My Blade of Strife adds my Cha mod (min +1) to damage; once per turn, a Large or smaller target it hits makes a Str save or falls prone")
		},
		"subclassfeature14" : {
			name : "Iron Aegis",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As a reaction when a creature within 10 ft of my Blade is hit, I add my Cha mod (min +1) to its AC; my Blade deals +1d8 damage"),
			action : [["reaction", ""]]
		},
		"subclassfeature18" : {
			name : "Storm of Blades",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("My Blade can be the component of steel wind strike and makes its attacks (as melee spell attacks); 1 + Cha mod times per long rest without SP"),
			usages : "1 + Cha mod per ",
			usagescalc : "event.value = 1 + Math.max(0, Number(What('Cha Mod')));",
			recovery : "long rest"
		}
	}
});

AddSubClass("sorcerer(laserllama)", "royal", {
	regExpSearch : /^(?=.*(royal|regal))(?=.*sorcer).*$/i,
	subname : "Royal Sorcery",
	fullname : "Royal Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLOriginSpells("Royal Sorcery", ["command", "heroism", "find steed", "zone of truth", "conjure volley", "tiny servant", "compulsion", "guardian of faith", "dominate person", "geas"]),
		"subclassfeature1.1" : {
			name : "Royal Bearing",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I gain proficiency and expertise with Deception, Persuasion, or Intimidation (my choice)"),
			skillstxt : "Choose one from Deception, Persuasion, or Intimidation; I gain expertise with it"
		},
		"subclassfeature1.2" : {
			name : "Words of Authority",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc("I learn Heightened Spell (not counted); once per short rest, I apply it free to an enchantment spell on a target within " + (n < 14 ? 10 : 30) + " ft");
			}),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature6" : {
			name : "Inspiring Sorcery",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As a bonus action, I spend X SP: X creatures that see or hear me within 30 ft gain 1d4 + Cha mod temp HP"),
			action : [["bonus action", " (SP)"]]
		},
		"subclassfeature14" : {
			name : "Regal Presence",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Creatures of my choice within 30 ft that see or hear me are proficient in all saving throws; Words of Authority range is 30 ft")
		},
		"subclassfeature18" : {
			name : "Divine Command",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I learn divine word (not counted); once per long rest, I can cast it without SP or Arcanum slot"),
			spellcastingBonus : [{ name : "Divine Command", spells : LLSpellList(["divine word"]), selection : LLSpellList(["divine word"]), firstCol : "oncelr" }]
		}
	}
});

AddSubClass("sorcerer(laserllama)", "vampiric", {
	regExpSearch : /^(?=.*(vampir|blood))(?=.*sorcer).*$/i,
	subname : "Vampiric Sorcery",
	fullname : "Vampiric Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : LLOriginSpells("Vampiric Sorcery", ["command", "inflict wounds", "suggestion", "spider climb", "gaseous form", "vampiric touch", "blight", "greater invisibility", "dominate person", "enervation"]),
		"subclassfeature1.1" : {
			name : "Blood Magic",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"Instead of SP, I can spend HP: -2 current and max HP per SP (max HP restored after my next long rest)",
				"When I slay a creature with a 1st+ level sorcerer spell, I gain temp HP = spell level; these can fuel Blood Magic"
			]),
			toNotesPage : [{
				name : "Optional Rule: True Vampirism",
				note : LLdesc([
					"Creature Type: I'm undead, but healing spells work on me as normal",
					"Deathless Nature: I don't need to breathe, eat, or drink",
					"Spider Climb: I have a climbing speed equal to my walking speed (walls and ceilings, with free hands)",
					"Superior Darkvision: I have darkvision out to 120 ft",
					"Sunlight Hypersensitivity: I'm vulnerable to radiant damage and have disadv. on attacks and checks in direct sunlight"
				])
			}]
		},
		"subclassfeature6" : {
			name : "Undead Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I resist necrotic and poison damage and am immune to poisoned; with Blood Magic temp HP, I resist nonmagical non-silvered B/P/S"),
			dmgres : ["Necrotic", "Poison"],
			savetxt : { immune : ["poisoned"] }
		},
		"subclassfeature14" : {
			name : "Misty Escape",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As a reaction when reduced to 0 HP (not killed), I turn to mist and reappear with 1 HP within 30 ft; when out of uses, 5 SP"),
			usages : 1,
			recovery : "short rest",
			action : [["reaction", ""]]
		},
		"subclassfeature18" : {
			name : "Vampiric Mastery",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("When I deal necrotic damage with a 1st+ level sorcerer spell, I gain temp HP = half the necrotic damage (usable for Blood Magic)")
		}
	}
});

AddSubClass("sorcerer(laserllama)", "verdant", {
	regExpSearch : /^(?=.*(verdant|green))(?=.*sorcer).*$/i,
	subname : "Verdant Sorcery",
	fullname : "Verdant Sorcery",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature1" : (function () {
			var o = LLSorcListAdd("Greensinger", ["druid(laserllama)", "druid"], "druid");
			o.name = "Greensinger";
			o.source = [["GMB:LL", 0]];
			o.minlevel = 1;
			o.description = LLdesc([
				"I learn thorn whip (not counted, can't be replaced)",
				"When I learn a sorcerer spell, I can choose it from the druid spell list instead"
			]);
			o.spellcastingBonus = [{ name : "Greensinger", spells : LLSpellList(["thorn whip"]), selection : LLSpellList(["thorn whip"]), firstCol : "atwill" }];
			return o;
		})(),
		"subclassfeature1.1" : {
			name : "Overgrowth",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"When I hit with thorn whip, instead of pulling, I can cast ensnaring strike on the target (no concentration) for free",
					"As an action, I extrude a " + (n < 6 ? 15 : n < 18 ? 30 : 60) + "-ft vine to perform one simple task (no tools, weapons, or grappling)"
				]);
			}),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest",
			action : [["action", "Overgrowth vine"]]
		},
		"subclassfeature1.2" : LLOriginSpells("Verdant Sorcery", ["ensnaring strike", "entangle", "earthbind", "spike growth", "plant growth", "speak with plants", "grasping vine", "guardian of nature", "tree stride", "wrath of nature"]),
		"subclassfeature6" : {
			name : "Grasping Growth",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"Thorn whip and Overgrowth vines have a 30-ft range; thorn whip's damage dice become d10s",
				"As a bonus action, a vine forces a creature in range to make a Str save or be grappled and rooted (escape: Athletics vs. my DC)"
			]),
			action : [["bonus action", "Grasping Growth"]],
			spellChanges : {
				"thorn whip" : {
					range : "30 ft",
					changes : "Grasping Growth increases the range of thorn whip to 30 ft and its damage dice to d10s."
				}
			}
		},
		"subclassfeature14" : {
			name : "Sapping Grip",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("At the start of my turns, creatures grappled or restrained by my Verdant features/spells take 1d10 necrotic; I gain the total as temp HP")
		},
		"subclassfeature18" : {
			name : "Greensong",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"As a bonus action, for 1 min (until incapacitated): I cast plant growth on me for free; thorn whip and vine ranges double;",
				"I can cast entangle as a bonus action each turn without SP or concentration; when out of uses, 5 SP"
			]),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", ""]]
		}
	}
});

// ======================================================================
// LaserLlama - Alternate Warlock v3.2.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Alternate Warlock"
	Effect:		This script adds the Alternate Warlock class and its 9 Otherworldly Patrons.
				Its Pact Foci, Eldritch Familiars, Eldritch Invocations, and Elder Arcana are in the Common Attributes file.
				Alternate Warlock v3.2.0 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Warlock (LaserLlama)" in the Class field (e.g. "Fiend Warlock (LaserLlama)")
	Note:		Choose the Pact Ability (Int, Wis, or Cha) with the "Choose Feature" button of "Eldritch Spellcasting".
				The "Eldritch Blast (Pact)" attack uses it automatically.
*/


if (typeof LLAddFightingStyles !== "function" || typeof LLWarlockInvocations === "undefined" || typeof LLWlkAddFoci !== "function") {
	throw new Error("Please import the latest 'Laserllama Common Attributes 20261019.js' file before importing this file (it contains the Pact Foci, Eldritch Invocations, and Elder Arcana).");
}

if (ClassList["warlock"]) ClassList["warlock"].regExpSearch = /^(?=.*warlock)(?!.*laserllama).*$/i;
LLWlkSetAbi = function (n) {
	if (!CurrentVars) return;
	if (n) CurrentVars.LLWlkAbi = n; else delete CurrentVars.LLWlkAbi;
	SetStringifieds("vars");
	var nUse = n ? n : 6;
	if (CurrentClasses["warlock(laserllama)"]) CurrentClasses["warlock(laserllama)"].abilitySave = nUse;
	if (CurrentSpells["warlock(laserllama)"]) {
		CurrentSpells["warlock(laserllama)"].ability = nUse;
		SetStringifieds("spells");
		CurrentUpdates.types.push("spells");
	}
	if (typeof SetTheAbilitySaveDCs === "function") SetTheAbilitySaveDCs();
};
var LLWarlockSpells = [
	"blade ward", "booming blade", "chill touch", "create bonfire", "dancing lights", "frostbite", "green-flame blade", "infestation", "lightning lure", "mage hand", "magic stone", "mind sliver", "minor illusion", "otherworldly grasp", "poison spray", "prestidigitation", "sword burst", "tempestuous blade", "thunderclap", "toll the dead", "true strike",
	"armor of agathys", "arms of hadar", "bane", "cause fear", "charm person", "color spray", "comprehend languages", "dissonant whispers", "expeditious retreat", "ghastly flight", "hellish rebuke", "hex", "hideous laughter", "illusory script", "inflict wounds", "jump", "protection from evil & good", "ray of sickness", "sleep", "unseen servant", "witch bolt",
	"cloud of daggers", "create ooze", "crown of madness", "darkness", "earthbind", "enthrall", "flame whip", "hold person", "invisibility", "levitate", "mind spike", "mind whip", "mirror image", "misty step", "mystic spear", "phantasmal force", "ray of enfeeblement", "shadow blade", "shatter", "spider climb", "suggestion",
	"bestow curse", "conjure elemental", "conjure fey", "conjure fiend", "counterspell", "dispel magic", "elemental bane", "enemies abound", "fear", "fly", "gaseous form", "hunger of hadar", "hypnotic pattern", "intellect fortress", "life transference", "magic circle", "major image", "remove curse", "slow", "spectral passage", "spirit shroud", "thunder step", "tongues", "vampiric touch",
	"accursed touch", "arcane eye", "banishment", "blight", "charm monster", "compulsion", "confusion", "conjure aberration", "create undead", "dimension door", "dominate creature", "eldritch tentacles", "giant insect", "greater invisibility", "hallucinatory terrain", "phantasmal killer", "polymorph", "shadow of moil", "sickening radiance",
	"contact other plane", "contagion", "danse macabre", "dream", "enervation", "far step", "geas", "hallow", "hold monster", "insect plague", "legend lore", "mislead", "negative energy flood", "planar binding", "scrying", "spiritual sundering", "synaptic static", "teleportation circle", "wall of light"
];
LLAddSpellsToClass("warlock(laserllama)", LLWarlockSpells);

LLWlkSlots = levels.map(function (n) { return n < 2 ? 0 : n < 11 ? 2 : n < 17 ? 3 : 4; });
LLWlkSlotLvl = levels.map(function (n) { return n < 2 ? 0 : n < 3 ? 1 : n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : 5; });
LLWlkInvCount = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8];

LLPatronSpells = function (sName, aSpells, sBlast) {
	return {
		name : sName,
		source : [["GMB:LL", 0]],
		minlevel : 2,
		description : LLdesc([
			sBlast,
			"I learn my Patron Spells at the levels shown; they don't count against my spells known and can't be replaced"
		]),
		spellcastingExtra : LLSpellList(aSpells),
		spellcastingExtraApplyNonconform : true
	};
};

ClassList["warlock(laserllama)"] = {
	name : "Warlock (LaserLlama)",
	regExpSearch : /^(?=.*warlock)(?=.*laserllama).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Intelligence, Wisdom, or Charisma",
	prereqs : "Intelligence, Wisdom, or Charisma 13",
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Int", "Wis"],
	abilitySave : 6,
	spellcastingFactor : "warlock1",
	spellcastingTable : [[0, 0, 0, 0, 0, 0, 0, 0, 0]].concat(levels.map(function (n, idx) {
		var a = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		if (LLWlkSlotLvl[idx]) a[LLWlkSlotLvl[idx] - 1] = LLWlkSlots[idx];
		return a;
	})),
	spellcastingKnown : {
		cantrips : [0, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : [0, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10]
	},
	spellcastingList : {
		"class" : "warlock(laserllama)",
		level : [0, 5]
	},
	skillstxt : {
		primary : "Choose two from Arcana, Deception, History, Intimidation, Investigation, Nature, and Religion"
	},
	armorProfs : {
		primary : [true, false, false, false],
		secondary : [true, false, false, false]
	},
	weaponProfs : {
		primary : [true, false],
		secondary : [true, false]
	},
	equipment : "Warlock (LaserLlama) starting equipment:" +
		"\n \u2022 A light crossbow and 20 bolts -or- any simple weapon;" +
		"\n \u2022 A component pouch -or- an arcane focus;" +
		"\n \u2022 A scholar's pack -or- a dungeoneer's pack;" +
		"\n \u2022 Leather armor, any simple weapon, and two daggers." +
		"\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Otherworldly Patron", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	features : {
		"eldritch spellcasting" : {
			name : "Eldritch Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"Choose my Pact Ability (Int, Wis, or Cha) with the \"Choose Feature\" button; my Invocations, spells, and DC use it",
				"Eldritch Blast: as an action while holding a Trinket, ranged spell attack within 120 ft, 1d8 + Pact mod force damage"
			]),
			additional : levels.map(function (n) { return (n < 5 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4) + " beam" + (n < 5 ? "" : "s"); }),
			choices : ["Intelligence", "Wisdom", "Charisma"],
			changeeval : function () { if (CurrentVars && CurrentVars.LLWlkAbi) LLWlkSetAbi(CurrentVars.LLWlkAbi); },
			"intelligence" : {
				name : "Pact Ability: Intelligence",
				description : LLdesc(["My Pact Ability is Intelligence", "Eldritch Blast: as an action while holding a Trinket, ranged spell attack within 120 ft, 1d8 + Pact mod force damage"]),
				eval : function () { LLWlkSetAbi(4); },
				changeeval : function () { LLWlkSetAbi(4); },
				removeeval : function () { LLWlkSetAbi(); }
			},
			"wisdom" : {
				name : "Pact Ability: Wisdom",
				description : LLdesc(["My Pact Ability is Wisdom", "Eldritch Blast: as an action while holding a Trinket, ranged spell attack within 120 ft, 1d8 + Pact mod force damage"]),
				eval : function () { LLWlkSetAbi(5); },
				changeeval : function () { LLWlkSetAbi(5); },
				removeeval : function () { LLWlkSetAbi(); }
			},
			"charisma" : {
				name : "Pact Ability: Charisma",
				description : LLdesc(["My Pact Ability is Charisma", "Eldritch Blast: as an action while holding a Trinket, ranged spell attack within 120 ft, 1d8 + Pact mod force damage"]),
				eval : function () { LLWlkSetAbi(6); },
				changeeval : function () { LLWlkSetAbi(6); },
				removeeval : function () { LLWlkSetAbi(); }
			},
			action : [["action", "Eldritch Blast"]],
			weaponOptions : [{
				regExpSearch : /^(?=.*eldritch)(?=.*blast)(?=.*pact).*$/i,
				name : "Eldritch Blast (Pact)",
				source : [["GMB:LL", 0]],
				ability : 6,
				useSpellMod : "warlock(laserllama)",
				type : "Spell",
				damage : [1, 8, "force"],
				range : "120 ft",
				description : "Needs a Trinket; one attack per beam (5th: 2, 11th: 3, 17th: 4); Patron can change die/type",
				abilitytodamage : true,
				isAlwaysProf : true,
				selectNow : true
			}]
		},
		"eldritch invocations" : {
			name : "Eldritch Invocations",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"Each Invocation is bound to a Trinket (it reforms at the end of a short or long rest if lost)",
				"Use the \"Choose Feature\" button above to add Invocations; I can replace one each time I gain a warlock level"
			]),
			additional : levels.map(function (n, idx) { return LLWlkInvCount[idx] + " invocations known"; }),
			extraname : "Eldritch Invocation",
			extrachoices : [],
			extraTimes : LLWlkInvCount
		},
		"subclassfeature2" : {
			name : "Otherworldly Patron",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc('Choose the Otherworldly Patron I have a bargain with and put it in the "Class" field ')
		},
		"pact magic" : {
			name : "Pact Magic",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I can cast warlock cantrips/spells I know with my Pact Ability; all my slots are of my Slot Level",
				"I regain all expended spell slots on a short or long rest; I can swap one spell known per warlock level",
				"Spells from Invocations count as warlock spells; a Trinket or arcane focus is my spellcasting focus"
			]),
			additional : levels.map(function (n, idx) {
				return n < 2 ? "" : LLWlkSlots[idx] + " \xD7 " + ["1st", "2nd", "3rd", "4th", "5th"][LLWlkSlotLvl[idx] - 1] + "-level slots";
			})
		},
		"pact focus" : {
			name : "Pact Focus",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Choose a Pact Focus with the \"Choose Feature\" button above"),
			choices : []
		},
		"empowered blast" : {
			name : "Empowered Blast",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("My Eldritch Blast creates more beams, which I can direct at the same or different targets (separate attack rolls)"),
			additional : levels.map(function (n) { return n < 5 ? "" : (n < 11 ? 2 : n < 17 ? 3 : 4) + " beams"; })
		},
		"elder arcanum" : {
			name : "Elder Arcanum",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("I unlock Elder Arcana with the \"Choose Feature\" button above; once learned, they can't be replaced"),
			additional : levels.map(function (n) { return n < 11 ? "" : (n < 13 ? 1 : n < 15 ? 2 : n < 17 ? 3 : 4) + " Elder Arcana"; }),
			extraname : "Elder Arcanum",
			extrachoices : [],
			extraTimes : levels.map(function (n) { return n < 11 ? 0 : n < 13 ? 1 : n < 15 ? 2 : n < 17 ? 3 : 4; })
		},
		"pact master" : {
			name : "Pact Master",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("Once per long rest, as an action, I regain all expended Pact Magic spell slots"),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		}
	}
};
LLWlkAddFoci(ClassList["warlock(laserllama)"].features["pact focus"]);
LLWlkOptions(ClassList["warlock(laserllama)"].features["eldritch invocations"], LLWarlockInvocations);
LLWlkOptions(ClassList["warlock(laserllama)"].features["elder arcanum"], LLWarlockElderArcana);

// ======================= OTHERWORLDLY PATRONS =======================

AddSubClass("warlock(laserllama)", "archfey", {
	regExpSearch : /^(?=.*(archfey|\bfey\b|fae))(?=.*warlock).*$/i,
	subname : "the Archfey",
	fullname : "Archfey",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLPatronSpells("Fey Magic", ["faerie fire", "sleep", "misty step", "phantasmal force", "fear", "hypnotic pattern", "hallucinatory terrain", "greater invisibility", "mislead", "seeming"], "My Eldritch Blast can deal psychic damage equal to 1d10 + Pact mod"),
		"subclassfeature2.1" : {
			name : "Fey Presence",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"As an action, a creature within 10 ft that sees/hears me makes a Wis save or is charmed or frightened (my choice) for 10 min",
					"Ends if it takes damage or we attack it or force a save" + (n < 14 ? "" : "; Terrible Delights: I can trap it in an illusory realm (concentration)"),
					"Once per short rest free, then I need to expend a Pact Magic slot"
				]);
			}),
			usages : 1,
			recovery : "short rest",
			action : [["action", ""]]
		},
		"subclassfeature6" : {
			name : "Beguiling Blast",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I deal psychic damage with Eldritch Blast, the target has disadv. on its first attack before my next turn (not if immune to charmed)")
		},
		"subclassfeature6.1" : {
			name : "Misty Escape",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As a reaction when I take damage, I turn invisible and teleport up to 60 ft (invisible until my next turn or until I attack, cast, or force a save); 1/SR, then a Pact slot"),
			usages : 1,
			recovery : "short rest",
			action : [["reaction", ""]]
		},
		"subclassfeature10" : {
			name : "Whimsical Defense",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I'm immune to charmed; a creature trying to charm me makes a Wis save or suffers Fey Presence (if it can't be charmed: psychic damage = warlock level)"),
			savetxt : { immune : ["charmed"] }
		},
		"subclassfeature14" : {
			name : "Terrible Delights",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"My warlock spells and features ignore immunity to charmed, but such creatures have adv. on saves vs. it",
				"Fey Presence can trap a failed target in an illusory realm (concentration): it sees/hears only me; repeats save when damaged; success: immune 24 h"
			])
		}
	}
});

AddSubClass("warlock(laserllama)", "darklord", {
	regExpSearch : /^(?=.*dark\s?lord)(?=.*warlock).*$/i,
	subname : "the Darklord",
	fullname : "Darklord",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLPatronSpells("Darklord Magic", ["hex", "inflict wounds", "blindness/deafness", "blur", "fear", "enemies abound", "accursed touch", "phantasmal killer", "dream", "enervation"], "My Eldritch Blast can deal necrotic damage equal to 1d10 + Pact mod"),
		"subclassfeature2.1" : {
			name : "Fell Curses",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"Taking damage can't break my concentration on Darklord Magic spells",
				"Vs. creatures under my Darklord Magic spells, I crit on 19-20; necrotic damage I deal them gives me half as temp HP (max warlock level)"
			])
		},
		"subclassfeature2.2" : {
			name : "Shadow Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I know the Armor of Shadows Invocation (no prerequisites, can't be replaced)",
				"While it's active, I add my Pact mod to Stealth checks in dim light or darkness"
			]),
			autoSelectExtrachoices : [{ extrachoice : "armor of shadows" }],
			"armor of shadows" : {
				name : "Armor of Shadows (Darklord)",
				source : [["GMB:LL", 0]],
				description : LLdesc("As an action, I don (or dismiss) shadow armor: without armor or shield, my AC is 10 + Pact mod + Dex mod (select \"Armor of Shadows\" as armor)"),
				action : [["action", "Armor of Shadows"]],
				armorOptions : [{ regExpSearch : /^(?=.*armou?r)(?=.*shadows).*$/i, name : "Armor of Shadows", source : [["GMB:LL", 0]], ac : 10, affectsWildShape : false }],
				extraAC : LLWlkPactAC("Armor of Shadows", "armou?r of shadows")
			}
		},
		"subclassfeature6" : {
			name : "Cursed Specter",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc([
					"As a reaction when a humanoid under my Darklord Magic spell dies, I capture its spirit (one at a time)",
					"As an action, I consume it to conjure a Specter (MM) within 10 ft for 1 min, using my DC and spell attack" + (n < 14 ? "" : "; or I expend a Pact slot instead"),
					"It acts on my turn and Dodges unless commanded (bonus action); it's destroyed if I fall unconscious"
				]);
			}),
			action : [["reaction", "Capture Spirit"], ["action", "Conjure Specter"], ["bonus action", "Command Specter"]]
		},
		"subclassfeature10" : {
			name : "Dread Mantle",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Damage from creatures under my Darklord Magic spells is reduced by my Pact mod (min 1); I add my Pact mod (min +1) to death saves")
		},
		"subclassfeature14" : {
			name : "Right Hand of Dread",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("When a creature under my Darklord Magic spell is slain, I can instead use my reaction to regain one Pact slot; I can expend a Pact slot for my Specter (one at a time)")
		}
	}
});

AddSubClass("warlock(laserllama)", "deep one", {
	regExpSearch : /^(?=.*deep)(?=.*warlock).*$/i,
	subname : "the Deep One",
	fullname : "Deep One",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLPatronSpells("Deep Magic", ["create water", "torrent", "aura of frost", "gust of wind", "tidal wave", "sleet storm", "control water", "eldritch tentacles", "cone of cold", "maelstrom"], "My Eldritch Blast can deal cold damage equal to 1d10 + Pact mod"),
		"subclassfeature2.1" : {
			name : "Grasp of the Deep",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"When I deal cold damage to a " + (n < 10 ? "Large" : "Huge") + " or smaller creature, a tendril grapples it for 1 min (action: Str check vs. my DC to end)",
					n < 10 ? "When out of uses, I can expend a Pact slot" : "It takes 2d8 cold damage when it starts its turn grappled; when out of uses, a Pact slot"
				]);
			}),
			usages : "Pact mod per ",
			usagescalc : "event.value = Math.max(1, Number(What(AbilityScores.abbreviations[LLWlkAbi() - 1] + ' Mod')));",
			recovery : "long rest"
		},
		"subclassfeature2.2" : {
			name : "Scion of the Deep",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("I resist cold damage, have a 30 ft swimming speed, breathe air and water, and understand/am understood by creatures underwater"),
			dmgres : ["Cold"],
			speed : { swim : { spd : 30, enc : 20 } }
		},
		"subclassfeature6" : {
			name : "Oceanic Grasp",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("If I deal cold damage with Eldritch Blast to a creature twice or more in a turn, I can use Grasp of the Deep without expending a use")
		},
		"subclassfeature10" : {
			name : "Greater Tendrils & Thalassic Mind",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Grasp of the Deep works on Huge creatures and deals 2d8 cold at the start of their turns; damage can't break my concentration on Deep Magic spells")
		},
		"subclassfeature14" : {
			name : "Unleash the Depths",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"As an action, I conjure up to five tendrils within 30 ft; each forces one creature within 10 ft of it to make a Dex save",
				"Fail: 2d8 cold damage and restrained by the tendril; success: half damage; 1/LR, then a Pact slot"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		}
	}
});

AddSubClass("warlock(laserllama)", "exalted", {
	regExpSearch : /^(?=.*(exalted|celestial))(?=.*warlock).*$/i,
	subname : "the Exalted",
	fullname : "Exalted",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : {
			name : "Celestial Light",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc("When I fire an Eldritch Blast beam, I can instead heal a creature I see in range for 1d10 HP" + (n < 6 ? "" : " (up to Pact mod uses at once, 1d10 each); bonus action: a Pact slot regains uses = Slot Level"));
			}),
			usages : levels.map(function (n) { return 1 + n; }),
			recovery : "long rest",
			action : [["bonus action", "Pact slot to Celestial Light"]]
		},
		"subclassfeature2.1" : LLPatronSpells("Exalted Magic", ["cure wounds", "guiding bolt", "flaming sphere", "restoration", "daylight", "revivify", "guardian of faith", "wall of fire", "conjure celestial", "flame strike"], "My Eldritch Blast can deal radiant damage equal to 1d10 + Pact mod"),
		"subclassfeature6" : {
			name : "Radiant Conduit",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I resist radiant damage; Celestial Light can spend up to Pact mod uses at once; bonus action: a Pact slot restores uses = Slot Level"),
			dmgres : ["Radiant"]
		},
		"subclassfeature10" : {
			name : "Celestial Fortitude",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("After a short or long rest, I gain warlock level + Pact mod temp HP; up to five who rested with me gain half warlock level + Pact mod")
		},
		"subclassfeature14" : {
			name : "Blinding Defiance",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"When I make a death save, I can return with half my HP max and stand up; chosen creatures within 30 ft make a Con save",
				"Fail: 8d6 radiant and blinded until the end of my turn; success: half damage; 1/LR, then a Pact slot"
			]),
			usages : 1,
			recovery : "long rest"
		}
	}
});

AddSubClass("warlock(laserllama)", "fiend", {
	regExpSearch : /^(?=.*fiend)(?=.*warlock).*$/i,
	subname : "the Fiend",
	fullname : "Fiend",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLPatronSpells("Fiendish Magic", ["command", "hellish rebuke", "blindness/deafness", "flame whip", "bestow curse", "fireball", "blight", "wall of fire", "cloudkill", "immolation"], "My Eldritch Blast can deal fire damage equal to 1d10 + Pact mod, ignoring fire resistance"),
		"subclassfeature2.1" : {
			name : "Dark Vitality",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("When I kill a hostile creature, or as a reaction when one within 10 ft drops to 0 HP, I gain warlock level + Pact mod temp HP"),
			action : [["reaction", ""]]
		},
		"subclassfeature6" : {
			name : "Accursed Flames",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("A creature I deal fire damage to can't regain HP or gain temp HP until the start of my next turn")
		},
		"subclassfeature6.1" : {
			name : "Dark Bargain",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I fail a check or save, I can add 1d10, reducing my HP max by the same amount until my next long rest")
		},
		"subclassfeature10" : {
			name : "Fiendish Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("After a short or long rest, I choose a damage type to resist until my next rest (not from magical or silvered weapons)")
		},
		"subclassfeature14" : {
			name : "Hurl Into Hell",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("When I damage a creature with Eldritch Blast, I send it to my Patron's realm until the end of my next turn; non-fiends take 6d10 psychic on return"),
			usages : 1,
			recovery : "short rest"
		}
	}
});

AddSubClass("warlock(laserllama)", "great old one", {
	regExpSearch : /^(?=.*(great old one|old one|tentacle|aberra))(?=.*warlock).*$/i,
	subname : "the Great Old One",
	fullname : "Great Old One",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLPatronSpells("Aberrant Magic", ["arms of hadar", "dissonant whispers", "detect thoughts", "mind whip", "clairvoyance", "hunger of hadar", "confusion", "eldritch tentacles", "modify memory", "telekinesis"], "Instead of an Eldritch Blast beam's attack, a creature in range can make an Int save or take 1d10 + Pact mod psychic"),
		"subclassfeature2.1" : {
			name : "Awakened Mind",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("I can telepathically speak with one creature I see within 60 ft (it needs a language to reply); I resist psychic damage"),
			dmgres : ["Psychic"]
		},
		"subclassfeature6" : {
			name : "Mental Lance",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("Once per turn, when I deal psychic damage with Eldritch Blast, the target can't take reactions until the start of my next turn")
		},
		"subclassfeature6.1" : {
			name : "Psionic Ward",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As a reaction when a creature I see attacks me, I impose disadv.; if it misses, it makes an Int save vs. one Eldritch Blast beam"),
			usages : "Pact mod per ",
			usagescalc : "event.value = Math.max(1, Number(What(AbilityScores.abbreviations[LLWlkAbi() - 1] + ' Mod')));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature10" : {
			name : "Thought Shield",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("My thoughts can't be read unless I allow it; when I succeed on an Int or Wis save, I can deal psychic damage = warlock level to its source")
		},
		"subclassfeature14" : {
			name : "Create Thrall",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As an action, I touch an incapacitated humanoid: it's charmed by me and obeys my telepathic commands (same plane) until it dies or remove curse; one at a time"),
			action : [["action", ""]]
		}
	}
});

LLGenies = {
	"Dao" : ["Earth", "Bludgeoning", ["sanctuary", "spike growth", "meld into stone", "pillars of earth", "wall of stone"]],
	"Djinn" : ["Air", "Thunder", ["thunderwave", "gust of wind", "gaseous form", "greater invisibility", "seeming"]],
	"Efreeti" : ["Fire", "Fire", ["burning hands", "flaming sphere", "minute meteors", "fire shield", "flame strike"]],
	"Marid" : ["Water", "Cold", ["torrent", "misty step", "tidal wave", "watery sphere", "cone of cold"]]
};
AddSubClass("warlock(laserllama)", "noble genie", {
	regExpSearch : /^(?=.*genie)(?=.*warlock).*$/i,
	subname : "the Noble Genie",
	fullname : "Noble Genie",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : {
			name : "Magic Vessel",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"I have a Tiny Vessel (HP " + (2 * n) + ", AC = my spell DC) that can be an Invocation Trinket; it returns after a long rest if lost",
					"Inside is a 20-ft cube space: action: store a Medium or smaller object; action: enter it for up to " + Math.floor(n / 2) + " hours (action to exit)" + (n < 10 ? "" : "; Mystical Sanctuary: bring 5 creatures (1 h), 10-min short rests")
				]);
			}),
			action : [["action", "Vessel: store/enter"]]
		},
		"subclassfeature2.1" : (function () {
			var oFea = {
				name : "Noble Magic",
				source : [["GMB:LL", 0]],
				minlevel : 2,
				description : LLdesc([
					"Choose my Noble Genie with \"Choose Feature\"; my Eldritch Blast can deal its element's damage (1d10 + Pact mod)",
					"I learn the Noble Genie spells (sleep, enlarge/reduce, fly, polymorph, arcane hand) and my genie's spells"
				]),
				choices : []
			};
			for (var sG in LLGenies) {
				var a = LLGenies[sG];
				oFea.choices.push(sG + " (" + a[0] + ")");
				oFea[(sG + " (" + a[0] + ")").toLowerCase()] = {
					name : "Noble Magic: " + sG,
					description : LLdesc([
						"My Noble Genie is a " + sG + "; my Eldritch Blast can deal " + a[1].toLowerCase() + " damage (1d10 + Pact mod)",
						"Genie spells: " + a[2].join(", ")
					]),
					spellcastingExtra : LLSpellList(["sleep", "enlarge/reduce", "fly", "polymorph", "arcane hand"].concat(a[2])),
					spellcastingExtraApplyNonconform : true
				};
			}
			return oFea;
		})(),
		"subclassfeature6" : {
			name : "Ethereal Nature",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I resist my genie's element damage; once per turn when my Eldritch Blast deals it, the target makes a Cha save or swaps places with me"),
			choices : ["Bludgeoning (Dao)", "Thunder (Djinn)", "Fire (Efreeti)", "Cold (Marid)"],
			"bludgeoning (dao)" : { name : "Ethereal Nature (Bludgeoning)", description : LLdesc("I resist bludgeoning damage; once per turn when my Eldritch Blast deals it, the target makes a Cha save or swaps places with me"), dmgres : ["Bludgeoning"] },
			"thunder (djinn)" : { name : "Ethereal Nature (Thunder)", description : LLdesc("I resist thunder damage; once per turn when my Eldritch Blast deals it, the target makes a Cha save or swaps places with me"), dmgres : ["Thunder"] },
			"fire (efreeti)" : { name : "Ethereal Nature (Fire)", description : LLdesc("I resist fire damage; once per turn when my Eldritch Blast deals it, the target makes a Cha save or swaps places with me"), dmgres : ["Fire"] },
			"cold (marid)" : { name : "Ethereal Nature (Cold)", description : LLdesc("I resist cold damage; once per turn when my Eldritch Blast deals it, the target makes a Cha save or swaps places with me"), dmgres : ["Cold"] }
		},
		"subclassfeature10" : {
			name : "Mystical Sanctuary",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Up to five willing creatures within 30 ft can enter my Vessel with me (1 hour max; out if I leave or eject them); short rests inside take 10 minutes")
		},
		"subclassfeature14" : {
			name : "Limited Wish",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As an action, I cast any 6th-level or lower spell (1 action or bonus action) from any list; my Vessel replaces components; then I need 3 long rests"),
			usages : 1,
			recovery : "3 LR",
			action : [["action", ""]]
		}
	}
});

AddSubClass("warlock(laserllama)", "undying", {
	regExpSearch : /^(?=.*undying)(?=.*warlock).*$/i,
	subname : "the Undying",
	fullname : "Undying",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLPatronSpells("Undying Magic", ["cause fear", "ray of sickness", "blindness/deafness", "ray of enfeeblement", "fear", "phantom steed", "blight", "death ward", "antilife shell", "contagion"], "My Eldritch Blast can deal necrotic damage equal to 1d10 + Pact mod"),
		"subclassfeature2.1" : {
			name : "Necrotic Husk",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I become a Necrotic Husk for 1 min (end as a bonus action): warlock level + Pact mod (min 1) temp HP, immune to frightened",
					"Once per turn when I hit a creature, it makes a Wis save or is frightened of me until my next turn" + (n < 6 ? "" : " (disadv. within 30 ft)"),
					(n < 10 ? "" : "In Husk: immune to necrotic, resist nonmagical non-silvered B/P/S; ") + "1/SR free, then a Pact slot"
				]);
			}),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", ""]]
		},
		"subclassfeature2.2" : {
			name : "Touch of the Grave",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("I don't need to eat, drink, or breathe; undead of CR \u2264 my warlock level aren't hostile to me until I am hostile")
		},
		"subclassfeature6" : {
			name : "Lifedrinker",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("Once per turn when I deal necrotic damage to a non-construct, non-undead, I gain half as temp HP (max warlock level; in Husk adds up to its max)")
		},
		"subclassfeature6.1" : {
			name : "Unsettling Visage",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("In Necrotic Husk, creatures within 30 ft that see me have disadv. on saves I force vs. frightened")
		},
		"subclassfeature10" : {
			name : "Unnatural Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I resist necrotic damage; in Necrotic Husk, I'm immune to necrotic and resist nonmagical non-silvered B/P/S damage"),
			dmgres : ["Necrotic"]
		},
		"subclassfeature14" : {
			name : "Unending Life",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"Once per long rest, when reduced to 0 HP but not killed outright, I instead gain HP equal to my level",
				"If I start my turn below half HP (but at least 1), I regain Pact mod (min 1) HP"
			]),
			usages : 1,
			recovery : "long rest"
		}
	}
});

AddSubClass("warlock(laserllama)", "wyrm", {
	regExpSearch : /^(?=.*(wyrm|dragon))(?=.*warlock).*$/i,
	subname : "the Wyrm",
	fullname : "Wyrm",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : {
			name : "Draconic Spark",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"Choose my Draconic Spark type with \"Choose Feature\"; I resist it and can change the damage of my warlock spells to it",
				"I know Draconic and gain the Beguiling Influence Invocation (or another if known; can't be replaced)"
			]),
			languageProfs : ["Draconic"],
			skillstxt : "Beguiling Influence: choose one from Deception, Insight, Intimidation, or Persuasion",
			choices : ["Acid", "Cold", "Fire", "Lightning", "Poison"],
			"acid" : { name : "Draconic Spark: Acid", description : LLdesc("My Draconic Spark is acid: I resist it and can change my warlock spells' damage to acid"), dmgres : ["Acid"] },
			"cold" : { name : "Draconic Spark: Cold", description : LLdesc("My Draconic Spark is cold: I resist it and can change my warlock spells' damage to cold"), dmgres : ["Cold"] },
			"fire" : { name : "Draconic Spark: Fire", description : LLdesc("My Draconic Spark is fire: I resist it and can change my warlock spells' damage to fire"), dmgres : ["Fire"] },
			"lightning" : { name : "Draconic Spark: Lightning", description : LLdesc("My Draconic Spark is lightning: I resist it and can change my warlock spells' damage to lightning"), dmgres : ["Lightning"] },
			"poison" : { name : "Draconic Spark: Poison", description : LLdesc("My Draconic Spark is poison: I resist it and can change my warlock spells' damage to poison"), dmgres : ["Poison"] }
		},
		"subclassfeature2.1" : LLPatronSpells("Wyrm Magic", ["command", "burning hands", "dragon's breath", "scorching ray", "fear", "fireball", "dominate creature", "wall of fire", "conjure dragon", "legend lore"], "My Eldritch Blast can deal my Draconic Spark damage equal to 1d10 + Pact mod"),
		"subclassfeature6" : {
			name : "Draconic Blast",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"I can produce Eldritch Blast and Draconic Spark warlock spells from my mouth without a Trinket or focus",
				"My Draconic Spark damage ignores resistance, treats immunity as resistance, and treats 1-2 on its dice as 3"
			])
		},
		"subclassfeature10" : {
			name : "Regal Presence",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I'm immune to charmed and frightened; I can cast conjure dragon without its material component (Essence = my Spark)"),
			savetxt : { immune : ["charmed", "frightened"] }
		},
		"subclassfeature14" : {
			name : "Dragon Wings",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As a bonus action, I manifest (or retract) draconic wings for a flying speed equal to my walking speed (destroys unsuitable armor/clothing)"),
			action : [["bonus action", ""]]
		},
		"subclassfeature14.1" : {
			name : "Ancient Blast",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"As an action, I exhale a 25-ft cone or 50-ft line: Dex save or 6d10 Draconic Spark damage and my blast's non-damage effects",
				"Success: half damage, no effects; 1/LR, then a Pact slot"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		}
	}
});

// ======================================================================
// LaserLlama - Alternate Warlock Expanded v3.2.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" and "LaserLlama - Alternate Warlock v3.2.0.js" (import them first).

	-INFORMATION-
	Subject:	Expansion, "Alternate Warlock Expanded"
	Effect:		This script adds 3 feats and 9 Otherworldly Patrons for the Alternate Warlock.
				Its 5 Pact Foci, 8 Eldritch Familiars, Eldritch Invocations, and Elder Arcana are in the Common Attributes file.
				Alternate Warlock Expanded v3.2.0 by Laserllama (GM Binder, Fan Content policy; updated 2026/10/31)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/11/02)
*/


if (!ClassList["warlock(laserllama)"] || typeof LLWlkOptions !== "function") {
	throw new Error("Please import the 'LaserLlama - Alternate Warlock v3.2.0.js' file before importing this file.");
}

// ======================= ELDRITCH FEATS =======================
FeatsList["alternate eldritch adept (laserllama)"] = {
	name : "Alternate Eldritch Adept",
	source : [["GMB:LL", 0]],
	descriptionFull : "You have unlocked a fragment of occult lore, known as an Eldritch Invocation, bound within a Trinket you must carry (it reforms at the end of a short or long rest if lost). You learn one Eldritch Invocation of the Alternate Warlock; a Warlock level prerequisite uses your total level. Use your spellcasting ability as Pact Ability (or choose Intelligence, Wisdom, or Charisma). Spells learned this way count as known/prepared without counting against the total, and can be cast with your other spellcasting methods.",
	description : "I learn one Alternate Warlock Eldritch Invocation (see Notes), bound to a Trinket I must carry; level prerequisites use my total level. My Pact Ability is my spellcasting ability (or Int, Wis, or Cha). Its spells don't count against my spells known/prepared.",
	toNotesPage : [{
		name : "Alternate Eldritch Adept: Invocations",
		note : LLdesc(ClassList["warlock(laserllama)"].features["eldritch invocations"].extrachoices)
	}]
};
FeatsList["greater familiar (laserllama)"] = {
	name : "Greater Familiar",
	source : [["GMB:LL", 0]],
	prerequisite : "4th level, the conjure familiar spell",
	prereqeval : function (v) { return Number(What("Character Level")) >= 4; },
	descriptionFull : "Choose one Eldritch Familiar of the Alternate Warlock. When you cast conjure familiar, your familiar can take that form. It obeys you, shares your initiative and acts on your turn, but only Dodges unless you use a bonus action to command it. Its stat block uses your PB, your total level for Warlock level, and your spellcasting ability (or Int, Wis, or Cha) for its Spell save DC and attack modifier.",
	description : "When I cast conjure familiar, it can take the form of one Alternate Warlock Eldritch Familiar (\"(LL)\" familiars on the Companion page). It acts on my turn and Dodges unless I command it (bonus action). Its Warlock level = my total level; it uses my spellcasting ability.",
	action : [["bonus action", "Command Familiar"]]
};
var LLPlanarScion = [
	["Astral", "rope trick", ["Abjur", "Div"]],
	["Elemental", "elemental blade", ["Conj", "Evoc"]],
	["Ethereal", "blur", ["Div", "Illus"]],
	["Far Realm", "detect thoughts", ["Ench", "Conj"]],
	["Feywild", "misty step", ["Ench", "Trans"]],
	["Outer (Chaos)", "alter self", ["Evoc", "Trans"]],
	["Outer (Evil)", "suggestion", ["Ench", "Necro"]],
	["Outer (Good)", "restoration", ["Abjur", "Evoc"]],
	["Outer (Law)", "warding bond", ["Abjur", "Div"]],
	["Shadowfell", "invisibility", ["Illus", "Necro"]]
];
FeatsList["planar scion (laserllama)"] = {
	name : "Planar Scion",
	source : [["GMB:LL", 0]],
	prerequisite : "Approval of your DM",
	descriptionFull : "You have been touched by the magic of one of the outer Planes. Choose a Plane: increase your Intelligence, Wisdom, or Charisma by 1 (max 20); learn its Infused Spell and one 1st-level spell from one of its Infused Schools. Use your spellcasting ability (or Int, Wis, or Cha) for them. Once per long rest you can cast one of these spells without a spell slot; you can also cast them with your other spellcasting methods.",
	description : "Choose a Plane with the \"Choose Feat\" button. I learn its Infused Spell and a 1st-level spell of one of its schools; once per long rest, I can cast one of them without a slot. [+1 Intelligence, Wisdom, or Charisma]",
	scorestxt : "+1 Intelligence, Wisdom, or Charisma",
	usages : 1,
	recovery : "long rest",
	choices : []
};
(function () {
	var oFeat = FeatsList["planar scion (laserllama)"];
	var oSch = { Abjur : "Abjuration", Conj : "Conjuration", Div : "Divination", Ench : "Enchantment", Evoc : "Evocation", Illus : "Illusion", Necro : "Necromancy", Trans : "Transmutation" };
	for (var i = 0; i < LLPlanarScion.length; i++) {
		var a = LLPlanarScion[i];
		oFeat.choices.push(a[0]);
		oFeat[a[0].toLowerCase()] = {
			name : "Planar Scion (" + a[0] + ")",
			description : "I learn " + a[1] + " and a 1st-level " + oSch[a[2][0]] + " or " + oSch[a[2][1]] + " spell; once per long rest, I can cast one of them without a slot. [+1 Intelligence, Wisdom, or Charisma]",
			scorestxt : "+1 Intelligence, Wisdom, or Charisma",
			spellcastingBonus : [{
				name : "Infused Spell",
				spells : LLSpellList([a[1]]),
				selection : LLSpellList([a[1]]),
				firstCol : "oncelr"
			}, {
				name : "Infused School",
				"class" : "any",
				school : a[2],
				level : [1, 1],
				firstCol : "oncelr"
			}]
		};
	}
})();

// ======================= OTHERWORLDLY PATRONS =======================

AddSubClass("warlock(laserllama)", "archmage", {
	regExpSearch : /^(?=.*archmage)(?=.*warlock).*$/i,
	subname : "the Archmage",
	fullname : "Archmage",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLPatronSpells("Archmage Magic", ["magic missile", "shield", "magic weapon", "rope trick", "counterspell", "lightning bolt", "arcane eye", "resilient sphere", "arcane hand", "wall of force"], "My Eldritch Blast can deal the damage type of one warlock spell I know, equal to 1d10 + Pact mod"),
		"subclassfeature2.1" : {
			name : "Arcane Apprentice",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I gain Arcana proficiency and learn a wizard cantrip (warlock spell for me)",
				"During a long rest, a 1-hour ritual replaces my blast's damage type, an Archmage Magic spell (same-level wizard spell), or this cantrip"
			]),
			skills : ["Arcana"],
			spellcastingBonus : [{ name : "Arcane Apprentice", "class" : "wizard", level : [0, 0] }]
		},
		"subclassfeature6" : {
			name : "Astral Slip",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As a reaction when I take damage from a source I see, I take no damage and teleport to a space I see within 30 ft; 1/SR, then a Pact slot"),
			usages : 1,
			recovery : "short rest",
			action : [["reaction", ""]]
		},
		"subclassfeature6.1" : {
			name : "Destabilizing Blast",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("A creature concentrating on a spell has disadvantage on its concentration save vs. my Eldritch Blast damage")
		},
		"subclassfeature10" : {
			name : "Spell Ward",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I resist force damage; when I save vs. a spell, I can use my Pact ability for the save"),
			dmgres : ["Force"],
			usages : "Pact mod per ",
			usagescalc : LLWlkPactUses,
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Otherworldly Prison",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"On an Eldritch Blast hit, I can forgo damage: Cha save or it's shunted to a demiplane, incapacitated, for 1 min (concentration)",
				"When it returns, it makes another Cha save: 5d10 force damage, half on a success; 1/LR, then a Pact slot"
			]),
			usages : 1,
			recovery : "long rest"
		}
	}
});

AddSubClass("warlock(laserllama)", "collective", {
	regExpSearch : /^(?=.*collective)(?=.*warlock).*$/i,
	subname : "the Collective",
	fullname : "Collective",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : {
			name : "Many Magicks",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"During each long rest, I choose cold, fire, lightning, or poison: my Eldritch Blast can deal it, equal to 1d10 + Pact mod",
				"Instead of fixed Patron Spells, I choose two warlock spells (up to my Slot Level) at 2nd, 3rd, 5th, 7th, and 9th level"
			]),
			spellcastingBonus : [
				{ name : "Many Magicks (2nd)", "class" : "warlock(laserllama)", level : [1, 1], times : levels.map(function (n) { return n < 2 ? 0 : 2; }) },
				{ name : "Many Magicks (3rd)", "class" : "warlock(laserllama)", level : [1, 2], times : levels.map(function (n) { return n < 3 ? 0 : 2; }) },
				{ name : "Many Magicks (5th)", "class" : "warlock(laserllama)", level : [1, 3], times : levels.map(function (n) { return n < 5 ? 0 : 2; }) },
				{ name : "Many Magicks (7th)", "class" : "warlock(laserllama)", level : [1, 4], times : levels.map(function (n) { return n < 7 ? 0 : 2; }) },
				{ name : "Many Magicks (9th)", "class" : "warlock(laserllama)", level : [1, 5], times : levels.map(function (n) { return n < 9 ? 0 : 2; }) }
			]
		},
		"subclassfeature2.1" : {
			name : "Collective Knowledge",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"I gain proficiency in Arcana, History, Nature, or Religion, or learn one language",
					"During a " + (n < 6 ? "long" : "short or long") + " rest, a 1-hour ritual swaps it for another option, or instead replaces one Invocation"
				]);
			}),
			skillstxt : "Choose one from Arcana, History, Nature, or Religion (or one language)"
		},
		"subclassfeature6" : {
			name : "Alter Pact",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As an action, I expend a Pact slot to change my Collective Knowledge or replace an Invocation; I can do the Collective Knowledge ritual in a short rest"),
			action : [["action", ""]]
		},
		"subclassfeature6.1" : {
			name : "Pact Bind",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("Once per turn, Many Magicks Eldritch Blast damage adds until my next turn: cold: half speed; fire: +1d10; lightning: no reactions; poison: poisoned")
		},
		"subclassfeature10" : {
			name : "Shatter-Pact Shield",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("As a reaction when I take damage, I destroy a Trinket to halve it; I lose that Invocation until the end of my next long rest"),
			action : [["reaction", ""]]
		},
		"subclassfeature14" : {
			name : "Master of Many Pacts",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As a bonus action: swap Collective Knowledge, an Invocation (not one I sacrificed), my Many Magicks type, or a warlock spell (same level)"),
			usages : "Pact mod per ",
			usagescalc : LLWlkPactUses,
			recovery : "long rest",
			additional : "regain 1 on a short rest",
			action : [["bonus action", ""]]
		}
	}
});

AddSubClass("warlock(laserllama)", "coven", {
	regExpSearch : /^(?=.*coven)(?=.*warlock).*$/i,
	subname : "the Coven",
	fullname : "Coven",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLPatronSpells("Coven Magic", ["inflict wounds", "ray of sickness", "alter self", "enhance ability", "bestow curse", "nondetection", "dominate creature", "polymorph", "insect plague", "skill empowerment"], "My Eldritch Blast can deal poison damage equal to 1d10 + Pact mod; targets can't regain HP until my next turn"),
		"subclassfeature2.1" : {
			name : "Weird Magicks",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("When I cast a warlock spell or Eldritch Blast, I can change its damage to the damage type of a warlock spell I know (this casting only)")
		},
		"subclassfeature6" : {
			name : "Crooked Blast",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("My poison Eldritch Blast ignores half cover and treats three-quarters cover as half cover")
		},
		"subclassfeature6.1" : {
			name : "Eldritch Gift",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("After a short rest, I can forgo regaining a Pact slot: a creature with Spellcasting that rested with me regains slots totaling my Slot Level")
		},
		"subclassfeature10" : {
			name : "Vile Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("As a reaction when damaged by a spell or magical effect, I gain resistance to one of its damage types until my next long rest (replacing the previous)"),
			action : [["reaction", ""]]
		},
		"subclassfeature14" : {
			name : "Shared Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("During a long rest, a 1-hour ritual forms a Coven with up to two willing casters: within 30 ft, we can cast each other's spells (own slots) and sense each other")
		}
	}
});

AddSubClass("warlock(laserllama)", "elder sphinx", {
	regExpSearch : /^(?=.*sphinx)(?=.*warlock).*$/i,
	subname : "the Elder Sphinx",
	fullname : "Elder Sphinx",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLPatronSpells("Elder Sphinx Magic", ["command", "detect evil and good", "restoration", "zone of truth", "haste", "slow", "divination", "freedom of movement", "circle of power", "dispel evil & good"], "My Eldritch Blast can deal radiant damage equal to 1d10 + Pact mod"),
		"subclassfeature2.1" : {
			name : "Divine Ward",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"As an action, I project a " + (n < 6 ? 10 : n < 10 ? 15 : n < 14 ? 20 : 30) + "-ft radius Ward around me for 1 min (concentration)",
					"A creature entering or starting its turn in it makes a Str save: failure: speed 0; success: difficult terrain (until my next turn); 1/LR, then a Pact slot"
				]);
			}),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		},
		"subclassfeature6" : {
			name : "Time Slip",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I Dash, I can stop time for others and move my speed without opportunity attacks (no other actions); 1/SR, then a Pact slot"),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature6.1" : {
			name : "Untethering Blast",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("My radiant Eldritch Blast gives disadv. on the target's first Str or Dex check or save before my next turn")
		},
		"subclassfeature10" : {
			name : "Eternal Guardian",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I gain the Otherworldly Nature Invocation (can't be replaced); if I already have it, I learn another Invocation instead"),
			autoSelectExtrachoices : [{ extrachoice : "otherworldly nature" }],
			"otherworldly nature" : {
				name : "Otherworldly Nature (Eternal Guardian)",
				source : [["GMB:LL", 0]],
				description : LLdesc("I don't need to eat, breathe, or sleep (long rest = 8 hours of light activity); I age 1 year per 10")
			}
		},
		"subclassfeature10.1" : {
			name : "Inscrutable",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I can be immune to divination that senses emotions or reads thoughts; Insight checks against me have disadvantage")
		},
		"subclassfeature14" : {
			name : "Power of the Ancients",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("While Divine Ward is active, as a bonus action I cast a limited time stop (7th level) affecting only things within the Ward; then the Ward ends"),
			usages : 1,
			recovery : "long rest",
			action : [["bonus action", ""]]
		}
	}
});

AddSubClass("warlock(laserllama)", "mummy lord", {
	regExpSearch : /^(?=.*mummy)(?=.*warlock).*$/i,
	subname : "the Mummy Lord",
	fullname : "Mummy Lord",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLPatronSpells("Mummy Lord Magic", ["guiding bolt", "ghastly flight", "dust devil", "earthen grasp", "animate dead", "wall of sand", "accursed touch", "pillars of earth", "insect plague", "spiritual sundering"], "My Eldritch Blast can deal magical slashing damage equal to 1d10 + Pact mod"),
		"subclassfeature2.1" : {
			name : "Dead Knowledge",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("I gain proficiency in History or Religion; I can use my Pact ability for both, and a d20 roll of 7 or lower counts as 8"),
			skillstxt : "Choose one from History or Religion"
		},
		"subclassfeature2.2" : {
			name : "Dread Curse",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("As an action, a creature within 60 ft that hears me makes a Wis save or is blinded, deafened, and can't speak for 1 min (save each turn); then a Pact slot"),
			usages : "Pact mod per ",
			usagescalc : LLWlkPactUses,
			recovery : "long rest",
			additional : "regain 1 on a short rest",
			action : [["action", ""]]
		},
		"subclassfeature6" : {
			name : "Scouring Blast",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("My slashing Eldritch Blast gives disadv. on the first save I force the target to make before the end of my next turn")
		},
		"subclassfeature6.1" : {
			name : "Shifting Sands",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As a reaction when I take damage, I halve it and reappear in a space I see within 30 ft; then a Pact slot"),
			usages : "Pact mod per ",
			usagescalc : LLWlkPactUses,
			recovery : "long rest",
			additional : "regain 1 on a short rest",
			action : [["reaction", ""]]
		},
		"subclassfeature10" : {
			name : "Canoptic Preservation",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"During a long rest, a 1-hour ritual seals organs in Canoptic Jars (AC = my DC, HP = warlock level); each Jar beyond the first locks a Pact slot",
				"After dropping to 0 HP (even if killed), at the start of my next turn I can destroy a Jar to return with 1 HP; Jars fade after my next long rest"
			])
		},
		"subclassfeature14" : {
			name : "Ancient Blasphemies",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As an action, chosen creatures within 30 ft that hear me make a Wis save or are stunned until my next turn; 1/LR, then a Pact slot"),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		}
	}
});

AddSubClass("warlock(laserllama)", "primeval growth", {
	regExpSearch : /^(?=.*primeval)(?=.*warlock).*$/i,
	subname : "the Primeval Growth",
	fullname : "Primeval Growth",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLPatronSpells("Primeval Magic", ["goodberry", "entangle", "awaken plant", "barkskin", "grasping vine", "plant growth", "guardian of nature", "wall of thorns", "tree stride", "wrath of nature"], "My Eldritch Blast can deal poison, piercing, or slashing damage equal to 1d10 + Pact mod"),
		"subclassfeature2.1" : {
			name : "Primeval Grasp",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("I learn thorn whip (not counted); as a bonus action, I gain Pact mod (min 1) temp HP per creature restrained by my warlock spells or features"),
			spellcastingBonus : [{ name : "Primeval Grasp", spells : LLSpellList(["thorn whip"]), selection : LLSpellList(["thorn whip"]) }],
			action : [["bonus action", ""]]
		},
		"subclassfeature6" : {
			name : "Primeval Thirst",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I damage a creature with thorn whip, I gain half as temp HP; while I have these or Primeval Grasp temp HP, my AC equals my spell DC if higher")
		},
		"subclassfeature6.1" : {
			name : "Verdant Blast",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("After 2+ piercing, poison, or slashing Eldritch Blast beams hit a creature, it makes a Str save (Huge+: adv.) or is restrained until my next turn")
		},
		"subclassfeature10" : {
			name : "Arboreal Guardian",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I resist nonmagical bludgeoning, piercing, and slashing damage; I don't need food or drink if I spend 1 hour in sunlight each day"),
			dmgres : [["Bludgeoning", "Bludg. (nonmagical)"], ["Piercing", "Pierc. (nonmagical)"], ["Slashing", "Slash. (nonmagical)"]]
		},
		"subclassfeature14" : {
			name : "Wrath of the Forest",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As an action, chosen creatures touching the ground within 30 ft make a Str save (Huge+: adv.) or are restrained 1 min (action: Str check vs. my DC); concentration, my speed is 0"),
			action : [["action", ""]]
		}
	}
});

AddSubClass("warlock(laserllama)", "titan", {
	regExpSearch : /^(?=.*titan)(?=.*warlock).*$/i,
	subname : "the Titan",
	fullname : "Titan",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLPatronSpells("Titan Magic", ["catapult", "earth tremor", "enlarge/reduce", "spike growth", "erupting earth", "protection from energy", "pillars of earth", "stone shape", "conjure giant", "wall of stone"], "My Eldritch Blast can deal thunder damage equal to 1d10 + Pact mod (enlarge/reduce: enlarge only)"),
		"subclassfeature2.1" : {
			name : "Colossal Form",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action for 1 min: warlock level temp HP, " + (n < 14 ? "one size larger" : "one or two sizes larger") + ", +Pact mod to Str checks and saves" + (n < 10 ? "" : ", +Pact mod to Con checks/saves, resist nonmagical B/P/S"),
					"Smaller creatures have disadv. on saves vs. my Titan spells and features; 1/SR, then a Pact slot"
				]);
			}),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", ""]]
		},
		"subclassfeature2.2" : {
			name : "Elder Soul",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("My HP maximum increases by my warlock level; I learn Primordial or Giant and double my Prof Bonus on checks to interact with elementals and giants"),
			languageProfs : [["Primordial or Giant", 1]],
			calcChanges : {
				hp : function (totalHD) {
					if (classes.known["warlock(laserllama)"]) return [classes.known["warlock(laserllama)"].level, "Elder Soul (warlock level)"];
				}
			}
		},
		"subclassfeature6" : {
			name : "Mighty Blast",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("If I deal thunder damage to a creature two or more times in one turn with Eldritch Blast, it makes a Str save or is knocked prone")
		},
		"subclassfeature6.1" : {
			name : "Titanic Endurance",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc([
					"As a reaction when I take damage, I expend dice from my pool to reduce it by the total + my Pact mod" + (n < 14 ? "" : " (in Colossal Form: no reaction needed, regain 1 die each turn)"),
					"I regain Pact mod (min 1) dice on a short rest and all on a long rest"
				]);
			}),
			usages : levels.map(function (n) { return n < 6 ? "" : (n + 1) + "d8 per "; }),
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature10" : {
			name : "Stalwart Blood",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("In Colossal Form, I add my Pact mod to Constitution checks and saves and resist nonmagical bludgeoning, piercing, and slashing damage")
		},
		"subclassfeature14" : {
			name : "Legendary Behemoth",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Colossal Form can grow up to two sizes; in it, Titanic Endurance needs no reaction and I regain one die at the start of each of my turns")
		}
	}
});

AddSubClass("warlock(laserllama)", "unblinking", {
	regExpSearch : /^(?=.*(unblinking|beholder))(?=.*warlock).*$/i,
	subname : "the Unblinking",
	fullname : "Unblinking",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLPatronSpells("Unblinking Magic", ["chaos bolt", "ray of sickness", "arcane scorcher", "levitate", "clairvoyance", "minute meteors", "arcane eye", "dominate creature", "cone of cold", "telekinesis"], "My Unblinking Eye changes my blast's damage type (see Unblinking Eye)"),
		"subclassfeature2.1" : {
			name : "Unblinking Eye",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I gain Perception proficiency and use my Pact ability for it; my Eye can produce Eldritch Blast and focus spell-attack warlock spells",
				"Then roll a d10 for the damage type: 1 acid, 2 cold, 3 fire, 4 lightning, 5 poison, 6 psychic, 7 thunder, 8 bludgeoning, 9 necrotic, 10 force"
			]),
			skills : ["Perception"]
		},
		"subclassfeature6" : {
			name : "Occular Ray",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc([
					"Once per turn on an Eye blast hit, Con save" + (n < 10 ? "" : " (disadv. if hit by 2+ beams)") + " or until my next turn: acid frightened, cold speed 0, fire charmed,",
					"lightning no reactions and action or bonus action only, poison poisoned, psychic unconscious, thunder pushed 30 ft,",
					"bludgeoning petrified, necrotic +2d10 necrotic, force roll twice and choose"
				]);
			})
		},
		"subclassfeature10" : {
			name : "Unsleeping Awareness",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I can't be surprised, even if incapacitated or asleep; a creature hit by 2+ Occular Ray beams has disadv. on its save")
		},
		"subclassfeature14" : {
			name : "Eye Tyrant",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Once per long rest, as an action, my Eye emanates a 30-ft cone of antimagic field for 1 min (redirect each turn; ends if I'm incapacitated)"),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		}
	}
});

AddSubClass("warlock(laserllama)", "wild hunt", {
	regExpSearch : /^(?=.*wild)(?=.*hunt)(?=.*warlock).*$/i,
	subname : "the Wild Hunt",
	fullname : "Wild Hunt",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature2" : LLPatronSpells("Wild Hunt Magic", ["hail of thorns", "wrathful smite", "find steed", "locate creature", "conjure volley", "haste", "freedom of movement", "staggering smite", "banishing smite", "far step"], "My Eldritch Blast can deal piercing or psychic damage equal to 1d10 + Pact mod"),
		"subclassfeature2.1" : {
			name : "Spirit of the Hunt",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"When I damage a creature, I can mark it" + (n < 14 ? "" : " (up to Pact mod willing allies within 30 ft also crit on 19-20 vs. it)") + "; until a new mark, it dies, or I'm incapacitated:",
					"My weapon and spell attacks vs. it crit on 19-20; on a hit, I can expend a Pact slot for +1d10 + 1d10 per Slot Level psychic",
					"I add my warlock level to checks to track it"
				]);
			}),
			usages : "Pact mod per ",
			usagescalc : LLWlkPactUses,
			recovery : "long rest",
			additional : "regain 1 on a short rest"
		},
		"subclassfeature2.2" : {
			name : "Wild Huntsman",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("I gain Survival proficiency and use my Pact ability for it; my piercing or psychic Eldritch Blast counts as a weapon attack"),
			skills : ["Survival"]
		},
		"subclassfeature6" : {
			name : "Hunter's Grasp",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc("My Eldritch Blast hits reduce speed by 10 ft until my next turn; vs. my marked target within " + (n < 14 ? 15 : 30) + " ft of me, it also has disadv. on attacks vs. others");
			})
		},
		"subclassfeature6.1" : {
			name : "Wild Madness",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc("Starting my turn within " + (n < 14 ? 15 : 30) + " ft of my marked target, I can gain adv. on attacks vs. it, but attacks vs. me have adv. until my next turn");
			})
		},
		"subclassfeature10" : {
			name : "Predatory Resolve",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("As a reaction when my marked target hits me, I add my Pact mod to my AC against that attack"),
			action : [["reaction", ""]]
		},
		"subclassfeature14" : {
			name : "Master of the Hunt",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("When I mark a creature, up to Pact mod willing creatures within 30 ft crit on 19-20 vs. it; Hunter's Grasp and Wild Madness reach 30 ft")
		}
	}
});

// ======================================================================
// LaserLlama - Alternate Wizard v1.3.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Alternate Wizard"
	Effect:		This script adds the Alternate Wizard class and its 11 Arcane Traditions.
				Alternate Wizard v1.3.0 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Wizard (LaserLlama)" in the Class field (e.g. "Evoker Wizard (LaserLlama)")
*/


if (typeof LLAddFightingStyles !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

// Keep the official Wizard from catching "Wizard (LaserLlama)" or the LaserLlama Magus
if (ClassList["wizard"]) ClassList["wizard"].regExpSearch = /^(?=.*(wizard|mage))(?!.*(wild mage|laserllama|magus)).*$/i;

var LLWizardSpells = [
	// cantrips
	"blade ward", "resistance", "create bonfire", "frostbite", "infestation", "mage hand", "guidance", "message", "true strike", "friends", "mind sliver", "acid splash", "fire bolt", "lightning lure", "ray of frost", "shocking grasp", "thunderclap", "dancing lights", "light", "minor illusion", "chill touch", "poison spray", "beckon air", "control flame", "mending", "mold earth", "prestidigitation", "shape water",
	// 1st
	"absorb elements", "alarm", "create snare", "mage armor", "protection from evil & good", "shield", "conjure familiar", "floating disk", "fog cloud", "grease", "ice knife", "unseen servant", "witch bolt", "comprehend languages", "detect magic", "identify", "magic missile", "catapult", "charm person", "hideous laughter", "sleep", "burning hands", "caustic brew", "chromatic orb", "thunderwave", "torrent", "color spray", "disguise self", "illusory script", "silent image", "cause fear", "false life", "inflict wounds", "ray of sickness", "earth tremor", "expeditious retreat", "feather fall", "jump", "longstrider",
	// 2nd
	"earthbind", "lock/unlock", "rope trick", "cloud of daggers", "continual flame", "dust devil", "flaming sphere", "misty step", "web", "augury", "darkvision", "detect thoughts", "locate creature", "locate object", "mind spike", "see invisibility", "crown of madness", "hold person", "levitate", "mind whip", "suggestion", "acid arrow", "arcane scorcher", "gust of wind", "pyrotechnics", "scorching ray", "shatter", "snowball swarm", "warding wind", "blur", "darkness", "invisibility", "magic aura", "magic mouth", "mirror image", "phantasmal force", "skywrite", "blindness/deafness", "gentle repose", "ray of enfeeblement", "shadow blade", "alter self", "animate object", "create ooze", "dragon's breath", "earthen grasp", "enhance ability", "enlarge/reduce", "magic weapon", "spider climb",
	// 3rd
	"counterspell", "dispel magic", "protection from energy", "glyph of warding", "magic circle", "remove curse", "tiny hut", "conjure elemental", "conjure fey", "conjure fiend", "sleet storm", "summon shadow", "thunder step", "wall of sand", "wall of water", "clairvoyance", "nondetection", "sending", "speak with dead", "enemies abound", "fear", "intellect fortress", "fireball", "lightning bolt", "minute meteors", "stinking cloud", "tidal wave", "feign death", "hypnotic pattern", "major image", "phantom steed", "animate dead", "bestow curse", "life transference", "vampiric touch", "blink", "elemental bane", "erupting earth", "fly", "gaseous form", "haste", "slow", "tiny servant", "water breathing",
	// 4th
	"banishment", "private sanctum", "resilient sphere", "secret chest", "stoneskin", "conjure aberration", "dimension door", "wall of fire", "wall of ice", "arcane eye", "divination", "charm monster", "confusion", "dominate creature", "fire shield", "ice storm", "sickening radiance", "storm sphere", "vitriolic sphere", "watery sphere", "faithful hound", "greater invisibility", "hallucinatory terrain", "phantasmal killer", "create undead", "blight", "accursed touch", "control water", "fabricate", "polymorph", "stone shape",
	// 5th
	"planar binding", "wall of force", "arcane hand", "conjure dragon", "conjure giant", "far step", "teleportation circle", "wall of stone", "contact other plane", "legend lore", "scrying", "telepathic bond", "geas", "hold monster", "modify memory", "synaptic static", "telekinesis", "cloudkill", "cone of cold", "dawn", "immolation", "creation", "dream", "mislead", "seeming", "enervation", "negative energy flood", "control winds", "create construct", "passwall", "skill empowerment", "transmute rock",
	// 6th
	"contingency", "globe of invulnerability", "guards and wards", "arcane gate", "astral blade", "instant summons", "scatter", "astral projection", "true seeing", "mass suggestion", "chain lightning", "disintegrate", "freezing sphere", "sunbeam", "eyebite", "mental prison", "programmed illusion", "circle of death", "magic jar", "soul cage", "create homunculus", "create monstrosity", "elemental avatar", "move earth",
	// 7th
	"magnificent mansion", "symbol", "forcecage", "plane shift", "teleport", "time stop", "power word: pain", "crown of stars", "delayed blast fireball", "prismatic spray", "create simulacrum", "mirage arcane", "project image", "finger of death", "etherealness", "reverse gravity", "sequester", "whirlwind",
	// 8th
	"antimagic field", "mind blank", "demiplane", "maze", "mighty fortress", "telepathy", "antipathy", "feeblemind", "power word: stun", "incendiary cloud", "sunburst", "illusory dragon", "maddening dark", "clone", "horrid wilting",
	// 9th
	"imprisonment", "invulnerability", "gate", "foresight", "psychic scream", "meteor swarm", "prismatic wall", "weird", "power word: kill", "shapechange", "true polymorph", "wish"
];
LLAddSpellsToClass("wizard(laserllama)", LLWizardSpells);

LLWizSchools = ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"];
LLWizScholar = function (sSchool, sTradition) {
	return {
		name : "Scholar of " + sSchool,
		source : [["GMB:LL", 0]],
		minlevel : 3,
		description : LLdesc([
			sSchool + " becomes one of my Focus Schools (if it already was, I gain another Focus School of my choice)",
			"I add two " + sSchool + " spells of 1st or 2nd level from the Wizard list to my spellbook"
		])
	};
};

// Studious Recovery: the limited feature shows the highest slot level I can recover, updated live
// (half my wizard level, but not higher than my Int mod, min 1st)
LLWizStudious = function (sUsesFld) {
	var oFld = tDoc.getField(sUsesFld.replace("Max Usages ", ""));
	if (!oFld || !classes.known["wizard(laserllama)"]) return;
	var nLvl = classes.known["wizard(laserllama)"].level;
	var nMax = Math.max(1, Math.min(Math.floor(nLvl / 2), Math.max(1, Number(What("Int Mod")))));
	var sNew = "Studious Recovery (slot \u2264 " + nMax + ["st", "nd", "rd"].concat(["th", "th", "th", "th", "th", "th"])[nMax - 1] + ")";
	if (oFld.value !== sNew && /studious recovery/i.test(oFld.value)) oFld.value = sNew;
};

ClassList["wizard(laserllama)"] = {
	name : "Wizard (LaserLlama)",
	regExpSearch : /^(?=.*wizard)(?=.*laserllama).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Intelligence",
	prereqs : "Intelligence 13",
	die : 6,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Int", "Wis"],
	abilitySave : 4,
	spellcastingFactor : 1,
	spellcastingKnown : {
		cantrips : [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
		spells : "book",
		prepared : true
	},
	spellcastingList : {
		"class" : "wizard(laserllama)"
	},
	skillstxt : {
		primary : "Choose two from Arcana, History, Insight, Investigation, Medicine, Nature, and Religion"
	},
	weaponProfs : {
		primary : [false, false, ["dagger", "quarterstaff"]]
	},
	toolProfs : {
		primary : ["Calligrapher's supplies"]
	},
	equipment : "Wizard (LaserLlama) starting equipment:" +
		"\n \u2022 A quarterstaff -or- a dagger;" +
		"\n \u2022 A component pouch -or- an arcane focus;" +
		"\n \u2022 A scholar's pack -or- an explorer's pack;" +
		"\n \u2022 A spellbook with 100 pages, a quill, and a robe." +
		"\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Arcane Tradition", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	features : {
		"arcanist" : {
			name : "Arcanist",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I gain proficiency in Arcana; if already proficient, I gain expertise in it instead"),
			skills : [["Arcana", "increment"]]
		},
		"spellcasting" : {
			name : "Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I can cast prepared wizard cantrips/spells, using Intelligence as my spellcasting ability",
				"I prepare Int mod + wizard level spells from my spellbook during a long rest (1 min per spell level)",
				"I can use an arcane focus or my spellbook as a spellcasting focus for my wizard spells",
				"I can cast wizard spells in my spellbook as rituals if they have the ritual tag, even if not prepared",
				"I can't cast wizard spells while wearing armor or wielding a shield, unless a feature says otherwise",
				"Spellbook: starts with six 1st-level spells (two from a Focus School); +2 per wizard level (one from a Focus School)",
				"Copying a found spell costs 2 hours per spell level (halved for Focus School spells)"
			]),
			additional : levels.map(function (n, idx) {
				return [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5][idx] + " cantrips known";
			})
		},
		"focus schools" : {
			name : "Focus Schools",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I choose a Focus School, plus one more at 10th and 18th level; use the \"Choose Feature\" button",
				"Instead of a new Focus School, I can add three Focus School wizard spells to my spellbook",
				"One of my starting cantrips must be from a Focus School"
			]),
			additional : levels.map(function (n) { return (n < 10 ? 1 : n < 18 ? 2 : 3) + " Focus School" + (n < 10 ? "" : "s"); }),
			extraname : "Focus School",
			extrachoices : LLWizSchools.slice(),
			extraTimes : levels.map(function (n) { return n < 10 ? 1 : n < 18 ? 2 : 3; })
		},
		"studious recovery" : {
			name : "Studious Recovery",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("During a short rest, I can study my spellbook to regain one expended spell slot"),
			usages : 1,
			usagescalc : "event.value = 1; if (typeof LLWizStudious === 'function') LLWizStudious(event.target.name);",
			recovery : "short rest"
		},
		"subclassfeature3" : {
			name : "Arcane Tradition",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc('Choose the Arcane Tradition you studied and put it in the "Class" field ')
		},
		"signature spell" : {
			name : "Signature Spell",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : levels.map(function (n) {
				var a = n < 11 ? "one Signature Spell (base: 2nd-level or lower)" : n < 15 ? "two Signature Spells (bases: 2nd and 3rd-level or lower)" : "three Signature Spells (bases: 2nd, 3rd, and 5th-level or lower)";
				return LLdesc([
					"I create " + a + " from a Focus School spell in my spellbook; I can re-modify older ones at each new discovery",
					"Modifications (final level must be one I have slots for):",
					"\u2022 Casting time 1 action \u2192 1 bonus action (+1 level); remove a non-consumed, non-costly component (+1 level each)",
					"\u2022 Concentration: reaction to succeed a failed save to maintain it (+1 level)",
					"\u2022 Damage: swap one damage type for one dealt by another spell in my spellbook (+0)",
					"\u2022 Ritual: gains the ritual tag if 1 action/bonus action with no costly material (+0)",
					"\u2022 Shape: change cone/cylinder/cube/5-ft line/sphere to another of equal size (+0)"
				]);
			})
		},
		"archmage" : {
			name : "Archmage",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"Two 1st/2nd-level Focus School spells (1 action casting time) from my spellbook are always prepared",
				"I can cast them at their lowest level without expending a spell slot; swap one with 8 hours of study"
			]),
			spellcastingBonus : [{
				name : "Archmage",
				"class" : "wizard(laserllama)",
				level : [1, 2],
				times : 2,
				firstCol : "atwill",
				prepared : true
			}]
		},
		"arcane mastery" : {
			name : "Arcane Mastery",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("I'm considered to always have every spell in my spellbook prepared")
		}
	}
};
// The Focus School options
(function () {
	var oFea = ClassList["wizard(laserllama)"].features["focus schools"];
	for (var i = 0; i < LLWizSchools.length; i++) {
		oFea[LLWizSchools[i].toLowerCase()] = {
			name : "Focus School: " + LLWizSchools[i],
			description : LLdesc("Copying " + LLWizSchools[i] + " spells into a spellbook takes half the time; features referring to Focus Schools apply to them")
		};
	}
})();

// ======================= ARCANE TRADITIONS =======================

AddSubClass("wizard(laserllama)", "abjurer", {
	regExpSearch : /^(?=.*(abjurer|abjuration))(?=.*wizard).*$/i,
	subname : "Abjurer",
	fullname : "Abjurer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Arcane Ward",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"When I spend a slot on an abjuration spell, I can create a ward that lasts until my next long rest",
				"It has 2 \xD7 wizard level + Int mod HP and takes damage in my place; at 0 HP it stays, but can't absorb",
				"Abjuration spell with a slot: ward regains 2 \xD7 slot level HP; bonus action: expend a slot for the same"
			]),
			additional : levels.map(function (n) { return "Ward: " + (n * 2) + " + Int mod HP"; }),
			usages : 1,
			recovery : "long rest",
			action : [["bonus action", "Arcane Ward (recharge)"]]
		},
		"subclassfeature3.1" : LLWizScholar("Abjuration"),
		"subclassfeature6" : {
			name : "Projected Ward",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As a reaction when a creature I see within 30 ft takes damage, my Arcane Ward takes it instead"),
			action : [["reaction", ""]]
		},
		"subclassfeature10" : {
			name : "Empowered Abjuration",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"I add counterspell and dispel magic to my spellbook (or another abjuration spell for each I already had)",
				"I add my Prof Bonus to ability checks made as part of either spell",
				"My Arcane Ward has resistance to nonmagical bludgeoning, piercing, and slashing damage"
			])
		},
		"subclassfeature14" : {
			name : "Master of Abjuration",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("I have advantage on saves against spells and resistance to damage dealt by spells"),
			savetxt : { adv_vs : ["spells"] },
			dmgres : ["Spells"]
		}
	}
});

AddSubClass("wizard(laserllama)", "conjurer", {
	regExpSearch : /^(?=.*(conjurer|conjuration))(?=.*wizard).*$/i,
	subname : "Conjurer",
	fullname : "Conjurer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLWizScholar("Conjuration"),
		"subclassfeature3.1" : {
			name : "Minor Conjuration",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"As an action, I conjure a Tiny inanimate object I've seen in my hand or within 10 ft (no magic items/components)",
				"Expertise items need the matching artisan's tools; it sheds 5-ft dim light, AC = Int score, HP = wizard level",
				"It lasts 1 hour, until 0 HP, or until I conjure another; I can expend a slot for a bigger object:",
				"1st: Small, 3rd: Medium, 5th: Large, 7th: Huge, 9th: Gargantuan"
			]),
			action : [["action", ""]]
		},
		"subclassfeature6" : {
			name : "Self Transposition",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"Misty step is in my spellbook and always prepared; I can cast it once per long rest without a slot",
				"Instead of its normal effect, a creature/object of my size or smaller within 30 ft makes a Cha save (can fail willingly)",
				"On a failure, we instantly switch places"
			]),
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : [{ name : "Self Transposition", spells : ["misty step"], selection : ["misty step"], firstCol : "oncelr", prepared : true }]
		},
		"subclassfeature10" : {
			name : "Empowered Conjuration",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I summon creatures with a conjuration spell or use Minor Conjuration, one of them gains 2 \xD7 wizard level temp HP")
		},
		"subclassfeature14" : {
			name : "Master of Conjuration",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Taking damage can't break my concentration on conjuration spells that summon or conjure creatures")
		}
	}
});

AddSubClass("wizard(laserllama)", "diviner", {
	regExpSearch : /^(?=.*(diviner|divination))(?=.*wizard).*$/i,
	subname : "Diviner",
	fullname : "Diviner",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLWizScholar("Divination"),
		"subclassfeature3.1" : {
			name : "Portent",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"Once per long rest, I can perform a 1-hour ritual and roll two d20s" + (n < 14 ? "" : " (each rolled twice, I pick one)") + " to record",
					"I can replace a d20 of an ability check, attack roll, or save made by a creature I can see with one of these",
					"I must do so before the roll; each Portent roll can be used only once; unused ones are lost on the next ritual"
				]);
			}),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature6" : {
			name : "Ascended Awareness",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("While not incapacitated, I can't be surprised and I add my Int mod (min +1) to initiative rolls"),
			savetxt : { immune : ["surprised (if not incapacitated)"] },
			addMod : [{ type : "skill", field : "Init", mod : "max(Int|1)", text : "I add my Intelligence modifier (min +1) to initiative rolls." }]
		},
		"subclassfeature10" : {
			name : "The Third Eye",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"With a 1-hour ritual (can be during a rest), I gain one benefit within 60 ft until I perform it again:",
				"\u2022 Arcane Sight: see magic as with detect magic;  \u2022 Ethereal Sight: see into the Ethereal Plane and see invisible",
				"\u2022 Infernal Sight: see normally in dim light and (magical) darkness;  \u2022 Runic Sight: read any language"
			])
		},
		"subclassfeature14" : {
			name : "Master of Divination",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"I roll each Portent d20 twice and choose which result to record",
				"As an action, I can expend a 2nd-level or higher spell slot to switch my benefit from The Third Eye"
			]),
			action : [["action", "Switch Third Eye (2nd+ slot)"]]
		}
	}
});

AddSubClass("wizard(laserllama)", "enchanter", {
	regExpSearch : /^(?=.*(enchanter|enchantment))(?=.*wizard).*$/i,
	subname : "Enchanter",
	fullname : "Enchanter",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Mesmerizing Speech",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"A creature within 5 ft that can hear me has disadv. on its initial save against my enchantment spells",
				"As a reaction when such a creature saves to end one of my enchantment spells, I can impose disadvantage"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature3.1" : LLWizScholar("Enchantment"),
		"subclassfeature6" : {
			name : "Beguiling Defense",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"As a reaction when a creature I see within 30 ft targets me with an attack, it makes a Wis save (counts as enchantment)",
				"Fail: it must target another creature in range, or the attack misses; doesn't work on immune to charmed",
				"Once per creature per long rest, unless I expend a spell slot to use it again"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature10" : {
			name : "Empowered Enchantment",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Once per spell, when a creature succeeds on its save vs. my enchantment spell, I can make another target in range the new target")
		},
		"subclassfeature14" : {
			name : "Master of Enchantment",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("My enchantment spells and Enchanter features ignore immunity to charmed; such creatures have adv. on saves vs. charmed")
		}
	}
});

AddSubClass("wizard(laserllama)", "evoker", {
	regExpSearch : /^(?=.*(evoker|evocation))(?=.*wizard).*$/i,
	subname : "Evoker",
	fullname : "Evoker",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLWizScholar("Evocation"),
		"subclassfeature3.1" : {
			name : "Potent Cantrip",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I learn an extra evocation cantrip; my evocation cantrips gain:",
				"\u2022 Spell attack: I add my Int mod (min +1) to one damage roll of the cantrip",
				"\u2022 Saving throw: on a success, targets take half damage, but no other effects"
			]),
			spellcastingBonus : [{ name : "Potent Cantrip", "class" : "wizard(laserllama)", school : ["Evoc"], level : [0, 0] }],
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (v.isSpell && v.thisWeapon[3] && SpellsList[v.thisWeapon[3]] && SpellsList[v.thisWeapon[3]].level === 0 && SpellsList[v.thisWeapon[3]].school === "Evoc" && v.isDC === false) {
							output.extraDmg += Math.max(1, What("Int Mod"));
						}
					},
					"My evocation cantrips that require a spell attack add my Intelligence modifier (min +1) to one damage roll."
				]
			}
		},
		"subclassfeature6" : {
			name : "Sculpt Spells",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I cast an evocation spell, 1 + spell level creatures in it are immune to its initial effects and damage that turn")
		},
		"subclassfeature10" : {
			name : "Empowered Evocation",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("On the turn I cast an evocation spell, I can reroll any number of its damage dice at once (must keep the new rolls)")
		},
		"subclassfeature14" : {
			name : "Master of Evocation",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"When I cast an evocation spell of 5th-level or lower, I can have it deal maximum damage",
				"After the first use per long rest, each further use deals 4d6 necrotic damage per spell level to me (min 4d6)",
				"This damage ignores resistance and immunity and can't be reduced"
			]),
			usages : 1,
			recovery : "long rest"
		}
	}
});

AddSubClass("wizard(laserllama)", "illusionist", {
	regExpSearch : /^(?=.*(illusionist|illusion))(?=.*wizard).*$/i,
	subname : "Illusionist",
	fullname : "Illusionist",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLWizScholar("Illusion"),
		"subclassfeature3.1" : {
			name : "Illusionist Adept",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I learn minor illusion (or another wizard cantrip if I know it); it doesn't count against my cantrips known",
				"My minor illusion creates both a sound and an image, and I can cast it as an action or bonus action",
				"I can cast illusion spells from my spellbook without verbal components"
			]),
			spellcastingBonus : [{ name : "Illusionist Adept", spells : ["minor illusion"], selection : ["minor illusion"], firstCol : "atwill" }],
			spellChanges : {
				"minor illusion" : {
					time : "1 a/bns",
					changes : "I can cast minor illusion as a bonus action, creating both a sound and an image with one casting."
				}
			}
		},
		"subclassfeature6" : {
			name : "Phantasmal Spells",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"When I cast a conjuration or evocation spell from my spellbook, I can make it an illusory version:",
				"It becomes an illusion; I ignore normal material components; its saves become Int saves",
				"Its damage becomes psychic; anything it conjures with HP has half HP",
				"Creatures with an Int score higher than my spell save DC see through it and are immune"
			])
		},
		"subclassfeature10" : {
			name : "Illusory Self",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"As a reaction when hit by an attack, an illusory self takes the attack and I teleport up to 10 ft to a space I can see",
				"When I have no uses left, I can expend a 2nd-level or higher spell slot to use it again"
			]),
			usages : 1,
			recovery : "short rest",
			action : [["reaction", ""]]
		},
		"subclassfeature14" : {
			name : "Illusory Reality",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"When I cast an illusion spell with my action, as a bonus action I can make one nonmagical inanimate object in it real",
				"It can't deal damage or cause harm; AC = my spell save DC, HP = 3 \xD7 wizard level; lasts 1 minute"
			]),
			action : [["bonus action", ""]]
		}
	}
});

AddSubClass("wizard(laserllama)", "necromancer", {
	regExpSearch : /^(?=.*(necromancer|necromancy))(?=.*wizard).*$/i,
	subname : "Necromancer",
	fullname : "Necromancer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLWizScholar("Necromancy"),
		"subclassfeature3.1" : {
			name : "Sinister Servant",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I add conjure familiar to my spellbook; my familiar is always an undead (skeletal or ghastly) version of the beast")
		},
		"subclassfeature3.2" : {
			name : "Siphon Vitality",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"When I kill a creature (not construct/undead) with a 1st+ level spell, I regain HP = 2 \xD7 its CR (min 1); 3 \xD7 if necromancy",
				"Excess becomes temp HP; I can split the HP between me and undead under my control within 30 ft"
			])
		},
		"subclassfeature6" : {
			name : "Empowered Thralls",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"Animate dead (or another necromancy spell) is in my spellbook and always prepared",
				"Undead I create with spells gain bonus HP equal to my wizard level",
				"As a reaction when an undead under my control kills a creature, I gain the benefits of Siphon Vitality"
			]),
			action : [["reaction", "Siphon Vitality (thrall kill)"]],
			spellcastingBonus : [{ name : "Empowered Thralls", spells : LLSpellList(["animate dead"]), selection : LLSpellList(["animate dead"]), prepared : true }]
		},
		"subclassfeature10" : {
			name : "Dark Overlord",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I have resistance to necrotic damage; when I take damage, an undead I control within 30 ft can take it instead"),
			dmgres : ["Necrotic"]
		},
		"subclassfeature14" : {
			name : "Master of Necromancy",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"As an action, an undead I see within 30 ft makes a Cha save (adv. if Int 8+); fail: it's under my control as per animate dead",
				"It stays until I use this again or it dies; with Int 12+ it repeats the save every hour; a success makes it immune"
			]),
			action : [["action", ""]]
		}
	}
});

AddSubClass("wizard(laserllama)", "transmuter", {
	regExpSearch : /^(?=.*(transmuter|transmutation))(?=.*wizard).*$/i,
	subname : "Transmuter",
	fullname : "Transmuter",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLWizScholar("Transmutation"),
		"subclassfeature3.1" : {
			name : "Equivalent Exchange",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"As an action, I touch a nonmagical object and expend a spell slot to alter it (concentration, permanent after 1 min):",
				"\u2022 Material: iron, steel, stone (not gems), or wood to another from this list",
				"\u2022 Shape: crude unless proficient with the matching artisan's tools; no material added or removed",
				"Size by slot: 1st Tiny, 2nd Small, 3rd Medium, 5th Large, 7th Huge, 9th Gargantuan"
			]),
			action : [["action", ""]]
		},
		"subclassfeature6" : {
			name : "Transmute Self",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc([
					"During a long rest, with a 1-hour ritual, I make the benefits of a " + (n < 10 ? "1st" : "1st or 2nd") + "-level spell from my spellbook",
					"that targets a creature permanent on me (no concentration) until I perform this ritual again"
				]);
			})
		},
		"subclassfeature10" : {
			name : "Empowered Transmutation",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"Polymorph (or another transmutation spell) is in my spellbook and always prepared",
				"When I polymorph myself, it takes a bonus action and I keep my personality and Int, Wis, and Cha scores"
			]),
			spellcastingBonus : [{ name : "Empowered Transmutation", spells : LLSpellList(["polymorph"]), selection : LLSpellList(["polymorph"]), prepared : true }],
			spellChanges : {
				"polymorph" : {
					changes : "When I cast polymorph on myself, it's a bonus action and I keep my personality and mental ability scores."
				}
			}
		},
		"subclassfeature14" : {
			name : "Master of Transmutation",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"During a long rest, with a 1-hour ritual, I create a Philosopher's Stone (previous ones become inert)",
				"When I cast a wizard spell, I can expend it to cast the spell at 5th level instead of using a slot",
				"Or, as an action, I expend it to cast awaken, contagion, creation, mass cure wounds, raise dead, or restoration",
				"at 5th level, with no slot or material components, even if not prepared"
			]),
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : [{
				name : "Philosopher's Stone",
				spells : LLSpellList(["awaken", "contagion", "creation", "mass cure wounds", "raise dead", "restoration", "greater restoration"]),
				selection : LLSpellList(["awaken", "contagion", "creation", "mass cure wounds", "raise dead", "restoration", "greater restoration"]),
				times : 6,
				firstCol : "Sp"
			}]
		}
	}
});

AddSubClass("wizard(laserllama)", "bladesinger", {
	regExpSearch : /^(?=.*bladesing)(?=.*wizard).*$/i,
	subname : "Bladesinger",
	fullname : "Bladesinger",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Scholar of Spell & Sword",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency with light armor and can cast wizard spells while wearing it",
				"I gain proficiency with one type of one-handed melee weapon, which I can use as a spellcasting focus"
			]),
			armorProfs : [true, false, false, false],
			weaponProfs : [false, false, ["one-handed melee weapon of choice"]]
		},
		"subclassfeature3.1" : {
			name : "Bladesong",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action if not in medium/heavy armor or using a shield, I expend a slot for a 1-min Bladesong" + (n < 14 ? " (concentration)" : ""),
					"\u2022 Temp HP = 5 \xD7 slot level; +10 ft walking speed; opportunity attacks against me have disadvantage",
					"\u2022 I add my Int mod to Con saves to maintain concentration",
					"\u2022 As a reaction when hit by an attack, I add my Int mod to my AC against it"
				]);
			}),
			action : [["bonus action", ""], ["reaction", "Bladesong AC"]]
		},
		"subclassfeature3.2" : {
			name : "Dancing Smite",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"Once per turn when I hit with a melee weapon attack, I can expend a slot for +1d8 damage per slot level (max 5d8)",
				"The damage type is one dealt by a wizard spell I have prepared"
			])
		},
		"subclassfeature6" : {
			name : "Song of Battle",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"While in Bladesong, I can attack twice when I take the Attack action",
				"If I use my action to cast a spell during Bladesong, I can make one melee weapon attack as a bonus action"
			]),
			action : [["bonus action", "Song of Battle attack (after spell)"]]
		},
		"subclassfeature10" : {
			name : "Singing Reprisal",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"When I take damage during Bladesong, I can expend a slot to reduce it by 1d10 per slot level",
				"If this reduces it to 0, I can immediately make one melee weapon attack against the source"
			])
		},
		"subclassfeature14" : {
			name : "Master of Spell & Sword",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"My Bladesong no longer requires concentration; it ends early if I'm incapacitated or I end it (no action)",
				"During Bladesong, my melee weapon attacks deal +1d8 damage of a type dealt by a wizard spell I have prepared"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (classes.known["wizard(laserllama)"] && classes.known["wizard(laserllama)"].level >= 14 && !v.isSpell && v.isMeleeWeapon) {
							fields.Description += (fields.Description ? "; " : "") + "Bladesong: +1d8 dmg (type of a prepared wizard spell)";
						}
					},
					"While my Bladesong is active, my melee weapon attacks deal +1d8 damage of a type dealt by a wizard spell I have prepared."
				]
			}
		}
	}
});

AddSubClass("wizard(laserllama)", "scribe", {
	regExpSearch : /^(?=.*scribe)(?=.*wizard).*$/i,
	subname : "Scribe",
	fullname : "Scribe",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Scholar of the Book",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain one additional Focus School of my choice, and my spellbook gains these benefits:",
				"\u2022 Cantrip Formulae: when I prepare spells, I can replace one wizard cantrip I know with another",
				"\u2022 Prompt Preparation: during a short rest, I can replace one prepared spell with another from my spellbook",
				"\u2022 Quick Quill: copying a spell takes 1 hour per spell level (30 min for Focus School spells)"
			])
		},
		"subclassfeature3.1" : {
			name : "Spell Scrivener",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"During a long rest, I can spend 1 hour making temporary spell scrolls with a total spell level up to my Int mod",
					"Spells must be 1st-level+ wizard spells from my spellbook; each expends a matching slot that I can't regain",
					"while the scroll lasts; any creature can cast from these scrolls as if I had cast the spell" + (n < 14 ? "" : "; see Master Scrivener")
				]);
			})
		},
		"subclassfeature6" : {
			name : "Altered Arcana",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"When I prepare spells, I can choose two prepared spells of the same level and swap their damage types",
				"Prompt Preparation lets me replace a number of prepared spells up to half my wizard level"
			])
		},
		"subclassfeature10" : {
			name : "Spell Tinker",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"I gain a bonus Signature Spell based on a spell of 2nd-level or lower",
				"During a long rest, I can spend 1 hour to add, remove, or replace one modification of a Signature Spell"
			])
		},
		"subclassfeature14" : {
			name : "Advanced Theories",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("With Altered Arcana, I can also swap the initial saving throw of two prepared spells of the same level")
		},
		"subclassfeature14.1" : {
			name : "Master Scrivener",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("I can use Spell Scrivener at any time (1 minute per spell level), expending slots as normal; max 5th-level scrolls")
		}
	}
});

AddSubClass("wizard(laserllama)", "war mage", {
	regExpSearch : /^(?=.*war)(?=.*mage)(?=.*wizard).*$/i,
	subname : "War Mage",
	fullname : "War Mage",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Scholar of Warfare",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency with light and medium armor and can cast wizard spells while wearing it",
				"Abjuration or Evocation becomes one of my Focus Schools; I add shield (or another 1st-level abjuration) to my spellbook"
			]),
			armorProfs : [true, true, false, false]
		},
		"subclassfeature3.1" : {
			name : "Battle Mage",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"I can cast shield without a spell slot (1st-level effect) " + (n < 14 ? "Int mod times (min 1) per long rest" : "at will"),
					"When I do, I can't cast spells other than cantrips until the end of my next turn"
				]);
			}),
			usages : levels.map(function (n) { return n < 3 ? "" : n < 14 ? "Int mod per " : "\u221E\xD7 per "; }),
			usagescalc : "event.value = classes.known['wizard(laserllama)'] && classes.known['wizard(laserllama)'].level >= 14 ? '\u221E' : Math.max(1, What('Int Mod'));",
			recovery : "long rest",
			spellcastingBonus : [{ name : "Battle Mage", spells : ["shield"], selection : ["shield"], firstCol : "Sp" }]
		},
		"subclassfeature6" : {
			name : "Tactical Surge",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"My two new spells at 6th level must be counterspell and dispel magic (unless already in my spellbook)",
				"I gain a Tactical Surge when shield makes an attack miss or I end a spell with counterspell or dispel magic",
				"I can store up to Int mod (min 1); they're lost when I finish a long rest",
				"When I deal damage with a wizard spell, I expend any number for +2d6 damage each to one target"
			]),
			additional : "max Int mod stored"
		},
		"subclassfeature10" : {
			name : "Arcane Fortitude",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"I gain +1 to my saving throws for each Tactical Surge I have stored",
				"When I finish a short or long rest with no Tactical Surges stored, I gain one"
			])
		},
		"subclassfeature10.1" : {
			name : "Strategic Surge",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I roll initiative (not surprised/incapacitated), I can expend a Tactical Surge to add my Int mod (after rolling)")
		},
		"subclassfeature14" : {
			name : "Master of Arcane Warfare",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"I can use Battle Mage to cast shield at will (still 1st-level effects)",
				"When shield makes an attack miss, I can forgo a Tactical Surge to cast a wizard cantrip as part of that reaction"
			])
		}
	}
});

// Make the LaserLlama subclasses selectable in the Class/Subclass selection dialogs
if (typeof LLFixSubclassNames === "function") {
	LLFixSubclassNames();
	// and again after all add-on scripts have run (other scripts may add or change subclasses)
	if (typeof RunFunctionAtEnd === "function") RunFunctionAtEnd(function () { LLFixSubclassNames(); });
}
