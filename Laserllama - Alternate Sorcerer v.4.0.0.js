
var iFileName = "LaserLlama - Alternate Sorcerer v4.0.0.js";
RequiredSheetVersion("13.0.6");

[
    // Cantrips (0-Level)
    "acid splash",
    "beckon air",
    "blade ward",
    "booming blade",
    "chill touch",
    "control flames",
    "dancing lights",
    "fire bolt",
    "friends",
    "frostbite",
    "green-flame blade",
    "infestation",
    "light",
    "lightning lure",
    "mage hand",
    "mending",
    "message",
    "mind sliver",
    "minor illusion",
    "mold earth",
    "otherworldly grasp",
    "poison spray",
    "prestidigitation",
    "ray of frost",
    "shape water",
    "shocking grasp",
    "thunderclap",

    // 1st-Level
    "absorb elements",
    "burning hands",
    "catapult",
    "tasha's caustic brew",
    "chaos bolt",
    "charm person",
    "chromatic orb",
    "color spray",
    "command",
    "comprehend languages",
    "detect magic",
    "disguise self",
    "earth tremor",
    "expeditious retreat",
    "false life",
    "feather fall",
    "fog cloud",
    "grease",
    "ice knife",
    "jump",
    "mage armor",
    "magic missile",
    "ray of sickness",
    "shield",
    "silent image",
    "sleep",
    "thunderwave",
    "torrent",
    "witch bolt",

    // 2nd-Level
    "melf's acid arrow",
    "animate object",
    "arcane scorcher",
    "alter self",
    "aura of frost",
    "blindness/deafness",
    "blur",
    "cloud of daggers",
    "crown of madness",
    "darkness",
    "darkvision",
    "detect thoughts",
    "dragon's breath",
    "dust devil",
    "earthbind",
    "maximilian's earthen grasp",
    "elemental blade",
    "enhance ability",
    "enlarge/reduce",
    "flaming sphere",
    "gust of wind",
    "hold person",
    "invisibility",
    "levitate",
    "magic weapon",
    "mind spike",
    "tasha's mind whip",
    "mirror image",
    "misty step",
    "phantasmal force",
    "pyrotechnics",
    "scorching ray",
    "see invisibility",
    "shadow blade",
    "shatter",
    "snilloc's snowball swarm",
    "spider climb",
    "suggestion",
    "warding wind",
    "web",

    // 3rd-Level
    "blink",
    "call lightning",
    "clairvoyance",
    "counterspell",
    "daylight",
    "dispel magic",
    "elemental bane",
    "enemies abound",
    "erupting earth",
    "fear",
    "fireball",
    "fly",
    "gaseous form",
    "haste",
    "hypnotic pattern",
    "intellect fortress",
    "life transference",
    "lightning bolt",
    "major image",
    "meld into stone",
    "melf's minute meteors",
    "nondetection",
    "protection from energy",
    "sending",
    "sleet storm",
    "slow",
    "sonic wave",
    "spectral passage",
    "stinking cloud",
    "thunder step",
    "tidal wave",
    "tongues",
    "vampiric touch",
    "wall of sand",
    "wall of water",
    "water breathing",
    "water walk",
    "wind wall",

    // 4th-Level
    "accursed touch",
    "banishment",
    "blight",
    "charm monster",
    "confusion",
    "dimension door",
    "dominate beast",
    "fire shield",
    "greater invisibility",
    "ice storm",
    "polymorph",
    "otiluke's resilient sphere",
    "sickening radiance",
    "stoneskin",
    "storm sphere",
    "vitriolic sphere",
    "wall of fire",
    "wall of ice",
    "watery sphere",

    // 5th-Level
    "bigby's hand",
    "cloudkill",
    "cone of cold",
    "control winds",
    "creation",
    "enervation",
    "far step",
    "hold monster",
    "immolation",
    "seeming",
    "skill empowerment",
    "synaptic static",
    "telekinesis",
    "teleportation circle",
    "wall of force",
    "wall of light",
    "wall of stone",

    // 6th-Level
    "arcane gate",
    "astral blade",
    "chain lightning",
    "circle of death",
    "disintegrate",
    "elemental avatar",
    "eyebite",
    "otiluke's freezing sphere",
    "globe of invulnerability",
    "mass suggestion",
    "mental prison",
    "move earth",
    "tasha's otherworldly guise",
    "scatter",
    "sunbeam",
    "true seeing",

    // 7th-Level
    "crown of stars",
    "delayed blast fireball",
    "etherealness",
    "finger of death",
    "fire storm",
    "plane shift",
    "power word pain",
    "prismatic spray",
    "reverse gravity",
    "teleport",
    "time stop",
    "whirlwind",

    // 8th-Level
    "antimagic field",
    "earthquake",
    "abi-dalzim's horrid wilting",
    "incendiary cloud",
    "maddening darkness",
    "power word stun",
    "sunburst",

    // 9th-Level
    "gate",
    "meteor swarm",
    "power word kill",
    "psychic scream",
    "true polymorph",
    "wish"

].forEach(function (s) { if (SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("sorcerer(laserllama)") === -1) SpellsList[s].classes.push("sorcerer(laserllama)"); });

app.alert("Loaded: LaserLlama - Alternate Sorcerer v4.0.0");
if (ClassList["sorcerer"]) {
    ClassList["sorcerer"].regExpSearch = /^(?=.*sorcerer)(?!.*laserllama).*$/i;
}

ClassList["sorcerer(laserllama)"] = {
    regExpSearch: /^(?=.*sorcerer)(?=.*laserllama).*$/i,
    name: "Sorcerer (LaserLlama)",
    source: [["GMB:LL", 0]],
    primaryAbility: "Charisma",
    abilitySave: 6,
    prereqs: "Charisma 13",
    improvements: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
    die: 6,
    saves: ["Con", "Cha"],
    skillstxt: {
        primary: "Choose two from Arcana, Deception, Insight, Intimidation, Persuasion, and Religion"
    },
    weaponProfs: {
        primary: [false, false, ["dagger", "dart", "light crossbow", "quarterstaff", "sling"]]
    },
    equipment: "Sorcerer starting equipment:" +
        "\n \u2022 A light crossbow and 20 bolts -or- a sling;" +
        "\n \u2022 A quarterstaff -or- two daggers;" +
        "\n \u2022 A dungeoneer's pack -or- an explorer's pack;" +
        "\n \u2022 Your body is your focus.",
    subclasses: ["Sorcerous Origin", []],
    spellcastingFactor: "sorcerer(laserllama)", // Sistema a punti
    spellcastingKnown: {
        cantrips: [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        spells: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        prepared: false,
    },
    spellcastingList: {
        class: "sorcerer(laserllama)",
        level: [0, 9],
        spells: [],
    },
    features: {
        "sorcery": {
            name: "Sorcery",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I use Sorcery Points (SP) to cast spells I know of 1st level or higher.",
                "Cost: 1st: 2pts, 2nd: 3pts, 3rd: 5pts, 4th: 6pts, 5th: 7pts.",
                "I cannot cast spells while wearing armor or wielding a shield.",
                "My body acts as my spellcasting focus.",
                "I can cast spell or spend SP for features equal or lower my Spell Limit level."
            ]),
            usages: [4, 6, 9, 12, 17, 22, 28, 34, 41, 48, 48, 50, 50, 52, 52, 54, 54, 56, 58, 60],
            recovery: "long rest",
            limfeaname: "Sorcery Points",
            additional: levels.map(function (n, idx) {
                var limit = ["1st", "1st", "2nd", "2nd", "3rd", "3rd", "4th", "4th", "5th", "5th", "5th", "5th", "5th", "5th", "5th", "5th", "5th", "5th", "5th", "5th"][idx];
                return "Spell Limit: " + limit + " level";
            })
        },
        "metamagic": (function () {
            var MetamagicFeature = {
                name: "Metamagic",
                minlevel: 2,
                source: [["GMB:LL", 0]],
                description: desc([
                    "I gain the ability to shape my spells with Metamagic options",
                    'Use the "Choose Feature" button above to select Metamagic options',
                    "I can use only one Metamagic option on a spell when I cast it, unless otherwise noted",
                    "I can replace one known Metamagic option with another during a long rest"
                ]),
                extraname: "Metamagic Option",
                extraTimes: [0, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5],
                extrachoices: [],
            };
            var MetamagicKeys = Object.keys(MetamagicLL);
            for (var i = 0; i < MetamagicKeys.length; i++) {
                var mmKey = MetamagicKeys[i];
                var mmData = MetamagicLL[mmKey];

                MetamagicFeature.extrachoices.push(mmKey);

                MetamagicFeature[mmKey] = {
                    name: mmData.name,
                    source: mmData.source || [["GMB:LL", 0]],
                    description: mmData.description,
                    action: mmData.action,
                    prereqeval: mmData.prereqeval,
                    additional: mmData.additional,
                    eval: mmData.eval,
                    removeeval: mmData.removeeval,
                    calcChanges: mmData.calcChanges,
                    spellAdd: mmData.spellAdd
                };
            }

            return MetamagicFeature;
        })(),
        "sorcerous regeneration": {
            name: "Sorcerous Regeneration",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc(
                "Once per short rest, I can regain Sorcery Points equal to my Sorcerer level."
            ),
            usages: 1,
            recovery: "short rest",
            action: [["bonus action", ""]]
        },
        "magical flux": {
            name: "Magical Flux",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "Every time I finish a long rest, I can replace one spell known with another sorcerer spell.",
                "Must be of a level equal or lower to my Spell Limit"
            ]
            )
        },
        "font of magic": {
            name: "Font of Magic",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc(
                "Once per long rest, I can cast any one Sorcerer spell I don't know (up to my Spell Limit).",
                "I can expend Sorcery Points and apply Metamagic effects as normal."
            ),
            usages: 1,
            recovery: "long rest"
        },
        "innate arcanum": {
            name: "Innate Arcanum",
            source: [["GMB:LL", 0]],
            minlevel: 11,
            description: desc([
                "I gain special slots for high-level spells that don't cost Sorcery Points.",
                "As a bonus action, I can sacrifice an Arcanum slot to regain Sorcery Points equal to its level."
            ]),
            additional: levels.map(function (n) {
                if (n < 11) return "";
                if (n < 13) return "6th level slot";
                if (n < 15) return "6th, 7th level slots";
                if (n < 17) return "6th, 7th, 8th level slots";
                return "6th, 7th, 8th, 9th level slots";
            }),
            spellcastingBonus: {
                name: "Innate Arcanum",
                level: [6, 9],
                times: levels.map(function (n) {
                    if (n < 11) return 0;
                    if (n < 13) return 1;
                    if (n < 15) return 2;
                    if (n < 17) return 3;
                    return 4;
                }),
                selection: levels.map(function (n) {
                    var slots = [];
                    if (n >= 11) slots.push(6);
                    if (n >= 13) slots.push(7);
                    if (n >= 15) slots.push(8);
                    if (n >= 17) slots.push(9);
                    return slots;
                }),
                onTheFly: true
            },
            action: [["bonus action", "Regain Points (Arcanum)"]]
        },
    }
};


// ==============================
// Sorcerer Origins
// ==============================

