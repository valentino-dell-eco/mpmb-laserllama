/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	Do not import the old LaserLlama files in the same sheet.

	-INFORMATION-
	Content:	Compendium of Beasts v3.1.0 (146 creatures)
	Files:		LaserLlama - Compendium of Beasts v3.1.0.js
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
*/

var iFileName = "Laserllama Compendium Beasts.js";
RequiredSheetVersion("13.2.3");

// ======================================================================
// LaserLlama - Compendium of Beasts v3.1.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	This file can be used on its own; it works best together with "LaserLlama - Common Attributes 20261019.js" and the Shifter.

	-INFORMATION-
	Subject:	Creatures, "Laserllama Compendium of Beasts"
	Effect:		This script adds the 146 Beasts of the Compendium of Beasts v3.1.0 by Laserllama (GM Binder, Fan Content policy).
				They are added with "(LL)" after their name (e.g. "Lion (LL)", "Giant Crab (LL)"), so the official versions remain available.
				They can be used on the Companion and Wild Shape pages (Wild Shape, Shifter Beast Shapes, polymorph, conjure familiar for CR 0).
				Beast subtypes (Aquatic, Avian, Brute, Carnivore, Insect, Reptilian, Vermin) are the Shifter's Bloodlines.
				Diminutive creatures are entered as Tiny, with a "Diminutive" trait.
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
*/


if (!SourceList["GMB:LL"]) {
	SourceList["GMB:LL"] = {
		name : "LaserLlama (GM Binder)",
		abbreviation : "GMB:LL",
		abbreviationSpellsheet : "LL",
		group : "GM Binder",
		url : "https://www.gmbinder.com/profile/laserllama",
		date : "2026/10/19"
	};
}

