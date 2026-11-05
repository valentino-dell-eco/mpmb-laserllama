/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	REQUIRES: "Laserllama Common Attributes 20261019.js" (import it first).
	Do not import the old LaserLlama files in the same sheet.

	-INFORMATION-
	Content:	Alternate Artificer, Blood Hunter, Paladin, Ranger (with their Expanded options)
	Files:		LaserLlama - Alternate Artificer v3.1.1.js
			LaserLlama - Alternate Blood Hunter v2.2.0.js
			LaserLlama - Alternate Paladin v3.0.0.js
			LaserLlama - Alternate Ranger v4.4.4.js
	Sheet:		v13.2.3
	Code by:	"ll-updates" release
*/

var iFileName = "Laserllama Alternate Half Casters.js";
RequiredSheetVersion("13.2.3");

// This file needs "Laserllama Common Attributes 20261019.js": stop with a clear message if it isn't loaded yet
if (typeof LLCommonAttributesVersion === "undefined") {
	throw new Error("\n\nATTENZIONE / WARNING\n\nPer usare \"Laserllama Alternate Half Casters.js\" devi prima importare \"Laserllama Common Attributes 20261019.js\". Importa quel file e poi importa di nuovo questo.\n\nTo use this file, first import \"Laserllama Common Attributes 20261019.js\", then import this file again.\n");
}

// ======================================================================
// LaserLlama - Alternate Artificer v3.1.1.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Alternate Artificer" (with Expanded options)
	Effect:		This script adds the Alternate Artificer class, its 18 Specializations, the Infusions and the Inventive Adept feat.
				Alternate Artificer v3.1.1 and Alternate Artificer Expanded v3.1.1 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	Original script by Valentino dell'Eco; updated to v3.1.1 in the "ll-updates" release (2026/10/19)
	How to use:	Write "Artificer (LaserLlama)" in the Class field (e.g. "Battle Smith Artificer (LaserLlama)")
				Infusions are chosen with the "Choose Feature" button of the Infusions feature; their full text goes to the Notes page.
*/


if (typeof LLSpellList !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

if (ClassList["artificer"]) ClassList["artificer"].regExpSearch = /^(?=.*artificer)(?!.*laserllama).*$/i;
LLArtLvl = function () { return classes.known["artificer(laserllama)"] ? classes.known["artificer(laserllama)"].level : 0; };

// Artificer (LaserLlama) spell list
var LLArtificerSpells = [
	"acid splash", "booming blade", "create bonfire", "fire bolt", "frostbite", "green-flame blade", "light", "lightning lure", "mage hand", "poison spray", "prestidigitation", "ray of frost", "shocking grasp", "tempestuous blade", "thorn whip", "thunderclap",
	"absorb elements", "alarm", "catapult", "caustic brew", "color spray", "cure wounds", "disguise self", "ensnaring strike", "expeditious retreat", "faerie fire", "false life", "feather fall", "fog cloud", "grease", "heroism", "identify", "jump", "magic missile", "sleep", "witch bolt",
	"aid", "arcane lock", "blur", "continual flame", "cordon of arrows", "darkvision", "earthbind", "enhance ability", "enlarge/reduce", "heat metal", "invisibility", "levitate", "magic mouth", "magic weapon", "pyrotechnics", "restoration", "lesser restoration", "rope trick", "see invisibility", "skywrite", "spider climb", "web",
	"blink", "catnap", "create food and water", "daylight", "dispel magic", "elemental weapon", "flame arrows", "fly", "glyph of warding", "haste", "intellect fortress", "life transference", "lightning arrow", "protection from energy", "revivify", "sending", "slow", "tiny servant", "water breathing",
	"arcane eye", "dimension door", "elemental bane", "fabricate", "faithful hound", "freedom of movement", "greater invisibility", "resilient sphere", "secret chest", "stone shape", "summon construct",
	"animate objects", "arcane hand", "awaken", "creation", "far step", "greater restoration", "passwall", "skill empowerment", "transmute rock", "wall of light", "wall of stone"
];
LLAddSpellsToClass("artificer(laserllama)", LLArtificerSpells);

/*	Infusions: [key, name, item, artificer level, description (short), extra attributes]
	"+1/+2" style bonuses are noted in the text; the sheet doesn't apply them automatically (the item is not on the sheet)
*/
var LLInfusionData = [
	["arm launcher", "Arm Launcher", "glove or gauntlet", 0, "Action: load up to 5 Tiny objects (ball bearings, caltrops, acid, alchemist's fire, oil, holy water); bonus action: fire one as a ranged weapon attack (20 ft)"],
	["enhanced arcane focus", "Enhanced Arcane Focus", "arcane focus (attunement)", 0, "+1 to spell attacks (+2 at 11th, +3 at 17th); ignores half cover for spell attacks"],
	["enhanced defense", "Enhanced Defense", "armor or shield", 0, "+1 AC while worn/wielded (+2 at 11th, +3 at 17th)"],
	["enhanced weapon", "Enhanced Weapon", "simple or martial weapon", 0, "+1 to attack and damage rolls (+2 at 11th, +3 at 17th)"],
	["featherweight belt", "Featherweight Belt", "belt or cloak (attunement)", 0, "Wearer weighs one-tenth (one-hundredth at 11th) without losing physical abilities"],
	["featherweight weapon", "Featherweight Weapon", "simple or martial melee weapon (attunement)", 0, "Loses heavy and two-handed (or gains light if it had neither); +1 attack/damage at 11th (+2 at 17th)"],
	["goggles of clearsight", "Goggles of Clearsight", "helm, goggles, or glasses", 0, "See normally through obscurement and darkness (magical too) within 120 ft; no Sunlight Sensitivity; adv. on saves vs. blinded"],
	["lightning cannon", "Lightning Cannon", "gauntlet, arcane focus, or metal rod", 0, "In place of an attack: ranged spell attack (my Int) within 60 ft, 2d6 lightning damage"],
	["power whip", "Power Whip", "whip or chain", 0, "Damage die d10; once per turn on a hit vs. Large or smaller: Dex save or prone; +1 attack/damage at 11th (+2 at 17th)"],
	["repeating shot", "Repeating Shot", "ranged weapon (attunement)", 0, "Ignores loading; creates its own magic ammunition; +1 attack/damage at 11th (+2 at 17th)"],
	["returning weapon", "Returning Weapon", "weapon with the thrown property", 0, "Returns to the wielder's hand after a thrown attack; +1 attack/damage at 11th (+2 at 17th)"],
	["gem of warding", "Gem of Warding", "gem worth 100 gp", 5, "Action, 1 Charge: throw it 30 ft, it hovers 1 min (HP = my level, AC = my Int score); bonus action: move 20 ft or pulse temp HP = my Int mod to creatures within 10 ft; Charges = Int mod/dawn"],
	["homing weapon", "Homing Weapon", "ranged or thrown weapon", 5, "No disadv. at long range; +1 attack/damage at 11th (+2 at 17th)"],
	["homunculus servant", "Homunculus Servant", "gem worth 100 gp", 5, "I create a Homunculus Servant (see Companion page); it acts on my turn (Dodge unless I command it with a bonus action)", { creaturesAdd : [["Homunculus Servant (LL)"]] }],
	["immovable boots", "Immovable Boots", "boots (attunement)", 5, "Action: fix itself in place on a flat surface (even defying gravity); DC 30 Str check to move it"],
	["infiltrator armor", "Infiltrator Armor", "suit of armor (attunement)", 5, "Formfitting, wearable undetected under clothes; adv. on Stealth; +1 AC at 11th (+2 at 17th)"],
	["light blade", "Light Blade", "sword hilt or arcane focus (attunement)", 5, "Bonus action: radiant blade (simple, finesse, 1d8 radiant), 15-ft bright light; +1 attack/damage at 11th (+2 at 17th)"],
	["mind sharpener", "Mind Sharpener", "helmet, diadem, armor, or robes", 5, "When the wearer fails a concentration save, reaction + 1 Charge to succeed; Charges = my Int mod/dawn"],
	["minor arcane item", "Minor Arcane Item", "Tiny object, tool, or arcane focus (attunement)", 5, "Holds a 1st-level Artificer spell I know; 1 Charge to cast it with my ability; Charges = my Int mod/dawn"],
	["radiant weapon", "Radiant Weapon", "melee weapon (attunement)", 5, "Bonus action: 30-ft bright light; on a hit, 1 Charge: Con save or blinded until its next turn; Charges = Int mod/dawn; +1 attack/damage at 11th (+2 at 17th)"],
	["repulsion gauntlets", "Repulsion Gauntlets", "gloves or gauntlets (attunement)", 5, "On an unarmed/gauntlet hit, 1 Charge: Str save (adv. if Large+) or pushed 15 ft; Charges = Int mod/dawn; +1 attack/damage at 11th (+2 at 17th)"],
	["repulsion shield", "Repulsion Shield", "shield (attunement)", 5, "When hit by a melee attack, 1 Charge: Str save (adv. if Large+) or attacker pushed 15 ft and prone; Charges = Int mod/dawn; +1 AC at 11th (+2 at 17th)"],
	["armor of strength", "Armor of Strength", "suit of armor (attunement)", 11, "+1 AC (+2 at 17th); wearer uses Int for Str checks and saves; 1 Charge to not be moved or knocked prone; Charges = my Int mod/dawn"],
	["chameleon armor", "Chameleon Armor", "suit of armor (attunement)", 11, "+1 AC (+2 at 17th); action: disguise self (1 Charge), invisibility (2), greater invisibility (4) on itself; Charges = my Int mod/dawn"],
	["elemental armor", "Elemental Armor", "suit of armor (attunement)", 11, "+1 AC (+2 at 17th); resistance to acid, cold, fire, lightning, necrotic, poison, radiant, or thunder (psychic or force at 17th)"],
	["elemental ring", "Elemental Ring", "ring (attunement)", 11, "Once per dawn: maximize the chosen element damage vs. one target of a spell of 3rd level or lower (5th at 17th)"],
	["elemental weapon (infusion)", "Elemental Weapon (Infusion)", "melee weapon (attunement)", 11, "Command word: +1d6 damage of the chosen element (acid, cold, fire, poison, or lightning); 2d6 at 17th"],
	["greater arcane item", "Greater Arcane Item", "Tiny object, tool, or arcane focus (attunement)", 11, "Holds a 2nd-level Artificer spell I know; 1 Charge to cast it with my ability; Charges = my Int mod/dawn"],
	["helm of awareness", "Helm of Awareness", "helmet or diadem (attunement)", 11, "The wearer can't be surprised unless incapacitated and adds my Int mod (min +1) to initiative"],
	["voyager boots", "Voyager Boots", "boots (attunement)", 11, "Bonus action: teleport 15 ft (30 ft at 17th) to a space the wearer can see"],
	["guardian gauntlets", "Guardian Gauntlets", "gauntlets (attunement)", 17, "Reaction when a creature ends its turn within 30 ft, 1 Charge: Str save (adv. if Huge+) or pulled 30 ft; if within 5 ft, one melee attack; Charges = Int mod/dawn"],
	["masterwork arcane item", "Masterwork Arcane Item", "Tiny object, tool, or arcane focus (attunement)", 17, "Holds a 3rd-level Artificer spell I know; 1 Charge to cast it with my ability; Charges = my Int mod/dawn"],
	["masterwork homunculus", "Masterwork Homunculus", "-", 17, "I learn clone (no slot needed if I have the components); the clone matures in 12 days; only one", {
		spellcastingBonus : [{ name : "Masterwork Homunculus", spells : ["clone"], selection : ["clone"], firstCol : "markedbox" }]
	}],
	["mind shield", "Mind Shield", "helmet or diadem (attunement)", 17, "Resistance to psychic; immune to charmed, frightened, thought reading; can't be targeted by telepathy unless willing"],
	// Expanded
	["adjustable tool set", "Adjustable Tool Set", "artisan's or tinker's tools", 0, "The wielder is proficient with it; action: transform into another artisan's tool set; +1 to checks at 11th (+2 at 17th)"],
	["artificial limb", "Artificial Limb", "humanoid-shaped prosthetic limb", 0, "Covers or replaces a limb; bonus action: extend or retract it up to 10 ft"],
	["belt of utility", "Belt of Utility", "belt or vest with ten pockets", 0, "Ten pockets for Tiny objects; as an action, bonus action, or part of an attack, summon one into a hand and use it"],
	["enhanced instrument", "Enhanced Instrument", "musical instrument (attunement)", 0, "Proficient, usable as a focus; +my Int mod (min +1) to checks with it; +1 spell save DC at 11th (+2 at 17th)"],
	["ring of knowledge", "Ring of Knowledge", "ring (attunement)", 0, "The wearer is proficient in a skill, tool, or weapon I'm proficient with, or knows one language I know"],
	["thought blade", "Thought Blade", "silvered melee weapon (attunement)", 0, "The wielder can use Int for attack and damage rolls; +1 attack/damage at 11th (+2 at 17th)"],
	["wondrous translator", "Wondrous Translator", "ring, diadem, or necklace (attunement)", 0, "The wearer understands any spoken language (no attunement from 5th level; can speak them at 11th)"],
	["wondrous whip", "Wondrous Whip", "whip, gauntlet, or weaver's tools", 0, "Cast thorn whip (my Int); can deal 0 damage to pull a smaller target 30 ft, catch objects, or pull itself to a larger one; +1 attack/damage at 11th (+2 at 17th)"],
	["many-handed pouch", "Many-Handed Pouch", "four Tiny pouches", 5, "All pouches share one interdimensional space (within 100 miles of each other)"],
	["ring of potential", "Ring of Potential", "ring (attunement)", 5, "Bonus action: spend Charges to regain a spell slot of that level; 3 Charges/dawn"],
	["skittering servant", "Skittering Servant", "mechanical components worth 100 gp", 5, "Tiny arachnoid construct holding one object; action, 1 Charge: throw it 30 ft; bonus action: move 20 ft (walls, ceilings) and use the object; HP = my level, AC = my Int score; 1 min; Charges = Int mod/dawn"],
	["skyfall harness", "Skyfall Harness", "cloak, vest, or harness", 5, "Subtract 100 ft from falls; glide 2 ft horizontally per 1 ft fallen (after 10 ft)"],
	["wildfire cannon", "Wildfire Cannon", "gauntlet, arcane focus, or metal rod", 5, "Action, Charges (my spellcasting): fire bolt (0), burning hands (1), scorching ray (2), fireball (3); Charges = Int mod/dawn"],
	["wall shield", "Wall Shield", "shield (attunement)", 5, "Action: Charges to create that many panels of wall of stone for 1 min (no concentration); Charges = Int mod/dawn; +1 AC at 11th (+2 at 17th)"],
	["war gauntlet", "War Gauntlet", "armored gauntlet + one-handed martial weapon or shield", 5, "The wearer is proficient with the attached item and can't be disarmed of it; +1 AC at 11th (+2 at 17th)"],
	["collar of taming", "Collar of Taming", "metal circlet or collar (attunement)", 11, "A beast of CR up to my Int mod wearing it obeys the attuned creature completely (acts on my turn; monstrosities at 17th)"],
	["elemental prism", "Elemental Prism", "diamond (50 gp) + arcane focus", 11, "Damaging spells can deal acid, cold, fire, lightning, poison, or thunder instead; +1 spell attack and save DC at 17th"],
	["levitating weapon", "Levitating Weapon", "one-handed melee weapon (attunement)", 11, "Bonus action, 1 Charge: it hovers and attacks with my Int for 1 min; the wielder attacks with it as a bonus action each turn; Charges = Int mod/dawn"],
	["metamorphosis armor", "Metamorphosis Armor", "suit of armor (attunement)", 11, "Bonus action, 1 Charge: enlarge/reduce on itself (no concentration); 2 Charges for two sizes at 17th; Charges = Int mod/dawn"],
	["vampiric weapon", "Vampiric Weapon", "melee weapon (attunement)", 11, "+1d6 necrotic on a hit (2d6 at 17th) and temp HP equal to half of it (not vs. undead or constructs)"],
	["astral cannon", "Astral Cannon", "gauntlet, arcane focus, or metal rod", 17, "In place of an attack: ranged spell attack within 60 ft, 2d10 force; action, 1 Charge: portal between two surfaces within 60 ft for 1 min; Charges = Int mod/dawn"],
	["boots of destruction", "Boots of Destruction", "boots (attunement)", 17, "Can't be knocked prone or moved against its will; cast destructive wave once per dawn without a slot"],
	["mystic armament", "Mystic Armament", "melee weapon (attunement)", 17, "Crits on 18-20, usable as a focus; cast steel wind strike once per dawn without a slot"],
	["mystic shot", "Mystic Shot", "ranged weapon (attunement)", 17, "Its damage can be force, usable as a focus; cast swift quiver once per dawn without a slot"]
];
LLInfusions = {};
for (var iI = 0; iI < LLInfusionData.length; iI++) {
	(function (a) {
		var o = {
			name : a[1],
			source : [["GMB:LL", 0]],
			description : "",
			toNotesPage : [{
				name : a[1] + " Infusion",
				note : LLdesc(["Item: " + a[2], a[4]]),
				amendTo : "Infusions Known"
			}],
			infLevel : a[3]
		};
		if (a[3]) {
			o.prerequisite = a[3] + "th-level Artificer";
			o.submenu = "[artificer level " + (a[3] < 10 ? " " : "") + a[3] + "+]";
			o.prereqeval = function (v) { return LLArtLvl() >= a[3]; };
		}
		if (a[5]) { for (var att in a[5]) o[att] = a[5][att]; }
		LLInfusions[a[0]] = o;
	})(LLInfusionData[iI]);
}
LLInfusionChoices = function (oFea, aExclude) {
	var aKeys = [];
	for (var s in LLInfusions) { if (!aExclude || aExclude.indexOf(s) === -1) aKeys.push(s); }
	aKeys.sort(function (a, b) { return (LLInfusions[a].infLevel - LLInfusions[b].infLevel) || (a > b ? 1 : -1); });
	for (var i = 0; i < aKeys.length; i++) {
		var oI = LLInfusions[aKeys[i]];
		var oNew = {};
		for (var att in oI) { if (att !== "infLevel") oNew[att] = oI[att]; }
		oFea.extrachoices.push(oI.name);
		oFea[oI.name.toLowerCase()] = oNew;
	}
	return oFea;
};

// Homunculus Servant (Infusion, also used by the Biomancer)
CreatureList["homunculus servant (ll)"] = {
	name : "Homunculus Servant (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Construct",
	alignment : "Neutral",
	ac : "11+Prof",
	hp : 3,
	hd : [1, 4],
	hdLinked : ["artificer(laserllama)"],
	minlevelLinked : ["artificer(laserllama)"],
	speed : "20 ft, fly 30 ft",
	scores : [4, 15, 12, 10, 10, 7],
	senses : "Darkvision 60 ft",
	passivePerception : 10,
	languages : "understands the languages of its creator",
	challengeRating : "0",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	attacksAction : 1,
	attacks : [{
		name : "Acidic Spittle",
		ability : 4,
		damage : [2, 4, "acid"],
		modifiers : ["oInt", "Prof"],
		range : "30 ft",
		description : "Ranged or melee spell attack; uses its creator's Int mod for the attack",
		abilitytodamage : false,
		useSpellMod : "artificer(laserllama)"
	}],
	traits : [{
		name : "Arcane Conduit",
		description : "When within 120 ft of its creator, the creator can cast an Artificer spell with a range of touch through the Homunculus."
	}, {
		name : "Evasion",
		description : "Dex saves for half damage: no damage on a success, half on a failure."
	}, {
		name : "Hit Dice & Might of the Master",
		description : "It has d4 Hit Dice equal to its creator's Artificer level and benefits from rests. It adds its creator's PB to its ability checks and saving throws."
	}],
	calcChanges : {
		hp : function (totalHD, HDobj, prefix) {
			if (!classes.known["artificer(laserllama)"]) return;
			var lvl = classes.known["artificer(laserllama)"].level;
			HDobj.alt.push(1 + 2 * lvl);
			HDobj.altStr.push(" = 1 as a base\n + 2 \xD7 " + lvl + " from twice its creator's artificer level (" + (2 * lvl) + ")");
		},
		setAltHp : true
	}
};

ClassList["artificer(laserllama)"] = {
	name : "Artificer (LaserLlama)",
	regExpSearch : /^(?=.*artificer)(?=.*laserllama).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Intelligence",
	prereqs : "Intelligence 13",
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Con", "Int"],
	abilitySave : 4,
	spellcastingFactor : "artificerll1",
	spellcastingTable : [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0, 0, 0, 0], [4, 2, 0, 0, 0, 0, 0, 0, 0],
		[4, 2, 0, 0, 0, 0, 0, 0, 0], [4, 3, 0, 0, 0, 0, 0, 0, 0], [4, 3, 0, 0, 0, 0, 0, 0, 0], [4, 3, 2, 0, 0, 0, 0, 0, 0], [4, 3, 2, 0, 0, 0, 0, 0, 0],
		[4, 3, 3, 0, 0, 0, 0, 0, 0], [4, 3, 3, 0, 0, 0, 0, 0, 0], [4, 3, 3, 1, 0, 0, 0, 0, 0], [4, 3, 3, 1, 0, 0, 0, 0, 0], [4, 3, 3, 2, 0, 0, 0, 0, 0],
		[4, 3, 3, 2, 0, 0, 0, 0, 0], [4, 3, 3, 3, 1, 0, 0, 0, 0], [4, 3, 3, 3, 1, 0, 0, 0, 0], [4, 3, 3, 3, 2, 0, 0, 0, 0], [4, 3, 3, 3, 2, 0, 0, 0, 0]
	],
	spellcastingKnown : {
		cantrips : [0, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11]
	},
	spellcastingList : {
		"class" : "artificer(laserllama)",
		level : [0, 5]
	},
	skillstxt : {
		primary : "Choose two from Arcana, History, Insight, Investigation, Medicine, Nature, and Sleight of Hand"
	},
	toolProfs : {
		primary : ["Tinker's tools", ["Artisan's tools", 1]],
		secondary : ["Tinker's tools"]
	},
	armorProfs : {
		primary : [true, true, false, true],
		secondary : [true, true, false, true]
	},
	weaponProfs : {
		primary : [true, false, ["hand crossbow", "firearms"]],
		secondary : [false, false, ["hand crossbow"]]
	},
	equipment : "Artificer (LaserLlama) starting equipment:" +
		"\n \u2022 Tinker's tools and a set of artisan's tools of my choice;" +
		"\n \u2022 One simple weapon and a light crossbow with 20 bolts;" +
		"\n \u2022 Studded leather -or- scale mail;" +
		"\n \u2022 A dungeoneer's pack -or- a scholar's pack." +
		"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Artificer Specialization", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	features : {
		"infusions" : LLInfusionChoices({
			name : "Infusions",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I know Infusions (use \"Choose Feature\"); at the end of a long rest I infuse one object per Infusion with tinker's tools",
				"Each Infusion in one object at a time, one Infusion per object; during a long rest I can swap one Infusion",
				"Replicate Magic Item: 1 hour studying a magic item lets me learn it as an Infusion (no consumables)"
			]),
			additional : levels.map(function (n) {
				return [2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8][n - 1] + " known; replicate " + (n < 5 ? "common" : n < 11 ? "uncommon" : n < 17 ? "rare" : "very rare");
			}),
			toNotesPage : [{
				name : "Infusions Known",
				note : LLdesc(["Below are the Infusions I know. Infusions use my Artificer spell save DC, spellcasting ability, and level. If I die, my Infusions vanish after Int mod days."])
			}],
			extraname : "Infusion",
			extrachoices : [],
			extraTimes : [2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8]
		}),
		"magical tinker" : {
			name : "Magical Tinker",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"With tinker's tools, I can cast mending and detect magic and identify as rituals (tools are the focus)",
				"Crafting magic items takes me half the time if I'm proficient with the appropriate artisan's tools"
			]),
			spellcastingBonus : [{
				name : "Magical Tinker",
				spells : ["mending"],
				selection : ["mending"],
				firstCol : "atwill"
			}, {
				name : "Magical Tinker",
				spells : ["detect magic", "identify"],
				selection : ["detect magic", "identify"],
				times : 2,
				firstCol : "(R)"
			}]
		},
		"spellcasting" : {
			name : "Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I can cast Artificer spells I know, using Intelligence as my spellcasting ability",
				"My focus: tinker's tools, artisan's tools I'm proficient with, or an item with my Infusion",
				"I can replace one spell I know when I gain an Artificer level"
			]),
			additional : levels.map(function (n) {
				return n < 2 ? "" : [0, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4][n - 1] + " cantrips & " + [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11][n - 1] + " spells known";
			})
		},
		"tinker's insight" : {
			name : "Tinker's Insight",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("I can attune to and use any magic item regardless of class, race, alignment, or spell requirements; I can use my spell save DC instead of the item's DC")
		},
		"arcane recharge" : {
			name : "Arcane Recharge",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc("During a short rest, I recover spell slots with a combined level up to my Int mod" + (n < 11 ? "" : "; or make one infused/magic item regain its dawn Charges instead"));
			}),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature3" : {
			name : "Artificer Specialization",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Choose a Specialization and put it in the \"Class\" field; Specialization spells don't count against my Spells Known")
		},
		"flash of genius" : {
			name : "Flash of Genius",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("As a reaction when I or a creature within 30 ft that can hear me makes a check or save, I add my Int mod to the roll"),
			usages : "Int mod per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"expert tinker" : {
			name : "Expert Tinker",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("I add double my Prof Bonus to checks with tools I'm proficient with; I can infuse magic items (bonuses max +3)")
		},
		"magic item mastery" : {
			name : "Magic Item Mastery",
			source : [["GMB:LL", 0]],
			minlevel : 9,
			description : LLdesc("I can attune to more magic items at once"),
			additional : levels.map(function (n) { return n < 9 ? "" : (n < 14 ? 4 : n < 18 ? 5 : 6) + " attuned items"; }),
			attunementsAdd : [1]
		},
		"magic item mastery 14" : {
			name : "Magic Item Mastery (5)",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : "",
			attunementsAdd : [1]
		},
		"magic item mastery 18" : {
			name : "Magic Item Mastery (6)",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : "",
			attunementsAdd : [1]
		},
		"masterwork inventions" : {
			name : "Masterwork Inventions",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc([
				"I gain +1 to all saving throws for each magic item I'm attuned to",
				"When reduced to 0 HP (not killed outright), I can end one attunement or Infusion to drop to 1 HP instead"
			])
		}
	}
};

// ===================================================================================
// SPECIALIZATIONS (Alternate Artificer v3.1.1)
// ===================================================================================
// Specialization spells: always known, don't count against spells known
LLArtSpecSpells = function (sName, aSpells, sTable) {
	return {
		name : sName + " Spells",
		source : [["GMB:LL", 0]],
		minlevel : 3,
		description : LLdesc("I always know these spells (3rd: " + sTable + "); they don't count against my Spells Known"),
		spellcastingExtra : LLSpellList(aSpells)
	};
};
// Tools of the Trade: aTools = tool names (alternatively another set of artisan's tools)
LLArtTools = function (aTools, sExtra, oExtra) {
	var o = {
		name : "Tools of the Trade",
		source : [["GMB:LL", 0]],
		minlevel : 3,
		description : LLdesc("I gain proficiency with " + aTools.join(" and ") + (sExtra ? sExtra : "") + " (another set of artisan's tools if already proficient)"),
		toolProfs : aTools.map(function (t) { return t.capitalize ? t.capitalize() : t; })
	};
	if (oExtra) for (var a in oExtra) o[a] = oExtra[a];
	return o;
};
LLArtExtraAttack = function (sWhat) {
	return {
		name : "Extra Attack",
		source : [["GMB:LL", 0]],
		minlevel : 5,
		description : LLdesc("I can attack twice when I take the Attack action; when I use my action to cast a spell, I can make " + sWhat + " as a bonus action"),
		action : [["bonus action", " (after casting a spell)"]]
	};
};

