var iFileName = "LaserLlama - Alternate Wizard v1.3.0.js";
RequiredSheetVersion("13.0.6");

// Check that exploits are properly imported
try {
    var test = SpellsList["parry"].isExploit;
} catch (error) {
    throw new Error(
        "Please import the 'Laserllama - Common attributes_20251110.js' file before importing this file as otherwise it cannot function properly. You can get it on the github repository."
    );
}
// Rinomina il mago standard per evitare conflitti
if (ClassList["wizard"]) {
    ClassList["wizard"].regExpSearch = /^(?=.*wizard)(?!.*laserllama).*$/i;
}

// app.alert("Loading: Alternate Wizard Spell List");
WizardLLSpells = [
    // Cantrips (0-Level)
    "blade ward",
    "resistance",
    "create bonfire",
    "frostbite",
    "infestation",
    "mage hand",
    "guidance",
    "message",
    "true strike",
    "friends",
    "mind sliver",
    "acid splash",
    "fire bolt",
    "lightning lure",
    "ray of frost",
    "shocking grasp",
    "thunderclap",
    "dancing lights",
    "light",
    "minor illusion",
    "chill touch",
    "poison spray",
    "beckon air",
    "control flames",
    "mending",
    "mold earth",
    "prestidigitation",
    "shape water",

    // 1st-Level
    "absorb elements",
    "alarm",
    "mage armor",
    "protection from evil and good",
    "shield",
    "snare",
    "find familiar",
    "tenser's floating disk",
    "fog cloud",
    "grease",
    "ice knife",
    "unseen servant",
    "comprehend languages",
    "detect magic",
    "identify",
    "magic missile",
    "catapult",
    "charm person",
    "tasha's hideous laughter",
    "sleep",
    "arcane lance",
    "burning hands",
    "tasha's caustic brew",
    "chromatic orb",
    "thunderwave",
    "torrent",
    "witch bolt",
    "color spray",
    "disguise self",
    "illusory script",
    "silent image",
    "cause fear",
    "false life",
    "inflict wounds",
    "ray of sickness",
    "earth tremor",
    "expeditious retreat",
    "feather fall",
    "jump",
    "longstrider",

    // 2nd-Level
    "earthbind",
    "lock/unlock",
    "rope trick",
    "cloud of daggers",
    "continual flame",
    "dust devil",
    "flaming sphere",
    "misty step",
    "web",
    "augury",
    "darkvision",
    "detect thoughts",
    "locate animals or plants",
    "locate object",
    "mind spike",
    "see invisibility",
    "crown of madness",
    "hold person",
    "levitate",
    "tasha's mind whip",
    "suggestion",
    "melf's acid arrow",
    "arcane scorcher",
    "gust of wind",
    "pyrotechnics",
    "scorching ray",
    "shatter",
    "snilloc's snowball swarm",
    "warding wind",
    "blur",
    "darkness",
    "invisibility",
    "nystul's magic aura",
    "magic mouth",
    "mirror image",
    "phantasmal force",
    "skywrite",
    "blindness/deafness",
    "gentle repose",
    "ray of enfeeblement",
    "shadow blade",
    "alter self",
    "dragon's breath",
    "maximilian's earthen grasp",
    "enhance ability",
    "enlarge/reduce",
    "magic weapon",
    "spider climb",

    // 3rd-Level
    "counterspell",
    "dispel magic",
    "protection from energy",
    "glyph of warding",
    "magic circle",
    "remove curse",
    "leomund's tiny hut",
    "conjure minor elementals",
    "conjure woodland beings",
    "summon fey",
    "sleet storm",
    "summon shadow",
    "thunder step",
    "wall of sand",
    "wall of water",
    "clairvoyance",
    "nondetection",
    "sending",
    "speak with dead",
    "enemies abound",
    "fear",
    "intellect fortress",
    "fireball",
    "lightning bolt",
    "melf's minute meteors",
    "stinking cloud",
    "tidal wave",
    "feign death",
    "hypnotic pattern",
    "major image",
    "phantom steed",
    "animate dead",
    "bestow curse",
    "life transference",
    "vampiric touch",
    "blink",
    "erupting earth",
    "fly",
    "gaseous form",
    "haste",
    "slow",
    "tiny servant",
    "water breathing",

    // 4th-Level
    "banishment",
    "mordenkainen's private sanctum",
    "otiluke's resilient sphere",
    "leomund's secret chest",
    "stoneskin",
    "dimension door",
    "summon aberration",
    "summon construct",
    "wall of fire",
    "arcane eye",
    "divination",
    "charm monster",
    "confusion",
    "fire shield",
    "ice storm",
    "sickening radiance",
    "storm sphere",
    "vitriolic sphere",
    "watery sphere",
    "mordenkainen's faithful hound",
    "greater invisibility",
    "hallucinatory terrain",
    "phantasmal killer",
    "create undead",
    "blight",
    "control water",
    "elemental bane",
    "fabricate",
    "polymorph",
    "stone shape",

    // 5th-Level
    "planar binding",
    "wall of force",
    "bigby's hand",
    "conjure dragon",
    "far step",
    "teleportation circle",
    "contact other plane",
    "legend lore",
    "scrying",
    "dominate person",
    "geas",
    "hold monster",
    "modify memory",
    "synaptic static",
    "telekinesis",
    "rary's telepathic bond",
    "cloudkill",
    "cone of cold",
    "dawn",
    "immolation",
    "creation",
    "dream",
    "mislead",
    "seeming",
    "enervation",
    "negative energy flood",
    "animate objects",
    "control winds",
    "passwall",
    "skill empowerment",
    "transmute rock",
    "wall of stone",

    // 6th-Level
    "contingency",
    "globe of invulnerability",
    "guards and wards",
    "arcane gate",
    "drawmij's instant summons",
    "scatter",
    "wall of ice",
    "true seeing",
    "mass suggestion",
    "chain lightning",
    "disintegrate",
    "otiluke's freezing sphere",
    "sunbeam",
    "eyebite",
    "mental prison",
    "programmed illusion",
    "circle of death",
    "magic jar",
    "soul cage",
    "create homunculus",
    "flesh to stone",
    "investiture of flame",
    "investiture of ice",
    "investiture of stone",
    "investiture of wind",
    "move earth",

    // 7th-Level
    "mordenkainen's magnificent mansion",
    "symbol",
    "forcecage",
    "plane shift",
    "teleport",
    "power word pain",
    "mordenkainen's sword",
    "crown of stars",
    "delayed blast fireball",
    "prismatic spray",
    "mirage arcane",
    "project image",
    "simulacrum",
    "finger of death",
    "etherealness",
    "reverse gravity",
    "sequester",
    "whirlwind",

    // 8th-Level
    "antimagic field",
    "mind blank",
    "demiplane",
    "maze",
    "mighty fortress",
    "telepathy",
    "antipathy/sympathy",
    "dominate monster",
    "feeblemind",
    "power word stun",
    "incendiary cloud",
    "sunburst",
    "illusory dragon",
    "maddening darkness",
    "clone",
    "abi-dalzim's horrid wilting",
    "control weather",

    // 9th-Level
    "imprisonment",
    "invulnerability",
    "blade of disaster",
    "gate",
    "foresight",
    "time stop",
    "psychic scream",
    "meteor swarm",
    "prismatic wall",
    "shapechange",
    "weird",
    "astral projection",
    "power word kill",
    "true polymorph",
    "wish",
];

WizardLLSpells.forEach(function (s) {
    var spellObj = SpellsList[s];
    if (spellObj) {
        if (!spellObj.classes) spellObj.classes = [];
        if (spellObj.classes.indexOf("wizard(laserllama)") === -1) {
            spellObj.classes.push("wizard(laserllama)");
        }
    }
});


