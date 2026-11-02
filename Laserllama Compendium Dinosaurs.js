/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	Do not import the old LaserLlama files in the same sheet.

	-INFORMATION-
	Content:	Compendium of Dinosaurs v2.1.0 (29 creatures)
	Files:		LaserLlama - Compendium of Dinosaurs v2.1.0.js
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
*/

var iFileName = "Laserllama Compendium Dinosaurs.js";
RequiredSheetVersion("13.2.3");

// ======================================================================
// LaserLlama - Compendium of Dinosaurs v2.1.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	This file can be used on its own; it works best together with "LaserLlama - Common Attributes 20261019.js" and the Shifter.

	-INFORMATION-
	Subject:	Creatures, "Laserllama Compendium of Dinosaurs"
	Effect:		This script adds the 29 Ancient Beasts (dinosaurs) of the Compendium of Beasts: Dinosaurs v2.1.0 by Laserllama (GM Binder, Fan Content policy).
				They are added with "(LL)" after their name (e.g. "Tyrannosaurus Rex (LL)"), so the official versions remain available.
				They can be used on the Companion and Wild Shape pages (Wild Shape, Shifter Beast Shapes, polymorph, conjure familiar for CR 0).
				All have the Ancient subtype: use them only with DM permission.
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

CreatureList["archaeopteryx (ll)"] = {
	name : "Archaeopteryx (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Beast",
	subtype : "ancient",
	companion : "familiar",
	alignment : "Neutral",
	ac : 11,
	hp : 2,
	hd : [1, 4],
	speed : "5 ft, fly 30 ft",
	scores : [2, 13, 10, 2, 8, 7],
	skills : {
		"acrobatics" : 3,
		"perception" : 1
	},
	senses : "",
	passivePerception : 11,
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
		name : "Swift Wing",
		description : "While the Archaeopteryx is using its flying speed, opportunity attacks against it have disadvantage."
	}]
};
CreatureList["oviraptor (ll)"] = {
	name : "Oviraptor (LL)",
	source : [["GMB:LL", 0]],
	size : 4,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 11,
	hp : 7,
	hd : [2, 6],
	speed : "35 ft",
	scores : [4, 13, 8, 3, 9, 5],
	skills : {
		"perception" : 1,
		"sleight of hand" : 3,
		"stealth" : 3
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "1/8",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 2,
		damage : [1, 4, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 2,
		damage : [1, 4, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Light Frame",
		description : "The Oviraptor is considered to be Tiny for determining carrying capacity and targets it can Grapple."
	}, {
		name : "Skittish",
		description : "The Oviraptor has advantage on Initiative rolls, and Wisdom ability checks that rely on its sight."
	}, {
		name : "Snatch",
		description : "When the Oviraptor hits a creature with its Claw attack, it can forgo the normal damage to instead steal a Tiny (or smaller) object the creature is carrying. It cannot steal objects that the creature is wielding or wearing."
	}]
};
CreatureList["ornithomimus (ll)"] = {
	name : "Ornithomimus (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 13,
	hp : 18,
	hd : [4, 8],
	speed : "50 ft",
	scores : [11, 15, 11, 3, 11, 5],
	skills : {
		"perception" : 2,
		"sleight of hand" : 4,
		"stealth" : 4
	},
	senses : "",
	passivePerception : 12,
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 2,
		damage : [1, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Kick",
		ability : 2,
		damage : [1, 6, "slashing"],
		range : "Melee (5 ft)",
		description : "and it can't make opportunity attacks against the Ornithomimus this turn"
	}],
	traits : [{
		name : "Light Frame",
		description : "The Ornithomimus is considered Small for determining carrying capacity and targets it can Grapple."
	}, {
		name : "Pack Tactics",
		description : "The Ornithomimus has advantage on attack rolls against Hostile targets within 5 feet of a conscious creature that is allied with the Ornithomimus."
	}, {
		name : "Skittish",
		description : "The Ornithomimus has advantage on Initiative rolls, and Wisdom ability checks that rely on its sight."
	}]
};
CreatureList["velociraptor (ll)"] = {
	name : "Velociraptor (LL)",
	source : [["GMB:LL", 0]],
	size : 4,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 12,
	hp : 13,
	hd : [3, 6],
	speed : "30 ft",
	scores : [6, 14, 13, 4, 12, 6],
	skills : {
		"perception" : 2,
		"stealth" : 4
	},
	senses : "",
	passivePerception : 12,
	challengeRating : "1/4",
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
		ability : 2,
		damage : [1, 4, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Pack Tactics",
		description : "The Velociraptor has advantage on attack rolls against Hostile targets within 5 feet of a conscious creature that is allied with the Velociraptor."
	}, {
		name : "Terrible Claw",
		description : "If Velociraptor hits a creature at least one size larger than it with its Claw, it can Grapple it. Instead of reducing the target's speed, Velociraptor climbs on it, moves with it, and has advantage on attacks against it."
	}]
};
CreatureList["dimetrodon (ll)"] = {
	name : "Dimetrodon (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 12,
	hp : 22,
	hd : [3, 10],
	speed : "30 ft, swim 30 ft",
	scores : [15, 10, 14, 2, 10, 5],
	skills : {
		"perception" : 2,
		"stealth" : 2
	},
	senses : "",
	passivePerception : 12,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [1, 10, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Tail",
		ability : 1,
		damage : [1, 8, "bludgeoning"],
		range : "Melee (10 ft)",
		description : "and it must make a Strength saving throw (DC 12) or fall Prone"
	}],
	traits : [{
		name : "Hold Breath",
		description : "The Dimetrodon can hold its breath for up to 30 minutes while it is underwater."
	}, {
		name : "Natural Camouflage",
		description : "The Dimetrodon has advantage on all Stealth checks in swampland, marshes, or underwater."
	}, {
		name : "Strong Jaws",
		description : "If the Dimetrodon hits a creature equal to its size (or smaller) with a Bite, it can Grapple it in its jaws (escape DC 12). When Grappling another creature the Dimetrodon cannot use its Bite attack on other targets."
	}]
};
CreatureList["pterodactyl (ll)"] = {
	name : "Pterodactyl (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 13,
	hp : 18,
	hd : [4, 8],
	speed : "10 ft, fly 40 ft",
	scores : [5, 15, 8, 5, 9, 7],
	skills : {
		"acrobatics" : 4,
		"perception" : 1
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 2,
		damage : [1, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Light Frame",
		description : "The Pterodactyl counts as a Small creature for determining its carrying capacity and Grapple checks."
	}, {
		name : "Swift Wing",
		description : "While the Pterodactyl uses its flying speed, opportunity attacks against it have disadvantage."
	}, {
		name : "Swoop",
		description : "When the Pterodactyl flies at least 20 ft in a line toward a creature, then hits it with a Beak attack, it deals a bonus 2d6 damage, and it can't target the Pterodactyl with opportunity attacks until the Pterodactyl's next turn."
	}]
};
CreatureList["deinonychus (ll)"] = {
	name : "Deinonychus (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 13,
	hp : 33,
	hd : [5, 8],
	speed : "40 ft",
	scores : [10, 16, 14, 4, 13, 7],
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
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 2,
		damage : [1, 10, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Mighty Leap",
		description : "Once per turn, a Deinonychus can spend 5 ft of its movement to long jump up to 20 ft, or high jump to 10 ft, even if this exceeds is remaining speed."
	}, {
		name : "Pack Tactics",
		description : "The Deinonychus has advantage on attack rolls against Hostile targets within 5 feet of a conscious creature that is allied with the Deinonychus."
	}, {
		name : "Terrible Claw",
		description : "If Deinonychus hits a creature at least one size larger than it with its Claw, it can Grapple it. Instead of reducing the target's speed, Deinonychus climbs on it, moves with it, and has advantage on attacks against it."
	}]
};
CreatureList["gallimimus (ll)"] = {
	name : "Gallimimus (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 13,
	hp : 38,
	hd : [7, 10],
	speed : "40 ft",
	scores : [11, 15, 11, 2, 11, 5],
	skills : {
		"perception" : 2,
		"sleight of hand" : 4,
		"stealth" : 4
	},
	senses : "",
	passivePerception : 12,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Kick",
		ability : 2,
		damage : [2, 8, "slashing"],
		range : "Melee (5 ft)",
		description : "and it can't make opportunity attacks against the Gallimimus this turn"
	}],
	traits : [{
		name : "Light Frame",
		description : "The Gallimimus is considered Medium for determining carrying capacity and targets it can Grapple."
	}, {
		name : "Pack Tactics",
		description : "The Gallimimus has advantage on attack rolls against Hostile targets within 5 feet of a conscious creature that is allied with the Gallimimus."
	}, {
		name : "Skittish",
		description : "The Gallimimus has advantage on Initiative rolls, and Wisdom ability checks that rely on its sight."
	}, {
		name : "Sprinter",
		description : "When the Gallimimus takes the Dash action, its speed bonus is doubled, and opportunity attacks against it have disadvantage until the end of that turn."
	}]
};
CreatureList["hadrosaurus (ll)"] = {
	name : "Hadrosaurus (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 11,
	hp : 37,
	hd : [5, 10],
	speed : "35 ft",
	scores : [17, 10, 15, 2, 9, 3],
	saves : [5, "", "", "", "", ""],
	skills : {
		"perception" : 1
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Slam",
		ability : 1,
		damage : [2, 6, "bludgeoning"],
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
		name : "Herd Defense",
		description : "For each additional Hadrosaurus within 30 ft, the Hadrosaurus gains a +1 bonus to Armor Class, ability checks, and saving throws (maximum +10)."
	}, {
		name : "Trampling Charge",
		description : "If the Hadrosaurus moves at least 20 ft in a line and hits a creature equal to its size (or smaller) with a Slam attack, it falls Prone and the Hadrosaurus can use a bonus action to make a Stomp attack at it."
	}]
};
CreatureList["iguanodon (ll)"] = {
	name : "Iguanodon (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 11,
	hp : 52,
	hd : [7, 10],
	speed : "35 ft",
	scores : [18, 10, 14, 2, 9, 3],
	saves : [6, "", "", "", "", ""],
	skills : {
		"perception" : 1
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Slam",
		ability : 1,
		damage : [2, 6, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Stomp",
		ability : 1,
		damage : [2, 4, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Thumb Spike",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "and it must make a Constitution saving throw (DC 14). On a failure, it takes another 2d8 damage at the start of its next turn"
	}],
	traits : [{
		name : "Herd Defense",
		description : "For each additional Iguanodon within 30 ft, the Iguanodon gains a +1 bonus to its Armor Class, ability checks, and saving throws (maximum +10)."
	}, {
		name : "Trampling Charge",
		description : "If the Iguanodon moves at least 20 ft in a line and hits a creature equal to its size (or smaller) with a Slam attack, it falls Prone and the Iguanodon can use a bonus action to make a Stomp attack at it."
	}]
};
CreatureList["plesiosaurus (ll)"] = {
	name : "Plesiosaurus (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 13,
	hp : 51,
	hd : [6, 10],
	speed : "5 ft, swim 40 ft",
	scores : [18, 15, 16, 2, 12, 5],
	saves : [6, "", "", "", "", ""],
	skills : {
		"perception" : 3,
		"stealth" : 4
	},
	senses : "Darkvision 120 ft",
	passivePerception : 13,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [2, 6, "piercing"],
		range : "Melee (10 ft)",
		description : ""
	}],
	traits : [{
		name : "Ambush Strike",
		description : "If the Plesiosaurus hits a creature with its Bite while the target is unaware of the Plesiosaurus, the attack deals a bonus 2d6 damage on hit."
	}, {
		name : "Aquatic Camouflage",
		description : "The Plesiosaurus has advantage on Stealth checks made to Hide while it is underwater."
	}, {
		name : "Hold Breath",
		description : "Plesiosaurus can hold its breath for 1 hour."
	}]
};
CreatureList["pteranodon (ll)"] = {
	name : "Pteranodon (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 13,
	hp : 44,
	hd : [8, 10],
	speed : "10 ft, fly 50 ft",
	scores : [8, 16, 10, 5, 9, 7],
	skills : {
		"acrobatics" : 5,
		"perception" : 1
	},
	senses : "",
	passivePerception : 11,
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 2,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "",
		modifiers : [1, ""]
	}, 	{
		name : "Claw",
		ability : 2,
		damage : [2, 6, "slashing"],
		range : "Melee (5 ft)",
		description : "",
		modifiers : [1, ""]
	}],
	traits : [{
		name : "Hunter's Grasp",
		description : "When the Pteranodon hits a target at least two sizes smaller than it with its Claw attack, it can automatically Grapple the target (escape DC 9)."
	}, {
		name : "Light Frame",
		description : "The Pteranodon is a Medium creature for determining its carrying capacity and Grapple checks."
	}, {
		name : "Swift Wing",
		description : "While the Pteranodon uses its flying speed, opportunity attacks against it have disadvantage."
	}, {
		name : "Swoop",
		description : "When the Pteranodon flies at least 25 ft in a line toward a creature, then hits it with a Beak attack, it deals a bonus 2d6 damage, and it can't target the Pteranodon with opportunity attacks until the Pteranodon's next turn."
	}]
};
CreatureList["parasaurolophus (ll)"] = {
	name : "Parasaurolophus (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 11,
	hp : 52,
	hd : [7, 10],
	speed : "35 ft",
	scores : [18, 12, 18, 2, 9, 3],
	saves : [6, "", "", "", "", ""],
	senses : "",
	passivePerception : 9,
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Slam",
		ability : 1,
		damage : [2, 6, "bludgeoning"],
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
		name : "Herd Defense",
		description : "For each Parasaurolophus within 30 ft, the Parasaurolophus gains a +1 bonus to Armor Class, ability checks, and saving throws (maximum +10)."
	}, {
		name : "Trampling Charge",
		description : "If the Parasaurolophus moves at least 20 ft in a line and hits a creature equal to its size or smaller with its Slam, it falls Prone and Parasaurolophus can use a bonus action to make a Stomp attack at it."
	}],
	actions : [{
		name : "Crest Horn (Recharge 5-6)",
		description : "As an action Parasaurolophus produces blast from its head crest, forcing creatures that can hear it within 30 feet to make a Constitution saving throw (DC 16). On a failure, creatures take 2d8 thunder damage and are Deafened until the end of their next turn. Parasaurolophus are immune to this feature. If they fail by 5 or more, they are also Frightened of all Parasaurolophus they can see for the same duration."
	}]
};
CreatureList["utahraptor (ll)"] = {
	name : "Utahraptor (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 14,
	hp : 51,
	hd : [6, 10],
	speed : "40 ft",
	scores : [16, 18, 16, 5, 14, 7],
	skills : {
		"perception" : 4,
		"stealth" : 6,
		"survival" : 4
	},
	senses : "",
	passivePerception : 14,
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Bite",
		ability : 2,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 2,
		damage : [2, 6, "slashing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Pack Tactics",
		description : "The Utahraptor has advantage on attack rolls against Hostile targets within 5 feet of a conscious creature that is allied with the Utahraptor."
	}, {
		name : "Terrible Claw",
		description : "If Utahraptor hits a creature at least one size larger than it with its Claw, it can Grapple it. Instead of reducing the target's speed, Utahraptor climbs on it, moves with it, and has advantage on attacks against it."
	}, {
		name : "Terror Leap",
		description : "Once per turn, the Utahraptor can expend 5 ft of its movement to long jump up to 25 ft, or high jump to 15 ft, even if this exceeds is remaining speed. If the Utahraptor hits with a Claw immediately after using Terror Leap, it deals a bonus 2d8 damage, and the target must make a Strength saving throw (DC 14) or fall Prone."
	}]
};
CreatureList["styracosaurus (ll)"] = {
	name : "Styracosaurus (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 12,
	hp : 59,
	hd : [7, 10],
	speed : "40 ft",
	scores : [18, 9, 17, 2, 10, 4],
	saves : [6, "", "", "", "", ""],
	senses : "",
	passivePerception : 10,
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Gore",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "and if the creature is equal to the Styracosaurus' size or smaller, its speed is halved until the end of the Styracosaurus' next turn"
	}, 	{
		name : "Stomp",
		ability : 1,
		damage : [2, 6, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Bone Shield",
		description : "At the end of its turn, the Styracosaurus picks which way it will face. Until the end of its next turn, it gains Half Cover against all attacks and effects from that direction."
	}, {
		name : "Herd Defense",
		description : "For each additional Styracosaurus within 30 ft, the Styracosaurus gains a +1 bonus to Armor Class, ability checks, and saving throws (maximum +10)."
	}, {
		name : "Trampling Charge",
		description : "If the Styracosaurus moves at least 20 feet in a line, then hits with its Gore, it deals a bonus 1d8 damage. If its target is equal to the Styracosaurus' size or smaller, the target falls Prone, and the Styracosaurus can use its bonus action to make a Stomp attack against it."
	}, {
		name : "Thick Hide",
		description : "Styracosaurus reduces all damage, other than force, psychic, and radiant by its Constitution mod. (3)."
	}]
};
CreatureList["archelon (ll)"] = {
	name : "Archelon (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 17,
	hp : 85,
	hd : [9, 12],
	speed : "10 ft, swim 40 ft",
	scores : [18, 16, 16, 4, 14, 6],
	saves : [6, "", 5, "", "", ""],
	skills : {
		"insight" : 4,
		"survival" : 4
	},
	senses : "Darkvision 120 ft",
	passivePerception : 12,
	challengeRating : "4",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [3, 6, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Slam",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Charge",
		description : "If the Archelon swims 40 ft in a line then hits a target smaller than it with its Slam attack, that target is Stunned until the start of its next turn. If the target of htis attack is a boat or seafaring vessel that is smaller than the Archelon, it is capsized on hit."
	}, {
		name : "Hold Breath",
		description : "The Archelon can hold its breath for up to 2 hours while it is underwater."
	}, {
		name : "Strong Jaws",
		description : "When the Archelon hits a creature at least one size smaller then it with its Bite, it can Grapple the target in its jaws (escape DC 14). While it is Grappling a creature, it cannot use its Bite attack on other targets."
	}, {
		name : "Thick Hide",
		description : "The Archelon reduces all damage, other than force, psychic, and radiant by its Constitution mod. (3)."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Archelon makes two attacks, using its Bite and Slam attacks in any combination."
	}]
};
CreatureList["pachycephalosaurus (ll)"] = {
	name : "Pachycephalosaurus (LL)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 12,
	hp : 75,
	hd : [10, 8],
	speed : "40 ft",
	scores : [19, 14, 17, 2, 10, 6],
	condition_immunities : "stunned",
	senses : "",
	passivePerception : 10,
	challengeRating : "4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Ram",
		ability : 1,
		damage : [2, 8, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Tail",
		ability : 1,
		damage : [2, 6, "bludgeoning"],
		range : "Melee (10 ft)",
		description : "and a target smaller than Pachycephalosaurus' must make a Strength saving throw (DC 14) or be knocked Prone"
	}],
	traits : [{
		name : "Bone Plate",
		description : "If Pachycephalosaurus moves at least 20 ft in a line, then hits an object or structure with its Ram, its attack deals maximum damage, in place of rolling."
	}, {
		name : "Concussive Charge",
		description : "If the Pachycephalosaurus moves at least 20 ft in a straight line, then hits with a Ram attack, it deals a bonus 3d8 damage, and the target must make a Strength saving throw (DC 14). On a failure, a creature equal to Pachycephalosaurus' size or smaller falls Prone. If a creature fails this saving throw by 5 or more, it is also Stunned until the beginning of its next turn."
	}]
};
CreatureList["quetzalcoatlus (ll)"] = {
	name : "Quetzalcoatlus (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 14,
	hp : 76,
	hd : [9, 12],
	speed : "30 ft, fly 60 ft",
	scores : [15, 18, 14, 5, 12, 9],
	saves : ["", 6, "", "", "", ""],
	skills : {
		"acrobatics" : 6,
		"perception" : 5,
		"survival" : 3
	},
	senses : "",
	passivePerception : 15,
	challengeRating : "4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [	{
		name : "Beak",
		ability : 2,
		damage : [3, 8, "piercing"],
		range : "Melee (10 ft)",
		description : ""
	}],
	traits : [{
		name : "Aerial Predator",
		description : "While it is flying, the Quetzalcoatlus has advantage on Dexterity ability checks and saving throws, and Wisdom ability checks that use its sense of sight"
	}, {
		name : "Hunter's Beak",
		description : "When the Quetzalcoatlus hits a target at least two sizes smaller than it with its Beak attack, it can automatically Grapple the target (escape DC 12)."
	}, {
		name : "Light Frame",
		description : "Quetzalcoatlus counts as a Large creature for determining carrying capacity and Grapple checks."
	}, {
		name : "Swoop",
		description : "If the Quetzalcoatlus flies at least 30 ft in a line, then hits a creature with a Beak attack, it deals a bonus 3d8 damage, and that creature cannot make opportunity attacks against Quetzalcoatlus for the rest of this turn."
	}],
	actions : [{
		name : "Great Wings",
		description : "The Quetzalcoatlus flaps its great wings, forcing creatures in an adjacent 30-foot cone to make a Strength saving throw (DC 14), or be knocked Prone."
	}]
};
CreatureList["stegosaurus (ll)"] = {
	name : "Stegosaurus (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 13,
	hp : 76,
	hd : [8, 12],
	speed : "40 ft",
	scores : [20, 9, 17, 2, 11, 5],
	saves : [7, "", 5, "", "", ""],
	senses : "",
	passivePerception : 10,
	challengeRating : "4",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [	{
		name : "Stomp",
		ability : 1,
		damage : [2, 8, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}, 	{
		name : "Thagomizer",
		ability : 1,
		damage : [3, 8, "piercing"],
		range : "Melee (10 ft)",
		description : "and it must make a Strength saving throw (DC 15). On a failure, its speed is halved until the end of its next turn, and if it is equal to the Stegosaurus' size or smaller, it falls Prone"
	}],
	actions : [{
		name : "Multiattack",
		description : "The Stegosaurus makes two attacks, using its Stomp and Thagomizer in any combination:"
	}]
};
CreatureList["ankylosaurus (ll)"] = {
	name : "Ankylosaurus (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 15,
	hp : 103,
	hd : [9, 12],
	speed : "30 ft",
	scores : [20, 9, 21, 2, 12, 5],
	saves : [8, "", 8, "", "", ""],
	damage_resistances : "bludgeoning, piercing, and slashing",
	senses : "",
	passivePerception : 11,
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Tail Club",
		ability : 1,
		damage : [3, 8, "bludgeoning"],
		range : "Melee (10 ft)",
		description : "and it must make a Strength saving throw (DC 16). On a failure, its speed is halved until the end of its next turn, and if it is equal to the Ankylosaurus' size or smaller, it falls Prone. If it fails by 5 or more, it is also Stunned for the duration"
	}],
	traits : [{
		name : "Exposed",
		description : "While the Ankylosaurus is Prone, it loses both its Damage Resistances and its Thick Hide Trait."
	}, {
		name : "Lumbering",
		description : "Ankylosaurus has disadvantage on Dexterity ability checks and saving throws, and it cannot Dash."
	}, {
		name : "Thick Hide",
		description : "Ankylosaurus reduces all damage, other than force, psychic, and radiant by its Constitution mod. (5)."
	}],
	actions : [{
		name : "Multiattack",
		description : "Ankylosaurus makes two Tail Club attacks."
	}]
};
CreatureList["allosaurus (ll)"] = {
	name : "Allosaurus (LL)",
	source : [["GMB:LL", 0]],
	size : 2,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 14,
	hp : 102,
	hd : [12, 10],
	speed : "60 ft",
	scores : [19, 18, 17, 2, 12, 5],
	skills : {
		"perception" : 3,
		"survival" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [2, 8, "piercing"],
		range : "Melee (10 ft)",
		description : ""
	}, 	{
		name : "Claw",
		ability : 1,
		damage : [1, 8, "piercing"],
		range : "Melee (10 ft)",
		description : ""
	}],
	traits : [{
		name : "Blood Sense",
		description : "Allosaurus has advantage on ability checks to track creatures below their hit point maximum."
	}, {
		name : "Pounce",
		description : "If the Allosaurus moves 20 ft in a line, then hits a target equal to its size (or smaller) with its Claw attack, its target is knocked Prone and the Allosaurus can then use its bonus action to make one Bite attack against it."
	}, {
		name : "Serrated Jaws",
		description : "When the Allosaurus hits a creature equal to its size (or smaller) with its Bite attack, it can Grapple the target in its jaws (escape DC 15). While Grappling a creature, it cannot use its Bite attack on other targets. Each time a creature attempts to escape this Grapple, it takes 1d8 slashing damage, even on a successful escape."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Allosaurus makes two attacks, using its Bite and Claw in any combination:"
	}]
};
CreatureList["brontosaurus (ll)"] = {
	name : "Brontosaurus (LL)",
	source : [["GMB:LL", 0]],
	size : 0,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 12,
	hp : 112,
	hd : [7, 20],
	speed : "30 ft",
	scores : [21, 9, 21, 2, 10, 5],
	saves : [8, "", 8, "", "", ""],
	skills : {
		"perception" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 1,
	attacks : [	{
		name : "Tail Slam",
		ability : 1,
		damage : [6, 8, "bludgeoning"],
		range : "Melee (15 ft)",
		description : "and if it is smaller than the Brontosaurus, it must make a Strength saving throw (DC 16) or be Stunned until the end of its next turn"
	}],
	traits : [{
		name : "Lofty Sight",
		description : "The Brontosaurus has advantage on all Wisdom ability checks that rely on its sight while it stands upright."
	}, {
		name : "Lumbering",
		description : "Brontosaurus has disadvantage on Dexterity ability checks and saving throws, and it cannot Dash."
	}, {
		name : "Thick Hide",
		description : "The Brontosaurus reduces all damage, other than force, psychic, and radiant by its Constitution modifier (5)."
	}],
	actions : [{
		name : "Titanic Stomp",
		description : "The Brontosaurus rears up and slams its front legs into the earth, forcing all creatures within 5 ft to make a Strength saving throw (DC 16). Targets in the Brontosaurus' space have disadvantage on this saving throw. Creatures take 4d10 bludgeoning damage on a failed save, and half as much bludgeoning damage on a success. The area affected by this feature, including the Brontosaurus' space, becomes difficult terrain for all creatures smaller than the Brontosaurus until it is cleared."
	}, {
		name : "Tail Sweep",
		description : "The Brontosaurus forces creatures in an adjacent 15-foot cone to make a Strength saving throw (DC 16). On a failure, they take 4d10 bludgeoning damage, and if they are smaller than the Brontosaurus they are knocked Prone. On a success, they take half damage and do not fall Prone."
	}]
};
CreatureList["elasmosaurus (ll)"] = {
	name : "Elasmosaurus (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 13,
	hp : 126,
	hd : [12, 12],
	speed : "5 ft, swim 40 ft",
	scores : [23, 16, 19, 3, 13, 5],
	saves : [9, "", "", "", "", ""],
	skills : {
		"perception" : 4,
		"stealth" : 6
	},
	senses : "Darkvision 120 ft",
	passivePerception : 14,
	challengeRating : "6",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [3, 8, "piercing"],
		range : "Melee (15 ft)",
		description : ""
	}],
	traits : [{
		name : "Ambush Strike",
		description : "If the Elasmosaurus hits a creature with its Bite while the target is unaware of the Elasmosaurus, the attack deals a bonus 2d8 damage on hit."
	}, {
		name : "Aquatic Camouflage",
		description : "The Elasmosaurus has advantage on Stealth checks it makes to Hide while it is underwater."
	}, {
		name : "Blood Sense",
		description : "The Elasmosaurus knows the direction of any creature with less than its maximum hit points within 1 mile, so long as they are in the same body of water."
	}, {
		name : "Hold Breath",
		description : "The Elasmosaurus can hold its breath for up to 2 hours while it is underwater."
	}, {
		name : "Serrated Jaws",
		description : "If the Elasmosaurus hits a creature at least one size smaller than it with its Bite attack, it can Grapple the target in its jaws (escape DC 16). While Grappling a creature, it cannot use its Bite attack on other targets. Each time a creature attempts to escape this Grapple, it takes 1d8 slashing damage, even on a successful escape."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Elasmosaurus makes two Bite attacks."
	}]
};
CreatureList["triceratops (ll)"] = {
	name : "Triceratops (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 14,
	hp : 126,
	hd : [11, 12],
	speed : "50 ft",
	scores : [24, 9, 20, 2, 11, 5],
	saves : [10, "", 8, "", "", ""],
	skills : {
		"intimidation" : 10,
		"perception" : 3,
		"survival" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "6",
	proficiencyBonus : 3,
	attacksAction : 1,
	attacks : [	{
		name : "Gore",
		ability : 1,
		damage : [4, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "and it must make a Constitution saving throw (DC 18) or its AC is reduced by 2 and its speed is halved until the end of its next turn"
	}, 	{
		name : "Stomp",
		ability : 1,
		damage : [3, 10, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "Bone Shield",
		description : "At the end of its turn, Triceratops chooses which way it will face. Until the end of its next turn, it has Half Cover against attacks and effects in that direction."
	}, {
		name : "Herd Defense",
		description : "For each additional Triceratops within 30 ft, the Triceratops gains a +1 bonus to its Armor Class, ability checks, and saving throws (maximum +10)."
	}, {
		name : "Imposing Presence",
		description : "The Triceratops uses its Strength, in place of Charisma, for Intimidation checks (see above)."
	}, {
		name : "Trampling Charge",
		description : "If the Triceratops moves at least 20 feet in a line, then hits with its Gore, it deals a bonus 2d8 damage. If the creature is equal to the Triceratops' size or smaller, the target falls Prone, and the Triceratops can use its bonus action to make a Stomp attack against it."
	}, {
		name : "Thick Hide",
		description : "Triceratops reduces all damage, other than force, psychic, and radiant by its Constitution mod. (5)."
	}]
};
CreatureList["diplodocus (ll)"] = {
	name : "Diplodocus (LL)",
	source : [["GMB:LL", 0]],
	size : 0,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 13,
	hp : 144,
	hd : [9, 20],
	speed : "40 ft",
	scores : [23, 8, 19, 2, 11, 5],
	saves : [9, "", 8, "", "", ""],
	skills : {
		"perception" : 3
	},
	senses : "",
	passivePerception : 13,
	challengeRating : "7",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Tail Whip",
		ability : 1,
		damage : [5, 8, "slashing"],
		range : "Melee (20 ft)",
		description : "and if it is Huge or smaller, it must make a Strength saving throw (DC 17) or be Stunned until the end of its next turn"
	}],
	traits : [{
		name : "Lofty Sight",
		description : "The Diplodocus has advantage on Wisdom ability checks that rely on its sight while it stands upright."
	}, {
		name : "Lumbering",
		description : "Diplodocus has disadvantage on Dexterity ability checks and saving throws, and it cannot Dash."
	}, {
		name : "Thick Hide",
		description : "Diplodocus reduces all damage, other than force, psychic, and radiant by its Constitution mod. (6)."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Diplodocus makes two attacks; two with its Whip Tail, or one with Whip Tail then uses Tail Sweep."
	}, {
		name : "Tail Sweep",
		description : "Diplodocus forces creatures in an adjacent 20-foot cone to make a Dexterity saving throw (DC 17). On a failure, they take 6d10 bludgeoning damage, and if they are Huge or smaller they are knocked Prone. On a success, they take half damage and do not fall Prone."
	}]
};
CreatureList["mosasaurus (ll)"] = {
	name : "Mosasaurus (LL)",
	source : [["GMB:LL", 0]],
	size : 0,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 16,
	hp : 170,
	hd : [12, 20],
	speed : "0 ft, swim 60 ft",
	scores : [24, 13, 19, 2, 12, 7],
	saves : [10, 4, "", "", "", ""],
	skills : {
		"perception" : 4
	},
	senses : "Darkvision 120 ft",
	passivePerception : 14,
	challengeRating : "8",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [5, 10, "piercing"],
		range : "Melee (5 ft)",
		description : "and if the target is two sizes smaller than the Mosasaurus (or smaller), it must succeed on a Dexterity saving throw (DC 18) or be Swallowed"
	}, 	{
		name : "Tail",
		ability : 1,
		damage : [4, 8, "bludgeoning"],
		range : "Melee (15 ft)",
		description : "and if it is one size smaller than the Mosasaurus (or smaller) it is knocked Prone if it is a creature, or capsized if it is a seafaring vessel"
	}],
	traits : [{
		name : "Aquatic Camouflage",
		description : "The Mosasaurus has advantage on Stealth checks it makes to Hide while it is underwater."
	}, {
		name : "Hold Breath",
		description : "The Mosasaurus can hold its breath for 1 hour."
	}, {
		name : "Siege Monster",
		description : "The Mosasaurus's attacks deal the maximum possible damage, in place of rolling, to objects and boats."
	}, {
		name : "Thick Hide",
		description : "The Mosasaurus reduces all damage, other than force, psychic, and radiant by its Constitution modifier (4)."
	}, {
		name : "Swallow",
		description : "Any creature that is Swallowed by the Mosasaurus is Blinded and Restrained, it has total cover from all outside attacks and effects, and it takes (3d6) acid damage at the start of each of the Mosasaurus' turns. At the start of each of its turns, the Mosasaurus must make a Constitution saving throw (DC is the total damage it has taken since its previous turn) or Swallowed creatures land Prone in an unoccupied space within 5 ft of it."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Mosasaurus makes two attacks; one with its Bite and one with its Tail, or two attacks with its Tail. It cannot attack the same target with both a Bite and Tail attack."
	}]
};
CreatureList["spinosaurus (ll)"] = {
	name : "Spinosaurus (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 13,
	hp : 133,
	hd : [14, 12],
	speed : "40 ft, swim 40 ft",
	scores : [22, 12, 17, 2, 12, 9],
	saves : ["", 4, "", "", 5, ""],
	skills : {
		"intimidation" : 9,
		"perception" : 5,
		"stealth" : 4
	},
	senses : "",
	passivePerception : 15,
	challengeRating : "8",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [4, 12, "piercing"],
		range : "Melee (10 ft)",
		description : ""
	}, 	{
		name : "Tail",
		ability : 1,
		damage : [4, 8, "bludgeoning"],
		range : "Melee (15 ft)",
		description : "and if the target is equal to its size or smaller, it is knocked Prone"
	}],
	traits : [{
		name : "Aquatic Camouflage",
		description : "The Spinosaurus has advantage on Stealth checks it makes to Hide while it is underwater."
	}, {
		name : "Hold Breath",
		description : "Spinosaurus can hold its breath for 30 minutes."
	}, {
		name : "Imposing Presence",
		description : "The Spinosaurus uses its Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Thick Hide",
		description : "The Spinosaurus reduces all damage, other than force, psychic, and radiant by its Constitution modifier (3)."
	}, {
		name : "Serrated Jaws",
		description : "When the Spinosaurus hits a creature equal to its size (or smaller) with its Bite, it can Grapple the target in its jaws (escape DC 17). While Grappling a creature in this way, Spinosaurus cannot Bite other targets. Each time a creature attempts to escape this Grapple, it takes 2d6 slashing damage, even on a successful escape."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Spinosaurus makes two attacks: one with its Bite and one with its Tail, but not against the same target."
	}]
};
CreatureList["titanosaurus (ll)"] = {
	name : "Titanosaurus (LL)",
	source : [["GMB:LL", 0]],
	size : 0,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 14,
	hp : 144,
	hd : [8, 20],
	speed : "50 ft",
	scores : [24, 7, 25, 2, 14, 8],
	saves : [11, "", 11, "", 6, ""],
	skills : {
		"insight" : 6,
		"perception" : 6,
		"survival" : 5
	},
	damage_resistances : "bludgeoning, piercing, and slashing",
	condition_immunities : "paralyzed, prone, restrained, stunned",
	senses : "",
	passivePerception : 16,
	challengeRating : "9",
	proficiencyBonus : 4,
	attacksAction : 1,
	attacks : [],
	traits : [{
		name : "Lofty Sight",
		description : "The Titanosaurus has advantage on all Wisdom ability checks that rely on its sight while it stands upright."
	}, {
		name : "Lumbering",
		description : "Titanosaurus has disadvantage on all Dexterity ability checks and saving throws, and it cannot Dash."
	}, {
		name : "Siege Monster",
		description : "Titanosaurus deals the maximum amount of damage, instead of rolling, to all objects and structures."
	}, {
		name : "Thick Hide",
		description : "Titanosaurus reduces all damage, other than force, psychic, and radiant by its Constitution modifier (7)."
	}, {
		name : "Titanic Weight",
		description : "Any space the Titanosaurus moves through becomes difficult terrain for all creatures smaller than Huge."
	}],
	actions : [{
		name : "Titanic Stomp",
		description : "The Titanosaurus rears up and slams its front legs into the earth, forcing all creatures within 15 ft to make a Strength saving throw (DC 19). Targets in the Titanosaurus' space have disadvantage on this saving throw. Creatures take 8d10 bludgeoning damage on a failed save, and half as much bludgeoning damage on a success. The area affected by this feature, including the Titanosaurus' space, becomes difficult terrain for all creatures smaller than the Titanosaurus until it is cleared."
	}, {
		name : "Tail Slam",
		description : "The Titanosaurus slams its tail down, forcing everything in an adjacent 10-foot wide, 30-foot long line to make a Dexterity saving throw (DC 19). On a failure, targets take 9d10 bludgeoning damage, and if Huge or smaller, they fall Prone and are Stunned until the end of their next turn. On a success, they take half damage and suffer no other effects."
	}, {
		name : "Tail Sweep",
		description : "The Titanosaurus forces creatures in an adjacent 20-foot cone to make a Strength saving throw (DC 19). On a failure, they take 8d10 bludgeoning damage, and if they are smaller than the Titanosaurus they are knocked Prone. On a success, they take half damage and do not fall Prone."
	}]
};
CreatureList["tyrannosaurus rex (ll)"] = {
	name : "Tyrannosaurus Rex (LL)",
	source : [["GMB:LL", 0]],
	size : 1,
	type : "Beast",
	subtype : "ancient",
	alignment : "Neutral",
	ac : 13,
	hp : 146,
	hd : [14, 12],
	speed : "50 ft",
	scores : [25, 10, 19, 2, 12, 9],
	saves : [11, "", "", "", 5, ""],
	skills : {
		"intimidation" : 11,
		"perception" : 5
	},
	senses : "",
	passivePerception : 15,
	challengeRating : "9",
	proficiencyBonus : 4,
	attacksAction : 2,
	attacks : [	{
		name : "Bite",
		ability : 1,
		damage : [4, 12, "piercing"],
		range : "Melee (10 ft)",
		description : ""
	}, 	{
		name : "Tail",
		ability : 1,
		damage : [4, 8, "bludgeoning"],
		range : "Melee (15 ft)",
		description : "and if the target is equal to its size or smaller, it is knocked Prone"
	}],
	traits : [{
		name : "Imposing Presence",
		description : "The Tyrannosaurus uses its Strength, in place of Charisma, for Intimidation checks (included above)."
	}, {
		name : "Swallow",
		description : "If the Tyrannosaurus hits a creature it is Grappling that is at least two sized smaller than it with its Bite, it can Swallow it. A swallowed creature is Restrained and Blinded, it has total cover from all attacks and other effects outside the Tyrannosaurus, and it takes (4d6) acid damage at the start of each of the Tyrannosaurus' turns. At the start of each of its turns, the Tyrannosaurus must make a Constitution saving throw (DC is the damage it has taken since the end of its last turn) or the swallowed creature lands Prone in an unoccupied space within 5 ft"
	}, {
		name : "Strong Jaws",
		description : "When the Tyrannosaurus hits a creature equal to its size (or smaller) with its Bite, it can Grapple the target in its jaws (escape DC 19). While Grappling a creature this way, it cannot use its Bite attack on other targets."
	}, {
		name : "Thick Hide",
		description : "Tyrannosaurus reduces all damage, other than force, psychic, and radiant by its Constitution modifier (4)."
	}],
	actions : [{
		name : "Multiattack",
		description : "The Tyrannosaurus makes two attacks: one with its Bite and one with its Tail, but not against the same target."
	}, {
		name : "Tyrant's Roar (Recharge 4-6)",
		description : "The Tyrannosaurus Rex forces all Hostile creatures that can hear it within 120 ft to make a Wisdom saving throw (DC 19), or they are Frightened of the Tyrannosaurus for 1 minute. They repeat the saving throw at the end of each of their turns, ending the effect on a success. Creatures that succeed on this saving throw are immune to the Tyrannosaurus' Tyrant's Roar for the next 24 hours."
	}]
};