// Alchemist Elixir Infusions
var LLElixirs = [
	["minor", "Minor", 3, 1, 2, ["armor of agathys", "caustic brew", "color spray", "cure wounds", "disguise self", "fog cloud", "grease", "heroism", "jump", "longstrider", "sanctuary", "sleep"]],
	["greater", "Greater", 5, 2, 1, ["aura of frost", "barkskin", "blindness/deafness", "darkvision", "dragon's breath", "enhance ability", "enlarge/reduce", "invisibility", "levitate", "mirror image", "restoration", "lesser restoration", "spider climb"]],
	["advanced", "Advanced", 9, 3, 1, ["animate dead", "blink", "daylight", "fireball", "gaseous form", "haste", "meld into stone", "remove curse", "stinking cloud", "water breathing"]],
	["expert", "Expert", 13, 4, 1, ["banishment", "freedom of movement", "giant insect", "greater invisibility", "polymorph", "sickening radiance", "vitriolic sphere", "watery sphere"]],
	["masterwork", "Masterwork", 17, 5, 1, ["cloudkill", "dawn", "globe of invulnerability", "heal", "immolation", "true seeing"]]
];
AddSubClass("artificer(laserllama)", "alchemist", {
	regExpSearch : /alchemist/i,
	subname : "Alchemist",
	fullname : "Alchemist",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["alchemist's supplies"]),
		"subclassfeature3.1" : LLArtSpecSpells("Alchemist", ["healing word", "inflict wounds", "acid arrow", "flaming sphere", "gaseous form", "mass healing word", "blight", "death ward", "cloudkill", "reincarnate"], "healing word, inflict wounds"),
		"subclassfeature3.2" : (function () {
			var oFea = {
				name : "Alchemical Elixirs",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : LLdesc([
					"I learn Elixir Infusions (bonus Infusions Known, use \"Choose Feature\"); each long rest I create one vial of each Elixir I know",
					"As an action, I craft one more by expending the slot listed; Elixirs produce their spell at its lowest level, use my ability",
					"Use an Object: drink, administer, or throw (30 ft); concentration spells last 3 rounds (or concentrate if drunk)"
				]),
				extraname : "Elixir Infusion",
				extrachoices : [],
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 5 ? 1 : n < 9 ? 2 : n < 13 ? 3 : n < 17 ? 4 : 5; }),
				toNotesPage : [{ name : "Elixir Infusions Known", note : LLdesc(["Each Elixir is a Tiny vial producing the spell effect at its lowest level; it becomes inert at the end of my next long rest."]) }]
			};
			for (var i = 0; i < LLElixirs.length; i++) {
				for (var j = 1; j <= 5; j++) {
					(function (e, nr) {
						var sName = "Create " + e[1] + " Elixir (" + nr + ")";
						var aSp = LLSpellList(e[5]);
						oFea.extrachoices.push(sName);
						oFea[sName.toLowerCase()] = {
							name : sName,
							source : [["GMB:LL", 0]],
							submenu : "Create " + e[1] + " Elixir [artificer level " + (e[2] < 10 ? " " : "") + e[2] + "+]",
							description : LLdesc("I learn " + (e[4] === 2 ? "two Elixirs" : "one Elixir") + " (spell effects marked \"Elixir\" on the spell sheet); extra vials cost a " + LLDegreeTxt(e[3]) + "-level slot"),
							prerequisite : e[2] + "th-level Alchemist Artificer",
							prereqeval : function (v) { return LLArtLvl() >= e[2]; },
							spellcastingBonus : [{
								name : e[1] + " Elixir",
								spells : aSp,
								times : e[4],
								firstCol : "Ex"
							}]
						};
					})(LLElixirs[i], j);
				}
			}
			return oFea;
		})(),
		"subclassfeature5" : {
			name : "Potent Potions",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("When my Elixir or Artificer spell deals acid, fire, necrotic, or poison damage or restores HP, I add my Int mod (min +1) to one roll"),
			calcChanges : {
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (spName.indexOf("artificer(laserllama)") === -1 && !(/elixir/i).test(spName)) return;
						return genericSpellDmgEdit(spellKey, spellObj, "acid|fire|necrotic|poison", "Int", true) || genericSpellDmgEdit(spellKey, spellObj, "heal", "Int", true);
					},
					"My Artificer spells and Elixirs that deal acid, fire, necrotic, or poison damage or restore HP add my Int mod to one roll."
				]
			}
		},
		"subclassfeature10" : {
			name : "Restorative Reagents",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Whenever a creature willingly drinks one of my Elixirs, it gains temporary HP equal to my Artificer level")
		},
		"subclassfeature15" : {
			name : "Master Alchemist",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I'm immune to my Elixirs unless I wish; Use an Object as a bonus action (and I can expend a slot to create an Elixir as part of it)"),
			action : [["bonus action", "Use an Object (Elixir)"]]
		}
	}
});

AddSubClass("artificer(laserllama)", "armorer", {
	regExpSearch : /armou?rer/i,
	subname : "Armorer",
	fullname : "Armorer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["smith's tools"], " and heavy armor", { armorProfs : [false, false, true, false] }),
		"subclassfeature3.1" : LLArtSpecSpells("Armorer", ["shield", "thunderwave", "mirror image", "shatter", "lightning bolt", "thunder step", "fire shield", "storm sphere", "destructive wave", "wall of force"], "shield, thunderwave"),
		"subclassfeature3.2" : {
			name : "Arcane Armor",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"During a long rest, 1 hour with smith's tools turns armor into my Arcane Armor (only one; ignores Str requirement)",
				"It covers my body, replaces missing limbs, can't be removed against my will; don/doff as an action, helmet as a bonus action",
				"Defensive Ward: bonus action, temp HP = my Int mod (min 1) while worn",
				"Thunder Gauntlets: simple weapons, Str or Int, 1d8 thunder; hit target has disadv. vs. others than me until my next turn"
			]),
			action : [["bonus action", "Defensive Ward"]],
			weaponOptions : [{
				regExpSearch : /^(?=.*thunder)(?=.*gauntlets?).*$/i,
				name : "Thunder Gauntlets",
				source : [["GMB:LL", 0]],
				ability : 1,
				type : "Simple",
				damage : [1, 8, "thunder"],
				range : "Melee",
				description : "Str or Int; target has disadv. on attacks vs. others than me until my next turn",
				abilitytodamage : true,
				isMagicWeapon : true
			}],
			weaponsAdd : ["Thunder Gauntlets"],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/^(?=.*thunder)(?=.*gauntlets?).*$/i).test(v.WeaponName)) {
							if (What("Int Mod") > What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod")) fields.Mod = 4;
							if (classes.known["artificer(laserllama)"] && classes.known["artificer(laserllama)"].level >= 15) fields.Damage_Die = "2d8";
						}
					},
					"My Thunder Gauntlets can use Intelligence and deal 2d8 damage from 15th level."
				]
			}
		},
		"subclassfeature5" : LLArtExtraAttack("a Thunder Gauntlet attack"),
		"subclassfeature5.1" : {
			name : "Modular Armor",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("My Arcane Armor counts as separate items for Infusions: chest piece, boots, helmet, and two Thunder Gauntlets")
		},
		"subclassfeature10" : {
			name : "Armorer Adept",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("+2 Infusions Known (+3 at 15th), which must be applied to pieces of my Arcane Armor"),
			additional : levels.map(function (n) { return n < 10 ? "" : "+" + (n < 15 ? 2 : 3) + " Armor Infusions"; })
		},
		"subclassfeature15" : {
			name : "Master Armorer",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("In my Arcane Armor, +10 ft walking speed and a flying speed equal to it; Thunder Gauntlets deal 2d8")
		}
	}
});

AddSubClass("artificer(laserllama)", "battle smith", {
	regExpSearch : /^(?=.*battle)(?=.*smith).*$/i,
	subname : "Battle Smith",
	fullname : "Battle Smith",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["smith's tools"], " and heavy armor; as a reaction with a shield or melee weapon, I impose disadv. on an attack vs. a creature within 5 ft", { armorProfs : [false, false, true, false], action : [["reaction", "Protect (disadv. on attack)"]] }),
		"subclassfeature3.1" : LLArtSpecSpells("Battle Smith", ["sanctuary", "shield of faith", "restoration", "lesser restoration", "warding bond", "aura of vitality", "counterspell", "aura of purity", "death ward", "circle of power", "mass cure wounds"], "sanctuary, shield of faith"),
		"subclassfeature3.2" : {
			name : "Steel Defender",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"During a long rest, 1 hour with smith's tools creates my Steel Defender (Humanoid: shields, hands; Quadruped: Large, +10 ft, mount)",
				"It acts on my turn and Dodges unless I command it (bonus action); if it dies, a spell slot and 1 min of repair revive it",
				"It can bear one Infusion for boots, a cloak, gauntlet, helmet, or armor; see the Companion page"
			]),
			action : [["bonus action", "Command Steel Defender"]],
			creaturesAdd : [["Steel Defender (LL)"]],
			creatureOptions : [{
				name : "Steel Defender (LL)",
				source : [["GMB:LL", 0]],
				size : 3,
				type : "Construct",
				alignment : "Unaligned",
				ac : "13+Prof",
				hp : 20,
				hd : [3, 10],
				hdLinked : ["artificer(laserllama)"],
				minlevelLinked : ["artificer(laserllama)"],
				speed : "30 ft (40 ft if Quadruped)",
				scores : [16, 12, 14, 4, 10, 6],
				damage_immunities : "poison, psychic",
				condition_immunities : "charmed, exhaustion, poisoned",
				senses : "Darkvision 60 ft",
				passivePerception : 10,
				languages : "understands the languages of its creator",
				challengeRating : "1",
				proficiencyBonus : 2,
				proficiencyBonusLinked : true,
				attacksAction : 1,
				attacks : [{
					name : "Rend",
					ability : 1,
					damage : [1, 8, "force"],
					modifiers : ["Prof", "Prof"],
					range : "Melee (5 ft)",
					abilitytodamage : true,
					description : "Martial Offense upgrade: d10 and two Rend attacks per command"
				}, {
					name : "Repair",
					ability : 0,
					damage : [1, 10, "healing"],
					modifiers : ["", "Prof"],
					range : "Touch (5 ft)",
					description : "Expend one of its Hit Dice; heals itself or a construct/object it touches",
					abilitytodamage : false
				}],
				traits : [{
					name : "Hit Dice",
					description : "It has d10 Hit Dice equal to its creator's Artificer level and benefits from short and long rests."
				}, {
					name : "Might of the Master",
					description : "It adds its creator's Proficiency Bonus to its ability checks and saving throws."
				}, {
					name : "Vigilant",
					description : "It can't be surprised."
				}, {
					name : "Upgrades (Battle Smith 5, 10, 15)",
					minlevel : 5,
					description : "It gains a Minor (5th), Greater (10th), and Masterwork (15th) Upgrade; see the Battle Smith features. From 10th level, it counts as separate items for Infusions (torso, legs, head, limbs)."
				}],
				calcChanges : {
					hp : function (totalHD, HDobj, prefix) {
						if (!classes.known["artificer(laserllama)"]) return;
						var lvl = classes.known["artificer(laserllama)"].level;
						HDobj.alt.push(5 + 5 * lvl);
						HDobj.altStr.push(" = 5 as a base\n + 5 \xD7 " + lvl + " from five times its creator's artificer level (" + (5 * lvl) + ")");
					},
					setAltHp : true
				}
			}]
		},
		"subclassfeature5" : {
			name : "Minor Upgrade",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("My Steel Defender gains one Minor Upgrade; use the \"Choose Feature\" button above"),
			choices : ["Minor Arcanum", "Martial Offense"],
			"minor arcanum" : { name : "Minor Arcanum", description : LLdesc("It holds a 1-action 1st-level Artificer spell; bonus action: I order it to cast it (3 Charges per short rest, my ability)"), action : [["bonus action", "Defender: Minor Arcanum"]] },
			"martial offense" : { name : "Martial Offense", description : LLdesc("Its Rend uses a d10; when ordered to Rend, it makes two Rend attacks (either can be a grapple or shove)") }
		},
		"subclassfeature10" : {
			name : "Modular Defender & Greater Upgrade",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("My Steel Defender counts as separate items for Infusions (torso, legs, head, limbs) and gains a Greater Upgrade (\"Choose Feature\")"),
			choices : ["Greater Arcanum", "Limited Sentience", "Reinforced Plating"],
			"greater arcanum" : { name : "Greater Arcanum", description : LLdesc("It holds a 1-action 2nd-level Artificer spell; bonus action: I order it to cast it (3 Charges per short rest)"), action : [["bonus action", "Defender: Greater Arcanum"]] },
			"limited sentience" : { name : "Limited Sentience", description : LLdesc("Its Int becomes 10, it speaks one language, and carries out simple instructions until complete") },
			"reinforced plating" : { name : "Reinforced Plating", description : LLdesc("It's resistant to bludgeoning, piercing, and slashing damage") }
		},
		"subclassfeature15" : {
			name : "Masterwork Upgrade",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("My Steel Defender gains a Masterwork Upgrade; use the \"Choose Feature\" button above"),
			choices : ["Arcane Ward", "Major Arcanum", "Self-Destruct"],
			"arcane ward" : { name : "Arcane Ward", description : LLdesc("Creatures of my choice within 15 ft of it resist damage from spells") },
			"major arcanum" : { name : "Major Arcanum", description : LLdesc("It holds a 1-action 3rd-level Artificer spell; bonus action: I order it to cast it (3 Charges per short rest)"), action : [["bonus action", "Defender: Major Arcanum"]] },
			"self-destruct" : { name : "Self-Destruct", description : LLdesc("Bonus action: it explodes; creatures within 30 ft: Dex save or force damage = its remaining HD in d8s (max 10d8), half on save; rebuilt after a long rest"), action : [["bonus action", "Defender: Self-Destruct"]] }
		}
	}
});

AddSubClass("artificer(laserllama)", "enhanced", {
	regExpSearch : /^(?=.*enhanced)(?=.*artificer).*$/i,
	subname : "Enhanced",
	fullname : "Enhanced",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtSpecSpells("Enhanced", ["absorb elements", "thunderous smite", "alter self", "spider climb", "blinding smite", "haste", "freedom of movement", "greater invisibility", "banishing smite", "skill empowerment"], "absorb elements, thunderous smite"),
		"subclassfeature3.1" : LLArtTools(["leatherworker's tools", "smith's tools"]),
		"subclassfeature3.2" : {
			name : "Modular Physique",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"My head (helmet), torso (armor), arms (gauntlets), and legs (boots) can each bear one Infusion",
				"Without armor, my AC is 10 + Dex mod + Int mod (shield allowed; torso Infusions apply)"
			]),
			armorOptions : [{
				regExpSearch : /^(?=.*modular)(?=.*physique).*$/i,
				name : "Modular Physique",
				source : [["GMB:LL", 0]],
				ac : "10+Int",
				affectsWildShape : false,
				selectNow : true
			}]
		},
		"subclassfeature3.3" : {
			name : "Hidden Blade",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Bonus action: extend/retract my Hidden Blade (simple, finesse, magical, 1d10 piercing or slashing; 2d10 at 10th); it's a focus and can bear an Infusion"),
			action : [["bonus action", "Hidden Blade (extend/retract)"]],
			weaponOptions : [{
				regExpSearch : /^(?=.*hidden)(?=.*blade).*$/i,
				name : "Hidden Blade",
				source : [["GMB:LL", 0]],
				ability : 2,
				type : "Simple",
				damage : [1, 10, "piercing"],
				range : "Melee",
				description : "Finesse; piercing or slashing; magical; spellcasting focus when extended",
				abilitytodamage : true,
				isMagicWeapon : true
			}],
			weaponsAdd : ["Hidden Blade"],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/^(?=.*hidden)(?=.*blade).*$/i).test(v.WeaponName) && classes.known["artificer(laserllama)"] && classes.known["artificer(laserllama)"].level >= 10) fields.Damage_Die = "2d10";
					},
					"From 10th level, my Hidden Blade deals 2d10 damage."
				]
			}
		},
		"subclassfeature5" : {
			name : "Bonus Enhancements",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("+1 Infusion Known (+2 at 10th, +3 at 15th), which must be applied to my body (Modular Physique)"),
			additional : levels.map(function (n) { return n < 5 ? "" : "+" + (n < 10 ? 1 : n < 15 ? 2 : 3) + " body Infusions"; })
		},
		"subclassfeature5.1" : LLArtExtraAttack("one Hidden Blade attack"),
		"subclassfeature10" : {
			name : "Streamlined Integration",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("For each body part (incl. Hidden Blade) with an Infusion: +1 to Str, Dex, and Con checks (max +5) and +5 ft walking speed (max +25 ft)")
		},
		"subclassfeature15" : {
			name : "Master Enhanced",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I'm a Humanoid and Construct; no need to eat, sleep, breathe, or age (4 hours of maintenance for a long rest); resistance to B/P/S"),
			dmgres : ["Bludgeoning", "Piercing", "Slashing"]
		}
	}
});

AddSubClass("artificer(laserllama)", "forgewright", {
	regExpSearch : /forgewright/i,
	subname : "Forgewright",
	fullname : "Forgewright",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtSpecSpells("Forgewright", ["compelled duel", "zephyr strike", "cloud of daggers", "misty step", "blinding smite", "conjure volley", "fire shield", "staggering smite", "banishing smite", "steel wind strike"], "compelled duel, zephyr strike"),
		"subclassfeature3.1" : {
			name : "Arcane Armament",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"During a long rest, 1 hour with smith's tools reforges a melee weapon into my Arcane Armament (only one)",
				"It's magical, uses Int for attack and damage, thrown (20/60) and returns, and is a focus",
				"It can bear one Infusion; +1 Infusion Known that must be applied to it; add \"Arcane Armament\" to its name"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!(/arcane armament/i).test(v.WeaponText) || !v.isMeleeWeapon) return;
						if (What("Int Mod") > What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod")) fields.Mod = 4;
						if (!(/thrown/i).test(fields.Description)) fields.Description += (fields.Description ? "; " : "") + "Thrown (20/60), returns";
						if (classes.known["artificer(laserllama)"] && classes.known["artificer(laserllama)"].level >= 10) fields.Description += (fields.Description ? "; " : "") + "+1d8 force or adv.";
					},
					"My Arcane Armament (include \"Arcane Armament\" in the name) uses Intelligence and is thrown (20/60), returning to my hand."
				]
			}
		},
		"subclassfeature3.2" : LLArtTools(["smith's tools"], " and martial weapons", { weaponProfs : [false, true] }),
		"subclassfeature5" : {
			name : "Arcane Jolt",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("Once per turn on an Arcane Armament hit, I can expend a spell slot for +2d8 force (+1d8 per slot level above 1st, max 6d8)")
		},
		"subclassfeature5.1" : LLArtExtraAttack("an Arcane Armament attack"),
		"subclassfeature10" : {
			name : "Arcane Surge",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("My Arcane Armament hits deal +1d8 force; I can forgo it on an attack to make it with advantage")
		},
		"subclassfeature15" : {
			name : "Master Forgewright",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Bonus action: Int mod (min 1) weapons within 30 ft deal +1d8 force for 1 min; once per long rest, then a 3rd-level+ slot"),
			usages : 1,
			recovery : "long rest",
			action : [["bonus action", ""]]
		}
	}
});

AddSubClass("artificer(laserllama)", "wandslinger", {
	regExpSearch : /wand ?slinger/i,
	subname : "Wandslinger",
	fullname : "Wandslinger",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["woodcarver's tools"]),
		"subclassfeature3.1" : LLArtSpecSpells("Wandslinger", ["shield", "thunderwave", "blur", "scorching ray", "counterspell", "lightning bolt", "vitriolic sphere", "wall of fire", "cone of cold", "wall of force"], "shield, thunderwave"),
		"subclassfeature3.2" : {
			name : "Arcane Sidearm & Spell Slinger",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var nE = n < 5 ? 1 : n < 10 ? 2 : n < 15 ? 3 : 4;
				return LLdesc([
					"During a long rest, I craft my Arcane Sidearm (Tiny focus, one arcane focus Infusion)",
					"As an action, I produce " + nE + " Spell Slinger effect" + (nE > 1 ? "s" : "") + ": Arcane Lance (120 ft spell attack, 1d10+Int force), Shocking Burst",
					"(60 ft, 5-ft radius, Dex save, 2d6 lightning), or Thunderous Blast (15-ft cone, Str save, 2d6 thunder and pushed 10 ft)"
				].concat(n < 5 ? [] : ["When I use my action to cast an Artificer spell, I can produce one effect as a bonus action"]));
			}),
			action : [["action", "Spell Slinger"]],
			weaponOptions : [{
				regExpSearch : /^(?=.*arcane)(?=.*lance).*$/i,
				name : "Arcane Lance",
				source : [["GMB:LL", 0]],
				ability : 4,
				type : "Spell",
				damage : [1, 10, "force"],
				range : "120 ft",
				description : "Spell Slinger effect (Arcane Sidearm)",
				abilitytodamage : true
			}, {
				regExpSearch : /^(?=.*shocking)(?=.*burst).*$/i,
				name : "Shocking Burst",
				source : [["GMB:LL", 0]],
				ability : 4,
				type : "Spell",
				damage : [2, 6, "lightning"],
				range : "60 ft",
				description : "5-ft radius; Dex save, half damage on success",
				abilitytodamage : false,
				dc : true
			}, {
				regExpSearch : /^(?=.*thunderous)(?=.*blast).*$/i,
				name : "Thunderous Blast",
				source : [["GMB:LL", 0]],
				ability : 4,
				type : "Spell",
				damage : [2, 6, "thunder"],
				range : "15-ft cone",
				description : "Str save or damage and pushed 10 ft",
				abilitytodamage : false,
				dc : true
			}],
			weaponsAdd : ["Arcane Lance", "Shocking Burst", "Thunderous Blast"]
		},
		"subclassfeature5" : {
			name : "Arcane Duelist",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("My Spell Slinger action produces two effects (three at 10th, four at 15th); after casting an Artificer spell, one effect as a bonus action"),
			action : [["bonus action", "Spell Slinger (after casting)"]]
		},
		"subclassfeature10" : {
			name : "Quickdraw",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I add my Prof Bonus to initiative; when I roll initiative (not surprised), I can use my reaction for one Spell Slinger effect"),
			addMod : [{ type : "skill", field : "Init", mod : "Prof", text : "Quickdraw: I add my Proficiency Bonus to initiative rolls." }],
			action : [["reaction", "Spell Slinger (on initiative)"]]
		},
		"subclassfeature15" : {
			name : "Master Wandslinger",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Reaction: three-quarters cover vs. a spell for me or a creature within 30 ft; adv. on counterspell checks; my Spell Slinger/Artificer damage can be force"),
			action : [["reaction", "Master Wandslinger (cover)"]]
		}
	}
});

// ===================================================================================
// ADDITIONAL SPECIALIZATIONS (Alternate Artificer Expanded v3.1.1)
// ===================================================================================
AddSubClass("artificer(laserllama)", "aeronaut", {
	regExpSearch : /aeronaut/i,
	subname : "Aeronaut",
	fullname : "Aeronaut",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Flying Machine",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"During a long rest, 1 hour with woodcarver's tools crafts my Flying Machine (only I can use it; worn over clothes or light armor)",
				"While worn: focus for my spells, flying speed and hover; it can bear an Infusion for an arcane focus, boots, cloak, or Tiny object"
			]),
			additional : levels.map(function (n) { return n < 3 ? "" : "fly " + (n < 5 ? 20 : n < 10 ? 30 : n < 15 ? 45 : 60) + " ft"; })
		},
		"subclassfeature3.1" : LLArtTools(["woodcarver's tools"]),
		"subclassfeature3.2" : LLArtSpecSpells("Aeronaut", ["fog cloud", "zephyr strike", "dust devil", "warding wind", "fly", "wind wall", "death ward", "summon elemental", "control winds", "steel wind strike"], "fog cloud, zephyr strike"),
		"subclassfeature5" : {
			name : "Aerial Maneuvers",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("While wearing my Flying Machine, I add my Int mod (min +1) to Dexterity checks and saves")
		},
		"subclassfeature5.1" : LLArtExtraAttack("a weapon attack"),
		"subclassfeature10" : {
			name : "Airborne Assault",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("My ranged attacks while flying 10+ ft above the ground deal +1d8 damage (or I forgo it for advantage)")
		},
		"subclassfeature15" : {
			name : "Master Aeronaut",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("With my Flying Machine: Dash as a bonus action and Evasion (Dex saves for half: none on success, half on failure)"),
			action : [["bonus action", "Dash (Flying Machine)"]]
		}
	}
});

AddSubClass("artificer(laserllama)", "archivist", {
	regExpSearch : /archivist/i,
	subname : "Archivist",
	fullname : "Archivist",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["calligrapher's supplies"], "; I learn two languages", { languageProfs : [2] }),
		"subclassfeature3.1" : LLArtSpecSpells("Archivist", ["comprehend languages", "dissonant whispers", "detect thoughts", "mind spike", "hypnotic pattern", "tongues", "locate creature", "phantasmal killer", "modify memory", "synaptic static"], "comprehend languages, dissonant whispers"),
		"subclassfeature3.2" : {
			name : "Artificial Mind",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var d = (n < 5 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4) + "d8";
				return LLdesc([
					"During a long rest, 1 hour awakens a Mind in a Tiny object (magical, focus); I telepathically talk with carriers of my infused items within 1 mile",
					"Information Overload: action, a creature within 30 ft: Int save or " + d + " psychic" + (n < 5 ? "" : " (+Int mod)") + " and disadv. on its next attack",
					"Bonus skills by material: animal (Animal Handling, Insight, Perception, Survival: 2), mineral (Deception, Intimidation, Performance, Persuasion: 2), plant (Arcana, History, Nature, Religion: 2)"
				]);
			}),
			skillstxt : "Choose two skills based on my Artificial Mind's material (animal, mineral, or plant)",
			action : [["action", "Information Overload"]]
		},
		"subclassfeature5" : {
			name : "Acute Overload",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("On a failed Information Overload save, I can expend a slot: +2d8 psychic (+1d8 per level above 1st); I add my Int mod to psychic damage of the Mind")
		},
		"subclassfeature10" : {
			name : "Improved Consciousness",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Holding my Artificial Mind, I add my Int mod (min +1) to Wis and Cha saves and concentration saves")
		},
		"subclassfeature15" : {
			name : "Master Archivist",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Bonus action: teleport 60 ft or next to an object with my Infusion (same plane); my Mind can concentrate on a 2nd Artificer spell (total level max 5th)"),
			action : [["bonus action", "Teleport (information)"]]
		}
	}
});

var LLBioMods = {
	"amphibian physiology" : { name : "Amphibian Physiology", lvl : 0, d : "Swimming speed = walking speed; I can breathe air and water" },
	"bestial senses" : { name : "Bestial Senses", lvl : 0, d : "+Int mod (min +1) to Perception and Survival checks using hearing, sight, or smell" },
	"enhanced physicality" : { name : "Enhanced Physicality", lvl : 0, d : "+Int mod (min +1) to Strength checks and saves" },
	"monstrous claw" : { name : "Monstrous Claw", lvl : 0, d : "My unarmed strikes deal 1d8 + Str slashing; on a hit, I can automatically grapple a target my size or smaller" },
	"resilient hide" : { name : "Resilient Hide", lvl : 0, d : "Without armor, my AC is 10 + Int mod + Con mod" },
	"winged glide" : { name : "Winged Glide", lvl : 0, d : "Subtract 100 ft from falls; glide 2 ft horizontally per 1 ft fallen (after 10 ft)" },
	"arachnoid grip" : { name : "Arachnoid Grip", lvl : 5, d : "Climbing speed = walking speed (no checks on difficult surfaces); disadv. on checks/saves to escape my grapples" },
	"greater physique" : { name : "Greater Physique", lvl : 5, d : "I grow one size, +5 ft reach, weight \xD78, melee weapon attacks +1d4 damage" },
	"vestigial limb" : { name : "Vestigial Limb", lvl : 5, d : "An extra limb that can use weapons, shields, magic items, tools, and objects" },
	"avian flight" : { name : "Avian Flight", lvl : 15, d : "Flying speed equal to my walking speed" },
	"hideous regeneration" : { name : "Hideous Regeneration", lvl : 15, d : "If I start my turn below half HP (min 1), I regain Int mod (min 1) HP" }
};
AddSubClass("artificer(laserllama)", "biomancer", {
	regExpSearch : /biomancer/i,
	subname : "Biomancer",
	fullname : "Biomancer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["leatherworker's tools"], " and Medicine", { skills : ["Medicine"] }),
		"subclassfeature3.1" : LLArtSpecSpells("Biomancer", ["false life", "jump", "enhance ability", "spider climb", "haste", "life transference", "blight", "polymorph", "reincarnate", "skill empowerment"], "false life, jump"),
		"subclassfeature3.2" : (function () {
			var oFea = {
				name : "Arcane Evolution",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : LLdesc("During a long rest, 1 hour with leatherworker's tools modifies my body with Modifications (\"Choose Feature\"); saves use my spell save DC"),
				extraname : "Biomancer Modification",
				extrachoices : [],
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 5 ? 2 : n < 10 ? 3 : n < 15 ? 4 : 5; })
			};
			for (var sM in LLBioMods) {
				var o = LLBioMods[sM];
				oFea.extrachoices.push(o.name);
				oFea[sM] = { name : o.name, source : [["GMB:LL", 0]], description : LLdesc(o.d) };
				if (o.lvl) {
					oFea[sM].prerequisite = o.lvl + "th-level Artificer";
					oFea[sM].prereqeval = (function (nL) { return function (v) { return LLArtLvl() >= nL; }; })(o.lvl);
				}
			}
			oFea["amphibian physiology"].speed = { swim : { spd : "walk", enc : "walk" } };
			oFea["arachnoid grip"].speed = { climb : { spd : "walk", enc : "walk" } };
			oFea["avian flight"].speed = { fly : { spd : "walk", enc : "walk" } };
			oFea["resilient hide"].armorOptions = [{ regExpSearch : /^(?=.*resilient)(?=.*hide).*$/i, name : "Resilient Hide", source : [["GMB:LL", 0]], ac : "10+Int+Con", dex : -10, affectsWildShape : true, selectNow : true }];
			oFea["monstrous claw"].weaponOptions = [{ regExpSearch : /^(?=.*monstrous)(?=.*claw).*$/i, name : "Monstrous Claw", source : [["GMB:LL", 0]], ability : 1, type : "Natural", damage : [1, 8, "slashing"], range : "Melee", description : "On hit, can automatically grapple a target my size or smaller", abilitytodamage : true }];
			oFea["monstrous claw"].weaponsAdd = ["Monstrous Claw"];
			return oFea;
		})(),
		"subclassfeature5" : {
			name : "Biomancer's Homunculus",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"I know the Homunculus Servant Infusion (not counted); it's made of organic matter and is a monstrosity",
				"Bonus action: it touches a creature and sacrifices any of its HP to heal the target that much"
			]),
			creaturesAdd : [["Homunculus Servant (LL)"]],
			action : [["bonus action", "Homunculus graft (heal)"]]
		},
		"subclassfeature5.1" : LLArtExtraAttack("a weapon attack"),
		"subclassfeature10" : {
			name : "Monstrous Homunculus & Violent Regrowth",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"My Homunculus can be Tiny, Small, or Medium with one Modification without prerequisite (5th-level or lower at 15th)",
				"Bonus action, a spell slot: replace one of my Modifications; my walking speed increases by 10 ft"
			]),
			speed : { walk : { spd : "+10", enc : "+10" } },
			action : [["bonus action", "Violent Regrowth (spell slot)"]]
		},
		"subclassfeature15" : {
			name : "Master Biomancer",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I target a creature with a Biomancer Spell, one target gains temp HP = Artificer level + Int mod; during a long rest, I can give one of my Modifications to a willing creature")
		}
	}
});