// app.alert("Loaded: Draconic Sorcery");
AddSubClass("sorcerer(laserllama)", "draconic sorcery origin", {
    regExpSearch: /^(?=.*draconic)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Draconic Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1": {
            name: "Dragon Ancestor",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "Choose a Dragon Ancestor using the \"Choose Feature\" button above.",
                "This choice determines my damage type and grants me additional bonus spells.",
                "When interacting with dragons, I double my proficiency bonus for ability checks."
            ]),
            languageProfs: ["Draconic"],
            choiceDependencies: [{
                feature: "subclassfeature6",
                choiceAttribute: true
            }],
            choices: ["Black (Acid)", "Blue (Lightning)", "Brass (Fire)", "Bronze (Lightning)", "Copper (Acid)", "Gold (Fire)", "Green (Poison)", "Red (Fire)", "Silver (Cold)", "White (Cold)", "Amethyst (Force)", "Crystal (Radiant)", "Emerald (Psychic)", "Sapphire (Thunder)", "Steel (Acid)", "Topaz (Necrotic)"],

            "black (acid)": {
                name: "Black Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to Black dragons (Acid)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "tasha's caustic brew", "melf's acid arrow", "gaseous form", "vitriolic sphere", "contagion"],
                dependentChoices: "acid"
            },
            "blue (lightning)": {
                name: "Blue Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to Blue dragons (Lightning)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "witch bolt", "dust devil", "gaseous form", "storm sphere", "control winds"],
                dependentChoices: "lightning"
            },
            "brass (fire)": {
                name: "Brass Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to Brass dragons (Fire)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "burning hands", "scorching ray", "fireball", "wall of fire", "immolation"],
                dependentChoices: "fire"
            },
            "bronze (lightning)": {
                name: "Bronze Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to Bronze dragons (Lightning)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "witch bolt", "dust devil", "lightning bolt", "storm sphere", "control winds"],
                dependentChoices: "lightning"
            },
            "copper (acid)": {
                name: "Copper Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to Copper dragons (Acid)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "tasha's caustic brew", "melf's acid arrow", "gaseous form", "vitriolic sphere", "contagion"],
                dependentChoices: "acid"
            },
            "gold (fire)": {
                name: "Gold Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to Gold dragons (Fire)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "sleep", "warding wind", "slow", "otiluke's resilient sphere", "flame strike"],
                dependentChoices: "fire"
            },
            "green (poison)": {
                name: "Green Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to Green dragons (Poison)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "ray of sickness", "suggestion", "stinking cloud", "accursed touch", "cloudkill"],
                dependentChoices: "poison"
            },
            "red (fire)": {
                name: "Red Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to Red dragons (Fire)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "burning hands", "scorching ray", "fireball", "wall of fire", "immolation"],
                dependentChoices: "fire"
            },
            "silver (cold)": {
                name: "Silver Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to Silver dragons (Cold)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "ice knife", "snilloc's snowball swarm", "sleet storm", "ice storm", "cone of cold"],
                dependentChoices: "cold"
            },
            "white (cold)": {
                name: "White Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to White dragons (Cold)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "ice knife", "snilloc's snowball swarm", "sleet storm", "ice storm", "cone of cold"],
                dependentChoices: "cold"
            },
            // Gem Dragons (LaserLlama)
            "amethyst (force)": {
                name: "Amethyst Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to Amethyst dragons (Force)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "magic missile", "locate object", "dispel magic", "otiluke's resilient sphere", "legend lore"],
                dependentChoices: "force"
            },
            "crystal (radiant)": {
                name: "Crystal Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to Crystal dragons (Radiant)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "guiding bolt", "invisibility", "hypnotic pattern", "divination", "wall of light"],
                dependentChoices: "radiant"
            },
            "emerald (psychic)": {
                name: "Emerald Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to Emerald dragons (Psychic)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "silent image", "detect thoughts", "major image", "phantasmal killer", "mislead"],
                dependentChoices: "psychic"
            },
            "sapphire (thunder)": {
                name: "Sapphire Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to Sapphire dragons (Thunder)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "thunderwave", "shatter", "meld into stone", "stone shape", "hold monster"],
                dependentChoices: "thunder"
            },
            "steel (acid)": {
                name: "Steel Dragon Ancestor",
                spellcastingExtraApplyNonconform: true,
                description: desc(["My draconic ancestry is linked to Steel dragons (Acid)."]),
                spellcastingExtra: ["command", "disguise self", "melf's acid arrow", "nondetection", "polymorph", "far step"],
                dependentChoices: "acid"
            },
            "topaz (necrotic)": {
                name: "Topaz Dragon Ancestor",
                description: desc(["My draconic ancestry is linked to Topaz dragons (Necrotic)."]),
                spellcastingExtraApplyNonconform: true,
                spellcastingExtra: ["command", "inflict wounds", "blindness/deafness", "vampiric touch", "blight", "antilife shell"],
                dependentChoices: "necrotic"
            }
        },
        "subclassfeature1.2": {
            name: "Draconic Resilience",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "My HP maximum increases by 1 for every Sorcerer level I possess.",
                "While not wearing armor, my AC is 10 + Dexterity modifier + Charisma modifier."
            ]),
            armorOptions: [{
                regExpSearch: /^(?=.*draconic)(?=.*resilience).*$/i,
                name: "Draconic Resilience",
                ac: "10+Cha",
                affectsWildShape: true
            }],
            armorAdd: "Draconic Resilience",
            calcChanges: {
                hp: function (totalHD) {
                    if (classes.known["sorcerer(laserllama)"]) {
                        return [classes.known["sorcerer(laserllama)"].level, "Draconic Resilience (sorcerer level)"];
                    }
                }
            },
        },
        "subclassfeature6": {
            name: "Elemental Affinity",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I gain resistance to the damage type associated with my Draconic Ancestor.",
                "When I cast a spell that deals that damage type, I add my Charisma modifier (min +1) to one damage roll of that spell.",
                "I learn the Prismatic Spell Metamagic (or Esoteric for Gem dragons). I can use it for 0 SP to change a spell's damage type to my Ancestor's type."
            ]),
            choices: ["acid", "cold", "fire", "lightning", "poison", "force", "radiant", "psychic", "thunder", "necrotic"],
            choicesNotInMenu: true,
            "acid": {
                name: "Acid Elemental Affinity",
                description: desc(["I have resistance to acid damage.", "I add my Charisma modifier (min +1) to one damage roll of my spells that deal acid damage.", "I learn the Prismatic Spell Metamagic (0 SP for Acid)."]),
                dmgres: ["Acid"],
                calcChanges: {
                    atkCalc: [function (fields, v, output) { if (v.isSpell && (/acid/i).test(fields.Damage_Type)) { output.extraDmg += Math.max(1, What('Cha Mod')); } }, ""],
                    spellAdd: [function (spellKey, spellObj, spName) { return genericSpellDmgEdit(spellKey, spellObj, "acid", "Cha", true); }, ""]
                },
                bonusClassExtrachoices: [{ class: "sorcerer(laserllama)", feature: "metamagic", bonus: 1, addToExisting: true }],
            },
            "cold": {
                name: "Cold Elemental Affinity",
                description: desc(["I have resistance to cold damage.", "I add my Charisma modifier (min +1) to one damage roll of my spells that deal cold damage.", "I learn the Prismatic Spell Metamagic (0 SP for Cold)."]),
                dmgres: ["Cold"],
                calcChanges: {
                    atkCalc: [function (fields, v, output) { if (v.isSpell && (/cold/i).test(fields.Damage_Type)) { output.extraDmg += Math.max(1, What('Cha Mod')); } }, ""],
                    spellAdd: [function (spellKey, spellObj, spName) { return genericSpellDmgEdit(spellKey, spellObj, "cold", "Cha", true); }, ""]
                },
                bonusClassExtrachoices: [{ class: "sorcerer(laserllama)", feature: "metamagic", bonus: 1, addToExisting: true }],
            },
            "fire": {
                name: "Fire Elemental Affinity",
                description: desc(["I have resistance to fire damage.", "I add my Charisma modifier (min +1) to one damage roll of my spells that deal fire damage.", "I learn the Prismatic Spell Metamagic (0 SP for Fire)."]),
                dmgres: ["Fire"],
                calcChanges: {
                    atkCalc: [function (fields, v, output) { if (v.isSpell && (/fire/i).test(fields.Damage_Type)) { output.extraDmg += Math.max(1, What('Cha Mod')); } }, ""],
                    spellAdd: [function (spellKey, spellObj, spName) { return genericSpellDmgEdit(spellKey, spellObj, "fire", "Cha", true); }, ""]
                },
                bonusClassExtrachoices: [{ class: "sorcerer(laserllama)", feature: "metamagic", bonus: 1, addToExisting: true }],
            },
            "lightning": {
                name: "Lightning Elemental Affinity",
                description: desc(["I have resistance to lightning damage.", "I add my Charisma modifier (min +1) to one damage roll of my spells that deal lightning damage.", "I learn the Prismatic Spell Metamagic (0 SP for Lightning)."]),
                dmgres: ["Lightning"],
                calcChanges: {
                    atkCalc: [function (fields, v, output) { if (v.isSpell && (/lightning/i).test(fields.Damage_Type)) { output.extraDmg += Math.max(1, What('Cha Mod')); } }, ""],
                    spellAdd: [function (spellKey, spellObj, spName) { return genericSpellDmgEdit(spellKey, spellObj, "lightning", "Cha", true); }, ""]
                },
                bonusClassExtrachoices: [{ class: "sorcerer(laserllama)", feature: "metamagic", bonus: 1, addToExisting: true }],
            },
            "poison": {
                name: "Poison Elemental Affinity",
                description: desc(["I have resistance to poison damage.", "I add my Charisma modifier (min +1) to one damage roll of my spells that deal poison damage.", "I learn the Prismatic Spell Metamagic (0 SP for Poison)."]),
                dmgres: ["Poison"],
                calcChanges: {
                    atkCalc: [function (fields, v, output) { if (v.isSpell && (/poison/i).test(fields.Damage_Type)) { output.extraDmg += Math.max(1, What('Cha Mod')); } }, ""],
                    spellAdd: [function (spellKey, spellObj, spName) { return genericSpellDmgEdit(spellKey, spellObj, "poison", "Cha", true); }, ""]
                },
                bonusClassExtrachoices: [{ class: "sorcerer(laserllama)", feature: "metamagic", bonus: 1, addToExisting: true }],
            },
            "force": {
                name: "Force Elemental Affinity",
                description: desc(["I have resistance to force damage.", "I add my Charisma modifier (min +1) to one damage roll of my spells that deal force damage.", "I learn the Esoteric Spell Metamagic (0 SP for Force)."]),
                dmgres: ["Force"],
                calcChanges: {
                    atkCalc: [function (fields, v, output) { if (v.isSpell && (/force/i).test(fields.Damage_Type)) { output.extraDmg += Math.max(1, What('Cha Mod')); } }, ""],
                    spellAdd: [function (spellKey, spellObj, spName) { return genericSpellDmgEdit(spellKey, spellObj, "force", "Cha", true); }, ""]
                },
                bonusClassExtrachoices: [{ class: "sorcerer(laserllama)", feature: "metamagic", bonus: 1, addToExisting: true }],
            },
            "radiant": {
                name: "Radiant Elemental Affinity",
                description: desc(["I have resistance to radiant damage.", "I add my Charisma modifier (min +1) to one damage roll of my spells that deal radiant damage.", "I learn the Esoteric Spell Metamagic (0 SP for Radiant)."]),
                dmgres: ["Radiant"],
                calcChanges: {
                    atkCalc: [function (fields, v, output) { if (v.isSpell && (/radiant/i).test(fields.Damage_Type)) { output.extraDmg += Math.max(1, What('Cha Mod')); } }, ""],
                    spellAdd: [function (spellKey, spellObj, spName) { return genericSpellDmgEdit(spellKey, spellObj, "radiant", "Cha", true); }, ""]
                },
                bonusClassExtrachoices: [{ class: "sorcerer(laserllama)", feature: "metamagic", bonus: 1, addToExisting: true }],
            },
            "psychic": {
                name: "Psychic Elemental Affinity",
                description: desc(["I have resistance to psychic damage.", "I add my Charisma modifier (min +1) to one damage roll of my spells that deal psychic damage.", "I learn the Esoteric Spell Metamagic (0 SP for Psychic)."]),
                dmgres: ["Psychic"],
                calcChanges: {
                    atkCalc: [function (fields, v, output) { if (v.isSpell && (/psychic/i).test(fields.Damage_Type)) { output.extraDmg += Math.max(1, What('Cha Mod')); } }, ""],
                    spellAdd: [function (spellKey, spellObj, spName) { return genericSpellDmgEdit(spellKey, spellObj, "psychic", "Cha", true); }, ""]
                },
                bonusClassExtrachoices: [{ class: "sorcerer(laserllama)", feature: "metamagic", bonus: 1, addToExisting: true }],
            },
            "thunder": {
                name: "Thunder Elemental Affinity",
                description: desc(["I have resistance to thunder damage.", "I add my Charisma modifier (min +1) to one damage roll of my spells that deal thunder damage.", "I learn the Esoteric Spell Metamagic (0 SP for Thunder)."]),
                dmgres: ["Thunder"],
                calcChanges: {
                    atkCalc: [function (fields, v, output) { if (v.isSpell && (/thunder/i).test(fields.Damage_Type)) { output.extraDmg += Math.max(1, What('Cha Mod')); } }, ""],
                    spellAdd: [function (spellKey, spellObj, spName) { return genericSpellDmgEdit(spellKey, spellObj, "thunder", "Cha", true); }, ""]
                },
                bonusClassExtrachoices: [{ class: "sorcerer(laserllama)", feature: "metamagic", bonus: 1, addToExisting: true }],
            },
            "necrotic": {
                name: "Necrotic Elemental Affinity",
                description: desc(["I have resistance to necrotic damage.", "I add my Charisma modifier (min +1) to one damage roll of my spells that deal necrotic damage.", "I learn the Esoteric Spell Metamagic (0 SP for Necrotic)."]),
                dmgres: ["Necrotic"],
                calcChanges: {
                    atkCalc: [function (fields, v, output) { if (v.isSpell && (/necrotic/i).test(fields.Damage_Type)) { output.extraDmg += Math.max(1, What('Cha Mod')); } }, ""],
                    spellAdd: [function (spellKey, spellObj, spName) { return genericSpellDmgEdit(spellKey, spellObj, "necrotic", "Cha", true); }, ""]
                },
                bonusClassExtrachoices: [{ class: "sorcerer(laserllama)", feature: "metamagic", bonus: 1, addToExisting: true }],
            }
        },
        "subclassfeature14": {
            name: "Draconic Flight",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "As a bonus action, I can manifest or dismiss draconic wings.",
                "While manifested, I have a flying speed equal to my walking speed."
            ]),
            action: [["bonus action", "Manifest/Dismiss Wings"]],
            speed: { fly: { spd: "walk", enc: "walk" } }
        },
        "subclassfeature18": {
            name: "Draconic Apotheosis",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "As a bonus action, I transform into a dragon (CR <= half level) for 1 hour.",
                "I retain personality, HP, skill/save profs, and Int/Wis/Cha scores.",
                "I can use all Sorcerer features. Ancestry damage types in dragon form match mine.",
                "Costs 10 Sorcery Points to use again if I have no uses left."
            ]),
            action: [["bonus action", " (transform/revert)"]],
            usages: 1,
            recovery: "long rest"
        }
    }
});

