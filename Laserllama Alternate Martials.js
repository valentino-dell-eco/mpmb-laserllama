/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	REQUIRES: "Laserllama Common Attributes 20261019.js" (import it first).
	Do not import the old LaserLlama files in the same sheet.

	-INFORMATION-
	Content:	Alternate Barbarian, Fighter, Monk, Rogue (with their Expanded options)
	Files:		LaserLlama - Alternate Barbarian v2.3.0.js
			LaserLlama - Alternate Fighter v3.5.1.js
			LaserLlama - Alternate Monk v3.1.1.js
			LaserLlama - Alternate Rogue v2.3.0.js
	Sheet:		v13.2.3
	Code by:	"ll-updates" release
*/

var iFileName = "Laserllama Alternate Martials.js";
RequiredSheetVersion("13.2.3");

// This file needs "Laserllama Common Attributes 20261019.js": stop with a clear message if it isn't loaded yet
if (typeof LLCommonAttributesVersion === "undefined") {
	throw new Error("\n\nATTENZIONE / WARNING\n\nPer usare \"Laserllama Alternate Martials.js\" devi prima importare \"Laserllama Common Attributes 20261019.js\". Importa quel file e poi importa di nuovo questo.\n\nTo use this file, first import \"Laserllama Common Attributes 20261019.js\", then import this file again.\n");
}

// ======================================================================
// LaserLlama - Alternate Barbarian v2.3.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Alternate Barbarian" (with Expanded options)
	Effect:		This script adds the Alternate Barbarian class, its 19 Primal Paths and the Barbaric Feats.
				Alternate Barbarian v2.3.0 and Alternate Barbarian Expanded v2.3.0 by Laserllama (GM Binder, Fan Content policy)
				The Savage Exploits are defined in the Common Attributes file (Compendium of Exploits v1.0).
	Sheet:		v13.2.3
	Code by:	Original scripts by CalypsoMoonlace and Valentino dell'Eco; updated to v2.3.0 in the "ll-updates" release (2026/10/19)
	How to use:	Write "Barbarian (LaserLlama)" in the Class field (e.g. "Path of the Berserker Barbarian (LaserLlama)")
*/


if (typeof LLExploitFeature !== "function" || !SpellsList["arresting strike"] || !SpellsList["arresting strike"].isExploit) {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

// Keep the official barbarian from matching "Barbarian (LaserLlama)"
if (ClassList["barbarian"]) ClassList["barbarian"].regExpSearch = /^(?=.*barbarian)(?!.*laserllama).*$/i;

// Exploit Dice table of the Alternate Barbarian
LLExploitTables["barbarian(laserllama)"] = {
	cls : "barbarian(laserllama)",
	factor : 1,
	dice : [0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5],
	die : ["", "d4", "d4", "d4", "d6", "d6", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10"]
};
// Bonus Exploit Dice from Primal Paths (Champion: Martial Training, Reaver: Reaver Superiority)
LLExploitBonusDice["barbarian(laserllama) paths"] = function (sSkip) {
	if (sSkip === "barbarian(laserllama)") return 0;
	var oCl = classes.known["barbarian(laserllama)"];
	if (!oCl || oCl.level < 3) return 0;
	return (/-(champion|reaver)$/).test(oCl.subclass) ? 1 : 0;
};
// Rage damage = d4 at 1st level, then the Exploit Die
LLBarbarianRageDie = function (lvl) {
	return lvl < 5 ? "d4" : lvl < 11 ? "d6" : lvl < 17 ? "d8" : "d10";
};
var LLBarbExpl = { cls : "barbarian(laserllama)", sheet : "savage exploits", sheetName : "Savage Exploits", ability : 1 };
var LLBarbLvl = function () { return classes.known["barbarian(laserllama)"] ? classes.known["barbarian(laserllama)"].level : 0; };

ClassList["barbarian(laserllama)"] = {
	name : "Barbarian (LaserLlama)",
	regExpSearch : /^(?=.*barbarian)(?=.*laserllama).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Strength",
	prereqs : "Strength 13",
	die : 12,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Str", "Con"],
	skillstxt : {
		primary : "Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival"
	},
	armorProfs : {
		primary : [true, true, false, true],
		secondary : [false, false, false, true]
	},
	weaponProfs : {
		primary : [true, true],
		secondary : [true, true]
	},
	equipment : "Barbarian (LaserLlama) starting equipment:" +
		"\n \u2022 A greataxe -or- a greatsword -or- a maul;" +
		"\n \u2022 Two simple weapons -or- a dagger and a shield;" +
		"\n \u2022 Hide armor -or- leather armor;" +
		"\n \u2022 An explorer's pack, a dagger, and four javelins." +
		"\n\nAlternatively, choose 2d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Primal Path", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"rage" : {
			name : "Rage",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : levels.map(function (n) {
				return LLdesc([
					"Not in heavy armor, I can Rage as a bonus action; it lasts until the end of my next turn",
					"It's extended if I attack a hostile, take damage, make a Str check, or use a bonus action; " + (n < 7 ? "max 10 min" : n < 15 ? "it always lasts 10 min (Feral Instinct)" : "it always lasts 1 h (Persistent Rage)"),
					"Adv. on Str saves and Str/Con checks; resistance to bludgeoning, piercing, and slashing",
					"+1" + LLBarbarianRageDie(n) + " damage on weapon attacks using Str; I can't cast or concentrate on spells",
					"I regain one use when I finish a short rest and all uses when I finish a long rest"
				]);
			}),
			usages : [2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, "\u221E\xD7 per "],
			recovery : "long rest",
			action : [["bonus action", " (start/extend)"]],
			dmgres : [["Bludgeoning", "Bludgeon. (in rage)"], ["Piercing", "Piercing (in rage)"], ["Slashing", "Slashing (in rage)"]],
			savetxt : { text : ["Adv. on Str saves in rage"] },
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.isSpell || v.isDC || fields.Mod !== 1 || !classes.known["barbarian(laserllama)"]) return;
						fields.Description += (fields.Description ? "; " : "") + "+1" + LLBarbarianRageDie(classes.known["barbarian(laserllama)"].level) + " dmg in rage";
					},
					"When I hit with a weapon attack that uses Strength while raging, I deal bonus damage equal to 1d4 (or my Exploit Die from 5th level)."
				]
			}
		},
		"unarmored defense" : {
			name : "Unarmored Defense",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("Without armor, my AC is 10 + Dexterity modifier + Constitution modifier + shield"),
			armorOptions : [{
				regExpSearch : /justToAddToDropDown/,
				name : "Unarmored Defense (Con)",
				source : [["GMB:LL", 0]],
				ac : "10+Con",
				affectsWildShape : true
			}],
			armorAdd : "Unarmored Defense (Con)"
		},
		"reckless attack" : {
			name : "Reckless Attack",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"When I make an attack using Str on my turn, I can attack recklessly",
				"I then have adv. on Str-based attacks, but attacks vs. me have adv., until the start of my next turn"
			])
		},
		"savage exploits" : LLExploitFeature({
			name : "Savage Exploits",
			minlevel : 2,
			cls : "barbarian(laserllama)",
			sheet : "savage exploits",
			sheetName : "Savage Exploits",
			ability : 1,
			extraTimes : levels.map(function (n) { return [0, 2, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8][n - 1]; }),
			description : LLdesc([
				"I know Savage Exploits fueled by my Exploit Dice; use one Exploit per attack, check, or save",
				"Use the \"Choose Feature\" button above to select Exploits; I can swap one when I gain a level",
				"Savage Skill: I can add an Exploit Die to checks with Animal Handling, Athletics, Intimidation,",
				"   Nature, Perception, or Survival, after rolling but before knowing if I succeed"
			])
		}),
		"exploit dice" : LLExploitDiceFeature("barbarian(laserllama)", 2, "Barbarian (LaserLlama)"),
		"subclassfeature3" : {
			name : "Primal Path",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"Choose a Primal Path and put it in the \"Class\" field; Path features use my Exploit save DC",
				"Path Exploits don't count against my Exploits Known; I learn them even without the prerequisites"
			])
		},
		"danger sense" : {
			name : "Danger Sense",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"I have adv. on initiative rolls and I can Rage when I roll initiative (no action)",
				"If I'm surprised, I can act normally on the first round if I Rage when I roll initiative"
			]),
			advantages : [["Initiative", true]]
		},
		"extra attack" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"I can attack twice, instead of once, whenever I take the Attack action on my turn",
				"If I use my action to Dash or Disengage while raging, I can make one weapon attack as a bonus action"
			]),
			action : [["bonus action", "Weapon Attack (after Dash/Disengage in rage)"]]
		},
		"feral instinct" : {
			name : "Feral Instinct",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"Adv. on Dex saves vs. effects I can see, unless I'm blinded, deafened, or incapacitated",
				"My Rage lasts its maximum duration unless I'm unconscious or I end it"
			]),
			savetxt : { text : ["Adv. on Dex saves vs. seen effects"] }
		},
		"improved critical" : {
			name : "Improved Critical",
			source : [["GMB:LL", 0]],
			minlevel : 9,
			description : levels.map(function (n) {
				return LLdesc("My Strength-based weapon attacks score a critical on a " + (n < 13 ? "19-20" : n < 17 ? "18-20" : "17-20"));
			}),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.isSpell || v.isDC || fields.Mod !== 1 || !classes.known["barbarian(laserllama)"]) return;
						var lvl = classes.known["barbarian(laserllama)"].level;
						var crit = lvl < 13 ? 19 : lvl < 17 ? 18 : 17;
						if (!v.CritChance || v.CritChance > crit) {
							fields.Description += (fields.Description ? "; " : "") + "Crit on " + crit + "-20";
							v.CritChance = crit;
						}
					},
					"My Strength-based weapon attacks score a critical hit on a roll of 19-20 (13th level: 18-20, 17th level: 17-20).",
					19
				]
			}
		},
		"critical strike" : {
			name : "Critical Strike",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("When I score a critical hit with a weapon attack while raging, I can use a Savage Exploit I know as part of that attack without expending an Exploit Die")
		},
		"unstoppable" : {
			name : "Unstoppable",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc([
				"If I drop to 0 HP while raging and am not killed outright, I can end my Rage to drop to 1 HP instead",
				"While raging, I add my Con mod (min +1) to my Intelligence, Wisdom, and Charisma saves"
			]),
			savetxt : { text : ["+Con mod (min 1) to Int/Wis/Cha saves in rage"] }
		},
		"persistent rage" : {
			name : "Persistent Rage",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("The duration of my Rage increases to 1 hour")
		},
		"indomitable might" : {
			name : "Indomitable Might",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("If the result of a Strength or Constitution check is lower than my Strength score, I can use my Strength score instead")
		},
		"primal champion" : {
			name : "Primal Champion",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("My Strength and Constitution scores increase by 4 and their maximum becomes 24"),
			scores : [4, 0, 4, 0, 0, 0],
			scoresMaximum : [24, 0, 24, 0, 0, 0]
		}
	}
};

// ===================================================================================
// PRIMAL PATHS (Alternate Barbarian v2.3.0)
// ===================================================================================
AddSubClass("barbarian(laserllama)", "ancestors", {
	regExpSearch : /ancestor/i,
	subname : "Path of the Ancestors",
	fullname : "Ancestral Barbarian",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Ancestral", [[3, ["brace up", "heroic fortitude"]], [5, ["arresting critical", "thunderous blow"]], [9, ["mythic resilience"]]], LLBarbExpl),
		"subclassfeature3.1" : {
			name : "Ancestral Knowledge",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"As an action, for 10 min, I add my Exploit Die to all Int, Wis, and Cha checks",
				"It ends early if I Rage or am incapacitated; after the free use, I must expend a use of Rage"
			]),
			usages : 1,
			recovery : "long rest",
			altResource : "Rage",
			action : [["action", ""]]
		},
		"subclassfeature3.2" : {
			name : "Spectral Warriors",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"While raging, spectral warriors swirl in my space; my Rage bonus and Exploit damage become radiant",
				"When I hit a creature with a melee attack, the spirits can surround it until the start of my next turn:",
				"   it has disadv. on attacks vs. others than me, and targets it hits other than me resist that damage",
				"It ends early if I direct them to another target or call them back with a bonus action"
			]),
			action : [["bonus action", " (recall)"]]
		},
		"subclassfeature6" : {
			name : "Spectral Shield",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc([
					"As a reaction while raging, when a creature I see within 30 ft takes damage, my spirits intercept it",
					"This reduces the damage by three times my Exploit Die" + (n >= 14 ? "; the attacker takes radiant damage equal to the damage prevented (Vengeful Ancestors)" : "")
				]);
			}),
			action : [["reaction", ""]]
		},
		"subclassfeature10" : {
			name : "Ancestral Oracle",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"While using Ancestral Knowledge, I can cast clairvoyance or commune without a slot or material components",
				"When the spell ends, the benefits of Ancestral Knowledge end as well"
			]),
			spellcastingBonus : [{
				name : "Ancestral Oracle",
				spells : ["clairvoyance", "commune"],
				selection : ["clairvoyance", "commune"],
				firstCol : "oncelr",
				times : 2
			}]
		},
		"subclassfeature14" : {
			name : "Vengeful Ancestors",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("When I use Spectral Shield, the attacker takes radiant damage equal to the damage my spirits intercepted")
		}
	}
});

AddSubClass("barbarian(laserllama)", "beast heart", {
	regExpSearch : /^(?=.*beast)(?=.*heart).*$/i,
	subname : "Path of the Beast Heart",
	fullname : "Beast Heart Barbarian",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Beast Heart", [[3, ["mighty leap", "mighty thrust"]], [5, ["arresting critical", "immovable stance"]], [9, ["savage defiance"]]], LLBarbExpl),
		"subclassfeature3.1" : {
			name : "Bestial Spirits",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I bond with a Bestial Spirit, gaining its benefits while raging; use the \"Choose Feature\" button above"),
			choices : ["Bear", "Eagle", "Elk", "Tiger", "Wolf"],
			"bear" : {
				name : "Bestial Spirit: Bear",
				description : LLdesc("While raging, I have resistance to all damage except force, psychic, and radiant"),
				dmgres : [["All -Force/Psych./Rad.", "All -Force/Psych./Rad. (in rage)"]]
			},
			"eagle" : {
				name : "Bestial Spirit: Eagle",
				description : LLdesc("While raging, I can gain the benefits of Dash and Disengage as a bonus action (also when I Rage)"),
				action : [["bonus action", "Dash + Disengage (Eagle, in rage)"]]
			},
			"elk" : {
				name : "Bestial Spirit: Elk",
				description : LLdesc("While raging, my speed increases by 15 ft and I ignore all difficult terrain")
			},
			"tiger" : {
				name : "Bestial Spirit: Tiger",
				description : LLdesc("While raging, I can use the mighty leap Exploit at will without expending an Exploit Die")
			},
			"wolf" : {
				name : "Bestial Spirit: Wolf",
				description : LLdesc("While raging, creatures of my choice have adv. on melee attacks vs. hostiles within 10 ft of me")
			}
		},
		"subclassfeature3.2" : {
			name : "Wild Empathy",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I can verbally communicate with and understand beasts; their awareness is limited by their Int")
		},
		"subclassfeature6" : {
			name : "Bestial Skill",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I bond with a second Bestial Spirit and add my Con mod (min +1) to its two skills; use \"Choose Feature\""),
			choices : ["Elephant", "Owl", "Panther"],
			"elephant" : {
				name : "Bestial Skill: Elephant",
				description : LLdesc("I add my Constitution modifier (min +1) to Athletics and Insight checks"),
				addMod : [{ type : "skill", field : "Athletics", mod : "max(Con|1)", text : "Bestial Skill (Elephant): I add my Constitution modifier (min +1) to Athletics checks." }, { type : "skill", field : "Insight", mod : "max(Con|1)", text : "Bestial Skill (Elephant): I add my Constitution modifier (min +1) to Insight checks." }]
			},
			"owl" : {
				name : "Bestial Skill: Owl",
				description : LLdesc("I add my Constitution modifier (min +1) to Investigation and Perception checks"),
				addMod : [{ type : "skill", field : "Investigation", mod : "max(Con|1)", text : "Bestial Skill (Owl): I add my Constitution modifier (min +1) to Investigation checks." }, { type : "skill", field : "Perception", mod : "max(Con|1)", text : "Bestial Skill (Owl): I add my Constitution modifier (min +1) to Perception checks." }]
			},
			"panther" : {
				name : "Bestial Skill: Panther",
				description : LLdesc("I add my Constitution modifier (min +1) to Stealth and Survival checks"),
				addMod : [{ type : "skill", field : "Stealth", mod : "max(Con|1)", text : "Bestial Skill (Panther): I add my Constitution modifier (min +1) to Stealth checks." }, { type : "skill", field : "Survival", mod : "max(Con|1)", text : "Bestial Skill (Panther): I add my Constitution modifier (min +1) to Survival checks." }]
			}
		},
		"subclassfeature10" : {
			name : "Council of Beasts",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("With a 1-hour ritual (can be during a rest), I can replace one Bestial Spirit with another from the same list")
		},
		"subclassfeature10.1" : {
			name : "Wild Awareness",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Whenever I finish a short or long rest, I gain the benefits of the commune with nature spell"),
			spellcastingBonus : [{
				name : "Wild Awareness",
				spells : ["commune with nature"],
				selection : ["commune with nature"],
				firstCol : "oncesr"
			}]
		},
		"subclassfeature14" : {
			name : "Bestial Champion",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("I bond with a final Bestial Spirit, gaining its benefit while raging; use the \"Choose Feature\" button above"),
			choices : ["Lion", "Falcon", "Rhino"],
			"lion" : {
				name : "Bestial Champion: Lion",
				description : LLdesc("While raging, hostiles within 5 ft of me have disadv. on attacks against targets other than me")
			},
			"falcon" : {
				name : "Bestial Champion: Falcon",
				description : LLdesc("While raging, I have a flying speed equal to my walking speed")
			},
			"rhino" : {
				name : "Bestial Champion: Rhino",
				description : LLdesc("While raging, a creature my size or smaller I hit with a melee attack must make a Str save or fall prone")
			}
		}
	}
});

AddSubClass("barbarian(laserllama)", "berserker", {
	regExpSearch : /berserker/i,
	subname : "Path of the Berserker",
	fullname : "Berserker",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Berserker", [[3, ["imposing presence", "savage rebuke"]], [5, ["bloodthirsty critical", "menacing shout"]], [9, ["roar of triumph"]]], LLBarbExpl),
		"subclassfeature3.1" : {
			name : "Frenzy",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"The first time I hit a creature with a Reckless Attack " + (n < 14 ? "on each of my turns" : "each turn (Unrivaled Fury)") + ", I deal +2 Exploit Dice damage",
					"While raging, my speed increases by 10 ft"
				]);
			})
		},
		"subclassfeature6" : {
			name : "Mindless Rage",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"While raging, I can't be charmed or frightened (such effects are suspended for the duration)",
				"While raging, I ignore the effects of the first five levels of exhaustion"
			]),
			savetxt : { immune : ["charmed (in rage)", "frightened (in rage)"] }
		},
		"subclassfeature10" : {
			name : "Intimidating Presence",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"I can use menacing shout without expending an Exploit Die (Con mod times per long rest)",
				"A creature I hit with a melee weapon attack has disadv. on saves vs. being frightened by me until the end of my next turn"
			]),
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Unrivaled Fury",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("While raging, I can use savage rebuke at will without an Exploit Die; Frenzy applies once each turn, not only on mine")
		}
	}
});

AddSubClass("barbarian(laserllama)", "blood and iron", {
	regExpSearch : /^(?=.*blood)(?=.*iron).*$/i,
	subname : "Path of Blood & Iron",
	fullname : "Blood & Iron Barbarian",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Blood & Iron", [[3, ["crushing grip", "mighty leap"]], [5, ["bloodthirsty critical", "honor duel"]], [9, ["savage defiance"]]], LLBarbExpl),
		"subclassfeature3.1" : {
			name : "Spiked Armor",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"In 1 hour (can be during a rest) I use smith's tools to turn nonmagical armor into Spiked Armor for me",
				"Wearing it, I can make unarmed strikes with it: piercing damage equal to my Exploit Die + Str mod",
				"A creature that starts its turn grappled by me takes piercing damage equal to my Exploit Die",
				"If I take the Attack action in rage and only use Spiked Armor strikes, I can make one more as a bonus action"
			]),
			action : [["bonus action", "Spiked Armor attack (in rage)"]],
			weaponOptions : [{
				regExpSearch : /^(?=.*spiked)(?=.*armou?r).*$/i,
				name : "Spiked Armor",
				source : [["GMB:LL", 0]],
				ability : 1,
				type : "Natural",
				damage : [1, 4, "piercing"],
				range : "Melee",
				description : "Unarmed strike while wearing Spiked Armor; damage die is my Exploit Die",
				abilitytodamage : true,
				selectNow : true,
				isSpikedArmorLL : true
			}],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!(/spiked armou?r/i).test(v.WeaponName) || !classes.known["barbarian(laserllama)"]) return;
						var sDie = LLBarbarianRageDie(classes.known["barbarian(laserllama)"].level);
						fields.Damage_Die = "1" + sDie;
					},
					"My Spiked Armor attacks deal piercing damage equal to my Exploit Die + my Strength modifier."
				]
			}
		},
		"subclassfeature3.2" : {
			name : "Warrior Smith",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency with smith's tools and heavy armor; I can Rage and stay raging in heavy armor"),
			toolProfs : ["Smith's tools"],
			armorProfs : [false, false, true, false]
		},
		"subclassfeature6" : {
			name : "Battle Hysteria",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("Once per turn, when I make a Reckless Attack while raging, I gain temp HP equal to my Con mod (min 1)")
		},
		"subclassfeature6.1" : {
			name : "Mythic Smith",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I can turn magic armor into Spiked Armor; an AC bonus of the armor can become a bonus to Spiked Armor attack and damage rolls")
		},
		"subclassfeature10" : {
			name : "Wild Charge",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("While raging, I can use a bonus action to move up to my speed and make a Spiked Armor unarmed strike"),
			action : [["bonus action", " (move + Spiked Armor attack)"]]
		},
		"subclassfeature14" : {
			name : "Spiked Retribution",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"When a creature hits me with a melee attack while I wear Spiked Armor, it takes piercing damage equal to my Str mod",
				"While raging, I can use my reaction to add my Exploit Die to that damage"
			]),
			action : [["reaction", " (+Exploit Die, in rage)"]]
		}
	}
});

AddSubClass("barbarian(laserllama)", "brute", {
	regExpSearch : /brute/i,
	subname : "Path of the Brute",
	fullname : "Brute",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Brutish", [[3, ["crushing grip", "imposing presence"]], [5, ["concussive blow", "greater hurl"]], [9, ["confounding critical"]]], LLBarbExpl),
		"subclassfeature3.1" : {
			name : "Unarmed & Dangerous",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I can use Con instead of Dex to calculate my AC in light and medium armor",
				"I'm proficient with improvised weapons; they and my unarmed strikes use my Exploit Die if higher",
				"In rage, if I take the Attack action using only unarmed strikes, Grapple, Shove, or improvised weapons,",
				"   I can make one more of those attacks as a bonus action"
			]),
			weaponProfs : [false, false, ["improvised weapons"]],
			action : [["bonus action", "Unarmed/Grapple/Shove/Improvised (in rage)"]],
			extraAC : {
				name : "Unarmed & Dangerous",
				mod : "max(Con-Dex|0)",
				text : "I can use my Constitution modifier instead of my Dexterity modifier for my AC in light or medium armor (medium armor still has a maximum of +2).",
				stopeval : function (v) { return !v.wearingArmor || v.heavyArmor; }
			},
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!classes.known["barbarian(laserllama)"] || !(v.baseWeaponName == "unarmed strike" || (/improvised/i).test(v.WeaponName + " " + v.baseWeaponName))) return;
						var sDie = LLBarbarianRageDie(classes.known["barbarian(laserllama)"].level);
						var nNew = Number(sDie.replace("d", ""));
						var aCur = (fields.Damage_Die + "").match(/^(\d+)d(\d+)$/);
						if (!aCur || (aCur[1] == 1 && Number(aCur[2]) < nNew) || fields.Damage_Die == 1) fields.Damage_Die = "1" + sDie;
					},
					"My unarmed strikes and improvised weapons use my Exploit Die as their damage die, if higher."
				]
			}
		},
		"subclassfeature3.2" : {
			name : "The Wrong Crowd",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I can speak, decipher, and leave secret messages in Thieves' Cant",
				"Carousing counts as resting for me (if I deal or take no damage); after a night of carousing in a",
				"   settlement, I have adv. on checks to gather information about it"
			]),
			languageProfs : ["Thieves' Cant"]
		},
		"subclassfeature6" : {
			name : "Brutal Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"While raging, my unarmed strikes and improvised weapon attacks count as magical",
				"When I hit with an unarmed strike, I can use concussive blow without expending an Exploit Die"
			]),
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "long rest"
		},
		"subclassfeature10" : {
			name : "Iron Grip",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("In rage: I can grapple creatures up to two sizes larger, my speed isn't halved while grappling, and I add my Exploit Die to Athletics checks to Grapple or Shove")
		},
		"subclassfeature14" : {
			name : "Brutish Determination",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"I add 1d4 to my Strength, Dexterity, Constitution, and death saving throws",
				"If I roll 20 or higher on a death save, I regain consciousness and stand up with 1 HP"
			]),
			savetxt : { text : ["+1d4 to Str, Dex, Con, and death saves"] }
		}
	}
});

AddSubClass("barbarian(laserllama)", "champion", {
	regExpSearch : /champion/i,
	subname : "Path of the Champion",
	fullname : "Champion Barbarian",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Champion", [[3, ["feat of strength", "mighty leap"]], [5, ["honor duel", "thunderous blow"]], [9, ["mythic resilience"]]], LLBarbExpl),
		"subclassfeature3.1" : LLAddFightingStyles({
			name : "Fighting Style",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I learn one Fighting Style of the Alternate Fighter (I must meet its prerequisites); use \"Choose Feature\"",
				"From 6th level, during a long rest I can spend 1 hour to replace it with another (Warrior's Discipline)"
			])
		}, LLFightingStyleLists["fighter"], false),
		"subclassfeature3.2" : {
			name : "Martial Training",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("My total number of Exploit Dice increases by 1; while raging, my Exploit Dice are one size larger (max d12)")
		},
		"subclassfeature6" : {
			name : "Mighty Blow",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I hit with a Strength-based weapon attack while raging, I can end my Rage to make it a critical hit"),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature6.1" : {
			name : "Warrior's Discipline",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"I have a climbing and swimming speed equal to my walking speed; when I Rage, I gain the benefits of Dash",
				"During a long rest, I can spend 1 hour to replace my Fighting Style with another of the Fighter"
			]),
			speed : { climb : { spd : "walk", enc : "walk" }, swim : { spd : "walk", enc : "walk" } }
		},
		"subclassfeature10" : {
			name : "Invigorating Critical",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I score a critical hit with a weapon attack, I regain HP equal to my Exploit Die + my Con mod")
		},
		"subclassfeature14" : {
			name : "Paragon of Battle",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("When I start my turn with at least 1 HP, I gain temporary HP equal to my Constitution modifier")
		}
	}
});

AddSubClass("barbarian(laserllama)", "elemental chaos", {
	regExpSearch : /^(?=.*elemental)(?=.*chaos).*$/i,
	subname : "Path of Elemental Chaos",
	fullname : "Elemental Chaos Barbarian",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Elemental", [[3, ["destructive strike", "hurl"]], [5, ["shattering slam", "thunderous blow"]], [9, ["destructive slam"]]], LLBarbExpl),
		"subclassfeature3.1" : {
			name : "Heart of Chaos",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I bond with an Element: Air (lightning), Fire (fire), or Water (cold); use the \"Choose Feature\" button above",
				"While raging (always from 6th level): I resist its damage, my Exploits and Rage bonus deal its type,",
				"   and as a reaction when hit by a melee attack, the attacker takes 2 Exploit Dice damage of that type"
			]),
			action : [["reaction", "Primeval Rebuke"]],
			choices : ["Air (lightning)", "Fire (fire)", "Water (cold)"],
			"air (lightning)" : {
				name : "Heart of Chaos: Air",
				description : LLdesc("While raging: resistance to lightning; my Exploits and Rage deal lightning; reaction 2 ED lightning to melee attacker"),
				dmgres : [["Lightning", "Lightning (in rage)"]]
			},
			"fire (fire)" : {
				name : "Heart of Chaos: Fire",
				description : LLdesc("While raging: resistance to fire; my Exploits and Rage deal fire; reaction 2 ED fire to melee attacker"),
				dmgres : [["Fire", "Fire (in rage)"]]
			},
			"water (cold)" : {
				name : "Heart of Chaos: Water",
				description : LLdesc("While raging: resistance to cold; my Exploits and Rage deal cold; reaction 2 ED cold to melee attacker"),
				dmgres : [["Cold", "Cold (in rage)"]]
			}
		},
		"subclassfeature6" : {
			name : "Controlled Chaos",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I gain the benefits of Heart of Chaos even when I'm not raging")
		},
		"subclassfeature6.1" : {
			name : "Elemental Whirlwind",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc([
					"While raging, chaos surrounds me in a " + (n < 10 ? 10 : 15) + "-ft radius; creatures of my choice in it suffer my Element's effect:",
					"Air: difficult terrain, and they lose their reaction if they start their turn in it",
					"Fire: they have disadv. on attacks vs. targets other than me",
					"Water: if they start their turn in it, their speed is halved until the start of their next turn"
				].concat(n < 10 ? [] : ["Greater Whirlwind: chosen creatures that start their turn in it take ED + Con mod Element damage"]));
			})
		},
		"subclassfeature10" : {
			name : "Greater Whirlwind",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("My Elemental Whirlwind has a 15-ft radius; chosen creatures that start their turn in it take my Exploit Die + Con mod damage of my Element")
		},
		"subclassfeature14" : {
			name : "Primeval Eruption",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As an action, I expend a use of Rage: creatures of my choice in 30 ft Dex save or 6 ED Element damage and prone; half on save"),
			action : [["action", " (1 Rage)"]]
		}
	}
});

AddSubClass("barbarian(laserllama)", "lycan", {
	regExpSearch : /lycan/i,
	subname : "Path of the Lycan",
	fullname : "Lycan",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : {
			name : "Beast Transformation",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"As a bonus action, I Shift into my Beast Form (a beast of CR 1 or lower chosen once) for up to 1 hour",
				"I use its statistics but keep my HP, alignment, personality, Int, Wis, Cha, and proficiencies",
				"I keep my features (incl. Exploits) if physically able, but not special senses; I can't cast spells",
				"I revert early as a bonus action or when incapacitated; I choose if my equipment merges or falls"
			]),
			action : [["bonus action", " (Shift/revert)"]]
		},
		"subclassfeature3.1" : {
			name : "Bestial Rage",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"While raging, I grow natural weapons I can use to make unarmed strikes:",
				"Bite (1d8 piercing): once on my turn, on a hit I gain temp HP equal to my Con mod",
				"Claws (1d6 slashing): if I take the Attack action and only use claws, I make one extra claw attack",
				"Tail (1d8 bludgeoning, reach): reaction when attacked within 10 ft to add my Exploit Die to my AC"
			]),
			action : [["reaction", "Tail (+Exploit Die to AC)"]],
			weaponOptions : [{
				regExpSearch : /^(?=.*lycan)(?=.*bite).*$/i,
				name : "Lycan Bite",
				source : [["GMB:LL", 0]],
				ability : 1,
				type : "Natural",
				damage : [1, 8, "piercing"],
				range : "Melee",
				description : "Only while raging; once on my turn, on hit gain temp HP equal to Con mod",
				abilitytodamage : true,
				selectNow : true
			}, {
				regExpSearch : /^(?=.*lycan)(?=.*claw).*$/i,
				name : "Lycan Claws",
				source : [["GMB:LL", 0]],
				ability : 1,
				type : "Natural",
				damage : [1, 6, "slashing"],
				range : "Melee",
				description : "Only while raging; if I only use claws with the Attack action, one extra claw attack",
				abilitytodamage : true,
				selectNow : true
			}, {
				regExpSearch : /^(?=.*lycan)(?=.*tail).*$/i,
				name : "Lycan Tail",
				source : [["GMB:LL", 0]],
				ability : 1,
				type : "Natural",
				damage : [1, 8, "bludgeoning"],
				range : "Melee",
				description : "Reach; only while raging",
				abilitytodamage : true,
				selectNow : true
			}],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/^lycan (bite|claws|tail)$/i).test(v.WeaponName) && classes.known["barbarian(laserllama)"] && classes.known["barbarian(laserllama)"].level >= 6) {
							fields.Description += (fields.Description ? "; " : "") + "Counts as magical";
						}
					},
					"From 6th level, my Lycan natural weapons count as magical."
				]
			}
		},
		"subclassfeature3.2" : LLPathExploits("Lycan", [[3, ["lunge", "mighty leap"]], [5, ["bloodthirsty critical", "menacing shout"]], [9, ["roar of triumph"]]], LLBarbExpl),
		"subclassfeature6" : {
			name : "Feral Might",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I can use mighty leap at will without an Exploit Die and I have a climbing speed equal to my walking speed"),
			speed : { climb : { spd : "walk", enc : "walk" } }
		},
		"subclassfeature6.1" : {
			name : "Savage Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("My natural weapons in both forms count as magical; in Beast Form I use my Prof Bonus instead of the beast's")
		},
		"subclassfeature10" : {
			name : "Infectious Fury",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"When I hit with a natural weapon while raging, the target makes a Wis save; on a failure (my choice):",
				"   it takes 3 Exploit Dice psychic damage, or it uses its reaction to attack another target I choose",
				"When I have no uses left, I can expend an Exploit Die to use it again"
			]),
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Primal Roar",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("I can use roar of triumph as long as I have Exploit Dice (not once per rest); creatures with its temp HP have adv. on their first melee attack each turn")
		}
	}
});

AddSubClass("barbarian(laserllama)", "sorcery", {
	regExpSearch : /sorcery/i,
	subname : "Path of Sorcery",
	fullname : "Sorcerous Barbarian",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : {
			name : "Spellsense",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("As an action, I can smell magic within 60 ft as per detect magic for up to 10 min; it ends if I Rage"),
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "long rest",
			action : [["action", ""]]
		},
		"subclassfeature3.1" : LLPathExploits("Sorcerous", [[3, ["heroic fortitude", "mighty leap"]], [5, ["immovable stance", "thunderous blow"]], [9, ["savage defiance"]], [14, ["sundering strike"]]], LLBarbExpl),
		"subclassfeature3.2" : {
			name : "Wild Sorcery",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"Each time I Rage, I roll " + (n < 14 ? "a d12" : "two d12 and choose (Chaos Incarnate)") + " on the Wild Sorcery table (see Notes page)",
					"The effect uses my Exploit save DC and lasts for the Rage, even if it requires concentration"
				]);
			}),
			toNotesPage : [{
				name : "Wild Sorcery Table",
				note : [
					"01: My Rage damage bonus deals necrotic damage; once per turn when I deal it, I gain that much temp HP (not vs. undead)",
					"02: As a bonus action, I can teleport to an unoccupied space I can see within 30 ft",
					"03: As a bonus action, raw magic explodes at a point within 30 ft; creatures within 5 ft of it make a Dex save or take 2 Exploit Dice force damage",
					"04: A weapon I hold gains the thrown (20/60) and light properties and returns to my hand after a ranged attack",
					"05: As a reaction when a creature I see within 30 ft damages me, it makes a Dex save or takes 2 Exploit Dice force damage",
					"06: I can use the mighty leap Exploit without expending an Exploit Die",
					"07: I gain resistance to the last type of damage I took (only one type at a time)",
					"08: I'm targeted by the enlarge part of enlarge/reduce; if there isn't room, roll again",
					"09: I emit bright light in 15 ft; as a bonus action, a creature in it makes a Con save or is blinded until my next turn",
					"10: I can pass through creatures and objects as difficult terrain; if I end inside one, I'm shunted to the last free space",
					"11: Flowers and vines sprout in 15 ft around me and move with me; it's difficult terrain for creatures of my choice",
					"12: I regain one expended use of Rage; roll again on this table"
				]
			}]
		},
		"subclassfeature6" : {
			name : "Arcane Disruption",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I have resistance to damage from spells; while raging, creatures of my choice within 15 ft also have it"),
			dmgres : ["Spells"]
		},
		"subclassfeature10" : {
			name : "Unstable Sorcery",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I take damage or fail a save while raging, I can use my reaction to roll a new Wild Sorcery effect"),
			action : [["reaction", ""]]
		},
		"subclassfeature14" : {
			name : "Chaos Incarnate",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"Whenever I roll on the Wild Sorcery table, I roll twice and choose which effect manifests",
				"I learn sundering strike; I can use it more than once per rest by expending a use of Rage"
			])
		}
	}
});