LLWizardForgoFocusSchool = function (spList, spName, spType) {
    var focusSchools = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);

    if (spList.isLLWizardForgo) {
        if (focusSchools.indexOf("abjuration") !== -1) {
            spList.school.push("Abjur");
        }
        if (focusSchools.indexOf("conjuration") !== -1) {
            spList.school.push("Conj");
        }
        if (focusSchools.indexOf("divination") !== -1) {
            spList.school.push("Div");
        }
        if (focusSchools.indexOf("enchantment") !== -1) {
            spList.school.push("Ench");
        }
        if (focusSchools.indexOf("evocation") !== -1) {
            spList.school.push("Evoc");
        }
        if (focusSchools.indexOf("illusion") !== -1) {
            spList.school.push("Illus");
        }
        if (focusSchools.indexOf("necromancy") !== -1) {
            spList.school.push("Necro");
        }
        if (focusSchools.indexOf("transmutation") !== -1) {
            spList.school.push("Trans");
        }
    }
}

// app.alert("Loading: Alternate Wizard Class");
ClassList["wizard(laserllama)"] = {
    regExpSearch: /^(?=.*wizard)(?=.*laserllama).*$/i,
    name: "Wizard (LaserLlama)",
    source: [["GMB:LL", 0]],
    primaryAbility: "Intelligence",
    abilitySave: 4,
    prereqs: "Intelligence 13",
    improvements: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
    die: 6,
    saves: ["Int", "Wis"],
    skillstxt: {
        primary: "Choose two from Arcana, History, Insight, Investigation, Medicine, Nature, and Religion.",
    },
    weaponProfs: {
        primary: [false, false, ["dagger", "quarterstaff"]],
    },
    toolProfs: {
        primary: [["Calligrapher's supplies", "Int"]],
    },
    armorProfs: [false, false, false, false],
    equipment: "Wizard starting equipment:" +
        "\n \u2022 A quarterstaff -or- a dagger;" +
        "\n \u2022 A component pouch -or- an arcane focus;" +
        "\n \u2022 A scholar's pack -or- an explorer's pack;" +
        "\n \u2022 A spellbook (100 pages), a quill, and a robe." +
        "\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment.",
    subclasses: ["Arcane Tradition", []],
    spellcastingFactor: 1,
    spellcastingKnown: {
        cantrips: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        spells: "book",
        prepared: true,
    },
    spellcastingList: {
        class: "wizard(laserllama)",
        level: [0, 9],
    },
    features: {
        "arcanist": {
            name: "Arcanist",
            source: [["GMB:LL", 1]],
            minlevel: 1,
            description: desc([
                "I gain proficiency in Arcana. If already proficient, I gain expertise (double bonus).",
            ]),
            skills: [["Arcana", "increment"]]
        },
        "spellcasting": {
            name: "Spellcasting",
            source: [["GMB:LL", 1]],
            minlevel: 1,
            description: desc([
                "I can cast prepared wizard spells using Intelligence as my spellcasting ability.",
                "I use a Spellbook or an Arcane Focus as my focus. I cannot cast if wearing armor.",
                "I can cast any ritual spell from my spellbook even if it's not prepared.",
                "One starting cantrip must be from my Focus School(s).",
                "When I gain a Wizard level (lvl 1 included), one of the two spells I learn must be from my Focus School(s).",
            ]),
            additional: levels.map(function (n, idx) {
                return [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5][idx] + " cantrips known";
            }),
        },
        "focus schools": {
            name: "Focus Schools",
            source: [["GMB:LL", 1]],
            minlevel: 1,
            description: desc([
                "I gain unique insights into some Spell Schools. Copying spells of these schools is halved in time.",
                "One starting cantrip and one starting 1st-level spells must be from this school.",
                "When I gain a focus school after the first one, I can forgo it to learn three spells of my Focus Schools instead."
            ]),
            extraname: "Focus Schools",
            extrachoices: [
                "Abjuration", "Abjuration Forgo (+3 spells)",
                "Conjuration", "Conjuration Forgo (+3 spells)",
                "Divination", "Divination Forgo (+3 spells)",
                "Enchantment", "Enchantment Forgo (+3 spells)",
                "Evocation", "Evocation Forgo (+3 spells)",
                "Illusion", "Illusion Forgo (+3 spells)",
                "Necromancy", "Necromancy Forgo (+3 spells)",
                "Transmutation", "Transmutation Forgo (+3 spells)"
            ],
            extraTimes: levels.map(function (n) {
                return n < 10 ? 1 : n < 18 ? 2 : 3;
            }),
            // --- FOCUS SCHOOLs ---
            "abjuration": {
                name: "Abjuration Focus",
                description: "\n   Copying Abjuration spells into my spellbook takes half the time.",
                spellbookCopyConf: { school: "Abjur" },
                prereqeval: function () {
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return choices.indexOf("abjuration forgo (+3 spells)") === -1;
                },
            },
            "conjuration": {
                name: "Conjuration Focus",
                description: "\n   Copying Conjuration spells into my spellbook takes half the time.",
                spellbookCopyConf: { school: "Conj" },
                prereqeval: function () {
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return choices.indexOf("conjuration forgo (+3 spells)") === -1;
                },
            },
            "divination": {
                name: "Divination Focus",
                description: "\n   Copying Divination spells into my spellbook takes half the time.",
                spellbookCopyConf: { school: "Div" },
                prereqeval: function () {
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return choices.indexOf("divination forgo (+3 spells)") === -1;
                },
            },
            "enchantment": {
                name: "Enchantment Focus",
                description: "\n   Copying Enchantment spells into my spellbook takes half the time.",
                spellbookCopyConf: { school: "Ench" },
                prereqeval: function () {
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return choices.indexOf("enchantment forgo (+3 spells)") === -1;
                },
            },
            "evocation": {
                name: "Evocation Focus",
                description: "\n   Copying Evocation spells into my spellbook takes half the time.",
                spellbookCopyConf: { school: "Evoc" },
                prereqeval: function () {
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return choices.indexOf("evocation forgo (+3 spells)") === -1;
                },
            },
            "illusion": {
                name: "Illusion Focus",
                description: "\n   Copying Illusion spells into my spellbook takes half the time.",
                spellbookCopyConf: { school: "Illus" },
                prereqeval: function () {
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return choices.indexOf("illusion forgo (+3 spells)") === -1;
                },
            },
            "necromancy": {
                name: "Necromancy Focus",
                description: "\n   Copying Necromancy spells into my spellbook takes half the time.",
                spellbookCopyConf: { school: "Necro" },
                prereqeval: function () {
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return choices.indexOf("necromancy forgo (+3 spells)") === -1;
                },
            },
            "transmutation": {
                name: "Transmutation Focus",
                description: "\n   Copying Transmutation spells into my spellbook takes half the time.",
                spellbookCopyConf: { school: "Trans" },
                prereqeval: function () {
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return choices.indexOf("transmutation forgo (+3 spells)") === -1;
                },
            },
            // --- FORGOs ---
            "abjuration forgo (+3 spells)": {
                name: "Abjuration Forgo (3 Spells)",
                description: "\n   I forgo to gain Abjuration as Focus School and I learn three spells from my other Focus Schools invece.",
                source: [["GMB:LL", 1]],
                spellcastingExtraApplyNonconform: true,
                prereqeval: function () {
                    var lvl = classes.known["wizard(laserllama)"].level;
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return lvl >= 3 && choices.indexOf("abjuration") === -1;
                },
                spellcastingBonus: {
                    name: "Abjuration Forgo Bonus",
                    "class": ["wizard(laserllama)"],
                    levels: [1, 9],
                    times: 3,
                    onTheFly: true,
                    school: [],
                    isLLWizardForgo: "abjuration"
                },
                calcChanges: {
                    spellList: [LLWizardForgoFocusSchool, ""]
                }
            },
            "conjuration forgo (+3 spells)": {
                name: "Conjuration Forgo (3 Spells)",
                description: "\n   I forgo to gain Conjuration as Focus School and I learn three spells from my other Focus Schools invece.",
                source: [["GMB:LL", 1]],
                spellcastingExtraApplyNonconform: true,
                prereqeval: function () {
                    var lvl = classes.known["wizard(laserllama)"].level;
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return lvl >= 3 && choices.indexOf("conjuration") === -1;
                },
                eval: function () {
                    var schoollist = [LLWizardForgoFocusSchool, ""];
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                },
                spellcastingBonus: {
                    name: "Conjuration Forgo Bonus",
                    "class": ["wizard(laserllama)"],
                    levels: [1, 9],
                    times: 3,
                    onTheFly: true,
                    school: [], // Verrà riempito da calcChanges con le ALTRE scuole focus
                    isLLWizardForgo: "conjuration"
                },
                calcChanges: {
                    spellList: [LLWizardForgoFocusSchool, ""]
                }
            },
            "divination forgo (+3 spells)": {
                name: "Divination Forgo (3 Spells)",
                description: "\n   I forgo to gain Divination as Focus School and I learn three spells from my other Focus Schools invece.",
                source: [["GMB:LL", 1]],
                spellcastingExtraApplyNonconform: true,
                prereqeval: function () {
                    var lvl = classes.known["wizard(laserllama)"].level;
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return lvl >= 3 && choices.indexOf("divination") === -1;
                },
                spellcastingBonus: {
                    name: "Divination Forgo Bonus",
                    "class": ["wizard(laserllama)"],
                    levels: [1, 9],
                    times: 3,
                    onTheFly: true,
                    school: [],
                    isLLWizardForgo: "divination"
                },
                calcChanges: {
                    spellList: [LLWizardForgoFocusSchool, ""]
                }
            },
            "enchantment forgo (+3 spells)": {
                name: "Enchantment Forgo (3 Spells)",
                description: "\n   I forgo to gain Enchantment as Focus School and I learn three spells from my other Focus Schools invece.",
                source: [["GMB:LL", 1]],
                spellcastingExtraApplyNonconform: true,
                prereqeval: function () {
                    var lvl = classes.known["wizard(laserllama)"].level;
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return lvl >= 3 && choices.indexOf("enchantment") === -1;
                },
                spellcastingBonus: {
                    name: "Enchantment Forgo Bonus",
                    "class": ["wizard(laserllama)"],
                    levels: [1, 9],
                    times: 3,
                    onTheFly: true,
                    school: [],
                    isLLWizardForgo: "enchantment"
                },
                calcChanges: {
                    spellList: [LLWizardForgoFocusSchool, ""]
                }
            },
            "evocation forgo (+3 spells)": {
                name: "Evocation Forgo (3 Spells)",
                description: "\n   I forgo to gain Evocation as Focus School and I learn three spells from my other Focus Schools invece.",
                source: [["GMB:LL", 1]],
                spellcastingExtraApplyNonconform: true,
                prereqeval: function () {
                    var lvl = classes.known["wizard(laserllama)"].level;
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return lvl >= 3 && choices.indexOf("evocation") === -1;
                },
                spellcastingBonus: {
                    name: "Evocation Forgo Bonus",
                    "class": ["wizard(laserllama)"],
                    levels: [1, 9],
                    times: 3,
                    onTheFly: true,
                    school: [],
                    isLLWizardForgo: "evocation"
                },
                calcChanges: {
                    spellList: [LLWizardForgoFocusSchool, ""]
                }
            },
            "illusion forgo (+3 spells)": {
                name: "Illusion Forgo (3 Spells)",
                description: "\n   I forgo to gain Illusion as Focus School and I learn three spells from my other Focus Schools invece.",
                source: [["GMB:LL", 1]],
                spellcastingExtraApplyNonconform: true,
                prereqeval: function () {
                    var lvl = classes.known["wizard(laserllama)"].level;
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return lvl >= 3 && choices.indexOf("illusion") === -1;
                },
                spellcastingBonus: {
                    name: "Illusion Forgo Bonus",
                    "class": ["wizard(laserllama)"],
                    levels: [1, 9],
                    times: 3,
                    onTheFly: true,
                    school: [],
                    isLLWizardForgo: "illusion"
                },
                calcChanges: {
                    spellList: [LLWizardForgoFocusSchool, ""]
                }
            },
            "necromancy forgo (+3 spells)": {
                name: "Necromancy Forgo (3 Spells)",
                description: "\n   I forgo to gain Necromancy as Focus School and I learn three spells from my other Focus Schools invece.",
                source: [["GMB:LL", 1]],
                spellcastingExtraApplyNonconform: true,
                prereqeval: function () {
                    var lvl = classes.known["wizard(laserllama)"].level;
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return lvl >= 3 && choices.indexOf("necromancy") === -1;
                },
                spellcastingBonus: {
                    name: "Necromancy Forgo Bonus",
                    "class": ["wizard(laserllama)"],
                    levels: [1, 9],
                    times: 3,
                    onTheFly: true,
                    school: [],
                    isLLWizardForgo: "necromancy"
                },
                calcChanges: {
                    spellList: [LLWizardForgoFocusSchool, ""]
                }
            },
            "transmutation forgo (+3 spells)": {
                name: "Transmutation Forgo (3 Spells)",
                description: "\n   I forgo to gain Transmutation as Focus School and I learn three spells from my other Focus Schools invece.",
                source: [["GMB:LL", 1]],
                spellcastingExtraApplyNonconform: true,
                prereqeval: function () {
                    var lvl = classes.known["wizard(laserllama)"].level;
                    var choices = GetFeatureChoice("class", "wizard(laserllama)", "focus schools", true);
                    return lvl >= 3 && choices.indexOf("transmutation") === -1;
                },
                spellcastingBonus: {
                    name: "Transmutation Forgo Bonus",
                    "class": ["wizard(laserllama)"],
                    levels: [1, 9],
                    times: 3,
                    onTheFly: true,
                    school: [],
                    isLLWizardForgo: "transmutation"
                },
                calcChanges: {
                    spellList: [LLWizardForgoFocusSchool, ""]
                }
            },
        },
        "studious recovery": {
            name: "Studious Recovery",
            source: [["GMB:LL", 2]],
            minlevel: 2,
            description: desc([
                "In a SR, I can regain a slot of level \u2264 half my Wizard level (rounded down).",
                "Max slot level recovered = my Int modifier (min 1).",
            ]),
            usages: 1,
            recovery: "long rest",
        },
        "signature spell": {
            name: "Signature Spell",
            source: [["GMB:LL", 3]],
            minlevel: 7,
            description: desc([
                "I can create modified versions of spells from my Focus Schools (see notes).",
            ]),
            additional: levels.map(function (n) {
                if (n < 7) return "";
                if (n < 11) return "1 Signature Spell";
                if (n < 15) return "2 Signature Spells";
                return "3 Signature Spells";
            }),
            toNotes: [{
                title: "Signature Spell Rules",
                note: "Rules for modifying spells as per LaserLlama's Alternate Wizard (GMB:LL 3)."
            }]
        },
        "archmage": {
            name: "Archmage",
            source: [["GMB:LL", 3]],
            minlevel: 18,
            description: desc([
                "Choose two 1st/2nd-level spells from Focus Schools. They are always prepared.",
                "I can cast them at their lowest level without a spell slot."
            ]),
        },
        "arcane mastery": {
            name: "Arcane Mastery",
            source: [["GMB:LL", 3]],
            minlevel: 20,
            description: desc([
                "I am considered to have every spell in my spellbook prepared at all times.",
            ]),
        }
    }
};