AddSubClass("artificer(laserllama)", "chronothief", {
	regExpSearch : /chrono ?thief/i,
	subname : "Chronothief",
	fullname : "Chronothief",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["jeweler's tools"], "; I always know the exact time on my home plane"),
		"subclassfeature3.1" : LLArtSpecSpells("Chronothief", ["expeditious retreat", "feather fall", "hold person", "misty step", "haste", "slow", "banishment", "dimension door", "hold monster", "modify memory"], "expeditious retreat, feather fall"),
		"subclassfeature3.2" : {
			name : "Chronometer",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"During a long rest, 1 hour with jeweler's tools crafts my Chronometer (Tiny focus; one Infusion for a focus, ring, or diadem)",
					"Action, a creature within 60 ft" + (n < 5 ? "" : " (two abilities per action)") + ": Accelerate (+5\xD7Int mod ft speed), Decelerate (Cha save or speed 0), Warp (Cha save or swap places)"
				].concat(n < 5 ? [] : ["Age (Cha save or 2d6 necrotic, ages 1 day); reactions: Rush (+Int mod to initiative), Slip (force a d20 reroll)"]));
			}),
			action : [["action", "Chronometer"]]
		},
		"subclassfeature5" : {
			name : "Efficient Chronomancy",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("I use two Chronometer abilities per action; I gain Age, Rush, and Slip (reactions for Rush and Slip)"),
			action : [["reaction", "Chronometer: Rush/Slip"]]
		},
		"subclassfeature10" : {
			name : "Time Transfer",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When a creature fails vs. Decelerate, I can Accelerate another as part of the action; when it fails vs. Age, another gains temp HP = the necrotic damage")
		},
		"subclassfeature15" : {
			name : "Master Chronothief",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("As an action, my Chronometer casts time stop once per long rest (from 17th level, again with a 5th-level slot)"),
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : [{ name : "Master Chronothief", spells : ["time stop"], selection : ["time stop"], firstCol : "oncelr" }]
		}
	}
});

AddSubClass("artificer(laserllama)", "composer", {
	regExpSearch : /composer/i,
	subname : "Composer",
	fullname : "Composer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["smith's tools"], " and Performance", { skills : ["Performance"] }),
		"subclassfeature3.1" : LLArtSpecSpells("Composer", ["charm person", "thunderwave", "shatter", "silence", "beacon of hope", "fear", "charm monster", "dominate beast", "destructive wave", "dominate person"], "charm person, thunderwave"),
		"subclassfeature3.2" : {
			name : "Musical Apparatus",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"During a long rest, 1 hour with smith's tools creates my Apparatus (instrument only I'm proficient with, focus, one Infusion)",
				"I can cast thunderclap with it; action: Raucous Blast (60 ft spell attack, 1d10 thunder, deafened) or Ringing Strike (melee spell attack, 1d10+Int thunder; d12 two-handed)"
			]),
			action : [["action", "Raucous Blast/Ringing Strike"]],
			spellcastingBonus : [{ name : "Musical Apparatus", spells : LLSpellList(["thunderclap"]), selection : LLSpellList(["thunderclap"]), firstCol : "atwill" }],
			weaponOptions : [{
				regExpSearch : /^(?=.*raucous)(?=.*blast).*$/i,
				name : "Raucous Blast",
				source : [["GMB:LL", 0]],
				ability : 4,
				type : "Spell",
				damage : [1, 10, "thunder"],
				range : "60 ft",
				description : "Target must hear me; deafened until my next turn",
				abilitytodamage : false
			}, {
				regExpSearch : /^(?=.*ringing)(?=.*strike).*$/i,
				name : "Ringing Strike",
				source : [["GMB:LL", 0]],
				ability : 4,
				type : "Spell",
				damage : [1, 10, "thunder"],
				range : "Melee (5 ft)",
				description : "d12 if holding the Apparatus with two hands",
				abilitytodamage : true
			}],
			weaponsAdd : ["Raucous Blast", "Ringing Strike"]
		},
		"subclassfeature5" : {
			name : "Combat Virtuoso & Thunderous Note",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"My Apparatus action produces two effects; after casting a spell, one effect as a bonus action",
				"When I deal thunder damage with it, I can expend a slot to push the target 10 ft per slot level (halved per size above Large)"
			]),
			action : [["bonus action", "Apparatus (after casting)"]]
		},
		"subclassfeature10" : {
			name : "Resonant Frequency",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : levels.map(function (n) {
				return LLdesc("Action: up to Int mod creatures within 30 ft resonate for 1 hour; the next melee attacker that hits one takes " + (n < 15 ? 2 : 4) + "d8 thunder and loses reactions");
			}),
			usages : "Int mod per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "long rest",
			action : [["action", ""]]
		},
		"subclassfeature15" : {
			name : "Master Composer",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Immune to thunder and deafened; Thunderous Note push doubled; Resonant Frequency 4d8; 1 min practice grants proficiency with an instrument"),
			savetxt : { immune : ["thunder", "deafened"] }
		}
	}
});

AddSubClass("artificer(laserllama)", "dungeoneer", {
	regExpSearch : /dungeoneer/i,
	subname : "Dungeoneer",
	fullname : "Dungeoneer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["carpenter's tools", "mason's tools"], "; proficiency with improvised weapons (Int for attack and damage)", {
			weaponProfs : [false, false, ["improvised weapons"]],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/improvised/i).test(v.WeaponName + v.baseWeaponName) || (/improvised/i).test(v.theWea.type)) {
							if (What("Int Mod") > What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod")) fields.Mod = 4;
						}
					},
					"I can use Intelligence for attack and damage rolls with improvised weapons."
				]
			}
		}),
		"subclassfeature3.1" : LLArtSpecSpells("Dungeoneer", ["alarm", "unseen servant", "arcane lock", "knock", "glyph of warding", "tiny hut", "guardian of faith", "resilient sphere", "passwall", "wall of stone"], "alarm, unseen servant"),
		"subclassfeature3.2" : {
			name : "Dungeoncraft",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"During a long rest, 1 hour with carpenter's tools crafts 2\xD7 Int mod (min 2) Dungeoncraft Objects (ash after my next long rest)",
				"They're foci and use my spell save DC; Use an Object with them as a bonus action; each can bear one fitting Infusion",
				"Normal versions take 1/4 time and half cost; see Notes page for the list"
			]),
			action : [["bonus action", "Use a Dungeoncraft Object"]],
			toNotesPage : [{
				name : "Dungeoncraft Objects",
				note : "\n   acid (1 vial), alchemist's fire (1 flask), ball bearings (1,000), block and tackle, caltrops (200), chain (25 ft), crowbar, grappling hook, hunting trap, ladder (10 ft), lock and key, manacles and key, oil (1 flask), pitons (10), portable ram, rope (50 ft), sledgehammer, torches (5)"
			}]
		},
		"subclassfeature5" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("I can attack twice when I take the Attack action, and replace either attack with Use an Object; my Dungeoncraft Objects deal magical damage")
		},
		"subclassfeature10" : {
			name : "Arcane Improvisation",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Once per long rest per Dungeoneer spell, I can consume a Dungeoncraft Object as its material component instead of a slot")
		},
		"subclassfeature15" : {
			name : "Master Dungeoneer",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("10 min with mason's tools: passwall or wall of stone without a slot or concentration (ash at dawn); disadv. on saves vs. my Dungeoncraft Objects")
		}
	}
});

var LLGunUpgrades = {
	"close shot" : { name : "Close Shot", lvl : 0, d : "No disadv. on Firearm attacks with a hostile creature within 5 ft" },
	"deadly accuracy" : { name : "Deadly Accuracy", lvl : 0, d : "+2 to Arcane Firearm attack rolls (doesn't stack with Archery)" },
	"elemental shot" : { name : "Elemental Shot", lvl : 0, d : "Bonus action, a spell slot: for 1 min, +1d4 acid, cold, fire, lightning, or poison per slot level on Firearm hits" },
	"grooved barrel" : { name : "Grooved Barrel", lvl : 0, d : "No disadv. on Firearm attacks at long range" },
	"high caliber" : { name : "High Caliber", lvl : 0, d : "Range 100/400, damage 2d6, heavy and two-handed" },
	"replaceable parts" : { name : "Replaceable Parts", lvl : 0, d : "10 min (also during a short rest) with smith's tools: replace one Upgrade" },
	"blinding rounds" : { name : "Blinding Rounds", lvl : 5, d : "Once per turn on a hit: Con save or blinded until my next turn" },
	"concussive rounds" : { name : "Concussive Rounds", lvl : 5, d : "Once per turn on a hit: Con save or no reactions and half speed until my next turn" },
	"explosive rounds" : { name : "Explosive Rounds", lvl : 5, d : "Once per turn on a hit: creatures within 5 ft of the target: Dex save or take the attack's damage" },
	"incapacitating rounds" : { name : "Incapacitating Rounds", lvl : 10, d : "Once per turn on a hit: Str save (adv. if Large+) or incapacitated until my next turn (ends on damage or save)" },
	"arcane railgun" : { name : "Arcane Railgun", lvl : 15, d : "Once on my turn in place of a Firearm attack: 60-ft line, Dex save or 4d6 force (half on save)" },
	"independent turret" : { name : "Independent Turret", lvl : 15, d : "Action: set it as a turret; within 120 ft, bonus action: it attacks or uses another ability" }
};
AddSubClass("artificer(laserllama)", "gunslinger", {
	regExpSearch : /gunslinger/i,
	subname : "Gunslinger",
	fullname : "Gunslinger",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["alchemist's supplies", "smith's tools"]),
		"subclassfeature3.1" : LLArtSpecSpells("Gunslinger", ["chaos bolt", "guiding bolt", "acid arrow", "aganazzar's scorcher", "conjure volley", "lightning arrow", "banishment", "fire shield", "skill empowerment", "swift quiver"], "chaos bolt, guiding bolt"),
		"subclassfeature3.2" : (function () {
			var oFea = {
				name : "Arcane Firearm",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : LLdesc([
					"During a long rest, 1 hour with smith's tools crafts my Arcane Firearm (martial, 80/320, loading, 1d10 force, Int, focus)",
					"It bears one Infusion (ranged weapon, metal rod, Tiny object) and has Upgrades (\"Choose Feature\"); saves use my spell DC"
				]),
				weaponOptions : [{
					regExpSearch : /^(?=.*arcane)(?=.*firearm).*$/i,
					name : "Arcane Firearm",
					source : [["GMB:LL", 0]],
					ability : 4,
					type : "Martial",
					damage : [1, 10, "force"],
					range : "80/320 ft",
					description : "Loading (6 shots, reload as bonus action from 5th level); spellcasting focus",
					abilitytodamage : true,
					isMagicWeapon : true
				}],
				weaponsAdd : ["Arcane Firearm"],
				extraname : "Firearm Upgrade",
				extrachoices : [],
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 5 ? 2 : n < 10 ? 3 : n < 15 ? 4 : 5; })
			};
			for (var sU in LLGunUpgrades) {
				var o = LLGunUpgrades[sU];
				oFea.extrachoices.push(o.name);
				oFea[sU] = { name : o.name, source : [["GMB:LL", 0]], description : LLdesc(o.d) };
				if (o.lvl) {
					oFea[sU].prerequisite = o.lvl + "th-level Artificer";
					oFea[sU].prereqeval = (function (nL) { return function (v) { return LLArtLvl() >= nL; }; })(o.lvl);
				}
			}
			oFea["deadly accuracy"].calcChanges = {
				atkCalc : [
					function (fields, v, output) { if ((/^(?=.*arcane)(?=.*firearm).*$/i).test(v.WeaponName)) output.extraHit += 2; },
					"My Arcane Firearm attacks get +2 to hit (Deadly Accuracy)."
				]
			};
			oFea["high caliber"].calcChanges = {
				atkAdd : [
					function (fields, v) {
						if ((/^(?=.*arcane)(?=.*firearm).*$/i).test(v.WeaponName)) {
							fields.Damage_Die = "2d6";
							fields.Range = "100/400 ft";
							fields.Description += (fields.Description ? "; " : "") + "Heavy, two-handed";
						}
					},
					"My Arcane Firearm deals 2d6, has range 100/400, and is heavy and two-handed (High Caliber)."
				]
			};
			return oFea;
		})(),
		"subclassfeature5" : LLArtExtraAttack("one Arcane Firearm attack"),
		"subclassfeature5.1" : {
			name : "Increased Capacity",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("I ignore loading on my Arcane Firearm: up to six attacks, then a bonus action to reload"),
			action : [["bonus action", "Reload Arcane Firearm"]]
		},
		"subclassfeature10" : {
			name : "Overcharge & Quickdraw",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc([
				"Once per turn on a Firearm hit, expend a slot: +2d6 force (+1d6 per slot level above 1st)",
				"+Int mod (min +1) to initiative; on initiative (not surprised), reaction: one Firearm attack"
			]),
			addMod : [{ type : "skill", field : "Init", mod : "max(Int|1)", text : "Quickdraw: I add my Intelligence modifier (min +1) to initiative rolls." }],
			action : [["reaction", "Firearm attack (on initiative)"]]
		},
		"subclassfeature15" : {
			name : "Master Gunslinger",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Bonus action: adv. on Firearm attacks this turn; once per turn, forgo adv. to make one extra Firearm attack (without adv.)"),
			action : [["bonus action", "Steady Aim (Firearm)"]]
		}
	}
});

AddSubClass("artificer(laserllama)", "junker", {
	regExpSearch : /junker/i,
	subname : "Junker",
	fullname : "Junker",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["smith's tools", "vehicles (land)"]),
		"subclassfeature3.1" : LLArtSpecSpells("Junker", ["ensnaring strike", "grease", "enlarge/reduce", "heat metal", "sonic wave", "erupting earth", "resilient sphere", "summon construct", "animate objects", "wall of force"], "ensnaring strike, grease"),
		"subclassfeature3.2" : {
			name : "Junker's Rig",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"During a long rest, 1 hour with smith's tools builds my Rig (see Companion page); 10 min of repair: +Artificer level HP",
				"Bonus action: a Medium or smaller creature enters/exits it (Pilot); the Pilot can't be targeted and uses the Rig's stats",
				"At 0 HP it's destroyed (Pilot ejected prone; 1 hour to restore); bonus action: collapse/expand (backpack, Str 13)"
			]),
			action : [["bonus action", "Enter/exit or collapse Rig"]],
			creaturesAdd : [["Junker's Rig (LL)"]],
			creatureOptions : [{
				name : "Junker's Rig (LL)",
				source : [["GMB:LL", 0]],
				size : 2,
				type : "Construct",
				alignment : "Unaligned",
				ac : "10+oInt+Prof",
				hp : 20,
				hd : [3, 10],
				minlevelLinked : ["artificer(laserllama)"],
				speed : "30 ft, climb 20 ft",
				scores : [18, 8, 16, 10, 10, 10],
				skills : { "Athletics" : 0, "Intimidation" : 0 },
				damage_immunities : "poison, psychic",
				condition_immunities : "charmed, exhaustion, poisoned",
				senses : "",
				passivePerception : 10,
				languages : "",
				challengeRating : "1",
				proficiencyBonus : 2,
				proficiencyBonusLinked : true,
				attacksAction : 1,
				attacks : [{
					name : "Slam",
					ability : 1,
					damage : [2, 6, "bludgeoning"],
					modifiers : ["Prof", ""],
					range : "Melee (5 ft)",
					abilitytodamage : true,
					description : "10th level: push 10 ft (target its size or smaller), Str save or prone"
				}],
				traits : [{
					name : "Inanimate",
					description : "Incapacitated without its Pilot; Int/Wis/Cha checks and saves target the Pilot; the Pilot makes concentration saves when the Rig takes damage."
				}, {
					name : "Ironsides",
					description : "It reduces damage it takes by its Con mod (3); acid and force damage bypass this."
				}, {
					name : "Siege Engine",
					description : "Its weapon attacks and spells deal maximum damage to nonmagical objects and structures."
				}, {
					name : "Modular Rig (Junker 5)",
					minlevel : 5,
					description : "It counts as separate items for Infusions (torso, legs, head, Slam limbs). It and its Pilot get Extra Attack."
				}, {
					name : "Titanic Rig (Junker 15)",
					minlevel : 15,
					description : "It uses the Titanic Rig stats: Str 22, Dex 6, Con 19, 40 ft, climb 30 ft, resistance to nonmagical B/P/S, Ironsides 4, Immutable Form, Slam 3d6+6; Titanic Transformation (Huge for 1 min, +1d6 Slam, +5 ft reach, +Int to Str checks/saves) once per dawn or with a 5th-level slot."
				}],
				calcChanges : {
					hp : function (totalHD, HDobj, prefix) {
						if (!classes.known["artificer(laserllama)"]) return;
						var lvl = classes.known["artificer(laserllama)"].level;
						HDobj.alt.push(5 + 5 * lvl);
						HDobj.altStr.push(" = 5 as a base\n + 5 \xD7 " + lvl + " from five times its creator's artificer level (" + (5 * lvl) + ")");
					},
					setAltHp : true
				}
			}]
		},
		"subclassfeature5" : {
			name : "Extra Attack & Modular Rig",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("I or my Rig attack twice with the Attack action; after casting a spell, a weapon attack as a bonus action; the Rig counts as separate items for Infusions"),
			action : [["bonus action", " (after casting a spell)"]]
		},
		"subclassfeature10" : {
			name : "Hulking Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When my Rig hits a target its size or smaller with Slam, it can push it 10 ft and it must make a Str save or fall prone")
		},
		"subclassfeature15" : {
			name : "Master Junker",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("My Rig becomes a Titanic Rig (see the Companion page traits)")
		}
	}
});

var LLAutomatonModels = {
	"agent model" : { name : "Agent Model", lvl : 0, d : "Action: I perceive through its senses (blind to mine) within 1 mile; end as a bonus action" },
	"anchor model" : { name : "Anchor Model", lvl : 0, d : "Action: latch onto a target within 5 ft, its speed -5\xD7Int mod ft (Str check vs. my DC as action to remove)" },
	"arcane model" : { name : "Arcane Model", lvl : 0, d : "My Artificer spells can originate from it (within 60 ft); its Slam deals force damage" },
	"artisan model" : { name : "Artisan Model", lvl : 0, d : "Proficient with one tool set; action: a check with it adding my Int mod" },
	"assault model" : { name : "Assault Model", lvl : 0, d : "Its Slam deals 1d10 force damage" },
	"amphibian model" : { name : "Amphibian Model", lvl : 5, d : "30 ft swimming speed; adv. on Slam attacks while swimming" },
	"arachnid model" : { name : "Arachnid Model", lvl : 5, d : "30 ft climbing speed, including sheer walls and ceilings" },
	"archer model" : { name : "Archer Model", lvl : 5, d : "Its Slam can be a ranged weapon attack (60 ft) dealing piercing damage" },
	"armor model" : { name : "Armor Model", lvl : 5, d : "Action: attaches to a willing creature within 5 ft: +Int mod (min +1) AC" },
	"avenger model" : { name : "Avenger Model", lvl : 10, d : "My reaction when a creature within 25 ft attacks or forces a save: it moves and Slams it (+1d6 bludgeoning)" },
	"avian model" : { name : "Avian Model", lvl : 10, d : "30 ft flying speed; opportunity attacks vs. it have disadv. while flying" }
};
AddSubClass("artificer(laserllama)", "machinist", {
	regExpSearch : /machinist/i,
	subname : "Machinist",
	fullname : "Machinist",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["smith's tools"], " and Sleight of Hand", { skills : ["Sleight of Hand"] }),
		"subclassfeature3.1" : LLArtSpecSpells("Machinist", ["color spray", "unseen servant", "cloud of daggers", "cordon of arrows", "spirit guardians", "tiny servant", "faithful hound", "summon construct", "animate objects", "awaken"], "color spray, unseen servant"),
		"subclassfeature3.2" : (function () {
			var oFea = {
				name : "Automatons",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : levels.map(function (n) {
					var nA = n < 5 ? 1 : n < 15 ? 2 : 3;
					return LLdesc([
						"During a long rest, 1 hour with smith's tools crafts Int mod (min 1) Automatons (max Int mod at once); action + slot: one more" + (n < 10 ? "" : " (slot level = number)"),
						"Each has " + (n < 5 ? "one Model" : "two Models") + " (\"Choose Feature\" lists the known designs); bonus action: activate one and throw it 30 ft",
						"Up to " + nA + " active for 1 hour; bonus action: order " + (nA > 1 ? "all of them" : "it") + " to move and Slam or use its Model action"
					]);
				}),
				action : [["bonus action", "Activate/command Automatons"]],
				extraname : "Automaton Model",
				extrachoices : [],
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : 11; }),
				creaturesAdd : [["Automaton (LL)"]],
				creatureOptions : [{
					name : "Automaton (LL)",
					source : [["GMB:LL", 0]],
					size : 5,
					type : "Construct",
					alignment : "Unaligned",
					ac : "13+oInt",
					hp : 8,
					hd : [1, 4],
					minlevelLinked : ["artificer(laserllama)"],
					speed : "25 ft",
					scores : [10, 16, 14, 4, 2, 2],
					damage_immunities : "poison, psychic",
					condition_immunities : "charmed, exhaustion, poisoned",
					senses : "",
					passivePerception : 6,
					languages : "understands the languages of its creator",
					challengeRating : "0",
					proficiencyBonus : 2,
					proficiencyBonusLinked : true,
					attacksAction : 1,
					attacks : [{
						name : "Slam",
						ability : 4,
						damage : [1, 6, "bludgeoning"],
						modifiers : ["oInt+Prof-Int", "3"],
						range : "Melee (5 ft)",
						abilitytodamage : false,
						description : "To hit: creator's Int + PB; magical from 5th level"
					}],
					traits : [{
						name : "Model",
						description : "It has the benefits of one Model (two from the creator's 5th level)."
					}, {
						name : "Replaceable Parts",
						description : "When mending is cast on it, it regains 2d6 HP."
					}, {
						name : "Master Machinist (Machinist 15)",
						minlevel : 15,
						description : "It has resistance to nonmagical bludgeoning, piercing, and slashing damage."
					}],
					calcChanges : {
						hp : function (totalHD, HDobj, prefix) {
							if (!classes.known["artificer(laserllama)"]) return;
							var lvl = classes.known["artificer(laserllama)"].level;
							HDobj.alt.push(5 + lvl);
							HDobj.altStr.push(" = 5 as a base\n + " + lvl + " from its creator's artificer level");
						},
						setAltHp : true
					}
				}]
			};
			for (var sM in LLAutomatonModels) {
				var o = LLAutomatonModels[sM];
				oFea.extrachoices.push(o.name);
				oFea[sM] = { name : o.name, source : [["GMB:LL", 0]], description : LLdesc(o.d) };
				if (o.lvl) {
					oFea[sM].prerequisite = o.lvl + "th-level Artificer";
					oFea[sM].prereqeval = (function (nL) { return function (v) { return LLArtLvl() >= nL; }; })(o.lvl);
				}
			}
			return oFea;
		})(),
		"subclassfeature5" : {
			name : "Automated Army & Improved Designs",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("Two Automatons active (three at 15th) commanded with one bonus action; each has two Models and magical attacks")
		},
		"subclassfeature10" : {
			name : "Efficient Construction",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("When I expend a slot to create Automatons, I create one per slot level (within my maximum)")
		},
		"subclassfeature15" : {
			name : "Master Machinist",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I make a save or am hit, reaction: swap places with an active Automaton within 60 ft (it becomes the target); Automatons resist nonmagical B/P/S"),
			action : [["reaction", "Swap with Automaton"]]
		}
	}
});

AddSubClass("artificer(laserllama)", "mechanic", {
	regExpSearch : /mechanic/i,
	subname : "Mechanic",
	fullname : "Mechanic",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["smith's tools", "vehicles (land)"]),
		"subclassfeature3.1" : {
			name : "Roadster",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I can't be knocked from a vehicle while conscious; once per turn, reaction: reduce bludgeoning, fire, piercing, slashing, or thunder damage by my Int mod"),
			action : [["reaction", "Roadster (reduce damage)"]]
		},
		"subclassfeature3.2" : LLArtSpecSpells("Mechanic", ["grease", "zephyr strike", "enlarge/reduce", "heat metal", "haste", "thunder step", "freedom of movement", "fire shield", "creation", "steel wind strike"], "grease, zephyr strike"),
		"subclassfeature3.3" : {
			name : "Autocycle",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"During a long rest, 1 hour with smith's tools builds my Autocycle (Medium vehicle mount only I control; see Companion page)",
				"While riding, it acts on my turn and I use its actions; reaction: an attack vs. it targets me; one Infusion (wheels, chassis, ram)"
			]),
			creaturesAdd : [["Autocycle (LL)"]],
			creatureOptions : [{
				name : "Autocycle (LL)",
				source : [["GMB:LL", 0]],
				size : 3,
				type : "Vehicle",
				alignment : "Unaligned",
				ac : "10+oInt+Prof",
				hp : 20,
				hd : [0, 0],
				minlevelLinked : ["artificer(laserllama)"],
				speed : "30 ft + 5\xD7 creator's Int mod",
				scores : [13, 18, 12, 1, 1, 1],
				damage_immunities : "poison, psychic",
				condition_immunities : "blinded, charmed, deafened, frightened, paralyzed, poisoned, unconscious",
				senses : "",
				passivePerception : 5,
				languages : "",
				challengeRating : "0",
				proficiencyBonus : 2,
				proficiencyBonusLinked : true,
				attacksAction : 1,
				attacks : [{
					name : "Ram",
					ability : 2,
					damage : [1, 10, "bludgeoning"],
					modifiers : ["Prof", "Prof"],
					range : "Melee (5 ft)",
					abilitytodamage : true,
					description : "After 20 ft straight: Str save or prone (Mechanical Momentum)"
				}],
				traits : [{
					name : "Expert Handling & Inanimate",
					description : "With its rider, it adds the rider's PB to its checks and saves; without a rider it's incapacitated; mental checks/saves target the rider."
				}, {
					name : "Jump, Prone Deficiency, Swerve",
					description : "After 30 ft straight, it jumps gaps up to 60 ft. Prone: incapacitated until a creature uses an action to right it. The rider's reaction gives it adv. on a Dex save."
				}, {
					name : "Afterburn (Mechanic 5)",
					minlevel : 5,
					description : "Once per turn moving within 5 ft of a creature: Dex save or 1d10 + Int fire and no OA vs. me (2d10, every creature passed, from 15th). It carries two Medium creatures and 100 lb."
				}, {
					name : "Expert Rider (Mechanic 10)",
					minlevel : 10,
					description : "Ignores difficult terrain; OAs vs. it and its riders have disadv.; self spells can also affect it; allies can mount as a reaction."
				}, {
					name : "Master Mechanic (Mechanic 15)",
					minlevel : 15,
					description : "Flying speed equal to walking speed, hover; riders can't be targeted by OAs while it moves."
				}],
				calcChanges : {
					hp : function (totalHD, HDobj, prefix) {
						if (!classes.known["artificer(laserllama)"]) return;
						var lvl = classes.known["artificer(laserllama)"].level;
						HDobj.alt.push(5 + 5 * lvl);
						HDobj.altStr.push(" = 5 as a base\n + 5 \xD7 " + lvl + " from five times its creator's artificer level (" + (5 * lvl) + ")");
					},
					setAltHp : true
				}
			}]
		},
		"subclassfeature5" : {
			name : "Afterburn",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("Once per turn when riding and moving within 5 ft of a creature: Dex save or 1d10 + Int fire and it can't make OAs vs. me this turn; carries 2 Medium creatures")
		},
		"subclassfeature10" : {
			name : "Expert Rider",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Riding: ignore difficult terrain, OAs vs. it and riders have disadv., self spells also affect it, allies can mount as a reaction")
		},
		"subclassfeature15" : {
			name : "Master Mechanic",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("My Autocycle flies (= walking speed, hover); riders can't be OA'd while it moves; Afterburn 2d10 vs. every creature I pass (once each per turn)")
		}
	}
});