AddSubClass("barbarian(laserllama)", "zealot", {
	regExpSearch : /zealot/i,
	subname : "Path of the Zealot",
	fullname : "Zealot",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Zealous", [[3, ["feat of strength", "savage rebuke"]], [5, ["honor duel", "menacing shout"]], [9, ["mythic resilience"]]], LLBarbExpl),
		"subclassfeature3.1" : {
			name : "Champion of the Gods",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"While raging, the first time I hit with a weapon attack on each of my turns, I deal +2 Exploit Dice damage",
				"This damage, my Exploits, and my Rage bonus deal radiant (good), thunder (neutral), or necrotic (evil)"
			])
		},
		"subclassfeature3.2" : {
			name : "Divine Mandate",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Spells that restore me to life (not undeath), such as raise dead, don't require material components")
		},
		"subclassfeature6" : {
			name : "Unwavering Faith",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("If I fail a saving throw while raging, I can expend an Exploit Die and add it to the result")
		},
		"subclassfeature10" : {
			name : "Fanatical Fervor",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"As a bonus action, up to my barbarian level creatures that hear me within 30 ft have adv. on attacks and saves until my next turn",
				"After the free use, I must expend a use of Rage to use it again"
			]),
			usages : 1,
			recovery : "long rest",
			altResource : "Rage",
			action : [["bonus action", ""]]
		},
		"subclassfeature14" : {
			name : "Undying Zealot",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"When reduced to 0 HP while raging, I don't fall unconscious; I keep making death saves on my turns",
				"Each time I take damage I suffer a death save failure; if I start my turn with 3 failures, DC 10 Con save or my Rage ends",
				"When the Rage ends at 0 HP I fall unconscious; with 3 failures, I die instantly"
			])
		}
	}
});

// ===================================================================================
// ADDITIONAL PRIMAL PATHS (Alternate Barbarian Expanded v2.3.0)
// ===================================================================================
AddSubClass("barbarian(laserllama)", "deep", {
	regExpSearch : /^(?=.*\bdeep\b).*$/i,
	subname : "Path of the Deep",
	fullname : "Barbarian of the Deep",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Deep", [[3, ["crushing grip", "sweeping strike"]], [5, ["immovable stance", "rending strike"]], [9, ["primal terror"]]], LLBarbExpl),
		"subclassfeature3.1" : {
			name : "Eldritch Tendrils",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"When I Rage, or as a bonus action while raging, my tendrils lash a creature within 15 ft",
					(n < 10 ? "It must be my size or smaller" : "Two creatures my size or smaller, or one up to one size larger") + "; Str save or pulled up to 15 ft toward me",
					"If it ends within 5 ft of me, it's grappled (escape DC = Exploit save DC); max " + (n < 10 ? "one creature" : "two creatures") + " grappled"
				]);
			}),
			action : [["bonus action", " (in rage)"]]
		},
		"subclassfeature3.2" : {
			name : "Gift of the Depths",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I have a swimming speed equal to my walking speed and I can breathe both air and water"),
			speed : { swim : { spd : "walk", enc : "walk" } }
		},
		"subclassfeature6" : {
			name : "Reality Warp",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc([
					"While raging, as a bonus action (also when I Rage), I can teleport to a space I can see within 30 ft",
					"I regain one use on a short rest and all on a long rest; with no uses left, I can expend an Exploit Die"
				].concat(n < 14 ? [] : ["Creatures within 10 ft of where I appear make a Wis save or take 2 ED psychic and are frightened until my next turn (half, not frightened, on save)"]));
			}),
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "long rest",
			action : [["bonus action", ""]]
		},
		"subclassfeature10" : {
			name : "Empowered Tendrils",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("My tendrils give me a climbing speed equal to my walking speed (hands free) and can target and grapple more creatures (see Eldritch Tendrils)"),
			speed : { climb : { spd : "walk", enc : "walk" } }
		},
		"subclassfeature14" : {
			name : "The Horrors Below",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("When I use Reality Warp, creatures within 10 ft of where I appear make a Wis save or take 2 ED psychic damage and are frightened of me until my next turn")
		}
	}
});

AddSubClass("barbarian(laserllama)", "favored", {
	regExpSearch : /favou?red/i,
	subname : "Path of the Favored",
	fullname : "Favored Barbarian",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Favored", [[3, ["feat of strength", "heroic fortitude"]], [5, ["ringing critical", "thunderous blow"]], [9, ["mythic athleticism"]], [14, ["colossal strength"]]], LLBarbExpl),
		"subclassfeature3.1" : {
			name : "Favored Presence",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("As a bonus action, I expend a use of Rage to add my Str mod (min +1) to Cha checks for 10 min; it ends if I damage a creature, force a save, or Rage"),
			action : [["bonus action", " (1 Rage)"]]
		},
		"subclassfeature3.2" : {
			name : "Fate-Touched",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"When I roll a 1 on an Exploit Die (including Rage damage), I can reroll it once",
					"While raging: as a reaction when hit, I can expend an Exploit Die to add it to my AC vs. that attack",
					"While raging: when I miss with a Str-based weapon attack, I can expend an Exploit Die to add it to the roll"
				].concat(n < 10 ? [] : ["Wondrous Success: once per round each, I can use these without an Exploit Die, rolling a d4 instead"]));
			}),
			action : [["reaction", " (+ED to AC, in rage)"]]
		},
		"subclassfeature6" : {
			name : "Glorious Cause",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I Rage, I and up to my Con mod (min 1) creatures within 30 ft gain 1 + my Exploit Die temporary HP")
		},
		"subclassfeature6.1" : {
			name : "Tireless Hero",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc("When I make an ability check with a skill I'm proficient in, I add " + (n < 14 ? "1d4" : "1d6") + " to the roll");
			})
		},
		"subclassfeature10" : {
			name : "Wondrous Success",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Once per short rest, I can use my barbarian level instead of rolling the d20 for an ability check, attack roll, or saving throw"),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature14" : {
			name : "Legendary Strength",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"I learn colossal strength (if I already knew it, I learn another Barbarian Exploit instead)",
				"With it, I count as having spent one additional Exploit Die (max 6); my Tireless Hero die becomes a d6"
			])
		}
	}
});

AddSubClass("barbarian(laserllama)", "inferno", {
	regExpSearch : /inferno/i,
	subname : "Path of the Inferno",
	fullname : "Inferno Barbarian",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Infernal", [[3, ["imposing presence", "mighty leap"]], [5, ["bloodthirsty critical", "menacing shout"]], [9, ["primal terror"]]], LLBarbExpl),
		"subclassfeature3.1" : {
			name : "Abyssal Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"While raging" + " (always from 10th level), I gain these benefits:",
				"Blighted Hide: I can use Str instead of Dex for my Unarmored Defense",
				"Demonic Leap: I can use mighty leap as a bonus action each turn (also when I Rage) without an Exploit Die",
				"Hellfire Strikes: my Rage bonus and Exploits can deal fire damage that ignores fire resistance"
			]),
			armorOptions : [{
				regExpSearch : /^(?=.*blighted)(?=.*hide).*$/i,
				name : "Unarmored Defense (Blighted Hide)",
				source : [["GMB:LL", 0]],
				ac : "10+Str+Con",
				dex : -10,
				affectsWildShape : true
			}],
			action : [["bonus action", "Demonic Leap (mighty leap)"]]
		},
		"subclassfeature3.2" : {
			name : "Hellish Presence",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I learn to speak Abyssal; I can add my Exploit Die to my Intimidation checks"),
			languageProfs : ["Abyssal"]
		},
		"subclassfeature6" : {
			name : "Demonic Bloodlust",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I hit a creature with a Reckless Attack while raging, I gain temp HP equal to my Con mod (min 1)")
		},
		"subclassfeature10" : {
			name : "Hellfire Fury",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"My Abyssal Warrior benefits become permanent (demonic appearance only while raging)",
				"While raging, mighty leap grants a flying speed equal to its bonus jump distance until the end of my turn"
			])
		},
		"subclassfeature14" : {
			name : "Chaos Overwhelming",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("When I Rage, I gain one of these for its duration (see Notes page): Demonic Flight, Hellfire Armaments, Hulking Form, or Iron Flesh"),
			toNotesPage : [{
				name : "Chaos Overwhelming Options",
				note : [
					"Demonic Flight: leathery wings give me a flying speed equal to my walking speed (destroys clothing not made for them)",
					"Hellfire Armaments: my weapon attacks deal fire damage; my fire damage ignores resistance, treats immunity as resistance, and targets can't regain HP until they finish a long rest",
					"Hulking Form: I grow one size, my reach increases by 5 ft, I add my Con mod (min +1) to Str checks and saves, and once per turn my Str-based weapon hits deal +1 Exploit Die damage",
					"Iron Flesh: I'm immune to nonmagical bludgeoning, piercing, and slashing damage (silvered weapons bypass it)"
				]
			}]
		}
	}
});

// Mutations of the Path of the Mutant
var LLMutations = {
	"aberrant sight" : { name : "Aberrant Sight", description : LLdesc("I gain darkvision 60 ft (or +60 ft if I have it) and I can see through magical darkness within it") },
	"alchemical resistance" : { name : "Alchemical Resistance", description : LLdesc("I gain resistance to acid, cold, fire, poison, or lightning (chosen when I manifest it)") },
	"aquatic adaptation" : { name : "Aquatic Adaptation", description : LLdesc("I gain a swimming speed equal to my walking speed and I can breathe both air and water") },
	"enhanced movement" : { name : "Enhanced Movement", description : LLdesc("I can take the Dash action as a bonus action on each of my turns") },
	"grappling appendage" : { name : "Grappling Appendage", description : LLdesc("A tentacle (10 ft reach) lets me make unarmed strikes (Exploit Die bludgeoning), Shove, and Grapple; it can't wield items") },
	"monstrous glide" : { name : "Monstrous Glide", description : LLdesc("When I fall 10 ft or more, I subtract up to 100 ft from the fall for damage and move 2 ft horizontally per 1 ft I fall") },
	"oozing form" : { name : "Oozing Form", description : LLdesc("As a bonus action, I can morph into (or out of) an ooze-like state to squeeze through 1-inch gaps") },
	"unnatural physicality" : { name : "Unnatural Physicality", description : LLdesc("I add my Exploit Die to Acrobatics and Athletics checks") },
	"acidic bile" : { name : "Acidic Bile", prereqeval : function (v) { return LLBarbLvl() >= 6; }, prerequisite : "6th-level Barbarian", description : LLdesc("I know the acid splash cantrip, using Con; I add my Con mod to its damage"),
		spellcastingBonus : [{ name : "Acidic Bile", spells : ["acid splash"], selection : ["acid splash"], spellcastingAbility : 3 }],
		calcChanges : { atkCalc : [function (fields, v, output) { if (v.isSpell && (/acid splash/i).test(v.WeaponName)) output.extraDmg += What("Con Mod"); }, "My acid splash adds my Constitution modifier to its damage."] } },
	"corrosive blood" : { name : "Corrosive Blood", prereqeval : function (v) { return LLBarbLvl() >= 6; }, prerequisite : "6th-level Barbarian", description : LLdesc("As a reaction when hit by an attack from within 30 ft, the attacker takes my Exploit Die + Con mod acid damage") },
	"dislocated reach" : { name : "Dislocated Reach", prereqeval : function (v) { return LLBarbLvl() >= 6; }, prerequisite : "6th-level Barbarian", description : LLdesc("The length of my arms doubles and the reach of my melee attacks increases by 5 ft") },
	"engorged physique" : { name : "Engorged Physique", prereqeval : function (v) { return LLBarbLvl() >= 6; }, prerequisite : "6th-level Barbarian", description : LLdesc("I grow one size (as room allows), my reach increases by 5 ft, and my melee weapon hits deal +1 Exploit Die damage") },
	"inoculated vigor" : { name : "Inoculated Vigor", prereqeval : function (v) { return LLBarbLvl() >= 6; }, prerequisite : "6th-level Barbarian", description : LLdesc("I'm immune to acid and poison damage, to disease, and to the poisoned condition") },
	"toxic symbiosis" : { name : "Toxic Symbiosis", prereqeval : function (v) { return LLBarbLvl() >= 6; }, prerequisite : "6th-level Barbarian", description : LLdesc("When I hit with a melee attack, as a bonus action I gain temp HP equal to my Con mod (not vs. constructs or undead)") },
	"viscous grip" : { name : "Viscous Grip", prereqeval : function (v) { return LLBarbLvl() >= 6; }, prerequisite : "6th-level Barbarian", description : LLdesc("I gain a climbing speed equal to my walking speed without checks; creatures have disadv. to escape my grapples") },
	"alchemical intellect" : { name : "Alchemical Intellect", prereqeval : function (v) { return LLBarbLvl() >= 14; }, prerequisite : "14th-level Barbarian", description : LLdesc("I have adv. on Int, Wis, and Cha saves, but disadv. on Str, Dex, and Con saves") },
	"hideous regeneration" : { name : "Hideous Regeneration", prereqeval : function (v) { return LLBarbLvl() >= 14; }, prerequisite : "14th-level Barbarian", description : LLdesc("If I start my turn with less than half my HP (but at least 1), I regain HP equal to my Con mod (min 1)") },
	"monstrous flight" : { name : "Monstrous Flight", prereqeval : function (v) { return LLBarbLvl() >= 14; }, prerequisite : "14th-level Barbarian", description : LLdesc("Monstrous wings give me a flying speed equal to my walking speed") },
	"synthetic carapace" : { name : "Synthetic Carapace", prereqeval : function (v) { return LLBarbLvl() >= 14; }, prerequisite : "14th-level Barbarian", description : LLdesc("+2 AC and resistance to nonmagical, non-silvered bludgeoning, piercing, and slashing damage") }
};

AddSubClass("barbarian(laserllama)", "mutant", {
	regExpSearch : /mutant/i,
	subname : "Path of the Mutant",
	fullname : "Mutant",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	spellcastingAbility : 3,
	features : {
		"subclassfeature3" : LLPathExploits("Mutagenic", [[3, ["crushing grip", "feat of strength"]], [5, ["rending strike", "whirlwind strike"]], [9, ["confounding critical"]]], LLBarbExpl),
		"subclassfeature3.1" : (function () {
			var oFea = {
				name : "Aberrant Alchemy",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : LLdesc([
					"I inoculate Latent Mutagens in my blood; use the \"Choose Feature\" button above to select them",
					"When I Rage, I gain the benefits of up to my Con mod (min 1) of them for the duration of the Rage",
					"During a long rest, I can spend 1 hour with alchemist's supplies to replace one Latent Mutagen"
				]),
				extraname : "Latent Mutagen",
				extrachoices : [],
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 6 ? 3 : n < 10 ? 5 : n < 14 ? 7 : 9; })
			};
			for (var sM in LLMutations) {
				oFea.extrachoices.push(LLMutations[sM].name);
				oFea[sM] = LLMutations[sM];
			}
			return oFea;
		})(),
		"subclassfeature3.2" : {
			name : "Savage Alchemist",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Nature and with alchemist's supplies; I add my Exploit Die to checks with either"),
			skills : ["Nature"],
			toolProfs : ["Alchemist's supplies"]
		},
		"subclassfeature6" : {
			name : "Enduring Mutation",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("During a short or long rest, I can make one Latent Mutagen permanent while not raging; it counts toward my active Mutagens when I Rage")
		},
		"subclassfeature10" : {
			name : "Noxious Strike",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"Once per turn when I hit with a melee weapon attack, the target makes a Con save",
				"Fail: 4 ED acid damage and blinded or stunned (my choice) for 1 min (save each time it takes damage); success: half",
				"With no uses left, I can expend a use of Rage to use it again"
			]),
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Rapid Mutation",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("While Mutated, I can use a bonus action to switch one active Mutagen with one of my Latent Mutagens"),
			action : [["bonus action", ""]]
		}
	}
});

AddSubClass("barbarian(laserllama)", "packleader", {
	regExpSearch : /pack ?leader/i,
	subname : "Path of the Packleader",
	fullname : "Packleader",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : {
			name : "Savage Companion",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I bond with a Savage Companion; select \"Savage Companion\" on a Companion page",
				"It acts on my turn but only Dodges unless I command it with a bonus action; I can forgo one attack to have it attack",
				"At 0 HP it makes death saves; as an action I can touch it and expend an Exploit Die to stabilize it",
				"If it dies, I can spend 8 hours to bond with a new worthy beast"
			]),
			action : [["bonus action", " (command)"]],
			creaturesAdd : [["Savage Companion"]],
			creatureOptions : [{
				name : "Savage Companion",
				source : [["GMB:LL", 0]],
				size : 3,
				type : "Beast",
				alignment : "Neutral",
				ac : "13+Prof",
				hp : 20,
				hd : [3, 8],
				hdLinked : ["barbarian(laserllama)"],
				minlevelLinked : ["barbarian(laserllama)"],
				speed : "40 ft, swim 20 ft",
				scores : [14, 14, 15, 8, 14, 8],
				saves : ["", "", "", "", "", ""],
				skills : { "Intimidation" : 2, "Survival" : 2 },
				senses : "",
				passivePerception : 12,
				languages : "understands one language its master speaks",
				challengeRating : "1",
				proficiencyBonus : 2,
				proficiencyBonusLinked : true,
				attacksAction : 1,
				attacks : [{
					name : "Maul",
					ability : 1,
					damage : [1, 8, "slashing"],
					modifiers : ["", "Prof"],
					range : "Melee (5 ft)",
					description : "Target its size or smaller is knocked prone",
					abilitytodamage : true
				}],
				traits : [{
					name : "Hit Dice",
					description : "The Companion has a number of d8 Hit Dice equal to its master's barbarian level, and benefits from short and long rests."
				}, {
					name : "Primal Bond",
					description : "It adds its master's Proficiency Bonus to its Str and Con saves and its Intimidation and Survival checks (twice from the base +2)."
				}, {
					name : "Wild Fury (Packleader 6)",
					minlevel : 6,
					description : "While its master rages and it is within 30 ft of its master, it has resistance to bludgeoning, piercing, and slashing damage. Its attacks count as magical."
				}, {
					name : "Coordinated Assault (Packleader 10)",
					minlevel : 10,
					description : "It and its master have advantage on melee attacks against a target if the other is within 5 ft of that target."
				}],
				calcChanges : {
					hp : function (totalHD, HDobj, prefix) {
						if (!classes.known["barbarian(laserllama)"]) return;
						var lvl = classes.known["barbarian(laserllama)"].level;
						HDobj.alt.push(5 + 5 * lvl);
						HDobj.altStr.push(" = 5 as a base\n + 5 \xD7 " + lvl + " from five times its master's barbarian level (" + (5 * lvl) + ")");
					},
					setAltHp : true
				},
				eval : function (prefix, lvl) {
					var nPB = Number(How("Proficiency Bonus")) || 2;
					Value(prefix + "Comp.Use.Ability.Str.ST.Bonus", nPB);
					Value(prefix + "Comp.Use.Ability.Con.ST.Bonus", nPB);
				}
			}]
		},
		"subclassfeature3.1" : {
			name : "Beast Whisperer",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Animal Handling; I add my Exploit Die to Animal Handling checks related to wild animals"),
			skills : ["Animal Handling"]
		},
		"subclassfeature3.2" : LLPathExploits("Packleader", [[3, ["imposing presence", "trampling rush"]], [5, ["bloodthirsty critical", "primal senses"]], [9, ["pack tactics"]]], LLBarbExpl),
		"subclassfeature6" : {
			name : "Wild Fury",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("While I'm raging, my Companion within 30 ft resists bludgeoning, piercing, and slashing; its attacks count as magical")
		},
		"subclassfeature10" : {
			name : "Coordinated Assault",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("My Companion and I have adv. on melee attacks vs. a target if the other is within 5 ft of it")
		},
		"subclassfeature14" : {
			name : "Primeval Companion",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc([
				"As an action, I expend a use of Rage to turn my Companion into a Primeval Companion for 1 hour",
				"When I Rage, I can expend two uses of Rage to transform it at the same time (see Notes page for its statistics)"
			]),
			action : [["action", " (1 Rage)"]],
			toNotesPage : [{
				name : "Primeval Companion",
				note : [
					"Large Beast, Neutral; AC 13 + PB (natural armor); HP 5 + five times my barbarian level; Speed 60 ft, swim 40 ft",
					"Str 18, Dex 14, Con 20, Int 8, Wis 18, Cha 10; proficient in Str and Con saves, Intimidation and Survival (+PB, doubled from 17th level)",
					"Relentless: once per long rest, when reduced to 0 HP, it instead regains HP equal to my barbarian level",
					"Savage Charge: if it moves 20 ft in a straight line and hits with its Maul, +1 Exploit Die damage",
					"Maul: +4 + PB to hit, reach 5 ft; 2d8 + 4 + PB slashing, and a target its size or smaller is knocked prone"
				]
			}]
		}
	}
});

AddSubClass("barbarian(laserllama)", "reaver", {
	regExpSearch : /reaver/i,
	subname : "Path of the Reaver",
	fullname : "Reaver",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Reaver", [[3, ["taunting strike", "savage rebuke"]], [5, ["glancing blow", "rending strike"]], [9, ["adrenaline rush"]]], LLBarbExpl),
		"subclassfeature3.1" : (function () {
			// Reaver Superiority: +1 Exploit Die and one bonus Exploit (Savage or Martial)
			var aList = LLExploitList("barbarian(laserllama)").concat(LLExploitList("fighter(laserllama)"));
			var oFea = {
				name : "Reaver Superiority",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : LLdesc([
					"My number of Exploit Dice increases by 1; I learn a bonus Exploit (another at 10th level)",
					"When I learn Exploits, I can choose Martial Exploits of the Alternate Fighter (using my barbarian level)"
				]),
				extraname : "Reaver Exploit",
				extrachoices : [],
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 10 ? 1 : 2; })
			};
			var oOpt = { cls : "barbarian(laserllama)", sheet : "savage exploits", sheetName : "Savage Exploits", ability : 1, notesTitle : "Reaver Superiority", bonusName : "Reaver Exploits" };
			for (var i = 0; i < aList.length; i++) {
				var sName = SpellsList[aList[i]].name;
				if (oFea.extrachoices.indexOf(sName) !== -1) continue;
				oFea.extrachoices.push(sName);
				oFea[sName.toLowerCase()] = LLExploitChoice(aList[i], oOpt);
			}
			return oFea;
		})(),
		"subclassfeature3.2" : {
			name : "Swift Strides",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("While raging, opportunity attacks against me are made with disadvantage")
		},
		"subclassfeature6" : {
			name : "Restorative Rage",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I Rage, I regain one expended Exploit Die, or gain temp HP equal to my Exploit Die, or double my speed this turn")
		},
		"subclassfeature10" : {
			name : "Unstoppable Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("While raging, I'm under the effects of freedom of movement (not magical); I learn a bonus Exploit (Reaver Superiority)")
		},
		"subclassfeature14" : {
			name : "Storm of Steel",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("Once per turn when I hit with a weapon attack while raging, I can forgo the Rage damage to use an Exploit I know that works with a weapon attack without expending an Exploit Die")
		}
	}
});

AddSubClass("barbarian(laserllama)", "titan", {
	regExpSearch : /titan/i,
	subname : "Path of the Titan",
	fullname : "Titan",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : {
			name : "Giant Bloodline",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I choose a giant bloodline and resist its damage type; use the \"Choose Feature\" button above"),
			choices : ["Hill (poison)", "Stone (psychic)", "Frost (cold)", "Fire (fire)", "Cloud (thunder)", "Storm (lightning)"],
			"hill (poison)" : { name : "Hill Giant Bloodline", description : levels.map(function (n) { return LLdesc("I resist poison damage" + (n < 10 ? "" : "; as a reaction when I take damage, I reduce it by my Con mod (min 1)")); }), dmgres : ["Poison"] },
			"stone (psychic)" : { name : "Stone Giant Bloodline", description : levels.map(function (n) { return LLdesc("I resist psychic damage" + (n < 10 ? "" : "; I'm proficient with Wisdom saving throws")); }), dmgres : ["Psychic"] },
			"frost (cold)" : { name : "Frost Giant Bloodline", description : levels.map(function (n) { return LLdesc("I resist cold damage" + (n < 10 ? "" : "; my Rage bonus deals cold and my cold damage reduces the target's speed by 10 ft until my next turn")); }), dmgres : ["Cold"] },
			"fire (fire)" : { name : "Fire Giant Bloodline", description : levels.map(function (n) { return LLdesc("I resist fire damage" + (n < 10 ? "" : "; I can use Con instead of Dex for AC in armor; as a reaction when I take damage, a source within 30 ft takes my ED fire")); }), dmgres : ["Fire"] },
			"cloud (thunder)" : { name : "Cloud Giant Bloodline", description : levels.map(function (n) { return LLdesc("I resist thunder damage" + (n < 10 ? "" : "; I resist falling damage and can Dash or Disengage as a bonus action")); }), dmgres : ["Thunder"] },
			"storm (lightning)" : { name : "Storm Giant Bloodline", description : levels.map(function (n) { return LLdesc("I resist lightning damage" + (n < 10 ? "" : "; my hurl and mighty hurl deal lightning and targets have disadv. on their saves")); }), dmgres : ["Lightning"] }
		},
		"subclassfeature3.1" : LLPathExploits("Titanic", [[3, ["feat of strength", "hurl"]], [5, ["greater hurl", "shattering slam"]], [9, ["destructive slam"]]], LLBarbExpl),
		"subclassfeature3.2" : {
			name : "Titanic Rage",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var sSize = n < 10 ? "Large" : n < 18 ? "Huge" : "Gargantuan";
				var sDmg = n < 10 ? "1d8" : n < 18 ? "1d12" : "2d12";
				return LLdesc([
					"When I Rage, I can grow up to " + sSize + " (if there's room); my Rage damage becomes " + sDmg + " if I grow to that size",
					"While raging, I can use hurl at will without an Exploit Die and add my Rage damage to it" + (n < 10 ? "" : "; if Huge, also mighty hurl")
				]);
			})
		},
		"subclassfeature6" : {
			name : "Elder Vitality",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I Rage, I gain 10 temporary HP for each size I grow above Medium (Large 10, Huge 20, Gargantuan 30)")
		},
		"subclassfeature10" : {
			name : "Awakened Bloodline",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I gain the trait of my Giant Bloodline (see Giant Bloodline)")
		},
		"subclassfeature14" : {
			name : "Titanic Wrath",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As an action while raging, I make one melee weapon attack; on a hit, it's an automatic critical hit"),
			usages : "Str mod per ",
			usagescalc : "event.value = Math.max(1, What('Str Mod'));",
			recovery : "long rest",
			action : [["action", ""]]
		}
	}
});

// Warden spell list (Alternate Barbarian Expanded v2.3.0)
var LLWardenSpells = [
	// cantrips
	"beckon air", "control flame", "create bonfire", "druidcraft", "frostbite", "guidance", "magic stone", "mold earth", "primal savagery", "shape water", "shillelagh", "thorn whip", "thunderclap",
	// 1st
	"absorb elements", "armor of agathys", "compelled duel", "cure wounds", "earth tremor", "ensnaring strike", "entangle", "fog cloud", "hellish rebuke", "inflict wounds", "searing smite", "thunderous smite", "thunderwave",
	// 2nd
	"dust devil", "earthbind", "elemental blade", "gust of wind", "magic weapon", "shatter", "spike growth", "warding wind",
	// 3rd
	"elemental weapon", "plant growth", "grasping vine", "sleet storm", "thunder step", "tidal wave", "wall of sand", "wall of water", "wind wall",
	// 4th
	"control water", "pillars of earth", "fire shield", "guardian of nature", "ice storm", "staggering smite", "storm sphere"
];
AddSubClass("barbarian(laserllama)", "warden", {
	regExpSearch : /warden/i,
	subname : "Path of the Warden",
	fullname : "Warden",
	source : [["GMB:LL", 0]],
	abilitySave : 3,
	spellcastingFactor : "warlock99",
	spellcastingTable : [[0, 0, 0, 0, 0, 0, 0, 0, 0]].concat(levels.map(function (n) {
		var a = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		if (n < 3) return a;
		var nSlots = n < 5 ? 1 : 2;
		var nLvl = n < 7 ? 1 : n < 13 ? 2 : n < 19 ? 3 : 4;
		a[nLvl - 1] = nSlots;
		return a;
	})),
	spellcastingList : {
		spells : LLSpellList(LLWardenSpells)
	},
	spellcastingKnown : {
		cantrips : [0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		spells : [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
	},
	features : {
		"subclassfeature3" : {
			name : "Primal Magic",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I can cast Warden spells I know, using Constitution as my spellcasting ability",
				"All my slots are the same level; I regain them on a short or long rest",
				"When I gain a level, I can replace one Warden spell I know with another"
			]),
			additional : levels.map(function (n) {
				if (n < 3) return "";
				var nC = n < 10 ? 1 : 2;
				var nS = [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10][n - 1];
				var nSl = n < 5 ? 1 : 2;
				var sLvl = n < 7 ? "1st" : n < 13 ? "2nd" : n < 19 ? "3rd" : "4th";
				return nC + " cantrip" + (nC > 1 ? "s" : "") + ", " + nS + " spells; " + nSl + "\xD7 " + sLvl + "-level slot" + (nSl > 1 ? "s" : "");
			})
		},
		"subclassfeature3.1" : {
			name : "Primal Rage",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"I can cast and concentrate on Warden spells while raging" + (n < 14 ? ", but with disadv. on concentration saves" : ""),
					"Casting a Warden spell extends my Rage until the end of my next turn"
				]);
			})
		},
		"subclassfeature6" : {
			name : "Reckless Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I use Reckless Attack, I also have adv. on spell attack rolls with my Warden spells for its duration")
		},
		"subclassfeature6.1" : {
			name : "War Magic",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I use my action to cast a spell, I can make one weapon attack as a bonus action"),
			action : [["bonus action", " (after casting)"]]
		},
		"subclassfeature10" : {
			name : "Ward of the Ancients",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("As a reaction when I take damage from a spell, I expend a Primal Magic slot to reduce it by 2 Exploit Dice per slot level"),
			action : [["reaction", ""]]
		},
		"subclassfeature14" : {
			name : "Elder Warden",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("When I take the Attack action while raging, I can cast a 1-action Warden spell in place of one attack; I make concentration saves normally while raging")
		}
	}
});
LLAddSpellsToClass("warden(laserllama)", LLWardenSpells);

AddSubClass("barbarian(laserllama)", "wyrmblood", {
	regExpSearch : /wyrm ?blood/i,
	subname : "Path of the Wyrmblood",
	fullname : "Wyrmblood",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Wyrmblood", [[3, ["imposing presence", "ruthless strike"]], [5, ["intimidating command", "primal senses"]], [9, ["roar of triumph"]]], LLBarbExpl),
		"subclassfeature3.1" : (function () {
			var aDragons = [["Amethyst", "Force"], ["Black", "Acid"], ["Blue", "Lightning"], ["Brass", "Fire"], ["Bronze", "Lightning"], ["Copper", "Acid"], ["Crystal", "Radiant"], ["Emerald", "Psychic"], ["Gold", "Fire"], ["Green", "Poison"], ["Red", "Fire"], ["Sapphire", "Thunder"], ["Silver", "Cold"], ["Steel", "Acid"], ["Topaz", "Necrotic"], ["White", "Cold"]];
			var oFea = {
				name : "Draconic Ancestry",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : LLdesc("I choose a dragon and resist its Element; I learn Draconic; use the \"Choose Feature\" button above"),
				languageProfs : ["Draconic"],
				choices : []
			};
			for (var i = 0; i < aDragons.length; i++) {
				var sCh = aDragons[i][0] + " (" + aDragons[i][1].toLowerCase() + ")";
				oFea.choices.push(sCh);
				oFea[sCh.toLowerCase()] = {
					name : aDragons[i][0] + " Draconic Ancestry",
					description : LLdesc("I resist " + aDragons[i][1].toLowerCase() + " damage; my Element is " + aDragons[i][1].toLowerCase()),
					dmgres : [aDragons[i][1]]
				};
			}
			return oFea;
		})(),
		"subclassfeature3.2" : {
			name : "Draconic Fury",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"While raging: +2 AC while using Unarmored Defense; my Rage bonus and Savage Exploits deal my Element damage",
				"Once per turn when I hit with a Str-based weapon attack while raging, I roll two dice for my Rage damage"
			])
		},
		"subclassfeature6" : {
			name : "Tyrannical Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("While raging, I add my Exploit Die to Int, Wis, and Cha saves against magic"),
			savetxt : { text : ["+ED to Int/Wis/Cha saves vs. magic in rage"] }
		},
		"subclassfeature10" : {
			name : "Breath of the Dragon",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("As an action, creatures in an adjacent 30-ft cone make a Dex save or take 8d6 Element damage (half on save); after the free uses, I can expend a use of Rage"),
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "long rest",
			action : [["action", ""]]
		},
		"subclassfeature14" : {
			name : "Draconic Wings",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As a bonus action, I can manifest (or dismiss) draconic wings that give me a flying speed equal to my walking speed"),
			action : [["bonus action", " (manifest/dismiss)"]]
		}
	}
});