// app.alert("Loaded: Flame Sorcery");
AddSubClass("sorcerer(laserllama)", "flame origin", {
    regExpSearch: /^(?=.*flame)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Flame Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1.1": {
            name: "Emberheart",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I gain resistance to fire damage and learn the Control Flames cantrip.",
                "I add my Charisma modifier (min +1) to its damage rolls.",
                "I can speak, read, and write Ignan."
            ]),
            spellcastingExtra: [
                "burning hands", "hellish rebuke",
                "flaming sphere", "scorching ray",
                "fireball", "conjure elemental",
                "fire shield", "wall of fire",
                "flame strike", "immolation"
            ],
            spellcastingExtraApplyNonconform: true,
            dmgres: ["Fire"],
            languageProfs: ["Ignan"],
            spellcastingBonus: {
                name: "Emberheart",
                spells: ["control flames"],
                selection: ["control flames"],
                firstCol: "atwill"
            },
            spellChanges: {
                "control flames": {
                    changes: "I add my Charisma modifier (min +1) to the damage.",
                },
                "conjure elemental": {
                    changes: "I can only conjure a fire elemental with this spell.",
                }
            },
            calcChanges: {
                atkCalc: [
                    function (fields, v, output) {
                        if (v.baseWeaponName === 'control flames') {
                            output.extraDmg += Math.max(1, What('Cha Mod'));
                        };
                    },
                    "I add my Charisma modifier (min +1) to the damage of my Control Flames cantrip."
                ]
            }
        },
        "subclassfeature6": {
            name: "Wild Fire",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: levels.map(function (n) {
                var range = n < 18 ? "10 ft" : "30 ft";
                if (n < 6) return "";

                return desc([
                    "Once per turn, when I deal fire damage, I can spend Sorcery Points (SP) to spread flames.",
                    "Targets within " + range + " must make a Dex save or take 1d6 fire damage per SP spent (half on save).",
                    "I learn Piercing Spell metamagic; it's free for my Flame Sorcery Spells."
                ])
            }),
            additional: "1d6 per SP spent",
            bonusClassExtrachoices: [{
                class: "sorcerer(laserllama)",
                feature: "metamagic",
                bonus: 1,
                addToExisting: true
            }],
            spellChanges: {
                "burning hands": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
                "hellish rebuke": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
                "flaming sphere": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
                "scorching ray": {
                    changes: "I can use Piercing Spell metamagic on this Ray spell without spending Sorcery Points.",
                },
                "fireball": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
                "conjure elemental": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
                "fire shield": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
                "wall of fire": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
                "flame strike": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
                "immolation": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                }
            },
            bonusClassExtrachoices: [{ class: "sorcerer(laserllama)", feature: "metamagic", bonus: 1, addToExisting: true }],
        },
        "subclassfeature14": {
            name: "Consumptive Flame",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "I can expend HP instead of Sorcery Points for my Flame Sorcery Spells.",
                "Reduce current and max HP by 2 for each SP replaced (including Metamagic).",
                "HP maximum reductions are restored after a long rest."
            ]),
            spellChanges: {
                "burning hands": {
                    changes: "I can expend HP instead of SP for this spell reducing current and max HP by 2 for each SP replaced (including Metamagics). Rediuctions to HP maximum are restored after a long rest.",
                },
                "hellish rebuke": {
                    changes: "I can expend HP instead of SP for this spell reducing current and max HP by 2 for each SP replaced (including Metamagics). Rediuctions to HP maximum are restored after a long rest.",
                },
                "flaming sphere": {
                    changes: "I can expend HP instead of SP for this spell reducing current and max HP by 2 for each SP replaced (including Metamagics). Rediuctions to HP maximum are restored after a long rest.",
                },
                "scorching ray": {
                    changes: "I can expend HP instead of SP for this spell reducing current and max HP by 2 for each SP replaced (including Metamagics). Rediuctions to HP maximum are restored after a long rest.",
                },
                "fireball": {
                    changes: "I can expend HP instead of SP for this spell reducing current and max HP by 2 for each SP replaced (including Metamagics). Rediuctions to HP maximum are restored after a long rest.",
                },
                "conjure elemental": {
                    changes: "I can expend HP instead of SP for this spell reducing current and max HP by 2 for each SP replaced (including Metamagics). Rediuctions to HP maximum are restored after a long rest.",
                },
                "fire shield": {
                    changes: "I can expend HP instead of SP for this spell reducing current and max HP by 2 for each SP replaced (including Metamagics). Rediuctions to HP maximum are restored after a long rest.",
                },
                "wall of fire": {
                    changes: "I can expend HP instead of SP for this spell reducing current and max HP by 2 for each SP replaced (including Metamagics). Rediuctions to HP maximum are restored after a long rest.",
                },
                "flame strike": {
                    changes: "I can expend HP instead of SP for this spell reducing current and max HP by 2 for each SP replaced (including Metamagics). Rediuctions to HP maximum are restored after a long rest.",
                },
                "immolation": {
                    changes: "I can expend HP instead of SP for this spell reducing current and max HP by 2 for each SP replaced (including Metamagics). Rediuctions to HP maximum are restored after a long rest.",
                }
            },
        },
        "subclassfeature18": {
            name: "Primordial Inferno",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "I gain immunity to fire damage and resistance to radiant damage.",
                "The radius of my Wild Fire feature increases to 30 feet.",
                "When damaged by a visible creature within 120 ft, I can cast Hellish Rebuke as a reaction.",
                "It is cast at 4th-level, costs 0 SP, and adds my Charisma modifier to its damage."
            ]),
            dmgres: ["Radiant"],
            savetxt: { immune: ["fire"] },
            action: [["reaction", "Hellish Rebuke (Inferno)"]],
            spellChanges: {
                "hellish rebuke": {
                    changes: "When damaged by a visible creature within 120 ft, I can cast Hellish Rebuke as a reaction. It is cast at 4th-level, costs 0 SP, and adds my Charisma modifier to its damage.",
                }
            },
        }
    }
});

// app.alert("Loaded: Oceanic Sorcery");
AddSubClass("sorcerer(laserllama)", "oceanic sorcery origin", {
    regExpSearch: /^(?=.*oceanic)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Oceanic Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1.1": {
            name: "Waveborn",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I gain a swimming speed equal to my walking speed and can breathe air and water.",
                "I have resistance to cold damage and advantage on saves vs. underwater conditions.",
                "I can see underwater as if in bright light and speak, read, and write Aquan."
            ]),
            dmgres: ["Cold"],
            languageProfs: ["Aquan"],
            speed: { swim: { spd: "walk", enc: "walk" } },
            vision: [["See underwater as in bright light", 0]],
            savetxt: { adv_vs: ["underwater conditions"] }
        },
        "subclassfeature1.2": {
            name: "Crashing Wave",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I learn the Shape Water cantrip (doesn't count against my cantrips known).",
                "When I deal damage with Shape Water or an Oceanic spell, I can knock targets back.",
                "Push is 5 ft per SP spent (min 5 ft). Distance halves for each size above Medium."
            ]),
            spellcastingBonus: {
                name: "Crashing Wave",
                spells: ["shape water"],
                selection: ["shape water"],
                firstCol: "atwill"
            },
            spellcastingExtraApplyNonconform: true,
            spellcastingExtra: [
                "create water", "torrent",
                "blur", "hold person",
                "tidal wave", "conjure elemental",
                "control water", "watery sphere",
                "hold monster", "maelstrom"
            ],
            spellChanges: {
                "shape water": {
                    changes: "When I deal damage with this cantrip, I can knock targets back. Push is 5 ft per SP spent (min 5 ft). Distance halves for each size above Medium.",
                },
                "conjure elemental": {
                    changes: "I can only conjure a water elemental with this spell.",
                },
                "torrent": {
                    changes: "When I deal damage with this spell, I can knock targets back. Push is 5 ft per SP spent (min 5 ft). Distance halves for each size above Medium.",
                },
                "tidal wave": {
                    changes: "When I deal damage with this spell, I can knock targets back. Push is 5 ft per SP spent (min 5 ft). Distance halves for each size above Medium.",
                },
                "control water": {
                    changes: "When I deal damage with this spell, I can knock targets back. Push is 5 ft per SP spent (min 5 ft). Distance halves for each size above Medium.",
                },
                "maelstrom": {
                    changes: "When I deal damage with this spell, I can knock targets back. Push is 5 ft per SP spent (min 5 ft). Distance halves for each size above Medium.",
                },
            },
        },
        "subclassfeature6": {
            name: "Oceanic Resilience",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: levels.map(function (n) {
                if (n < 6) return "";
                if (n < 18) return desc([
                    "As a reaction when hit, I can halve cold/bludgeoning/piercing/slashing damage.",
                    "I then move up to half my speed without provoking opportunity attacks.",
                    "If I have no uses of this feature left, I can spend 2 SP to use it instead."
                ]);
                return desc([
                    "As a reaction when hit, I can halve cold/bludgeoning/piercing/slashing damage.",
                    "I then move up to half my speed without provoking opportunity attacks.",
                    "I can expend SPs in the same reaction to trigger a shockwave: 30ft, Dex save with 1d10 cold damage per SP, or half on success.",
                    "If I have no uses of this feature left, I can spend 2 SP to use it instead."
                ]);
            }),
            action: [["reaction", ""]],
            usagescalc: "event.value = Math.max(1, What('Cha Mod'));",
            recovery: "long rest",
            additional: "Cha mod uses"
        },
        "subclassfeature6.1": {
            name: "Crushing Tide",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I can choose the direction of the knockback from Crashing Wave.",
                "I learn Piercing Spell metamagic; it's free for my Oceanic Sorcery Spells."
            ]),
            // Automazione Metamagia Piercing Spell
            bonusClassExtrachoices: [{
                class: "sorcerer(laserllama)",
                feature: "metamagic",
                bonus: 1,
                addToExisting: true
            }],
            spellChanges: {
                "torrent": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
                "tidal wave": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
                "control water": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
                "maelstrom": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
            },
        },
        "subclassfeature14": {
            name: "Watery Form",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "As a bonus action, I can transform into a watery form. While in this form: ",
                "- I can move through gaps of 1 inch and including space of enemies.",
                "- I have resistance to opportunity attack damage while in this form.",
                "In addition, I can Dash as a bonus action while swimming."
            ]),
            action: [
                ["bonus action", "Watery Form"],
                ["bonus action", "Dash (while swimming)"]
            ],
            additional: "1 SP, 1 min duration",
        },
        "subclassfeature18": {
            name: "Primordial Deluge",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "I gain immunity to cold damage and resistance to non-magical physical damage.",
                "I am always under the effects of Watery Form unless I choose otherwise.",
                "Oceanic Resilience can trigger a shockwave: 30ft, Dex save or 1d10 cold dmg per SP."
            ]),
            savetxt: {
                immune: ["cold"],
                dmgres: ["Bludgeoning", "Piercing", "Slashing"]
            }
        }
    }
});