// app.alert("Loading: Abjurer Tradition");
AddSubClass("wizard(laserllama)", "abjurer tradition", {
    regExpSearch: /^(?=.*abjurer)(?=.*tradition).*$/i,
    subname: "Abjurer Tradition",
    source: [["GMB:LL", 4]],
    features: {
        subclassfeature3: {
            name: "Scholar of Abjuration",
            source: [["GMB:LL", 4]],
            minlevel: 3,
            description: desc([
                "Abjuration becomes one of my Focus Schools (if not already).",
                "I add two 1st or 2nd-level Abjuration spells to my spellbook for free.",
            ]),
            bonusClassExtrachoices: [
                {
                    class: "wizard(laserllama)",
                    feature: "focus schools",
                    bonus: 1,
                    addToExisting: true,
                },
            ],
            autoSelectExtrachoices: [
                {
                    feature: "focus schools",
                    selection: ["abjuration"],
                },
            ],
            spellcastingBonus: {
                name: "Scholar of Abjuration",
                class: "wizard(laserllama)",
                school: ["Abjur"],
                level: [1, 2],
                times: 2,
                prepared: false,
            },
        },
        "subclassfeature3.1": {
            name: "Arcane Ward",
            source: [["GMB:LL", 4]],
            minlevel: 3,
            description: desc([
                "Casting an Abjuration spell with a slot creates a ward (lasts until long rest).",
                "The Ward has HP equal to (2 \xD7 Wizard level) + Int modifier.",
                "It takes damage in my place. At 0 HP, I take the rest, but the ward remains.",
                "Casting Abjuration spells (or a BA + spell slot) heals the ward: 2 \xD7 slot level.",
            ]),
            usages: 1,
            recovery: "long rest",
            additional: levels.map(function (n) {
                return n * 2 + " + Int mod HP";
            }),
            action: [["bonus action", " (Heal Ward)"]],
        },
        subclassfeature6: {
            name: "Projected Ward",
            source: [["GMB:LL", 4]],
            minlevel: 6,
            description: desc([
                "When a creature within 30 ft takes damage, I can use my reaction to have my",
                "Arcane Ward take that damage instead.",
            ]),
            action: [["reaction", ""]],
        },
        subclassfeature10: {
            name: "Empowered Abjuration",
            source: [["GMB:LL", 4]],
            minlevel: 10,
            description: desc([
                "I add Counterspell and Dispel Magic to my book. I add my Proficiency Bonus",
                "to ability checks made as part of casting those two spells.",
                "My Arcane Ward has resistance to non-magical bludgeoning, piercing, and slashing.",
            ]),
            spellcastingExtra: ["counterspell", "dispel magic"],
            spellChanges: {
                "counterspell": {
                    changes: "I add my Proficiency Bonus to the spell check against the spell level."
                },
                "dispel magic": {
                    changes: "I add my Proficiency Bonus to the spell check against the spell level."
                }
            },
        },
        subclassfeature14: {
            name: "Master of Abjuration",
            source: [["GMB:LL", 4]],
            minlevel: 14,
            description: desc([
                "I have advantage on saving throws against spells.",
                "I have resistance against the damage of spells.",
            ]),
            savetxt: { adv_vs: ["spells"] },
            dmgres: ["From spells"],
        },
    },
});