AddSubClass("artificer(laserllama)", "puppeteer", {
	regExpSearch : /puppeteer/i,
	subname : "Puppeteer",
	fullname : "Puppeteer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["weaver's tools"], " and Sleight of Hand", { skills : ["Sleight of Hand"] }),
		"subclassfeature3.1" : {
			name : "Arcane Strings",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var r = n < 10 ? 30 : 60;
				return LLdesc([
					"During a long rest, 1 hour with weaver's tools crafts my Arcane Strings (whip I'm proficient with, focus, always Wondrous Whip infused)",
					"Willing creatures within " + r + " ft: Correct (reaction: reroll a missed melee attack), Guide (reaction: +Int mod to a check with a skill I know),",
					"Move (bonus action: move it half its speed without OAs)" + (n < 5 ? "" : "; Channel (cast a spell from it), Strike (reaction: one extra attack)")
				]);
			}),
			action : [["bonus action", "Arcane Strings: Move"], ["reaction", "Arcane Strings: Correct/Guide/Strike"]]
		},
		"subclassfeature3.2" : LLArtSpecSpells("Puppeteer", ["ensnaring strike", "entangle", "crown of madness", "hold person", "hypnotic pattern", "slow", "dominate beast", "grasping vine", "dominate person", "hold monster"], "ensnaring strike, entangle"),
		"subclassfeature5" : {
			name : "Skillful Strings",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("New String abilities: Channel (cast a spell originating from the target; I concentrate) and Strike (reaction: it makes one additional attack)")
		},
		"subclassfeature10" : {
			name : "Nimble Fingers",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I gain an extra reaction each round only for Arcane Strings abilities; their range becomes 60 ft")
		},
		"subclassfeature15" : {
			name : "Master Puppeteer",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("My Strings cast irresistible dance once per long rest (from 17th level, again with a 5th-level slot)"),
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : [{ name : "Master Puppeteer", spells : LLSpellList(["irresistible dance"]), selection : LLSpellList(["irresistible dance"]), firstCol : "oncelr" }]
		}
	}
});

AddSubClass("artificer(laserllama)", "reanimator", {
	regExpSearch : /reanimator/i,
	subname : "Reanimator",
	fullname : "Reanimator",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLArtTools(["leatherworker's tools"], " and Nature", { skills : ["Nature"] }),
		"subclassfeature3.1" : {
			name : "Reanimated Thrall",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"1-minute ritual with leatherworker's tools on a creature dead < 8 hours: it rises as my Thrall (one at a time; once per creature)",
					"Max CR " + Math.floor(n / 3) + "; beasts, humanoids, monstrosities" + (n < 10 ? "" : ", aberrations, dragons, giants") + "; it keeps its stat block, becomes undead too, no Hit Dice or rests",
					"It acts on my turn (Dodge unless I command it with a bonus action); its spells cost my spell slots"
				]);
			}),
			action : [["bonus action", "Command Thrall"]]
		},
		"subclassfeature3.2" : LLArtSpecSpells("Reanimator", ["false life", "longstrider", "gentle repose", "locate creature", "life transference", "summon undead", "blight", "polymorph", "enervation", "raise dead"], "false life, longstrider"),
		"subclassfeature5" : {
			name : "Extra Attack & Necrotic Preservation",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc([
				"I attack twice with the Attack action; I can forgo one to order my Thrall to make one attack",
				"Gentle repose on a potential Thrall can turn it into a small Trinket; I can later raise it from the Trinket"
			])
		},
		"subclassfeature10" : {
			name : "Advanced Reanimations",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I can also raise aberrations, dragons, and giants as Thralls (within the CR limit)")
		},
		"subclassfeature15" : {
			name : "Master Reanimator",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When my Thrall drops to 0 HP (not killed outright), reaction + a spell slot: it drops to 10\xD7 slot level HP instead"),
			action : [["reaction", "Preserve Thrall (spell slot)"]]
		}
	}
});

// ===================================================================================
// INVENTIVE FEAT (Alternate Artificer Expanded v3.1.1)
// ===================================================================================
FeatsList["inventive adept"] = LLInfusionChoices({
	name : "Inventive Adept",
	source : [["GMB:LL", 0]],
	prerequisite : "Intelligence 13 or higher",
	prereqeval : function (v) { return LLScore("Int") >= 13; },
	descriptionFull : "You have spent many days tinkering with various inventions, tool sets, and arcane forces. You gain the following benefits:\n \u2022 Increase your Intelligence score by 1, to a maximum of 20.\n \u2022 You gain proficiency with tinker's tools. If you are already proficient, then whenever you make an ability check with tinker's tools you treat a d20 roll of 9 or lower as a 10.\n \u2022 You learn one Infusion of your choice from those available to the Alternate Artificer. At the end of each long rest, you can infuse this Infusion into one object, following the Infusion rules outlined by the Alternate Artificer class.",
	description : "I gain proficiency with tinker's tools (or treat d20 rolls of 9 or lower as 10 with them). I learn one Infusion (select it with the \"Choose Feat Feature\" button) and can infuse one object at the end of each long rest. [+1 Intelligence]",
	scores : [0, 0, 0, 1, 0, 0],
	toolProfs : ["Tinker's tools"],
	choices : [],
	extrachoices : []
}, false);
(function () {
	// convert the extrachoices built by LLInfusionChoices into choices for the feat (only Infusions without prerequisite level)
	var oF = FeatsList["inventive adept"];
	oF.choices = [];
	for (var s in LLInfusions) {
		if (LLInfusions[s].infLevel) { delete oF[LLInfusions[s].name.toLowerCase()]; continue; }
		var oCh = oF[LLInfusions[s].name.toLowerCase()];
		if (!oCh) continue;
		oF.choices.push(LLInfusions[s].name);
		oCh.description = oF.description;
		if (oCh.toNotesPage) oCh.toNotesPage[0].amendTo = undefined;
	}
	delete oF.extrachoices;
})();

// ======================================================================
// LaserLlama - Alternate Blood Hunter v2.2.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Alternate Blood Hunter"
	Effect:		This script adds the Alternate Blood Hunter class, its 6 Occult Orders, Blood Rites and Mutagens.
				Alternate Blood Hunter v2.2.0 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Blood Hunter (LaserLlama)" in the Class field (e.g. "Order of the Pale Moon Blood Hunter (LaserLlama)")
				The Blood Hunter class of the official/Critical Role script uses "blood hunter" without "laserllama".
*/


if (typeof LLAddFightingStyles !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

if (ClassList["blood hunter"]) ClassList["blood hunter"].regExpSearch = /^(?=.*blood)(?=.*hunter)(?!.*laserllama).*$/i;
LLBHLvl = function () { return classes.known["blood hunter(laserllama)"] ? classes.known["blood hunter(laserllama)"].level : 0; };
LLBHDie = function (n) {
	var bThirst = classes.known["blood hunter(laserllama)"] && classes.known["blood hunter(laserllama)"].subclass === "blood hunter(laserllama)-undying thirst" && n >= 3;
	if (bThirst) return n < 5 ? "d6" : n < 11 ? "d8" : n < 17 ? "d10" : "d12";
	return n < 2 ? "" : n < 5 ? "d4" : n < 11 ? "d6" : n < 17 ? "d8" : "d10";
};

/*	Blood Rites: [key, name, level, action, description, empowered]
*/
var LLBloodRiteData = [
	["rite of agony", "Rite of Agony", 0, "bonus action", "A creature within 30 ft: Con save or disadv. on Str/Dex checks and saves and RD necrotic each time it attacks, until the end of my next turn", "1 minute (save at end of each turn)"],
	["rite of anxiety", "Rite of Anxiety", 0, "bonus action", "A creature within 30 ft: for 1 min, checks to influence it add my Rite Die", "it subtracts RD from its first Int/Wis/Cha save before my next turn ends"],
	["rite of binding", "Rite of Binding", 0, "bonus action", "A Large or smaller creature within 30 ft: Str save or speed 0 and no reactions until the end of my next turn", "any size, 1 minute (save at end of each turn)"],
	["rite of blindness", "Rite of Blindness", 0, "reaction", "When a creature within 30 ft hits with an attack (I see both), it subtracts my Rite Die from the attack roll", "it subtracts RD from all its attacks until the end of its next turn"],
	["rite of confusion", "Rite of Confusion", 0, "bonus action", "A concentrating creature within 30 ft: Wis save or it loses concentration", "it subtracts RD from the save"],
	["rite of knowledge", "Rite of Knowledge", 0, "", "I know four ritual spells of any list, of a level up to my Prof Bonus; casting them requires a Vital Sacrifice", ""],
	["rite of revelation", "Rite of Revelation", 0, "", "When I use Sinister Insight, I automatically succeed", "one immunity becomes resistance or one resistance is dispelled for 1 min (or learn three characteristics)"],
	["rite of siphoning", "Rite of Siphoning", 0, "action", "A creature I touch: Cha save or 2 RD necrotic (half on save); I gain temp HP equal to the damage", "the damage is maximized"],
	["rite of the beast", "Rite of the Beast", 5, "action", "A living beast I touch: Cha save or enthralled for 1 hour (acts on my turn, Dodge unless commanded with a bonus action)", "until the end of my next long rest"],
	["rite of bonding", "Rite of Bonding", 5, "action", "A willing creature I touch: 1 hour, within 60 ft it resists all damage but I take the same damage it takes", "8 hours, up to 1 mile apart"],
	["rite of corrosion", "Rite of Corrosion", 5, "bonus action", "A creature within 30 ft: Con save or RD poison and poisoned for 1 min (save at end of each turn)", "lasts until it succeeds; 2 RD poison on each failure"],
	["rite of exposure", "Rite of Exposure", 5, "bonus action", "A creature within 30 ft: until the end of my next turn, damage ignores its resistances and immunities become resistances", "its condition immunities are ignored too (adv. on those saves)"],
	["rite of marking", "Rite of Marking", 5, "bonus action", "A creature within 30 ft: adv. on my attacks vs. it until the end of my next turn", "I also add my RD to weapon attack rolls vs. it"],
	["rite of the puppet", "Rite of the Puppet", 5, "reaction", "When a creature within 30 ft is slain, it stands, moves its speed, and makes a weapon attack vs. a creature I choose", "it adds my RD to that attack and damage roll"],
	["rite of aggression", "Rite of Aggression", 9, "action", "A willing creature I touch, 1 min: +1 attack with Attack/Multiattack, Dash as a bonus action, +2 AC and Dex saves; RD necrotic if it doesn't damage; Con save or 1 exhaustion at the end", ""],
	["rite of dread", "Rite of Dread", 9, "bonus action", "A creature within 30 ft that sees/hears me: Wis save or frightened for 1 min, fleeing (save when it can't see me at the end of its turn)", "stunned while it can see me (save when damaged)"],
	["rite of the open grave", "Rite of the Open Grave", 9, "action", "A creature dead within 1 minute returns at 1 HP with a permanent death save failure (until remove curse)", "instead it gains 1 exhaustion"],
	["rite of the senseless", "Rite of the Senseless", 9, "bonus action", "A creature within 30 ft: Con save or blinded, deafened, and silent for 1 min (save at end of each turn)", "also speed 0 and no reactions"],
	["rite of decay", "Rite of Decay", 13, "action", "A creature within 30 ft: Con save or 4 RD necrotic, half speed, no reactions; action to save: success ends, failure 2 RD necrotic + 1 exhaustion", "ignores necrotic resistance (immunity = resistance); killed creatures turn to dust"],
	["rite of nightmares", "Rite of Nightmares", 13, "action", "A creature within 30 ft: Wis save or 4 RD psychic and frightened for 1 min; save each turn (fail: 2 RD psychic)", "also incapacitated and speed 0"],
	["rite of thralldom", "Rite of Thralldom", 13, "action", "A humanoid I touch: Cha save or enthralled for 1 min (acts on my turn, Dodge unless commanded)", "up to 1 hour"],
	["rite of exsanguination", "Rite of Exsanguination", 17, "action", "A creature within 30 ft: Con save (disadv. if I damaged it since my last turn) or 12 RD necrotic, half on save; once per short rest (no Vital Sacrifice)", "ignores necrotic resistance; killed creatures turn to dust"],
	["rite of reaping", "Rite of Reaping", 17, "action", "Creatures of my choice within 60 ft: Con save (disadv. if I damaged them) or 5 RD necrotic, half on save; once per short rest (no Vital Sacrifice)", "ignores necrotic resistance; killed creatures turn to dust"],
	["rite of rejuvenation", "Rite of Rejuvenation", 17, "action", "A willing living creature I touch gains the benefits of a short rest, loses 1 year and 1 day of life span, and gains 1 exhaustion; once per short rest", ""]
];
LLBloodRites = {};
for (var iR = 0; iR < LLBloodRiteData.length; iR++) {
	(function (a) {
		var o = {
			name : a[1],
			source : [["GMB:LL", 0]],
			description : levels.map(function (n) {
				var sD = LLBHDie(n) || "d4";
				var aD = [a[4].replace(/\bRD\b/g, "1" + sD).replace(/(\d+) RD\b/g, "$1" + sD)];
				if (a[5]) aD.push("Empowered (+1 Vital Sacrifice): " + a[5].replace(/(\d+) RD\b/g, "$1" + sD).replace(/\bRD\b/g, "1" + sD));
				return LLdesc(aD);
			}),
			riteLevel : a[2]
		};
		if (a[3]) o.action = [[a[3], ""]];
		if (a[2]) {
			o.prerequisite = a[2] + "th-level Blood Hunter";
			o.submenu = "[blood hunter level " + (a[2] < 10 ? " " : "") + a[2] + "+]";
			o.prereqeval = function (v) { return LLBHLvl() >= a[2]; };
		}
		LLBloodRites[a[0]] = o;
	})(LLBloodRiteData[iR]);
}
LLBloodRiteFeature = function (oFea, bPrereq) {
	if (!oFea.extrachoices) oFea.extrachoices = [];
	for (var s in LLBloodRites) {
		var oR = LLBloodRites[s], oNew = {};
		for (var att in oR) { if (att !== "riteLevel" && (bPrereq || !(/prereq|submenu/).test(att))) oNew[att] = oR[att]; }
		oFea.extrachoices.push(oR.name);
		oFea[s] = oNew;
	}
	return oFea;
};
LLRiteDieTxt = levels.map(function (n) { return LLBHDie(n) ? "Rite Die " + LLBHDie(n) : ""; });

ClassList["blood hunter(laserllama)"] = {
	name : "Blood Hunter (LaserLlama)",
	regExpSearch : /^(?=.*blood)(?=.*hunter)(?=.*laserllama).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Strength or Dexterity, and Constitution",
	prereqs : "Strength 13 or Dexterity 13, and Constitution 13",
	die : 12,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Con", "Cha"],
	abilitySave : 3,
	skillstxt : {
		primary : "Choose two from Athletics, Acrobatics, Arcana, History, Insight, Investigation, Nature, Religion, and Survival"
	},
	toolProfs : {
		primary : ["Alchemist's supplies"],
		secondary : ["Alchemist's supplies"]
	},
	armorProfs : {
		primary : [true, true, false, true],
		secondary : [true, true, false, true]
	},
	weaponProfs : {
		primary : [true, true],
		secondary : [true, true]
	},
	equipment : "Blood Hunter (LaserLlama) starting equipment:" +
		"\n \u2022 A martial weapon -or- two simple weapons;" +
		"\n \u2022 A light crossbow and 20 bolts -or- four javelins;" +
		"\n \u2022 Studded leather armor -or- scale mail;" +
		"\n \u2022 Alchemist's supplies and an explorer's pack." +
		"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Occult Order", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"fighting style" : LLAddFightingStyles({
			name : "Fighting Style",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("Choose a Fighting Style with the \"Choose Feature\" button above; I can replace it when I gain a level")
		}, LLFightingStyleLists["blood hunter"], false),
		"hunter's bane" : {
			name : "Hunter's Bane",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"Occult Lore: proficiency (or expertise) in Arcana, Nature, or Religion",
				"Sinister Insight: bonus action, a creature within 30 ft: Con check (DC 8 + CR) with Arcana (aberration, dragon, monstrosity),",
				"Nature (beast, elemental, ooze, plant), or Religion (celestial, fey, fiend, undead); success: AC, senses, resistances, highest/",
				"lowest ability, or one trait; failure: not again until a long rest or I damage it"
			]),
			skillstxt : "Choose one from Arcana, Nature, or Religion (expertise if already proficient)",
			action : [["bonus action", "Sinister Insight"]]
		},
		"blood rites" : LLBloodRiteFeature({
			name : "Blood Rites",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"I know Blood Rites (\"Choose Feature\"); each once per short rest for free, then with a Vital Sacrifice",
					"Rites only affect creatures with blood unless I make a Vital Sacrifice; I can swap one Rite when I gain a level",
					"Vital Sacrifice: reduce max and current HP by my Rite Die" + (n < 11 ? "" : " (roll twice, choose)") + " (temp HP can take the current part); max HP returns after a long rest",
					"Rite save DC = 8 + Prof Bonus + Con mod; Empowered Rites need one extra Vital Sacrifice"
				]);
			}),
			additional : LLRiteDieTxt,
			extraname : "Blood Rite",
			extraTimes : [0, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6]
		}, true),
		"crimson offering" : {
			name : "Crimson Offering",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I make a Vital Sacrifice: for 1 hour, a weapon I wield deals +Rite Die damage of the type I choose",
					"Acid, cold, fire, lightning, or poison" + (n < 11 ? "" : ", or necrotic, psychic, or thunder") + (n < 6 ? "" : "; once per short rest without a Vital Sacrifice (Crimson Brand)")
				]);
			}),
			additional : LLRiteDieTxt,
			action : [["bonus action", ""]],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/crimson/i).test(v.WeaponText) && !v.isSpell && classes.known["blood hunter(laserllama)"]) {
							fields.Description += (fields.Description ? "; " : "") + "+1" + LLBHDie(classes.known["blood hunter(laserllama)"].level) + " Crimson Offering damage";
						}
					},
					"If I include the word 'Crimson' in a weapon's name, it shows my Crimson Offering bonus damage."
				]
			}
		},
		"subclassfeature3" : {
			name : "Occult Order",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Choose an Occult Order and put it in the \"Class\" field; Order features use my Rite save DC")
		},
		"extra attack" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("I can attack twice when I take the Attack action; when I use my action for a Blood Rite, I can make a weapon attack as a bonus action"),
			action : [["bonus action", "Weapon attack (after action Rite)"]]
		},
		"grim psychometry" : {
			name : "Grim Psychometry",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : levels.map(function (n) {
				return LLdesc([
					"With alchemist's supplies, I cast identify as a ritual and learn whether the object is cursed and how"
				].concat(n < 9 ? [] : ["Improved: legend lore on an object, creature, or location I touch (evil/violent/cursed history), with a Vital Sacrifice instead of a slot"]));
			}),
			spellcastingBonus : [{
				name : "Grim Psychometry",
				spells : ["identify"],
				selection : ["identify"],
				firstCol : "(R)"
			}]
		},
		"grim psychometry 9" : {
			name : "Improved Psychometry",
			source : [["GMB:LL", 0]],
			minlevel : 9,
			description : "",
			spellcastingBonus : [{
				name : "Improved Psychometry",
				spells : ["legend lore"],
				selection : ["legend lore"],
				firstCol : "VS"
			}]
		},
		"crimson brand" : {
			name : "Crimson Brand",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : levels.map(function (n) {
				return LLdesc([
					"When I damage a creature with a Crimson Offering weapon, I can Brand it (until it dies, I Brand another, or remove curse):",
					"I know its direction (same plane), adv. on Sinister Insight vs. it; when it damages me or an ally within 15 ft, it takes " + (n < 14 ? "1" : "2") + LLBHDie(n) + " necrotic"
				].concat(n < 14 ? [] : ["Crimson Anchor: if it tries to teleport or move by magic: Cha save or it fails and takes 4" + LLBHDie(n) + " necrotic"]));
			}),
			usages : 1,
			recovery : "short rest",
			additional : "then Vital Sacrifice"
		},
		"dark augmentation" : {
			name : "Dark Augmentation",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I add my Rite Die to Strength, Dexterity, and Constitution checks and saving throws"),
			savetxt : { text : ["+Rite Die to Str/Dex/Con saves"] }
		},
		"vital control" : {
			name : "Vital Control",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("I roll the Rite Die twice for Vital Sacrifices and choose; once per long rest, I can skip one Vital Sacrifice"),
			usages : 1,
			recovery : "long rest"
		},
		"hardened soul" : {
			name : "Hardened Soul",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I add my Rite Die to Intelligence, Wisdom, and Charisma saving throws"),
			savetxt : { text : ["+Rite Die to Int/Wis/Cha saves"] }
		},
		"sanguine mastery" : {
			name : "Sanguine Mastery",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("I roll Rite Dice twice and choose for my Blood Hunter features; Vital Sacrifices are reduced by my Con mod (min 1, result min 1)")
		}
	}
};

// ===================================================================================
// OCCULT ORDERS
// ===================================================================================
var LLMutagenData = [
	["aberrant sight", "Aberrant Sight", 0, "Darkvision 60 ft (or +60 ft); I can see through magical darkness within it"],
	["aquatic adaptation", "Aquatic Adaptation", 0, "Swimming speed = walking speed, breathe air and water (with a swim speed already: Dash as a bonus action while swimming)"],
	["enhanced movement", "Enhanced Movement", 0, "While walking, I can Dash as a bonus action"],
	["grappling appendage", "Grappling Appendage", 0, "A tentacle with 10 ft reach for unarmed strikes (Rite Die bludgeoning), Shove, Grapple, simple tasks (two from 13th level)"],
	["knotted flesh", "Knotted Flesh", 0, "Con instead of Dex for AC in armor; without armor, AC 13 + Con mod"],
	["monstrous glide", "Monstrous Glide", 0, "Subtract 100 ft from falls; glide 2 ft horizontally per 1 ft fallen"],
	["oozing form", "Oozing Form", 0, "Bonus action: ooze-like state, squeeze through 1-inch gaps (can't attack)"],
	["unnatural physicality", "Unnatural Physicality", 0, "+Rite Die to Strength, Constitution, and Acrobatics checks"],
	["acidic bile", "Acidic Bile", 7, "I know acid splash (Con) and add my Con mod (min +1) to its damage"],
	["corrosive blood", "Corrosive Blood", 7, "Reaction when hit by a creature within 15 ft: it takes Rite Die + Con mod acid"],
	["dislocated reach", "Dislocated Reach", 7, "My arms' length doubles: +5 ft reach on melee attacks"],
	["engorged physique", "Engorged Physique", 7, "I grow one size: +5 ft reach, weight \xD78, +Rite Die on melee weapon hits"],
	["inoculated vigor", "Inoculated Vigor", 7, "Immunity to acid and poison damage, disease, and the poisoned condition"],
	["toxic symbiosis", "Toxic Symbiosis", 7, "When I hit a living creature in melee, bonus action: temp HP = Con mod (min 1)"],
	["viscous grip", "Viscous Grip", 7, "Climbing speed = walking speed (no checks); disadv. on checks/saves to escape my grapples"],
	["accelerated physiology", "Accelerated Physiology", 13, "One extra attack with the Attack action; if I end my turn without attacking, Rite Die necrotic"],
	["alchemical intellect", "Alchemical Intellect", 13, "Adv. on Int, Wis, and Cha saves; disadv. on Str, Dex, and Con saves"],
	["hideous regeneration", "Hideous Regeneration", 13, "If I start my turn below half HP (min 1), I regain Con mod (min 1) HP"],
	["monstrous flight", "Monstrous Flight", 13, "Flying speed equal to my walking speed"],
	["synthetic carapace", "Synthetic Carapace", 13, "+2 AC; resistance to nonmagical, nonsilvered bludgeoning, piercing, and slashing"]
];
AddSubClass("blood hunter(laserllama)", "alchemists", {
	regExpSearch : /^(?=.*order)(?=.*alchemists?).*$|^(?=.*alchemist)(?=.*blood hunter).*$/i,
	subname : "Order of Alchemists",
	fullname : "Order of Alchemists",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : (function () {
			var oFea = {
				name : "Aberrant Alchemy",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : LLdesc([
					"I have Latent Mutagens (\"Choose Feature\"); during a long rest, 1 hour with alchemist's supplies replaces one",
					"Mutate: bonus action, gain the benefits of Con mod (min 1) Latent Mutagens for 10 min (end as a bonus action)",
					"Once per short rest for free, then with a Vital Sacrifice"
				]),
				usages : 1,
				recovery : "short rest",
				action : [["bonus action", "Mutate"]],
				extraname : "Latent Mutagen",
				extrachoices : [],
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 7 ? 3 : n < 13 ? 5 : n < 18 ? 7 : 9; })
			};
			for (var i = 0; i < LLMutagenData.length; i++) {
				var a = LLMutagenData[i];
				oFea.extrachoices.push(a[1]);
				oFea[a[0]] = { name : a[1], source : [["GMB:LL", 0]], description : LLdesc(a[3]) };
				if (a[2]) {
					oFea[a[0]].prerequisite = a[2] + "th-level Blood Hunter";
					oFea[a[0]].prereqeval = (function (nL) { return function (v) { return LLBHLvl() >= nL; }; })(a[2]);
				}
			}
			return oFea;
		})(),
		"subclassfeature3.1" : {
			name : "Monstrous Awareness",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I add my Rite Die to checks with alchemist's supplies and to Sinister Insight vs. aberrations, monstrosities, and oozes")
		},
		"subclassfeature7" : {
			name : "Enduring Mutation",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("During a long rest, 1 hour makes one Latent Mutagen permanent (it always counts as one of my active Mutagens when I Mutate)")
		},
		"subclassfeature13" : {
			name : "Noxious Strike",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : levels.map(function (n) {
				return LLdesc("Once per turn on a melee hit: Con save or 4" + LLBHDie(n) + " acid and blinded or stunned for 1 min (save when damaged); half and no effect on save; then Vital Sacrifice");
			}),
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "long rest"
		},
		"subclassfeature18" : {
			name : "Rapid Mutation",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("While Mutated, as a bonus action I switch one active Mutagen for one of my Latent Mutagens"),
			action : [["bonus action", ""]]
		}
	}
});

AddSubClass("blood hunter(laserllama)", "heretics", {
	regExpSearch : /heretics?/i,
	subname : "Order of Heretics",
	fullname : "Order of Heretics",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Blasphemous Prayer",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I know Censure the Divine and one Cleric Domain 2nd-level Channel Divinity (my Blood Hunter level, Rite save DC)",
				"Each once per long rest, then with a Vital Sacrifice; only one per turn",
				"Censure the Divine: action, celestials, fiends, and divine casters of my choice within 30 ft: Cha save or restrained and incapacitated 1 min"
			]),
			usages : 2,
			recovery : "long rest",
			action : [["action", "Censure the Divine"]]
		},
		"subclassfeature3.1" : {
			name : "Heretical Knowledge",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency (or expertise) in Religion and two Cleric cantrips (Con); +Rite Die to Sinister Insight vs. celestials, fiends, undead"),
			skills : [["Religion", "increment"]],
			spellcastingBonus : [{
				name : "Heretical Knowledge",
				"class" : "cleric",
				level : [0, 0],
				spellcastingAbility : 3,
				times : 2
			}]
		},
		"subclassfeature7" : {
			name : "Unholy Restoration",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : levels.map(function (n) {
				return LLdesc("Action: a creature within 30 ft: Con save (disadv. if I touch it) or 4" + LLBHDie(n) + " necrotic (half on save); another creature within 30 ft regains half; then Vital Sacrifice");
			}),
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "long rest",
			action : [["action", ""]]
		},
		"subclassfeature13" : {
			name : "Divine Anathema",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("Censure the Divine + Vital Sacrifice: creatures within 30 ft: Cha save or -10 ft speed (repeat each turn; at 0 speed, petrified); celestials/fiends disadv.")
		},
		"subclassfeature18" : {
			name : "Utmost Transgression",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("As an action, I cast conjure celestial at 5th level (Con, no material, 1 min); once per short rest, then Vital Sacrifices equal to its CR"),
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : [{ name : "Utmost Transgression", spells : ["conjure celestial"], selection : ["conjure celestial"], spellcastingAbility : 3, firstCol : "oncesr" }]
		}
	}
});