// app.alert("Loaded: Stone Sorcery");
AddSubClass("sorcerer(laserllama)", "stone sorcery origin", {
    regExpSearch: /^(?=.*stone)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Stone Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1.1": {
            name: "Stoneblood",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "My HP maximum increases by 1, and by 1 again for every Sorcerer level I gain.",
                "I learn the Mold Earth cantrip (doesn't count against my cantrips known).",
                "I can speak, read, and write Terran (Primordial)."
            ]),
            calcChanges: {
                hp: function (totalHD) {
                    if (classes.known["sorcerer(laserllama)"]) {
                        return [classes.known["sorcerer(laserllama)"].level, "Stoneblood (sorcerer level)"];
                    }
                }
            },
            languageProfs: ["Terran"],
            spellcastingBonus: {
                name: "Stoneblood",
                spells: ["mold earth"],
                selection: ["mold earth"],
                firstCol: "atwill"
            },
            spellcastingExtra: [
                "earth tremor", "sanctuary",
                "earthen grasp", "spike growth",
                "conjure elemental", "erupting earth",
                "pillars of earth", "stone shape",
                "steel wind strike", "wall of stone"
            ],
            spellcastingExtraApplyNonconform: true,
        },
        "subclassfeature1.2": {
            name: "Earthen Form",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "As a bonus action, I can encase myself in elemental stone. While incased:",
                "- AC equal to 10 + Con mod + Cha mod (while not wearing armor or a shield).",
                "- Bonus Action: gain temp HP equal to my Cha modifier (min 1).",
                "- Unarmed: 1d6 bludgeoning (1d8 if two-handed), using Con for atk/dmg.",
                "This form ends early if I'm incapacitated or I end it as a bonus action."
            ]),
            usagescalc: "event.value = Math.max(1, What('Cha Mod'));",
            recovery: "long rest",
            additional: levels.map(function (n) {
                if (n < 14) return "Duration: 1m; 3 SP on no uses left;";
                return "Duration: Until ended; 0 SP on no uses left;";
            }),
            action: [["bonus action", " (Start/End)"], ["bonus action", " (Gain Temp HP)"]],
            weaponOptions: [{
                baseWeapon: "unarmed strike",
                regExpSearch: /^(?=.*earthen)(?=.*form)(?=.*unarmed).*$/i,
                name: "Earthen Form Unarmed Strike",
                source: [["GMB:LL", 0]],
                damage: [1, 6, "bludgeoning"],
                range: "Melee",
                description: "1d8 if using two free hands; uses Con for atk/dmg",
                ability: 3,
                isMagicWeapon: true,
                selectNow: true
            }],
            armorOptions: [{
                regExpSearch: /^(?=.*earthen)(?=.*form).*$/i,
                name: "Earthen Form (AC)",
                source: [["GMB:LL", 0]],
                ac: "10+Con+Cha",
                dex: 0,
                affectsWildShape: true
            }]
        },
        "subclassfeature6": {
            name: "Extra Attack",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I can attack twice instead of once whenever I take the Attack action.",
                "When I cast a 1-action spell, I can make a melee attack/shove/grapple as a bonus action.",
                "My unarmed strikes in Earthen Form count as magical."
            ]),
            action: [["bonus action", "Melee atk/shove/grapple (after spell)"]],
            attacks: 2
        },
        "subclassfeature6.1": {
            name: "Aegis of Stone",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "As a bonus action, I touch a creature and spend SP to grant 1d4 temp HP per SP.",
                "Reaction: If they are hit within 60 ft of me, I can teleport within 5 ft and attack the attacker.",
                "Requires both me and the attacker to be standing on the same surface."
            ]),
            action: [["bonus action", "Aegis (grant temp HP)"], ["reaction", "Aegis (teleport & attack)"]]
        },
        "subclassfeature14": {
            name: "Mountain's Heart",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "While having temp HP from Aegis or Earthen Form, I (and allies) have resistance to non-magical bludgeoning, piercing, and slashing damage.",
            ]),
            usages: "",
            recovery: ""
        },
        "subclassfeature18": {
            name: "Primordial Monolith",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "In Earthen Form, I am immune to non-magical physical damage and cannot be moved.",
                "Temp HP from Aegis of Stone now always use the maximum result (4 per SP)."
            ]),
            savetxt: { immune: ["non-magical physical damage (Earthen Form)"] }
        }
    }
});

// app.alert("Loaded: Storm Sorcery");
AddSubClass("sorcerer(laserllama)", "storm sorcery origin", {
    regExpSearch: /^(?=.*storm)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Storm Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1": {
            name: "Stormsoul",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "When I spend Sorcery Points, I can fly 5 ft per SP spent without opportunity attacks.",
                "I learn the Beckon Air cantrip (doesn't count against my cantrips known).",
                "I can speak, read, and write Auran (Primordial)."
            ]),
            languageProfs: ["Auran"],
            spellcastingExtra: [
                "feather fall", "thunderwave",
                "gust of wind", "shatter",
                "call lightning", "conjure elemental",
                "freedom of movement", "storm sphere",
                "arcane hand", "control winds"
            ],
            spellcastingExtraApplyNonconform: true,
            spellcastingBonus: {
                name: "Stormsoul",
                spells: ["beckon air"],
                selection: ["beckon air"],
                firstCol: "atwill"
            },
            spellChanges: {
                "conjure elemental": {
                    changes: "I can only conjure an air elemental with this spell.",
                }
            }
        },
        "subclassfeature6": {
            name: "Eye of the Storm",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: levels.map(function (n) {
                if (n < 6) return "";
                var rangeWeather = n < 18 ? "100 ft" : "300 ft";
                var rangeDamage = n < 18 ? "10 ft" : "30 ft";
                return desc([
                    "As an action, I can harmlessly alter weather within " + rangeWeather + ".",
                    "As a bonus action, I can spend SP to deal 1d6 lightning or thunder damage (my choice)",
                    "per SP to creatures within " + rangeDamage + ". Dex save for half."
                ])
            }),
            action: [["action", ""], ["bonus action", " (Damage)"]],
            additional: "1d6 damage per SP"
        },
        "subclassfeature6.1": {
            name: "Inner Tempest",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I gain resistance to lightning and thunder damage.",
                "I learn Piercing Spell metamagic; it's free for my Storm Sorcery Spells."
            ]),
            dmgres: ["Lightning", "Thunder"],
            bonusClassExtrachoices: [{
                class: "sorcerer(laserllama)",
                feature: "metamagic",
                bonus: 1,
                addToExisting: true
            }],
            autoSelectExtrachoices: [{
                feature: "metamagic",
                selection: ["piercing spell"]
            }],
            spellChanges: {
                "thunderwave": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
                "call lightning": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
                "storm sphere": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
                "arcane hand": {
                    changes: "I can use Piercing Spell metamagic on this spell without spending Sorcery Points.",
                },
            },
        },
        "subclassfeature14": {
            name: "Windcaller",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "I gain a flying speed equal to my walking speed.",
                "I learn the Wind Walk spell, which doesn't count against my spells known."
            ]),
            speed: { fly: { spd: "walk", enc: "walk" } },
            spellcastingExtraApplyNonconform: true,
            spellcastingExtra: ["wind walk"]
        },
        "subclassfeature18": {
            name: "Primordial Storm",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "I gain immunity to lightning and thunder damage.",
            ]),
            savetxt: { immune: ["lightning", "thunder"] }
        }
    }
});

// app.alert("Loaded: Wild Sorcery");
AddSubClass("sorcerer(laserllama)", "wild sorcery origin", {
    regExpSearch: /^(?=.*wild)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Wild Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1.1": {
            name: "Wild Magic Surge",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "When I spend Sorcery Points (SP), I roll a d8. If the result is equal to the SP spent, I trigger a Wild Magic Surge.",
                "I roll a d100 on the Wild Magic Surge table to determine the effect."
            ]),
            spellcastingExtra: [
                "chaos bolt", "color spray",
                "animate objects", "enlarge/reduce",
                "blink", "hypnotic pattern",
                "confusion", "polymorph",
                "reincarnate", "wall of force"
            ],
            spellcastingExtraApplyNonconform: true,
            toNotesPage: [
                {
                    name: "Wild Magic Surge Table",
                    source: [["GMB:LL", 0]],
                    popupName: "Sorcerer's Wild Magic Surge Table, part 1",
                    additional: "results 01-50",
                    note: [
                        "The chaotic nature of my magic can produce unpredictable effects. Any time I expend Sorcery Points, I roll a d8. If the result is equal to the number of SP spent, a Wild Magic Surge manifests.",
                        "If a surge effect is a spell, I am the target/center, it uses my Spell save DC, and it doesn't require concentration.",
                        "d100 | Effect",
                        "01-02 | Roll on this table at the start of each of your turns for 1 minute, ignoring this result on subsequent rolls.",
                        "03-04 | You cast magic missile firing a single dart at every creature within 30 feet.",
                        "05-06 | A mischievous pixie appears in an unoccupied space within 30 feet under the DM's control.",
                        "07-08 | You cast fireball as a 3rd-level spell, centered on yourself.",
                        "09-11 | You teleport to a random unoccupied space you can see within 60 feet.",
                        "12-14 | You can only communicate in song for the next 1d8 hours.",
                        "15-17 | You gain 1d20 temporary hit points.",
                        "18-20 | Roll a d10. Your height changes by a number of inches equal to the roll (Odd: shrink / Even: grow).",
                        "21-23 | You gain the benefits of the jump spell.",
                        "24-26 | You gain the benefits of disguise self, taking the appearance of the nearest humanoid for 3d10 hours.",
                        "27-29 | You cast polymorph on yourself. If you fail the save, you turn into a llama for the duration.",
                        "30-32 | For the next minute, you regain 5 hit points at the start of each of your turns.",
                        "33-35 | You cast grease centered on yourself.",
                        "36-38 | Creatures have disadvantage on saves against the first Sorcerer spell you cast within the next minute.",
                        "39-41 | Your skin turns the color of the closest flower. A remove curse spell can end this effect.",
                        "42-44 | You turn into a potted plant until the start of your next turn (Incapacitated, vulnerability to all dmg).",
                        "45-47 | You know every spell on the Sorcerer spell list for the next minute.",
                        "48-50 | For the next minute, all your spells with a casting time of 1 action have a casting time of 1 bonus action."
                    ]
                },
                {
                    name: "Wild Magic Surge Table",
                    source: [["GMB:LL", 0]],
                    popupName: "Sorcerer's Wild Magic Surge Table, part 2",
                    additional: "results 51-100",
                    note: [
                        "d100 | Effect",
                        "51-53 | Up to three creatures of your choice you can see within 30 feet take 4d10 force damage.",
                        "54-56 | You regain all expended Hit Dice.",
                        "57-58 | Roll a d10. Your age changes by a number of years equal to the roll (Odd: younger / Even: older).",
                        "59-60 | Maximize the damage of the first spell you cast within the next minute.",
                        "61-62 | For the next minute, you can teleport up to 20 feet as a bonus action on each of your turns.",
                        "63-65 | You briefly see a fond childhood memory of a random creature within 60 feet.",
                        "66-68 | You can't speak for 1d6 minutes. Whenever you try, pink bubbles float out of your mouth.",
                        "69-71 | Your hair falls out but grows back in 2d10 minutes.",
                        "72-74 | You cast fog cloud centered on yourself.",
                        "75-77 | You are frightened by the nearest creature until the end of your next turn.",
                        "78-80 | Each creature within 30 feet becomes invisible for 1 minute (ends if they attack or cast).",
                        "81-83 | You gain resistance to all damage for 1 minute.",
                        "84-86 | You cast confusion centered on yourself.",
                        "87-89 | Illusory butterflies and flower petals flutter in the air within 10 feet of you for 1d20 hours.",
                        "90-92 | Each creature within 30 feet takes 1d10 necrotic dmg. You gain temp HP equal to the total dealt.",
                        "93-95 | You cast color spray at 9th-level, centered on you.",
                        "96-98 | The next time you die, you instantly return to life as if by the reincarnate spell.",
                        "99-00 | You regain all expended Sorcery Points."
                    ]
                }
            ]
        },
        "subclassfeature1.2": {
            name: "Tides of Chaos",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I can give myself advantage on one attack roll, ability check, or saving throw.",
                "This feature is regained after a long rest or after I trigger a Wild Magic Surge.",
                "The first time I spend SP after using this, I automatically trigger a Wild Magic Surge."
            ]),
            usages: 1,
            recovery: "long rest",
            action: [["action", ""]]
        },
        "subclassfeature6": {
            name: "Twist Fate",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "As a reaction when a creature within 30 ft makes a roll, I can roll 1d4 as a bonus/penalty.",
                "I must expend my use of Tides of Chaos or spend 2 Sorcery Points to use this."
            ]),
            action: [["reaction", ""]]
        },
        "subclassfeature6.1": {
            name: "Unstable Sorcery",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I learn the Unstable Spell metamagic (doesn't count against my known metamagics).",
                "For me, it only costs 1 Sorcery Point to use."
            ]),
            bonusClassExtrachoices: [{
                class: "sorcerer(laserllama)",
                feature: "metamagic",
                bonus: 1,
                addToExisting: true
            }],
            autoSelectExtrachoices: [{
                feature: "metamagic",
                selection: ["unstable spell"]
            }],
        },
        "subclassfeature14": {
            name: "Focused Wild Magic",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "Whenever I roll on the Wild Magic Surge table, I can roll twice and choose either result."
            ])
        },
        "subclassfeature18": {
            name: "Sorcery Unleashed",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "When I roll the maximum result on a spell damage die, I roll it again and add it to the total.",
                "I can continue to 'explode' the dice as long as I keep rolling the maximum result."
            ]),
        }
    }
});

