var iFileName = "LaserLlama - Alternate Bard v2.0.0.0.js";
RequiredSheetVersion("13.0.6");
if (ClassList["bard"]) {
    ClassList["bard"].regExpSearch = /^(?=.*bard)(?!.*laserllama).*$/i;
    // ClassSubList["druid-circle of the land"].regExpSearch = /^(?=.*(druid|shaman))(?=.*\b(land|arctic|coast|deserts?|forests?|grasslands?|savannah|steppes?|mountains?|swamps?|underdark)\b)(?!.*laserllama).*$/i;
}
// Aggiungi la lista di incantesimi del Bardo di Laserllama
[
    // Cantrips (0-Level)
    "blade ward",
    "booming blade",
    "dancing lights",
    "friends",
    "glitterbeam",
    "guidance",
    "light",
    "mage hand",
    "mending",
    "message",
    "minor illusion",
    "prestidigitation",
    "resistance",
    "thunderclap",
    "true strike",
    "vicious mockery",

    // 1st-Level
    "bane",
    "cause fear",
    "charm person",
    "color spray",
    "command",
    "comprehend languages",
    "cure wounds",
    "detect magic",
    "disguise self",
    "dissonant whispers",
    "faerie fire",
    "feather fall",
    "healing word",
    "heroism",
    "hideous laughter",
    "identify",
    "longstrider",
    "silent image",
    "sleep",
    "thunderous smite",
    "thunderwave",

    // 2nd-Level
    "aid",
    "blindness/deafness",
    "calm emotions",
    "crown of madness",
    "detect thoughts",
    "enhance ability",
    "enlarge/reduce",
    "hold person",
    "invisibility",
    "locate creature",
    "locate object",
    "magic mouth",
    "mirror image",
    "phantasmal force",
    "pyrotechnics",
    "lesser restoration",
    "see invisibility",
    "shatter",
    "silence",
    "skywrite",
    "suggestion",
    "zone of truth",

    // 3rd-Level
    "bestow curse",
    "clairvoyance",
    "dire wail",
    "dispel magic",
    "enemies abound",
    "fear",
    "haste",
    "hypnotic pattern",
    "irresistible dance",
    "major image",
    "mass healing word",
    "nondetection",
    "sending",
    "slow",
    "sonic wave",
    "leomund's tiny hut",
    "tongues",

    // 4th-Level
    "banishment",
    "charm monster",
    "compulsion",
    "confusion",
    "dimension door",
    "freedom of movement",
    "greater invisibility",
    "hallucinatory terrain",
    "phantasmal killer",

    // 5th-Level
    "animate objects",
    "dominate person",
    "dream",
    "geas",
    "hold monster",
    "legend lore",
    "mass cure wounds",
    "mislead",
    "modify memory",
    "seeming",
    "skill empowerment"

].forEach(function (s) {
    if (SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("bard(laserllama)") === -1) {
        SpellsList[s].classes.push("bard(laserllama)");
    }
});