// app.alert("Loading: Conjurer Tradition");
AddSubClass("wizard(laserllama)", "conjurer tradition", {
    regExpSearch: /^(?=.*conjurer)(?=.*tradition).*$/i,
    subname: "Conjurer Tradition",
    source: [["GMB:LL", 5]],
    features: {
        "subclassfeature3": {
            name: "Scholar of Conjuration",
            source: [["GMB:LL", 5]],
            minlevel: 3,
            description: desc([
                "Conjuration becomes one of my Focus Schools (if not already).",
                "I add two 1st or 2nd-level Conjuration spells to my spellbook for free."
            ]),
            bonusClassExtrachoices: [{
                class: "wizard(laserllama)",
                feature: "focus schools",
                bonus: 1,
                addToExisting: true
            }],
            autoSelectExtrachoices: [{
                feature: "focus schools",
                selection: ["conjuration"]
            }],
            spellcastingBonus: {
                name: "Scholar of Conjuration",
                class: "wizard(laserllama)",
                school: ["Conj"],
                level: [1, 2],
                times: 2,
                prepared: false
            }
        },
        "subclassfeature3.1": {
            name: "Minor Conjuration",
            source: [["GMB:LL", 5]],
            minlevel: 3,
            description: desc([
                "As an action, I conjure a Tiny inanimate object I've seen before (max 10 ft away).",
                "It lasts 1 hour, until destroyed, or until I conjure another. It emits 5-ft dim light.",
                "The conjured object it's clearly magical.",
                "By spending a spell slot, I can conjure larger objects (1st:S, 3rd:M, 5th:L, 7th:H, 9th:G).",
                "I must be proficient in the corresponding artisan's tools for complex objects."
            ]),
            action: [["action", ""]]
        },
        "subclassfeature6": {
            name: "Self Transposition",
            source: [["GMB:LL", 5]],
            minlevel: 6,
            description: desc([
                "I add Misty Step to my book (always prepared). I can cast it once per long rest for free.",
                "Instead of teleporting, I can swap places with a creature/object (Size equal mine or smaller)",
                "within 30 ft. Target must fail a Charisma save (can choose to fail)."
            ]),
            spellcastingExtra: ["misty step"],
            spellcastingBonus: {
                name: "Self Transposition",
                spells: ["misty step"],
                selection: ["misty step"],
            },
            spellChanges: {
                "misty step": {
                    changes: "I can swap places with a creature/object (Size equal mine or smaller) within 30 ft. Target must fail a Charisma save (can choose to fail)."
                }
            },
            usages: 1,
            recovery: "long rest",
            spellcastingExtraApplyNonconform: true,
            action: [["action", " (Swap Places)"]]
        },
        "subclassfeature10": {
            name: "Empowered Conjuration",
            source: [["GMB:LL", 5]],
            minlevel: 10,
            description: desc([
                "When I cast a Conjuration spell that summons creatures or use Minor Conjuration,",
                "one creature or object gains temp HP equal to twice my Wizard level."
            ]),
            additional: levels.map(function (n) {
                return (n * 2) + " Temp HP";
            })
        },
        "subclassfeature14": {
            name: "Master of Conjuration",
            source: [["GMB:LL", 5]],
            minlevel: 14,
            description: desc([
                "My concentration on Conjuration spells that summon/conjure creatures",
                "cannot be broken by taking damage."
            ]),
        }
    }
});