// ===================================================================================
// BARBARIC FEATS (Alternate Barbarian Expanded v2.3.0)
// ===================================================================================
FeatsList["alternate savage attacker"] = {
	name : "Alternate Savage Attacker",
	source : [["GMB:LL", 0]],
	descriptionFull : "Your savage battle instincts let you exploit even the smallest weakness. You gain the following benefits:\n \u2022 Piercing Critical. Whenever you score a critical hit with a melee weapon attack you roll the weapon's damage die three times instead of twice.\n \u2022 Savage Strikes. Once per turn when you hit with a melee weapon attack, you can roll all the damage dice that are part of your attack twice, and use the higher total.",
	description : "When I score a critical hit with a melee weapon attack, I roll the weapon's damage dice three times instead of twice. Once per turn when I hit with a melee weapon attack, I can roll all its damage dice twice and use the higher total.",
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.isMeleeWeapon && !v.isSpell) fields.Description += (fields.Description ? "; " : "") + "Crit: 3\xD7 weapon dice; reroll dmg 1/turn";
			},
			"My melee weapon criticals roll the weapon's damage dice three times; once per turn I can reroll all damage dice and use the higher total."
		]
	}
};
FeatsList["intimidating leader"] = {
	name : "Intimidating Leader",
	source : [["GMB:LL", 0]],
	prerequisite : "Proficiency in Intimidation",
	prereqeval : function (v) { return v.skillProfs.indexOf("Intimidation") !== -1; },
	descriptionFull : "You use fear and intimidation to rally those who follow you into battle. You gain the following benefits:\n \u2022 Ability Score Increase. You can increase your Strength, Constitution, or Charisma score by 1, to a maximum of 20.\n \u2022 Fearsome Rally. When another creature within 30 feet of you that can also see or hear you fails a saving throw to resist the Charmed or Frightened condition, you can use a reaction to make an Intimidation check against the same save DC. On a success, the creature is not Charmed or Frightened.\n   You can use this reaction a number of times equal to your Proficiency Bonus, and you regain all expended uses of this feature each time you finish a long rest.",
	description : "As a reaction when another creature that can see or hear me within 30 ft fails a save vs. being charmed or frightened, I can make an Intimidation check vs. the same DC; on a success, it isn't affected. [+1 Str, Con, or Cha]",
	scorestxt : "+1 Strength, Constitution, or Charisma",
	action : [["reaction", "Fearsome Rally"]],
	usages : "Proficiency bonus per ",
	usagescalc : "event.value = How('Proficiency Bonus');",
	recovery : "long rest"
};
FeatsList["hardy physique"] = {
	name : "Hardy Physique",
	source : [["GMB:LL", 0]],
	prerequisite : "Constitution 13 or higher",
	prereqeval : function (v) { return LLScore("Con") >= 13; },
	descriptionFull : "You have hardened your physical body to absorb hits rather than dodge them. You can use your Constitution, in place of Dexterity, when calculating your Armor Class in armor.\n   You also have advantage on saving throws to avoid being moved against your will, Grappled, or knocked Prone.",
	description : "I can use my Constitution instead of my Dexterity to calculate my AC in armor. I have advantage on saves to avoid being moved against my will, grappled, or knocked prone.",
	extraAC : {
		name : "Hardy Physique",
		mod : "max(Con-Dex|0)",
		text : "I can use my Constitution modifier instead of my Dexterity modifier for my AC in armor (armor limits still apply).",
		stopeval : function (v) { return !v.wearingArmor || v.heavyArmor; }
	},
	savetxt : { text : ["Adv. vs. being moved, grappled, or knocked prone"] }
};
FeatsList["legendary might"] = {
	name : "Legendary Might",
	source : [["GMB:LL", 0]],
	descriptionFull : "You have always found ways to leverage your great might for additional benefits. You gain the benefits on the table below that correspond to your Strength modifier and lower. Should your Strength modifier increase, the benefits that you gain from this Feat also increase with your modifier:\n \u2022 +1: You count as one size larger for the purpose of carrying capacity, the size of creatures you can Grapple, and the weight you can push, pull, lift, or drag at one time.\n \u2022 +2: You can make Strength (Intimidation) checks in place of Charisma (Intimidation) checks.\n \u2022 +3: You gain a climbing speed or a swimming speed equal to your walking speed.\n \u2022 +4: Whenever you make an Athletics check, you treat a d20 roll of 7 or lower as an 8.\n \u2022 +5: When you are forced to make a Constitution saving throw, you can choose to make a Strength saving throw instead.",
	description : "Benefits up to my Str mod: +1 one size larger for carrying/grappling/lifting; +2 Str (Intimidation); +3 climb or swim speed = walk; +4 Athletics d20 rolls of 7 or lower count as 8; +5 Str save instead of a Con save.",
	addMod : [{ type : "skill", field : "Intimidation", mod : "max(Str-Cha|0)", text : "Legendary Might (Str mod +2 or more): I can use Strength for Intimidation checks." }]
};
FeatsList["savage training"] = {
	name : "Savage Training",
	source : [["GMB:LL", 0]],
	descriptionFull : "You can draw upon the anger within your soul to perform Savage Exploits. You gain the following benefits:\n \u2022 Savage Exploits Known. You learn two 1st-degree Savage Exploits from those available to the Alternate Barbarian. If required, their Exploit save DC equals 8 + your Proficiency Bonus + your Strength or Dexterity modifier (your choice).\n \u2022 Retraining Exploits. Whenever you gain a level, you can replace one of the Savage Exploits you learned through this Feat with another 1st-degree Savage Exploit of your choice.\n \u2022 Exploit Dice. You gain two d4 Exploit Dice to fuel these Exploits, which are expended when you use them. You regain expended Exploit Dice when you finish a short or long rest.\n   If you already have Exploit Dice when you gain this Feat, you instead gain a single Exploit Die equal to your others.",
	description : "I learn two 1st-degree Savage Exploits (Str or Dex for the save DC) and gain two d4 Exploit Dice (one extra Exploit Die if I already have them), regained on a short rest. I can swap one of these Exploits when I gain a level.",
	eval : function () { LLExploitSheet("savage exploits", "Savage Exploits", 1); LLUpdateExploitDice(); },
	removeeval : function () { LLUpdateExploitDice("savage training"); },
	spellcastingBonusElsewhere : {
		addTo : "savage exploits",
		spellcastingBonus : {
			name : "Savage Training",
			spellcastingAbility : 1,
			spells : LLExploitList("barbarian(laserllama)", 1),
			times : 2
		}
	}
};
// Savage Training: two d4 Exploit Dice if the character has no other Exploit Dice, otherwise one extra die
if (LLExploitFeats.indexOf("savage training") === -1) LLExploitFeats.push("savage training");

// ======================================================================
// LaserLlama - Alternate Fighter v3.5.1.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Alternate Fighter" (with Expanded options)
	Effect:		This script adds the Alternate Fighter class, its 20 Warrior Archetypes and the Martial Feats.
				Alternate Fighter v3.5.1 and Alternate Fighter Expanded v3.5.1 by Laserllama (GM Binder, Fan Content policy)
				Martial Exploits and Fighting Styles are defined in the Common Attributes file.
	Sheet:		v13.2.3
	Code by:	Original scripts by CalypsoMoonlace and Valentino dell'Eco; updated to v3.5.1 in the "ll-updates" release (2026/10/19)
	How to use:	Write "Fighter (LaserLlama)" in the Class field (e.g. "Champion Fighter (LaserLlama)")
*/


if (typeof LLExploitFeature !== "function" || !SpellsList["arresting strike"] || !SpellsList["arresting strike"].isExploit) {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

if (ClassList["fighter"]) ClassList["fighter"].regExpSearch = /^(?=.*fighter)(?!.*laserllama).*$/i;

LLExploitTables["fighter(laserllama)"] = {
	cls : "fighter(laserllama)",
	factor : 1,
	dice : [0, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6],
	die : ["", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12"]
};
// Bonus Exploit Dice: Superior Technique Fighting Style and Master at Arms (Student of Battle)
LLExploitBonusDice["fighter(laserllama) extras"] = function (sSkip) {
	if (sSkip === "fighter(laserllama)") return 0;
	var oCl = classes.known["fighter(laserllama)"];
	if (!oCl) return 0;
	var n = 0;
	if (oCl.level >= 3 && oCl.subclass === "fighter(laserllama)-master at arms") n += 1;
	var aFS = GetFeatureChoice("classes", "fighter(laserllama)", "fighting style", true);
	if (aFS.indexOf("superior technique") !== -1) n += 1;
	return n;
};
// Master at Arms: the Exploit Dice become d8 (d10 at 5th, d12 at 11th)
LLFighterDie = function (lvl) {
	var oCl = classes.known["fighter(laserllama)"];
	var bMaA = oCl && oCl.subclass === "fighter(laserllama)-master at arms" && lvl >= 3;
	if (bMaA) return lvl < 5 ? "d8" : lvl < 11 ? "d10" : "d12";
	return LLExploitTables["fighter(laserllama)"].die[Math.min(20, Math.max(1, lvl)) - 1];
};
var LLFtrExpl = { cls : "fighter(laserllama)", sheet : "martial exploits", sheetName : "Martial Exploits", ability : 1 };
var LLFtrLvl = function () { return classes.known["fighter(laserllama)"] ? classes.known["fighter(laserllama)"].level : 0; };

ClassList["fighter(laserllama)"] = {
	name : "Fighter (LaserLlama)",
	regExpSearch : /^(?=.*fighter)(?=.*laserllama).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Strength or Dexterity",
	prereqs : "Strength 13 or Dexterity 13",
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6],
	saves : ["Str", "Con"],
	skillstxt : {
		primary : "Choose two from Acrobatics, Animal Handling, Athletics, History, Intimidation, Perception, Stealth, and Survival"
	},
	toolProfs : {
		primary : [["Artisan's tools", 1]]
	},
	armorProfs : {
		primary : [true, true, true, true],
		secondary : [true, true, false, true]
	},
	weaponProfs : {
		primary : [true, true],
		secondary : [true, true]
	},
	equipment : "Fighter (LaserLlama) starting equipment:" +
		"\n \u2022 Chain mail -or- leather armor, a longbow, and 20 arrows;" +
		"\n \u2022 A martial weapon and a shield -or- two martial weapons;" +
		"\n \u2022 A light crossbow and 20 bolts -or- two handaxes;" +
		"\n \u2022 A dungeoneer's pack -or- an explorer's pack." +
		"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Warrior Archetype", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"fighting style" : LLAddFightingStyles({
			name : "Fighting Style",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I learn Fighting Styles (I must meet their prerequisites); use the \"Choose Feature\" button above",
				"Expert Fighting Styles need 6th level and the base Style; I can replace one Style when I gain a level"
			]),
			extraname : "Fighting Style",
			extraTimes : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4]
		}, LLFightingStyleLists["fighter"].concat(LLFightingStyleLists["fighter experts"]), true),
		"second wind" : {
			name : "Second Wind",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("As a bonus action, I regain 1d10 + fighter level HP"),
			additional : levels.map(function (n) { return "1d10+" + n; }),
			usages : levels.map(function (n) { return n < 14 ? 1 : 2; }),
			recovery : "short rest",
			action : [["bonus action", ""]]
		},
		"martial exploits" : LLExploitFeature({
			name : "Martial Exploits",
			minlevel : 2,
			cls : "fighter(laserllama)",
			sheet : "martial exploits",
			sheetName : "Martial Exploits",
			ability : 1,
			extraTimes : levels.map(function (n) { return [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11][n - 1]; }),
			description : LLdesc([
				"I know Martial Exploits fueled by my Exploit Dice; use one Exploit per attack, check, or save",
				"Use the \"Choose Feature\" button above to select Exploits; I can swap one when I gain a level",
				"Tactical Skill: I can add an Exploit Die to a check with a skill or tool I'm proficient in (after rolling)"
			])
		}),
		"exploit dice" : LLExploitDiceFeature("fighter(laserllama)", 2, "Fighter (LaserLlama)"),
		"eye for talent" : {
			name : "Eye for Talent",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"As a bonus action, I Search one creature within 30 ft (DC 8 + its CR); if I hit it in the last minute, I add my fighter level",
				"Success: I learn AC, highest/lowest ability, senses, resistances/immunities/vulnerabilities, or one trait/action",
				"Failure: I can't use it on that creature again until a long rest or I hit it with a weapon attack"
			]),
			action : [["bonus action", ""]]
		},
		"subclassfeature3" : {
			name : "Warrior Archetype",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"Choose a Warrior Archetype and put it in the \"Class\" field; Archetype features use my Exploit save DC",
				"Archetype Exploits don't count against my Exploits Known; I learn them even without the prerequisites"
			])
		},
		"extra attack" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : levels.map(function (n) {
				return LLdesc([
					"I can attack " + (n < 11 ? "twice" : n < 17 ? "three times" : "four times") + " instead of once whenever I take the Attack action on my turn",
					"If I use my action to Dash or Disengage, I can make one weapon attack as a bonus action"
				]);
			}),
			action : [["bonus action", "Weapon Attack (after Dash/Disengage)"]]
		},
		"action surge" : {
			name : "Action Surge",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("Once during my turn, I can take one additional action (only once per turn)"),
			usages : levels.map(function (n) { return n < 6 ? "" : n < 20 ? 1 : 2; }),
			recovery : "short rest"
		},
		"indomitable" : {
			name : "Indomitable",
			source : [["GMB:LL", 0]],
			minlevel : 9,
			description : LLdesc("When I fail a saving throw, I can choose to succeed instead"),
			usages : levels.map(function (n) { return n < 9 ? "" : n < 13 ? 1 : n < 17 ? 2 : 3; }),
			recovery : "long rest"
		},
		"martial superiority" : {
			name : "Martial Superiority",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("Once per round in combat, I can use a 1st- or 2nd-degree Martial Exploit I know without expending an Exploit Die")
		},
		"relentless" : {
			name : "Relentless",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc([
				"Each time I roll initiative, I regain all expended Exploit Dice",
				"I can use 3rd-degree Martial Exploits I know without limit (still expending Exploit Dice)"
			])
		}
	}
};

// ===================================================================================
// WARRIOR ARCHETYPES (Alternate Fighter v3.5.1)
// ===================================================================================
var LLArcaneKnightSpells = [
	"blade ward", "booming blade", "green-flame blade", "light", "lightning lure", "mage hand", "prestidigitation", "resistance", "shocking grasp", "sword burst", "tempestuous blade", "true strike",
	"absorb elements", "armor of agathys", "chromatic orb", "compelled duel", "faerie fire", "feather fall", "fog cloud", "grease", "hellish rebuke", "jump", "mage armor", "magic missile", "protection from good & evil", "searing smite", "shield", "thunderous smite", "zephyr strike",
	"aura of frost", "blur", "branding smite", "darkness", "enlarge/reduce", "invisibility", "magic weapon", "misty step", "spider climb", "warding wind",
	"blinding smite", "counterspell", "dispel magic", "fireball", "flame arrows", "fly", "lightning arrow", "minute meteors", "protection from energy", "thunder step",
	"banishment", "death ward", "dimension door", "fire shield", "greater invisibility", "resilient sphere", "staggering smite"
];
AddSubClass("fighter(laserllama)", "arcane knight", {
	regExpSearch : /^(?=.*arcane)(?=.*knight).*$/i,
	subname : "Arcane Knight",
	fullname : "Arcane Knight",
	source : [["GMB:LL", 0]],
	abilitySave : 4,
	spellcastingFactor : "arcaneknightll1",
	spellcastingTable : [[0, 0, 0, 0, 0, 0, 0, 0, 0]].concat([
		[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 0, 0, 0, 0, 0, 0, 0, 0], [4, 2, 0, 0, 0, 0, 0, 0, 0], [4, 2, 0, 0, 0, 0, 0, 0, 0], [4, 2, 0, 0, 0, 0, 0, 0, 0], [4, 3, 0, 0, 0, 0, 0, 0, 0],
		[4, 3, 0, 0, 0, 0, 0, 0, 0], [4, 3, 0, 0, 0, 0, 0, 0, 0], [4, 3, 2, 0, 0, 0, 0, 0, 0], [4, 3, 2, 0, 0, 0, 0, 0, 0], [4, 3, 2, 0, 0, 0, 0, 0, 0],
		[4, 3, 3, 0, 0, 0, 0, 0, 0], [4, 3, 3, 0, 0, 0, 0, 0, 0], [4, 3, 3, 0, 0, 0, 0, 0, 0], [4, 3, 3, 1, 0, 0, 0, 0, 0], [4, 3, 3, 1, 0, 0, 0, 0, 0]
	]),
	spellcastingList : {
		spells : LLSpellList(LLArcaneKnightSpells)
	},
	spellcastingKnown : {
		cantrips : [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		spells : [0, 0, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12]
	},
	features : {
		"subclassfeature3" : {
			name : "Enchanted Armaments",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"With a 1-hour ritual (can be during a rest), I bond with up to two weapons or shields",
				"While on my plane, I can conjure and don one or both as a bonus action; I can't be disarmed of them",
				"I can use them as spellcasting focus for my Arcane Knight spells"
			]),
			action : [["bonus action", " (conjure)"]]
		},
		"subclassfeature3.1" : {
			name : "Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I can cast Arcane Knight spells I know, using Intelligence as my spellcasting ability",
				"When I gain a level, I can replace a spell I know with another I have spell slots for"
			]),
			additional : levels.map(function (n) {
				if (n < 3) return "";
				return (n < 10 ? 2 : 3) + " cantrips & " + [0, 0, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12][n - 1] + " spells known";
			})
		},
		"subclassfeature7" : {
			name : "War Magic",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When I use my action to cast a spell, I can make one weapon attack as a bonus action"),
			action : [["bonus action", " (after casting)"]]
		},
		"subclassfeature10" : {
			name : "Enchanted Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"When I hit with an Enchanted Armament, the target has disadv. on its first save vs. my Arcane Knight spells before the end of my next turn",
				"On a hit, I can change its damage type to that of an Arcane Knight spell I know"
			])
		},
		"subclassfeature15" : {
			name : "Arcane Surge",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I use Action Surge, I can teleport up to 30 ft to a space I can see, before or after the additional action")
		},
		"subclassfeature18" : {
			name : "Legendary Arcane Knight",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("When I take the Attack action, I can cast a 1-action Arcane Knight spell in place of one attack")
		}
	}
});

AddSubClass("fighter(laserllama)", "captain", {
	regExpSearch : /captain/i,
	subname : "Captain",
	fullname : "Captain",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Captain", [[3, ["attack order", "defensive order"]], [5, ["enlivening order", "surprise attack"]], [9, ["tactical reposition"]]], { cls : "fighter(laserllama)", sheet : "tactical exploits", sheetName : "Tactical Exploits", ability : 4 }),
		"subclassfeature3.1" : {
			name : "Leadership",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"My Captain Exploits are Tactical Exploits of the Warlord; I can swap one for another of the same degree when I gain a level",
				"I choose Int, Wis, or Cha as my Leadership modifier; Leadership save DC = 8 + Prof Bonus + Leadership mod"
			])
		},
		"subclassfeature3.2" : {
			name : "Student of War",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Deception, History, Insight, or Persuasion; I add my Exploit Die to checks with it"),
			skillstxt : "Choose one from Deception, History, Insight, or Persuasion"
		},
		"subclassfeature7" : {
			name : "Strategic Command",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When I use Second Wind, up to 3 other creatures within 30 ft that see or hear me regain Leadership mod (min 1) + Exploit Die HP")
		},
		"subclassfeature10" : {
			name : "Heroic Surge",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : levels.map(function (n) {
				return LLdesc("When I use Action Surge, " + (n < 18 ? "another creature" : "up to two creatures") + " within 30 ft that see/hear me can use their reaction to move up to their speed (no OAs) and make one weapon attack");
			})
		},
		"subclassfeature15" : {
			name : "Inspiring Commands",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Once per turn when I use a Tactical Exploit that targets an ally, one target gains temp HP equal to my Leadership mod")
		},
		"subclassfeature18" : {
			name : "Legendary Captain",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("At the end of a long rest, I can replace any number of Captain Exploits with Tactical Exploits of the same degree; Heroic Surge targets two")
		}
	}
});

AddSubClass("fighter(laserllama)", "champion", {
	regExpSearch : /champion/i,
	subname : "Champion",
	fullname : "Champion",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Champion", [[3, ["feat of strength", "heroic fortitude"]], [5, ["concussive blow", "martial focus"]], [9, ["mythic athleticism"]]], LLFtrExpl),
		"subclassfeature3.1" : {
			name : "Mighty Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) { return LLdesc("My weapon attacks score a critical hit on a roll of " + (n < 15 ? "19-20" : "18-20")); }),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.isSpell || v.isDC || !classes.known["fighter(laserllama)"]) return;
						var crit = classes.known["fighter(laserllama)"].level < 15 ? 19 : 18;
						if (!v.CritChance || v.CritChance > crit) {
							fields.Description += (fields.Description ? "; " : "") + "Crit on " + crit + "-20";
							v.CritChance = crit;
						}
					},
					"My weapon attacks score a critical hit on a 19-20 (18-20 from 15th level).",
					19
				]
			}
		},
		"subclassfeature3.2" : {
			name : "Peak Athlete",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Athletics (or another Fighter skill if I had it) and climbing and swimming speeds equal to my walking speed"),
			skills : ["Athletics"],
			speed : { climb : { spd : "walk", enc : "walk" }, swim : { spd : "walk", enc : "walk" } }
		},
		"subclassfeature7" : {
			name : "Remarkable Strength",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("On Str/Con checks or saves, I can use feat of strength or heroic fortitude without an Exploit Die (feat of strength counts as 1 die spent)")
		},
		"subclassfeature10" : {
			name : "Devastating Critical",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : levels.map(function (n) {
				return LLdesc(["When I score a critical hit with a weapon attack, I deal bonus damage equal to my fighter level"].concat(n < 15 ? [] : ["Once per long rest, I can maximize the damage of a weapon critical hit instead of rolling"]));
			}),
			usages : levels.map(function (n) { return n < 15 ? "" : 1; }),
			recovery : "long rest",
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && !v.isDC && classes.known["fighter(laserllama)"] && classes.known["fighter(laserllama)"].level >= 10) {
							fields.Description += (fields.Description ? "; " : "") + "+" + classes.known["fighter(laserllama)"].level + " dmg on crit";
						}
					},
					"My weapon critical hits deal bonus damage equal to my fighter level."
				]
			}
		},
		"subclassfeature18" : {
			name : "Legendary Champion",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("If I start my turn with less than half my HP (but at least 1), I regain 5 + Con mod HP")
		}
	}
});

AddSubClass("fighter(laserllama)", "knight errant", {
	regExpSearch : /^(?=.*knight)(?=.*errant).*$/i,
	subname : "Knight Errant",
	fullname : "Knight Errant",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Knight Errant", [[3, ["shield impact", "skilled rider"]], [5, ["defensive stance", "honor duel"]], [9, ["mythic resilience"]]], LLFtrExpl),
		"subclassfeature3.1" : {
			name : "Courtly Pedigree",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I learn one language and gain proficiency in Animal Handling, History, Insight, or Persuasion"),
			languageProfs : [1],
			skillstxt : "Choose one from Animal Handling, History, Insight, or Persuasion"
		},
		"subclassfeature3.2" : {
			name : "Chivalric Mark",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					(n < 10 ? "Once per turn when I hit a creature with a melee weapon attack, I can Mark it until the end of my next turn" : "Every creature I hit with a melee weapon is Marked until the end of my next turn"),
					"It has disadv. on attacks vs. others than me while I'm within " + (n < 10 ? "10" : "30") + " ft of it",
					"If it deals damage to another target, I can use my reaction to make a melee weapon attack against it"
				]);
			}),
			action : [["reaction", " (attack Mark)"]]
		},
		"subclassfeature3.3" : {
			name : "Trained Knight",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I can't be knocked off a mount against my will; mounting or dismounting costs me only 5 ft of movement")
		},
		"subclassfeature7" : {
			name : "Noble Guardian",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"As a reaction when I or a creature within 5 ft is hit, I add my Exploit Die to its AC against that attack",
				"If it still hits, I can expend an Exploit Die to give the target resistance to its damage"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature10" : {
			name : "Unyielding Knight",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Every creature I hit with a melee weapon is Marked; Marked creatures have disadv. on attacks vs. others than me while I'm within 30 ft")
		},
		"subclassfeature15" : {
			name : "Perilous Charge",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Once per turn, after moving 10 ft in a straight line and hitting with a melee weapon: Str save (disadv. if I'm mounted) or +1 ED damage and prone")
		},
		"subclassfeature18" : {
			name : "Legendary Knight Errant",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I gain a special reaction once per turn, only for opportunity attacks, attacks vs. my Mark, or Noble Guardian")
		}
	}
});

AddSubClass("fighter(laserllama)", "marksman", {
	regExpSearch : /marksman/i,
	subname : "Marksman",
	fullname : "Marksman",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Marksman", [[3, ["arresting strike", "precision strike"]], [5, ["martial focus", "volley"]], [9, ["thunderous shot"]]], LLFtrExpl),
		"subclassfeature3.1" : {
			name : "Deadly Focus",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"When I start my turn not surprised or incapacitated, I can enter Focus until the end of my turn:",
					"My speed is " + (n < 18 ? "0" : "10 ft") + "; " + (n < 18 ? "until I hit with a ranged weapon attack, I have adv. on ranged weapon attacks" : "I have adv. on all ranged weapon attacks"),
					"I can reroll 1s and 2s on the damage dice of my ranged weapon attacks (must use the new roll)"
				]);
			})
		},
		"subclassfeature3.2" : {
			name : "Elite Reflexes",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I add my Exploit Die to my Dexterity checks and Dexterity saving throws"),
			savetxt : { text : ["+Exploit Die to Dex saves"] }
		},
		"subclassfeature7" : {
			name : "Quick Shot",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("I add my Prof Bonus to initiative; when I roll initiative and am not surprised, I can use my reaction to make one ranged weapon attack"),
			addMod : [{ type : "skill", field : "Init", mod : "Prof", text : "Quick Shot: I add my Proficiency Bonus to initiative rolls." }],
			action : [["reaction", " (on initiative)"]]
		},
		"subclassfeature10" : {
			name : "Tactical Reposition",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I use Second Wind, I gain the benefits of Disengage and +10 ft speed until the end of my turn")
		},
		"subclassfeature15" : {
			name : "Reliable Shot",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc([
				"The normal and long range of my ranged weapon attacks increase by 10\xD7 my fighter level in ft",
				"Once per turn when I have adv. on a ranged weapon attack, I can forgo it to make one additional ranged weapon attack"
			])
		},
		"subclassfeature18" : {
			name : "Legendary Marksman",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("During Deadly Focus, my speed is 10 ft and I have adv. on all my ranged weapon attacks")
		}
	}
});

AddSubClass("fighter(laserllama)", "master at arms", {
	regExpSearch : /^(?=.*master)(?=.*arms).*$/i,
	subname : "Master at Arms",
	fullname : "Master at Arms",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLAddFightingStyles({
			name : "Advanced Technique",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I learn an additional Fighting Style; it doesn't count against my Fighting Styles; use \"Choose Feature\""),
			extraname : "Advanced Technique",
			extraTimes : levels.map(function (n) { return n < 3 ? 0 : 1; })
		}, LLFightingStyleLists["fighter"].concat(LLFightingStyleLists["fighter experts"]), true),
		"subclassfeature3.1" : {
			name : "Combat Theorist",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in History; I add my Exploit Die to History checks about combat, warfare, or armaments"),
			skills : ["History"]
		},
		"subclassfeature3.2" : (function () {
			var oFea = LLExploitFeature({
				name : "Student of Battle",
				minlevel : 3,
				cls : "fighter(laserllama)",
				sheet : "martial exploits",
				sheetName : "Martial Exploits",
				ability : 1,
				notesTitle : "Student of Battle Exploits",
				bonusName : "Student of Battle",
				extraname : "Student of Battle Exploit",
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 5 ? 2 : n < 9 ? 4 : 5; }),
				description : levels.map(function (n) {
					return LLdesc([
						"I learn bonus Martial Exploits: two of 1st degree, two of 2nd degree at 5th level, one of 3rd at 9th level",
						"+1 Exploit Die and my Exploit Dice are " + (n < 5 ? "d8s" : n < 11 ? "d10s" : "d12s") + " (see the Limited Features)"
					]);
				})
			});
			// level limits of the bonus Exploits
			for (var i = 0; i < oFea.extrachoices.length; i++) {
				var oCh = oFea[oFea.extrachoices[i].toLowerCase()];
				if (!oCh) continue;
				oCh.prereqeval = (function (sName) {
					return function (v) {
						var oSp = SpellsList[sName.toLowerCase()];
						var lvl = LLFtrLvl();
						var nMax = lvl < 5 ? 1 : lvl < 9 ? 2 : 3;
						return oSp ? oSp.level <= nMax : false;
					};
				})(oFea.extrachoices[i]);
			}
			return oFea;
		})(),
		"subclassfeature7" : (function () {
			// Master of Forms: Exploits from any class's Exploit list
			var aList = [];
			for (var sSp in SpellsList) { if (SpellsList[sSp].isExploit) aList.push(sSp); }
			aList.sort();
			var oFea = {
				name : "Master of Forms",
				source : [["GMB:LL", 0]],
				minlevel : 7,
				description : LLdesc("I learn two Exploits from any class's Exploit list (one more at 15th and 18th level); my fighter level counts for their level prerequisite"),
				extraname : "Master of Forms Exploit",
				extrachoices : [],
				extraTimes : levels.map(function (n) { return n < 7 ? 0 : n < 15 ? 2 : n < 18 ? 3 : 4; })
			};
			var oOpt = { cls : "fighter(laserllama)", sheet : "martial exploits", sheetName : "Martial Exploits", ability : 1, notesTitle : "Master of Forms", bonusName : "Master of Forms" };
			for (var i = 0; i < aList.length; i++) {
				var sName = SpellsList[aList[i]].name;
				oFea.extrachoices.push(sName);
				oFea[sName.toLowerCase()] = LLExploitChoice(aList[i], oOpt);
			}
			return oFea;
		})(),
		"subclassfeature10" : {
			name : "Masterful Focus",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Whenever I use Second Wind or Action Surge, I also regain one expended Exploit Die")
		},
		"subclassfeature15" : {
			name : "Warrior Savant",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("During each short or long rest, I can replace one Exploit I know with another Martial Exploit I meet the prerequisites for")
		},
		"subclassfeature18" : {
			name : "Legendary Superiority",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I regain one expended Exploit Die at the start of each of my turns in combat, unless I'm incapacitated")
		}
	}
});

var LLMysticFighterSpells = [
	"catapult", "cause fear", "charm person", "command", "dissonant whispers", "ethereal anchor", "hideous laughter", "id insinuation", "jump", "magic missile", "shield", "sleep",
	"blindness/deafness", "blur", "calm emotions", "crown of madness", "detect thoughts", "levitate", "mind spike", "mind whip", "mirror image", "mystic spear", "phantasmal force", "suggestion",
	"blink", "cerebral blast", "clairvoyance", "enemies abound", "fear", "feign death", "hypnotic pattern", "intellect fortress", "major image", "nondetection", "sending", "slow", "spectral passage", "tongues", "water walk",
	"arcane eye", "charm monster", "compulsion", "confusion", "dimension door", "ego scourge", "freedom of movement", "phantasmal killer", "resilient sphere"
];
AddSubClass("fighter(laserllama)", "mystic", {
	regExpSearch : /mystic/i,
	subname : "Mystic",
	fullname : "Mystic",
	source : [["GMB:LL", 0]],
	abilitySave : 4,
	features : {
		"subclassfeature3" : {
			name : "Psionics",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var sLim = n < 7 ? "1st" : n < 13 ? "2nd" : n < 19 ? "3rd" : "4th";
				return LLdesc([
					"I manifest Mystic spells I know with Psi Points (1 per spell level); Intelligence is my spellcasting ability",
					"My Mental Limit is " + sLim + " level: I can't learn or manifest spells of a higher level",
					"My mind is my focus; I regain all Psi Points on a short or long rest; I can swap a spell when I gain a level"
				]);
			}),
			limfeaname : "Psi Points",
			usages : [0, 0, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7],
			recovery : "short rest",
			additional : levels.map(function (n) { return n < 3 ? "" : [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10][n - 1] + " spells known"; }),
			spellcastingBonus : [{
				name : "Mystic Psionics",
				spells : LLSpellList(LLMysticFighterSpells),
				spellcastingAbility : 4,
				times : [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
			}]
		},
		"subclassfeature3.1" : LLMysticTalentsFeature({
			name : "Psionic Talents",
			minlevel : 3,
			cls : "fighter(laserllama)",
			feature : "subclassfeature3.1",
			extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 7 ? 2 : n < 15 ? 3 : n < 18 ? 4 : 5; }),
			description : LLdesc([
				"I unlock Mystic Talents of the Psion; my fighter level counts for their Psion level prerequisites",
				"Spells I learn through a Talent are Mystic spells for me (Intelligence); use \"Choose Feature\""
			])
		}),
		"subclassfeature7" : {
			name : "Phase Step",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : levels.map(function (n) {
				return LLdesc([
					"When I use Second Wind, I gain the benefits of Dash and can move through nonmagical objects and creatures as difficult terrain until the end of my turn" + (n < 18 ? "" : "; I also gain a flying speed equal to my walking speed"),
					"If I end inside an object or creature, I'm shunted to the nearest free space and take 1d10 force damage per 5 ft moved"
				]);
			})
		},
		"subclassfeature10" : {
			name : "Inscrutable Mind",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I have resistance to psychic damage; I add my Exploit Die to Int, Wis, and Cha saving throws"),
			dmgres : ["Psychic"],
			savetxt : { text : ["+Exploit Die to Int/Wis/Cha saves"] }
		},
		"subclassfeature15" : {
			name : "Mental Ward",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("As a bonus action, I spend 5 Psi Points: for 1 minute, creatures of my choice within 30 ft gain the benefits of Inscrutable Mind"),
			action : [["bonus action", " (5 PP)"]]
		},
		"subclassfeature18" : {
			name : "Legendary Mystic",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I learn telekinesis (doesn't count against spells known); once per long rest it costs no Psi Points, then 5 PP; Phase Step also gives a flying speed"),
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : [{
				name : "Legendary Mystic",
				spells : ["telekinesis"],
				selection : ["telekinesis"],
				spellcastingAbility : 4,
				firstCol : "oncelr"
			}]
		}
	}
});

AddSubClass("fighter(laserllama)", "ronin", {
	regExpSearch : /ronin/i,
	subname : "Ronin",
	fullname : "Ronin",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : {
			name : "Exiled Courtier",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc("I learn one language and gain proficiency in History, Insight, Performance, or Persuasion" + (n < 7 ? "" : "; I add my Exploit Die to checks with that skill (Lordly Bearing)"));
			}),
			languageProfs : [1],
			skillstxt : "Choose one from History, Insight, Performance, or Persuasion"
		},
		"subclassfeature3.1" : LLPathExploits("Ronin", [[3, ["imposing presence", "ruthless strike"]], [5, ["heroic will", "honor duel"]], [9, ["heroic focus"]]], LLFtrExpl),
		"subclassfeature3.2" : {
			name : "Unyielding Spirit",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I gain adv. on weapon attacks and ignore exhaustion until the end of my turn, and gain temp HP equal to my fighter level",
					"I can use it once per short rest without drawback; each additional use gives me 1 level of exhaustion at the end of that turn"
				].concat(n < 10 ? [] : ["Unrelenting: when I roll initiative with no uses left, I regain one; a short rest reduces my exhaustion by 1"]));
			}),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", ""]]
		},
		"subclassfeature7" : {
			name : "Lordly Bearing",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("I add my Exploit Die to checks with my Exiled Courtier skill; I gain proficiency in Wisdom saves (or Cha/Int if I have it)"),
			saves : ["Wis"]
		},
		"subclassfeature10" : {
			name : "Unrelenting",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I roll initiative with no uses of Unyielding Spirit left, I regain one; each short rest reduces my exhaustion by 1")
		},
		"subclassfeature15" : {
			name : "Swift Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Once per turn when I have adv. on a weapon attack, I can forgo it to make one additional weapon attack vs. that creature")
		},
		"subclassfeature18" : {
			name : "Legendary Ronin",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"When reduced to 0 HP, I can immediately take an extra turn at 0 HP (damage causes death save failures)",
				"At its end I fall unconscious, and die if I gained three failures; after the free use, I can expend an Action Surge"
			]),
			usages : 1,
			recovery : "long rest"
		}
	}
});