ClassList['bard(laserllama)'] = {
    regExpSearch: /bard(laserllama)?|laserllama bard/i,
    name: "Bard (Laserllama)",
    source: [["GMB:LL", 0]],
    primaryAbility: "Charisma",
    abilitySave: 6,
    prereqs: "Charisma 13",
    improvements: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
    die: 8,
    saves: ["Dex", "Cha"],
    skillstxt: {
        primary: "Choose three from Acrobatics, Arcana, Deception, History, Insight, Investigation, Perception, Performance, Persuasion, Religion, Sleight of Hand, or Stealth",
        secondary: "Choose three from Acrobatics, Arcana, Deception, History, Insight, Investigation, Perception, Performance, Persuasion, Religion, Sleight of Hand, or Stealth",
    },
    toolProfs: {
        primary: [["Musical instrument", 1], ["Any tool", 1]],
        secondary: [["Musical instrument", 1]]
    },
    armorProfs: {
        primary: [true, true, false, false],
        secondary: [true, false, false, false]
    },
    weaponProfs: {
        primary: [true, false, ["rapier", "shortsword"]],
        secondary: [true, false, []]
    },
    equipment: "Bard starting equipment:" +
        "\n \u2022 (a) a rapier, (b) a shortsword, or (c) any simple weapon;" +
        "\n \u2022 (a) leather armor or (b) a chain shirt;" +
        "\n \u2022 (a) a diplomat's pack or (b) an entertainer's pack;" +
        "\n \u2022 One musical instrument of your choice and a dagger." +
        "\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
    subclasses: ["Bardic Tradition", [
    ]],
    spellcastingFactor: 2,
    spellcastingKnown: {
        cantrips: [0, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        spells: [0, 0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11]
    },
    features: {
        "bardic inspiration": {
            name: "Bardic Inspiration",
            source: ["HB", 0],
            minlevel: 1,
            description: "\n   " + "As a reaction when a creature in 30 ft fails an attack/save or makes an ability check, I can expend a Bardic Inspiration Die" +
                "\n   " + "The target adds the die result to their roll" +
                "\n   " + "I have (Bard level/2 rounded up) + Cha mod Bardic Inspiration Dice" +
                "\n   " + "I regain all expended Dice after a short or long rest",
            additional: ["d4", "d4", "d4", "d4", "d6", "d6", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10"],
            usagescalc: "event.value = Math.ceil(classes.known['bard(laserllama)'].level / 2) + What('Cha Mod');",
            recovery: "short rest",
            action: [["reaction", ""]]
        },
        "folklore": (function () {
            var folkloreObj = {
                name: "Folklore",
                source: [["GMB:LL", 0]],
                minlevel: 1,
                description: desc([
                    "I gain skills and a tools (or languages) proficiencies.",
                    "If I choose a skill or tool I'm already proficient in, I gain expertise (double PB) instead."
                ]),
                additional: levels.map(function (n) {
                    var total = n < 6 ? 1 : n < 10 ? 2 : n < 14 ? 3 : n < 18 ? 4 : 5;
                    return total + " skill" + (total > 1 ? "s" : "") + ", " + total + " tool/lang" + (total > 1 ? "s" : "");
                }),
                // Total selection points (2 per milestone)
                extraTimes: levels.map(function (n) {
                    return n < 6 ? 2 : n < 10 ? 4 : n < 14 ? 6 : n < 18 ? 8 : 10;
                }),
                extraname: "Folklore Selection",
                extrachoices: [],
            };

            var sList = ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"];

            sList.forEach(function (s) {
                var profKey = "Skill: " + s;
                var expKey = "Skill: " + s + " (Expertise)";

                folkloreObj.extrachoices.push(profKey, expKey);

                folkloreObj[profKey.toLowerCase()] = {
                    name: s + " Proficiency",
                    submenu: "Folklore (Skills)",
                    description: "I gain proficiency in the " + s + " skill.",
                    source: [["GMB:LL", 0]],
                    skills: [s],
                    prereqeval: function (v) { return v.skillProfs.indexOf(s) === -1; }
                };

                folkloreObj[expKey.toLowerCase()] = {
                    name: s + " Expertise",
                    submenu: "Folklore (Skills)",
                    description: "I gain expertise (double PB) in the " + s + " skill.",
                    source: [["GMB:LL", 0]],
                    skills: [[s, "only"]],
                    prereqeval: function (v) { return v.skillProfs.indexOf(s) !== -1; }
                };
            });
            var ord = ["1st", "2nd", "3rd", "4th", "5th"];

            ord.forEach(function (num) {
                // Languages
                var langKey = num + " Language";
                folkloreObj.extrachoices.push(langKey);
                folkloreObj[langKey.toLowerCase()] = {
                    name: num + " Language",
                    submenu: "Folklore (Tools/Langs)",
                    description: "I learn a new language of my choice.",
                    source: [["GMB:LL", 0]],
                    languageProfs: [1]
                };

                // Tools
                var toolKey = num + " Tool";
                folkloreObj.extrachoices.push(toolKey);
                folkloreObj[toolKey.toLowerCase()] = {
                    name: num + " Tool/Expertise",
                    submenu: "Folklore (Tools/Langs)",
                    description: "I gain proficiency in a tool (or expertise if already proficient).",
                    source: [["GMB:LL", 0]],
                    toolProfs: [["Any tool", "increment"]]
                };
            });

            return folkloreObj;
        })(),
        "chords of power": (function () {
            var chordsOfPower = {
                name: "Chords of Power",
                source: [["GMB:LL", 3]],
                minlevel: 2,
                description: desc([
                    'Use the "Special" button at the top to select your Chords of Power.',
                    "During a long rest, I can spend 1 hour to replace one chord I know with another."
                ]),
                additional: ["", "2 Chords", "2 Chords", "2 Chords", "2 Chords", "2 Chords", "3 Chords", "3 Chords", "3 Chords", "3 Chords", "4 Chords", "4 Chords", "4 Chords", "4 Chords", "5 Chords", "5 Chords", "5 Chords", "5 Chords", "6 Chords", "6 Chords"],
                extraname: "Chord of Power",
                toNotesPage: [{
                    name: "Chords of Power Known",
                    note: desc(["The Chords of Power I currently know are listed below."]),
                }],
                extrachoices: [],
                // Number of choices based on Bard level
                extraTimes: [0, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6],
            };

            // Iterate through the external object ChordsPowerLL to populate choices
            Object.keys(ChordsPowerLL).forEach(function (chordKey) {
                var NewChord = ChordsPowerLL[chordKey];

                // 1. Add the key to the list of choices
                chordsOfPower.extrachoices.push(chordKey);

                // Create a copy of the chord object
                var chordCopy = {};
                Object.keys(NewChord).forEach(function (prop) {
                    chordCopy[prop] = NewChord[prop];
                });

                // 2. Add the chord details to the Notes page automatically when selected
                chordCopy.toNotesPage = [{
                    name: NewChord.name,
                    note: Array.isArray(NewChord.description) ? desc(NewChord.description) : "\n   " + NewChord.description,
                    amendTo: "Chords of Power Known",
                }];

                // 3. Define the choice object using the chordKey
                chordsOfPower[chordKey.toLowerCase()] = chordCopy;
            });

            return chordsOfPower;
        })(),
        "magical secrets 3": {
            name: "Magical Secrets",
            source: ["HB", 0],
            minlevel: 3,
            description: "\n   " + "I learn two 1st-level spells from any class spell list" +
                "\n   " + "They become Bard spells but don't count against Spells Known" +
                "\n   " + "I can't replace these spells when I gain a Bard level",
            spellcastingBonus: [{
                name: "Magical Secrets (1st)",
                "class": "any",
                level: [1, 1],
                times: levels.map(function (n) {
                    return n >= 3 ? 2 : 0;
                })
            }]
        },
        "harmonious recovery": {
            name: "Harmonious Recovery",
            source: ["HB", 0],
            minlevel: 3,
            description: "\n   " + "During a short rest, I can spend 10 minutes to regain spell slots" +
                "\n   " + "Total slot levels regained = Cha mod (min 1st-level slot)",
            usages: 1,
            recovery: "long rest"
        },
        "magical secrets 5": {
            name: "Magical Secrets",
            source: ["HB", 0],
            minlevel: 5,
            description: "\n   " + "I learn two 2nd-level spells from any class spell list" +
                "\n   " + "They become Bard spells but don't count against Spells Known",
            spellcastingBonus: [{
                name: "Magical Secrets (2nd)",
                "class": "any",
                level: [2, 2],
                times: levels.map(function (n) {
                    return n >= 5 ? 2 : 0;
                })
            }]
        },
        "bardic virtuoso": {
            name: "Bardic Virtuoso",
            source: ["HB", 0],
            minlevel: 7,
            description: "\n   " + "I add double proficiency bonus to ability checks with musical instruments" +
                "\n   " + "With a bonus action, I can continue a Chord without expending a Bardic Inspiration Die"
        },
        "magical secrets 9": {
            name: "Magical Secrets",
            source: ["HB", 0],
            minlevel: 9,
            description: "\n   " + "I learn two 3rd-level spells from any class spell list" +
                "\n   " + "They become Bard spells but don't count against Spells Known",
            spellcastingBonus: [{
                name: "Magical Secrets (3rd)",
                "class": "any",
                level: [3, 3],
                times: levels.map(function (n) {
                    return n >= 9 ? 2 : 0;
                })
            }]
        },
        "font of inspiration": {
            name: "Font of Inspiration",
            source: ["HB", 0],
            minlevel: 10,
            description: "\n   " + "I regain one Bardic Inspiration Die when I roll initiative" +
                "\n   " + "I can use a bonus action to expend a spell slot and regain Bardic Inspiration Dice equal to the slot's level",
            action: [["bonus action", ""]]
        },
        "magical secrets 13": {
            name: "Magical Secrets",
            source: ["HB", 0],
            minlevel: 13,
            description: "\n   " + "I learn two 4th-level spells from any class spell list" +
                "\n   " + "They become Bard spells but don't count against Spells Known",
            spellcastingBonus: [{
                name: "Magical Secrets (4th)",
                "class": "any",
                level: [4, 4],
                times: levels.map(function (n) {
                    return n >= 13 ? 2 : 0;
                })
            }]
        },
        "magical secrets 17": {
            name: "Magical Secrets",
            source: ["HB", 0],
            minlevel: 17,
            description: "\n   " + "I learn two 5th-level spells from any class spell list" +
                "\n   " + "They become Bard spells but don't count against Spells Known",
            spellcastingBonus: [{
                name: "Magical Secrets (5th)",
                "class": "any",
                level: [5, 5],
                times: levels.map(function (n) {
                    return n >= 17 ? 2 : 0;
                })
            }]
        },
        "mythic secrets": {
            name: "Mythic Secrets",
            source: ["HB", 0],
            minlevel: 20,
            description: "\n   " + "I learn one 6th-level and one 7th-level spell from any class spell list" +
                "\n   " + "I can cast each once per long rest at their lowest level",
            spellcastingBonus: [{
                name: "Mythic Secrets (6th)",
                "class": "any",
                level: [6, 6],
                times: 1,
                firstCol: "LR"
            }, {
                name: "Mythic Secrets (7th)",
                "class": "any",
                level: [7, 7],
                times: 1,
                firstCol: "LR"
            }]
        }
    }
};

// ==============================
// Bardic Traditions
// ==============================

AddSubClass("bard(laserllama)", "fool", {
    regExpSearch: /fool/i,
    subname: "Fool",
    source: [["GMB:LL", 0]],
    features: {
        "satirical theatrics": {
            name: "Satirical Theatrics",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            spellcastingBonus: {
                name: "Satirical Theatrics",
                spells: ["vicious mockery"],
                selection: ["vicious mockery"],
                times: 1
            },
            description: desc([
                "Gain proficiency in Acrobatics, Performance, or Sleight of Hand",
                "Learn the vicious mockery cantrip (or another Bard cantrip if already known)"
            ]),
            skillstxt: "Satirical Theatrics: Choose one of Acrobatics, Performance, or Sleight of Hand"
        },
        "cutting words": {
            name: "Cutting Words",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "When a creature that can hear me and understand me within 30 ft",
                "I can use my reaction and expend a Bardic Inspiration Die, ",
                "I roll it and subtract the result from the target's roll.",
                "I can use this reaction after the target rolls but before the outcome is determined."
            ]),
            action: [["reaction", ""]],
        },
        "tumbling fool": {
            name: "Tumbling Fool",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "As a bonus action, I begin Tumbling: I gain +10 ft speed, climb speed = walk speed",
                "Opportunity attacks have disadvantage against me",
                "Move through creatures' spaces without penalty",
                "Reduce falling damage by Bard level + Dex mod (minimum 1)",
            ]),
            action: [["bonus action", "Tumbling"]]
        },
        "tumbling strike": {
            name: "Tumbling Strike",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "When I hit a creature with melee weapon attack while Tumbling, deal extra damage",
                "Or force target to make Dexterity save, on fail it falls prone.",
                "Creatures at least one size larger than me automatically succeed on saving throws against falling prone."
            ]),
            additional: levels.map(function (n) {
                if (n < 5) return "";
                if (n < 11) return "one Bardic Inspiration Die extra damage";
                if (n < 15) return "Two Bardic Inspiration Dice extra damage";
                if (n > 14) return "Three Bardic Inspiration Dice extra damage";
            })
        },
        "wondrous tumbler": {
            name: "Wondrous Tumbler",
            source: [["GMB:LL", 0]],
            minlevel: 11,
            description: desc([
                "When beginning Tumbling, I can turn invisible and teleport 30 ft",
                "Remaining invisible until end of turn or until I cast a spell, attack, or touch a creature",
                "When I have no uses left, I can expend a Bardic Inspiration Die to use it again"
            ]),
            uses: 1,
            limfeaname: "Wondrous Tumbler",
            recovery: "short rest",
        },
        "fool's luck": {
            name: "Fool's Luck",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "When missing with attack or failing a save, I can choose to regain one expended Bardic Inspiration Die",
            ]),
            limfeaname: "Fool's Luck",
            recovery: "long rest",
            usagescalc: "event.value = Math.max(1, What('Cha Mod'));",
        }
    }
});

