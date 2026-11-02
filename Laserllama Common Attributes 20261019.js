/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	Do not import the old LaserLlama files in the same sheet.

	-INFORMATION-
	Content:	Common Attributes (sources, Compendium of Spells, Compendium of Exploits, Fighting Styles, Alternate Martial Multiclassing, Mystic Talents, Alternate Warlock Eldritch Invocations and Elder Arcana)
	Files:		LaserLlama - Common Attributes 20261019.js
	Sheet:		v13.2.3
	Code by:	"ll-updates" release
*/

var iFileName = "Laserllama Common Attributes 20261019.js";
RequiredSheetVersion("13.2.3");

// ======================================================================
// LaserLlama - Common Attributes 20261019.js
// ======================================================================
/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
	THIS FILE MUST BE IMPORTED BEFORE ANY OTHER FILE OF THE "ll-updates" FOLDER.

	-INFORMATION-
	Subject:	LaserLlama - Common Attributes (shared by all the LaserLlama classes of the "ll-updates" folder)

	Effect:		This script adds:
				- the "GMB:LL" source and the new spell schools used by Exploits
				- the shared engine for Exploits (Exploit Dice, prerequisites, Martial Multiclassing, spell sheets)
				- all Exploits of the Compendium of Exploits v1.0 (as "spells" with isExploit: true)
				- all Fighting Styles of the Alternate Fighter v3.5.1 and Alternate Martial Multiclassing
				- the optional Fighting Style in place of a second Extra Attack (Alternate Martial Multiclassing)
				- the Alternate Fighting Initiate feat
				- the spells of the Compendium of Spells v0.5
				- the Mercenary companions of the Recruit Mercenary Exploit

				Content published by Laserllama on GM Binder under the Fan Content policy:
				Laserllama: https://www.gmbinder.com/profile/laserllama
				Compendium of Exploits (v1.0)
				Alternate Martial Multiclassing
				Compendium of Spells (v0.5)

	Sheet:		v13.2.3 (MPMB's Character Record Sheet)

	Code by:	Original scripts by CalypsoMoonlace and Valentino dell'Eco ("Classes and Feats", "Common attributes")
				Reorganized and updated to the latest LaserLlama documents in the "ll-updates" release (2026/10/19)
*/


// Marker checked by the other LaserLlama files: they need this file to be imported first
LLCommonAttributesVersion = "20261019";

// ===================================================================================
// SOURCE
// ===================================================================================
SourceList["GMB:LL"] = {
	name : "LaserLlama (GM Binder)",
	abbreviation : "GMB:LL",
	abbreviationSpellsheet : "LL",
	group : "GM Binder",
	url : "https://www.gmbinder.com/profile/laserllama",
	date : "2026/10/19"
};

// New spell schools used by Exploits (key is how it appears on the spell sheet)
spellSchoolList["Combat"] = "combat";
spellSchoolList["Skill"] = "skill";
spellSchoolList["Speech"] = "speech";
spellSchoolList["Craft"] = "craft";
spellSchoolList["Order"] = "order";

// ===================================================================================
// SHARED ENGINE
// NOTE: everything that has to be reachable from the other files of this folder is
// created WITHOUT the "var" keyword, so that it becomes a global of the sheet.
// ===================================================================================
LaserLlamaCommonVersion = "2026.10.19";

// ----- small utilities -----
LLDegreeTxt = function (n) {
	return n == 1 ? "1st" : n == 2 ? "2nd" : n == 3 ? "3rd" : n + "th";
};
LLhasTool = function (v, rx) {
	var arr = [].concat(v && v.toolProfs ? v.toolProfs : [], v && v.languageProfs ? v.languageProfs : []);
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] && rx.test(arr[i])) return true;
	}
	return false;
};
LLClassLevel = function (sClass) {
	return classes.known[sClass] ? classes.known[sClass].level : 0;
};
LLHasSubclass = function (sClass, sSubclass) {
	return classes.known[sClass] && classes.known[sClass].subclass === sSubclass ? true : false;
};
// double every number in a range string, e.g. "20/60 ft" -> "40/120 ft"
doubleRange = function (rangeString) {
	if (typeof rangeString !== "string") return rangeString;
	return rangeString.replace(/\d+/g, function (n) { return (Number(n) * 2).toString(); });
};
returnShieldBonus = function () {
	return What("AC Shield Bonus") ? What("AC Shield Bonus") : 0;
};
// Ability Score of the character (numeric)
LLScore = function (sAbi) {
	return Number(What(sAbi)) || 0;
};

// ===================================================================================
// EXPLOITS ENGINE
// ===================================================================================
/*	LLExploitTables registers every class (or subclass) that grants Exploit Dice.
	Key: any unique string. Object:
		cls      : ClassList key
		sub      : (optional) ClassSubList key, the dice only count with this subclass
		factor   : 1, 1/2 or 1/3 (Alternate Martial Multiclassing: Exploit Multiclassing Levels)
		dice     : array of 20 numbers, number of Exploit Dice at each class level
		alt      : (optional) { sub : subclass key, dice : array, die : array } replacing dice/die for that subclass
		die      : array of 20 strings, size of the Exploit Die at each class level
		maxDegree: (optional) array of 20 numbers, highest degree of Exploit available at each level
*/
if (typeof LLExploitTables === "undefined" || !LLExploitTables) LLExploitTables = {};
// Exploit Multiclassing table (total level -> [dice, die])
LLExploitMulticlass = [[0, ""], [0, ""], [2, "d4"], [2, "d4"], [3, "d6"], [3, "d6"], [3, "d6"], [3, "d6"], [3, "d6"], [3, "d6"], [4, "d8"], [4, "d8"], [4, "d8"], [4, "d8"], [4, "d8"], [4, "d8"], [5, "d10"], [5, "d10"], [5, "d10"], [5, "d10"]];
// FeatsList keys of the feats that grant Exploit Dice
if (typeof LLExploitFeats === "undefined" || !LLExploitFeats) LLExploitFeats = [];
// Functions that return extra Exploit Dice (e.g. the Superior Technique Fighting Style)
if (typeof LLExploitBonusDice === "undefined" || !LLExploitBonusDice) LLExploitBonusDice = {};

LLDieOrder = ["", "d4", "d6", "d8", "d10", "d12"];
LLExploitDiceCalc = function (sSkip) {
	var res = { usages : 0, die : "", sources : 0, total : 0, levels : {} };
	if (!classes || !classes.known) return res;
	var best = 0, bestDie = "";
	for (var sKey in LLExploitTables) {
		if (sKey === sSkip) continue;
		var oT = LLExploitTables[sKey];
		var oCl = classes.known[oT.cls];
		if (!oCl || oT.cls === sSkip) continue;
		if (oT.sub && oCl.subclass !== oT.sub) continue;
		// a subclass can replace the dice of its class' table: alt = { sub : "class-subclass", dice : [...], die : [...] }
		if (oT.alt && oCl.subclass === oT.alt.sub) oT = { cls : oT.cls, factor : oT.factor, dice : oT.alt.dice ? oT.alt.dice : oT.dice, die : oT.alt.die ? oT.alt.die : oT.die };
		var lvl = Math.min(20, Math.max(1, oCl.level));
		var nDice = oT.dice[lvl - 1] ? Number(oT.dice[lvl - 1]) : 0;
		res.total += Math.floor(oCl.level * (oT.factor ? oT.factor : 1));
		res.levels[sKey] = oCl.level;
		if (!nDice) continue;
		res.sources += 1;
		if (nDice > best) best = nDice;
		if (LLDieOrder.indexOf(oT.die[lvl - 1]) > LLDieOrder.indexOf(bestDie)) bestDie = oT.die[lvl - 1];
	}
	if (res.sources > 1) {
		// Martial Multiclassing: use the table, but never decrease the number nor the size of the dice
		var aMC = LLExploitMulticlass[Math.min(20, res.total) - 1] || [0, ""];
		res.usages = Math.max(best, aMC[0]);
		res.die = LLDieOrder.indexOf(aMC[1]) > LLDieOrder.indexOf(bestDie) ? aMC[1] : bestDie;
	} else {
		res.usages = best;
		res.die = bestDie;
	}
	// Feats that grant Exploit Dice (e.g. Savage Training): two d4 if no other dice, otherwise one extra die each
	var nFeats = 0;
	if (CurrentFeats && CurrentFeats.known) {
		for (var f = 0; f < LLExploitFeats.length; f++) {
			if (LLExploitFeats[f] !== sSkip && CurrentFeats.known.indexOf(LLExploitFeats[f]) !== -1) nFeats += 1;
		}
	}
	if (nFeats) {
		if (!res.usages) {
			res.usages = 2 + (nFeats - 1);
			res.die = "d4";
		} else {
			res.usages += nFeats;
		}
	}
	if (res.usages) {
		for (var sBonus in LLExploitBonusDice) {
			try { res.usages += Number(LLExploitBonusDice[sBonus](sSkip)) || 0; } catch (e) {}
		}
	}
	return res;
};
// Kept for backwards compatibility with the older LaserLlama scripts
calcExploitDice = function (sSkip) {
	var r = LLExploitDiceCalc(sSkip);
	return { usages : r.usages ? r.usages : "", additional : r.die };
};
// Put the Exploit Dice in the Limited Features (call from eval, changeeval, and removeeval)
LLUpdateExploitDice = function (sSkip) {
	var r = LLExploitDiceCalc(sSkip);
	if (r.usages) {
		AddFeature("Exploit Dice", r.usages, " (" + r.die + ")", "short rest", "LaserLlama Exploit Dice", "replace");
	} else {
		RemoveFeature("Exploit Dice");
	}
};
// The level used for Exploit prerequisites ("combined level in Exploit classes")
LLExploitLevel = function (sClass) {
	var r = LLExploitDiceCalc();
	var own = sClass && classes.known[sClass] ? classes.known[sClass].level : 0;
	return Math.max(own, r.total);
};
// Highest degree of Exploits by level (Compendium of Exploits: 2nd at 5, 3rd at 9, 4th at 13, 5th at 17)
LLDegreeByLevel = function (lvl) {
	return lvl >= 17 ? 5 : lvl >= 13 ? 4 : lvl >= 9 ? 3 : lvl >= 5 ? 2 : 1;
};
LLExploitMaxDegree = function (sClass, sTableKey) {
	var oT = sTableKey && LLExploitTables[sTableKey] ? LLExploitTables[sTableKey] : false;
	var lvl = LLClassLevel(sClass);
	if (oT && oT.maxDegree) return oT.maxDegree[Math.min(20, Math.max(1, lvl)) - 1] || 0;
	// Alternate Martial Multiclassing: the Exploits each class can learn depend on that class's own level
	if (sClass && classes.known[sClass]) return LLDegreeByLevel(lvl);
	return LLDegreeByLevel(LLExploitLevel(sClass));
};
// prereqeval for an Exploit learned through a class (or subclass) feature
LLExploitPrereq = function (sSpell, sClass, sTableKey) {
	return function (v) {
		var oSp = SpellsList[sSpell];
		if (!oSp) return false;
		if (!classes.known[sClass]) return true; // shown through the menu of a class not yet known
		if (oSp.level > LLExploitMaxDegree(sClass, sTableKey)) return false;
		return oSp.prereqeval ? oSp.prereqeval(v) : true;
	};
};
// Backwards compatible names
ExploitPrereqFactory = function (sSpell, sClass) { return LLExploitPrereq(sSpell, sClass); };

// Create the spell sheet entry for an Exploit list ("spellcasting" object)
LLExploitSheet = function (sKey, sName, nAbility) {
	// nAbility can be a function (e.g. the Warlord's Leadership ability)
	var bDynamic = typeof nAbility === "function";
	var nAbi = bDynamic ? nAbility() : nAbility;
	if (!CurrentSpells[sKey]) {
		CurrentSpells[sKey] = {
			name : sName,
			shortname : sName,
			ability : nAbi ? nAbi : 1,
			bonus : {},
			typeSp : "known",
			refType : "feat"
		};
	} else if (bDynamic && nAbi && CurrentSpells[sKey].ability !== nAbi) {
		CurrentSpells[sKey].ability = nAbi;
	}
};
// The Warlord's Leadership ability (Intelligence until a Leadership Style is chosen)
LLWarlordAbility = function () {
	return CurrentVars && CurrentVars.LLWrlAbi ? CurrentVars.LLWrlAbi : 4;
};
CreateMartialSpellsheet = function () { LLExploitSheet("martial exploits", "Martial Exploits", 1); };
CreateSavageSpellsheet = function () { LLExploitSheet("savage exploits", "Savage Exploits", 1); };
CreateDeviousSpellsheet = function () { LLExploitSheet("devious exploits", "Devious Exploits", 2); };
CreateTacticalSpellsheet = function () { LLExploitSheet("tactical exploits", "Tactical Exploits", LLWarlordAbility); };

// All the Exploits (SpellsList keys) available to a class, sorted by degree and name
LLExploitList = function (sClass, nMaxDegree) {
	var aList = [];
	for (var sSp in SpellsList) {
		var oSp = SpellsList[sSp];
		if (!oSp.isExploit || !oSp.classes || oSp.classes.indexOf(sClass) === -1) continue;
		if (nMaxDegree && oSp.level > nMaxDegree) continue;
		aList.push(sSp);
	}
	aList.sort(function (a, b) {
		return SpellsList[a].level - SpellsList[b].level || (a > b ? 1 : a < b ? -1 : 0);
	});
	return aList;
};

// The choice object of a single Exploit inside a class feature
LLExploitChoice = function (sSpell, oOpt) {
	var oSp = SpellsList[sSpell];
	return {
		name : oSp.name,
		source : oSp.source,
		submenu : oSp.submenu,
		description : "",
		addMod : oSp.addMod,
		prereqeval : oOpt.prereq === false ? undefined : LLExploitPrereq(sSpell, oOpt.cls, oOpt.tableKey),
		toNotesPage : [{
			name : oSp.name + " Exploit [" + LLDegreeTxt(oSp.level) + " degree]",
			note : desc(oSp.descriptionFull.split(/\n +/)),
			amendTo : oOpt.notesTitle
		}],
		eval : function () { LLExploitSheet(oOpt.sheet, oOpt.sheetName, oOpt.ability); },
		spellcastingBonusElsewhere : {
			addTo : oOpt.sheet,
			spellcastingBonus : {
				name : oOpt.bonusName ? oOpt.bonusName : oOpt.sheetName,
				spellcastingAbility : typeof oOpt.ability === "function" ? undefined : oOpt.ability,
				spells : [sSpell],
				selection : [sSpell]
			}
		}
	};
};

/*	Build the main "<X> Exploits" class feature with every Exploit of the class as an extrachoice.
	oOpt = {
		name, minlevel, cls, sheet, sheetName, ability, extraTimes,
		tableKey (optional, uses its maxDegree), list (optional, ClassList key whose Exploits to use),
		description (optional), maxDegree (optional, only offer Exploits up to this degree)
	}
*/
LLExploitFeature = function (oOpt) {
	var sNotes = oOpt.notesTitle ? oOpt.notesTitle : oOpt.name;
	oOpt.notesTitle = sNotes;
	var oFea = {
		name : oOpt.name,
		source : oOpt.source ? oOpt.source : [["GMB:LL", 0]],
		minlevel : oOpt.minlevel,
		description : oOpt.description ? oOpt.description : desc([
			"I learn Exploits that are fueled by my Exploit Dice; I can use one Exploit per attack, check, or save",
			"Use the \"Choose Feature\" button above to select the Exploits I know",
			"Whenever I gain a level in this class, I can replace one Exploit I know with another"
		]),
		toNotesPage : [{
			name : sNotes,
			note : desc(["Below are the Exploits I know. Exploits of 3rd degree or higher can only be used once per short rest (3rd-4th) or long rest (5th) unless stated otherwise."])
		}],
		extraname : oOpt.extraname ? oOpt.extraname : oOpt.sheetName,
		extrachoices : [],
		extraTimes : oOpt.extraTimes
	};
	var aList = LLExploitList(oOpt.list ? oOpt.list : oOpt.cls, oOpt.maxDegree);
	for (var i = 0; i < aList.length; i++) {
		var sName = SpellsList[aList[i]].name;
		oFea.extrachoices.push(sName);
		oFea[sName.toLowerCase()] = LLExploitChoice(aList[i], oOpt);
	}
	return oFea;
};

// Old/alternative Exploit names used in some class documents -> Compendium of Exploits v1.0 names
LLExploitAlias = {
	"thunderous blow" : "mighty blow",
	"greater hurl" : "mighty hurl",
	"thunderous shot" : "mighty shot",
	"imposing presnece" : "imposing presence",
	"oil bomb" : "craft oil bomb",
	"smoke bomb" : "craft smoke bomb",
	"flash bomb" : "craft flash bomb",
	"alchemical oil" : "craft alchemical oil",
	"craft minor poison" : "craft simple poison",
	"craft greater poison" : "craft expert poison",
	"primal sense" : "primal senses",
	"trickster blessing" : "trickster's blessing",
	"inconcievable dodge" : "inconceivable dodge",
	"rejuvinating order" : "rejuvenating order",
	"ringing critial" : "ringing critical",
	"trick shot volley" : "trick shot",
	"aerial manuever" : "aerial maneuver"
};
LLExploitKey = function (sName) {
	var s = sName.toLowerCase().replace(/^\s+|\s+$/g, "");
	if (SpellsList[s] && SpellsList[s].isExploit) return s;
	if (LLExploitAlias[s]) return LLExploitAlias[s];
	return s;
};
/*	Subclass Exploits that are always known and don't count against Exploits Known
	aList = [[SpellsList key, level gained], ...]
*/
LLSubclassExploits = function (sSubName, aList, oOpt) {
	var sName = oOpt && oOpt.name ? oOpt.name : sSubName + " Exploits";
	var oFea = {
		name : sName,
		source : oOpt && oOpt.source ? oOpt.source : [["GMB:LL", 0]],
		minlevel : oOpt && oOpt.minlevel ? oOpt.minlevel : aList[0][1],
		description : desc(["I always know these Exploits; they don't count against my Exploits Known and can't be replaced"]),
		toNotesPage : [{
			name : sName,
			note : desc(["Below are the " + sName + " I always know."])
		}],
		autoSelectExtrachoices : []
	};
	var opt = {
		cls : oOpt.cls,
		sheet : oOpt.sheet,
		sheetName : oOpt.sheetName,
		ability : oOpt.ability,
		notesTitle : sName,
		bonusName : sName,
		prereq : false
	};
	for (var i = 0; i < aList.length; i++) {
		var sSp = LLExploitKey(aList[i][0]);
		if (!SpellsList[sSp]) continue;
		oFea.autoSelectExtrachoices.push({ extrachoice : sSp, minlevel : aList[i][1] });
		oFea[sSp] = LLExploitChoice(sSp, opt);
	}
	return oFea;
};

/*	Shortcut for the usual subclass Exploits table: [[1st-level, list], [2nd-level, list], ...]
	e.g. LLPathExploits("Ancestral", [[3, ["brace up", "heroic fortitude"]], [5, [...]], [9, [...]]], oOpt)
*/
LLPathExploits = function (sName, aTable, oOpt) {
	var aList = [];
	for (var i = 0; i < aTable.length; i++) {
		for (var j = 0; j < aTable[i][1].length; j++) aList.push([aTable[i][1][j], aTable[i][0]]);
	}
	return LLSubclassExploits(sName, aList, oOpt);
};
// Names used in LaserLlama documents -> SpellsList keys
LLSpellAlias = {
	"hideous laughter" : "tasha's hideous laughter",
	"resilient sphere" : "otiluke's resilient sphere",
	"tiny hut" : "leomund's tiny hut",
	"irresistible dance" : "otto's irresistible dance",
	"black tentacles" : "evard's black tentacles",
	"secret chest" : "leomund's secret chest",
	"faithful hound" : "mordenkainen's faithful hound",
	"private sanctum" : "mordenkainen's private sanctum",
	"magnificent mansion" : "mordenkainen's magnificent mansion",
	"arcane sword" : "mordenkainen's sword",
	"telepathic bond" : "rary's telepathic bond",
	"floating disk" : "tenser's floating disk",
	"acid arrow" : "melf's acid arrow",
	"freezing sphere" : "otiluke's freezing sphere",
	"instant summons" : "drawmij's instant summons",
	"magic aura" : "nystul's magic aura",
	"arcane hand" : "bigby's hand",
	"bigby's hand" : "bigby's hand",
	"protection from good & evil" : "protection from evil and good",
	"protection from evil & good" : "protection from evil and good",
	"detect evil & good" : "detect evil and good",
	"dispel evil & good" : "dispel evil and good",
	"lighting arrow" : "lightning arrow",
	"lighting lure" : "lightning lure",
	"control flames" : "control flame",
	"lock/unlock" : "lock unlock",
	"create homunclus" : "create homunculus",
	"irresistable dance" : "otto's irresistible dance",
	"featherfall" : "feather fall",
	"enlarge" : "enlarge/reduce",
	"summon elemental (air)" : "summon elemental",
	"summon elemental (earth)" : "summon elemental",
	"summon elemental (water)" : "summon elemental",
	"summon elemental (fire)" : "summon elemental",
	"summon construct (metal)" : "summon construct",
	"guardian of nature (tree)" : "guardian of nature",
	"lighting bolt" : "lightning bolt",
	"call lighting" : "call lightning",
	"firebolt" : "fire bolt",
	"snowball swarm" : "snilloc's snowball swarm",
	"earthen grasp" : "maximilian's earthen grasp",
	"minute meteors" : "melf's minute meteors",
	"tempestuos blade" : "tempestuous blade",
	"detect poison & disease" : "detect poison and disease",
	"create food & water" : "create food and water",
	"aganazzar's scorcher" : "aganazzar's scorcher",
	"arcane scorcher" : "aganazzar's scorcher",
	"dust devil" : "dust devil",
	"control winds" : "control winds",
	"swift quiver" : "swift quiver",
	"vitriolic sphere" : "vitriolic sphere",
	"watery sphere" : "watery sphere",
	"storm sphere" : "storm sphere",
	"mind whip" : "tasha's mind whip",
	"caustic brew" : "tasha's caustic brew",
	"skill empowerment" : "skill empowerment",
	"summon shadow" : "summon shadowspawn",
	"maddening dark" : "maddening darkness",
	"horrid wilting" : "abi-dalzim's horrid wilting",
	"purify food & drink" : "purify food and drink"
};
LLSpellKey = function (sName) {
	var s = sName.toLowerCase().replace(/^\s+|\s+$/g, "");
	if (SpellsList[s]) return s;
	if (LLSpellAlias[s]) return LLSpellAlias[s];
	var s2 = s.replace(/:/g, "");
	return SpellsList[s2] ? s2 : s;
};
// Return only the spells of the array that exist in the sheet (avoids errors when a source isn't loaded)
LLSpellList = function (aSpells) {
	var aRet = [];
	for (var i = 0; i < aSpells.length; i++) {
		var sSp = LLSpellKey(aSpells[i]);
		if (SpellsList[sSp] && aRet.indexOf(sSp) === -1) aRet.push(sSp);
	}
	return aRet;
};
// Add a class to the "classes" attribute of the given spells (if they exist)
LLAddSpellsToClass = function (sClass, aSpells) {
	for (var i = 0; i < aSpells.length; i++) {
		var oSp = SpellsList[LLSpellKey(aSpells[i])];
		if (!oSp) continue;
		if (!oSp.classes) oSp.classes = [];
		if (oSp.classes.indexOf(sClass) === -1) oSp.classes.push(sClass);
	}
};

// The "Exploit Dice" class feature (uses the LLExploitTables entry sTableKey)
LLExploitDiceFeature = function (sTableKey, nMinLevel, sClassName, oExtra) {
	var oT = LLExploitTables[sTableKey];
	var oFea = {
		name : "Exploit Dice",
		source : [["GMB:LL", 0]],
		minlevel : nMinLevel,
		description : levels.map(function (n) {
			var i = Math.min(20, n) - 1;
			if (!oT.dice[i]) return "";
			return desc([
				"I have " + oT.dice[i] + " Exploit Dice (" + oT.die[i] + "s); I regain all of them when I finish a short or long rest",
				"Exploit save DC = 8 + Prof Bonus + Str or Dex mod (my choice); multiclassing: see the Limited Features"
			]);
		}),
		eval : function () { LLUpdateExploitDice(); },
		changeeval : function () { LLUpdateExploitDice(); },
		removeeval : function () { LLUpdateExploitDice(sTableKey); }
	};
	if (oExtra) for (var a in oExtra) oFea[a] = oExtra[a];
	return oFea;
};

// Old helper names used by previous LaserLlama scripts (kept so that older files keep working)
GetFighterSubclassExploits = function (sName, aList) { return LLSubclassExploits(sName, [[aList[0], 3], [aList[1], 3], [aList[2], 5], [aList[3], 5], [aList[4], 9]], { cls : "fighter(laserllama)", sheet : "martial exploits", sheetName : "Martial Exploits", ability : 1 }); };
GetBarbarianSubclassExploits = function (sName, aList) { return LLSubclassExploits(sName, [[aList[0], 3], [aList[1], 3], [aList[2], 5], [aList[3], 5], [aList[4], 9]], { cls : "barbarian(laserllama)", sheet : "savage exploits", sheetName : "Savage Exploits", ability : 1 }); };
GetRogueSubclassExploits = function (sName, aList) { return LLSubclassExploits(sName, [[aList[0], 3], [aList[1], 3], [aList[2], 5], [aList[3], 5], [aList[4], 9]], { cls : "rogue(laserllama)", sheet : "devious exploits", sheetName : "Devious Exploits", ability : 2 }); };
GetWarlordSubclassExploits = function (sName, aList) { return LLSubclassExploits(sName, [[aList[0], 3], [aList[1], 3], [aList[2], 5], [aList[3], 5], [aList[4], 9]], { cls : "warlord(laserllama)", sheet : "tactical exploits", sheetName : "Tactical Exploits", ability : LLWarlordAbility }); };

// ===================================================================================
// FIGHTING STYLES ENGINE
// ===================================================================================
// All Fighting Style names the character has selected anywhere (lowercase)
LLKnownFightingStyles = function () {
	var aFS = [];
	var chc = CurrentFeatureChoices && CurrentFeatureChoices.classes ? CurrentFeatureChoices.classes : {};
	for (var sCl in chc) {
		for (var sFea in chc[sCl]) {
			var o = chc[sCl][sFea];
			if (!o || typeof o !== "object") continue;
			var bFS = /fighting style|extra attack/i.test(sFea);
			if (!bFS && CurrentClasses[sCl] && CurrentClasses[sCl].features[sFea]) bFS = /fighting style/i.test(CurrentClasses[sCl].features[sFea].name);
			if (!bFS) continue;
			if (o.choice) aFS.push(o.choice.toLowerCase());
			if (o.extrachoices) aFS = aFS.concat(o.extrachoices.map(function (n) { return n.toLowerCase(); }));
		}
	}
	if (CurrentFeats && CurrentFeats.known) {
		for (var i = 0; i < CurrentFeats.known.length; i++) {
			if (/fighting initiate/i.test(CurrentFeats.known[i]) && CurrentFeats.choices[i]) aFS.push(CurrentFeats.choices[i].toLowerCase());
		}
	}
	return aFS;
};
LLHasFightingStyle = function (sMenuName) {
	return LLKnownFightingStyles().indexOf(sMenuName.toLowerCase()) !== -1;
};
// backwards compatible name
hasExpertAccess = function (fs) { return LLHasFightingStyle(fs); };
// Expert Fighting Styles: 6th-level Fighter (or Alternate Fighting Initiate at character level 6) + the base style
LLExpertPrereq = function (sBaseMenuName) {
	return function (v) {
		var lvl = classes.known["fighter(laserllama)"] ? classes.known["fighter(laserllama)"].level : v && v.characterLevel ? v.characterLevel : 0;
		return lvl >= 6 && LLHasFightingStyle(sBaseMenuName);
	};
};

// extraAC entries to use another ability score (sAbi: "Con", "Int", ...) instead of Dex for AC
// (no armor or light armor: full; medium armor: max +2; heavy armor: nothing). Uses 2 AC misc fields.
LLAbiForDexAC = function (sAbi, sText, bArmorOnly, sName) {
	var sAbiFull = AbilityScores.names[AbilityScores.abbreviations.indexOf(sAbi)] || sAbi;
	var sTxt = sText ? sText : "I can use my " + sAbiFull + " modifier instead of my Dexterity modifier for my AC.";
	var aRet = [{
		mod : "max(" + sAbi + "-Dex|0)",
		text : sTxt,
		stopeval : new Function("v", "return v.heavyArmor || " + (bArmorOnly ? "!v.wearingArmor || " : "") + "(v.mediumArmor && Number(What('" + sAbi + " Mod')) > 2);")
	}, {
		mod : "max(2-Dex|0)",
		text : sTxt,
		stopeval : new Function("v", "return !v.mediumArmor || Number(What('" + sAbi + " Mod')) <= 2;")
	}];
	if (!sName) sName = sAbiFull + " to AC";
	aRet[0].name = sName;
	aRet[1].name = sName;
	return aRet;
};

// Same as MPMB's desc(), but empty entries (level-dependent lines) are skipped
LLdesc = function (arr, joinStr) {
	if (isArray(arr)) arr = arr.filter(function (s) { return s !== "" && s !== undefined && s !== null; });
	return desc(arr, joinStr);
};

// ===================================================================================
// FIGHTING STYLES (Alternate Fighter v3.5.1 + Expanded, Alternate Martial Multiclassing)
// Each entry: menu = name shown in the "Choose Feature" menu
// ===================================================================================
LLCantripStyle = function (sMenu, sClass, sClassName, nAbi, sReq, fReq) {
	return {
		menu : sMenu,
		name : sMenu + " Fighting Style",
		prerequisite : sReq,
		prereqeval : fReq,
		description : desc([
			"I learn two " + sClassName + " cantrips; they don't count against my cantrips known",
			"They use " + ["", "Str", "Dex", "Con", "Int", "Wis", "Cha"][nAbi] + " as spellcasting ability; I can swap one of them whenever I gain a level"
		]),
		spellcastingBonus : [{
			name : sMenu + " Fighting Style",
			spellcastingAbility : nAbi,
			"class" : sClass,
			level : [0, 0],
			firstCol : "atwill",
			times : 2
		}]
	};
};
LLNoOffHand = function () {
	for (var i = 1; i <= FieldNumbers.actions; i++) {
		if (/off.hand.attack/i.test(What("Bonus Action " + i))) return false;
	}
	return true;
};

FightingStylesLL = {
	"arcane warrior" : LLCantripStyle("Arcane Warrior", "wizard", "wizard", 4, "Proficiency in Arcana", function (v) { return v.skillProfs.indexOf("Arcana") !== -1; }),
	"bardic_warrior" : LLCantripStyle("Bardic Warrior", "bard", "bard", 6, "Proficiency in Performance", function (v) { return v.skillProfs.indexOf("Performance") !== -1; }),
	"blessed_warrior" : LLCantripStyle("Blessed Warrior", "cleric", "cleric", 5, "Proficiency in Religion", function (v) { return v.skillProfs.indexOf("Religion") !== -1; }),
	"druidic_warrior" : LLCantripStyle("Druidic Warrior", "druid", "druid", 5, "Proficiency in Nature", function (v) { return v.skillProfs.indexOf("Nature") !== -1; }),
	"eldritch_warrior" : LLCantripStyle("Eldritch Warrior", "warlock", "warlock", 6, "Proficiency in Arcana", function (v) { return v.skillProfs.indexOf("Arcana") !== -1; }),
	"psionic_warrior" : LLCantripStyle("Psionic Warrior", "psion(laserllama)", "psion", 4, "Intelligence 13 or higher", function (v) { return LLScore("Int") >= 13; }),
	"shamanistic_warrior" : LLCantripStyle("Shamanistic Warrior", "shaman(laserllama)", "shaman", 5, "Wisdom 13 or higher", function (v) { return LLScore("Wis") >= 13; }),
	"sorcerous_warrior" : LLCantripStyle("Sorcerous Warrior", "sorcerer", "sorcerer", 6, "Charisma 13 or higher", function (v) { return LLScore("Cha") >= 13; }),

	archery : {
		menu : "Archery",
		name : "Archery Fighting Style",
		prerequisite : "Dexterity 13 or higher",
		prereqeval : function (v) { return LLScore("Dex") >= 13; },
		description : desc("+1 to hit with ranged weapons; they ignore half cover and treat three-quarters cover as half cover"),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.isRangedWeapon && !v.isNaturalWeapon && !v.isDC) output.extraHit += 1;
				},
				"My ranged weapons get a +1 bonus on the To Hit and ignore half cover (three-quarters cover counts as half)."
			]
		}
	},
	archery_expert : {
		menu : "Archery Expert",
		name : "Archery Expert Fighting Style",
		prerequisite : "6th-level Fighter, Archery",
		prereqeval : LLExpertPrereq("Archery"),
		description : desc("Additional +1 to hit with ranged weapons; long range doesn't impose disadvantage on my ranged attacks"),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.isRangedWeapon && !v.isNaturalWeapon && !v.isDC) output.extraHit += 1;
				},
				"My ranged weapons get an additional +1 bonus on the To Hit."
			]
		}
	},
	balanced : {
		menu : "Balanced Fighting",
		name : "Balanced Fighting Style",
		description : desc("+2 damage with a melee weapon wielded in one hand while wielding no other weapons (a shield is fine)"),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && !v.isNaturalWeapon && !v.isDC && !(/(\btwo.handed|\b2h\b)/i).test(fields.Description) && LLNoOffHand()) output.extraDmg += 2;
				},
				"When I'm wielding a melee weapon in one hand and no other weapons, I do +2 damage with it. This is not applied if the bonus action 'Off-hand Attack' exists."
			]
		}
	},
	balanced_expert : {
		menu : "Balanced Expert",
		name : "Balanced Expert Fighting Style",
		prerequisite : "6th-level Fighter, Balanced Fighting",
		prereqeval : LLExpertPrereq("Balanced Fighting"),
		description : desc("With a versatile melee weapon and a shield I use its two-handed damage die; I can Shove with the shield as a bonus action"),
		action : [["bonus action", "Shield Shove (Balanced Expert)"]]
	},
	brawling : {
		menu : "Brawling",
		name : "Brawling Fighting Style",
		prerequisite : "Proficiency in Athletics",
		prereqeval : function (v) { return v.skillProfs.indexOf("Athletics") !== -1; },
		description : desc("My unarmed strikes deal 1d6 + Str mod; with both hands free, I can make one unarmed strike, Shove, or Grapple as a bonus action"),
		action : [["bonus action", "Unarmed Strike/Shove/Grapple (Brawling)"]],
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (v.baseWeaponName == "unarmed strike" && (fields.Damage_Die == 1 || fields.Damage_Die == "1d4")) fields.Damage_Die = "1d6";
				},
				"My unarmed strikes deal 1d6 damage.",
				1
			]
		}
	},
	brawling_expert : {
		menu : "Brawling Expert",
		name : "Brawling Expert Fighting Style",
		prerequisite : "6th-level Fighter, Brawling",
		prereqeval : LLExpertPrereq("Brawling"),
		description : desc([
			"+1 damage with unarmed strikes; I can drag grappled creatures at my full speed",
			"In place of an attack, I can make a grapple check vs. a creature I grapple; on success it is also restrained"
		]),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.baseWeaponName == "unarmed strike") output.extraDmg += 1;
				},
				"My unarmed strikes get a +1 bonus to damage."
			]
		}
	},
	classical : {
		menu : "Classical Swordplay",
		name : "Classical Swordplay Fighting Style",
		prerequisite : "Dexterity 13 or higher",
		prereqeval : function (v) { return LLScore("Dex") >= 13; },
		description : desc("Wielding a single finesse weapon, no shield, and no heavy armor: +2 to hit with it and +1 AC"),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/\bfinesse\b/i).test(fields.Description) && LLNoOffHand()) output.extraHit += 2;
				},
				"When I'm wielding a single finesse weapon and no shield, I get +2 to hit with it. This is not applied if the bonus action 'Off-hand Attack' exists."
			]
		},
		extraAC : {
			name : "Classical Swordplay Fighting Style",
			mod : 1,
			text : "I gain a +1 bonus to AC while wielding a single finesse weapon, no shield, and not wearing heavy armor.",
			stopeval : function (v) { return v.heavyArmor || v.usingShield; }
		}
	},
	classical_expert : {
		menu : "Classical Swordplay Expert",
		name : "Classical Swordplay Expert Fighting Style",
		prerequisite : "6th-level Fighter, Classical Swordplay",
		prereqeval : LLExpertPrereq("Classical Swordplay"),
		description : desc("When hit while using Classical Swordplay, I can use my reaction to add my Dex mod to my AC against that attack"),
		action : [["reaction", "Classical Swordplay Expert"]]
	},
	defensive : {
		menu : "Defensive Fighting",
		name : "Defensive Fighting Style",
		description : desc("+1 AC while I'm wearing medium armor, heavy armor, or a shield"),
		extraAC : {
			name : "Defensive Fighting Style",
			mod : 1,
			text : "I gain a +1 bonus to AC while wearing medium armor, heavy armor, or a shield.",
			stopeval : function (v) { return !v.mediumArmor && !v.heavyArmor && !v.usingShield; }
		}
	},
	defensive_expert : {
		menu : "Defensive Expert",
		name : "Defensive Expert Fighting Style",
		prerequisite : "6th-level Fighter, Defensive Fighting",
		prereqeval : LLExpertPrereq("Defensive Fighting"),
		description : desc("In heavy armor, I reduce nonmagical bludgeoning/piercing/slashing damage by my Con mod (min 1); magical too if my armor is magical"),
		savetxt : { text : ["In heavy armor: reduce B/P/S dmg by Con mod"] }
	},
	dual_wielding : {
		menu : "Dual Wielding",
		name : "Dual Wielding Fighting Style",
		prerequisite : "Strength or Dexterity 13 or higher",
		prereqeval : function (v) { return LLScore("Str") >= 13 || LLScore("Dex") >= 13; },
		description : desc("My two-weapon fighting off-hand attack is part of my Attack action and adds my ability mod to damage; no bonus action attack that turn"),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.isOffHand) output.modToDmg = true;
				},
				"When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks. If a melee weapon includes 'off-hand' or 'secondary' in its name or description, it is considered an off-hand attack."
			]
		}
	},
	dual_wielding_expert : {
		menu : "Dual Wielding Expert",
		name : "Dual Wielding Expert Fighting Style",
		prerequisite : "6th-level Fighter, Dual Wielding",
		prereqeval : LLExpertPrereq("Dual Wielding"),
		description : desc("One-handed melee weapons count as light for me; +1 AC while wielding a melee weapon in each hand"),
		extraAC : {
			name : "Dual Wielding Expert Fighting Style",
			mod : 1,
			text : "I gain a +1 bonus to AC while wielding a melee weapon in each hand.",
			stopeval : function (v) { return v.usingShield; }
		}
	},
	"dueling" : {
		menu : "Dueling",
		name : "Dueling Fighting Style",
		description : desc("+2 damage with a melee weapon wielded in one hand while wielding no other weapons"),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && !v.isNaturalWeapon && !(/((^|[^+-]\b)2|\btwo).?hand(ed)?s?\b/i).test(fields.Description) && LLNoOffHand()) output.extraDmg += 2;
				},
				"When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon."
			]
		}
	},
	exotic : {
		menu : "Exotic Warrior",
		name : "Exotic Warrior Fighting Style",
		description : desc([
			"I gain proficiency with two exotic weapons; tridents deal 1d8 (versatile 1d10) piercing damage for me",
			"No disadv. for nets vs. a creature within 5 ft; a net attack only replaces one attack of my Attack action"
		]),
		weaponProfs : [false, false, ["exotic weapon (choice 1)", "exotic weapon (choice 2)"]],
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (v.baseWeaponName == "net") fields.Description += (fields.Description ? "; " : "") + "No disadv. within 5 ft; replaces one attack";
					if (v.baseWeaponName == "trident" && (/^1d6$/).test(fields.Damage_Die)) {
						fields.Damage_Die = "1d8";
						fields.Description = fields.Description.replace(/versatile \(1d8\)/i, "versatile (1d10)");
					}
				},
				"My tridents deal 1d8 (versatile 1d10) damage; my nets have no disadvantage within 5 ft and only replace one attack."
			]
		}
	},
	featherweight : {
		menu : "Featherweight Fighting",
		name : "Featherweight Fighting Style",
		prerequisite : "Dexterity 13, proficiency in Acrobatics",
		prereqeval : function (v) { return LLScore("Dex") >= 13 && v.skillProfs.indexOf("Acrobatics") !== -1; },
		description : desc("Unarmed or wielding only light weapons, in no medium/heavy armor: +10 ft walking speed and +1 damage with light melee weapons and unarmed strikes"),
		speed : { walk : { spd : "+10", enc : "+10" } },
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.baseWeaponName == "unarmed strike" || (v.isMeleeWeapon && (/\blight\b/i).test(fields.Description))) output.extraDmg += 1;
				},
				"While not wearing medium or heavy armor, I do +1 damage with light melee weapons and unarmed strikes."
			]
		}
	},
	featherweight_expert : {
		menu : "Featherweight Expert",
		name : "Featherweight Expert Fighting Style",
		prerequisite : "6th-level Fighter, Featherweight Fighting",
		prereqeval : LLExpertPrereq("Featherweight Fighting"),
		description : desc("While Featherweight Fighting, opportunity attacks against me have disadv. and I can Disengage as a bonus action"),
		action : [["bonus action", "Disengage (Featherweight Expert)"]]
	},
	great_weapon : {
		menu : "Great Weapon Fighting",
		name : "Great Weapon Fighting Style",
		prerequisite : "Strength 13 or higher",
		prereqeval : function (v) { return LLScore("Str") >= 13; },
		description : desc("When I hit with a heavy melee weapon, I treat damage dice below average as: d4 (2), d6 (3), d8 (4), d10 (5), d12 (6)"),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (v.isMeleeWeapon && (/\bheavy\b/i).test(fields.Description)) fields.Description += (fields.Description ? "; " : "") + "Dmg dice below avg count as avg";
				},
				"With a heavy melee weapon, I treat any damage die roll lower than its average as the average."
			]
		}
	},
	great_weapon_expert : {
		menu : "Great Weapon Expert",
		name : "Great Weapon Expert Fighting Style",
		prerequisite : "6th-level Fighter, Great Weapon Fighting",
		prereqeval : LLExpertPrereq("Great Weapon Fighting"),
		description : desc("When I reduce a creature to 0 HP with a heavy melee weapon attack, I can make another attack with it as part of that action, bonus action, or reaction")
	},
	heavyweight : {
		menu : "Heavyweight Fighting",
		name : "Heavyweight Fighting Style",
		prerequisite : "Strength 13 or higher",
		prereqeval : function (v) { return LLScore("Str") >= 13; },
		description : desc("+1 damage with heavy melee weapons; after a hit with one, I can Shove that target with adv. as a bonus action"),
		action : [["bonus action", "Shove w/ adv. (after heavy weapon hit)"]],
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/\bheavy\b/i).test(fields.Description)) output.extraDmg += 1;
				},
				"My heavy melee weapons get a +1 bonus to damage."
			]
		}
	},
	heavyweight_expert : {
		menu : "Heavyweight Expert",
		name : "Heavyweight Expert Fighting Style",
		prerequisite : "6th-level Fighter, Heavyweight Fighting",
		prereqeval : LLExpertPrereq("Heavyweight Fighting"),
		description : desc("When I hit a creature my size or smaller with a heavy melee weapon, I can push it 5 ft away if the space behind it is unoccupied")
	},
	hurler : {
		menu : "Hurler",
		name : "Hurler Fighting Style",
		prerequisite : "Strength or Dexterity 11 or higher",
		prereqeval : function (v) { return LLScore("Str") >= 11 || LLScore("Dex") >= 11; },
		description : desc("I can draw a thrown weapon as part of the attack and its range is doubled; wielding only thrown weapons, I can make one ranged attack with them as a bonus action"),
		action : [["bonus action", "Thrown Weapon Attack (Hurler)"]],
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if ((/\bthrown\b/i).test(fields.Description) && !v.isSpell) fields.Range = doubleRange(fields.Range);
				},
				"The range of my thrown weapon attacks is doubled."
			]
		}
	},
	improvised : {
		menu : "Improvised Fighting",
		name : "Improvised Fighting Style",
		prerequisite : "Strength 11 or higher",
		prereqeval : function (v) { return LLScore("Str") >= 11; },
		description : desc("I'm proficient with improvised weapons; once per turn when I hit with a nonmagical one, I can destroy it to deal maximum damage"),
		weaponProfs : [false, false, ["improvised weapons"]]
	},
	mariner : {
		menu : "Mariner",
		name : "Mariner Fighting Style",
		prerequisite : "Proficiency in Athletics",
		prereqeval : function (v) { return v.skillProfs.indexOf("Athletics") !== -1; },
		description : desc("Without heavy armor or shield: swimming speed equal to my walking speed and +1 AC; no drawbacks from underwater combat"),
		speed : { swim : { spd : "walk", enc : "walk" } },
		extraAC : {
			name : "Mariner Fighting Style",
			mod : 1,
			text : "I gain a +1 bonus to AC while not wearing heavy armor or a shield.",
			stopeval : function (v) { return v.heavyArmor || v.usingShield; }
		}
	},
	marksman : {
		menu : "Melee Marksman",
		name : "Melee Marksman Fighting Style",
		prerequisite : "Dexterity 13 or higher",
		prereqeval : function (v) { return LLScore("Dex") >= 13; },
		description : desc("No disadv. on ranged attacks vs. targets within 5 ft for being near hostiles; a creature within 5 ft I make a ranged attack against can't make opportunity attacks vs. me that turn")
	},
	mountaineer : {
		menu : "Mountaineer",
		name : "Mountaineer Fighting Style",
		prerequisite : "Proficiency in Athletics",
		prereqeval : function (v) { return v.skillProfs.indexOf("Athletics") !== -1; },
		description : desc("Without heavy armor or shield: climbing speed equal to my walking speed and +1 AC; as a reaction, I reduce falling damage by twice my level"),
		speed : { climb : { spd : "walk", enc : "walk" } },
		action : [["reaction", "Reduce Falling Damage (Mountaineer)"]],
		extraAC : {
			name : "Mountaineer Fighting Style",
			mod : 1,
			text : "I gain a +1 bonus to AC while not wearing heavy armor or a shield.",
			stopeval : function (v) { return v.heavyArmor || v.usingShield; }
		}
	},
	mounted : {
		menu : "Mounted Warrior",
		name : "Mounted Warrior Fighting Style",
		prerequisite : "Proficiency in Animal Handling",
		prereqeval : function (v) { return v.skillProfs.indexOf("Animal Handling") !== -1; },
		description : desc("Riding a controlled mount, it and I get +1 AC; as a bonus action, I can command it to take an action from its stat block or another action"),
		action : [["bonus action", "Command Mount (Mounted Warrior)"]],
		extraAC : {
			name : "Mounted Warrior Fighting Style",
			mod : 1,
			text : "I gain a +1 bonus to AC while riding a controlled mount.",
			stopeval : function (v) { return true; } // can't detect riding a mount, so it is only listed in the tooltip
		}
	},
	mounted_expert : {
		menu : "Mounted Expert",
		name : "Mounted Expert Fighting Style",
		prerequisite : "6th-level Fighter, Mounted Warrior",
		prereqeval : LLExpertPrereq("Mounted Warrior"),
		description : desc("While riding: adv. on melee attacks vs. unmounted creatures smaller than my mount; as a reaction, I can take the damage my mount takes instead"),
		action : [["reaction", "Take Mount's Damage (Mounted Expert)"]]
	},
	polearm : {
		menu : "Polearm Fighting",
		name : "Polearm Fighting Style",
		prerequisite : "Strength and Dexterity 11 or higher",
		prereqeval : function (v) { return LLScore("Str") >= 11 && LLScore("Dex") >= 11; },
		description : desc("+1 damage with a glaive, halberd, pike, quarterstaff, or spear wielded alone (no shield); creatures provoke opportunity attacks when they enter my reach with it"),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/\b(polearm|glaive|halberd|pike|quarterstaff|spear)\b/i).test(v.baseWeaponName + " " + v.WeaponName)) output.extraDmg += 1;
				},
				"I do +1 damage with glaives, halberds, pikes, quarterstaffs, and spears while wielding no other weapon or shield."
			]
		}
	},
	polearm_expert : {
		menu : "Polearm Expert",
		name : "Polearm Expert Fighting Style",
		prerequisite : "6th-level Fighter, Polearm Fighting",
		prereqeval : LLExpertPrereq("Polearm Fighting"),
		description : desc("When I take the Attack action while Polearm Fighting, I can make a bonus action attack with the other end (1d4 + Str bludgeoning)"),
		action : [["bonus action", "Polearm Butt End Attack"]],
		weaponOptions : [{
			regExpSearch : /^(?=.*(polearm|glaive|halberd|pike|quarterstaff|spear))(?=.*butt).*$/i,
			name : "Polearm Butt End",
			source : [["GMB:LL", 0]],
			ability : 1,
			type : "Natural",
			damage : [1, 4, "bludgeoning"],
			range : "Melee",
			description : "As bonus action after Attack action with only a glaive, halberd, pike, quarterstaff, or spear",
			abilitytodamage : true,
			selectNow : true
		}]
	},
	protection : {
		menu : "Protection",
		name : "Protection Fighting Style",
		description : desc("As a reaction when a creature I see hits me or a target within 5 ft with a melee attack, I add my Prof Bonus to the target's AC; requires a shield or melee weapon"),
		action : [["reaction", "Protection Fighting Style"]]
	},
	protection_expert : {
		menu : "Protection Expert",
		name : "Protection Expert Fighting Style",
		prerequisite : "6th-level Fighter, Protection",
		prereqeval : LLExpertPrereq("Protection"),
		description : desc("As a reaction when a creature within 5 ft makes a Dex save, I interpose my shield to add my Prof Bonus to its roll (after the roll)"),
		action : [["reaction", "Protection Expert (Dex save)"]]
	},
	"protector" : {
		menu : "Protector",
		name : "Protector Fighting Style",
		description : desc("As a reaction when a creature I see hits me or a target within 5 ft with a melee attack, I add my Prof Bonus to the target's AC; requires a shield or melee weapon"),
		action : [["reaction", "Protector Fighting Style"]]
	},
	shieldwarrior : {
		menu : "Shield Warrior",
		name : "Shield Warrior Fighting Style",
		prerequisite : "Strength 13 or higher",
		prereqeval : function (v) { return LLScore("Str") >= 13; },
		description : desc("I'm proficient with shields as martial melee weapons (2d4 bludgeoning); with a shield and no other weapon: +1 AC and +1 to hit with shield attacks"),
		weaponProfs : [false, false, ["shield melee attack"]],
		weaponOptions : [{
			regExpSearch : /^(?=.*shield)(?=.*(attack|bash|melee)).*$/i,
			name : "Shield Melee Attack",
			source : [["GMB:LL", 0]],
			ability : 1,
			type : "Martial",
			damage : [2, 4, "bludgeoning"],
			range : "Melee",
			description : "Shield Warrior Fighting Style",
			abilitytodamage : true,
			selectNow : true
		}],
		extraAC : {
			name : "Shield Warrior Fighting Style",
			mod : 1,
			text : "I gain a +1 bonus to AC while wielding a shield and no other weapons.",
			stopeval : function (v) { return !v.usingShield; }
		},
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if ((/shield melee attack/i).test(v.WeaponName + " " + v.baseWeaponName)) output.extraHit += 1;
				},
				"My shield attacks get a +1 bonus on the To Hit while I wield no other weapons."
			]
		}
	},
	shieldwarrior_expert : {
		menu : "Shield Expert",
		name : "Shield Expert Fighting Style",
		prerequisite : "6th-level Fighter, Shield Warrior",
		prereqeval : LLExpertPrereq("Shield Warrior"),
		description : desc("Wielding a shield, I can Shove as a bonus action each turn (even without the Attack action) and add its AC bonus to my Dex saves"),
		action : [["bonus action", "Shove (Shield Expert)"]],
		savetxt : { text : ["Add shield's AC bonus to Dex saves (Shield Expert)"] }
	},
	standardbearer : {
		menu : "Standard Bearer",
		name : "Standard Bearer Fighting Style",
		prerequisite : "Charisma 13 or higher",
		prereqeval : function (v) { return LLScore("Cha") >= 13; },
		description : desc("Holding a standard aloft, I rally allies within 5\u00D7 Prof Bonus ft; as a reaction, I give one of them adv. on a saving throw"),
		action : [["reaction", "Standard Bearer (adv. on ally's save)"]]
	},
	strongbow : {
		menu : "Strongbow",
		name : "Strongbow Fighting Style",
		prerequisite : "Strength 13 or higher",
		prereqeval : function (v) { return LLScore("Str") >= 13; },
		description : desc("I can use Str instead of Dex for attack and damage rolls with longbows and shortbows; when I do, I get +1 damage"),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if ((/^(long|short)bow$/i).test(v.baseWeaponName) && What("Str Mod") > What("Dex Mod")) fields.Mod = 1;
				},
				"I can use Strength for attack and damage rolls with longbows and shortbows."
			],
			atkCalc : [
				function (fields, v, output) {
					if ((/^(long|short)bow$/i).test(v.baseWeaponName) && fields.Mod == 1) output.extraDmg += 1;
				},
				"When I use Strength with a longbow or shortbow, I get +1 damage."
			]
		}
	},
	superior_technique : {
		menu : "Superior Technique",
		name : "Superior Technique Fighting Style",
		prerequisite : "6th-level Fighter, at least one Exploit known",
		prereqeval : function (v) { return LLClassLevel("fighter(laserllama)") >= 6; },
		description : desc("I learn one 1st-degree Martial Exploit (doesn't count against my Exploits Known) and gain one additional Exploit Die; select it with the \"Choose Feature\" button (Martial Exploits)"),
		eval : function () { LLUpdateExploitDice(); },
		removeeval : function () { LLUpdateExploitDice(); },
		bonusClassExtrachoices : [{
			"class" : "fighter(laserllama)",
			feature : "martial exploits",
			bonus : 1
		}]
	},
	tactical : {
		menu : "Tactical Fighting",
		name : "Tactical Fighting Style",
		prerequisite : "Intelligence 13 or higher",
		prereqeval : function (v) { return LLScore("Int") >= 13; },
		description : desc("I can take the Help or Search action as a bonus action; my Help can aid an attack against a target up to 30 ft away if the attacker hears me"),
		action : [["bonus action", "Help or Search (Tactical Fighting)"]]
	},
	versatile : {
		menu : "Versatile Fighting",
		name : "Versatile Fighting Style",
		prerequisite : "Strength or Dexterity 11 or higher",
		prereqeval : function (v) { return LLScore("Str") >= 11 || LLScore("Dex") >= 11; },
		description : desc("Wielding a single versatile weapon and no shield: +1 to hit with it, and I can Grapple, Shove, or Use an Object as a bonus action"),
		action : [["bonus action", "Grapple/Shove/Use an Object (Versatile)"]],
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if ((/\bversatile\b/i).test(fields.Description) && LLNoOffHand()) output.extraHit += 1;
				},
				"I get a +1 bonus to hit when wielding a single versatile weapon and no shield. This is not applied if the bonus action 'Off-hand Attack' exists."
			]
		}
	},
	blind : {
		menu : "Blind Warrior",
		name : "Blind Warrior Fighting Style",
		prerequisite : "Proficiency in Perception",
		prereqeval : function (v) { return v.skillProfs.indexOf("Perception") !== -1; },
		description : desc("I have blindsight with a range of 5\u00D7 my Prof Bonus ft"),
		changeeval : function (lvl, chc) {
			var srcNm = "Blind Warrior Fighting Style";
			var curRange = CurrentProfs.vision.blindsight && CurrentProfs.vision.blindsight.ranges ? CurrentProfs.vision.blindsight.ranges[srcNm] : false;
			var newRange = lvl[1] ? Number(How("Proficiency Bonus")) * 5 : 0;
			if (curRange != newRange) {
				if (curRange) SetProf("vision", false, "Blindsight", srcNm, curRange);
				if (newRange) SetProf("vision", true, "Blindsight", srcNm, newRange);
			}
		}
	}
};
// Lists of Fighting Styles per class (Alternate Martial Multiclassing: Extra Attack & Fighting Styles)
LLFightingStyleLists = {
	"fighter" : ["arcane warrior", "archery", "balanced", "bardic_warrior", "blind", "brawling", "classical", "defensive", "dual_wielding", "exotic", "featherweight", "great_weapon", "heavyweight", "hurler", "improvised", "mariner", "marksman", "mountaineer", "mounted", "polearm", "protection", "shieldwarrior", "standardbearer", "strongbow", "tactical", "versatile"],
	"fighter experts" : ["archery_expert", "balanced_expert", "brawling_expert", "classical_expert", "defensive_expert", "dual_wielding_expert", "featherweight_expert", "great_weapon_expert", "heavyweight_expert", "mounted_expert", "polearm_expert", "protection_expert", "shieldwarrior_expert", "superior_technique"],
	"artificer" : ["arcane warrior", "archery", "balanced", "defensive", "protection", "shieldwarrior"],
	"barbarian" : ["brawling", "balanced", "dual_wielding", "exotic", "great_weapon", "heavyweight"],
	"bard" : ["balanced", "bardic_warrior", "classical", "dual_wielding", "featherweight", "hurler", "versatile"],
	"blood hunter" : ["archery", "dual_wielding", "dueling", "featherweight", "great_weapon", "hurler", "marksman", "polearm", "versatile"],
	"brawler" : ["blind", "defensive", "hurler", "improvised", "protector"],
	"cleric" : ["blessed_warrior", "blind", "defensive"],
	"druid" : ["druidic_warrior", "mariner", "mountaineer"],
	"magus" : ["arcane warrior", "archery", "balanced", "brawling", "classical", "defensive", "dual_wielding", "featherweight", "great_weapon", "hurler", "mounted", "polearm", "protection", "shieldwarrior", "versatile"],
	"monk" : ["archery", "blind", "defensive", "featherweight", "hurler", "improvised"],
	"paladin" : ["balanced", "blessed_warrior", "blind", "classical", "defensive", "exotic", "great_weapon", "heavyweight", "mounted", "polearm", "protection", "shieldwarrior", "standardbearer", "strongbow", "versatile"],
	"psion" : ["blind", "psionic_warrior"],
	"ranger" : ["archery", "balanced", "blind", "brawling", "defensive", "druidic_warrior", "dual_wielding", "featherweight", "hurler", "mariner", "marksman", "mountaineer", "mounted", "strongbow", "versatile"],
	"rogue" : ["classical", "dual_wielding", "featherweight", "hurler", "tactical"],
	"shaman" : ["blind", "shamanistic_warrior"],
	"shifter" : ["blind", "hurler", "mariner", "mountaineer"],
	"sorcerer" : ["arcane warrior", "bardic_warrior", "blessed_warrior", "druidic_warrior", "eldritch_warrior", "psionic_warrior", "shamanistic_warrior", "sorcerous_warrior"],
	"vessel" : ["balanced", "blind", "defensive", "eldritch_warrior", "exotic"],
	"wanderer" : ["archery", "balanced", "defensive", "dual_wielding", "featherweight", "hurler", "mariner", "marksman", "mountaineer", "mounted", "strongbow", "versatile"],
	"warlord" : ["archery", "balanced", "bardic_warrior", "brawling", "classical", "defensive", "mariner", "marksman", "mountaineer", "mounted", "protection", "shieldwarrior", "standardbearer", "tactical", "versatile"],
	"warlock" : ["eldritch_warrior"],
	"wizard" : ["arcane warrior"]
};
// Copy a Fighting Style into a choice object (strips the "menu" attribute)
LLFightingStyleChoice = function (sKey, oExtra) {
	var oFS = FightingStylesLL[sKey];
	var oNew = {};
	for (var a in oFS) {
		if (a === "menu") continue;
		oNew[a] = oFS[a];
	}
	if (!oNew.source) oNew.source = [["GMB:LL", 0]];
	if (oNew.prerequisite && oNew.description && oNew.description.indexOf("Prerequisite") === -1) {
		oNew.description = "\n   Prerequisite: " + oNew.prerequisite + oNew.description;
	}
	if (oExtra) for (var b in oExtra) oNew[b] = oExtra[b];
	return oNew;
};
// Add Fighting Styles to a class feature as (extra)choices; aKeys = keys of FightingStylesLL
LLAddFightingStyles = function (oFea, aKeys, bExtra, oExtra) {
	var sType = bExtra ? "extrachoices" : "choices";
	if (!oFea[sType]) oFea[sType] = [];
	for (var i = 0; i < aKeys.length; i++) {
		var oFS = FightingStylesLL[aKeys[i]];
		if (!oFS) continue;
		if (oFea[sType].indexOf(oFS.menu) === -1) oFea[sType].push(oFS.menu);
		oFea[oFS.menu.toLowerCase()] = LLFightingStyleChoice(aKeys[i], oExtra);
	}
	return oFea;
};

// ===================================================================================
// ALTERNATE MARTIAL MULTICLASSING - Extra Attack & Fighting Styles
// If you gain Extra Attack from more than one class, you learn a Fighting Style from
// the list of one of those classes instead of a second Extra Attack.
// ===================================================================================
LLExtraAttackListKey = function (sClass) {
	var s = sClass.replace(/\(laserllama\)/i, "").replace(/\s+$/, "").toLowerCase();
	if (/blood ?hunter/.test(s)) return "blood hunter";
	return LLFightingStyleLists[s] ? s : false;
};
// Returns the minimum level of the extra attack feature of a class, or false
LLExtraAttackLevel = function (sClass) {
	var oCl = ClassList[sClass];
	if (!oCl || !oCl.features) return false;
	for (var sFea in oCl.features) {
		var oF = oCl.features[sFea];
		if (oF && /^extra attack/i.test(sFea + "") && oF.minlevel) return oF.minlevel;
	}
	return false;
};
LLExtraAttackClasses = function () {
	var a = [];
	for (var sCl in classes.known) {
		var nLvl = LLExtraAttackLevel(sCl);
		if (nLvl && classes.known[sCl].level >= nLvl) a.push(sCl);
	}
	return a;
};
RunFunctionAtEnd(function () {
	for (var sClass in ClassList) {
		var sList = LLExtraAttackListKey(sClass);
		if (!sList) continue;
		var oCl = ClassList[sClass];
		var oFea = oCl.features ? oCl.features["extra attack"] : false;
		if (!oFea || oFea.LLmulticlassFS) continue;
		oFea.LLmulticlassFS = true;
		var aKeys = LLFightingStyleLists[sList];
		var fPrereq = (function (sCl) {
			return function (v) {
				var aEA = LLExtraAttackClasses();
				return aEA.length > 1 && aEA.indexOf(sCl) !== -1;
			};
		})(sClass);
		if (!oFea.extrachoices) {
			oFea.extraname = "Multiclass Extra Attack Fighting Style";
			oFea.extrachoices = [];
		}
		for (var i = 0; i < aKeys.length; i++) {
			var oFS = FightingStylesLL[aKeys[i]];
			if (!oFS) continue;
			var sMenu = oFS.menu + " (Multiclass Extra Attack)";
			if (oFea.extrachoices.indexOf(sMenu) !== -1) continue;
			var oChoice = LLFightingStyleChoice(aKeys[i]);
			var fOwn = oChoice.prereqeval;
			oChoice.prereqeval = (function (fA, fB) {
				return function (v) { return fA(v) && (fB ? fB(v) : true); };
			})(fPrereq, fOwn);
			oChoice.submenu = "[Multiclassing: Fighting Style instead of Extra Attack]";
			oChoice.description = "\n   Instead of a second Extra Attack (Alternate Martial Multiclassing), I learn:" + oChoice.description;
			oFea.extrachoices.push(sMenu);
			oFea[sMenu.toLowerCase()] = oChoice;
		}
	}
});

// ===================================================================================
// FEAT: Alternate Fighting Initiate (Alternate Martial Multiclassing / Alternate Fighter)
// ===================================================================================
FeatsList["alternate fighting initiate"] = {
	name : "Alternate Fighting Initiate",
	source : [["GMB:LL", 0]],
	prerequisite : "Proficiency with a martial weapon",
	prereqeval : function (v) {
		return v.martialWeaponsProf || v.otherWeaponsProf.some(function (n) {
			return WeaponsList[n] && (/martial/i).test(WeaponsList[n].type);
		});
	},
	descriptionFull : "You have dedicated time to master a specific style of fighting. When you select this Feat you gain the following benefits:\n \u2022 Increase either your Strength, Dexterity, or Constitution score by 1, up to a maximum of 20.\n \u2022 You learn one Fighting Style of your choice choosing from those available to the Alternate Fighter. You cannot learn the same Fighting Style more then once. In order to learn a Fighting Style you must meet any prerequisites it has.",
	description : "I learn one Fighting Style of the Alternate Fighter (prerequisites apply; Expert styles require character level 6 and the base style). [+1 Strength, Dexterity, or Constitution]",
	scorestxt : "+1 Strength, Dexterity, or Constitution",
	choices : []
};
(function () {
	var oFeat = FeatsList["alternate fighting initiate"];
	var aKeys = LLFightingStyleLists["fighter"].concat(LLFightingStyleLists["fighter experts"]);
	for (var i = 0; i < aKeys.length; i++) {
		var oFS = FightingStylesLL[aKeys[i]];
		if (!oFS || aKeys[i] === "superior_technique") continue;
		oFeat.choices.push(oFS.menu);
		var oCh = LLFightingStyleChoice(aKeys[i]);
		oCh.description = oCh.description.replace(/^\n   /, "").replace(/\n   /g, "; ") + " [+1 Str, Dex, or Con]";
		var fOwn = oCh.prereqeval;
		oCh.prereqeval = (function (fO, sMenu) {
			return function (v) {
				if (LLHasFightingStyle(sMenu)) return false;
				return fO ? fO(v) : true;
			};
		})(fOwn, oFS.menu);
		oFeat[oFS.menu.toLowerCase()] = oCh;
	}
})();

// ===================================================================================
// MYSTIC TALENTS (Psion Class v2.4.1) - shared by the Psion and the subclasses that grant them
// talentLevel = minimum level in the granting class; requires = Talents that must be known
// ===================================================================================
MysticTalentsLL = {
	"celerity i" : { name : "Celerity I", talentLevel : 1, description : desc("My speed increases by 10 ft; I can Dash or Disengage as a bonus action"), speed : { allModes : "+10" }, action : [["bonus action", "Dash/Disengage (Celerity)"]] },
	"celerity ii" : { name : "Celerity II", talentLevel : 5, requires : ["celerity i"], description : desc("+5 ft speed; when I Dash/Disengage, I ignore difficult terrain and can move across liquids and vertical surfaces this turn"), speed : { allModes : "+5" } },
	"celerity iii" : { name : "Celerity III", talentLevel : 11, requires : ["celerity i", "celerity ii"], description : desc("+5 ft speed; when I Dash/Disengage, I can become invisible until I stop moving or my turn ends"), speed : { allModes : "+5" } },
	"celerity iv" : { name : "Celerity IV", talentLevel : 16, requires : ["celerity i", "celerity ii", "celerity iii"], description : desc("I can take a second action on each of my turns, only to Dash, Disengage, or Dodge") },
	"iron durability i" : { name : "Iron Durability I", talentLevel : 1, description : desc("Without armor, my AC is 10 + Con mod + Int mod (a shield is fine)"),
		armorOptions : [{ regExpSearch : /^(?=.*iron)(?=.*durability).*$/i, name : "Iron Durability", source : [["GMB:LL", 0]], ac : "10+Con+Int", dex : -10, affectsWildShape : true }], armorAdd : "Iron Durability" },
	"iron durability ii" : { name : "Iron Durability II", talentLevel : 5, requires : ["iron durability i"], description : desc("As a bonus action on each of my turns, I gain temp HP equal to my Int mod (min 1)"), action : [["bonus action", "Iron Durability (temp HP)"]] },
	"iron durability iii" : { name : "Iron Durability III", talentLevel : 11, requires : ["iron durability i", "iron durability ii"], description : desc("As a reaction when I take damage from a source I see, I spend 3 Psi Points to resist that type until I use this again"), action : [["reaction", "Iron Durability (3 PP)"]] },
	"iron durability iv" : { name : "Iron Durability IV", talentLevel : 16, requires : ["iron durability i", "iron durability ii", "iron durability iii"], description : desc("I resist bludgeoning, piercing, and slashing damage; I reduce all damage I take by my Int mod (min 1)"), dmgres : ["Bludgeoning", "Piercing", "Slashing"] },
	"metamorphosis i" : { name : "Metamorphosis I", talentLevel : 1, description : desc("I learn psionic strike; I can use Int instead of Str for unarmed strikes, psionic strike, and Str checks"),
		spellcastingBonus : [{ name : "Metamorphosis I", spells : ["psionic strike"], selection : ["psionic strike"], spellcastingAbility : 4 }] },
	"metamorphosis ii" : { name : "Metamorphosis II", talentLevel : 5, requires : ["metamorphosis i"], description : desc("Bonus action, 2 PP: become Large (temp HP = Int score, +1d4 melee dmg, adv. on Str checks/saves) or Tiny (6-inch gaps, +Int to Stealth) for 1 min; +1 PP per extra minute"), action : [["bonus action", "Metamorphosis (2 PP)"]] },
	"metamorphosis iii" : { name : "Metamorphosis III", talentLevel : 11, requires : ["metamorphosis i", "metamorphosis ii"], description : desc("I learn polymorph, only on myself, as a bonus action; I keep my mental scores and psionic features"),
		spellcastingBonus : [{ name : "Metamorphosis III", spells : ["polymorph"], selection : ["polymorph"], spellcastingAbility : 4 }] },
	"metamorphosis iv" : { name : "Metamorphosis IV", talentLevel : 16, requires : ["metamorphosis i", "metamorphosis ii", "metamorphosis iii"], description : desc("Bonus action, 5 PP: become Huge (temp HP = 2\xD7 Int score, +2d6 melee dmg, adv. on Str checks/saves) or Diminutive (+level to Stealth) for 1 min") },
	"precognition i" : { name : "Precognition I", talentLevel : 1, description : desc("I can't be surprised unless unconscious, asleep, or incapacitated; I add my Int mod (min +1) to initiative"),
		addMod : [{ type : "skill", field : "Init", mod : "max(Int|1)", text : "Precognition I: I add my Intelligence modifier (min +1) to initiative rolls." }] },
	"precognition ii" : { name : "Precognition II", talentLevel : 5, requires : ["precognition i"], description : desc("As a reaction when hit by an attack I can see, I add 1d4 to my AC against it"), action : [["reaction", "Precognition (+1d4 AC)"]] },
	"precognition iii" : { name : "Precognition III", talentLevel : 11, requires : ["precognition i", "precognition ii"], description : desc("As a bonus action, I enter a precognitive state (concentration): +1d4 to my checks, attacks, and saves"), action : [["bonus action", "Precognitive State"]] },
	"precognition iv" : { name : "Precognition IV", talentLevel : 16, requires : ["precognition i", "precognition ii", "precognition iii"], description : desc("When I roll initiative, a reaction gives me a turn first (1 action, bonus action, or move); in my precognitive state, I gain an extra reaction") },
	"restoration i" : { name : "Restoration I", talentLevel : 1, description : desc("As an action, I touch a creature and restore HP from my pool (5\xD7 my level; not undead/constructs)"), action : [["action", "Restoration (touch)"]],
		limfeaname : "Restoration Pool", usages : levels.map(function (n) { return 5 * n; }), recovery : "long rest" },
	"restoration ii" : { name : "Restoration II", talentLevel : 5, requires : ["restoration i"], description : desc("As an action, I touch a creature and spend 5 points of my pool to end blinded, charmed, deafened, frightened, paralyzed, poisoned, or stunned") },
	"restoration iii" : { name : "Restoration III", talentLevel : 11, requires : ["restoration i", "restoration ii"], description : desc("As an action, I touch a creature that died within the last minute and spend 10 points to revive it at 1 HP") },
	"restoration iv" : { name : "Restoration IV", talentLevel : 16, requires : ["restoration i", "restoration ii", "restoration iii"], description : desc("My Restoration features work at 120 ft; 10 points can end petrified or remove 1 exhaustion or an ability/max HP reduction") },
	"telekinesis i" : { name : "Telekinesis I", talentLevel : 1, description : desc("I learn mage hand (invisible, no V/S); it can Shove, Grapple, use tools, and lift 100 lb, using my Int"),
		spellcastingBonus : [{ name : "Telekinesis I", spells : ["mage hand"], selection : ["mage hand"], spellcastingAbility : 4 }] },
	"telekinesis ii" : { name : "Telekinesis II", talentLevel : 5, requires : ["telekinesis i"], description : desc("I can control my mage hand with an action or bonus action; it can wield one-handed weapons (Int for attack/damage) and lift 500 lb"), action : [["bonus action", "Mage Hand (Telekinesis)"]] },
	"telekinesis iii" : { name : "Telekinesis III", talentLevel : 11, requires : ["telekinesis i", "telekinesis ii"], description : desc("I learn telekinesis (no V/S); it lasts as long as I concentrate"),
		spellcastingBonus : [{ name : "Telekinesis III", spells : ["telekinesis"], selection : ["telekinesis"], spellcastingAbility : 4 }] },
	"telekinesis iv" : { name : "Telekinesis IV", talentLevel : 16, requires : ["telekinesis i", "telekinesis ii", "telekinesis iii"], description : desc("I can cast telekinesis at will without Psi Points; 1 PP gives adv. on a check with mage hand or telekinesis") },
	"telepathy i" : { name : "Telepathy I", talentLevel : 1, description : desc("I can communicate telepathically with one creature I see within 60 ft (it must know a language); it can fulfill a spell's verbal component for one target") },
	"telepathy ii" : { name : "Telepathy II", talentLevel : 5, requires : ["telepathy i"], description : desc("Telepathy range 1,000 ft; as an action, I link up to my Int mod creatures in a telepathic network") },
	"telepathy iii" : { name : "Telepathy III", talentLevel : 11, requires : ["telepathy i", "telepathy ii"], description : desc("Telepathy range 1 mile (creatures I can't see must have been linked before)") },
	"telepathy iv" : { name : "Telepathy IV", talentLevel : 16, requires : ["telepathy i", "telepathy ii", "telepathy iii"], description : desc("Telepathy at any range; as a reaction, 1 PP adds my Int mod to the save of a creature in my network"), action : [["reaction", "Telepathy (1 PP, +Int to save)"]] }
};
/*	Build a "Mystic Talents" class feature
	oOpt = { name, minlevel, cls (ClassList key), feature (the key of this feature in the class or subclass), extraTimes, source }
*/
LLMysticTalentsFeature = function (oOpt) {
	var oFea = {
		name : oOpt.name ? oOpt.name : "Mystic Talents",
		source : oOpt.source ? oOpt.source : [["GMB:LL", 0]],
		minlevel : oOpt.minlevel,
		description : oOpt.description ? oOpt.description : desc([
			"I unlock Mystic Talents; use the \"Choose Feature\" button above to select them",
			"When I gain a level, I can replace one (not a prerequisite of another Talent I know)"
		]),
		extraname : "Mystic Talent",
		extrachoices : [],
		extraTimes : oOpt.extraTimes
	};
	for (var sT in MysticTalentsLL) {
		var oT = MysticTalentsLL[sT];
		var oNew = {};
		for (var a in oT) {
			if (a === "talentLevel" || a === "requires") continue;
			oNew[a] = oT[a];
		}
		oNew.source = [["GMB:LL", 0]];
		if (oT.talentLevel > 1 || oT.requires) {
			oNew.prerequisite = (oT.talentLevel > 1 ? oT.talentLevel + "th level" : "") + (oT.requires ? (oT.talentLevel > 1 ? ", " : "") + oT.requires.map(function (n) { return MysticTalentsLL[n].name; }).join(", ") : "");
			oNew.prereqeval = (function (oTal) {
				return function (v) {
					var lvl = classes.known[oOpt.cls] ? classes.known[oOpt.cls].level : 0;
					if (lvl < oTal.talentLevel) return false;
					if (!oTal.requires) return true;
					var aKnown = GetFeatureChoice("classes", oOpt.cls, oOpt.feature, true);
					for (var i = 0; i < oTal.requires.length; i++) {
						if (aKnown.indexOf(oTal.requires[i]) === -1) return false;
					}
					return true;
				};
			})(oT);
		}
		oFea.extrachoices.push(oT.name);
		oFea[sT] = oNew;
	}
	return oFea;
};

// ===================================================================================
// EXPLOITS (Compendium of Exploits v1.0)
// ===================================================================================
SpellsList["aerial maneuver"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Dex") >= 11) && (v.skillProfs.indexOf("Acrobatics") !== -1); },
	prerequisite : "Dexterity of 11, Acrobatics proficiency",
	name : "Aerial Maneuver",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you fall",
	range : "Self",
	duration : "Instantaneous",
	description : "Reduce falling damage by 5\u00d7 my level; if not reduced to 0 HP, I land on my feet",
	descriptionFull : "Prerequisite: Dexterity of 11, Acrobatics\n   Execution: 1 reaction (when you fall)\n   As a reaction when you fall, you can expend an Exploit Die to reduce the falling damage by five times your level. If you are not reduced to 0 hit points, you land on your feet."
};
SpellsList["arresting strike"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	name : "Arresting Strike",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a weapon attack",
	range : "Attack",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "Instantaneous",
	save : "Dex",
	description : "On hit, save or +1 ED dmg and target's speed is halved until start of my next turn",
	descriptionFull : "Execution: On hit (weapon attack)\n   When you hit a target with a weapon attack, you can expend one Exploit Die and force it to make a Dexterity saving throw. On a failure, add your Exploit Die to the damage roll, and the target's speed is halved until the start of your next turn."
};
SpellsList["attack order"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (order)]",
	name : "Attack Order",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Order",
	time : "1 atk",
	timeFull : "Forgo one attack of the Attack action",
	range : "30 ft",
	duration : "Instantaneous",
	description : "Ally that sees/hears me makes one additional attack if it takes the Attack action before my next turn",
	descriptionFull : "Execution: 1 attack\n   As part of your Attack action, you can forgo an attack to issue this Order to another creature that can see or hear you within 30 feet. If it takes the Attack action before the start of your next turn, it makes one additional attack."
};
SpellsList["bonebreaking critical"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Str") >= 11); },
	prerequisite : "Strength of 11",
	name : "Bonebreaking Critical",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "Crit",
	timeFull : "No action required, when you score a critical hit with a weapon attack",
	range : "Attack",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "1 min",
	save : "Con",
	description : "On crit, target deals half damage with weapon attacks; save at end of each of its turns to end",
	descriptionFull : "Prerequisite: Strength of 11\n   Execution: On a critical hit with a weapon attack\n   When you score a critical hit with a weapon attack, you can expend an Exploit Die to cripple the target. For 1 minute, it deals half damage with all weapon attacks.\n   A crippled target can make a Constitution saving throw at the end of each of its turns, ending this effect on a success."
};
SpellsList["brace up"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Con") >= 11); },
	prerequisite : "Constitution of 11",
	name : "Brace Up",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "1 bns",
	range : "Self",
	duration : "1 min",
	description : "Gain 1 ED + Con mod temporary HP for 1 minute",
	descriptionFull : "Prerequisite: Constitution of 11\n   Execution: 1 bonus action\n   You prepare yourself to take a hit. As a bonus action, you can expend one Exploit Die to gain temporary hit points equal to your Exploit Die + your Constitution modifier. Temporary hit points from this Exploit only last for 1 minute."
};
SpellsList["breathless critical"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Str") >= 11); },
	prerequisite : "Strength of 11",
	name : "Breathless Critical",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "Crit",
	timeFull : "No action required, when you score a critical hit with a weapon attack",
	range : "Attack",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "1 min",
	save : "Con",
	description : "On crit, target can't speak and its speed is halved; save at end of each of its turns to end",
	descriptionFull : "Prerequisite: Strength of 11\n   Execution: On a critical hit with a weapon attack\n   When you score a critical hit on a creature with a weapon attack, you can expend an Exploit Die to knock the wind from it. For 1 minute, it cannot speak and its speed is halved.\n   A winded creature can make a Constitution saving throw at the end of each of its turns, ending this effect on a success."
};
SpellsList["craft oil bomb"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (utility)]",
	prereqeval : function(v) { return (LLhasTool(v, /alchemist/i)); },
	prerequisite : "Alchemist's Supplies proficiency",
	name : "Craft Oil Bomb",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Craft",
	time : "1 a",
	range : "60 ft",
	components : "M",
	compMaterial : "Alchemist's supplies",
	duration : "1 min",
	save : "Dex",
	description : "Craft Oil Bomb (lasts until LR); thrown: 10-ft sq difficult terrain, Dex save or prone; ED not regained until used",
	descriptionFull : "Prerequisite: Alchemist's Supplies\n   Execution: 1 action\n   As an action, you expend an Exploit Die and use alchemist's supplies to craft one Oil Bomb which uses the rules below:\n   Consumable. The Oil Bomb retains potency until the end of your next long rest, then it becomes unusable. You cannot regain the Exploit Die spent to create the Oil Bomb until this Oil Bomb is spent or destroyed.\n   Using the Bomb. Any creature can take the Use an Object action to throw the Oil Bomb at a point within 60 feet, where it explodes on impact. A 10-foot square centered on the point is covered in Oil, turning it into difficult terrain. Creatures in the area on impact, or any creature that enters the area must succeed on a Dexterity saving throw or fall Prone.\n   The Oil retains its potency on the ground for 1 minute."
};
SpellsList["craft simple trap"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (utility)]",
	prereqeval : function(v) { return (LLhasTool(v, /thie/i) || LLhasTool(v, /tinker/i)); },
	prerequisite : "Thieves' Tools or Tinker's Tools proficiency",
	name : "Craft Simple Trap",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Craft",
	time : "1 a",
	range : "5 ft",
	components : "M",
	compMaterial : "Thieves' tools or tinker's tools",
	duration : "Until LR",
	save : "Dex",
	description : "Craft Simple Trap (lasts until LR); first Medium or smaller crea Dex save or 1 ED piercing dmg + restrained",
	descriptionFull : "Prerequisite: Thieves' Tools or Tinker's Tools\n   Execution: 1 action\n   As an action, you can expend one Exploit Die and use tools, natural materials, and adventuring supplies to craft a Simple Trap. This Simple Trap uses the following rules:\n   Consumable. The Trap remains functional until the end of your next long rest, then it reverts to the raw material used to craft it. You cannot regain the Exploit Die spent to create this Trap until the Trap is triggered or destroyed.\n   Setting the Trap. Any creature can take the Use an Object action to set the Trap in an unoccupied, adjacent 5-foot space.\n   Triggering the Trap. The first Medium or smaller creature to enter the Trap's space must make a Dexterity saving throw. If it is unaware of the Trap, it has disadvantage on this saving throw. On a failure, the creature takes piercing damage equal to your Exploit Die and is Restrained by the Trap.\n   A creature can use its action to repeat the Dexterity saving throw against the Simple Trap, escaping on a success."
};
SpellsList["craft smoke bomb"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (utility)]",
	prereqeval : function(v) { return (LLhasTool(v, /alchemist/i)); },
	prerequisite : "Alchemist's Supplies proficiency",
	name : "Craft Smoke Bomb",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Craft",
	time : "1 a",
	range : "60 ft",
	components : "M",
	compMaterial : "Alchemist's supplies",
	duration : "10 min",
	description : "Craft Smoke Bomb (lasts until LR); thrown: 20-ft rad sphere of heavily obscuring smoke for 10 min",
	descriptionFull : "Prerequisite: Alchemist's Supplies\n   Execution: 1 action\n   As an action, you expend an Exploit Die and use alchemist's supplies to craft a Smoke Bomb which uses the rules here:\n   Consumable. The Smoke Bomb retains its potency until the end of your next long rest, then it becomes unusable. You cannot regain the Exploit Die you spent to create this Smoke Bomb until this Smoke Bomb is spent or destroyed.\n   Using the Bomb. Any creature can take the Use an Object action to throw this Smoke Bomb at a point within 60 feet. It explodes on impact. A 20-foot-radius sphere of smoke, which spreads around corners, centered on the impact. The smoke heavily obscures the area and lasts for 10 minutes. It can be dispersed by a moderate wind of at least 10 miles per hour."
};
SpellsList["crushing grip"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Str") >= 11) && (v.skillProfs.indexOf("Athletics") !== -1); },
	prerequisite : "Strength of 11, Athletics proficiency",
	name : "Crushing Grip",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "Grapple",
	timeFull : "No action required, when you successfully grapple a creature",
	range : "Touch",
	duration : "Grapple",
	description : "When I grapple, target takes 1 ED bludg. dmg now and at the end of each of its turns while grappled",
	descriptionFull : "Prerequisite: Strength of 11, Athletics\n   Execution: On a successful Grapple\n   When you Grapple a target, you can expend one Exploit Die to enhance your grip on it. When you use this Exploit, and again at the end of each of the Grappled creature's turns, it takes bludgeoning damage equal to your Exploit Die."
};
SpellsList["dazing blow"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Str") >= 11); },
	prerequisite : "Strength of 11",
	name : "Dazing Blow",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with an unarmed strike",
	range : "Melee",
	components : "W",
	compMaterial : "Unarmed strike",
	duration : "Instantaneous",
	save : "Wis",
	description : "On unarmed hit, save or +1 ED dmg and it subtracts 1 ED from its next check, attack, or save before my turn",
	descriptionFull : "Prerequisite: Strength of 11\n   Execution: On hit (unarmed strike)\n   When you hit a creature with an unarmed strike, you can expend an Exploit Die to force it to make a Wisdom saving throw. On a failure, add your Exploit Die to the damage roll, and it subtracts one Exploit Die from the first ability check, attack roll, or saving throw it makes before your next turn."
};
SpellsList["defensive order"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (order)]",
	name : "Defensive Order",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Order",
	time : "1 atk",
	timeFull : "Forgo one attack of the Attack action",
	range : "30 ft",
	duration : "1 rnd",
	description : "Ally that sees/hears me gains the benefits of the Dodge action until the start of my next turn",
	descriptionFull : "Execution: 1 attack\n   As part of your Attack action, you can forgo an attack to issue this Order to another creature that can see or hear you within 30 feet, granting it the benefits of the Dodge action until the start of your next turn."
};
SpellsList["destructive strike"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Str") >= 11); },
	prerequisite : "Strength of 11",
	name : "Destructive Strike",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit a nonmagical object with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "Instantaneous",
	description : "On hit vs. nonmagical object, add 1 ED and the attack deals maximum damage",
	descriptionFull : "Prerequisite: Strength of 11\n   Execution: On hit (melee weapon attack)\n   When you hit a non-magical object with a melee weapon attack, you can expend an Exploit Die, add it to the damage, and that attack deals maximum damage in place of rolling."
};
SpellsList["disarm"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	name : "Disarm",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a weapon attack",
	range : "Attack",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "Instantaneous",
	save : "Str",
	description : "On hit, save or +1 ED dmg and target drops one object of my choice in its space",
	descriptionFull : "Execution: On hit (weapon attack)\n   When you hit a target with a weapon attack, you can expend an Exploit Die and force it to make a Strength saving throw. On a failure, add your Exploit Die to the damage roll, and it drops one object of your choice on the ground in its space."
};
SpellsList["eloquent speech"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (utility)]",
	prereqeval : function(v) { return (What("Int") >= 11); },
	prerequisite : "Intelligence of 11",
	addMod : [{ type : "skill", field : "Persuasion", mod : "max(Int-Cha|0)", text : "I can use Intelligence instead of Charisma for Persuasion checks" }, { type : "skill", field : "Deception", mod : "max(Int-Cha|0)", text : "I can use Intelligence instead of Charisma for Deception checks" }],
	name : "Eloquent Speech",
	classes : ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Skill",
	time : "Check",
	range : "Self",
	duration : "Instantaneous",
	description : "I can use Int for Deception/Persuasion; when I do, I can expend 1 ED to treat a d20 roll of 7 or lower as 8",
	descriptionFull : "Prerequisite: Intelligence of 11\n   Execution: Deception or Persuasion check\n   You can use Intelligence, in place of Charisma, whenever you make a Deception or Persuasion check. If you do so, you can expend an Exploit Die to treat a d20 roll of 7 or lower as an 8."
};
SpellsList["feat of strength"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (utility)]",
	prereqeval : function(v) { return (What("Str") >= 11 || What("Con") >= 11); },
	prerequisite : "Strength or Constitution of 11",
	name : "Feat of Strength",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Skill",
	time : "Check",
	range : "Self",
	duration : "Instantaneous",
	description : "Add ED (up to Prof Bonus) to a Str or Con check, after rolling but before knowing the result",
	descriptionFull : "Prerequisite: Strength or Constitution of 11\n   Execution: Strength or Constitution ability check\n   When you make a Strength or Constitution ability check you can expend Exploit Dice (up to your Proficiency Bonus) and add them to your roll. You can do so after you roll, but before you know the outcome of your check, success or failure."
};
SpellsList["feint"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	name : "Feint",
	classes : ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "1 bns",
	range : "15 ft",
	duration : "Instantaneous",
	save : "Wis",
	description : "1 crea that can see me saves or I have adv. on all attacks against it until the end of my turn",
	descriptionFull : "Execution: 1 bonus action\n   As a bonus action, you expend an Exploit Die to feint, forcing a creature that can see you within 15 feet to make a Wisdom saving throw. On a failure, you have advantage on all attacks against that creature until the end of your current turn."
};
SpellsList["first aid"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (utility)]",
	prereqeval : function(v) { return (v.skillProfs.indexOf("Medicine") !== -1); },
	prerequisite : "Medicine proficiency",
	name : "First Aid",
	classes : ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Skill",
	time : "1 a",
	range : "Touch",
	duration : "Instantaneous",
	description : "Willing living crea regains one Hit Die roll + its Con mod (min 0) per ED spent (up to Prof Bonus)",
	descriptionFull : "Prerequisite: Medicine\n   Execution: 1 action\n   As an action, you touch a willing, living creature and expend Exploit Dice (up to your Proficiency Bonus). For every Exploit Die spent, that creature regains hit points equal to one roll of its Hit Die + its Constitution modifier (minimum of 0)."
};
SpellsList["heroic fortitude"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (utility)]",
	name : "Heroic Fortitude",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Skill",
	time : "Save",
	range : "Self",
	duration : "Instantaneous",
	description : "Add 1 ED to a Str, Dex, or Con saving throw, after rolling but before knowing the result",
	descriptionFull : "Execution: Strength, Dexterity, or Constitution saving throw\n   When you make a Strength, Dexterity, or Constitution saving throw, you can expend an Exploit Die and add it to your roll. You can do so after you roll, but before you know if you fail."
};
SpellsList["hurl"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Str") >= 11) && (v.skillProfs.indexOf("Athletics") !== -1); },
	prerequisite : "Strength of 11, Athletics proficiency",
	name : "Hurl",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "1 atk",
	timeFull : "In place of one attack",
	range : "60 ft",
	duration : "Instantaneous",
	save : "Dex",
	description : "Throw held object; target saves or it and the object take 2 ED + Str mod bludg. dmg; 120 ft range at lvl 11",
	descriptionFull : "Prerequisite: Strength of 11, Athletics\n   Execution: 1 attack\n   In place of an attack, you expend an Exploit Die to throw one object you are holding at a target you can see within 60 feet.\n   The target must succeed on a Dexterity saving throw, or both the thrown object and target take bludgeoning damage equal to two Exploit Dice + your Strength modifier.\n   At 11th level, the range of this Exploit becomes 120 feet."
};
SpellsList["imposing presence"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (utility)]",
	prereqeval : function(v) { return (What("Str") >= 11); },
	prerequisite : "Strength of 11",
	addMod : [{ type : "skill", field : "Intimidation", mod : "max(Str-Cha|0)", text : "I can use Strength instead of Charisma for Intimidation checks" }, { type : "skill", field : "Persuasion", mod : "max(Str-Cha|0)", text : "I can use Strength instead of Charisma for Persuasion checks" }],
	name : "Imposing Presence",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Skill",
	time : "Check",
	range : "Self",
	duration : "Instantaneous",
	description : "I can use Str for Intimidation/Persuasion; when I do, I can expend 1 ED to treat a d20 roll of 7 or lower as 8",
	descriptionFull : "Prerequisite: Strength of 11\n   Execution: Intimidation or Persuasion check\n   You can use Strength, in place of Charisma, when you make an Intimidation or Persuasion check. When you do, you can spend an Exploit Die to treat a d20 roll of 7 or lower as an 8."
};
SpellsList["lunge"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	name : "Lunge",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "1 atk",
	timeFull : "As part of a melee attack on your turn",
	range : "Melee",
	components : "W",
	compMaterial : "Melee attack",
	duration : "Instantaneous",
	description : "Move up to 10 ft before a melee attack (even beyond my speed); on hit, add 1 ED to damage",
	descriptionFull : "Execution: 1 attack\n   When you make a melee attack on your turn, you can spend one Exploit Die and move up to 10 feet immediately before making that attack, even if this would exceed your speed for that turn. On hit, add your Exploit Die to the damage roll."
};
SpellsList["maneuvering order"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (order)]",
	name : "Maneuvering Order",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Order",
	time : "1 atk",
	timeFull : "Forgo one attack of the Attack action",
	range : "30 ft",
	duration : "Instantaneous",
	description : "Ally that sees/hears me can use its reaction to move up to its speed without provoking opportunity attacks",
	descriptionFull : "Execution: 1 attack\n   As part of your Attack action, you can forgo an attack to issue this Order to another creature that can see or hear you within 30 feet, and that creature can use its reaction to move up to its speed without provoking opportunity attacks."
};
SpellsList["mighty leap"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (utility)]",
	prereqeval : function(v) { return (What("Str") >= 11) && (v.skillProfs.indexOf("Athletics") !== -1); },
	prerequisite : "Strength of 11, Athletics proficiency",
	name : "Mighty Leap",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Skill",
	time : "1 bns",
	timeFull : "1 bonus action, after moving at least 10 ft in a line",
	range : "Self",
	duration : "Instantaneous",
	description : "After a 10-ft run, long jump up to 30 ft in a line, even if it exceeds my speed",
	descriptionFull : "Prerequisite: Strength of 11, Athletics\n   Execution: 1 bonus action\n   After you run 10 feet in a line, you can use your bonus action to expend an Exploit Die to long jump up to 30 feet in a line, even if this distance would exceed your speed for that turn."
};
SpellsList["mighty thrust"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Str") >= 11) && (v.skillProfs.indexOf("Athletics") !== -1); },
	prerequisite : "Strength of 11, Athletics proficiency",
	name : "Mighty Thrust",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "1 atk",
	timeFull : "In place of one attack",
	range : "Touch",
	duration : "Instantaneous",
	save : "Str",
	description : "Target saves or is pushed 5\u00d7 Str mod ft (min 5 ft) in a line; distance halved per size larger than me",
	descriptionFull : "Prerequisite: Strength of 11, Athletics\n   Execution: 1 bonus action\n   In place of an attack, you expend an Exploit Die to force one target that you touch to make a Strength saving throw. On a failure, it is knocked back in a line number of feet equal to 5 times your Strength modifier (minimum 5 feet). This distance is halved for every size category the target is larger than you."
};
SpellsList["modify device"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (utility)]",
	prereqeval : function(v) { return (LLhasTool(v, /thie/i) || LLhasTool(v, /tinker/i)); },
	prerequisite : "Thieves' Tools or Tinker's Tools proficiency",
	name : "Modify Device",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Craft",
	time : "1 min",
	range : "Touch",
	components : "M",
	compMaterial : "Thieves' tools or tinker's tools",
	duration : "Instantaneous",
	description : "Change the DC of a deactivated/unlocked trap or lock I can access to my Exploit save DC",
	descriptionFull : "Prerequisite: Thieves' Tools or Tinker's Tools\n   Execution: 1 minute\n   Over the course of 1 minute, you can expend one Exploit Die and use tinker's or thieves' tools to modify a trap or lock you touch, chaning its DC to equal your Exploit save DC.\n   To do so, the trap or lock must be deactivated or unlocked, and you must have access to its inner mechanisms. You can't use this Exploit to modify a trap or lock that cannot be reset, or one that has been destroyed beyond repair."
};
SpellsList["parry"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Dex") >= 11); },
	prerequisite : "Dexterity of 11",
	name : "Parry",
	classes : ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "1 rea",
	timeFull : "1 reaction, which you take when a creature you can see hits you with a melee attack",
	range : "Self",
	components : "W",
	compMaterial : "Finesse or versatile weapon",
	duration : "Instantaneous",
	description : "Add 1 ED to my AC against the triggering melee attack",
	descriptionFull : "Prerequisite: Dexterity of 11\n   Execution: 1 reaction\n   While you are wielding a Finesse or Versatile weapon, and a creature you can see hits you with a melee attack, you use a reaction to expend one Exploit Die and add it to your Armor Class against the triggering attack."
};
SpellsList["precision strike"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Dex") >= 11); },
	prerequisite : "Dexterity of 11",
	name : "Precision Strike",
	classes : ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "1 atk",
	timeFull : "As part of a weapon attack",
	range : "Self",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "Instantaneous",
	description : "Add 1 ED to the attack roll, after rolling but before knowing if it hits",
	descriptionFull : "Prerequisite: Dexterity of 11\n   Execution: 1 attack\n   As part of a weapon attack you can expend one Exploit Die and add it to your attack roll. You can use this Exploit after you roll, but before you know if your attack is a hit or miss."
};
SpellsList["reliable skill"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (utility)]",
	name : "Reliable Skill",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Skill",
	time : "Check",
	range : "Self",
	duration : "Instantaneous",
	description : "On a check with a proficient skill/tool, treat a d20 roll of 7 or lower as an 8",
	descriptionFull : "Execution: ability check\n   Whenever you make an ability check using a skill or tool that you are proficient in and roll a 7 or lower on the d20, you can expend one Exploit Die to treat the d20 roll as an 8."
};
SpellsList["reposition"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	name : "Reposition",
	classes : ["fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "1 bns",
	range : "5 ft",
	duration : "Instantaneous",
	description : "Swap places with a willing conscious crea (no opportunity attacks); one of us gains 1 ED temp HP",
	descriptionFull : "Execution: 1 bonus action\n   As a bonus action, you can expend one Exploit Die to switch places with a conscious and willing creature within 5 feet of you. This movement does not provoke opportunity attacks.\n   After switching, you or the creature you switched places with gains temporary hit points equal to your Exploit Die."
};
SpellsList["riposte"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Dex") >= 11); },
	prerequisite : "Dexterity of 11",
	name : "Riposte",
	classes : ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "1 rea",
	timeFull : "1 reaction, which you take when a creature misses you with a melee attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "Instantaneous",
	description : "Make a melee weapon attack against the attacker; on hit, add 1 ED to damage",
	descriptionFull : "Prerequisite: Dexterity of 11\n   Execution: 1 reaction\n   When a creature misses you with a melee attack, you use a reaction to expend an Exploit Die to make a melee weapon attack against it. On hit, add your Exploit Die to the damage."
};
SpellsList["roguish charm"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (utility)]",
	prereqeval : function(v) { return (What("Cha") >= 11) && (v.skillProfs.indexOf("Persuasion") !== -1); },
	prerequisite : "Charisma of 11, Persuasion proficiency",
	name : "Roguish Charm",
	classes : ["rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Speech",
	time : "1 a",
	range : "10 ft",
	components : "V",
	duration : "1 h",
	save : "Wis",
	description : "1 humanoid saves (adv. if hostile) or charmed for 1 h; ends if harmed; immune 24 h on a success",
	descriptionFull : "Prerequisite: Charisma of 11, Persuasion\n   Execution: 1 action\n   As an action, you can expend one Exploit Die and force one Humanoid who can hear and understand you within 10 feet to make a Wisdom saving throw. If it is Hostile toward you, it does so with advantage. On a failure, it is Charmed by you for 1 hour, treating you as a friendly acquaintance, though it will not risk its life for you.\n   This effect ends if you or your allies do anything harmful to the Charmed creature. If this Exploit's effects end in this way, the creature realizes that it was deceived by you.\n   Once a creature succeeds on its saving throw against this Exploit, it is immune to this effect for the next 24 hours."
};
SpellsList["ruthless strike"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Str") >= 11); },
	prerequisite : "Strength of 11",
	name : "Ruthless Strike",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "Instantaneous",
	description : "On hit, add ED (up to my Prof Bonus) to the damage roll",
	descriptionFull : "Prerequisite: Strength of 11\n   Execution: On hit (melee weapon attack)\n   Whenever you hit a target with a melee weapon attack, you can expend Exploit Dice (up to your Proficiency Bonus) and add them to the damage roll of your attack."
};
SpellsList["savage rebuke"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	name : "Savage Rebuke",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "1 rea",
	timeFull : "1 reaction, which you take when a creature you can see hits you with a melee attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "Instantaneous",
	description : "Make a melee weapon attack against the attacker; on hit, add 1 ED to damage",
	descriptionFull : "Execution: 1 reaction\n   When a creature you can see hits you with a melee attack, you can use your reaction to expend one Exploit Die to make a melee weapon attack against that creature. On hit, you deal additional damage equal to one roll of your Exploit Die."
};
SpellsList["shield impact"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Str") >= 11); },
	prerequisite : "Strength of 11",
	name : "Shield Impact",
	classes : ["fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "1 rea",
	timeFull : "1 reaction, which you take when a creature you can see hits you with an attack",
	range : "Self",
	components : "M",
	compMaterial : "Shield",
	duration : "Instantaneous",
	description : "Reduce the damage of the attack by 1 ED + Str mod (min 1)",
	descriptionFull : "Prerequisite: Strength of 11\n   Execution: 1 reaction\n   When you are wearing a shield and a creature that you can see hits you with an attack, you use your reaction to expend an Exploit Die and reduce the damage of the attack by your Exploit Die + your Strength modifier (minimum of 1)."
};
SpellsList["skilled rider"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (utility)]",
	prereqeval : function(v) { return (v.skillProfs.indexOf("Animal Handling") !== -1); },
	prerequisite : "Animal Handling proficiency",
	name : "Skilled Rider",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Skill",
	time : "Special",
	timeFull : "When a trained mount you ride makes an attack roll, damage roll, ability check, or saving throw",
	range : "Mount",
	components : "M",
	compMaterial : "A trained mount",
	duration : "Instantaneous",
	description : "Add 1 ED to my mount's attack, damage, check, or save, after it rolls but before knowing the result",
	descriptionFull : "Prerequisite: Animal Handling\n   Execution: Mount attack roll, ability check, or saving throw\n   When a trained mount you are riding makes an attack roll, damage roll, ability check, or saving throw, you expend an Exploit Die and add it to your mount's roll. You can do so after it rolls, but before you know if it succeeds or fails."
};
SpellsList["steadfast order"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (order)]",
	name : "Steadfast Order",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Order",
	time : "1 atk",
	timeFull : "Forgo one attack of the Attack action",
	range : "30 ft",
	duration : "1 rnd",
	description : "Ally that sees/hears me adds my Leadership mod (min +1) to Str, Dex, and Con saves until my next turn",
	descriptionFull : "Execution: 1 attack\n   When you take the Attack action, you can forgo an attack to issue this Order to another creature that can see or hear you within 30 feet. Until the beginning of your next turn, it can add your Leadership modifier (minimum of +1) to Strength, Dexterity, and Constitution saving throws."
};
SpellsList["streetwise"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (utility)]",
	prereqeval : function(v) { return (What("Cha") >= 11); },
	prerequisite : "Charisma of 11",
	addMod : [{ type : "skill", field : "History", mod : "max(Cha-Int|0)", text : "In a settlement, I can use Charisma instead of Intelligence for History checks" }, { type : "skill", field : "Investigation", mod : "max(Cha-Int|0)", text : "In a settlement, I can use Charisma instead of Intelligence for Investigation checks" }],
	name : "Streetwise",
	classes : ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Skill",
	time : "Check",
	range : "Self",
	duration : "Instantaneous",
	description : "In settlements, I can use Cha for History/Investigation; when I do, I can treat a d20 roll of 7 or lower as 8",
	descriptionFull : "Prerequisite: Charisma of 11\n   Execution: History or Investigation check\n   You can use Charisma, in place of Intelligence, whenever you make an History or Investigation check while in a settlement. When you do so, you can expend an Exploit Die to treat a d20 roll of 7 or lower as an 8."
};
SpellsList["support order"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (order)]",
	name : "Support Order",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Order",
	time : "1 atk",
	timeFull : "Forgo one attack of the Attack action",
	range : "30 ft",
	duration : "Instantaneous",
	description : "Ally that sees/hears me can immediately take the Help, Hide, Search, or Use an Object action",
	descriptionFull : "Execution: 1 attack\n   As part of your Attack action, you can forgo an attack to issue this Order to another creature that can see or hear you within 30 feet. That creature can immediately take the Help, Hide, Search, or Use an Object action."
};
SpellsList["sweeping strike"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	name : "Sweeping Strike",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "Instantaneous",
	save : "Str/Dex",
	description : "On hit, Str or Dex save (its choice) or +1 ED dmg and knocked prone",
	descriptionFull : "Execution: On hit (melee weapon attack)\n   If you hit a creature with a melee weapon attack, you expend an Exploit Die and force it to make its choice of a Strength or Dexterity saving throw. On a failure, add your Exploit Die to the damage roll and the creature is knocked Prone."
};
SpellsList["taunting strike"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	name : "Taunting Strike",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit a creature within 15 ft with a weapon attack",
	range : "15 ft",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "1 rnd",
	description : "On hit, +1 ED dmg and target has disadv. on attacks vs. others than me until start of my next turn",
	descriptionFull : "Execution: On hit (melee weapon attack)\n   When you hit a creature within 15 feet with a weapon attack, you can expend one Exploit Die to taunt it. Add your Exploit Die to the damage roll, and until the start of your next turn, it has disadvantage on attacks against targets other than you."
};
SpellsList["trampling rush"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	prereqeval : function(v) { return (What("Str") >= 11); },
	prerequisite : "Strength of 11",
	name : "Trampling Rush",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack after moving 20 ft toward the target",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "Instantaneous",
	save : "Str",
	description : "On hit after moving 20 ft toward it, save or +1 ED dmg and knocked prone",
	descriptionFull : "Prerequisite: Strength of 11\n   Execution: On hit (melee weapon attack)\n   If you move at least 20 feet toward a target and hit it with a melee weapon attack, you can expend an Exploit Die to force it to make a Strength saving throw. On a failed save, add your Exploit Die to the damage roll and it is knocked Prone."
};
SpellsList["warding strike"] = {
	isExploit : true,
	submenu : "[1st-degree exploits (combat)]",
	name : "Warding Strike",
	classes : ["fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 1,
	school : "Combat",
	time : "1 rea",
	timeFull : "1 reaction, which you take when a creature you can see moves within your reach",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon",
	duration : "Instantaneous",
	description : "Make a melee weapon attack against the creature; on hit, add 1 ED to damage",
	descriptionFull : "Execution: 1 reaction\n   If a creature you can see moves within the reach of a melee weapon you are wielding, you use your reaction to expend an Exploit Die to make a single melee weapon attack against it. On hit, you add your Exploit Die to the damage roll."
};
SpellsList["arresting critical"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13); },
	prerequisite : "Strength of 13",
	name : "Arresting Critical",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "Crit",
	timeFull : "No action required, when you score a critical hit with a weapon attack",
	range : "Attack",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "1 min",
	save : "Con",
	description : "On crit, target's speed is 0; save at start of each of its turns to end",
	descriptionFull : "Prerequisite: 5th-level, Strength of 13\n   Execution: On a critical hit with a weapon attack\n   When you score a critical hit with a weapon attack, you can expend an Exploit Die to critically disable your target. For 1 minute, its speed is reduced to 0.\n   A crippled target can make a Constitution saving throw at the start of each of its turns, ending this effect on a success."
};
SpellsList["blinding debris"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Dex") >= 13); },
	prerequisite : "Dexterity of 13",
	name : "Blinding Debris",
	classes : ["fighter(laserllama)", "rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "1 bns",
	range : "10 ft",
	duration : "Until removed",
	save : "Dex",
	description : "1 crea saves or is blinded until it uses its action to clear its eyes",
	descriptionFull : "Prerequisite: 5th-level, Dexterity of 13\n   Execution: 1 bonus action\n   As a bonus action, you expend one Exploit Die to force one creature within 10 feet to make a Dexterity saving throw. On a failed save, the creature is Blinded until it uses its action to clear the debris from its eyes."
};
SpellsList["bloodthirsty critical"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13); },
	prerequisite : "Strength of 13",
	name : "Bloodthirsty Critical",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "Crit",
	timeFull : "No action required, when you score a critical hit with a weapon attack",
	range : "Attack",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "Instantaneous",
	description : "On crit, make another weapon attack against the same target, +1 ED dmg on hit; once per turn",
	descriptionFull : "Prerequisite: 5th-level, Strength of 13\n   Execution: On a critical hit with a weapon attack\n   When you score a critical hit with a weapon attack, you can expend an Exploit Die to immediately make another weapon attack against the same target. On hit, add your Exploit Die to the damage roll. You can only use this Exploit once per turn."
};
SpellsList["craft alchemical oil"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (LLhasTool(v, /alchemist/i)); },
	prerequisite : "Alchemist's Supplies proficiency",
	name : "Craft Alchemical Oil",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Craft",
	time : "1 a",
	range : "Self",
	components : "M",
	compMaterial : "Alchemist's supplies",
	duration : "10 min",
	description : "Craft Alchemical Oil (lasts until LR); applied to a weapon, it deals acid/cold/fire/poison/lightning for 10 min",
	descriptionFull : "Prerequisite: 5th-level, Alchemist's Supplies\n   Execution: 1 action\n   As an action, you expend an Exploit Die and use alchemist's supplies to craft a vial of Alchemical Oil, choosing acid, cold, fire, poison, or lightning. This Oil uses the rules below:\n   Consumable. The Alchemical Oil retains its potency until the end of your next long rest, at which point it is inert and unusable. You cannot regain the Exploit Die spent to create the Oil until this Alchemical Oil is spent or destroyed.\n   Applying Oil. A creature can take the Use an Object action to expend this vial and apply it to one weapon it is holding.\n   Alchemical Strike. For the next 10 minutes, that weapon deals the damage type of the Oil in place of its normal type."
};
SpellsList["concussive blow"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13); },
	prerequisite : "Strength of 13",
	name : "Concussive Blow",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "1 rnd",
	save : "Con",
	description : "On hit, save or until my next turn: speed 0, can't speak, disadv. on Dex saves, attacks vs. it have adv.",
	descriptionFull : "Prerequisite: 5th-level, Strength of 13\n   Execution: On hit (melee weapon attack)\n   When you hit a creature with a melee weapon attack, you can expend an Exploit Die to strike with force. It must succeed on a Constitution saving throw or until the start of your next turn its speed is 0, it can't speak, it has disadvantage on Dexterity saving throws, and attack rolls against it have advantage."
};
SpellsList["craft flash bomb"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (LLhasTool(v, /alchemist/i)); },
	prerequisite : "Alchemist's Supplies proficiency",
	name : "Craft Flash Bomb",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Craft",
	time : "1 a",
	range : "60 ft",
	components : "M",
	compMaterial : "Alchemist's supplies",
	duration : "1 min",
	save : "Con",
	description : "Craft Flash Bomb (lasts until LR); thrown: crea within 20 ft that see it save or blinded 1 min",
	descriptionFull : "Prerequisite: 5th-level, Alchemist's Supplies\n   Execution: 1 action\n   As an action, you expend an Exploit Die and use alchemist's supplies to craft a Flash Bomb which uses the rules here:\n   Consumable. The Flash Bomb retains potency until the end of your next long rest, then it becomes unusable. You cannot regain the Exploit Die you spent to create this Flash Bomb until this Flash Bomb is spent or destroyed.\n   Using the Bomb. Any creature can take the Use an Object action to throw this Smoke Bomb at a point within 60 feet. It explodes on impact, forcing creatures that can see within 20 feet to make a Constitution saving throw or be Blinded for 1 minute. Targets with sunlight sensitivity have disadvantage.\n   A Blinded creature can repeat this saving throw at the end of each of its turns, ending the effect on a success."
};
SpellsList["craft greater trap"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (LLhasTool(v, /thie/i) || LLhasTool(v, /tinker/i)); },
	prerequisite : "Thieves' Tools or Tinker's Tools proficiency",
	name : "Craft Greater Trap",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Craft",
	time : "1 a",
	range : "5 ft",
	components : "M",
	compMaterial : "Thieves' tools or tinker's tools",
	duration : "Until LR",
	save : "Dex",
	description : "Craft Greater Trap (lasts until LR); first Large or smaller crea save or 2 ED piercing, prone/poisoned, restrained",
	descriptionFull : "Prerequisite: 5th-level, Thieves' Tools or Tinker's Tools\n   Execution: 1 action\n   As an action, you can expend one Exploit Die and use tools, natural materials, and adventuring supplies to craft a Greater Trap. This Greater Trap uses the following rules:\n   Consumable. The Trap remains functional until the end of your next long rest, then it reverts to the raw material used to craft it. You cannot regain the Exploit Die spent to create this Trap until the Trap is triggered or destroyed.\n   Setting the Trap. Any creature can take the Use an Object action to set the Trap in an unoccupied, adjacent 5-foot space.\n   Triggering the Trap. The first Large or smaller creature to enter the Trap's space must make a Dexterity saving throw. If it is unaware of the Trap, it has disadvantage on this saving throw. On a failure, the creature suffers the following effects:\n   It takes piercing damage equal to two Exploit Die.\n   It is knocked Prone or Poisoned (your choice at creation)\n   It becomes Restrained in the space by the Trap.\n   A creature can use its action to repeat the Dexterity saving throw against the Greater Trap, escaping on a success."
};
SpellsList["craft simple poison"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (LLhasTool(v, /poison/i)); },
	prerequisite : "Poisoner's Kit proficiency",
	name : "Craft Simple Poison",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Craft",
	time : "1 a",
	range : "Self",
	components : "M",
	compMaterial : "Poisoner's kit",
	duration : "1 min",
	save : "Con",
	description : "Craft Simple Poison (lasts until LR); next hit deals poison dmg and target saves or poisoned 1 min",
	descriptionFull : "Prerequisite: 5th-level, Poisoner's Kit\n   Execution: 1 action\n   As an action, you expend an Exploit Die and use a Poisoner's it to craft one vial of Simple Poison. It uses the rules below:\n   Consumable. The Poison retains its potency until the end of your next long rest, at which point it is inert and unusable. You cannot regain the Exploit Die spent to create the Poison until this Simple Poison is spent or destroyed.\n   Applying Poison. Any creature can take the Use an Object action to expend this vial of Minor Poison and apply it to one weapon or piece of ammunition it is holding.\n   Poisoned Strike. The next time the Poisoned object deals damage to a creature, the damage type is changed to poison, and the target must succeed on a Constitution saving throw or become Poisoned for 1 minute.\n   The Poisoned creature can repeat this saving throw at the end of each of its turns, ending the effect on a success."
};
SpellsList["crescendo of violence"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	name : "Crescendo of Violence",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Order",
	time : "1 rea",
	timeFull : "1 reaction, which you take when another creature within 30 ft that can see or hear you scores a critical hit",
	range : "30 ft",
	duration : "1 min",
	description : "Grant the critting crea temp HP equal to ED spent (up to Prof Bonus) + my Leadership mod",
	descriptionFull : "Prerequisite: 5th-level\n   Execution: 1 reaction\n   When another creature within 30 feet that can see or hear you scores a critical hit, you can use your reaction to spend Exploit Dice (up to your Proficiency Bonus), and grant that creature temporary hit points equal to the Exploit Dice you spent + your Leadership modifier.\n   Temporary hit points from this Exploit last for 1 minute."
};
SpellsList["crippling strike"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	name : "Crippling Strike",
	classes : ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a weapon attack",
	range : "Attack",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "1 rnd",
	save : "Con",
	description : "On hit, save or +1 ED dmg and blinded, deafened, or can't speak (my choice) until my next turn",
	descriptionFull : "Prerequisite: 5th-level\n   Execution: On hit (weapon attack)\n   When you hit a target with a weapon attack, you can expend an Exploit Die to attack one of its senses, forcing it to make a Constitution saving throw. On a failure, add your Exploit Die to the damage roll, and it is Blinded, Deafened, or can't speak (your choice) until the beginning of your next turn."
};
SpellsList["defensive stance"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Con") >= 13); },
	prerequisite : "Constitution of 13",
	name : "Defensive Stance",
	classes : ["fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "1 bns",
	range : "Self",
	duration : "Until I move",
	description : "Until I move or am incapacitated, add 1 ED to my AC against attacks I can see",
	descriptionFull : "Prerequisite: 5th-level, Constitution of 13\n   Execution: 1 bonus action\n   As a bonus action, you can expend one Exploit Die to enter a defensive stance which lasts until you move from your spot or you are Incapacitated. In this stance, you add one Exploit Die to your Armor Class against any attack that you can see."
};
SpellsList["dirty hit"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Dex") >= 13); },
	prerequisite : "Dexterity of 13",
	name : "Dirty Hit",
	classes : ["fighter(laserllama)", "rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "1 rnd",
	save : "Con",
	description : "On hit, save or +1 ED dmg, falls prone, and can't take reactions until start of my next turn",
	descriptionFull : "Prerequisite: 5th-level, Dexterity of 13\n   Execution: 1 bonus action\n   When you hit a creature with a melee weapon attack, you can expend an Exploit Die to strike at a vulnerable point to force it to make a Constitution saving throw. On a failure, add your Exploit Die to the damage roll, the creature falls Prone, and it cannot take reactions until the start of your next turn."
};
SpellsList["enlivening order"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	name : "Enlivening Order",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Order",
	time : "1 atk",
	timeFull : "Forgo one attack of the Attack action",
	range : "30 ft",
	duration : "1 rnd",
	description : "Ally gets +5\u00d7 Leadership mod ft speed (min 5), double jump distance, adv. on Acrobatics/Athletics",
	descriptionFull : "Prerequisite: 5th-level\n   Execution: 1 attack\n   As part of your Attack action, you can forgo an attack to issue this Order to another creature that can see or hear you within 30 feet. Until the start of your next turn, that creature's speed increases by 5 times your Leadership modifier (a minimum of 5 feet), the distance it can long and high jump doubles, and it has advantage on all Acrobatics and Athletics checks."
};
SpellsList["exposing strike"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	name : "Exposing Strike",
	classes : ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a weapon attack",
	range : "Attack",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "1 rnd",
	description : "On hit, the first attack vs. the target before my next turn has adv. and deals +1 ED dmg",
	descriptionFull : "Prerequisite: 5th-level\n   Execution: On hit (weapon attack)\n   When you hit a target with a weapon attack, you can expend an Exploit Die to weaken it. The first attack made against it before the start of your next turn has advantage, and on hit, that attack deals bonus damage equal to your Exploit Die."
};
SpellsList["glancing blow"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	name : "Glancing Blow",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "Miss",
	timeFull : "No action required, when you miss with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "Instantaneous",
	description : "On a miss, repeat the attack against another target within reach; on hit, add 1 ED to damage",
	descriptionFull : "Prerequisite: 5th-level\n   Execution: On hit (melee weapon attack)\n   When you make a melee weapon attack and miss, you can expend an Exploit Die to immediately repeat your attack against another target within the reach of your weapon. On hit, add your Exploit Die to the damage roll of that attack."
};
SpellsList["grasp of night"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Wis") >= 13); },
	prerequisite : "Wisdom of 13",
	name : "Grasp of Night",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "1 atk",
	timeFull : "In place of one attack",
	range : "Touch",
	duration : "10 min",
	description : "If crea's HP \u2264 3\u00d7 ED spent (up to Prof Bonus) + Wis mod, it falls unconscious for 10 min",
	descriptionFull : "Prerequisite: 5th-level, Wisdom of 13\n   Execution: 1 attack\n   In place of an attack, you can expend Exploit Dice (up to your Proficiency Bonus) to touch a creature, attempting to knock it out. If the creature's remaining hit points are equal to or less than three times the Exploit Dice you spent + your Wisdom modifier, it falls asleep, and is Unconscious for 10 minutes.\n   It wakes up if it takes damage or another creature uses an action to shake or slap the sleeping target awake."
};
SpellsList["heroic will"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	name : "Heroic Will",
	classes : ["fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Skill",
	time : "Save",
	range : "Self",
	duration : "Instantaneous",
	description : "Add 1 ED to an Int, Wis, or Cha saving throw, after rolling but before knowing the result",
	descriptionFull : "Prerequisite: 5th-level\n   Execution: Intelligence, Wisdom, or Charisma saving throw\n   When you make an Intelligence, Wisdom, or Charisma saving throw, you can expend one Exploit Die and add it to your roll. You can do so after you roll, but before you know if you fail."
};
SpellsList["hold the line"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13 || What("Con") >= 13); },
	prerequisite : "Strength or Constitution of 13",
	name : "Hold the Line",
	classes : ["fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "1 bns",
	range : "10-ft rad",
	duration : "Until I move",
	description : "I and allies within 10 ft wielding a weapon/shield gain half cover, also vs. checks/saves to be moved",
	descriptionFull : "Prerequisite: 5th-level, Strength or Constitution of 13\n   Execution: 1 bonus action\n   As a bonus action, you can expend an Exploit Die to form your allies into a defensive position. You and allied creatures within 10 feet that are wielding a weapon or shield have the benefits of half cover, which also applies to ability checks and saving throws to avoid being moved against your will.\n   This Exploit's effects end for all creatures if you leave your space, and they have no effect on Incapacitated creatures."
};
SpellsList["honor duel"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Cha") >= 13); },
	prerequisite : "Charisma of 13",
	name : "Honor Duel",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Speech",
	time : "1 bns",
	range : "15 ft",
	components : "V",
	duration : "1 min",
	save : "Wis",
	description : "Target has disadv. on attacks vs. others than me; save at end of each turn; ends if I target another",
	descriptionFull : "Prerequisite: 5th-level, Charisma of 13\n   Execution: 1 bonus action\n   As a bonus action, you expend an Exploit Die and challenge a creature within 15 feet that can hear and understand you. For 1 minute, it has disadvantage on attacks against targets other than you. This effect ends if you target another creature with an attack, ability check, or saving throw.\n   The creature can make Wisdom saving throw at the end of each of its turns, ending this effect on a success."
};
SpellsList["immovable stance"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13 || What("Con") >= 13); },
	prerequisite : "Strength or Constitution of 13",
	name : "Immovable Stance",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "1 bns",
	range : "Self",
	duration : "Until I move",
	save : "Str",
	description : "Crea trying to grapple, move, or move through me must save first or I grapple it or knock it prone",
	descriptionFull : "Prerequisite: 5th-level, Strength or Constitution of 13\n   Execution: 1 bonus action\n   As a bonus action, you can expend an Exploit Die to enter an immovable stance that lasts until you move from your space.\n   For the duration, when a creature attempts to Grapple you, move you, or move through you, it first must make a Strength saving throw. On a failure, you Grapple it or knock it Prone."
};
SpellsList["intimidating command"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Cha") >= 13); },
	prerequisite : "Charisma of 13",
	name : "Intimidating Command",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Speech",
	time : "1 bns",
	range : "30 ft",
	components : "V",
	duration : "1 rnd",
	save : "Wis",
	description : "1 crea that hears me saves or obeys a one-word command on its next turn (not directly harmful)",
	descriptionFull : "Prerequisite: 5th-level, Charisma of 13\n   Execution: 1 bonus action\n   As a bonus action, you can expend an Exploit Die to shout a one-word command at a creature that can hear you within 30 feet, forcing it to make a Wisdom saving throw. On a failure, it is compelled to obey your command to the best of its ability on its next turn unless its actions are directly harmful to it."
};
SpellsList["insightful order"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Int") >= 13); },
	prerequisite : "Intelligence of 13",
	name : "Insightful Order",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Order",
	time : "1 atk",
	timeFull : "Forgo one attack of the Attack action",
	range : "30 ft",
	duration : "1 rnd",
	description : "Ally adds my Leadership mod to the first attack roll it makes before the start of my next turn",
	descriptionFull : "Prerequisite: 5th-level, Intelligence of 13\n   Execution: 1 attack\n   As part of your Attack action, you can forgo an attack to issue this Order to another creature that can see or hear you within 30 feet. The target adds your Leadership modifier to the first attack roll it makes before the start of your next turn."
};
SpellsList["knock out"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13); },
	prerequisite : "Strength of 13",
	name : "Knock Out",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with an unarmed strike",
	range : "Melee",
	components : "W",
	compMaterial : "Unarmed strike",
	duration : "1 h",
	description : "Roll 4 ED per ED spent (up to Prof Bonus) + Str mod; if \u2265 crea's HP, it falls unconscious for 1 h",
	descriptionFull : "Prerequisite: 5th-level, Strength of 13\n   Execution: On hit (unarmed strike)\n   When you hit a creature with an unarmed strike, you expend Exploit Dice (up to your Proficiency Bonus) in an attempt to knock it out. Roll four Exploit Dice for each Exploit Die you spent, adding your Strength modifier to the total. If that total meets or exceeds the creature's remaining hit points, it falls Unconscious for 1 hour.\n   It wakes up early if it takes damage or regains hit points."
};
SpellsList["martial focus"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	name : "Martial Focus",
	classes : ["fighter(laserllama)", "rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "1 atk",
	timeFull : "As part of a weapon attack",
	range : "Self",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "Instantaneous",
	description : "Gain adv. on the attack roll, even after rolling but before knowing if it hits",
	descriptionFull : "Prerequisite: 5th-level\n   Execution: Part of a weapon attack\n   As part of a weapon attack you can expend an Exploit Die to gain advantage on your attack roll. You can use this Exploit after you roll, but before you know if you hit or miss."
};
SpellsList["menacing shout"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Con") >= 13 || What("Cha") >= 13); },
	prerequisite : "Constitution or Charisma of 13",
	name : "Menacing Shout",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Speech",
	time : "1 bns",
	range : "30 ft",
	components : "V",
	duration : "1 rnd",
	save : "Wis",
	description : "1 crea that hears me saves or is frightened of me until the end of my next turn",
	descriptionFull : "Prerequisite: 5th-level, Constitution or Charisma of 13\n   Execution: 1 bonus action\n   As a bonus action, you can expend an Exploit Die to force a creature within 30 feet that can hear you to make a Wisdom saving throw. On a failure, it is Frightened of you until the end of your next turn, or until you are Incapacitated."
};
SpellsList["mighty blow"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13); },
	prerequisite : "Strength of 13",
	name : "Mighty Blow",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "Instantaneous",
	save : "Str",
	description : "On hit, +1 ED dmg; save (adv. if larger than me) or pushed 5\u00d7 Str mod ft in a line",
	descriptionFull : "Prerequisite: 5th-level, Strength of 13\n   Execution: On hit (melee weapon attack)\n   When you hit with a melee weapon attack, you can expend an Exploit Die to empower your strike with great force. You deal bonus damage equal to your Exploit Die and your target must succeed on a Strength saving throw or be knocked back in a line a number of feet equal to 5 times your Strength modifier. Targets larger than you have advantage on this saving throw."
};
SpellsList["mighty hurl"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13) && (v.skillProfs.indexOf("Athletics") !== -1); },
	prerequisite : "Strength of 13, Athletics proficiency",
	name : "Mighty Hurl",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "1 atk",
	timeFull : "In place of one attack",
	range : "30 ft",
	duration : "Instantaneous",
	save : "Str",
	description : "Throw a smaller crea (my size with 2 hands) 30 ft; lands prone; if it hits a crea, both may take 1 ED + Str",
	descriptionFull : "Prerequisite: 5th-level, Strength of 13, Athletics\n   Execution: 1 attack\n   In place of an attack, you can expend an Exploit Die to touch a target at least one size smaller than you, forcing it to make a Strength saving throw. On a failure, you throw it to a space you can see within 30 feet. It can choose to fail. If you use two free hands, you can target a creature equal to your size.\n   If thrown into an unoccupied space, an unwilling creature lands Prone. If thrown into another creature, it must succeed on a Dexterity saving throw or both take bludgeoning damage equal to your Exploit Die + your Strength modifier.\n   A feature that increases the size of targets you can Grapple increases the size of targets you can throw with this Exploit."
};
SpellsList["pinning shot"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13 || What("Dex") >= 13); },
	prerequisite : "Strength or Dexterity of 13",
	name : "Pinning Shot",
	classes : ["fighter(laserllama)", "rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a ranged or thrown weapon attack",
	range : "Attack",
	components : "W",
	compMaterial : "Ranged or thrown weapon attack",
	duration : "Instantaneous",
	save : "Dex",
	description : "On hit, save or +1 ED dmg and speed 0; it can use an action for a Str check to end",
	descriptionFull : "Prerequisite: 5th-level, Strength or Dexterity of 13\n   Execution: On hit (ranged or thrown weapon attack)\n   When you hit a creature with a ranged or thrown weapon attack, you can expend an Exploit Die and force it to make a Dexterity saving throw. On a failure, add the Exploit Die to the damage and its speed becomes 0.\n   As an action, the creature can make a Strength check, and on a success the effects of this Exploit end."
};
SpellsList["primal senses"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (v.skillProfs.indexOf("Perception") !== -1); },
	prerequisite : "Perception proficiency",
	name : "Primal Senses",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Skill",
	time : "1 a",
	range : "Self",
	duration : "10 min",
	description : "+1 ED to sight/smell Insight, Perception, Survival; smell poisons, poisonous creas, diseases in 30 ft",
	descriptionFull : "Prerequisite: 5th-level, Perception\n   Execution: 1 action\n   As an action, you can expend one Exploit Die to temporarily heighten your senses. For 10 minutes you gain a bonus to all Insight, Perception, and Survival checks equal to your Exploit Die, so long as the checks rely on your sense of sight or smell.\n   You can also smell the presence and location of all poisons, poisonous creatures, and diseases within 30 feet, and identify the kind of poison, poisonous creature, or disease.\n   This heightened sense of smell cannot penetrate full cover."
};
SpellsList["redirect"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	name : "Redirect",
	classes : ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "1 rea",
	timeFull : "1 reaction, which you take when a creature you can see misses you with a melee attack",
	range : "Melee",
	duration : "Instantaneous",
	description : "The attacker must attack another crea of my choice in its range, adding 1 ED to its attack roll",
	descriptionFull : "Prerequisite: 5th-level\n   Execution: 1 reaction\n   When a creature you can see misses you with a melee attack, you can use your reaction to expend an Exploit Die and force it to attack another creature of your choice within range of its attack, adding your Exploit Die to its attack roll."
};
SpellsList["rending strike"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13); },
	prerequisite : "Strength of 13",
	name : "Rending Strike",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "Until repaired",
	save : "Dex",
	description : "On hit, save or +1 ED dmg and -1 AC until repaired (cumulative)",
	descriptionFull : "Prerequisite: 5th-level, Strength of 13\n   Execution: On hit (melee weapon attack)\n   When you hit a target with a melee weapon attack, you can expend one Exploit Die to target its defenses and force it to make a Dexterity saving throw. On a failure, add your Exploit Die to your damage roll, and its Armor Class is reduced by 1 until the damage is repaired. This effect is cumulative."
};
SpellsList["rejuvenating order"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	name : "Rejuvenating Order",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Order",
	time : "1 atk",
	timeFull : "Forgo one attack of the Attack action",
	range : "30 ft",
	duration : "Instantaneous",
	description : "Ally can immediately repeat one saving throw to end one condition affecting it",
	descriptionFull : "Prerequisite: 5th-level\n   Execution: 1 attack\n   As part of your Attack action, you can forgo an attack to issue this Order to another creature that can see or hear you within 30 feet. That creature can instantly repeat one saving throw to end one condition currently affecting it."
};
SpellsList["resilient order"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	name : "Resilient Order",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Order",
	time : "1 atk",
	timeFull : "Forgo one attack of the Attack action",
	range : "30 ft",
	duration : "1 rnd",
	description : "Ally adds my Leadership mod (min +1) to Int, Wis, and Cha saves until my next turn",
	descriptionFull : "Prerequisite: 5th-level\n   Execution: 1 attack\n   When you take the Attack action, you can forgo an attack to issue this Order to a creature that can see or hear you within 30 feet. Until the beginning of your next turn, it can add your Leadership modifier (minimum of +1) to Wisdom, Charisma, and Intelligence saving throws."
};
SpellsList["ringing critical"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13); },
	prerequisite : "Strength of 13",
	name : "Ringing Critical",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "Crit",
	timeFull : "No action required, when you score a critical hit with a weapon attack",
	range : "Attack",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "1 min",
	save : "Wis",
	description : "On crit, target subtracts 1d4 from its attacks and saves; save at end of each of its turns to end",
	descriptionFull : "Prerequisite: 5th-level, Strength of 13\n   Execution: On a critical hit with a weapon attack\n   When you score a critical hit on a creature with a weapon attack, you can expend an Exploit Die to daze your target. For 1 minute, that creature must roll a d4 and subtract the result from every attack roll and saving throw it makes.\n   The creature can make a Wisdom saving throw at the end of each of its turns, ending this effect on a success."
};
SpellsList["ringing strike"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13); },
	prerequisite : "Strength of 13",
	name : "Ringing Strike",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "1 min",
	save : "Wis",
	description : "On hit, save or -1d4 to its attacks, checks, and saves; save at end of each of its turns to end",
	descriptionFull : "Prerequisite: 5th-level, Strength of 13\n   Execution: On hit (melee weapon attack)\n   When you hit a creature with a melee weapon attack, you can expend an Exploit Die and force it to make a Wisdom saving throw. On a failure, it must subtract 1d4 from all attack rolls, ability checks, and saving throws the next minute.\n   The creature can repeat this Wisdom saving throw at the end of each of its turns, ending this effect on a success."
};
SpellsList["shattering slam"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13); },
	prerequisite : "Strength of 13",
	name : "Shattering Slam",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "1 atk",
	timeFull : "In place of one attack",
	range : "5-ft rad",
	duration : "Instantaneous",
	save : "Str",
	description : "Area becomes difficult terrain; creas save or ED spent (up to PB) + Str bludg. dmg and prone; half on save",
	descriptionFull : "Prerequisite: 5th-level, Strength of 13\n   Execution: 1 attack\n   In place of an attack, you can strike the ground and expend Exploit Dice (up to your Proficiency Bonus), turning the area within 5 feet of you into difficult terrain.\n   Creatures in that area must make a Strength saving throw. On a failure, creatures take bludgeoning damage equal to the Exploit Dice spent + your Strength modifier and fall Prone. On a success, they take half damage and do not fall Prone."
};
SpellsList["soothing speech"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (v.skillProfs.indexOf("Persuasion") !== -1); },
	prerequisite : "Persuasion proficiency",
	name : "Soothing Speech",
	classes : ["rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Speech",
	time : "1 a",
	range : "20 ft",
	components : "V",
	duration : "10 min",
	save : "Cha",
	description : "Creas that hear me save or become indifferent to all creas they see; ends if harmed or forced to save",
	descriptionFull : "Prerequisite: 5th-level, Persuasion\n   Execution: 1 action\n   As an action, you expend one Exploit Die and speak to all creatures that can hear and understand you within 20 feet, forcing them to make a Charisma saving throw. On a failed save, creatures become Indifferent toward any creature that they can see for the next 10 minutes.\n   This effect ends if a creature takes damage, is forced to make a saving throw, or it witnesses an ally being harmed."
};
SpellsList["surprise attack"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Int") >= 13); },
	prerequisite : "Intelligence of 13",
	name : "Surprise Attack",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Order",
	time : "1 a",
	range : "30 ft",
	duration : "Instantaneous",
	description : "Another crea that sees/hears me makes one weapon attack with adv.; on hit, +1 ED dmg",
	descriptionFull : "Prerequisite: 5th-level, Intelligence of 13\n   Execution: 1 action\n   As an action, you can expend one Exploit Die to command another creature that can see or hear you within 30 feet to immediately make a single weapon attack with advantage. On hit, it deals bonus damage equal to your Exploit Die."
};
SpellsList["survey dungeon"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Dex") >= 13 || What("Int") >= 13); },
	prerequisite : "Dexterity or Intelligence of 13",
	name : "Survey Dungeon",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Skill",
	time : "10 min",
	range : "Room",
	duration : "Instantaneous",
	description : "Learn one: a trap, an active spell of level \u2264 my Int mod, or a secret compartment/door/passage",
	descriptionFull : "Prerequisite: 5th-level, Dexterity or Intelligence of 13\n   Execution: 10 minutes\n   You can expend an Exploit Die to spend 10 minutes carefully examining a room, gaining knowledge of one of the following:\n   One natural or mechanical trap within the area.\n   One active spell in the area that was cast at a level\n   equal to your Intelligence modifier or lower.\n   One secret compartment, door, or passageway."
};
SpellsList["trick shot"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Dex") >= 13 || What("Int") >= 13); },
	prerequisite : "Dexterity or Intelligence of 13",
	name : "Trick Shot",
	classes : ["fighter(laserllama)", "rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "1 atk",
	timeFull : "As part of a ranged or thrown attack with a finesse weapon",
	range : "Attack",
	components : "W",
	compMaterial : "Finesse weapon (ranged or thrown attack)",
	duration : "Instantaneous",
	description : "Attack can't have disadv. and ignores cover if it can ricochet; on hit, add 1 ED to damage",
	descriptionFull : "Prerequisite: 5th-level, Dexterity or Intelligence of 13\n   Execution: 1 attack\n   Any time you make a ranged or thrown attack with a Finesse weapon, you can expend an Exploit Die to make a Trick Shot.\n   This special attack can't have disadvantage, and it ignores cover, so long as it can ricochet off a single surface and hit a target. On hit, add your Exploit Die to the damage roll."
};
SpellsList["volley"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Dex") >= 13); },
	prerequisite : "Dexterity of 13",
	name : "Volley",
	classes : ["fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "1 a",
	range : "Weapon",
	components : "W",
	compMaterial : "Ranged weapon with ammunition",
	duration : "Instantaneous",
	save : "Dex",
	description : "Creas of my choice within 5 ft of a point save or take weapon dmg; half on success",
	descriptionFull : "Prerequisite: 5th-level, Dexterity of 13\n   Execution: 1 action\n   As an action, you can expend one Exploit Die to fire a volley of ammunition at a point you can see within normal range of your weapon, forcing creatures of your choice within 5 feet of that point to make a Dexterity saving throw. Creatures take damage as if they were hit by an attack with your weapon on a failure, and half as much damage on a success."
};
SpellsList["whirlwind strike"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13 || What("Dex") >= 13); },
	prerequisite : "Strength or Dexterity of 13",
	name : "Whirlwind Strike",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "1 atk",
	timeFull : "In place of one attack",
	range : "Reach",
	components : "W",
	compMaterial : "Melee weapon",
	duration : "Instantaneous",
	save : "Dex",
	description : "Targets of my choice within reach save or take one hit of weapon dmg; half on success",
	descriptionFull : "Prerequisite: 5th-level, Strength or Dexterity of 13\n   Execution: 1 attack\n   In place of an attack, you can expend an Exploit Die to force targets of your choice within your reach to make a Dexterity saving throw. Targets take damage as if they were hit by one attack with your weapon on a failure, and half on a success."
};
SpellsList["wild charge"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	name : "Wild Charge",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Order",
	time : "1 a",
	range : "30 ft",
	duration : "Instantaneous",
	save : "Str",
	description : "Ally moves up to its speed to a hostile and makes a melee attack: +1 ED dmg and same size or smaller saves or prone",
	descriptionFull : "Prerequisite: 5th-level\n   Execution: 1 action\n   As an action, you can expend one Exploit Die and choose another creature that can see or hear you within 30 feet. It can immediately move up to its speed toward a hostile creature and make one melee weapon attack against it.\n   On hit, it deals additional damage equal to your Exploit Die, and if the target is equal to its size or smaller, it must succeed on a Strength saving throw or fall prone."
};
SpellsList["zephyr slash"] = {
	isExploit : true,
	submenu : "[2nd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 13 || What("Dex") >= 13); },
	prerequisite : "Strength or Dexterity of 13",
	name : "Zephyr Slash",
	classes : ["fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 2,
	school : "Combat",
	time : "1 a",
	range : "30-ft line",
	components : "W",
	compMaterial : "Melee weapon",
	duration : "Instantaneous",
	save : "Dex",
	description : "Move 30 ft in a line (no opportunity attacks); creas passed save or take one hit of weapon dmg; half on save",
	descriptionFull : "Prerequisite: 5th-level, Strength or Dexterity of 13\n   Execution: 1 action\n   As an action, you can expend an Exploit Die, flourish a melee weapon, then instantly move up to 30 feet in a line, forcing all creatures you pass through to make a Dexterity saving throw. Creatures take damage as if they were hit by one attack with on a failure, and half as much damage on a success.\n   This movement does not provoke opportunity attacks."
};
SpellsList["adrenaline rush"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Con") >= 15); },
	prerequisite : "Constitution of 15",
	name : "Adrenaline Rush",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "1 bns",
	range : "Self",
	duration : "1 min",
	description : "For 1 min, I can Dash as a bonus action on each of my turns (including this one)",
	descriptionFull : "Prerequisite: 9th-level, Constitution of 15\n   Execution: 1 bonus action\n   As a bonus action, you can expend an Exploit Die to increase your speed, if only temporarily. For the next minute, you can take the Dash action as a bonus action on each of your turns, including the bonus action you used to use this Exploit."
};
SpellsList["armored stance"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Con") >= 15); },
	prerequisite : "Constitution of 15",
	name : "Armored Stance",
	classes : [],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "1 bns",
	range : "Self",
	duration : "Until I move",
	description : "Until I move, resistance to bludg./piercing/slashing and adv. on Str and Con saves",
	descriptionFull : "Prerequisite: 9th-level, Constitution of 15\n   Execution: 1 bonus action\n   As a bonus action, you can expend an Exploit Die to enter an armored stance which lasts until you move from your current space. While in this stance you are Resistant to bludgeoning, piercing, and slashing damage, and you have advantage on all Strength and Constitution saving throws."
};
SpellsList["bewildering blow"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 15 || What("Dex") >= 15); },
	prerequisite : "Strength or Dexterity of 15",
	name : "Bewildering Blow",
	classes : ["barbarian(laserllama)", "rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "1 min",
	save : "Wis",
	description : "On hit, +2 ED dmg; save or no reactions, moves randomly and attacks a random crea; save each turn",
	descriptionFull : "Prerequisite: 9th-level, Strength or Dexterity of 15\n   Execution: On hit (melee weapon attack)\n   When you hit a creature with a melee weapon attack, you can expend an Exploit Die to deal additional damage equal to two Exploit Dice and forcing it to make a Wisdom saving throw.\n   On a failure, it cannot take reactions and it must use each of its turns to move in a random direction (determined by d8) then make a melee attack against a random creature within its reach (determined by d4, or larger if more targets).\n   These effects last for 1 minute. The creature repeats this Wisdom saving throw at the end of each of its turns, ending these effects on a success."
};
SpellsList["confounding critical"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 15); },
	prerequisite : "Strength of 15",
	name : "Confounding Critical",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "Crit",
	timeFull : "No action required, when you score a critical hit with a weapon attack",
	range : "Attack",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "1 min",
	save : "Int",
	description : "On crit, target subtracts 1d6 from attacks, checks, and concentration saves; save each turn",
	descriptionFull : "Prerequisite: 9th-level, Strength of 15\n   Execution: On a critical hit with a weapon attack\n   When you score a critical hit on a creature with a weapon attack, you can expend an Exploit Die to strike its head. For 1 minute, it must subtract a d6 from every attack roll, ability check, or saving throw it makes to maintain concentration.\n   The creature makes an Intelligence saving throw at the end of each of its turns, ending this effect on a success."
};
SpellsList["craft expert poison"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (LLhasTool(v, /poison/i)); },
	prerequisite : "Poisoner's Kit proficiency",
	name : "Craft Expert Poison",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Craft",
	time : "1 a",
	range : "Self",
	components : "M",
	compMaterial : "Poisoner's kit",
	duration : "1 min",
	save : "Con",
	description : "Craft Expert Poison: +ED spent (up to PB) poison dmg; save or disadv. atk/checks, half speed, no reactions",
	descriptionFull : "Prerequisite: 9th-level, Poisoner's Kit\n   Execution: 1 action\n   As an action on your turn, you can expend Exploit Dice (up to your Proficiency Bonus) and use a Poisoner's Kit to craft a single vial of Expert Poison. It uses the rules below:\n   Consumable. The Poison retains its potency until the end of your next long rest, at which point it is inert and unusable. You cannot regain the Exploit Dice spent to create the Poison until this Expert Poison is spent or destroyed.\n   Applying Poison. Any creature can take the Use an Object action to expend a vial of Expert Poison and apply it to one weapon or piece of ammunition it is holding.\n   Poisoned Strike. The next time the Poisoned object deals damage to a creature, it deals bonus poison damage equal to the Exploit Dice spent in its creation, and the creature must make a Constitution saving throw or it suffers the following effects for 1 minute:\n   It has disadvantage on all attack rolls and ability checks.\n   Its speed is halved, and it cannot take reactions.\n   The creature can repeat this Constitution saving throw at the end of each of its turns. On a success, the effect ends, but on a failure, it takes poison damage equal to your Exploit Die."
};
SpellsList["craft expert trap"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (LLhasTool(v, /thie/i) || LLhasTool(v, /tinker/i)); },
	prerequisite : "Thieves' Tools or Tinker's Tools proficiency",
	name : "Craft Expert Trap",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Craft",
	time : "1 a",
	range : "10 ft",
	components : "M",
	compMaterial : "Thieves' tools or tinker's tools",
	duration : "Until LR",
	save : "Dex",
	description : "Craft Expert Trap: first Large or smaller crea save or 3 ED bludg./pierc., stunned + restrained",
	descriptionFull : "Prerequisite: 9th-level, Thieves' Tools or Tinker's Tools\n   Execution: 1 action\n   As an action, you can expend one Exploit Die and use tools, natural materials, and adventuring supplies to craft a single Expert Trap. This Expert Trap uses the rules below:\n   Consumable. The Trap remains functional until the end of your next long rest, then it reverts to the raw material used to craft it. You cannot regain the Exploit Die spent to create this Trap until the Trap is triggered or destroyed.\n   Setting the Trap. Any creature can take the Use an Object action to set a Trap in an unoccupied, adjacent 10-foot space.\n   Triggering the Trap. The first Large or smaller creature to enter the Trap's space must make a Dexterity saving throw. If it is unaware of the Trap, it has disadvantage on this saving throw. On a failure, the creature suffers the following effects:\n   It takes bludgeoning or piercing damage equal to three\n   Exploit Dice (choose the damage at creation).\n   It is Stunned and Restrained in the space by the Trap.\n   At the end of each of its turns, a creature caught in the Trap makes an Intelligence or Wisdom (its choice) check against your Exploit save DC, escaping from the Trap on a success."
};
SpellsList["daring rescue"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	name : "Daring Rescue",
	classes : ["fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "1 rea",
	timeFull : "1 reaction, which you take when a friendly creature you can see within 30 ft drops to 0 HP",
	range : "30 ft",
	duration : "Instantaneous",
	description : "Gain temp HP = my level and move 2\u00d7 speed to the ally; carry it, stand it up at 1 HP + my temp HP",
	descriptionFull : "Prerequisite: 9th-level\n   Execution: 1 reaction\n   When a Friendly creature that you can see within 30 feet is reduced to 0 hit points, you can use your reaction to expend an Exploit Die, gaining temporary hit points equal to your level and moving up to twice your speed.\n   If you move within 5 feet of the downed creature and have a free hand, you can pick them up and carry them up to your remaining speed. If you provoke opportunity attacks, attacks target you, not the creature you are carrying.\n   At the end of this movement, you stand the creature up, it gains 1 hit point, and your temporary hit points transfer to it."
};
SpellsList["destructive slam"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 15); },
	prerequisite : "Strength of 15",
	name : "Destructive Slam",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "1 atk",
	timeFull : "In place of one attack",
	range : "20-ft cube",
	duration : "Instantaneous",
	save : "Str",
	description : "Adjacent 20-ft cube: 2 ED per ED spent (up to PB) + Str bludg. dmg and prone; half on save; difficult terrain",
	descriptionFull : "Prerequisite: 9th-level, Strength of 15\n   Execution: 1 attack\n   In place of an attack, you can strike the ground and expend Exploit Dice (up to your Proficiency Bonus). You destroy an adjacent 20-foot cube, turning it into difficult terrain.\n   Creatures in that area must make a Strength saving throw. On a failure, creatures take bludgeoning damage equal to two Exploit Dice per each Exploit Die you spent, + your Strength modifier and fall Prone. On a success, they take half as much damage and do not fall Prone. Structures and objects in this area take the maximum possible damage as if they failed."
};
SpellsList["disorienting blow"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 15); },
	prerequisite : "Strength of 15",
	name : "Disorienting Blow",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "1 min",
	save : "Wis",
	description : "On hit, +2 ED dmg; save or half speed, -2 AC, no reactions, disadv. Dex saves, action or bonus action only",
	descriptionFull : "Prerequisite: 9th-level, Strength of 15\n   Execution: On hit (melee weapon attack)\n   When you hit with a creature with a melee weapon attack, you expend an Exploit Die to strike with great force, dealing bonus damage equal to two Exploit Dice, and forcing it to make a Wisdom saving throw.\n   On a failure, it suffers the following effects for 1 minute:\n   Its speed is halved and it cannot take reactions.\n   Its Armor Class is reduced by 2, to a minimum of 10.\n   It has disadvantage on all Dexterity saving throws.\n   On its turn it can only take an action or a bonus action.\n   It cannot make more than one attack during its turn,\n   even if a feature would allow it to make multiple.\n   The creature can make a Wisdom saving throw at the end of each of its turns, ending this Exploit's effects on a success.\n   This Exploit's effects do not stack with the slow spell."
};
SpellsList["forgotten knowledge"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (v.skillProfs.indexOf("History") !== -1); },
	prerequisite : "History proficiency",
	name : "Forgotten Knowledge",
	classes : ["rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Skill",
	time : "10 min",
	range : "Sight",
	duration : "Instantaneous",
	description : "Focus on a person, object, or location I can see to recall a piece of lore about it",
	descriptionFull : "Prerequisite: 9th-level, History\n   Execution: 10 minutes\n   You can expend an Exploit Die to spend 10 minutes focused on a person, object, or location you can see, after which, you remember a piece of lore about the subject of your focus.\n   This lore might consist of modern tales, forgotten stories, or even secret lore that was never widely known. The more information you have about your focus, the more precise and detailed the information you seem to remember about it."
};
SpellsList["gale slash"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 15 || What("Dex") >= 15); },
	prerequisite : "Strength or Dexterity of 15",
	name : "Gale Slash",
	classes : ["fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "1 atk",
	timeFull : "In place of one attack",
	range : "20-ft cone",
	components : "W",
	compMaterial : "Melee weapon",
	duration : "Instantaneous",
	save : "Str",
	description : "20-ft cone: 2 ED per ED spent (up to PB) + Str/Dex thunder dmg; half on save",
	descriptionFull : "Prerequisite: 9th-level, Strength or Dexterity of 15\n   Execution: 1 attack\n   In place of an attack, you can expend Exploit Dice (up to your Proficiency Bonus) to rend the air in front of you with a melee weapon forcing creatures in an adjacent 20-foot cone to make a Strength saving throw. They take thunder damage equal to two Exploit Dice for each Exploit Die spent + your Strength or Dexterity modifier on a failure, and half on a success."
};
SpellsList["heroic focus"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Con") >= 15); },
	prerequisite : "Constitution of 15",
	name : "Heroic Focus",
	classes : ["fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 1 min",
	description : "Double speeds, +2 AC, adv. on Dex saves, extra action: Dash, Disengage, Hide, Search, Object, or 1 attack",
	descriptionFull : "Prerequisite: 9th-level, Constitution of 15\n   Execution: 1 bonus action (concentration)\n   As a bonus action, you can expend one Exploit Die to enter a heightened state of focus, which requires your concentration and grants you the benefits below for 1 minute:\n   Your walking, climbing, and swimming speed is doubled.\n   You gain a +2 bonus to your Armor Class.\n   You have advantage on all Dexterity saving throws.\n   You gain a special action on each of your turns that can\n   only be used to Dash, Disengage, Hide, Search, Use an\n   Object, or to make a single weapon attack."
};
SpellsList["incite violence"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Int") >= 15 || What("Cha") >= 15); },
	prerequisite : "Intelligence or Charisma of 15",
	name : "Incite Violence",
	classes : ["rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Speech",
	time : "1 a",
	range : "5 ft",
	components : "V",
	duration : "Instantaneous",
	save : "Wis",
	description : "1 crea saves or takes 2 ED psychic dmg and uses its reaction to attack a target of my choice",
	descriptionFull : "Prerequisite: 9th-level, Intelligence or Charisma of 15\n   Execution: 1 action\n   As an action, you can expend an Exploit Die and whisper violent words to a creature that can understand you within 5 feet, forcing it to make a Wisdom saving throw.\n   On a failure, it takes psychic damage equal to twice your Exploit Die and uses its reaction to make one melee attack against a target of your choice within its reach. If no target is within its reach, this creature has disadvantage on the first attack roll it makes before the start of your next turn."
};
SpellsList["inspirational speech"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Cha") >= 15); },
	prerequisite : "Charisma of 15",
	name : "Inspirational Speech",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Speech",
	time : "1 min",
	range : "Voice",
	components : "V",
	duration : "Instantaneous",
	description : "1 + Cha mod creas gain temp HP = my level; adv. on Wis saves while these temp HP last",
	descriptionFull : "Prerequisite: 9th-level, Charisma of 15\n   Execution: 1 minute\n   You can expend an Exploit Die to spend 1 minute giving an inspirational speech to a number of creatures that can hear you equal to 1 + your Charisma modifier. At the end of this speech, targets gain temporary hit points equal to your level.\n   While the temporary hit points from this Exploit last, the creatures have advantage on Wisdom saving throws."
};
SpellsList["mighty shot"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 15 || What("Dex") >= 15); },
	prerequisite : "Strength or Dexterity of 15",
	name : "Mighty Shot",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "1 atk",
	timeFull : "In place of one attack",
	range : "Line (W)",
	components : "W",
	compMaterial : "Ranged or thrown weapon",
	duration : "Instantaneous",
	save : "Dex",
	description : "Line to normal range: weapon dmg + 2 ED per ED spent (up to PB); Large or smaller prone; half on save",
	descriptionFull : "Prerequisite: 9th-level, Strength or Dexterity of 15\n   Execution: 1 attack\n   In place of an attack, you can expend Exploit Dice (up to your Proficiency Bonus) and make a single attack with a ranged or thrown weapon, forcing creatures in straight line out to the weapon's normal range to make a Dexterity saving throw.\n   On a failure, creatures take damage as if they were hit by that attack + two Exploit Dice per Exploit Die spent, then, if they are Large or smaller, they fall Prone. On a success, they take half as much damage and do not fall Prone."
};
SpellsList["mythic athleticism"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Con") >= 15 || What("Str") >= 15); },
	prerequisite : "Constitution or Strength of 15",
	name : "Mythic Athleticism",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 10 min",
	description : "Str/Con checks min 10; double speeds and jumps; count as one size larger for carrying and grappling",
	descriptionFull : "Prerequisite: 9th-level, Constitution or Strength of 15\n   Execution: 1 bonus action (concentration)\n   As a bonus action, you can expend one Exploit Die to enter a heightened physical sate, which requires your concentration and grants you the benefits below for 10 minutes:\n   Whenever you make a Strength or Constitution check,\n   you can treat a roll of 9 or lower on the d20 as a 10.\n   Your walking, climbing, and swimming speed is doubled.\n   You count as one size larger for the purposes of carrying\n   capacity and the size of creatures that you can Grapple.\n   Both your long and high jump distances double, even if\n   that distance would exceed your remaining movement."
};
SpellsList["mythic resilience"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Con") >= 15); },
	prerequisite : "Constitution of 15",
	name : "Mythic Resilience",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you take damage from a source you can see",
	range : "Self",
	duration : "Instantaneous",
	description : "Reduce the damage by 3 ED per ED spent (up to PB); excess becomes temporary HP",
	descriptionFull : "Prerequisite: 9th-level, Constitution of 15\n   Execution: 1 reaction\n   When you take damage from a source you can see, you can expend Exploit Dice (up to your Proficiency Bonus) to reduce the damage by three Exploit Dice per Exploit Die spent.\n   If the total rolled exceeds the amount of damage, you gain temporary hit points equal to the remaining amount."
};
SpellsList["pack tactics"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Wis") >= 15); },
	prerequisite : "Wisdom of 15",
	name : "Pack Tactics",
	classes : ["barbarian(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Order",
	time : "1 bns",
	range : "30-ft rad",
	duration : "Up to 1 min",
	description : "I and chosen allies have adv. on attacks if a pack member is within 5 ft of the target; extend with bns",
	descriptionFull : "Prerequisite: 9th-level, Wisdom of 15\n   Execution: 1 bonus action\n   As a bonus action, you can expend one Exploit Die to signal creatures of your choice within 30 feet that see or hear you to fight as a pack. Until the end of your next turn, you and these creatures have advantage on attack rolls, so long as another member of this pack is within 5 feet of your target.\n   On subsequent turns, you can use a bonus action to extend this effect until the end of your next turn without spending an Exploit Die, for a maximum duration of 1 minute."
};
SpellsList["perilous gambit"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	name : "Perilous Gambit",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Speech",
	time : "1 bns",
	range : "30 ft",
	components : "V",
	duration : "1 min",
	save : "Wis",
	description : "Taunt: target has adv. vs. me, disadv. vs. others, only moves toward me; my Exploit allies have adv. vs. it",
	descriptionFull : "Prerequisite: 9th-level\n   Execution: 1 bonus action\n   As a bonus action, you can expend an Exploit die to taunt a creature that can see you within 30 feet, imposing the effects below for 1 minute. It fails if the target cannot be Charmed.\n   It has advantage on any attack roll it makes against you,\n   but it has disadvantage on all other attack rolls.\n   If it moves, it can only move closer to you.\n   Any creature under the effect of one of your Exploits has\n   advantage on its attack rolls against this creature.\n   The creature can make a Wisdom saving throw at the end of each of its turns, ending the effect on a success. If you are within 30 feet of it, it has disadvantage on this saving throw."
};
SpellsList["primal terror"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (v.skillProfs.indexOf("Intimidation") !== -1); },
	prerequisite : "Intimidation proficiency",
	name : "Primal Terror",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "1 a",
	range : "5 ft",
	duration : "1 min",
	save : "Wis",
	description : "1 crea saves or regards all creas as hostile, targets at random, takes all OAs; save each time it takes dmg",
	descriptionFull : "Prerequisite: 9th-level, Intimidation\n   Execution: 1 action\n   As an action, you spend an Exploit Die and attempt to drive a creature within 5 feet into a fit of primal fear. It must succeed a Wisdom saving throw or it regards all creatures as Hostile for 1 minute. Each time it takes damage, it repeats the saving throw, ending this effect on a success.\n   The creature chooses the targets of its attacks, spells, and abilities at random, and it must take all opportunity attacks."
};
SpellsList["recruit mercenary"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Cha") >= 15 || What("Int") >= 15); },
	prerequisite : "Charisma or Intelligence of 15",
	name : "Recruit Mercenary",
	classes : ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Speech",
	time : "1 h",
	range : "Settlement",
	components : "V",
	duration : "Until dismissed",
	description : "Recruit a Brute or Scout Mercenary (Companion page) that follows my orders; ED not regained while in service",
	descriptionFull : "Prerequisite: 9th-level, Charisma or Intelligence of 15\n   Execution: 1 hour\n   You can expend one Exploit Die and spend 1 hour to recruit one Humanoid Mercenary in a settlement of significant size. There must be a willing Humanoid, such as a bounty hunter, an adventurer, or sellsword, as determined by the DM.\n   You choose to recruit a Brute or Scout, which determines certain traits in its stat block below. They use this stat block and roll their own initiative in combat. On their turn, they do their best to follow any orders you have given. If not, they will defend themselves to the best of their ability.\n   The Mercenary remains in your service until you dismiss them, they abandon you, or they die. You cannot regain this Exploit Die until the Mercenary leaves your service.\n   You can only have one Mercenary in your service at a time. Recruiting another causes others to abandon you."
};
SpellsList["recruit informant"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Cha") >= 15 || What("Int") >= 15); },
	prerequisite : "Charisma or Intelligence of 15",
	name : "Recruit Informant",
	classes : ["rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Speech",
	time : "1 h",
	range : "Settlement",
	components : "V",
	duration : "Until dismissed",
	description : "Recruit an informant that gathers information, rumors, and secrets in the settlement for me",
	descriptionFull : "Prerequisite: 9th-level, Charisma or Intelligence of 15\n   Execution: 1 hour\n   You can expend an Exploit Die and spend 1 hour to recruit a Humanoid Informant in settlement of significant size. There must be a willing Humanoid, such as an urchin, criminal, spy, thief, or another rapscallion, as determined by the DM.\n   Your Informant won't aid you in combat or risk their life, but will gather information, rumors, news, and secrets from their settlement. During each long rest, they will seek you out and deliver this information if you are in that settlement.\n   Your Informant remains in your service until you dismiss them or they die. However, you do not regain the Exploit Die spent on this Exploit until they leave your service.\n   Having more than one Informant in a settlement increases the accuracy and secrecy of information they can gather."
};
SpellsList["roar of triumph"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	name : "Roar of Triumph",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "Crit",
	timeFull : "No action required, when you score a critical hit",
	range : "300 ft",
	components : "V",
	duration : "Instantaneous",
	description : "I and Con mod (min 1) creas that hear me gain temp HP equal to my level + Con mod",
	descriptionFull : "Prerequisite: 9th-level\n   Execution: On a critical hit\n   When you score a critical hit, you can expend an Exploit Die to let out a cry that can be heard up to 300 feet away. You and a number of creatures of your choice who can hear you equal to your Constitution modifier (minimum of 1) gain temporary hit points equal to your level + your Constitution modifier."
};
SpellsList["savage defiance"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	name : "Savage Defiance",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "1 a",
	range : "60-ft rad",
	components : "V",
	duration : "1 min",
	description : "Creas of my choice that hear me have disadv. on attacks vs. others than me until they hit me",
	descriptionFull : "Prerequisite: 9th-level\n   Execution: 1 action\n   As an action you can expend an Exploit Die to issue a primal challenge. Creatures of your choice within 60 feet that can hear you have disadvantage on attacks against targets other than you for 1 minute, or until they hit you with an attack."
};
SpellsList["survey settlement"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Dex") >= 15 || What("Cha") >= 15); },
	prerequisite : "Dexterity or Charisma of 15",
	name : "Survey Settlement",
	classes : ["fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Skill",
	time : "1 h",
	range : "1 sq mile",
	duration : "Instantaneous",
	description : "Learn three of: factions, prominent buildings, leaders, local beliefs/rumors, secret places",
	descriptionFull : "Prerequisite: 9th-level, Dexterity or Charisma of 15\n   Execution: 1 hour\n   You can expend an Exploit Die and spend 1 hour gathering information on 1 square mile of a settlement. You then gain knowledge about three of the following related to that area:\n   Any active factions and faction outposts within the area.\n   Prominent buildings, gathering places, and cultural sites.\n   Powerful political, religious, or military leaders.\n   Loyalties, beliefs, rumors, and fears of the local populace.\n   Secret alleyways, doors, hideouts, or storefronts."
};
SpellsList["survey wilderness"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 15 || What("Wis") >= 15); },
	prerequisite : "Strength or Wisdom of 15",
	name : "Survey Wilderness",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Skill",
	time : "1 h",
	range : "1 sq mile",
	duration : "Instantaneous",
	description : "Learn three of: camps, natural features, ecosystem, powerful creatures (last 24 h), secret places",
	descriptionFull : "Prerequisite: 9th-level, Strength or Wisdom of 15\n   Execution: 1 hour\n   You can expend an Exploit Die and spend 1 hour gathering information on 1 square mile of wilderness. You then gain knowledge about three of the following related to that area:\n   Any settlements or camps with five or more occupants.\n   Prominent natural formations, bodies of water, and ruins.\n   Local plants, animals, weather, and ecosystems.\n   Powerful (CR 1 or higher) creatures that reside within, or\n   have passed through the area within the last 24 hours.\n   Secret trails, entrances, groves, or monster lairs."
};
SpellsList["stand the fallen"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	name : "Stand the Fallen",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Order",
	time : "1 a",
	range : "30 ft",
	components : "V",
	duration : "Instantaneous",
	description : "Allies that hear me (even at 0 HP) regain HP equal to ED spent (up to PB) + my Leadership mod",
	descriptionFull : "Prerequisite: 9th-level\n   Execution: 1 action\n   As an action, you expend Exploit Dice (up to your Proficiency Bonus) to let forth an inspiring shout. Choose allied creatures that can hear you within 30 feet to regain hit points equal to the Exploit Dice you spent + your Leadership modifier.\n   You can target Unconscious creatures at 0 hit points."
};
SpellsList["tactical reposition"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Int") >= 15); },
	prerequisite : "Intelligence of 15",
	name : "Tactical Reposition",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Order",
	time : "1 a",
	range : "30 ft",
	components : "V",
	duration : "Instantaneous",
	description : "Leadership mod (min 1) creas can use their reaction to move up to their speed without provoking OAs",
	descriptionFull : "Prerequisite: 9th-level, Intelligence of 15\n   Execution: 1 action\n   As an action, you can expend one Exploit Die and dictate a strategic course of action to a number of creatures equal to your Leadership modifier (minimum of 1) within 30 feet that can see or hear you. Creatures can use their reaction to move up to their speed without provoking opportunity attacks."
};
SpellsList["war cry"] = {
	isExploit : true,
	submenu : "[3rd-degree exploits]",
	prereqeval : function(v) { return (What("Con") >= 15 || What("Cha") >= 15); },
	prerequisite : "Constitution or Charisma of 15",
	name : "War Cry",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 3,
	school : "Combat",
	time : "1 a",
	range : "30-ft cone",
	components : "V",
	duration : "1 min",
	save : "Wis",
	description : "Chosen creas that hear me save or drop what they hold and are frightened; save with action if I'm unseen",
	descriptionFull : "Prerequisite: 9th-level, Constitution or Charisma of 15\n   Execution: 1 action\n   As an action, you can expend an Exploit Die to issue forth a mighty cry, forcing creatures of your choice that can hear you in an adjacent 30-foot cone to make a Wisdom saving throw. On a failed save, creatures drop whatever they are holding and are Frightened of you for 1 minute.\n   If a Frightened creature can't see or hear you, it can use its action repeat the saving throw, ending the effect on a success."
};
SpellsList["agonizing strike"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	name : "Agonizing Strike",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "1 min",
	save : "Con",
	description : "On hit, save or half speed, disadv. on attacks/checks/saves, Con save to cast spells; save each turn",
	descriptionFull : "Prerequisite: 13th-level\n   Execution: On hit (melee weapon attack)\n   When you hit a creature with a melee weapon attack, you can expend an Exploit Die to strike as to inflict crippling pain and force the creature to make a Constitution saving throw.\n   On a failure, its speed is halved; it has disadvantage on all attack rolls, ability checks, and saving throws; and to cast a spell it must first succeed on a Constitution saving throw or its spell slot (or use of that feature) is wasted.\n   This effect lasts for 1 minute, but the creature can maks a Constitution saving throw without disadvantage at the end of each of its turns, ending this effect success."
};
SpellsList["befuddling critical"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 17); },
	prerequisite : "Strength of 17",
	name : "Befuddling Critical",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Combat",
	time : "Crit",
	timeFull : "No action required, when you score a critical hit with a weapon attack",
	range : "Attack",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "1 min",
	save : "Int",
	description : "On crit, target loses concentration, can't concentrate, disadv. on Int/Wis/Cha saves; save each turn",
	descriptionFull : "Prerequisite: 13th-level, Strength of 17\n   Execution: On a critical hit with a weapon attack\n   When you score a critical hit on a creature with a weapon attack, you can expend one Exploit Die to shatter its focus. If it was concentrating, its concentration is broken, and for 1 minute, it has disadvantage on all Intelligence, Wisdom and Charisma saving throws, and it cannot concentrate.\n   The creature makes an Intelligence saving throw at the end of each of its turns, ending this effect on a success."
};
SpellsList["clandestine source"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	prereqeval : function(v) { return (LLhasTool(v, /thieves.? ?cant/i)); },
	prerequisite : "Thieves' Cant",
	name : "Clandestine Source",
	classes : ["rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Speech",
	time : "1 h",
	range : "Settlement",
	components : "V",
	duration : "Instantaneous",
	description : "Seek a crime boss; DC 15 Int/Cha save to get an audience and ask up to 5 one-word questions; 1/7 days",
	descriptionFull : "Prerequisite: 13th-level, Thieves' Cant\n   Execution: 1 hour\n   While in a settlement of sufficient size, you can expend an Exploit Die and spend 1 hour seeking out a significant figure of the criminal underworld to ask questions of.\n   If such a figure exists, you approach them alone, and make a DC 15 Intelligence or Charisma saving throw (your choice) to convince them to grant you an audience. On a failure, your body is left Unconscious somewhere in that settlement.\n   On a success, you can ask the figure up to five questions. They answer each question with one word (yes, no, maybe, or unclear). If a one-word answer is misleading, the figure might instead offer a short phrase as an answer to your question.\n   Once you use this Exploit in a settlement (successfully or unsuccessfully), you cannot use it there again for 7 full days."
};
SpellsList["colossal strength"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 17); },
	prerequisite : "Strength of 17",
	name : "Colossal Strength",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Skill",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 10 min",
	description : "Push/drag/lift multiplier rises with ED spent: 50/100/150/200/250/300\u00d7 Str score (doubled per size > Medium)",
	descriptionFull : "Prerequisite: 13th-level, Strength of 17\n   Execution: 1 bonus action (concentration)\n   As a bonus action, you can expend Exploit Dice (up to your Proficiency Bonus) to enhance your strength to mythic levels, though this Exploit's effect requires your concentration.\n   For 10 minutes, the amount of weight you can push, drag, pull, or lift is multiplied by the amount in the table below: **Exploit Dice **Total Weight Normal Total 30 x Strength score 1 50 x Strength score 2 100 x Strength score 3 150 x Strength score 4 200 x Strength score 5 250 x Strength score 6 300 x Strength score For each size category you are above Medium, the amount of weight you can move as part of this Exploit is doubled.\n   For example, a Medium-sized Barbarian with 20 Strength could expend 3 Exploit Dice to use this Exploit, multiplying their 20 Strength by 150, to lift up to 3,000 pounds. If they were Large, they'd double this weight to 6,000 pounds."
};
SpellsList["craft advanced poison"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	prereqeval : function(v) { return (LLhasTool(v, /poison/i)); },
	prerequisite : "Poisoner's Kit proficiency",
	name : "Craft Advanced Poison",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Craft",
	time : "1 a",
	range : "Self",
	components : "M",
	compMaterial : "Poisoner's kit",
	duration : "1 h",
	save : "Con",
	description : "Craft Advanced Poison: +ED spent acid dmg; save or disadv. checks/attacks 1 h (blinded if fail by 5+)",
	descriptionFull : "Prerequisite: 13th-level, Poisoner's Kit\n   Execution: 1 action\n   As an action on your turn, you can expend Exploit Dice (up to your Proficiency Bonus) and use a Poisoner's Kit to craft a single vial of Advanced Poison. It uses the rules below:\n   Consumable. The Poison retains its potency until the end of your next long rest, at which point it is inert and unusable. You cannot regain the Exploit Dice spent to create the Poison until this Advanced Poison is spent or destroyed.\n   Applying Poison. Any creature can take the Use an Object action to expend a vial of Advanced Poison and apply it to one weapon or piece of ammunition it is holding.\n   Poisoned Strike. The next time the Poisoned object deals damage to a creature, it deals additional acid damage equal to the Exploit Dice spent in its creation, and the target must make a Constitution saving throw. On a failure, the creature has disadvantage on ability checks and attack rolls for 1 hour. If it fails by 5 or more, it is also Blinded for the duration.\n   As an action, the creature can repeat its saving throw. On a success, the effect ends, but on a failure, it takes acid damage equal to your Exploit Die."
};
SpellsList["craft advanced trap"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	prereqeval : function(v) { return (LLhasTool(v, /thie/i) || LLhasTool(v, /tinker/i)); },
	prerequisite : "Thieves' Tools or Tinker's Tools proficiency",
	name : "Craft Advanced Trap",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Craft",
	time : "1 a",
	range : "10-ft cube",
	components : "M",
	compMaterial : "Thieves' tools or tinker's tools",
	duration : "Until LR",
	save : "Dex",
	description : "Craft Advanced Trap: first Huge or smaller crea save or 4 ED dmg, stunned + restrained until freed",
	descriptionFull : "Prerequisite: 13th-level, Thieves' Tools or Tinker's Tools\n   Execution: 1 action\n   As an action, you can expend one Exploit Die and use tools, natural materials, and adventuring supplies to craft a single Advanced Trap. This Advanced Trap uses the rules below:\n   Consumable. The Trap remains functional until the end of your next long rest, then it reverts to the raw material used to craft it. You cannot regain the Exploit Die spent to create this Trap until the Trap is triggered or destroyed.\n   Setting the Trap. Any creature can take the Use an Object action to set a Trap in an unoccupied, adjacent 10-foot cube.\n   Triggering the Trap. The first Huge or smaller creature to enter the Trap's space must make a Dexterity saving throw. If it is unaware of the Trap, it has disadvantage on this saving throw. On a failure, the creature suffers the following effects:\n   It takes bludgeoning or piercing damage equal to four\n   Exploit Dice (choose the damage at creation).\n   It is Stunned and Restrained in the space by the Trap.\n   Once it is caught in the Trap, a creature cannot free itself. Another creature must use its action to free it from the Trap."
};
SpellsList["dance of death"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	prereqeval : function(v) { return (What("Dex") >= 17); },
	prerequisite : "Dexterity of 17",
	name : "Dance of Death",
	classes : ["fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Combat",
	time : "1 a",
	range : "30 ft",
	components : "W",
	compMaterial : "Melee weapon",
	duration : "Instantaneous",
	save : "Dex",
	description : "1 + ED spent (up to PB) targets save or take weapon dmg + 1 ED (half on save); +1 target per kill",
	descriptionFull : "Prerequisite: 13th-level, Dexterity of 17\n   Execution: 1 action\n   As an action on your turn, you can expend Exploit Dice (up to your Proficiency Bonus) and choose a number of targets you can see within 30 feet equal to 1 + the number of Dice expended, forcing them to make a Dexterity saving throw. Creatures take damage of one hit with your weapon + your Exploit Die on a failure, and half as much on a success.\n   For each creature you reduce to 0 hit points, you can force another creature in range to make the Dexterity saving throw.\n   Once the Exploit ends, you appear in an unoccupied space of your choice next to the last target of this Exploit."
};
SpellsList["equip militia"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	prereqeval : function(v) { return (What("Dex") >= 17); },
	prerequisite : "Dexterity of 17",
	name : "Equip Militia",
	classes : ["fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Skill",
	time : "1 h",
	range : "Special",
	duration : "Until LR",
	description : "Train humanoids up to my level; each gains 2 benefits (weapon, armor, temp HP, skill, or Wis save)",
	descriptionFull : "Prerequisite: 13th-level, Dexterity of 17\n   Execution: 1 hour\n   You can expend one Exploit Die and spend 1 hour training a number of Humanoids equal to your level. Any creature that spends an hour training with you gains two benefits from the list below, which last until the creature finishes a long rest. You cannot regain this Exploit Die while these benefits last:\n   They gain proficiency with one martial weapon.\n   They gain proficiency with light armor and shields.\n   They gain temporary hit points equal to your level.\n   They gain proficiency in one of the following skills:\n   Animal Handling, Athletics, Medicine, or Stealth.\n   They gain proficiency in Wisdom saving throws."
};
SpellsList["expert focus"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	name : "Expert Focus",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Skill",
	time : "1 a",
	range : "Self",
	duration : "1 h",
	description : "Choose a proficient skill or tool; for 1 h, add 1 ED to all checks with it",
	descriptionFull : "Prerequisite: 13th-level\n   Execution: 1 action\n   As an action, you expend an Exploit Die to temporarily focus on one of your skills. Choose a skill or tool you are proficient in. For 1 hour, whenver you make an ability check with that skill you gain a bonus to your roll equal to your Exploit Die."
};
SpellsList["fluid movements"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	prereqeval : function(v) { return (What("Dex") >= 17); },
	prerequisite : "Dexterity of 17",
	name : "Fluid Movements",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Combat",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 1 min",
	description : "Immune to grappled/paralyzed/restrained, speed can't be reduced, OAs vs. me have disadv.",
	descriptionFull : "Prerequisite: 13th-level, Dexterity of 17\n   Execution: 1 bonus action (concentration)\n   As a bonus action, you can expend one Exploit Die to enter a heightened state of focus, which requires your concentration. For 1 minute, you have Immunity to the Grappled, Paralyzed, and Restrained conditions, your speed can't be reduced, and opportunity attacks against you have disadvantage."
};
SpellsList["heroic order"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	prereqeval : function(v) { return (What("Dex") >= 17); },
	prerequisite : "Dexterity of 17",
	name : "Heroic Order",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Order",
	time : "1 atk",
	timeFull : "Forgo one attack of the Attack action",
	range : "30 ft",
	duration : "1 rnd",
	description : "Ally gains resistance to all damage and adv. on attacks, checks, and saves until my next turn",
	descriptionFull : "Prerequisite: 13th-level, Dexterity of 17\n   Execution: 1 attack\n   As part of your Attack action, you can forgo an attack to issue this Order to another creature that can see or hear you within 30 feet. Until the start of your next turn, that creature gains Resistance to all damage, and it has advantage on all attack rolls, ability checks, and saving throws."
};
SpellsList["quick draw"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	prereqeval : function(v) { return (What("Dex") >= 17); },
	prerequisite : "Dexterity of 17",
	name : "Quick Draw",
	classes : ["fighter(laserllama)", "rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Combat",
	time : "1 bns",
	range : "Self",
	components : "W",
	compMaterial : "Ranged weapon",
	duration : "Conc, 1 min",
	description : "Use my bonus action (including this one) to make 2 ranged weapon attacks; doesn't stack with swift quiver",
	descriptionFull : "Prerequisite: 13th-level, Dexterity of 17\n   Execution: 1 bonus action (concentration)\n   As a bonus action, you can expend one Exploit Die to enter a heightened state of focus which requires your concentration.\n   For 1 minute, you can use your bonus action, (including the bonus action used to activate the Exploit) to make two ranged weapon attacks so long as you have enough ammunition.\n   This Exploit's effects don't stack with the swift quiver spell."
};
SpellsList["revitalizing order"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	name : "Revitalizing Order",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Order",
	time : "1 atk",
	timeFull : "Forgo one attack of the Attack action",
	range : "30 ft",
	duration : "Instantaneous",
	description : "Crea that died in the last minute regains HP = my level + Leadership mod and can stand up",
	descriptionFull : "Prerequisite: 13th-level\n   Execution: 1 attack\n   As part of your Attack action, you can forgo an attack to issue this Order to another creature within 30 feet that died within the last minute. It regains hit points equal to your level + your Leadership modifier and can stand up.\n   This Exploit cannot return a creature to life that has died of old age, nor does it restore missing body parts."
};
SpellsList["staggering blow"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 17); },
	prerequisite : "Strength of 17",
	name : "Staggering Blow",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "1 min",
	save : "Wis",
	description : "On hit, +3 ED dmg; save or disadv. on attacks and checks and no reactions; save each turn",
	descriptionFull : "Prerequisite: 13th-level, Strength of 17\n   Execution: On hit (melee weapon attack)\n   When you hit a creature with a melee weapon attack, you can expend an Exploit Die to strike with near-supernatural power, dealing bonus damage equal to three Exploit Dice. The target must succeed a Wisdom saving throw, or for the next minute it has disadvantage on all attack rolls and ability checks and it cannot take reactions.\n   The creature can make a Wisdom saving throw at the start of each of its turns, ending this effect on a success."
};
SpellsList["subjugate beast"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	prereqeval : function(v) { return (v.skillProfs.indexOf("Animal Handling") !== -1 || v.skillProfs.indexOf("Intimidation") !== -1); },
	prerequisite : "Animal Handling or Intimidation proficiency",
	name : "Subjugate Beast",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Speech",
	time : "1 a",
	range : "30 ft",
	duration : "1 min",
	save : "Wis",
	description : "1 beast saves or charmed; I can command it as a bonus action; save each time it takes dmg",
	descriptionFull : "Prerequisite: 13th-level, Animal Handling or Intimidation\n   Execution: 1 action\n   As an action, you can expend an Exploit Die and attempt to dominate one Beast that can see or hear you within 30 feet, forcing it to make a Wisdom saving throw. On a failure, it is Charmed by you. This effect lasts for 1 minute, but any time the Beast takes damage, it repeats this saving throw, ending this effect on a success.\n   While Charmed, you can use your bonus action to issue a command to the Beast, specifiying a simple course of action, which it follows to the best of its ability. If it doesn't recieve a command, it instead defends itself to the best of its ability."
};
SpellsList["sundering strike"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 17); },
	prerequisite : "Strength of 17",
	name : "Sundering Strike",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Combat",
	time : "1 atk",
	timeFull : "In place of one attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon",
	duration : "Instantaneous",
	description : "Destroy a magical force creation of SL \u2264 3; higher: Str check DC 10 + SL to destroy it",
	descriptionFull : "Prerequisite: 13th-level, Strength of 17\n   Execution: 1 attack\n   In place of an attack, you can expend an Exploit Die to strike a creation of magical force, such as a prismatic wall, resilient sphere, or forcecage with a melee weapon. Magical creations from a spell slot of 3rd-level or lower are instantly destroyed.\n   If it was created by a spell slot of 4th-level or higher, make a Strength check. DC equals 10 + the level of the spell slot. On a success, the magical creation is instantly destroyed."
};
SpellsList["unbreakable"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	prereqeval : function(v) { return (What("Con") >= 17); },
	prerequisite : "Constitution of 17",
	name : "Unbreakable",
	classes : ["barbarian(laserllama)", "fighter(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Combat",
	time : "Special",
	timeFull : "No action required, when damage would reduce you to 0 HP",
	range : "Self",
	duration : "Instantaneous",
	description : "Drop to 1 HP instead and gain 2 ED temp HP per ED spent (up to PB)",
	descriptionFull : "Prerequisite: 13th-level, Constitution of 17\n   Execution: When reduced to 0 hit points\n   If you take damage that would reduce you to 0 hit points, even if that damage would kill you outright, you can expend Exploit Dice (up to your Proficiency Bonus) and fall to 1 hit point instead. Then, you gain temporary hit points equal to two Exploit Dice per each Exploit Die you spent."
};
SpellsList["victory surge"] = {
	isExploit : true,
	submenu : "[4th-degree exploits]",
	name : "Victory Surge",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 4,
	school : "Order",
	time : "1 a",
	range : "30 ft",
	duration : "Instantaneous",
	description : "Ally uses its reaction to move up to its speed and take one action or bonus action",
	descriptionFull : "Prerequisite: 13th-level\n   Execution: 1 action\n   As an action, you can expend an Exploit Die to drive another creature within 30 feet that can see or hear you to fight as never before. The creature can use its reaction to move up to its full speed and take a single action or bonus action."
};
SpellsList["banishing strike"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 19); },
	prerequisite : "Strength of 19",
	name : "Banishing Strike",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "1 rnd",
	save : "Cha",
	description : "On hit, +4 ED force dmg; save or shunted to a harmless demiplane (incapacitated) until my next turn",
	descriptionFull : "Prerequisite: 17th-level, Strength of 19\n   Execution: On hit (melee weapon attack)\n   When you hit a creature with a melee weapon attack, you can expend an Exploit Die to strike with legendary power, dealing bonus force damage equal to four Exploit Dice, and forcing it to make a Charisma saving throw.\n   On a failure, it shunted to a harmless demiplane where it is Incapacitated. At the beginning of your next turn, the creature reappears in the unoccupied space closest to the space it left."
};
SpellsList["cataclysmic slam"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 19); },
	prerequisite : "Strength of 19",
	name : "Cataclysmic Slam",
	classes : ["barbarian(laserllama)", "fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Combat",
	time : "1 a",
	range : "30-ft rad",
	duration : "Instantaneous",
	save : "Str",
	description : "30-ft rad: 2 ED per ED spent (up to PB) + Str bludg. dmg and prone; half on save; difficult terrain",
	descriptionFull : "Prerequisite: 17th-level, Strength of 19\n   Execution: 1 action\n   As an action, you can strike the ground with legendary force and expend Exploit Dice (up to your Proficiency Bonus). A shockwave ripples outward from you, destroying the ground in a 30-foot radius, turning it into difficult terrian.\n   Creatures in that area must make a Strength saving throw. On a failure, creatures take bludgeoning damage equal to two Exploit Dice per each Exploit Die you spent, + your Strength modifier and fall Prone. On a success, they take half as much damage and do not fall Prone. Structures and objects in this area take the maximum possible damage as if they failed."
};
SpellsList["contingency plan"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	prereqeval : function(v) { return (What("Int") >= 19); },
	prerequisite : "Intelligence of 19",
	name : "Contingency Plan",
	classes : ["rogue(laserllama)", "warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Skill",
	time : "Special",
	timeFull : "At the end of a long rest to set up, then 1 action to reveal",
	range : "Self",
	duration : "Until used",
	description : "Prepare a secret plan; reveal with an action and DC 20 Int check (max 5,000 gp, 7th-level spell effect)",
	descriptionFull : "Prerequisite: 17th-level, Intelligence of 19\n   Execution: End of a long rest, 1 action\n   At the end of a long rest, you can expend one of your Exploit Dice to put an undisclosed contingency plan into place. Until you activate this Exploit again you cannot regain this Exploit Die. You can only have one contingency plan at a time.\n   As an action, you can reveal your previously undisclosed plan (which you make up at the time of its reveal) and make a DC 20 Intelligence check. You may add a skill the DM deems appropriate to your plan. On a success, your secret plans and preparations take effect perfectly as you described them.\n   The cost to execute the plan cannot exceed 5,000 gold, and the effects should not exceed those of a 7th-level spell.\n   For example, you might reveal that you secretly purchased a perfect spell scroll last time you were in a town, or that you paid a mercenary band or airship to come to your rescue."
};
SpellsList["craft masterwork poison"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	prereqeval : function(v) { return (LLhasTool(v, /poison/i)); },
	prerequisite : "Poisoner's Kit proficiency",
	name : "Craft Masterwork Poison",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Craft",
	time : "1 a",
	range : "Self",
	components : "M",
	compMaterial : "Poisoner's kit",
	duration : "Until cured",
	save : "Con",
	description : "Craft Masterwork Poison: +2 ED per ED spent necrotic; save or disadv. on all d20 until cured (5th+ SL)",
	descriptionFull : "Prerequisite: 17th-level, Poisoner's Kit\n   Execution: 1 action\n   As an action on your turn, you can expend Exploit Dice (up to your Proficiency Bonus) and use a Poisoner's Kit to craft a single vial of Masterwork Poison. It uses the rules below:\n   Consumable. The Poison retains its potency until the end of your next long rest, at which point it is inert and unusable. You cannot regain the Exploit Dice spent to create the Poison until this Masterwork Poison is spent or destroyed.\n   Applying Poison. Any creature can take the Use an Object action to expend a vial of Masterwork Poison and apply it to one weapon or piece of ammunition it is holding.\n   Poisoned Strike. The next time the Poisoned object deals damage to a creature, it deals bonus necrotic damage equal to two Exploit Dice per each Exploit Die spent in its creation, and the target must make a Constitution saving throw. On a failure, it has disadvantage on all ability checks, attack rolls, and saving throws until a spell of 5th-level or higher is cast ll on it to neutralize the poison (such as restoration ).\n   If the creature fails by 5 or more, it is Incapacitated and it cannot move or speak until it is cured of this Poison."
};
SpellsList["craft masterwork trap"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	prereqeval : function(v) { return (LLhasTool(v, /thie/i) || LLhasTool(v, /tinker/i)); },
	prerequisite : "Thieves' Tools or Tinker's Tools proficiency",
	name : "Craft Masterwork Trap",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Craft",
	time : "1 a",
	range : "30-ft line",
	components : "M",
	compMaterial : "Thieves' tools or tinker's tools",
	duration : "Until LR",
	save : "Dex",
	description : "Craft Masterwork Trap: first Huge or smaller crea save or 5 ED dmg each turn, stunned + restrained",
	descriptionFull : "Prerequisite: 17th-level, Thieves' Tools or Tinker's Tools\n   Execution: 1 action\n   As an action, you can expend one Exploit Die and use tools, natural materials, and adventuring supplies to craft a single Masterwork Trap. This Trap uses the rules below:\n   Consumable. The Trap remains functional until the end of your next long rest, then it reverts to the raw material used to craft it. You cannot regain the Exploit Die spent to create this Trap until the Trap is triggered or destroyed.\n   Setting the Trap. Any creature can take the Use an Object action to set a Trap in an unoccupied, adjacent 30-foot line.\n   Triggering the Trap. The first Huge or smaller creature to enter the Trap's space must make a Dexterity saving throw. If it is unaware of the Trap, it has disadvantage on this saving throw. On a failure, the creature suffers the following effects:\n   It takes bludgeoning or piercing damage equal to five\n   Exploit Dice (choose the damage at creation).\n   It is Stunned and Restrained in the space by the Trap.\n   Each time it starts its turn in this Trap, it takes damage\n   again as if it had failed the initial saving throw.\n   Once it is caught in the Trap, a creature cannot free itself. Another creature must use its action to make an Intelligence or Wisdom check (its choice) against your Exploit save DC, freeing the trapped creature on a successful check."
};
SpellsList["final strike"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	name : "Final Strike",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Order",
	time : "1 a",
	range : "30 ft",
	components : "V",
	duration : "Instantaneous",
	description : "Up to Leadership mod allies take the Attack action or cast a spell (SL \u2264 5) against one foe",
	descriptionFull : "Prerequisite: 17th-level\n   Execution: 1 action\n   As an action you expend an Exploit Die to order a number of Friendly creatures (up to your Leadership modifier) who can hear you within 30 feet to strike a single foe. These creatures immediately take the Attack action (including Extra Attacks), or cast a spell of 5th-level or lower with a casting time of one action. All attacks and spells must target the designated foe."
};
SpellsList["inconceivable dodge"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	prereqeval : function(v) { return (What("Dex") >= 19); },
	prerequisite : "Dexterity of 19",
	name : "Inconceivable Dodge",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Combat",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you take damage",
	range : "10 ft",
	duration : "Instantaneous",
	description : "Move to a space within 10 ft and avoid the triggering effect as if it never affected me",
	descriptionFull : "Prerequisite: 17th-level, Dexterity of 19\n   Execution: 1 reaction\n   When you take damage, you can use your reaction to expend one Exploit Die and move with supernatural agility and speed to an unoccupied space within 10 feet, somehow avoiding the triggering effect as if it never affected you at all."
};
SpellsList["mortal blow"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	name : "Mortal Blow",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "Instantaneous",
	save : "Con",
	description : "+4 ED dmg; save (disadv. if I had adv.) or vulnerable to it; if \u2264 50 HP after, prone and stunned",
	descriptionFull : "Prerequisite: 17th-level\n   Execution: 1 reaction\n   When you hit a creature with a melee weapon attack, you can expend an Exploit Die to strike with supernatural accuracy at its most vulnerable point. It must succeed on a Constitution saving throw or it is considered Vulnerable to the damage of this attack. If you had advantage on your attack roll, it makes this Constitution save with disadvantage.\n   Regardless if the creature succeeds or fails on this saving throw, it takes bonus damage equal to four Exploit Dice.\n   If this attack reduces the creature to 50 hit points or fewer, it falls Prone and is Stunned until the start of its next turn. A creature can use a Legendary Resistance to avoid this effect."
};
SpellsList["mythic focus"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	prereqeval : function(v) { return (What("Con") >= 19); },
	prerequisite : "Constitution of 19",
	name : "Mythic Focus",
	classes : ["fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Combat",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 1 min",
	description : "50 temp HP, adv. on weapon attacks, +1 ED dmg 1/turn, +ED on Str/Dex/Con saves, +1 attack per Attack",
	descriptionFull : "Prerequisite: 17th-level, Constitution of 19\n   Execution: 1 bonus action (concentration)\n   As a bonus action, you can expend one Exploit Die to enter a heightened state of focus, which requires concentration and grants you the following benefits:\n   You gain 50 temporary hit points. If any of these remain\n   when the effects of this Exploit end, they are lost.\n   You have advantage on all weapon attacks.\n   Once per turn when you hit with a weapon attack, you\n   deal bonus damage equal to your Exploit Die.\n   You gain a bonus to Strength, Dexterity, and Constitution\n   saving throws equal to your Exploit Die.\n   When you take the Attack action on your turn, you can\n   make one additional weapon attack as part of that action.\n   This effect lasts for 1 minute, but it ends early if you are Incapacitated. It does not stack with tenser's transformation."
};
SpellsList["subjugate thrall"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	prereqeval : function(v) { return (What("Wis") >= 19 || What("Cha") >= 19); },
	prerequisite : "Wisdom or Charisma of 19",
	name : "Subjugate Thrall",
	classes : ["warlord(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Speech",
	time : "1 a",
	range : "30 ft",
	components : "V",
	duration : "8 h",
	save : "Cha",
	description : "1 humanoid saves or charmed 8 h; I command it as a bonus action; save each time it takes dmg",
	descriptionFull : "Prerequisite: 17th-level, Wisdom or Charisma of 19\n   Execution: 1 action\n   As an action, you can expend an Exploit Die and attempt to dominate one Humanoid that can hear and understand you within 30 feet, forcing it to make a Charisma saving throw.\n   On a failed save, that Humanoid is Charmed by you for 8 hours. It repeats this saving throw any time it takes damage, ending the effects of this Exploit on a success.\n   While Charmed, you can use your bonus action to issue them a command, specifying a simple or general course of action such as \"attack that creature\" or \"fetch that object\", which they do their best to obey. If they do not receive any orders, they defend themselves to the best of their ability."
};
SpellsList["storm of arrows"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	prereqeval : function(v) { return (What("Dex") >= 19); },
	prerequisite : "Dexterity of 19",
	name : "Storm of Arrows",
	classes : ["fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Combat",
	time : "1 a",
	range : "Weapon",
	components : "W",
	compMaterial : "Ranged weapon with ammunition",
	duration : "Instantaneous",
	save : "Dex",
	description : "Chosen creas in 30 ft of a point: 2 ED per ED spent (up to PB) + Dex piercing dmg; half on save",
	descriptionFull : "Prerequisite: 17th-level, Dexterity of 19\n   Execution: 1 action\n   As an action on your turn, you can expend Exploit Dice (up to your Proficiency Bonus) to fire a volley of ammunition at a point you can see within the normal range of your weapon.\n   Creatures of your choice within 30 feet of that point must succeed on a Dexterity saving throw or take piercing damage equal to two Exploit Dice per each Exploit Die spent, + your Dexterity modifier. On a success, they take half damage.\n   You must have enough ammunition to hit each target."
};
SpellsList["steel wind slash"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 19 || What("Dex") >= 19); },
	prerequisite : "Strength or Dexterity of 19",
	name : "Steel Wind Slash",
	classes : ["fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Combat",
	time : "1 a",
	range : "30 ft",
	components : "W",
	compMaterial : "Melee weapon",
	duration : "Instantaneous",
	description : "Melee attack vs. up to 5 targets: weapon dmg + 2 ED per ED spent (up to PB); appear next to the last",
	descriptionFull : "Prerequisite: 17th-level, Strength or Dexterity of 19\n   Execution: 1 action\n   As an action on your turn, you can expend Exploit Dice (up to your Proficiency Bonus) and flourish a melee weapon then vanish. Choose up to five different targets you can see within 30 feet and make a melee weapon attack against each one.\n   On hit, each target takes damage equal to one attack from your weapon + bonus damage equal to two Exploit Dice per each Exploit Die you spent. After all attacks, you appear in an unoccupied space within 5 feet of your final target."
};
SpellsList["trickster's blessing"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	prereqeval : function(v) { return (What("Dex") >= 19); },
	prerequisite : "Dexterity of 19",
	name : "Trickster's Blessing",
	classes : ["rogue(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Combat",
	time : "Hide",
	timeFull : "When you take the Hide action",
	range : "60 ft",
	duration : "Instantaneous",
	description : "Teleport to a hiding place within 60 ft and become hidden from all creatures, senses, and magic",
	descriptionFull : "Prerequisite: 17th-level, Dexterity of 19\n   Execution: Hide action\n   When you take the Hide action, you can expend one Exploit Die to hide with inconceivable and supernatural skill. So long as there is a place to hide within 60 feet, you instantly appear in one such hidden location of your choice within 60 feet, and are automatically considered to be hidden from all spells and creatures, no matter what senses or magic they might have."
};
SpellsList["vorpal critical"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 19); },
	prerequisite : "Strength of 19",
	name : "Vorpal Critical",
	classes : ["barbarian(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Combat",
	time : "Crit",
	timeFull : "No action required, when you score a critical hit with a weapon attack",
	range : "Attack",
	components : "W",
	compMaterial : "Weapon attack",
	duration : "Instantaneous",
	description : "On crit, +3 ED dmg; if reduced to \u2264 50 HP, I cut off one of its heads (legendary resistance avoids)",
	descriptionFull : "Prerequisite: 17th-level, Strength of 19\n   Execution: On a critical hit with a weapon attack\n   When you score a critical hit with a weapon attack, you can spend an Exploit Die to strike with legendary force, dealing bonus damage equal to three Exploit Dice.\n   If this attack reduces the creature's remaining hit points to 50 or less, you cut off one of its heads. If the creature cannot survive without the lost head, it is killed.\n   Creatures can use a Legendary Resistance to avoid being beheaded. Creatures that don't have or don't need a head are immune to this Exploit's effects, but still take the damage."
};
SpellsList["vorpal strike"] = {
	isExploit : true,
	submenu : "[5th-degree exploits]",
	prereqeval : function(v) { return (What("Str") >= 19 || What("Dex") >= 19); },
	prerequisite : "Strength or Dexterity of 19",
	name : "Vorpal Strike",
	classes : ["fighter(laserllama)"],
	source : [["GMB:LL", 0]],
	level : 5,
	school : "Combat",
	time : "Hit",
	timeFull : "No action required, when you hit with a melee weapon attack",
	range : "Melee",
	components : "W",
	compMaterial : "Melee weapon attack",
	duration : "Instantaneous",
	description : "On hit, +4 ED dmg; if reduced to \u2264 50 HP, I cut off one of its heads (legendary resistance avoids)",
	descriptionFull : "Prerequisite: 17th-level, Strength or Dexterity of 19\n   Execution: On hit (melee weapon attack)\n   When you hit a creature with a melee weapon attack, you can expend one Exploit Die to strike with legendary force, dealing bonus damage equal to four Exploit Dice.\n   If this attack reduces the creature's remaining hit points to 50 or less, you cut off one of its heads. If the creature cannot survive without the lost head, it is killed.\n   Creatures can use a Legendary Resistance to avoid being beheaded. Creatures that don't have or don't need a head are immune to this Exploit's effects, but still take the damage."
};

// ===================================================================================
// SPELLS (Compendium of Spells v0.5) - ALT versions replace the official spell
// ===================================================================================

// ----- Cantrips -----
SpellsList["acid splash"] = {
	name : "Acid Splash (LL)",
	nameShort : "Acid Splash (LL)",
	regExpSearch : /^(?=.*acid)(?=.*splash).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "magus(laserllama)", "sorcerer", "sorcerer(laserllama)", "wizard", "wizard(laserllama)", "magus"],
	level : 0,
	school : "Evoc",
	time : "1 a",
	timeFull : "1 action",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Dex",
	description : "5-ft rad all crea or 1d6 Acid dmg",
	descriptionMetric : "1.5-m rad all crea or 1d6 Acid dmg",
	descriptionShorter : "5-ft rad all crea or 1d6 Acid dmg",
	descriptionShorterMetric : "1.5-m rad all crea or 1d6 Acid dmg",
	descriptionCantripDie : "5-ft rad all crea or `CD`d6 Acid dmg",
	firstCol : "6",
	dynamicDamageBonus : { "doNotProcess" : true, "multipleDmgMoments" : false, "allDmgTypesSingleMoment" : true, "extraDmgGroupsSameType" : /((?:\+?\d+d?\d*)+)( crit)/i },
	descriptionFull : "You hurl an orb of caustic acid at a point you can see within range. Creatures within 5 feet of that point must succeed on a Dexterity saving throw or take 1d6 acid damage." + AtHigherLevels + "The damage of this spell increases by 1d6 at 5th (2d6), 11th (3d6), and 17th level (4d6)."
};
SpellsList["beckon air"] = {
	name : "Beckon Air",
	nameShort : "Beckon Air",
	regExpSearch : /^(?=.*beckon)(?=.*air).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "shaman(laserllama)", "sorcerer", "sorcerer(laserllama)", "wizard", "wizard(laserllama)", "shaman"],
	level : 0,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Str",
	description : "sensory effect // 1 crea or 1d6 Thunder dmg",
	descriptionMetric : "sensory effect // 1 crea or 1d6 Thunder dmg",
	descriptionShorter : "sensory effect // 1 crea or 1d6 Thunder dmg",
	descriptionCantripDie : "sensory effect // 1 crea or `CD`d6 Thunder dmg",
	firstCol : "6",
	descriptionFull : "You can manipulate the winds and use them to assault foes. When you cast this spell choose one of the following effects:" + "\n   " + "Manipulate Air. You manipulate the air in a 5-foot cube within range, creating a small sensory affect such as causing leaves to rustle, shutters to slam shut, or clothing to ripple." + "\n   " + "Air Burst. You create a ball of compressed air in your hand and hurl it at a target you can see within range, forcing it to make a Strength saving throw. On a failed save, it takes 1d6 thunder damage and a Medium or smaller target is knocked back 10 feet away from you in a straight line." + AtHigherLevels + "The damage of this Cantrip and the size target it can knock back increases by 1d6 at 5th (2d6, Large), 11th (3d6, Huge), and 17th level (4d6, Gargantuan)."
};
SpellsList["booming blade"] = {
	name : "Booming Blade (LL)",
	nameShort : "Booming Blade (LL)",
	regExpSearch : /^(?=.*booming)(?=.*blade).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "bard", "bard(laserllama)", "magus(laserllama)", "sorcerer", "sorcerer(laserllama)", "warlock", "warlock(laserllama)", "magus"],
	level : 0,
	school : "Evoc",
	time : "1 bns",
	timeFull : "1 bonus action",
	range : "Self",
	components : "V,M",
	compMaterial : "A simple or martial melee weapon",
	duration : "1 rnd",
	description : "wreathe weapon with thunder // 1 crea or 1d6 Thunder dmg if moves",
	descriptionMetric : "wreathe weapon with thunder // 1 crea or 1d6 Thunder dmg if moves",
	descriptionShorter : "wreathe weapon with thunder // 1 crea or 1d6 Thunder dmg if moves",
	descriptionCantripDie : "wreathe weapon with thunder // 1 crea or 1d6 Thunder dmg if moves",
	firstCol : "6",
	descriptionFull : "As a bonus action, you wreathe the melee weapon used in the casting of this spell with thunderous magic. Until the start of your next turn, your attacks with that weapon deal thunder damage in place of the weapon's normal damage type." + "\n   " + "Once per casting when you deal thunder damage with this spell, you can envelop your target in thunderous energy until the start of your next turn. If the target willingly moves 5 feet or more before then, this thunderous energy explodes and it takes 1d6 thunder damage, then the energy dissipates." + AtHigherLevels + "The thunder damage dealt by this spell when the creature moves at least 5 feet increases at 5th level (1d8), 11th level (1d10), and 17th level (1d12)."
};
SpellsList["blade ward"] = {
	name : "Blade Ward (LL)",
	nameShort : "Blade Ward (LL)",
	regExpSearch : /^(?=.*blade)(?=.*ward).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)", "magus(laserllama)", "psion(laserllama)", "shaman(laserllama)", "sorcerer", "sorcerer(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)", "magus"],
	level : 0,
	school : "Abjur",
	time : "1 bns",
	timeFull : "1 bonus action",
	range : "Self",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "1d4 bludgeoning, piercing, slashing damage reduction",
	descriptionMetric : "bludgeoning, piercing, slashing damage reduction",
	descriptionShorter : "1d4 bludgeoning, piercing, slashing damage reduction",
	descriptionCantripDie : "1d4 bludgeoning, piercing, slashing damage reduction",
	firstCol : "6",
	descriptionFull : "You trace a sigil of warding into the air. Whenever you take bludgeoning, piercing, or slashing damage for the duration of this spell, you can reduce the damage you would take by 1d4."
};
SpellsList["control flame"] = {
	name : "Control Flame (LL)",
	nameShort : "Control Flame (LL)",
	regExpSearch : /^(?=.*control)(?=.*flame).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "shaman(laserllama)", "sorcerer", "sorcerer(laserllama)", "wizard", "wizard(laserllama)", "shaman"],
	level : 0,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "control flames // 60-feet 1 target on hit 1d8 Fire dmg",
	descriptionMetric : "control flames // 18-m 1 target on hit 1d8 Fire dmg",
	descriptionShorter : "control flames // 60-feet 1 target on hit 1d8 Fire dmg",
	descriptionCantripDie : "control flames // 60-feet 1 target on hit `CD`d8 Fire dmg",
	firstCol : "6",
	descriptionFull : "You can manipulate fire and use it to assault your foes. When you cast this spell choose one of the following effects:" + "\n   " + "Manipulate Fire. You choose nonmagical flame you can see within range and that fits within a 5-foot cube and cause the flame to grow to fill the cube, extinguish all flame within the cube, change its color, or cause simple animated shapes to appear within the flames, such as creatures or locations." + "\n   " + "Hurl Flame. You create a small ball of flickering flame in your hand and hurl it at one target that you can see within range, making a ranged spell attack against it. On hit, it takes 1d8 fire damage. Flammable objects that aren't being worn or carried are ignited when hit by this spell attack." + AtHigherLevels + "The damage of this Cantrip increases by 1d8 at 5th (2d8), 11th (3d8), and 17th level (4d8)."
};
SpellsList["friends"] = {
	name : "Friends (LL)",
	nameShort : "Friends (LL)",
	regExpSearch : /^(?=.*friends).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)", "psion(laserllama)", "sorcerer", "sorcerer(laserllama)", "vessel(laserllama)", "wizard", "wizard(laserllama)", "vessel"],
	level : 0,
	school : "Ench",
	time : "1 a",
	timeFull : "1 action",
	range : "Self",
	components : "S,M",
	compMaterial : "A small amount of makeup applied to the face as this spell is cast",
	duration : "Conc, 1 min",
	description : "1 crea that can understand and hear you, Wis save or adv on CHA checks",
	descriptionMetric : "1 crea that can understand and hear you, Wis save or adv on CHA checks",
	descriptionShorter : "1 crea that can understand and hear you, Wis save or adv on CHA checks",
	descriptionCantripDie : "1 crea that can understand and hear you, Wis save or adv on CHA checks",
	firstCol : "6",
	descriptionFull : "You lace your words with soothing magic and force a creature of your choice that can hear and understand you to make a Wisdom saving throw. On a failure, you have advantage on all Charisma checks directed at that creature for the duration." + "\n   " + "On a successful save, the creature realizes that you used magic to attempt to influence it and becomes hostile toward you. A creature prone to violence might attack you, and other creatures might seek retribution against you in other ways."
};
SpellsList["glitterbeam"] = {
	name : "Glitterbeam",
	nameShort : "Glitterbeam",
	regExpSearch : /^(?=.*glitterbeam).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)", "cleric", "cleric(laserllama)", "magus(laserllama)", "vessel(laserllama)", "magus", "vessel"],
	level : 0,
	school : "Evoc",
	time : "1 a",
	timeFull : "1 action",
	range : "120 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Spell atk for 1d8 Radiant dmg; until my next turn, it sheds 10-ft bright light and has disadv. on Stealth to Hide",
	descriptionCantripDie : "Spell atk for `CD`d8 Radiant dmg; until my next turn, it sheds 10-ft bright light and has disadv. on Stealth to Hide",
	firstCol : "6",
	descriptionFull : "You project a beam of twinkling lights at a creature or object within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 radiant damage. Until the start of your next turn, the creature emits bright light in a 10-foot radius and has disadvantage on Stealth checks to Hide." + AtHigherLevels + "The damage of this spell increases by 1d8 at 5th (2d8), 11th (3d8), and 17th level (4d8)."
};
SpellsList["green-flame blade"] = {
	name : "Green-Flame Blade (LL)",
	nameShort : "Green-Flame Blade (LL)",
	regExpSearch : /^(?=.*green)(?=.*flame)(?=.*blade).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "magus(laserllama)", "sorcerer", "sorcerer(laserllama)", "warlock", "warlock(laserllama)", "magus"],
	level : 0,
	school : "Evoc",
	time : "1 bns",
	timeFull : "1 bonus action",
	range : "Self",
	components : "V,M",
	compMaterial : "A simple or martial melee weapon",
	duration : "Instantaneous",
	description : "wreathe weapon, on hit 5-feet another crea Fire damage once",
	descriptionMetric : "wreathe weapon, on hit 1.5-m another crea Fire damage once",
	descriptionShorter : "wreathe weapon, on hit 1.5-m another crea Fire damage once",
	descriptionCantripDie : "wreathe weapon, on hit 5-feet another crea Fire damage once",
	firstCol : "6",
	descriptionFull : "As a bonus action, you wreathe the melee weapon used in the casting of this spell with emerald flames. Until the start of your next turn, your attacks with that weapon deal fire damage in place of the weapon's normal damage type." + "\n   " + "Once per casting when you deal fire damage with this spell, you can cause the flames to leap to another creature you can see within 5 feet of your target, dealing 1d6 fire damage to it." + AtHigherLevels + "The fire damage dealt to the second creature by this spell increases at 5th level (1d8), 11th level (1d10), and 17th level (1d12)."
};
SpellsList["guidance"] = {
	name : "Guidance (LL)",
	nameShort : "Guidance (LL)",
	regExpSearch : /^(?=.*guidance).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)", "cleric", "cleric(laserllama)", "druid", "druid(laserllama)", "psion(laserllama)", "shaman(laserllama)", "wizard", "wizard(laserllama)", "shaman"],
	level : 0,
	school : "Div",
	time : "1 a",
	timeFull : "1 action",
	range : "Touch",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "touch another crea, bonus on chosen skill",
	descriptionMetric : "touch another crea, bonus on chosen skill",
	descriptionShorter : "touch another crea, bonus on chosen skill",
	descriptionCantripDie : "touch another crea, bonus on chosen skill",
	descriptionFull : "You touch another creature and infuse it with otherworldly knowledge of a skill of your choice. For the duration, it gains a 1d4 bonus to any ability checks it makes with that skill." + "\n   " + "If you are proficient in the skill, this bonus becomes 1d6."
};
SpellsList["lightning lure"] = {
	name : "Lightning Lure (LL)",
	nameShort : "Lightning Lure (LL)",
	regExpSearch : /^(?=.*lightning)(?=.*lure).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "magus(laserllama)", "sorcerer", "sorcerer(laserllama)", "vessel(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)", "magus", "vessel"],
	level : 0,
	school : "Evoc",
	time : "1 atk",
	timeFull : "In place of one attack of the Attack action",
	range : "S:15-ft rad",
	components : "V",
	duration : "Instantaneous",
	description : "1 crea in range, Str save or 1d8 Lightning dmg and drag 10 ft",
	descriptionMetric : "1 crea in range, Str save or 1d8 Lightning dmg and drag 3 m",
	descriptionShorter : "1 crea in range, Str save or 1d8 Lightning dmg and drag 10 ft",
	descriptionCantripDie : "1 crea in range, Str save or 1d8 Lightning dmg and drag 10 ft",
	descriptionFull : "You create a lash of arcane lightning and strikes at a creature of your choice you can see within 15 feet. It must succeed on a Strength saving throw or take 1d8 lightning damage and be pulled in a straight line up to 10 feet toward you." + AtHigherLevels + "The range of this spell increases at 5th level (20 feet), 11th level (25 feet), and 17th level (30 feet)."
};
SpellsList["mind thrust"] = {
	name : "Mind Thrust",
	nameShort : "Mind Thrust",
	regExpSearch : /^(?=.*mind)(?=.*thrust).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["psion(laserllama)"],
	level : 0,
	school : "Evoc",
	time : "1 a",
	timeFull : "1 action",
	range : "120 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Spell atk for 1d10 Psychic dmg; on hit, the target can't take reactions until the start of my next turn",
	descriptionCantripDie : "Spell atk for `CD`d10 Psychic dmg; on hit, the target can't take reactions until the start of my next turn",
	descriptionFull : "You assault the mind a creature within range with a torrent of psionic power. Make a ranged spell attack against the target. On hit, the creature takes 1d10 psychic damage and it cannot take reactions until the start of your next turn." + AtHigherLevels + "This spell's damage increases by 1d10 at 5th level (2d10), 11th level (3d10), and 17th level (4d10)."
};
SpellsList["mold earth"] = {
	name : "Mold Earth (LL)",
	nameShort : "Mold Earth (LL)",
	regExpSearch : /^(?=.*mold)(?=.*earth).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "shaman(laserllama)", "sorcerer", "sorcerer(laserllama)", "wizard", "wizard(laserllama)", "shaman"],
	level : 0,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "manipulate earth // 1 target, on hit 1d6 Bludgeoning/Piercing dmg and prone if Small or smaller",
	descriptionMetric : "manipulate earth // 1 target, on hit 1d6 Bludgeoning/Piercing dmg and prone if Small or smaller",
	descriptionShorter : "manipulate earth // 1 target, on hit 1d6 Bludgeoning/Piercing dmg and prone if Small or smaller",
	descriptionCantripDie : "manipulate earth // 1 target, on hit `CD`d6 Bludgeoning/Piercing dmg and prone if Small or smaller",
	descriptionFull : "You can manipulate the earth and use it to assault your foes. When you cast this spell choose one of the following effects:" + "\n   " + "Manipulate Earth. You manipulate loose earth and stone in a 5-foot cube within range, harmlessly excavating, moving, and depositing it up to 5 feet away, changing it into difficult terrain, or changing difficult terrain into normal terrain." + "\n   " + "Hurl Stone. You create a small ball of loose stone and dirt in your hand and hurl it at a target you can see within range, making a ranged spell attack against it. On hit, it takes your choice of either 1d6 bludgeoning or piercing damage, and if the target is Small or smaller it is knocked prone." + AtHigherLevels + "The damage of this Cantrip and the size of targets that it knocks prone increases by 1d6 at 5th (2d6, Medium), 11th (3d6, Large), and 17th level (4d6, Huge)."
};
SpellsList["mystic hammer"] = {
	name : "Mystic Hammer",
	nameShort : "Mystic Hammer",
	regExpSearch : /^(?=.*mystic)(?=.*hammer).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["psion(laserllama)"],
	level : 0,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "1 crea, Str save or 1d6 Force damage and prone",
	descriptionMetric : "1 crea, Str save or 1d6 Force damage and prone",
	descriptionShorter : "1 crea, Str save or 1d6 Force damage and prone",
	descriptionCantripDie : "1 crea, Str save or `CD`d6 Force damage and prone",
	descriptionFull : "You batter a creature within range with psionic force, forcing it to make a Strength saving throw. On a failed save, it takes 1d6 force damage and it knocked prone. Large and larger creatures have advantage on this Strength saving throw." + AtHigherLevels + "The damage of this Cantrip and size of creature that makes the saving throw normally grows at 5th level (2d6, Large), 11th level (3d6, Huge), and 17th level (4d6)."
};
SpellsList["otherworldly grasp"] = {
	name : "Otherworldly Grasp",
	nameShort : "Otherworldly Grasp",
	regExpSearch : /^(?=.*otherworldly)(?=.*grasp).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["shaman(laserllama)", "sorcerer", "sorcerer(laserllama)", "vessel(laserllama)", "warlock", "warlock(laserllama)", "shaman", "vessel"],
	level : 0,
	school : "Necro",
	time : "1 a",
	timeFull : "1 action",
	range : "Self",
	components : "S,M",
	compMaterial : "An empty hand",
	duration : "Instantaneous",
	description : "Melee spell atk vs. 1 crea in reach for 1d8 Necrotic dmg; I can gain temp HP equal to half the damage",
	descriptionCantripDie : "Melee spell atk vs. 1 crea in reach for `CD`d8 Necrotic dmg; I can gain temp HP equal to half the damage",
	descriptionFull : "You channel necrotic spiritual power to your hand, changing it into a withered specter of itself. Make a melee spell attack against one creature within your reach. On hit, it takes 1d8 necrotic damage, and you can choose to gain temporary hit points equal to half the damage dealt by this spell." + AtHigherLevels + "The damage of this spell increases by 1d8 at 5th (2d8), 11th (3d8), and 17th level (4d8)."
};
SpellsList["poison spray"] = {
	name : "Poison Spray (LL)",
	nameShort : "Poison Spray (LL)",
	regExpSearch : /^(?=.*poison)(?=.*spray).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "druid", "druid(laserllama)", "magus(laserllama)", "shaman(laserllama)", "sorcerer", "sorcerer(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)", "magus", "shaman"],
	level : 0,
	school : "Necro",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Ranged spell atk vs. 1 crea I can see for 1d12 Poison dmg",
	descriptionCantripDie : "Ranged spell atk vs. 1 crea I can see for `CD`d12 Poison dmg",
	descriptionFull : "You raise your hand and project a toxic mist at a creature you can see within range. Make a ranged spell attack against the target. On hit, the target takes 1d12 poison damage." + AtHigherLevels + "The damage of this spell increases by 1d12 at 5th (2d12), 11th (3d12), and 17th level (4d12)."
};
SpellsList["primal savagery"] = {
	name : "Primal Savagery (LL)",
	nameShort : "Primal Savagery (LL)",
	regExpSearch : /^(?=.*primal)(?=.*savagery).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "shaman(laserllama)", "shaman"],
	level : 0,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "Self",
	components : "S,M",
	compMaterial : "An empty hand",
	duration : "Instantaneous",
	description : "claws until next turn, on hit 1d6 Slashing dmg + spell mod",
	descriptionMetric : "claws until next turn, on hit 1d6 Slashing dmg + spell mod",
	descriptionShorter : "claws until next turn, on hit 1d6 Slashing dmg + spell mod",
	descriptionCantripDie : "claws until next turn, on hit 1d6 Slashing dmg + spell mod",
	descriptionFull : "Your fingers transform into sharp claws until the start of your next turn. As part of the action used to cast this spell you can make a melee spell attack with these claws. On hit, they deal slashing damage equal to 1d6 + your spellcasting modifier." + AtHigherLevels + "The number of attacks you make with the claws as part of the action to cast this spell increases at 5th level (two), 11th level (three), and 17th level (four)."
};
SpellsList["psionic strike"] = {
	name : "Psionic Strike",
	nameShort : "Psionic Strike",
	regExpSearch : /^(?=.*psionic)(?=.*strike).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["psion(laserllama)"],
	level : 0,
	school : "Evoc",
	time : "1 atk",
	timeFull : "In place of one attack of the Attack action",
	range : "Self",
	components : "S,M",
	compMaterial : "An empty hand",
	duration : "Instantaneous",
	description : "1 target, on hit Psychic dmg instead of normal dmg",
	descriptionMetric : "1 target, on hit Psychic dmg instead of normal dmg",
	descriptionShorter : "1 target, on hit Psychic dmg instead of normal dmg",
	descriptionCantripDie : "1 target, on hit Psychic dmg instead of normal dmg",
	descriptionFull : "As part of an unarmed strike, you manifest a blade of psionic energy in your hand. On hit, the target takes psychic damage equal to 1d6 + your Strength modifier, in place of the normal damage of your unarmed strike. Your hand instantly reverts to its normal appearance after your attack." + AtHigherLevels + "The damage die of this spell increases at 5th level (1d8), 11th level (1d10), and 17th level (1d12)."
};
SpellsList["resistance"] = {
	name : "Resistance (LL)",
	nameShort : "Resistance (LL)",
	regExpSearch : /^(?=.*resistance).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)", "cleric", "cleric(laserllama)", "druid", "druid(laserllama)", "magus(laserllama)", "wizard", "wizard(laserllama)", "magus"],
	level : 0,
	school : "Abjur",
	time : "1 a",
	timeFull : "1 action",
	range : "Touch",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "1 crea, 1d4 bonus to 1 save per turn",
	descriptionMetric : "1 crea, 1d4 bonus to 1 save per turn",
	descriptionShorter : "1 crea, 1d4 bonus to 1 save per turn",
	descriptionCantripDie : "1 crea, 1d4 bonus to 1 save per turn",
	descriptionFull : "You weave a protective mantle of magic around one willing creature you touch. Once per turn, when the target is forced to make a saving throw it can gain a 1d4 bonus to its roll."
};
SpellsList["seance"] = {
	name : "Seance",
	nameShort : "Seance",
	regExpSearch : /^(?=.*seance).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["shaman(laserllama)", "shaman"],
	level : 0,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V,S",
	duration : "1 action",
	description : "Create harmless sensory effects, reveal ley lines, or a mote points to spiritual power or death",
	descriptionMetric : "Create harmless sensory effects, reveal ley lines, or a mote points to spiritual power or death",
	descriptionShorter : "Create harmless sensory effects, reveal ley lines, or a mote points to spiritual power or death",
	descriptionCantripDie : "Create harmless sensory effects, reveal ley lines, or a mote points to spiritual power or death",
	descriptionFull : "You channel minor spirits, allowing them to work through you so that they may once again affect change in the material world. You create one of the following effects within range:" + "\n   " + "You create an instantaneous, harmless sensory effect," + "\n   " + "such as a flickering azure flame, an unnaturally chill" + "\n   " + "breeze, rhythmic chanting, or the smell of incense." + "\n   " + "A minor spirit briefly appears and fades away." + "\n   " + "You instantaneously light or snuff out a candle, torch," + "\n   " + "or a small campfire." + "\n   " + "A mote or iridescent light points to the closest place" + "\n   " + "of spiritual power, recent death, or new birth." + "\n   " + "Ley lines within range briefly reveal themselves as they" + "\n   " + "flicker with otherworldly light."
};
SpellsList["shape water"] = {
	name : "Shape Water (LL)",
	nameShort : "Shape Water (LL)",
	regExpSearch : /^(?=.*shape)(?=.*water).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "shaman(laserllama)", "sorcerer", "sorcerer(laserllama)", "wizard", "wizard(laserllama)", "shaman"],
	level : 0,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Manipulate water // 1 crea, Dex save or 1d8 Cold dmg",
	descriptionMetric : "Manipulate water // 1 crea, Dex save or 1d8 Cold dmg",
	descriptionShorter : "Manipulate water // 1 crea, Dex save or 1d8 Cold dmg",
	descriptionCantripDie : "Manipulate water // 1 crea, Dex save or `CD`d8 Cold dmg",
	descriptionFull : "You can manipulate water and use it to assault your enemies. When you cast this spell choose one of the following effects:" + "\n   " + "Manipulate Water. You manipulate water in a 5-foot cube within range, harmlessly changing the direction it is flowing, altering its color or opacity, causing simple animated shapes to appear, or if there are no creatures in it you can freeze it." + "\n   " + "Hurl Wave. You create a small orb of tempestuous water in your hand and hurl it at one target you can see within range, forcing it to make a Dexterity saving throw. On a failed save, the target takes 1d8 cold damage, and any non-magical flame it is holding, or within 5 feet of it, is instantly extinguished." + AtHigherLevels + "The damage of this Cantrip increases by 1d8 at 5th (2d8), 11th (3d8), and 17th level (4d8)."
};
SpellsList["sword burst"] = {
	name : "Sword Burst (LL)",
	nameShort : "Sword Burst (LL)",
	regExpSearch : /^(?=.*sword)(?=.*burst).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["magus(laserllama)", "psion(laserllama)", "warlock", "warlock(laserllama)", "magus"],
	level : 0,
	school : "Abjur",
	time : "1 atk",
	timeFull : "In place of one attack of the Attack action",
	range : "Self",
	components : "V,S",
	duration : "Instantaneous",
	description : "5-ft radius all creas, Dex save or Slashing dmg",
	descriptionMetric : "5-ft radius all creas, Dex save or Slashing dmg",
	descriptionShorter : "5-ft radius all creas, Dex save or Slashing dmg",
	descriptionCantripDie : "5-ft radius all creas, Dex save or Slashing dmg",
	descriptionFull : "You conjure a defensive ring of spectral blades which sweep around you. Creatures within 5 feet of you must succeed on a Dexterity saving throw or take 1d6 slashing damage." + AtHigherLevels + "The damage die of this spell increases at 5th level (1d8), 11th level (1d10), and 17th level (1d12)."
};
SpellsList["tempestuous blade"] = {
	name : "Tempestuous Blade",
	nameShort : "Tempestuous Blade",
	regExpSearch : /^(?=.*tempestuous)(?=.*blade).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "magus(laserllama)", "warlock", "warlock(laserllama)", "magus"],
	level : 0,
	school : "Evoc",
	time : "1 bns",
	timeFull : "1 bonus action",
	range : "Self",
	components : "V,M",
	compMaterial : "A simple or martial melee weapon",
	duration : "1 rnd",
	description : "infuse weapon, trigger for lightning dmg",
	descriptionMetric : "infuse weapon, trigger for lightning dmg",
	descriptionShorter : "infuse weapon, trigger for lightning dmg",
	descriptionCantripDie : "infuse weapon, trigger for lightning dmg",
	descriptionFull : "As a bonus action, you infuse the melee weapon used in the casting of this spell with electrified magic. Until the start of your next turn, your attacks with that weapon deal lightning damage in place of the weapon's normal damage type." + "\n   " + "Once per casting when you deal lightning damage with this spell, you can infuse your target with an electrical charge until the start of your next turn. If the target uses a reaction of any kind before then, this tempestuous charge is unleashed and it takes 1d6 lightning damage." + AtHigherLevels + "The lightning damage dealt by this spell when the target uses its reaction increases at 5th level (1d8), 11th level (1d10), and 17th level (1d12)."
};
SpellsList["true strike"] = {
	name : "True Strike (LL)",
	nameShort : "True Strike (LL)",
	regExpSearch : /^(?=.*true)(?=.*strike).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)", "magus(laserllama)", "psion(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)", "magus"],
	level : 0,
	school : "Div",
	time : "1 bns",
	timeFull : "1 bonus action",
	range : "Self",
	components : "S,M",
	compMaterial : "A melee weapon worth at least 1 sp",
	duration : "Conc, 1 rnd",
	description : "Add bonus to your next melee attack roll",
	descriptionMetric : "Add bonus to your next melee attack roll",
	descriptionShorter : "Add bonus to your next melee attack roll",
	descriptionCantripDie : "Add bonus to your next melee attack roll",
	descriptionFull : "You infuse your weapon with divination magic and point it at one creature you can see. The next time you make a melee attack with this weapon against that target before the start of your next turn, you add 1d4 to your attack roll." + AtHigherLevels + "This spell's attack roll bonus increases when you reach 5th (1d6), 11th (1d8), and 17th level (1d10)."
};
SpellsList["vicious mockery"] = {
	name : "Vicious Mockery (LL)",
	nameShort : "Vicious Mockery (LL)",
	regExpSearch : /^(?=.*vicious)(?=.*mockery).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)"],
	level : 0,
	school : "Ench",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V",
	duration : "Instantaneous",
	description : "1 crea that can hear and understand, Wis save or 1d6 psychic dmg and disv on attack others",
	descriptionMetric : "1 crea that can hear and understand, Wis save or 1d6 psychic and dmg disv on attack others",
	descriptionShorter : "1 crea that can hear and understand, Wis save or 1d6 psychic and dmg disv on attack others",
	descriptionCantripDie : "1 crea that can hear and understand, Wis save or `CD`d6 psychic dmg and disv on attack others",
	descriptionFull : "You unleash a string of provoking words at a creature that can hear and understand you within range. The target must succeed on a Wisdom saving throw, or it takes 1d6 psychic damage and have disadvantage on every attack roll against targets other than you until the start of your next turn." + AtHigherLevels + "This spell's damage increases by 1d6 when you reach 5th (2d6), 11th (3d6), and 17th level (4d6)."
};

// ----- 1st-level spells -----
SpellsList["beast bond"] = {
	name : "Beast Bond (LL)",
	nameShort : "Beast Bond (LL)",
	regExpSearch : /^(?=.*beast)(?=.*bond).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "ranger", "ranger(laserllama)"],
	level : 1,
	school : "Div",
	time : "1 a",
	timeFull : "1 action",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "Saliva from both you and the target",
	duration : "1 h",
	description : "Telepathy with a Beast, it has adv, against targets I can see within 5ft",
	descriptionShorter : "Telepathy with a Beast, adv. attacks",
	descriptionFull : "You touch a Beast that is either Friendly or Charmed by you and establish a mental link with it. This spell automatically fails if the Beast's Intelligence is 4 or higher." + "\n   " + "For the duration, your minds are linked so long as you can see each other. You can communicate telepathically through this link, even if you do not share a language. Lastly, the link grants the Beast advantage on attack rolls against any target you can see within 5 feet of you." + "\n   " + "If you cast this spell on another Beast, previous instances of this spell are immediately dispelled."
};
SpellsList["compelled duel"] = {
	name : "Compelled Duel (LL)",
	nameShort : "Compelled Duel (LL)",
	regExpSearch : /^(?=.*compelled)(?=.*duel).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["paladin", "paladin(laserllama)"],
	level : 1,
	school : "Ench",
	time : "1 bns",
	timeFull : "1 bonus action",
	range : "30 ft",
	components : "V",
	duration : "1 min",
	description : "Challenge a crea to duel, It has disadv. attacking all but me",
	descriptionShorter : "Challenge a crea to duel, It has disadv. attacking all but me",
	descriptionFull : "You utter a challenge infused with divine authority, targeting one creature within range that can both hear and understand you. For the duration, it has disadvantage on attacks against targets other than you, it cannot willingly move more than 30 feet from you, and if it casts a spell that targets creatures you must be one of the targets of that spell." + "\n   " + "At the end of each of its turns, the creature can make a Wisdom saving throw, ending this effect on a success." + "\n   " + "The spell also ends early if you cast this spell again, if you attack or force another creature to make an ability check or a saving throw, if you are Incapacitated, or if your allies attack the target or force it to make an ability check or saving throw."
};
SpellsList["conjure familiar"] = {
	name : "Conjure Familiar",
	nameShort : "Conjure Familiar",
	regExpSearch : /^(?=.*conjure)(?=.*familiar).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["wizard", "wizard(laserllama)"],
	level : 1,
	school : "Conj",
	ritual : true,
	time : "1 h",
	timeFull : "1 hour",
	range : "10 ft",
	components : "V,S,M",
	compMaterial : "A drop of the spellcaster's blood, consumed by the casting of this spell",
	duration : "Instantaneous",
	description : "-1 max HP: conjure a CR 0 beast familiar (celestial/fey/fiend); telepathy & senses in 100 ft; delivers touch spells",
	descriptionFull : "Offering a drop of blood, reduce your maximum hit points by 1 to conjure a Familiar. It is Friendly to you and it obeys your commands. Your Familair uses the following rules:" + "\n   " + "Statistics. Your Familiar manifests as a CR 0 Beast of your choice, but its creature type is Celestial, Fey, or Fiend. Familiars often reflect the true nature of the caster's soul in appearance and alignment. You can only have one Familiar, but you can perform the ritual again to change its form." + "\n   " + "Control. In combat, the Familiar shares your initiative and acts during your turn. It cannot attack, but can otherwise act normally. If it drops to 0 hit points your Familiar is destroyed. If it is destroyed, you regain the maximum hit points spent in its creation at the end of your next long rest." + "\n   " + "Dismissal. As an action, you can shunt your Familiar to a unique pocket dimension, or dismiss it forever. As an aciton, you can recall your Familiar from its pocket dimension, and it reappears in an unoccupied space you can see within 10 ft." + "\n   " + "Soul Bound. While your Familiar is within 100 ft., you can communicate with it Telepathically. As an action, you can use your Familiar's senses in place of your own until you end this effect (no action required) or you are Incapacitated. While you do so, you are blind and deaf to your own surroundings." + "\n   " + "Spellcasting. When you cast a spell with a range of touch and your Familiar is within 100 ft., your Familiar can use its reaction to deliver that spell using your Spellcasting ability." + "\n   " + "[see the Compendium of Spells for the table/stat block]"
};
SpellsList["create snare"] = {
	name : "Create Snare (LL)",
	nameShort : "Create Snare (LL)",
	regExpSearch : /^(?=.*create)(?=.*snare).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "druid", "druid(laserllama)", "ranger", "ranger(laserllama)", "wizard", "wizard(laserllama)"],
	level : 1,
	school : "Abjur",
	time : "1 a",
	timeFull : "1 action",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "30 feet of cord or rope, which is consumed by the spell",
	duration : "Until dispelled/triggered",
	description : "Invisible snare in 30 ft; first Small+ crea Dex save (disadv. if unaware) or prone + restrained; SL2+: 2d6+1d6/SL Slash.",
	durationFull : "Until dispelled or triggered",
	allowUpCasting : true,
	descriptionFull : "You infuse a length of cord or rope with magic, transforming it into a magic Snare, pointing it toward an unoccupied space you can see within 30 feet. It unfurls in that space and turns invisible. It can only be detected by a successful Investigation check against your Spell save DC." + "\n   " + "The first Small or larger creature to move into that space triggers your Snare and must make a Dexterity saving throw or fall Prone in its space and be Restrained by the Snare. If a creature is unaware of the Snare, it makes this saving throw with disadvantage. If a creature is in the space when you set the Snare, the Snare is instantly triggered." + "\n   " + "A Restrained creature makes a Strength saving throw at the end of each of its turns, escaping the Snare on a success. Another creature can use its action to touch the Restratined creature make a Strength check against your Spell save DC, destroying the Snare on a success." + AtHigherLevels + "If you cast this spell using a 2nd level spell slot, the Snare deals 2d6 slashing damage whenever a creature fails a saving throw to avoid or escape the Snare." + "\n   " + "If you cast this spell using a spell slot of 3rd-level or higher, this damage increases by 1d6 for each slot level above 2nd."
};
SpellsList["create water"] = {
	name : "Create Water (LL)",
	nameShort : "Create Water (LL)",
	regExpSearch : /^(?=.*create)(?=.*water).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["cleric", "cleric(laserllama)", "druid", "druid(laserllama)", "ranger"],
	level : 1,
	school : "Trans",
	time : "1 min",
	timeFull : "1 minute",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "A drop of water if creating water, or a grain of sand if destroying water",
	duration : "Instantaneous",
	description : "Create or destroy 10(per level) gallons of water",
	descriptionShorter : "Create or destroy 10(per level) gallons of water",
	allowUpCasting : true,
	descriptionFull : "You create up to 10 gallons of clean water within range. The water appears in open containers you can see, or falls as rain in a 30-foot radius centered on you, extinguishing all flames." + "\n   " + "Inverse Casting. You can use this spell to destory water. You destroy up to 10 gallons of water in open containers in range, or destroy fog in a 30-foot radius centered on you." + AtHigherLevels + "If you cast this spell with a spell slot of 2nd level or higher, you can create (or destroy) an additional 10 gallons of water, or the radius of this spell effect increases by 10 feet, for each slot level above 1st."
};
SpellsList["divine favor"] = {
	name : "Divine Favor (LL)",
	nameShort : "Divine Favor (LL)",
	regExpSearch : /^(?=.*divine)(?=.*favor).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["paladin", "paladin(laserllama)"],
	level : 1,
	school : "Evoc",
	time : "1 bns",
	timeFull : "1 bonus action",
	range : "Self",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "Your prayer empowers one weapon of your choice within 10 feet of you with divine radiance. Until the spell ends, attacks with that weapon deal an extra 1d4 radiant damage on a hit.",
	descriptionMetric : "Your prayer empowers one weapon of your choice within 10 feet of you.",
	descriptionShorter : "Empowers a weapon to deal an extra 1d4 radiant dmg.",
	descriptionCantripDie : "Your prayer empowers one weapon of your choice within 10 feet of you.",
	allowUpCasting : true,
	descriptionFull : "Your prayer empowers one weapon of your choice within 10 feet of you with divine radiance. Until the spell ends, attacks with that weapon deal an extra 1d4 radiant damage on a hit." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, you target one additional weapon within 10 feet of you for each slot level above 1st."
};
SpellsList["ensnaring strike"] = {
	name : "Ensnaring Strike (LL)",
	nameShort : "Ensnaring Strike (LL)",
	regExpSearch : /^(?=.*ensnaring)(?=.*strike).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "ranger", "ranger(laserllama)"],
	level : 1,
	school : "Conj",
	time : "Hit",
	timeFull : "No action required, when you hit with a weapon attack (see spell)",
	range : "Self",
	components : "V,M",
	compMaterial : "A weapon worth at least 1 sp",
	duration : "Conc, 1 min",
	description : "On hit, target Str save or restrained and takes 1d6 piercing damage each turn",
	allowUpCasting : true,
	descriptionFull : "When you hit a creature with a weapon attack, you can cause the point of impact to explode with a writhing mass of thorny vines. The target must succeed on a Strength saving throw or be restrained by the vines until the spell ends. Creatures that are Large or larger have advantage on this saving throw." + "\n   " + "The restrained creature takes 1d6 piercing damage at the start of each of its turns. The restrained creature, or another creature within 5 feet, can use its action to make a Strength check against your Spell save DC, freeing it on a success." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd-level or higher, the damage it takes at the start of each turn increases by 1d6 for each slot level above 1st."
};
SpellsList["ethereal anchor"] = {
	name : "Ethereal Anchor",
	nameShort : "Ethereal Anchor",
	regExpSearch : /^(?=.*ethereal)(?=.*anchor).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["paladin", "paladin(laserllama)", "psion(laserllama)", "vessel(laserllama)", "vessel"],
	level : 1,
	school : "Evoc",
	time : "1 a",
	timeFull : "1 action",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A silver nail",
	duration : "Conc, 1 min",
	description : "Ranged spell attack; 3d6 radiant dmg. On hit, target's speed is reduced to 0 for the duration.",
	descriptionMetric : "Ranged spell attack; radiant dmg. On hit, target's speed is reduced to 0 for the duration.",
	descriptionShorter : "Ranged spell attack; radiant dmg. On hit, target's speed is reduced to 0 for the duration.",
	allowUpCasting : true,
	descriptionFull : "You hurl a bolt of pure spirit at a creature within range. Make a ranged spell attack against your target. On hit, it takes 3d6 radiant damage and for the duration, its speed is reduced to 0 as it is pinned in place by the spiritual bolt. As an action, any creature can make a Strength ability check against your Spell save DC, ending this spell's effects on a success." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the radiant damage increases by 1d6 for each slot level above 1st."
};
SpellsList["ghastly flight"] = {
	name : "Ghastly Flight",
	nameShort : "Ghastly Flight",
	regExpSearch : /^(?=.*ghastly)(?=.*flight).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["shaman(laserllama)", "warlock", "warlock(laserllama)", "shaman"],
	level : 1,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "Self (60 foot line)",
	components : "V,S,M",
	compMaterial : "The powdered remains of a creature",
	duration : "Instantaneous",
	description : "60-ft long, 5-ft wide line; Con save or Necrotic dmg, can't regain hp until the start of your next turn. Success: half dmg, can regain hp as normal.",
	descriptionMetric : "18-m long, 1.5-m wide line; Necrotic dmg, can't regain hp until next turn.",
	descriptionShorter : "60-ft line; Con save or Necrotic dmg, can't regain hp until next turn.",
	allowUpCasting : true,
	descriptionFull : "You release a malevolent spirit that flies out from you in a direction of your choice in a 60-foot long, 5-foot wide line, at which point it fades away. Each creature within the line must make a Constitution saving throw. On a failed save, creatures take 2d8 necrotic damage and cannot regain hit points until the start of your next turn. On a success, creatures take half as much damage and can regain hit points as normal." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd-level or higher, the damage increases by 1d8 for each slot level above 1st."
};
SpellsList["goodberry"] = {
	name : "Goodberry (LL)",
	nameShort : "Goodberry (LL)",
	regExpSearch : /^(?=.*goodberry).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "ranger", "ranger(laserllama)"],
	level : 1,
	school : "Trans",
	time : "1 min",
	timeFull : "1 minute",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "Up to 10 fresh-picked berries, which are consumed by the casting of this spell",
	duration : "Instantaneous",
	description : "Magically enhance up to 10 fresh berries",
	descriptionFull : "You hold up to ten berries in your hands and infuse them with primal magic. As an action, a creature can eat a berry. It then regains 1 hit point and nourishment for one day." + "\n   " + "The berries wither and lose their potency if they have not been consumed within 24 hours of the casting of this spell."
};
SpellsList["hail of thorns"] = {
	name : "Hail of Thorns (LL)",
	nameShort : "Hail of Thorns (LL)",
	regExpSearch : /^(?=.*hail)(?=.*thorns).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["ranger", "ranger(laserllama)"],
	level : 1,
	school : "Conj",
	time : "Hit",
	timeFull : "No action required, when you hit with a weapon attack (see spell)",
	range : "60 ft",
	components : "V",
	duration : "Instantaneous",
	description : "On ranged weapon hit, target and all within 5 ft: Dex save or 1d10+1d10/SL Piercing dmg; half on save",
	allowUpCasting : true,
	descriptionFull : "When you hit a creature within range with a ranged weapon attack, you can cause the piece of ammunition to explode into a hail of thorns. In addition to the normal effect of the attack, the target of your attack and each creature within 5 feet must make a Dexterity saving throw. Creatures take 1d10 piercing damage on a failure, or half as much damage on a success." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd-level or higher, the damage increases by 1d10 for each slot level above 1st."
};
SpellsList["id insinuation"] = {
	name : "Id Insinuation",
	nameShort : "Id Insinuation",
	regExpSearch : /^(?=.*id)(?=.*insinuation).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["psion(laserllama)"],
	level : 1,
	school : "Ench",
	time : "1 a",
	timeFull : "1 action",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "1 crea, Wis save or be incapacitated.",
	descriptionMetric : "1 crea, Wis save or be incapacitated.",
	descriptionShorter : "1 crea, Wis save or be incapacitated.",
	descriptionCantripDie : "1 crea, Wis save or be incapacitated.",
	allowUpCasting : true,
	descriptionFull : "You unleash a storm of conflicting desires within the mind of one creature you can see within range. It must succeed on a Wisdom saving throw or be incapacitated for the duration." + "\n   " + "The creature can repeat this Wisdom saving throw at the end of each of its turns and each time that it takes damage, ending the effects of this spell on a successful save." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them."
};
SpellsList["jump"] = {
	name : "Jump (LL)",
	nameShort : "Jump (LL)",
	regExpSearch : /^(?=.*jump).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "druid", "druid(laserllama)", "magus(laserllama)", "psion(laserllama)", "ranger", "ranger(laserllama)", "sorcerer", "sorcerer(laserllama)", "vessel(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)", "magus", "vessel"],
	level : 1,
	school : "Trans",
	time : "1 bns",
	timeFull : "1 bonus action",
	range : "Touch",
	components : "V S M",
	compMaterial : "A grasshopper's hind leg",
	duration : "1 min",
	description : "Touch a willing creature; it can jump up to 30 ft using 10 ft of movement. Can use once on each turn.",
	descriptionMetric : "Touch a willing creature; it can jump `CD` m using 3 m of movement.",
	descriptionShorter : "Touch a creature; it can jump up to `CD` ft using 10 ft of movement.",
	allowUpCasting : true,
	descriptionFull : "You touch a willing creature and greatly alter its buoyancy. Once on each of its turns until the spell ends, the target can spend 10 feet of its movement to jump up to 30 feet." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd-level or higher, the distance of this magical jump increases by 10 feet for each slot level above 1st."
};
SpellsList["searing smite"] = {
	name : "Searing Smite (LL)",
	nameShort : "Searing Smite (LL)",
	regExpSearch : /^(?=.*searing)(?=.*smite).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["paladin", "paladin(laserllama)"],
	level : 1,
	school : "Evoc",
	time : "Hit",
	timeFull : "No action required, when you hit with a weapon attack (see spell)",
	range : "Self",
	components : "V,M",
	compMaterial : "A melee weapon worth at least 1 sp",
	duration : "Instantaneous",
	description : "On hit, 1d8 Fire dmg. Target must make a Con save or take 1d8 Fire dmg at the start of its turns until extinguished.",
	descriptionMetric : "On hit, Fire dmg. Target must make a Con save or take 1Fire dmg at the start of its turns until extinguished.",
	descriptionShorter : "On hit, Fire dmg. Target must make a Con save or take 1Fire dmg at the start of its turns until extinguished.",
	descriptionCantripDie : "On hit, Fire dmg. Target must make a Con save or take 1Fire dmg at the start of its turns until extinguished.",
	allowUpCasting : true,
	descriptionFull : "When you hit with a melee weapon attack you can cause the weapon to ignite with white-hot intensity. This attack deals 1d8 additional fire damage and the target bursts into flames. At the start of each of its turns, it must make a Constitution saving throw. On a failed save, it takes 1d8 fire damage, but on a success, the flames are extinguished. Another creature can use an action to extinguish these magical flames." + "\n   " + "If your target is a plant, both the initial fire damage and the fire damage dealt on a failed saving throw increase by 1d8." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd-level or higher, both the initial fire damage dealt by the attack and the fire damage dealt to the creature on a failed saving throw increase by 1d8 for each slot."
};
SpellsList["shield"] = {
	name : "Shield (LL)",
	nameShort : "Shield (LL)",
	regExpSearch : /^(?=.*shield).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["magus(laserllama)", "psion(laserllama)", "sorcerer", "sorcerer(laserllama)", "wizard", "wizard(laserllama)", "magus"],
	level : 1,
	school : "Abjur",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you are hit",
	range : "Self",
	components : "V,S",
	duration : "Instantaneous",
	description : "Until the end of the turn, gain bonus to AC equal to 1 + Spellcasting modifier and take no damage from magic missile.",
	allowUpCasting : true,
	descriptionFull : "by an attack you can see or targeted by magic missile A shimmering barrier of magical force appears to protect you. Until the end of the current turn, you gain a bonus to your Armor Class equal to 1 + your Spellcasting modifier and you take no damage from the magic missile spell." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd-level or higher, the bonus to your Armor Class increases by 1 for each slot level above 1st."
};
SpellsList["thunderous smite"] = {
	name : "Thunderous Smite (LL)",
	nameShort : "Thunderous Smite (LL)",
	regExpSearch : /^(?=.*thunderous)(?=.*smite).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)", "paladin", "paladin(laserllama)"],
	level : 1,
	school : "Evoc",
	time : "Hit",
	timeFull : "No action required, when you hit with a weapon attack (see spell)",
	range : "Self",
	components : "V,M",
	compMaterial : "A melee weapon worth at least 1 sp",
	duration : "Instantaneous",
	description : "On hit, 1d8 Thunder dmg. Target Str save or pushed 10ft and prone. Bonus vs constructs/earth elementals.",
	descriptionMetric : "On hit, Thunder dmg. Target must make a Str save or be pushed 10 ft away and fall prone.",
	descriptionShorter : "On hit, Thunder dmg. Target must make a Str save or be pushed 10 ft away and fall prone.",
	allowUpCasting : true,
	descriptionFull : "When you hit with a melee weapon attack, you can cause the weapon to explode with a thunderous shockwave audible out to 300 feet. This attack deals 1d8 additional thunder damage, and the target must succeed on a Strength saving throw or be pushed 10 feet away from you in a line and fall prone. Huge and larger targets have advantage on this saving throw." + "\n   " + "If your target is a construct or an earth elemental the bonus thunder damage increases by 1d8 and it has disadvantage on the Strength saving throw." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd-level or higher, the thunder damage increases by 1d8, and the target is pushed an additional 10 feet away from you in a straight line for each spell slot level above 1st."
};
SpellsList["torrent"] = {
	name : "Torrent",
	nameShort : "Torrent",
	regExpSearch : /^(?=.*torrent).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "magus(laserllama)", "sorcerer", "sorcerer(laserllama)", "wizard", "wizard(laserllama)", "magus"],
	level : 1,
	school : "Evoc",
	time : "1 a",
	timeFull : "1 action",
	range : "Self (30 foot line)",
	components : "V,S,M",
	compMaterial : "A mirror",
	duration : "Instantaneous",
	description : "30-ft line; Str save or 1d12 Cold dmg, knocked back 10ft and prone. Huge+ creatures have advantage.",
	descriptionMetric : "A burst of elemental water erupts in a 9 m line. Str save or take Cold dmg, be knocked back 10 and fall prone.",
	descriptionShorter : "A burst of elemental water erupts in a 30 ft line. Str save or take Cold dmg, be knocked back and fall prone.",
	allowUpCasting : true,
	descriptionFull : "A burst of elemental water erupts from you in a line 30 feet long and 5 feet wide in a direction you choose, forcing any creature in that area to make a Strength saving throw. On a failure, it takes 1d12 cold damage and is knocked back 10 feet in a straight line and falls prone. On a success, it takes half as much damage and is not moved or knocked prone. A Huge or larger creature has advantage on its saving throw." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd-level or higher, the damage increases by 1d12 and it knocks back 10 additional feet for each slot level above 1st."
};
SpellsList["witch bolt"] = {
	name : "Witch Bolt (LL)",
	nameShort : "Witch Bolt (LL)",
	regExpSearch : /^(?=.*witch)(?=.*bolt).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "magus(laserllama)", "shaman(laserllama)", "sorcerer", "sorcerer(laserllama)", "vessel(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)", "magus", "shaman", "vessel"],
	level : 1,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "A piece of wood struck by lightning",
	duration : "Conc, 1 min",
	description : "On hit, 1d12 Lightning dmg. Cannot move >30ft apart. Action to deal 1d12 Lightning dmg each turn.",
	allowUpCasting : true,
	descriptionFull : "A beam of crackling energy lances out toward a creature within range, forming a sustained arc of lightning between you and the target. Make a ranged spell attack against that creature. On a hit, the target takes 1d12 lightning damage, and neither you nor the target can move more than 30 feet away from each other while this spell lasts." + "\n   " + "You can use an action on each subsequent turn to deal an additional 1d12 lighting damage to the creature. A creature can attempt to move beyond the range of the spell by using its action to make a Strength check against your Spell save DC. If another creature attempts to move the target of this spell beyond the range of this spell it can use its action to make a Strength check against your Spell save DC. Any attempts by the target or another creature (magical or mundane) to move the target beyond this range automatically fail." + "\n   " + "The spell immediately ends if you are forced to move more than 30 feet away from the target of this spell." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, both the initial and subsequent damage increases by 1d12 for each slot level above 1st."
};
SpellsList["wrathful smite"] = {
	name : "Wrathful Smite (LL)",
	nameShort : "Wrathful Smite (LL)",
	regExpSearch : /^(?=.*wrathful)(?=.*smite).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["paladin", "paladin(laserllama)"],
	level : 1,
	school : "Evoc",
	time : "Hit",
	timeFull : "No action required, when you hit with a weapon attack (see spell)",
	range : "Self",
	components : "V,M",
	compMaterial : "A melee weapon worth at least 1 sp",
	duration : "Conc, 1 min",
	description : "On melee weapon hit, +1d8+1d8/SL Psychic dmg (+1d8 vs. aberrations/telepaths); Wis save or frightened; save as action",
	allowUpCasting : true,
	descriptionFull : "When you hit with a melee weapon attack you can cause the weapon to strike at both body and mind. This attack deals an additional 1d8 psychic damage, and the target must succeed on a Wisdom saving throw, or it is frightened of you until the spell ends. As an action, the creature can repeat this Wisdom saving throw, ending the effects of the spell on a success." + "\n   " + "If your target is an aberration or it can speak telepathically this bonus psychic damage increases by 1d8." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd-level or higher, the psychic damage increases by 1d8 for each spell slot level above 1st." + "\n   " + "[see the Compendium of Spells for the table/stat block]"
};

// ----- 2nd-level spells -----
SpellsList["animate object"] = {
	name : "Animate Object (LL)",
	nameShort : "Animate Object (LL)",
	regExpSearch : /^(?=.*animate)(?=.*object).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "bard", "bard(laserllama)", "sorcerer", "sorcerer(laserllama)", "wizard", "wizard(laserllama)"],
	level : 2,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 h",
	description : "Animate a Small object (larger with SL3+) under my control; bonus action to command it in 500 ft; see book",
	allowUpCasting : true,
	descriptionFull : "You infuse one Small or smaller nonmagical object you can see with life, temporarily animating it under your control. For the duration, or until destroyed, it uses the rules below: Statistics. The Animated Object uses the stat block below. It uses your Spell save DC, spell slot spent on it (Spell Slot), your Spell Attack Modifier, and your Proficiency Bonus (PB) in several places throughout the stat block. If the Animated Object is reduced to 0 hit points, it reverts to its inanimate form and any extra damage carries over. Control. While in combat, the Animated Object shares your initiative and acts during your turn. However, unless you command it, the Animated Object remains in its space and it only acts to defend itself. While you are within 500 feet of the Animated Object, you can Telepathically command it with a bonus action, determining how it will act on its turn or to set a general course of action for it (ie: \"defend this door\") until you give it another command. At Higher Levels. When you cast this spell with a slot of a higher level, you can animate larger objects, as shown on the table below. The damage dice for its Slam also increase:" + "\n   " + "[see the Compendium of Spells for the table/stat block]" + "\n   " + "3rd Medium 2d6" + "\n   " + "4th Large 2d10" + "\n   " + "5th Huge 2d12" + "\n   " + "[see the Compendium of Spells for the table/stat block]"
};
SpellsList["awaken plant"] = {
	name : "Awaken Plant",
	nameShort : "Awaken Plant",
	regExpSearch : /^(?=.*awaken)(?=.*plant).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)"],
	level : 2,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V,S",
	duration : "Conc, 1 h",
	description : "Animate a Small plant (larger with SL3+) under my control; bonus action to command it in 60 ft; see book",
	allowUpCasting : true,
	descriptionFull : "You infuse a Small or smaller plant you can see with magic, animating it under your control. For the duration, or until it is destroyed, this Awakened Plant uses the rules below: Statistics. The Awakened Plant uses the stat block below. It uses your Spell save DC, the slot spent on this spell (Spell Slot), your Spell Attack Modifier, and Proficiency Bonus (PB) in several places. The Plant is destroyed at 0 hit points. If your concentration is broken before the end of the spell, the Plant reverts to its original state, taking root in its space. Control. The Awakened Plant follows your commands to the best of its abilities. If it is not given a command it remains in its space and only acts to defend itself. In combat, it shares your initiative and it acts during your turn. While the Plant is within 60 feet of you, you can use your bonus action to mentally issue it a command. You determine how it will act, or you can set a general course of action for it (\"defend that tree\"). This Plant follows your commands until they are completed or it is destroyed. At Higher Levels. When you cast this spell with a slot of a higher level, you can animate larger plants, as shown on the table below. The damage dice for its Slam also increase:" + "\n   " + "[see the Compendium of Spells for the table/stat block]" + "\n   " + "3rd Medium 2d6" + "\n   " + "4th Large 2d10" + "\n   " + "5th Huge 2d12" + "\n   " + "[see the Compendium of Spells for the table/stat block]"
};
SpellsList["aura of frost"] = {
	name : "Aura of Frost",
	nameShort : "Aura of Frost",
	regExpSearch : /^(?=.*aura)(?=.*frost).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "magus(laserllama)", "sorcerer", "sorcerer(laserllama)", "magus"],
	level : 2,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "Self (10 foot radius)",
	components : "V",
	duration : "Conc, 1 min",
	description : "10 ft radius; Cold dmg & speed -20 ft on failed Con save.",
	allowUpCasting : true,
	descriptionFull : "Arcane frost, snow, and wind swirl about you in an aura with a 10-foot radius, and until the spell ends, the aura moves with you, centered on you. When a creature other than you, enters the area for the first time on a turn or starts its turn there, it must succeed on a Constitution saving throw or it takes 2d8 cold damage and have its speed is reduced by 20 feet until the start of its next turn. On a successful save, it takes half as much cold damage and its speed isn't reduced." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd-level or higher, a creature that fails its save takes an additional 1d8 cold damage and has its speed reduced by an additional 10 feet for each spell level above 2nd."
};
SpellsList["barkskin"] = {
	name : "Barkskin (LL)",
	nameShort : "Barkskin (LL)",
	regExpSearch : /^(?=.*barkskin).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "ranger", "ranger(laserllama)"],
	level : 2,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "A strip of oak bark",
	duration : "1 h",
	description : "CA of willing crea is 16 and cannot be reduced",
	descriptionFull : "You touch a willing creature that is not wearing metal armor. For the duration, it's skin has a rough, bark-like appearance, and its Armor Class cannot be lower than 16. The spell ends if the target is Incapacitated or dons metal armor, but it can wield a shield and retain this benefit."
};
SpellsList["branding smite"] = {
	name : "Branding Smite (LL)",
	nameShort : "Branding Smite (LL)",
	regExpSearch : /^(?=.*branding)(?=.*smite).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["paladin", "paladin(laserllama)"],
	level : 2,
	school : "Evoc",
	time : "Hit",
	timeFull : "No action required, when you hit with a weapon attack (see spell)",
	range : "Self",
	components : "V,M",
	compMaterial : "A melee weapon worth at least 1 sp",
	duration : "Conc, 1 min",
	description : "Radiant damage, target sheds dim light and is visible.",
	allowUpCasting : true,
	descriptionFull : "When you hit with a melee weapon attack you can cause the weapon to gleam with an otherworldly astral radiance. This attack deals 2d8 bonus radiant damage, and the target sheds dim light out to a 5-foot radius until the spell ends. The target also becomes visible if it was invisible and it cannot become invisible by magical or mundane means for the duration." + "\n   " + "If your target is a fiend or undead, or if it has the sunlight sensitivity trait, the bonus radiant damage increases by 1d8." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd-level or higher, the radiant damage increases by 1d8 for each spell slot level above 2nd."
};
SpellsList["conjure beast"] = {
	name : "Conjure Beast",
	nameShort : "Conjure Beast",
	regExpSearch : /^(?=.*conjure)(?=.*beast).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "ranger", "ranger(laserllama)"],
	level : 2,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "A silver bone, feather, scale, or hair worth at least 1 gold, willingly gifted to you by a Fey spirit",
	duration : "Conc, 1 h",
	description : "Fey spirit takes the form of a beast of CR 1 (+1 per SL above 2) I've seen; obeys verbal commands; see book",
	allowUpCasting : true,
	descriptionFull : "You grasp the material component of this spell and call its Fey spirit to your aid. It is Friendly to you and your allies, and it follows your commands to the best of its abilities. For the duration, the spirit uses the following rules:" + "\n   " + "Statistics. The Fey spirit appears in an unoccupied space that you can see, where it takes on the shape and statistics of a Beast of CR 1 or lower. You choose the Beast, but it must be one you have seen a living specimen of before." + "\n   " + "Combat. In combat, the Beast shares your initiative and it acts during your turn. You can issue it verbal commands (no action required). If the Beast has not received a command, it will move and defend itself to the best of its abilities. When the Beast is reduced to 0 hit points, the spirit disappears." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, the CR of the Beast this spirit can take on increases by 1 for each slot level above 2nd."
};
SpellsList["cordon of arrows"] = {
	name : "Cordon of Arrows (LL)",
	nameShort : "Cordon of Arrows (LL)",
	regExpSearch : /^(?=.*cordon)(?=.*arrows).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "ranger", "ranger(laserllama)"],
	level : 2,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "5 ft",
	components : "V,S,M",
	compMaterial : "Three or more arrows or bolts",
	duration : "8 h",
	description : "Plant 3 ammunition in ground. First creature within 30ft must Dex save or take 3d6 piercing damage.",
	allowUpCasting : true,
	descriptionFull : "You plant three pieces of ranged weapon ammunition in the ground within range and transmute them to protect the area. The first creature to move within 30 feet of this enchanted ammunition must make a Dexterity saving throw. The target takes 3d6 piercing damage on a failed save, and half as much piercing damage on a successful save." + "\n   " + "As part of casting this spell, you can designate any number of creatures you choose, and the spell ignores them." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd-level or higher, the amount of ammunition that can be transmuted increases by two for each slot level above 2nd. For each additional piece of ammunition you transmute with this spell, the damage increases by 1d6."
};
SpellsList["create ooze"] = {
	name : "Create Ooze",
	nameShort : "Create Ooze",
	regExpSearch : /^(?=.*create)(?=.*ooze).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 2,
	school : "Trans",
	time : "1 min",
	timeFull : "1 minute",
	range : "5 ft",
	components : "V,S,M",
	compMaterial : "A vial of acid and the ground bones of a Medium or larger Beast or Humanoid",
	duration : "Instantaneous",
	description : "Underground only: create an Oblex Spawn (stronger ooze with higher SL); bonus action to command in 120 ft; see book",
	allowUpCasting : true,
	descriptionFull : "This spell can only be cast underground. You mix the ground bones and acid, pouring the mixture in an unoccupied space. An Oblex Spawn under your control appears in there. While it exists, this Ooze uses the rules below:" + "\n   " + "Control. Oozes you create with this spell follow commands to the best of their abilities. If not given a command, the Ooze will remain in place and act only to defend itself. In comabt, the Ooze shares your initiative and acts during your turn." + "\n   " + "As a bonus action, you can mentally command any number of Oozes you created with this spell so long as they are within 120 feet. You can issue an individual command to each where you determine exactly how it acts, or you set a general course of action for it (\"defend this hall\"). So long as it is under your control, an Ooze will follow commands until completed." + "\n   " + "Slimy Bond. While an Ooze is under your control you can't regain the spell slot you spent to create it. However, when you finish a long rest, you can release control over any Oozes you created with this spell to regain the slots spent on them." + "\n   " + "When released, Oozes become hostile to all living things, and seek out the closest underground dungeon to live in." + AtHigherLevels + "You can cast this spell with higher level spell slots to create more powerful Oozes as shown below:" + "\n   " + "[see the Compendium of Spells for the table/stat block]"
};
SpellsList["elemental blade"] = {
	name : "Elemental Blade",
	nameShort : "Elemental Blade",
	regExpSearch : /^(?=.*elemental)(?=.*blade).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "magus(laserllama)", "sorcerer", "sorcerer(laserllama)", "magus"],
	level : 2,
	school : "Conj",
	time : "1 bns",
	timeFull : "1 bonus action",
	range : "Self",
	components : "V,S,M",
	compMaterial : "A charred wooden hilt",
	duration : "Conc, 10 min",
	description : "Evokes a melee elemental blade that deals chosen damage type.",
	allowUpCasting : true,
	descriptionFull : "You evoke an elemental blade in a free hand, choosing one of the following damage types: acid, cold, fire, lightning, poison, or thunder. The elemental blade appears as if it were made of the chosen element, and lasts for the duration. If you let go of the blade, it disappears, but you can evoke the blade again as a bonus action without expending a spell slot." + "\n   " + "Whenever you would make a melee attack, you can make a melee spell attack with the elemental blade against a target within your reach. On hit, it takes damage of the chosen type equal to 2d6 + your spellcasting modifier." + "\n   " + "While in your hand, the blade sheds bright light in a 10-foot radius and dim light an additional 10 feet beyond that." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for every two slot levels above 2nd."
};
SpellsList["find steed"] = {
	name : "Find Steed (LL)",
	nameShort : "Find Steed (LL)",
	regExpSearch : /^(?=.*find)(?=.*steed).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["paladin", "paladin(laserllama)"],
	level : 2,
	school : "Conj",
	time : "1 min",
	timeFull : "1 minute",
	range : "30 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Conjure a loyal Medium/Large quadruped beast of CR 1/2 as steed (CR 2 with SL4+); telepathy in 1 mile; see book",
	allowUpCasting : true,
	descriptionFull : "You conjure a spirit in an unoccupied space within range that assumes the form of a supernaturally intelligent, strong, and loyal steed, which is instantly bonded to you. The Steed takes on the form of a Medium or Large quadrupedal (four-legged) Beast of CR \u00bd or lower without a flying speed. You must have seen a living specimen of this Beast before." + "\n   " + "Statistics. Your Steed uses the stat block of the creature you chose for it, but its creature type changes to reflect your alignment: Celestial (good), Fey (neutral), or Fiend (evil). The Steed's Intelligence score becomes 6 (if it was lower), and it can understand one language that you speak." + "\n   " + "Control. You control your Steed and decide how it acts, both in and out of combat In combat, it shares your initiative and acts during your turn. While riding it, you can make any spell you cast that targets only you also target your Steed." + "\n   " + "While you and your Steed are within 1 mile of one another, you can use a special form of Telepathy to communicate." + "\n   " + "If your Steed is reduced to 0 hit points it disappears. You can also use a bonus action to dismiss your Steed, causing it to disappear. Should you cast this spell again you can choose to either conjure the same Steed, and it reappears in range at its maximum hit points, or to conjure a new Steed, releasing your previous Steed from its bond in the process." + AtHigherLevels + "When you cast this spell with a slot of 4th-level or higher, you can choose for your Steed to take the form of a Medium or Large Beast, Celestial, or Monstrosity of CR 2 or lower that you have seen before. The form the Steed takes must be quadrupedal or winged."
};
SpellsList["flame whip"] = {
	name : "Flame Whip",
	nameShort : "Flame Whip",
	regExpSearch : /^(?=.*flame)(?=.*whip).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["vessel(laserllama)", "warlock", "warlock(laserllama)", "vessel"],
	level : 2,
	school : "Evoc",
	time : "1 atk",
	timeFull : "In place of one attack of the Attack action",
	range : "Self",
	components : "V,S,M",
	compMaterial : "A charred wooden hilt",
	duration : "Conc, 10 min",
	description : "In place of an attack, whip of flame: melee spell atk in 10 ft for 1d10+spell mod Fire and grapple Large or smaller; see book",
	allowUpCasting : true,
	descriptionFull : "In place of an attack, you can evoke a whip of pure flame in a free hand. It lasts for the duration and sheds bright light out to a 10-foot radius. If you let go of the whip, it disappears, but you can evoke the Flame Whip again in place of an attack without expending a spell slot." + "\n   " + "Whenever you could make an attack, you can instead make a melee spell attack with your Flame Whip against one target within 10 feet that you can see. On hit, it takes fire damage equal to 1d10 + your spellcasting modifier, and if the target is Large or smaller you can instantly grapple it with the Whip." + "\n   " + "You cannot attack with the Whip while it is grappling a creature, but a grappled creature takes 1d10 fire damage at the start of its turns and can use its action to make a Strength check against your spell save DC, escaping on a success." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, both instances of fire damage dealt increase by 1d10 for every two slot levels above 2nd."
};
SpellsList["locate creature"] = {
	name : "Locate Creature (LL)",
	nameShort : "Locate Creature (LL)",
	regExpSearch : /^(?=.*locate)(?=.*creature).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)", "cleric", "cleric(laserllama)", "druid", "druid(laserllama)", "paladin", "paladin(laserllama)", "psion(laserllama)", "ranger", "ranger(laserllama)", "shaman(laserllama)", "wizard", "wizard(laserllama)"],
	level : 2,
	school : "Div",
	ritual : true,
	time : "1 a",
	timeFull : "1 action",
	range : "Self",
	components : "V,S,M",
	compMaterial : "A magnet dipped in holy water",
	duration : "Conc, 1 h",
	description : "Locates a specific kind of beast or plant.",
	allowUpCasting : true,
	descriptionFull : "Describe or name a specific kind of Beast or Plant. It can be a specific creature known to you, or the nearest creature of a specific kind (such as a bear, oak, or horse), so long as you have seen such a creature within 30 feet at least once." + "\n   " + "If one is within 1 mile, the material component of this spell points to it as if it were a compass. If the target is in motion, it points to it for as long as it remains in range. If the creature is in a different form, such as under the effect of the polymorph spell, this spell doesn't locate the creature." + "\n   " + "This spell can't locate its target if any thickness of lead or 10 feet of running water blocks a straight line to the target." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd-level or higher, the range and the type of creature you can locate increase as show in the table below:" + "\n   " + "[see the Compendium of Spells for the table/stat block]"
};
SpellsList["lock unlock"] = {
	name : "Lock/Unlock",
	nameShort : "Lock/Unlock",
	regExpSearch : /^(?=.*lock)(?=.*unlock).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "wizard", "wizard(laserllama)"],
	level : 2,
	school : "Abjur",
	time : "1 a",
	timeFull : "1 action",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "A piton, which the spell consumes",
	duration : "Instantaneous",
	description : "Lock: password protection, DC check to bypass. Unlock: instant, loud knock 300ft.",
	descriptionFull : "You touch one closed door, window, gate, chest, or another entryway, and either lock or unlock it, using the rules below:" + "\n   " + "Lock. You and the creatures you designate when you cast this spell can open the object normally. You can also choose a password that, when spoken aloud within 5 feet of the object, suppresses the spell for 1 minute. This lock can be bypassed by a successful Strength check or thieves' tools check against your Spell save DC, at which point the spell is dispelled." + "\n   " + "Unlock. If the object is held shut by a mundane lock or it is stuck or barred, it is instantly unlocked, unstuck, or unbarred. If the object has multiple locks, only one of them is unlocked. Regardless, when you cast the spell, a loud knock, audible out to 300 feet, emanates from the target object."
};
SpellsList["magic weapon"] = {
	name : "Magic Weapon (LL)",
	nameShort : "Magic Weapon (LL)",
	regExpSearch : /^(?=.*magic)(?=.*weapon).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "druid", "druid(laserllama)", "paladin", "paladin(laserllama)", "magus(laserllama)", "ranger", "ranger(laserllama)", "sorcerer", "sorcerer(laserllama)", "wizard", "wizard(laserllama)", "magus"],
	level : 2,
	school : "Trans",
	time : "1 bns",
	timeFull : "1 bonus action",
	range : "Touch",
	components : "V,S",
	duration : "1 h",
	description : "Touch nonmagical weapon: becomes +1 magic weapon. Scales to +2/+3 with higher slots.",
	allowUpCasting : true,
	descriptionFull : "You touch a nonmagical weapon and imbue it with arcane power. For the duration, it becomes a magical weapon with a +1 bonus to attack and damage rolls." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd-level or higher, the bonus is +2. When you use a spell slot of 6th-level or higher, the bonus increases to +3."
};
SpellsList["totemic cowl"] = {
	name : "Totemic Cowl",
	nameShort : "Totemic Cowl",
	regExpSearch : /^(?=.*totemic)(?=.*cowl).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["shaman(laserllama)", "shaman"],
	level : 2,
	school : "Abjur",
	time : "1 a",
	timeFull : "1 action",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "A leaf from the first day of fall",
	duration : "1 h",
	description : "Touch willing creature: reduces all damage by 2. Scales +1 per slot level above 2nd.",
	allowUpCasting : true,
	descriptionFull : "You touch a willing creature. Until the spell ends, it is cloaked in a ghostly cowl, and any damage it takes is reduced by 2." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd-level or higher, the damage reduction from the cowl increases by 1 for each slot level above 2nd."
};
SpellsList["mystic spear"] = {
	name : "Mystic Spear",
	nameShort : "Mystic Spear",
	regExpSearch : /^(?=.*mystic)(?=.*spear).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["psion(laserllama)", "warlock", "warlock(laserllama)"],
	level : 2,
	school : "Ench",
	time : "1 a",
	timeFull : "1 action",
	range : "120 ft",
	components : "V",
	duration : "Instantaneous",
	description : "4d6 Psychic dmg, Int save or incapacitated until your next turn. Speak name to target without seeing.",
	allowUpCasting : true,
	descriptionFull : "You project a violent bolt of mental power at a creature you can see within range. You do not need to see the target if you speak its name as part of the verbal component of this spell." + "\n   " + "The creature must make an Intelligence saving throw. On a failed save, it takes 4d6 psychic damage and is incapacitated until the start of your next turn. On a successful save, it takes half as much psychic damage and is not incapacitated." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd."
};
SpellsList["pass without trace"] = {
	name : "Pass Without Trace (LL)",
	nameShort : "Pass Without Trace (LL)",
	regExpSearch : /^(?=.*pass)(?=.*without)(?=.*trace).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "ranger", "ranger(laserllama)", "shaman(laserllama)", "shaman"],
	level : 2,
	school : "Abjur",
	time : "1 a",
	timeFull : "1 action",
	range : "Self",
	components : "V,S,M",
	compMaterial : "Ashes from a burned leaf of mistletoe",
	duration : "Conc, 1 h",
	description : "Masks you and your companions from detection, granting stealth bonuses.",
	descriptionFull : "A veil of shadows and silence radiates from you, masking you and your companions from detection. For the duration, you and creatures of your choice within 30 feet are considered to be lightly obscured and gain a bonus to all Dexterity (Stealth) checks equal to your Spellcasting modifier. Creatures under the effect of this spell leave no track or trace of their passing."
};
SpellsList["restoration"] = {
	name : "Restoration",
	nameShort : "Restoration",
	regExpSearch : /^(?=.*restoration).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "bard", "bard(laserllama)", "cleric", "cleric(laserllama)", "druid", "druid(laserllama)", "paladin", "paladin(laserllama)", "ranger", "ranger(laserllama)"],
	level : 2,
	school : "Abjur",
	time : "1 a",
	timeFull : "1 action",
	range : "Touch",
	components : "V,S",
	duration : "Instantaneous",
	description : "End 1 disease or blinded/deafened/frightened/paralyzed/poisoned; SL3+ more effects with diamond dust; see book",
	allowUpCasting : true,
	descriptionFull : "You touch a willing creature and instantly end one disease or one of the following conditions currently afflicting it: blinded, deafened, frightened, paralyzed, or poisoned. At Higher Levels. When you cast this spell using a spell slot of 3rd-level or higher, the conditions and effects you can end increase, but the spell requires you to expend diamond dust of a certain value, which is consumed during casting:" + "\n   " + "[see the Compendium of Spells for the table/stat block]"
};

// ----- 3rd-level spells -----
SpellsList["animate dead"] = {
	name : "Animate Dead (LL)",
	nameShort : "Animate Dead (LL)",
	regExpSearch : /^(?=.*animate)(?=.*dead).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["cleric", "cleric(laserllama)", "wizard", "wizard(laserllama)"],
	level : 3,
	school : "Necro",
	time : "1 min",
	timeFull : "1 minute",
	range : "10 ft",
	components : "V,S,M",
	compMaterial : "A corpse or pile of bones, consumed by the casting of the spell to create the Undead Thrall",
	duration : "Instantaneous",
	description : "Animate a corpse of CR 3 or lower creature as Undead Thrall",
	descriptionShorter : "Animate corpse of CR 3 or lower creature as Undead Thrall",
	descriptionFull : "You use dark magic to reanimate the bones or corpse of a creature of CR 3 or lower, transforming it into your Undead Thrall. Until destroyed, this Thrall uses the rules below:" + "\n   " + "Statistics. The Undead Thrall is a shambling corpse with no memory of any abilities it had in life. It uses the same stat block, but its creature type becomes Undead, it has hit points equal to 7 times the level of the spell slot you spent to create it, and it uses your Spellcasting ability for attack and damage rolls. If commanded to attack, it only makes a single attack, even if it could have made more attacks in life." + "\n   " + "Thralls cannot benefit from short or long rests or regain hit points. They are immune to the Exhaustion condition, and do not require food, drink, air, or sleep. If it is destroyed, a Thrall cannot be raised as an Undead Thrall again." + "\n   " + "Control. Undead Thralls follow your commands without quesion. If not given commands, a Thrall will not move and will only act to defend itself. In combat, all Undead Thralls share your initiative and act during your turn." + "\n   " + "As a bonus action, you can mentally command any number of Thralls created with this spell so long as they are all within 120 feet. You can issue an individual command to each where you determine exactly how it acts, or you set a general course of action for it (\"defend this hall\"). So long as it is under your control, Thralls will follow commands until completed." + "\n   " + "Spellcasting. If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots." + "\n   " + "Undead Bond. While a Thrall is under your control, you cannot regain the spell slot you spent to create it. However, when you finish a long rest, you can end your control over a Thrall to regain the slot. If you do so, that Thrall is freed and is hostile to all living things, the spellcaster in particular." + AtHigherLevels + "If you cast this spell with a spell slot of 4th level or higher, the CR of the creatures you can raise as Undead Thralls increases by 1 for each slot level above 3rd."
};
SpellsList["blinding smite"] = {
	name : "Blinding Smite (LL)",
	nameShort : "Blinding Smite (LL)",
	regExpSearch : /^(?=.*blinding)(?=.*smite).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["paladin", "paladin(laserllama)"],
	level : 3,
	school : "Evoc",
	time : "Hit",
	timeFull : "No action required, when you hit with a weapon attack (see spell)",
	range : "Self",
	components : "V,M",
	compMaterial : "A melee weapon worth at least 1 sp",
	duration : "Conc, 1 min",
	description : "Deal 3d8 radiant damage, target must save or be blinded.",
	allowUpCasting : true,
	descriptionFull : "When you hit with a melee weapon attack you can cause the weapon to flare with an overwhelming blinding light. This attack deals 3d8 bonus radiant damage, and the target must succeed on a Constitution saving throw or become blinded until the spell ends. The target can repeat this saving throw at the end of each of its turns, ending the effect on a success." + "\n   " + "If your target is a fiend or undead, or if it has the sunlight sensitivity trait, the bonus radiant damage increases by 1d8." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd-level or higher, the radiant damage increases by 1d8 for each spell slot level above 2nd."
};
SpellsList["cerebral blast"] = {
	name : "Cerebral Blast",
	nameShort : "Cerebral Blast",
	regExpSearch : /^(?=.*cerebral)(?=.*blast).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["psion(laserllama)"],
	level : 3,
	school : "Evoc",
	time : "1 a",
	timeFull : "1 action",
	range : "S:30-ft cone",
	components : "V",
	duration : "Instantaneous",
	description : "5d8 psychic damage, push target 20 ft, prone on fail.",
	allowUpCasting : true,
	descriptionFull : "Your mind unleashes a blast of overwhelming mental force in a 30-foot cone. Creature in the area of this spell must make a Strength saving throw. On a failed save, a creature takes 5d8 psychic damage and is pushed 20 feet directly away from you in a line, then falls prone. On a success, creatures take half as much damage, remain in place, and don't fall prone." + AtHigherLevels + "When you cast this spell using a spell slot of 4th-level or higher, the psychic damage increases by 1d8 for each spell slot level above 3rd."
};
SpellsList["conjure elemental"] = {
	name : "Conjure Elemental",
	nameShort : "Conjure Elemental",
	regExpSearch : /^(?=.*conjure)(?=.*elemental).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "ranger", "ranger(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 3,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "A gemstone containing a mote of pure elemental air, earth, fire, or water, worth at least 50 gold",
	duration : "Concentration, 1 hour",
	description : "Conjure CR 3 elemental that obeys commands while concentration lasts.",
	descriptionShorter : "Conjure CR 3 elemental that obeys commands while concentration lasts.",
	allowUpCasting : true,
	descriptionFull : "Grasping the material component of the spell, you conjure an Elemental whose makeup matches the material component. While your concentration lasts, the Elemental is Friendly to you and your allies and obeys all of your commands. For the duration, the Elemental uses the rules below:" + "\n   " + "Statistics. The Elemental appears in an unoccupied space of your choice you can see in range. It takes on the statistics and appearance of an Elemental of CR 3 or lower, so long as its makeup matches that of the material component." + "\n   " + "Combat. The Elemental shares your initiative and it acts during your turn. You can give it verbal commands (no action required). If the Elemental does not receive a command, or its commands are completed, it will only defend itself." + "\n   " + "Spellcasting. If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots." + "\n   " + "Control. If your concentration on this spell is broken, the Elemental remains, but is no longer under your control. For the duration of the spell, or until it is reduced to 0 hit points, the Elemental will act according to its alignment, spreading chaos and destruction wherever it can." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the CR of Elemental that you can conjure increases by 1 for each slot level above 3rd."
};
SpellsList["conjure fey"] = {
	name : "Conjure Fey",
	nameShort : "Conjure Fey",
	regExpSearch : /^(?=.*conjure)(?=.*fey).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "ranger", "ranger(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 3,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "A Tiny object worth at least 50 gold containing the promise of a Fey, willingly gifted to you",
	duration : "Concentration, 1 hour",
	description : "Conjure a fey (see book)",
	descriptionShorter : "Conjure a fey (see book)",
	descriptionFull : "You grasp the material component of this spell and call its Fey spirit to your aid. While your concentration lasts, the Fey Friendly to you and your allies and obeys your commands to the letter. For the duration, the Fey uses the rules below:" + "\n   " + "Statistics. The Fey spirit appears in an unoccupied space of your choice that you can see within range. It takes on the appearance and statistics of any Fey of CR 3 or lower." + "\n   " + "Combat. The Fey shares your initiative and it acts on your turn. You can give it verbal commands (no action required). If the Fey does not receive any commands, or its commands are completed, it moves and defends itself as best it can." + "\n   " + "Spellcasting. If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots." + "\n   " + "Control. If the spell ends because your concentration was broken, the Fey remains, but is no longer under your control. For the duration of the spell, or until reduced to 0 hit points, the Fey acts according to its alignment, and either becomes Hostile toward you and your allies or flees." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the CR of Fey this spirit can take on increases by 1 for each slot level above 3rd."
};
SpellsList["conjure fiend"] = {
	name : "Conjure Fiend",
	nameShort : "Conjure Fiend",
	regExpSearch : /^(?=.*conjure)(?=.*fiend).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 3,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V (a Fiend's true name),S",
	duration : "Concentration, 1 hour",
	description : "Conjure a fiend (see book)",
	descriptionShorter : "Conjure a fiend (see book)",
	allowUpCasting : true,
	descriptionFull : "Speaking its true name, you conjure a Fiend of CR 4 or lower to your aid. While your concentration lasts, it is Indifferent to you and your allies and follows your commands to the letter. For the duration, the Fiend uses the rules below:" + "\n   " + "Statistics. The Fiend appears in an unoccupied space of your choice you can see within range. When it appears, you can force the Fiend to take on the appearance and statistics of another Fiend of your choice equal to its CR, or lower." + "\n   " + "Combat. The Fiend shares your initiative and acts on your turn. You can give it verbal commands (no action required). If the Fiend does not receive any commands, or its commands are completed, it can move defend itself with prejudice." + "\n   " + "Spellcasting. If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots." + "\n   " + "Control. If your concentration on this spell is broken, the Fiend remains. It instantly returns to its true form and is no longer under your control. For the duration of the spell, or until it is reduced to 0 hit points, it is Hostile to you and your allies, and will act according to its alignment. Devils seek to kill the spellcaster, and Demons kill indiscriminately." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the CR of the Fiends that you can conjure increases by 1 for each slot level above 3rd."
};
SpellsList["conjure volley"] = {
	name : "Conjure Volley (LL)",
	nameShort : "Conjure Volley (LL)",
	regExpSearch : /^(?=.*conjure)(?=.*volley).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["ranger", "ranger(laserllama)"],
	level : 3,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "Self",
	components : "V,S,M",
	compMaterial : "A single piece of ammunition and a ranged weapon, or one thrown weapon, all nonmagical",
	duration : "Instantaneous",
	description : "6d8 weapon damage in a 30-ft-radius, 20-ft-high cylinder",
	allowUpCasting : true,
	descriptionFull : "You fire one piece of nonmagical ammunition from a ranged weapon or throw a nonmagical thrown weapon into the air and choose a point within 60 feet." + "\n   " + "The ammunition or weapon explodes into a multitude of exact copies of it, which fall in a 30-foot-radius, 20-foot-high cylinder centered on the point you chose. Creatures within that area must make a Dexterity saving throw. They take 6d8 damage of the weapon's type on a failure, and half as much on a success. The ammunition or weapons created by this spell disintegrate once the effects of this spell are resolved." + AtHigherLevels + "When you cast this spell using a spell slot of 4th-level or higher, the damage of this spell increases by 1d8, and the radius of the cylinder increases by 5 feet for each slot level above 3rd."
};
SpellsList["counterspell"] = {
	name : "Counterspell (LL)",
	nameShort : "Counterspell (LL)",
	regExpSearch : /^(?=.*counterspell).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["magus(laserllama)", "sorcerer", "sorcerer(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)", "magus"],
	level : 3,
	school : "Abjur",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you see a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Contest: my spellcasting check + SL vs. caster's check + its spell level; adv. if I know/have the spell; it fails if I win",
	allowUpCasting : true,
	descriptionFull : "creature within 60 feet of you casting a spell You attempt to interrupt a creature in the process of casting a spell. You and the target both make an ability check with your respective spellcasting abilities. The target adds the level of the spell it is casting to its ability check, and you add the level at which you cast this counterspell to your ability check." + "\n   " + "If you know the spell the creature is attempting to cast or if you have it prepared you have advantage on this ability check, unless you are using this spell against another counterspell." + "\n   " + "If the result of your ability check is greater then the result of the target's ability check, its spell fails and has no effect."
};
SpellsList["daylight"] = {
	name : "Daylight (LL)",
	nameShort : "Daylight (LL)",
	regExpSearch : /^(?=.*daylight).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["cleric", "cleric(laserllama)", "druid", "druid(laserllama)", "paladin", "paladin(laserllama)", "ranger", "ranger(laserllama)", "sorcerer", "sorcerer(laserllama)"],
	level : 3,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "1 h",
	description : "60-ft rad bright + 60 ft dim sunlight on a point or Tiny object; dispels magical darkness of my SL or lower",
	descriptionFull : "An orb of light appears at a point you can see within 60 feet, hovering in place. It emits bright light out to a 60-foot radius, and dim light 60 feet beyond that. This light is true sunlight. If this area overlaps with magical darkness created by a spell equal to the level you cast this spell or lower, it is dispelled." + "\n   " + "Alternately, you can cast this spell on a Tiny object that isn't being worn or carried, causing it to emit the light of this spell. The light moves with that object for the duration. If the object is covered by an opaque object, it blocks the light."
};
SpellsList["dire wail"] = {
	name : "Dire Wail",
	nameShort : "Dire Wail",
	regExpSearch : /^(?=.*dire)(?=.*wail).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)", "shaman(laserllama)", "vessel(laserllama)", "shaman", "vessel"],
	level : 3,
	school : "Necro",
	time : "1 a",
	timeFull : "1 action",
	range : "S:30-ft rad",
	components : "V",
	duration : "1 min",
	description : "Creatures within 30 ft take 4d10 thunder damage (Con save half), deafened for duration",
	allowUpCasting : true,
	descriptionFull : "You let forth a wail filled with otherworldly power. Creatures of your choice within 30 feet must succeed on a Constitution saving throw or take 4d10 thunder damage and be deafened for the duration. At the end of each turn, targets can make a Constitution saving throw, ending the spell on a success. On a successful save, it takes half damage and is not deafened." + AtHigherLevels + "When you cast this spell using a spell slot of 4th-level or higher, the damage increases by 1d10 for each slot level above 3rd."
};
SpellsList["elemental bane"] = {
	name : "Elemental Bane (LL)",
	nameShort : "Elemental Bane (LL)",
	regExpSearch : /^(?=.*elemental)(?=.*bane).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "druid", "druid(laserllama)", "magus(laserllama)", "shaman(laserllama)", "sorcerer", "sorcerer(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 3,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "1 min",
	save : "Con",
	description : "1 crea Con save or loses resistance to chosen type; +1d6 dmg of that type 1/turn, then saves again; SL5+: +1d6 or +1 crea/SL",
	descriptionFull : "Choose one of the following damage types: acid, cold, fire, lightning, poison, or thunder; and one creature within range. It must make Constitution saving throw or be afflicted with an elemental curse, and if it has Resistance to the damage type you chose, it loses it for the duration." + "\n   " + "The first time each turn a cursed creature takes damage of the chosen type, it takes a bonus 1d6 damage, then it repeats the Constitution saving throw, ending the curse on a success." + AtHigherLevels + "If you cast this spell using a spell slot of 4th-level or higher, you can either increase the bonus damage by 1d6, or target another creature within range, for each spell slot level above 4th. If you target more than one creature, you use the same damage type for all taragets of the spell."
};
SpellsList["flame arrows"] = {
	name : "Flame Arrows (LL)",
	nameShort : "Flame Arrows (LL)",
	regExpSearch : /^(?=.*flame)(?=.*arrows).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "magus(laserllama)", "ranger", "ranger(laserllama)", "magus"],
	level : 3,
	school : "Trans",
	time : "1 bns",
	timeFull : "1 bonus action",
	range : "Touch",
	components : "V,S",
	duration : "1 h",
	description : "First 12 arrows in a quiver deal 1d6 extra fire damage; fire bursts in flammable objects",
	allowUpCasting : true,
	descriptionFull : "You touch a quiver containing ranged weapon ammunition. The first twelve pieces of ammunition drawn from the quiver deal fire damage in place of their normal damage type, plus an additional 1d6 fire damage on hit. If fired into a flammable object, it bursts into flame on hit. The magic of this spell ends for each piece of ammunition when it hits or misses, and the spell ends after twelve pieces of ammunition are fired." + AtHigherLevels + "When you cast this spell using a spell slot of 4th-level or higher, you can draw two additional pieces of ammunition from the quiver for each slot level above 3rd."
};
SpellsList["grasping vine"] = {
	name : "Grasping Vine (LL)",
	nameShort : "Grasping Vine (LL)",
	regExpSearch : /^(?=.*grasping)(?=.*vine).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "ranger", "ranger(laserllama)"],
	level : 3,
	school : "Conj",
	time : "1 bns",
	timeFull : "1 bonus action",
	range : "30 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "2d8 bludg. dmg, if Large or smaller is pulled 30 ft and restrained",
	allowUpCasting : true,
	descriptionFull : "You cause a vine to sprout from the ground in an unoccupied space you can see within range. When you cast this spell, the vine strikes at a target you can see within 30 feet of it. Make a melee spell attack against the target, and on hit, it takes 2d8 bludgeoning damage. If the target is Large or smaller, then it is pulled up to 30 feet toward the vine and Restrained by it." + "\n   " + "As an action, a Restrained creature can make a Strength or Dexterity check against your Spell save DC to escape." + "\n   " + "As a bonus action on each subsequent turn, you can cause the vine to strike at another target. If the vine is Restraining a creature, it instead deals 2d8 bludgeoning damage to it." + AtHigherLevels + "If you cast this spell with a spell slot of 4th-level or higher, the vine deals an additional 1d8 damage on hit for each slot level above 3rd."
};
SpellsList["hunger of hadar"] = {
	name : "Hunger of Hadar (LL)",
	nameShort : "Hunger of Hadar (LL)",
	regExpSearch : /^(?=.*hunger)(?=.*hadar).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["vessel(laserllama)", "warlock", "warlock(laserllama)", "vessel"],
	level : 3,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "120 ft",
	components : "V,S,M",
	compMaterial : "Pickled octopus tentacle",
	duration : "Conc, 1 min",
	description : "20-ft-radius of cold and darkness, 2d6 cold/acid dmg; creatures are blinded in the area",
	allowUpCasting : true,
	descriptionFull : "You open a gateway to the dark between the stars, a region infested with unknown horrors. A 20-foot-radius sphere of blackness and bitter cold appears, centered on a point with range and lasting for the duration. This void is filled with a cacophony of soft whispers and slurping noises that can be heard up to 30 feet away. No light, magical or otherwise, can illuminate the area, and creatures in the area are blinded." + "\n   " + "The void creates a warp in the fabric of space, and the area is difficult terrain. Any creature that starts its turn in the area takes 2d6 cold damage. Any creature that ends its turn in the area must succeed on a Dexterity saving throw or take 2d6 acid damage as milky, otherworldly tentacles rub against it." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the radius of the spell increases by 5 feet and both the cold and acid damage each increase by 1d6 for each slot level above 3rd."
};
SpellsList["hypnotic pattern"] = {
	name : "Hypnotic Pattern (LL)",
	nameShort : "Hypnotic Pattern (LL)",
	regExpSearch : /^(?=.*hypnotic)(?=.*pattern).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)", "psion(laserllama)", "sorcerer", "sorcerer(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 3,
	school : "Illus",
	time : "1 a",
	timeFull : "1 action",
	range : "60 ft",
	components : "S,M",
	compMaterial : "A glowing stick of incense",
	duration : "Conc, 1 min",
	description : "30-ft cube; creatures see a pattern, Wis save or be charmed, incapacitated, speed 0; ends if dmg or shaken",
	descriptionFull : "You create a twisting pattern of colors that weaves through the air inside a 30-foot cube within range. This psychedelic pattern appears for a moment and vanishes. Each creature in the area who sees the pattern must make a Wisdom saving throw. On a failed save, the creature becomes charmed for the duration. While charmed by this spell, the creature is incapacitated and has a speed of 0." + "\n   " + "An affected creature can repeat this saving throw at the end of each of its turns, ending the effect on a success. The spell also ends for an affected creature if it takes any damage or if someone else uses an action to shake it out of its stupor."
};
SpellsList["otto's irresistible dance"] = {
	name : "Irresistible Dance (LL)",
	nameShort : "Irresistible Dance (LL)",
	regExpSearch : /^(?=.*irresistible)(?=.*dance).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)"],
	level : 3,
	school : "Ench",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "1 crea save or must dance: disadv. on Dex saves and attacks, attacks vs. it have adv.; save as action; SL4+: +1 crea/SL",
	allowUpCasting : true,
	descriptionFull : "You force a creature that can hear you within range to make a Wisdom saving throw. On a failure, it begins a comic dance in place: shuffling, tapping feet, and capering for the duration. Creatures that can't be charmed are immune to this spell." + "\n   " + "This creature must use all its movement to dance without leaving its space and has disadvantage on Dexterity saving throws and attack rolls. While the target is affected by this spell, creatures have advantage on attack rolls against it. As an action, a dancing creature makes a Wisdom saving throw to regain control of itself, ending the spell on a success." + AtHigherLevels + "When you cast this spell using a spell slot of 4th-level or higher, you target one additional creature who can hear you within range for each slot level above 3rd."
};
SpellsList["lightning arrow"] = {
	name : "Lightning Arrow (LL)",
	nameShort : "Lightning Arrow (LL)",
	regExpSearch : /^(?=.*lightning)(?=.*arrow).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "ranger", "ranger(laserllama)"],
	level : 3,
	school : "Trans",
	time : "1 atk",
	timeFull : "In place of one attack of the Attack action",
	range : "Self",
	components : "V,S",
	duration : "Instantaneous",
	description : "Normal damage + 4d8 lightning; on miss, half lightning damage; all within 10 ft. take 2d8 lightning; can't take reactions",
	allowUpCasting : true,
	descriptionFull : "As part of a ranged weapon attack, you can transmute a piece of ammunition, or the thrown weapon, into a bolt of lightning. On hit, the target takes the normal damage of the attack, plus a bonus 4d8 lighting damage. On a miss, the target takes half as much lightning damage, and none of the normal damage." + "\n   " + "Regardless if this attack hits or misses, all creatures within 10 feet of the target must make a Dexterity saving throw. On a failed save, creatures take 2d8 lighting damage, and half as much lighting damage on a success. The piece of ammunition or thrown weapon then returns to its normal form." + "\n   " + "Any creature that takes lighting damage from this spell cannot take reactions until the beginning of your next turn." + AtHigherLevels + "When you cast this spell using a spell slot of 4th-level or higher, the damage for both effects of the spell increases by 1d8 for each slot level above 3rd."
};
SpellsList["sonic wave"] = {
	name : "Sonic Wave",
	nameShort : "Sonic Wave",
	regExpSearch : /^(?=.*sonic)(?=.*wave).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)", "magus(laserllama)", "sorcerer", "sorcerer(laserllama)", "magus"],
	level : 3,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "S:30-ft cone",
	components : "V,S",
	duration : "Instantaneous",
	description : "4d8 thunder damage in a 30-ft cone; prone & deafened on fail",
	allowUpCasting : true,
	descriptionFull : "You forcefully clasp your hands and a shockwave of booming force shoots forth from you and emits a boom audible out to 500 feet. All creatures in a 30-foot cone must succeed on a Constitution saving throw or take 4d8 thunder damage, fall prone, and be deafened for 1 minute. On a success, creatures take half damage and are not knocked prone or deafened." + "\n   " + "A creature can repeat this saving throw at the end of each of its turns, ending the effect on a success." + AtHigherLevels + "When you cast this spell using a spell slot of 4th-level or higher, the damage increases by 1d8, and the cone increases by 5 feet for each slot level above 3rd."
};
SpellsList["speak with dead"] = {
	name : "Speak with Dead (LL)",
	nameShort : "Speak with Dead (LL)",
	regExpSearch : /^(?=.*speak)(?=.*with)(?=.*dead).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["cleric", "cleric(laserllama)", "shaman(laserllama)", "wizard", "wizard(laserllama)"],
	level : 3,
	school : "Necro",
	ritual : true,
	time : "10 min",
	range : "10 ft",
	components : "V,S,M",
	compMaterial : "Two gold coins, consumed by the spell",
	duration : "1 min",
	description : "Humanoid corpse (not undead) answers 3 questions; not again on the same corpse within 10 days",
	descriptionFull : "You grant a semblance of life and intelligence to a Humanoid corpse of your choice within range, allowing it to answer your questions. It must still have a mouth and it cannot be Undead. If this corpse was the target of another speak with dead spell in the past 10 days, this casting of the spell fails." + "\n   " + "While the spell lasts, the spellcaster can ask the corpse up to three questions. Any answers requested beyond a \"yes\" or \"no\" are brief and cryptic. The corpse is not compelled to give truthful answers, especially if the spellcaster was Hostile to it or it recognizes the spellcaster as an enemy." + "\n   " + "This spell does not return the soul to the corpse's body, but draws out the imprint of its consciousness from the moments before its death. The corpse cannot learn new information, it cannot comprehend anything that has happened since it died, and it cannot speculate about the future."
};
SpellsList["spectral passage"] = {
	name : "Spectral Passage",
	nameShort : "Spectral Passage",
	regExpSearch : /^(?=.*spectral)(?=.*passage).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["psion(laserllama)", "shaman(laserllama)", "sorcerer", "sorcerer(laserllama)", "vessel(laserllama)", "warlock", "warlock(laserllama)", "shaman", "vessel"],
	level : 3,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "An object a spirit has passed through",
	duration : "Conc, 1 min",
	description : "Become semi-incorporeal; move through objects as difficult terrain",
	allowUpCasting : true,
	descriptionFull : "You touch a willing creature. Until the spell ends, it becomes semi-incorporeal and can move through other creatures and objects as if they were difficult terrain. If the creature ends its movement inside another object or creature, it is immediately shunted to the nearest unoccupied space, taking 1d10 force damage for every 5 feet it was forced to travel." + AtHigherLevels + "When you cast this spell using a spell slot of 4th-level or higher, you can target one additional creature for each slot level above 3rd."
};
SpellsList["leomund's tiny hut"] = {
	name : "Tiny Hut (LL)",
	nameShort : "Tiny Hut (LL)",
	regExpSearch : /^(?=.*tiny)(?=.*hut).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)", "magus(laserllama)", "ranger", "ranger(laserllama)", "shaman(laserllama)", "wizard", "wizard(laserllama)", "magus", "shaman"],
	level : 3,
	school : "Abjur",
	ritual : true,
	time : "1 min",
	timeFull : "1 minute",
	range : "Self (10-foot radius hemisphere)",
	components : "V,S,M",
	compMaterial : "A pearl cut perfectly in half",
	duration : "8 h",
	description : "Immobile dome of arcane force, 10-ft radius",
	descriptionFull : "A 10-foot-radius immobile dome of arcane force springs into existence around and above you and remains stationary for the duration. The spell ends if you leave its area." + "\n   " + "Nine creatures of Medium size or smaller can fit inside the dome with you. The spell fails if its area includes any Large creatures or more than nine creatures. Creatures and objects within the dome when you cast this spell can move through it freely. All other creatures and objects cannot pass through it. Spells and other magical effects cannot extend through the dome or be cast through it. The atmosphere inside the dome is comfortable and dry, regardless of the weather outside." + "\n   " + "Until the spell ends, you can command the interior to be dimly lit or dark. The dome is opaque and dull in color as to blend in with surroundings. It is transparent from the inside." + "\n   " + "Statistics. The dome has 100 hit points and Armor Class equal to your Spell save DC. It is immune to poison, psychic, and non-magical bludgeoning, piercing, and slashing damage, it is vulnerable to force and all magical bludgeoning, piercing, and slashing damage, and it is resistant to all other damage types. A disintegrate spell destroys it instantly."
};

// ----- 4th-level spells -----
SpellsList["accursed touch"] = {
	name : "Accursed Touch",
	nameShort : "Accursed Touch",
	regExpSearch : /^(?=.*accursed)(?=.*touch).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "cleric", "cleric(laserllama)", "magus(laserllama)", "shaman(laserllama)", "sorcerer", "sorcerer(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)", "magus"],
	level : 4,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "A basilisk scale",
	duration : "Conc, 1 min",
	description : "Transmute a creature into stone; Constitution saving throw",
	allowUpCasting : true,
	descriptionFull : "You attempt to transmute a creature into stone. As an action, you touch a creature, forcing it to make a Constitution saving throw. On a failed save, the creature is Restrained as its flesh begins to harden. On a successful save, it is not affected." + "\n   " + "A creature Restrained by this spell must make another Constitution saving throw at the end of each of its turns. If it saves against this spell three times, the spell ends. Should it fail three saves, it is turned to stone and Petrified. Successes and failures don't need to be consecutive; keep track of both until the creature fails or passes three saves." + "\n   " + "If the target is physically broken while Petrified, it suffers from similar deformities if it reverts to its original state." + "\n   " + "If you maintain your concentration for the entire duration, the creature is turned to stone until the effect is removed." + AtHigherLevels + "When you cast this spell using a spell slot of 5th level or higher, the number of saves that the target must fail before it is turned to stone and Petrified is reduced by 1 (to a minimum of 1) for each level above 4th."
};
SpellsList["conjure aberration"] = {
	name : "Conjure Aberration",
	nameShort : "Conjure Aberration",
	regExpSearch : /^(?=.*conjure)(?=.*aberration).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 4,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "A prisim worth at least 50 gold, bathed in the aberrant energies of the Far Realm",
	duration : "Concentration, 1 hour",
	description : "Conjure an aberration (see book)",
	descriptionShorter : "Conjure an aberration (see book)",
	allowUpCasting : true,
	descriptionFull : "You grasp the material component of this spell, tearing a rift in reality, causing an Aberration to appear in range. For the duration, the Aberration uses the rules below:" + "\n   " + "Statistics. When you cast the spell, roll a d4 and consult the table below. The Aberration corresponding to your result appears, using its stat block. Alternately, you can choose any result lower than yours to appear in its place." + "\n   " + "Combat. The Aberration shares your initiative and acts on your turn. You can give it verbal order (no action required). If the Aberration does not receive any orders, or its orders are completed, it moves and defends itself with prejudice." + "\n   " + "Spellcasting. If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots." + "\n   " + "Control. If the spell ends because your concentration was broken, the Aberration remains, but is no longer under your control. For the duration of the spell, or until it is reduced to 0 hit points, the Aberration acts according to its alignment." + AtHigherLevels + "When you cast this spell using a spell slot of 5th-level or higher, you gain a +1 bonus to your roll to determing the Aberration conjured for each slot above 4th." + "\n   " + "[see the Compendium of Spells for the table/stat block]"
};
SpellsList["create undead"] = {
	name : "Create Undead",
	nameShort : "Create Undead",
	regExpSearch : /^(?=.*create)(?=.*undead).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["cleric", "cleric(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 4,
	school : "Necro",
	time : "10 min",
	timeFull : "10 minutes",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "The corpse of a creature slain within the last day, and blood from the spellcaster, both of which are consumed by the casting of this spell",
	duration : "Instantaneous",
	description : "Only at night. Create an Undead (see book)",
	allowUpCasting : true,
	descriptionFull : "This spell can only be cast at night. You spill your blood onto the corpse as part of a sinister ritual, reducing your maximum hit points by 2 and creating a Skeleton or Zombie under your control. Undead created by this spell use the rules below:" + "\n   " + "Control. Undead follow your commands without quesion. If not given a command, an Undead won't move and will only act to defend itself. In combat, any Undead you created share your initiative and act during your turn." + "\n   " + "As a bonus action, you can mentally command any number of Undead you created with within 120 feet. You can issue an individual command to each, determining exactly how it will act, or setting a general course of action (\"defend this hall\"). So long as they remain under your control, your Undead will follow commands until completed." + "\n   " + "Spellcasting. If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots." + "\n   " + "Undead Bond. While an Undead is under your control, you cannot regain the maximum hit points you spent to create it. However, when you finish a long rest, you can release control over any Undead that you created to regain the maximum hit points you spent to create them. When freed, Undead become hostil to all living things, the spellcaster in particular." + AtHigherLevels + "You can cast this spell with a spell slot of a higher level, and expend additional maximum hit points (Max. HP) to create more powerful Undead, as shown here:" + "\n   " + "[see the Compendium of Spells for the table/stat block]"
};
SpellsList["death ward"] = {
	name : "Death Ward",
	nameShort : "Death Ward",
	regExpSearch : /^(?=.*death)(?=.*ward).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["cleric", "cleric(laserllama)", "paladin", "paladin(laserllama)"],
	level : 4,
	school : "Abjur",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "8 h",
	description : "First time the target starts its turn at 0 HP it stands up at 1 HP, or negate one instant-kill effect; then spell ends",
	descriptionFull : "You touch a creature and ward it against the touch of death. The first time the target starts its turn with 0 hit points, but is not dead, it can stand up with 1 hit point, and the spell ends." + "\n   " + "If the spell is still in effect when the target is subjected to an effect that would kill it instantly without dealing damage, that effect is negated against the target, and the spell ends."
};
SpellsList["dominate creature"] = {
	name : "Dominate Creature (LL)",
	nameShort : "Dominate Creature (LL)",
	regExpSearch : /^(?=.*dominate)(?=.*creature).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["bard", "bard(laserllama)", "druid", "druid(laserllama)", "psion(laserllama)", "ranger", "ranger(laserllama)", "sorcerer", "sorcerer(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 4,
	school : "Ench",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "1 beast (humanoid at SL5, any at SL8) save or charmed; telepathic orders; take control with action; save on dmg",
	descriptionFull : "You attempt to beguile a Beast that you can see within range. It must make a Wisdom saving throw or become Charmed by you for the duration. If you or creatures that are Friendly to you are fighting it, it has advantage on its saving throw." + "\n   " + "While Charmed, you share a telepathic link with the Beast so long as you are on the same plane. You can issue orders to the creature through this link, which it does its best to follow, so long as you are not Incapacitated. You can give specific or general orders, such as \"attack that creature\" or \"protect that door\". When the creature does not have an order to follow, it will defend itself to the best of its abilities." + "\n   " + "As an action, you can take complete control of the creature until the start of your next turn. When you do so, it takes only the actions you choose and nothing beyond it. You can cause it to use a reaction, but you must use your reaction as well." + "\n   " + "Any time the creature takes damage, it repeats its Wisdom saving throw, ending this effect on a successful save." + AtHigherLevels + "As you cast this spell with a spell slot of 5th level or higher, the spell's effects increase, as shown here:" + "\n   " + "[see the Compendium of Spells for the table/stat block]"
};
SpellsList["ego scourge"] = {
	name : "Ego Scourge",
	nameShort : "Ego Scourge",
	regExpSearch : /^(?=.*ego)(?=.*scourge).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["psion(laserllama)"],
	level : 4,
	school : "Ench",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V",
	duration : "Conc, 1 min",
	description : "Attack the mind, disadvantage on attacks and checks",
	descriptionFull : "You strike at the mind of a creature you can see within range, attacking its sense of self. It must succeed on an Intelligence saving throw or suffer disadvantage on attack rolls and ability checks, and be unable to cast spells for the duration." + "\n   " + "At the end of each of its turns the creature can repeat this saving throw, ending the effect of this spell on a success."
};
SpellsList["eldritch tentacles"] = {
	name : "Eldritch Tentacles",
	nameShort : "Eldritch Tentacles",
	regExpSearch : /^(?=.*eldritch)(?=.*tentacles).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["vessel(laserllama)", "warlock", "warlock(laserllama)", "vessel"],
	level : 4,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "90 ft",
	components : "V,S,M",
	compMaterial : "A piece of tentacle from a giant squid",
	duration : "Conc, 1 min",
	description : "Alien tentacles fill a 20-ft square, difficult terrain",
	allowUpCasting : true,
	descriptionFull : "Alien tentacles fill a 20-foot square on the ground you can see within range. For the duration, this area is difficult terrain." + "\n   " + "When a creature enters this area for the first time on a turn or starts its turn there, it must succeed on a Dexterity saving throw or take 3d6 bludgeoning damage and be restrained by the tentacles until the spell ends. Any creature that begins its turn in the area and is restrained by the tentacles takes 3d6 bludgeoning damage at the start of its turn." + "\n   " + "A creature restrained by the tentacles can use its action to make a Strength or Dexterity check (its choice) against your spell save DC. On a success, it frees itself from the tentacles." + AtHigherLevels + "When you cast this spell using a spell slot of 5th level or higher, both instances of damage from this spell increase by 1d6 for each slot level above 4th."
};
SpellsList["pillars of earth"] = {
	name : "Pillars of Earth",
	nameShort : "Pillars of Earth",
	regExpSearch : /^(?=.*pillars)(?=.*earth).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)"],
	level : 4,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "120 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Raise pillars of earth that can restrain creatures",
	allowUpCasting : true,
	descriptionFull : "You cause up to two pillars of stone to burst forth from places on the ground that you can see within range. Both pillars are cylinders with a diameter of 5 feet and a height up to 30 feet." + "\n   " + "The ground where a pillar appears must be wide enough for its diameter, and you can target ground under a creature if that creature is Medium or smaller. Each pillar has an Armor Class of 5 and 30 hit points. If reduced to 0 hit points, a pillar crumbles into rubble, creating an area of difficult terrain with a 10-foot radius. This rubble lasts until cleared." + "\n   " + "If a pillar is created under a creature, that creature must succeed on a Dexterity saving throw or be lifted by the pillar. A creature can choose to fail the save." + "\n   " + "If a pillar is prevented from reaching its full height because of a ceiling or other obstacle, any creature on the pillar takes 6d6 bludgeoning damage and is Restrained, pinched between the pillar and the obstacle. A Restrained creature can use its action to make either a Strength or Dexterity check against your Spell save DC. On a success, it is no longer Restrained and must either move off the pillar or fall off it." + AtHigherLevels + "If you cast this spell with a spell slot of 5th level or higher, you create two additional pillars for each slot level above 4th."
};
SpellsList["polymorph"] = {
	name : "Polymorph (LL)",
	nameShort : "Polymorph (LL)",
	regExpSearch : /^(?=.*polymorph).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "magus(laserllama)", "sorcerer", "sorcerer(laserllama)", "vessel(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)", "magus", "vessel"],
	level : 4,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "A caterpillar cocoon",
	duration : "Conc, 10 min",
	description : "Transform a creature into a beast (see book)",
	allowUpCasting : true,
	descriptionFull : "You attempt to transform a creature you can see within range into a Beast using the rules below. An unwilling target makes a Charisma saving throw to resist this effect. Shapechangers automatically succeed on this saving throw." + "\n   " + "Form. The new form can be any living Beast you have seen before. Creatures can only be transformed into a Beast with a CR equal to (or lower then) half its level or CR." + "\n   " + "Statistics. The creature's game statistics are replaced by those of the Beast. However, while transformed, it retains its alignment, personality, its Hit Points, and Charisma score." + "\n   " + "Actions. The creature can only take the actions that would be available to that Beast. It cannot speak, cast spells, or take any actions that require hands or speech." + "\n   " + "Equipment. Its clothing, weapons, armor, and objects it is holding meld into the new form. However, it can't activate, use, wield, or otherwise benefit from any of its equipment." + "\n   " + "Reverting. The creature instantly reverts to its true form if it is reduced to 0 hit points. It can also repeat this Charisma saving throw at the end of each of its turns, reverting to its true form on a successful save." + AtHigherLevels + "When you cast this spell with a slot of 5th-level or higher, you can target one additional creature for each slot level above 4th. You can choose the Beast that you transform each target into individually."
};
SpellsList["staggering smite"] = {
	name : "Staggering Smite (LL)",
	nameShort : "Staggering Smite (LL)",
	regExpSearch : /^(?=.*staggering)(?=.*smite).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["paladin", "paladin(laserllama)"],
	level : 4,
	school : "Evoc",
	time : "Hit",
	timeFull : "No action required, when you hit with a weapon attack (see spell)",
	range : "Self",
	components : "V,M",
	compMaterial : "A melee weapon worth at least 1 sp",
	duration : "Instantaneous",
	save : "Wis",
	description : "On melee weapon hit, +4d6+1d6/SL Psychic dmg (+1d6 vs. aberrations/telepaths); save or disadv. atk/checks, no reactions",
	allowUpCasting : true,
	descriptionFull : "When you hit with a melee weapon attack you can cause the weapon to pierce both body and mind. This attack deals 4d6 additional psychic damage, and the target must succeed on a Wisdom saving throw or until the start of its next turn, it has disadvantage on attack rolls and ability checks and it cannot take reactions." + "\n   " + "If your target is an aberration or it can speak telepathically this bonus psychic damage increases by 1d6." + AtHigherLevels + "When you cast this spell using a spell slot of 5th-level or higher, the psychic damage increases by 1d6 for each spell slot level above 4th."
};
SpellsList["wall of ice"] = {
	name : "Wall of Ice (LL)",
	nameShort : "Wall of Ice (LL)",
	regExpSearch : /^(?=.*wall)(?=.*of)(?=.*ice).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "magus(laserllama)", "sorcerer", "sorcerer(laserllama)", "wizard", "wizard(laserllama)"],
	level : 4,
	school : "Conj",
	time : "1 a",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "A small piece of quartz",
	duration : "Conc, 1 min",
	save : "Dex",
	description : "1-ft thick ice wall (dome, sphere, or 10 panels); 6d6+2d6/SL Cold dmg on appear (half on save); AC 12, 30 HP per section",
	descriptionFull : "You create a 1-foot thick wall of ice on a solid surface within range. You create it as a hemispherical dome or a sphere with radius of up to 10 feet, or you shape a flat surface made up of ten 10-foot-square panels. All panels must be contiguous with another panel. The ice wall lasts for the duration." + "\n   " + "When the wall appears, creatures in its space must make a Dexterity saving throw. On a failure, you decide which side of the wall they are pushed to, then they take 6d6 cold damage. On a success, they decide which side they are pushed to, and they take half as much cold damage." + "\n   " + "The wall has an AC of 12, 30 hit points per 10-foot section, and it is Vulnerable to fire damage. When a 10-foot section is destroyed, a sheet of frigid air remains in that space. When a creature passes through a sheet of this frigid air it must make a Constitution saving throw. It takes 2d6 cold damage on a failure, and half as much on a success. A creature can only be forced to make this saving throw once per turn." + AtHigherLevels + "If you cast this spell using a spell slot of 5th-level or higher, the damage the wall deals when it appears increases by 2d6, and damage from passing through a sheet of frigid air increases by 1d6, for each slot level above 4th."
};
SpellsList["wall of thorns"] = {
	name : "Wall of Thorns (LL)",
	nameShort : "Wall of Thorns (LL)",
	regExpSearch : /^(?=.*wall)(?=.*thorns).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "ranger", "ranger(laserllama)"],
	level : 4,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "120 ft",
	components : "V,S,M",
	compMaterial : "A handful of thorns",
	duration : "Conc, 10 min",
	description : "Conjure wall of thorny plants, 5d8 piercing damage, difficult terrain",
	descriptionShorter : "Conjure wall of thorny plants, 5d8 piercing damage, difficult terrain",
	allowUpCasting : true,
	descriptionFull : "You conjure a wall of thick plant growth bristling with thorns hard as iron. It appears in range on a solid surface. The wall can be up to 60 feet long, 10 feet high, and 5 feet thick. Or, it forms a 20-foot diameter circle, 20 feet high and 5 feet thick." + "\n   " + "When it appears, creatures within it must make a Dexterity saving throw. On a failure, they take 5d8 piercing damage and remain within the wall. On a successful save, they take half as much damage and move to an adjacent space of its choice not within the area of the wall." + "\n   " + "Moving Through. Any creature can painfully move through the wall, but it must spend 4 feet of movement for every 1 foot it moves within it. The first time a creature enters the wall or begins its turn in it, it must make a Dexterity saving throw. It takes 5d8 piercing damage on a failure, half on a success." + AtHigherLevels + "When you cast this spell using a slot of 5th level or higher, both instances of damage increase by 1d8 for each slot level above 4th."
};

// ----- 5th-level spells -----
SpellsList["banishing smite"] = {
	name : "Banishing Smite (LL)",
	nameShort : "Banishing Smite (LL)",
	regExpSearch : /^(?=.*banishing)(?=.*smite).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["paladin", "paladin(laserllama)"],
	level : 5,
	school : "Evoc",
	time : "Hit",
	timeFull : "No action required, when you hit with a weapon attack (see spell)",
	range : "Self",
	components : "V,M",
	compMaterial : "A melee weapon worth at least 1 sp",
	duration : "Conc, 1 min",
	description : "Add 5d10 force damage; banished if at 50 HP or fewer",
	allowUpCasting : true,
	descriptionFull : "When you hit with a melee weapon attack you can cause the weapon to crackle with pure arcane force. This attack deals 5d10 bonus force damage, and if it reduces the target to 50 hit points or fewer, it is banished from the current plane." + "\n   " + "If the target is native to a different plant of existence than the one you are currently on, it disappears, returning to its home plane. If the target is native to your current plane, it is banished to a harmless demiplane where it is incapacitated. When the spell ends, the target returns to the space it was banished from, or the nearest unoccupied space." + "\n   " + "If the target is not native to your current plane of existence this bonus force damage increases by 1d10." + AtHigherLevels + "When you cast this spell using a spell slot of 6th-level or higher, the bonus force damage increases by 1d10 for each spell slot level above 5th."
};
SpellsList["conjure celestial"] = {
	name : "Conjure Celestial",
	nameShort : "Conjure Celestial",
	regExpSearch : /^(?=.*conjure)(?=.*celestial).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["cleric", "cleric(laserllama)", "paladin", "paladin(laserllama)"],
	level : 5,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V (a Celestial's true name),S",
	duration : "Conc, 1 h",
	description : "Conjure a celestial (see book)",
	descriptionShorter : "Conjure a celestial (see book)",
	allowUpCasting : true,
	descriptionFull : "Speaking its true name, you conjure a Celestial of CR 5 or lower to aid you. This Celestial is Friendly to you and your allies, obeys your commands, and uses the rules below:" + "\n   " + "Statistics. The Celestial appears in an unoccupied space of your choice you can see in range. When it appears, you can cause it to take on the appearance and statistics of a different Celestial of your choice equal to its CR, or lower." + "\n   " + "Combat. This Celestial shares your initiative and it acts during your turn. You can give it verbal commands (no action required). If the Celestial does not receive a command, or its commands are completed, it will move and defend itself." + "\n   " + "Spellcasting. If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots." + AtHigherLevels + "When you cast this spell using a spell slot of 6th level or higher, the CR of the Celestials that you can conjure increases by 1 for each slot level above 5th."
};
SpellsList["conjure dragon"] = {
	name : "Conjure Dragon",
	nameShort : "Conjure Dragon",
	regExpSearch : /^(?=.*conjure)(?=.*dragon).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "wizard", "wizard(laserllama)"],
	level : 5,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "The scale of an Ancient Dragon, inlaid with gems worth at last 500 gold, willingly gifted to you",
	duration : "Conc, 1 h",
	description : "Conjure a dragon (see book)",
	descriptionShorter : "Conjure a dragon (see book)",
	allowUpCasting : true,
	descriptionFull : "Grasping the material component of this spell, you conjure a portion of that Ancient Dragon's essence to your aid. While your concentration lasts, it is Friendly to you and your allies and obeys your commands. For the duration, this draconic essence uses the rules below:" + "\n   " + "Statistics. The draconic essence manifests in the form of a Dragon of your choice of CR 5 or lower, however, the color of its scales, its damage resistance, and the damage dealt by its breath weapon change to match that of the dragon which provided the material component of this spell. It appears in an unoccupied space of your choice within range." + "\n   " + "Combat. In combat, this Dragon shares your initiative and acts on your turn. You can give it verbal commands (no action required). If the Dragon does not receive any commands, or if its commands are completed, it defend itself with prejudice." + "\n   " + "Spellcasting. If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots." + "\n   " + "Control. If your concentration ends, the Dragon instantly disappears, the essence returning to the Ancient Dragon." + AtHigherLevels + "When you cast this spell using a spell slot of 6th level or higher, the CR of Dragon this essence can manifest increases by 1 for each slot level above 5th."
};
SpellsList["conjure giant"] = {
	name : "Conjure Giant",
	nameShort : "Conjure Giant",
	regExpSearch : /^(?=.*conjure)(?=.*giant).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "wizard", "wizard(laserllama)"],
	level : 5,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "A gemstone worth at least 500 gold, personally inscribed with the Rune of a Storm Giant",
	duration : "Conc, 1 h",
	description : "Conjure a Hill Giant (stronger giants with higher SL) that obeys my verbal commands; it uses my slots to cast spells",
	allowUpCasting : true,
	descriptionFull : "Grasping the material component of this spell, you conjure a portion of that Storm Giants's essence to your aid. While your concentration lasts, it is Friendly to you and your allies and obeys your commands. For the duration, this titanic essence uses the rules below:" + "\n   " + "Statistics. The titanic essence manifests in the form of a Hill Giant, and uses the corresponding stat block. It appears in an unoccupied space of your choice within range." + "\n   " + "Combat. In combat, this Giant shares your initiative and acts on your turn. You can give it verbal commands (no action required). If the Giant does not receive any commands, or if its commands are completed, it defend itself with prejudice." + "\n   " + "Spellcasting. If it can cast spells, you can command it to do so, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast without spell slots." + "\n   " + "Control. If your concentration ends, the Giant instantly disappears, the essence returning to the Storm Giant." + AtHigherLevels + "You can cast this spell with higher level spell slots to cause this titanic essence to take on the form of more powerful Giants, as shown in the table below:" + "\n   " + "[see the Compendium of Spells for the table/stat block]"
};
SpellsList["create construct"] = {
	name : "Create Construct",
	nameShort : "Create Construct",
	regExpSearch : /^(?=.*create)(?=.*construct).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["artificer", "artificer(laserllama)", "wizard", "wizard(laserllama)"],
	level : 5,
	school : "Trans",
	time : "1 h",
	timeFull : "1 hour",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "High quality materials worth at least 200 gold per level of the spell, all of which are consumed",
	duration : "Instantaneous",
	description : "Create a Golem Servant (see book)",
	descriptionShorter : "Create a Golem Servant (see book)",
	descriptionFull : "Using a set of artisan's tools with which you are proficient, you set to work creating a creation of arcane power. Once the spell is complete, the material components are transformed into a Golem Servant, which uses the rules below:" + "\n   " + "Statistics. The Golem Servant uses the stat block below. It uses your Spellcasting Ability, the Spell Slot spent to cast this spell, your Spell Attack Modifier, and Proficiency Bonus (PB) in several places throughout the stat block. You choose if your Golem is Medium or Large sized, and its appearance reflects the materials you used in its creation." + "\n   " + "Control. Your Golem has no mind of its own and obeys you absolutely. In combat, it shares your initiative and acts during your turn. However, unless you give it a command, the Golem Servant remains in its space and will only act in self defense. If you are within 500 feet of your Golem, you can use a bonus action to Telepathically issue it a command, determining how it will act on its turn or to set a general course of action for it (ie: \"defend this creature\") until you give it another command." + "\n   " + "Magical Nature. The Golem cannot benefit from healing spells, nor short or long rests. The only way for it to regain hit points is for a creature to touch it and spend one spell slot. It then regains hit points equal to 10 times the slot's level." + "\n   " + "Creator's Bond. While the Golem lives, you cannot regain the spell slot you expended to create it, and casting this spell again instantly destroys any previous Golem Servants."
};
SpellsList["flame strike"] = {
	name : "Flame Strike (LL)",
	nameShort : "Flame Strike (LL)",
	regExpSearch : /^(?=.*flame)(?=.*strike).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["cleric", "cleric(laserllama)"],
	level : 5,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A pinch of sulfur",
	duration : "Instantaneous",
	save : "Dex",
	description : "10-ft rad 40-ft high cylinder all crea 5d6+1d6/SL Fire & 5d6+1d6/SL Radiant dmg; half on save",
	descriptionFull : "A vertical column of divine fire roars down from the heavens in a location you specify. Creatures within this 10-foot-radius, 40-foot-high cylinder must make a Dexterity saving throw. On a failure, they take 5d6 fire and 5d6 radiant damage, and half as much damage on a successful save." + AtHigherLevels + "If you cast this spell with a spell slot of 6th-level or higher, both the fire and radiant damage increase by 1d6 for each level above 5th."
};
SpellsList["psychic crush"] = {
	name : "Psychic Crush",
	nameShort : "Psychic Crush",
	regExpSearch : /^(?=.*psychic)(?=.*crush).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["psion(laserllama)"],
	level : 5,
	school : "Evoc",
	time : "1 a",
	timeFull : "1 action",
	range : "90 ft",
	components : "V",
	duration : "Conc, 1 min",
	description : "5d8 force damage; repeat save for additional damage",
	allowUpCasting : true,
	descriptionFull : "You exert the full force of your will upon a creature you can see within range. It must succeed on a Strength saving throw, taking 5d8 force damage on a failure and half as much force damage on a success. It must repeat this saving throw at the end of each of its turns, taking 2d8 force damage on a failure, and ending the effects of this spell on a success." + "\n   " + "If this spell reduces a creature to 0 hit points it is crushed into a flesh-colored ball, roughly the size of your fist." + AtHigherLevels + "When you cast this spell using a spell slot of 6th-level or higher, each instance of force damage it deals increases by 1d8 for each spell slot level above 5th."
};
SpellsList["spiritual sundering"] = {
	name : "Spiritual Sundering",
	nameShort : "Spiritual Sundering",
	regExpSearch : /^(?=.*spiritual)(?=.*sundering).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["cleric", "cleric(laserllama)", "shaman(laserllama)", "warlock", "warlock(laserllama)", "shaman"],
	level : 5,
	school : "Ench",
	time : "1 a",
	timeFull : "1 action",
	range : "120 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "8d6 necrotic damage; penalty on mental saves",
	descriptionFull : "Creatures in a 20-foot-radius sphere centered on a point of your choice within range have their soul rent, and must make a Charisma saving throw. On a failure, they take 8d6 necrotic damage, and for the next minute, they have a muddied sense of self and subtract 1d6 from any Intelligence, Wisdom, or Charisma saving throw they make. On a success, they take half damage and suffer no saving throw penalty." + "\n   " + "Targets can make a Charisma saving throw at the end of each of their turns, ending the effect on a successful save."
};
SpellsList["steel wind strike"] = {
	name : "Steel Wind Strike (LL)",
	nameShort : "Steel Wind Strike (LL)",
	regExpSearch : /^(?=.*steel)(?=.*wind)(?=.*strike).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["magus(laserllama)", "ranger", "ranger(laserllama)", "magus"],
	level : 5,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V,M",
	compMaterial : "A melee weapon worth at least 1 sp",
	duration : "Instantaneous",
	description : "Attack up to 5 targets; add 5d10 force damage",
	descriptionFull : "You flourish the weapon used in the casting and then vanish to strike like the wind. Choose up to five targets you can see within range. Make one melee weapon attack against each target using the weapon used in the casting. On a hit, targets take the normal damage of an attack with that weapon plus an additional 5d10 force damage." + "\n   " + "You can then teleport to an unoccupied space you can see within 5 feet of one of the targets you hit or missed."
};
SpellsList["swift quiver"] = {
	name : "Swift Quiver (LL)",
	nameShort : "Swift Quiver (LL)",
	regExpSearch : /^(?=.*swift)(?=.*quiver).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["ranger", "ranger(laserllama)"],
	level : 5,
	school : "Trans",
	time : "1 bns",
	timeFull : "1 bonus action",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "A quiver with a piece of ammunition",
	duration : "Conc, 1 min",
	description : "Endless nonmagical ammunition; make 2 attacks per turn",
	descriptionFull : "You transmute your quiver so it produces an endless supply of nonmagical ammunition, which seems to leap into your hand when you reach for it." + "\n   " + "On each of your turns until the spell ends, you can use a bonus action (including the bonus action used to cast this spell) to make two attacks with a ranged weapon that uses ammunition from this quiver. When you make such a ranged attack, your quiver magically replaces the ammunition you used with a nonmagical copy of that ammunition. Pieces of ammunition created by this spell disintegrate when the spell ends. If the quiver leaves your possession, the spell ends."
};
SpellsList["vorpal blade"] = {
	name : "Vorpal Blade",
	nameShort : "Vorpal Blade",
	regExpSearch : /^(?=.*vorpal)(?=.*blade).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["magus(laserllama)", "paladin", "paladin(laserllama)", "magus"],
	level : 5,
	school : "Trans",
	time : "1 atk",
	timeFull : "In place of one attack of the Attack action",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "The finger bone of a necromancer",
	duration : "Instantaneous",
	description : "6d8 force damage; behead if reduced to 50 HP or fewer",
	descriptionFull : "You conjure a blade of pure negative energy in your empty hand and make one melee weapon attack against a creature within your reach, attempting to behead it. On hit, it takes force damage equal to 6d8 + your spellcasting modifier." + "\n   " + "If this damage reduces the creature to 50 hit points or fewer, you instantly cut off one of its heads of your choice" + "\n   " + "The creature instantly dies if it cannot survive without the lost head. The creature's head is not removed if it is immune to slashing damage, or if it doesn't have or need a head."
};
SpellsList["wall of force"] = {
	name : "Wall of Force (LL)",
	nameShort : "Wall of Force (LL)",
	regExpSearch : /^(?=.*wall)(?=.*force).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["magus(laserllama)", "psion(laserllama)", "sorcerer", "sorcerer(laserllama)", "wizard", "wizard(laserllama)", "magus"],
	level : 5,
	school : "Abjur",
	time : "1 a",
	timeFull : "1 action",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "Powder from crushed clear gemstone",
	duration : "Conc, 10 min",
	description : "150 hit points; creates an opaque wall of force",
	allowUpCasting : true,
	descriptionFull : "A shimmering wall of magical force springs into existence at a point you choose within range and lasts for the duration." + "\n   " + "Orientation & Shape. The wall appears in any orientation you choose, as a horizontal or vertical barrier or an angle. It can be free floating or rest on a solid surface. You can form it into a hemispherical dome, a sphere with a radius of up to 10 feet, or you can shape a flat surface made up of ten 10-by-10-foot panels. Each panel must be contiguous with another. In any form, the wall is 1/4 inch thick. Nothing can pass through the wall physically, and anything viewed through it is lightly obscured. The wall extends into the Ethereal Plane, blocking ethereal travel through the wall. If it cuts through a creature's space when it appears, the creatures must make a Dexterity saving throw. On a success, it chooses which side of the wall it moves to. On a failure, you choose the side it moves to." + "\n   " + "Statistics. The wall has 150 hit points and its Armor Class equals your Spell save DC. It is immune to poison, psychic, and non-magical bludgeoning, piercing, and slashing damage, vulnerable to force and magical bludgeoning, piercing, and slashing damage, and resistant to all other damage types. It cannot be dispelled by a dispel magic spell, but a disintegrate spell destroys the wall it instantly." + AtHigherLevels + "When you cast this spell using a spell slot of 6th-level or higher, the hit points of the wall created by this spell increase by 25 for each spell slot level above 5th."
};

// ----- 6th-level spells -----
SpellsList["astral blade"] = {
	name : "Astral Blade (LL)",
	nameShort : "Astral Blade (LL)",
	regExpSearch : /^(?=.*astral)(?=.*blade).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["sorcerer", "sorcerer(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 6,
	school : "Conj",
	time : "1 bns",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Cha",
	description : "Blade within 60 ft makes 2 melee spell atks: 4d6+2d6/SL Force, crit 18-20 (Cha save or banished); bonus action to repeat",
	descriptionFull : "You conjure a 3-foot blade of pure astral energy. It appears in a space you can see within range, and you instantly make two melee spell attacks with it against targets within 5 feet. Astral Blade attacks score a critical hit on a roll of 18-20 on the d20. On hit, they deal 4d6 force damage. On a critical hit, its target must succeed on a Charisma saving throw or be banished to a harmless Demiplane until the start of your next turn." + "\n   " + "On subsequent turns, you can use a bonus action to move your Astral Blade up to 60 feet and make two attacks with it." + "\n   " + "Your Astral Blade can harmlessly pass through any barrier created with magic, like those of a wall of force spell." + AtHigherLevels + "If you cast this spell using a spell slot of 7th-level or higher, the force damage dealt by the Astral Blade increases by 2d6 for each spell slot level above 6th."
};
SpellsList["create monstrosity"] = {
	name : "Create Monstrosity",
	nameShort : "Create Monstrosity",
	regExpSearch : /^(?=.*create)(?=.*monstrosity).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["wizard", "wizard(laserllama)"],
	level : 6,
	school : "Trans",
	time : "1 h",
	timeFull : "1 hour",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "The corpses of the appropriate Beasts and blood of the spellcaster, both of which are consumed",
	duration : "Instantaneous",
	description : "Create a monstrosity (see book)",
	descriptionShorter : "Create a monstrosity (see book)",
	allowUpCasting : true,
	descriptionFull : "You spill your blood onto the corpses binding them together into a new form, reducing your maximum hit points by 5 and creating a Hippogriff, Griffon, or Peryton under your control. Monstrosities created by this spell use the rules below:" + "\n   " + "Control. As a bonus action, you can mentally command any Monstrosities created by this spell, so long as they are within 60 feet. You determine how they act or set a general course of action for them (\"defend this dungeon\"). Monstrosities follow commands until they are complete. If your Monstrosity is not given a command, it defends itself with extreme prejudice." + "\n   " + "Creator's Bond. While a Monstrosity is under your control you can't regain the maximum hit points spent in its creation. However, when you finish a long rest, you can release control over a Monstrosity to regain the maximum hit points spent to create it. When released, Monstrosities becomes hostile to all living things, the spellcaster that created it in particular." + AtHigherLevels + "You can cast this spell with a spell slot of a higher level, and expend maximum hit points (Max. HP) to create more powerful Monstrosities, as shown here:" + "\n   " + "[see the Compendium of Spells for the table/stat block]"
};
SpellsList["astral projection"] = {
	name : "Astral Projection (LL)",
	nameShort : "Astral Projection (LL)",
	regExpSearch : /^(?=.*astral)(?=.*projection).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["cleric", "cleric(laserllama)", "psion(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 6,
	school : "Div",
	time : "1 h",
	range : "Self",
	components : "V,S,M",
	compMaterial : "A 10-foot long cord of mithril worth 1,000 gold for each target, which the spell consumes",
	duration : "Special",
	description : "Project my soul into the Astral Plane, leaving my body in suspended animation; +3 creatures per SL above 6; see book",
	descriptionFull : "You separate your soul from your body, projecting it into the Astral Plane (The spell fails if you cast it on the Astral Plane). Your physical body is left behind, Unconscious and in a state of suspended animation; it does not need air, food, nor water, and it does not age. Your soul uses the following rules:" + "\n   " + "Astral Body. Your soul forms an Astral Body around itself. It is an exact replica of your physical body with your statistics and posessions, though a silver cord extends from the center of its back, turning invisibile after 1 foot. Any damage or other effects that apply to it don't affect your physical body or carry over to it when you return to your body." + "\n   " + "Silver Cord. This cord tethers your soul to your physical body, and as long as it is intact, you can find your way to your physical body. If the cord is severed (which only happens if an effect specifically states that it does), your soul and body are permanently separated, killing you instantly." + "\n   " + "Ending the Spell. If you leave the Astral Plane through a portal to another plane or return to the plane where the spell was cast, your physical body and its possessions travel along your silver cord, and you re-enter your physical body there." + "\n   " + "The spell ends if you use your action to end it, if a spell like dispel magic is cast on your Astral Body or physical body, or if either body is reduced to 0 hit points. When the spell ends in this way, your soul instantly travels along your silver cord and returns to your physical body, where you awaken." + AtHigherLevels + "If you cast this spell with a spell slot of 7th-level or higher, you can target three additional creatures for each spell slot level above 6th." + "\n   " + "Any additional creatures must remain within 10 feet of you while you cast the spell."
};
SpellsList["create homunculus"] = {
	name : "Create Homunculus",
	nameShort : "Create Homunculus",
	regExpSearch : /^(?=.*create)(?=.*homunculus).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["wizard", "wizard(laserllama)"],
	level : 6,
	school : "Trans",
	time : "1 h",
	timeFull : "1 hour",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "Clay, a sapphire worth 500 gold, and blood from the spellcaster, all of which are consumed",
	duration : "Instantaneous",
	description : "Create a homunculus servant (see book)",
	descriptionShorter : "Create a homunculus servant (see book)",
	descriptionFull : "While muttering incantations, you spill your blood onto the sapphire and place it at the heart of the clay, which you shape into your Homunculus. Your maximum hit points are reduced by 2d4 (this can't be lessened in any way), and a Homunculus comes to life under your control using the rules below:" + "\n   " + "Statistics. The Homunculus uses the stat block below. It uses your Spellcasting Ability, the Spell Slot spent to cast this spell, your Spell Attack Modifier, and Proficiency Bonus (PB) in several places throughout the stat block." + "\n   " + "Control. Your Homunculus is absolutely loyal to you as its creator. It acts independently of you, but you can choose how it acts. In combat, it shares your initiative and your turn." + "\n   " + "Lifeblood Bond. While your Homunculus lives, you cannot regain the maximum hit points spent in its creation. Casting this spell again instantly destroys any previous Homunculus." + "\n   " + "The Homunculus cannot benefit from healing spells, short, or long rests. However, whenever you regain hit points (from a spell or rest), you can forgo regaining any number of those hit points and cause the Homunculus to regain them in your stead, so long as you are on the same plane of existence." + "\n   " + "Finally, if you should die, the Homunculus dies instantly."
};
SpellsList["elemental avatar"] = {
	name : "Elemental Avatar",
	nameShort : "Elemental Avatar",
	regExpSearch : /^(?=.*elemental)(?=.*avatar).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "sorcerer", "sorcerer(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 6,
	school : "Trans",
	time : "1 a",
	range : "Self",
	components : "V,S",
	duration : "Conc, 1 h",
	description : "Gain benefits of Air, Earth, Fire, or Ice (+1 per SL above 6), each with an action burst of 4d8 dmg in 15 ft; see book",
	descriptionFull : "You draw upon the chaotic energies of the elemental planes, infusing yourself with pure elemental Air, Earth, Fire, or Ice. For the duration, you gain the benefits of that element:" + "\n   " + "Air. A vortex of wind swirls about you, causing all ranged weapon attacks targeting you to be made with disadvantage, and granting you a flying speed equal to your walking speed." + "\n   " + "As an action, you can unleash a tempestuous burst, forcing creatures within 15 feet to make a Strength saving throw. On a failed save, they take 4d8 thunder damage and are pushed away from you 15 feet in a straight line. On a successful save, they take half as much damage and are not moved." + "\n   " + "Earth. Your body is covered in a shifting layer of raw earth and stone, granting you Resistance to bludgeoning, piercing, and slashing damage. You can also ignore any difficult terrain imposed by earth, stone, sand, or similar materials." + "\n   " + "As an action, you rend the earth at your feet out to a 15-foot radius turning it into difficult terrain and forcing all creatures in that area to make a Dexterity saving throw. They take 4d8 bludgeoning damage and fall Prone on a failed save, and half as much damage and do not fall Prone on a success." + "\n   " + "Fire. Flames envelop your body, harmless to you. You gain Immunity to fire damage, Resistance to radiant damage, and you shed bright light out to a 30-foot radius." + "\n   " + "As an action, you unleash a burst of searing fire, forcing all creatures within 15 feet to make a Dexterity saving throw. On a failure, they take 4d8 fire damage and are Blinded until the start of your next turn. On a success, they take half as much damage and are not Blinded." + "\n   " + "Ice. A thin sheen of glacial frost covers your body. You gain Immunity to cold damage, and the area within 15 feet of you becomes difficult terrain for creatures other than you due to the frigid temperature emitting from your body." + "\n   " + "As an action, you can flash freeze the area within 15 feet, forcing creatures to make a Constitution saving throw. On a failure, they take 4d8 cold damage and their speed is halved until the start of your next turn. On a success, they take half as much damage and their speed is not affected." + AtHigherLevels + "If you cast this spell using a spell slot of 6th-level or higher, you gain the benefits of another element of your choice (you can only choose each element once), and the damage of the special actions granted by this spell increases by 1d8 for each spell slot level above 5th."
};
SpellsList["psionic oppression"] = {
	name : "Psionic Oppression",
	nameShort : "Psionic Oppression",
	regExpSearch : /^(?=.*psionic)(?=.*oppression).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["psion(laserllama)"],
	level : 6,
	school : "Ench",
	time : "1 a",
	timeFull : "1 action",
	range : "60 ft",
	components : "V,S",
	duration : "1 min",
	description : "12d6 psychic damage; stunned on failed save",
	descriptionFull : "You psionically overwhelm the mind of one creature you can see within range. It must succeed on an Intelligence saving throw or it takes 12d6 psychic damage and is stunned for 1 minute. On a successful save, the target takes half as much psychic damage and is not stunned." + "\n   " + "The stunned target can repeat the saving throw at the end of each of its turns, ending the effect on a success."
};

// ----- 7th-level spells -----
SpellsList["create simulacrum"] = {
	name : "Create Simulacrum",
	nameShort : "Create Simulacrum",
	regExpSearch : /^(?=.*create)(?=.*simulacrum).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["wizard", "wizard(laserllama)"],
	level : 7,
	school : "Illus",
	time : "12 h",
	timeFull : "12 hours",
	range : "10 ft",
	components : "V,S,M",
	compMaterial : "Snow, the severed finger of the target, and two rubies worth 500 gold, all of which is consumed",
	duration : "Until Dispelled",
	description : "Create a duplicate of a humanoid (see book)",
	descriptionShorter : "Create a duplicate of a humanoid (see book)",
	descriptionFull : "While maintaining unwavering focus, you sculpt snow into a duplicate of a Humanoid within range for the entire casting. Placing its severed finger in its place and using the rubies as eyes, the Simulacrum comes to life, using these rules:" + "\n   " + "Statistics. The Simulacrum uses the same statistics as the target Humanoid, but its creature type is Construct, it cannot regain hit points or benefit from short or long rests, and it is vulnerable to fire damage (due to being made of snow)." + "\n   " + "Control. The Simulacrum is absolutely loyal to you and it obeys any orders you give it without hesitation. In combat, the Simulacrum shares your initiative and acts during your turn." + "\n   " + "Illusory Being. The Simulacrum cannot gain experience or levels, and it can't learn new abilities or spells of any kind." + "\n   " + "The only way for the Simulacrum to regain hit points is for a creature to touch it and spend a spell slot. The Simulacrum then regains hit points equal to 10 times that slot's level." + "\n   " + "Spellcasting. If the target creature can cast spells, you can command the Simulacrum to cast them, but it uses your spell slots to fuel its spellcasting, even if it would normally be able to cast spells without expending spell slots." + "\n   " + "Paradoxical Prevention. Casting this spell again instantly destroys any other Simulacrums you have created. Moreover, each individual creature can only have one Simulacrum of it created at a time. Should another spellcaster uses this spell to craft a Simulacrum of a creature for which a Simulacrum already exists, the spell instantly fails and the slot is wasted."
};
SpellsList["forcecage"] = {
	name : "Forcecage (LL)",
	nameShort : "Forcecage (LL)",
	regExpSearch : /^(?=.*forcecage).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["psion(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 7,
	school : "Conj",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "An ornate jade box worth 1,500 gp",
	duration : "Conc, 1 h",
	description : "Creates a force prison (20ft cage/10ft box), teleportation requires a Cha save.",
	allowUpCasting : true,
	descriptionFull : "A shimmering, immobile, cube-shaped prison composed of magical force springs into existence around an area of your choice within range. You choose whether this magic prison is shaped like a cage with bars or a solid box." + "\n   " + "Shape. If you choose cage, it can be up to 20 feet on a side and made from 1/2-inch diameter bars spaced 1/2 inch apart. If you choose box, it can be up to 10 feet on a side, creating a solid barrier that prevents any matter from passing through it and blocking any spells cast into or out of the area. The cage extends into the Ethereal Plane, blocking ethereal travel." + "\n   " + "Creatures Inside. When you cast the spell, any creatures that are completely inside the area of the cage are trapped. Any creatures partially within the area, or too large to fit are pushed away until they are completely outside of the cage." + "\n   " + "A creature inside the cage cannot leave it by non-magical means. If the creature tries to use teleportation or interplanar travel to leave the cage, it must first make a Charisma saving throw. The spell or effect is wasted on a failed save, but on a success the creature uses the spell or effect to escape." + "\n   " + "Statistics. The cage's Armor Class equals your Spell save DC and it has 200 hit points. It is immune to poison, psychic, and non-magical bludgeoning, piercing, and slashing damage, vulnerable to force and magical bludgeoning, piercing, and slashing damage, and resistant to all other damage types. It cannot be dispelled by a dispel magic spell, but a disintegrate spell destroys the cage it instantly." + AtHigherLevels + "When you cast this spell using a spell slot of 8th-level or higher, the hit points of the cage created by this spell increase by 25 for each spell slot level above 7th."
};
SpellsList["time stop"] = {
	name : "Time Stop (LL)",
	nameShort : "Time Stop (LL)",
	regExpSearch : /^(?=.*time)(?=.*stop).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["psion(laserllama)", "sorcerer", "sorcerer(laserllama)", "wizard", "wizard(laserllama)"],
	level : 7,
	school : "Div",
	time : "1 a",
	range : "Self",
	components : "V",
	duration : "Instantaneous",
	description : "I take 2 turns in a row (+1 per SL above 7); ends if I move 1,000 ft or affect another creature",
	descriptionFull : "You briefly stop the flow of time for everyone but yourself. No time passes for other creatures, while you take two turns in a row, during which you can use actions and move as normal." + "\n   " + "This spell instantly ends if you move more than 1,000 feet from the location you cast it in, or if an action you use during the spell affects a creature other than you or an object that is being worn or carried by another creature." + AtHigherLevels + "If you cast this spell using a spell slot of 8th-level or higher, the number of turns you take while time is stopped increases by 1 for each spell slot level above 7th."
};
SpellsList["whirlwind"] = {
	name : "Whirlwind (LL)",
	nameShort : "Whirlwind (LL)",
	regExpSearch : /^(?=.*whirlwind).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["cleric", "cleric(laserllama)", "druid", "druid(laserllama)", "sorcerer", "sorcerer(laserllama)", "wizard", "wizard(laserllama)"],
	level : 7,
	school : "Trans",
	time : "1 a",
	range : "300 ft",
	components : "V,M",
	compMaterial : "A single leaf or piece of straw",
	duration : "Conc, 1 min",
	save : "Str",
	description : "10-ft rad 50-ft high tornado; creas entering: Str save or 10d6 Thunder (half) and restrained if Large or smaller; see book",
	descriptionFull : "You magically transmute the winds in the area to conjure a powerful tornado under your control. This whirlwind appears as a 10-foot radius, 50-foot high cylinder centered on a point you can see in range. With subsequent actions, you can move the whirlwind up to 30 feet in any direction along the ground." + "\n   " + "The whirlwind sucks up any Medium or smaller objects that aren't being worn or carried or otherwise secured when they enter its space for the first time." + "\n   " + "Any creature that enters the whirlwind's space must make a Strength saving throw. They take 10d6 thunder damage on a failure, and half as much on a successful save. Any Large or smaller creature that fails its saving throw is also sucked into the Whirlwind and Restrained in it. Each creature can only be forced to make this saving throw once per turn." + "\n   " + "Restrained creatures move with the Whirlwind, and at the start of each of its turns it is Restrained within it, it takes 2d6 thunder damage and moves 10 feet up within the whirlwind. When a creature moves beyond the top of the whirlwind, it is thrown 60 feet in a random direction and lands Prone." + "\n   " + "As an action, any Restrained creature can make a Strength check against your Spell save DC. On a successful check, it is thrown from whirlwind 60 feet in a direction of its choice." + AtHigherLevels + "When you cast this spell using a spell slot of 8th-level or higher, the whirlwind is 10 feet taller and it deals an additional 2d6 thunder damage every time it deals damage for each slot level above 7th."
};

// ----- 8th-level spells -----
SpellsList["animal shapes"] = {
	name : "Animal Shapes (LL)",
	nameShort : "Animal Shapes (LL)",
	regExpSearch : /^(?=.*animal)(?=.*shapes).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)"],
	level : 8,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V,S",
	duration : "Conc, 24 h",
	description : "Transform willing creatures into beasts (see book)",
	descriptionShorter : "Transform willing creatures into beasts (see book)",
	descriptionFull : "You use elder magicks to transmute yourself and others into animal forms. Choose any number of willing creatures within range to transform into Beasts, using the following rules:" + "\n   " + "Form. Each creature is transformed into a Beast of CR 4 or lower that you have seen before. You can choose different form for each target. On subsequent turns, you can use your action to transform one target of this spell within 30 feet into another Beast, using the same restrictions." + "\n   " + "Statistics. The creature's game statistics are replaced by those of the Beast. However, while transformed, it retains its alignment, personality, its Hit Points, and Charisma score." + "\n   " + "Actions. The creature can only take the actions that would be available to that Beast. It cannot speak, cast spells, or take any actions that require hands or speech." + "\n   " + "Equipment. Its clothing, weapons, armor, and objects it is holding meld into the new form. However, it can't activate, use, wield, or otherwise benefit from any of its equipment." + "\n   " + "Reverting. A creature instantly reverts to its true form if it is reduced to 0 hit points. It can also revert to its normal form early as an action. However, once it returns to its normal form the effects of this spell end for it."
};
SpellsList["antipathy"] = {
	name : "Antipathy (LL)",
	nameShort : "Antipathy (LL)",
	regExpSearch : /^(?=.*antipathy).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "psion(laserllama)", "shaman(laserllama)", "wizard", "wizard(laserllama)", "psion", "shaman"],
	level : 8,
	school : "Ench",
	time : "1 h",
	timeFull : "1 hour",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "A spoonfull of vinegar for antipathy, or a drop of honey for sympathy",
	duration : "10 days",
	description : "Infuse object with repulsive or attractive magic (see book)",
	descriptionShorter : "Infuse object with repulsive or attractive magic (see book)",
	descriptionFull : "You infuse a Huge or smaller object with powerful repulsive magic, choosing a type of intelligent creature such as bronze dragons, trolls, or hags. For the duration, this object emits a 60-foot aura of magic which repels that type of creature." + "\n   " + "Effects. If the chosen creature can see the object or enters its magic aura, it feels an intense urge to flee, and must make a Wisdom saving throw or become Frightened of the object." + "\n   " + "It is Frightened so long as it can see the object, or while it remains in its magical aura. While Frightened, it must use its movement to flee from the object to the nearest safe location outside of its magic aura where it cannot see the object. Once a creature does so, it is no longer Frightened of the object." + "\n   " + "The creature becomes Frightened of this object again if it can see it or if it reenters the object's magical aura." + "\n   " + "Ending this Effect. If an effected creature can no longer see the object and is outside of its magic aura, it can use its action to repeat the Wisdom saving throw. On a successful save, the creature knows the effect is magical in nature, and it gains immunity to the effect for 1 minute." + "\n   " + "Inverse Casting. You can use this spell to infuse sympathy into an object instead. If a chosen creature can see the object or moves within its magic aura, it must succeed on a Wisdom saving throw or use all its movement on each turn to move as close to the object as it can. Once it does so, it can't willingly move away from the object. If the target takes damage while under this effect, it can end the effect as described above."
};

// ----- 9th-level spells -----
SpellsList["shapechange"] = {
	name : "Shapechange (LL)",
	nameShort : "Shapechange (LL)",
	regExpSearch : /^(?=.*shapechange).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "wizard", "wizard(laserllama)"],
	level : 9,
	school : "Trans",
	time : "1 a",
	timeFull : "1 action",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "Three interwoven circlets of gold, platinum, and lead, worth at least 1,500 gold",
	duration : "Conc, 10 min",
	description : "Transform into a creature of CR equal to half your level (see book)",
	descriptionShorter : "Transform into a creature of CR equal to half your level (see book)",
	descriptionFull : "You place the material component of this spell on your head and transform into a creature of CR equal to half your level, or lower. It cannot be a Construct or Undead, and you must have seen a living specimen of that creature before. It is an average specimen of that creature, and it cannot have class levels or the Spellcasting feature." + "\n   " + "Statistics. Your game statistics are replaced by the chosen creature's, though, you retain your alignment, personality, hit points, and Intelligence, Wisdom, and Charisma scores. You retain your proficiencies and gain those of the creature. If you both share a proficiency, you can use the higher bonus." + "\n   " + "You cannot use Legendary Resistances, Legendary Actions, or Lair Actions even if the chosen creature has them." + "\n   " + "Features. You retain your features and can use them so long as the chosen creature is capable of doing so. You don't retain special senses, but use the senses of the creature." + "\n   " + "Equipment. You choose whether your equipment falls to the ground, merges with your new form, or is worn by it. Your equipment does not change size to fit your new form, and you only retain its benefits if the creature you transform into can wear and use the object." + "\n   " + "Shifting. While the spell lasts, you can use your action to transform again, taking the shape of another creature of your choice, following the same rules and restrictions above."
};
SpellsList["storm of vengeance"] = {
	name : "Storm of Vengeance (LL)",
	nameShort : "Storm of Vengeance (LL)",
	regExpSearch : /^(?=.*storm)(?=.*vengeance).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["cleric", "cleric(laserllama)", "druid", "druid(laserllama)"],
	level : 9,
	school : "Conj",
	time : "1 a",
	timeFull : "1 action",
	range : "Sight",
	components : "V,S",
	duration : "Conc, 1 h",
	description : "You conjure a terrifying mass of storm clouds (see book)",
	descriptionFull : "You conjure a terrifying mass of storm clouds centered on a point you can see, spreading outward to a radius of 360 feet. You are completely immune to the effects of this dark storm. Violent winds, thunder, and lighting fill the storm, forcing all creatures within and below the storm to make a Constitution saving throw. On a failed save, they take 2d6 thunder damage and are Deafened while they remain in the area." + "\n   " + "Each subsequent round the storm lasts, you can use your action to add (or end) one of the weather effects below, which lasts for the duration. They affect all creatures and objects in and below the storm, and each can only be added once:" + "\n   " + "Acid Rain. Acidic rain falls from the clouds, dealing 1d6 acid damage to all creatures at the end of each of your turns." + "\n   " + "Freezing Rain. Frigid rain falls from the clouds. The area becomes difficult terrain and heavily obscured. Targets in the area take 1d6 cold damage at the end of each of your turns." + "\n   " + "Hail Stones. You infuse the storm with bitter cold. At the end of each of your turns, creatures and objects in the area take 2d6 bludgeoning damage and crops are destroyed." + "\n   " + "High Winds. Strong winds up to 50 miles per hour rage, instantly dispersing all fog, mist, or similar effects, mundane or magical. Ranged attacks in the area become impossible." + "\n   " + "Lightning Strikes. You charge the storm with lightning. As a bonus action on each turn, you can call six bolts of lighting from the cloud, each striking targets of your choice within the area. They must make a Dexterity saving throw, taking 10d6 lighting damage on a failure, and half on a success."
};
SpellsList["true polymorph"] = {
	name : "True Polymorph (LL)",
	nameShort : "True Polymorph (LL)",
	regExpSearch : /^(?=.*true)(?=.*polymorph).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["druid", "druid(laserllama)", "sorcerer", "sorcerer(laserllama)", "vessel(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 9,
	school : "Trans",
	time : "1 a",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "A drop of mercury, a dollop of gum arabic, and a wisp of smoke",
	duration : "Conc, 1 h",
	save : "Cha",
	description : "Transform crea/object into crea or object; permanent if I concentrate for the full duration; see book",
	descriptionFull : "You point your finger at one creature or non-magical object you can see in range, transforming it in one of the ways listed below. An unwilling target makes a Charisma saving throw to resist this effect, and Shapechangers automatically succeed on this saving throw. This spell cannot affect a target with 0 hit points, or an object that is being worn or carried." + "\n   " + "If you concentrate on the effect for the full duration of this spell, the transformation becomes permanent for your target." + "\n   " + "Creature to Creature. The creature is transformed into another creature of a CR equal to (or lower then) half its CR or level. You must have seen a living specimen of the creature before in order to transform the target into that creature. The targets's game statistics are replaced by those of the creature, only retaining its alignment, personality, and Hit Points. All of its gear merges with its new form, and it cannot activate, use, or benefit from it while transformed. It can only take actions available to its new form, including speech, spellcasting, and things that require specific anatomy, such as hands." + "\n   " + "Creature to Object. The creature is transformed into a non-magical object equal to its size or smaller. Everything it is wearing or carrying is transformed with it. You must have seen this object before to transform the creature into it. The target's statistics are replaced with those of the object. If the transformation ends, the target has no memory of the time it spent as the object." + "\n   " + "Object to Creature. The non-magical object transforms into a creature equal to the objects size (or smaller) of CR 9 or lower. You must have seen a live specimen of the creature before in order to transform the object into that creature. Its statistics are replaced by those of the creature, it is Friendly to you and your allies, it rolls its own initative in combat, and you decide how it acts. Should the spell becomes permanent the new creature becomes independent, and it decides how to relate to you based how it was treated under your control." + "\n   " + "Object ot Object. The non-magical object is transformed into another non-magical object you have seen before, of its size or smaller. It statistics are replaced by the new object."
};
SpellsList["weird"] = {
	name : "Weird (LL)",
	nameShort : "Weird (LL)",
	regExpSearch : /^(?=.*weird).*$/i,
	source : [["GMB:LL", 0]],
	classes : ["psion(laserllama)", "warlock", "warlock(laserllama)", "wizard", "wizard(laserllama)"],
	level : 9,
	school : "Illus",
	time : "1 a",
	timeFull : "1 action",
	range : "120 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "Frighten multiple creatures within a 30-foot radius. Frightened creatures take 4d10 psychic damage each turn (Wis save ends).",
	descriptionFull : "Drawing on the deepest fears, regrets, and primal instincts of a creature, you create the illusion of the most horrifying thing imaginable to them, which is visible only to that creature." + "\n   " + "Choose a point within range, and creatures of your choice within a 30-foot radius of the point become Frightened for the duration. If a target is immune to the Frightened condition, it must make a Wisdom saving throw or be Frightened anyway." + "\n   " + "At the end of each of a Frightened creature's turns, it must succeed on a Wisdom saving throw or it takes 4d10 psychic damage. On a success, the spell ends for that target."
};

// ===================================================================================
// MERCENARY (Recruit Mercenary Exploit, Compendium of Exploits v1.0)
// Add it on a Companion page ("Companion Options" > "Change Race" or the race field)
// ===================================================================================
LLMercenaryHP = {
	hp : function (totalHD, HDobj, prefix) {
		var lvl = Number(What("Character Level")) || 1;
		HDobj.alt.push(6 + 5 * lvl);
		HDobj.altStr.push(" = 6 as a base\n + 5 \xD7 " + lvl + " from five times its employer's level (" + (5 * lvl) + ")");
	},
	setAltHp : true
};
CreatureList["mercenary, brute"] = {
	name : "Mercenary (Brute)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Humanoid",
	alignment : "Any",
	ac : 18,
	hp : 11,
	hd : [1, 10],
	speed : "30 ft",
	proficiencyBonus : 3,
	proficiencyBonusLinked : false,
	challengeRating : "1",
	scores : [16, 16, 13, 10, 12, 8],
	saves : [6, 6, "", "", "", ""],
	skills : { "Athletics" : 6 },
	senses : "",
	passivePerception : 11,
	languages : "Common, Thieves' Cant",
	attacksAction : 1,
	attacks : [{
		name : "Longsword",
		ability : 1,
		damage : [1, 8, "slashing"],
		range : "Melee (5 ft)",
		description : "",
		abilitytodamage : true
	}],
	traits : [{
		name : "Hit Dice",
		description : "The Mercenary has a number of d10 Hit Dice equal to its employer's level. It benefits from short and long rests."
	}, {
		name : "Morale",
		description : "If its employer falls to 0 hit points, the Mercenary flees."
	}, {
		name : "Brutal (Bonus Action)",
		description : "The Mercenary makes a Shove or Grapple."
	}],
	notes : [{
		name : "Recruit Mercenary",
		description : "The Mercenary rolls its own initiative and follows the orders of its employer; if it has none, it defends itself to the best of its ability. HP = 6 + 5 \xD7 employer's level.",
		joinString : ": "
	}],
	calcChanges : LLMercenaryHP
};
CreatureList["mercenary, scout"] = {
	name : "Mercenary (Scout)",
	source : [["GMB:LL", 0]],
	size : 3,
	type : "Humanoid",
	alignment : "Any",
	ac : 15,
	hp : 11,
	hd : [1, 10],
	speed : "30 ft",
	proficiencyBonus : 3,
	proficiencyBonusLinked : false,
	challengeRating : "1",
	scores : [16, 16, 13, 10, 12, 8],
	saves : [6, 6, "", "", "", ""],
	skills : { "Stealth" : 6 },
	senses : "",
	passivePerception : 11,
	languages : "Common, Thieves' Cant",
	attacksAction : 1,
	attacks : [{
		name : "Shortbow",
		ability : 2,
		damage : [1, 6, "piercing"],
		range : "80/320 ft",
		description : "",
		abilitytodamage : true
	}],
	traits : [{
		name : "Hit Dice",
		description : "The Mercenary has a number of d10 Hit Dice equal to its employer's level. It benefits from short and long rests."
	}, {
		name : "Morale",
		description : "If its employer falls to 0 hit points, the Mercenary flees."
	}, {
		name : "Cunning (Bonus Action)",
		description : "The Mercenary takes the Hide action."
	}],
	notes : [{
		name : "Recruit Mercenary",
		description : "The Mercenary rolls its own initiative and follows the orders of its employer; if it has none, it defends itself to the best of its ability. HP = 6 + 5 \xD7 employer's level.",
		joinString : ": "
	}],
	calcChanges : LLMercenaryHP
};

// ===================================================================================
// ALTERNATE WARLOCK: ELDRITCH INVOCATIONS & ELDER ARCANA (Alternate Warlock v3.2.0 + Expanded v3.2.0)
// Used by the Alternate Warlock class (and listed by the Alternate Eldritch Adept feat)
// ===================================================================================
LLWlkLvl = function () { return classes.known["warlock(laserllama)"] ? classes.known["warlock(laserllama)"].level : 0; };
// Current Pact Ability (4 Int, 5 Wis, 6 Cha)
LLWlkAbi = function () {
	var o = CurrentSpells["warlock(laserllama)"];
	return o && o.ability && !isNaN(o.ability) ? Number(o.ability) : (CurrentVars && CurrentVars.LLWlkAbi ? CurrentVars.LLWlkAbi : 6);
};
// Pact Focus test (also true if learned through the Elder Focus arcanum)
LLWlkFocus = function (sFocus) {
	if (!classes.known["warlock(laserllama)"]) return true;
	var sCh = GetFeatureChoice("classes", "warlock(laserllama)", "pact focus");
	if (sCh && sCh.indexOf(sFocus) !== -1) return true;
	var aEx = GetFeatureChoice("classes", "warlock(laserllama)", "elder arcanum", true);
	return aEx && aEx.indexOf("elder focus: " + sFocus) !== -1 ? true : false;
};

// Pact modifier added to the AC of a Pact armor (Armor of Shadows, Eldritch Flesh); follows the chosen Pact Ability
LLWlkPactAC = function (sName, sArmorRx) {
	var aRet = [];
	for (var n = 4; n <= 6; n++) {
		aRet.push({
			name : sName,
			mod : AbilityScores.abbreviations[n - 1],
			text : "While using " + sName + ", I add my Pact modifier to my AC.",
			stopeval : new Function("v", "return !v.theArmor || !v.theArmor.name || !(/" + sArmorRx + "/i).test(v.theArmor.name) || LLWlkAbi() !== " + n + ";")
		});
	}
	return aRet;
};
LLWlkPactUses = "event.value = Math.max(1, Number(What(AbilityScores.abbreviations[LLWlkAbi() - 1] + ' Mod')));";


// Eldritch Invocations: [name, min level, required Pact Focus, description, extra attributes]
LLWarlockInvocations = [
	["Aspect of the Moon", 0, "", "I don't need to sleep and can't be forced to; I gain a long rest's benefits with 8 hours of light activity"],
	["Beguiling Influence", 0, "", "I gain proficiency in Deception, Insight, Intimidation, or Persuasion and can use my Pact ability for it (can take more than once)", { skillstxt : "Choose one from Deception, Insight, Intimidation, or Persuasion" }],
	["Eldritch Sight", 0, "", "As an action, I sense magic within 30 ft (concentration): visible creatures/objects bearing magic and their school; blocked by 1 ft stone, 1 in metal, lead, 3 ft wood/dirt", { action : [["action", ""]] }],
	["Eyes of the Rune Keeper", 0, "", "I can read and understand any writing, symbols, or scripts as if in my native tongue"],
	["Gaze of Two Minds", 0, "", "As an action, I touch a willing humanoid and perceive through its senses (concentration); I'm blinded and deafened to my own surroundings", { action : [["action", ""]] }],
	["Gift of the Deep Ones", 0, "", "I can breathe underwater and have a swimming speed equal to my walking speed; from 5th level, water breathing once per long rest without a slot", { speed : { swim : { spd : "walk", enc : "walk" } }, spellcastingBonus : [{ name : "Gift of the Deep Ones", spells : ["water breathing"], selection : ["water breathing"], firstCol : "oncelr", times : levels.map(function (n) { return n < 5 ? 0 : 1; }) }] }],
	["Infernal Sight", 0, "", "I can see normally in dim light and darkness, both magical and nonmagical, out to 120 ft", { vision : [["Infernal Sight", 120]] }],
	["Misty Visions", 0, "", "As an action, I create a visual illusion up to a 15-ft cube within 60 ft for 10 min; action: move it; Investigation vs. my DC sees through; one at a time", { action : [["action", ""]] }],
	["Mask of Many Faces", 0, "", "As an action, I change my appearance and voice to that of a creature I've seen with the same limbs (not size, clothing, or statistics)", { action : [["action", ""]] }],
	["Sylvan Speech", 0, "", "I know Sylvan and can talk with beasts in it; from 7th level, also with plants as per speak with plants", { languageProfs : ["Sylvan"] }],
	["Accursed Armor", 3, "blade", "With a 1-hour ritual, I make a set of armor my Accursed Armor: I'm proficient with it and don/doff it instantly when conjuring my Eldritch Blade"],
	["Armor of Shadows", 3, "", "As an action, I don (or dismiss) shadow armor: without armor or shield, my AC is 10 + Pact mod + Dex mod (select \"Armor of Shadows\" as armor)", { action : [["action", ""]], armorOptions : [{ regExpSearch : /^(?=.*armou?r)(?=.*shadows).*$/i, name : "Armor of Shadows", source : [["GMB:LL", 0]], ac : 10, affectsWildShape : false }], extraAC : LLWlkPactAC("Armor of Shadows", "armou?r of shadows") }],
	["Cloak of Decay", 3, "", "As a bonus action, I conjure (or dispel) a 5-ft swarm: chosen creatures starting their turn in it take Pact mod piercing; adv. on Intimidation, disadv. on other influence checks", { action : [["bonus action", ""]] }],
	["Eldritch Spear", 3, "", "The range of my Eldritch Blast and of my warlock spells with a ranged spell attack is doubled"],
	["Grasp of Hadar", 3, "", "When I hit a creature with Eldritch Blast, I can pull it up to 10 ft toward me (halved per size above Large)"],
	["Lance of Lethargy", 3, "", "When I damage a creature with Eldritch Blast, I can halve its speed until the start of my next turn (once per creature per turn)"],
	["Otherworldly Vigor", 3, "", "As a bonus action, I gain temporary hit points equal to my Pact mod (min 1)", { action : [["bonus action", ""]] }],
	["Repelling Blast", 3, "", "When I hit a creature with Eldritch Blast, I can push it up to 10 ft away (halved per size above Large)"],
	["Thief of Five Fates", 3, "", "As an action, a creature I see within 30 ft makes a Cha save or subtracts 1d4 from its d20 rolls for 1 min (concentration; save each turn; success: immune until dawn)", { action : [["action", ""]] }],
	["Tome of Ancient Secrets", 3, "tome", "My Tome gains two 1st-level ritual spells from any list (warlock spells for me); I can add more rituals up to my Slot Level (1 hour, scroll, 50 gp per level); cast only as rituals", { spellcastingBonus : [{ name : "Tome of Ancient Secrets", "class" : "any", level : [1, 1], ritual : true, times : 2, firstCol : "(R)" }] }],
	["Voice of the Master", 3, "familiar", "I can communicate telepathically with my familiar and perceive through its senses on the same plane, and speak through it"],
	["Blasphemous Prayer", 5, "tome", "My Tome holds one 2nd-level Channel Divinity of any cleric Divine Domain; I use it once per short rest (warlock level = cleric level, my DC)", { usages : 1, recovery : "short rest" }],
	["Erupting Blast", 5, "", "When I damage a creature with Eldritch Blast, as a bonus action, chosen creatures within 5 ft of it take Pact mod (min 1) damage of my blast's type", { action : [["bonus action", ""]] }],
	["One with Shadows", 5, "", "In dim light or darkness, I can cast invisibility on myself without a slot (once per long rest; from 9th level, at will)", { spellcastingBonus : [{ name : "One with Shadows", spells : ["invisibility"], selection : ["invisibility"], firstCol : "Sp" }] }],
	["Thirsting Blade", 5, "blade", "I can attack twice with my Eldritch Blade when I take the Attack action; after casting a warlock spell or Eldritch Blast with my action, one Blade attack as a bonus action", { action : [["bonus action", "Eldritch Blade attack"]] }],
	["Tomb of Frost", 5, "", "As a reaction when I take damage, I encase myself in ice (HP 10 \xD7 warlock level, AC 10) that takes the damage; I can't be targeted, am immune to damage, incapacitated, restrained; end at start of my turn; 1/SR, then a Pact slot", { usages : 1, recovery : "short rest", action : [["reaction", ""]] }],
	["Vitality of the Ageless", 5, "familiar", "When I or my familiar regain HP while within 30 ft of each other, healing dice count as their maximum"],
	["Arcane Secrets", 7, "", "I learn a warlock spell of 4th level or lower and can cast it once per long rest at its lowest level without a slot (can take more than once, different levels)", { spellcastingBonus : [{ name : "Arcane Secrets", "class" : "warlock(laserllama)", level : [1, 4], firstCol : "oncelr" }] }],
	["Ascendant Step", 7, "", "As a bonus action, I gain a flying speed equal to my walking speed until the end of my turn (no hover)", { action : [["bonus action", ""]] }],
	["Enspelled Blade", 7, "blade", "My Eldritch Blade hits apply all additional (non-damage) effects of my Eldritch Blast from Invocations and my Patron"],
	["Ethereal Sight", 7, "", "As an action, for 1 min (concentration), I have darkvision and see through solid objects within 30 ft as ghostly shadows", { action : [["action", ""]] }],
	["Favored Servant", 7, "", "Once per long rest, I can cast one of my Patron Spells at my slot level without a slot (can take more than once, different spells)", { usages : 1, recovery : "long rest" }],
	["Otherworldly Nature", 7, "", "I don't need to eat, breathe, or sleep (long rest = 8 hours of light activity); I age 1 year per 10"],
	["Whispers of the Grave", 7, "", "I learn speak with dead and can cast it at will without a spell slot", { spellcastingBonus : [{ name : "Whispers of the Grave", spells : ["speak with dead"], selection : ["speak with dead"], firstCol : "atwill" }] }],
	["Commune with Patron", 9, "", "I learn contact other plane; once per long rest, I cast it without a slot to contact my Patron and automatically succeed on its save", { spellcastingBonus : [{ name : "Commune with Patron", spells : ["contact other plane"], selection : ["contact other plane"], firstCol : "oncelr" }] }],
	["Favor of the Master", 9, "familiar", "At the end of a long rest, I choose a warlock spell I know; my familiar can cast it once at my slot level without a slot"],
	["Witch Sight", 9, "", "I have truesight out to 10 ft (30 ft from 15th level) while conscious", { vision : [["Truesight", 10]] }],
	// Alternate Warlock Expanded v3.2.0
	["Cloak of Winds", 3, "shroud", "With my Shroud equipped, I subtract up to 100 ft from a fall; when I fall 5+ ft, I can move 2 ft horizontally per 1 ft fallen"],
	["Cup of Recovery", 3, "chalice", "Using my Chalice as focus, I cast restoration at my Slot Level without a slot (once per short rest)", { usages : 1, recovery : "short rest", spellcastingBonus : [{ name : "Cup of Recovery", spells : LLSpellList(["restoration"]), selection : LLSpellList(["restoration"]), firstCol : "oncesr" }] }],
	["Echoes of Antiquity", 3, "hourglass", "I gain History proficiency and use my Pact ability for it (double Prof if already proficient); History checks about an event where it happened: d20 of 9 or lower counts as 10", { skills : ["History"] }],
	["Eldritch Focus", 3, "", "When I fail a save to maintain concentration on a warlock spell, I can succeed instead", { usages : "Pact mod per ", usagescalc : LLWlkPactUses, recovery : "long rest" }],
	["Eldritch Strike", 3, "flesh", "I can replace any number of Eldritch Blast beams with melee spell attacks (one beam's damage and effects); on a hit, bonus action to grapple automatically", { action : [["bonus action", "Grapple (Eldritch Strike)"]] }],
	["Harmonic Spellcasting", 3, "instrument", "As a reaction when a creature within 30 ft casts a verbal spell, one of its targets makes its initial save with disadvantage", { action : [["reaction", ""]] }],
	["Piercing Note", 3, "instrument", "When my Instrument's Eldritch Blast deals thunder damage, I can forgo adding my Pact mod to deafen the target until my next turn"],
	["Unearthly Chorus", 3, "instrument", "Instead of a beam's attack roll from my Instrument, a creature within 60 ft that hears me makes a Con save or takes that beam's damage and effects"],
	["Cauldron of Lost Knowledge", 5, "chalice", "A 1-hour ritual destroys a vial or potion poured into my Chalice; I can then conjure that liquid with my Chalice after a rest"],
	["Eldritch Smite", 5, "", "When an Eldritch Blast beam hits, I can expend a Pact Magic slot for +1d8 + 1d8 per Slot Level damage"],
	["Iron Grip", 5, "flesh", "In Eldritch Flesh, I have a climbing speed equal to my walking speed and can climb vertical surfaces and upside down, hands free"],
	["Protective Cowl", 5, "shroud", "As a reaction when I take damage with my Shroud equipped, I halve it; my Shroud disappears (no uses left: can't conjure it)", { usages : "Pact mod per ", usagescalc : LLWlkPactUses, recovery : "long rest", additional : "regain 1 on a short rest", action : [["reaction", ""]] }],
	["Otherworldly Stasis", 5, "hourglass", "As an action, I shatter my Hourglass on a willing creature: stasis for 1 min, then a short rest's benefits if undisturbed; no Hourglass until a Pact slot or long rest", { action : [["action", ""]] }],
	["Incomprehensible Might", 7, "flesh", "In Eldritch Flesh, I can use my Pact ability instead of Strength for Strength checks and can grapple creatures up to two sizes larger"],
	["Stalker's Curse", 7, "", "When I damage a creature with a warlock spell or Eldritch Blast, as a bonus action I teleport to a space I see within 5 ft of it", { action : [["bonus action", ""]] }],
	["Stolen Seconds", 7, "hourglass", "Once per turn on an Hourglass Eldritch Blast hit, I forgo damage: Cha save or its speed is 0 until my next turn and I gain the Dash action this turn"],
	["Time Dilation", 7, "hourglass", "Once per long rest, I cast haste or slow at my Slot Level with my Hourglass without a slot", { usages : 1, recovery : "long rest", spellcastingBonus : [{ name : "Time Dilation", spells : LLSpellList(["haste", "slow"]), selection : LLSpellList(["haste", "slow"]), times : 2, firstCol : "oncelr" }] }],
	["Umbral Shroud", 7, "shroud", "With my Shroud in darkness or shadow, I'm also invisible to creatures relying on darkvision, Devil's Sight, or similar"],
	["Crawling Armor", 9, "flesh", "As a reaction when I take damage in Eldritch Flesh, I reduce it by my Pact mod (min 1)", { action : [["reaction", ""]] }],
	["Enchanting Melody", 9, "instrument", "I learn charm monster; once per long rest, I cast it with my Instrument without a slot; while I play it (bonus action each turn), my concentration can't be broken", { spellcastingBonus : [{ name : "Enchanting Melody", spells : LLSpellList(["charm monster"]), selection : LLSpellList(["charm monster"]), firstCol : "oncelr" }], action : [["bonus action", "Play Instrument (Enchanting Melody)"]] }],
	["Sanguine Obligation", 9, "", "A 1-hour ritual carves a willing creature's name into me (max Pact mod names); when it drops to 0 HP (not killed), the name vanishes and it drops to 1 HP instead"]
];

// Elder Arcana: [name, min level, required Pact Focus, description, extra attributes]
LLWarlockElderArcana = [
	["Elder Focus: Blade", 11, "", "I gain the Eldritch Blade Pact Focus (different from my other foci)"],
	["Elder Focus: Familiar", 11, "", "I gain the Eldritch Familiar Pact Focus (different from my other foci)"],
	["Elder Focus: Tome", 11, "", "I gain the Eldritch Tome Pact Focus (different from my other foci)", { bonusClassExtrachoices : [{ "class" : "warlock(laserllama)", feature : "eldritch invocations", bonus : 1 }] }],
	["Minion of Chaos", 11, "familiar", "Once per long rest, as an action, my familiar becomes a creature of the same type of CR 6 or lower I've seen for 1 min (keeps HP, gains 2 \xD7 warlock level temp HP; its spells use my slots)", { usages : 1, recovery : "long rest", action : [["action", ""]] }],
	["Minor Arcanum", 11, "", "I learn a 6th-level spell from the list (warlock spell for me) and can cast it at 6th level once per long rest without a slot", { spellcastingBonus : [{ name : "Minor Arcanum", spells : LLSpellList(["arcane gate", "astral blade", "astral projection", "circle of death", "eyebite", "elemental avatar", "mass suggestion", "mental prison", "otherworldly guise", "scatter", "soul cage", "true seeing"]), firstCol : "oncelr" }] }],
	["Occult Scholar", 11, "tome", "With a 1-hour ritual (can be in a rest), I replace any number of spells known; once per long rest, instead replace one Invocation"],
	["Occult Warrior", 11, "blade", "My Eldritch Blade hits deal +1d8 damage of my Eldritch Blast's type; the target has disadv. on the first save I force before my next turn ends"],
	["Bond of the Master", 13, "familiar", "Within 30 ft of each other, my familiar and I have adv. on saves vs. spells and magic; my self-targeting warlock spells can also affect it"],
	["Greater Arcanum", 13, "", "I learn a 7th-level spell from the list (warlock spell for me) and can cast it at 7th level once per long rest without a slot", { spellcastingBonus : [{ name : "Greater Arcanum", spells : LLSpellList(["crown of stars", "etherealness", "finger of death", "forcecage", "mirage arcane", "plane shift", "power word pain", "teleport"]), firstCol : "oncelr" }] }],
	["Greater Magicks", 13, "tome", "My number of Pact Magic spell slots increases by one (can be taken more than once)"],
	["Otherworldly Step", 13, "blade", "When I attack with my Eldritch Blade, I can teleport 10 ft before or after; Attack action with only Blade attacks: one extra Blade attack"],
	["Arcana of the Ancients", 15, "tome", "I learn three additional Eldritch Invocations (Invocations Known +3)", { bonusClassExtrachoices : [{ "class" : "warlock(laserllama)", feature : "eldritch invocations", bonus : 3 }] }],
	["Chains of the Abyss", 15, "familiar", "I learn hold monster; I can cast it without slot or components on aberrations, celestials, elementals, fey, or fiends (a success makes it immune until dawn, unless I use a slot)", { spellcastingBonus : [{ name : "Chains of the Abyss", spells : ["hold monster"], selection : ["hold monster"], firstCol : "Sp" }] }],
	["Eldritch Wind", 15, "blade", "As an action, I vanish and make a Blade attack vs. up to 5 creatures within 60 ft (6d10 of my blast's type + blast effects), then reappear within 5 ft of one; 1/SR, then a Pact slot", { usages : 1, recovery : "short rest", action : [["action", ""]] }],
	["Mystic Arcanum", 15, "", "I learn an 8th-level spell from the list (warlock spell for me) and can cast it at 8th level once per long rest without a slot", { spellcastingBonus : [{ name : "Mystic Arcanum", spells : LLSpellList(["demiplane", "feeblemind", "maddening darkness", "maze", "power word stun", "glibness", "telepathy"]), firstCol : "oncelr" }] }],
	["Awakened Blade", 17, "blade", "Holding my Blade, I can't have disadv. on attacks and add Pact mod to concentration saves; action: chosen creatures within 30 ft make a Dex save or take 10d6 of my blast's type and fall prone (half, not prone); 1/LR, then a Pact slot", { usages : 1, recovery : "long rest", action : [["action", "Awakened Blade explosion"]] }],
	["Ancient Arcanum", 17, "", "I learn a 9th-level spell from the list (warlock spell for me) and can cast it at 9th level once per long rest without a slot", { spellcastingBonus : [{ name : "Ancient Arcanum", spells : LLSpellList(["foresight", "gate", "imprisonment", "power word kill", "psychic scream", "true polymorph", "weird"]), firstCol : "oncelr" }] }],
	["Distort Reality", 17, "tome", "My Tome contains wish: I can cast it once per long rest without a slot; duplicated spells must have a casting time of 1 action or bonus action", { spellcastingBonus : [{ name : "Distort Reality", spells : ["wish"], selection : ["wish"], firstCol : "oncelr" }] }],
	["Eldritch Domination", 17, "familiar", "Once per short rest, I cast dominate monster at 8th level without a slot; a target of my hold monster automatically fails, ending hold monster", { spellcastingBonus : [{ name : "Eldritch Domination", spells : ["dominate monster"], selection : ["dominate monster"], firstCol : "oncesr" }] }],
	// Alternate Warlock Expanded v3.2.0
	["Elder Focus: Chalice", 11, "", "I gain the Eldritch Chalice Pact Focus (different from my other foci)"],
	["Elder Focus: Flesh", 11, "", "I gain the Eldritch Flesh Pact Focus (different from my other foci)"],
	["Elder Focus: Hourglass", 11, "", "I gain the Eldritch Hourglass Pact Focus (different from my other foci)"],
	["Elder Focus: Instrument", 11, "", "I gain the Eldritch Instrument Pact Focus (different from my other foci)", { bonusClassExtrachoices : [{ "class" : "warlock(laserllama)", feature : "eldritch invocations", bonus : 1 }] }],
	["Elder Focus: Shroud", 11, "", "I gain the Eldritch Shroud Pact Focus (different from my other foci)"],
	["Adamantine Hide", 11, "flesh", "When I transform with Eldritch Flesh, I can resist B/P/S damage and my Eldritch Blast's damage types for that transformation, but my speed is reduced by 5 ft"],
	["Alchemical Rebirth", 11, "chalice", "Once per long rest, using my Chalice as focus, I cast reincarnate without a slot or material components", { spellcastingBonus : [{ name : "Alchemical Rebirth", spells : LLSpellList(["reincarnate"]), selection : LLSpellList(["reincarnate"]), firstCol : "oncelr" }] }],
	["Imperceivable Moments", 11, "hourglass", "When I roll initiative (not incapacitated/surprised), before anyone acts I can Hide, Search, Use an Object, or move my speed without opportunity attacks"],
	["Unholy Facsimile", 13, "flesh", "During a long rest, a 1-hour ritual creates a create simulacrum Aberration (psychic vulnerability); no Eldritch Flesh for either while it lives; action: touch to absorb it"],
	["Temporal Rewind", 13, "hourglass", "At the end of my turn, I can undo the whole turn and take it again (out of combat: the last 10 seconds); once per long rest free, then 1 level of exhaustion each time", { usages : 1, recovery : "long rest" }],
	["Chronological Disjunction", 15, "hourglass", "I know time stop (warlock spell); once per short rest, I cast it at 7th level with my Hourglass without a slot", { spellcastingBonus : [{ name : "Chronological Disjunction", spells : LLSpellList(["time stop"]), selection : LLSpellList(["time stop"]), firstCol : "oncesr" }] }],
	["Eldritch Flight", 15, "flesh", "In Eldritch Flesh, I sprout wings: flying speed equal to my walking speed (+10 ft if I already have one)"],
	["Conjure Self", 17, "hourglass", "As an action, I shatter my Hourglass to summon my Future Self for 1 hour (my stats, shared resources, HP = warlock level); I can ask it one question (as commune)", { action : [["action", ""]] }],
	["Font of Unending Life", 17, "chalice", "After a long rest ritual: I don't age, I'm immune to poison and magical blinded/deafened/paralyzed/poisoned, and below half HP I regain Pact mod HP each turn; skip it and I age at once", { savetxt : { immune : ["poison"] } }],
	["Primordial Transformation", 17, "flesh", "I learn true polymorph (warlock spell); once per long rest, I cast it on myself only (creature into creature) and damage can't break my concentration", { spellcastingBonus : [{ name : "Primordial Transformation", spells : LLSpellList(["true polymorph"]), selection : LLSpellList(["true polymorph"]), firstCol : "oncelr" }] }],
	["Slip Away", 17, "shroud", "With my Shroud equipped, as a bonus action each turn I can teleport to a space I can see within 30 ft", { action : [["bonus action", "Slip Away (teleport 30 ft)"]] }]
];

// Sort the options by minimum level (stable), so the menus list them in order
LLWlkSortOpts = function (aData) {
	var aIdx = [];
	for (var i = 0; i < aData.length; i++) aIdx.push([aData[i], i]);
	aIdx.sort(function (a, b) { return (a[0][1] - b[0][1]) || (a[1] - b[1]); });
	var aRet = [];
	for (var j = 0; j < aIdx.length; j++) aRet.push(aIdx[j][0]);
	return aRet;
};
LLWarlockInvocations = LLWlkSortOpts(LLWarlockInvocations);
LLWarlockElderArcana = LLWlkSortOpts(LLWarlockElderArcana);
LLWlkPrereq = function (nLvl, sFocus) {
	return function (v) { return LLWlkLvl() >= nLvl && (!sFocus || LLWlkFocus(sFocus)); };
};
LLWlkOptions = function (oFea, aData) {
	for (var i = 0; i < aData.length; i++) {
		var a = aData[i];
		if (oFea[a[0].toLowerCase()]) continue;
		oFea.extrachoices.push(a[0]);
		var o = {
			name : a[0],
			source : [["GMB:LL", 0]],
			description : LLdesc(a[3])
		};
		if (a[1] || a[2]) {
			o.prereqeval = LLWlkPrereq(a[1], a[2]);
			o.submenu = "[" + (a[1] ? "warlock level " + (a[1] < 10 ? " " : "") + a[1] : "") + (a[1] && a[2] ? ", " : "") + (a[2] ? "Eldritch " + a[2].substr(0, 1).toUpperCase() + a[2].substr(1) : "") + "]";
		}
		if (a[4]) for (var p in a[4]) o[p] = a[4][p];
		oFea[a[0].toLowerCase()] = o;
	}
	return oFea;
};


// ===================================================================================
// ALTERNATE WARLOCK: PACT FOCI & ELDRITCH FAMILIARS (Alternate Warlock v3.2.0 + Expanded v3.2.0)
// LLWlkAddFoci(oFeature[, aKeys]) adds the Pact Foci as choices to any feature (e.g. a subclass granting a Pact Focus)
// ===================================================================================
LLWarlockPactFoci = {
	"eldritch blade" : {
		name : "Pact Focus: Eldritch Blade",
		description : LLdesc([
			"As a bonus action, I conjure a nonmagical melee weapon of my choice in an empty hand; it can be an Invocation Trinket",
			"I'm proficient with it, can use my Pact mod for attack and damage, and it deals my Eldritch Blast's damage type",
			"It vanishes if 5+ ft away for 1 min, if I conjure another, dismiss it, or die; a 1-hour ritual bonds a magic weapon"
		]),
		action : [["bonus action", "Conjure Eldritch Blade"]],
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.isSpell && v.isMeleeWeapon && /\b(pact|eldritch blade)\b/i.test(v.WeaponTextName)) {
						var nAbi = LLWlkAbi();
						if (Number(What(AbilityScores.abbreviations[nAbi - 1] + " Mod")) > Number(What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod"))) fields.Mod = nAbi;
						fields.Proficiency = true;
					}
				},
				"If I include the word 'Pact' or 'Eldritch Blade' in a melee weapon's name, it uses my Pact ability if higher and I'm proficient with it."
			]
		}
	},
	"eldritch familiar" : {
		name : "Pact Focus: Eldritch Familiar",
		description : LLdesc([
			"I learn conjure familiar (ritual; not counted); my familiar can also take an Eldritch Familiar form (Companion page)",
			"It obeys me, acts on my turn, and Dodges unless I command it (bonus action); I can cast spells and blasts from it within 60 ft"
		]),
		action : [["bonus action", "Command Familiar"]],
		spellcastingBonus : [{ name : "Eldritch Familiar", spells : LLSpellList(["conjure familiar", "find familiar"]).slice(0, 1), selection : LLSpellList(["conjure familiar", "find familiar"]).slice(0, 1), firstCol : "(R)" }]
	},
	"eldritch tome" : {
		name : "Pact Focus: Eldritch Tome",
		description : LLdesc([
			"My Tome holds the warlock spells I know; I gain one extra Invocation without prerequisites (Tome is its Trinket)",
			"At the end of a long rest, I can swap that Invocation and one warlock spell I know (same level)",
			"I can cast my warlock ritual spells as rituals; 1 hour to recreate the Tome"
		]),
		bonusClassExtrachoices : [{ "class" : "warlock(laserllama)", feature : "eldritch invocations", bonus : 1 }]
	},
	// Alternate Warlock Expanded v3.2.0
	"eldritch chalice" : {
		name : "Pact Focus: Eldritch Chalice",
		description : LLdesc([
			"As a bonus action, I conjure a Tiny Chalice in an empty hand; it can be an Invocation Trinket",
			"It counts as alchemist's supplies and an herbalism kit; I'm proficient and can use my Pact mod with it",
			"After a short or long rest, a ritual conjures one vial: acid, alchemist's fire, holy water, pure water, potion of healing or of climbing",
			"The vial lasts until my next long rest or ritual; the Chalice vanishes if 5+ ft away for 1 min, if I conjure another, dismiss it, or die"
		]),
		toolProfs : ["Alchemist's supplies", "Herbalism kit"],
		action : [["bonus action", "Conjure Eldritch Chalice"]]
	},
	"eldritch flesh" : {
		name : "Pact Focus: Eldritch Flesh",
		description : LLdesc([
			"As a bonus action, I transform into a fusion of myself and my Patron until I revert (bonus action) or fall unconscious:",
			"Without armor or shield, AC 10 + Pact mod + Con mod (select \"Eldritch Flesh\" as armor; it follows my Pact Ability)",
			"My body is my spellcasting focus for warlock spells and Eldritch Blast (not costly/consumed components)",
			"At the start of each turn, I can gain Pact mod (min 1) temp HP; I'm proficient in Intimidation and can use my Pact ability for it"
		]),
		skills : ["Intimidation"],
		armorOptions : [{ regExpSearch : /^(?=.*eldritch)(?=.*flesh).*$/i, name : "Eldritch Flesh", source : [["GMB:LL", 0]], ac : "10+Con", dex : -10 }],
		extraAC : LLWlkPactAC("Eldritch Flesh", "eldritch flesh"),
		action : [["bonus action", "Eldritch Flesh (transform/revert)"]]
	},
	"eldritch hourglass" : {
		name : "Pact Focus: Eldritch Hourglass",
		description : LLdesc([
			"As a bonus action, I conjure a Tiny otherworldly timekeeping device in an empty hand; it can be an Invocation Trinket",
			"When I fail a d20 roll, I can reroll it (must use the new roll); once this turns a failure into a success, not again until a short rest",
			"If not surprised or incapacitated, I add my Pact mod (min +1) to initiative",
			"It vanishes if 5+ ft away for 1 min, if I conjure another, dismiss it, or die"
		]),
		usages : 1,
		recovery : "short rest",
		action : [["bonus action", "Conjure Eldritch Hourglass"]]
	},
	"eldritch instrument" : {
		name : "Pact Focus: Eldritch Instrument",
		description : LLdesc([
			"As a bonus action, I conjure a musical instrument of my choice in an empty hand; while wielding it:",
			"+1 Invocation known, which must have Eldritch Instrument as prerequisite (the Instrument is its Trinket)",
			"I'm proficient and can use my Pact ability with it (double Prof if already proficient)",
			"Used as focus for a verbal spell or Eldritch Blast, I can change its damage to thunder; a 1-hour ritual bonds a magic instrument"
		]),
		toolProfs : [["Musical instrument", 1]],
		bonusClassExtrachoices : [{ "class" : "warlock(laserllama)", feature : "eldritch invocations", bonus : 1 }],
		action : [["bonus action", "Conjure Eldritch Instrument"]]
	},
	"eldritch shroud" : {
		name : "Pact Focus: Eldritch Shroud",
		description : LLdesc([
			"As a bonus action, I conjure a spectral cloak on my shoulders; while wearing it:",
			"In shadow, darkness, or natural obscurement (fog, mist), I can become invisible while within it",
			"I'm proficient in Stealth and can use my Pact ability for it (double Prof if already proficient)",
			"It vanishes if 5+ ft away for 1 min, if I conjure another, dismiss it, or die; a 1-hour ritual bonds a magic robe or cloak"
		]),
		skills : ["Stealth"],
		action : [["bonus action", "Conjure Eldritch Shroud"]]
	}
};
LLWlkAddFoci = function (oFea, aKeys) {
	if (!oFea.choices) oFea.choices = [];
	for (var sKey in LLWarlockPactFoci) {
		if (aKeys && aKeys.indexOf(sKey) === -1) continue;
		if (oFea[sKey]) continue;
		oFea.choices.push(sKey.replace(/\b\w/g, function (c) { return c.toUpperCase(); }));
		oFea[sKey] = LLWarlockPactFoci[sKey];
	}
	return oFea;
};

// Eldritch Familiars (Companion page); HP = 5 + 3 x warlock level
LLWlkFamHP = function (totalHD, HDobj, prefix) {
	if (!classes.known["warlock(laserllama)"]) return;
	var lvl = classes.known["warlock(laserllama)"].level;
	HDobj.alt.push(5 + 3 * lvl);
	HDobj.altStr.push(" = 5 as a base\n + 3 \xD7 " + lvl + " from three times its warlock's level (" + (3 * lvl) + ")");
};
var LLFamTraits = [{
	name : "Eldritch Bond",
	description : "When the familiar is forced to make an ability check or saving throw, it adds its warlock's Proficiency Bonus to its roll."
}, {
	name : "Hit Dice",
	description : "It has a number of d4 Hit Dice equal to its warlock's level and benefits from short and long rests."
}, {
	name : "Magic Resistance",
	description : "It has advantage on saving throws against spells and other magical effects."
}];
CreatureList["aberrant familiar (ll)"] = {
	name : "Aberrant Familiar (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Aberration",
	companion : "familiar",
	alignment : "Patron's alignment",
	ac : "11+Prof",
	hp : 8,
	hd : [1, 4],
	speed : "10 ft, fly 40 ft (hover)",
	scores : [3, 16, 12, 13, 10, 8],
	damage_resistances : "psychic",
	senses : "Darkvision 120 ft",
	passivePerception : 10,
	languages : "Deep Speech, understands its warlock",
	challengeRating : "0",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	attacksAction : 1,
	attacks : [{
		name : "Aberrant Whispers",
		ability : 6,
		damage : [1, 4, "psychic"],
		modifiers : ["", "Prof"],
		useSpellMod : "warlock(laserllama)",
		range : "30 ft",
		dc : true,
		description : "Int save (warlock's DC) or damage and -1d4 on its first d20 roll before the familiar's next turn",
		abilitytodamage : false
	}],
	traits : LLFamTraits,
	calcChanges : { hp : LLWlkFamHP, setAltHp : true }
};
CreatureList["draconic familiar (ll)"] = {
	name : "Draconic Familiar (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Dragon",
	companion : "familiar",
	alignment : "Patron's alignment",
	ac : "13+Prof",
	hp : 8,
	hd : [1, 4],
	speed : "20 ft, fly 60 ft",
	scores : [3, 16, 12, 10, 8, 13],
	damage_resistances : "its Essence type",
	senses : "Blindsight 10 ft, Darkvision 60 ft",
	passivePerception : 9,
	languages : "Draconic, understands its warlock",
	challengeRating : "0",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	attacksAction : 1,
	attacks : [{
		name : "Bite",
		ability : 6,
		damage : [1, 4, "piercing"],
		modifiers : ["", "3+Prof"],
		useSpellMod : "warlock(laserllama)",
		range : "Melee (5 ft)",
		description : "+1d4 damage of its Essence type (acid, cold, fire, lightning, or poison)",
		abilitytodamage : false
	}],
	traits : [{
		name : "Draconic Essence",
		description : "When conjured, choose acid, cold, fire, lightning, or poison as its Essence type, for its resistance and Bite."
	}, {
		name : "Keen Senses",
		description : "It has advantage on Wisdom checks that rely on sight or smell."
	}].concat(LLFamTraits),
	calcChanges : { hp : LLWlkFamHP, setAltHp : true }
};
CreatureList["faerie familiar (ll)"] = {
	name : "Faerie Familiar (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Fey",
	companion : "familiar",
	alignment : "Patron's alignment",
	ac : "11+Prof",
	hp : 8,
	hd : [1, 4],
	speed : "20 ft, fly 40 ft",
	scores : [3, 16, 10, 8, 13, 12],
	condition_immunities : "charmed, frightened",
	senses : "",
	passivePerception : 11,
	languages : "Elvish, Sylvan, understands its warlock",
	challengeRating : "0",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	attacksAction : 1,
	attacks : [{
		name : "Sting",
		ability : 6,
		damage : [1, 4, "piercing"],
		modifiers : ["", "3+Prof"],
		useSpellMod : "warlock(laserllama)",
		range : "Melee (5 ft)",
		description : "It also learns the target's emotional state",
		abilitytodamage : false
	}],
	actions : [{
		name : "Invisibility",
		description : "It magically turns invisible (with its equipment) until it attacks or forces a check or save; concentration."
	}],
	traits : LLFamTraits,
	calcChanges : { hp : LLWlkFamHP, setAltHp : true }
};
CreatureList["fiendish familiar (ll)"] = {
	name : "Fiendish Familiar (LL)",
	source : [["GMB:LL", 0]],
	size : 5,
	type : "Fiend",
	companion : "familiar",
	alignment : "Patron's alignment",
	ac : "11+Prof",
	hp : 8,
	hd : [1, 4],
	speed : "20 ft, fly 40 ft",
	scores : [3, 16, 12, 10, 8, 13],
	damage_resistances : "cold, fire, poison",
	condition_immunities : "poisoned",
	senses : "Devil's Sight 120 ft",
	passivePerception : 9,
	languages : "Abyssal, Infernal, understands its warlock",
	challengeRating : "0",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	attacksAction : 1,
	attacks : [{
		name : "Claw",
		ability : 6,
		damage : [1, 4, "slashing"],
		modifiers : ["", "3+Prof"],
		useSpellMod : "warlock(laserllama)",
		range : "Melee (5 ft)",
		description : "Target makes a Con save (warlock's DC) or is poisoned until the start of the familiar's next turn",
		abilitytodamage : false
	}],
	actions : [{
		name : "Shapechanger",
		description : "It transforms into a rat (20 ft, climb 20 ft), lizard (20 ft, swim 20 ft), raven (20 ft, fly 60 ft), or its true form; only its speed changes."
	}],
	traits : [{
		name : "Devil's Sight",
		description : "It can see normally in magical and nonmagical dim light and darkness."
	}].concat(LLFamTraits),
	calcChanges : { hp : LLWlkFamHP, setAltHp : true }
};


// ======================= ELDRITCH FAMILIARS =======================
LLWlkFamHP4 = function (totalHD, HDobj, prefix) {
	if (!classes.known["warlock(laserllama)"]) return;
	var lvl = classes.known["warlock(laserllama)"].level;
	HDobj.alt.push(5 + 4 * lvl);
	HDobj.altStr.push(" = 5 as a base\n + 4 \xD7 " + lvl + " from four times its warlock's level (" + (4 * lvl) + ")");
};
LLWlkFamily = function (sName, oData) {
	var o = {
		name : sName + " Familiar (LL)",
		source : [["GMB:LL", 0]],
		companion : "familiar",
		alignment : "Patron's alignment",
		hp : 8,
		hd : [1, 4],
		challengeRating : "0",
		proficiencyBonus : 2,
		proficiencyBonusLinked : true,
		attacksAction : 1,
		passivePerception : 9,
		calcChanges : { hp : LLWlkFamHP, setAltHp : true }
	};
	for (var p in oData) o[p] = oData[p];
	for (var i = 0; o.attacks && i < o.attacks.length; i++) {
		o.attacks[i].ability = 6;
		o.attacks[i].useSpellMod = "warlock(laserllama)";
	}
	CreatureList[sName.toLowerCase() + " familiar (ll)"] = o;
};
var LLFamBond = { name : "Eldritch Bond", description : "When the familiar is forced to make an ability check or saving throw, it adds its warlock's Proficiency Bonus to its roll." };
var LLFamHD4 = { name : "Hit Dice", description : "It has a number of d4 Hit Dice equal to its warlock's level and benefits from short and long rests." };
var LLFamMR = { name : "Magic Resistance", description : "It has advantage on saving throws against spells and other magical effects." };
LLWlkFamily("Angelic", {
	size : 5, type : "Celestial", ac : "11+Prof", speed : "25 ft, fly 30 ft",
	scores : [3, 16, 8, 10, 12, 13], damage_resistances : "necrotic, radiant", senses : "Darkvision 60 ft", passivePerception : 11,
	languages : "Celestial, understands its warlock",
	attacks : [{ name : "Strike", ability : 0, damage : [1, 4, "radiant"], modifiers : ["", "3+Prof"], range : "Melee (5 ft)", description : "", abilitytodamage : false }],
	actions : [{ name : "Divine Gift", description : "It touches a creature, granting it temporary hit points equal to its warlock's Pact modifier; using it again dispels the previous ones." }],
	traits : [LLFamBond, LLFamHD4, LLFamMR]
});
LLWlkFamily("Golem", {
	size : 4, type : "Construct", ac : "13+Prof", speed : "30 ft",
	scores : [12, 8, 16, 1, 8, 2], damage_resistances : "lightning, poison", senses : "Darkvision 60 ft",
	languages : "understands its warlock",
	attacks : [{ name : "Rend", ability : 0, damage : [1, 6, "bludgeoning"], modifiers : ["", "3+Prof"], range : "Melee (5 ft)", description : "", abilitytodamage : false }],
	actions : [{ name : "Lockdown", description : "A creature within 5 ft makes a Strength save (warlock's DC; Large or larger have advantage) or is grappled by the familiar." }],
	traits : [LLFamBond, LLFamHD4, LLFamMR, { name : "Wondrous Servant", description : "Each time it's conjured, its warlock chooses a set of tools it's proficient with; it uses the warlock's Pact ability and PB for them." }]
});
LLWlkFamily("Gruntling", {
	size : 4, type : "Giant", ac : "10+Prof", speed : "25 ft", hd : [1, 6],
	scores : [15, 8, 16, 6, 8, 2], damage_resistances : "cold, poison, thunder", senses : "",
	languages : "Giant, understands its warlock",
	attacks : [{ name : "Fist", ability : 0, damage : [1, 6, "bludgeoning"], modifiers : ["", "3+Prof"], range : "Melee (5 ft)", description : "Can forgo the damage to automatically grapple the target", abilitytodamage : false },
		{ name : "Hurl", ability : 0, damage : [1, 4, "bludgeoning"], modifiers : ["", "3+Prof"], range : "25/50 ft", description : "Throws a Tiny (or smaller) object", abilitytodamage : false }],
	traits : [LLFamBond, { name : "Hit Dice", description : "It has a number of d6 Hit Dice equal to its warlock's level and benefits from short and long rests." }, LLFamMR,
		{ name : "Mythic Might", description : "It counts as two sizes larger for grapples, shoves, and carrying capacity." }],
	calcChanges : { hp : LLWlkFamHP4, setAltHp : true }
});
LLWlkFamily("Oozing", {
	size : 5, type : "Ooze", ac : "10+Prof", speed : "25 ft, climb 25 ft",
	scores : [12, 8, 16, 1, 8, 2], damage_resistances : "bludgeoning, cold, fire", damage_immunities : "acid", condition_immunities : "grappled, prone, restrained",
	senses : "Blindsight 60 ft (blind beyond)", languages : "understands its warlock",
	attacks : [{ name : "Pseudopod", ability : 0, damage : [1, 4, "acid"], modifiers : ["", "3+Prof"], range : "Melee (5 ft)", description : "Medium or smaller target is grappled (escape DC = warlock's DC); while grappling, it can only attack that creature", abilitytodamage : false }],
	traits : [{ name : "Amorphous", description : "It can move through a space as narrow as 1 inch without extra movement or squeezing." }, LLFamBond, LLFamHD4, LLFamMR],
	calcChanges : { hp : LLWlkFamHP4, setAltHp : true }
});
LLWlkFamily("Protean", {
	size : 5, type : "Elemental", ac : "11+Prof", speed : "10 ft, fly 40 ft (hover)",
	scores : [3, 16, 12, 8, 10, 12], condition_immunities : "exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious",
	senses : "Darkvision 120 ft", passivePerception : 10, languages : "Primordial, understands its warlock",
	attacks : [{ name : "Elemental Spark", ability : 0, damage : [1, 6, "Essence"], modifiers : ["", "3+Prof"], range : "60/90 ft", description : "Ranged spell attack; target can't take reactions until the familiar's next turn", abilitytodamage : false }],
	traits : [LLFamBond, { name : "Elemental Chaos", description : "When conjured, roll a d4 for its Essence: Air (lightning), Earth (acid), Fire (fire), Water (cold); it's immune to that damage and its Elemental Spark deals it." }, LLFamHD4, LLFamMR]
});
LLWlkFamily("Risen", {
	size : 4, type : "Undead", ac : "11+Prof", speed : "25 ft, climb 25 ft",
	scores : [10, 13, 16, 3, 8, 8], damage_resistances : "cold, necrotic", damage_immunities : "poison", condition_immunities : "exhaustion, poisoned",
	senses : "Darkvision 60 ft", languages : "understands its warlock",
	attacks : [{ name : "Slam", ability : 0, damage : [1, 4, "bludgeoning"], modifiers : ["", "3+Prof"], range : "Melee (5 ft)", description : "A non-construct, non-undead target can't regain HP or gain temp HP until the familiar's next turn", abilitytodamage : false }],
	traits : [{ name : "Deathless Nature", description : "It doesn't need to breathe, eat, drink, or sleep; it rests with light activity. Small or Medium." }, LLFamBond, LLFamHD4, LLFamMR,
		{ name : "Undead Fortitude", description : "If reduced to 0 HP by damage other than radiant, it makes a Con save (DC 5 + damage taken); on a success it drops to 1 HP instead." }]
});
LLWlkFamily("Savage", {
	size : 4, type : "Monstrosity", ac : "12+Prof", speed : "30 ft, climb 30 ft",
	scores : [15, 10, 16, 6, 8, 2], damage_resistances : "acid, cold, poison", condition_immunities : "poisoned",
	senses : "Darkvision 120 ft", languages : "understands its warlock",
	attacks : [{ name : "Bite", ability : 0, damage : [1, 4, "slashing"], modifiers : ["", "3+Prof"], range : "Melee (5 ft)", description : "Con save (warlock's DC) or poisoned until the familiar's next turn", abilitytodamage : false },
		{ name : "Lash", ability : 0, damage : [1, 4, "slashing"], modifiers : ["", "3+Prof"], range : "Melee (10 ft)", description : "", abilitytodamage : false }],
	traits : [LLFamBond, LLFamHD4, { name : "Iron Claws", description : "It can climb sheer surfaces and upside down without an ability check." }, LLFamMR]
});
LLWlkFamily("Verdant", {
	size : 5, type : "Plant", ac : "10+Prof", speed : "25 ft, climb 40 ft",
	scores : [10, 13, 16, 3, 8, 8], damage_resistances : "acid, poison", condition_immunities : "blinded, deafened, exhaustion, poisoned",
	senses : "Blindsight 60 ft", languages : "Sylvan, understands its warlock",
	attacks : [],
	traits : [LLFamBond, { name : "Evergreen", description : "It gains temporary hit points equal to its warlock's Pact modifier at the start of each of its turns." }, LLFamHD4, LLFamMR,
		{ name : "Natural Camouflage", description : "While it remains still, it's indistinguishable from normal plants and foliage." }]
});