// app.alert("Loaded: Aberrant Sorcery");
AddSubClass("sorcerer(laserllama)", "aberrant sorcery origin", {
    regExpSearch: /^(?=.*aberrant)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Aberrant Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1.1": {
            name: "Psionic Awakening",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I learn one cantrip of my choice from the Psion class list.",
                "When I learn a sorcerer spell, I can choose it from the Psion or Sorcerer spell list."
            ]),
            spellcastingBonus: {
                name: "Psionic Awakening",
                class: "psion(laserllama)",
                level: [0, 0],
                firstCol: "atwill"
            },
            spellcastingExtra: [
                "arms of hadar", "dissonant whispers",
                "detect thoughts", "mystic spear",
                "cerebral blast", "hunger of hadar",
                "eldritch tentacles", "summon aberration",
                "psychic crush", "telekinesis"
            ],
            spellcastingExtraApplyNonconform: true,
        },
        "subclassfeature1.2": {
            name: "Telepathic Link",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "As a bonus action, I can form a telepathic link with a creature I can see.",
                "We can communicate telepathically as long as the target speaks at least one language.",
                "This link lasts until I use this feature again or I am more than 1 mile apart."
            ]),
            action: [["bonus action", ""]]
        },
        "subclassfeature6": {
            name: "Psionic Sorcery",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I learn the Subtle Spell metamagic (it doesn't count against my known metamagics).",
                "I can use Subtle Spell for 0 SP a number of times equal to my Charisma modifier."
            ]),
            usagescalc: "event.value = Math.max(1, What('Cha Mod'));",
            recovery: "long rest",
            bonusClassExtrachoices: [{
                class: "sorcerer(laserllama)",
                feature: "metamagic",
                bonus: 1,
                addToExisting: true
            }],
            autoSelectExtrachoices: [{
                feature: "metamagic",
                selection: ["subtle spell"]
            }]
        },
        "subclassfeature14": {
            name: "Alien Evolution",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "I gain one mutation. I can change it as a bonus action by spending 2 SP",
                "Use the 'Choose Feature' button to select the mutation you want to use.",
            ]),
            action: [["bonus action", "Change Mutation"]],
            choices: ["Glistening Flight", "Sensory Tendrils", "Thalassic Form", "Unnatural Flesh"],
            "glistening flight": {
                name: "Glistening Flight",
                speed: { fly: { spd: "walk", enc: "walk" } },
                description: desc(["I have a flying speed equal to my walking speed and can hover."])
            },
            "sensory tendrils": {
                name: "Sensory Tendrils",
                vision: [["Blindsight", 30]],
                description: desc(["I have blindsight out to a 30-foot radius."])
            },
            "thalassic form": {
                name: "Thalassic Form",
                speed: { swim: { spd: "walk*2", enc: "walk*2" } },
                description: desc(["I have a swimming speed equal to twice my walking speed and can breathe air/water."])
            },
            "unnatural flesh": {
                name: "Unnatural Flesh",
                description: desc(["Move through 1-inch gaps; spend 5 ft movement to escape nonmagical grapples/restraints."])
            }
        },
        "subclassfeature18": {
            name: "Aberrant Anomaly",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "As an action, I teleport up to 120 ft. Creatures within 30 ft of my previous space must make a Str save.",
                "On fail: 3d10 force damage and pulled toward that space until they hit another creature or object.",
                "On Success: half damage."
            ]),
            action: [["action", ""]],
            usages: 1,
            recovery: "long rest",
            additional: "7 SP to reuse if no uses left"
        }
    }
});

app.alert("Loaded: Divine Sorcery");
AddSubClass("sorcerer(laserllama)", "divine sorcery origin", {
    regExpSearch: /^(?=.*divine)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Divine Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1": {
            name: "Consecrated Soul",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I learn one Cleric cantrip (it counts as a Sorcerer cantrip for me).",
                "When I learn a sorcerer spell, I can choose it from the Cleric or Sorcerer spell list.",
            ]),
            spellcastingBonus: {
                name: "Consecrated Soul",
                "class": "cleric",
                level: [0, 0],
                firstCol: "atwill"
            }
        },
        "subclassfeature1.2": (function () {
            var PatronDeity = {
                name: "Patron Deity (Optional)",
                source: [["GMB:LL", 0]],
                minlevel: 1,
                description: desc([
                    "I can optionally choose with the 'Choose Feature' button a specific deity of my origin.",
                    "If I do so, I will use a specific Cleric Domain's spell list instead of Base Divine Sorcery Spells.",
                    "The Cleric Domain spell list is determined by the deity I choose."
                ]),
                extraname: "Patron Deity (Optional)",
                choices: ["Base Divine Sorcery"],
                defaultChoice: "base divine sorcery",
                "base divine sorcery": {
                    name: "Patron Deity (Base Divine Sorcery)",
                    description: desc([
                        "I can optionally choose with the 'Choose Feature' button a specific deity of my origin.",
                        "If I do so, I will use a specific Cleric Domain's spell list instead of Base Divine Sorcery Spells.",
                        "The Cleric Domain spell list is determined by the deity I choose."
                    ]),
                    spellcastingExtra: ["bless", "guiding bolt", "aid", "lesser restoration", "beacon of hope", "revivify", "divination", "guardian of faith", "conjure celestial", "dispel evil and good"],
                    spellcastingExtraApplyNonconform: true
                },
            };
            app.alert("Searching in Cleric ClassSubList");
            if (ClassList["cleric"] && ClassList["cleric"].subclasses) {
                var domainKeys = ClassList["cleric"].subclasses[1].filter(function (subKey) {
                    return !subKey.toLowerCase().endsWith("-ua");
                });
                app.alert("Found Cleric subclasses (ua excluded): " + domainKeys.length);
                for (var i = 0; i < domainKeys.length; i++) {
                    var subKey = domainKeys[i];
                    var domain = ClassSubList[subKey];
                    if (domain.spellcastingExtra && domain.subname) {
                        var choiceName = domain.subname + " Spells";
                        var key = choiceName.toLowerCase();
                        PatronDeity.choices.push(choiceName);
                        PatronDeity[key] = {
                            name: "Patron Deity (" + domain.subname + ")",
                            description: desc(["I chosen to use the " + domain.subname + " spell list as my Divine Sorcery spells."]),
                            spellcastingExtra: domain.spellcastingExtra,
                            spellcastingExtraApplyNonconform: true
                        };
                    }
                }

                PatronDeity.choices.sort(function (a, b) {
                    if (a === "Base Divine Sorcery") return -1;
                    if (b === "Base Divine Sorcery") return 1;
                    return a.localeCompare(b);
                });
            }

            return PatronDeity;
        })(),
        "subclassfeature1.1": {
            name: "Blessed by Fate",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "When I fail a check, save, or miss an attack, I can spend SP to add 1d4 to the roll.",
                "The cost starts at 1 SP and increases by 1 for each use until my next long rest."
            ]),
            additional: " 1SP; +1 per each previous use"
        },
        "subclassfeature6": {
            name: "Divine Empowerment",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I learn Empowered Spell metamagic (doesn't count against my known metamagics).",
                "I can also use Empowered Spell (1 SP) on spells that heal or grant temp HP."
            ]),
            bonusClassExtrachoices: [{
                class: "sorcerer(laserllama)",
                feature: "metamagic",
                bonus: 1,
                addToExisting: true
            }],
            autoSelectExtrachoices: [{
                feature: "metamagic",
                selection: ["empowered spell"]
            }]
        },
        "subclassfeature14": {
            name: "Celestial Flight",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "As a bonus action, I can manifest wings that grant 30 ft fly speed.",
                "They emit bright light in a 10-ft radius and dim light for another 10 ft."
            ]),
            action: [["bonus action", "Manifest/Dismiss Wings"]],
            speed: { fly: { spd: 30, enc: 20 } }
        },
        "subclassfeature18": {
            name: "Divine Regeneration",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "If I start my turn with < half HP (but > 0), I regain 5 + Cha mod hit points.",
                "If I die, I am permanently under the effect of Gentle Repose."
            ]),
            additional: "Regen: 5 + CHA mod",
        }
    }
});

app.alert("Loaded: Prime Sorcery");
AddSubClass("sorcerer(laserllama)", "prime sorcery origin", {
    regExpSearch: /^(?=.*prime)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Prime Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1.1": {
            name: "Impose Balance",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "As a reaction, I can remove all advantage or disadvantage from a roll within 30 feet."
            ]),
            spellcastingExtra: [
                "protection from evil and good", "sanctuary",
                "aid", "lesser restoration", "dispel magic",
                "counterspell", "banishment",
                "otiluke's resilient sphere",
                "dispel evil and good", "wall of force"
            ],
            spellcastingExtraApplyNonconform: true,
            action: [["reaction", ""]],
            usagescalc: "event.value = Math.max(1, What('Cha Mod'));",
            recovery: "long rest"
        },
        "subclassfeature6": {
            name: "Shield of Law",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "As an action, I can spend Sorcery Points (SP) to ward a creature within 30 ft.",
                "The shield has a pool of d6s equal to the SP spent. When taking damage, the",
                "creature can roll any number of these d6s to reduce the damage by the total."
            ]),
            action: [["action", " (SP spent)"]]
        },
        "subclassfeature6.1": {
            name: "Unbreakable Order",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I learn the Sturdy Spell metamagic (doesn't count against my known metamagics).",
                "I can use Sturdy Spell for 0 SP and regain all uses in this way when I finish a long rest."
            ]),
            usagescalc: "event.value = Math.max(1, What('Cha Mod'));",
            recovery: "long rest",
            bonusClassExtrachoices: [{
                class: "sorcerer(laserllama)",
                feature: "metamagic",
                bonus: 1,
                addToExisting: true
            }],
            autoSelectExtrachoices: [{
                feature: "metamagic",
                selection: ["sturdy spell"]
            }]
        },
        "subclassfeature14": {
            name: "Restore Balance",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "As an action, I affect a 20-ft cube adjacent to me with one of the following:",
                "\u2022 Regenerate: Restore 4x Sorcerer level HP, split among creatures in the area.",
                "\u2022 Repair: Damaged objects/structures are repaired; signs of aging are restored.",
                "\u2022 Restore: End one spell of 5th-level or lower on creatures/objects in the area.",
                "If I have no uses left, I can expend 5 SP to use this feature again."
            ]),
            usages: 1,
            recovery: "long rest",
            additional: "5 SP to reuse",
            action: [["action", ""]]
        },
        "subclassfeature18": {
            name: "Aura of Order",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "As a bonus action, I emit a 30-ft aura for 1 minute (requires concentration).",
                "Creatures of my choice in the aura gain these benefits:",
                "\u2022 Attack rolls against them cannot be made with advantage.",
                "\u2022 If they roll a 9 or lower on a d20 (attack, save, or check), they treat it as a 10.",
                "If I have no uses left, I can expend 7 SP to use this feature again."
            ]),
            usages: 1,
            recovery: "long rest",
            additional: "7 SP to reuse",
            action: [["bonus action", ""]]
        }
    }
});