CreatureList["bat (ll)"] = {
	name : "Bat (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "vermin",
	companion : "familiar",
	alignment : "Neutral",
	ac : 12,
	hp : 1,
	hd : [1, 4],
	speed : "5 ft, fly 30 ft",
	scores : [2, 15, 8, 2, 12, 4],
	senses : "Blindsight 60 ft",
	passivePerception : 11,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, "", "piercing"],
		range : "Melee (5 ft)",
		description : "",
		abilitytodamage : false
	}],
	traits : [{
		name : "Diminutive",
		description : "This creature is smaller than Tiny (less than 1 ft. x 1 ft.). A creature in this shape (polymorph, Wild Shape, Shift) instantly reverts to its normal form if it takes damage or fails a saving throw."
	}, {
		name : "Echolocation",
		description : "When the Bat makes an ability check that uses its hearing, it treats a d20 roll of 9 or lower as a 10. It loses this benefit and its Blindsight if it is Deafened."
	}]
};
CreatureList["cat (ll)"] = {
	name : "Cat (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "carnivore",
	companion : "familiar",
	alignment : "Neutral",
	ac : 12,
	hp : 2,
	hd : [1, 4],
	speed : "40 ft, climb 30 ft",
	scores : [3, 15, 10, 3, 12, 7],
	saves : ["", 4, "", "", "", ""],
	skills : {
		"perception" : 3,
		"stealth" : 4
	},
	senses : "Darkvision 30 ft",
	passivePerception : 13,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Claw",
		ability : 2,
		damage : [1, "", "slashing"],
		range : "Melee (5 ft)",
		description : "",
		abilitytodamage : false
	}],
	traits : [{
		name : "Keen Smell",
		description : "The Cat has advantage on ability checks that rely on its sense of smell."
	}, {
		name : "Pounce",
		description : "If a Cat moves 20 ft in a line, and hits a creature equal to its size (or smaller) with its Claw, it falls Prone."
	}],
	actions : [{
		name : "Reflexive Fall (reaction)",
		description : "When the Cat falls, it can reduce any falling damage it takes by its Dexterity score (15). If it reduces this damage to 0, the Cat lands on its feet."
	}]
};
CreatureList["crab (ll)"] = {
	name : "Crab (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "aquatic",
	companion : "familiar",
	alignment : "Neutral",
	ac : 12,
	hp : 2,
	hd : [1, 4],
	speed : "5 ft, swim 30 ft",
	scores : [2, 11, 10, 1, 8, 2],
	senses : "",
	passivePerception : 9,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Claw",
		ability : 2,
		damage : [1, "", "bludgeoning"],
		range : "Melee (5 ft)",
		description : "and it uses Pincer",
		abilitytodamage : false
	}],
	traits : [{
		name : "Amphibious",
		description : "The Crab can breathe both air and water."
	}, {
		name : "Aquatic Camouflage",
		description : "The Crab has advantage on Stealth checks while underwater or covered in sand, mud, or dirt."
	}, {
		name : "Bottom Feeder",
		description : "Underwater, the Crab has advantage on ability checks to smell creatures that are below their hit point maximum, and automatically succeeds on ability checks to smell dead creatures within 1 mile."
	}, {
		name : "Pincer",
		description : "When the Crab hits a target with its Claw attack it can automatically Grapple the target (escape DC 6). If the target is larger than the Crab, its speed is not reduced to 0, but the Crab automatically moves with the target."
	}]
};
CreatureList["fox (ll)"] = {
	name : "Fox (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "carnivore",
	companion : "familiar",
	alignment : "Neutral",
	ac : 13,
	hp : 2,
	hd : [1, 4],
	speed : "30 ft, burrow 5 ft",
	scores : [2, 16, 11, 3, 12, 6],
	skills : {
		"perception" : 3,
		"stealth" : 5
	},
	senses : "Darkvision 30 ft",
	passivePerception : 13,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, "", "piercing"],
		range : "Melee (5 ft)",
		description : "",
		abilitytodamage : false
	}],
	traits : [{
		name : "Keen Hearing",
		description : "The Fox has advantage on ability checks that rely on its sense of hearing."
	}],
	actions : [{
		name : "Scamper (bonus action)",
		description : "The Fox takes the Disengage or Hide action."
	}]
};
CreatureList["firefly (ll)"] = {
	name : "Firefly (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "insect",
	companion : "familiar",
	alignment : "Neutral",
	ac : 10,
	hp : 1,
	hd : [1, 4],
	speed : "10 ft, fly 20 ft",
	scores : [1, 11, 8, 1, 8, 2],
	skills : {
		"acrobatics" : 2
	},
	senses : "",
	passivePerception : 9,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Diminutive",
		description : "This creature is smaller than Tiny (less than 1 ft. x 1 ft.). A creature in this shape (polymorph, Wild Shape, Shift) instantly reverts to its normal form if it takes damage or fails a saving throw."
	}, {
		name : "Agile Flight",
		description : "The Firefly has advantage on Dexterity ability checks and saving throws while using its flying speed."
	}, {
		name : "Illumination",
		description : "The Firefly emits bright light within a 10-ft. radius of itself, and dim light 10 ft beyond that."
	}]
};
CreatureList["fish (ll)"] = {
	name : "Fish (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "aquatic",
	companion : "familiar",
	alignment : "Neutral",
	ac : 13,
	hp : 1,
	hd : [1, 4],
	speed : "0 ft, swim 40 ft",
	scores : [2, 16, 9, 1, 8, 2],
	senses : "Darkvision 60 ft",
	passivePerception : 9,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Diminutive",
		description : "This creature is smaller than Tiny (less than 1 ft. x 1 ft.). A creature in this shape (polymorph, Wild Shape, Shift) instantly reverts to its normal form if it takes damage or fails a saving throw."
	}, {
		name : "Aquatic",
		description : "The Fish can only breathe underwater."
	}, {
		name : "Bottom Feeder",
		description : "Underwater, the Fish has advantage on ability checks to smell creatures that are below their hit point maximum, and automatically succeeds on ability checks to smell dead creatures within 1 mile."
	}, {
		name : "Shimmering Camouflage",
		description : "The Fish has advantage on Stealth checks to hide while it is underwater."
	}]
};
CreatureList["frog (ll)"] = {
	name : "Frog (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "reptilian",
	companion : "familiar",
	alignment : "Neutral",
	ac : 11,
	hp : 1,
	hd : [1, 4],
	speed : "20 ft, climb 20 ft, swim 20 ft",
	scores : [1, 13, 8, 1, 8, 3],
	skills : {
		"stealth" : 3
	},
	senses : "",
	passivePerception : 9,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Diminutive",
		description : "This creature is smaller than Tiny (less than 1 ft. x 1 ft.). A creature in this shape (polymorph, Wild Shape, Shift) instantly reverts to its normal form if it takes damage or fails a saving throw."
	}, {
		name : "Amphibious",
		description : "The Frog can breathe both air and water."
	}, {
		name : "Standing Leap",
		description : "The Frog can do a long jump of 10 ft and a standing jump of 5 ft without a running start."
	}]
};
CreatureList["goat (ll)"] = {
	name : "Goat (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "brute",
	companion : "familiar",
	alignment : "Neutral",
	ac : 10,
	hp : 4,
	hd : [1, 8],
	speed : "30 ft, climb 20 ft",
	scores : [11, 10, 11, 2, 10, 5],
	saves : [2, "", "", "", "", ""],
	skills : {
		"athletics" : 3
	},
	senses : "",
	passivePerception : 10,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Headbutt",
		ability : 1,
		damage : [1, 4, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Ram",
		description : "If the Goat moves 20 ft in a line, then hits with its Headbutt, it deals 1d4 bonus damage, then a target equal to its size or smaller is knocked back 10 ft in a line."
	}, {
		name : "Sure-Footed",
		description : "The Goat has advantage on saving throws to resist being knocked Prone or moved against its will."
	}]
};
CreatureList["hare (ll)"] = {
	name : "Hare (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "brute",
	companion : "familiar",
	alignment : "Neutral",
	ac : 13,
	hp : 1,
	hd : [1, 4],
	speed : "20 ft, burrow 5 ft",
	scores : [1, 17, 9, 2, 11, 4],
	skills : {
		"perception" : 2,
		"stealth" : 5
	},
	senses : "Darkvision 30 ft",
	passivePerception : 12,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Keen Hearing",
		description : "The Hare has advantage on ability checks that rely on its sense of hearing."
	}, {
		name : "Standing Leap",
		description : "The Hare can do a long jump of 10 ft and a standing jump of 5 ft without a running start."
	}],
	actions : [{
		name : "Scamper (bonus action)",
		description : "The Hare takes the Dash or Hide action."
	}]
};
CreatureList["lizard (ll)"] = {
	name : "Lizard (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "reptilian",
	companion : "familiar",
	alignment : "Neutral",
	ac : 10,
	hp : 1,
	hd : [1, 4],
	speed : "20 ft, climb 20 ft",
	scores : [2, 11, 10, 1, 8, 3],
	skills : {
		"stealth" : 2
	},
	senses : "",
	passivePerception : 9,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Diminutive",
		description : "This creature is smaller than Tiny (less than 1 ft. x 1 ft.). A creature in this shape (polymorph, Wild Shape, Shift) instantly reverts to its normal form if it takes damage or fails a saving throw."
	}, {
		name : "Cold-Blooded",
		description : "If the Lizard takes cold damage, it cannot take reactions and its speed is halved on its next turn."
	}, {
		name : "Natural Camouflage",
		description : "The Lizard has advantage on Stealth checks to Hide in natural environments."
	}, {
		name : "Sticky Grip",
		description : "The Lizard can climb up sheer surfaces and upside down without needing to make an ability check."
	}],
	actions : [{
		name : "Shed Tail (1/day) (reaction)",
		description : "When the Lizard is Grappled or takes damage it can shed its tail to automatically escape from the Grapple or reduce the triggering damage to 0."
	}]
};
CreatureList["mole (ll)"] = {
	name : "Mole (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "vermin",
	companion : "familiar",
	alignment : "Neutral",
	ac : 10,
	hp : 1,
	hd : [1, 4],
	speed : "20 ft, burrow 10 ft",
	scores : [3, 11, 9, 2, 10, 4],
	senses : "Darkvision 10 ft, Tremorsense 20 ft",
	passivePerception : 10,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Diminutive",
		description : "This creature is smaller than Tiny (less than 1 ft. x 1 ft.). A creature in this shape (polymorph, Wild Shape, Shift) instantly reverts to its normal form if it takes damage or fails a saving throw."
	}, {
		name : "Keen Smell",
		description : "The Mole has advantage on ability checks that rely on its sense of smell."
	}, {
		name : "Tunneler",
		description : "When the Mole Burrows through loose earth while moving at half its speed, it leaves a tunnel behind."
	}, {
		name : "Weak Sight",
		description : "The Mole's normal sight only extends out to a 10-foot radius, beyond that it relies on its Tremorsense."
	}]
};
CreatureList["monkey (ll)"] = {
	name : "Monkey (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "brute",
	companion : "familiar",
	alignment : "Neutral",
	ac : 12,
	hp : 2,
	hd : [1, 4],
	speed : "25 ft, climb 30 ft",
	scores : [8, 15, 10, 4, 12, 6],
	skills : {
		"acrobatics" : 6,
		"sleight of hand" : 4
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, "", "piercing"],
		range : "Melee (5 ft)",
		description : "",
		abilitytodamage : false
	}],
	traits : [{
		name : "Nimble",
		description : "The Monkey adds double its Proficiency Bonus to any Acrobatics checks it makes (included above)."
	}, {
		name : "Opposable Thumbs",
		description : "The Monkey can manipulate tools and objects as well as a Commoner, though it cannot wield weapons, shields, or complex artisan's tools."
	}, {
		name : "Prehensile Tail",
		description : "The Monkey can use its tail to hold Tiny objects and grab surfaces to aid in climbing."
	}]
};
CreatureList["octopus (ll)"] = {
	name : "Octopus (LL)",
	source : [["GMB:LL", 0]],
	size : 4,
	type : "Beast",
	subtype : "aquatic",
	companion : "familiar",
	alignment : "Neutral",
	ac : 12,
	hp : 3,
	hd : [1, 6],
	speed : "5 ft, swim 30 ft",
	scores : [4, 15, 11, 6, 10, 4],
	skills : {
		"sleight of hand" : 4,
		"stealth" : 4
	},
	senses : "Darkvision 60 ft",
	passivePerception : 10,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Tentacle",
		ability : 2,
		damage : [1, "", "bludgeoning"],
		range : "Melee (5 ft)",
		description : "If the target is equal to its size or smaller it is Grappled (escape DC 12) and the Octopus can only attack it with this Tentacle",
		abilitytodamage : false
	}],
	traits : [{
		name : "Aquatic",
		description : "The Octopus can only breathe underwater."
	}, {
		name : "Oozing Form",
		description : "The Octopus can move through gaps as narrow as 1-inch wide without having to squeeze."
	}, {
		name : "Underwater Camouflage",
		description : "The Octopus has advantage on Stealth checks made to Hide while it is underwater."
	}],
	actions : [{
		name : "Ink Cloud (1/short or long rest) (reaction)",
		description : "When the Octopus is targeted by an attack it can see while underwater, it can fill its space with ink, then move up to its speed without provoking opportunity attacks. The ink heavily obscures its space for 1 minute or until it is dispersed."
	}]
};
CreatureList["owl (ll)"] = {
	name : "Owl (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "avian",
	companion : "familiar",
	alignment : "Neutral",
	ac : 11,
	hp : 1,
	hd : [1, 4],
	speed : "5 ft, fly 60 ft",
	scores : [3, 13, 8, 2, 12, 7],
	skills : {
		"perception" : 5,
		"stealth" : 3
	},
	senses : "Darkvision 120 ft",
	passivePerception : 15,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Talons",
		ability : 2,
		damage : [1, "", "slashing"],
		range : "Melee (5 ft)",
		description : "",
		abilitytodamage : false
	}],
	traits : [{
		name : "Hunter's Senses",
		description : "The Owl adds double its Proficiency Bonus to its Perception checks (included above)."
	}, {
		name : "Nocturnal Hunter",
		description : "In dim light and darkness, the Owl has advantage on all Stealth checks and it does not provoke opportunity attacks when it flies out of an enemy's reach."
	}]
};
CreatureList["raccoon (ll)"] = {
	name : "Raccoon (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "vermin",
	companion : "familiar",
	alignment : "Neutral",
	ac : 12,
	hp : 2,
	hd : [1, 4],
	speed : "25 ft, climb 25 ft",
	scores : [4, 15, 10, 4, 11, 6],
	skills : {
		"sleight of hand" : 6,
		"stealth" : 4
	},
	senses : "Darkvision 60 ft",
	passivePerception : 10,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, "", "piercing"],
		range : "Melee (5 ft)",
		description : "",
		abilitytodamage : false
	}],
	traits : [{
		name : "Bandit",
		description : "The Raccoon adds double its Proficiency Bonus to any Sleight of Hand checks it makes (included above)."
	}, {
		name : "Keen Smell",
		description : "The Raccoon has advantage on ability checks that rely on its sense of smell."
	}, {
		name : "Opposable Thumbs",
		description : "The Raccoon can manipulate tools and objects as well as a Commoner, though it cannot wield weapons, shields, or complex artisan's tools."
	}]
};
CreatureList["raven (ll)"] = {
	name : "Raven (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "avian",
	companion : "familiar",
	alignment : "Neutral",
	ac : 12,
	hp : 1,
	hd : [1, 4],
	speed : "10 ft, fly 50 ft",
	scores : [2, 14, 8, 6, 12, 4],
	skills : {
		"perception" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 2,
		damage : [1, "", "slashing"],
		range : "Melee (5 ft)",
		description : "Many of the stat blocks in this Compendium can be used to represent multiple Beasts. For example, the Raven could be used for songbirds, parrots, and other birds. Or, the Rodent stat block can be used to represent the multitude of small furry mammals: mice, rats, squirrels, hedgehogs, ferrets, etc",
		abilitytodamage : false
	}],
	traits : [{
		name : "Mimicry",
		description : "The Raven can perfectly mimic simple sounds it has heard, like a person's voice or an animal chittering. A successful DC 10 Insight check reveals this mimicry."
	}]
};
CreatureList["rodent (ll)"] = {
	name : "Rodent (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "vermin",
	companion : "familiar",
	alignment : "Neutral",
	ac : 10,
	hp : 1,
	hd : [1, 4],
	speed : "20 ft, climb 20 ft, swim 20 ft",
	scores : [2, 11, 9, 2, 10, 4],
	skills : {
		"sleight of hand" : 2,
		"stealth" : 2
	},
	senses : "Darkvision 30 ft",
	passivePerception : 10,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, "", "piercing"],
		range : "Melee (5 ft)",
		description : "",
		abilitytodamage : false
	}],
	traits : [{
		name : "Diminutive",
		description : "This creature is smaller than Tiny (less than 1 ft. x 1 ft.). A creature in this shape (polymorph, Wild Shape, Shift) instantly reverts to its normal form if it takes damage or fails a saving throw."
	}, {
		name : "Keen Smell",
		description : "The Rodent has advantage on ability checks that rely on its sense of smell."
	}],
	actions : [{
		name : "Scamper (bonus action)",
		description : "The Rodent takes a Disengage or Hide action."
	}]
};
CreatureList["rooster (ll)"] = {
	name : "Rooster (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "avian",
	companion : "familiar",
	alignment : "Neutral",
	ac : 12,
	hp : 1,
	hd : [1, 4],
	speed : "20 ft",
	scores : [2, 14, 8, 2, 10, 4],
	skills : {
		"intimidation" : 3
	},
	senses : "",
	passivePerception : 10,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 2,
		damage : [1, "", "piercing"],
		range : "Melee (5 ft)",
		description : "",
		abilitytodamage : false
	}],
	traits : [{
		name : "Limited Flight",
		description : "If the Rooster falls at least 10 feet it can glide 2 feet horizontally for every 1 foot it falls. When the Rooster uses this trait, a Medium or smaller creature can hold on to the Rooster's feet to glide along with it."
	}]
};
CreatureList["scorpion (ll)"] = {
	name : "Scorpion (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "insect",
	companion : "familiar",
	alignment : "Neutral",
	ac : 11,
	hp : 1,
	hd : [1, 4],
	speed : "20 ft",
	scores : [2, 11, 8, 1, 8, 1],
	senses : "Blindsight 10 ft",
	passivePerception : 9,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Claw",
		ability : 2,
		damage : [1, "", "bludgeoning"],
		range : "Melee (5 ft)",
		description : "",
		abilitytodamage : false
	}, 	{
		name : "Stinger",
		ability : 2,
		damage : [1, "", "piercing"],
		range : "Melee (5 ft)",
		description : "On hit, it must make a Constitution saving throw (DC 9), or it is Poisoned until the end of its next turn",
		abilitytodamage : false
	}],
	traits : [{
		name : "Diminutive",
		description : "This creature is smaller than Tiny (less than 1 ft. x 1 ft.). A creature in this shape (polymorph, Wild Shape, Shift) instantly reverts to its normal form if it takes damage or fails a saving throw."
	}, {
		name : "Pincer",
		description : "If the Scorpion hits a target with its Claw attack it can automatically Grapple the target (escape DC 6). If the target is larger than the Scorpion, its speed isn't reduced to 0, but the Scorpion automatically moves with it."
	}]
};
CreatureList["spider (ll)"] = {
	name : "Spider (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "insect",
	companion : "familiar",
	alignment : "Neutral",
	ac : 12,
	hp : 1,
	hd : [1, 4],
	speed : "20 ft, climb 20 ft",
	scores : [1, 14, 8, 1, 10, 2],
	skills : {
		"stealth" : 4
	},
	senses : "Darkvision 30 ft",
	passivePerception : 10,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, "", "piercing"],
		range : "Melee (5 ft)",
		description : "and it must succeed on a Constitution saving throw (DC 9) or it is Poisoned until the end of its next turn",
		abilitytodamage : false
	}],
	traits : [{
		name : "Diminutive",
		description : "This creature is smaller than Tiny (less than 1 ft. x 1 ft.). A creature in this shape (polymorph, Wild Shape, Shift) instantly reverts to its normal form if it takes damage or fails a saving throw."
	}, {
		name : "Arachnid",
		description : "The Spider can climb on sheer surfaces, upside down, and along webs without making an ability check. It also ignores movement restrictions caused by webs and it can sense other creatures touching the same web as it."
	}],
	actions : [{
		name : "Web Strand",
		description : "The Spider shoots a thin strand of webbing at a target it can see within 10 ft, forming a continuous line of webbing from where it is standing to the target."
	}]
};
CreatureList["tortoise (ll)"] = {
	name : "Tortoise (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "reptilian",
	companion : "familiar",
	alignment : "Neutral",
	ac : 16,
	hp : 4,
	hd : [1, 4],
	speed : "20 ft",
	scores : [11, 4, 14, 4, 8, 3],
	saves : [2, "", "", "", "", ""],
	senses : "",
	passivePerception : 9,
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, "", "slashing"],
		range : "Melee (5 ft)",
		description : "",
		abilitytodamage : false
	}],
	actions : [{
		name : "Withdraw",
		description : "The Tortoise recedes into its shell gaining a +2 bonus to its Armor Class, but its speed becomes 0. As an action, it can emerge and return to normal."
	}]
};
CreatureList["alligator turtle (ll)"] = {
	name : "Alligator Turtle (LL)",
	source : [["GMB:LL", 0]],
	size : 4,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 15,
	hp : 13,
	hd : [3, 6],
	speed : "20 ft, swim 30 ft",
	scores : [15, 12, 13, 2, 10, 3],
	skills : {
		"stealth" : 3
	},
	senses : "",
	passivePerception : 10,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 4, "slashing"],
		range : "Melee (5 ft)",
		description : "If it is Grappled by the Alligator Turtle, it takes a bonus 1d4 damage"
	}],
	traits : [{
		name : "Hold Breath",
		description : "The Turtle can hold its breath for 1 hour."
	}, {
		name : "Natural Camouflage",
		description : "The Alligator Turtle has advantage on Stealth checks to Hide in water, mud, and swamps."
	}, {
		name : "Strong Jaws",
		description : "If the Turtle hits a creature equal to its size (or smaller) with Bite, it can Grapple it in its jaws (escape DC 12), but the Turtle can't use its Bite on other targets."
	}]
};
CreatureList["badger (ll)"] = {
	name : "Badger (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 12,
	hp : 6,
	hd : [2, 4],
	speed : "20 ft, burrow 5 ft",
	scores : [4, 11, 12, 2, 12, 5],
	condition_immunities : "frightened, poisoned",
	senses : "Darkvision 30 ft",
	passivePerception : 11,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, 4, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Smell",
		description : "The Badger has advantage on ability checks that rely on its sense of smell."
	}],
	actions : [{
		name : "Aggressive (bonus action)",
		description : "The Badger takes the Dash action, but must end this movement closer to a hostile creature."
	}]
};
CreatureList["beaver (ll)"] = {
	name : "Beaver (LL)",
	source : [["GMB:LL", 0]],
	size : 4,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 12,
	hp : 9,
	hd : [2, 6],
	speed : "20 ft, burrow 5 ft, swim 30 ft",
	scores : [11, 7, 13, 2, 12, 5],
	skills : {
		"survival" : 3
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 4, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Senses",
		description : "The Beaver has advantage on ability checks that rely on its sense of hearing or smell."
	}, {
		name : "Logger",
		description : "When the Beaver hits with its Bite attack against a tree, an object or structure made from wood, or a Plant, it deals the maximum possible damage instead of rolling."
	}, {
		name : "Mighty Laborer",
		description : "The Beaver counts as one size larger for the purpose of determining its carrying capacity and the total weight that it can push, pull, drag, and lift."
	}]
};
CreatureList["giant beetle (ll)"] = {
	name : "Giant Beetle (LL)",
	nameAlt : ["Beetle, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 4,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 13,
	hp : 13,
	hd : [3, 6],
	speed : "30 ft, climb 30 ft, fly 30 ft",
	scores : [13, 11, 12, 1, 6, 2],
	senses : "",
	passivePerception : 8,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 4, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Limited Flight",
		description : "If the Beetle ends its turn while flying it falls to the ground, but it takes no falling damage."
	}],
	actions : [{
		name : "Reflective Carapace (reaction)",
		description : "If a creature makes a melee attack against the Beetle, the Beetle can unfurl its reflective wings to impose disadvantage on the triggering attack."
	}]
};
CreatureList["camel (ll)"] = {
	name : "Camel (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 9,
	hp : 15,
	hd : [2, 10],
	speed : "50 ft",
	scores : [15, 8, 14, 2, 8, 5],
	saves : ["", "", 4, "", "", ""],
	damage_resistances : "fire",
	condition_immunities : "exhaustion (first 5 levels only)",
	senses : "",
	passivePerception : 9,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 4, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Desert Dweller",
		description : "The Camel has advantage on all saving throws to resist hostile effects of desert environments. It can also survive up to 15 days without food or water."
	}],
	actions : [{
		name : "Spit",
		description : "Ranged Weapon Attack: +4 to hit, range 15/30 ft, one target. Hit: The creature has disadvantage on attack rolls against targets other than the Camel until the start of the Camel's next turn."
	}]
};
CreatureList["giant crab (ll)"] = {
	name : "Giant Crab (LL)",
	nameAlt : ["Crab, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 15,
	hp : 13,
	hd : [3, 8],
	speed : "25 ft, swim 30 ft",
	scores : [13, 15, 11, 1, 9, 3],
	skills : {
		"stealth" : 4
	},
	senses : "Blindsight 30 ft",
	passivePerception : 9,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Claw",
		ability : 1,
		damage : [1, 6, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Amphibious",
		description : "The Crab can breathe both air and water."
	}, {
		name : "Aquatic Camouflage",
		description : "The Crab has advantage on Stealth checks while underwater or covered in sand, mud, or dirt."
	}, {
		name : "Bottom Feeder",
		description : "Underwater, the Crab has advantage on ability checks to smell creatures that are below their hit point maximum, and automatically succeeds on ability checks to smell dead creatures within 1 mile."
	}, {
		name : "Pincer",
		description : "When the Crab hits a creature equal to its size (or smaller) with its Claw attack, it can automatically Grapple the target (escape DC 11). While Grappling a target this way, it cannot attack other targets with that Claw."
	}]
};
CreatureList["dolphin (ll)"] = {
	name : "Dolphin (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 12,
	hp : 11,
	hd : [2, 8],
	speed : "0 ft, swim 60 ft",
	scores : [14, 13, 13, 7, 12, 7],
	skills : {
		"acrobatics" : 3
	},
	senses : "Blindsight 60 ft",
	passivePerception : 11,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Slam",
		ability : 1,
		damage : [1, 6, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Charge",
		description : "If the Dolphin swims at least 60 ft in a line then hits a creature equal to its size (or smaller) with its Slam, the target is Stunned until the start of its next turn."
	}, {
		name : "Echolocation",
		description : "When the Dolphin makes an ability check that uses its sense of hearing, it treats a roll of 9 or lower on the d20 as a 10. The Dolphin loses this benefit and its Blindsight if it is Deafened."
	}, {
		name : "Hold Breath",
		description : "The Dolphin can hold its breath for up to 30 minutes while it is underwater."
	}, {
		name : "Pack Tactics",
		description : "The Dolphin has advantage on attack rolls if a conscious allied creature is within 5 ft of its target."
	}]
};
CreatureList["hawk (ll)"] = {
	name : "Hawk (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 12,
	hp : 7,
	hd : [3, 4],
	speed : "10 ft, fly 60 ft",
	scores : [5, 15, 8, 3, 14, 5],
	skills : {
		"acrobatics" : 4,
		"perception" : 6
	},
	senses : "",
	passivePerception : 16,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Talons",
		ability : 2,
		damage : [1, 4, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Hunter's Senses",
		description : "The Hawk adds double its Proficiency Bonus to its Perception checks (included above)."
	}, {
		name : "Pack Tactics",
		description : "The Hawk has advantage on its attack rolls if a conscious allied creature is within 5 ft of its target."
	}]
};
CreatureList["hellwasp (ll)"] = {
	name : "Hellwasp (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 12,
	hp : 1,
	hd : [1, 4],
	speed : "10 ft, fly 30 ft",
	scores : [2, 15, 8, 1, 6, 2],
	skills : {
		"acrobatics" : 4,
		"perception" : 0,
		"intimidation" : -2
	},
	senses : "",
	passivePerception : 10,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Sting",
		ability : 2,
		damage : [1, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "and the Hellwasp must make a Constitution saving throw (DC 10) or die"
	}],
	traits : [{
		name : "Diminutive",
		description : "This creature is smaller than Tiny (less than 1 ft. x 1 ft.). A creature in this shape (polymorph, Wild Shape, Shift) instantly reverts to its normal form if it takes damage or fails a saving throw."
	}, {
		name : "Agile Flight",
		description : "The Hellwasp has advantage on all Dexterity ability checks and saving throws it makes while flying."
	}, {
		name : "Hellwasp Venom (1/day)",
		description : "If the Hellwasp hits a creature with a Sting attack, the target must make a Constitution saving throw (DC 12). On a failure, it is Poisoned until the end of its next turn. If it fails by 5 or more, it is also Paralyzed for the same duration."
	}]
};
CreatureList["heron (ll)"] = {
	name : "Heron (LL)",
	source : [["GMB:LL", 0]],
	size : 4,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 12,
	hp : 7,
	hd : [2, 6],
	speed : "10 ft, fly 40 ft",
	scores : [4, 15, 8, 5, 14, 6],
	skills : {
		"perception" : 6,
		"stealth" : 4
	},
	senses : "",
	passivePerception : 16,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 2,
		damage : [1, 4, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Ambush Hunter",
		description : "The Heron has advantage on all Stealth checks made to Hide in marshland and swamp. Creatures have disadvantage on ability checks made to detect the Heron, so long as the Heron is standing still."
	}, {
		name : "Ambush Strike",
		description : "When the Heron hits a creature with its Beak attack while its target is unaware of the Heron, the attack deals a bonus 1d4 damage on hit."
	}, {
		name : "Hunter's Senses",
		description : "The Heron adds double its Proficiency Bonus to its Perception checks (included above)."
	}]
};
CreatureList["hunting dog (ll)"] = {
	name : "Hunting Dog (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 12,
	hp : 11,
	hd : [2, 8],
	speed : "40 ft",
	scores : [13, 14, 12, 5, 12, 7],
	skills : {
		"perception" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Senses",
		description : "The Hunting Dog has advantage on ability checks that rely on its sense of hearing or smell."
	}, {
		name : "Loyal",
		description : "The Hunting Dog has advantage on saving throws to resist the Charmed and Frightened conditions while there is a conscious allied creature within 30 ft"
	}, {
		name : "Strong Jaws",
		description : "If the Hunting Dog hits a creature equal to its size (or smaller) with a Bite attack, it can Grapple the creature in its jaws (escape DC 11). When Grappling a creature it cannot use its Bite attack on other targets."
	}]
};
CreatureList["llama (ll)"] = {
	name : "Llama (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 10,
	hp : 13,
	hd : [2, 8],
	speed : "40 ft, climb 30 ft",
	scores : [13, 10, 15, 2, 12, 7],
	skills : {
		"athletics" : 3
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 4, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Beast of Burden",
		description : "The Llama counts as one size larger for the purposes of determining its carrying capacity."
	}, {
		name : "Sure-Footed",
		description : "The Llama has advantage on saving throws to resist being knocked prone or moved against its will."
	}],
	actions : [{
		name : "Spit",
		description : "Ranged Weapon Attack: +2 to hit, range 15/30 ft, one target. Hit: The creature has disadvantage on attack rolls against all targets other than the Llama until the beginning of the Llama's next turn. Legends tell of a powerful fey creature spoken of in whispers as the Laser Llama. The legends say this mythical llama can fly and conjure blasts of pure radiance to smite its foes..."
	}]
};
CreatureList["lynx (ll)"] = {
	name : "Lynx (LL)",
	source : [["GMB:LL", 0]],
	size : 4,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 12,
	hp : 10,
	hd : [3, 6],
	speed : "40 ft, climb 30 ft",
	scores : [11, 14, 10, 3, 12, 7],
	skills : {
		"perception" : 3,
		"stealth" : 4
	},
	damage_resistances : "cold",
	senses : "Darkvision 60 ft",
	passivePerception : 13,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Claw",
		ability : 2,
		damage : [1, 4, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Smell",
		description : "The Lynx has advantage on all ability checks that rely on its sense of smell."
	}, {
		name : "Natural Camouflage",
		description : "The Lynx has advantage on Stealth checks it makes to Hide while in forested environments."
	}, {
		name : "Pounce",
		description : "If a Lynx moves 20 ft in a line, and hits a target equal to its size (or smaller) with its Claw, it falls Prone."
	}]
};
CreatureList["piranha (ll)"] = {
	name : "Piranha (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 12,
	hp : 1,
	hd : [1, 4],
	speed : "0 ft, swim 40 ft",
	scores : [2, 13, 7, 1, 6, 2],
	senses : "Darkvision 60 ft",
	passivePerception : 8,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, 4, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Diminutive",
		description : "This creature is smaller than Tiny (less than 1 ft. x 1 ft.). A creature in this shape (polymorph, Wild Shape, Shift) instantly reverts to its normal form if it takes damage or fails a saving throw."
	}, {
		name : "Aquatic",
		description : "The Piranha can only breathe underwater."
	}, {
		name : "Blood Sense",
		description : "The Piranha knows the exact direction of any creature with less than its maximum hit points within 1 mile, so long as they are in the same body of water."
	}, {
		name : "Bottom Feeder",
		description : "The Piranha automatically succeeds on ability checks to smell dead creatures within 1 mile."
	}, {
		name : "Shimmering Camouflage",
		description : "The Piranha has advantage on Stealth checks to hide while it is underwater."
	}],
	actions : [{
		name : "Opportunist (reaction)",
		description : "If the Piranha sees a creature take damage, it moves up to half its speed and uses its Bite against it."
	}]
};
CreatureList["pony (ll)"] = {
	name : "Pony (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 10,
	hp : 13,
	hd : [2, 8],
	speed : "40 ft",
	scores : [15, 10, 15, 2, 12, 7],
	saves : [4, "", "", "", "", ""],
	skills : {
		"athletics" : 3
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Hooves",
		ability : 1,
		damage : [1, 4, "bludgeoning"],
		range : "Melee (5 ft)",
		description : "",
		modifiers : [-1, -1]
	}],
	traits : [{
		name : "Beast of Burden",
		description : "The Pony counts as one size larger for the purposes of determining its carrying capacity and the amount of weight that it can carry, push, pull, and drag."
	}, {
		name : "Sure-Footed",
		description : "The Pony has advantage on saving throws to resist being knocked Prone or moved against its will."
	}],
	actions : [{
		name : "Kick (reaction)",
		description : "When a creature the Mule can see enters its reach, the Pony can make one Hooves attack against it."
	}]
};
CreatureList["giant rodent (ll)"] = {
	name : "Giant Rodent (LL)",
	nameAlt : ["Rodent, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 4,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 12,
	hp : 7,
	hd : [2, 6],
	speed : "30 ft, climb 30 ft, swim 30 ft",
	scores : [7, 15, 11, 2, 10, 4],
	saves : ["", 4, "", "", "", ""],
	skills : {
		"sleight of hand" : 4,
		"stealth" : 4
	},
	damage_resistances : "poison",
	senses : "Darkvision 60 ft",
	passivePerception : 10,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Fetid Bite",
		ability : 2,
		damage : [1, 4, "piercing"],
		range : "Melee (5 ft)",
		description : "and it cannot regain hit points until the start of the Rodent's next turn"
	}],
	traits : [{
		name : "Keen Smell",
		description : "The Rodent has advantage on ability checks that rely on its sense of smell."
	}, {
		name : "Pack Tactics",
		description : "The Rodent has advantage on attack rolls if a conscious allied creature is within 5 ft of its target."
	}],
	actions : [{
		name : "Scamper (bonus action)",
		description : "The Rodent takes a Disengage or Hide action."
	}]
};
CreatureList["giant scarab (ll)"] = {
	name : "Giant Scarab (LL)",
	nameAlt : ["Scarab, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 4,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 13,
	hp : 13,
	hd : [3, 6],
	speed : "30 ft, climb 30 ft, burrow 10 ft",
	scores : [8, 14, 12, 1, 6, 2],
	senses : "Tremmorsense 30 ft",
	passivePerception : 8,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Devouring Bite",
		ability : 2,
		damage : [1, 4, "piercing"],
		range : "Melee (5 ft)",
		description : "and if the target has flesh, it takes the same amount of damage to its maximum hit points. Any damage dealt to maximum hit points is restored after completing a long rest"
	}],
	traits : [{
		name : "Devour Flesh",
		description : "The Scarab can strip the flesh from a dead creature equal to its size or smaller in 1 minute."
	}, {
		name : "Scavenger",
		description : "The Scarab has advantage on all ability checks to sense dead creatures or creatures below their hit point maximum, so long as the target is within 300 ft"
	}, {
		name : "Spider Climb",
		description : "The Scarab can climb sheer surfaces and upside-down without needing to make an ability check."
	}]
};
CreatureList["vampire bat (ll)"] = {
	name : "Vampire Bat (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 12,
	hp : 7,
	hd : [2, 6],
	speed : "15 ft, fly 40 ft",
	scores : [6, 15, 8, 2, 12, 4],
	senses : "Blindsight 60 ft",
	passivePerception : 11,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, 4, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Echolocation",
		description : "When the Bat makes an ability check that uses its hearing, it treats a d20 roll of 9 or lower as a 10. It loses this benefit and its Blindsight if it is Deafened."
	}, {
		name : "Latch",
		description : "When the Bat hits a creature with its Bite, it can automatically Grapple it (escape DC 7). If the creature is larger than the Bat, its speed is not reduced to 0, but the Bat automatically moves with the Grappled target."
	}],
	actions : [{
		name : "Drain (bonus action)",
		description : "A creature Grappled by the Bat takes 1d4 necrotic damage, and the Bat gains temporary hit points equal to the damage dealt. This feature has no effect on creatures that do not have blood flowing in their veins."
	}]
};
CreatureList["viper (ll)"] = {
	name : "Viper (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 12,
	hp : 7,
	hd : [3, 4],
	speed : "30 ft, swim 30 ft",
	scores : [2, 15, 11, 1, 10, 3],
	skills : {
		"stealth" : 4
	},
	senses : "",
	passivePerception : 10,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Strike",
		ability : 2,
		damage : [1, 4, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Cold-Blooded",
		description : "If the Viper takes cold damage, it cannot take reactions and its speed is halved on its next turn."
	}, {
		name : "Thermal Vision",
		description : "The Viper knows the exact location of any warm-blooded creatures within 30 feet of it."
	}, {
		name : "Venom (Recharge 5-6)",
		description : "If the Viper hits a creature with a Strike, it can force it to make a Constitution saving throw (DC 10). On a failed save, the creature takes an aditional 1d4 poison damage and is Poisoned. A Poisoned creature repeats this saving throw at the end of each of its turns. On a success, the effect ends, but on a failure, it takes an additional 1d4 poison damage."
	}]
};
CreatureList["vulture (ll)"] = {
	name : "Vulture (LL)",
	source : [["GMB:LL", 0]],
	size : 4,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 11,
	hp : 9,
	hd : [2, 6],
	speed : "15 ft, fly 60 ft",
	scores : [7, 12, 13, 2, 12, 4],
	skills : {
		"perception" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 2,
		damage : [1, 4, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Carrion Sense",
		description : "The Vulture has advantage on all ability checks to smell creatures within 120 ft that are below their hit point maximum. It automatically succeeds on ability checks to smell dead creatures within 1 mile."
	}, {
		name : "Keen Sight & Smell",
		description : "The Vulture has advantage on all ability checks that rely on its sense of sight or smell."
	}],
	actions : [{
		name : "Opportunist (reaction)",
		description : "If the Vulture sees a creature take damage, it moves up to half its speed and uses its Beak against it."
	}]
};
CreatureList["wild dog (ll)"] = {
	name : "Wild Dog (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 11,
	hp : 11,
	hd : [2, 8],
	speed : "50 ft",
	scores : [11, 13, 12, 3, 12, 6],
	skills : {
		"perception" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Hearing & Smell",
		description : "The Wild Dog has advantage on ability checks that rely on its senses of hearing or smell."
	}, {
		name : "Pack Tactics",
		description : "The Wild Dog has advantage on attack rolls if a conscious allied creature is within 5 ft of its target."
	}],
	actions : [{
		name : "Opportunist (reaction)",
		description : "If the Wild Dog sees a target take damage, it moves up to half its speed and uses its Bite against it."
	}]
};
CreatureList["boa constrictor (ll)"] = {
	name : "Boa Constrictor (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 12,
	hp : 13,
	hd : [2, 10],
	speed : "30 ft, climb 20 ft, swim 30 ft",
	scores : [15, 14, 12, 1, 10, 3],
	senses : "",
	passivePerception : 10,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Strike",
		ability : 1,
		damage : [1, 10, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Constrict",
		ability : 1,
		damage : [1, 8, "bludgeoning"],
		range : "Melee (5 ft)",
		description : "and if the target is equal to the Boa Constrictor's size (or smaller) it is Grappled (escape DC 12). While Grappled, the target is also Restrained, and the Boa can't Grapple another target"
	}],
	traits : [{
		name : "Cold-Blooded",
		description : "If the Boa takes cold damage, it can't take reactions and its speed is halved on its next turn."
	}, {
		name : "Serpentine",
		description : "The Boa Constrictor counts as two sizes smaller for the purposes of moving through passages."
	}, {
		name : "Thermal Vision",
		description : "The Boa Constrictor knows the exact location of any warm-blooded creature within 30 feet."
	}],
	actions : [{
		name : "Crush",
		description : "The Boa Constrictor forces one creature that it is Grappling to make a Strength saving throw (DC 12). On a failed save, it suffers one level of Exhaustion."
	}]
};
CreatureList["boar (ll)"] = {
	name : "Boar (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 11,
	hp : 16,
	hd : [3, 8],
	speed : "40 ft",
	scores : [14, 11, 12, 2, 9, 5],
	senses : "",
	passivePerception : 9,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Stomp",
		ability : 1,
		damage : [1, 6, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Tusk",
		ability : 1,
		damage : [1, 8, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Thick Hide",
		description : "The Boar reduces all damage, other than force, psychic, and radiant by its Con. modifier (1)."
	}, {
		name : "Trampling Charge",
		description : "When the Boar moves at least 20 ft in a line and hits a creature equal to its size (or smaller) with a Tusk attack, the target is knocked Prone. The Boar can then make a Stomp attack against it as a bonus action."
	}, {
		name : "Relentless (1/day)",
		description : "When the Boar would be reduced to 0 points, but not killed outright, it falls to 1 hit point."
	}]
};
CreatureList["giant centipede (ll)"] = {
	name : "Giant Centipede (LL)",
	nameAlt : ["Centipede, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 4,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 13,
	hp : 13,
	hd : [3, 6],
	speed : "30 ft, climb 30 ft",
	scores : [5, 14, 12, 1, 7, 3],
	senses : "Blindsight 30 ft",
	passivePerception : 8,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, 4, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Venom (Recharge 5-6)",
		description : "When the Centipede hits with its Bite, it can force the target to make a Constitution saving throw (DC 11). On a failure, it takes 3d4 poison damage and is Poisoned. On a success, it only takes half damage. A Poisoned creature repeats this saving throw at the end of each of its turns, ending the effect on a success. On a failure, it takes 1d4 poison damage. If this reduces it to 0 hit points, it is stable, but Paralyzed, while at 0 hit points."
	}]
};
CreatureList["electric eel (ll)"] = {
	name : "Electric Eel (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 12,
	hp : 16,
	hd : [3, 8],
	speed : "0 ft, swim 30 ft",
	scores : [11, 14, 12, 1, 10, 3],
	damage_resistances : "lighting",
	senses : "",
	passivePerception : 10,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Shocking Bite",
		ability : 2,
		damage : [1, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "plus (1d6) lighting damage, and the target can't take reactions until the start of the Electric Eel's next turn"
	}],
	traits : [{
		name : "Aquatic",
		description : "The Electric Eel can only breathe underwater."
	}, {
		name : "Electrosense",
		description : "While underwater, the Electric Eel knows the exact location of any living creature within 30 feet."
	}, {
		name : "Slippery",
		description : "Opportunity attacks are made at disadvantage against the Electric Eel while it is underwater."
	}]
};
CreatureList["giant fish (ll)"] = {
	name : "Giant Fish (LL)",
	nameAlt : ["Fish, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 13,
	hp : 16,
	hd : [3, 10],
	speed : "0 ft, swim 40 ft",
	scores : [14, 15, 11, 2, 12, 5],
	senses : "Darkvision 60 ft",
	passivePerception : 11,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Aquatic",
		description : "The Fish can only breathe underwater."
	}]
};
CreatureList["falcon (ll)"] = {
	name : "Falcon (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 13,
	hp : 10,
	hd : [4, 4],
	speed : "10 ft, fly 60 ft",
	scores : [4, 16, 7, 5, 14, 6],
	skills : {
		"acrobatics" : 5,
		"perception" : 6
	},
	senses : "",
	passivePerception : 16,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Talons",
		ability : 2,
		damage : [1, 6, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Slam",
		ability : 2,
		damage : [1, 8, "bludgeoning"],
		range : "Melee (5 ft)",
		description : "",
		modifiers : [-1, -1]
	}],
	traits : [{
		name : "Aerodynamic",
		description : "When the Falcon takes the Dash action its speed bonus is doubled, and opportunity attacks against it have disadvantage until the end of that turn."
	}, {
		name : "Dive",
		description : "When the Falcon flies 40 ft down in a line then hits with its Talons, it deals a bonus 1d6 damage. If the target is equal to the Falcon's size (or smaller) it falls Prone."
	}, {
		name : "Hunter's Senses",
		description : "The Falcon adds double its Proficiency Bonus to its Perception checks (included above)."
	}],
	actions : [{
		name : "Bottom Feeder",
		description : "Underwater, the Fish has advantage on ability checks to smell creatures that are below their hit point maximum, and automatically succeeds on ability checks to smell dead creatures within 1 mile."
	}, {
		name : "Ram",
		description : "If the Fish swims 20 ft in a line, then hits with its Slam, it deals 1d8 bonus damage. If the target is equal to the Fish's size (or smaller) it is knocked back 20 ft in a straight line."
	}, {
		name : "Shimmering Camouflage",
		description : "The Fish has advantage on Stealth checks it makes to hide while it is underwater."
	}]
};
CreatureList["giant frog (ll)"] = {
	name : "Giant Frog (LL)",
	nameAlt : ["Frog, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 11,
	hp : 18,
	hd : [4, 8],
	speed : "30 ft, climb 30 ft, swim 30 ft",
	scores : [12, 13, 11, 2, 10, 3],
	skills : {
		"stealth" : 3
	},
	senses : "",
	passivePerception : 10,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 8, "bludgeoning"],
		range : "Melee (5 ft)",
		description : "and if the creature is Grappled by the Frog it is Swallowed"
	}],
	traits : [{
		name : "Amphibious",
		description : "The Frog can breathe both air and water."
	}, {
		name : "Mighty Leap",
		description : "Once per turn, the Frog can expend 5 ft of movement to long jump up to 20 ft, or high jump up to 10 ft, even if this exceeds its remaining speed."
	}, {
		name : "Strong Jaws",
		description : "If the Frog hits a creature equal to its size (or smaller) with its Bite, it can Grapple it in its jaws (escape DC 12), but the Frog cannot use its Bite on other targets."
	}, {
		name : "Swallowed",
		description : "Any Swallowed creatures are Blinded and Restrained, have total cover from all attacks and effects outside the Frog, and they take (2d4) acid damage at the start of each of the Frog's turns. The Frog must maintain concentration on this effect. If this effect ends, Swallowed creatures land Prone in an unoccupied space within 5 ft of the Frog."
	}]
};
CreatureList["ox (cow) (ll)"] = {
	name : "Ox (Cow) (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 10,
	hp : 15,
	hd : [2, 10],
	speed : "30 ft",
	scores : [17, 10, 14, 2, 10, 4],
	senses : "",
	passivePerception : 10,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Gore",
		ability : 1,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Beast of Burden",
		description : "The Ox counts as one size larger for the purposes of determining its carrying capacity and the amount of weight that it can carry, push, pull, and drag."
	}, {
		name : "Charge",
		description : "If the Ox moves 20 ft in a line, then hits a target equal to its size (or smaller) with its Gore, it falls Prone."
	}]
};
CreatureList["giant lizard (ll)"] = {
	name : "Giant Lizard (LL)",
	nameAlt : ["Lizard, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 12,
	hp : 19,
	hd : [3, 10],
	speed : "30 ft, climb 30 ft",
	scores : [15, 12, 13, 2, 10, 5],
	saves : ["", 3, "", "", "", ""],
	senses : "Darkvision 30 ft",
	passivePerception : 10,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 10, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Cold-Blooded",
		description : "If the Lizard takes cold damage, it cannot take reactions and its speed is halved on its next turn."
	}, {
		name : "Natural Camouflage",
		description : "The Lizard has advantage on Stealth checks to Hide in natural environments."
	}, {
		name : "Sticky Grip",
		description : "The Lizard can climb up sheer surfaces and upside down without needing to make an ability check."
	}],
	actions : [{
		name : "Shed Tail (1/day) (reaction)",
		description : "When the Lizard is Grappled or takes damage it can shed its tail to automatically escape from the Grapple or reduce the triggering damage to 0."
	}]
};
CreatureList["panther (ll)"] = {
	name : "Panther (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 12,
	hp : 13,
	hd : [3, 8],
	speed : "40 ft, climb 30 ft",
	scores : [14, 15, 10, 3, 14, 7],
	skills : {
		"perception" : 4,
		"stealth" : 4
	},
	senses : "Darkvision 60 ft",
	passivePerception : 14,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 1,
		damage : [1, 6, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Smell",
		description : "The Panther has advantage on ability checks that rely on its sense of smell."
	}, {
		name : "Pounce",
		description : "If the Panther moves at least 20 ft in a line, then hits a target equal to its size (or smaller) with its Claw the target is knocked Prone, then the Panther can make one Bite attack against it as a bonus action."
	}, {
		name : "Twilight Camouflage",
		description : "The Panther has advantage on all Stealth checks while it is in dim light or darkness."
	}]
};
CreatureList["giant raccoon (ll)"] = {
	name : "Giant Raccoon (LL)",
	nameAlt : ["Raccoon, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 12,
	hp : 18,
	hd : [4, 8],
	speed : "30 ft, climb 30 ft",
	scores : [10, 16, 11, 7, 13, 6],
	skills : {
		"sleight of hand" : 7,
		"stealth" : 5
	},
	senses : "Darkvision 60 ft",
	passivePerception : 11,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [2, 4, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Bandit",
		description : "The Raccoon adds double its Proficiency Bonus to any Sleight of Hand checks it makes (included above)."
	}, {
		name : "Keen Smell",
		description : "The Raccoon has advantage on ability checks that rely on its sense of smell."
	}, {
		name : "Opposable Thumbs",
		description : "The Raccoon can manipulate tools and objects as well as a Commoner, though it cannot wield weapons, shields, or complex artisan's tools."
	}]
};
CreatureList["giant rooster (ll)"] = {
	name : "Giant Rooster (LL)",
	nameAlt : ["Rooster, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 11,
	hp : 13,
	hd : [3, 8],
	speed : "30 ft, fly 10 ft",
	scores : [14, 13, 10, 2, 10, 4],
	senses : "Intimidation +4, Perception +2",
	passivePerception : 10,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 1,
		damage : [1, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "This attack deals a bonus (2d6) damage against Prone targets"
	}, 	{
		name : "Talons",
		ability : 1,
		damage : [2, 4, "slashing"],
		range : "Melee (5 ft)",
		description : "and its speed is reduced by 10 ft until the end of its next turn"
	}],
	traits : [{
		name : "Imposing Presence",
		description : "The Rooster uses Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Limited Flight",
		description : "If the Rooster ends its turn while flying it falls. If it falls at least 10 ft, it can glide 2 ft horizontally for every 1 ft that it falls. When it uses this trait, a Large or smaller creature can hold its feet to glide with it."
	}]
};
CreatureList["stag (ll)"] = {
	name : "Stag (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 10,
	hp : 13,
	hd : [2, 10],
	speed : "50 ft",
	scores : [16, 10, 12, 2, 10, 6],
	senses : "",
	passivePerception : 10,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Antler",
		ability : 1,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Hooves",
		ability : 1,
		damage : [1, 6, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Cervine Leap",
		description : "With a 10 ft running start, a Stag can long jump up to 30 ft and high jump up to 15 ft"
	}, {
		name : "Trampling Charge",
		description : "When the Stag moves at least 20 ft in a line and hits a creature equal to its size (or smaller) with its Antler, the target falls Prone and the Stag can make one Hooves attack against it as a bonus action."
	}],
	actions : [{
		name : "Kick (reaction)",
		description : "When a creature the Stag can see enters its reach, the Stag can make one Hooves attack against it."
	}]
};
CreatureList["swarm of bats (ll)"] = {
	name : "Swarm of Bats (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 12,
	hp : 13,
	hd : [3, 8],
	speed : "5 ft, fly 30 ft",
	scores : [4, 15, 10, 2, 12, 4],
	damage_resistances : "bludgeoning, piercing, and slashing",
	condition_immunities : "charmed, frightened, grappled, paralyzed",
	senses : "Blindsight 60 ft",
	passivePerception : 11,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Swarm of Tiny Beasts",
		description : "This swarm is made of Tiny Beasts."
	}, {
		name : "Echolocation",
		description : "When the Swarm makes an ability check that uses its hearing, it treats a d20 roll of 9 or lower as a 10. It loses this benefit and Blindsight if it is Deafened."
	}, {
		name : "Swarm",
		description : "The Swarm can occupy the same space as other creatures, and vice versa. It can also pass through spaces large enough for a Tiny Bat without having to squeeze."
	}],
	actions : [{
		name : "Flurry of Bites",
		description : "Creatures of the Swarm's choice within its space must make a Dexterity saving throw (DC 12). They take piercing damage equal to the Swarm's remaining hit points on a failure, and half that damage on a success."
	}]
};
CreatureList["swarm of birds (ll)"] = {
	name : "Swarm of Birds (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 12,
	hp : 13,
	hd : [3, 8],
	speed : "10 ft, fly 50 ft",
	scores : [4, 14, 10, 6, 12, 4],
	skills : {
		"perception" : 3
	},
	damage_resistances : "bludgeoning, piercing, and slashing",
	condition_immunities : "charmed, frightened, grappled, paralyzed",
	senses : "",
	passivePerception : 13,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Swarm of Tiny Beasts",
		description : "This swarm is made of Tiny Beasts."
	}, {
		name : "Cacophony",
		description : "Creatures (other than the Swarm) within the Swarm's space are Deafened. At the beginning of its turn, the Swarm can repress this Trait until its next turn."
	}, {
		name : "Swarm",
		description : "The Swarm can occupy the same space as other creatures, and vice versa. It can also pass through spaces large enough for a Tiny Bird without having to squeeze."
	}],
	actions : [{
		name : "Flurry of Talons",
		description : "Creatures of the Swarm's choice in its space must make a Dexterity saving throw (DC 12). They take piercing damage equal to the Swarm's remaining hit points on a failure, and half that damage on a success."
	}]
};
CreatureList["swarm of bugs (ll)"] = {
	name : "Swarm of Bugs (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 10,
	hp : 13,
	hd : [3, 8],
	speed : "20 ft, climb 20 ft, burrow 10 ft",
	scores : [4, 13, 10, 1, 7, 2],
	damage_resistances : "bludgeoning, piercing, and slashing",
	damage_vulnerabilities : "fire",
	condition_immunities : "charmed, frightened, grappled, paralyzed",
	senses : "Blindsight 10 ft",
	passivePerception : 8,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Swarm of Diminutive Beasts",
		description : "This swarm is made of Diminutive Beasts."
	}, {
		name : "Spider Climb",
		description : "The Swarm can climb sheer surfaces and upside-down without needing to make an ability check."
	}, {
		name : "Swarm",
		description : "The Swarm can occupy the same space as other creatures, and vice versa. It can also pass through spaces large enough for a Diminutive Insect without squeezing."
	}],
	actions : [{
		name : "Flurry of Bites",
		description : "Creatures of the Swarm's choice within its space must make a Dexterity saving throw (DC 11). They take piercing damage equal to the Swarm's remaining hit points on a failure, and half that damage on a success. Any creature that fails by 5 or more is also Frightened of the Swarm until they leave the Swarm's space"
	}]
};
CreatureList["wolf (ll)"] = {
	name : "Wolf (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 13,
	hp : 11,
	hd : [2, 8],
	speed : "40 ft",
	scores : [14, 15, 12, 3, 12, 6],
	skills : {
		"perception" : 3,
		"stealth" : 4,
		"survival" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [2, 4, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Hearing & Smell",
		description : "The Wolf has advantage on ability checks that rely on its sense of hearing or smell."
	}, {
		name : "Pack Tactics",
		description : "The Wolf has advantage on its attack rolls if a conscious allied creature is within 5 ft of its target."
	}, {
		name : "Strong Jaws",
		description : "If the Wolf hits a target equal to its size (or smaller) with its Bite, it can Grapple it in its jaws (escape DC 12), but the Wolf can't use its Bite on other targets."
	}]
};
CreatureList["giant wolf spider (ll)"] = {
	name : "Giant Wolf Spider (LL)",
	nameAlt : ["Wolf Spider, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 13,
	hp : 11,
	hd : [2, 8],
	speed : "40 ft, climb 40 ft",
	scores : [12, 16, 13, 3, 12, 4],
	skills : {
		"stealth" : 5
	},
	senses : "Blindsight 10 ft, Darkvision 60 ft",
	passivePerception : 11,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Arachnid",
		description : "The Spider can climb on sheer surfaces, upside down, and along webs without making an ability check. It also ignores movement restrictions caused by webs and it can sense other creatures touching the same web as it."
	}, {
		name : "Venom (Recharge 5-6)",
		description : "If the Spider hits with its Bite, it can force the target to make a Constitution saving throw (DC 11). On a failure, it takes 2d6 poison damage and is Poisoned. On a success, it only takes half damage. A Poisoned creature repeats this saving throw at the end of each of its turns, ending the effect on a success. On a failure, it takes 1d6 poison damage. If this reduces it to 0 hit points, it is stable, but Paralyzed, while at 0 hit points."
	}],
	actions : [{
		name : "Web Strand",
		description : "The Spider shoots a thin strand of webbing at a target it can see within 20 ft, forming a continuous line of webbing from where it is standing to the target."
	}]
};
CreatureList["black bear (ll)"] = {
	name : "Black Bear (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 11,
	hp : 19,
	hd : [3, 8],
	speed : "40 ft, climb 30 ft",
	scores : [15, 10, 14, 2, 12, 7],
	senses : "",
	passivePerception : 11,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 1,
		damage : [2, 6, "slashing"],
		range : "Melee (5 ft)",
		description : "and a target equal to the Black Bear's size (or smaller) is knocked Prone"
	}],
	traits : [{
		name : "Keen Smell",
		description : "The Black Bear has advantage on ability checks that rely on its sense of smell."
	}, {
		name : "Strong Jaws",
		description : "If the Bear hits a creature equal to its size (or smaller) with its Bite, it can Grapple it in its jaws (escape DC 12), but the Bear cannot use its Bite on other targets."
	}, {
		name : "Thick Hide",
		description : "The Bear reduces damage, other than force, psychic, and radiant by its Constitution modifier (2)."
	}]
};
CreatureList["cheetah (ll)"] = {
	name : "Cheetah (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 13,
	hp : 19,
	hd : [4, 8],
	speed : "40 ft, climb 30 ft",
	scores : [12, 17, 8, 3, 14, 7],
	skills : {
		"perception" : 4,
		"stealth" : 5
	},
	senses : "Darkvision 30 ft",
	passivePerception : 14,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 2,
		damage : [1, 6, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Smell",
		description : "The Cheetah has advantage on ability checks that rely on its sense of smell."
	}, {
		name : "Pounce",
		description : "When the Cheetah moves at least 20 ft in a line, then hits a target equal to its size (or smaller) with a Claw attack, the target falls Prone, then the Cheetah can make one Bite attack against it as a bonus action."
	}, {
		name : "Spotted Camouflage",
		description : "The Cheetah has advantage on all Stealth checks to Hide while it is in grasslands."
	}, {
		name : "Sprinter",
		description : "When the Cheetah takes the Dash action its speed bonus is doubled, and opportunity attacks against it have disadvantage until the end of that turn."
	}]
};
CreatureList["chimpanzee (ll)"] = {
	name : "Chimpanzee (LL)",
	source : [["GMB:LL", 0]],
	size : 4,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 12,
	hp : 16,
	hd : [3, 6],
	speed : "30 ft, climb 30 ft",
	scores : [16, 14, 14, 6, 12, 7],
	skills : {
		"acrobatics" : 4,
		"athletics" : 5
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Fist",
		ability : 1,
		damage : [1, 8, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Hurl",
		ability : 1,
		damage : [1, 6, "bludgeoning"],
		range : "25/50 ft",
		description : ""
	}],
	traits : [{
		name : "Opposable Thumbs",
		description : "The Chimpanzee can manipulate tools and objects as well as a Commoner. However, it can't use weapons, shields, or complex Artisan's Tools."
	}]
};
CreatureList["emu (ll)"] = {
	name : "Emu (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 12,
	hp : 19,
	hd : [3, 10],
	speed : "50 ft",
	scores : [16, 13, 12, 2, 11, 5],
	skills : {
		"perception" : 2
	},
	senses : "",
	passivePerception : 12,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 1,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "This attack deals a bonus (1d8) damage against Prone targets"
	}, 	{
		name : "Kick",
		ability : 1,
		damage : [1, 10, "slashing"],
		range : "Melee (5 ft)",
		description : "and if the target is equal to the Emu's size (or smaller), it falls Prone"
	}],
	traits : [{
		name : "Pack Tactics",
		description : "The Emu has advantage on its attack rolls if a conscious allied creature is within 5 ft of its target."
	}],
	actions : [{
		name : "Aggressive (bonus action)",
		description : "The Emu takes the Dash action, but it must end this movement closer to a Hostile creature."
	}]
};
CreatureList["giant goat (ll)"] = {
	name : "Giant Goat (LL)",
	nameAlt : ["Goat, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 11,
	hp : 19,
	hd : [3, 10],
	speed : "40 ft, climb 40 ft",
	scores : [17, 11, 12, 3, 12, 6],
	saves : [5, "", "", "", "", ""],
	skills : {
		"athletics" : 5
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Headbutt",
		ability : 1,
		damage : [2, 4, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Beast of Burden",
		description : "The Goat counts as one size larger for the purposes of determining its carrying capacity and the amount of weight that it can carry, push, pull, and drag."
	}, {
		name : "Ram",
		description : "If the Goat moves at least 20 ft in a line, then hits with its Headbutt, it deals a bonus 2d4 damage, and if its target is equal to the Goat's size (or smaller), the target is knocked back 25 ft in a straight line."
	}, {
		name : "Sure-Footed",
		description : "The Goat has advantage on saving throws to resist being knocked Prone or moved against its will."
	}]
};
CreatureList["horse (ll)"] = {
	name : "Horse (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 10,
	hp : 21,
	hd : [3, 10],
	speed : "60 ft",
	scores : [18, 10, 14, 2, 12, 7],
	senses : "",
	passivePerception : 11,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Hooves",
		ability : 1,
		damage : [2, 4, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Trampling Charge",
		description : "If the Horse moves at least 20 ft in a line, then hits a creature equal to its size (or smaller) with its Hooves, the target falls Prone, then the Horse can use a bonus action to make another Hooves attack against it."
	}],
	actions : [{
		name : "Kick (reaction)",
		description : "When a creature the Horse can see enters its reach, the Horse can make one Hooves attack against it."
	}]
};
CreatureList["komodo dragon (ll)"] = {
	name : "Komodo Dragon (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 11,
	hp : 19,
	hd : [3, 10],
	speed : "30 ft, climb 30 ft, swim 30 ft",
	scores : [15, 12, 13, 3, 10, 6],
	skills : {
		"perception" : 2
	},
	damage_resistances : "poison",
	senses : "",
	passivePerception : 12,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "+1d6 poison damage"
	}, 	{
		name : "Tail",
		ability : 1,
		damage : [1, 8, "bludgeoning"],
		range : "Melee (10 ft)",
		description : "and a target equal to the Komodo's size (or smaller) falls Prone"
	}],
	traits : [{
		name : "Cold-Blooded",
		description : "If the Komodo takes cold damage, it can't take reactions and its speed is halved on its next turn."
	}, {
		name : "Strong Jaws",
		description : "If the Komodo hits a target equal to its size (or smaller) with Bite, it can Grapple it in its jaws (escape DC 12), but the Komodo cannot Bite on other targets."
	}]
};
CreatureList["giant porcupine (ll)"] = {
	name : "Giant Porcupine (LL)",
	nameAlt : ["Porcupine, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 14,
	hp : 19,
	hd : [3, 8],
	speed : "30 ft, climb 10 ft",
	scores : [16, 11, 14, 3, 12, 6],
	skills : {
		"perception" : 3,
		"survival" : 3
	},
	senses : "Darkvision 60 ft",
	passivePerception : 13,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Quill",
		ability : 1,
		damage : [2, 4, "piercing"],
		range : "Melee (5 ft)",
		description : "and until the Quill is removed, the creature's speed is reduced by 5 ft"
	}],
	traits : [{
		name : "Defensive Quills",
		description : "If a creature hits the Porcupine with a melee attack, it must make a Dexterity saving throw (DC 13) or it takes the damage of a single Quill attack."
	}, {
		name : "Pincushion",
		description : "As an action, a creature can make a Wisdom (Medicine) check to remove any number of Quills from a creature it can touch, or itself. (DC is 5 + 5 per Quill). On a success, the Quills are removed. On a failure, the Quills are still removed from the target, but the creature takes 1d4 piercing damage per Quill removed."
	}]
};
CreatureList["reef shark (ll)"] = {
	name : "Reef Shark (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 12,
	hp : 22,
	hd : [4, 8],
	speed : "0 ft, swim 40 ft",
	scores : [14, 13, 13, 1, 10, 4],
	senses : "Blindsight 30 ft",
	passivePerception : 10,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Aquatic",
		description : "The Reef Shark can only breathe underwater."
	}, {
		name : "Blood Sense",
		description : "The Reef Shark knows the direction of any creature with less than its maximum hit points within 1 mile, so long as they are in the same body of water."
	}],
	actions : [{
		name : "Opportunist (reaction)",
		description : "If the Shark senses a target take damage, it moves up to half its speed and uses its Bite against it."
	}]
};
CreatureList["giant soldier ant (ll)"] = {
	name : "Giant Soldier Ant (LL)",
	nameAlt : ["Soldier Ant, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 14,
	hp : 19,
	hd : [3, 8],
	speed : "30 ft, climb 30 ft",
	scores : [15, 12, 15, 1, 4, 1],
	senses : "Blindsight 30 ft",
	passivePerception : 7,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 10, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Hive Mind",
		description : "For each additional Soldier Ant or Ant Queen within 30 ft, the Soldier Ant gains a +1 bonus to attack rolls, ability checks, and saving throws (maximum +10)."
	}, {
		name : "Strong Jaws",
		description : "When the Ant hits a target equal to its size (or smaller) with Bite, it can Grapple it in its jaws (escape DC 12), but the Ant cannot use its Bite on other targets."
	}, {
		name : "Worker",
		description : "The Ant counts as two sizes larger for calculating its carrying capacity, and the weight that it can push, pull, and lift. Also, its speed is not halved while Grappling."
	}]
};
CreatureList["swarm of rodents (ll)"] = {
	name : "Swarm of Rodents (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 10,
	hp : 16,
	hd : [3, 8],
	speed : "25 ft, climb 25 ft, swim 25 ft",
	scores : [6, 15, 12, 2, 10, 4],
	damage_resistances : "bludgeoning, piercing, and slashing",
	condition_immunities : "charmed, frightened, grappled, paralyzed",
	senses : "Darkvision 60 ft",
	passivePerception : 10,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Swarm of Diminutive Beasts",
		description : "This swarm is made of Diminutive Beasts."
	}, {
		name : "Keen Smell",
		description : "The Swarm has advantage on ability checks that rely on its sense of smell."
	}, {
		name : "Swarm",
		description : "The Swarm can occupy the same space as other creatures, and vice versa. It can also pass through spaces large enough for a Diminutive Rodent without squeezing."
	}],
	actions : [{
		name : "Flurry of Bites",
		description : "Creatures of the Swarm's choice within its space must make a Dexterity saving throw (DC 12). They take piercing damage equal to the Swarm's remaining hit points on a failure, and half that damage on a success."
	}, {
		name : "Scamper (bonus action)",
		description : "The Swarm takes a Disengage or Hide action."
	}]
};
CreatureList["swarm of spiders (ll)"] = {
	name : "Swarm of Spiders (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 12,
	hp : 13,
	hd : [3, 8],
	speed : "25 ft, climb 25 ft",
	scores : [3, 15, 10, 1, 10, 2],
	damage_resistances : "bludgeoning, piercing, and slashing",
	condition_immunities : "charmed, frightened, grappled, paralyzed",
	senses : "Darkvision 30 ft",
	passivePerception : 10,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Swarm of Diminutive Beasts",
		description : "This swarm is made of Diminutive Beasts."
	}, {
		name : "Arachnid",
		description : "The Swarm can climb sheer surfaces, upside down, and along webs without making an ability check. It also ignores movement restrictions caused by webs and it can sense other creatures touching the same web as it."
	}, {
		name : "Swarm",
		description : "The Swarm can occupy the same space as other creatures, and vice versa. It can also pass through spaces large enough for a Diminutive Spider without squeezing."
	}],
	actions : [{
		name : "Flurry of Bites",
		description : "Creatures of the Swarm's choice within its space must make a Dexterity saving throw (DC 12). They take poison damage equal to the Swarm's remaining hit points on a failure, and half that damage on a success."
	}, {
		name : "Web Wrap",
		description : "One Medium or smaller creature within the Swarm's space is wrapped in webs and Restrained. As an action, this creature can make a Strength check (DC12), escaping on a success. The webbing is also destroyed by any amount of fire damage dealt to it."
	}]
};
CreatureList["giant tortoise (ll)"] = {
	name : "Giant Tortoise (LL)",
	nameAlt : ["Tortoise, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 17,
	hp : 25,
	hd : [3, 10],
	speed : "20 ft",
	scores : [15, 4, 16, 6, 12, 5],
	senses : "",
	passivePerception : 11,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 10, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Thick Hide",
		description : "The Tortoise reduces all damage, other than force, psychic, and radiant by its Con. modifier (3)."
	}],
	actions : [{
		name : "Withdraw",
		description : "The Tortoise recedes into its shell gaining a +2 bonus to Armor Class and resistance to all damage except for force, psychic, and radiant damage. However, its speed is reduced to 0 and it can't use its Bite attack. As an action, it can emerge and return to normal."
	}]
};
CreatureList["walrus (ll)"] = {
	name : "Walrus (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 10,
	hp : 22,
	hd : [3, 10],
	speed : "20 ft, swim 40 ft",
	scores : [16, 9, 14, 3, 11, 4],
	skills : {
		"intimidation" : 4
	},
	damage_resistances : "cold",
	senses : "",
	passivePerception : 10,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Tusk",
		ability : 1,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "and if it is smaller than the Walrus, its speed is halved on its next turn",
		modifiers : [-1, ""]
	}],
	traits : [{
		name : "Hold Breath",
		description : "The Walrus can hold its breath for 1 hour."
	}, {
		name : "Imposing Presence",
		description : "The Walrus uses Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Thick Hide",
		description : "The Walrus reduces all damage, other than force, psychic, and radiant by its Con. modifier (2)."
	}]
};
CreatureList["giant wasp (ll)"] = {
	name : "Giant Wasp (LL)",
	nameAlt : ["Wasp, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 12,
	hp : 13,
	hd : [3, 8],
	speed : "10 ft, fly 50 ft",
	scores : [10, 14, 10, 1, 10, 3],
	skills : {
		"acrobatics" : 4
	},
	senses : "",
	passivePerception : 10,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Sting",
		ability : 2,
		damage : [1, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Agile Flight",
		description : "The Wasp has advantage on Dexterity ability checks and saving throws while using its flying speed."
	}, {
		name : "Hive Mind",
		description : "For each additional Wasp or Wasp Queen within 30 ft, the Wasp gains a +1 bonus to attack rolls, ability checks, and saving throws (maximum +10)."
	}, {
		name : "Venom (Recharge 5-6)",
		description : "When the Wasp hits with its Bite, it can force the target to make a Constitution saving throw (DC 10). On a failure, it takes 3d6 poison damage and is Poisoned. On a success, it only takes half damage. A Poisoned creature repeats this saving throw at the end of each of its turns, ending the effect on a success. On a failure, it takes 1d6 poison damage. If this reduces it to 0 hit points, it is stable, but Paralyzed, while at 0 hit points."
	}]
};
CreatureList["aurochs (ll)"] = {
	name : "Aurochs (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 11,
	hp : 38,
	hd : [4, 10],
	speed : "50 ft",
	scores : [19, 10, 19, 2, 9, 5],
	saves : [6, "", 6, "", "", ""],
	senses : "",
	passivePerception : 9,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Gore",
		ability : 1,
		damage : [1, 10, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Stomp",
		ability : 1,
		damage : [2, 4, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Beast of Burden",
		description : "The Aurochs counts as one size larger for the purposes of determining its carrying capacity and the amount of weight it can carry, push, pull, and drag."
	}, {
		name : "Trampling Charge",
		description : "If the Aurochs moves at least 20 ft in a line and hits a creature equal to its size (or smaller) with its Gore, the target is knocked Prone, then the Aurochs can make one Stomp attack against it as a bonus action."
	}]
};
CreatureList["giant badger (ll)"] = {
	name : "Giant Badger (LL)",
	nameAlt : ["Badger, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 10,
	hp : 32,
	hd : [5, 8],
	speed : "30 ft, burrow 10 ft",
	scores : [16, 12, 15, 3, 13, 5],
	damage_resistances : "poison",
	condition_immunities : "frightened, poisoned",
	senses : "Darkvision 90 ft",
	passivePerception : 11,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Smell",
		description : "The Badger has advantage on ability checks that rely on its sense of smell."
	}, {
		name : "Strong Jaws",
		description : "If the Badger hits a creature equal to its size (or smaller) with Bite, it can Grapple it in its jaws (escape DC 12), but then the Badger cannot Bite other targets."
	}, {
		name : "Thick Hide",
		description : "The Badger reduces all damage, other than force, psychic, and radiant by its Con. modifier (2)."
	}],
	actions : [{
		name : "Aggressive (bonus action)",
		description : "The Badger takes the Dash action, but must end its movement closer to a Hostile creature."
	}]
};
CreatureList["giant bat (ll)"] = {
	name : "Giant Bat (LL)",
	nameAlt : ["Bat, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 13,
	hp : 33,
	hd : [6, 10],
	speed : "10 ft, fly 60 ft",
	scores : [15, 16, 11, 2, 12, 6],
	saves : ["", 5, "", "", "", ""],
	senses : "Blindsight 90 ft",
	passivePerception : 11,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 1,
		damage : [2, 6, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Echolocation",
		description : "When the Bat makes a Perception check with its hearing it treats a d20 roll of 9 or lower as a 10. It loses this benefit and its Blindsight if it is Deafened."
	}, {
		name : "Hunter's Grasp",
		description : "If the Bat hits a target at least one size smaller than it with its Claw attack, it can automatically Grapple the target in its Claws (escape DC 13)."
	}, {
		name : "Nocturnal Hunter",
		description : "When in dim light or darkness, the Bat has advantage on Stealth checks and it does not provoke opportunity attacks when flying out of an enemy's reach."
	}]
};
CreatureList["crocodile (ll)"] = {
	name : "Crocodile (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 12,
	hp : 32,
	hd : [5, 10],
	speed : "30 ft, swim 40 ft",
	scores : [16, 10, 13, 2, 10, 5],
	saves : ["", "", 3, "", "", ""],
	skills : {
		"stealth" : 2
	},
	senses : "",
	passivePerception : 10,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "",
		modifiers : ["", 1]
	}, 	{
		name : "Tail",
		ability : 1,
		damage : [1, 8, "bludgeoning"],
		range : "Melee (10 ft)",
		description : ""
	}],
	traits : [{
		name : "Crushing Strength",
		description : "If the Crocodile damages a creature while it is holding its breath underwater, it knocks the air from its lungs, and the creature begins Suffocating."
	}, {
		name : "Hold Breath",
		description : "The Crocodile can hold its breath 1 hour."
	}, {
		name : "Natural Camouflage",
		description : "The Crocodile has advantage on Stealth checks in swampland, marshes, or underwater."
	}, {
		name : "Strong Jaws",
		description : "If the Crocodile hits a target equal to its size (or smaller) with Bite, it can Grapple it in its jaws (escape DC 12), but the Crocodile cannot Bite other targets."
	}],
	actions : [{
		name : "Death Roll",
		description : "The Crocodile forces one creature Grappled by it to make a Strength saving throw (DC 12). It takes (2d10) slashing damage on failure, and half on success."
	}]
};
CreatureList["dire wolf (ll)"] = {
	name : "Dire Wolf (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 14,
	hp : 37,
	hd : [5, 10],
	speed : "50 ft",
	scores : [17, 15, 15, 3, 12, 7],
	skills : {
		"perception" : 3,
		"stealth" : 2,
		"survival" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Keen Hearing & Smell",
		description : "The Dire Wolf has advantage on all ability checks that rely on its sense of hearing or smell."
	}, {
		name : "Pack Tactics",
		description : "The Dire Wolf has advantage on its attack rolls if a conscious allied creature is within 5 ft of its target."
	}]
};
CreatureList["eagle (ll)"] = {
	name : "Eagle (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 14,
	hp : 27,
	hd : [5, 8],
	speed : "10 ft, fly 60 ft",
	scores : [8, 18, 12, 2, 14, 7],
	saves : ["", 6, "", "", "", ""],
	skills : {
		"acrobatics" : 6,
		"perception" : 6
	},
	senses : "",
	passivePerception : 16,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 2,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "and the creature must succeed on a Dexterity saving throw (DC 14) or it becomes Blinded until the end of its next turn"
	}, 	{
		name : "Talons",
		ability : 2,
		damage : [2, 4, "slashing"],
		range : "Melee (5 ft)",
		description : "and the target has disadvantage on attack rolls against all targets other than the Eagle until the start of the Eagle's next turn"
	}, 	{
		name : "Bite",
		ability : 2,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "",
		modifiers : [-1, -1]
	}, 	{
		name : "Claw",
		ability : 2,
		damage : [1, 10, "slashing"],
		range : "Melee (5 ft)",
		description : "and if it is equal to the Dire Wolf's size (or smaller) the target is knocked Prone",
		modifiers : [-1, -1]
	}],
	traits : [{
		name : "Airborne Evasion",
		description : "When the Eagle is forced to make a Dexterity saving throw to avoid damage while flying, it takes no damage on a success, and half on a failure."
	}, {
		name : "Hunter's Grasp",
		description : "If the Eagle hits a target at least one size smaller than it with its Talons, it can Grapple it (escape DC 9), then it cannot use its Talons on other targets."
	}, {
		name : "Hunter's Senses",
		description : "The Eagle adds double its Proficiency Bonus to its Perception checks (included above)."
	}, {
		name : "Swift Wing",
		description : "Opportunity attacks against the Eagle have disadvantage while it is using its flying speed."
	}],
	actions : [{
		name : "Strong Jaws",
		description : "If the Dire Wolf hits a target equal to its size (or smaller) with its Bite, it can Grapple it in its jaws (escape DC 11), but the Wolf can't use its Bite on other targets."
	}, {
		name : "Call of the Hunt (bonus action)",
		description : "When the Dire Wolf scores a critical hit or reduces a Hostile creature to 0 hit points, it can let forth a howl audible out to 300 ft Creatures of its choice that hear the howl have advantage on their next attack roll."
	}]
};
CreatureList["gorilla (ll)"] = {
	name : "Gorilla (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 12,
	hp : 36,
	hd : [5, 10],
	speed : "40 ft, climb 40 ft",
	scores : [19, 13, 15, 6, 12, 7],
	saves : [6, "", "", "", "", ""],
	skills : {
		"athletics" : 6,
		"intimidation" : 6
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [	{
		name : "Fist",
		ability : 1,
		damage : [1, 6, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Hurl",
		ability : 1,
		damage : [1, 8, "bludgeoning"],
		range : "30/60 ft",
		description : ""
	}],
	traits : [{
		name : "Concussive Blow",
		description : "If the Gorilla hits a creature equal to its size (or smaller) with two Fist attacks on the same turn, it can force it to make a Constitution saving throw (DC 14) or be Stunned until the start of the Gorilla's next turn."
	}, {
		name : "Imposing Presence",
		description : "The Gorilla uses Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Keen Smell",
		description : "The Gorilla has advantage on ability checks that rely on its sense of smell."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Gorilla makes two attacks, using its Fist, Hurl, or making a Grapple or Shove in any combination."
	}, {
		name : "Intimidating Show",
		description : "The Gorilla forces Hostile creatures that can see or hear it within 30 ft to make a Wisdom saving throw (DC 14). On a failure, they are Frightened of the Gorilla for 1 minute. They repeat the saving throw at the end of their turn, ending the effect on a success. Creatures that succeed on this saving throw are immune to the Gorilla's Intimidating Show for the next 24 hours."
	}]
};
CreatureList["giraffe (ll)"] = {
	name : "Giraffe (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 10,
	hp : 34,
	hd : [4, 12],
	speed : "50 ft",
	scores : [15, 10, 14, 2, 12, 7],
	skills : {
		"perception" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Hooves",
		ability : 1,
		damage : [2, 6, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Neck",
		ability : 1,
		damage : [1, 8, "bludgeoning"],
		range : "Melee (10 ft)",
		description : ""
	}],
	traits : [{
		name : "Lofty Sight",
		description : "The Giraffe has advantage on ability checks that rely on its sense of sight while it is standing upright."
	}, {
		name : "Spindly Frame",
		description : "The Giraffe counts as a Large creature for the purposes of its carrying capacity, Trampling Charge, and all other features except for the space it occupies."
	}, {
		name : "Trampling Charge",
		description : "If the Giraffe moves at least 20 ft in a line and hits a creature equal to its size (or smaller) with its Neck, the target falls Prone, the Giraffe can make one Hooves attack against it as a bonus action."
	}],
	actions : [{
		name : "Kick (reaction)",
		description : "When a creature that the Giraffe can see enters its reach, the Giraffe can make one Hooves attack against it."
	}]
};
CreatureList["lion (ll)"] = {
	name : "Lion (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 12,
	hp : 38,
	hd : [6, 10],
	speed : "50 ft",
	scores : [17, 15, 13, 3, 12, 8],
	saves : [5, "", "", "", "", ""],
	skills : {
		"intimidation" : 5,
		"perception" : 3
	},
	senses : "Darkvision 60 ft",
	passivePerception : 13,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 10, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 1,
		damage : [1, 8, "slashing"],
		range : "Melee (10 ft)",
		description : ""
	}],
	traits : [{
		name : "Imposing Presence",
		description : "The Lion uses Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Keen Smell",
		description : "The Lion has advantage on ability checks that rely on its sense of smell."
	}, {
		name : "Pack Tactics",
		description : "The Lion has advantage on its attack rolls if a conscious allied creature is within 5 ft of its target."
	}, {
		name : "Pounce",
		description : "If the Lion moves at least 20 ft in a line and hits a target equal to its size (or smaller) with its Claw attack, the target is knocked Prone, then the Lion can make one Bite attack against it as a bonus action."
	}],
	actions : [{
		name : "Roar",
		description : "The Lion forces all Hostile creatures that can hear it within 30 ft to make a Wisdom saving throw (DC 13), or be Frightened of the Lion until the start of its next turn."
	}]
};
CreatureList["king cobra (ll)"] = {
	name : "King Cobra (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 14,
	hp : 27,
	hd : [5, 8],
	speed : "30 ft, swim 30 ft",
	scores : [10, 18, 13, 2, 10, 5],
	skills : {
		"perception" : 2,
		"stealth" : 6
	},
	senses : "",
	passivePerception : 12,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Strike",
		ability : 2,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Cold-Blooded",
		description : "If the Cobra takes cold damage, it cannot take reactions and its speed is halved on its next turn."
	}, {
		name : "Serpentine",
		description : "The King Cobra counts as one size smaller for the purposes of moving through passageways."
	}, {
		name : "Thermal Vision",
		description : "The King Cobra knows the exact location of any warm-blooded creatures within 30 ft of it."
	}, {
		name : "Venom (Recharge 5-6)",
		description : "When the Cobra hits a creature with a Strike, it can force it to make a Constitution saving throw (DC 11) or it takes an extra 2d8 poison damage and is Poisoned. A Poisoned creature repeats this saving throw at the end of each of its turns. On a success, this effect ends. On a failure, it takes an additional 2d8 poison damage."
	}],
	actions : [{
		name : "Hypnotic Gaze",
		description : "The Cobra rears up and forces a creature that can see it within 20 ft to make a Wisdom saving throw (DC 14). On a failure, it is Charmed and Stunned until the start of the King Cobra's next turn. This effect ends if the creature is attacked or forced to make an ability check or saving throw. Creatures that succeed on this saving throw are immune to the King Cobra's Hypnotic Gaze for the next 24 hours."
	}]
};
CreatureList["giant mantis (ll)"] = {
	name : "Giant Mantis (LL)",
	nameAlt : ["Mantis, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 13,
	hp : 32,
	hd : [5, 10],
	speed : "30 ft, climb 30 ft, fly 20 ft",
	scores : [12, 17, 12, 2, 11, 4],
	skills : {
		"perception" : 2,
		"stealth" : 5
	},
	senses : "",
	passivePerception : 12,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [2, 4, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Foreleg",
		ability : 2,
		damage : [1, 8, "slashing"],
		range : "Melee (10 ft)",
		description : ""
	}],
	traits : [{
		name : "Ambush Hunter",
		description : "The Mantis has advantage on all Stealth checks made to Hide in forest and natural environments. Creatures have disadvantage on ability checks made to detect the Mantis, so long as the Mantis is standing still."
	}, {
		name : "Ambush Strike",
		description : "When the Mantis hits a creature with its Foreleg attack while its target is unaware of the Mantis, the attack deals a bonus 1d8 damage on hit."
	}, {
		name : "Limited Flight",
		description : "If the Mantis ends its turn while flying it falls, but takes no falling damage. However, if the Mantis falls at least 10 ft, it can glide up to 2 ft horizontally for every 1 ft that it falls."
	}, {
		name : "Serrated Grasp",
		description : "When the Mantis hits a creature at least one size smaller than it with a Foreleg attack, it can pull the target to an unoccupied space with 5 ft, then use its bonus action to make a single Bite attack against it."
	}]
};
CreatureList["giant octopus (ll)"] = {
	name : "Giant Octopus (LL)",
	nameAlt : ["Octopus, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 12,
	hp : 39,
	hd : [6, 10],
	speed : "15 ft, Swim 30 ft",
	scores : [17, 14, 13, 7, 10, 4],
	saves : ["", "", "", 0, "", ""],
	skills : {
		"sleight of hand" : 4,
		"stealth" : 4
	},
	senses : "Darkvision 60 ft",
	passivePerception : 10,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Tentacle",
		ability : 1,
		damage : [2, 6, "bludgeoning"],
		range : "Melee (5 ft)",
		description : "and if the target is equal to the Octopus's size (or smaller) then it is automatically Grappled (escape DC 13), and the Octopus cannot attack other targets with that tentacle"
	}],
	traits : [{
		name : "Aquatic",
		description : "The Octopus can only breathe underwater."
	}, {
		name : "Hold Breath",
		description : "The Octopus can hold its breath for 1 hour."
	}, {
		name : "Oozing Form",
		description : "The Octopus can move through gaps as narrow as 3-inches wide without having to squeeze."
	}, {
		name : "Underwater Camouflage",
		description : "The Octopus has advantage on Stealth checks made to Hide while it is underwater."
	}],
	actions : [{
		name : "Ink Cloud (1/short or long rest) (reaction)",
		description : "When the Octopus is targeted by an attack it can see while underwater, it fills its space with ink, then moves up to its speed without provoking opportunity attacks. The ink heavily obscures its space for 1 minute, or until it is dispersed."
	}]
};
CreatureList["giant owl (ll)"] = {
	name : "Giant Owl (LL)",
	nameAlt : ["Owl, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 12,
	hp : 31,
	hd : [5, 10],
	speed : "10 ft, fly 60 ft",
	scores : [13, 15, 12, 2, 12, 7],
	saves : ["", "", "", "", 3, ""],
	skills : {
		"perception" : 5,
		"stealth" : 4
	},
	senses : "Darkvision 120 ft",
	passivePerception : 15,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Talons",
		ability : 2,
		damage : [2, 6, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Hunter's Grasp",
		description : "If the Owl hits a target at least one size smaller than it with its Talons, it can Grapple it (escape DC 11), then it cannot use its Talons on other targets."
	}, {
		name : "Hunter's Senses",
		description : "The Owl adds double its Proficiency Bonus to its Perception checks (included above)."
	}, {
		name : "Nocturnal Hunter",
		description : "In dim light and darkness, the Owl has advantage on all Stealth checks and it does not provoke opportunity attacks when it flies out of an enemy's reach."
	}]
};
CreatureList["giant spider (ll)"] = {
	name : "Giant Spider (LL)",
	nameAlt : ["Spider, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 14,
	hp : 32,
	hd : [5, 10],
	speed : "30 ft, climb 30 ft",
	scores : [14, 16, 12, 2, 11, 4],
	skills : {
		"stealth" : 4
	},
	senses : "Blindsight 20 ft, Darkvision 60 ft",
	passivePerception : 10,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Arachnid",
		description : "The Spider can climb on sheer surfaces, upside down, and along webs without making an ability check. It also ignores movement restrictions caused by webs and it can sense other creatures touching the same web as it."
	}, {
		name : "Venom (Recharge 5-6)",
		description : "If the Spider hits with its Bite, it can force the target to make a Constitution saving throw (DC 12). On a failure, it takes 2d8 poison damage and is Poisoned. On a success, it only takes half damage. A Poisoned creature repeats this saving throw at the end of each of its turns, ending the effect on a success. On a failure, it takes 1d8 poison damage. If this reduces it to 0 hit points, it is stable, but Paralyzed, while at 0 hit points."
	}, {
		name : "Wrap",
		description : "When the Spider targets a creature equal to its size (or smaller) with its Web Strand, it must make a Dexterity saving throw (DC 12) or be wrapped in webs that reduce its speed to 0. As an action it can make a Strength check, destroying the webs and escaping on a success."
	}],
	actions : [{
		name : "Web Strand",
		description : "The Spider shoots a thin strand of webbing at a target it can see within 30 ft, forming a continuous line of webbing from where it is standing to the target."
	}]
};
CreatureList["swarm of piranhas (ll)"] = {
	name : "Swarm of Piranhas (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 12,
	hp : 18,
	hd : [4, 8],
	speed : "0 ft, swim 40 ft",
	scores : [4, 16, 9, 1, 6, 2],
	damage_resistances : "bludgeoning, piercing, and slashing",
	condition_immunities : "charmed, frightened, grappled, paralyzed",
	senses : "Darkvision 60 ft",
	passivePerception : 8,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Swarm of Diminutive Beasts",
		description : "This swarm is made of Diminutive Beasts."
	}, {
		name : "Aquatic",
		description : "The Swarm can only breathe underwater."
	}, {
		name : "Blood Sense",
		description : "The Swarm knows the exact direction of any creature with less than its maximum hit points within 1 mile, so long as they are in the same body of water."
	}, {
		name : "Bottom Feeder",
		description : "The Swarm automatically succeeds on ability checks to smell dead creatures within 1 mile."
	}, {
		name : "Shimmering Camouflage",
		description : "The Swarm has advantage on Stealth checks to hide while it is underwater."
	}, {
		name : "Swarm",
		description : "The Swarm can occupy the same space as other creatures, and vice versa. It can pass through spaces large enough for a Diminutive Piranha without squeezing."
	}],
	actions : [{
		name : "Flurry of Bites",
		description : "Creatures of the Swarm's choice in its space must make a Dexterity saving throw (DC 13). They take piercing damage equal to the Swarm's remaining hit points on a failure, and half that damage on a success."
	}, {
		name : "Opportunist (reaction)",
		description : "If the Swarm sees a creature take damage it moves up to half its speed, and if it ends its movement in that creature's space, it can use its Flurry of Bites."
	}]
};
CreatureList["swarm of wasps (ll)"] = {
	name : "Swarm of Wasps (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 12,
	hp : 18,
	hd : [4, 8],
	speed : "10 ft, fly 30 ft",
	scores : [2, 16, 10, 1, 6, 2],
	damage_resistances : "bludgeoning, piercing, and slashing",
	condition_immunities : "charmed, frightened, grappled, paralyzed",
	senses : "Darkvision 30 ft",
	passivePerception : 8,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Swarm of Diminutive Beasts",
		description : "This swarm is made of Diminutive Beasts."
	}, {
		name : "Agile Flight",
		description : "The Swarm has advantage on all Dexterity ability checks and saving throws it makes while flying."
	}, {
		name : "Swarm",
		description : "The Swarm can occupy the same space as other creatures, and vice versa. It can pass through spaces large enough for a Diminutive Wasp without squeezing."
	}, {
		name : "Vital Stingers",
		description : "When the Swarm Poisons a creature with its Flurry of Stings, the Swarm loses 1d4 +1 hit points."
	}],
	actions : [{
		name : "Flurry of Stings",
		description : "Creatures of the Swarm's choice within its space must make a Dexterity saving throw (DC 13). On a failed save, they take piercing damage equal to the Swarm's remaining hit points and are Poisoned until the start of their next turn. On a successful save, they take half as much damage and are not Poisoned."
	}]
};
CreatureList["tiger (ll)"] = {
	name : "Tiger (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 13,
	hp : 37,
	hd : [5, 10],
	speed : "40 ft, climb 30 ft",
	scores : [17, 16, 14, 3, 12, 8],
	saves : ["", 5, "", "", "", ""],
	skills : {
		"perception" : 3,
		"stealth" : 7
	},
	senses : "Darkvision 60 ft",
	passivePerception : 13,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 10, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 1,
		damage : [1, 8, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Smell",
		description : "The Tiger has advantage on all ability checks that rely on its sense of smell."
	}, {
		name : "Pounce",
		description : "If the Tiger moves at least 20 ft in a line, then hits a target equal to its size (or smaller) with its Claw, the target falls Prone, then the Tiger can make one Bite attack against it as a bonus action."
	}, {
		name : "Stalker",
		description : "The Tiger adds double its Proficiency Bonus to Stealth checks (included above)."
	}, {
		name : "Strong Jaws",
		description : "When the Tiger hits a creature equal to its size (or smaller) with its Bite, it can Grapple the target in its jaws (escape DC 13). While it is Grappling a creature, the Tiger cannot use its Bite attack on other targets."
	}]
};
CreatureList["giant toad (ll)"] = {
	name : "Giant Toad (LL)",
	nameAlt : ["Toad, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 11,
	hp : 39,
	hd : [6, 10],
	speed : "20 ft, swim 40 ft",
	scores : [15, 13, 13, 2, 10, 3],
	saves : ["", "", 3, "", "", ""],
	senses : "Darkvision 30 ft",
	passivePerception : 10,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Toxic Bite",
		ability : 1,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "+1d8 poison damage"
	}],
	traits : [{
		name : "Mighty Leap",
		description : "Once per turn, the Toad can expend 5 ft of movement to long jump up to 20 ft, or high jump up to 10 ft, even if this exceeds its remaining speed."
	}, {
		name : "Strong Jaws",
		description : "When the Toda hits a creature equal to its size (or smaller) with its Toxic Bite, it can Grapple the target in its mouth (escape DC 13). While it is Grappling a creature, the Today cannot use its Toxic Bite attack on other targets."
	}, {
		name : "Amphibious",
		description : "The Toad can breathe both air and water."
	}, {
		name : "Swallow",
		description : "When the Toad uses its Toxic Bite on a creature Grappled in its mouth, it Swallows it. A Swallowed creature is Blinded and Restrained, and it has total cover from all attacks and effects from outside of the Toad. At the start of the Toad's turns, any Swallowed creatures take (2d4) acid damage, then the Toad must make a Constitution saving throw (DC is the total damage taken since its previous turn). On a failure, the Swallowed creature lands Prone in an unoccupied space within 5 ft of the Toad."
	}],
	actions : [{
		name : "Sticky Tongue",
		description : "The Toad forces a target it can see within 15 ft that is at least one size smaller than it to make a Strength saving throw (DC 12). On a failure, the target is pulled to an unoccupied space within 5 ft of the Toad, then the Toad can use its Toxic Bite attack against it as a bonus action."
	}]
};
CreatureList["giant vulture (ll)"] = {
	name : "Giant Vulture (LL)",
	nameAlt : ["Vulture, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 10,
	hp : 29,
	hd : [5, 10],
	speed : "10 ft, fly 60 ft",
	scores : [15, 10, 15, 6, 12, 7],
	skills : {
		"perception" : 2
	},
	senses : "",
	passivePerception : 12,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 1,
		damage : [2, 4, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Talons",
		ability : 1,
		damage : [2, 6, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Carrion Sense",
		description : "The Vulture has advantage on all ability checks to smell creatures within 120 ft that are below their hit point maximum. It automatically succeeds on ability checks to smell dead creatures within 1 mile."
	}, {
		name : "Hunter's Grasp",
		description : "When the Vulture hits a target at least one size smaller than it with its Talons, it can Grapple it (escape DC 12), but it can't use Talons on other targets."
	}, {
		name : "Keen Sight & Smell",
		description : "The Vulture has advantage on all ability checks that rely on its sense of sight or smell."
	}, {
		name : "Pack Tactics",
		description : "The Vulture has advantage on its attack rolls if a conscious allied creature is within 5 ft of its target."
	}],
	actions : [{
		name : "Opportunist (reaction)",
		description : "If the Vulture sees a creature take damage, it moves up to half its speed and uses its Beak against it."
	}]
};
CreatureList["giant wild dog (ll)"] = {
	name : "Giant Wild Dog (LL)",
	nameAlt : ["Wild Dog, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 12,
	hp : 45,
	hd : [6, 10],
	speed : "50 ft",
	scores : [16, 14, 14, 2, 12, 7],
	skills : {
		"perception" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, "", "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Hearing & Smell",
		description : "The Wild Dog has advantage on ability checks that rely on its senses of hearing or smell."
	}, {
		name : "Pack Tactics",
		description : "The Wild Dog has advantage on attack rolls if a conscious allied creature is within 5 ft of its target."
	}],
	actions : [{
		name : "Rampage (bonus action)",
		description : "If the Wild Dog kills a creature, it can move up to half its speed and make a Bite attack with advantage."
	}, {
		name : "Opportunist (reaction)",
		description : "If the Wild Dog sees a target take damage, it moves up to half its speed and uses its Bite against it."
	}]
};
CreatureList["anaconda (ll)"] = {
	name : "Anaconda (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 12,
	hp : 60,
	hd : [8, 12],
	speed : "30 ft, climb 20 ft, swim 30 ft",
	scores : [20, 14, 12, 1, 10, 3],
	saves : [7, "", "", "", "", ""],
	skills : {
		"athletics" : 8
	},
	senses : "",
	passivePerception : 10,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Strike",
		ability : 1,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Constrict",
		ability : 1,
		damage : [2, 8, "bludgeoning"],
		range : "Melee (5 ft)",
		description : "and if the creature is equal to the Anaconda's size (or smaller) it is Grappled (escape DC 15) and Restrained. The Anaconda can only Grapple one creature at a time in this way"
	}],
	traits : [{
		name : "Cold-Blooded",
		description : "When the Anaconda takes cold damage, it can't take reactions and its speed is halved its next turn."
	}, {
		name : "Serpentine",
		description : "The Anaconda counts as two sizes smaller for the purposes of moving through passageways."
	}, {
		name : "Thermal Vision",
		description : "The Anaconda knows the exact location of any warm-blooded creatures within 30 ft of it."
	}],
	actions : [{
		name : "Crush",
		description : "The Anaconda forces one creature it is Grappling to make a Strength saving throw (DC 15). On a failure, it suffers one level of Exhaustion."
	}]
};
CreatureList["giant boar (ll)"] = {
	name : "Giant Boar (LL)",
	nameAlt : ["Boar, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 12,
	hp : 42,
	hd : [5, 10],
	speed : "40 ft",
	scores : [18, 10, 16, 2, 9, 5],
	saves : [6, "", "", "", "", ""],
	senses : "",
	passivePerception : 9,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Stomp",
		ability : 1,
		damage : [2, 4, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Tusk",
		ability : 1,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Thick Hide",
		description : "The Boar reduces all damage, other than force, psychic, and radiant by its Con. modifier (3)."
	}, {
		name : "Trampling Charge",
		description : "When the Boar moves at least 20 ft in a line and hits a creature equal to its size (or smaller) with a Tusk attack, the target is knocked Prone. The Boar can then make a Stomp attack against it as a bonus action."
	}, {
		name : "Relentless (Recharge 5-6)",
		description : "When the Boar is reduced to 0 points, but not killed outright, it falls to 3 hit points."
	}]
};
CreatureList["dire beaver (ll)"] = {
	name : "Dire Beaver (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 12,
	hp : 52,
	hd : [7, 10],
	speed : "30 ft, burrow 10 ft, swim 40 ft",
	scores : [18, 7, 15, 2, 14, 5],
	saves : ["", "", 4, "", "", ""],
	skills : {
		"survival" : 4
	},
	senses : "",
	passivePerception : 12,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "and if it is smaller than the Beaver, its speed is halved on its next turn"
	}],
	traits : [{
		name : "Hold Breath",
		description : "The Beaver can hold its breath for 1 hour."
	}, {
		name : "Keen Senses",
		description : "The Beaver has advantage on ability checks that rely on its sense of hearing or smell."
	}, {
		name : "Logger",
		description : "When the Beaver hits with its Bite attack against a tree, an object or structure made from wood, or a Plant, it deals the maximum possible damage instead of rolling."
	}, {
		name : "Mighty Laborer",
		description : "The Beaver counts as one size larger for the purpose of determining its carrying capacity and the total weight that it can push, pull, drag, and lift."
	}]
};
CreatureList["giant emu (ll)"] = {
	name : "Giant Emu (LL)",
	nameAlt : ["Emu, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 12,
	hp : 42,
	hd : [5, 12],
	speed : "60 ft",
	scores : [19, 14, 15, 3, 12, 6],
	skills : {
		"intimidation" : 6,
		"perception" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 1,
		damage : [1, 10, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Kick",
		ability : 1,
		damage : [2, 6, "slashing"],
		range : "Melee (5 ft)",
		description : "and any creature equal to the Emu's size (or smaller) is knocked Prone"
	}],
	traits : [{
		name : "Imposing Presence",
		description : "The Emu uses Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Pack Tactics",
		description : "The Emu has advantage on its attack rolls if a conscious allied creature is within 5 ft of its target."
	}],
	actions : [{
		name : "Aggressive (bonus action)",
		description : "The Emu takes the Dash action, but must end its movement closer to a hostile creature."
	}, {
		name : "Vicious (bonus action)",
		description : "If the Emu knocks a creature Prone with its Kick attack, it can make one Beak attack against that target."
	}]
};
CreatureList["grizzly bear (ll)"] = {
	name : "Grizzly Bear (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 12,
	hp : 51,
	hd : [6, 10],
	speed : "40 ft, climb 30 ft",
	scores : [19, 10, 16, 2, 13, 7],
	saves : ["", "", 5, "", "", ""],
	skills : {
		"intimidation" : 6,
		"perception" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 1,
		damage : [1, 10, "slashing"],
		range : "Melee (5 ft)",
		description : "and any creature equal to the Bear's size (or smaller) is knocked Prone"
	}],
	traits : [{
		name : "Imposing Presence",
		description : "The Bear uses its Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Keen Smell",
		description : "The Bear has advantage on all ability checks that rely on its sense of smell."
	}, {
		name : "Strong Jaws",
		description : "If the Bear hits a creature equal to its size (or smaller) with its Bite, it can Grapple it in its jaws (escape DC 14), but the Bear cannot use its Bite on other targets."
	}, {
		name : "Thick Hide",
		description : "The Bear reduces damage, other than force, psychic, and radiant by its Constitution modifier (3)."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Bear makes two attacks, using its Bite and its Claw attacks in any combination."
	}, {
		name : "Roar of Dominance (bonus action)",
		description : "After the Bear hits a creature with a Bite or Claw attack, it can roar, and the creature hit by that attack must make a Wisdom saving throw (DC 14), or it becomes Frightened of the Bear until the start of the Bear's next turn. Creatures that succeed on this saving throw are immune to the Bear's Roar of Dominance for the next 24 hours."
	}]
};
CreatureList["giant hawk (ll)"] = {
	name : "Giant Hawk (LL)",
	nameAlt : ["Hawk, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 14,
	hp : 45,
	hd : [7, 10],
	speed : "20 ft, fly 60 ft",
	scores : [16, 18, 13, 2, 14, 7],
	saves : ["", 6, "", "", "", ""],
	skills : {
		"acrobatics" : 6,
		"perception" : 6
	},
	senses : "",
	passivePerception : 16,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 2,
		damage : [2, 4, "piercing"],
		range : "Melee (5 ft)",
		description : "and the creature must succeed on a Dexterity saving throw (DC 14) or it is Blinded until the start of the Hawk's next turn"
	}, 	{
		name : "Talons",
		ability : 2,
		damage : [2, 6, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Airborne Evasion",
		description : "When the Hawk is forced to make a Dexterity saving throw to avoid damage while flying, it takes no damage on a success, and half on a failure."
	}, {
		name : "Hunter's Grasp",
		description : "If the Hawk hits a target at least one size smaller than it with its Talons, it can Grapple it (escape DC 13), then it cannot use its Talons on other targets."
	}, {
		name : "Hunter's Senses",
		description : "The Hawk adds double its Proficiency Bonus to its Perception checks (included above)."
	}, {
		name : "Pack Tactics",
		description : "The Hawk has advantage on its attack rolls if a conscious allied creature is within 5 ft of its target."
	}]
};
CreatureList["hunter shark (ll)"] = {
	name : "Hunter Shark (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 12,
	hp : 45,
	hd : [6, 10],
	speed : "0 ft, swim 40 ft",
	scores : [18, 13, 15, 1, 10, 4],
	skills : {
		"perception" : 2
	},
	senses : "Blindsight 30 ft",
	passivePerception : 12,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Aquatic",
		description : "The Hunter Shark can only breathe underwater."
	}, {
		name : "Blood Sense",
		description : "The Hunter Shark knows the direction of any creature with less than its maximum hit points within 1 mile, so long as they are in the same body of water."
	}, {
		name : "Frenzy",
		description : "The Shark has advantage on Bite attacks against creatures with less than their maximum hit points."
	}],
	actions : [{
		name : "Aggressive (bonus action)",
		description : "The Shark takes the Dash action, but it must end its movement closer to a Hostile creature."
	}]
};
CreatureList["polar bear (ll)"] = {
	name : "Polar Bear (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 12,
	hp : 51,
	hd : [6, 10],
	speed : "40 ft, climb 30 ft, swim 30 ft",
	scores : [19, 10, 16, 2, 13, 7],
	saves : ["", "", 5, "", "", ""],
	skills : {
		"intimidation" : 6,
		"perception" : 3
	},
	damage_resistances : "cold",
	senses : "",
	passivePerception : 13,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Ice Walk",
		description : "The Polar Bear can move on and climb icy surfaces without making an ability check. Additionally, the Polar Bear can ignore difficult terrain imposed by ice or snow."
	}, {
		name : "Imposing Presence",
		description : "The Polar Bear uses its Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Keen Smell",
		description : "The Polar Bear has advantage on ability checks that rely on its sense of smell."
	}]
};
CreatureList["rodent of unusual size (ll)"] = {
	name : "Rodent of Unusual Size (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 14,
	hp : 51,
	hd : [6, 10],
	speed : "40 ft, climb 20 ft, swim 40 ft",
	scores : [19, 10, 16, 4, 12, 6],
	skills : {
		"athletics" : 6,
		"intimidation" : 6
	},
	damage_immunities : "poison",
	condition_immunities : "poisoned",
	senses : "Darkvision 60 ft",
	passivePerception : 11,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [	{
		name : "Fetid Bite",
		ability : 1,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "and the target is Poisoned until the start of the R.O.U.S.'s next turn"
	}, 	{
		name : "Bite",
		ability : 1,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 1,
		damage : [1, 10, "slashing"],
		range : "Melee (5 ft)",
		description : "and any creature equal to the Polar Bear's size (or smaller) is knocked Prone"
	}],
	traits : [{
		name : "Imposing Presence",
		description : "The R.O.U.S. uses Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Keen Smell",
		description : "The R.O.U.S. has advantage on all ability checks that rely on its sense of smell."
	}, {
		name : "Pack Tactics",
		description : "The R.O.U.S. has advantage on attack rolls if a conscious allied creature is within 5 ft of its target."
	}, {
		name : "Thick Hide",
		description : "The R.O.U.S. reduces damage, other than force, psychic, and radiant by its Con. modifier (3)."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Polar Bear makes two attacks, using its Bite and its Claw attacks in any combination."
	}, {
		name : "Scamper (bonus action)",
		description : "The R.O.U.S. takes a Disengage or Hide action."
	}, {
		name : "Strong Jaws (bonus action)",
		description : "If the Polar Bear hits a creature equal to its size (or smaller) with its Bite, it can Grapple it in its jaws (escape DC 14), but the Bear cannot use its Bite on other targets."
	}, {
		name : "Thick Hide (bonus action)",
		description : "The Polar Bear reduces damage, other than force, psychic, and radiant by its Constitution modifier (3)."
	}, {
		name : "Aggressive (bonus action)",
		description : "The Polar Bear takes the Dash action, but it must end its movement closer to a Hostile creature."
	}]
};
CreatureList["giant stag (ll)"] = {
	name : "Giant Stag (LL)",
	nameAlt : ["Stag, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 14,
	hp : 42,
	hd : [5, 12],
	speed : "60 ft",
	scores : [19, 16, 14, 4, 12, 6],
	skills : {
		"athletics" : 6,
		"intimidation" : 6,
		"perception" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Antler",
		ability : 1,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Hooves",
		ability : 1,
		damage : [2, 4, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Cervine Leap",
		description : "With a 10 ft running start, a Stag can long jump up to 40 ft and high jump up to 25 ft"
	}, {
		name : "Imposing Presence",
		description : "The Stag uses Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Trampling Charge",
		description : "When the Stag moves at least 20 ft in a line and hits a creature equal to its size (or smaller) with its Antler, the target falls Prone and the Stag can make one Hooves attack against it as a bonus action."
	}],
	actions : [{
		name : "Kick (reaction)",
		description : "When a creature the Stag can see enters its reach, the Stag can make one Hooves attack against it."
	}]
};
CreatureList["giant stag beetle (ll)"] = {
	name : "Giant Stag Beetle (LL)",
	nameAlt : ["Stag Beetle, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 15,
	hp : 60,
	hd : [8, 10],
	speed : "30 ft, climb 10 ft, fly 30 ft",
	scores : [19, 8, 15, 2, 7, 3],
	skills : {
		"intimidation" : 6
	},
	senses : "",
	passivePerception : 8,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Mandibles",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Imposing Presence",
		description : "The Beetle uses Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Limited Flight",
		description : "If the Beetle ends its turn while flying it falls, but takes no falling damage. If it falls at least 10 ft, it can glide up to 2 ft horizontally for every 1 ft that it falls."
	}, {
		name : "Strong Jaws",
		description : "If the Beetle hits a creature equal to its size (or smaller) with its Mandibles, it can Grapple the target (escape DC 14). While it is Grappling a creature, the Beetle can't use its Mandibles attack on other targets."
	}],
	actions : [{
		name : "Reflective Carapace (reaction)",
		description : "When a creature the Beetle can see makes a melee attack against the Beetle, it can unfurl its wings and impose disadvantage on its attack roll."
	}]
};
CreatureList["swarm of vipers (ll)"] = {
	name : "Swarm of Vipers (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 14,
	hp : 22,
	hd : [4, 8],
	speed : "30 ft, swim 30 ft",
	scores : [6, 19, 12, 1, 10, 3],
	damage_resistances : "bludgeoning, piercing, and slashing",
	condition_immunities : "charmed, frightened, grappled, paralyzed",
	senses : "",
	passivePerception : 10,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Swarm of Tiny Beasts",
		description : "This swarm is made of Tiny Beasts."
	}, {
		name : "Cold-Blooded",
		description : "If the Swarm takes cold damage, it cannot take reactions and its speed is halved on its next turn."
	}]
};
CreatureList["swarm of fire ants (ll)"] = {
	name : "Swarm of Fire Ants (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 14,
	hp : 19,
	hd : [3, 10],
	speed : "25 ft, climb 25 ft, burrow 10 ft",
	scores : [4, 18, 11, 1, 7, 2],
	saves : ["", "", 1, "", "", ""],
	damage_resistances : "bludgeoning, piercing, and slashing",
	condition_immunities : "charmed, frightened, grappled, paralyzed",
	senses : "Blindsight 20 ft",
	passivePerception : 8,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Swarm of Diminutive Beasts",
		description : "This swarm is made of Diminutive Beasts."
	}, {
		name : "Spider Climb",
		description : "The Swarm can climb sheer surfaces and upside-down without needing to make an ability check."
	}, {
		name : "Swarm",
		description : "The Swarm can occupy the same space as other creatures, and vice versa. It can also pass through spaces large enough for a Diminutive Insect without squeezing."
	}],
	actions : [{
		name : "Flurry of Bites",
		description : "Creatures of the Swarm's choice within its space must make a Dexterity saving throw (DC 14). On a failure, they take piercing damage equal to the Swarm's remaining hit points and are Poisoned until the start of their next turn. On a success, they only take half damage."
	}, {
		name : "Flurry of Fangs",
		description : "Creatures of the Swarm's choice within its space must make a Dexterity saving throw (DC 14). On a failure, creatures take piercing damage equal to the Swarm's remaining hit points and are Poisoned. On a successful save, they take half as much damage and are not Poisoned. A Poisoned creature repeats this saving throw at the end of each of its turns. On a successful save, this effect ends, but on a failure, it takes an additional 2d4 poison damage."
	}, {
		name : "Aggressive (reaction)",
		description : "The Swarm takes the Dash action, but it must end its movement closer to a Hostile creature."
	}, {
		name : "Swarm (reaction)",
		description : "The Swarm can occupy the same space as another creature, and vice versa. It can also pass through any space large enough for a Tiny Viper without squeezing."
	}, {
		name : "Thermal Vision (reaction)",
		description : "The Swarm knows the exact location of any warm-blooded creatures within 30 feet of it."
	}]
};
CreatureList["giant alligator turtle (ll)"] = {
	name : "Giant Alligator Turtle (LL)",
	nameAlt : ["Alligator Turtle, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 17,
	hp : 59,
	hd : [8, 10],
	speed : "30 ft, swim 40 ft",
	scores : [19, 7, 14, 2, 12, 5],
	saves : [6, "", "", "", "", ""],
	skills : {
		"stealth" : 2
	},
	senses : "Darkvision 60 ft",
	passivePerception : 11,
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [2, 8, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Ambush Strike",
		description : "If the Turtle hits a creature unaware of it with its Bite attack, it deals a bonus 3d8 damage on hit."
	}, {
		name : "Hold Breath",
		description : "The Turtle can hold its breath for 3 hours."
	}, {
		name : "Swamp Camouflage",
		description : "While motionless in water or mud, the Turtle is indistinguishable from its surroundings."
	}, {
		name : "Strong Jaws",
		description : "If the Turtle hits a creature equal to its size (or smaller) with Bite, it can Grapple it in its jaws (escape DC 14), but the Turtle can't use its Bite on other targets."
	}]
};
CreatureList["giant ant queen (ll)"] = {
	name : "Giant Ant Queen (LL)",
	nameAlt : ["Ant Queen, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 14,
	hp : 52,
	hd : [8, 8],
	speed : "30 ft, climb 30 ft, fly 30 ft",
	scores : [15, 18, 15, 1, 12, 1],
	saves : ["", "", "", "", 3, ""],
	senses : "Blindsight 30 ft",
	passivePerception : 11,
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	actions : [{
		name : "Multiattack",
		description : "The Queen makes two attacks with its Bite. It can replace one or both attacks with the Orders below."
	}, {
		name : "Attack Order",
		description : "The Queen orders a Soldier Ant within 30 ft to use its Bite against a target of the Queen's choice."
	}, {
		name : "Maneuver Order",
		description : "The Queen orders a Soldier Ant within 30 ft to move up to its speed. This movement does not provoke opportunity attacks."
	}]
};
CreatureList["giant electric eel (ll)"] = {
	name : "Giant Electric Eel (LL)",
	nameAlt : ["Electric Eel, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 13,
	hp : 52,
	hd : [6, 10],
	speed : "0 ft, swim 40 ft",
	scores : [11, 17, 16, 2, 12, 5],
	saves : ["", 5, "", "", "", ""],
	damage_resistances : "lightning",
	senses : "",
	passivePerception : 11,
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Shocking Bite",
		ability : 2,
		damage : [1, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "+1d6 lightning damage; and it cannot take reactions until its next turn"
	}],
	traits : [{
		name : "Aquatic",
		description : "The Electric Eel can only breathe underwater."
	}, {
		name : "Electrosense",
		description : "The Electric Eel knows the exact location of any living creature within 90 ft of it while underwater."
	}, {
		name : "Slippery",
		description : "Opportunity attacks are made at disadvantage against the Electric Eel while it is underwater."
	}, {
		name : "Stunning Jolt (Recharge 5-6)",
		description : "When the Eel hits a target with Shocking Bite, it can force it to make a Constitution saving throw (DC 13). On a failure, the target takes 4d6 lightning damage and is Stunned until the start of its next turn. On a success, it takes half as much damage and its speed is halved on its next turn."
	}]
};
CreatureList["giant falcon (ll)"] = {
	name : "Giant Falcon (LL)",
	nameAlt : ["Falcon, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 15,
	hp : 44,
	hd : [8, 10],
	speed : "10 ft, fly 60 ft",
	scores : [16, 20, 11, 6, 15, 7],
	saves : ["", 7, "", "", "", ""],
	skills : {
		"acrobatics" : 7,
		"perception" : 6
	},
	senses : "",
	passivePerception : 16,
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 2,
		damage : [3, 4, "piercing"],
		range : "Melee (5 ft)",
		description : "and the creature must succeed on a Dexterity saving throw (DC 15) or it is Blinded until the start of the Falcon's next turn"
	}, 	{
		name : "Talons",
		ability : 2,
		damage : [2, 6, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Aerodynamic",
		description : "When the Falcon takes the Dash action its speed bonus is doubled, and opportunity attacks against it have disadvantage until the end of that turn."
	}, {
		name : "Dive",
		description : "When the Falcon flies 40 ft down in a line then hits with its Talons, it deals a bonus 3d6 damage. If the target is equal to the Falcon's size (or smaller) it falls Prone and is Stunned until the start of its next turn."
	}, {
		name : "Hunter's Grasp",
		description : "If the Falcon hits a target at least one size smaller than it with its Talons, it can Grapple it (escape DC 13), then it cannot use its Talons on other targets."
	}, {
		name : "Hunter's Senses",
		description : "The Falcon adds double its Proficiency Bonus to its Perception checks (included above)."
	}]
};
CreatureList["hippopotamus (ll)"] = {
	name : "Hippopotamus (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 10,
	hp : 67,
	hd : [8, 10],
	speed : "25 ft, swim 30 ft",
	scores : [18, 8, 16, 2, 12, 6],
	saves : [6, "", "", "", "", ""],
	skills : {
		"intimidation" : 6
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "and it must make on a Strength saving throw (DC 14), or its AC is reduced by 2 and its speed is halved until the end of its next turn"
	}],
	traits : [{
		name : "Hold Breath",
		description : "The Hippo can hold its breath for 30 mins."
	}, {
		name : "Imposing Presence",
		description : "The Hippopotamus uses Strength, in place of Charisma, for Intimidation checks (see above)."
	}, {
		name : "Strong Jaws",
		description : "If the Hippo hits a target equal to its size (or smaller) with its Bite, it can Grapple it in its jaws (escape DC 14), but the Hippo can't use its Bite on other targets."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Hippopotamus makes two Bite attacks."
	}]
};
CreatureList["killer whale (ll)"] = {
	name : "Killer Whale (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 12,
	hp : 67,
	hd : [8, 10],
	speed : "0 ft, swim 60 ft",
	scores : [20, 10, 16, 5, 12, 7],
	saves : ["", "", 5, "", "", ""],
	senses : "Blindsight 120 ft",
	passivePerception : 11,
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "and it must make on a Strength saving throw (DC 15), or its AC is reduced by 2 and its speed is halved until the end of its next turn"
	}],
	traits : [{
		name : "Echolocation",
		description : "If the Whale makes a Perception check with its hearing it treats a d20 roll of 9 or lower as a 10. It loses this benefit, and its Blindsight, while Deafened."
	}, {
		name : "Hold Breath",
		description : "The Whale can hold its breath for 1 hour."
	}, {
		name : "Strong Jaws",
		description : "If the Whale hits a target equal to its size (or smaller) with its Bite, it can Grapple it in its jaws (escape DC 15), but the Whale can't use its Bite on other targets. Creatures Grappled in the Whale's jaws take 2d8 slashing damage at the start of each of their turns."
	}]
};
CreatureList["giant mole (ll)"] = {
	name : "Giant Mole (LL)",
	nameAlt : ["Mole, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 10,
	hp : 57,
	hd : [6, 10],
	speed : "30 ft, burrow 20 ft",
	scores : [19, 9, 18, 4, 12, 6],
	senses : "Darkvision 30 ft, Tremorsense 60 ft",
	passivePerception : 11,
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [	{
		name : "Claw",
		ability : 1,
		damage : [2, 8, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Smell",
		description : "The Mole has advantage on ability checks that rely on its sense of smell."
	}, {
		name : "Tunneler",
		description : "When the Mole Burrows through loose earth while moving at half its speed, it leaves a tunnel behind."
	}, {
		name : "Weak Sight",
		description : "The Mole's normal sight only extends out to a 30-foot radius, beyond that it relies on its Tremorsense."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Mole makes two attacks with its Claw."
	}, {
		name : "Dust Cloud",
		description : "The Mole kicks up dust, causing the area in a 15-foot radius to be Heavily Obscured until the start of the Mole's next turn, unless dispersed by water or wind."
	}]
};
CreatureList["rhinoceros (ll)"] = {
	name : "Rhinoceros (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 11,
	hp : 60,
	hd : [8, 10],
	speed : "40 ft",
	scores : [21, 8, 15, 2, 12, 6],
	saves : [7, "", "", "", "", ""],
	skills : {
		"intimidation" : 7
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Gore",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Stomp",
		ability : 1,
		damage : [2, 6, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Imposing Presence",
		description : "The Rhinoceros uses its Strength, in place of Charisma, for Intimidation checks (see above)."
	}, {
		name : "Thick Hide",
		description : "The Rhinoceros reduces damage, other than force, psychic, and radiant by its Con. modifier (2)."
	}, {
		name : "Trampling Charge",
		description : "If the Rhinoceros moves at least 20 ft in a line and hits a creature equal to its size (or smaller) with its Gore, the target falls Prone and the Rhinoceros can make one Stomp attack against it as a bonus action."
	}]
};
CreatureList["giant scorpion (ll)"] = {
	name : "Giant Scorpion (LL)",
	nameAlt : ["Scorpion, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 15,
	hp : 52,
	hd : [7, 10],
	speed : "40 ft",
	scores : [17, 13, 15, 1, 9, 3],
	senses : "Blindsight 60 ft",
	passivePerception : 9,
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [	{
		name : "Claw",
		ability : 1,
		damage : [1, 8, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Stinger",
		ability : 1,
		damage : [1, 10, "piercing"],
		range : "Melee (10 ft)",
		description : "and it must make a Constitution saving throw (DC 13). On a failure, the target takes (2d10) additional poison damage and it becomes Poisoned until the end of its next turn"
	}],
	traits : [{
		name : "Vice Grip",
		description : "When the Scorpion hits a creature equal to its size (or smaller) with a Claw, it can Grapple the target in that claw (escape DC 13). While Grappling a creature, the Scorpion cannot use that Claw to attack other targets."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Scorpion makes two Claw attacks. It can replace one of its Claw attacks with a Stinger attack."
	}]
};
CreatureList["saber-toothed tiger (ll)"] = {
	name : "Saber-Toothed Tiger (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 12,
	hp : 52,
	hd : [7, 10],
	speed : "40 ft",
	scores : [18, 14, 15, 3, 12, 8],
	saves : [6, 4, "", "", "", ""],
	skills : {
		"perception" : 3,
		"stealth" : 6
	},
	senses : "Darkvision 60 ft",
	passivePerception : 13,
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 1,
		damage : [2, 8, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Smell",
		description : "The Tiger has advantage on all ability checks that rely on its sense of smell."
	}, {
		name : "Pounce",
		description : "If the Tiger moves at least 20 ft in a line, then hits a target equal to its size (or smaller) with its Claw, the target falls Prone, then the Tiger can make one Bite attack against it as a bonus action."
	}, {
		name : "Stalker",
		description : "The Tiger adds double its Proficiency Bonus to Stealth checks (included above)."
	}, {
		name : "Strong Jaws",
		description : "When the Tiger hits a creature equal to its size (or smaller) with its Bite, it can Grapple the target in its jaws (escape DC 14). While it is Grappling a creature, the Tiger cannot use its Bite attack on other targets. Each time a creature attempts to escape this Grapple, it takes 1d6 slashing damage, even on a successful escape."
	}]
};
CreatureList["swarm of vampire bats (ll)"] = {
	name : "Swarm of Vampire Bats (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 12,
	hp : 27,
	hd : [5, 8],
	speed : "15 ft, fly 40 ft",
	scores : [6, 19, 12, 2, 12, 4],
	saves : ["", 6, "", "", "", ""],
	damage_resistances : "bludgeoning, piercing, and slashing",
	condition_immunities : "charmed, frightened, grappled, paralyzed",
	senses : "Blindsight 60 ft",
	passivePerception : 11,
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Swarm of Tiny Beasts",
		description : "This swarm is made of Tiny Beasts."
	}, {
		name : "Echolocation",
		description : "When the Swarm makes an ability check that uses its hearing, it treats a d20 roll of 9 or lower as a 10. It loses this benefit and Blindsight if it is Deafened."
	}, {
		name : "Swarm",
		description : "The Swarm can occupy the same space as other creatures, and vice versa. It can also pass through spaces large enough for a Tiny Bat without having to squeeze."
	}],
	actions : [{
		name : "Flurry of Draining Bites",
		description : "Creatures of the Swarm's choice within its space must make a Dexterity saving throw (DC 14). On a failure, creatures take necrotic damage equal to the Swarm's remaining hit points, and the Swarm regains hit points equal to half the necrotic damage dealt. On a success, creatures take half as much damage, but the Swarm does not regain any hit points."
	}]
};
CreatureList["cave bear (ll)"] = {
	name : "Cave Bear (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 12,
	hp : 80,
	hd : [8, 10],
	speed : "40 ft, climb 30 ft",
	scores : [22, 12, 18, 5, 13, 7],
	saves : [8, "", "", "", "", ""],
	skills : {
		"intimidation" : 8,
		"perception" : 3,
		"survival" : 3
	},
	senses : "Darkvision 120 ft",
	passivePerception : 13,
	challengeRating : "4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Imposing Presence",
		description : "The Cave Bear uses its Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Keen Smell",
		description : "The Cave Bear has advantage on all ability checks that rely on its sense of smell."
	}, {
		name : "Strong Jaws",
		description : "If the Cave Bear hits a creature equal to its size (or smaller) with its Bite, it can Grapple it in its jaws (escape DC 16), but the Cave Bear can't use its Bite on other targets."
	}]
};
CreatureList["elder vampire bat (ll)"] = {
	name : "Elder Vampire Bat (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 14,
	hp : 75,
	hd : [10, 12],
	speed : "30 ft, fly 60 ft",
	scores : [18, 19, 13, 6, 16, 7],
	saves : ["", 6, "", "", "", ""],
	skills : {
		"acrobatics" : 6,
		"perception" : 5,
		"stealth" : 6
	},
	senses : "Blindsight 90 ft",
	passivePerception : 15,
	challengeRating : "4",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [	{
		name : "Claw",
		ability : 1,
		damage : [3, 6, "slashing"],
		range : "Melee (5 ft)",
		description : "",
		modifiers : [-2, ""]
	}, 	{
		name : "Bite",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Bite",
		ability : 1,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "",
		modifiers : [2, 2]
	}, 	{
		name : "Claw",
		ability : 1,
		damage : [2, 8, "slashing"],
		range : "Melee (5 ft)",
		description : "and any creature equal to the Bear's size (or smaller) is knocked Prone",
		modifiers : [2, 2]
	}],
	traits : [{
		name : "Echolocation",
		description : "When the Bat makes a Perception check with its hearing it treats a d20 roll of 9 or lower as a 10. It loses this benefit and its Blindsight if it is Deafened."
	}, {
		name : "Hunter's Grasp",
		description : "If the Bat hits a target at least one size smaller than it with its Claw attack, it can automatically Grapple the target in its Claws (escape DC 14)."
	}, {
		name : "Life Drain",
		description : "After the Bat hits a creature that is not Undead or a Construct with its Bite, it can use its bonus action to deal a bonus 2d8 necrotic damage to its target, then the Bat regains hit points equal to half the necrotic damage."
	}, {
		name : "Nocturnal Hunter",
		description : "When in dim light or darkness, the Bat has advantage on Stealth checks and it does not provoke opportunity attacks when flying out of an enemy's reach."
	}],
	actions : [{
		name : "Thick Hide",
		description : "The Cave Bear reduces damage, other than force, psychic, and radiant by its Constitution modifier (4)."
	}, {
		name : "Multiattack",
		description : "The Cave Bear makes two attacks, using its Bite and its Claw attacks in any combination."
	}, {
		name : "Roar of Dominance (bonus action)",
		description : "After the Cave Bear hits a creature with a Bite or Claw attack, it can roar, and force the creature hit by that Bite or Claw attack to make a Wisdom saving throw (DC 16). On a failed save, it becomes Frightened of the Cave Bear until the start of the Cave Bear's next turn. Creatures that succeed on this saving throw are immune to the Cave Bear's Roar of Dominance for the next 24 hours."
	}]
};
CreatureList["elephant (ll)"] = {
	name : "Elephant (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 12,
	hp : 76,
	hd : [8, 12],
	speed : "40 ft",
	scores : [22, 9, 17, 6, 14, 6],
	saves : ["", "", "", "", 4, ""],
	skills : {
		"intimidation" : 8
	},
	senses : "",
	passivePerception : 12,
	challengeRating : "4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Gore",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Stomp",
		ability : 1,
		damage : [2, 10, "bludgeoning"],
		range : "Melee (5 ft)",
		description : "",
		modifiers : [-1, ""]
	}],
	traits : [{
		name : "Concussive Blow",
		description : "Once per turn, when the Elephant hits a creature equal to its size (or smaller) with Stomp, it can force it to make a Constitution saving throw (DC 16), or the creature is Stunned until the start of its next turn."
	}, {
		name : "Imposing Presence",
		description : "The Elephant uses its Strength, in place of Charisma, for Intimidation checks (see above)."
	}, {
		name : "Thick Hide",
		description : "The Elephant reduces damage, other than force, psychic, and radiant by its Con. modifier (3)."
	}, {
		name : "Trampling Charge",
		description : "If the Elephant moves at least 20 ft in a line and hits a creature equal to its size (or smaller) with its Gore, the target falls Prone and the Elephant can make one Stomp attack against it as a bonus action."
	}]
};
CreatureList["giant heron (ll)"] = {
	name : "Giant Heron (LL)",
	nameAlt : ["Heron, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 14,
	hp : 75,
	hd : [10, 12],
	speed : "30 ft, fly 80 ft",
	scores : [18, 19, 13, 6, 16, 7],
	saves : ["", 6, "", "", "", ""],
	skills : {
		"perception" : 7,
		"stealth" : 6,
		"survival" : 5
	},
	senses : "",
	passivePerception : 17,
	challengeRating : "4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Talons",
		ability : 1,
		damage : [3, 6, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Ambush Hunter",
		description : "The Heron has advantage on all Stealth checks to Hide in marsh and swamp, and creatures have disadvantage on ability checks made to detect the Heron while it is standing still."
	}, {
		name : "Ambush Strike",
		description : "When the Heron hits a creature with its Beak attack while its target is unaware of the Heron, the attack deals a bonus 3d8 damage on hit."
	}, {
		name : "Hunter's Grasp",
		description : "When the Heron hits a target at least one size smaller than it with a Talons attack, it can choose to automatically Grapple the target (escape DC 14)."
	}, {
		name : "Hunter's Senses",
		description : "The Heron adds double its Proficiency Bonus to its Perception checks (included above)."
	}]
};
CreatureList["giant rhino beetle (ll)"] = {
	name : "Giant Rhino Beetle (LL)",
	nameAlt : ["Rhino Beetle, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 17,
	hp : 75,
	hd : [10, 10],
	speed : "30 ft, climb 10 ft, fly 30 ft",
	scores : [21, 8, 15, 2, 7, 3],
	saves : [7, 1, "", "", "", ""],
	skills : {
		"intimidation" : 6
	},
	senses : "",
	passivePerception : 8,
	challengeRating : "4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Gore",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "and it must make on a Strength saving throw (DC 15), or its AC is reduced by 2 and its speed is halved until the end of its next turn",
		modifiers : [-1, -1]
	}],
	traits : [{
		name : "Imposing Presence",
		description : "The Beetle uses Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Limited Flight",
		description : "If the Beetle ends its turn while flying it falls, but takes no falling damage. If it falls at least 10 ft, it can glide up to 2 ft horizontally for every 1 ft that it falls."
	}, {
		name : "Trampling Charge",
		description : "If the Beetle moves at least 20 ft in a line and hits with its Gore, it deals a bonus 3d8 damage, and if its target was equal to the Beetle's size (or smaller) the target is also knocked Prone."
	}],
	actions : [{
		name : "Reflective Carapace (reaction)",
		description : "When a creature the Beetle can see makes a melee attack against the Beetle, it can unfurl its wings and impose disadvantage on its attack roll."
	}]
};
CreatureList["swarm of scarabs (ll)"] = {
	name : "Swarm of Scarabs (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 14,
	hp : 13,
	hd : [3, 6],
	speed : "30 ft, climb 30 ft, burrow 30 ft",
	scores : [6, 19, 14, 1, 7, 2],
	saves : ["", 6, "", "", "", ""],
	damage_resistances : "bludgeoning, piercing, and slashing",
	damage_vulnerabilities : "fire",
	condition_immunities : "charmed, frightened, grappled, paralyzed",
	senses : "Tremmorsense 60 ft",
	passivePerception : 8,
	challengeRating : "4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Swarm of Diminutive Beasts",
		description : "This swarm is made of Diminutive Beasts."
	}, {
		name : "Scavenger",
		description : "The Swarm has advantage on all ability checks to sense dead creatures or creatures below their hit point maximum, so long as the target is within 300 ft"
	}, {
		name : "Skeletonize",
		description : "When the Swarm begins its turn in the same space as a dead creature equal to its size (or smaller), it is stripped of flesh, leaving behind bones and equipment."
	}, {
		name : "Spider Climb",
		description : "The Swarm can climb sheer surfaces and upside-down without needing to make an ability check."
	}, {
		name : "Swarm",
		description : "The Swarm can occupy the same space as other creatures, and vice versa. It can also pass through spaces large enough for a Diminutive Scarab without squeezing."
	}],
	actions : [{
		name : "Devour Flesh",
		description : "Creatures of the Swarm's choice within its space must make a Dexterity saving throw (DC 14). They take piercing damage equal to the Swarm's remaining hit points on a failure, and half that damage on a success. If a creature is reduced to 0 hit points, it is Skeletonized. Creatures take the same damage to maximum hit points. Damage dealt to a creature's maximum hit points by this feature are restored after the creature finishes a long rest."
	}]
};
CreatureList["colossal toad (ll)"] = {
	name : "Colossal Toad (LL)",
	nameAlt : ["Toad, Colossal (LL)"],
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 14,
	hp : 85,
	hd : [9, 12],
	speed : "30 ft, swim 30 ft",
	scores : [21, 9, 17, 2, 12, 5],
	saves : ["", "", 5, "", "", ""],
	damage_resistances : "acid, poison",
	condition_immunities : "poisoned",
	senses : "Darkvision 120 ft",
	passivePerception : 11,
	challengeRating : "4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Mighty Leap",
		description : "Once per turn, the Toad can expend 5 ft of movement to long jump up to 30 ft, or high jump up to 20 ft, even if this exceeds its remaining speed."
	}, {
		name : "Strong Jaws",
		description : "When the Toad hits a creature equal to its size (or smaller) with its Toxic Bite, it can Grapple the target in its mouth (escape DC 15). While it is Grappling a creature, the Toad cannot use its Toxic Bite attack on other targets."
	}]
};
CreatureList["giant walrus (ll)"] = {
	name : "Giant Walrus (LL)",
	nameAlt : ["Walrus, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 10,
	hp : 85,
	hd : [9, 12],
	speed : "20 ft, swim 40 ft",
	scores : [22, 9, 16, 5, 12, 6],
	saves : ["", "", 5, "", "", ""],
	skills : {
		"intimidation" : 8
	},
	damage_resistances : "cold",
	senses : "Darkvision 60 ft",
	passivePerception : 11,
	challengeRating : "4",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [	{
		name : "Slam",
		ability : 1,
		damage : [2, 8, "bludgeoning"],
		range : "Melee (5 ft)",
		description : "and a target equal to the Walrus' size (or smaller) is knocked Prone"
	}, 	{
		name : "Tusk",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "and it must make a Constitution saving throw (DC 16), or its AC is reduced by 2 and its speed is halved until the end of its next turn"
	}, 	{
		name : "Toxic Bite",
		ability : 1,
		damage : [1, 10, "piercing"],
		range : "Melee (5 ft)",
		description : "+1d10 poison damage; and if the creature is Grappled by the Toad it is Swallowed",
		modifiers : [-1, -1]
	}],
	traits : [{
		name : "Hold Breath",
		description : "The Walrus can hold its breath for1 hour."
	}, {
		name : "Imposing Presence",
		description : "The Walrus uses its Strength, instead of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Thick Hide",
		description : "The Walrus reduces damage, other than force, psychic, and radiant by its Con. modifier (3)."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Walrus makes two attacks, using its Slam and its Tusk attacks in any combination."
	}, {
		name : "Amphibious",
		description : "The Toad can breathe both air and water."
	}, {
		name : "Swallowed",
		description : "Swallowed creatures are Blinded and Restrained, and they have total cover from all attacks and effects outside the Toad. Swallowed creatures take (4d4) acid damage at the start of each of the Toad's turns. The Toad must maintain concentration on this effect to keep creatures Swallowed. If this effect ends, Swallowed creatures land Prone in an unoccupied space within 5 ft of the Toad."
	}, {
		name : "Thick Hide",
		description : "The Toad reduces damage, other than force, psychic, and radiant by its Constitution modifier (3)."
	}, {
		name : "Sticky Tongue",
		description : "The Toad forces a target within 20 ft at least one size smaller than it to make a Strength saving throw (DC 15). On a failure, it takes 1d10 bludgeoning damage and is pulled to an unoccupied space within 5 ft of the Toad, then the Toad can make a Toxic Bite attack as a bonus action."
	}]
};
CreatureList["colossal centipede (ll)"] = {
	name : "Colossal Centipede (LL)",
	nameAlt : ["Centipede, Colossal (LL)"],
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 17,
	hp : 95,
	hd : [10, 12],
	speed : "40 ft, climb 40 ft",
	scores : [18, 21, 16, 3, 9, 3],
	saves : [7, 8, "", "", "", ""],
	senses : "Blindsight 30 ft",
	passivePerception : 9,
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Foreleg Strike",
		ability : 2,
		damage : [2, 10, "piercing"],
		range : "Melee (10 ft)",
		description : "and the target's speed is halved until the end of its next turn"
	}, 	{
		name : "Mandibles",
		ability : 2,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Venom (Recharge 5-6)",
		description : "When the Centipede hits with its Mandibles, it can force it to make a Constitution saving throw (DC 11). On a failure, it takes 2d8 poison damage and is Poisoned. On a success, it takes half damage. A Poisoned creature repeats this saving throw at the end of each of its turns, ending the effect on a success. On a failure, it takes 1d8 poison damage. If this reduces it to 0 hit points, it is stable, but Paralyzed, while at 0 hit points."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Centipede uses its Foreleg Strike twice. It can replace one Foreleg Strike with its Mandibles."
	}, {
		name : "Acid Spray (Recharge 5-6)",
		description : "The Centipede spits a caustic secretion from its mouth forcing creatures in an adjacent 20-foot cone to make a Dexterity saving throw (DC 16). On a failure, they take 6d8 acid damage, and their Armor Class is reduced by 2 until the start of their next turn. On a success, they take half damage and no other effects."
	}]
};
CreatureList["colossal crab (ll)"] = {
	name : "Colossal Crab (LL)",
	nameAlt : ["Crab, Colossal (LL)"],
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 17,
	hp : 95,
	hd : [10, 12],
	speed : "30 ft, swim 40 ft",
	scores : [21, 8, 16, 3, 11, 3],
	saves : ["", "", 6, "", "", ""],
	skills : {
		"perception" : 3,
		"stealth" : 2
	},
	senses : "Blindsight 60 ft",
	passivePerception : 13,
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Claw",
		ability : 1,
		damage : [2, 10, "bludgeoning"],
		range : "Melee (15 ft)",
		description : ""
	}],
	traits : [{
		name : "Amphibious",
		description : "The Crab can breathe both air and water."
	}, {
		name : "Bottom Feeder",
		description : "Underwater, the Crab has advantage on ability checks to smell creatures that are below their hit point maximum, and automatically succeeds on ability checks to smell dead creatures within 1 mile."
	}, {
		name : "Pincer",
		description : "When the Crab hits a creature equal to its size (or smaller) with its Claw, it can Grapple the target (escape DC 16). While Grappling a target, it cannot attack other targets with that Claw. The Crab has two Claws."
	}, {
		name : "Siege Monster",
		description : "The Crab's attacks deal the maximum damage, in place of rolling, against objects and boats."
	}, {
		name : "Underwater Camouflage",
		description : "While it remains motionless while underwater, the Crab is indistinguishable from its surroundings due to the coral and wreckage on its shell."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Crab makes one attack with each Claw."
	}]
};
CreatureList["deep mole (ll)"] = {
	name : "Deep Mole (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 13,
	hp : 105,
	hd : [10, 10],
	speed : "40 ft, burrow 40 ft",
	scores : [22, 11, 20, 6, 14, 8],
	saves : [8, "", "", 0, "", ""],
	skills : {
		"perception" : 5,
		"survival" : 5
	},
	damage_resistances : "poison, psychic",
	senses : "Darkvision 120 ft, Tremorsense 300 ft",
	passivePerception : 15,
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Claw",
		ability : 1,
		damage : [2, 8, "slashing"],
		range : "Melee (5 ft)",
		description : "and if the target is equal to the Mole's size (or smaller) it is knocked Prone",
		modifiers : [-1, -2]
	}],
	traits : [{
		name : "Expert Tunneler",
		description : "The Deep Mole can tunnel through solid rock and stone. Also, when the Burrows while moving at half its speed, it leaves a tunnel behind equal to its size."
	}, {
		name : "Keen Smell",
		description : "The Deep Mole has advantage on all ability checks that rely on its sense of smell."
	}, {
		name : "Sunlight Sensativity",
		description : "The Deep Mole has disadvantage on attack rolls and ability checks while it is in direct sunlight."
	}, {
		name : "Weak Sight",
		description : "The Mole's normal sight only extends out to a 120-ft. radius, beyond that it relies on its Tremorsense."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Mole uses its Claw attack twice. It can replace one of its Claw attacks with Dust Cloud."
	}, {
		name : "Dust Cloud",
		description : "The Mole kicks up dust, causing the area in a 20-foot radius to be Heavily Obscured until the start of the Mole's next turn, unless dispersed by water or wind."
	}, {
		name : "Earth-Shaker (Recharge 5-6)",
		description : "The Mole strikes the earth, destroying the earth in an adjacent 30-ft. cone. The area becomes difficult terrain, and creatures in it must make a Strength saving throw (DC 16). Creatures fall Prone and take 7d8 bludgeoning damage on a failure. On a success, they take half as much damage and do not fall Prone. All structures or objects in the area take maximum damage."
	}]
};
CreatureList["dire tiger (ll)"] = {
	name : "Dire Tiger (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 15,
	hp : 95,
	hd : [10, 12],
	speed : "50 ft, climb 40 ft",
	scores : [21, 20, 16, 6, 14, 10],
	saves : ["", 8, "", "", "", ""],
	skills : {
		"perception" : 5,
		"stealth" : 11,
		"survival" : 5
	},
	senses : "Darkvision 120 ft",
	passivePerception : 15,
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 1,
		damage : [2, 8, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Smell",
		description : "The Tiger has advantage on all ability checks that rely on its sense of smell."
	}, {
		name : "Pounce",
		description : "If the Tiger moves at least 20 ft in a line, then hits a target equal to its size (or smaller) with its Claw, the target falls Prone, then the Tiger can make one Bite attack against it as a bonus action."
	}, {
		name : "Stalker",
		description : "The Tiger adds double its Proficiency Bonus to Stealth checks (included above)."
	}, {
		name : "Strong Jaws",
		description : "When the Tiger hits a creature equal to its size (or smaller) with its Bite, it can Grapple the target in its jaws (escape DC 16). While it is Grappling a creature, the Tiger cannot use its Bite attack on other targets."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Tiger makes two attacks, using its Bite and Claw attacks in any combination."
	}]
};
CreatureList["giant squid (ll)"] = {
	name : "Giant Squid (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 14,
	hp : 112,
	hd : [15, 12],
	speed : "5 ft, swim 90 ft",
	scores : [23, 14, 12, 5, 11, 4],
	saves : [9, 5, "", "", "", ""],
	senses : "Darkvision 120 ft",
	passivePerception : 10,
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [3, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Tentacle",
		ability : 1,
		damage : [2, 10, "bludgeoning"],
		range : "Melee (15 ft)",
		description : "and if the target is equal to the Squid's size (or smaller) then it is automatically Grappled (escape DC 17), and the Squid cannot attack other targets with that tentacle"
	}],
	traits : [{
		name : "Aquatic",
		description : "The Squid can only breathe underwater."
	}, {
		name : "Siege Monster",
		description : "The Squid's attacks deal maximum damage, in place of rolling, against objects and boats."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Squid makes two attacks using its Bite and Tentacle attacks in any combination."
	}, {
		name : "Ink Cloud (1/short or long rest) (reaction)",
		description : "When the Squid is targeted by an attack it can see while it is underwater, it can fill its space with ink, then move up to its speed without provoking opportunity attacks. The ink heavily obscures its space for 1 minute or until it is dispersed."
	}]
};
CreatureList["giant sloth (ll)"] = {
	name : "Giant Sloth (LL)",
	nameAlt : ["Sloth, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 16,
	hp : 104,
	hd : [11, 12],
	speed : "30 ft, climb 30 ft, swim 30 ft",
	scores : [22, 10, 17, 3, 12, 4],
	saves : ["", "", 6, "", "", ""],
	senses : "",
	passivePerception : 11,
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Claw",
		ability : 1,
		damage : [2, 10, "bludgeoning"],
		range : "Melee (10 ft)",
		description : "and a target smaller than the Sloth is knocked back 10 ft and must make a Dexterity saving throw (DC 17) or fall Prone"
	}, 	{
		name : "Fetid Bite",
		ability : 1,
		damage : [2, 10, "piercing"],
		range : "Melee (5 ft)",
		description : "and it must succeed on a Constitution saving throw (DC 17) or it is Poisoned until the start of the Sloth's next turn"
	}],
	traits : [{
		name : "Keen Smell",
		description : "The Sloth has advantage on all ability checks that rely on its sense of smell."
	}, {
		name : "Lumbering",
		description : "The Sloth has disadvantage on all Dexterity ability checks and saving throws, and it cannot Dash."
	}, {
		name : "Thick Hide",
		description : "The Sloth reduces all damage, other than force, psychic, and radiant by its Constitution mod. (3)."
	}, {
		name : "Tropical Camouflage",
		description : "While it remains motionless in a jungle environment, the Sloth is indistinguishable from its surroundings due to the moss growing from its fur."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Sloth makes two attacks with its Claw. It can replace one of these attacks with its Fetid Bite."
	}]
};
CreatureList["swarm of plague rats (ll)"] = {
	name : "Swarm of Plague Rats (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 10,
	hp : 32,
	hd : [3, 8],
	speed : "25 ft, climb 25 ft, swim 25 ft",
	scores : [6, 15, 22, 2, 10, 4],
	saves : ["", 5, 9, "", "", ""],
	damage_resistances : "bludgeoning, piercing, and slashing",
	condition_immunities : "charmed, frightened, grappled, paralyzed",
	senses : "Darkvision 120 ft",
	passivePerception : 10,
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Swarm of Diminutive Beasts",
		description : "This swarm is made of Diminutive Beasts."
	}, {
		name : "Keen Smell",
		description : "The Swarm has advantage on ability checks that rely on its sense of smell."
	}, {
		name : "Plague Bearer",
		description : "Any creature that starts its turn within the Swarm's space, and isn't a Construct or an Undead, must make a Constitution saving throw (DC 17). If it has taken damage from the Swarm since the start of its last turn, it makes this saving throw with disadvantage. On a failure, it is Poisoned, and while Poisoned its speed is halved, it can't take reactions, and it takes 2d8 poison damage at the start of each of its turns. It can repeat this Constitution saving throw at the end of each of its turns, and on a success, it is no longer Poisoned."
	}, {
		name : "Swarm",
		description : "The Swarm can occupy the same space as other creatures, and vice versa. It can also pass through spaces large enough for a Diminutive Rodent without squeezing."
	}],
	actions : [{
		name : "Flurry of Bites",
		description : "Creatures of the Swarm's choice within its space must make a Dexterity saving throw (DC 17). They take piercing damage equal to the Swarm's remaining hit points on a failure, and half that damage on a success."
	}, {
		name : "Scamper (bonus action)",
		description : "The Swarm takes a Disengage or Hide action."
	}]
};
CreatureList["terror bird (ll)"] = {
	name : "Terror Bird (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 14,
	hp : 95,
	hd : [10, 12],
	speed : "60 ft",
	scores : [21, 14, 18, 5, 14, 7],
	saves : ["", 5, 3, "", "", ""],
	skills : {
		"intimidation" : 8,
		"perception" : 5,
		"stealth" : 5
	},
	senses : "",
	passivePerception : 15,
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Beak",
		ability : 1,
		damage : [2, 10, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Kick",
		ability : 1,
		damage : [2, 8, "slashing"],
		range : "Melee (5 ft)",
		description : "and a target equal to the Terror Bird's size (or smaller) is knocked Prone"
	}],
	traits : [{
		name : "Imposing Presence",
		description : "The Terror Bird uses Strength, in place of Charisma, for Intimidation checks (see above)."
	}, {
		name : "Mighty Leap",
		description : "Once per turn, the Terror Bird can expend 5 ft of its movement to long jump up to 30 ft, or high jump to 20 ft, even if this exceeds its remaining speed."
	}, {
		name : "Strong Jaws",
		description : "If the Terror Bird hits a creature equal to its size (or smaller) with its Beak, it can Grapple the target in its beak (escape DC 16). While it is Grappling a creature, the Terror Bird can't use its Beak attack on other targets."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Terror Bird makes two attacks, using its Beak and Kick attacks in any combination."
	}, {
		name : "Aggressive (bonus action)",
		description : "The Terror Bird takes the Dash action, but it must end its movement closer to a Hostile creature."
	}]
};
CreatureList["giant wasp queen (ll)"] = {
	name : "Giant Wasp Queen (LL)",
	nameAlt : ["Wasp Queen, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 15,
	hp : 90,
	hd : [12, 10],
	speed : "30 ft, fly 60 ft",
	scores : [16, 21, 14, 12, 17, 8],
	saves : ["", 8, "", "", 6, ""],
	skills : {
		"acrobatics" : 4,
		"intimidation" : 2,
		"performance" : 2
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Sting",
		ability : 2,
		damage : [3, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "and it must make a Constitution saving throw (DC 16) or be Poisoned until the start of the Queen's next turn",
		modifiers : [-4, ""]
	}],
	traits : [{
		name : "Agile Flight",
		description : "The Queen has advantage on all Dexterity ability checks and saving throws while it is flying."
	}, {
		name : "Hive Mind",
		description : "For each additional Giant Wasp within 30 ft, the Wasp Queen gains a +1 bonus to attack rolls, ability checks, and saving throws (maximum +10)."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Queen makes two attacks with its Sting. It can replace one or both attacks with the Orders below."
	}, {
		name : "Attack Order",
		description : "The Queen orders a Giant Wasp within 30 ft to use its Sting against a target of the Queen's choice."
	}, {
		name : "Maneuver Order",
		description : "The Queen orders a Giant Wasp within 30 ft to move up to its speed. This movement does not provoke opportunity attacks."
	}, {
		name : "Rallying Order",
		description : "The Queen grants a Giant Wasp within 30 ft (1d8 +3) temporary hit points which last for 1 minute."
	}]
};
CreatureList["titanoboa (ll)"] = {
	name : "Titanoboa (LL)",
	source : [["GMB:LL", 0]],
	size : 0,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 12,
	hp : 130,
	hd : [9, 20],
	speed : "40 ft, climb 40 ft, swim 40 ft",
	scores : [22, 6, 18, 3, 10, 3],
	saves : [9, "", 9, "", "", ""],
	senses : "",
	passivePerception : 10,
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 1,
	attacks : [	{
		name : "Strike",
		ability : 1,
		damage : [2, 10, "piercing"],
		range : "Melee (10 ft)",
		description : "and if the target is Grappled by the Titanboa, it becomes Swallowed"
	}, 	{
		name : "Constrict",
		ability : 1,
		damage : [2, 12, "bludgeoning"],
		range : "Melee (5 ft)",
		description : "A target equal to the Titanoboa's size (or smaller) is Grappled (escape DC 17) and Restrained. The Titanoboa can only Grapple one creature at a time in this way. Grappled targets must make a Strength saving throw (DC 17) at the start of their turns or suffer 1 level of Exhaustion"
	}],
	traits : [{
		name : "Cold-Blooded",
		description : "When the Titanoboa takes cold damage, it cannot take reactions and its speed is halved its next turn."
	}, {
		name : "Serpentine",
		description : "The Titanoboa counts as two sizes smaller for the purposes of moving through passageways."
	}, {
		name : "Siege Monster",
		description : "The Titanoboa's attacks deal maximum damage, in place of rolling, against objects and structures."
	}, {
		name : "Thermal Vision",
		description : "The Titanoboa knows the exact location of any warm-blooded creatures within 90 ft of it."
	}, {
		name : "Swallowed",
		description : "Swallowed creatures are Blinded and Restrained, and they have total cover from all attacks and effects outside the Titanoboa. Swallowed creatures take (5d4) acid damage at the start of each of the Titanoboa's turns. The Titanoboa must maintain concentration on this effect to keep creatures Swallowed. If this effect ends, all Swallowed creatures land Prone in an unoccupied space within 5 ft of the Titanoboa."
	}]
};
CreatureList["badger lord (ll)"] = {
	name : "Badger Lord (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "vermin",
	alignment : "Neutral",
	ac : 13,
	hp : 123,
	hd : [13, 10],
	speed : "40 ft, burrow 30 ft",
	scores : [23, 17, 18, 3, 16, 8],
	saves : [9, "", 7, "", "", ""],
	damage_resistances : "poison",
	condition_immunities : "charmed, frightened, poisoned",
	senses : "Darkvision 120 ft",
	passivePerception : 13,
	challengeRating : "6",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [3, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 1,
		damage : [3, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Keen Smell",
		description : "The Badger has advantage on ability checks that rely on its sense of smell."
	}, {
		name : "Strong Jaws",
		description : "If the Badger hits a creature equal to its size (or smaller) with Bite, it can Grapple it in its jaws (escape DC 17), but then the Badger cannot Bite other targets."
	}, {
		name : "Thick Hide",
		description : "The Badger reduces all damage, other than force, psychic, and radiant by its Con. modifier (4)."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Badger makes two attacks, using its Bite and Claw attacks in any combination."
	}, {
		name : "Aggressive (bonus action)",
		description : "The Badger takes the Dash action, but must end its movement closer to a Hostile creature."
	}, {
		name : "Frenzy (bonus action)",
		description : "The Badger enters a Frenzy, and until the start of its next turn, it has Resistance to Bludgeoning, Piercing, and Slashing damage, and all of the Badger's attacks and all attacks against the Badger are made with advantage."
	}]
};
CreatureList["giant cave bear (ll)"] = {
	name : "Giant Cave Bear (LL)",
	nameAlt : ["Cave Bear, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "carnivore",
	alignment : "Neutral",
	ac : 13,
	hp : 115,
	hd : [10, 12],
	speed : "60 ft, climb 40 ft",
	scores : [24, 8, 21, 7, 14, 9],
	saves : [10, 2, "", "", "", ""],
	skills : {
		"intimidation" : 10,
		"perception" : 5,
		"survival" : 5
	},
	senses : "Darkvision 120 ft",
	passivePerception : 15,
	challengeRating : "6",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [2, 10, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 1,
		damage : [3, 8, "slashing"],
		range : "Melee (5 ft)",
		description : "and any creature equal to the Bear's size (or smaller) is knocked Prone"
	}],
	traits : [{
		name : "Imposing Presence",
		description : "The Bear uses its Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Keen Smell",
		description : "The Cave Bear has advantage on all ability checks that rely on its sense of smell."
	}, {
		name : "Strong Jaws",
		description : "If the Bear hits a creature equal to its size (or smaller) with its Bite, it can Grapple it in its jaws (escape DC 18), but the Bear can't use its Bite on other targets."
	}, {
		name : "Thick Hide",
		description : "The Cave Bear reduces damage, other than force, psychic, and radiant by its Constitution mod. (5)."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Bear makes two attacks, using its Bite and its Claw attacks in any combination."
	}, {
		name : "Roar of Dominance (bonus action)",
		description : "After the Cave Bear hits a creature with its Bite or Claw attack, it can roar, and force the creature hit by its attack to make a Wisdom saving throw (DC 18). On a failed save, it becomes Frightened of the Cave Bear until the start of the Cave Bear's next turn. Creatures that succeed on this saving throw are immune to the Bear's Roar of Dominance for the next 24 hours."
	}]
};
CreatureList["giant crocodile (ll)"] = {
	name : "Giant Crocodile (LL)",
	nameAlt : ["Crocodile, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "reptilian",
	alignment : "Neutral",
	ac : 14,
	hp : 115,
	hd : [10, 12],
	speed : "40 ft, swim 60 ft",
	scores : [21, 9, 19, 4, 12, 7],
	saves : [8, "", 7, "", "", ""],
	senses : "",
	passivePerception : 11,
	challengeRating : "6",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [3, 10, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Tail",
		ability : 1,
		damage : [3, 8, "bludgeoning"],
		range : "Melee (10 ft)",
		description : "and if it is equal to the Crocodile's size (or smaller) it falls Prone",
		modifiers : [-3, ""]
	}],
	traits : [{
		name : "Aquatic Camouflage",
		description : "While it remains motionless in the water, the Crocodile is indistinguishable from its natural surroundings due to the algae buildup on its scales."
	}, {
		name : "Crushing Strength",
		description : "If the Crocodile damages a creature while it is holding its breath underwater, it knocks the air from its lungs, and the creature begins Suffocating."
	}, {
		name : "Hold Breath",
		description : "The Crocodile can hold breath for 3 hours."
	}, {
		name : "Strong Jaws",
		description : "If the Crocodile hits a target equal to its size (or smaller) with Bite, it can Grapple it in its jaws (escape DC 18), but the Crocodile cannot Bite other targets."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Crocodile makes two attacks, a Bite and a Tail attack. It can replace its Bite attack with Death Roll."
	}, {
		name : "Death Roll",
		description : "The Crocodile forces one creature Grappled by it to make a Strength saving throw (DC 16). It takes (5d10) slashing damage on failure, and half on success."
	}]
};
CreatureList["giant gorilla (ll)"] = {
	name : "Giant Gorilla (LL)",
	nameAlt : ["Gorilla, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 12,
	hp : 115,
	hd : [10, 12],
	speed : "50 ft, climb 50 ft",
	scores : [23, 14, 18, 7, 14, 7],
	saves : [9, 5, "", "", "", ""],
	skills : {
		"athletics" : 9,
		"intimidation" : 9
	},
	senses : "",
	passivePerception : 12,
	challengeRating : "6",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Fist",
		ability : 1,
		damage : [3, 8, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Hurl",
		ability : 1,
		damage : [2, 10, "bludgeoning"],
		range : "30/60 ft",
		description : ""
	}],
	traits : [{
		name : "Concussive Blow",
		description : "If the Gorilla hits a creature smaller than it with two Fist attacks on the same turn, it can force the target to make a Constitution saving throw (DC 17) or be Stunned until the start of the Gorilla's next turn."
	}, {
		name : "Imposing Presence",
		description : "The Gorilla uses its Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Keen Smell",
		description : "The Gorilla has advantage on all ability checks that rely on its sense of smell."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Gorilla makes two attacks, using Fist or Hurl:"
	}, {
		name : "Frenzy (bonus action)",
		description : "The Gorilla enters a Frenzy, and until the start of its next turn, it has Resistance to all Bludgeoning, Piercing, and Slashing damage, and all of the Gorilla's attacks and attacks against the Gorilla are made with advantage."
	}, {
		name : "Intimidating Show (bonus action)",
		description : "The Gorilla forces Hostile creatures within 30 feet to make a Wisdom saving throw (DC 17), or become Frightened of it for 1 minute. Creatures can repeat this saving throw at the end of their turn, ending the effect on a success. Creatures that succeed on this saving throw are immune to the Gorilla's Indimidating Show for the next 24 hours."
	}]
};
CreatureList["mammoth (ll)"] = {
	name : "Mammoth (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "brute",
	alignment : "Neutral",
	ac : 13,
	hp : 126,
	hd : [11, 12],
	speed : "40 ft",
	scores : [24, 9, 21, 5, 12, 6],
	saves : [10, "", 8, "", "", ""],
	skills : {
		"intimidation" : 10
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "6",
	proficiencyBonus : 3,
	attacksAction : 1,
	attacks : [	{
		name : "Gore",
		ability : 1,
		damage : [3, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Stomp",
		ability : 1,
		damage : [3, 10, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Concussive Blow",
		description : "If the Mammoth hits a creature smaller than it with its Stomp attack, the creature must make a Constitution saving throw (DC 18). On a failed save, it is Stunned until the start of its next turn."
	}, {
		name : "Imposing Presence",
		description : "The Mammoth uses its Strength, in place of Charisma, for Intimidation checks (see above)."
	}, {
		name : "Thick Hide",
		description : "The Mammoth reduces damage, other than force, psychic, and radiant by its Constitution mod. (5)."
	}, {
		name : "Trampling Charge",
		description : "If the Mammoth moves at least 20 ft in a line and hits a creature equal to its size (or smaller) with its Gore, the target falls Prone and the Mammoth can make one Stomp attack against it as a bonus action."
	}]
};
CreatureList["giant shark (ll)"] = {
	name : "Giant Shark (LL)",
	nameAlt : ["Shark, Giant (LL)"],
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 13,
	hp : 126,
	hd : [11, 12],
	speed : "0 ft, swim 90 ft",
	scores : [23, 11, 21, 3, 10, 5],
	saves : [9, "", 8, "", "", ""],
	skills : {
		"perception" : 3
	},
	senses : "Blindsight 60 ft",
	passivePerception : 13,
	challengeRating : "6",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [3, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "Any target that is two sizes smaller than the Shark (or smaller), must make a Dexterity saving throw (DC 17) or become Swallowed"
	}],
	traits : [{
		name : "Aquatic",
		description : "The Shark can only breathe underwater."
	}, {
		name : "Blood Sense",
		description : "The Shark knows the direction of any creature with less than its maximum hit points within 1 mile, so long as they are in the same body of water."
	}, {
		name : "Frenzy",
		description : "The Shark has advantage on Bite attacks against creatures with less than their maximum hit points."
	}, {
		name : "Relentless (Recharge 4-6)",
		description : "If the Shark is reduced to 0 points, but not killed, it falls to 11 (1d12 +5) hit points."
	}, {
		name : "Swallowed",
		description : "Swallowed creatures are Blinded and Restrained, and they have total cover from all attacks and effects outside the Shark. Swallowed creatures take (6d4) acid damage at the start of each of the Shark's turns. The Shark must maintain concentration to keep creatures Swallowed. If this effect ends, all Swallowed creatures land Prone in an unoccupied space within 5 ft of the Shark."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Shark makes two attacks with its Bite. It can replace one of its Bite attacks with its Thrash action."
	}, {
		name : "Thrash",
		description : "The Shark forces all creatures within 10 ft to make a Dexterity saving throw (DC 17). Creatures take 3d8 slashing damage on a failure, and half as much on a success."
	}, {
		name : "Aggressive (bonus action)",
		description : "The Shark moves up to its speed toward a Hostile creature it can sense."
	}]
};
CreatureList["royal eagle (ll)"] = {
	name : "Royal Eagle (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "avian",
	alignment : "Neutral",
	ac : 16,
	hp : 95,
	hd : [10, 12],
	speed : "30 ft, fly 90 ft",
	scores : [18, 22, 17, 7, 15, 10],
	saves : ["", 9, "", "", 5, ""],
	skills : {
		"acrobatics" : 9,
		"perception" : 8
	},
	senses : "",
	passivePerception : 18,
	challengeRating : "6",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Beak",
		ability : 2,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "and the creature must succeed on a Dexterity saving throw (DC 17) or it is Blinded until the start of the Eagle's next turn"
	}, 	{
		name : "Talons",
		ability : 2,
		damage : [2, 10, "slashing"],
		range : "Melee (5 ft)",
		description : "and the target has disadvantage on attack rolls against all targets other than the Eagle until the start of the Eagle's next turn"
	}],
	traits : [{
		name : "Airborne Evasion",
		description : "When the Eagle is forced to make a Dexterity saving throw to avoid damage while flying, it takes no damage on a success, and half on a failure."
	}, {
		name : "Hunter's Grasp",
		description : "If the Eagle hits a target at least one size smaller than it with its Talons, it can Grapple it (escape DC 17), then it cannot use its Talons on other targets."
	}, {
		name : "Hunter's Senses",
		description : "The Eagle adds double its Proficiency Bonus to its Perception checks (included above)."
	}, {
		name : "Swift Wing",
		description : "Opportunity attacks against the Eagle have disadvantage while it is using its flying speed."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Eagle uses its Screech (if available), then makes two Beak or Talons attacks in any combination."
	}, {
		name : "Screech (Recharge 4-6)",
		description : "The Eagle forces hostile targets that can see or hear it within 120 ft to make a Wisdom saving throw (DC 17). On a failure, they are Frightened of the Eagle for 1 minute. They repeat the saving throw at the end of their turn, ending the effect on a success. Creatures that succeed on this Wisdom saving throw are immune to the Eagle's Screech for the next 24 hours."
	}]
};
CreatureList["colossal spider (ll)"] = {
	name : "Colossal Spider (LL)",
	nameAlt : ["Spider, Colossal (LL)"],
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "insect",
	alignment : "Neutral",
	ac : 16,
	hp : 123,
	hd : [13, 12],
	speed : "40 ft, climb 40 ft",
	scores : [23, 19, 16, 7, 9, 3],
	saves : [9, 7, "", "", "", ""],
	skills : {
		"stealth" : 7
	},
	senses : "Blindsight 60 ft, Darkvision 120 ft",
	passivePerception : 9,
	challengeRating : "6",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Foreleg Strike",
		ability : 1,
		damage : [2, 10, "piercing"],
		range : "Melee (10 ft)",
		description : ""
	}, 	{
		name : "Bite",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Arachnid",
		description : "The Spider can climb on sheer surfaces, upside down, and along webs without making an ability check. It also ignores movement restrictions caused by webs and it can sense other creatures touching the same web as it."
	}, {
		name : "Siege Monster",
		description : "The Spider's attacks deal the maximum damage, in place of rolling, against objects and boats."
	}, {
		name : "Venom (Recharge 4-6)",
		description : "If the Spider hits with its Bite, it can force the target to make a Constitution saving throw (DC 17). On a failure, it takes 2d8 poison damage and is Poisoned. On a success, it only takes half damage. A Poisoned creature repeats this saving throw at the end of each of its turns, ending the effect on a success. On a failure, it takes 2d8 poison damage. If this reduces it to 0 hit points, it is stable, but Paralyzed, while at 0 hit points."
	}, {
		name : "Wrap",
		description : "When the Spider targets a creature at least one size smaller than it (or smaller) with Web Strand, it must make a Dexterity saving throw (DC 17). On a failure, it is Grappled in place by webbing (escape DC 17)"
	}],
	actions : [{
		name : "Multiattack",
		description : "The Spider makes two attacks, using its Bite, Foreleg Strike, and Web Strand in any combination."
	}, {
		name : "Web Strand",
		description : "The Spider shoots a thin strand of webbing at a target it can see within 60 ft, forming a continuous line of webbing from where it is standing to the target."
	}]
};
CreatureList["sperm whale (ll)"] = {
	name : "Sperm Whale (LL)",
	source : [["GMB:LL", 0]],
	size : 0,
	type : "Beast",
	subtype : "aquatic",
	alignment : "Neutral",
	ac : 13,
	hp : 192,
	hd : [12, 20],
	speed : "0 ft, swim 60 ft",
	scores : [26, 8, 20, 3, 12, 5],
	saves : ["", "", 8, "", "", ""],
	damage_resistances : "cold",
	senses : "Blindsight 120 ft",
	passivePerception : 11,
	challengeRating : "8",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [3, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "and if the target is two sizes smaller than the Whale, it must succeed on a Dexterity saving throw (DC 19) or it is Swallowed"
	}, 	{
		name : "Tail",
		ability : 1,
		damage : [3, 6, "bludgeoning"],
		range : "Melee (15 ft)",
		description : "and a target equal to the Whale's size (or smaller) is knocked Prone"
	}],
	traits : [{
		name : "Echolocation",
		description : "If the Whale makes a Perception check with its hearing it treats a d20 roll of 9 or lower as a 10. It loses this benefit and its Blindsight if it is Deafened."
	}, {
		name : "Siege Monster",
		description : "The Whale's attacks deal maximum damage, in place of rolling, against objects and boats."
	}, {
		name : "Thick Hide",
		description : "The Whale reduces all damage, other than force, psychic, and radiant by its Constitution modifier (5)."
	}, {
		name : "Hold Breath",
		description : "The Whale can hold its breath for 2 hours."
	}, {
		name : "Swallowed",
		description : "Swallowed creatures are Blinded and Restrained, and they have total cover from all attacks and effects outside the Whale. Swallowed creatures take (6d4) acid damage at the start of each of the Whale's turns. The Whale must maintain concentration to keep creatures Swallowed. If this effect ends, all Swallowed creatures land Prone in an unoccupied space within 5 ft of the Whale."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Whale makes two attacks using its Bite and Tail attacks in any combination."
	}]
};