// app.alert("Loading: Diviner Tradition");
AddSubClass("wizard(laserllama)", "diviner tradition", {
    regExpSearch: /^(?=.*diviner)(?=.*tradition).*$/i,
    subname: "Diviner Tradition",
    source: [["GMB:LL", 6]],
    features: {
        "subclassfeature3": {
            name: "Scholar of Divination",
            source: [["GMB:LL", 6]],
            minlevel: 3,
            description: desc([
                "Divination becomes one of my Focus Schools (if not already).",
                "I add two 1st or 2nd-level Divination spells to my spellbook for free."
            ]),
            bonusClassExtrachoices: [{
                class: "wizard(laserllama)",
                feature: "focus schools",
                bonus: 1,
                addToExisting: true
            }],
            autoSelectExtrachoices: [{
                feature: "focus schools",
                selection: ["divination"]
            }],
            spellcastingBonus: {
                name: "Scholar of Divination",
                class: "wizard(laserllama)",
                school: ["Div"],
                level: [1, 2],
                times: 2,
                prepared: false
            }
        },
        "subclassfeature3.1": {
            name: "Portent",
            source: [["GMB:LL", 6]],
            minlevel: 3,
            description: desc([
                "After a 1-hour ritual during a long rest, I roll two d20s and record the results.",
                "I can replace any attack, saving throw, or ability check made by a creature I can",
                "see with one of these rolls. I must choose to do so before the roll is made."
            ]),
            usages: 2,
            recovery: "long rest",
            additional: "See notes"
        },
        "subclassfeature6": {
            name: "Ascended Awareness",
            source: [["GMB:LL", 6]],
            minlevel: 6,
            description: desc([
                "I cannot be surprised unless I am incapacitated.",
                "I add my Intelligence modifier (min +1) to my initiative rolls."
            ]),
            addMod: { type: "skill", field: "Init", mod: "max(1, Int)", text: "I add my Intelligence modifier (min +1) to my initiative rolls." },
            savetxt: { immune: ["surprised"] }
        },
        "subclassfeature10": {
            name: "The Third Eye",
            source: [["GMB:LL", 6]],
            minlevel: 10,
            description: desc([
                "I can perform a 1-hour ritual to gain one of the following benefits until my next ritual:",
                "\u2022 Arcane Sight: See magic effects/objects (as Detect Magic).",
                "\u2022 Ethereal Sight: See into the Ethereal Plane and see invisible creatures/objects.",
                "\u2022 Infernal Sight: See normally in dim light/darkness (magical and non-magical).",
                "\u2022 Runic Sight: Read any language."
            ]),
            additional: "60-ft radius",
        },
        "subclassfeature14": {
            name: "Master of Divination",
            source: [["GMB:LL", 6]],
            minlevel: 14,
            description: desc([
                "When I roll for Portent, I roll each d20 twice and pick which result to record.",
                "As an action, I can spend a 2nd-level slot or higher to change my Third Eye benefit."
            ]),
            action: [["action", " (Swap Third Eye)"]]
        }
    }
});

// app.alert("Loading: Enchanter Tradition");
AddSubClass("wizard(laserllama)", "enchanter tradition", {
    regExpSearch: /^(?=.*enchanter)(?=.*tradition).*$/i,
    subname: "Enchanter Tradition",
    source: [["GMB:LL", 7]],
    features: {
        "subclassfeature3": {
            name: "Scholar of Enchantment",
            source: [["GMB:LL", 7]],
            minlevel: 3,
            description: desc([
                "Enchantment becomes one of my Focus Schools (if not already).",
                "I add two 1st or 2nd-level Enchantment spells to my spellbook for free."
            ]),
            bonusClassExtrachoices: [{
                class: "wizard(laserllama)",
                feature: "focus schools",
                bonus: 1,
                addToExisting: true
            }],
            autoSelectExtrachoices: [{
                feature: "focus schools",
                selection: ["enchantment"]
            }],
            spellcastingBonus: {
                name: "Scholar of Enchantment",
                class: "wizard(laserllama)",
                school: ["Ench"],
                level: [1, 2],
                times: 2,
                prepared: false
            }
        },
        "subclassfeature3.1": {
            name: "Mesmerizing Speech",
            source: [["GMB:LL", 7]],
            minlevel: 3,
            description: desc([
                "Creatures within 5 ft that can hear me have disadvantage on their initial save",
                "against my Enchantment spells.",
                "As a reaction, I can speak to a creature within 5 ft to give it disadvantage on",
                "a save made to end an Enchantment spell I cast."
            ]),
            action: [["reaction", " "]]
        },
        "subclassfeature6": {
            name: "Beguiling Defense",
            source: [["GMB:LL", 7]],
            minlevel: 6,
            description: desc([
                "As a reaction when attacked by a creature within 30 ft, I can force a Wis save.",
                "On failure, it must target another creature in range or the attack is wasted.",
                "This counts as an Enchantment spell for Mesmerizing Speech.",
                "No effect on creatures immune to Charmed. Once per long rest for each creature,",
                "unless I expend a spell slot to use it again on that same creature."
            ]),
            action: [["reaction", ""]]
        },
        "subclassfeature10": {
            name: "Empowered Enchantment",
            source: [["GMB:LL", 7]],
            minlevel: 10,
            description: desc([
                "If a creature succeeds on a save to resist one of my Enchantment spells, I can",
                "immediately force another target within the spell's range to become the new target.",
                "I can use this feature once per spell cast."
            ])
        },
        "subclassfeature14": {
            name: "Master of Enchantment",
            source: [["GMB:LL", 7]],
            minlevel: 14,
            description: desc([
                "My Enchantment spells and features ignore immunity to the Charmed condition.",
                "Creatures that would be immune have advantage on the saving throw to resist",
                "or end the condition."
            ])
        }
    }
});

// app.alert("Loading: Evoker Tradition");
AddSubClass("wizard(laserllama)", "evoker tradition", {
    regExpSearch: /^(?=.*evoker)(?=.*tradition).*$/i,
    subname: "Evoker Tradition",
    source: [["GMB:LL", 8]],
    features: {
        "subclassfeature3": {
            name: "Scholar of Evocation",
            source: [["GMB:LL", 8]],
            minlevel: 3,
            description: desc([
                "Evocation becomes one of my Focus Schools (if not already).",
                "I add two 1st or 2nd-level Evocation spells to my spellbook for free."
            ]),
            bonusClassExtrachoices: [{
                class: "wizard(laserllama)",
                feature: "focus schools",
                bonus: 1,
                addToExisting: true
            }],
            autoSelectExtrachoices: [{
                feature: "focus schools",
                selection: ["evocation"]
            }],
            spellcastingBonus: {
                name: "Scholar of Evocation",
                class: "wizard(laserllama)",
                school: ["Evoc"],
                level: [1, 2],
                times: 2,
                prepared: false
            }
        },
        "subclassfeature3.1": {
            name: "Potent Cantrip",
            source: [["GMB:LL", 8]],
            minlevel: 3,
            description: desc([
                "I learn one additional Evocation cantrip of my choice from the Wizard list.",
                "Attack Cantrips: Add my Int mod (min +1) to one damage roll.",
                "Save Cantrips: Creatures take half damage on a successful save (no other effects)."
            ]),
            spellcastingBonus: {
                name: "Potent Cantrip",
                class: "wizard(laserllama)",
                school: ["Evoc"],
                level: [0, 0],
                times: 1,
                prepared: false
            },
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.isSpell && v.thisWeapon[3] && SpellsList[v.thisWeapon[3]] && SpellsList[v.thisWeapon[3]].level === 0 && SpellsList[v.thisWeapon[3]].school === "Evoc") {
                            fields.Damage_Die = fields.Damage_Die.replace(/([+-]\d+)?$/, function (match) {
                                var mod = Number(What('Int Mod'));
                                return "+" + (Math.max(1, mod) + (match ? Number(match) : 0));
                            });
                        }
                    },
                    "Add my Intelligence modifier (minimum +1) to the damage of my Evocation cantrips that require an attack roll."
                ]
            }
        },
        "subclassfeature6": {
            name: "Sculpt Spells",
            source: [["GMB:LL", 8]],
            minlevel: 6,
            description: desc([
                "When I cast an Evocation spell, I can protect allies within the area (1 + spell level).",
                "They are immune to initial effects and damage on the turn I cast the spell.",
                "Persistent effects of the spell affect them as normal after the initial casting."
            ])
        },
        "subclassfeature10": {
            name: "Empowered Evocation",
            source: [["GMB:LL", 8]],
            minlevel: 10,
            description: desc([
                "On the turn I cast an Evocation spell, I can re-roll any number of damage dice.",
                "I must keep the new results and choose how many dice to re-roll at once."
            ])
        },
        "subclassfeature14": {
            name: "Master of Evocation",
            source: [["GMB:LL", 8]],
            minlevel: 14,
            description: desc([
                "When I cast an Evocation spell (5th-level or lower), I can deal maximum damage.",
                "Once per long rest no cost. Subsequent uses: 4d6 necrotic damage per spell level.",
                "This damage ignores resistance/immunity and cannot be reduced."
            ]),
            usages: 1,
            recovery: "long rest"
        }
    }
});