AddSubClass("bard(laserllama)", "loremaster", {
    regExpSearch: /loremaster/i,
    subname: "Loremaster",
    source: [["GMB:LL", 0]],
    features: {
        "bardic lore": {
            name: "Bardic Lore",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "When learning Magical Secrets spells, learn three instead of two",
                "Gain proficiency in Arcana, History, Medicine, Nature, or Religion",
                "Use Charisma for these skill checks"
            ]),
            skillstxt: "Bardic Lore: Choose one of Arcana, History, Medicine, Nature, or Religion",
            addMod: [
                {
                    type: "skill",
                    field: "Arcana",
                    mod: "max(Cha-Int|0)",
                    text: "I can replace Intelligence (Arcana) checks with Charisma (Arcana)",
                },
                {
                    type: "skill",
                    field: "History",
                    mod: "max(Cha-Int|0)",
                    text: "I can replace Intelligence (History) checks with Charisma (History)",
                },
                {
                    type: "skill",
                    field: "Medicine",
                    mod: "max(Cha-Wis|0)",
                    text: "I can replace Wisdom (Medicine) checks with Charisma (Medicine)",
                },
                {
                    type: "skill",
                    field: "Nature",
                    mod: "max(Cha-Int|0)",
                    text: "I can replace Intelligence (Nature) checks with Charisma (Nature)",
                },
                {
                    type: "skill",
                    field: "Religion",
                    mod: "max(Cha-Int|0)",
                    text: "I can replace Intelligence (Religion) checks with Charisma (Religion)",
                },
            ],

        },
        "magical secrets 3": {
            name: "Magical Secrets",
            source: ["HB", 0],
            minlevel: 3,
            description: "\n   " + "I learn three 1st-level spells from any class spell list" +
                "\n   " + "They become Bard spells but don't count against Spells Known" +
                "\n   " + "I can't replace these spells when I gain a Bard level",
            spellcastingBonus: [{
                name: "Magical Secrets (1st)",
                "class": "any",
                level: [1, 1, 1],
                times: levels.map(function (n) {
                    return n >= 3 ? 3 : 0;
                })
            }]
        },
        "jack of all trades": {
            name: "Jack of All Trades",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            eval: function () { Checkbox('Jack of All Trades', true); },
            removeeval: function () { Checkbox('Jack of All Trades', false); },
            description: desc([
                "Add half proficiency bonus (rounded down) to any ability check without proficiency"
            ])
        },
        "magical secrets 5": {
            name: "Magical Secrets",
            source: ["HB", 0],
            minlevel: 5,
            description: "\n   " + "I learn three 2nd-level spells from any class spell list" +
                "\n   " + "They become Bard spells but don't count against Spells Known",
            spellcastingBonus: [{
                name: "Magical Secrets (2nd)",
                "class": "any",
                level: [2, 2, 2],
                times: levels.map(function (n) {
                    return n >= 5 ? 3 : 0;
                })
            }]
        },
        "potent performer": {
            name: "Potent Performer",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "When casting Bard spell that deals damage or restores HP, add Bardic Inspiration Die to amount",
                "Whenever I roll a Bardic Inspiration Die, I roll twice and choose result"
            ])
        },
        "magical secrets 9": {
            name: "Magical Secrets",
            source: ["HB", 0],
            minlevel: 9,
            description: "\n   " + "I learn three 3rd-level spells from any class spell list" +
                "\n   " + "They become Bard spells but don't count against Spells Known",
            spellcastingBonus: [{
                name: "Magical Secrets (3rd)",
                "class": "any",
                level: [3, 3, 3],
                times: levels.map(function (n) {
                    return n >= 9 ? 3 : 0;
                })
            }]
        },
        "peerless skill": {
            name: "Peerless Skill",
            source: [["GMB:LL", 0]],
            minlevel: 11,
            description: desc([
                "When missing attack or failing check/save, I can expend a Bardic Inspiration Die",
                "I roll it and add the result to the roll possibly turning failure into success"
            ])
        },
        "magical secrets 13": {
            name: "Magical Secrets",
            source: ["HB", 0],
            minlevel: 13,
            description: "\n   " + "I learn three 4th-level spells from any class spell list" +
                "\n   " + "They become Bard spells but don't count against Spells Known",
            spellcastingBonus: [{
                name: "Magical Secrets (4th)",
                "class": "any",
                level: [4, 4, 4],
                times: levels.map(function (n) {
                    return n >= 13 ? 3 : 0;
                })
            }]
        },
        "wondrous success": {
            name: "Wondrous Success",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "When adding Bardic Inspiration Die to creature's roll, can replace d20 with Bard level",
                "If this roll causes it to find success, it does so in an overtly magical way",
                "Use once per short or long rest"
            ]),
            usages: 1,
            recovery: "short rest",
            limfeaname: "Wondrous Success"
        },
        "magical secrets 17": {
            name: "Magical Secrets",
            source: ["HB", 0],
            minlevel: 17,
            description: "\n   " + "I learn three 5th-level spells from any class spell list" +
                "\n   " + "They become Bard spells but don't count against Spells Known",
            spellcastingBonus: [{
                name: "Magical Secrets (5th)",
                "class": "any",
                level: [5, 5, 5],
                times: levels.map(function (n) {
                    return n >= 17 ? 3 : 0;
                })
            }]
        },
    }
});