var LLRunes = {
	"cloud rune" : { name : "Cloud Rune", description : LLdesc("The wielder knows mighty leap; Invoke: as a reaction when I or a creature I see within 30 ft is targeted by an attack, redirect it to another target in reach (not the attacker)") },
	"fire rune" : { name : "Fire Rune", description : LLdesc("The wielder knows imposing presence; Invoke: on a melee hit, +2 ED fire and Str save or restrained 1 min (2 ED fire at the start of its turns; save as action)") },
	"frost rune" : { name : "Frost Rune", description : LLdesc("The wielder knows arresting strike; Invoke (bonus action, also with Runic Might): +10 ft speed and +ED to Str and Con checks and saves for 10 min") },
	"stone rune" : { name : "Stone Rune", description : LLdesc("The wielder knows feint; Invoke: as a reaction when a creature I see ends its turn within 30 ft, Wis save or speed 0 and incapacitated for 1 min (save each turn)") },
	"hill rune" : { name : "Hill Rune", prerequisite : "7th-level Fighter", prereqeval : function (v) { return LLFtrLvl() >= 7; }, description : LLdesc("The wielder knows mighty thrust; Invoke (bonus action, also with Runic Might): resistance to bludgeoning, piercing, and slashing for 1 min") },
	"storm rune" : { name : "Storm Rune", prerequisite : "7th-level Fighter", prereqeval : function (v) { return LLFtrLvl() >= 7; }, description : LLdesc("The wielder knows mighty leap; Invoke (bonus action, concentration): for 1 min, as a reaction I add or subtract my ED from a roll of a creature within 60 ft") }
};
AddSubClass("fighter(laserllama)", "runecarver", {
	regExpSearch : /rune ?carver/i,
	subname : "Runecarver",
	fullname : "Runecarver",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : (function () {
			var oFea = {
				name : "Rune Carving",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : LLdesc([
					"I learn Giant and proficiency with mason's tools; I know Runes (use \"Choose Feature\"); I can swap one each level",
					"In 1 hour (can be during a rest) I inscribe a Rune on an object; its wielder gains its benefits",
					"Invoke: only I can, once per short rest each; Runic Exploits can be used once per turn without an Exploit Die"
				]),
				languageProfs : ["Giant"],
				toolProfs : ["Mason's tools"],
				extraname : "Rune",
				extrachoices : [],
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 7 ? 2 : n < 10 ? 3 : n < 15 ? 4 : n < 18 ? 5 : 6; })
			};
			for (var sR in LLRunes) {
				oFea.extrachoices.push(LLRunes[sR].name);
				oFea[sR] = LLRunes[sR];
			}
			return oFea;
		})(),
		"subclassfeature3.1" : {
			name : "Runic Might",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, for 1 minute: I grow to " + (n < 18 ? "Large" : "Large or Huge (+5 ft reach if Huge)") + ", adv. on Str checks and saves, and +1 ED damage once per turn on a melee weapon hit",
					"It ends if I revert as a bonus action or I'm incapacitated; when out of uses, I can expend a use of Second Wind"
				]);
			}),
			usages : 1,
			recovery : "long rest",
			action : [["bonus action", ""]]
		},
		"subclassfeature7" : {
			name : "Runic Ward",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("As a reaction when a target I see within 30 ft is hit, I add my Con mod (min +1) to its AC; when out of uses, I can Invoke a Rune instead"),
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature10" : {
			name : "Unyielding Fortitude",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I have adv. on saves vs. being moved against my will, poisoned, stunned, or knocked prone"),
			savetxt : { adv_vs : ["moved", "poisoned", "stunned", "prone"] }
		},
		"subclassfeature15" : {
			name : "Elder Insight",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I have no uses of a Rune left, I can expend an Exploit Die to Invoke it once more (once per Rune per short rest)")
		},
		"subclassfeature18" : {
			name : "Legendary Rune Lord",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("With Runic Might I can grow to Huge size if there is room; while Huge, my reach increases by 5 ft")
		}
	}
});

AddSubClass("fighter(laserllama)", "shadowdancer", {
	regExpSearch : /shadow ?dancer/i,
	subname : "Shadowdancer",
	fullname : "Shadowdancer",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Shadowdancer", [[3, ["feint", "sweeping strike"]], [5, ["crippling strike", "whirlwind strike"]], [9, ["disorienting blow"]]], LLFtrExpl),
		"subclassfeature3.1" : {
			name : "Conjure Shade",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I conjure " + (n < 18 ? "a Shade" : "one or two Shades") + " of myself within 15 ft (see Notes page); it lasts until destroyed or dismissed",
					"On my turn I can telepathically move it; it's destroyed if more than 30 ft from me at the end of my turn",
					"With the Attack action, each attack can originate from me or a Shade, with all my benefits"
				]);
			}),
			action : [["bonus action", " (conjure/dismiss)"]],
			toNotesPage : [{
				name : "Shade",
				note : [
					"Undead (my size), Unaligned; AC 14 + my Cha mod; HP 1; Speed 30 ft; immune to all conditions",
					"Dark Bond: it uses my saving throw bonuses",
					"Incorporeal Echo: no physical presence, but its space is difficult terrain; it can't interact with objects or magic items",
					"Umbral Sentinel: if a creature provokes an opportunity attack from it, I can use my reaction to make one from its space"
				]
			}]
		},
		"subclassfeature3.2" : {
			name : "Dance of Shadows",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc("As an " + (n < 15 ? "action" : "action or bonus action") + ", I switch places with a Shade within 30 ft (no opportunity attacks)" + (n < 7 ? "" : "; then I can make one attack from me or a Shade"));
			}),
			action : [["action", ""]]
		},
		"subclassfeature7" : {
			name : "Transfer Consciousness",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("As an action, I expend a Second Wind to control my Shade for 10 min (body unconscious); it can go up to 1 mile away; ends if destroyed or with an action"),
			action : [["action", ""]]
		},
		"subclassfeature10" : {
			name : "Dark Sacrifice",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("As a reaction when a creature within 10 ft of my Shade is hit, the Shade intercepts: the damage is reduced by my fighter level; the Shade is destroyed"),
			action : [["reaction", ""]]
		},
		"subclassfeature15" : {
			name : "Restorative Shadows",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When one of my Shades is destroyed by damage, I can gain temporary HP equal to two Exploit Dice")
		},
		"subclassfeature18" : {
			name : "Legendary Shadowdancer",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Whenever I conjure a Shade, I can conjure two Shades instead")
		}
	}
});

var LLEnchantedShots = {
	"beguiling shot" : { name : "Beguiling Shot", description : LLdesc("Wis save or 2 ED psychic and charmed by a creature of my choice until my next turn (ends if harmed)") },
	"bursting shot" : { name : "Bursting Shot", description : LLdesc("The target and creatures within 10 ft: Dex save or 2 ED cold, fire, or lightning damage (my choice)") },
	"enfeebling shot" : { name : "Enfeebling Shot", description : LLdesc("Con save or 2 ED necrotic and its weapon attacks deal half damage for 1 min (save at end of each turn)") },
	"grasping shot" : { name : "Grasping Shot", description : LLdesc("Dex save or 2 ED piercing; 1 min: half speed and 2 ED piercing the first time it moves each turn; Str check (action) to end") },
	"piercing shot" : { name : "Piercing Shot", description : LLdesc("The target and creatures behind it in a 30-ft line: Dex save or 2 ED force damage") },
	"seeking shot" : { name : "Seeking Shot", description : LLdesc("In place of an attack, ammunition seeks a creature I saw in the last minute within 120 ft: Dex save or 2 ED force and I learn its location") },
	"umbral shot" : { name : "Umbral Shot", description : LLdesc("Int save or 2 ED psychic and blinded by hallucinations for 1 min (save at end of each turn)") },
	"banishing shot" : { name : "Banishing Shot", prerequisite : "10th-level Fighter", prereqeval : function (v) { return LLFtrLvl() >= 10; }, description : LLdesc("Cha save or banished to a harmless demiplane for 1 min (save with its action)") },
	"severing shot" : { name : "Severing Shot", prerequisite : "10th-level Fighter", prereqeval : function (v) { return LLFtrLvl() >= 10; }, description : LLdesc("Con save or 2 ED force and it can't cast spells for 1 min (save at end of each turn)") },
	"technical shot" : { name : "Technical Shot", prerequisite : "10th-level Fighter", prereqeval : function (v) { return LLFtrLvl() >= 10; }, description : LLdesc("Dex save or it suffers the effects of one Martial Exploit I know (even melee-only ones)") },
	"transposing shot" : { name : "Transposing Shot", prerequisite : "10th-level Fighter", prereqeval : function (v) { return LLFtrLvl() >= 10; }, description : LLdesc("Cha save or 2 ED force and I switch places with it without provoking opportunity attacks") }
};
AddSubClass("fighter(laserllama)", "sylvan archer", {
	regExpSearch : /^(?=.*sylvan)(?=.*archer).*$/i,
	subname : "Sylvan Archer",
	fullname : "Sylvan Archer",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : (function () {
			var oFea = {
				name : "Enchanted Shots",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : levels.map(function (n) {
					return LLdesc([
						"When I hit with a ranged weapon attack, I can apply one Enchanted Shot I know; use \"Choose Feature\" to learn them",
						"With no uses left, I can expend an Exploit Die to use one again; saves use my Exploit save DC"
					].concat(n < 18 ? [] : ["Legendary Sylvan Archer: my Shots deal +1 ED; once per long rest, a Shot also affects creatures of my choice within 20 ft"]));
				}),
				usages : "Wis mod per ",
				usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
				recovery : "long rest",
				extraname : "Enchanted Shot",
				extrachoices : [],
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 7 ? 2 : n < 10 ? 3 : n < 15 ? 4 : n < 18 ? 5 : 6; })
			};
			for (var sS in LLEnchantedShots) {
				oFea.extrachoices.push(LLEnchantedShots[sS].name);
				oFea[sS] = LLEnchantedShots[sS];
			}
			return oFea;
		})(),
		"subclassfeature3.1" : LLPathExploits("Sylvan Archer", [[3, ["arresting strike", "precision strike"]], [5, ["martial focus", "volley"]], [9, ["thunderous shot"]]], LLFtrExpl),
		"subclassfeature3.2" : {
			name : "Sylvan Lore",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I learn Sylvan and gain proficiency in Nature (I can use Wis for Nature checks); I learn druidcraft (Wis, ammunition as focus)"),
			languageProfs : ["Sylvan"],
			skills : ["Nature"],
			addMod : [{ type : "skill", field : "Nature", mod : "max(Wis-Int|0)", text : "Sylvan Lore: I can make Wisdom (Nature) checks instead of Intelligence (Nature) checks." }],
			spellcastingBonus : [{
				name : "Sylvan Lore",
				spells : ["druidcraft"],
				selection : ["druidcraft"],
				spellcastingAbility : 5,
				firstCol : "atwill"
			}]
		},
		"subclassfeature7" : {
			name : "Sylvan Shot",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"My ranged weapon attacks are magical; if I miss, I can use a bonus action to repeat the attack vs. another target in range",
				"Creatures that succeed on a save vs. an Enchanted Shot still take half damage"
			]),
			action : [["bonus action", " (after a miss)"]]
		},
		"subclassfeature15" : {
			name : "Enchanted Quiver",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I can conjure a piece of magical ammunition as part of a ranged attack (vanishes after); I regain one Enchanted Shot when I roll initiative")
		},
		"subclassfeature18" : {
			name : "Legendary Sylvan Archer",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("My Enchanted Shots deal +1 Exploit Die damage; once per long rest, I can empower a Shot to affect creatures of my choice within 20 ft of the target"),
			usages : 1,
			recovery : "long rest"
		}
	}
});

// ===================================================================================
// ADDITIONAL ARCHETYPES (Alternate Fighter Expanded v3.5.1)
// ===================================================================================
AddSubClass("fighter(laserllama)", "crusader", {
	regExpSearch : /crusader/i,
	subname : "Crusader",
	fullname : "Crusader",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Crusader", [[3, ["imposing presence", "ruthless strike"]], [5, ["honor duel", "intimidating command"]], [9, ["inspirational speech"]]], LLFtrExpl),
		"subclassfeature3.1" : {
			name : "Crusader's Ire",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I Mark a creature I see within 60 ft for 1 min" + (n < 7 ? "" : " (and move up to 30 ft toward it)") + ":",
					"Once per turn when I miss it with a weapon attack, I can make another attack with the same weapon",
					"When it's in reach and casts a spell or attacks another, I can make an opportunity attack vs. it",
					"I add my Exploit Die to saves it forces me to make; after the free use, I must expend an Exploit Die"
				]);
			}),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", ""]]
		},
		"subclassfeature3.2" : {
			name : "Fanatical Disciple",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Religion; I add my Exploit Die to Religion checks about my god or cause"),
			skills : ["Religion"]
		},
		"subclassfeature7" : {
			name : "Renewed Fervor",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When I use Second Wind, I regain the use of Crusader's Ire; when I Mark a creature, I can move 30 ft toward it")
		},
		"subclassfeature10" : {
			name : "Zealous Fury",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When reduced to 0 HP (not killed outright), I drop to 1 HP and make one weapon attack vs. the attacker; with no uses, I can still do it but gain 1 exhaustion"),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature15" : {
			name : "Righteous Judgment",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I hit my Ire target with a weapon attack, I can end the Mark to deal maximum damage; if it drops to 0 HP, I regain Crusader's Ire"),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature18" : {
			name : "Legendary Crusader",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("When my Ire target attacks me, I can use my reaction to make a weapon attack vs. it (with adv. if after its attack hits)"),
			action : [["reaction", ""]]
		}
	}
});

AddSubClass("fighter(laserllama)", "guardian", {
	regExpSearch : /guardian/i,
	subname : "Guardian",
	fullname : "Guardian",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Guardian", [[3, ["reposition", "shield impact"]], [5, ["defensive stance", "hold the line"]], [9, ["daring rescue"]]], LLFtrExpl),
		"subclassfeature3.1" : LLAddFightingStyles({
			name : "Iron Guardian",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var sRange = n < 10 ? "5 ft" : n < 15 ? "10 ft" : "30 ft";
				return LLdesc([
					"I learn Defensive Fighting, Protection, or Shield Warrior (extra Style); use \"Choose Feature\"",
					"With a shield, as a reaction when a creature within " + sRange + " is hit, I can use reposition without an Exploit Die" + (n < 7 ? " (no temp HP)" : ""),
					"I only take the damage of that attack if it would also hit me"
				]);
			}),
			action : [["reaction", "Reposition (Iron Guardian)"]]
		}, ["defensive", "protection", "shieldwarrior"], false),
		"subclassfeature3.2" : {
			name : "Warrior Smith",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency with smith's tools and add my Exploit Die to their checks; during a long rest, 1 hour gives armor or a shield +1 AC until my next long rest"),
			toolProfs : ["Smith's tools"]
		},
		"subclassfeature7" : {
			name : "Inspiring Sentinel",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When I use Second Wind, creatures of my choice within 5 ft gain 1d6 + Con mod (min 1) temp HP; Iron Guardian's reposition grants temp HP")
		},
		"subclassfeature10" : {
			name : "Stalwart Defender",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I can use reposition on creatures within 10 ft (also with Iron Guardian); using it doesn't end defensive stance or hold the line")
		},
		"subclassfeature15" : {
			name : "Adamant Guardian",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I can use reposition on creatures within 30 ft (clear path needed); daring rescue isn't limited to once per rest")
		},
		"subclassfeature18" : {
			name : "Legendary Guardian",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I gain a special reaction once per turn, only for Iron Guardian, my Guardian Exploits, or opportunity attacks")
		}
	}
});

AddSubClass("fighter(laserllama)", "guerrilla", {
	regExpSearch : /guerr?ill?a/i,
	subname : "Guerrilla",
	fullname : "Guerrilla",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : {
			name : "Adaptable Combatant",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency in Athletics, Perception, Stealth, or Survival (if already proficient, +Exploit Die to its checks)",
				"During a long rest, after 1 hour of drills, I can replace any number of my Exploits with other Martial Exploits"
			]),
			skillstxt : "Choose one from Athletics, Perception, Stealth, or Survival"
		},
		"subclassfeature3.1" : LLPathExploits("Guerrilla", [[3, ["first aid", "mighty leap"]], [5, ["crippling strike", "pinning shot"]], [9, ["survey wilderness"]]], LLFtrExpl),
		"subclassfeature3.2" : LLAddFightingStyles({
			name : "Survivalist",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I learn the Mariner or Mountaineer Fighting Style (extra Style, can't be replaced; from 7th level I can switch it after each long rest)")
		}, ["mariner", "mountaineer"], false),
		"subclassfeature7" : {
			name : "By Land or Sea",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"After each long rest I can switch my Survivalist Style; I can hold my breath for 1 hour; I ignore nonmagical difficult terrain",
				"When I use Second Wind, I also gain the benefits of Dash or mighty leap"
			])
		},
		"subclassfeature10" : {
			name : "Identify Weakness",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("On a successful Eye for Talent, I can forgo the knowledge; the next save it makes vs. one of my Exploits has disadv.")
		},
		"subclassfeature15" : {
			name : "Unwavering",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("My Second Wind restores the maximum HP and one Exploit Die; I can expend an Action Surge to swap one Exploit for another")
		},
		"subclassfeature18" : {
			name : "Legendary Guerrilla",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("When I roll initiative and am not surprised: temp HP = fighter level, I can use Eye for Talent (Search), and move my speed without provoking OAs")
		}
	}
});

AddSubClass("fighter(laserllama)", "hound master", {
	regExpSearch : /^(?=.*hound)(?=.*master).*$/i,
	subname : "Hound Master",
	fullname : "Hound Master",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : {
			name : "Loyal Hound",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I have a Loyal Hound; select \"Loyal Hound\" on a Companion page; it acts on my turn but only Dodges unless I command it (bonus action)",
				"I can forgo one attack to have it Bite; at 0 HP it makes death saves, and I can stabilize it with an action and an Exploit Die",
				"If it dies, I can spend 8 hours to train a new one"
			]),
			action : [["bonus action", " (command)"]],
			creaturesAdd : [["Loyal Hound"]],
			creatureOptions : [{
				name : "Loyal Hound",
				source : [["GMB:LL", 0]],
				size : 3,
				type : "Beast",
				alignment : "Lawful Neutral",
				ac : "13+Prof",
				hp : 20,
				hd : [3, 8],
				hdLinked : ["fighter(laserllama)"],
				minlevelLinked : ["fighter(laserllama)"],
				speed : "40 ft, swim 20 ft",
				scores : [14, 14, 15, 8, 14, 11],
				saves : ["", "", "", "", "", ""],
				skills : { "Perception" : 2 },
				senses : "Adv. on Wis (Perception) checks using hearing or smell",
				passivePerception : 14,
				languages : "",
				challengeRating : "1",
				proficiencyBonus : 2,
				proficiencyBonusLinked : true,
				attacksAction : 1,
				attacks : [{
					name : "Bite",
					ability : 1,
					damage : [1, 6, "piercing"],
					modifiers : ["", "Prof"],
					range : "Melee (5 ft)",
					description : "Damage die is its master's Exploit Die; target its size or smaller can be grappled (no other Bites while grappling)",
					abilitytodamage : true
				}],
				traits : [{
					name : "Hit Dice",
					description : "It has d8 Hit Dice equal to its master's fighter level and benefits from short and long rests."
				}, {
					name : "Keen Hearing & Smell",
					description : "It has advantage on ability checks that use hearing or smell."
				}, {
					name : "Loyal",
					description : "While its master is within 30 ft, it adds its master's PB to its ability checks and saves, and it can't be frightened."
				}, {
					name : "Iron Jaws (Hound Master 7)",
					minlevel : 7,
					description : "Its Bite is magical."
				}, {
					name : "Steadfast Companions (Hound Master 10)",
					minlevel : 10,
					description : "While within 30 ft of each other, it and its master have a special reaction to give the other advantage on a saving throw."
				}, {
					name : "Canine Fury (Hound Master 15)",
					minlevel : 15,
					description : "Once per turn when ordered to Bite, it makes two Bite attacks instead."
				}],
				calcChanges : {
					hp : function (totalHD, HDobj, prefix) {
						if (!classes.known["fighter(laserllama)"]) return;
						var lvl = classes.known["fighter(laserllama)"].level;
						HDobj.alt.push(5 + 5 * lvl);
						HDobj.altStr.push(" = 5 as a base\n + 5 \xD7 " + lvl + " from five times its master's fighter level (" + (5 * lvl) + ")");
					},
					setAltHp : true
				}
			}]
		},
		"subclassfeature3.1" : LLPathExploits("Hound Master", [[3, ["lunge", "reposition"]], [5, ["exposing strike", "intimidating command"]], [9, ["survey wilderness"]]], LLFtrExpl),
		"subclassfeature7" : {
			name : "Iron Jaws & War Hound",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : levels.map(function (n) {
				return LLdesc([
					"My Hound's Bite is magical; in 1 hour (can be during a rest) I teach it a " + (n < 15 ? "1st-degree" : "1st- or 2nd-degree") + " Exploit I know",
					"It knows up to " + (n < 15 ? "two Exploits and has one Exploit Die" : "three Exploits and has two Exploit Dice") + " equal to mine (regained on a short rest)"
				]);
			})
		},
		"subclassfeature10" : {
			name : "Steadfast Companions",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("While my Hound and I are within 30 ft of each other, we both have a special reaction to give the other adv. on a saving throw")
		},
		"subclassfeature15" : {
			name : "Canine Fury",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Once per turn when I order my Hound to Bite, it makes two Bite attacks; War Hound improves (see Iron Jaws & War Hound)")
		},
		"subclassfeature18" : {
			name : "Hound of Legend",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("My Hound uses the Hound of Legend statistics (see Notes page); if slain, it reforms within 15 ft after 1 hour"),
			toNotesPage : [{
				name : "Hound of Legend",
				note : [
					"Large Beast, Lawful Neutral; AC 19 (natural armor); HP 5 + five times my fighter level; Speed 60 ft, swim 40 ft",
					"Str 20, Dex 12, Con 18, Int 10, Wis 18, Cha 14; Skills Intimidation +8, Perception +10, Survival +10; immune to frightened",
					"Traits: Hit Dice, Keen Hearing & Smell, Loyal, Strong Jaws (as the Loyal Hound)",
					"Bite: +11 to hit, reach 5 ft; 2d6 + 11 piercing damage"
				]
			}]
		}
	}
});

AddSubClass("fighter(laserllama)", "pugilist", {
	regExpSearch : /pugilist/i,
	subname : "Pugilist",
	fullname : "Pugilist",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Pugilist", [[3, ["brace up", "streetwise"]], [5, ["concussive blow", "dirty hit"]], [9, ["disorienting blow"]], [15, ["unbreakable"]]], LLFtrExpl),
		"subclassfeature3.1" : LLAddFightingStyles({
			name : "Contender",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I learn the Brawling Fighting Style (Improvised Fighting if I know it) as an extra Style; use \"Choose Feature\"",
				"The damage die of my unarmed strikes matches my Exploit Die"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.baseWeaponName != "unarmed strike" || !classes.known["fighter(laserllama)"]) return;
						var sDie = LLFighterDie(classes.known["fighter(laserllama)"].level);
						if (sDie) fields.Damage_Die = "1" + sDie;
					},
					"My unarmed strikes use my Exploit Die as their damage die."
				]
			}
		}, ["brawling", "improvised"], false),
		"subclassfeature3.2" : {
			name : "Iron Physique",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I can use Con instead of Dex for AC in light and medium armor; without armor, my AC is 10 + Dex + Con",
				"When I take damage from a source I see, I can use brace up as a reaction (temp HP before the damage)"
			]),
			action : [["reaction", "Brace Up (Iron Physique)"]],
			armorOptions : [{
				regExpSearch : /^(?=.*iron)(?=.*physique).*$/i,
				name : "Iron Physique",
				source : [["GMB:LL", 0]],
				ac : "10+Con",
				affectsWildShape : true
			}],
			armorAdd : "Iron Physique",
			extraAC : {
				name : "Iron Physique",
				mod : "max(Con-Dex|0)",
				text : "I can use my Constitution modifier instead of my Dexterity modifier for my AC in light or medium armor (medium armor still has a maximum of +2).",
				stopeval : function (v) { return !v.wearingArmor || v.heavyArmor; }
			}
		},
		"subclassfeature7" : {
			name : "Counter Punch & Resolute Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"As a reaction when a creature misses me with a melee attack, I can make an unarmed strike, Shove, Grapple, or improvised attack vs. it",
				"If it forces a save, the creature has disadv.; my unarmed strikes and improvised weapons count as magical"
			]),
			action : [["reaction", "Counter Punch"]]
		},
		"subclassfeature10" : {
			name : "Evasive Footwork",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I take the Attack action and make at least one unarmed strike, Grapple, or Shove, I gain the benefits of Disengage this turn")
		},
		"subclassfeature15" : {
			name : "Diamond Physique",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I use brace up as a reaction, I also resist that damage; I learn unbreakable (Pugilist Exploits)")
		},
		"subclassfeature18" : {
			name : "Legendary Pugilist",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Adv. on saves vs. or to end incapacitated, paralyzed, or stunned; my unarmed/improvised critical hits knock the target prone and stun it until my next turn"),
			savetxt : { adv_vs : ["incapacitated", "paralyzed", "stunned"] }
		}
	}
});

var LLRations = {
	"fortifying ration" : { name : "Fortifying Ration", description : LLdesc("1 min: +my Con mod (min 1) to checks and saves with Str, Dex, or Con (its choice)") },
	"invigorating ration" : { name : "Invigorating Ration", description : LLdesc("Regains 2 ED + my Con mod HP; from 10th level, excess becomes temp HP") },
	"limbering ration" : { name : "Limbering Ration", description : LLdesc("1 min: +10 ft speed (+20 ft from 10th level)") },
	"revitalizing ration" : { name : "Revitalizing Ration", description : LLdesc("Ends blinded, deafened, or poisoned, or reduces exhaustion by 1; from 10th level also charmed, frightened, paralyzed, stunned") },
	"stimulating ration" : { name : "Stimulating Ration", description : LLdesc("Eaten during a short rest: adv. on Hit Dice rolls (maximum rolls from 10th level)") },
	"engorging ration" : { name : "Engorging Ration", prerequisite : "7th-level Fighter", prereqeval : function (v) { return LLFtrLvl() >= 7; }, description : LLdesc("1 min: it becomes Large, +5 ft reach, adv. on Str checks and saves, +1d4 melee weapon damage") },
	"heightening ration" : { name : "Heightening Ration", prerequisite : "7th-level Fighter", prereqeval : function (v) { return LLFtrLvl() >= 7; }, description : LLdesc("1 min: +my Con mod (min 1) to checks and saves with Int, Wis, or Cha (its choice)") },
	"thickening ration" : { name : "Thickening Ration", prerequisite : "7th-level Fighter", prereqeval : function (v) { return LLFtrLvl() >= 7; }, description : LLdesc("1 min: resistance to bludgeoning, piercing, or slashing (all three from 10th level)") },
	"warding ration" : { name : "Warding Ration", prerequisite : "7th-level Fighter", prereqeval : function (v) { return LLFtrLvl() >= 7; }, description : LLdesc("1 min: resistance to acid, cold, fire, poison, or lightning (also force/necrotic/psychic/radiant/thunder from 10th)") },
	"berserker ration" : { name : "Berserker Ration", prerequisite : "15th-level Fighter", prereqeval : function (v) { return LLFtrLvl() >= 15; }, description : LLdesc("1 min: it doesn't fall unconscious at 0 HP (still makes death saves, dies at three failures)") },
	"rejuvenating ration" : { name : "Rejuvenating Ration", prerequisite : "15th-level Fighter", prereqeval : function (v) { return LLFtrLvl() >= 15; }, description : LLdesc("It gains the benefits of a short rest; at the end of its turn, it gains 1 exhaustion (removed only by magic or a long rest)") }
};
AddSubClass("fighter(laserllama)", "quartermaster", {
	regExpSearch : /quarter ?master/i,
	subname : "Quartermaster",
	fullname : "Quartermaster",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : {
			name : "Down to Earth",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency with cook's utensils, land vehicles, and Animal Handling; I add my Exploit Die to checks with them"),
			skills : ["Animal Handling"],
			toolProfs : ["Cook's utensils", "Vehicles (land)"]
		},
		"subclassfeature3.1" : (function () {
			var oFea = {
				name : "Rations",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : levels.map(function (n) {
					return LLdesc([
						"During a long rest, I spend 1 hour with cook's utensils to prepare up to my Con mod Rations (they last until my next long rest)",
						"A creature can use a bonus action to eat one (or feed it within 5 ft); only one Ration effect at a time" + (n < 18 ? "" : " (two for me)"),
						"On the Fly: as an action, I spend an Exploit Die to prepare one (I regain the die when it's eaten); see \"Choose Feature\" for options"
					]);
				}),
				action : [["action", " (On the Fly)"]],
				extraname : "Ration",
				extrachoices : [],
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : 11; })
			};
			for (var sR in LLRations) {
				oFea.extrachoices.push(LLRations[sR].name);
				oFea[sR] = LLRations[sR];
			}
			return oFea;
		})(),
		"subclassfeature3.2" : LLPathExploits("Quartermaster", [[3, ["first aid", "reposition"]], [5, ["exposing strike", "immovable stance"]], [9, ["daring rescue"]]], LLFtrExpl),
		"subclassfeature7" : {
			name : "Dependable Ally",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("With the Attack action, I can replace attacks with: Help (10 ft), feed a Ration/potion/consumable, a Down to Earth check, or hand over and equip an item")
		},
		"subclassfeature10" : {
			name : "Quick Ration",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("As a bonus action, I prepare a Ration On the Fly and eat it or feed it to a creature within 5 ft (it lasts 1 minute)"),
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "long rest",
			action : [["bonus action", ""]]
		},
		"subclassfeature15" : {
			name : "Ever Ready",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I roll initiative and am not surprised, I prepare one Ration without expending an Exploit Die")
		},
		"subclassfeature18" : {
			name : "Legendary Quartermaster",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("My Constitution score and maximum increase by 2; I'm immune to the poisoned condition; I can benefit from two Rations at once"),
			scores : [0, 0, 2, 0, 0, 0],
			scoresMaximum : [0, 0, 22, 0, 0, 0],
			savetxt : { immune : ["poisoned"] }
		}
	}
});

AddSubClass("fighter(laserllama)", "swordsage", {
	regExpSearch : /sword ?sage/i,
	subname : "Swordsage",
	fullname : "Swordsage",
	source : [["GMB:LL", 0]],
	abilitySave : 1,
	abilitySaveAlt : 2,
	features : {
		"subclassfeature3" : LLPathExploits("Swordsage", [[3, ["mighty leap", "parry"]], [5, ["glancing blow", "zephyr slash"]], [9, ["gale slash"]]], LLFtrExpl),
		"subclassfeature3.1" : {
			name : "Student of the Blade",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Acrobatics or Performance; I can use Dex for Performance with a sword; +Exploit Die to Dex (Acrobatics/Performance) checks"),
			skillstxt : "Choose one from Acrobatics or Performance"
		},
		"subclassfeature3.2" : {
			name : "Battle Trance",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"Without heavy armor or a shield, as a bonus action I enter a Battle Trance for up to 1 minute:",
					"Adv. on Dex (Acrobatics), Dash as a bonus action" + (n < 15 ? "" : " (also Disengage)") + ", +" + (n < 7 ? 1 : 2) + " AC, once per turn a Swordsage Exploit without an ED (d4)",
					(n < 18 ? "It ends if I'm incapacitated, don a shield or heavy armor, or end it; after the free use, I must expend an Exploit Die" : "I can enter and end it at will; when I take damage in it, I can expend an ED to reduce the damage by 2 ED")
				].concat(n < 15 ? [] : ["In my Trance, I can roll Exploit Dice twice and choose the total"]));
			}),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", ""]]
		},
		"subclassfeature7" : {
			name : "Mythic Reflexes",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("I gain proficiency in Dexterity saves and add my Prof Bonus to initiative; my Battle Trance AC bonus becomes +2"),
			saves : ["Dex"],
			addMod : [{ type : "skill", field : "Init", mod : "Prof", text : "Mythic Reflexes: I add my Proficiency Bonus to initiative rolls." }]
		},
		"subclassfeature10" : {
			name : "Reactive Trance",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I roll initiative and am not surprised or incapacitated, I can enter my Battle Trance without expending a use")
		},
		"subclassfeature15" : {
			name : "Storm of Steel",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I Dash in my Trance, I also gain the benefits of Disengage; in my Trance I can roll Exploit Dice twice and choose")
		},
		"subclassfeature18" : {
			name : "Legendary Swordsage",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I can enter and end my Battle Trance at will; when I take damage in it, I can expend an Exploit Die to reduce it by 2 Exploit Dice")
		}
	}
});

var LLSchematics = {
	"featherweight schematic" : { name : "Featherweight Schematic", description : LLdesc("Boots: ignore mundane difficult terrain, +10 ft walk; heavy armor: no Stealth/Str penalty; light armor: no falling damage < 100 ft, glide; weapon: lose heavy/two-handed or gain light & finesse") },
	"intuitive schematic" : { name : "Intuitive Schematic", description : LLdesc("Helm: +ED to Investigation/Perception; light/medium armor: Int for initiative and AC; melee weapon: Int for attack and damage") },
	"radiant schematic" : { name : "Radiant Schematic", description : LLdesc("Bonus action: 15-ft bright light (sunlight if exposed); 3 charges/LR: armor/shield (attacker within 15 ft) or weapon (on hit): Con save or blinded 1 min") },
	"rebounding schematic" : { name : "Rebounding Schematic", description : LLdesc("Boots: 30-ft running long jump as bonus action, +Int high jump; heavy armor: reaction -ED+Int melee dmg (reflect at 0); non-heavy weapon: thrown 20/40, returns") },
	"empowered schematic" : { name : "Empowered Schematic", prerequisite : "7th-level Fighter", prereqeval : function (v) { return LLFtrLvl() >= 7; }, description : LLdesc("Heavy armor: my Int for Str checks/saves; light armor: my Int for Dex checks/saves and initiative; weapon: damage dice below average count as average") },
	"resilient schematic" : { name : "Resilient Schematic", prerequisite : "7th-level Fighter", prereqeval : function (v) { return LLFtrLvl() >= 7; }, description : LLdesc("Armor: resistance to nonmagical B/P/S (magical if magic armor); helm: adv. vs. stunned/incapacitated and concentration; weapon: push Large or smaller 5 ft on hit") }
};
AddSubClass("fighter(laserllama)", "tinker", {
	regExpSearch : /tinker/i,
	subname : "Tinker",
	fullname : "Tinker",
	source : [["GMB:LL", 0]],
	abilitySave : 4,
	features : {
		"subclassfeature3" : {
			name : "Analytical Mind",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency with tinker's and smith's tools (or other tools if I have them); I add my Exploit Die to checks with them"),
			toolProfs : ["Tinker's tools", "Smith's tools"]
		},
		"subclassfeature3.1" : (function () {
			var oFea = {
				name : "Inventive Arsenal",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : levels.map(function (n) {
					var nPer = n < 10 ? 1 : n < 15 ? 2 : 3;
					return LLdesc([
						"I know Schematics (use \"Choose Feature\"); during a long rest, 1 hour with tinker's or smith's tools modifies objects",
						"I modify one object per Schematic I know; an object can bear " + nPer + " Schematic" + (nPer > 1 ? "s" : "") + "; they last until my next long rest",
						"Only I benefit" + (n < 7 ? "" : " (or a creature I teach for 10 min); modified objects are magical") + "; Schematic save DC = 8 + Prof + Int mod"
					].concat(n < 18 ? [] : ["Legendary Tinker: +1 attack/damage (weapons) or +1 AC (armor) per Schematic applied (max +3)"]));
				}),
				extraname : "Schematic",
				extrachoices : [],
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 7 ? 2 : n < 10 ? 3 : n < 15 ? 4 : n < 18 ? 5 : 6; })
			};
			for (var sS in LLSchematics) {
				oFea.extrachoices.push(LLSchematics[sS].name);
				oFea[sS] = LLSchematics[sS];
			}
			return oFea;
		})(),
		"subclassfeature7" : {
			name : "Increased Function",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("After 10 min of teaching, a creature can use my modified items; my modified objects are magical and I can modify magic weapons and armor")
		},
		"subclassfeature10" : {
			name : "Inventive Synergy",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I can modify an object with two Schematics if it meets the requirements of both")
		},
		"subclassfeature15" : {
			name : "Flexible Innovation",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("During a short rest, I can transfer a Schematic modification (and its charges) to another eligible object; an object can bear three Schematics")
		},
		"subclassfeature18" : {
			name : "Legendary Tinker",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Modified weapons gain +1 to attack and damage per Schematic, modified armor +1 AC per Schematic (max +3 total)")
		}
	}
});