AddSubClass("blood hunter(laserllama)", "pale moon", {
	regExpSearch : /^(?=.*pale)(?=.*moon).*$|lycan/i,
	subname : "Order of the Pale Moon",
	fullname : "Order of the Pale Moon",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Feral Senses",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("+Rite Die to Perception and Survival using sight, hearing, or smell, and to Sinister Insight vs. beasts, monstrosities, shapeshifters")
		},
		"subclassfeature3.1" : {
			name : "Lycanthropic Curse",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"My curse is based on a beast of CR 1 or lower; as a bonus action I Shift into Beast or Hybrid Form for up to 1 hour" + (n < 18 ? "" : " (or indefinitely)"),
					(n < 18 ? "Once per short rest for free, then Vital Sacrifice (also +1 hour)" : "I can Shift at will"),
					"Beast Form: its statistics, my HP and mental scores; natural weapons use my Rite Die and Rite DC; I keep my features",
					"Hybrid Form: +10 ft speed, climb = walk; unarmed strikes finesse, Rite Die piercing/slashing; bonus action: unarmed strike or Dash toward a foe"
				].concat(n < 7 ? [] : ["Lycan Warrior: magical attacks, resistance to nonmagical nonsilvered B/P/S; Crimson Offering on all my natural weapons"]));
			}),
			usages : levels.map(function (n) { return n < 18 ? 1 : "\u221E\xD7 per "; }),
			recovery : "short rest",
			action : [["bonus action", "Shift / Hybrid Strike"]],
			weaponOptions : [{
				regExpSearch : /^(?=.*hybrid)(?=.*(claws?|fangs?|strike)).*$/i,
				name : "Hybrid Claws & Fangs",
				source : [["GMB:LL", 0]],
				ability : 1,
				type : "Natural",
				damage : [1, 4, "slashing"],
				range : "Melee",
				description : "Finesse; piercing or slashing; Hybrid Form only; damage die = Rite Die",
				abilitytodamage : true
			}],
			weaponsAdd : ["Hybrid Claws & Fangs"],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/^(?=.*hybrid)(?=.*(claws?|fangs?|strike)).*$/i).test(v.WeaponName) && classes.known["blood hunter(laserllama)"]) {
							fields.Damage_Die = "1" + LLBHDie(classes.known["blood hunter(laserllama)"].level);
							if (What("Dex Mod") > What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod")) fields.Mod = 2;
						}
					},
					"My Hybrid Form claws and fangs use my Rite Die."
				]
			}
		},
		"subclassfeature7" : {
			name : "Lycan Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("While Shifted: magical attacks, resistance to nonmagical nonsilvered B/P/S; Crimson Offering can empower all my natural weapons")
		},
		"subclassfeature13" : {
			name : "Feral Prowess",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("If I start my turn Shifted below half HP (min 1), I regain Con mod (min 1) HP")
		},
		"subclassfeature18" : {
			name : "Lycanthropic Mastery",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I Shift at will and indefinitely; while Shifted, adv. on attacks vs. my Crimson Brand target and on saves it forces")
		}
	}
});

AddSubClass("blood hunter(laserllama)", "salt and iron", {
	regExpSearch : /^(?=.*salt)(?=.*iron).*$/i,
	subname : "Order of Salt & Iron",
	fullname : "Order of Salt & Iron",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Spectral Nature",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var sDur = n < 7 ? "until the end of my turn" : n < 13 ? "for 1 minute" : n < 18 ? "for 1 hour" : "indefinitely";
				return LLdesc([
					"I need half the sleep, food, and drink; bonus action: Spectral State " + sDur + " (end as a bonus action)" + (n < 18 ? "" : ", with fly speed = walk and hover"),
					"Resistance to nonmagical nonsilvered B/P/S; move through creatures/objects as difficult terrain (1d10 force per 5 ft if shunted)"
				]);
			}),
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "long rest",
			action : [["bonus action", "Spectral State"]]
		},
		"subclassfeature3.1" : {
			name : "Warrior of the Dawn",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("+Rite Die to Sinister Insight vs. undead; Crimson Offering can deal radiant, grant me necrotic resistance, and shed 30-ft bright light")
		},
		"subclassfeature7" : {
			name : "Curse Specialist",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("My Blood Rites affect creatures without blood; after a long rest, one Rite I know can be invoked one extra time for free")
		},
		"subclassfeature13" : {
			name : "Warrior Exorcist",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : levels.map(function (n) {
				return LLdesc("Bonus action: end charmed, frightened, or magical control on a willing creature within 30 ft; its source within 30 ft: Wis save or 4" + LLBHDie(n) + " radiant (half); then Vital Sacrifice");
			}),
			usages : 1,
			recovery : "short rest",
			action : [["bonus action", ""]]
		},
		"subclassfeature18" : {
			name : "Sacrificial Offering & Spectral Mastery",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc([
				"When I would drop to 0 HP (not killed outright), I can reduce my max HP by my Rite Die to drop to 1 HP",
				"I age 1 year per 10, don't need to sleep, eat, or drink; 6 hours of light activity is a long rest; Spectral State gives flight"
			])
		}
	}
});

AddSubClass("blood hunter(laserllama)", "undying thirst", {
	regExpSearch : /^(?=.*undying)(?=.*thirst).*$/i,
	subname : "Order of Undying Thirst",
	fullname : "Order of Undying Thirst",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLBloodRiteFeature({
			name : "Blood Magic Specialist",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I learn one extra Blood Rite (\"Choose Feature\"); my Rite Die is a d6 (d8 at 5th, d10 at 11th, d12 at 17th)",
				"My Crimson Offering can deal necrotic damage"
			]),
			extraname : "Bonus Blood Rite",
			extraTimes : levels.map(function (n) { return n < 3 ? 0 : 1; })
		}, true),
		"subclassfeature3.1" : {
			name : "Vampiric Nature",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("My Fangs are unarmed strikes dealing Rite Die + Str necrotic; +Rite Die to Sinister Insight vs. undead"),
			weaponOptions : [{
				regExpSearch : /^(?=.*vampir)(?=.*fangs?).*$|^fangs?$/i,
				name : "Vampiric Fangs",
				source : [["GMB:LL", 0]],
				ability : 1,
				type : "Natural",
				damage : [1, 6, "necrotic"],
				range : "Melee",
				description : "Unarmed strike; damage die = Rite Die",
				abilitytodamage : true
			}],
			weaponsAdd : ["Vampiric Fangs"],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/^(?=.*vampir)(?=.*fangs?).*$|^fangs?$/i).test(v.WeaponName) && classes.known["blood hunter(laserllama)"]) {
							fields.Damage_Die = "1" + LLBHDie(classes.known["blood hunter(laserllama)"].level);
						}
					},
					"My Vampiric Fangs use my Rite Die."
				]
			}
		},
		"subclassfeature7" : {
			name : "Essence Drain & Sinister Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"When I hit a creature, bonus action: Fang attack vs. it; on a hit, my max HP is restored by the damage (Con mod times per long rest)",
				"When I deal necrotic damage, temp HP = half of it; while I have them: resist necrotic, poison, nonmagical nonsilvered B/P/S (radiant dispels them)"
			]),
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			recovery : "long rest",
			action : [["bonus action", "Fang attack (Essence Drain)"]]
		},
		"subclassfeature13" : {
			name : "Misty Escape",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("Reaction when hit by an attack: I turn to mist, it misses, and I reappear within 30 ft; then Vital Sacrifice"),
			usages : 1,
			recovery : "short rest",
			action : [["reaction", ""]]
		},
		"subclassfeature18" : {
			name : "Crimson Lord",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Flying speed = walking speed; creatures I damage with Fangs have disadv. on saves vs. my Blood Rites until my next turn ends; I age 1 year per 10"),
			speed : { fly : { spd : "walk", enc : "walk" } }
		}
	}
});

var LLWitchKnightSpells = [
	"blade ward", "booming blade", "chill touch", "control flame", "friends", "frostbite", "green-flame blade", "infestation", "lightning lure", "mage hand", "magic stone", "mind sliver", "minor illusion", "poison spray", "prestidigitation", "resistance", "shocking grasp", "spare the dying", "sword burst", "toll the dead", "true strike",
	"absorb elements", "armor of agathys", "arms of hadar", "burning hands", "cause fear", "charm person", "compelled duel", "detect evil & good", "expeditious retreat", "false life", "hellish rebuke", "hex", "illusory script", "inflict wounds", "protection from good & evil", "searing smite", "shield", "thunderous smite", "unseen servant", "witch bolt",
	"branding smite", "cloud of daggers", "crown of madness", "darkness", "earthbind", "hold person", "invisibility", "mind spike", "mirror image", "misty step", "ray of enfeeblement", "scorching ray", "shadow blade", "shatter", "spider climb", "suggestion",
	"blinding smite", "counterspell", "dispel magic", "enemies abound", "fear", "hunger of hadar", "hypnotic pattern", "intellect fortress", "magic circle", "major image", "remove curse", "spirit shroud", "vampiric touch",
	"banishment", "blight", "charm monster", "dimension door", "elemental bane", "hallucinatory terrain", "phantasmal killer", "shadow of moil", "sickening radiance", "staggering smite"
];
AddSubClass("blood hunter(laserllama)", "witch knights", {
	regExpSearch : /^(?=.*witch)(?=.*knights?).*$/i,
	subname : "Order of Witch Knights",
	fullname : "Order of Witch Knights",
	source : [["GMB:LL", 0]],
	abilitySave : 3,
	spellcastingFactor : "warlock3",
	spellcastingTable : [[0, 0, 0, 0, 0, 0, 0, 0, 0]].concat(levels.map(function (n) {
		var a = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		if (n < 3) return a;
		a[(n < 7 ? 1 : n < 13 ? 2 : n < 19 ? 3 : 4) - 1] = n < 4 ? 1 : 2;
		return a;
	})),
	spellcastingList : {
		spells : LLSpellList(LLWitchKnightSpells)
	},
	spellcastingKnown : {
		cantrips : [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3],
		spells : [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7]
	},
	features : {
		"subclassfeature3" : {
			name : "Pact Magic",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I cast Witch Knight spells I know, using Constitution as my spellcasting ability",
				"All slots are the same level and recover on a short rest; I can swap one spell when I gain a level",
				"With warlock levels: add 1/3 of my Blood Hunter levels to my warlock levels for Pact Magic slots"
			]),
			additional : levels.map(function (n) {
				return n < 3 ? "" : (n < 13 ? 2 : 3) + " cantrips & " + [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7][n - 1] + " spells known";
			})
		},
		"subclassfeature3.1" : {
			name : "Crimson Blade",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("A Crimson Offering weapon is my focus; when I expend a Pact slot, a weapon I hold gains Crimson Offering (or its next attack deals +1 Rite Die per slot level)")
		},
		"subclassfeature7" : {
			name : "Sanguine Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When I use my action to cast or activate a spell, I can make a weapon attack as a bonus action; spells through my Crimson weapon can use its damage type"),
			action : [["bonus action", " (after casting)"]]
		},
		"subclassfeature13" : {
			name : "Bewitched Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 13,
			description : LLdesc("When I hit a creature with a weapon, it has disadv. on its next save vs. my Blood Rite or spell before the end of my next turn")
		},
		"subclassfeature18" : {
			name : "Profane Sacrifice",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("Reaction when a hostile creature dies within 30 ft: regain a Pact slot or gain Rite Die + Blood Hunter level temp HP"),
			usages : 1,
			recovery : "short rest",
			action : [["reaction", ""]]
		}
	}
});
LLAddSpellsToClass("witch knight(laserllama)", LLWitchKnightSpells);

// ======================================================================
// LaserLlama - Alternate Paladin v3.0.0.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Alternate Paladin"
	Effect:		This script adds the Alternate Paladin class and its 11 Sacred Oaths.
				Alternate Paladin v3.0.0 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	"ll-updates" release (2026/10/19)
	How to use:	Write "Paladin (LaserLlama)" in the Class field (e.g. "Oath of Glory Paladin (LaserLlama)")
*/


if (typeof LLAddFightingStyles !== "function") {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

if (ClassList["paladin"]) ClassList["paladin"].regExpSearch = /^(?!.*(laserllama|magus|warlord))((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|trooper)))).*$/i;
LLPalLvl = function () { return classes.known["paladin(laserllama)"] ? classes.known["paladin(laserllama)"].level : 0; };
LLPalAura = function (n) { return n < 6 ? 0 : n < 9 ? 10 : n < 12 ? 15 : n < 15 ? 20 : n < 18 ? 25 : 30; };

var LLPaladinSpells = [
	"bane", "bless", "ceremony", "command", "compelled duel", "cure wounds", "detect evil & good", "detect magic", "detect poison & disease", "divine favor", "ethereal anchor", "heroism", "protection from evil & good", "sanctuary", "searing smite", "shield of faith", "thunderous smite", "wrathful smite",
	"aid", "branding smite", "find steed", "gentle repose", "locate creature", "magic weapon", "prayer of healing", "protection from poison", "restoration", "lesser restoration", "warding bond", "zone of truth",
	"aura of vitality", "beacon of hope", "blinding smite", "create food & water", "crusader's mantle", "daylight", "dispel magic", "magic circle", "remove curse", "revivify", "spirit shroud",
	"aura of life", "aura of purity", "banishment", "death ward", "freedom of movement", "guardian of faith", "staggering smite",
	"banishing smite", "circle of power", "conjure celestial", "destructive wave", "dispel evil & good", "geas", "holy weapon", "mass cure wounds", "raise dead"
];
LLAddSpellsToClass("paladin(laserllama)", LLPaladinSpells);

// Oath feature helpers
LLOathSpells = function (sName, aSpells) {
	return {
		name : sName + " Spells",
		source : [["GMB:LL", 0]],
		minlevel : 3,
		description : LLdesc("I always know my Oath Spells; they don't count against my Spells Known and can't be replaced"),
		spellcastingExtra : LLSpellList(aSpells)
	};
};
LLAvatar = function (sName, aBenefits, sDuration) {
	return {
		name : "Avatar of " + sName,
		source : [["GMB:LL", 0]],
		minlevel : 20,
		description : LLdesc(["As a bonus action, I transform for " + (sDuration ? sDuration : "1 minute") + " (ends if unconscious or as a bonus action):"].concat(aBenefits).concat(["Once per long rest for free, then with a 5th-level spell slot"])),
		usages : 1,
		recovery : "long rest",
		action : [["bonus action", ""]]
	};
};

ClassList["paladin(laserllama)"] = {
	name : "Paladin (LaserLlama)",
	regExpSearch : /^(?=.*paladin)(?=.*laserllama).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Strength and Charisma",
	prereqs : "Strength 13 and Charisma 13",
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Wis", "Cha"],
	abilitySave : 6,
	spellcastingFactor : "paladinll1",
	spellcastingTable : [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0, 0, 0, 0], [4, 2, 0, 0, 0, 0, 0, 0, 0],
		[4, 2, 0, 0, 0, 0, 0, 0, 0], [4, 3, 0, 0, 0, 0, 0, 0, 0], [4, 3, 0, 0, 0, 0, 0, 0, 0], [4, 3, 2, 0, 0, 0, 0, 0, 0], [4, 3, 2, 0, 0, 0, 0, 0, 0],
		[4, 3, 3, 0, 0, 0, 0, 0, 0], [4, 3, 3, 0, 0, 0, 0, 0, 0], [4, 3, 3, 1, 0, 0, 0, 0, 0], [4, 3, 3, 1, 0, 0, 0, 0, 0], [4, 3, 3, 2, 0, 0, 0, 0, 0],
		[4, 3, 3, 2, 0, 0, 0, 0, 0], [4, 3, 3, 3, 1, 0, 0, 0, 0], [4, 3, 3, 3, 1, 0, 0, 0, 0], [4, 3, 3, 3, 2, 0, 0, 0, 0], [4, 3, 3, 3, 2, 0, 0, 0, 0]
	],
	spellcastingKnown : {
		spells : [0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11]
	},
	spellcastingList : {
		"class" : "paladin(laserllama)",
		level : [1, 5]
	},
	skillstxt : {
		primary : "Choose two from Athletics, Insight, Intimidation, Medicine, Persuasion, and Religion"
	},
	armorProfs : {
		primary : [true, true, true, true],
		secondary : [true, true, false, true]
	},
	weaponProfs : {
		primary : [true, true],
		secondary : [true, true]
	},
	equipment : "Paladin (LaserLlama) starting equipment:" +
		"\n \u2022 A martial weapon and a shield -or- two martial weapons;" +
		"\n \u2022 A simple melee weapon -or- five javelins;" +
		"\n \u2022 A priest's pack -or- an explorer's pack;" +
		"\n \u2022 Chain mail and a holy symbol." +
		"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Sacred Oath", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"anointed warrior" : {
			name : "Anointed Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I have Divine Fervor equal to my paladin level, regained on a long rest; choose an alignment option with \"Choose Feature\"",
				"My alignment also sets my Divine Smite damage type: Good radiant, Neutral thunder, Evil necrotic"
			]),
			limfeaname : "Divine Fervor",
			usages : levels.map(function (n) { return n; }),
			recovery : "long rest",
			choices : ["Good", "Neutral", "Evil"],
			"good" : {
				name : "Anointed Warrior: Good",
				description : LLdesc([
					"As an action, I touch a creature and expend Divine Fervor; per use: restore Cha mod HP, cure a disease, or end poisoned",
					"My Divine Smite and Righteous Strikes deal radiant damage"
				]),
				action : [["action", "Healing Touch (Fervor)"]]
			},
			"neutral" : {
				name : "Anointed Warrior: Neutral",
				description : LLdesc([
					"As an action, I touch a creature and expend 1 Divine Fervor to grant temp HP equal to my Cha mod",
					"My Divine Smite and Righteous Strikes deal thunder damage"
				]),
				action : [["action", "Fortifying Touch (1 Fervor)"]]
			},
			"evil" : {
				name : "Anointed Warrior: Evil",
				description : LLdesc([
					"When I damage a creature with a melee attack, I can expend 1 Divine Fervor to gain temp HP equal to my Cha mod",
					"My Divine Smite and Righteous Strikes deal necrotic damage"
				])
			}
		},
		"fighting style" : LLAddFightingStyles({
			name : "Fighting Style",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("Choose a Fighting Style with the \"Choose Feature\" button above; I can replace it when I gain a level")
		}, ["balanced", "classical", "defensive", "great_weapon", "mounted", "protection", "versatile"], false),
		"spellcasting" : {
			name : "Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I can cast Paladin spells I know, using Charisma as my spellcasting ability (holy symbol as focus, also on a shield)",
				"I can replace one spell I know when I gain a paladin level"
			]),
			additional : levels.map(function (n) { return n < 2 ? "" : [0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11][n - 1] + " spells known"; })
		},
		"divine smite" : {
			name : "Divine Smite",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc("When I hit with a melee weapon attack or unarmed strike, I can expend a spell slot: +2d8 (+1d8 per slot level above 1st, max 6d8) damage of my alignment's type"),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (classes.known["paladin(laserllama)"] && classes.known["paladin(laserllama)"].level >= 2 && v.isMeleeWeapon && !v.isSpell) {
							fields.Description += (fields.Description ? "; " : "") + "Smite";
						}
					},
					"My melee weapon attacks and unarmed strikes note that I can use Divine Smite."
				]
			}
		},
		"subclassfeature3" : {
			name : "Sacred Oath",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Choose a Sacred Oath and put it in the \"Class\" field; violating a Tenet blocks my Oath features until 1 hour of reparations")
		},
		"divine regeneration" : {
			name : "Divine Regeneration",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("During a short rest, I recover spell slots with a combined level up to my Cha mod, or that much Divine Fervor"),
			usages : 1,
			recovery : "long rest"
		},
		"divine sense" : {
			name : "Divine Sense",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("As an action, for 10 min I know the location and type of celestials, elementals, fey, fiends, and undead within 60 ft (not behind total cover); then 1 Fervor"),
			usages : 1,
			recovery : "short rest",
			action : [["action", ""]]
		},
		"extra attack" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("I can attack twice when I take the Attack action; when I use my action to cast a Paladin spell, I can make a weapon attack as a bonus action"),
			action : [["bonus action", " (after casting a spell)"]]
		},
		"aura of protection" : {
			name : "Aura of Protection",
			source : [["GMB:LL", 0]],
			minlevel : 6,
			description : LLdesc("While I'm not incapacitated, I and creatures of my choice in my aura add my Cha mod (min +0) to saving throws"),
			additional : levels.map(function (n) { return n < 6 ? "" : LLPalAura(n) + "-ft aura"; }),
			addMod : [{ type : "save", field : "all", mod : "max(Cha|0)", text : "While I'm not incapacitated, I add my Charisma modifier (min +0) to all my saving throws." }]
		},
		"divine health" : {
			name : "Divine Health",
			source : [["GMB:LL", 0]],
			minlevel : 9,
			description : LLdesc("I have resistance to poison damage and immunity to disease and the poisoned condition"),
			dmgres : ["Poison"],
			savetxt : { immune : ["poisoned", "disease"] }
		},
		"aura of courage" : {
			name : "Aura of Courage",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("Creatures in my aura are immune to frightened; a frightened creature entering it has the effect suspended while inside"),
			savetxt : { immune : ["frightened"] }
		},
		"righteous strikes" : {
			name : "Righteous Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("My melee weapon attacks and unarmed strikes deal +1d8 damage of my Divine Smite type"),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (classes.known["paladin(laserllama)"] && classes.known["paladin(laserllama)"].level >= 11 && (v.isMeleeWeapon || v.baseWeaponName == "unarmed strike") && !v.isSpell) {
							fields.Description += (fields.Description ? "; " : "") + "+1d8 Smite type damage";
						}
					},
					"My melee weapon attacks and unarmed strikes deal +1d8 damage of my Divine Smite type."
				]
			}
		},
		"purifying touch" : {
			name : "Purifying Touch",
			source : [["GMB:LL", 0]],
			minlevel : 14,
			description : LLdesc("As an action, I end one spell on myself or a willing creature I touch; then 5 Divine Fervor"),
			usages : 1,
			recovery : "short rest",
			action : [["action", ""]]
		},
		"legendary conviction" : {
			name : "Legendary Conviction",
			source : [["GMB:LL", 0]],
			minlevel : 18,
			description : LLdesc("I regain 1 Divine Fervor at the start of each of my turns in combat, unless incapacitated")
		}
	}
};

// ===================================================================================
// SACRED OATHS
// ===================================================================================
AddSubClass("paladin(laserllama)", "ancients", {
	regExpSearch : /^(?=.*ancients)(?=.*(oath|paladin)).*$/i,
	subname : "Oath of the Ancients",
	fullname : "Oath of the Ancients",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOathSpells("Ancient", ["absorb elements", "ensnaring strike", "moonbeam", "spike growth", "grasping vine", "plant growth", "guardian of nature", "ice storm", "commune with nature", "tree stride"]),
		"subclassfeature3.1" : {
			name : "Elder Shield & Verdant Smite",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"Reaction, 1 Fervor: when I or a creature " + (n < 6 ? "within 10 ft" : "in my aura") + " takes cold, fire, lightning, poison, or thunder damage, reduce it by paladin level + Cha mod",
					"Divine Smite + 1 Fervor: Dex save or restrained by vines for 1 min (Str check as an action to free)"
				]);
			}),
			action : [["reaction", "Elder Shield (1 Fervor)"]]
		},
		"subclassfeature7" : {
			name : "Aura of Warding",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Creatures in my aura have resistance to damage from spells"),
			dmgres : ["Spells"]
		},
		"subclassfeature15" : {
			name : "Undying Sentinel",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I age 1 year per 10 and can't be aged magically; once per long rest, if I start my turn at 0 HP (not dead), I stand up with 1 HP"),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature20" : LLAvatar("the Ancients", ["I regain 10 HP at the start of each of my turns; my aura is difficult terrain for creatures of my choice"], "10 minutes")
	}
});

AddSubClass("paladin(laserllama)", "conquest", {
	regExpSearch : /^(?=.*conquest)(?=.*(oath|paladin)).*$/i,
	subname : "Oath of Conquest",
	fullname : "Oath of Conquest",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOathSpells("Conquest", ["cause fear", "command", "hold person", "find steed", "bestow curse", "fear", "dominate beast", "staggering smite", "dominate person", "vorpal blade"]),
		"subclassfeature3.1" : {
			name : "Conquering Smite & Lethal Strike",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"Divine Smite + 1 Fervor: Wis save or prone, frightened until my next turn ends, or the command spell (my choice)",
				"Before knowing if a weapon attack hits, 1 Fervor: add twice my Cha mod to the roll"
			])
		},
		"subclassfeature7" : {
			name : "Aura of Dominion",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Creatures of my choice in my aura treat it as difficult terrain; frightened ones have speed 0 in it")
		},
		"subclassfeature15" : {
			name : "Ruthless Reprisal",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When a creature in my aura damages me or forces me to save, it takes Cha mod (min 1) damage of my Smite type")
		},
		"subclassfeature20" : LLAvatar("Conquest", ["Resistance to all damage; command as a bonus action each turn without a slot (disadv. in my aura)", "One extra weapon attack with the Attack action"])
	}
});

AddSubClass("paladin(laserllama)", "devotion", {
	regExpSearch : /^(?=.*devotion)(?=.*(oath|paladin)).*$/i,
	subname : "Oath of Devotion",
	fullname : "Oath of Devotion",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOathSpells("Devotion", ["bless", "shield of faith", "find steed", "restoration", "lesser restoration", "beacon of hope", "remove curse", "death ward", "guardian of faith", "dawn", "dispel evil & good"]),
		"subclassfeature3.1" : {
			name : "Consecrated Smite & Sacred Weapon",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"Divine Smite + 1 Fervor: Wis save (disadv. for fiends, undead, evil) or turned for 1 min (until it takes damage)",
				"Sacred Weapon: bonus action, 2 Fervor: a melee weapon I hold is magical, sheds 30-ft light, +Cha mod to attack rolls for 1 min"
			]),
			action : [["bonus action", "Sacred Weapon (2 Fervor)"]],
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (v.isMeleeWeapon && (/sacred/i).test(v.WeaponText)) output.extraHit += What('Cha Mod');
					},
					"If I include the word 'Sacred' in a melee weapon's name, it gets my Cha mod added to its attack roll."
				]
			}
		},
		"subclassfeature7" : {
			name : "Aura of Devotion",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Creatures in my aura are immune to charmed; a charmed creature entering it has the effect suspended while inside"),
			savetxt : { immune : ["charmed"] }
		},
		"subclassfeature15" : {
			name : "Purity of Spirit",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I'm always under the effects of protection from evil and good"),
			savetxt : { text : ["Protection from evil and good"] }
		},
		"subclassfeature20" : LLAvatar("Devotion", ["Angelic wings (60 ft flying speed); any melee weapon I hold is a Sacred Weapon; bright sunlight in my aura"])
	}
});

AddSubClass("paladin(laserllama)", "glory", {
	regExpSearch : /^(?=.*glory)(?=.*(oath|paladin)).*$/i,
	subname : "Oath of Glory",
	fullname : "Oath of Glory",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOathSpells("Glory", ["compelled duel", "jump", "enhance ability", "magic weapon", "haste", "thunder step", "death ward", "freedom of movement", "banishing smite", "circle of power"]),
		"subclassfeature3.1" : {
			name : "Glorious Smite & Mighty Deed",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"Divine Smite + 2 Fervor: distribute Cha mod + paladin level temp HP among creatures of my choice within " + (n < 6 ? 10 : LLPalAura(n)) + " ft",
					"Mighty Deed: 1 Fervor after a Str/Dex/Con check or jump to add my paladin level to it"
				]);
			})
		},
		"subclassfeature7" : {
			name : "Mythic Alacrity",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("If not surprised, +Cha mod to initiative; at the start of my turn, I can suspend my aura to gain speed equal to its radius until my next turn"),
			addMod : [{ type : "skill", field : "Init", mod : "Cha", text : "Mythic Alacrity: I add my Charisma modifier to initiative rolls." }]
		},
		"subclassfeature15" : {
			name : "Glorious Shield",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Reaction when a creature in my aura is hit: +Cha mod AC vs. that attack; then 1 Fervor"),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature20" : LLAvatar("Glory", ["1 Fervor: a Charisma check d20 counts as 20; Mighty Deed without Fervor; once per turn, a missed weapon attack hits instead"], "10 minutes")
	}
});