AddSubClass("bard(laserllama)", "skald", {
    regExpSearch: /skald/i,
    subname: "Skald",
    source: [["GMB:LL", 0]],
    features: {
        "bardic warrior": {
            name: "Bardic Warrior",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with all martial weapons, shields, and heavy armor",
                "I can use weapon or shield as spellcasting focus for Bard spells",
                "Maximum hit points increase by 3, +1 per Bard level"
            ]),
            calcChanges: {
                hp: function (totalHD) {
                    if (classes.known['bard(laserllama)'] && classes.known['bard(laserllama)'].level >= 3) {
                        return [classes.known['bard(laserllama)'].level, "Bardic Warrior"];
                    }
                }
            },
            armorProfs: [true, true, true, true],
            weaponProfs: [true, true, ["martial"]]
        },
        "combat inspiration": {
            name: "Combat Inspiration",
            source: [["GMB:ll", 0]],
            minlevel: 3,
            description: desc([
                "When adding Bardic Inspiration Die to creature's weapon attack that hits",
                "it adds one Bardic Inspiration Die to that attack's damage roll",
                "Also, when I miss with weapon attack, I can expend a Bardic Inspiration Die,",
                "roll it and add the result to the attack roll, possibly turning my miss into a hit"
            ])
        },
        "extra attack": {
            name: "Extra Attack",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "Attack twice instead of once when taking Attack action",
                "If casting spell or performing Chord, can make one weapon attack as bonus action"
            ])
        },
        "gallant charge": {
            name: "Gallant Charge",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "As reaction when rolling initiative, expend Bardic Inspiration Die",
                "Creatures within 30 ft who can hear gain bonus to initiative = die roll"
            ]),
            action: [["reaction", ""]]
        },
        "ringing strikes": {
            name: "Ringing Strikes",
            source: [["GMB:LL", 0]],
            minlevel: 11,
            description: desc([
                "My weapon attacks deal extra thunder damage equal to my Bardic Inspiration Die",
                "I can forgo bonus damage to attack with advantage"
            ])
        },
        "heroic inspiration": {
            name: "Heroic Inspiration",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "When I add a Bardic Inspiration to a creature's roll, I grant it temporary HP equals to my Cha mod",
                "While having these temporary HP, creature's speed increases by 10 ft"
            ])
        }
    }
});