var LLWitchbladeSpells = [
	"blade ward", "booming blade", "green-flame blade", "infestation", "lightning lure", "mind sliver", "minor illusion", "poison spray", "prestidigitation", "sword burst", "tempestuous blade", "toll the dead", "true strike",
	"absorb elements", "armor of agathys", "arms of hadar", "bane", "cause fear", "detect evil & good", "expeditious retreat", "false life", "hellish rebuke", "hex", "inflict wounds", "protection from good & evil", "searing smite", "shield", "thunderous smite", "unseen servant", "witch bolt",
	"cloud of daggers", "crown of madness", "darkness", "hold person", "invisibility", "mind spike", "mirror image", "misty step", "ray of enfeeblement", "shadow blade", "shatter", "spider climb",
	"blinding smite", "counterspell", "dispel magic", "enemies abound", "fear", "hunger of hadar", "major image", "vampiric touch",
	"banishment", "blight", "dimension door", "hallucinatory terrain", "phantasmal killer", "shadow of moil", "sickening radiance", "staggering smite"
];
AddSubClass("fighter(laserllama)", "witchblade", {
	regExpSearch : /witch ?blade/i,
	subname : "Witchblade",
	fullname : "Witchblade",
	source : [["GMB:LL", 0]],
	abilitySave : 6,
	spellcastingFactor : "warlock3",
	spellcastingTable : [[0, 0, 0, 0, 0, 0, 0, 0, 0]].concat(levels.map(function (n) {
		var a = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		if (n < 3) return a;
		a[(n < 7 ? 1 : n < 13 ? 2 : n < 19 ? 3 : 4) - 1] = n < 4 ? 1 : 2;
		return a;
	})),
	spellcastingList : {
		spells : LLSpellList(LLWitchbladeSpells)
	},
	spellcastingKnown : {
		cantrips : [0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		spells : [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7]
	},
	features : {
		"subclassfeature3" : {
			name : "Pact Magic",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I can cast Witchblade spells I know, using Charisma as my spellcasting ability",
				"All my slots are the same level and I regain them on a short or long rest; I can swap a spell when I gain a level",
				"With warlock levels: add 1/3 of my fighter levels to my warlock levels for Pact Magic slots"
			]),
			additional : levels.map(function (n) {
				if (n < 3) return "";
				return (n < 10 ? 1 : 2) + " cantrip" + (n < 10 ? "" : "s") + " & " + [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7][n - 1] + " spells known";
			})
		},
		"subclassfeature3.1" : {
			name : "Sanguine Offering",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc("Once per turn when I hit with a melee weapon attack, I take Exploit Die necrotic damage (can't be reduced) to deal +2 Exploit Dice necrotic damage" + (n < 15 ? "" : "; I gain that much temp HP for 1 minute (Greater Offering)"));
			})
		},
		"subclassfeature7" : {
			name : "War Magic",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When I use my action to cast a spell, I can make one weapon attack as a bonus action"),
			action : [["bonus action", " (after casting)"]]
		},
		"subclassfeature10" : {
			name : "Otherworldly Step",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I cast a 1-action Witchblade spell or use Second Wind, I can teleport to an unoccupied space I can see within 60 ft")
		},
		"subclassfeature15" : {
			name : "Greater Offering",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I use Sanguine Offering, I gain temporary HP equal to the necrotic damage dealt to the creature (they last 1 minute)")
		},
		"subclassfeature18" : {
			name : "Legendary Witchblade",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("As a reaction when a creature I see within 30 ft is slain, I teleport within 5 ft of it and gain temp HP equal to twice its CR"),
			action : [["reaction", ""]]
		}
	}
});
LLAddSpellsToClass("witchblade(laserllama)", LLWitchbladeSpells);
LLAddSpellsToClass("arcane knight(laserllama)", LLArcaneKnightSpells);
LLAddSpellsToClass("mystic(laserllama)", LLMysticFighterSpells);

// ===================================================================================
// MARTIAL FEATS (Alternate Fighter Expanded v3.5.1)
// The Alternate Fighting Initiate feat is in the Common Attributes file
// ===================================================================================
FeatsList["alternate defensive duelist"] = {
	name : "Alternate Defensive Duelist",
	source : [["GMB:LL", 0]],
	prerequisite : "Dexterity 13 or higher",
	prereqeval : function (v) { return LLScore("Dex") >= 13; },
	descriptionFull : "When a creature you can see hits you with a melee attack while you are wielding a finesse or light melee weapon you are proficient with, you can use your reaction to add your Dexterity modifier to your Armor Class against that attack.\n   When you use this reaction and the attack misses, you can make a single melee weapon attack against your attacker as part of the same reaction.",
	description : "As a reaction when a creature I see hits me with a melee attack while I wield a finesse or light melee weapon I'm proficient with, I add my Dex mod to my AC against it. If it then misses, I can make one melee weapon attack against the attacker as part of the reaction.",
	action : [["reaction", ""]]
};
FeatsList["alternate great weapon master"] = {
	name : "Alternate Great Weapon Master",
	source : [["GMB:LL", 0]],
	prerequisite : "Strength 13 or higher",
	prereqeval : function (v) { return LLScore("Str") >= 13; },
	descriptionFull : "You have honed your skills with massive weapons to overwhelm your foes. You gain the following benefits:\n \u2022 Forceful Strikes. Whenever you hit a creature equal to your size or smaller with a Heavy melee weapon attack you can knock it back 5 feet away from you in a line along the ground, so long as the space it would be forced into is unoccupied.\n \u2022 Ruthless Warrior. If you reduce a creature to 0 hit points or score a critical hit with a Heavy melee weapon, you can make an attack with that Heavy weapon as your bonus action on that same turn.",
	description : "When I hit a creature my size or smaller with a heavy melee weapon, I can push it 5 ft away. When I reduce a creature to 0 HP or score a critical hit with a heavy melee weapon, I can make an attack with it as a bonus action.",
	action : [["bonus action", " (after crit/kill)"]]
};
FeatsList["martial training"] = {
	name : "Martial Training",
	source : [["GMB:LL", 0]],
	descriptionFull : "You have studied the combat techniques of elite warriors. You gain the following benefits:\n \u2022 Martial Exploits Known. You learn two 1st-degree Martial Exploits from those available to the Alternate Fighter. Their Exploit save DC = 8 + your Proficiency Bonus + your Strength or Dexterity modifier.\n \u2022 Retraining Exploits. When you gain a level, you can replace one Martial Exploits from this Feat with another 1st-degree Martial Exploit of your choice.\n \u2022 Exploit Dice. You gain two d4 Exploit Dice to fuel these Exploits, which are expended when you use them. You regain all Exploit Dice after a short or long rest.\n   If you already have Exploit Dice when you gain this Feat, you instead gain a single Exploit Die equal to your others.",
	description : "I learn two 1st-degree Martial Exploits (Str or Dex for the save DC) and gain two d4 Exploit Dice (one extra Exploit Die if I already have them), regained on a short rest. I can swap one of these Exploits when I gain a level.",
	eval : function () { LLExploitSheet("martial exploits", "Martial Exploits", 1); LLUpdateExploitDice(); },
	removeeval : function () { LLUpdateExploitDice("martial training"); },
	spellcastingBonusElsewhere : {
		addTo : "martial exploits",
		spellcastingBonus : {
			name : "Martial Training",
			spellcastingAbility : 1,
			spells : LLExploitList("fighter(laserllama)", 1),
			times : 2
		}
	}
};
if (LLExploitFeats.indexOf("martial training") === -1) LLExploitFeats.push("martial training");
FeatsList["signature technique"] = {
	name : "Signature Technique",
	source : [["GMB:LL", 0]],
	prerequisite : "At least one Martial Exploit known",
	prereqeval : function (v) { return CurrentSpells["martial exploits"] ? true : false; },
	descriptionFull : "You have practiced a single technique to the point of mastery. Choose a 1st-degree Exploit you know from those available to the Alternate Fighter that does not restore hit points.\n   In combat, you can use this Exploit once per round without expending an Exploit Die, rolling a d4 for the Exploit Die. You regain this feature at the start of each of your turns.",
	description : "I choose a 1st-degree Martial Exploit I know that doesn't restore HP. In combat, once per round, I can use it without expending an Exploit Die, rolling a d4 in place of the Exploit Die."
};
FeatsList["weapon adept"] = {
	name : "Weapon Adept",
	source : [["GMB:LL", 0]],
	descriptionFull : "You have spent many hours honing your skills with the deadly armaments of war. You gain the benefits listed below:\n \u2022 Ability Score Increase. Increase either your Strength, Dexterity, or Constitution score by 1, up to a maximum of 20.\n \u2022 Weapon Training. You gain proficiency with all simple and martial weapons.",
	description : "I gain proficiency with all simple and martial weapons. [+1 Strength, Dexterity, or Constitution]",
	scorestxt : "+1 Strength, Dexterity, or Constitution",
	weaponProfs : [true, true]
};
FeatsList["alternate weapon master"] = {
	name : "Alternate Weapon Master",
	source : [["GMB:LL", 0]],
	prerequisite : "Proficiency with all simple and martial weapons",
	prereqeval : function (v) { return v.simpleWeaponsProf && v.martialWeaponsProf; },
	descriptionFull : "You wield weapons with a deadly efficiency that is impressive even to most trained warriors. Choose a number of simple or martial weapons equal to your Proficiency Bonus. Whenever you make an attack with those weapons you gain a +1 bonus to both the attack and damage roll.\n   As your Proficiency Bonus increases, you choose additional weapons to gain this benefit.",
	description : "I choose a number of simple or martial weapons equal to my Proficiency Bonus. I gain +1 to attack and damage rolls with them. To apply it, include \"Weapon Master\" or \"WM\" in the name of the weapon on the attack line.",
	calcChanges : {
		atkCalc : [
			function (fields, v, output) {
				if (!v.isSpell && (/\b(weapon master|WM)\b/i).test(v.WeaponText)) {
					output.extraHit += 1;
					output.extraDmg += 1;
				}
			},
			"If I include 'Weapon Master' or 'WM' in the name of a weapon I chose for this feat, it gets +1 to attack and damage rolls."
		]
	}
};

// ======================================================================
// LaserLlama - Alternate Monk v3.1.1.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Alternate Monk" (with Expanded options)
	Effect:		This script adds the Alternate Monk class, its 19 Monastic Traditions, the Mystic Techniques and the Monastic Feats.
				Alternate Monk v3.1.1 and Alternate Monk Expanded v3.1.1 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	Original scripts by CalypsoMoonlace and Valentino dell'Eco; updated to v3.1.1 in the "ll-updates" release (2026/10/19)
	How to use:	Write "Monk (LaserLlama)" in the Class field (e.g. "Way of the Open Hand Monk (LaserLlama)")
*/


if (typeof LLExploitFeature !== "function" || !SpellsList["arresting strike"] || !SpellsList["arresting strike"].isExploit) {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

if (ClassList["monk"]) ClassList["monk"].regExpSearch = /^(?=.*monk)(?!.*laserllama).*$/i;

// Martial Arts Die by monk level
LLMonkDieN = function (n) { return n < 5 ? 6 : n < 11 ? 8 : n < 17 ? 10 : 12; };
LLMonkLvl = function () { return classes.known["monk(laserllama)"] ? classes.known["monk(laserllama)"].level : 0; };
LLMonkSub = function (sSub) { return classes.known["monk(laserllama)"] && classes.known["monk(laserllama)"].subclass === "monk(laserllama)-" + sSub; };
var LLMaDie = function (str) { return levels.map(function (n) { return str.replace(/MAD/g, "1d" + LLMonkDieN(n)).replace(/LVL/g, n); }); };

/*	Mystic Techniques: [key, name, prerequisite monk level, ki cost text, description (MAD = Martial Arts Die, LVL = monk level), extra attributes]
*/
var LLMonkTechData = [
	["arresting strike", "Arresting Strike", 0, "1 Ki", "Once per turn on a melee Martial Arts hit: Dex save or speed 0 until the start of my next turn"],
	["crippling strike", "Crippling Strike", 0, "1 Ki", "Once per turn on a melee Martial Arts hit: Con save or blinded, deafened, or unable to speak (my choice) until my next turn"],
	["dazing strike", "Dazing Strike", 0, "1 Ki", "Once per turn on a melee Martial Arts hit: Wis save or -1d4 on its next check, attack, or save before my next turn"],
	["deflect strike", "Deflect Strike", 0, "1 Ki", "Reaction when hit by a melee weapon attack: reduce damage by LVL + MAD + Dex mod; if 0, I can make an unarmed strike vs. the attacker", { action : [["reaction", ""]], lvlNote : [11, "From 11th level, I can use it vs. any melee attack, including melee spell attacks"] }],
	["empowered strike", "Empowered Strike", 0, "1 Ki", "Once per turn on a melee Martial Arts hit: Str save (adv. if larger) or pushed 5\xD7 my Wis mod ft and knocked prone"],
	["enhanced grip", "Enhanced Grip", 0, "", "Creatures that start their turn grappled by me take MAD bludgeoning; I can drag grappled creatures at full speed"],
	["improvised strikes", "Improvised Strikes", 0, "", "I gain proficiency with improvised weapons; my improvised weapon attacks count as Martial Arts attacks", {
		weaponProfs : [false, false, ["improvised weapons"]],
		calcChanges : { atkAdd : [function (fields, v) { if ((/improvised/i).test(v.WeaponName + v.baseWeaponName) || (/improvised/i).test(v.theWea.type)) v.theWea.monkweapon = true; }, "My improvised weapon attacks count as Martial Arts attacks.", 1] }
	}],
	["mystic regeneration", "Mystic Regeneration", 0, "2 Ki", "As an action, I regain MAD + Wis mod HP", { action : [["action", ""]] }],
	["patient defense", "Patient Defense", 0, "1 Ki", "As a bonus action, I take the Dodge action", { action : [["bonus action", ""]] }],
	["slow fall", "Slow Fall", 0, "", "I reduce falling damage I take by 5\xD7 LVL (unless grappled, incapacitated, or restrained)"],
	["step of the wind", "Step of the Wind", 0, "", "As a bonus action, I Dash or Disengage; my jump distance is doubled until the end of the turn", { action : [["bonus action", ""]] }],
	["typhoon strike", "Typhoon Strike", 0, "1 Ki", "As an action, all creatures within my unarmed/melee Martial Arts reach: Dex save or MAD + Dex mod damage of my attack's type", { action : [["action", ""]] }],
	// Expanded
	["divine light", "Divine Light", 0, "", "I learn two Cleric cantrips (Wisdom, my body is the focus)", {
		spellcastingBonus : [{ name : "Divine Light", "class" : "cleric", level : [0, 0], spellcastingAbility : 5, times : 2 }]
	}],
	["probing strike", "Probing Strike", 0, "1 Ki", "On an unarmed strike hit, I learn AC, highest/lowest ability, condition/damage immunities and resistances, or one special feature"],
	["spiritual armor", "Spiritual Armor", 0, "1 Ki", "As a bonus action, I gain Wis mod (min 1) temp HP; when a creature damages them, I can use my reaction to deal it MAD force damage", { action : [["bonus action", ""], ["reaction", " (retaliate)"]] }],
	// 5th level
	["deflect missile", "Deflect Missile", 5, "0/1 Ki", "Reaction when hit by a ranged weapon attack I see: reduce damage by LVL + MAD + Dex mod; if 0, I catch it and can spend 1 Ki to throw it back (20/60 ft, proficient)", { action : [["reaction", ""]], lvlNote : [11, "From 11th level, I can spend 1 Ki to use it vs. any ranged attack, including spell attacks"] }],
	["gentling touch", "Gentling Touch", 5, "1+ Ki", "In place of an attack, I touch a creature and roll 5 MAD (+1 MAD per extra Ki, max Wis mod): if its HP \u2264 total, it falls unconscious for 10 min"],
	["seeking strike", "Seeking Strike", 5, "1 Ki", "When I miss with a Martial Arts attack, I can reroll the attack (must use the new roll); doesn't count against the one-Ki-feature limit"],
	["slowing strike", "Slowing Strike", 5, "1 Ki", "Once per turn on a melee Martial Arts hit: Wis save or it suffers the slow spell until the start of my next turn (no concentration)"],
	["stunning strike", "Stunning Strike", 5, "1 Ki", "Once per turn on a melee Martial Arts hit: Con save or stunned until the start of my next turn"],
	["befuddling strike", "Befuddling Strike", 5, "1 Ki", "Once per turn on a melee Martial Arts hit: Int save or incapacitated until the start of my next turn"],
	["burning blade", "Burning Blade", 5, "1 Ki", "As a bonus action, a melee Martial Arts weapon I hold sheds 30-ft bright light and deals fire damage for 1 minute", { action : [["bonus action", ""]] }],
	["crushing strike", "Crushing Strike", 5, "1+ Ki", "Once per turn on an unarmed strike hit, I spend Ki (up to Wis mod): +1 MAD damage per Ki spent"],
	["envenomed strike", "Envenomed Strike", 5, "1 Ki", "Once per turn on a melee Martial Arts hit: +MAD poison damage and Con save or poisoned until the start of my next turn"],
	["gale rush", "Gale Rush", 5, "1+ Ki", "As an action, spend Ki (up to Wis mod): move 10 ft per Ki in a line (no OAs); one target at the end: Dex save or 1 MAD thunder per Ki and prone (half, no prone on save)", { action : [["action", ""]] }],
	["impairing strike", "Impairing Strike", 5, "1 Ki", "Once per turn on a melee Martial Arts hit: Cha save or until my next turn, disadv. on checks/attacks/saves with one ability I choose and half damage with it"],
	// 9th level
	["aura sight", "Aura Sight", 9, "", "I have blindsight (20 ft; 30 ft at 13th level, 60 ft at 18th level)", {
		changeeval : function (lvl, chc) {
			var srcNm = "Aura Sight (Mystic Technique)";
			var curRange = CurrentProfs.vision.blindsight && CurrentProfs.vision.blindsight.ranges ? CurrentProfs.vision.blindsight.ranges[srcNm] : false;
			var n = LLMonkLvl();
			var newRange = lvl[1] ? (n < 13 ? 20 : n < 18 ? 30 : 60) : 0;
			if (curRange != newRange) {
				if (curRange) SetProf("vision", false, "Blindsight", srcNm, curRange);
				if (newRange) SetProf("vision", true, "Blindsight", srcNm, newRange);
			}
		},
		removeeval : function () {
			var srcNm = "Aura Sight (Mystic Technique)";
			var curRange = CurrentProfs.vision.blindsight && CurrentProfs.vision.blindsight.ranges ? CurrentProfs.vision.blindsight.ranges[srcNm] : false;
			if (curRange) SetProf("vision", false, "Blindsight", srcNm, curRange);
		}
	}],
	["heavenly step", "Heavenly Step", 9, "0/1 Ki", "With Unarmored Movement, I can move along vertical surfaces, liquids, and ceilings; 1 Ki to remain there until my next turn"],
	["indomitable spirit", "Indomitable Spirit", 9, "1 Ki", "When I make an Athletics check, I can add my Wis mod (after rolling, before knowing the result)"],
	["mantle of courtesy", "Mantle of Courtesy", 9, "0/1 Ki", "I gain proficiency in Persuasion and can use Wis for it; after a Persuasion check, 1 Ki to replace the d20 roll with my monk level", {
		skills : ["Persuasion"],
		addMod : [{ type : "skill", field : "Persuasion", mod : "max(Wis-Cha|0)", text : "Mantle of Courtesy: I can use Wisdom instead of Charisma for Persuasion checks." }]
	}],
	["ascetic fortitude", "Ascetic Fortitude", 9, "2 Ki", "Reaction when I take damage: reduce it by 2 MAD + Wis mod", { action : [["reaction", ""]] }],
	["commune with self", "Commune with Self", 9, "5 Ki", "As an action, I meditate for 10 min to gain the information of the commune spell", { action : [["action", ""]] }],
	["friend of beast & leaf", "Friend of Beast & Leaf", 9, "5 Ki", "As an action, I meditate for 10 min to gain the information of the commune with nature spell", { action : [["action", ""]] }],
	["tremor strike", "Tremor Strike", 9, "1+ Ki", "Action, spend Ki (up to Wis mod): 25-ft cone: Str save or 1 MAD bludgeoning per Ki and prone (half, no prone on save); difficult terrain", { action : [["action", ""]] }],
	// 13th level
	["armor of the ascetic", "Armor of the Ascetic", 13, "", "When I finish a short or long rest, I gain the benefits of sanctuary until my next rest or until I break it"],
	["mystical integrity", "Mystical Integrity", 13, "", "I'm immune to spells and effects that would alter my form or teleport me, unless I wish to be affected"],
	["tongue of sun & moon", "Tongue of Sun & Moon", 13, "", "Creatures that speak a language understand me and I understand them; simple ideas with creatures without a language"],
	["banishing strike", "Banishing Strike", 13, "3 Ki", "Once per turn on a melee Martial Arts hit: Cha save or +3 MAD force (half on save); if it drops to 50 HP or less, it's banished until the end of my next turn"],
	["conjure previous life", "Conjure Previous Life", 13, "5 Ki", "As an action, I cast summon celestial (5th level, Defender, a Monk); it can use my Techniques with Ki I infuse; its attacks are unarmed strikes (MAD)", { action : [["action", ""]] }],
	["severing strike", "Severing Strike", 13, "3 Ki", "Once per turn on a melee Martial Arts hit: save with its spellcasting ability or it can't cast or concentrate on spells for 1 min (save each turn)"],
	// 18th level
	["empty body", "Empty Body", 18, "4/8 Ki", "Bonus action (4 Ki): invisible and resistance to all but force damage for 1 min; 8 Ki: astral projection on myself only", { action : [["bonus action", " (4 Ki)"]] }],
	["quivering palm", "Quivering Palm", 18, "5 Ki", "On a melee Martial Arts hit, vibrations last LVL days; as an action I end them: Con save or 0 HP, else 8 MAD necrotic (one creature at a time)", { action : [["action", " (end)"]] }],
	["awaken the third eye", "Awaken the Third Eye", 18, "8 Ki", "As an action, I gain the benefits of foresight for 1 minute; my Ki maximum is reduced by 8 for the duration", { action : [["action", ""]] }],
	["word of creation", "Word of Creation", 18, "7 Ki", "As an action, I cast divine word (Wisdom); once per short rest", { action : [["action", ""]] }]
];
LLMonkTech = {};
for (var iT = 0; iT < LLMonkTechData.length; iT++) {
	(function (a) {
		var o = {
			name : a[1],
			source : [["GMB:LL", 0]],
			description : levels.map(function (n) {
				var s = a[4].replace(/MAD/g, "1d" + LLMonkDieN(n)).replace(/LVL/g, n);
				var aD = [s];
				if (a[5] && a[5].lvlNote && n >= a[5].lvlNote[0]) aD.push(a[5].lvlNote[1]);
				return LLdesc(aD);
			}),
			techLevel : a[2]
		};
		if (a[3]) o.additional = a[3];
		if (a[2]) {
			o.prerequisite = a[2] + "th-level Monk";
			o.submenu = "[monk level " + (a[2] < 10 ? " " : "") + a[2] + "+]";
		}
		if (a[5]) {
			for (var att in a[5]) { if (att !== "lvlNote") o[att] = a[5][att]; }
		}
		LLMonkTech[a[0]] = o;
	})(LLMonkTechData[iT]);
}
// Warrior Adept: a Fighting Style (only one through this Technique)
var LLMonkWarriorAdept = ["archery", "blind", "balanced", "featherweight", "hurler", "polearm", "versatile"];
for (var iW = 0; iW < LLMonkWarriorAdept.length; iW++) {
	(function (sFS) {
		var oFS = FightingStylesLL[sFS];
		if (!oFS) return;
		var o = LLFightingStyleChoice(sFS);
		var sName = "Warrior Adept: " + oFS.menu.replace(/ Fighting Style$/i, "");
		o.name = sName;
		o.techLevel = 5;
		o.submenu = "[monk level  5+]";
		o.prerequisite = "5th-level Monk" + (oFS.prerequisite ? ", " + oFS.prerequisite : "");
		o.prereqeval = function (v) {
			if (LLMonkLvl() < 5) return false;
			var aKnown = GetFeatureChoice("classes", "monk(laserllama)", "mystic techniques", true);
			for (var i = 0; i < aKnown.length; i++) {
				if (/^warrior adept/i.test(aKnown[i]) && aKnown[i] !== sName.toLowerCase()) return false;
			}
			return oFS.prereqeval ? oFS.prereqeval(v) : true;
		};
		LLMonkTech[sName.toLowerCase()] = o;
	})(LLMonkWarriorAdept[iW]);
}
// Build a Technique choice for a feature (bPrereq = test the level prerequisite)
LLMonkTechChoice = function (sKey, bPrereq) {
	var oT = LLMonkTech[sKey];
	var o = {};
	for (var a in oT) { if (a !== "techLevel") o[a] = oT[a]; }
	if (!bPrereq) {
		delete o.prereqeval;
		delete o.prerequisite;
		delete o.submenu;
	} else if (oT.techLevel && !oT.prereqeval) {
		o.prereqeval = function (v) { return LLMonkLvl() >= oT.techLevel; };
	}
	return o;
};
/*	Signature Techniques of a Monastic Tradition: aList = [[key, level], ...]
	bSwap = they can be replaced (Open Hand)
*/
LLMonkSignature = function (sName, aList, sDescr) {
	var oFea = {
		name : sName + " Techniques",
		source : [["GMB:LL", 0]],
		minlevel : 3,
		description : sDescr ? sDescr : LLdesc("I learn these Signature Techniques; they don't count against my Techniques Known and can't be replaced"),
		autoSelectExtrachoices : []
	};
	for (var i = 0; i < aList.length; i++) {
		if (!LLMonkTech[aList[i][0]]) continue;
		oFea.autoSelectExtrachoices.push({ extrachoice : aList[i][0], minlevel : aList[i][1] });
		oFea[aList[i][0]] = LLMonkTechChoice(aList[i][0], false);
	}
	return oFea;
};
// Mystic Warrior feat Ki
LLMonkKiCalc = "var nKi = classes.known['monk(laserllama)'] ? Number(classes.known['monk(laserllama)'].level) + Number(What('Wis Mod')) : 0; for (var i = 0; i < CurrentFeats.known.length; i++) { if (CurrentFeats.known[i] == 'mystic warrior') nKi += 2; } event.value = Math.max(0, nKi);";

ClassList["monk(laserllama)"] = {
	name : "Monk (LaserLlama)",
	regExpSearch : /^(?=.*monk)(?=.*laserllama).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Dexterity and Wisdom",
	prereqs : "Dexterity 13 and Wisdom 13",
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Str", "Dex"],
	toolProfs : {
		primary : [["Artisan's tools or musical instrument", 1]]
	},
	skillstxt : {
		primary : "Choose two from Acrobatics, Athletics, History, Insight, Nature, Religion, and Stealth"
	},
	armorProfs : {
		primary : [false, false, false, false]
	},
	weaponProfs : {
		primary : [true, false, ["shortsword"]],
		secondary : [true, false, ["shortsword"]]
	},
	equipment : "Monk (LaserLlama) starting equipment:" +
		"\n \u2022 A shortsword -or- any simple weapon;" +
		"\n \u2022 A shortbow and 20 arrows -or- 20 darts;" +
		"\n \u2022 A dungeoneer's pack -or- an explorer's pack;" +
		"\n \u2022 A holy symbol -or- a musical instrument." +
		"\n\nAlternatively, choose 5d4 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Monastic Tradition", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	abilitySave : 5,
	features : {
		"martial arts" : {
			name : "Martial Arts",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"Martial Arts attacks: unarmed strikes and melee weapons without the heavy or special property",
				"Without heavy armor, a shield, or a heavy weapon: I can use Dex instead of Str for them and the Martial Arts die",
				"I can use Dex for Athletics checks to grapple or shove",
				"When I take the Attack action and make a Martial Arts attack, I can make an unarmed strike as a bonus action"
			]),
			additional : levels.map(function (n) { return "1d" + LLMonkDieN(n); }),
			weaponsAdd : ["Unarmed Strike"],
			action : [["bonus action", "Unarmed Strike (with Attack action)"]],
			addMod : [{ type : "skill", field : "Athletics", mod : "max(Dex-Str|0)", text : "Martial Arts: I can use Dexterity instead of Strength for Athletics checks to grapple or shove." }],
			eval : function () {
				AddString('Extra.Notes', 'Monk (LaserLlama) features:\n\u25C6 If I wear heavy armor, a shield, or wield a heavy weapon, I lose Martial Arts; with any armor or a shield, I lose Unarmored Defense and Unarmored Movement');
				show3rdPageNotes();
			},
			removeeval : function () {
				RemoveString('Extra.Notes', 'Monk (LaserLlama) features:\n\u25C6 If I wear heavy armor, a shield, or wield a heavy weapon, I lose Martial Arts; with any armor or a shield, I lose Unarmored Defense and Unarmored Movement');
			},
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!classes.known["monk(laserllama)"] || !classes.known["monk(laserllama)"].level) return;
						var bHurricane = LLMonkSub("way of the hurricane");
						if (v.theWea.monkweapon || v.baseWeaponName == "unarmed strike" || (v.isMeleeWeapon && (/simple|martial/i).test(v.theWea.type) && (bHurricane || !(/heavy|special/i).test(fields.Description)))) {
							v.theWea.monkweapon = true;
							var aMonkDie = LLMonkDieN(classes.known["monk(laserllama)"].level);
							try {
								var curDie = eval_ish(fields.Damage_Die.replace('d', '*'));
							} catch (e) {
								var curDie = 'x';
							}
							if (isNaN(curDie) || curDie < aMonkDie) fields.Damage_Die = '1d' + aMonkDie;
							// Dexterity, or Constitution (Way of the Boulder), or Wisdom (Way of the Mystic)
							var aAbi = [v.StrDex];
							if (LLMonkSub("way of the boulder")) aAbi.push(3);
							if (LLMonkSub("way of the mystic")) aAbi.push(5);
							for (var i = 0; i < aAbi.length; i++) {
								if (fields.Mod === 1 || fields.Mod === 2 || What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod") < What(AbilityScores.abbreviations[aAbi[i] - 1] + " Mod")) fields.Mod = aAbi[i];
							}
						}
					},
					"I can use Dexterity and my Martial Arts damage die for 'Martial Arts attacks': unarmed strikes and melee weapons without the heavy or special property.",
					5
				]
			}
		},
		"unarmored defense" : {
			name : "Unarmored Defense",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("Without armor and no shield, my AC is 10 + Dexterity modifier + Wisdom modifier"),
			armorOptions : [{
				regExpSearch : /justToAddToDropDownLLMonk/,
				name : "Unarmored Defense (Wis)",
				source : [["GMB:LL", 0]],
				ac : "10+Wis",
				affectsWildShape : true,
				selectNow : true
			}]
		},
		"mystic techniques" : (function () {
			var oFea = {
				name : "Mystic Techniques",
				source : [["GMB:LL", 0]],
				minlevel : 2,
				description : LLdesc([
					"My Ki pool is my monk level + Wis mod; I regain it on a short rest (30 min of meditation)",
					"I can spend Ki on only one feature or Technique per attack, check, reaction, or save",
					"I know Techniques (use \"Choose Feature\"); I can replace one when I gain a monk level",
					"Flurry of Blows: as a bonus action, I spend 1 Ki to make two unarmed strikes"
				]),
				limfeaname : "Ki Points",
				usages : "Monk level + Wis mod per ",
				usagescalc : LLMonkKiCalc,
				recovery : "short rest",
				action : [["bonus action", "Flurry of Blows (1 Ki)"]],
				extraname : "Mystic Technique",
				extrachoices : [],
				extraTimes : [0, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 9, 10, 10, 10]
			};
			var aKeys = [];
			for (var sT in LLMonkTech) aKeys.push(sT);
			aKeys.sort(function (a, b) { return (LLMonkTech[a].techLevel - LLMonkTech[b].techLevel) || (a > b ? 1 : -1); });
			for (var i = 0; i < aKeys.length; i++) {
				oFea.extrachoices.push(LLMonkTech[aKeys[i]].name);
				oFea[aKeys[i]] = LLMonkTechChoice(aKeys[i], true);
			}
			return oFea;
		})(),
		"unarmored movement" : {
			name : "Unarmored Movement",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("While using Unarmored Defense, my speed increases"),
			additional : levels.map(function (n) {
				return n < 2 ? "" : "+" + (n < 6 ? 10 : n < 10 ? 15 : n < 14 ? 20 : n < 18 ? 25 : 30) + " ft";
			}),
			changeeval : function (v) {
				var monkSpd = '+' + (v[1] < 2 ? 0 : v[1] < 6 ? 10 : v[1] < 10 ? 15 : v[1] < 14 ? 20 : v[1] < 18 ? 25 : 30);
				SetProf('speed', monkSpd !== '+0', { allModes : monkSpd }, "Monk (LaserLlama): Unarmored Movement");
			}
		},
		"subclassfeature3" : {
			name : "Monastic Tradition",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Choose a Monastic Tradition and put it in the \"Class\" field; Signature Techniques don't count against my Techniques Known")
		},
		"extra attack" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"I can attack twice instead of once whenever I take the Attack action",
				"If I use my action to Dash or Disengage, I can make one Martial Arts attack as a bonus action"
			]),
			action : [["bonus action", "Martial Arts attack (after Dash/Disengage)"]]
		},
		"enlightened strikes" : {
			name : "Enlightened Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("My unarmed strikes are magical; my other Martial Arts attacks are magical while I have Ki remaining"),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.baseWeaponName == "unarmed strike" && !v.thisWeapon[1] && !(/counts as( a)? magical/i).test(fields.Description)) {
							fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical';
						}
					},
					"My unarmed strikes count as magical for overcoming resistances and immunities."
				]
			}
		},
		"evasion" : {
			name : "Evasion",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("My Dexterity saves vs. areas of effect negate damage on success and halve it on failure"),
			savetxt : { text : ["Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg"] }
		},
		"spirit of tranquility" : {
			name : "Spirit of Tranquility",
			source : [["GMB:LL", 0]],
			minlevel : 9,
			description : LLdesc("When I make a saving throw, I can spend 1 Ki to add my Wis mod (min +1) to the result")
		},
		"warrior's spirit" : {
			name : "Warrior's Spirit",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : levels.map(function (n) { return LLdesc("I regain " + (n < 20 ? 1 : 2) + " expended Ki at the start of each of my turns in combat, unless incapacitated"); })
		},
		"purity of body" : {
			name : "Purity of Body",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("I'm immune to disease and the poisoned condition; I gain proficiency in Constitution saves"),
			saves : ["Con"],
			savetxt : { immune : ["poisoned", "disease"] }
		},
		"purity of mind" : {
			name : "Purity of Mind",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("If I'm charmed or frightened at the start of my turn, I can spend 1 Ki to end that condition on myself")
		},
		"timeless body" : {
			name : "Timeless Body",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I don't need food or water and suffer none of the frailty of old age; I age only 1 year every 10 years")
		},
		"purity of spirit" : {
			name : "Purity of Spirit",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc([
				"A short rest takes only 1 minute of light activity for me",
				"When I roll initiative, I regain Wis mod (min 1) Ki; Warrior's Spirit restores 2 Ki per turn"
			])
		}
	}
};

// ===================================================================================
// MONASTIC TRADITIONS (Alternate Monk v3.1.1)
// ===================================================================================
AddSubClass("monk(laserllama)", "way of the astral warrior", {
	regExpSearch : /^(?=.*astral)(?=.*warrior).*$/i,
	subname : "Way of the Astral Warrior",
	fullname : "Astral Warrior",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLMonkSignature("Astral Warrior", [["deflect strike", 3], ["deflect missile", 5], ["aura sight", 9]]),
		"subclassfeature3.1" : {
			name : "Astral Armor",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var d = "1d" + LLMonkDieN(n);
				return LLdesc([
					"As a bonus action, I spend " + (n < 17 ? 1 : 2) + " Ki to manifest Astral Armor for 10 min (ends if incapacitated or dismissed):",
					"On manifest, creatures within 10 ft: Dex save or 2 Martial Arts Dice force damage",
					"I can use Wis for Str checks and saves; special unarmed strikes use Wis, +5 ft reach, deal force damage"
				].concat(n < 17 ? [] : ["Master: I reduce damage I take by my Wis mod; as an action, 20-ft cone: Dex save or 4 MAD force (half on save)"]));
			}),
			action : [["bonus action", " (manifest)"]],
			weaponOptions : [{
				regExpSearch : /^(?=.*astral)(?=.*(strike|arm)).*$/i,
				name : "Astral Arm Strike",
				source : [["GMB:LL", 0]],
				ability : 5,
				type : "Natural",
				damage : [1, 6, "force"],
				range : "Melee (+5 ft reach)",
				description : "Unarmed strike with Astral Armor; uses Wis",
				abilitytodamage : true,
				monkweapon : true
			}],
			weaponsAdd : ["Astral Arm Strike"]
		},
		"subclassfeature6" : {
			name : "Astral Visage",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I learn thaumaturgy (Wis); +Martial Arts Die to Insight and Intimidation checks; with Astral Armor, I see in magical darkness to 120 ft"),
			spellcastingBonus : [{ name : "Astral Visage", spells : ["thaumaturgy"], selection : ["thaumaturgy"], spellcastingAbility : 5, firstCol : "atwill" }]
		},
		"subclassfeature10" : {
			name : "Mystical Defense",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("With Astral Armor, deflect strike and deflect missile cost no Ki and gain their 11th-level benefits; after using one, my next unarmed strike deals +1 Martial Arts Die")
		},
		"subclassfeature17" : {
			name : "Master Astral Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("Astral Armor costs 2 Ki; while manifested, I reduce damage by my Wis mod and can use an action for a 20-ft cone barrage (Dex save, 4 MAD force)"),
			action : [["action", "Astral Barrage"]]
		}
	}
});