// app.alert("Loading: Illusionist Tradition");
AddSubClass("wizard(laserllama)", "illusionist tradition", {
    regExpSearch: /^(?=.*illusionist)(?=.*tradition).*$/i,
    subname: "Illusionist Tradition",
    source: [["GMB:LL", 9]],
    features: {
        "subclassfeature3": {
            name: "Scholar of Illusion",
            source: [["GMB:LL", 9]],
            minlevel: 3,
            description: desc([
                "Illusion becomes one of my Focus Schools (if not already).",
                "I add two 1st or 2nd-level Illusion spells to my spellbook for free."
            ]),
            bonusClassExtrachoices: [{
                class: "wizard(laserllama)",
                feature: "focus schools",
                bonus: 1,
                addToExisting: true
            }],
            autoSelectExtrachoices: [{
                feature: "focus schools",
                selection: ["illusion"]
            }],
            spellcastingBonus: {
                name: "Scholar of Illusion",
                class: "wizard(laserllama)",
                school: ["Illus"],
                level: [1, 2],
                times: 2,
                prepared: false
            }
        },
        "subclassfeature3.1": {
            name: "Illusionist Adept",
            source: [["GMB:LL", 9]],
            minlevel: 3,
            description: desc([
                "I learn Minor Illusion (or another wizard cantrip). I can cast it as an action or BA.",
                "I can create both sound and image with one casting of Minor Illusion.",
                "I can cast any Illusion spell from my spellbook without verbal components."
            ]),
            spellcastingBonus: {
                name: "Illusionist Adept",
                class: "wizard(laserllama)",
                spells: ["minor illusion"],
                selection: ["minor illusion"],
                level: [0, 0]
            },
            spellChanges: {
                "minor illusion": {
                    changes: "I can create both sound and image with one casting of Minor Illusion."
                }
            },
            action: [["bonus action", " (Minor Illusion)"]]
        },
        "subclassfeature6": {
            name: "Phantasmal Spells",
            source: [["GMB:LL", 9]],
            minlevel: 6,
            description: desc([
                "When I cast a Conjuration or Evocation spell, I can make it an Illusion instead:",
                " \u2022 Its school becomes Illusion and it deals Psychic damage (if deals damage).",
                " \u2022 It force Int saves instead of the original save; ignores material components.",
                " \u2022 If the spell conjure anything with HP, it conjure it with half of them.",
                " \u2022 Creatures with Int > my Spell DC are immune; others believe it is real."
            ])
        },
        "subclassfeature10": {
            name: "Illusory Self",
            source: [["GMB:LL", 10]],
            minlevel: 10,
            description: desc([
                "As a reaction when hit by an attack, I create a duplicate to take the hit instead,",
                "then teleport up to 10 feet to an unoccupied space I can see.",
                "If no uses left, I can expend a 2nd-level slot or higher to use again."
            ]),
            action: [["reaction", ""]],
            usages: 1,
            recovery: "short rest",
            altResource: "2nd-level+ slot"
        },
        "subclassfeature14": {
            name: "Illusory Reality",
            source: [["GMB:LL", 10]],
            minlevel: 14,
            description: desc([
                "As a bonus action after casting an Illusion spell (action), I make one inanimate,",
                "nonmagical object of it real for 1 min. It can't deal damage/harm.",
                "It has AC = Spell DC and HP = 3 \xD7 Wizard level. Ends if destroyed or ended as a bonus action",
                "or I make another illusion real (no stacking)."
            ]),
            action: [["bonus action", " (make real/end)"]],
            additional: levels.map(function (n) {
                return (n * 3) + " HP of Illusion";
            })
        }
    }
});

// app.alert("Loading: Necromancer Tradition");
AddSubClass("wizard(laserllama)", "necromancer tradition", {
    regExpSearch: /^(?=.*necromancer)(?=.*tradition).*$/i,
    subname: "Necromancer Tradition",
    source: [["GMB:LL", 10]],
    features: {
        "subclassfeature3": {
            name: "Scholar of Necromancy",
            source: [["GMB:LL", 10]],
            minlevel: 3,
            description: desc([
                "Necromancy becomes one of my Focus Schools (if not already).",
                "I add two 1st or 2nd-level Necromancy spells to my spellbook for free."
            ]),
            bonusClassExtrachoices: [{
                class: "wizard(laserllama)",
                feature: "focus schools",
                bonus: 1,
                addToExisting: true
            }],
            autoSelectExtrachoices: [{
                feature: "focus schools",
                selection: ["necromancy"]
            }],
            spellcastingBonus: {
                name: "Scholar of Necromancy",
                class: "wizard(laserllama)",
                school: ["Necro"],
                level: [1, 2],
                times: 2,
                prepared: false
            }
        },
        "subclassfeature3.1": {
            name: "Sinister Servant",
            source: [["GMB:LL", 10]],
            minlevel: 3,
            description: desc([
                "I add the Find Familiar spell to my spellbook.",
                "My familiar's type is always Undead and appears as a skeletal or ghastly version."
            ]),
            spellcastingExtraApplyNonconform: true,
            spellcastingExtra: ["conjure familiar"],
            spellChanges: {
                "conjure familiar": {
                    changes: "My familiar's type is always Undead and appears as a skeletal or ghastly version."
                }
            }
        },
        "subclassfeature3.2": {
            name: "Siphon Vitality",
            source: [["GMB:LL", 10]],
            minlevel: 3,
            description: desc([
                "When I kill a creature (not Construct/Undead) with a spell of 1st-level or higher:",
                "I regain HP = 2 \xD7 CR (3 \xD7 CR for Necromancy spells). Excess HP becomes Temp HP.",
                "I can split these HP between myself and any Undead under my control within 30 ft."
            ])
        },
        "subclassfeature6": {
            name: "Empowered Thralls",
            source: [["GMB:LL", 11]],
            minlevel: 6,
            description: desc([
                "I add Animate Dead to my book (always prepared, doesn't count against limit).",
                "Undead I create gain bonus hit points equal to my Wizard level.",
                "If my Undead kills a creature, I can use a reaction to trigger Siphon Vitality."
            ]),
            spellcastingExtra: ["animate dead"],
            spellcastingExtraApplyNonconform: true,
            action: [["reaction", " (on Undead kill)"]]
        },
        "subclassfeature10": {
            name: "Dark Overlord",
            source: [["GMB:LL", 11]],
            minlevel: 10,
            description: desc([
                "I have resistance to necrotic damage.",
                "When I take damage, I can have an Undead within 30 ft take it instead.",
                "If the Undead is reduced to 0 HP, I take any remaining damage."
            ]),
            dmgres: ["Necrotic"]
        },
        "subclassfeature14": {
            name: "Master of Necromancy",
            source: [["GMB:LL", 11]],
            minlevel: 14,
            description: desc([
                "As an action, I force an Undead within 30 ft to make a Charisma save (Int 8+ has adv).",
                "On failure, it's under my control (Animate Dead rules) until I use this against another Undead.",
                "If Int 12+, it repeats the save every hour. Once an Undead succeeds, it's immune to this feature."
            ]),
            action: [["action", ""]]
        }
    }
});