AddSubClass("bard(laserllama)", "blade", {
    regExpSearch: /blade/i,
    subname: "Blade",
    source: [["GMB:LL", 0]],
    features: {
        "elegant duelist": {
            name: "Elegant Duelist",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "Gain proficiency with scimitars and Performance skill",
                "Can use melee weapons as spellcasting focus",
                "I can use Dex instead of Cha when I do Performance checks that incorporate a deadly blade"
            ]),
            skillstxt: "Elegant Duelist: Performance skill proficiency",
            skills: ["Performance"],
            weaponProfs: [false, false, ["scimitar"]]
        },
        "fighting style": {
            name: "Fighting Style",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "Choose a Fighting Style by the 'Choose Feature' button"
            ]),
            extrachoices: ["Classical Swordplay", "Dueling", "Dual Wielding", "Featherweight Fighting", "Thrown Weapon Fighting", "Versatile Fighting"],
            extraname: "Fighting Style",
            "classical swordplay": FightingStylesLL.classical,
            "dueling": FightingStylesLL.dueling,
            "dual wielding": FightingStylesLL.dual_wielding,
            "featherweight fighting": FightingStylesLL.featherweight,
            "thrown weapon fighting": FightingStylesLL.thrown,
            "versatile fighting": FightingStylesLL.versatile,
        },
        "blade exploits": (function () {
            // Definizione attributi fissi della feature
            var BladeExploitsObj = {
                name: "Blade Exploits",
                source: [["GMB:LL", 0]],
                minlevel: 3,
                description: desc([
                    "I learn Martial Exploits from the Alternate Fighter, limited by my Bard level.",
                    "I must expend a Bardic Inspiration Die to use an Exploit.",
                    "I can only use one Exploit per ability check, attack, or saving throw.",
                    "When an Exploit refers to an Exploit Die, I use my Bardic Inspiration Die instead.",
                    "Exploit save DC = 8 + Proficiency Bonus + Dexterity modifier."
                ]),
                toNotesPage: [{
                    name: "Blade Exploits",
                    note: desc(["Below are the Martial Exploits I know via the Blade tradition."])
                }],
                // Tabella Exploits Known: [0, 0, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7]
                extraTimes: [0, 0, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7],
                extraname: "Blade Exploit",
                extrachoices: []
            };

            // Filtriamo gli exploit dell'Alternate Fighter (fighter(laserllama))
            // Nota: SpellsList deve contenere gli exploit definiti come "isExploit: true"
            var FighterExploits = Object.keys(SpellsList).filter(function (key) {
                var s = SpellsList[key];
                return s.isExploit && s.classes && s.classes.indexOf("fighter(laserllama)") !== -1;
            });

            // Iteriamo sugli exploit filtrati per aggiungerli alle scelte
            FighterExploits.forEach(function (key) {
                var NewExploit = SpellsList[key];
                BladeExploitsObj.extrachoices.push(NewExploit.name);

                BladeExploitsObj[key.toLowerCase()] = {
                    name: NewExploit.name,
                    source: NewExploit.source,
                    submenu: NewExploit.submenu,
                    // Prereqeval basato sulla tabella High Degree del Blade
                    // 3rd-6th: 1st degree | 7th-14th: 2nd degree | 15th+: 3rd degree
                    prereqeval: function (v) {
                        var lvl = classes.known['bard(laserllama)'].level;
                        var maxDegree = lvl >= 15 ? 3 : lvl >= 7 ? 2 : 1;
                        return SpellsList[key].level <= maxDegree;
                    },
                    toNotesPage: [{
                        name: NewExploit.name + " [" + (NewExploit.level == 1 ? '1st' : NewExploit.level == 2 ? '2nd' : NewExploit.level == 3 ? '3rd' : NewExploit.level + 'th') + " degree]",
                        note: desc(NewExploit.descriptionFull || NewExploit.description),
                        amendTo: "Blade Exploits"
                    }]
                };
            });

            return BladeExploitsObj;
        })(),
        "extra attack": {
            name: "Extra Attack",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "Attack twice instead of once when taking Attack action",
                "If casting spell or performing Chord, can make one melee attack as bonus action"
            ]),
            action: [["action", "Attack (2 attacks)"]]
        },
        "deadly reprisal": {
            name: "Deadly Reprisal",
            source: [["GMB:LL", 0]],
            minlevel: 11,
            description: desc([
                "When creature hits me with melee attack, I can use my reaction to attack it with advantage",
                "with a melee weapon attack",
                "Whenever I use an Exploit during my action, I can take Dash or Disengage as bonus action"
            ])
        },
        "master of blades": {
            name: "Master of Blades",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "Once per turn, I can use an Exploit without expending Bardic Inspiration Die (rolling a d6 instead)",
                "After a long rest, I can replace one Exploit I know with another"
            ])
        }
    }
});