AddSubClass("paladin(laserllama)", "splendor", {
	regExpSearch : /^(?=.*splendou?r)(?=.*(oath|paladin)).*$/i,
	subname : "Oath of Splendor",
	fullname : "Oath of Splendor",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Primordial Sovereign",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I choose an Element (\"Choose Feature\"): Air (thunder), Earth (bludgeoning), Fire, or Water (cold); I can use Cha instead of Dex for my AC"),
			choices : ["Air", "Earth", "Fire", "Water"],
			"air" : { name : "Air (thunder)", description : LLdesc("Elemental Smite: Str save or pushed 5 ft per slot level") },
			"earth" : { name : "Earth (bludgeoning)", description : LLdesc("Elemental Smite: Str save or prone, and its space becomes difficult terrain") },
			"fire" : { name : "Fire (fire)", description : LLdesc("Elemental Smite: damage dice become d10s; flammable objects within 5 ft ignite") },
			"water" : { name : "Water (cold)", description : LLdesc("Elemental Smite: Str save or sheathed in ice: half speed until it uses an action to remove it") },
			extraAC : [{
				name : "Primordial Sovereign",
				mod : "max(Cha-Dex|0)",
				text : "I can use my Charisma modifier instead of my Dexterity modifier for my AC (armor maximums still apply).",
				stopeval : function (v) { return v.heavyArmor; }
			}]
		},
		"subclassfeature3.1" : {
			name : "Elemental Smite",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Divine Smite + 1 Fervor: it deals my Element damage and adds my Element's effect")
		},
		"subclassfeature3.2" : LLOathSpells("Splendor", ["absorb elements", "burning hands", "mirror image", "scorching ray", "minute meteors", "summon elemental", "elemental bane", "ice storm", "contact other plane", "flame strike"]),
		"subclassfeature7" : {
			name : "Aura of Destruction",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When a creature in my aura takes my Element damage, it ignores resistance and treats immunity as resistance")
		},
		"subclassfeature15" : {
			name : "Elemental Rebuke",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Reaction when a creature in my aura damages me: Dex save or 2d8 Element damage plus my Elemental Smite effect"),
			action : [["reaction", ""]]
		},
		"subclassfeature20" : LLAvatar("the Elements", ["Elemental wings (60 ft flying speed); allies in my aura resist my Element and I'm immune", "My Element damage to structures is maximized"])
	}
});

AddSubClass("paladin(laserllama)", "throne", {
	regExpSearch : /^(?=.*throne)(?=.*(oath|paladin)).*$/i,
	subname : "Oath of the Throne",
	fullname : "Oath of the Throne",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOathSpells("Throne", ["command", "compelled duel", "find steed", "warding bond", "aura of vitality", "spirit guardians", "banishment", "guardian of faith", "circle of power", "geas"]),
		"subclassfeature3.1" : {
			name : "Challenging Smite & Rallying Command",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"Divine Smite + 1 Fervor: the target suffers the compelled duel spell",
				"Rallying Command: bonus action, 2 Fervor: a creature within 30 ft that hears me gains 1d6 + Cha mod temp HP"
			]),
			action : [["bonus action", "Rallying Command (2 Fervor)"]]
		},
		"subclassfeature7" : {
			name : "Divine Aegis",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Reaction when a creature in my aura takes damage: I take it instead (can't be reduced)"),
			action : [["reaction", ""]]
		},
		"subclassfeature15" : {
			name : "Unwavering Knight",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("While conscious, I have adv. on saves vs. paralyzed and stunned"),
			savetxt : { adv_vs : ["paralyzed", "stunned"] }
		},
		"subclassfeature20" : LLAvatar("Loyalty", ["Resistance to B/P/S; creatures in my aura have adv. on Wis and death saves", "Challenging Smite targets automatically fail Wis saves to end it"])
	}
});

AddSubClass("paladin(laserllama)", "vengeance", {
	regExpSearch : /^(?=.*vengeance)(?=.*(oath|paladin)).*$/i,
	subname : "Oath of Vengeance",
	fullname : "Oath of Vengeance",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOathSpells("Vengeance", ["bane", "compelled duel", "hold person", "misty step", "haste", "nondetection", "banishment", "dimension door", "far step", "hold monster"]),
		"subclassfeature3.1" : {
			name : "Vow of Enmity & Vengeful Smite",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"Vow of Enmity: bonus action, 2 Fervor: a creature within 30 ft is my Sworn Foe for 1 min (adv. on attacks vs. it; not again while it lives)",
				"Divine Smite + 1 Fervor: Wis save (disadv. for my Sworn Foe) or frightened and speed 0 for 1 min (ends if damaged)"
			]),
			action : [["bonus action", "Vow of Enmity (2 Fervor)"]]
		},
		"subclassfeature7" : {
			name : "Shield of Vengeance",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Creatures in my aura have adv. on checks and saves my Sworn Foe forces them to make")
		},
		"subclassfeature15" : {
			name : "Relentless Avenger",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Reaction when my Sworn Foe attacks or forces another creature to save: move my speed toward it and make one attack (adv. if an OA hit me)"),
			action : [["reaction", ""]]
		},
		"subclassfeature20" : LLAvatar("Vengeance", ["Vow of Enmity without Fervor; misty step at will each turn (then a melee attack if within 5 ft)", "Once per turn, forgo adv. on a weapon attack to make one additional attack vs. that creature"])
	}
});

AddSubClass("paladin(laserllama)", "vigilance", {
	regExpSearch : /^(?=.*vigilance)(?=.*(oath|paladin)).*$/i,
	subname : "Oath of Vigilance",
	fullname : "Oath of Vigilance",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOathSpells("Vigilance", ["alarm", "ethereal anchor", "locate creature", "moonbeam", "counterspell", "nondetection", "aura of purity", "banishment", "hold monster", "scrying"]),
		"subclassfeature3.1" : {
			name : "Abjuring Smite & Divine Vigilance",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"Divine Smite + 1 Fervor: Cha save (disadv. for extraplanar creatures) or turned for 1 min (until it takes damage)",
					"Reaction, 2 Fervor: when I or a creature " + (n < 6 ? "within 10 ft" : "in my aura") + " fails an Int/Wis/Cha save, it can reroll it"
				]);
			}),
			action : [["reaction", "Divine Vigilance (2 Fervor)"]]
		},
		"subclassfeature7" : {
			name : "Aura of Vigilance",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Creatures in my aura can't be surprised and add my Cha mod to initiative"),
			addMod : [{ type : "skill", field : "Init", mod : "Cha", text : "Aura of Vigilance: I add my Charisma modifier to initiative rolls." }]
		},
		"subclassfeature15" : {
			name : "Vigilant Sight",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I use Divine Sense, I also gain truesight within the same radius")
		},
		"subclassfeature20" : LLAvatar("Vigilance", ["Divine Sense out to 120 ft; adv. on attacks vs. extraplanar creatures within my truesight", "Abjuring Smite can banish extraplanar creatures to their native plane instead of turning them"])
	}
});

// Breaking an Oath
AddSubClass("paladin(laserllama)", "repentance", {
	regExpSearch : /^(?=.*repentance)(?=.*(oath|paladin)).*$/i,
	subname : "Oath of Repentance",
	fullname : "Oath of Repentance",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOathSpells("Repentance", ["sanctuary", "sleep", "calm emotions", "hold person", "counterspell", "hypnotic pattern", "aura of life", "resilient sphere", "hold monster", "wall of force"]),
		"subclassfeature3.1" : {
			name : "Righteous Emissary & Subduing Smite",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"1 Fervor: add my paladin level to a Persuasion check",
				"When my Divine Smite drops a creature to 0 HP, 1 Fervor: it stays at 1 HP and is charmed and docile for 1 min (moves/acts only on my bonus action order, no hostile acts)"
			])
		},
		"subclassfeature7" : {
			name : "Aura of Penance",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Reaction when a creature in my aura takes damage: I take it instead (can't be reduced; no other effects)"),
			action : [["reaction", ""]]
		},
		"subclassfeature15" : {
			name : "Redemptive Regeneration",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("If I start my turn below half HP (min 1), I regain HP equal to my Cha mod")
		},
		"subclassfeature20" : LLAvatar("Redemption", ["Resistance to all damage; Aura of Penance without a reaction", "If I damage or force a save on another creature, I lose these benefits until my next turn"])
	}
});

AddSubClass("paladin(laserllama)", "oathless", {
	regExpSearch : /^(?=.*(oathless|oath ?breaker))(?=.*(paladin|laserllama)).*$/i,
	subname : "Oathless",
	fullname : "Oathless",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOathSpells("Oathless", ["charm person", "false life", "invisibility", "suggestion", "gaseous form", "vampiric touch", "charm monster", "greater invisibility", "dominate person", "passwall"]),
		"subclassfeature3.1" : {
			name : "Shattered Oath & Draining Smite",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I subtract my paladin level from checks to convince creatures to trust me or make deals",
				"Divine Smite + 1 Fervor: its damage becomes necrotic and I gain temp HP equal to half of it"
			])
		},
		"subclassfeature3.2" : {
			name : "Illusory Escape",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc("Reaction when I take damage from a source I see, 2 Fervor: I become invisible (until my next turn, an attack, or a save I force) and move my speed" + (n < 7 ? "" : "; Aura of Deception: a creature in my aura: Cha save or we swap and it takes the damage"));
			}),
			action : [["reaction", " (2 Fervor)"]]
		},
		"subclassfeature7" : {
			name : "Aura of Deception",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("With Illusory Escape, a creature in my aura: Cha save or we swap places and it becomes the target of the damage")
		},
		"subclassfeature15" : {
			name : "Forceful Will",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Creatures in my aura have disadv. on their initial save vs. my enchantment spells")
		},
		"subclassfeature20" : LLAvatar("Dishonor", ["Invisible as greater invisibility; Dash or Hide as a bonus action", "When a creature misses me with a melee attack, it repeats it vs. another creature of my choice in range"])
	}
});

AddSubClass("paladin(laserllama)", "blackguard", {
	regExpSearch : /blackguard/i,
	subname : "Blackguard",
	fullname : "Blackguard",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLOathSpells("Blackguard", ["cause fear", "hellish rebuke", "blindness/deafness", "shadow blade", "animate dead", "conjure fiend", "accursed touch", "create undead", "spiritual sundering", "vorpal blade"]),
		"subclassfeature3.1" : {
			name : "Dreadful Smite & Marshal of Darkness",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"Divine Smite + 1 Fervor: Wis save or frightened for 1 min (save if it ends its turn more than 30 ft away)",
				"Action, 2 Fervor: a fiend or undead within 30 ft (CR up to my paladin level): Cha save or it obeys me for 24 hours"
			]),
			action : [["action", "Marshal of Darkness (2 Fervor)"]]
		},
		"subclassfeature7" : {
			name : "Aura of Hate",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Fiends and undead in my aura add my Cha mod to their attack rolls")
		},
		"subclassfeature15" : {
			name : "Sinister Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I don't need to eat, drink, or breathe; resistance to necrotic and nonmagical bludgeoning, piercing, and slashing"),
			dmgres : ["Necrotic", ["Bludgeoning", "Bludgeon. (nonmagical)"], ["Piercing", "Piercing (nonmagical)"], ["Slashing", "Slashing (nonmagical)"]]
		},
		"subclassfeature20" : LLAvatar("Dread", ["Bright light within 30 ft becomes dim; frightened creatures starting their turn in my aura take 4d10 necrotic", "When I deal necrotic damage, I gain temp HP equal to half of it"])
	}
});

// ======================================================================
// LaserLlama - Alternate Ranger v4.4.4.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	REQUIRES: "LaserLlama - Common Attributes 20261019.js" (import it first).

	-INFORMATION-
	Subject:	Class, "Alternate Ranger" (with Expanded options)
	Effect:		This script adds the Alternate Ranger class, its 20 Conclaves, the Knacks and the Survivalist Feats.
				Alternate Ranger v4.4.4 and Alternate Ranger Expanded v4.4.4 by Laserllama (GM Binder, Fan Content policy)
	Sheet:		v13.2.3
	Code by:	Original scripts by CalypsoMoonlace and Valentino dell'Eco; updated to v4.4.4 in the "ll-updates" release (2026/10/19)
	How to use:	Write "Ranger (LaserLlama)" in the Class field (e.g. "Hunter Ranger (LaserLlama)")
*/


if (typeof LLExploitFeature !== "function" || !SpellsList["arresting strike"] || !SpellsList["arresting strike"].isExploit) {
	throw new Error("Please import the 'Laserllama Common Attributes 20261019.js' file before importing this file.");
}

// Official rangers (the sheet uses the UA Revised Ranger instead of the PHB one when it's loaded): same regex, minus "LaserLlama"
if (ClassList["ranger"]) ClassList["ranger"].regExpSearch = /^(?!.*laserllama)((?=.*(ranger|strider))|((?=.*(nature|natural))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i;
if (ClassList["rangerua"]) ClassList["rangerua"].regExpSearch = /^(?!.*laserllama)((?=.*(ranger|strider))|((?=.*(nature|natural))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i;
LLRngLvl = function () { return classes.known["ranger(laserllama)"] ? classes.known["ranger(laserllama)"].level : 0; };
LLQuarryDie = function (n) { return n < 2 ? "" : n < 6 ? "d4" : n < 10 ? "d6" : n < 14 ? "d8" : n < 18 ? "d10" : "d12"; };
LLHasSkill = function (v, sSkill) { return v && v.skillProfsLC ? v.skillProfsLC.indexOf(sSkill.toLowerCase()) !== -1 : false; };
LLKnownKnacks = function () {
	var a = GetFeatureChoice("classes", "ranger(laserllama)", "knacks", true);
	var aSub = classes.known["ranger(laserllama)"] && classes.known["ranger(laserllama)"].subclass ? GetFeatureChoice("classes", "ranger(laserllama)", "subclassfeature3.knack", true) : [];
	return a.concat(aSub);
};

var LLRangerSpells = [
	"absorb elements", "alarm", "animal friendship", "beast bond", "create snare", "cure wounds", "detect magic", "detect poison & disease", "ensnaring strike", "entangle", "fog cloud", "goodberry", "hail of thorns", "jump", "longstrider", "purify food & drink", "speak with animals", "zephyr strike",
	"aid", "animal messenger", "barkskin", "beast sense", "conjure beast", "cordon of arrows", "darkvision", "enhance ability", "gust of wind", "healing spirit", "locate creature", "magic weapon", "pass without trace", "protection from poison", "restoration", "lesser restoration", "silence", "spike growth",
	"conjure elemental", "conjure fey", "conjure volley", "conjure barrage", "daylight", "dispel magic", "elemental bane", "elemental weapon", "flame arrows", "grasping vine", "lightning arrow", "meld into stone", "nondetection", "plant growth", "protection from energy", "revivify", "speak with plants", "tiny hut", "water breathing", "water walk", "wind wall",
	"death ward", "divination", "dominate creature", "dominate beast", "freedom of movement", "guardian of nature", "stoneskin", "wall of thorns",
	"awaken", "commune with nature", "steel wind strike", "swift quiver", "tree stride", "wrath of nature"
];
LLAddSpellsToClass("ranger(laserllama)", LLRangerSpells);

/*	Knacks: [key, name, ranger level, skill prerequisite, [knacks required], description, extra attributes, times learnable]
*/
var LLKnackData = [
	["alpine adept", "Alpine Adept", 0, "Athletics", [], "30 ft climbing speed (or +10 ft) and resistance to falling bludgeoning damage; expertise in Athletics", { speed : { climb : { spd : 30, enc : 20 } }, skills : [["Athletics", "only"]] }],
	["aquatic adept", "Aquatic Adept", 0, "Athletics", [], "30 ft swimming speed (or +10 ft); hold breath twice as long; expertise in Athletics", { speed : { swim : { spd : 30, enc : 20 } }, skills : [["Athletics", "only"]] }],
	["favored foe", "Favored Foe", 0, "", [], "One creature type, two humanoid races, or one organization: checks to recall knowledge, hunt, or track it treat a d20 of 9 or lower as 10", {}, 3],
	["herbalist i", "Herbalist I", 0, "Medicine", [], "Proficiency with herbalism kits; auto-success to stabilize with one; expertise in Medicine and herbalism kits", { toolProfs : [["Herbalism kit", "increment"]], skills : [["Medicine", "only"]] }],
	["herbalist ii", "Herbalist II", 3, "", ["herbalist i"], "During a long rest, 1 hour with a herbalism kit makes a potion of healing (lasts until my next long rest)"],
	["herbalist iii", "Herbalist III", 6, "", ["herbalist i", "herbalist ii"], "Herbalist II makes 1 + Wis mod (min 2) potions of healing"],
	["naturalist i", "Naturalist I", 0, "Nature", [], "I use Wis for Nature; bonus action: Nature check about a beast or plant I see; expertise in Nature", { skills : [["Nature", "only"]], addMod : [{ type : "skill", field : "Nature", mod : "max(Wis-Int|0)", text : "Naturalist I: I use Wisdom instead of Intelligence for Nature checks." }], action : [["bonus action", "Nature check (Naturalist)"]] }],
	["naturalist ii", "Naturalist II", 9, "", ["naturalist i"], "At the end of each short or long rest, I gain the benefits of commune with nature"],
	["natural regeneration", "Natural Regeneration", 3, "", [], "Once per long rest, during a short rest I recover spell slots with a combined level up to my Wis mod (min one 1st-level)", { usages : 1, recovery : "long rest" }],
	["slayer i", "Slayer I", 3, "Perception", [], "When I hit a creature, I can mark it as my Quarry (expending a use) and apply the benefits on that hit; expertise in Perception", { skills : [["Perception", "only"]] }],
	["slayer ii", "Slayer II", 6, "", ["slayer i"], "I can mark a creature by its tracks (last 24 hours); my Quarry mark lasts until I mark another"],
	["slayer iii", "Slayer III", 14, "", ["slayer i", "slayer ii"], "Once per turn on a Quarry hit: Con save or blinded, deafened, unable to speak, or restrained until my next turn"],
	["stalker i", "Stalker I", 0, "Stealth", [], "Adv. on Stealth to hide in natural environments; expertise in Stealth", { skills : [["Stealth", "only"]] }],
	["stalker ii", "Stalker II", 3, "", ["stalker i"], "I can take the Hide action as a bonus action", { action : [["bonus action", "Hide"]] }],
	["stalker iii", "Stalker III", 9, "", ["stalker i", "stalker ii"], "I'm always under nondetection and can't be tracked by magic unless I wish"],
	["stalker iv", "Stalker IV", 14, "", ["stalker i", "stalker ii", "stalker iii"], "When I Hide, I'm invisible until my next turn (ends if I cast, attack, or force a check or save)"],
	["strider i", "Strider I", 0, "Survival", [], "I ignore natural difficult terrain (and up to 10 travel companions aren't slowed); can't get lost with the night sky; expertise in Survival", { skills : [["Survival", "only"]] }],
	["strider ii", "Strider II", 3, "", ["strider i"], "I can take the Dash action as a bonus action", { action : [["bonus action", "Dash"]] }],
	["strider iii", "Strider III", 6, "", ["strider i", "strider ii"], "+10 ft walking speed; I ignore magical difficult terrain", { speed : { walk : { spd : "+10", enc : "+10" } } }],
	["strider iv", "Strider IV", 14, "", ["strider i", "strider ii", "strider iii"], "While conscious, I'm always under the effects of freedom of movement"],
	["student of the wild", "Student of the Wild", 0, "", [], "I gain proficiency in two skills from the Ranger skill list", { skillstxt : "Choose two from Animal Handling, Athletics, Insight, Investigation, Medicine, Nature, Perception, Sleight of Hand, Stealth, and Survival" }, 3],
	["survivor i", "Survivor I", 6, "", [], "As a bonus action, I gain temp HP equal to my Con mod (min 1)", { action : [["bonus action", "Survivor (temp HP)"]] }],
	["survivor ii", "Survivor II", 9, "", ["survivor i"], "When I spend a Hit Die to heal, I regain +Wis mod (min 1) HP"],
	["survivor iii", "Survivor III", 14, "", ["survivor i", "survivor ii"], "I add my Wis mod (min +1) to death saves; a result of 20+ counts as a natural 20"],
	["trapper i", "Trapper I", 0, "Sleight of Hand", [], "Expertise in Sleight of Hand; 1 hour (also during a rest): craft a Trap (lasts until my next long rest); action: set it in an adjacent space (Large or smaller: Dex save or restrained; Str check vs. my DC to free); action: hide it (Investigation/Perception vs. my DC)", { skills : [["Sleight of Hand", "only"]] }],
	["trapper ii", "Trapper II", 6, "", ["trapper i"], "I craft up to three Traps in 1 hour; once set, they last until triggered or destroyed"],
	["wild insight i", "Wild Insight I", 0, "Insight", [], "I can verbally communicate with beasts; expertise in Insight", { skills : [["Insight", "only"]] }],
	["wild insight ii", "Wild Insight II", 3, "", ["wild insight i"], "I always have conjure familiar prepared (always a fey)", { spellcastingExtra : LLSpellList(["conjure familiar", "find familiar"]) }],
	// Expanded
	["arctic adept", "Arctic Adept", 0, "Survival", [], "Resistance to cold; +ranger level to Survival in arctic, snowy, or tundra environments", { dmgres : ["Cold"] }],
	["cavern adept", "Cavern Adept", 0, "Perception", [], "Darkvision 60 ft (or +30 ft); bonus action (concentration): tremorsense 30 ft with my eyes closed", { vision : [["Darkvision", "fixed 60"], ["Darkvision", "+30"]], action : [["bonus action", "Tremorsense (Cavern Adept)"]] }],
	["desert adept", "Desert Adept", 0, "Survival", [], "Resistance to fire; +ranger level to Survival in extreme heat or desert environments", { dmgres : ["Fire"] }],
	["fell handed i", "Fell Handed I", 6, "", [], "Each hit on my Quarry increases my crit range vs. it by 1, until I crit it (then it resets)"],
	["fell handed ii", "Fell Handed II", 9, "", ["fell handed i"], "Once per turn I can give myself adv. on an attack vs. my Quarry; on a hit, no Quarry bonus damage"],
	["hedge knight i", "Hedge Knight I", 0, "Str13", [], "I gain proficiency with heavy armor and learn one language", { armorProfs : [false, false, true, false], languageProfs : [1] }],
	["hedge knight ii", "Hedge Knight II", 3, "", ["hedge knight i"], "I learn one language and History, Persuasion, or Religion; I use Wis for checks with these skills", { languageProfs : [1], skillstxt : "Choose one from History, Persuasion, or Religion" }],
	["jungle adept", "Jungle Adept", 0, "Survival", [], "Resistance to poison; +ranger level to Survival in tropical forest or jungle", { dmgres : ["Poison"] }],
	["planar adept", "Planar Adept", 9, "Survival", [], "Resistance by plane: Astral (radiant), Feywild (psychic), Mechanus (force), Shadowfell (necrotic), Air (thunder), Earth (acid), Fire (fire), Water (cold); +ranger level to Survival there", {}, 3],
	["rider i", "Rider I", 0, "Animal Handling", [], "Animal Handling d20 of 7 or lower counts as 8 to tame/train/control mounts; mounting costs 5 ft; expertise in Animal Handling", { skills : [["Animal Handling", "only"]] }],
	["rider ii", "Rider II", 3, "", ["rider i"], "I learn the Mounted Warrior Fighting Style (or another) and can ride trained mounts my size or larger"],
	["rider iii", "Rider III", 6, "", ["rider i", "rider ii"], "Reaction: when my mount is hit, I become the target; my mount adds my Quarry Die to its saves while I ride it", { action : [["reaction", "Rider III (protect mount)"]] }],
	["urban adept", "Urban Adept", 0, "Investigation", [], "I learn Thieves' Cant; after a long rest in a settlement, +Quarry Die to gather information there; expertise in Investigation", { languageProfs : ["Thieves' Cant"], skills : [["Investigation", "only"]] }],
	["woodsman", "Woodsman", 0, "", [], "Proficiency with woodcarver's tools, adv. on checks to identify/construct things from wood; during a long rest, craft PB arrows, bolts, clubs, javelins, or quarterstaffs", { toolProfs : ["Woodcarver's tools"] }]
];
LLKnacks = {};
for (var iK = 0; iK < LLKnackData.length; iK++) {
	(function (a) {
		var nTimes = a[7] ? a[7] : 1;
		for (var t = 1; t <= nTimes; t++) {
			var sName = a[1] + (nTimes > 1 ? " (" + t + ")" : "");
			var aPre = [];
			if (a[2]) aPre.push(a[2] + "th-level Ranger");
			if (a[3] === "Str13") aPre.push("Strength 13");
			else if (a[3]) aPre.push(a[3] + " proficiency");
			for (var r = 0; r < a[4].length; r++) aPre.push(a[4][r].replace(/\b\w/g, function (c) { return c.toUpperCase(); }).replace(/ Iv$/, " IV").replace(/ Iii$/, " III").replace(/ Ii$/, " II").replace(/ I$/, " I"));
			var o = {
				name : sName,
				source : [["GMB:LL", 0]],
				description : LLdesc(a[5]),
				knackLevel : a[2]
			};
			if (aPre.length) o.prerequisite = aPre.join(", ");
			if (a[2]) o.submenu = "[ranger level " + (a[2] < 10 ? " " : "") + a[2] + "+]";
			o.prereqeval = (function (aK, nT) {
				return function (v) {
					if (aK[2] && LLRngLvl() < aK[2]) return false;
					if (aK[3] === "Str13") { if (LLScore("Str") < 13) return false; }
					else if (aK[3] && !LLHasSkill(v, aK[3])) return false;
					if (aK[4].length) {
						var aKnown = LLKnownKnacks();
						for (var i = 0; i < aK[4].length; i++) { if (aKnown.indexOf(aK[4][i]) === -1) return false; }
					}
					if (nT > 1) {
						var aKn = LLKnownKnacks();
						if (aKn.indexOf((aK[1] + " (" + (nT - 1) + ")").toLowerCase()) === -1) return false;
					}
					return true;
				};
			})(a, t);
			if (a[6]) { for (var att in a[6]) o[att] = a[6][att]; }
			LLKnacks[sName.toLowerCase()] = o;
		}
	})(LLKnackData[iK]);
}
LLKnackChoices = function (oFea, bPrereq, aOnly) {
	if (!oFea.extrachoices) oFea.extrachoices = [];
	var aKeys = [];
	for (var s in LLKnacks) { if (!aOnly || aOnly.indexOf(s) !== -1) aKeys.push(s); }
	aKeys.sort(function (a, b) { return (LLKnacks[a].knackLevel - LLKnacks[b].knackLevel) || (a > b ? 1 : -1); });
	for (var i = 0; i < aKeys.length; i++) {
		var oK = LLKnacks[aKeys[i]], oNew = {};
		for (var att in oK) { if (att !== "knackLevel" && (bPrereq || !(/prereqeval|submenu/).test(att))) oNew[att] = oK[att]; }
		oFea.extrachoices.push(oK.name);
		oFea[aKeys[i]] = oNew;
	}
	return oFea;
};
// A Knack granted by a Conclave (not counted against Knacks Known)
LLConclaveKnack = function (sName, sKnack, sDescr, oExtra) {
	var oFea = {
		name : sName,
		source : [["GMB:LL", 0]],
		minlevel : 3,
		description : LLdesc(sDescr),
		autoSelectExtrachoices : [{ extrachoice : sKnack }]
	};
	oFea[sKnack] = {};
	for (var att in LLKnacks[sKnack]) { if (!(/knackLevel|prereqeval|submenu|prerequisite/).test(att)) oFea[sKnack][att] = LLKnacks[sKnack][att]; }
	if (oExtra) for (var a in oExtra) oFea[a] = oExtra[a];
	return oFea;
};
LLConclaveSpells = function (sName, aSpells) {
	return {
		name : sName + " Spells",
		source : [["GMB:LL", 0]],
		minlevel : 3,
		description : LLdesc("I always have these Conclave Spells prepared; they don't count against my prepared spells"),
		spellcastingExtra : LLSpellList(aSpells)
	};
};
// Primal companion creature helper (hp = base + mult x ranger level)
// hp calculations of the companions (only globals inside, MPMB stores them as text)
LLRngCompHP5 = function (totalHD, HDobj, prefix) {
	if (!classes.known["ranger(laserllama)"]) return;
	var lvl = classes.known["ranger(laserllama)"].level;
	HDobj.alt.push(5 + 5 * lvl);
	HDobj.altStr.push(" = 5 as a base\n + 5 \xD7 " + lvl + " from its ranger's level (" + (5 * lvl) + ")");
};
LLRngCompHP4 = function (totalHD, HDobj, prefix) {
	if (!classes.known["ranger(laserllama)"]) return;
	var lvl = classes.known["ranger(laserllama)"].level;
	HDobj.alt.push(4 + 4 * lvl);
	HDobj.altStr.push(" = 4 as a base\n + 4 \xD7 " + lvl + " from its ranger's level (" + (4 * lvl) + ")");
};
LLRangerCompanion = function (oCrea, nMult, nBase) {
	oCrea.source = [["GMB:LL", 0]];
	oCrea.hdLinked = ["ranger(laserllama)"];
	oCrea.minlevelLinked = ["ranger(laserllama)"];
	oCrea.proficiencyBonusLinked = true;
	if (!oCrea.challengeRating) oCrea.challengeRating = "1";
	if (!oCrea.proficiencyBonus) oCrea.proficiencyBonus = 2;
	if (!oCrea.passivePerception) oCrea.passivePerception = 10;
	oCrea.calcChanges = { hp : nMult === 4 ? LLRngCompHP4 : LLRngCompHP5, setAltHp : true };
	return oCrea;
};

ClassList["ranger(laserllama)"] = {
	name : "Ranger (LaserLlama)",
	regExpSearch : /^(?=.*ranger)(?=.*laserllama).*$/i,
	source : [["GMB:LL", 0]],
	primaryAbility : "Dexterity and Wisdom",
	prereqs : "Dexterity 13 and Wisdom 13",
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Str", "Dex"],
	abilitySave : 5,
	spellcastingFactor : "rangerll1",
	spellcastingTable : [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0, 0, 0, 0], [4, 2, 0, 0, 0, 0, 0, 0, 0],
		[4, 2, 0, 0, 0, 0, 0, 0, 0], [4, 3, 0, 0, 0, 0, 0, 0, 0], [4, 3, 0, 0, 0, 0, 0, 0, 0], [4, 3, 2, 0, 0, 0, 0, 0, 0], [4, 3, 2, 0, 0, 0, 0, 0, 0],
		[4, 3, 3, 0, 0, 0, 0, 0, 0], [4, 3, 3, 0, 0, 0, 0, 0, 0], [4, 3, 3, 1, 0, 0, 0, 0, 0], [4, 3, 3, 1, 0, 0, 0, 0, 0], [4, 3, 3, 2, 0, 0, 0, 0, 0],
		[4, 3, 3, 2, 0, 0, 0, 0, 0], [4, 3, 3, 3, 1, 0, 0, 0, 0], [4, 3, 3, 3, 1, 0, 0, 0, 0], [4, 3, 3, 3, 2, 0, 0, 0, 0], [4, 3, 3, 3, 2, 0, 0, 0, 0]
	],
	spellcastingKnown : {
		spells : "list",
		prepared : true
	},
	spellcastingList : {
		"class" : "ranger(laserllama)",
		level : [1, 5]
	},
	skillstxt : {
		primary : "Choose three from Animal Handling, Athletics, Insight, Investigation, Medicine, Nature, Perception, Sleight of Hand, Stealth, and Survival",
		secondary : "Choose one from Animal Handling, Athletics, Insight, Investigation, Medicine, Nature, Perception, Sleight of Hand, Stealth, and Survival"
	},
	armorProfs : {
		primary : [true, true, false, true],
		secondary : [true, true, false, true]
	},
	weaponProfs : {
		primary : [true, true],
		secondary : [true, true]
	},
	equipment : "Ranger (LaserLlama) starting equipment:" +
		"\n \u2022 A chain shirt and a shield -or- leather armor;" +
		"\n \u2022 Two shortswords -or- two simple melee weapons;" +
		"\n \u2022 A longbow and 20 arrows -or- a martial weapon;" +
		"\n \u2022 A dungeoneer's pack -or- an explorer's pack." +
		"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Ranger Conclave", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"fighting style" : LLAddFightingStyles({
			name : "Fighting Style",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc("Choose a Fighting Style with the \"Choose Feature\" button above; I can replace it when I gain a level")
		}, ["archery", "balanced", "defensive", "dual_wielding", "featherweight", "hurler", "mariner", "mountaineer", "strongbow", "versatile", "blind", "brawling", "druidic_warrior", "marksman", "mounted", "polearm"], false),
		"knacks" : LLKnackChoices({
			name : "Knacks",
			source : [["GMB:LL", 0]],
			minlevel : 1,
			description : LLdesc([
				"I know Knacks (use \"Choose Feature\"); I must meet their prerequisites; Knacks use my spell save DC",
				"When I gain a level, I can replace one Knack (not one required by another Knack I know)"
			]),
			extraname : "Knack",
			extraTimes : [1, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10]
		}, true),
		"ranger's quarry" : {
			name : "Ranger's Quarry",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"As a bonus action, I mark a creature I see as my Quarry for 1 hour (ends if it dies or I mark another):",
				"My hits vs. it deal +1 Quarry Die damage; +Quarry Die to checks to track, analyze, or recall knowledge about it",
				"After my uses, I can expend a spell slot; I regain one use on a short rest (all from 10th level)"
			]),
			additional : levels.map(function (n) { return n < 2 ? "" : "Quarry Die " + LLQuarryDie(n); }),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["bonus action", ""]],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (classes.known["ranger(laserllama)"] && classes.known["ranger(laserllama)"].level >= 2 && !v.isDC && (v.isWeapon || v.isSpell) && (/\bquarry\b/i).test(v.WeaponText)) {
							fields.Description += (fields.Description ? "; " : "") + "+1" + LLQuarryDie(classes.known["ranger(laserllama)"].level) + " vs. Quarry";
						}
					},
					"If I include the word 'Quarry' in an attack's name, it shows my Quarry Die bonus damage."
				]
			}
		},
		"spellcasting" : {
			name : "Spellcasting",
			source : [["GMB:LL", 0]],
			minlevel : 2,
			description : LLdesc([
				"I prepare Wis mod + half my ranger level Ranger spells during a long rest; Wisdom is my spellcasting ability",
				"I can use a druidic focus; I can cast prepared Ranger rituals as rituals"
			]),
			additional : levels.map(function (n) { return n < 2 ? "" : "Wis mod + " + Math.floor(n / 2) + " prepared"; })
		},
		"subclassfeature3" : {
			name : "Ranger Conclave",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Choose a Ranger Conclave and put it in the \"Class\" field; Conclave Spells are always prepared")
		},
		"extra attack" : {
			name : "Extra Attack",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : LLdesc("I can attack twice when I take the Attack action; when I use my action to cast a Ranger spell, I can make a weapon attack as a bonus action"),
			action : [["bonus action", " (after casting a spell)"]]
		},
		"feral senses" : {
			name : "Feral Senses",
			source : [["GMB:LL", 0]],
			minlevel : 5,
			description : levels.map(function (n) { return LLdesc(n < 18 ? "I can't have disadvantage on attack rolls against my Quarry" : "I can't have disadvantage on attack rolls against any target within 30 ft"); })
		},
		"tireless" : {
			name : "Tireless",
			source : [["GMB:LL", 0]],
			minlevel : 10,
			description : LLdesc("I regain all uses of Ranger's Quarry when I finish a short or long rest")
		},
		"foe slayer" : {
			name : "Foe Slayer",
			source : [["GMB:LL", 0]],
			minlevel : 20,
			description : LLdesc("When I hit my Quarry with a weapon attack, I can end the mark to deal maximum damage; if it drops to 50 HP or fewer: Con save or 0 HP")
		}
	}
};