AddSubClass("monk(laserllama)", "way of the drunken fist", {
	regExpSearch : /^(?=.*drunken)(?=.*fist).*$/i,
	subname : "Way of the Drunken Fist",
	fullname : "Drunken Fist",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Dancing Fool",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Performance and brewer's supplies or a musical instrument; +Martial Arts Die to checks with them"),
			skills : ["Performance"],
			toolProfs : [["Brewer's supplies or musical instrument", 1]]
		},
		"subclassfeature3.1" : LLMonkSignature("Drunken", [["step of the wind", 3], ["deflect missile", 5], ["heavenly step", 9]]),
		"subclassfeature3.2" : {
			name : "Drunken Style",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("When I hit a creature with a Martial Arts attack, +5 ft speed and it can't make opportunity attacks vs. me until my next turn")
		},
		"subclassfeature6" : {
			name : "Unpredictable Sway",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"Dancing Leap: standing up from prone costs me no movement",
				"Tipsy Strike: when a creature I see misses me with a melee attack, I can use my reaction and 1 Ki to redirect it to another target"
			]),
			action : [["reaction", "Tipsy Strike (1 Ki)"]]
		},
		"subclassfeature10" : {
			name : "Chaotic Luck",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I make an attack, check, or save with disadvantage, I can spend 1 Ki to cancel the disadvantage")
		},
		"subclassfeature17" : {
			name : "Master of the Drunken Fist",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("When I take the Attack action, I can make one Martial Arts attack vs. each creature I move past within reach (beyond the normal limit)")
		}
	}
});

AddSubClass("monk(laserllama)", "way of harmony", {
	regExpSearch : /^(?=.*harmony)(?=.*monk).*$/i,
	subname : "Way of Harmony",
	fullname : "Harmony",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLMonkSignature("Harmony", [["mystic regeneration", 3], ["gentling touch", 5], ["mantle of courtesy", 9]]),
		"subclassfeature3.1" : {
			name : "Monastic Healer",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Insight, Medicine, and the herbalism kit; +Martial Arts Die to checks with them"),
			skills : ["Insight", "Medicine"],
			toolProfs : ["Herbalism kit"]
		},
		"subclassfeature3.2" : {
			name : "Touch of Life & Death",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var d = "1d" + LLMonkDieN(n);
				return LLdesc([
					"Life: once per turn, I forgo an unarmed strike and spend 1 Ki to touch a creature: it regains " + d + " + Wis mod HP (not constructs/undead)",
					"Death: once per turn on an unarmed strike hit, 1 Ki: +" + d + " necrotic damage (radiant vs. undead)"
				].concat(n < 6 ? [] : ["Life also cures a disease or ends blinded, deafened, paralyzed, poisoned, or stunned; Death also poisons until my next turn"])
					.concat(n < 10 ? [] : ["I can spend extra Ki (up to Wis mod) to add +1 Martial Arts Die per Ki to either"]));
			})
		},
		"subclassfeature6" : {
			name : "Mystic Manipulation",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("Touch of Life can also cure a disease or end a condition; Touch of Death can also poison the target until my next turn")
		},
		"subclassfeature10" : {
			name : "Harmonious Touch",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("With Touch of Life or Death, I can spend extra Ki (up to Wis mod) to add one Martial Arts Die per Ki")
		},
		"subclassfeature17" : {
			name : "Master of Harmony",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("As an action, 6 Ki: I return to life a creature dead for up to 24 hours with monk level + Wis mod HP and its conditions ended (once per creature per long rest)"),
			action : [["action", " (6 Ki)"]]
		}
	}
});

AddSubClass("monk(laserllama)", "way of the open hand", {
	regExpSearch : /^(?=.*open)(?=.*hand).*$/i,
	subname : "Way of the Open Hand",
	fullname : "Open Hand",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLMonkSignature("Open Hand", [["empowered strike", 3], ["stunning strike", 5], ["indomitable spirit", 9]], LLdesc("I learn these Techniques (not counted in Techniques Known); when I gain a level, I can replace one with another Strike Technique")),
		"subclassfeature3.1" : {
			name : "Practiced Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Once on each of my turns when I hit with an unarmed strike, I can use a Strike Technique I know without spending Ki"),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest"
		},
		"subclassfeature6" : {
			name : "Ebb and Flow",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"When a creature I see misses me with a melee attack, I can use my reaction for:",
				"Toppling Blow: Dex save (adv. if larger) or prone and speed 0 until the end of its turn; or Swift Reprisal: one unarmed strike vs. it"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature10" : {
			name : "Open Hand Strike & Master of Many Forms",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"When I crit with an unarmed strike, the target has disadv. on saves I force as part of that attack",
				"During each long rest, 10 min of practice lets me replace one Technique I know with another"
			])
		},
		"subclassfeature17" : {
			name : "Master of the Open Hand",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("When I use Flurry of Blows, Swift Reprisal, or make an opportunity attack, I can make one additional unarmed strike")
		}
	}
});

AddSubClass("monk(laserllama)", "way of radiance", {
	regExpSearch : /^(?=.*radiance)(?=.*monk).*$/i,
	subname : "Way of Radiance",
	fullname : "Radiance",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLMonkSignature("Radiant", [["step of the wind", 3], ["deflect missile", 5], ["indomitable spirit", 9]]),
		"subclassfeature3.1" : {
			name : "Radiant Bolt",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I know light (Wis); whenever I can make an unarmed strike, I can make a Radiant Bolt instead",
				"Ranged spell attack (30/60 ft), Martial Arts Die + Wis mod radiant; counts as a melee Martial Arts attack for Techniques"
			]),
			spellcastingBonus : [{ name : "Radiant Bolt", spells : ["light"], selection : ["light"], spellcastingAbility : 5, firstCol : "atwill" }],
			weaponOptions : [{
				regExpSearch : /^(?=.*radiant)(?=.*bolt).*$/i,
				name : "Radiant Bolt",
				source : [["GMB:LL", 0]],
				ability : 5,
				type : "Spell",
				damage : [1, 6, "radiant"],
				range : "30/60 ft",
				description : "Ranged spell attack in place of an unarmed strike; counts as melee Martial Arts attack for Techniques",
				abilitytodamage : true,
				monkweapon : true
			}],
			weaponsAdd : ["Radiant Bolt"]
		},
		"subclassfeature6" : {
			name : "Luminous Spirit & Searing Blast",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"When I deal radiant damage, I can spend 1 Ki: Con save or blinded until the start of my next turn",
				"Searing Blast: bonus action, 1 Ki: 15-ft cone, Dex save or 3 Martial Arts Dice radiant (half on save)"
			]),
			action : [["bonus action", "Searing Blast (1 Ki)"]]
		},
		"subclassfeature10" : {
			name : "Luminous Burst",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("As an action, 100-ft long 5-ft wide line: Dex save or 6 MAD radiant (half on save); +1 MAD per extra Ki (up to Wis mod); 3 Ki when out of uses"),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["action", ""]]
		},
		"subclassfeature17" : {
			name : "Master of Radiance",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc([
				"With Unarmored Movement, I have a flying speed equal to my speed; I shed 30-ft bright sunlight (bonus action to toggle)",
				"My radiant features count as sunlight; resistance to necrotic, immunity to radiant and blinded"
			]),
			dmgres : ["Necrotic"],
			savetxt : { immune : ["radiant", "blinded"] },
			speed : { fly : { spd : "walk", enc : "walk" } }
		}
	}
});

AddSubClass("monk(laserllama)", "way of the reaper", {
	regExpSearch : /^(?=.*reaper)(?=.*monk).*$/i,
	subname : "Way of the Reaper",
	fullname : "Reaper",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLMonkSignature("Reaper", [["crippling strike", 3], ["slowing strike", 5], ["aura sight", 9]]),
		"subclassfeature3.1" : {
			name : "Frightful Touch",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Once per turn on a melee Martial Arts hit, 1 Ki: Wis save or frightened of me until the start of my next turn")
		},
		"subclassfeature3.2" : {
			name : "Warrior of Death",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"My unarmed strikes can deal necrotic damage; I have resistance to necrotic damage",
				"I have adv. on saves to resist and end frightened; my corpse is under gentle repose for days equal to my remaining Ki"
			]),
			dmgres : ["Necrotic"],
			savetxt : { adv_vs : ["frightened"] }
		},
		"subclassfeature6" : {
			name : "Pierce the Veil & Sinister Vitality",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"As an action, I touch a corpse and spend Ki (up to Wis mod) to ask it one question per Ki (speak with dead; once per corpse)",
				"Once per turn when I deal necrotic damage to a living creature, I gain Wis mod (min 1) temp HP",
				"While I have them, I resist nonmagical, nonsilvered bludgeoning, piercing, and slashing damage"
			]),
			action : [["action", "Pierce the Veil"]]
		},
		"subclassfeature10" : {
			name : "Armor of the Grave",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When reduced to 0 HP (not killed outright), I can spend 1 Ki to drop to 1 HP instead (and feign death); +1 Ki cost each use until a long rest")
		},
		"subclassfeature17" : {
			name : "Master of Reaping",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("Once per turn, I forgo an attack to touch a creature and spend up to 10 Ki: Con save (disadv. if frightened of me) or 2 MAD necrotic per Ki (half on save)")
		}
	}
});

AddSubClass("monk(laserllama)", "way of the rising dragon", {
	regExpSearch : /^(?=.*rising)(?=.*dragon).*$/i,
	subname : "Way of the Rising Dragon",
	fullname : "Rising Dragon",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLMonkSignature("Rising Dragon", [["step of the wind", 3], ["deflect missile", 5], ["indomitable spirit", 9]]),
		"subclassfeature3.1" : {
			name : "Draconic Disciple",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I learn Draconic and Deception, Intimidation, or Persuasion (+Martial Arts Die to its checks)",
				"I choose an Element (acid, cold, fire, lightning, or poison); my unarmed strikes can deal that damage"
			]),
			languageProfs : ["Draconic"],
			skillstxt : "Choose one from Deception, Intimidation, or Persuasion"
		},
		"subclassfeature3.2" : {
			name : "Elemental Breath",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"When I take the Attack action, I can forgo one attack: " + (n < 17 ? "15-ft cone or 30-ft line" : "30-ft cone or 60-ft line") + ", Dex save",
					"2 Martial Arts Dice Element damage" + (n < 10 ? "" : " + Wis mod") + " (half on save); +1 MAD per extra Ki (up to Wis mod)"
				]);
			})
		},
		"subclassfeature6" : {
			name : "Ascendant Step",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When I use step of the wind, I gain a flying speed equal to my walking speed until the end of my turn")
		},
		"subclassfeature10" : {
			name : "Draconic Mantle",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : levels.map(function (n) {
				return LLdesc("I and creatures of my choice within " + (n < 17 ? 10 : 30) + " ft resist my Element and have adv. on saves vs. charmed or frightened; my Elemental Breath adds my Wis mod");
			})
		},
		"subclassfeature17" : {
			name : "Master of Draconic Might",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("I gain a flying speed equal to my walking speed; Draconic Mantle 30 ft; Elemental Breath: 30-ft cone or 60-ft line"),
			speed : { fly : { spd : "walk", enc : "walk" } }
		}
	}
});

AddSubClass("monk(laserllama)", "way of the shadow arts", {
	regExpSearch : /^(?=.*shadow)(?=.*arts?).*$/i,
	subname : "Way of the Shadow Arts",
	fullname : "Shadow Arts",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Eyes of Night",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain darkvision 60 ft (or +30 ft); adv. on Stealth checks to hide in darkness"),
			vision : [["Darkvision", "fixed 60"], ["Darkvision", "+30"]]
		},
		"subclassfeature3.1" : LLMonkSignature("Shadow", [["slow fall", 3], ["gentling touch", 5], ["heavenly step", 9]]),
		"subclassfeature3.2" : {
			name : "Shadow Arts",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"I can cast darkness, darkvision, pass without trace, and silence (Wis, body is the focus); I see through my darkness",
					n < 17 ? "Each once per long rest for free, then 2 Ki per cast" : "I can cast them at will; greater invisibility and shadow of moil once per long rest each, then 4 Ki"
				]);
			}),
			spellcastingBonus : [{
				name : "Shadow Arts",
				spells : ["darkness", "darkvision", "pass without trace", "silence"],
				selection : ["darkness", "darkvision", "pass without trace", "silence"],
				spellcastingAbility : 5,
				times : 4,
				firstCol : "oncelr"
			}],
			spellChanges : {
				"darkness" : { components : "S", compMaterial : "", changes : "No verbal or material components; I can see through my darkness" }
			}
		},
		"subclassfeature6" : {
			name : "Shadow Step",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc("In dim light or darkness, as a bonus action I teleport up to " + (n < 17 ? 60 : 120) + " ft to dim light or darkness I see; then adv. on my next Martial Arts attack this turn");
			}),
			action : [["bonus action", ""]]
		},
		"subclassfeature10" : {
			name : "Cloak of Shadows",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : levels.map(function (n) {
				return LLdesc([
					"In dim light or darkness, as " + (n < 17 ? "an action" : "a bonus action") + " I become invisible until I attack, cast, or enter bright light",
					"If a creature moves into my reach, I can make an opportunity attack; it only ends invisibility if it hits"
				]);
			}),
			action : [["action", ""]]
		},
		"subclassfeature17" : {
			name : "Master of Shadows",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("Shadow Arts spells at will; Shadow Step 120 ft; Cloak of Shadows as a bonus action; greater invisibility and shadow of moil once per long rest, then 4 Ki"),
			spellcastingBonus : [{
				name : "Master of Shadows",
				spells : LLSpellList(["greater invisibility", "shadow of moil"]),
				selection : LLSpellList(["greater invisibility", "shadow of moil"]),
				spellcastingAbility : 5,
				times : LLSpellList(["greater invisibility", "shadow of moil"]).length,
				firstCol : "oncelr"
			}]
		}
	}
});

AddSubClass("monk(laserllama)", "way of shining steel", {
	regExpSearch : /^(?=.*shining)(?=.*steel).*$/i,
	subname : "Way of Shining Steel",
	fullname : "Shining Steel",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLMonkSignature("Shining", [["patient defense", 3], ["seeking strike", 5], ["heavenly step", 9]]),
		"subclassfeature3.1" : {
			name : "Signature Weapons",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I choose one melee weapon (not heavy/special) and one ranged weapon (one more at 6th, 10th, and 17th level)",
				"I'm proficient with them and they count as Martial Arts attacks; add \"Signature\" to the weapon's name"
			]),
			additional : levels.map(function (n) { return n < 3 ? "" : (n < 6 ? 2 : n < 10 ? 3 : n < 17 ? 4 : 5) + " Signature Weapons"; }),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/signature/i).test(v.WeaponText)) {
							v.theWea.monkweapon = true;
							fields.Proficiency = true;
						}
					},
					"Weapons with 'Signature' in their name count as Martial Arts attacks and I'm proficient with them.",
					1
				]
			}
		},
		"subclassfeature3.2" : {
			name : "Deadly Perfection",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"Masterful Aim: as a bonus action, until the end of my turn my Signature Weapon d20 rolls of 7 or lower count as 8",
				"Masterful Parry: as a reaction when hit by a melee attack, +Wis mod (min +1) AC vs. it while wielding a Signature Weapon"
			]),
			action : [["bonus action", "Masterful Aim"], ["reaction", "Masterful Parry"]]
		},
		"subclassfeature6" : {
			name : "Shining Steel",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"Ki Blade: Signature Weapons can deal radiant damage; Perfect Strike: once per turn on a hit, 1 Ki for +1 Martial Arts Die",
				"Steel Wind: with Flurry of Blows, I can replace one unarmed strike with a Signature Weapon attack"
			])
		},
		"subclassfeature10" : {
			name : "Spirit Blade",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("During a long rest, 1 hour ritual: I infuse each Signature Weapon with Ki (up to Wis mod): 1 Ki crit 19-20, 3 Ki 18-20, 5 Ki 17-20; that Ki is locked until the next ritual")
		},
		"subclassfeature17" : {
			name : "Master of Shining Steel",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("Once per short rest when I attack with a Signature Weapon, I can replace the d20 roll with my monk level (critical if it would be one)"),
			usages : 1,
			recovery : "short rest"
		}
	}
});

var LLWuJenSpells = [
	"beckon air", "blade ward", "control flame", "create bonfire", "druidcraft", "frostbite", "light", "magic stone", "mold earth", "ray of frost", "shape water", "thorn whip", "thunderclap",
	"absorb elements", "armor of agathys", "burning hands", "create or destroy water", "create water", "earth tremor", "ensnaring strike", "entangle", "fog cloud", "hail of thorns", "hellish rebuke", "ice knife", "sanctuary", "thunderwave", "witch bolt",
	"barkskin", "continual flame", "dust devil", "earthbind", "maximilian's earthen grasp", "earthen grasp", "flame blade", "flaming sphere", "gust of wind", "hold person", "levitate", "misty step", "scorching ray", "shatter", "snilloc's snowball swarm", "snowball swarm", "spike growth", "warding wind",
	"call lightning", "conjure elemental", "erupting earth", "fireball", "fly", "gaseous form", "grasping vine", "lightning bolt", "meld into stone", "melf's minute meteors", "minute meteors", "plant growth", "sleet storm", "speak with plants", "thunder step", "tidal wave", "wall of sand", "wall of water", "wind wall",
	"control water", "elemental bane", "fire shield", "freedom of movement", "guardian of nature", "ice storm", "pillars of earth", "resilient sphere", "stone shape", "stoneskin", "storm sphere", "wall of fire", "watery sphere"
];
AddSubClass("monk(laserllama)", "way of the wu jen", {
	regExpSearch : /^(?=.*wu)(?=.*jen).*$/i,
	subname : "Way of the Wu Jen",
	fullname : "Wu Jen",
	source : [["GMB:LL", 0]],
	abilitySave : 5,
	spellcastingFactor : "warlock3",
	spellcastingTable : [[0, 0, 0, 0, 0, 0, 0, 0, 0]].concat(levels.map(function (n) {
		var a = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		if (n < 3) return a;
		a[(n < 7 ? 1 : n < 13 ? 2 : n < 19 ? 3 : 4) - 1] = n < 4 ? 1 : 2;
		return a;
	})),
	spellcastingList : {
		spells : LLSpellList(LLWuJenSpells)
	},
	spellcastingKnown : {
		cantrips : [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4],
		spells : [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7]
	},
	features : {
		"subclassfeature3" : {
			name : "Disciple of the Elements",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I cast Wu Jen spells (Wisdom); all slots are the same level, regained on a short rest",
				"My body is my focus and I need no material components; I can swap one spell when I gain a level"
			]),
			additional : levels.map(function (n) {
				if (n < 3) return "";
				return (n < 10 ? 2 : n < 17 ? 3 : 4) + " cantrips & " + [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7][n - 1] + " spells known";
			})
		},
		"subclassfeature3.1" : {
			name : "Fist of the Five Ways",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("My unarmed strikes can deal the damage type of a Wu Jen spell I know; if I do, their reach increases by 5 ft")
		},
		"subclassfeature6" : {
			name : "Elemental Spirit",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"As a bonus action, I spend 1 + my slot level in Ki to regain one Wu Jen spell slot",
				"When I use my action to cast a Wu Jen spell, I can make one unarmed strike as a bonus action"
			]),
			action : [["bonus action", " (regain slot)"]]
		},
		"subclassfeature10" : {
			name : "Spiritual Flow",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I cast a 1-action Wu Jen spell, I can spend 2 Ki to cast it as a bonus action instead")
		},
		"subclassfeature17" : {
			name : "Master of the Elements",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc([
				"As an action, I take an Elemental Form for 1 min: flying speed = walking speed, resist B/P/S, crits vs. me become hits",
				"OAs vs. me have disadv.; temp HP = Wis mod at the start of my turns; once per long rest free, then 6 Ki"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		}
	}
});
LLAddSpellsToClass("wu jen(laserllama)", LLWuJenSpells);

// ===================================================================================
// ADDITIONAL TRADITIONS (Alternate Monk Expanded v3.1.1)
// ===================================================================================
AddSubClass("monk(laserllama)", "way of the boulder", {
	regExpSearch : /^(?=.*boulder)(?=.*monk).*$/i,
	subname : "Way of the Boulder",
	fullname : "Boulder",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLMonkSignature("Boulder", [["deflect strike", 3], ["crushing strike", 5], ["tremor strike", 9]]),
		"subclassfeature3.1" : {
			name : "Solid Body",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I can use Con instead of Dex for my Martial Arts features and Unarmored Defense",
				"On Str checks and saves, I can spend 1 Ki to add my Con mod (no Ki needed while touching the ground)"
			]),
			armorOptions : [{
				regExpSearch : /^(?=.*unarmored)(?=.*defen[cs]e)(?=.*con)(?=.*wis).*$/i,
				name : "Unarmored Defense (Con+Wis)",
				source : [["GMB:LL", 0]],
				ac : "10+Con+Wis",
				dex : -10,
				affectsWildShape : true,
				selectNow : true
			}]
		},
		"subclassfeature6" : {
			name : "Rebounding Defense",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I can use deflect strike without spending Ki, using my Con instead of Dex for the reduction")
		},
		"subclassfeature10" : {
			name : "Density of Spirit",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I resist acid, bludgeoning, cold, fire, lightning, piercing, slashing, or thunder (change on a short rest, or as a bonus action for 2 Ki)"),
			action : [["bonus action", " (2 Ki, change)"]]
		},
		"subclassfeature17" : {
			name : "Mighty Form & Earthshaker",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc([
				"My Constitution score and maximum increase by 2 (max 22)",
				"Tremor strike can affect a 25-ft radius around me (I ignore its difficult terrain); Con mod times per long rest without Ki (as 1 Ki)"
			]),
			scores : [0, 0, 2, 0, 0, 0],
			scoresMaximum : [0, 0, 22, 0, 0, 0],
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "long rest"
		}
	}
});

LLExploitTables["monk(laserllama)-way of the brawler"] = {
	cls : "monk(laserllama)",
	sub : "monk(laserllama)-way of the brawler",
	factor : 0.5,
	dice : [0, 0, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4],
	die : ["", "", "d4", "d4", "d4", "d4", "d6", "d6", "d6", "d6", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d8"],
	maxDegree : [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3]
};
AddSubClass("monk(laserllama)", "way of the brawler", {
	regExpSearch : /^(?=.*brawler)(?=.*monk).*$/i,
	subname : "Way of the Brawler",
	fullname : "Brawler",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLExploitFeature({
			name : "Savage Exploits",
			minlevel : 3,
			cls : "monk(laserllama)",
			list : "barbarian(laserllama)",
			tableKey : "monk(laserllama)-way of the brawler",
			sheet : "savage exploits",
			sheetName : "Savage Exploits",
			ability : 5,
			notesTitle : "Brawler Savage Exploits",
			extraname : "Savage Exploit",
			extraTimes : [0, 0, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7],
			description : LLdesc([
				"I learn Savage Exploits of the Alternate Barbarian (use \"Choose Feature\"); I can swap one when I gain a monk level",
				"Brutal Cunning: Str prerequisites can be met with Wisdom; they use my Technique save DC",
				"One Exploit per check, attack, or save, and not together with a Technique"
			])
		}),
		"subclassfeature3.0" : LLExploitDiceFeature("monk(laserllama)-way of the brawler", 3, "Monk (LaserLlama)"),
		"subclassfeature3.1" : {
			name : "Streetwise",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Intimidation and learn Thieves' Cant"),
			skills : ["Intimidation"],
			languageProfs : ["Thieves' Cant"]
		},
		"subclassfeature6" : {
			name : "Violent Enlightenment",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("My melee Martial Arts attacks crit on 19-20; when I crit with one, I regain 1 Ki"),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.theWea.monkweapon && v.isMeleeWeapon && !v.isSpell && (!v.CritChance || v.CritChance > 19)) {
							fields.Description += (fields.Description ? "; " : "") + "Crit on 19-20";
							v.CritChance = 19;
						}
					},
					"My melee Martial Arts attacks score a critical hit on 19-20.",
					20
				]
			}
		},
		"subclassfeature10" : {
			name : "Infamous Reputation",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("As a bonus action, 1 Ki: a creature within 30 ft that sees/hears me: Wis save or frightened until my next turn; frightened creatures have disadv. on saves vs. my Savage Exploits"),
			action : [["bonus action", " (1 Ki)"]]
		},
		"subclassfeature17" : {
			name : "Master of Brutality",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("Adv. on Martial Arts attacks vs. creatures frightened of me; on a melee Martial Arts crit, it automatically fails saves vs. my Techniques and Exploits")
		}
	}
});
// Brutal Cunning: Wisdom can stand in for Strength prerequisites of Savage Exploits learned by the Brawler
(function () {
	var oF = ClassSubList["monk(laserllama)-way of the brawler"].features["subclassfeature3"];
	for (var i = 0; i < oF.extrachoices.length; i++) {
		var oCh = oF[oF.extrachoices[i].toLowerCase()];
		if (!oCh || !oCh.prereqeval) continue;
		oCh.prereqeval = (function (fOld, sSp) {
			return function (v) {
				if (fOld(v)) return true;
				var oSp = SpellsList[sSp];
				if (!oSp || !(/strength/i).test(oSp.prerequisite || "")) return false;
				if (oSp.level > LLExploitMaxDegree("monk(laserllama)", "monk(laserllama)-way of the brawler")) return false;
				var nReq = Number(((oSp.prerequisite || "").match(/strength (?:score )?(?:of )?(\d+)/i) || [0, 0])[1]);
				return LLScore("Wis") >= nReq;
			};
		})(oCh.prereqeval, LLExploitKey(oF.extrachoices[i]));
	}
})();

AddSubClass("monk(laserllama)", "way of ferocity", {
	regExpSearch : /^(?=.*ferocity)(?=.*monk).*$/i,
	subname : "Way of Ferocity",
	fullname : "Ferocity",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLMonkSignature("Ferocity", [["crippling strike", 3], ["stunning strike", 5], ["friend of beast & leaf", 9]]),
		"subclassfeature3.1" : {
			name : "Natural Predator",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Requires natural weapons from my race; choose one option with the \"Choose Feature\" button above (can't be changed)"),
			choices : ["Bestial Rend", "Deadly Charge", "Natural Defenses"],
			"bestial rend" : { name : "Bestial Rend", description : LLdesc("My unarmed strikes can deal slashing damage; then the target's speed is reduced by 5 ft until my next turn (at 0: disadv. on Dex saves)") },
			"deadly charge" : { name : "Deadly Charge", description : LLdesc("If I move 15 ft in a line and hit with a melee unarmed strike, the target: Str save or prone") },
			"natural defenses" : { name : "Natural Defenses", description : LLdesc("When hit by an attack I see, I can use my reaction to add my Martial Arts Die to my AC vs. it"), action : [["reaction", ""]] }
		},
		"subclassfeature6" : {
			name : "Primal Intuition",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I gain proficiency in two of Athletics, Insight, Intimidation, Perception, Stealth, or Survival; +Martial Arts Die to two of them I'm proficient in"),
			skillstxt : "Choose two from Athletics, Insight, Intimidation, Perception, Stealth, or Survival"
		},
		"subclassfeature10" : {
			name : "Ruthless Savagery",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I can use crippling strike without Ki; if I already hit the target with an unarmed strike since my last turn, it has disadv. on the save"),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest"
		},
		"subclassfeature17" : {
			name : "Master of Ferocity",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("Choose one option with the \"Choose Feature\" button above (can't be changed)"),
			choices : ["Bestial Fury", "Deadly Stampede", "Mystical Resilience"],
			"bestial fury" : { name : "Bestial Fury", description : LLdesc("When I crit with an unarmed strike, its speed is 0 and I have adv. on unarmed strikes vs. it until my next turn") },
			"deadly stampede" : { name : "Deadly Stampede", description : LLdesc("As an action, I move my speed in a line: creatures I pass: Dex save or 4 Martial Arts Dice bludgeoning and prone (half, no prone on save)"), action : [["action", ""]] },
			"mystical resilience" : { name : "Mystical Resilience", description : LLdesc("I reduce all damage I take by my Wis mod (min 1), unless incapacitated") }
		}
	}
});

AddSubClass("monk(laserllama)", "way of the flowing river", {
	regExpSearch : /^(?=.*flowing)(?=.*river).*$/i,
	subname : "Way of the Flowing River",
	fullname : "Flowing River",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Flowing River Stance",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var r = n < 6 ? 10 : n < 10 ? 15 : n < 14 ? 20 : n < 18 ? 25 : 30;
				return LLdesc("As a bonus action, until my next turn, creatures of my choice within " + r + " ft have disadv. on attacks vs. targets other than me");
			}),
			action : [["bonus action", ""]]
		},
		"subclassfeature3.1" : LLMonkSignature("Flowing River", [["deflect strike", 3], ["deflect missile", 5], ["heavenly step", 9]]),
		"subclassfeature3.2" : {
			name : "Monastic Acrobat",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Acrobatics and Performance (+Martial Arts Die to their checks); Dex for Performance with movement"),
			skills : ["Acrobatics", "Performance"]
		},
		"subclassfeature6" : {
			name : "River's Reprisal",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc([
				"In my Stance, as a reaction when a creature I see misses me: Dex save or prone and speed 0 until my next turn",
				"In my Stance, I can use deflect strike and deflect missile without spending Ki"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature10" : {
			name : "Grace of the Great Waters",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Creatures in my Stance casting damaging/save spells must include me as a target; in my Stance I have a special reaction each turn (Reprisal/deflect only)")
		},
		"subclassfeature17" : {
			name : "Master of the Flowing River",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("Deflect strike/missile: +1 MAD reduction per extra Ki (up to Wis mod); River's Reprisal also knocks back (Tiny 60, Small 40, Medium 30, Large 20, Huge 15, Garg. 10 ft)")
		}
	}
});

AddSubClass("monk(laserllama)", "way of the hurricane", {
	regExpSearch : /^(?=.*hurricane)(?=.*monk).*$/i,
	subname : "Way of the Hurricane",
	fullname : "Hurricane",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Heavy Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I'm proficient with heavy melee weapons and they count as Martial Arts attacks; with one, adv. on checks/saves vs. grapple or forced movement"),
			weaponProfs : [false, true]
		},
		"subclassfeature3.1" : LLMonkSignature("Hurricane", [["typhoon strike", 3], ["crushing strike", 5], ["tremor strike", 9]]),
		"subclassfeature3.2" : {
			name : "Tempestuous Strike",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Wielding a heavy melee weapon, typhoon strike costs no Ki; then I can make one attack with its butt as a bonus action (Martial Arts damage)"),
			action : [["bonus action", " (after typhoon strike)"]]
		},
		"subclassfeature6" : {
			name : "Crushing Counter",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As a reaction when hit by a melee attack while wielding a heavy melee weapon, I attack the attacker; on a hit, its speed is 0 until my next turn"),
			action : [["reaction", ""]]
		},
		"subclassfeature10" : {
			name : "Buffeting Winds",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"On a heavy melee hit or typhoon strike damage, 1 Ki per target: Str save or pushed 5\xD7 Wis mod ft",
				"Typhoon strike: extra Ki (up to Wis mod) for +1 MAD thunder each; then half damage on a failed save"
			])
		},
		"subclassfeature17" : {
			name : "Master of the Hurricane",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("With a heavy melee weapon, as an action, I make one melee weapon attack vs. up to five creatures within 60 ft (once per short rest, then 5 Ki)"),
			usages : 1,
			recovery : "short rest",
			action : [["action", ""]]
		}
	}
});

AddSubClass("monk(laserllama)", "way of the mystic", {
	regExpSearch : /^(?=.*mystic)(?=.*monk).*$/i,
	subname : "Way of the Mystic",
	fullname : "Mystic",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Ascended Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I can use Wisdom instead of Dexterity for my Martial Arts features")
		},
		"subclassfeature3.1" : LLMonkSignature("Mystical", [["spiritual armor", 3], ["befuddling strike", 5], ["commune with self", 9]]),
		"subclassfeature3.2" : LLMysticTalentsFeature({
			name : "Mystic Talents",
			minlevel : 3,
			cls : "monk(laserllama)",
			feature : "subclassfeature3.2",
			extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 6 ? 2 : n < 10 ? 3 : n < 17 ? 4 : 5; }),
			description : LLdesc([
				"I learn Mystic Talents of the Psion; my monk level counts for their Psion level prerequisites",
				"I use Wisdom and Ki in place of Intelligence and Psi Points; Talents use my Technique save DC"
			])
		}),
		"subclassfeature6" : {
			name : "Spiritual Assault",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As a bonus action, a creature I see within 15 ft: Cha save or Martial Arts Die psychic and disadv. on its next Int/Wis/Cha save before my next turn; 1 Ki when out of uses"),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["bonus action", ""]]
		},
		"subclassfeature10" : {
			name : "Warded Soul",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I take necrotic, psychic, or radiant damage, I can spend 1 Ki to resist that instance")
		},
		"subclassfeature17" : {
			name : "Master Mystic",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("I add my Wis mod (min 1) to psychic damage I deal; during a long rest, 1 hour of meditation lets me replace one Talent")
		}
	}
});

AddSubClass("monk(laserllama)", "way of the sacred inks", {
	regExpSearch : /^(?=.*sacred)(?=.*inks?).*$/i,
	subname : "Way of the Sacred Inks",
	fullname : "Sacred Inks",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Celestial Artist",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency (expertise) with calligrapher's supplies and learn Celestial"),
			toolProfs : [["Calligrapher's supplies", "increment"]],
			languageProfs : ["Celestial"]
		},
		"subclassfeature3.1" : {
			name : "Divine Conduit",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"Divine Judgment: my unarmed strikes can deal radiant damage; on a hit, 1 Ki for +Martial Arts Die radiant",
				"Divine Regeneration: when I spend a Hit Die, 1 Ki to use its maximum value",
				"Divine Touch: as an action, 1 Ki, a willing creature I touch regains one roll of its Hit Die + my Wis mod HP"
			]),
			action : [["action", "Divine Touch (1 Ki)"]]
		},
		"subclassfeature3.2" : LLMonkSignature("Sacred Ink", [["divine light", 3], ["impairing strike", 5], ["commune with self", 9]]),
		"subclassfeature6" : {
			name : "Heavenly Protection",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("When reduced to 0 HP, I can drop to 1 HP instead; as an action, I can spend 5 Ki to regain this use"),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature10" : {
			name : "Searing Light",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("As a bonus action, for 1 min: 10-ft bright sunlight; Divine Judgment targets also make a Con save or are blinded until my next turn"),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", ""]]
		},
		"subclassfeature17" : {
			name : "Master of the Sacred Inks",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("As a bonus action, for 1 min: angelic wings (fly = walk, hover) and Searing Light (radius = Unarmored Movement); once per long rest, then 5 Ki"),
			usages : 1,
			recovery : "long rest",
			action : [["bonus action", ""]]
		}
	}
});