app.alert("Loaded: Shadow Sorcery");
AddSubClass("sorcerer(laserllama)", "shadow sorcery origin", {
    regExpSearch: /^(?=.*shadow)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Shadow Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1.1": {
            name: "Dark Resilience",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "When I would make a death save, I can instead regain HP equal to Sorcerer level + Cha mod.",
                "I can use this once per long rest for free. Each subsequent use grants 1 level of exhaustion."
            ]),
            spellcastingExtra: [
                "false life", "ray of sickness",
                "darkness", "shadow blade",
                "enemies abound", "summon undead",
                "phantasmal killer", "shadow of moil",
                "enervation", "negative energy flood"
            ],
            spellcastingExtraApplyNonconform: true,
            usages: 1,
            recovery: "long rest",
            additional: "Subsequent uses: +1 exhaustion"
        },
        "subclassfeature1.2": {
            name: "Umbral Sight",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I have 120 ft of darkvision. I can see through magical darkness created by my spells."
            ]),
            vision: [["Darkvision", 120], ["See through my own magical darkness", 120]]
        },
        "subclassfeature6": {
            name: "Accursed Shadow",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I can cast Summon Undead using my shadow as the material component replacement.",
                "Casting the spell in this way changes the spell as follows:",
                "\u2022 The Duration of the spell becomes 10 min.",
                "\u2022 I must choose the Ghostly Form for the summoned undead.",
                "\u2022 While the spirit is within 5 ft of a chosen target within 120 ft, that target has disadvantage on saving throws against my spells.",
                "I can cast it once per long rest at my Spell Limit level for 0 SP."
            ]),
            usages: 1,
            recovery: "long rest",
            action: [["action", " (0 SP casting)"]],
            spellChanges: {
                "summon undead": {
                    changes: "I can cast this spell using my shadow as the material component replacement.\n" +
                        "Casting the spell in this way changes the spell as follows:\n" +
                        "\u2022 The Duration of the spell becomes 10 min.\n" +
                        "\u2022 I must choose the Ghostly Form for the summoned undead.\n" +
                        "\u2022 While the spirit is within 5 ft of a chosen target within 120 ft, that target has disadvantage on saving throws against my spells.\n" +
                        "I can cast it once per long rest at my Spell Limit level for 0 SP."
                }
            }
        },
        "subclassfeature14": {
            name: "Shadow Step",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "In dim light or darkness, as a bonus action, I can teleport up to 120 ft to another area of dim light/darkness."
            ]),
            action: [["bonus action", ""]]
        },
        "subclassfeature18": {
            name: "Dark Ascension",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "As a bonus action, I transform into pure shadow for 1 minute:",
                "\u2022 I have resistance to all damage except force and radiant.",
                "\u2022 I can move through creatures and objects as difficult terrain (1d10 force dmg if I end inside).",
                "If I have no uses left, I can expend 7 SP to use this feature again."
            ]),
            usages: 1,
            recovery: "long rest",
            action: [["bonus action", ""]]
        }
    }
});

app.alert("Loaded: Cosmic Sorcery");
AddSubClass("sorcerer(laserllama)", "cosmic sorcery origin", {
    regExpSearch: /^(?=.*cosmic)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Cosmic Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1.1": {
            name: "Radiant Soul",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I learn the Glitterbeam cantrip (it doesn't count against my cantrips known).",
                "I add my Charisma modifier to the damage rolls of my Glitterbeam cantrip.",
                "As a bonus action, I can emit (or extinguish) bright light to a 30-ft radius, and dim light another 30 ft beyond that.",
                "While emitting light this way, stars and constellations appear on me",
            ]),
            action: [["bonus action", " (Light On/Off)"]],
            spellcastingExtra: [
                "guiding bolt", "jump",
                "hold person", "moonbeam",
                "daylight", "melf's minute meteors",
                "fire shield", "sickening radiance",
                "dawn", "wall of light"
            ],
            spellcastingExtraApplyNonconform: true,
            spellcastingBonus: {
                name: "Radiant Soul",
                spells: ["glitterbeam"],
                selection: ["glitterbeam"],
                firstCol: "atwill"
            },
            calcChanges: {
                atkCalc: [
                    function (fields, v, output) {
                        if (v.baseWeaponName === 'glitterbeam') {
                            output.extraDmg += What('Cha Mod');
                        };
                    },
                    "I add my Charisma modifier to the damage of my Glitterbeam cantrip."
                ]
            },
            spellChanges: {
                "glitterbeam": {
                    changes: "I add my Charisma modifier to the damage of my Glitterbeam cantrip."
                }
            }
        },
        "subclassfeature6": {
            name: "Blinding Defense",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "As a reaction when hit by an attacker within 30 ft, I can spend 2 Sorcery Points (SP).",
                "The attacker must make a Con save or be blinded until the start of my next turn.",
                "On a failed save, the triggering attack also automatically misses me."
            ]),
            action: [["reaction", " (2 SP)"]]
        },
        "subclassfeature6.1": {
            name: "Searing Light",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I learn the Blinding Spell metamagic (doesn't count against my known metamagics).",
                "I can use Blinding Spell for 0 SP a number of times equal to my Cha mod (min 1)."
            ]),
            usagescalc: "event.value = Math.max(1, What('Cha Mod'));",
            recovery: "long rest",
            bonusClassExtrachoices: [{
                class: "sorcerer(laserllama)",
                feature: "metamagic",
                bonus: 1,
                addToExisting: true
            }],
            autoSelectExtrachoices: [{
                feature: "metamagic",
                selection: ["blinding spell"]
            }]
        },
        "subclassfeature14": {
            name: "Celestial Ascension",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "While emitting light from Radiant Soul, I gain a fly speed equal to my walking speed.",
                "While flying this way I can hover. Creatures in my bright light have disadvantage",
                "on saving throws made to resist the blinded condition."
            ]),
            speed: { fly: { spd: "walk", enc: "walk" } }
        },
        "subclassfeature18": {
            name: "Luminous Mastery",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "I gain resistance to radiant damage and learn the Crown of Stars spell.",
                "At the end of a long rest, I automatically gain the effects of Crown of Stars.",
                "This effect lasts until my next long rest or until I expend all motes."
            ]),
            dmgres: ["Radiant"],
            spellcastingExtra: ["crown of stars"],
            spellcastingExtraApplyNonconform: true,
        }
    }
});

app.alert("Loaded: Elder Sorcery");
AddSubClass("sorcerer(laserllama)", "elder sorcery origin", {
    regExpSearch: /^(?=.*elder)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Elder Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1": {
            name: "Ancient Mind",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I gain proficiency in History and learn two exotic languages of my choice.",
                "During a long rest, I can commune with ancient knowledge regarding a person, place,",
                "or object I saw in the last 24h. I make a Cha (History) check to learn a forgotten fact."
            ]),
            skills: ["History"],
            languageProfs: [["Exotic", 2]]
        },
        "subclassfeature1.1": {
            name: "Chained Power",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I learn a Warlock cantrip (it counts as a Sorcerer cantrip, but doesn't count against my known).",
                "When I learn a Sorcerer spell, I can choose it from the Sorcerer or Warlock spell list."
            ]),
            spellcastingBonus: {
                name: "Chained Power (Warlock Cantrip)",
                "class": "warlock",
                level: [0, 0],
                firstCol: "atwill"
            }
        },
        "subclassfeature1.2": {
            name: "Elder Sorcery Spells",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I learn additional spells, which do not count against my number of spells known."
            ]),
            spellcastingExtra: ["arms of hadar", "tasha's hideous laughter", "augury", "crown of madness", "clairvoyance", "hunger of hadar", "arcane eye", "black tentacles", "contact other plane", "dream"]
        },
        "subclassfeature6": {
            name: "Inscrutable Mind",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I have advantage on saving throws vs. being charmed, frightened, or having my mind read.",
                "Once per long rest, when forced to make an Int, Wis, or Cha save vs. a spell, I can use",
                "my reaction to force another creature within 30 ft (not the caster) to become the target."
            ]),
            action: [["reaction", ""]],
            savetxt: { adv_vs: ["charmed", "frightened", "mind reading"] },
            usages: 1,
            recovery: "long rest"
        },
        "subclassfeature14": {
            name: "Otherworldly Step",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "Whenever I spend Sorcery Points, I can teleport up to 5 feet per point spent."
            ]),
            additional: "5 ft / SP spent"
        },
        "subclassfeature18": {
            name: "Eldritch Revelation",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "As an action, creatures of my choice within 60 ft must make a Wisdom save.",
                "On failure: they take 4d8 psychic damage and the effects of Hideous Laughter.",
                "On success: half damage only. I don't need to concentrate on this effect.",
                "I can use this once for free per long rest, or spend 7 SP to reuse it."
            ]),
            usages: 1,
            recovery: "long rest",
            action: [["action", ""]]
        }
    }
});

app.alert("Loaded: Entropic Sorcery");
AddSubClass("sorcerer(laserllama)", "entropic sorcery origin", {
    regExpSearch: /^(?=.*entropic)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Entropic Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1.1": {
            name: "Entropic Touch",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: levels.map(function (n) {
                var size = n < 6 ? "Small" : n < 14 ? "Medium" : n < 17 ? "Large" : "Huge";
                return desc([
                    "As an action, I can spend 2 SP to touch a non-magical " + size + " or smaller object and reduce it to dust.",
                ])
            }),
            spellcastingExtra: [
                "inflict wounds", "ray of sickness",
                "darkness", "ray of enfeeblement",
                "counterspell", "dispel magic",
                "blight", "sickening radiance",
                "antilife shell", "maelstrom"
            ],
            spellcastingExtraApplyNonconform: true,
            action: [["action", " (2 SP)"]]
        },
        "subclassfeature1.2": {
            name: "Null Magic",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "Whenever I damage a creature with an Entropic Sorcery spell, it cannot regain HP",
                "or gain temporary hit points until the beginning of my next turn."
            ]),
            spellChanges: {
                "inflict wounds": {
                    changes: "Whenever I damage a creature with this spell, it cannot regain HP or gain temporary hit points until the beginning of my next turn."
                },
                "ray of sickness": {
                    changes: "Whenever I damage a creature with this spell, it cannot regain HP or gain temporary hit points until the beginning of my next turn."
                },
                "ray of enfeeblement": {
                    changes: "Whenever I damage a creature with this spell, it cannot regain HP or gain temporary hit points until the beginning of my next turn."
                },
                "blight": {
                    changes: "Whenever I damage a creature with this spell, it cannot regain HP or gain temporary hit points until the beginning of my next turn."
                },
                "sickening radiance": {
                    changes: "Whenever I damage a creature with this spell, it cannot regain HP or gain temporary hit points until the beginning of my next turn."
                },
                "maelstrom": {
                    changes: "Whenever I damage a creature with this spell, it cannot regain HP or gain temporary hit points until the beginning of my next turn."
                },
            }
        },
        "subclassfeature6": {
            name: "Negate Spell",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I can cast Counterspell or Dispel Magic at 3rd-level without spending SP.",
                "I can cast them this way a total number of times equal to my Cha mod (min 1)."
            ]),
            usagescalc: "event.value = Math.max(1, What('Cha Mod'));",
            recovery: "long rest",
        },
        "subclassfeature14": {
            name: "Ray of Annihilation",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "I learn the Disintegrate spell. It doesn't count against my number of spells known.",
                "I can cast it using Innate Arcanum or by spending 9 SP (6th level)."
            ]),
            spellcastingExtraApplyNonconform: true,
            spellcastingExtra: ["disintegrate"]
        },
        "subclassfeature18": {
            name: "Disciple of the Void",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "As a bonus action, I can spend 1 SP to discorporate until the end of my current turn:",
                "\u2022 My spells can deal force damage instead of their normal type.",
                "\u2022 I move through objects/creatures as diff. terrain (1d10 force dmg if ending inside).",
                "\u2022 If I pass through a creature, it must make a Con save or take 1d10 force damage."
            ]),
            action: [["bonus action", " (1 SP)"]]
        }
    }
});