AddSubClass("bard(laserllama)", "conspirator", {
    regExpSearch: /conspirator/i,
    subname: "Conspirator",
    source: [["GMB:LL", 0]],
    features: {
        "cunning influence": {
            name: "Cunning Influence",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "Gain Deception proficiency and choose two: disguise kits, forgery kits, poisoner's kits, or thieves' tools",
                "When casting Bard spell with verbal component targeting only one creature, only target hears it if it is within 10 feet of me"
            ]),
            skillstxt: "Cunning Influence: Deception skill proficiency",
            skills: ["Deception"],
            extraname: "Cunning Influence",
            extraTimes: 2,
            extrachoices: ["Disguise", "Forgery", "Poisoner", "Thieves"],
            "disguise": {
                name: "Disguise Kit",
                source: [["GMB:LL", 0]],
                toolProfs: [["Disguise Kit"]]
            },
            "forgery": {
                name: "Forgery Kit",
                source: [["GMB:LL", 0]],
                toolProfs: [["Forgery Kit"]]
            },
            "poisoner": {
                name: "Poisoner's Kit",
                source: [["GMB:LL", 0]],
                toolProfs: [["Poisoner's Kit"]]
            },
            "thieves": {
                name: "Thieves' Tools",
                source: [["GMB:LL", 0]],
                toolProfs: [["Thieves' Tools"]]
            }

        },
        "psychic assault": {
            name: "Psychic Assault",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "When I hit with weapon attack, I can expend a Bardic Inspiration Die to deal bonus psychic damage equal to two rolls of the Bardic Inspiration Die"
            ])
        },
        "seeds of terror": {
            name: "Seeds of Terror",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "After speaking with a creature for 1 minute, I can expend a Bardic Inspiration Die",
                "Target must make Wisdom save or be frightened of creature you choose for 1 hour",
                "and it treats it as its enemy",
                "This effect ends if the frightened target or its allies are attacked or damaged by me or my allies.",
                "The target is unaware that I attempted to influence its thoughts, regardless of the saving throw's result."
            ])
        },
        "devious strike": {
            name: "Devious Strike",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: levels.map(function (n) {
                if (n < 5) return "";
                if (n < 11) return desc([
                    "When I hit with weapon attack, I can deal extra psychic damage equal to one Bardic Inspiration Die",
                    "Increases to 2 rolls at 11th level, 3 rolls at 15th level"
                ]);
                if (n < 15) return desc([
                    "When I hit with weapon attack, I can deal extra psychic damage equal to two Bardic Inspiration Dice",
                    "Increases to 3 rolls at 15th level"
                ]);
                if (n > 14) return desc([
                    "When I hit with weapon attack, I can deal extra psychic damage equal to three Bardic Inspiration Dice"
                ]);
            })
        },
        "stolen visage": {
            name: "Stolen Visage",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "When humanoid dies within 30 ft, I can use a reaction to capture its Visage",
                "As action, consume Visage to transform into that humanoid for 1 hour",
                "gaining access to any memories and information that it would have shared with a casual acquaintance",
                "A creature can make a Wisdom (Insight) check against my Charisma (Deception) check to see through the Visage",
                "I can have only one Visage at a time, and I lose it if I die or trap another one"
            ]),
            action: [["reaction", "Capture Visage"], ["action", "Use/End Visage"]]
        },
        "mental anguish": {
            name: "Mental Anguish",
            source: [["GMB:LL", 0]],
            minlevel: 11,
            description: desc([
                "When I use Psychic Assault, target must make Wisdom save against my Spell DC or be frightened of me",
                "When I hit a frightened target with weapon attack, I can end the frightened condition to turn the weapon attack into an automatic critical hit"
            ])
        },
        "sinister manipulation": {
            name: "Sinister Manipulation",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "I can use Seeds of Terror as action. On failure, I can forgo its normal effets to make the target believe I know its darkest secret",
                "When I do, the target is charmed by me indefinitely or until me or my allies act with hostility against it,",
                "and it will secretly aid you in any way it can, short of directly fighting or risking its life for you",
                "I can have only one target charmed by this feature at a time, and I attempting to charm another target with this feature ends the previous charm"
            ]),
            action: [["action", "Seeds of Terror"]]
        }
    }
});