// app.alert("Loading: Transmuter Tradition");
AddSubClass("wizard(laserllama)", "transmuter tradition", {
    regExpSearch: /^(?=.*transmuter)(?=.*tradition).*$/i,
    subname: "Transmuter Tradition",
    source: [["GMB:LL", 11]],
    features: {
        "subclassfeature3": {
            name: "Scholar of Transmutation",
            source: [["GMB:LL", 11]],
            minlevel: 3,
            description: desc([
                "Transmutation becomes one of my Focus Schools (if not already).",
                "I add two 1st or 2nd-level Transmutation spells to my spellbook for free."
            ]),
            bonusClassExtrachoices: [{
                class: "wizard(laserllama)",
                feature: "focus schools",
                bonus: 1,
                addToExisting: true
            }],
            autoSelectExtrachoices: [{
                feature: "focus schools",
                selection: ["transmutation"]
            }],
            spellcastingBonus: {
                name: "Scholar of Transmutation",
                class: "wizard(laserllama)",
                school: ["Trans"],
                level: [1, 2],
                times: 2,
                prepared: false
            }
        },
        "subclassfeature3.1": {
            name: "Equivalent Exchange",
            source: [["GMB:LL", 11]],
            minlevel: 3,
            description: desc([
                "As an action, I touch a non-magical object and spend a spell slot to alter it.",
                "Material: Change between iron, steel, stone (no gems), or wood.",
                "Shape: Alter shape; no mass change. Concentration (1 min) for permanence.",
                "Size: 1st: Tiny, 2nd: Small, 3rd: Medium, 5th: Large, 7th: Huge, 9th: Gargantuan."
            ]),
            action: [["action", ""]]
        },
        "subclassfeature6": {
            name: "Transmute Self",
            source: [["GMB:LL", 11]],
            minlevel: 6,
            description: levels.map(function (n) {
                var spellRitual = n < 10 ? "1st level spell" : "1st or 2nd level spell";
                return "During a LR, I can make a " + spellRitual + " from my book permanent on myself. The spell must target a creature and no longer requires concentration. Lasts until my next LR.";
            })
        },
        "subclassfeature10": {
            name: "Empowered Transmutation",
            source: [["GMB:LL", 12]],
            minlevel: 10,
            description: desc([
                "I add Polymorph to my book (always prepared).",
                "When I cast it on myself, it is a bonus action and I keep my mental scores."
            ]),
            spellcastingExtra: ["polymorph"],
            spellcastingExtraApplyNonconform: true,
            action: [["bonus action", " (Polymorph self)"]]
        },
        "subclassfeature14": {
            name: "Master of Transmutation",
            source: [["GMB:LL", 12]],
            minlevel: 14,
            description: desc([
                "I can create a Philosopher's Stone during a long rest.",
                "I can expend it to cast a Wizard spell at 5th-level without a slot,",
                "or cast one of the stone's spells (Awaken, Raise Dead, etc.) without a slot."
            ]),
            usages: 1,
            recovery: "long rest",
            spellcastingExtraApplyNonconform: true,
            spellcastingBonus: {
                name: "Philosopher's Stone Spells",
                spells: ["awaken", "contagion", "creation", "mass cure wounds", "raise dead", "greater restoration"],
                selection: ["awaken", "contagion", "creation", "mass cure wounds", "raise dead", "greater restoration"],
                times: 6,
                prepared: false
            }
        }
    }
});

// app.alert("Loading: Bladesinger Tradition");
AddSubClass("wizard(laserllama)", "bladesinger tradition", {
    regExpSearch: /^(?=.*bladesinger)(?=.*tradition).*$/i,
    subname: "Bladesinger Tradition",
    source: [["GMB:LL", 12]],
    features: {
        "subclassfeature3": {
            name: "Scholar of Spell & Sword",
            source: [["GMB:LL", 12]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with light armor and one one-handed melee weapon of my choice.",
                "I can use this weapon as a spellcasting focus while holding it.",
                "I can cast Wizard spells while wearing light armor."
            ]),
            armorProfs: [true, false, false, false],
            weapons: [false, false, ["one-handed melee weapon"]]
        },
        "subclassfeature3.1": {
            name: "Bladesong",
            source: [["GMB:LL", 12]],
            minlevel: 3,
            description: levels.map(function (n) {
                var duration = n < 10 ? "1 minute, requires Concentration" : "1 minute";
                return desc([
                    "As a bonus action, I can spend a spell slot to enter Bladesong (" + duration + ").",
                    "Cannot use medium/heavy armor or shields. While active, I gain:",
                    "\u2022 Temp HP: 5 x level of the spell slot spent.",
                    "\u2022 Speed: My walking speed increases by 10 ft.",
                    "\u2022 Mobility: Opportunity attacks against me have disadvantage.",
                    "\u2022 Concentration: I add my Int modifier to saves to maintain concentration.",
                    "\u2022 Defensive Dance: When hit, I can use a reaction to add Int mod to my AC."
                ]);
            }),
            action: [["bonus action", " (Start)"], ["reaction", " (Defensive Dance)"]],
            savetxt: { text: ["Add Int mod to concentration saves during Bladesong"] }
        },
        "subclassfeature3.2": {
            name: "Dancing Smite",
            source: [["GMB:LL", 13]],
            minlevel: 3,
            description: desc([
                "Once per turn in Bladesong, when I hit with a melee attack I can spend a slot.",
                "I deal +1d8 damage per slot level (max 5d8) of a type from a prepared spell."
            ])
        },
        "subclassfeature6": {
            name: "Song of Battle",
            source: [["GMB:LL", 13]],
            minlevel: 6,
            description: desc([
                "While Bladesong is active, I can attack twice when I take the Attack action.",
                "If I use my action to Cast a Spell, I can make one melee attack as a bonus action."
            ]),
            action: [["bonus action", " (Melee attack after spell)"]]
        },
        "subclassfeature10": {
            name: "Singing Reprisal",
            source: [["GMB:LL", 13]],
            minlevel: 10,
            description: desc([
                "When damaged in Bladesong, I can use a reaction and a slot to reduce damage.",
                "Reduce by 1d10 per slot level. If reduced to 0, I can make a melee attack."
            ]),
            action: [["reaction", " (Reduce Damage)"]]
        },
        "subclassfeature14": {
            name: "Master of Spell & Sword",
            source: [["GMB:LL", 13]],
            minlevel: 14,
            description: desc([
                "While Bladesong is active, my melee attacks deal a bonus 1d8 damage of a type of my choice (from prepared spells)."
            ]),
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.isMeleeWeapon) {
                            fields.Description += (fields.Description ? '; ' : '') + '+1d8 dmg in Bladesong';
                        }
                    },
                    "My melee weapon attacks deal a bonus 1d8 damage while my Bladesong is active."
                ]
            }
        }
    }
});