app.alert("Loaded: Fey Sorcery");
AddSubClass("sorcerer(laserllama)", "fey sorcery origin", {
    regExpSearch: /^(?=.*fey)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Fey Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1.1": {
            name: "Faeblood",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I learn a Bard cantrip (it counts as a Sorcerer cantrip, but doesn't count against my known).",
                "When I learn a Sorcerer spell, I can choose it from the Sorcerer or Bard spell list (it counts as a Sorcerer spell)."
            ]),
            spellcastingBonus: {
                name: "Faeblood (Bard Cantrip)",
                "class": "bard",
                level: [0, 0],
                firstCol: "atwill"
            },
            spellcastingExtra: [
                "color spray", "faerie fire",
                "calm emotions", "misty step",
                "blink", "hypnotic pattern",
                "compulsion", "dominate beast",
                "modify memory", "seeming"
            ],
            spellcastingExtraApplyNonconform: true
        },
        "subclassfeature1.2": {
            name: "Heartsight",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I gain proficiency in Insight and add my Charisma mod (min +1) to my Insight checks.",
                "As an action, I can touch a creature to learn its alignment and surface emotion.",
                "I make a Wis (Insight) check vs. its CR; the target is unaware of the attempt."
            ]),
            skills: ["Insight"],
            addMod: { type: "skill", field: "Insight", mod: "max(1, Cha)", text: "I add my Charisma modifier (min +1) to my Wisdom (Insight) checks." },
            action: [["action", ""]]
        },
        "subclassfeature6": {
            name: "Emotional Focus",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "After a long rest, I choose an emotion to gain resistance and immunity until my next rest:",
                " \u2022 Anger: Fire resistance; immunity to Frightened.",
                " \u2022 Disgust: Acid resistance; immunity to Charmed.",
                " \u2022 Envy: Poison resistance; immunity to Poisoned.",
                " \u2022 Joy: Lightning resistance; immunity to Frightened.",
                " \u2022 Sorrow: Cold resistance; immunity to Charmed."
            ]),
            additional: "Choose after long rest",
            choices: ["Anger", "Disgust", "Envy", "Joy", "Sorrow"],
            "anger": {
                name: "Emotional Focus: Anger",
                dmgres: ["Fire"],
                savetxt: { immune: ["frightened"] }
            },
            "disgust": {
                name: "Emotional Focus: Disgust",
                dmgres: ["Acid"],
                savetxt: { immune: ["charmed"] }
            },
            "envy": {
                name: "Emotional Focus: Envy",
                dmgres: ["Poison"],
                savetxt: { immune: ["poisoned"] }
            },
            "joy": {
                name: "Emotional Focus: Joy",
                dmgres: ["Lightning"],
                savetxt: { immune: ["frightened"] }
            },
            "sorrow": {
                name: "Emotional Focus: Sorrow",
                dmgres: ["Cold"],
                savetxt: { immune: ["charmed"] }
            }
        },
        "subclassfeature14": {
            name: "Fleeting Step",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "As a reaction when forced to make a save, I can teleport up to 60 ft to an unoccupied space.",
                "I automatically succeed on the saving throw in the process.",
                "I can use this once for free per long rest, or spend 7 SP to reuse it."
            ]),
            action: [["reaction", ""]],
            usages: 1,
            recovery: "long rest",
            additional: "7 SP to reuse"
        },
        "subclassfeature18": {
            name: "Intoxicating Presence",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "When I cast an Enchantment spell on a creature within 30 ft that can see or hear me,",
                "the target has disadvantage on its initial saving throw."
            ])
        }
    }
});

app.alert("Loaded: Infernal Sorcery");
AddSubClass("sorcerer(laserllama)", "infernal sorcery origin", {
    regExpSearch: /^(?=.*infernal)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Infernal Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1": {
            name: "Fiendish Lineage",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I gain proficiency in Deception or Intimidation and learn Abyssal or Infernal."
            ]),
            spellcastingExtra: [
                "hellish rebuke", "wrathful smite",
                "flame whip", "scorching ray",
                "bestow curse", "blinding smite",
                "shadow of moil", "staggering smite",
                "insect plague", "spiritual sundering"
            ],
            spellcastingExtraApplyNonconform: true,
            skillstxt: "Deception or Intimidation",
            languageProfs: [["Abyssal or Infernal", 1]]
        },
        "subclassfeature1.1": {
            name: "Infernal Form",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: levels.map(function (n) {
                var duration = n < 18 ? "1 minute, or until I end it or be incapacitated" : " until I end it or be incapacitated";
                var clawDmg = n < 18 ? "1d8" : "2d8";
                var descFeature = desc[
                    "As a bonus action, I transform for " + duration + ".",
                    "While transformed, I gain several benefits:",
                    "\u2022 I have Wicked Claws: " + clawDmg + " slashing damage; I can use Cha for atk/dmg.",
                    "\u2022 While unarmored, my AC is 10 + Dex mod + Cha mod.",
                    "\u2022 As a bonus action, I gain Cha mod (min 1) temp HP.",
                    "\u2022 My walking speed increases by 10 feet."
                ];
                if (n > 17) {
                    descFeature.push("\u2022 I gain flying speed equal to my walking speed.");
                    descFeature.push("\u2022 Immunity to bludg/pierce/slashing damage from non-magical attacks.");
                }
                return desc(descFeature);
            }),
            usages: "Charisma modifier per ",
            usagescalc: "event.value = Math.max(1, What('Cha Mod'));",
            recovery: "long rest",
            additional: "3 SP to reuse",
            action: [["bonus action", " (start/end)"], ["bonus action", " (Temp HP)"]],
            weaponOptions: [{
                baseWeapon: "unarmed strike",
                regExpSearch: /wicked claws/i,
                name: "Wicked Claws",
                source: [["GMB:LL", 0]],
                damage: levels.map(function (n) {
                    return n < 18 ? [1, 8, "slashing"] : [2, 8, "slashing"];
                }),
                description: levels.map(function (n) {
                    return n < 6 ? "" : "counts as magical;";
                }),
                ability: 6,
                isNormalWeapon: false,
                isMagicWeapon: true,
                selectNow: true
            }],
            speed: { fly: { spd: "walk", enc: "walk" } },
            savetxt: levels.map(function (n) {
                return n < 18 ?
                    {} :
                    {
                        immune: [
                            "bludg. from non-magical atks (while in Infernal Form)",
                            "pierc. from non-magical atks (while in Infernal Form)",
                            "slash. from non-magical atks (while in Infernal Form)"
                        ]
                    };
            })

        },
        "subclassfeature6": {
            name: "Extra Attack",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I can attack twice whenever I take the Attack action on my turn.",
                "If I cast a 1-action spell or Dash, I can make one melee attack as a bonus action.",
                "My unarmed strikes in Infernal Form count as magical for overcoming resistance."
            ]),
            action: [["bonus action", " (Melee attack)"]]
        },
        "subclassfeature14": {
            name: "Fiendish Resistance",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "As a reaction when I take damage, I can spend SP to reduce it by 1d4 per SP.",
                "If I am in Infernal Form, I roll 1d6 per SP instead of 1d4."
            ]),
            action: [["reaction", ""]]
        },
    }
});

app.alert("Loaded: Iron Sorcery");
AddSubClass("sorcerer(laserllama)", "iron sorcery origin", {
    regExpSearch: /^(?=.*iron)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Iron Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1": {
            name: "Ironmonger",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I gain proficiency with light armor, medium armor, shields, and simple and martial",
                "weapons that aren't heavy or two-handed.",
                "I can cast my Sorcerer spells while wearing light or medium armor, or using shield."
            ]),
            spellcastingExtra: [
                "command", "compelled duel",
                "cloud of daggers", "magic weapon",
                "conjure volley", "elemental weapon",
                "fabricate", "pillars of earth",
                "banishing smite", "steel wind strike"
            ],
            spellcastingExtraApplyNonconform: true,
            armorProfs: [true, true, false, true],
            weaponProfs: [true, true, ["Simple and Martial weapons w/out heavy or two-handed props"]]
        },
        "subclassfeature1.1": {
            name: "Blade of Strife",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "As a bonus action, I conjure a blade within 60 ft for 1 min or until I conjure another one.",
                "I can make a melee spell attack against a target within 10 ft of it for 1d8 force damage.",
                "As a bonus action, on subsequent turns, I can move it 30 ft and repeat the attack.",
                "If I have no uses left, I can expend 3 SP to conjure the blade again and use this feature."
            ]),
            usagescalc: "event.value = Math.max(1, What('Cha Mod'));",
            recovery: "long rest",
            additional: "3 SP to reuse",
            action: [["bonus action", " (Conjure/Attack)"]],
            weaponOptions: [{
                baseWeapon: "unarmed strike",
                regExpSearch: /blade of strife/i,
                name: "Blade of Strife",
                source: [["GMB:LL", 0]],
                damage: [1, 8, "force"],
                ability: 6,
                range: "10 ft",
                description: "Melee spell attack; Move up to 30 ft as part of the bonus action attack",
                isNormalWeapon: false,
                selectNow: true
            }],
            calcChanges: {
                atkAdd: [
                    function (fields, v, output) {
                        if (v.baseWeaponName === 'blade of strife') {
                            // Iron Smite (lvl 6) adds Cha mod to damage
                            if (classes.known["sorcerer(laserllama)"].level >= 6) {
                                fields.Description += (fields.Description ? '; ' : '') + 'Cha mod to damage';
                                output.extraDmg += Math.max(1, What('Cha Mod'));
                            }
                            // Iron Aegis (lvl 14) adds 1d8 damage
                            if (classes.known["sorcerer(laserllama)"].level >= 14) {
                                fields.Damage_Die = (fields.Damage_Die === '1d8' ? '2d8' : fields.Damage_Die + '+1d8');
                            }
                        }
                    },
                    "My Blade of Strife gains bonuses at level 6 and 14."
                ]
            }
        },
        "subclassfeature6": {
            name: "Extra Attack",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I can attack twice whenever I take the Attack action. I can forgo one or both",
                "attacks to instead make spell attacks with my Blade of Strife."
            ])
        },
        "subclassfeature6.1": {
            name: "Iron Smite",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I add my Charisma modifier (min +1) to the damage of my Blade of Strife.",
                "Once per turn, when I hit a Large or smaller target with the Blade, it must",
                "succeed on a Strength save vs. my Spell DC or fall prone."
            ]),
        },
        "subclassfeature14": {
            name: "Iron Aegis",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "My Blade of Strife deals an extra 1d8 force damage (included in weapon).",
                "As a reaction, if a creature within 10 ft of my Blade is hit, I add my Cha mod",
                "(min +1) to its AC against that attack, potentially turning it into a miss."
            ]),
            action: [["reaction", ""]]
        },
        "subclassfeature18": {
            name: "Storm of Blades",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "I can cast Steel Wind Strike using a Blade of Strife as the component.",
                "The Blade makes the attacks using melee spell attacks.",
                "I can cast it this way without spending SP (1 + Cha mod per long rest)."
            ]),
            usagescalc: "event.value = 1 + Math.max(0, What('Cha Mod'));",
            recovery: "long rest",
            additional: "Free Steel Wind Strike"
        }
    }
});

app.alert("Loaded: Royal Sorcery");
AddSubClass("sorcerer(laserllama)", "royal sorcery origin", {
    regExpSearch: /^(?=.*royal)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Royal Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1": {
            name: "Royal Bearing",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I gain proficiency and expertise (double proficiency bonus) in one of the following:",
                "Deception, Intimidation, or Persuasion."
            ]),
            choices: ["Deception", "Intimidation", "Persuasion"],
            "deception": {
                name: "Royal Bearing: Deception",
                description: desc(["I gain proficiency and expertise in Deception."]),
                skills: [["Deception", "full"]]
            },
            "intimidation": {
                name: "Royal Bearing: Intimidation",
                description: desc(["I gain proficiency and expertise in Intimidation."]),
                skills: [["Intimidation", "full"]]
            },
            "persuasion": {
                name: "Royal Bearing: Persuasion",
                description: desc(["I gain proficiency and expertise in Persuasion."]),
                skills: [["Persuasion", "full"]]
            }
        },
        "subclassfeature1.1": {
            name: "Words of Authority",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: levels.map(function (n) {
                var range = n < 14 ? "10 ft" : "30 ft";
                return desc([
                    "I learn the Heightened Spell metamagic (doesn't count against my known).",
                    "When I cast an enchantment spell on a target within " + range + ", I can",
                    "apply Heightened Spell for 0 SP once per short or long rest."
                ]);
            }),
            usages: 1,
            recovery: "short rest",
            additional: "Free Heightened Spell",
            bonusClassExtrachoices: [{
                class: "sorcerer(laserllama)",
                feature: "metamagic",
                bonus: 1,
                addToExisting: true
            }],
            autoSelectExtrachoices: [{
                feature: "metamagic",
                selection: ["heightened spell"]
            }],
            spellcastingExtra: [
                "command", "heroism",
                "find steed", "zone of truth",
                "conjure volley", "tiny servant",
                "dominate beast", "guardian of faith",
                "geas", "skill empowerment"
            ],
            spellcastingExtraApplyNonconform: true
        },
        "subclassfeature6": {
            name: "Inspiring Sorcery",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "As a bonus action, I can spend SP to uplift a number of creatures within 30 ft",
                "equal to the SP spent. They gain 1d4 + Charisma modifier temporary hit points."
            ]),
            action: [["bonus action", ""]]
        },
        "subclassfeature14": {
            name: "Regal Presence",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "Creatures of my choice within 30 ft are proficient in all saving throws.",
            ])
        },
        "subclassfeature18": {
            name: "Divine Command",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "I learn the Divine Word spell (doesn't count against known).",
                "I can cast it once per long rest without spending SP or an Innate Arcanum slot."
            ]),
            spellcastingExtra: ["divine word"],
            spellcastingExtraApplyNonconform: true,
            usages: 1,
            recovery: "long rest",
            additional: "Free Divine Word",
            action: [["action", ""]]
        }
    }
});