AddSubClass("bard(laserllama)", "counselor", {
    regExpSearch: /counselor/i,
    subname: "Counselor",
    source: [["GMB:LL", 0]],
    features: {
        "bardic counsel": {
            name: "Bardic Counsel",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain History proficiency",
                "Treat d20 rolls of 7 or lower as 8 for Intelligence (History) checks related to local law",
                "I also gain proficiency in either Deception or Persuasion. If I am already proficient in the chosen skill I can add double my proficiency bonus to my roll."
            ]),
            skillstxt: "Bardic Counsel: History and choose one between Deception and Persuasion, if already proficient in the chosen skill, add double proficiency bonus instead",
            skills: ["History"],
        },
        "cutting logic": {
            name: "Cutting Logic",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "When creature within 30 ft that can hear and understand me must make saving throw by a creature other than yourself",
                "I can use a reaction to expend a Bardic Inspiration Die, roll it and subtract the result from the save",
                "I can use this reaction before I know the save result."
            ]),
            action: [["reaction", ""]]
        },
        "potent advice": {
            name: "Potent Advice",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "If using Bardic Inspiration reaction and creature still fails, Bardic Inspiration Die is not expended"
            ])
        },
        "confounding logic": {
            name: "Confounding Logic",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "As action, creature within 30 ft that can hear and understand me, must make Int save",
                "On failure, take psychic damage, cannot take reactions, and speed halved, until the start of my next turn"
            ]),
            additional: levels.map(function (n) {
                if (n < 5) return "";
                if (n < 11) return "1 Bardic Inspiration Die psychic damage";
                if (n < 15) return "2 Bardic Inspiration Dice psychic damage";
                if (n > 14) return "3 Bardic Inspiration Dice psychic damage";
            }),
            action: [["action", ""]]
        },
        "elder tongue": {
            name: "Elder Tongue",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "As action, creatures able to speak at least one language within 60 ft understand me as if speaking their native tongue for 1 hour",
                "If I have no uses I can expend 2nd-level+ spell slot to use it again"
            ]),
            action: [["action", ""]],
            usages: 1,
            recovery: "long rest"
        },
        "reliable counsel": {
            name: "Reliable Counsel",
            source: [["GMB:LL", 0]],
            minlevel: 11,
            description: desc([
                "When making Intelligence check to recall information or Charisma check to convince, replace d20 with Bard level"
            ])
        },
        "peerless inspiration": {
            name: "Peerless Inspiration",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "When using Bardic Inspiration reaction, use maximum value instead of rolling",
            ]),
            additional: "Cha Mod times per long rest",
            usagescalc: "event.value = Math.max(1, What('Cha Mod'));",
            recovery: "long rest",
            limfeaname: "Peerless Inspiration"
        }
    }
});

AddSubClass("bard(laserllama)", "mesmer", {
    regExpSearch: /mesmer/i,
    subname: "Mesmer",
    source: [["GMB:LL", 0]],
    features: {
        "glamorous mantle": {
            name: "Glamorous Mantle",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "As bonus action, expend Bardic Inspiration Die, roll it",
                "Creatures within 30 ft (up to Cha mod) gain temporary HP equal to the roll,",
                "then they can move up to their speed without provoking opportunity attacks"
            ]),
            action: [["bonus action", ""]]
        },
        "mesmerizing presence": {
            name: "Mesmerizing Presence",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "Learn friends, charm person, and command spells (don't count against Spells Known)",
                "Always know Enthralling Performance (doesn't count against Chords Known)"
            ]),
            spellcastingBonus: [{
                name: "Mesmerizing Presence",
                spells: ["friends", "charm person", "command"],
                selection: ["friends", "charm person", "command"],
                times: 3
            }],
            bonusId: "enthralling performance"
        },
        "otherworldly visage": {
            name: "Otherworldly Visage",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "My Glamorous Mantle lasts up to 1 minute, or until incapacitated or ending it as a bonus action",
                "As bonus action during Mantle: I can cast charm person/command without slot (but last until end of Mantle),",
                "or grant temp HP equal to Bardic Inspiration Die to a target creature",
                "The target of spells or temp HP must be within 30 ft and must can hear or see me"
            ])
        },
        "reflexive charm": {
            name: "Reflexive Charm",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "When a creature hits me with an attack, I can expend Bardic Inspiration Die,",
                "roll it and add the result to my AC against that attack",
                "When my Glamorous Mantle is active, I can use it without expending a die"
            ]),
            action: [["reaction", ""]]
        },
        "mantle of protection": {
            name: "Mantle of Protection",
            source: [["GMB:LL", 0]],
            minlevel: 11,
            description: desc([
                "While Glamorous Mantle is active or I'm performing a Chord, creatures within 30 ft have:",
                "- Advantage on saves against charmed, frightened, paralyzed, stunned",
                "- See through illusions of level equal to my Cha mod or lower",
                "When rolling initiative, I can use reaction and expend a Bardic Inspiration Die, to activate Glamorous Mantle"
            ])
        },
        "majestic presence": {
            name: "Majestic Presence",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "When casting enchantment spell on creature within 30 ft that can see me,",
                "I can expend a Bardic Inspiration Die for to give disadvantage on its save",
                "If Glamorous Mantle active, I don't expend the die"
            ])
        }
    }
});