// app.alert("Loading: Scribe Tradition");
AddSubClass("wizard(laserllama)", "scribe tradition", {
    regExpSearch: /^(?=.*scribe)(?=.*tradition).*$/i,
    subname: "Scribe Tradition",
    source: [["GMB:LL", 14]],
    features: {
        "subclassfeature3": {
            name: "Scholar of the Book",
            source: [["GMB:LL", 14]],
            minlevel: 3,
            description: levels.map(function (n) {
                var promptPrep = n < 6 ?
                    "\u2022 Prompt Preparation: During a short rest, I can swap one prepared spell with another." :
                    "\u2022 Prompt Preparation: During a short rest, I can swap up to half my Wizard level spells with other ones.";
                return desc([
                    "\u2022 Cantrip Formulae: I can swap one Wizard cantrip during a long rest.",
                    promptPrep,
                    "\u2022 Quick Quill: Copying spells takes 1 hour/level (30 min/level for Focus Schools)."
                ]);
            }),
            bonusClassExtrachoices: [{
                class: "wizard(laserllama)",
                feature: "focus schools",
                bonus: 1,
                addToExisting: true
            }]
        },
        "subclassfeature3.1": {
            name: "Spell Scrivener",
            source: [["GMB:LL", 14]],
            minlevel: 3,
            description: desc([
                "During a long rest, I can spend 1 hour to craft temporary spell scrolls.",
                "I spend a spell slot for each scroll and cannot regain it until the scroll is used/destroyed.",
                "Any creature can use these scrolls, using my spellcasting ability."
            ]),
            additional: "Max total levels: Int mod"
        },
        "subclassfeature6": {
            name: "Altered Arcana",
            source: [["GMB:LL", 15]],
            minlevel: 6,
            description: levels.map(function (n) {
                if (n < 14) {
                    return "When preparing spells, I can choose two of the same level and swap their damage types.";
                }
                return "When preparing, I can swap damage types and/or the initial saving throw between two spells of the same level.";
            })
        },
        "signature spell": {
            name: "Signature Spell",
            source: [["GMB:LL", 3]],
            minlevel: 7,
            description: desc([
                "I can create a modified or new version of a spell from my Focus Schools.",
                "Rules for modification and creation are added to the Notes page."
            ]),
            additional: levels.map(function (n) {
                if (n < 7) return "";
                if (n < 10) return "1 Signature Spell";
                if (n < 11) return "2 Signature Spells";
                if (n < 15) return "3 Signature Spells";
                return "4 Signature Spells";
            }),
            toNotes: [{
                title: "Signature Spell Rules",
                note: levels.map(function (n) {
                    var maxLvl = n < 11 ? "2nd" : (n < 15 ? "3rd" : "5th");
                    return desc([
                        "Choose a spell of " + maxLvl + "-level or lower from a Focus School to modify. It becomes a new entry in your book.",
                        "Modifications (increases spell level):",
                        "\u2022 Casting Time: Action to Bonus Action (+1 level).",
                        "\u2022 Components: Remove non-costly components (+1 per component).",
                        "\u2022 Concentration: Reaction to succeed on a failed save (+1 level).",
                        "\u2022 Damage: Change damage type to one from another spell in your book.",
                        "\u2022 Ritual: Add ritual tag if it costs 1 action/BA and has no gold cost.",
                        "\u2022 Shape: Change area (cone, cube, etc.) to another of equivalent size."
                    ]);
                })
            }]
        },
        "subclassfeature10": {
            name: "Spell Tinker",
            source: [["GMB:LL", 15]],
            minlevel: 10,
            description: desc([
                "During a long rest, I can spend 1 hour to add, remove, or swap one Modification on one of my Signature Spells."
            ])
        },
        "subclassfeature14": {
            name: "Master Scrivener",
            source: [["GMB:LL", 15]],
            minlevel: 14,
            description: desc([
                "I can use Spell Scrivener anytime (1 min/level) for spells of 5th-level or lower.",
                "These temporary scrolls follow the standard Spell Scrivener rules."
            ])
        }
    }
});

// app.alert("Loading: War Mage Tradition");
AddSubClass("wizard(laserllama)", "war mage tradition", {
    regExpSearch: /^(?=.*war)(?=.*mage)(?=.*tradition).*$/i,
    subname: "War Mage Tradition",
    source: [["GMB:LL", 15]],
    features: {
        "subclassfeature3": {
            name: "Scholar of Warfare",
            source: [["GMB:LL", 15]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with light and medium armor and can cast spells while wearing it.",
                "I gain either Abjuration or Evocation as a Focus School (my choice).",
                "I add the Shield spell to my spellbook (or another 1st-level Abjur spell)."
            ]),
            armorProfs: [true, true, false, false],
            spellcastingExtraApplyNonconform: true,
            spellcastingBonus: [{
                name: "Scholar of Warfare",
                spells: ["shield"],
                selection: ["shield"],
            }],
            bonusClassExtrachoices: [{
                class: "wizard(laserllama)",
                feature: "focus schools",
                bonus: 1,
                addToExisting: true
            }]
        },
        "subclassfeature3.1": {
            name: "Battle Mage",
            source: [["GMB:LL", 15]],
            minlevel: 3,
            description: desc([
                "I can cast Shield without a slot (at 1st level). If I do, I can only cast cantrips until my next turn end.",
                "I can do this a number of times equal to my Intelligence modifier per long rest."
            ]),
            usagescalc: "event.value = classes.known['wizard(laserllama)'].level < 14 ? Math.max(1, What('Int Mod')) : '999';",
            recovery: "long rest",
            limfeatuename: "Shield (no slot)",
            action: [["reaction", " (Shield)"]]
        },
        "subclassfeature6": {
            name: "Tactical Surge",
            source: [["GMB:LL", 16]],
            minlevel: 6,
            description: desc([
                "I add Counterspell and Dispel Magic to my spellbook (if already known, I add other as normal).",
                "When attack against me fails because of Shield spell, or I end successfully a spell with",
                "Counterspell/Dispel Magic, I gain a Tactical Surge (TS).",
                "I can have up to my Int mod TS stored at once. And I lose them when used or",
                "after a long rest. When I deal spell damage, I can spend TSs to deal +2d6 damage per TS."
            ]),
            usagescalc: "event.value = Math.max(1, What('Int Mod'));",
            recovery: "long rest",
            usages: 0,
            spellcastingExtraApplyNonconform: true,
            spellcastingBonus: [{
                name: "Scholar of Warfare",
                spells: ["counterspell", "dispel magic"],
                selection: ["counterspell", "dispel magic"],
                times: 2
            }],
            limfeatuename: "Tactical Surges"
        },
        "subclassfeature10": {
            name: "Arcane Fortitude",
            source: [["GMB:LL", 16]],
            minlevel: 10,
            description: desc([
                "I gain a +1 bonus to all saving throws for each Tactical Surge I currently have stored.",
                "I gain 1 Tactical Surge if I have none when I finish a short or long rest."
            ])
        },
        "subclassfeature10.1": {
            name: "Strategic Surge",
            source: [["GMB:LL", 16]],
            minlevel: 10,
            description: desc([
                "When I roll initiative, I can spend 1 Tactical Surge to add my Int mod to the roll.",
                "I can do this after the roll, but before anyone acts."
            ])
        },
        "subclassfeature14": {
            name: "Master of Arcane Warfare",
            source: [["GMB:LL", 16]],
            minlevel: 14,
            description: desc([
                "I can use Battle Mage to cast Shield at-will without expending a spell slot.",
                "When Shield makes an attack miss, I can forgo the Tactical Surge to cast",
                "a Wizard cantrip as part of the same reaction."
            ]),
        }
    }
});