app.alert("Loaded: Vampiric Sorcery");
AddSubClass("sorcerer(laserllama)", "vampiric sorcery origin", {
    regExpSearch: /^(?=.*vampiric)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Vampiric Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1": {
            name: "Blood Magic",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I can spend HP instead of SP. Each 1 SP costs 2 current and max HP.",
                "Max HP reductions are restored after a long rest.",
                "Slaying a creature with a 1st-level+ spell grants temp HP equal to the spell level.",
                "These temp HP can be spent as fuel for Blood Magic instead of current HP."
            ]),
            additional: "1 SP = 2 HP cost",
            spellcastingExtra: [
                "command", "inflict wounds",
                "suggestion", "spider climb",
                "gaseous form", "vampiric touch",
                "animate dead", "greater invisibility",
                "dominate person", "enervation"
            ],
            spellcastingExtraApplyNonconform: true
        },
        "subclassfeature1.1": {
            name: "",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: "",
            extraname: "True Vampirism (Optional)",
            choices: ["Enable"],
            "enable": {
                name: "True Vampirism (Optional)",
                description: desc([
                    "I am also Undead (healing spells still work on me). ",
                    "I don't need to breathe, eat, or drink.",
                    "I have 120 ft Darkvision and a climbing speed equal to my walking speed.",
                    "I am vulnerable to radiant damage. Disadv. on attacks/checks in direct sunlight."
                ]),
                vision: [["Darkvision", 120]],
                speed: { climb: { spd: "walk", enc: "walk" } },
                dmgres: [["Radiant", "vulnerable"]],
                savetxt: {
                    adv_vs: ["direct sunlight (disadv. on attacks/checks)"],
                    notes: ["No need to breathe, eat, or drink"]
                }
            }
        },
        "subclassfeature6": {
            name: "Undead Resilience",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "I am resistant to necrotic and poison damage, and immune to the poisoned condition.",
                "While I have temp HP from Blood Magic, I have resistance to non-magical, non-silvered",
                "bludgeoning, piercing, and slashing damage."
            ]),
            dmgres: ["Necrotic", "Poison"],
            savetxt: { immune: ["poisoned"] }
        },
        "subclassfeature14": {
            name: "Misty Escape",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "As a reaction when reduced to 0 HP (not killed outright), I can turn into a cloud of mist.",
                "I reappear with 1 HP within 30 ft. I can spend 5 SP to reuse this if I have no uses."
            ]),
            action: [["reaction", ""]],
            usages: 1,
            recovery: "short rest",
            additional: "5 SP to reuse"
        },
        "subclassfeature18": {
            name: "Vampiric Mastery",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "When I deal necrotic damage with a 1st-level+ spell, I gain temp HP equal to half",
                "the damage dealt. These temp HP can be used as fuel for Blood Magic."
            ])
        }
    }
});

app.alert("Loaded: Verdant Sorcery");
AddSubClass("sorcerer(laserllama)", "verdant sorcery origin", {
    regExpSearch: /^(?=.*verdant)(?=.*sorcery)(?=.*origin).*$/i,
    subname: "Verdant Sorcery Origin",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature1": {
            name: "Greensinger",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I learn the Thorn Whip cantrip (doesn't count against my known).",
                "When I learn a Sorcerer spell, I can choose it from the Sorcerer or Druid spell list."
            ]),
            spellcastingBonus: {
                name: "Greensinger (Thorn Whip)",
                spells: ["thorn whip"],
                selection: ["thorn whip"],
                firstCol: "atwill"
            },
            spellcastingExtra: [
                "ensnaring strike", "entangle",
                "earthbind", "spike growth",
                "plant growth", "grasping vine",
                "blight", "guardian of nature",
                "tree stride", "wrath of nature"
            ],
            spellcastingExtraApplyNonconform: true
        },
        "subclassfeature1.1": {
            name: "Overgrowth",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "When I hit with Thorn Whip, I can cast Ensnaring Strike instead of pulling the target,",
                "and cast this way, Ensnaring Strike doesn't require concentration.",
                "I can cast Ensnaring Strike with no SP cost a number of times equal to my Cha mod (min 1) per long rest.",
                "I can also create a 15-ft vine as an action for one simple task (no tools/weapons).",
                "The vine cannot perform tasks that require fine skills, like using tools, wielding weapons, or grappling."
            ]),
            usages: "Charisma modifier per ",
            usagescalc: "event.value = Math.max(1, What('Cha Mod'));",
            recovery: "long rest",
            action: [["action", " (Vine task)"]],
            spellChanges: {
                "thorn whip": {
                    changes: "When I hit with this cantrip, I can cast Ensnaring Strike instead of pulling the target. Cast this way, Ensnaring Strike doesn't require concentration."
                },
                "ensnaring strike": {
                    changes: "If I cast this spell when I hit a target with Thorn Whip cantrip, it doesn't require concentration."
                }
            },
        },
        "subclassfeature6": {
            name: "Grasping Growth",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "Thorn Whip range is 30 ft and deals d10s. Vine task/grapple range is 30 ft.",
                "As a bonus action, I can use an Overgrowth vine to grapple and root to the ground a",
                "creature (Str save vs my Spell DC).",
                "A crature can escape the grapple with a successful Str (Athletics) check vs my Spell DC."
            ]),
            action: [["bonus action", " (Vine Grapple)"]],
            calcChanges: {
                atkAdd: [
                    function (fields, v, output) {
                        if (v.baseWeaponName === 'thorn whip') {
                            fields.Damage_Die = 'd10';
                            fields.Range = '30 ft';
                        };
                    },
                    "My Thorn Whip cantrip deals 1d10 damage and has a range of 30 ft."
                ]
            },
            spellChanges: {
                "thorn whip": {
                    range: "30 ft",
                    changes: "My Thorn Whip cantrip deals 1d10 damage and has a range of 30 ft."
                },
            }
        },
        "subclassfeature14": {
            name: "Sapping Grip",
            source: [["GMB:LL", 0]],
            minlevel: 14,
            description: desc([
                "At the start of my turn, creatures grappled/restrained by my Verdant features/spells",
                "take 1d10 necrotic damage. I gain temp HP equal to the total damage dealt."
            ]),
            spellChanges: {
                "ensnaring strike": {
                    changes: "At the start of each of my turns, any creatures grappled or restrained by this spell takes 1d10 necrotic damage."
                },
                "entangle": {
                    changes: "At the start of each of my turns, any creatures grappled or restrained by this spell takes 1d10 necrotic damage."
                },
                "grasping vine": {
                    changes: "At the start of each of my turns, any creatures grappled or restrained by this spell takes 1d10 necrotic damage."
                },
                "wrath of nature": {
                    changes: "At the start of each of my turns, any creatures grappled or restrained by this spell takes 1d10 necrotic damage."
                }
            },
            additional: "1d10 necrotic + Temp HP"
        },
        "subclassfeature18": {
            name: "Greensong",
            source: [["GMB:LL", 0]],
            minlevel: 18,
            description: desc([
                "As a bonus action, I enter a state of harmony for 1 minute or until incapacitated:",
                "\u2022 I immediately cast Plant Growth centered on me (0 SP).",
                "\u2022 Thorn Whip and vine ranges are doubled (60 ft).",
                "\u2022 I can cast Entangle as a bonus action for 0 SP, requiring no concentration.",
                "When I have no uses left, I can spend 5 SP to enter Greensong again."
            ]),
            usages: 1,
            recovery: "short rest",
            additional: "5 SP to reuse",
            action: [["bonus action", " (Enter Greensong)"], ["bonus action", " (Greensong Entangle)"]]
        }
    }
});

FeatsList["alternate metamagic adept"] = {
    name: "Alternate Metamagic Adept",
    source: [["GMB:LL", 0]],
    prerequisite: "The ability to cast at least one spell",
    prereqeval: function (v) { return v.isSpellcaster; },
    descriptionFull: "You have practiced and learned to manipulate your magic in strange and unique ways. You gain the benefits listed below:\n \u2022 Increase one ability score that you use as a Spellcasting Ability by 1, up to a maximum of 20.\n \u2022 You learn a Metamagic of your choice from those available to the Alternate Sorcerer. You can use this Metamagic once (as if you had spent the minimum number of Sorcery Points) without spending Sorcery Points. You regain the ability to do so when you finish a short or long rest.",
    description: "I increase my Intelligence, Wisdom, or Charisma by 1. I learn one Metamagic of my choice from the Alternate Sorcerer. I can use this Metamagic once for free (min. SP cost) per short or long rest. [+1 Int, Wis, or Cha]",
    choices: ["Intelligence", "Wisdom", "Charisma"],
    "intelligence": {
        name: "Alternate Metamagic Adept (Int)",
        description: "I increase my Intelligence score by 1. I learn one Metamagic of my choice from the Alternate Sorcerer. I can use this Metamagic once for free (min. SP cost) per short or long rest. [+1 Intelligence]",
        scores: [0, 0, 0, 1, 0, 0]
    },
    "wisdom": {
        name: "Alternate Metamagic Adept (Wis)",
        description: "I increase my Wisdom score by 1. I learn one Metamagic of my choice from the Alternate Sorcerer. I can use this Metamagic once for free (min. SP cost) per short or long rest. [+1 Wisdom]",
        scores: [0, 0, 0, 0, 1, 0]
    },
    "charisma": {
        name: "Alternate Metamagic Adept (Cha)",
        description: "I increase my Charisma score by 1. I learn one Metamagic of my choice from the Alternate Sorcerer. I can use this Metamagic once for free (min. SP cost) per short or long rest. [+1 Charisma]",
        scores: [0, 0, 0, 0, 0, 1]
    },
    bonusClassExtrachoices: [{
        class: "sorcerer(laserllama)",
        feature: "metamagic",
        bonus: 1,
        addToExisting: true
    }],
    usages: 1,
    recovery: "short rest",
    limfeaname: "Free Metamagic Use"
};



FeatsList["sorcerous spark"] = {
    name: "Sorcerous Spark",
    source: [["GMB:LL", 0]],
    descriptionFull: "While you may not be a true Sorcerer, within you dwells a small spark of arcane power. You gain the benefits below:\n \u2022 You learn two Cantrips and a single 1st-level spell of your choice from the Alternate Sorcerer spell list. Charisma is your spellcasting modifier for all three spells, unless you already have a spellcasting modifier, then you use it.\n \u2022 You gain two Sorcery Points which you can expend to cast any spells that you know, as if you were a Sorcerer. If you already have Sorcery Points, these are added to your pool of Sorcery Points. You regain your Sorcery Points from this feature each time you finish a long rest.",
    description: "I learn two cantrips and one 1st-level spell from the Alternate Sorcerer list. I gain 2 Sorcery Points (regain on long rest) to cast my spells. Charisma is my spellcasting modifier for these spells (unless I already have one).",
    spellcastingBonus: [{
        name: "Sorcerous Spark (Cantrips)",
        "class": "sorcerer(laserllama)",
        level: [0, 0],
        times: 2
    }, {
        name: "Sorcerous Spark (1st-level)",
        "class": "sorcerer(laserllama)",
        level: [1, 1],
        times: 1
    }],
    extraLimitedFeatures: [{
        name: "Sorcery Points",
        usages: 2,
        recovery: "long rest",
        addToExisting: true
    }],
    calcChanges: {
        spellAdd: [
            function (spellKey, spellObj, spName) {
                if (!spellcaster.abb) {
                    spellObj.ability = 6;
                };
                return true;
            }
        ]
    }
};