// ===================================================================================
// RANGER CONCLAVES (Alternate Ranger v4.4.4)
// ===================================================================================
var LLPrimalBeastBase = {
	type : "Beast",
	alignment : "Neutral",
	ac : "13+Prof",
	languages : "understands the languages of its ranger",
	attacksAction : 1
};
var LLPrimalBeasts = [
	LLRangerCompanion({ name : "Beast of the Cave (LL)", size : 3, type : "Beast", alignment : "Neutral", ac : "13+Prof", hp : 20, hd : [3, 8], speed : "30 ft, burrow 10 ft", scores : [16, 14, 13, 8, 12, 11], saves : ["", "", 1, "", 1, ""], skills : { "Stealth" : 2 }, senses : "Darkvision 120 ft, Tremorsense 30 ft", languages : "understands the languages of its ranger", attacksAction : 1,
		attacks : [{ name : "Claw", ability : 1, damage : [1, 4, "slashing"], modifiers : ["Prof", "Prof-Str"], range : "Melee (5 ft)", description : "Damage die = its ranger's Quarry Die" }],
		traits : [{ name : "Hit Dice & Primal Bond", description : "d8 Hit Dice equal to its ranger's level; benefits from rests. Its save and skill proficiencies use its ranger's PB." }] }, 5, 5),
	LLRangerCompanion({ name : "Beast of the Land (LL)", size : 3, type : "Beast", alignment : "Neutral", ac : "13+Prof", hp : 20, hd : [3, 8], speed : "40 ft, climb 40 ft", scores : [16, 14, 15, 8, 12, 11], saves : [1, 1, "", "", "", ""], skills : { "Perception" : 2, "Stealth" : 2, "Survival" : 2 }, senses : "Darkvision 120 ft", languages : "understands the languages of its ranger", attacksAction : 1,
		attacks : [{ name : "Maul", ability : 1, damage : [1, 4, "slashing"], modifiers : ["Prof", "Prof-Str"], range : "Melee (5 ft)", description : "Damage die = Quarry Die; Charge: after 20 ft straight, +Quarry Die and prone (its size or smaller)" }],
		traits : [{ name : "Hit Dice & Primal Bond", description : "d8 Hit Dice equal to its ranger's level; benefits from rests. Its save and skill proficiencies use its ranger's PB." }] }, 5, 5),
	LLRangerCompanion({ name : "Beast of the Sea (LL)", size : 3, type : "Beast", alignment : "Neutral", ac : "13+Prof", hp : 20, hd : [3, 8], speed : "10 ft, swim 40 ft", scores : [16, 14, 15, 8, 12, 11], saves : ["", 1, 1, "", "", ""], skills : { "Perception" : 2, "Stealth" : 2 }, senses : "Darkvision 60 ft", languages : "understands the languages of its ranger", attacksAction : 1,
		attacks : [{ name : "Tentacle", ability : 1, damage : [1, 4, "bludgeoning"], modifiers : ["Prof", "Prof-Str"], range : "Melee (5 ft)", description : "Damage die = Quarry Die; Wrap: grapple (escape DC = ranger's spell DC)" }],
		traits : [{ name : "Amphibious", description : "It can breathe air and water." }, { name : "Hit Dice & Primal Bond", description : "d8 Hit Dice equal to its ranger's level; benefits from rests. Its save and skill proficiencies use its ranger's PB." }] }, 5, 5),
	LLRangerCompanion({ name : "Beast of the Sky (LL)", size : 4, type : "Beast", alignment : "Neutral", ac : "13+Prof", hp : 16, hd : [3, 6], speed : "10 ft, fly 60 ft", scores : [6, 16, 13, 8, 12, 11], saves : ["", 1, "", "", 1, ""], skills : { "Acrobatics" : 2, "Perception" : 2 }, senses : "Darkvision 60 ft", languages : "understands the languages of its ranger", attacksAction : 1,
		attacks : [{ name : "Shred", ability : 2, damage : [1, 4, "slashing"], modifiers : ["Prof", "Prof-Dex"], range : "Melee (5 ft)", description : "Damage die = Quarry Die" }],
		traits : [{ name : "Flyby", description : "It doesn't provoke opportunity attacks when it flies out of reach." }, { name : "Hit Dice & Primal Bond", description : "d6 Hit Dice equal to its ranger's level; benefits from rests. Its save and skill proficiencies use its ranger's PB." }] }, 4, 4)
];
AddSubClass("ranger(laserllama)", "beast master", {
	regExpSearch : /^(?=.*beast)(?=.*master).*$/i,
	subname : "Beast Master",
	fullname : "Beast Master",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLConclaveSpells("Beast Master", ["animal friendship", "beast bond", "beast sense", "warding bond", "haste", "protection from energy", "death ward", "freedom of movement", "awaken", "commune with nature"]),
		"subclassfeature3.1" : {
			name : "Primal Beast",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I'm bonded to a Primal Beast (Cave, Land, Sea, or Sky; select it on a Companion page); it uses my PB, Quarry Die, and spell DC",
				"It acts on my turn (Dodge unless commanded with a bonus action, or I forgo an attack of my Attack action)",
				"At 0 HP it makes death saves; 1-hour ritual revives it; during a long rest I can change its stat block"
			]),
			action : [["bonus action", "Command Primal Beast"]],
			creatureOptions : LLPrimalBeasts
		},
		"subclassfeature3.knack" : LLConclaveKnack("Wild Empathy", "wild insight i", "I gain proficiency in Insight and learn Wild Insight I (doesn't count against my Knacks; another Knack if I know it)", { skills : ["Insight"] }),
		"subclassfeature7" : {
			name : "Bestial Focus",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("My Primal Beast gains the benefits of my Ranger's Quarry (and Knacks enhancing it); its natural weapons are magical")
		},
		"subclassfeature11" : {
			name : "Exceptional Training",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("Once per turn when I order my Beast to attack, it can make two attacks")
		},
		"subclassfeature15" : {
			name : "Primal Bond",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I cast a Ranger spell targeting only myself, my Beast within 30 ft also gains its benefits")
		}
	}
});

AddSubClass("ranger(laserllama)", "deep stalker", {
	regExpSearch : /^(?=.*deep)(?=.*stalker).*$/i,
	subname : "Deep Stalker",
	fullname : "Deep Stalker",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLConclaveSpells("Deep Stalker", ["cause fear", "disguise self", "darkness", "invisibility", "fear", "nondetection", "greater invisibility", "phantasmal killer", "mislead", "seeming"]),
		"subclassfeature3.1" : {
			name : "Dread Ambusher & Umbral Sight",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"If not incapacitated or surprised, +Wis mod (min +1) to initiative; first turn Attack action: one extra attack (+Quarry Die psychic on hit)",
				"I gain darkvision 60 ft (or +60 ft)"
			]),
			addMod : [{ type : "skill", field : "Init", mod : "max(Wis|1)", text : "Dread Ambusher: I add my Wisdom modifier (min +1) to initiative rolls." }],
			vision : [["Darkvision", "fixed 60"], ["Darkvision", "+60"]]
		},
		"subclassfeature7" : {
			name : "Cloak of Shadows & Iron Mind",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("In darkness, I'm invisible to creatures relying on darkvision; I gain proficiency in Wisdom saves (or Int/Cha)"),
			saves : ["Wis"]
		},
		"subclassfeature11" : {
			name : "Precise Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("Once per turn when I miss my Quarry, I add my Quarry Die to the attack roll; my darkvision sees through magical darkness")
		},
		"subclassfeature15" : {
			name : "Deadly Counter",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Reaction when my Quarry attacks me: impose disadv.; if it misses, I make one weapon attack vs. it (adv. if I'm in dim light or darkness)"),
			action : [["reaction", ""]]
		}
	}
});

AddSubClass("ranger(laserllama)", "drake guard", {
	regExpSearch : /^(?=.*drake)(?=.*guard).*$/i,
	subname : "Drake Guard",
	fullname : "Drake Guard",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLConclaveSpells("Drake Guard", ["absorb elements", "command", "dragon's breath", "warding bond", "elemental bane", "fear", "dominate creature", "dominate beast", "polymorph", "awaken", "conjure dragon"]),
		"subclassfeature3.1" : {
			name : "Draconic Companion",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I'm bound to a Draconic Companion (see Companion page) with an Essence: acid, cold, fire, lightning, or poison",
				"It acts on my turn (Dodge unless commanded with a bonus action, or I forgo an attack); death saves at 0 HP; 1-hour ritual revives it"
			]),
			action : [["bonus action", "Command Draconic Companion"]],
			creaturesAdd : [["Draconic Companion (LL)"]],
			creatureOptions : [LLRangerCompanion({
				name : "Draconic Companion (LL)", size : 4, type : "Dragon", alignment : "Lawful", ac : "14+Prof", hp : 20, hd : [3, 8], speed : "30 ft, fly 30 ft",
				scores : [16, 12, 15, 8, 10, 14], saves : ["", 1, 1, "", "", ""], skills : { "Acrobatics" : 2, "Intimidation" : 2 }, senses : "Darkvision 60 ft",
				damage_immunities : "its Essence damage type", languages : "Draconic, understands the languages of its ranger", attacksAction : 1,
				attacks : [{ name : "Claw", ability : 1, damage : [1, 4, "slashing"], modifiers : ["Prof", "Prof-Str"], range : "Melee (5 ft)", description : "Damage die = Quarry Die; +1d4 Essence damage; magical from 7th level" }],
				traits : [{ name : "Hit Dice & Soul Bond", description : "d8 Hit Dice equal to its ranger's level; benefits from rests. Its save and skill proficiencies use its ranger's PB." },
					{ name : "Greater Companion (Drake Guard 7)", minlevel : 7, description : "It becomes Medium and carries its Medium or smaller ranger as a rider (fly speed halved while ridden); its natural weapons are magical." },
					{ name : "Mythic Companion (Drake Guard 15)", minlevel : 15, description : "Large; AC 14+PB; 40 ft, climb 40 ft, fly 60 ft; Str 20, Dex 12, Con 18, Int 14, Wis 10, Cha 18; blindsight 30 ft; Claw +5+PB, Quarry Die + PB slashing + 1d4 Essence; Change Size (Small to Large); two attacks when commanded once per turn." }]
			}, 5, 5)]
		},
		"subclassfeature3.2" : {
			name : "Wyrmsoul",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I learn Draconic; my Ranger's Quarry damage and Ranger spell damage can be my Companion's Essence type"),
			languageProfs : ["Draconic"]
		},
		"subclassfeature7" : {
			name : "Greater Companion",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("My Companion becomes Medium and can carry me as a rider (its fly speed is halved); its natural weapons are magical")
		},
		"subclassfeature11" : {
			name : "Elemental Breath",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : levels.map(function (n) {
				return LLdesc("As an action, I or my Companion exhale a 30-ft cone: Dex save or 6" + LLQuarryDie(n) + " Essence damage (half on save); then a 3rd-level+ slot");
			}),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["action", ""]]
		},
		"subclassfeature15" : {
			name : "Mythic Companion",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("My Companion uses the Mythic Companion statistics (see its traits); once per turn when commanded to attack, it makes two attacks")
		}
	}
});

AddSubClass("ranger(laserllama)", "fey wanderer", {
	regExpSearch : /^(?=.*fey)(?=.*wanderer).*$/i,
	subname : "Fey Wanderer",
	fullname : "Fey Wanderer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Beguiling Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("My Quarry damage is psychic; when it hits a Quarry within 15 ft, it has disadv. on attacks vs. others than me until my next turn")
		},
		"subclassfeature3.1" : LLConclaveSpells("Fey Wanderer", ["cause fear", "charm person", "misty step", "suggestion", "conjure fey", "enemies abound", "charm monster", "dimension door", "geas", "mislead"]),
		"subclassfeature3.2" : {
			name : "Otherworldly Mystique",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Deception, Performance, or Persuasion; I can use Wisdom instead of Charisma for Charisma checks"),
			skillstxt : "Choose one from Deception, Performance, or Persuasion",
			addMod : [
				{ type : "skill", field : "Deception", mod : "max(Wis-Cha|0)", text : "Otherworldly Mystique: I can use Wisdom for Charisma checks." },
				{ type : "skill", field : "Intimidation", mod : "max(Wis-Cha|0)", text : "Otherworldly Mystique: I can use Wisdom for Charisma checks." },
				{ type : "skill", field : "Performance", mod : "max(Wis-Cha|0)", text : "Otherworldly Mystique: I can use Wisdom for Charisma checks." },
				{ type : "skill", field : "Persuasion", mod : "max(Wis-Cha|0)", text : "Otherworldly Mystique: I can use Wisdom for Charisma checks." }
			]
		},
		"subclassfeature7" : {
			name : "Whimsical Ward",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Adv. on saves vs. charmed and frightened; when a creature succeeds vs. a Fey Wanderer spell, I can retarget it to another creature in range"),
			savetxt : { adv_vs : ["charmed", "frightened"] },
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest"
		},
		"subclassfeature11" : {
			name : "Faerie Guardian",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("I cast conjure fey without material components; I can cast it without concentration for 1 minute (previous Fey vanish)")
		},
		"subclassfeature15" : {
			name : "Mirthful Step",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I cast misty step without a slot Wis mod times per long rest; when I cast it, I can bring one willing creature within 5 ft"),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest"
		}
	}
});

AddSubClass("ranger(laserllama)", "hunter", {
	regExpSearch : /^(?=.*hunter)(?!.*(bounty|monster|blood)).*$/i,
	subname : "Hunter",
	fullname : "Hunter",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLConclaveSpells("Hunter", ["create snare", "expeditious retreat", "locate creature", "pass without trace", "conjure volley", "conjure barrage", "nondetection", "faithful hound", "freedom of movement", "swift quiver", "tree stride"]),
		"subclassfeature3.1" : {
			name : "Ambuscade",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("When I roll initiative (not surprised), I can use my reaction to Hide, take the Attack action, or mark a Quarry"),
			action : [["reaction", " (on initiative)"]]
		},
		"subclassfeature3.knack" : LLConclaveKnack("Silent Steps", "stalker i", "I gain proficiency in Stealth and learn Stalker I (doesn't count against my Knacks; another Knack if I know it)", { skills : ["Stealth"] }),
		"subclassfeature7" : {
			name : "Cunning Parry & Relentless Hunter",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"Reaction when my Quarry attacks me: +Wis mod (min +1) AC; if it misses, one weapon attack vs. it",
				"When my Quarry dies, I can transfer the mark to another creature (no action)"
			]),
			action : [["reaction", "Cunning Parry"]]
		},
		"subclassfeature11" : {
			name : "Horde Breaker",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc([
				"Action: Volley (creatures of my choice within 10 ft of a point in range: Dex save or my ranged weapon's damage, half on save)",
				"or Whirlwind (creatures of my choice within my melee reach: Dex save or my melee weapon's damage, half on save)"
			]),
			action : [["action", "Volley/Whirlwind"]]
		},
		"subclassfeature15" : {
			name : "Ruthless Focus",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I damage my Quarry with an attack or Horde Breaker, I add my Wis mod (min +1) to the damage")
		}
	}
});

AddSubClass("ranger(laserllama)", "monster slayer", {
	regExpSearch : /^(?=.*monster)(?=.*slayer).*$/i,
	subname : "Monster Slayer",
	fullname : "Monster Slayer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLConclaveSpells("Monster Slayer", ["bane", "protection from evil & good", "moonbeam", "see invisibility", "magic circle", "protection from energy", "banishment", "faithful hound", "dispel evil & good", "hold monster"]),
		"subclassfeature3.1" : {
			name : "Knowledge of the Hunt",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency in Arcana, History, Nature, or Religion",
				"Bonus action: analyze a creature within 30 ft (DC 8 + CR; +Quarry Die if Quarry) with Arcana (aberration, dragon, monstrosity),",
				"History (giant, humanoid), Nature (beast, elemental, ooze, plant), Religion (celestial, fey, fiend, undead): learn immunities etc."
			]),
			skillstxt : "Choose one from Arcana, History, Nature, or Religion",
			action : [["bonus action", "Knowledge of the Hunt"]]
		},
		"subclassfeature3.knack" : LLConclaveKnack("Hated Foe", "favored foe (1)", "I learn Favored Foe; once per short rest I can mark a Favored Foe as my Quarry without a use or slot", { usages : 1, recovery : "short rest" }),
		"subclassfeature7" : {
			name : "Iron Focus",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When my Quarry forces me to make a check or save, I add my Quarry Die")
		},
		"subclassfeature11" : {
			name : "Monster's Nemesis",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("My weapon attacks vs. my Quarry ignore resistance (immunity = resistance); reaction when it misses me or I succeed on its save: one weapon attack"),
			action : [["reaction", ""]]
		},
		"subclassfeature15" : {
			name : "Ruthless Counter",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Reaction when my Quarry casts, teleports, or uses a magical ability: weapon attack; on a hit, Wis save or it fails (end the mark: automatic fail)"),
			action : [["reaction", ""]]
		}
	}
});

AddSubClass("ranger(laserllama)", "planar warden", {
	regExpSearch : /^(?=.*planar)(?=.*warden).*$/i,
	subname : "Planar Warden",
	fullname : "Planar Warden",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Extraplanar Awareness",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"Action" + (n < 11 ? "" : " (or 10-min ritual, also during a rest)") + ": I learn distance and direction of the nearest extraplanar creature or portal within 1 mile",
					"I can mark it as my Quarry for free and track it on the same plane; once per short rest, then a spell slot"
				]);
			}),
			usages : 1,
			recovery : "short rest",
			action : [["action", ""]]
		},
		"subclassfeature3.1" : {
			name : "Planar Warrior",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("My Quarry damage is force; vs. a Quarry not native to the current plane, it's two Quarry Dice")
		},
		"subclassfeature3.2" : LLConclaveSpells("Planar Warden", ["alarm", "protection from evil & good", "misty step", "rope trick", "haste", "magic circle", "banishment", "dimension door", "banishing smite", "teleportation circle"]),
		"subclassfeature7" : {
			name : "Ethereal Step",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("When I take the Attack action, I can teleport 10 ft before each attack (counts against my movement)")
		},
		"subclassfeature11" : {
			name : "Elite Warden & Extraplanar Adept",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("After Ethereal Step, an attack can deal force damage; if I attack two different targets, one extra attack vs. a third; Awareness as a ritual")
		},
		"subclassfeature15" : {
			name : "Ethereal Defense",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Reaction when I take damage from a source I see: resistance; I can expend a slot to teleport 10 ft per slot level"),
			action : [["reaction", ""]]
		}
	}
});

AddSubClass("ranger(laserllama)", "spellbreaker", {
	regExpSearch : /spell ?breaker/i,
	subname : "Spellbreaker",
	fullname : "Spellbreaker",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Mage Breaker & Spellsight",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"When I hit my Quarry with a weapon, it has disadv. on concentration saves; reaction: opportunity attack vs. a creature casting within reach",
				"When I mark a Quarry, I learn its spellcasting ability and highest spell level it can cast"
			]),
			action : [["reaction", "OA vs. caster"]]
		},
		"subclassfeature3.1" : LLConclaveSpells("Spellbreaker", ["absorb elements", "detect magic", "blindness/deafness", "silence", "counterspell", "dispel magic", "arcane eye", "resilient sphere", "dispel evil & good", "wall of force"]),
		"subclassfeature7" : {
			name : "Arcane Defense",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("+Wis mod (min +1) to saves vs. my Quarry's spells and magic; evasion vs. its half-damage spells")
		},
		"subclassfeature11" : {
			name : "Spellbane",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("On a weapon hit vs. my Quarry, expend a slot: +1 Quarry Die force per slot level; +Quarry Die to counterspell and dispel magic checks")
		},
		"subclassfeature15" : {
			name : "Mantle of the Master & Reflect Spell",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("While conscious, resistance to damage from spells and magical effects; absorb elements at will (1st level); its damage is maximized vs. the caster"),
			dmgres : ["Spells"],
			spellcastingBonus : [{ name : "Reflect Spell", spells : LLSpellList(["absorb elements"]), selection : LLSpellList(["absorb elements"]), firstCol : "atwill" }]
		}
	}
});

AddSubClass("ranger(laserllama)", "swarm keeper", {
	regExpSearch : /^(?=.*swarm)(?=.*keeper).*$/i,
	subname : "Swarm Keeper",
	fullname : "Swarm Keeper",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLConclaveSpells("Swarm Keeper", ["entangle", "faerie fire", "spider climb", "web", "fly", "gaseous form", "arcane eye", "giant insect", "arcane hand", "insect plague"]),
		"subclassfeature3.1" : {
			name : "Symbiotic Swarm",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				var d = "2" + LLQuarryDie(Math.max(n, 2));
				return LLdesc([
					"I know mage hand (it's part of my swarm); bonus action each turn, one of:",
					"Biting Assault: a creature within 30 ft: Dex save or " + d + " piercing or poison" + (n < 11 ? "" : " and poisoned until my next turn"),
					"Harrying Horde: Str save (adv. if Large+) or moved 15 ft" + (n < 11 ? "" : " and prone") + "; Swarm Step: I move 15 ft without OAs" + (n < 11 ? "" : " and gain half cover")
				].concat(n < 11 ? [] : ["My Quarry has disadv. on saves vs. these"]));
			}),
			action : [["bonus action", "Symbiotic Swarm"]],
			spellcastingBonus : [{ name : "Symbiotic Swarm", spells : ["mage hand"], selection : ["mage hand"], firstCol : "atwill" }]
		},
		"subclassfeature7" : {
			name : "Writhing Horde",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Climbing speed = walking speed (sheer surfaces, ceilings); +Quarry Die to Athletics to resist or end a grapple or shove"),
			speed : { climb : { spd : "walk", enc : "walk" } }
		},
		"subclassfeature11" : {
			name : "Greater Swarm",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("My Quarry has disadv. vs. my swarm; Biting Assault poisons, Harrying Horde knocks prone, Swarm Step grants half cover")
		},
		"subclassfeature15" : {
			name : "One with the Swarm & Swarm Master",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc([
				"Reaction when I take damage from a source I see: resistance and move 30 ft without OAs (Wis mod per long rest, then a slot)",
				"Once per long rest, I cast a Swarm Keeper Spell without a slot or material components"
			]),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["reaction", "One with the Swarm"]]
		}
	}
});