AddSubClass("monk(laserllama)", "way of the vigilante", {
	regExpSearch : /^(?=.*vigilante)(?=.*monk).*$/i,
	subname : "Way of the Vigilante",
	fullname : "Vigilante",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLMonkSignature("Vigilante", [["slow fall", 3], ["crushing strike", 5], ["indomitable spirit", 9]]),
		"subclassfeature3.1" : {
			name : "Combat Ready",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency in Intimidation or Performance (+Martial Arts Die to its checks)",
				"I'm proficient with light and medium armor and shields and keep Martial Arts and Unarmored Movement with them"
			]),
			skillstxt : "Choose one from Intimidation or Performance",
			armorProfs : [true, true, false, true]
		},
		"subclassfeature3.2" : {
			name : "Heroic Persona",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action while unseen, I don my Heroic Persona (temp HP = monk level; 1/LR, then 3 Ki); I doff it as a bonus action",
					"Bonus action, 1 Ki: Wis mod temp HP; on a Martial Arts hit, 1 Ki: +Martial Arts Die damage; Wis instead of Dex for AC in light/medium armor",
					"Checks and divinations to discern my identity automatically fail"
				].concat(n < 10 ? [] : ["Inspiring Presence: I and allies within " + (n < 14 ? 20 : n < 18 ? 25 : 30) + " ft have adv. on saves vs. charmed or frightened"]));
			}),
			action : [["bonus action", " (don/doff)"]],
			extraAC : [{
				name : "Heroic Persona",
				mod : "max(Wis-Dex|0)",
				text : "With my Heroic Persona, I can use my Wisdom modifier instead of my Dexterity modifier for my AC in light or medium armor.",
				stopeval : function (v) { return !v.wearingArmor || v.heavyArmor; }
			}]
		},
		"subclassfeature6" : {
			name : "Valiant Action",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("I gain proficiency in Acrobatics or Athletics; in my Persona, I can use indomitable spirit once per turn without Ki"),
			skillstxt : "Choose one from Acrobatics or Athletics"
		},
		"subclassfeature10" : {
			name : "Inspiring Presence",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("In my Persona, I and creatures of my choice within my Unarmored Movement bonus (min 20 ft) have adv. on saves vs. charmed or frightened")
		},
		"subclassfeature17" : {
			name : "Master Vigilante",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("I'm immune to charmed and frightened; my unarmed strikes knock creatures my size or smaller back 10 ft"),
			savetxt : { immune : ["charmed", "frightened"] }
		}
	}
});

AddSubClass("monk(laserllama)", "way of the void", {
	regExpSearch : /^(?=.*void)(?=.*monk).*$/i,
	subname : "Way of the Void",
	fullname : "Void",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLMonkSignature("Void", [["step of the wind", 3], ["impairing strike", 5], ["aura sight", 9]]),
		"subclassfeature3.1" : {
			name : "Entropic Touch",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var s = n < 6 ? "2 Ki: Small" : n < 10 ? "4 Ki: Medium" : n < 17 ? "6 Ki: Large" : n < 20 ? "8 Ki: Huge" : "12 Ki: Gargantuan";
				return LLdesc("As an action, I touch a nonmagical object not worn or carried and reduce it to dust (" + s + " or smaller)");
			}),
			action : [["action", ""]]
		},
		"subclassfeature3.2" : {
			name : "Void Strike",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Once per turn on an unarmed strike hit, 1 Ki: +Martial Arts Die force; it can't regain or gain temp HP until my next turn; disadv. on concentration saves")
		},
		"subclassfeature6" : {
			name : "Vorpal Step",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("With step of the wind, I can move through nonmagical objects and creatures as difficult terrain (shunted for 1d10 force per 5 ft if I end inside)")
		},
		"subclassfeature10" : {
			name : "Unmake Magic",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I can spend 3 Ki to cast counterspell or dispel magic at 3rd level (Wisdom)"),
			spellcastingBonus : [{
				name : "Unmake Magic",
				spells : ["counterspell", "dispel magic"],
				selection : ["counterspell", "dispel magic"],
				spellcastingAbility : 5,
				times : 2,
				firstCol : "3"
			}]
		},
		"subclassfeature17" : {
			name : "Master of Entropy",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("Once per turn, I forgo an unarmed strike to touch a creature: Con save or disintegrate (6th level); once per long rest, then 6 Ki"),
			usages : 1,
			recovery : "long rest"
		}
	}
});

// ===================================================================================
// MONASTIC FEATS (Alternate Monk Expanded v3.1.1)
// ===================================================================================
FeatsList["martial artist"] = {
	name : "Martial Artist",
	source : [["GMB:LL", 0]],
	descriptionFull : "You have some basic martial arts training, giving you some skill in unarmed combat. You gain the following benefits:\n \u2022 Improved Unarmed Strikes. Your unarmed strikes deal 1d4 damage on hit and you can use Strength or Dexterity for their attack and damage rolls. Moreover, when you take the Attack action and make only unarmed strikes you can make a single unarmed strike as a bonus action on that turn.\n \u2022 Unarmored Defense. So long as you are not wearing any armor or wielding a shield, your Armor Class is equal to 10 + your Strength modifier + your Dexterity modifier.",
	description : "My unarmed strikes deal 1d4 and can use Str or Dex. When I take the Attack action and make only unarmed strikes, I can make an unarmed strike as a bonus action. Without armor or a shield, my AC is 10 + Str mod + Dex mod.",
	action : [["bonus action", "Unarmed Strike (Martial Artist)"]],
	armorOptions : [{
		regExpSearch : /^(?=.*martial)(?=.*artist).*$/i,
		name : "Martial Artist (Str)",
		source : [["GMB:LL", 0]],
		ac : "10+Str",
		affectsWildShape : true,
		selectNow : true
	}],
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.baseWeaponName == "unarmed strike") {
					if (fields.Damage_Die == 1 || fields.Damage_Die == "1") fields.Damage_Die = "1d4";
					if (What("Dex Mod") > What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod")) fields.Mod = 2;
				}
			},
			"My unarmed strikes deal 1d4 damage and can use Strength or Dexterity."
		]
	}
};
FeatsList["mystic warrior"] = {
	name : "Mystic Warrior",
	source : [["GMB:LL", 0]],
	descriptionFull : "You have mastered Mystical Techniques which allow you to perform supernatural feats. You gain the following benefits:\n \u2022 Mystic Ki. You gain a pool of 2 Ki, which you can spend to use the Mystic Techniques you know. You regain all expended Ki when you finish a short or long rest. If you already have Ki from another source, this Ki is added to that pool of Ki.\n \u2022 Techniques Known. You learn two Techniques from the Alternate Monk class. You must meet any prerequisites they have, including Monk level. If a Technique uses a Martial Arts Die, you use a d4, unless you have a higher Martial Arts Die. If a Technique requires a saving throw the DC is equal to 8 + your Proficiency Bonus + your Wisdom modifier.",
	description : "I gain 2 Ki (regained on a short rest; added to my Ki pool if I have one) and learn two Mystic Techniques (prerequisites apply; d4 Martial Arts Die if I don't have one). Technique save DC = 8 + Prof Bonus + Wis mod. Use the \"Choose Feature\" button on the class page if I'm a Monk (LaserLlama), otherwise see the Notes.",
	usages : 2,
	recovery : "short rest",
	limfeaname : "Ki Points (Mystic Warrior)",
	eval : function () {
		if (classes.known["monk(laserllama)"]) RemoveFeature("Ki Points (Mystic Warrior)");
	},
	toNotesPage : [{
		name : "Mystic Warrior Techniques",
		note : "\n   Write the two Mystic Techniques I learned with the Mystic Warrior feat here (see the Alternate Monk class for their descriptions)."
	}]
};

// ======================================================================
// LaserLlama - Alternate Rogue v2.3.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Alternate Rogue" (with Expanded options)
	Effect:		This script adds the Alternate Rogue class, its 18 Roguish Archetypes and the Roguish Feats.
				Alternate Rogue v2.3.0 and Alternate Rogue Expanded v2.3.0 by Laserllama (GM Binder, Fan Content policy)
				Devious Exploits are defined in the Common Attributes file (Compendium of Exploits v1.0).
	Sheet:		v13.2.3
	Code by:	Original scripts by CalypsoMoonlace and Valentino dell'Eco; updated to v2.3.0 in the "ll-updates" release (2026/10/19)
	How to use:	Write "Rogue (LaserLlama)" in the Class field (e.g. "Assassin Rogue (LaserLlama)")
*/


if (typeof LLExploitFeature !== "function" || !SpellsList["arresting strike"] || !SpellsList["arresting strike"].isExploit) {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

if (ClassList["rogue"]) ClassList["rogue"].regExpSearch = /^(?=.*(rogue|miscreant))(?!.*laserllama).*$/i;

LLExploitTables["rogue(laserllama)"] = {
	cls : "rogue(laserllama)",
	factor : 1,
	dice : [0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5],
	die : ["", "d4", "d4", "d4", "d6", "d6", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10"]
};
LLRogueLvl = function () { return classes.known["rogue(laserllama)"] ? classes.known["rogue(laserllama)"].level : 0; };
LLRogueSub = function (sSub) { return classes.known["rogue(laserllama)"] && classes.known["rogue(laserllama)"].subclass === "rogue(laserllama)-" + sSub; };
LLRogueDie = function (n) { return LLExploitTables["rogue(laserllama)"].die[Math.min(20, Math.max(2, n)) - 1]; };
var LLRogExpl = { cls : "rogue(laserllama)", sheet : "devious exploits", sheetName : "Devious Exploits", ability : 2 };

ClassList["rogue(laserllama)"] = {
	name : "Rogue (LaserLlama)",
	regExpSearch : /^(?=.*(rogue|miscreant))(?=.*laserllama).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Dexterity",
	prereqs : "Dexterity 13",
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Dex", "Int"],
	skillstxt : {
		primary : "Choose four from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, and Stealth",
		secondary : "Choose one from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, or Stealth"
	},
	toolProfs : {
		primary : [["Any tool", 1]],
		secondary : [["Any tool", 1]]
	},
	armorProfs : {
		primary : [true, false, false, false],
		secondary : [true, false, false, false]
	},
	weaponProfs : {
		primary : [true, false, ["blowgun", "hand crossbow", "scimitar", "shortsword", "rapier", "whip"]],
		secondary : [false, false, ["rapier", "shortsword"]]
	},
	equipment : "Rogue (LaserLlama) starting equipment:" +
		"\n \u2022 A rapier -or- a scimitar -or- a shortsword;" +
		"\n \u2022 A shortbow and a quiver of 20 arrows -or- a shortsword;" +
		"\n \u2022 A burglar's pack -or- a dungeoneer's pack;" +
		"\n \u2022 Leather armor, two daggers, and a tool set of my choice." +
		"\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Roguish Archetype", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	abilitySave : 2,
	abilitySaveAlt : 1,
	features : {
		"expertise" : (function () {
			var a = {
				name : "Expertise",
				source : [["GMB:LL", 0]],
				minlevel : 1,
				description : LLdesc("I gain expertise with skills or tools (proficiency if I didn't have it); use the \"Choose Feature\" button above"),
				additional : levels.map(function (n) { return "with " + (n < 6 ? 2 : n < 10 ? 3 : n < 15 ? 4 : n < 18 ? 5 : 6) + " skills/tools"; }),
				extraname : "Expertise",
				extrachoices : ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival", "Thieves' Tools", "Other Tool"],
				extraTimes : levels.map(function (n) { return n < 6 ? 2 : n < 10 ? 3 : n < 15 ? 4 : n < 18 ? 5 : 6; }),
				"thieves' tools" : {
					name : "Thieves' Tools Expertise",
					description : "",
					source : [["GMB:LL", 0]],
					toolProfs : [["Thieves' tools", "Dex"]],
					eval : function () { if ((/thieve.?s.*tools/i).test(What('Too Text'))) Checkbox('Too Exp', true); },
					removeeval : function () { if ((/thieve.?s.*tools/i).test(What('Too Text'))) Checkbox('Too Exp', false); }
				},
				"other tool" : {
					name : "Tool Expertise",
					description : LLdesc("I have expertise with one tool of my choice (proficiency if I didn't have it)"),
					source : [["GMB:LL", 0]]
				}
			};
			for (var i = 0; i < a.extrachoices.length; i++) {
				var attr = a.extrachoices[i].toLowerCase();
				if (a[attr]) continue;
				a[attr] = {
					name : a.extrachoices[i] + " Expertise",
					description : "",
					source : a.source,
					skills : [[a.extrachoices[i], "increment"]],
					prereqeval : function (v) {
						return v.skillExpertiseLC.indexOf(v.choice) === -1 ? true : "markButDisable";
					}
				};
			}
			return a;
		})(),
		"sneak attack" : {
			name : "Sneak Attack",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"Once per turn, I can add damage to a finesse/ranged weapon attack if I have advantage",
				"I don't need adv. if the target has a conscious hostile creature within 5 ft and I don't have disadv."
			]),
			additional : levels.map(function (n) { return Math.ceil(n / 2) + "d6"; }),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!classes.known["rogue(laserllama)"] || !classes.known["rogue(laserllama)"].level || v.isDC) return;
						var lvl = classes.known["rogue(laserllama)"].level;
						var bOK = !v.isSpell && (v.isRangedWeapon || (/\bfinesse\b/i).test(fields.Description));
						// Archetype exceptions
						if (!bOK && !v.isSpell && LLRogueSub("ruffian") && (v.baseWeaponName == "unarmed strike" || (/improvised/i).test(v.WeaponName + v.baseWeaponName) || (v.isMeleeWeapon && (/simple/i).test(v.theWea.type)))) bOK = true;
						if (!bOK && !v.isSpell && LLRogueSub("avenger") && v.isMeleeWeapon && (/consecrated/i).test(v.WeaponText)) bOK = true;
						if (!bOK && v.isSpell && LLRogueSub("seeker") && (/relic/i).test(v.WeaponText)) bOK = true;
						if (!bOK) return;
						v.sneakAtk = Math.ceil(lvl / 2);
						var sDie = LLRogueSub("bloodknife") ? "d6 (d8 with Dread Strike)" : "d6";
						fields.Description += (fields.Description ? '; ' : '') + 'Sneak attack ' + v.sneakAtk + sDie;
					},
					"Once per turn, when I attack with a ranged or finesse weapon while I have advantage or a conscious hostile creature is within 5 ft of the target, I can add my sneak attack damage to the attack.",
					700
				]
			}
		},
		"thieves cant" : {
			name : "Thieves' Cant",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("I know the secret rogue language (alternatively, I can learn two languages of my choice instead)"),
			languageProfs : ["Thieves' Cant"]
		},
		"cunning action" : {
			name : "Cunning Action",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc("As a bonus action, I can Dash, Disengage, Hide, or Use an Object" + (n < 11 ? "" : "; I can take a second bonus action each turn, but not the same one twice"));
			}),
			action : [["bonus action", ""]]
		},
		"devious exploits" : LLExploitFeature({
			name : "Devious Exploits",
			minlevel : 2,
			cls : "rogue(laserllama)",
			sheet : "devious exploits",
			sheetName : "Devious Exploits",
			ability : 2,
			extraTimes : [0, 2, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8],
			description : LLdesc([
				"I know Devious Exploits fueled by my Exploit Dice; use one Exploit per attack, check, or save",
				"Use the \"Choose Feature\" button above to select Exploits; I can swap one when I gain a level",
				"Devious Skill: I can add an Exploit Die to an ability check (after rolling, before knowing the result)"
			])
		}),
		"exploit dice" : LLExploitDiceFeature("rogue(laserllama)", 2, "Rogue (LaserLlama)"),
		"subclassfeature3" : {
			name : "Roguish Archetype",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"Choose a Roguish Archetype and put it in the \"Class\" field; Archetype features use my Exploit save DC",
				"Archetype Exploits don't count against my Exploits Known; I learn them even without the prerequisites"
			])
		},
		"cunning strike" : {
			name : "Cunning Strike",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : levels.map(function (n) {
				return LLdesc([
					"When an attack qualifies for Sneak Attack, I can reduce its dice by 1d6 per degree to use an Exploit I know without an Exploit Die",
					"The Exploit must be used as part of a weapon attack"
				].concat(n < 11 ? [] : ["Ruthless: I can reduce the Sneak Attack by another 2d6 to give the target disadv. on the Exploit's save"]));
			})
		},
		"uncanny dodge" : {
			name : "Uncanny Dodge",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc("As a reaction, I halve the damage of an attack from an attacker that I can see" + (n < 14 ? "" : "; I can also move half my speed without provoking opportunity attacks"));
			}),
			action : [["reaction", ""]]
		},
		"evasion" : {
			name : "Evasion",
			source : [["GMB:LL", 0]],
			minlevel : 9,
			description : LLdesc("My Dexterity saves vs. areas of effect negate damage on success and halve it on failure"),
			savetxt : { text : ["Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg"] }
		},
		"reliable talent" : {
			name : "Reliable Talent",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("If I make an ability check that adds my Prof Bonus or an Exploit Die, I treat a d20 roll of 9 or lower as a 10")
		},
		"ruthless" : {
			name : "Ruthless",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("When I use a Devious Exploit with an attack that adds Sneak Attack, I can reduce the bonus by 2d6 to give the target disadv. on its save (also with Cunning Strike)")
		},
		"blindsense" : {
			name : "Blindsense",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("If I can hear, I'm aware of the location of hidden and invisible creatures near me"),
			additional : levels.map(function (n) { return n < 14 ? "" : (n < 17 ? 10 : n < 20 ? 20 : 30) + " ft"; }),
			changeeval : function (lvl, chc) {
				var srcNm = "Rogue (LaserLlama): Blindsense";
				var curRange = CurrentProfs.vision.blindsense && CurrentProfs.vision.blindsense.ranges ? CurrentProfs.vision.blindsense.ranges[srcNm] : false;
				var newRange = lvl[1] < 14 ? 0 : lvl[1] < 17 ? 10 : lvl[1] < 20 ? 20 : 30;
				if (curRange != newRange) {
					if (curRange) SetProf("vision", false, "Blindsense", srcNm, curRange);
					if (newRange) SetProf("vision", true, "Blindsense", srcNm, newRange);
				}
			}
		},
		"slippery mind" : {
			name : "Slippery Mind",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I make an Intelligence, Wisdom, or Charisma save, I add my Exploit Die to the roll"),
			savetxt : { text : ["+Exploit Die to Int/Wis/Cha saves"] }
		},
		"elusive" : {
			name : "Elusive",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Attackers can't gain advantage on attacks against me, unless I'm incapacitated")
		},
		"stroke of luck" : {
			name : "Stroke of Luck",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("I can treat a d20 roll of an ability check, attack, or save as a 20 (after knowing the result)"),
			usages : 1,
			recovery : "short rest"
		}
	}
};

// ===================================================================================
// ROGUISH ARCHETYPES (Alternate Rogue v2.3.0)
// ===================================================================================
var LLArcaneTricksterSpells = [
	"acid splash", "booming blade", "dancing lights", "fire bolt", "friends", "frostbite", "green-flame blade", "light", "mage hand", "magic stone", "message", "minor illusion", "poison spray", "prestidigitation", "ray of frost", "shocking grasp",
	"alarm", "bane", "catapult", "cause fear", "charm person", "color spray", "comprehend languages", "detect magic", "detect poison and disease", "disguise self", "dissonant whispers", "faerie fire", "feather fall", "find familiar", "conjure familiar", "floating disk", "fog cloud", "grease", "hideous laughter", "identify", "illusory script", "jump", "longstrider", "silent image", "sleep", "snare", "unseen servant",
	"blindness/deafness", "blur", "calm emotions", "crown of madness", "darkness", "darkvision", "enlarge/reduce", "hold person", "invisibility", "levitate", "knock", "lock/unlock", "magic aura", "magic mouth", "mind whip", "mirror image", "misty step", "phantasmal force", "rope trick", "see invisibility", "shadow blade", "silence", "spider climb", "suggestion",
	"blink", "counterspell", "dispel magic", "enemies abound", "fear", "hypnotic pattern", "major image", "nondetection", "sending", "tiny servant",
	"charm monster", "confusion", "dimension door", "freedom of movement", "greater invisibility", "hallucinatory terrain", "phantasmal killer"
];
AddSubClass("rogue(laserllama)", "arcane trickster", {
	regExpSearch : /^(?=.*arcane)(?=.*trickster).*$/i,
	subname : "Arcane Trickster",
	fullname : "Arcane Trickster",
	source : [["GMB:LL", 0]],
	abilitySave : 4,
	spellcastingFactor : 3,
	spellcastingList : {
		spells : LLSpellList(LLArcaneTricksterSpells)
	},
	spellcastingKnown : {
		cantrips : [0, 0, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : [0, 0, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12]
	},
	features : {
		"subclassfeature3" : {
			name : "Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I can cast Arcane Trickster spells I know, using Intelligence as my spellcasting ability",
				"I know mage hand and two other cantrips; I can swap a spell when I gain a level"
			]),
			additional : levels.map(function (n) {
				return n < 3 ? "" : (n < 10 ? 3 : 4) + " cantrips & " + [0, 0, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12][n - 1] + " spells known";
			}),
			spellcastingBonus : [{
				name : "Mage Hand",
				spells : ["mage hand"],
				selection : ["mage hand"],
				firstCol : "atwill"
			}]
		},
		"subclassfeature3.1" : {
			name : "Mage Hand Adept",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("My mage hand can be invisible, I control it as a bonus action, and it can make Sleight of Hand and thieves' tools checks"),
			action : [["bonus action", "Mage Hand (control)"]],
			spellChanges : {
				"mage hand" : {
					components : "S",
					changes : "I can make the hand invisible, control it with a bonus action, and use it for Sleight of Hand and thieves' tools checks."
				}
			}
		},
		"subclassfeature7" : {
			name : "Arcane Misdirection & Magical Polymath",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"As a bonus action, my mage hand distracts a creature within 5 ft of it: adv. on my next attack vs. it this turn",
				"I can use any spell scroll as if on my list; instead of a new spell, I can learn one from a scroll or spellbook (destroying it)"
			]),
			action : [["bonus action", "Arcane Misdirection"]]
		},
		"subclassfeature13" : {
			name : "Trickster's Ambush",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("Arcane Misdirection also gives disadv. on the first save I force before my turn ends; with Uncanny Dodge, I can teleport 15 ft")
		},
		"subclassfeature17" : {
			name : "Spell Thief",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc([
				"As a reaction when targeted by or in the area of a spell, we both make spell attacks; if I win, the spell fails",
				"I can cast it once before my next long rest (lowest level, no slot); once per long rest, then a 3rd-level slot"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["reaction", ""]]
		}
	}
});
LLAddSpellsToClass("arcane trickster(laserllama)", LLArcaneTricksterSpells);

AddSubClass("rogue(laserllama)", "assassin", {
	regExpSearch : /^(?=.*assassin)(?=.*(rogue|laserllama)).*$/i,
	subname : "Assassin",
	fullname : "Assassin",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Assassinate",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"After initiative is determined, I can expend an Exploit Die and add it to my initiative roll",
				"Adv. on weapon attacks vs. creatures that haven't acted yet in combat",
				"My Sneak Attack hits vs. incapacitated or surprised creatures are critical hits"
			])
		},
		"subclassfeature3.1" : LLPathExploits("Assassin", [[3, ["aerial maneuver", "precision strike"]], [5, ["craft simple poison", "crippling strike"]], [9, ["craft expert poison"]], [13, ["craft advanced poison"]]], LLRogExpl),
		"subclassfeature3.2" : {
			name : "Infiltrator",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency with the disguise and poisoner's kits",
				"In 10 min, I craft a disguise of a dead/unconscious humanoid whose body I have (Search vs. my Exploit DC to detect)",
				"I can mimic a humanoid's speech after listening to it for 10 min"
			]),
			toolProfs : ["Disguise kit", "Poisoner's kit"]
		},
		"subclassfeature7" : {
			name : "Deadly Blades",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"When I crit and roll 1s on damage dice, I can reroll them",
				"Cunning Strike: -1d6 Sneak Attack to force a Con save or stunned until the start of my next turn"
			])
		},
		"subclassfeature13" : {
			name : "Flawless Infiltrator & Master Poisoner",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc([
				"I learn three languages; +Exploit Die to checks to maintain a disguise; +rogue level to the DC to see through it",
				"I can craft a poison with an Exploit and apply it to a weapon with a single bonus action; I learn craft advanced poison"
			]),
			languageProfs : [3],
			action : [["bonus action", "Craft & Apply Poison"]]
		},
		"subclassfeature17" : {
			name : "Death Strike",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("When I add Sneak Attack to a weapon attack, I can make it an automatic critical hit"),
			usages : 1,
			recovery : "short rest"
		}
	}
});

AddSubClass("rogue(laserllama)", "burglar", {
	regExpSearch : /^(?=.*burglar)(?=.*(rogue|laserllama)).*$/i,
	subname : "Burglar",
	fullname : "Burglar",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLPathExploits("Burglar", [[3, ["aerial maneuver", "modify device"]], [5, ["dirty hit", "survey dungeon"]], [9, ["forgotten knowledge"]]], LLRogExpl),
		"subclassfeature3.1" : {
			name : "Nimble",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain a climbing speed equal to my walking speed; I can use Dex instead of Str for my jump distances"),
			speed : { climb : { spd : "walk", enc : "walk" } }
		},
		"subclassfeature3.2" : {
			name : "Quick Fingers",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"When I add Sneak Attack to a melee attack, -1d6 to steal an object not held: Sleight of Hand vs. its Perception",
				"My Cunning Action can also use a set of tools or make a Sleight of Hand check"
			])
		},
		"subclassfeature7" : {
			name : "Supreme Sneak & Treasure Lore",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"Adv. on Stealth while moving at half speed; I can Hide while lightly obscured; Cunning Strike -1d6: Hide for free",
				"+Exploit Die to checks about magic items, treasure, and traps; Use an Object can activate magic items, scrolls, potions"
			])
		},
		"subclassfeature13" : {
			name : "Use Magic Device",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("I ignore class, race, alignment, and level requirements for magic items, scrolls, and potions (Int as spellcasting ability)")
		},
		"subclassfeature17" : {
			name : "Quick Reflexes",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("I gain an extra bonus action each turn for Cunning Action only; if unused, I gain an extra reaction until my next turn")
		}
	}
});

AddSubClass("rogue(laserllama)", "investigator", {
	regExpSearch : /^(?=.*investigator)(?=.*(rogue|laserllama)).*$/i,
	subname : "Investigator",
	fullname : "Investigator",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Eye for Detail",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I can make Int (Insight) and Int (Perception) checks; my Cunning Action can Search; my Searches give 10 min worth of info"),
			addMod : [
				{ type : "skill", field : "Insight", mod : "max(Int-Wis|0)", text : "Eye for Detail: I can use Intelligence instead of Wisdom for Insight checks." },
				{ type : "skill", field : "Perception", mod : "max(Int-Wis|0)", text : "Eye for Detail: I can use Intelligence instead of Wisdom for Perception checks." }
			]
		},
		"subclassfeature3.1" : LLPathExploits("Investigator", [[3, ["disarm", "precision strike"]], [5, ["exposing strike", "survey dungeon"]], [9, ["survey settlement"]]], LLRogExpl),
		"subclassfeature3.2" : {
			name : "Predictive Fighting",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"I Search a creature I see within 60 ft (DC 8 + its CR)" + (n < 17 ? "" : " (automatic success)") + "; on a success, for 1 min:",
					"+Int mod (min 1) to weapon attacks vs. it and I don't need adv. for Sneak Attack" + (n < 17 ? "" : "; my Sneak Attack uses d8s vs. it")
				]);
			})
		},
		"subclassfeature7" : {
			name : "Insightful Strike",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Cunning Strike -1d6 Sneak Attack: I learn AC, senses, resistances, highest/lowest ability, or one trait; adv. on Predictive Fighting vs. creatures I hit")
		},
		"subclassfeature13" : {
			name : "Adept Investigator & Unerring Sight",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc([
				"Survey dungeon/settlement take half time and give double info; long rests in settlements and short rests in dungeons grant them",
				"I have truesight (radius of my Blindsense); adv. on Insight, Investigation, and Perception within it"
			]),
			changeeval : function (lvl, chc) {
				var srcNm = "Investigator: Unerring Sight";
				var curRange = CurrentProfs.vision.truesight && CurrentProfs.vision.truesight.ranges ? CurrentProfs.vision.truesight.ranges[srcNm] : false;
				var n = LLRogueLvl();
				var newRange = lvl[1] < 13 ? 0 : n < 17 ? 10 : n < 20 ? 20 : 30;
				if (curRange != newRange) {
					if (curRange) SetProf("vision", false, "Truesight", srcNm, curRange);
					if (newRange) SetProf("vision", true, "Truesight", srcNm, newRange);
				}
			}
		},
		"subclassfeature17" : {
			name : "Exploit Weakness",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("Predictive Fighting automatically succeeds and my Sneak Attack uses d8s vs. that creature for the duration")
		}
	}
});

AddSubClass("rogue(laserllama)", "mastermind", {
	regExpSearch : /^(?=.*mastermind)(?=.*(rogue|laserllama)).*$/i,
	subname : "Mastermind",
	fullname : "Mastermind",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLPathExploits("Mastermind", [[3, ["eloquent speech", "roguish charm"]], [5, ["exposing strike", "soothing speech"]], [9, ["recruit informant"]]], LLRogExpl),
		"subclassfeature3.1" : {
			name : "Master of Machinations",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I learn two languages and gain proficiency with the disguise and forgery kits",
				"After 1 min speaking in its native tongue, roguish charm costs no Exploit Die; an Exploit Die makes it last until its next long rest"
			]),
			languageProfs : [2],
			toolProfs : ["Disguise kit", "Forgery kit"]
		},
		"subclassfeature3.2" : {
			name : "Tactical Acumen",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("My Cunning Action can Help; when I Help an ally attack, the target can be within 30 ft of me (if the ally sees/hears me)"),
			action : [["bonus action", "Help (Cunning Action)"]]
		},
		"subclassfeature7" : {
			name : "Manipulative Intuition & Potent Insight",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"After 1 min observing a creature (out of combat), I learn an ideal, bond, flaw, motivation, alignment, or true attitude",
				"When an ally I Helped hits, I can use my reaction to add my Sneak Attack to its damage (then no Sneak Attack on my next turn)"
			]),
			action : [["reaction", "Potent Insight"]]
		},
		"subclassfeature13" : {
			name : "Devious Tactics",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("As a reaction when targeted by an attack, a creature within 5 ft: Dex save (can fail) or we switch places and it becomes the target"),
			action : [["reaction", ""]]
		},
		"subclassfeature17" : {
			name : "Inscrutable Mind",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("I add my Int mod to Int, Wis, and Cha saves; my mind can't be read unless I allow it (Deception to feed false thoughts)"),
			addMod : [
				{ type : "save", field : "Wis", mod : "Int", text : "Inscrutable Mind: I add my Intelligence modifier to Intelligence, Wisdom, and Charisma saving throws." },
				{ type : "save", field : "Cha", mod : "Int", text : "Inscrutable Mind: I add my Intelligence modifier to Intelligence, Wisdom, and Charisma saving throws." },
				{ type : "save", field : "Int", mod : "Int", text : "Inscrutable Mind: I add my Intelligence modifier to Intelligence, Wisdom, and Charisma saving throws." }
			]
		}
	}
});

AddSubClass("rogue(laserllama)", "phantom", {
	regExpSearch : /^(?=.*phantom)(?=.*(rogue|laserllama)).*$/i,
	subname : "Phantom",
	fullname : "Phantom",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLPathExploits("Phantom", [[3, ["arresting strike", "feint"]], [5, ["exposing strike", "grasp of night"]], [9, ["forgotten knowledge"]]], LLRogExpl),
		"subclassfeature3.1" : {
			name : "Knowledge of the Grave",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in a skill or tool, or learn a language; I can change it during a short or long rest"),
			skillstxt : "Choose one skill, tool, or language (can be changed during a rest)"
		},
		"subclassfeature3.2" : {
			name : "Grave Bolt",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc("When I hit with Sneak Attack, another creature I see within 30 ft: Wis save or " + Math.ceil(Math.ceil(n / 2) / 2) + "d6 necrotic (half my Sneak Attack dice)");
			})
		},
		"subclassfeature7" : {
			name : "Soul Trinkets & Dark Offering",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : levels.map(function (n) {
				return LLdesc([
					"As a reaction when a creature (Int 5+) dies within 30 ft, I form a Soul Trinket (max " + Math.floor(n / 2) + "); while I have one: adv. on Con and death saves",
					"Destroy a Trinket: as an action, ask it a question (speak with dead); make a Sneak Attack necrotic; or a Grave Bolt target is frightened"
				]);
			}),
			action : [["reaction", "Soul Trinket"]]
		},
		"subclassfeature13" : {
			name : "Spectral Step",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("When I Dash, I become incorporeal until the end of my turn: move through creatures/objects as difficult terrain, 15 ft fly speed")
		},
		"subclassfeature17" : {
			name : "Death Knell",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("With Grave Bolt, I can destroy a Trinket: creatures of my choice within 30 ft of the target also save (fail: Grave Bolt and frightened; success: half)")
		}
	}
});

AddSubClass("rogue(laserllama)", "psiknife", {
	regExpSearch : /^(?=.*psi)(?=.*knife).*$/i,
	subname : "Psiknife",
	fullname : "Psiknife",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Psionic Awakening",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"My Psi Points (= rogue level) recover Int mod (min 1) on a short rest and all on a long rest:",
				"Mystical Skill: when I fail a check, 1 PP to add my Exploit Die; Telekinetic Leap: bonus action, 1 PP + 10 ft: jump 30 ft",
				"Telepathic Link: as an action, 1 PP per creature I see: telepathic network for Int mod hours"
			]),
			limfeaname : "Psi Points",
			usages : levels.map(function (n) { return n < 3 ? "" : n; }),
			recovery : "long rest",
			action : [["bonus action", "Telekinetic Leap (1 PP)"], ["action", "Telepathic Link"]]
		},
		"subclassfeature3.1" : {
			name : "Psi Blade",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("As part of an attack or as a bonus action, I conjure a Psi Blade and attack: dagger, psychic damage, Int, thrown range doubled; die = Exploit Die"),
			action : [["bonus action", "Psi Blade"]],
			weaponOptions : [{
				regExpSearch : /^(?=.*psi)(?=.*blade).*$/i,
				name : "Psi Blade",
				source : [["GMB:LL", 0]],
				ability : 4,
				type : "Natural",
				damage : [1, 4, "psychic"],
				range : "Melee, 40/120 ft",
				description : "Finesse, light, thrown; uses Int; damage die = my Exploit Die; 5-ft bright light, leaves no marks",
				abilitytodamage : true
			}],
			weaponsAdd : ["Psi Blade"],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/^(?=.*psi)(?=.*blade).*$/i).test(v.WeaponName) && classes.known["rogue(laserllama)"]) {
							var sDie = LLRogueDie(classes.known["rogue(laserllama)"].level);
							if (sDie) fields.Damage_Die = "1" + sDie;
							if (!(/finesse/i).test(fields.Description)) fields.Description = "Finesse; " + fields.Description;
						}
					},
					"My Psi Blade uses my Exploit Die for its damage."
				]
			}
		},
		"subclassfeature7" : {
			name : "Empowered Blades & Metaphysical Shift",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"Mind Rend: Psi Blade Sneak Attack -2d6: Int save or no reactions and only move, action, or bonus action next turn",
				"Sentient Strike: when I miss with a Psi Blade, 1 PP to add my Exploit Die to the attack roll",
				"Cunning Action: spend PP (up to Int mod) to teleport 20 ft per PP"
			])
		},
		"subclassfeature13" : {
			name : "Shimmer",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("As an action, 1 PP: I'm invisible (no concentration) until I attack, cast a spell, or touch a creature"),
			action : [["action", " (1 PP)"]]
		},
		"subclassfeature17" : {
			name : "Mental Scourge",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("Mind Rend: another -2d6 (total 4d6) to stun on a failed save; I regain 1 PP at the start of each of my turns in combat")
		}
	}
});