AddSubClass("bard(laserllama)", "true singer", {
    regExpSearch: /true singer/i,
    subname: "True Singer",
    source: [["GMB:LL", 0]],
    features: {
        "bardic inspiration": {
            name: "Bardic Inspiration",
            source: ["HB", 0],
            minlevel: 1,
            description: "\n   " + "As a reaction when a creature in 30 ft fails an attack/save or makes an ability check, I can expend a Bardic Inspiration Die" +
                "\n   " + "The target adds the die result to their roll possibly turning a failure into a success",
            additional: ["d4", "d4", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12"],
            usagescalc: "event.value = Math.ceil(classes.known['bard(laserllama)'].level / 2) + What('Cha Mod');",
            recovery: "short rest",
            action: [["reaction", ""]]
        },
        "creator's song": {
            name: "Creator's Song",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "As action, sing and create inanimate object no larger than hand within 10 ft",
                "Object is visibly magical, has HP = Bard level, AC = Cha score",
                "Lasts 1 hour or until reduced to 0 HP",
                "Expend spell slot to create larger objects"
            ]),
            action: [["action", ""]]
        },
        "true inspiration": {
            name: "True Inspiration",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "My Bardic Inspiration die is increased by one size (See Bardic Inspiration feature)",
            ])
        },
        "dancing creation": {
            name: "Dancing Creation",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: function () {
                var level = classes.known['bard(laserllama)'] ? classes.known['bard(laserllama)'].level : 0;
                var durationText = level >= 15
                    ? "It becomes a Living Object until it is destroyed or I animate a new one."
                    : "It becomes a Living Object for 1 minute, until it has 0 HP, or until I die.";

                return desc([
                    "As an action, I can animate a Large or smaller nonmagical object I can see within 30 ft.",
                    durationText,
                    "It is friendly to me and my allies and obeys my mental commands (no action required).",
                    "In combat, it shares my initiative but takes its turn immediately after mine.",
                    "It can move and use its reaction on its own, but only takes the Dodge action unless I use a Bonus Action to command it to take an action in its stat block or another action.",
                    "I can use this once per Long Rest, or by expending a 2nd-level spell slot or higher."
                ]);
            },
            usages: 1,
            recovery: "long rest",
            creaturesAdd: [["Living Object"]],
            creatureOptions: [{
                name: "Living Object",
                source: [["GMB:LL", 0]],
                size: 3, // Medium
                type: "Construct",
                alignment: "Chaotic Good",
                ac: "10+Cha+Prof",
                hp: 20,
                hd: [1, 10],
                speed: "30 ft, fly 30 ft (hover)",
                scores: [12, 16, 16, 2, 4, 8],
                saves: ["", "", "", "", "", ""],
                damage_immunities: "poison, psychic",
                condition_immunities: "charmed, exhausted, poisoned",
                senses: "Blindsight 60 ft (blind beyond this radius)",
                passivePerception: 7,
                languages: "understands the languages of its creator",
                challengeRating: "0",
                proficiencyBonus: 2,
                proficiencyBonusLinked: true,
                attacksAction: 1,
                attacks: [{
                    name: "Slam",
                    ability: 6,
                    damage: [1, 8, "bludgeoning"],
                    modifiers: ["Cha", ""],
                    range: "Melee (5 ft)",
                    description: "Magical bludgeoning damage. On hit: target Wisdom save or speed halved until start of my next turn.",
                    abilitytodamage: false
                }],
                features: [{
                    name: "Creator's Bond",
                    description: "The object adds my Proficiency Bonus to any ability check or saving throw it makes."
                }, {
                    name: "Enchanting Touch",
                    description: "Once per turn, when the object hits with Slam, the target must succeed on a Wisdom save (my Spell Save DC) or its speed is halved until the start of my next turn as it dances."
                }, {
                    name: "Lively Dance",
                    description: "If the object makes a Dexterity check or saving throw, it gains a bonus to the roll equal to one roll of my Bardic Inspiration Die."
                }],
                calcChanges: {
                    hp: function (totalHD, HDobj, prefix) {
                        if (!classes.known['bard(laserllama)']) return;
                        var brdLvl = classes.known['bard(laserllama)'].level;
                        var totalHp = 5 + (5 * brdLvl);
                        HDobj.alt.push(totalHp);
                        HDobj.altStr.push(" = 5 as a base\n + 5 \xD7 " + brdLvl + " from five times my Bard level (" + (5 * brdLvl) + ")");
                    },
                    setAltHp: true,
                    atkAdd: [
                        function (fields, v) {
                            if (v.theAtkName === "slam" && classes.known['bard(laserllama)']) {
                                var bLvl = classes.known['bard(laserllama)'].level;
                                var die = bLvl < 5 ? 6 : bLvl < 11 ? 8 : bLvl < 17 ? 10 : 12;
                                var trueDie = bLvl < 3 ? "d6" : bLvl < 5 ? "d8" : bLvl < 11 ? "d10" : "d12";
                                fields.Damage_Die = "1" + trueDie;
                            }
                        },
                        "My Living Object's Slam damage uses my Bardic Inspiration Die."
                    ]
                }
            }]
        },
        "moving inspiration": {
            name: "Moving Inspiration",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "When a creature uses one of my Bardic Inspiration dice, it can move up to 15 ft.",
                "This movement occurs immediately after the triggering roll is resolved.",
                "This movement does not provoke opportunity attacks."
            ])
        },
        "wondrous chords": {
            name: "Wondrous Chords",
            source: [["GMB:LL", 0]],
            minlevel: 11,
            description: desc([
                "When performing a Chord of Power, I can perform two known Chords simultaneously",
                "expend Bardic Inspiration Die for both Chords",
                "While I perform two Chords this way, I can use Bardic Virtuoso to continue both with one bonus action"
            ])
        },
        "true song": {
            name: "True Song",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "I learn the Awaken spell, and it doesn't count against my number of spells known.",
                "I can cast it without material components. Once I do, I can't do so again for 1d4 long rests.",
                "My Dancing Creation remains animated until it is destroyed or I animate a new one.",
                "If I cast Awaken on my Living Object, it becomes a sentient, independent creature.",
                "If I use my Creator's Song (10-minute ritual) and a 5th-level spell slot, the object I animate becomes permanent until destroyed."
            ]),
            spellcastingBonus: {
                name: "True Song",
                spells: ["awaken"],
                selection: ["awaken"],
                times: 1
            },
            limfeaname: "True Song (1d4 LR)",
            usages: 1,
        },
    }
});