// ===================================================================================
// ADDITIONAL CONCLAVES (Alternate Ranger Expanded v4.4.4)
// ===================================================================================
LLExploitTables["ranger(laserllama)-bounty hunter"] = {
	cls : "ranger(laserllama)",
	sub : "ranger(laserllama)-bounty hunter",
	factor : 0.5,
	dice : [0, 0, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4],
	die : ["", "", "d4", "d4", "d4", "d4", "d6", "d6", "d6", "d6", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d8"],
	maxDegree : [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3]
};
AddSubClass("ranger(laserllama)", "bounty hunter", {
	regExpSearch : /^(?=.*bounty)(?=.*hunter).*$/i,
	subname : "Bounty Hunter",
	fullname : "Bounty Hunter",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3.knack" : LLConclaveKnack("Ear to the Ground", "urban adept", "I gain proficiency in Investigation and learn Urban Adept (doesn't count against my Knacks; another Knack if I know it)", { skills : ["Investigation"] }),
		"subclassfeature3" : LLExploitFeature({
			name : "Martial Exploits",
			minlevel : 3,
			cls : "ranger(laserllama)",
			list : "fighter(laserllama)",
			tableKey : "ranger(laserllama)-bounty hunter",
			sheet : "martial exploits",
			sheetName : "Martial Exploits",
			ability : 5,
			notesTitle : "Bounty Hunter Exploits",
			extraname : "Martial Exploit",
			extraTimes : [0, 0, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7],
			description : LLdesc([
				"I learn Martial Exploits of the Alternate Fighter (\"Choose Feature\"); I can swap one when I gain a ranger level",
				"One Exploit per check, attack, or save; they use my Ranger spell save DC"
			])
		}),
		"subclassfeature3.0" : LLExploitDiceFeature("ranger(laserllama)-bounty hunter", 3, "Ranger (LaserLlama)"),
		"subclassfeature7" : {
			name : "Cunning Restraint",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("+Quarry Die to Athletics to grapple or shove my Quarry; while grappled by me or prone, it has disadv. on saves vs. my Exploits and Ranger spells")
		},
		"subclassfeature11" : {
			name : "Ruthless Counter",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("Reaction when my Quarry misses me with a melee attack: Dex save or I knock it prone, grapple it, or make one melee attack vs. it"),
			action : [["reaction", ""]]
		},
		"subclassfeature15" : {
			name : "Most Dangerous Game",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Once per turn when my Quarry damages me, I reduce the damage by my Quarry Die")
		}
	}
});

AddSubClass("ranger(laserllama)", "buccaneer", {
	regExpSearch : /buccaneer/i,
	subname : "Buccaneer",
	fullname : "Buccaneer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLConclaveSpells("Buccaneer", ["compelled duel", "fog cloud", "gust of wind", "misty step", "call lightning", "tidal wave", "control water", "watery sphere", "control winds", "maelstrom"]),
		"subclassfeature3.1" : {
			name : "Brazen Bravado",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("If not incapacitated or surprised, I add my Quarry Die to initiative and to saves vs. frightened")
		},
		"subclassfeature3.knack" : LLAddFightingStyles(LLKnackChoices({
			name : "Sea Legs",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain the Mariner Fighting Style or the Aquatic Adept Knack (not counted, can't be replaced; Druidic Warrior if I know both); use \"Choose Feature\""),
			extraname : "Sea Legs",
			extraTimes : levels.map(function (n) { return n < 3 ? 0 : 1; })
		}, false, ["aquatic adept"]), ["mariner", "druidic_warrior"], true),
		"subclassfeature7" : {
			name : "First Mate & Brine in the Blood",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : levels.map(function (n) {
				return LLdesc([
					"+Quarry Die to checks to navigate or operate a seafaring vessel; as captain, I can mark a vessel or Huge+ swimmer as Quarry for all friendly crew",
					(n < 15 ? "After a short or long rest, I choose" : "I have both") + ": Waves (resist cold, cold Quarry damage, can't be knocked prone or moved) or Winds (resist thunder, thunder Quarry damage, ignore difficult terrain)"
				]);
			})
		},
		"subclassfeature11" : {
			name : "Wrath of the Sea",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("Once per turn on a weapon hit: Str save (disadv. if Quarry) or Waves: +Quarry Die cold and pushed 5\xD7Wis mod ft; Winds: +Quarry Die thunder and I move half speed without OAs")
		},
		"subclassfeature15" : {
			name : "Scion of the Seas",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I gain both Brine in the Blood alignments; aboard a friendly vessel, its speed doubles and my reaction reduces its damage by my ranger level"),
			action : [["reaction", "Protect vessel"]]
		}
	}
});

AddSubClass("ranger(laserllama)", "elder haunt", {
	regExpSearch : /^(?=.*elder)(?=.*haunt).*$/i,
	subname : "Elder Haunt",
	fullname : "Elder Haunt",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLConclaveSpells("Haunt", ["entangle", "wrathful smite", "blindness/deafness", "spike growth", "fear", "spectral passage", "accursed touch", "hallucinatory terrain", "antilife shell", "spiritual sundering"]),
		"subclassfeature3.1" : {
			name : "Elder Haunt",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"When I mark a Quarry, I can transform into an Elder Haunt for the duration:",
					"Gaunt Visage: AC 10 + Wis mod + Con mod (if higher)",
					"Unsettling Presence: creatures of my choice starting their turn within " + (n < 11 ? 10 : 15) + " ft that see me: Wis save or only move, action, or bonus action" + (n < 11 ? "" : "; on a fail 2 Quarry Dice psychic")
				].concat(n < 7 ? [] : ["Primeval Hunger: +Quarry Die to saves; below half HP, damaging my Quarry heals me its Quarry damage (excess = temp HP)"]));
			}),
			armorOptions : [{ regExpSearch : /^(?=.*gaunt)(?=.*visage).*$/i, name : "Gaunt Visage", source : [["GMB:LL", 0]], ac : "10+Wis+Con", dex : -10, affectsWildShape : true }]
		},
		"subclassfeature7" : {
			name : "Primeval Hunger",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("In Haunt form, I add my Quarry Die to saves; below half HP, damaging my Quarry restores HP equal to my Quarry damage (excess becomes temp HP)")
		},
		"subclassfeature11" : {
			name : "Dread Presence",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("Unsettling Presence: 15 ft, difficult terrain for creatures of my choice, failures take 2 Quarry Dice psychic (and heal me a Quarry Die if I'm below half)")
		},
		"subclassfeature15" : {
			name : "Ancient Terror",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("I don't need to eat, drink, or sleep and ignore the first five levels of exhaustion; in Haunt form at 0 HP, expend a slot to regain 5\xD7 slot level HP")
		}
	}
});

AddSubClass("ranger(laserllama)", "grim warden", {
	regExpSearch : /^(?=.*grim)(?=.*warden).*$/i,
	subname : "Grim Warden",
	fullname : "Grim Warden",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Warden's Rite",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("Proficiency with alchemist's supplies and Religion (+Quarry Die to both); I'm also a monstrosity; +3 max HP, +1 per ranger level after"),
			skills : ["Religion"],
			toolProfs : ["Alchemist's supplies"],
			calcChanges : {
				hp : function (totalHD) {
					if (!classes.known["ranger(laserllama)"]) return;
					var lvl = classes.known["ranger(laserllama)"].level;
					return [lvl, "Warden's Rite (3 + 1 per ranger level after 3rd)"];
				}
			}
		},
		"subclassfeature3.1" : LLConclaveSpells("Grim Warden", ["bane", "hex", "hold person", "shadow blade", "bestow curse", "vampiric touch", "blight", "shadow of moil", "enervation", "hold monster"]),
		"subclassfeature3.2" : {
			name : "Crimson Mark",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"When I mark a Quarry, I can reduce my current and max HP by my Quarry Die instead of a use (max HP back after a long rest)",
				"Its Quarry damage is necrotic, I gain temp HP equal to it, and the target can't regain HP for 1 min"
			])
		},
		"subclassfeature7" : {
			name : "Dark Augmentation",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("While I have a Crimson Mark: +10 ft speed and +Quarry Die to Str, Dex, and Con checks")
		},
		"subclassfeature11" : {
			name : "Sanguine Strikes & Sinister Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc([
				"Once per turn on a melee weapon hit: +1d10 necrotic and temp HP equal to it",
				"Resistance to necrotic; Crimson Mark HP cost rolled twice (lower); my necrotic damage ignores resistance (immunity = resistance)"
			]),
			dmgres : ["Necrotic"]
		},
		"subclassfeature15" : {
			name : "Sanguine Mastery",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Adv. on saves vs. frightened; always under protection from evil and good while conscious; with a Crimson Mark, +Quarry Die to Str/Dex/Con saves"),
			savetxt : { adv_vs : ["frightened"] }
		}
	}
});

AddSubClass("ranger(laserllama)", "nomad", {
	regExpSearch : /^(?=.*nomad)(?=.*(ranger|laserllama)).*$/i,
	subname : "Nomad",
	fullname : "Nomad",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLConclaveSpells("Nomad", ["comprehend languages", "disguise self", "detect thoughts", "misty step", "clairvoyance", "tongues", "dimension door", "divination", "commune", "seeming"]),
		"subclassfeature3.1" : {
			name : "Expunging Strikes & Mystic Knowledge",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"Once per turn on a Quarry weapon hit: Int save or the damage becomes psychic and it can't perceive me until my next turn",
					"After each long rest, I gain " + (n < 11 ? "one" : "two") + " skill/tool proficiency or language until my next long rest"
				]);
			})
		},
		"subclassfeature7" : {
			name : "Nomad's Step",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : levels.map(function (n) {
				return LLdesc([
					"Phase Defense: reaction when hit, the attack misses and I reappear in a space I occupied since my last turn",
					"Psionic Jaunt: bonus action, teleport by spending remaining movement" + (n < 11 ? "" : "; I regain all uses on a short rest and one on initiative")
				]);
			}),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["reaction", "Phase Defense"], ["bonus action", "Psionic Jaunt"]]
		},
		"subclassfeature11" : {
			name : "Strange Movement",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("I regain all uses of Nomad's Step on a short or long rest, and one use when I roll initiative")
		},
		"subclassfeature15" : {
			name : "Mystical Burst",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("When I teleport with a Nomad Spell or feature, creatures within 10 ft of where I appear: Int save or Quarry Die psychic (half on save)")
		}
	}
});

AddSubClass("ranger(laserllama)", "shifter", {
	regExpSearch : /^(?=.*shifter)(?=.*ranger).*$/i,
	subname : "Shifter",
	fullname : "Shifter Conclave",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : {
			name : "Limited Wild Shape",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"As a bonus action, I Shift into a Beast Shape (CR 1/4 or lower; unlimited shapes learned by touching friendly beasts) for " + (n < 15 ? "1 hour" : "as long as I want"),
					"I keep HP, mental scores, proficiencies, features (incl. Quarry); can't cast spells; regain one use on a short rest"
				].concat(n < 7 ? [] : ["Elder Power: expend a slot instead of a use: CR 1/2 (1st), 1 (2nd), 2 (3rd), 3 (4th), 4 (5th); magical attacks, Quarry Die damage die"]));
			}),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["bonus action", " (start/end)"]]
		},
		"subclassfeature3.1" : LLConclaveSpells("Shifter", ["animal friendship", "beast bond", "alter self", "conjure beast", "fear", "nondetection", "dominate creature", "dominate beast", "guardian of nature", "commune with nature", "tree stride"]),
		"subclassfeature3.knack" : LLConclaveKnack("Wild Empathy", "wild insight i", "I gain proficiency in Insight and learn Wild Insight I (doesn't count against my Knacks; another Knack if I know it)", { skills : ["Insight"] }),
		"subclassfeature7" : {
			name : "Elder Power",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("I can expend a spell slot instead of a use to Shift into a stronger Beast (CR by slot level); its attacks are magical and can use my Quarry Die")
		},
		"subclassfeature11" : {
			name : "Primal Resilience",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("On initiative: regain one use or Shift before anyone acts; a slot + a use: my Beast Shape resists bludgeoning, piercing, and slashing")
		},
		"subclassfeature15" : {
			name : "Primal Mastery",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("My Wild Shape only ends when I choose to end it")
		}
	}
});

var LLConstellations = {
	"adder" : ["Adder", "thorn whip", "inflict wounds"],
	"bear" : ["Bear", "resistance", "wrathful smite"],
	"elephant" : ["Elephant", "guidance", "bless"],
	"snow hare" : ["Snow Hare", "minor illusion", "armor of agathys"],
	"stag" : ["Stag", "shillelagh", "heroism"],
	"wolf" : ["Wolf", "true strike", "guiding bolt"]
};
AddSubClass("ranger(laserllama)", "stargazer", {
	regExpSearch : /stargazer/i,
	subname : "Stargazer",
	fullname : "Stargazer",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : (function () {
			var oFea = {
				name : "Constellation Magic",
				source : [["GMB:LL", 0]],
				minlevel : 3,
				description : LLdesc([
					"After each long rest, I attune to a Constellation (\"Choose Feature\"): its cantrip and 1st-level spell are prepared",
					"Once per short rest, I cast the 1st-level spell without a slot at my highest slot level"
				]),
				usages : 1,
				recovery : "short rest",
				choices : []
			};
			for (var sC in LLConstellations) {
				var a = LLConstellations[sC];
				oFea.choices.push(a[0]);
				oFea[sC] = {
					name : a[0] + " Constellation",
					description : LLdesc("Cantrip: " + a[1] + "; 1st-level spell: " + a[2]),
					spellcastingBonus : [{ name : a[0] + " Constellation", spells : LLSpellList([a[1]]), selection : LLSpellList([a[1]]), firstCol : "atwill" }],
					spellcastingExtra : LLSpellList([a[2]])
				};
			}
			return oFea;
		})(),
		"subclassfeature3.1" : {
			name : "Celestial Guidance",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency with cartographer's or navigator's tools (+Quarry Die to their checks); I can't become lost while I see the stars"),
			toolProfs : [["Cartographer's or navigator's tools", 1]]
		},
		"subclassfeature3.2" : LLConclaveSpells("Stargazer", ["mind spike", "moonbeam", "beacon of hope", "clairvoyance", "divination", "guardian of faith", "dawn", "wall of light"]),
		"subclassfeature7" : {
			name : "Threads of Fate",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Reaction when a creature I see within 30 ft makes a check or save: +Wis mod (min +1), before knowing the result"),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature11" : {
			name : "Starlight Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("Once per turn when I hit with a weapon or damage with a Ranger spell, I deal +Quarry Die radiant")
		},
		"subclassfeature15" : {
			name : "Resplendent Soul",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Reaction when targeted by an attack: Con save or 3 Quarry Dice radiant and the attack misses; then a spell slot"),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		}
	}
});

AddSubClass("ranger(laserllama)", "trapper", {
	regExpSearch : /^(?=.*trapper)(?=.*(ranger|laserllama)).*$/i,
	subname : "Trapper",
	fullname : "Trapper",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLConclaveSpells("Trapper", ["create snare", "ensnaring strike", "cordon of arrows", "hold person", "glyph of warding", "slow", "resilient sphere", "stone shape", "hold monster", "planar binding"]),
		"subclassfeature3.1" : {
			name : "Meticulous Fingers",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I gain proficiency in Sleight of Hand, thieves' and tinker's tools (+Quarry Die to them); Use an Object as a bonus action"),
			skills : ["Sleight of Hand"],
			toolProfs : ["Thieves' tools", "Tinker's tools"],
			action : [["bonus action", "Use an Object"]]
		},
		"subclassfeature3.knack" : LLConclaveKnack("Trap Adept", "trapper i", "I learn Trapper I (not counted; another Knack if I know it); I can rearm disarmed traps with tinker's tools (DC = my spell DC)"),
		"subclassfeature7" : {
			name : "Combat Snares",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("As an action, I craft a Trap and throw it 20 ft (creatures there save as if entering; lasts 1 min); Use an Object to throw crafted Traps"),
			action : [["action", "Combat Snare"]]
		},
		"subclassfeature11" : {
			name : "Deadly Snares & Greater Traps",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : levels.map(function (n) {
				return LLdesc([
					"My Quarry has disadv. on its first save vs. my Traps (auto-fail if unaware)",
					"After a long rest I have 1 + Wis mod (min 2) Traps; they affect Huge or smaller and deal 3" + LLQuarryDie(n) + " magical B/P/S (half on save)"
				]);
			})
		},
		"subclassfeature15" : {
			name : "Master of Traps",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("On initiative, reaction: craft and throw a Trap within 20 ft; my Traps can cover a 10-ft square"),
			action : [["reaction", "Trap (on initiative)"]]
		}
	}
});

AddSubClass("ranger(laserllama)", "wastelander", {
	regExpSearch : /wastelander/i,
	subname : "Wastelander",
	fullname : "Wastelander",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLConclaveSpells("Wastelander", ["absorb elements", "silent image", "invisibility", "mirror image", "major image", "wall of sand", "greater invisibility", "hallucinatory terrain", "commune with nature", "mislead"]),
		"subclassfeature3.1" : {
			name : "Wasteland Cloak",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : levels.map(function (n) {
				return LLdesc([
					"Proficiency (expertise) with weaver's tools; during a long rest I enhance/maintain Wis mod (min 1) Cloaks:",
					"Wearer adds Quarry Die to Stealth to hide, needs 1/4 water, adv. on saves vs. harsh environments and exhaustion"
				].concat(n < 7 ? [] : ["Mystic Camouflage: the wearer can cast invisibility on itself 3 times (regained on maintenance)"]));
			}),
			toolProfs : [["Weaver's tools", "increment"]]
		},
		"subclassfeature3.knack" : LLKnackChoices({
			name : "Wilderness Adept",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("I learn an environment Knack at 3rd, 7th, 11th, and 15th level (Planar Adept from 7th); not counted; use \"Choose Feature\""),
			extraname : "Wilderness Adept Knack",
			extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 7 ? 1 : n < 11 ? 2 : n < 15 ? 3 : 4; })
		}, false, ["alpine adept", "aquatic adept", "arctic adept", "desert adept", "jungle adept", "planar adept (1)", "planar adept (2)", "planar adept (3)"]),
		"subclassfeature7" : {
			name : "Mystic Camouflage",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("A creature wearing my Wasteland Cloak can use it to cast invisibility on itself three times (regained when maintained)")
		},
		"subclassfeature11" : {
			name : "Illusory Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : levels.map(function (n) {
				return LLdesc("When I take the Attack action" + (n < 15 ? "" : " (or not)") + ", bonus action: an Illusory Duplicate within 30 ft makes one attack with my weapon (force damage)" + (n < 15 ? "" : "; I can swap places with it"));
			}),
			action : [["bonus action", "Illusory Duplicate attack"]]
		},
		"subclassfeature15" : {
			name : "Mirage Transposition",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Illusory Strikes doesn't need the Attack action and I can swap places with the duplicate; action: swap with a Cloak wearer within 30 ft"),
			action : [["action", "Swap with Cloak wearer"]]
		}
	}
});

AddSubClass("ranger(laserllama)", "winter wight", {
	regExpSearch : /^(?=.*winter)(?=.*wight).*$/i,
	subname : "Winter Wight",
	fullname : "Winter Wight",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3.knack" : LLConclaveKnack("Arctic Wanderer", "arctic adept", "I learn Arctic Adept (not counted; another Knack if I know it); my cold damage ignores resistance"),
		"subclassfeature3" : {
			name : "Frigid Strikes",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc("My Quarry damage can be cold; then its speed is halved and it can't Disengage until my next turn; when my Quarry dies, temp HP = Quarry Die + its CR")
		},
		"subclassfeature3.1" : LLConclaveSpells("Winter Wight", ["dissonant whispers", "ice knife", "aura of frost", "hold person", "spectral passage", "tiny hut", "ice storm", "wall of ice", "cone of cold", "hold monster"]),
		"subclassfeature7" : {
			name : "Blessing of Frost & Deep Freeze",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc([
				"Action: up to Wis mod creatures within 30 ft gain Quarry Die + ranger level temp HP (with them: resist cold, immune to frightened); then a 2nd-level+ slot",
				"Cold damage from my Ranger spells also applies Frigid Strikes"
			]),
			usages : 1,
			recovery : "short rest",
			action : [["action", "Blessing of Frost"]]
		},
		"subclassfeature11" : {
			name : "Frozen Revenge",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("Reaction when my Quarry damages me: Str save or stunned and speed 0 until the end of my next turn; one use regained on a short rest, then a slot"),
			usages : "Wis mod per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature15" : {
			name : "White Walker",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("Bonus action, 1 min: immune to cold, spectral passage (no concentration), 15-ft difficult terrain for hostiles (disadv. on Frozen Revenge saves); then a 4th-level+ slot"),
			usages : 1,
			recovery : "long rest",
			action : [["bonus action", ""]]
		}
	}
});

AddSubClass("ranger(laserllama)", "wrangler", {
	regExpSearch : /wrangler/i,
	subname : "Wrangler",
	fullname : "Wrangler",
	source : [["GMB:LL", 0]],
	features : {
		"subclassfeature3" : LLConclaveSpells("Wrangler", ["charm person", "command", "calm emotions", "conjure beast", "hypnotic pattern", "slow", "charm monster", "dominate creature", "dominate beast", "awaken", "hold monster"]),
		"subclassfeature3.1" : {
			name : "Beast Tamer",
			source : [["GMB:LL", 0]],
			minlevel : 3,
			description : LLdesc([
				"I gain proficiency in Athletics or Animal Handling; I mark beasts and monstrosities as Quarry without a use",
				"+Quarry Die to Animal Handling/Athletics to grapple, climb, tame, or subdue my Quarry; humanoid-only enchantments can target beasts and monstrosities"
			]),
			skillstxt : "Choose one from Athletics or Animal Handling"
		},
		"subclassfeature7" : {
			name : "Bring to Heel",
			source : [["GMB:LL", 0]],
			minlevel : 7,
			description : LLdesc("Reaction: a charmed beast/monstrosity subtracts my Quarry Die from its save to end it; charmed ones act on my turn and take an action I command (action)"),
			action : [["reaction", "Bring to Heel"]]
		},
		"subclassfeature11" : {
			name : "Monster Tamer",
			source : [["GMB:LL", 0]],
			minlevel : 11,
			description : LLdesc("My Wrangler features also affect celestials, dragons, fey, fiends, giants, plants, and oozes with Int up to my ranger level; bonus action command"),
			action : [["bonus action", "Command charmed creature"]]
		},
		"subclassfeature15" : {
			name : "Wrangler of Legends",
			source : [["GMB:LL", 0]],
			minlevel : 15,
			description : LLdesc("My enchantment concentration vs. non-humanoids can't be broken unless I wish; charmed creatures gain my Quarry benefits; reaction: +Quarry Die to their saves"),
			action : [["reaction", "Shout (+Quarry Die to save)"]]
		}
	}
});

// ===================================================================================
// SURVIVALIST FEATS (Alternate Ranger Expanded v4.4.4)
// ===================================================================================
FeatsList["alternate crossbow expert"] = {
	name : "Alternate Crossbow Expert",
	source : [["GMB:LL", 0]],
	descriptionFull : "You have trained extensively with crossbows and wield them more efficiently than most. You gain the benefits below when using a hand crossbow, light crossbow, or heavy crossbow:\n \u2022 Focused. Being within 5 feet of a Hostile creature does not impose disadvantage on your ranged weapon attacks.\n \u2022 Quick Load. You ignore the restrictions from the Loading property of all crossbows, and you can load ammunition into a crossbow even when you do not have a free hand.\n \u2022 Quick Shot. When you take the Attack action and make an attack with a one-handed melee weapon, you can use a bonus action on that turn to make one attack with a hand crossbow.",
	description : "With crossbows: no disadv. for hostiles within 5 ft; I ignore loading and can load without a free hand. When I take the Attack action with a one-handed melee weapon, I can attack with a hand crossbow as a bonus action.",
	action : [["bonus action", "Hand Crossbow attack"]],
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if ((/crossbow/i).test(v.baseWeaponName)) fields.Description = fields.Description.replace(/(,? ?loading|loading,? ?)/i, '');
			},
			"I ignore the loading property of crossbows."
		]
	}
};
FeatsList["alternate dual wielder"] = {
	name : "Alternate Dual Wielder",
	source : [["GMB:LL", 0]],
	descriptionFull : "You have trained extensively, learning to fight wielding two melee weapons at once. You gain the following benefits:\n \u2022 Defensive Stance. While wielding a one-handed melee weapon in each hand you gain a +1 bonus to Armor Class.\n \u2022 Enhanced Grip. You can engage in two-weapon fighting even if the one-handed melee weapons you are wielding are not Light. You can also draw or stow two weapons at once.\n \u2022 Twin Strikes. If you make an opportunity attack while you are two-weapon fighting, you can make an attack against the target with each of the melee weapons you are wielding.",
	description : "+1 AC while wielding a one-handed melee weapon in each hand. I can two-weapon fight with non-light one-handed melee weapons and draw/stow two at once. My opportunity attacks while two-weapon fighting can be made with each weapon.",
	extraAC : [{
		name : "Alternate Dual Wielder",
		mod : 1,
		text : "I gain a +1 bonus to AC while I'm wielding a one-handed melee weapon in each hand.",
		stopeval : function (v) { return v.usingShield; }
	}]
};
FeatsList["alternate sharpshooter"] = {
	name : "Alternate Sharpshooter",
	source : [["GMB:LL", 0]],
	descriptionFull : "You have trained extensively with ranged weapons to become a master marksman. You gain the benefits listed below:\n \u2022 Expert Marksman. You gain the Archery Fighting Style. If you already know this Fighting Style, you gain a +1 bonus to ranged weapon attacks, and your ranged weapon attacks can completely ignore Half and Three-Quarter's cover.\n \u2022 Sniper. Attacking a target within a ranged weapon's long range does not impose disadvantage on your roll.\n \u2022 Steady Aim. As a bonus action, you focus to give yourself advantage on the next ranged attack that you make on your current turn.",
	description : "I gain the Archery Fighting Style (if I have it: +1 to ranged weapon attacks and they ignore half and three-quarters cover). No disadv. at long range. Bonus action: adv. on my next ranged attack this turn.",
	action : [["bonus action", "Steady Aim"]],
	calcChanges : {
		atkCalc : [
			function (fields, v, output) {
				if (v.isRangedWeapon && !v.isNaturalWeapon && !v.isDC) output.extraHit += 1;
			},
			"My ranged weapon attacks get +1 to hit (Archery, or the extra bonus if I already had Archery)."
		]
	}
};
FeatsList["survivalist training"] = (function () {
	var oFeat = {
		name : "Survivalist Training",
		source : [["GMB:LL", 0]],
		descriptionFull : "You have been trained to survive, track, and explore in the wild, much like a Ranger. You gain the benefits listed below:\n \u2022 Ability Score Increase. Increase your Strength, Dexterity, Constitution, or Wisdom score by 1, up to a maximum of 20.\n \u2022 Survivalist Knack. You learn a Knack of your choice from those available to the Alternate Ranger. To learn this Knack, you must meet all prerequisites that it has.\n   If the Knack requires a Quarry Die, roll a d4 unless yours is higher. If the Knack forces a saving throw, the DC is equal to 8 + your Proficiency Bonus + your Wisdom modifier.",
		description : "I learn one Knack of the Alternate Ranger (prerequisites apply; d4 Quarry Die; DC 8 + PB + Wis mod); select it with the \"Choose Feat Feature\" button. [+1 Str, Dex, Con, or Wis]",
		scorestxt : "+1 Strength, Dexterity, Constitution, or Wisdom",
		choices : []
	};
	for (var s in LLKnacks) {
		var oK = LLKnacks[s];
		if (oK.knackLevel || / \([23]\)$/.test(oK.name)) continue;
		oFeat.choices.push(oK.name);
		var oNew = {};
		for (var att in oK) { if (!(/knackLevel|submenu|prereqeval/).test(att)) oNew[att] = oK[att]; }
		oNew.description = oFeat.description + "\n   " + oK.name + ": " + oK.description.replace(/^\n\s*/, "");
		oFeat[s] = oNew;
	}
	return oFeat;
})();
FeatsList["wild companion"] = {
	name : "Wild Companion",
	source : [["GMB:LL", 0]],
	prerequisite : "Wisdom 13 or higher",
	prereqeval : function (v) { return LLScore("Wis") >= 13; },
	descriptionFull : "You have learned to bond with and train Beasts of the wild to adventure by your side. Choose one Beast with a CR equal to (or lower than) your level divided by 4. This Beast becomes a Wild Companion. It is Friendly to you, uses its normal stat block, learns one language you speak, acts on your turn (Dodge unless commanded with a bonus action), and benefits from rests. A new Companion takes 8 hours to bond with.",
	description : "I bond with a beast of CR up to my level / 4 as my Wild Companion (Companion page). It acts on my turn and takes the Dodge action unless I command it with a bonus action. A new Companion takes 8 hours of tracking and bonding.",
	action : [["bonus action", "Command Wild Companion"]]
};

// Make the LaserLlama subclasses selectable in the Class/Subclass selection dialogs
if (typeof LLFixSubclassNames === "function") {
	LLFixSubclassNames();
	// and again after all add-on scripts have run (other scripts may add or change subclasses)
	if (typeof RunFunctionAtEnd === "function") RunFunctionAtEnd(function () { LLFixSubclassNames(); });
}