AddSubClass("rogue(laserllama)", "scout", {
	regExpSearch : /^(?=.*scout)(?=.*(rogue|laserllama)).*$/i,
	subname : "Scout",
	fullname : "Scout",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Ambuscade",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc("When I roll initiative (not surprised), I can use my reaction to Hide, Search, or make one weapon attack" + (n < 13 ? "" : "; I can also move half my speed, and a creature I hit is marked: allies have adv. vs. it this round"));
			}),
			action : [["reaction", " (on initiative)"]]
		},
		"subclassfeature3.1" : LLPathExploits("Scout", [[3, ["arresting strike", "feint"]], [5, ["craft simple poison", "trick shot"]], [9, ["craft expert poison"]]], LLRogExpl),
		"subclassfeature3.2" : {
			name : "Skillful Hunter",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("As a reaction when a creature I see ends its turn within 5 ft, I move half my speed without OAs; +Exploit Die to Nature and Survival checks"),
			action : [["reaction", ""]]
		},
		"subclassfeature7" : {
			name : "Wilderness Adept",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("+10 ft speed; climbing and swimming speed equal to my walking speed; when I Dash, I ignore natural difficult terrain"),
			speed : { walk : { spd : "+10", enc : "+10" }, climb : { spd : "walk", enc : "walk" }, swim : { spd : "walk", enc : "walk" } }
		},
		"subclassfeature13" : {
			name : "Deadly Hunter",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("I add my Prof Bonus to initiative; Ambuscade lets me move half my speed and mark a creature I hit (allies have adv. vs. it this round)"),
			addMod : [{ type : "skill", field : "Init", mod : "Prof", text : "Deadly Hunter: I add my Proficiency Bonus to initiative rolls." }]
		},
		"subclassfeature17" : {
			name : "Twin Strike",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("When I take the Attack action, I can make a weapon attack as a bonus action; it can add Sneak Attack again if vs. a different creature"),
			action : [["bonus action", " (after Attack action)"]]
		}
	}
});

AddSubClass("rogue(laserllama)", "swashbuckler", {
	regExpSearch : /^(?=.*swashbuckler)(?=.*(rogue|laserllama)).*$/i,
	subname : "Swashbuckler",
	fullname : "Swashbuckler",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Fancy Footwork",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("When I make a melee attack vs. a creature, it can't make opportunity attacks vs. me for the rest of my turn")
		},
		"subclassfeature3.1" : {
			name : "Relentless Swagger",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"If not surprised, I add my Cha mod (min +1) to initiative",
				"I don't need adv. for Sneak Attack if I'm within 5 ft of the target, no other creature is within 5 ft of me, and I don't have disadv."
			]),
			addMod : [{ type : "skill", field : "Init", mod : "max(Cha|1)", text : "Relentless Swagger: I add my Charisma modifier (min +1) to initiative rolls." }]
		},
		"subclassfeature3.2" : LLPathExploits("Swashbuckler", [[3, ["imposing presence", "parry"]], [5, ["glancing blow", "soothing speech"]], [9, ["recruit informant"]]], LLRogExpl),
		"subclassfeature7" : {
			name : "Panache",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"On a Sneak Attack hit, -1d6 for: Charm (a creature within 30 ft that sees me: Wis save or charmed until my next turn)",
				"or Taunt (Wis save or disadv. on attacks vs. others than me and no opportunity attacks until my next turn)"
			])
		},
		"subclassfeature13" : {
			name : "Elegant Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("When I Dash, opportunity attacks vs. me have disadv.; +Exploit Die to Acrobatics, Athletics, and Performance checks")
		},
		"subclassfeature17" : {
			name : "Master Duelist",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("When I miss with an attack roll, I can add my Cha mod (min +1) to it (special reaction)"),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "short rest"
		}
	}
});

// ===================================================================================
// ADDITIONAL ARCHETYPES (Alternate Rogue Expanded v2.3.0)
// ===================================================================================
AddSubClass("rogue(laserllama)", "acrobat", {
	regExpSearch : /^(?=.*acrobat)(?=.*(rogue|laserllama)).*$/i,
	subname : "Acrobat",
	fullname : "Acrobat",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLPathExploits("Acrobat", [[3, ["aerial maneuver", "lunge"]], [5, ["dirty hit", "trick shot"]], [9, ["survey settlement"]]], LLRogExpl),
		"subclassfeature3.1" : {
			name : "Acrobatic Training",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"Climbing speed = walking speed; no check to climb sheer surfaces at half speed; Dex for jump distances",
				"My unarmed strikes are finesse and deal Exploit Die + Str or Dex bludgeoning"
			]),
			speed : { climb : { spd : "walk", enc : "walk" } },
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.baseWeaponName == "unarmed strike" && classes.known["rogue(laserllama)"]) {
							var sDie = LLRogueDie(classes.known["rogue(laserllama)"].level);
							if (sDie) fields.Damage_Die = "1" + sDie;
							if (!(/finesse/i).test(fields.Description)) fields.Description = "Finesse" + (fields.Description ? "; " : "") + fields.Description;
							if (What("Dex Mod") > What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod")) fields.Mod = 2;
						}
					},
					"My unarmed strikes have the finesse property and deal my Exploit Die in bludgeoning damage."
				]
			}
		},
		"subclassfeature3.2" : {
			name : "Flying Strike",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("If I fall 5 ft then hit with a melee weapon, it qualifies for Sneak Attack (no disadv.); once per turn: Str save (adv. if larger) or prone")
		},
		"subclassfeature7" : {
			name : "Death From Above & Slow Fall",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Adv. on weapon attacks while airborne at least 10 ft up; aerial maneuver without Exploit Die; no damage when landing on something soft")
		},
		"subclassfeature13" : {
			name : "Defy Death & Stunning Leap",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("I add my Prof Bonus to death saves (total 20+ counts as a 20); as a bonus action, 5 ft of movement: jump up to 20 ft"),
			action : [["bonus action", "Stunning Leap"]]
		},
		"subclassfeature17" : {
			name : "Masterful Aerialist",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("If the total of a Dex check or Dex save is lower than my Dex score, I can use my Dex score instead")
		}
	}
});

var LLAvengerSpells = [
	"bane", "bless", "cause fear", "charm person", "command", "compelled duel", "comprehend languages", "divine favor", "ethereal anchor", "expeditious retreat", "guiding bolt", "heroism", "inflict wounds", "sanctuary", "searing smite", "shield of faith", "thunderous smite", "wrathful smite",
	"aid", "augury", "blindness/deafness", "branding smite", "darkness", "invisibility", "locate creature", "mind spike", "misty step", "pass without trace", "shadow blade", "silence", "suggestion", "zone of truth",
	"bestow curse", "blinding smite", "clairvoyance", "daylight", "dispel magic", "fear", "speak with dead", "spectral passage", "spirit shroud", "vampiric touch",
	"accursed touch", "accused touch", "banishment", "blight", "death ward", "divination", "guardian of faith", "staggering smite"
];
AddSubClass("rogue(laserllama)", "avenger", {
	regExpSearch : /^(?=.*avenger)(?=.*(rogue|laserllama)).*$/i,
	subname : "Avenger",
	fullname : "Avenger",
	source : [["GMB:LL", 0]],
	abilitySave : 6,
	features : {
		"subclassfeature3" : {
			name : "Anointed Magic",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var sLim = n < 7 ? "1st" : n < 13 ? "2nd" : n < 19 ? "3rd" : "4th";
				return LLdesc([
					"I cast Avenger spells I know by expending Divine Favor equal to the spell level (Charisma is my ability)",
					"My Divine Limit is " + sLim + " level: I can't learn or cast spells of a higher level; I regain Divine Favor on a short rest",
					"I can replace one Avenger spell I know when I gain a level"
				]);
			}),
			limfeaname : "Divine Favor",
			usages : [0, 0, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7],
			recovery : "short rest",
			additional : levels.map(function (n) { return n < 3 ? "" : [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10][n - 1] + " spells known"; }),
			spellcastingBonus : [{
				name : "Anointed Magic",
				spells : LLSpellList(LLAvengerSpells),
				spellcastingAbility : 6,
				times : [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
			}]
		},
		"subclassfeature3.1" : {
			name : "Consecrated Blade",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("In a 1-hour ritual during a rest, I consecrate a melee weapon: it's my holy symbol and focus, and can add Sneak Attack even if not finesse; add \"Consecrated\" to its name")
		},
		"subclassfeature7" : {
			name : "Channel Divinity",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"Each once per short rest (then 1 Divine Favor): Divine Awareness (bonus action, 10 min: sense celestials, elementals, fey, fiends, undead within 60 ft)",
				"Vow of Enmity (bonus action, a creature within 30 ft, 1 min: adv. on attacks vs. it and my weapon attacks can deal radiant damage to it)"
			]),
			usages : 2,
			recovery : "short rest",
			action : [["bonus action", "Divine Awareness"], ["bonus action", "Vow of Enmity"]]
		},
		"subclassfeature13" : {
			name : "Divine Step",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("As a bonus action, 2 Divine Favor: teleport 60 ft to a space within 5 ft of a hostile creature and make one weapon attack with adv. vs. it"),
			action : [["bonus action", " (2 DF)"]]
		},
		"subclassfeature17" : {
			name : "Hand of the Gods",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("I regain both Channel Divinity uses when I roll initiative; when my Vow of Enmity target drops to 0 HP, I regain Cha mod (min 1) Divine Favor")
		}
	}
});
LLAddSpellsToClass("avenger(laserllama)", LLAvengerSpells);

AddSubClass("rogue(laserllama)", "bloodknife", {
	regExpSearch : /^(?=.*blood)(?=.*knife).*$/i,
	subname : "Bloodknife",
	fullname : "Bloodknife",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLPathExploits("Bloodknife", [[3, ["imposing presence", "precision strike"]], [5, ["crippling strike", "martial focus"]], [9, ["bewildering blow"]]], LLRogExpl),
		"subclassfeature3.1" : {
			name : "Dread Strike",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"On a melee weapon hit, I reduce my max HP by one roll of my Exploit Die (until my next long rest) to:",
				"Qualify for Sneak Attack without adv.; roll d8s for Sneak Attack; deal necrotic damage; temp HP = rogue level if it drops a hostile to 0"
			])
		},
		"subclassfeature3.2" : {
			name : "Forked Tongue",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I learn Infernal (Deception proficiency) or Abyssal (Intimidation proficiency); with that skill, d20 rolls of 7 or lower count as 8"),
			languageProfs : [["Infernal or Abyssal", 1]],
			skillstxt : "Deception (with Infernal) or Intimidation (with Abyssal)"
		},
		"subclassfeature7" : {
			name : "Hellish Curse & Siphon Vitality",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : levels.map(function (n) {
				return LLdesc([
					"A Dread Strike target can't regain HP until it finishes a long rest; -1d8 Sneak Attack: Cha save or frightened until the end of its next turn" + (n < 17 ? "" : " (indefinitely; save each turn or 1 exhaustion)"),
					"Dread Strike hits grant me temp HP = rogue level; if it drops the target to 0 HP, my max HP isn't reduced"
				]);
			})
		},
		"subclassfeature13" : {
			name : "Umbral Veil",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("I'm always under nondetection; once per long rest, I can cast greater invisibility on myself without a slot"),
			spellcastingBonus : [{
				name : "Umbral Veil",
				spells : ["greater invisibility"],
				selection : ["greater invisibility"],
				firstCol : "oncelr"
			}]
		},
		"subclassfeature17" : {
			name : "Touch of Death",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("Hellish Curse frightened lasts indefinitely; it saves at the start of each of its turns, gaining 1 exhaustion on each failure")
		}
	}
});

AddSubClass("rogue(laserllama)", "gambler", {
	regExpSearch : /^(?=.*gambler)(?=.*(rogue|laserllama)).*$/i,
	subname : "Gambler",
	fullname : "Gambler",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLPathExploits("Gambler", [[3, ["roguish charm", "streetwise"]], [5, ["soothing speech", "trick shot"]], [9, ["incite violence"]], [13, ["quick draw"]]], LLRogExpl),
		"subclassfeature3.1" : {
			name : "Gambler's Knack",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I'm proficient with improvised weapons, playing cards, and one gaming set (+Exploit Die to gaming set checks)",
				"Improvised weapons use my Exploit Die for damage; after 1 min with a new game, +Prof Bonus to its checks"
			]),
			weaponProfs : [false, false, ["improvised weapons"]],
			toolProfs : ["Playing card set", ["Gaming set", 1]]
		},
		"subclassfeature3.2" : {
			name : "Pick a Card",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"Playing cards are simple finesse, thrown (30/60) weapons for me: 1d4 + Dex slashing; once per turn on a hit, the d4 gives:",
				"1: speed 10 ft until my next turn; 2: Sneak Attack even without requirements; 3: temp HP 2\xD7 Exploit Die; 4: switch initiative"
			]),
			weaponOptions : [{
				regExpSearch : /^(?=.*playing)(?=.*card).*$/i,
				name : "Playing Card",
				source : [["GMB:LL", 0]],
				ability : 2,
				type : "Simple",
				damage : [1, 4, "slashing"],
				range : "Melee, 30/60 ft",
				description : "Finesse, thrown; Pick a Card effect on hit (once per turn)",
				abilitytodamage : true
			}],
			weaponsAdd : ["Playing Card"],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/^(?=.*playing)(?=.*card).*$/i).test(v.WeaponName) && classes.known["rogue(laserllama)"] && classes.known["rogue(laserllama)"].level >= 17) {
							fields.Damage_Die = "2d4";
						}
					},
					"From 17th level, my playing card attacks deal 2d4 damage (Jackpot)."
				]
			}
		},
		"subclassfeature7" : {
			name : "Strange Luck",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("My weapon attacks crit on a d20 roll of 7 or 20, but rolls of 13 or 1 are critical failures")
		},
		"subclassfeature13" : {
			name : "Quickdraw",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("Adv. on initiative; my first-turn playing card attacks choose the Pick a Card effect; I learn quick draw (also works with thrown weapons)"),
			advantages : [["Initiative", true]]
		},
		"subclassfeature17" : {
			name : "Jackpot",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("Sneak Attack 6s explode (roll again); playing cards deal 2d4 and I choose which d4 picks the effect; on a crit, two Pick a Card effects")
		}
	}
});

AddSubClass("rogue(laserllama)", "ruffian", {
	regExpSearch : /^(?=.*ruffian)(?=.*(rogue|laserllama)).*$/i,
	subname : "Ruffian",
	fullname : "Ruffian",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLPathExploits("Ruffian", [[3, ["streetwise", "sweeping strike"]], [5, ["dirty hit", "grasp of night"]], [9, ["recruit informant"]], [13, ["clandestine source"]]], LLRogExpl),
		"subclassfeature3.1" : {
			name : "School of Hard Knocks",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I'm proficient with improvised weapons; my unarmed strikes deal Exploit Die + Str bludgeoning",
				"Sneak Attack works with improvised weapons, unarmed strikes, and simple melee weapons",
				"Cunning Action: unarmed strike, Grapple, or Shove; Con instead of Dex for AC in light/medium armor"
			]),
			weaponProfs : [false, false, ["improvised weapons"]],
			action : [["bonus action", "Unarmed Strike/Grapple/Shove (Cunning Action)"]],
			extraAC : [{
				name : "School of Hard Knocks",
				mod : "max(Con-Dex|0)",
				text : "I can use my Constitution modifier instead of my Dexterity modifier for my AC in light or medium armor.",
				stopeval : function (v) { return !v.wearingArmor || v.heavyArmor; }
			}],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.baseWeaponName == "unarmed strike" && classes.known["rogue(laserllama)"]) {
							var sDie = LLRogueDie(classes.known["rogue(laserllama)"].level);
							if (sDie) fields.Damage_Die = "1" + sDie;
						}
					},
					"My unarmed strikes deal my Exploit Die in bludgeoning damage."
				]
			}
		},
		"subclassfeature3.2" : {
			name : "Shake Down",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Athletics or Intimidation; with either skill, a d20 roll of 7 or lower counts as 8"),
			skillstxt : "Choose one from Athletics or Intimidation"
		},
		"subclassfeature7" : {
			name : "Intimidating Blow & Nerves of Steel",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"On a melee Sneak Attack, -1d6: the target or another creature within 30 ft: Wis save or frightened until the end of my next turn",
				"I'm immune to frightened and have adv. on weapon attacks vs. frightened creatures; my unarmed strikes are magical"
			]),
			savetxt : { immune : ["frightened"] }
		},
		"subclassfeature13" : {
			name : "Criminal Connections & Dodge and Counter",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc([
				"I learn clandestine source (not counted, can't be replaced)",
				"As a reaction when a creature up to one size larger misses me in melee: Dex save or prone (speed 0), grappled, or I make an unarmed strike"
			]),
			action : [["reaction", "Dodge & Counter"]]
		},
		"subclassfeature17" : {
			name : "Ruthless Strike",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("When I add Sneak Attack to a melee weapon attack vs. a creature frightened of me, it can be an automatic critical hit"),
			usages : 1,
			recovery : "short rest"
		}
	}
});

var LLExplosives = {
	"glittering dust" : { name : "Glittering Dust", cost : 1, lvl : 3, d : "20-ft cube: Dex save or attacks vs. them have adv. (action to scrape off)" },
	"hand bomb" : { name : "Hand Bomb", cost : 1, lvl : 3, d : "5-ft radius: Dex save or fire damage = Sneak Attack (half on save)" },
	"seismic charge" : { name : "Seismic Charge", cost : 1, lvl : 3, d : "10-ft radius: Str save or half Sneak Attack thunder and prone (Large or smaller); max damage to structures; difficult terrain" },
	"tangleroot" : { name : "Tangleroot", cost : 1, lvl : 3, d : "5-ft radius: Dex save or restrained for 1 min (Str/Dex check as an action to escape)" },
	"thunder pulse" : { name : "Thunder Pulse", cost : 1, lvl : 3, d : "15-ft cube: Con save or half Sneak Attack thunder and pushed 10 ft (half, no push on save)" },
	"alchemical webbing" : { name : "Alchemical Webbing", cost : 2, lvl : 7, d : "20-ft cube for 1 min: difficult terrain, lightly obscured; Dex save or restrained (fire dissolves it)" },
	"caustic bomb" : { name : "Caustic Bomb", cost : 2, lvl : 7, d : "10-ft radius: Dex save or Sneak Attack acid and coated (2 ED acid each turn until scraped off); half on save" },
	"incendiary bomb" : { name : "Incendiary Bomb", cost : 2, lvl : 7, d : "30-ft radius: Dex save or Sneak Attack fire (half on save); ignites flammable objects" },
	"noxious gas" : { name : "Noxious Gas", cost : 2, lvl : 7, d : "20-ft radius heavily obscured for 1 min; creatures starting their turn there: Con save or lose the turn" },
	"greater seismic charge" : { name : "Greater Seismic Charge", cost : 3, lvl : 13, d : "30-ft radius: Str save or Sneak Attack thunder and prone (Huge or smaller); max damage to structures" },
	"vitriolic charge" : { name : "Vitriolic Charge", cost : 3, lvl : 13, d : "30-ft radius: Dex save or Sneak Attack acid + half again at the start of its next turn" },
	"astral vortex" : { name : "Astral Vortex", cost : 4, lvl : 17, d : "5-ft radius: Cha save or banished to the Astral Plane for 1 min (save at end of each turn)" }
};
AddSubClass("rogue(laserllama)", "saboteur", {
	regExpSearch : /^(?=.*saboteur)(?=.*(rogue|laserllama)).*$/i,
	subname : "Saboteur",
	fullname : "Saboteur",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : (function () {
			var oFea = {
				name : "Alchemical Explosives",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : LLdesc([
					"I'm proficient with alchemist's supplies and know Explosives (Hand Bomb + others; use \"Choose Feature\")",
					"During a long rest, 1 hour crafts one of each Explosive for free; as an action, I craft one by spending its Exploit Dice",
					"Use an Object: throw an Explosive up to 60 ft; it uses my Exploit save DC; I can forgo an Exploit to learn an Explosive"
				]),
				toolProfs : ["Alchemist's supplies"],
				extraname : "Saboteur Explosive",
				extrachoices : [],
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 7 ? 2 : n < 13 ? 3 : n < 17 ? 4 : 5; }),
				autoSelectExtrachoices : [{ extrachoice : "hand bomb" }]
			};
			for (var sE in LLExplosives) {
				var o = LLExplosives[sE];
				oFea.extrachoices.push(o.name);
				oFea[sE] = {
					name : o.name,
					source : [["GMB:LL", 0]],
					additional : o.cost + " Exploit Di" + (o.cost > 1 ? "ce" : "e"),
					description : LLdesc(o.d)
				};
				if (o.lvl > 3) {
					oFea[sE].prerequisite = o.lvl + "th-level Rogue";
					oFea[sE].prereqeval = (function (nL) { return function (v) { return LLRogueLvl() >= nL; }; })(o.lvl);
				}
			}
			return oFea;
		})(),
		"subclassfeature3.1" : {
			name : "Destructive Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("My melee weapon attacks, Explosives, and Exploits automatically crit vs. nonmagical structures/objects; I always add Sneak Attack vs. constructs (no disadv.)")
		},
		"subclassfeature3.2" : LLPathExploits("Saboteur", [[3, ["oil bomb", "smoke bomb"]], [5, ["alchemical oil", "flash bomb"]], [9, ["bewildering blow"]]], LLRogExpl),
		"subclassfeature7" : {
			name : "Quick Chemistry",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("I can craft an Explosive with Exploit Dice as a bonus action; crafted Explosives can deal magical bludgeoning, piercing, fire, or thunder"),
			action : [["bonus action", "Craft Explosive"]]
		},
		"subclassfeature13" : {
			name : "Sabotage",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("Surprised creatures or those that haven't acted have disadv. on their first save vs. my Explosives; on initiative, I craft a Hand Bomb for free (or another for its dice)")
		},
		"subclassfeature17" : {
			name : "Hair Trigger",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("I can craft Explosives with a remote trigger; as an action, I detonate one within 200 ft"),
			action : [["action", " (detonate)"]]
		}
	}
});

AddSubClass("rogue(laserllama)", "seeker", {
	regExpSearch : /^(?=.*seeker)(?=.*(rogue|laserllama)).*$/i,
	subname : "Seeker",
	fullname : "Seeker",
	source : [["GMB:LL", 0]],
	abilitySave : 4,
	features : {
		"subclassfeature3" : {
			name : "Relic Hunter",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I learn two languages and History; examining an object for 10 min reveals its civilization of origin and age"),
			languageProfs : [2],
			skills : ["History"]
		},
		"subclassfeature3.1" : {
			name : "Relic Magic",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"Each Relic holds a cantrip or a ritual of 2nd level or lower from any class list; while holding it, I cast the cantrip or the ritual version",
				"Relic spell attacks qualify for Sneak Attack (add \"Relic\" to the attack's name); Intelligence is my spellcasting ability",
				"When I gain a new Relic, I can replace one Relic spell"
			]),
			additional : levels.map(function (n) { return n < 3 ? "" : (n < 7 ? 3 : n < 13 ? 5 : n < 17 ? 7 : 9) + " Relics"; }),
			spellcastingBonus : [{
				name : "Relic Spell (cantrip)",
				"class" : "any",
				level : [0, 0],
				spellcastingAbility : 4,
				times : levels.map(function (n) { return n < 3 ? 0 : n < 7 ? 3 : n < 13 ? 5 : n < 17 ? 7 : 9; })
			}, {
				name : "Relic Spell (ritual)",
				"class" : "any",
				level : [1, 2],
				ritual : true,
				spellcastingAbility : 4,
				firstCol : "(R)",
				times : levels.map(function (n) { return n < 3 ? 0 : n < 7 ? 3 : n < 13 ? 5 : n < 17 ? 7 : 9; })
			}]
		},
		"subclassfeature7" : {
			name : "Elder Relics",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Each Elder Relic holds: a Cleric Channel Divinity (once per short rest), a Warlock Eldritch Invocation (my rogue level for prerequisites), or a ritual of 5th level or lower"),
			additional : levels.map(function (n) { return n < 7 ? "" : (n < 13 ? 2 : n < 17 ? 4 : 5) + " Elder Relics"; })
		},
		"subclassfeature13" : {
			name : "Ancient Magicks",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("During a long rest, a 1-hour ritual changes a Relic's spell; I add my Int mod to Relic cantrip damage (if not already)")
		},
		"subclassfeature17" : {
			name : "Ancient Lore",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("Adv. on saves vs. spells; during a short or long rest, a 1-hour ritual changes the effect of a Relic or Elder Relic"),
			savetxt : { adv_vs : ["spells"] }
		}
	}
});

AddSubClass("rogue(laserllama)", "skinchanger", {
	regExpSearch : /^(?=.*skin)(?=.*changer).*$/i,
	subname : "Skinchanger",
	fullname : "Skinchanger",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Druidic Secrets",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I know Druidic; I count as a Druid for attuning to magic items and using spell scrolls"),
			languageProfs : ["Druidic"]
		},
		"subclassfeature3.1" : {
			name : "Limited Wild Shape",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var cr = n < 7 ? "1/4" : n < 13 ? "1/2" : n < 17 ? "1" : "2";
				var nKnown = n < 7 ? 3 : n < 13 ? 4 : n < 17 ? 5 : 6;
				return LLdesc([
					"As a bonus action, I Shift into a Beast Shape I know (" + nKnown + " known, max CR " + cr + ") for up to " + (n < 17 ? "1 hour" : "as long as I want"),
					"I keep my HP, mental scores, proficiencies, and features; I can't cast spells; Sneak Attack works with natural weapons",
					"Learn a new shape: action + Exploit Die, touching a non-hostile Beast (replaces one)" + (n < 17 ? "" : "; with no uses, I can spend an Exploit Die")
				]);
			}),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			additional : "regain 1 on a short rest",
			action : [["bonus action", " (start/end)"]]
		},
		"subclassfeature7" : {
			name : "Elder Shapes & Instinctual Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("My Beast Shape CR limit increases (1/2 at 7th, 1 at 13th, 2 at 17th; +1 known each time); my natural weapons in Beast Shape are magical")
		},
		"subclassfeature13" : {
			name : "Bestial Physique",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("+Exploit Die to checks using sight, hearing, or smell; my unarmed strikes are finesse and deal Exploit Die slashing"),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.baseWeaponName == "unarmed strike" && classes.known["rogue(laserllama)"] && classes.known["rogue(laserllama)"].level >= 13) {
							var sDie = LLRogueDie(classes.known["rogue(laserllama)"].level);
							if (sDie) fields.Damage_Die = "1" + sDie;
							fields.Damage_Type = "slashing";
							if (!(/finesse/i).test(fields.Description)) fields.Description = "Finesse" + (fields.Description ? "; " : "") + fields.Description;
						}
					},
					"My unarmed strikes have the finesse property and deal my Exploit Die in slashing damage."
				]
			}
		},
		"subclassfeature17" : {
			name : "Druidic Mastery",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc("I can stay in a Beast Shape indefinitely; with no uses of Wild Shape left, I can expend an Exploit Die to use it")
		}
	}
});

AddSubClass("rogue(laserllama)", "surgeon", {
	regExpSearch : /^(?=.*surgeon)(?=.*(rogue|laserllama)).*$/i,
	subname : "Surgeon",
	fullname : "Surgeon",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLPathExploits("Surgeon", [[3, ["arresting strike", "first aid"]], [5, ["crippling strike", "exposing strike"]], [9, ["bewildering blow"]]], LLRogExpl),
		"subclassfeature3.1" : {
			name : "Anatomical Studies",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency in Medicine and Nature and can make Int (Medicine) checks",
				"During a long rest, 1 hour restocks healer's kits by rogue level uses; first aid + a kit use: adv. on its Hit Dice"
			]),
			skills : ["Medicine", "Nature"],
			addMod : [{ type : "skill", field : "Medicine", mod : "max(Int-Wis|0)", text : "Anatomical Studies: I can use Intelligence instead of Wisdom for Medicine checks." }]
		},
		"subclassfeature3.2" : {
			name : "Surgical Skill",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					n < 13 ? "My weapon attacks vs. beasts, giants, humanoids, monstrosities, and undead crit on 19-20" : "My weapon attacks vs. all creatures but constructs, oozes, and plants crit on 18-20",
					"As a bonus action, I can make a Medicine check or use first aid"
				]);
			}),
			action : [["bonus action", "Medicine/First Aid"]]
		},
		"subclassfeature7" : {
			name : "Cultivated Immunity & Surgical Strike",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"I resist poison and necrotic damage; adv. on saves vs. poison and disease",
				"My Surgeon Exploits with Cunning Strike cost 1d6 less vs. the creature types of Surgical Skill; 2 kit uses cure poisoned or a disease"
			]),
			dmgres : ["Poison", "Necrotic"],
			savetxt : { adv_vs : ["poison", "disease"] }
		},
		"subclassfeature13" : {
			name : "Fantastical Anatomy",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("My weapon attacks vs. all creatures except constructs, oozes, and plants crit on 18-20; Surgical Strike applies to them too")
		},
		"subclassfeature17" : {
			name : "Expert Surgeon",
			source : [["GMB:LL", 0]],
			minlevel : 17,
			description : LLdesc([
				"Each once per long rest: Deadly Contagion (melee hit: Con save or a contagion effect)",
				"Medicinal Miracle (action: revive a creature dead within 1 minute at 1 HP); Surgical Stimulation (1 min: regenerate)"
			]),
			usages : 3,
			recovery : "long rest"
		}
	}
});

// ===================================================================================
// ROGUISH FEATS (Alternate Rogue Expanded v2.3.0)
// ===================================================================================
FeatsList["alternate dungeon delver"] = {
	name : "Alternate Dungeon Delver",
	source : [["GMB:LL", 0]],
	descriptionFull : "You are as skilled as one can be at exploring dungeons and disarming deadly traps. You gain the benefits below:\n \u2022 Dungeoneer Adept. You gain proficiency in Investigation, Perception, or Thieves' Tools, and whenever you make an ability check with any of the skills listed above, you can treat a roll of 7 or lower on the d20 as an 8.\n \u2022 Thoughtful Steps. Traveling at a fast pace while in a dungeon does not impose a penalty on passive Perception or passive Investigation scores for you.\n \u2022 Trap Sense. You have advantage on all saving throws to resist traps and Resistance to all damage dealt by traps.",
	description : "I gain proficiency in Investigation, Perception, or thieves' tools; with these, d20 rolls of 7 or lower count as 8. Fast pace in dungeons doesn't reduce my passive scores. I have adv. on saves vs. traps and resistance to damage from traps.",
	skillstxt : "Choose one from Investigation, Perception, or thieves' tools",
	savetxt : { adv_vs : ["traps"] },
	dmgres : ["Traps"]
};
FeatsList["alternate poisoner"] = {
	name : "Alternate Poisoner",
	source : [["GMB:LL", 0]],
	prerequisite : "Intelligence 13 or higher",
	prereqeval : function (v) { return LLScore("Int") >= 13; },
	descriptionFull : "You are dedicated student of the toxic arts and are able to produce potent poisons. You gain the following benefits:\n \u2022 Adept Poisoner. You gain proficiency in Poisoner's Kits. If you are already proficient, add double your Proficiency Bonus to all ability checks you make with Poisoner's Kits.\n \u2022 Potent Poisons. Whenever you deal poison damage to a creature, you can deal acid or necrotic damage instead.\n \u2022 Simple Poisons. Over the course of a long rest, you can spend 1 hour using a Poisoner's Kit to craft a number of vials of simple poison from the craft simple poison Exploit, up to your Intelligence modifier.\n \u2022 Swift Application. You can apply poisons with a bonus action.",
	description : "I gain proficiency (or expertise) with poisoner's kits. My poison damage can be acid or necrotic instead. During a long rest, 1 hour crafts Int mod vials of simple poison (craft simple poison Exploit). I can apply poisons as a bonus action.",
	toolProfs : [["Poisoner's kit", "increment"]],
	action : [["bonus action", "Apply Poison"]]
};
FeatsList["alternate skulker"] = {
	name : "Alternate Skulker",
	source : [["GMB:LL", 0]],
	prerequisite : "Dexterity 13 or higher",
	prereqeval : function (v) { return LLScore("Dex") >= 13; },
	descriptionFull : "You are an expert at slinking through shadows and staying hidden when you need to. You gain the benefits below:\n \u2022 Skulker's Sight. Dim light does not impose disadvantage on your ability checks that rely on your sense of sight.\n \u2022 Silent Steps. When you are lightly obscured, you can take the Hide action as a bonus action on your turn.\n \u2022 Silent Shots. If you are hidden from a creature and miss with a ranged attack, you do not reveal your position.",
	description : "Dim light doesn't impose disadv. on my sight-based checks. While lightly obscured, I can Hide as a bonus action. If I'm hidden and miss with a ranged attack, I don't reveal my position.",
	action : [["bonus action", "Hide (lightly obscured)"]]
};
FeatsList["devious training"] = {
	name : "Devious Training",
	source : [["GMB:LL", 0]],
	descriptionFull : "You have studied dastardly techniques to perform Devious Exploits. You gain the following benefits:\n \u2022 Devious Exploits Known. You learn two 1st-degree Devious Exploits from the Alternate Rogue. If they require a saving throw, the DC equals 8 + your Proficiency Bonus + your Strength or Dexterity modifier (your choice).\n \u2022 Retraining Exploits. Whenever you gain a level, you can replace one of the Devious Exploits you learned through this Feat with another 1st-degree Devious Exploit of your choice.\n \u2022 Exploit Dice. You gain two d4 Exploit Dice to fuel these Exploits, which are expended when you use them. You regain expended Exploit Dice when you finish a short or long rest.\n   If you already have Exploit Dice when you gain this Feat, you instead gain a single Exploit Die equal to your others.",
	description : "I learn two 1st-degree Devious Exploits (Str or Dex for the save DC) and gain two d4 Exploit Dice (one extra Exploit Die if I already have them), regained on a short rest. I can swap one of these Exploits when I gain a level.",
	eval : function () { LLExploitSheet("devious exploits", "Devious Exploits", 2); LLUpdateExploitDice(); },
	removeeval : function () { LLUpdateExploitDice("devious training"); },
	spellcastingBonusElsewhere : {
		addTo : "devious exploits",
		spellcastingBonus : {
			name : "Devious Training",
			spellcastingAbility : 2,
			spells : LLExploitList("rogue(laserllama)", 1),
			times : 2
		}
	}
};
if (LLExploitFeats.indexOf("devious training") === -1) LLExploitFeats.push("devious training");
FeatsList["roguish initiate"] = {
	name : "Roguish Initiate",
	source : [["GMB:LL", 0]],
	descriptionFull : "You have spent time honing talents associated with the criminal underworld. You gain the following benefits:\n \u2022 Ability Score Increase. Increase either your Dexterity or Intelligence score by 1, up to a maximum of 20.\n \u2022 Cunning Adept. Choose one of the following actions: Dash, Hide, or Use an Object. You can take that action as a bonus action on each of your turns.\n \u2022 Thieves' Cant. You learn to speak the jargon, write secret symbols of, and decode messages in Thieves' Cant.",
	description : "I choose Dash, Hide, or Use an Object: I can take that action as a bonus action on each of my turns. I learn Thieves' Cant. [+1 Dexterity or Intelligence]",
	scorestxt : "+1 Dexterity or Intelligence",
	languageProfs : ["Thieves' Cant"],
	action : [["bonus action", "Dash, Hide, or Use an Object (choose one)"]]
};

// Make the LaserLlama subclasses selectable in the Class/Subclass selection dialogs
if (typeof LLFixSubclassNames === "function") {
	LLFixSubclassNames();
	// and again after all add-on scripts have run (other scripts may add or change subclasses)
	if (typeof RunFunctionAtEnd === "function") RunFunctionAtEnd(function () { LLFixSubclassNames(); });
}
