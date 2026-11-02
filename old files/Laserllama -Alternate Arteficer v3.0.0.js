
var iFileName = "LaserLlama - Alternate Artificer v3.0.0.js";
RequiredSheetVersion("13.0.6");
// Laserllama's Artificer Spells list
[
    // Cantrips (0 Level)
    "acid splash", "booming blade", "create bonfire", "fire bolt", "frostbite",
    "green-flame blade", "light", "lightning lure", "mage hand", "poison spray",
    "prestidigitation", "ray of frost", "shocking grasp", "tempestuous blade",
    "thorn whip", "thunderclap",
    // 1st Level  
    "absorb elements", "alarm", "catapult", "caustic brew", "color spray",
    "cure wounds", "disguise self", "ensnaring strike", "expeditious retreat",
    "faerie fire", "false life", "feather fall", "fog cloud", "grease",
    "heroism", "identify", "jump", "magic missile", "sleep", "witch bolt",
    // 2nd Level  
    "aid", "blur", "continual flame", "cordon of arrows", "darkvision",
    "earthbind", "enhance ability", "enlarge/reduce", "heat metal",
    "invisibility", "levitate", "lock/unlock", "magic mouth", "magic weapon",
    "pyrotechnics", "restoration", "rope trick", "see invisibility",
    "skywrite", "spider climb", "web",
    // 3rd Level
    "blink", "catnap", "create food and water", "daylight", "dispel magic",
    "elemental weapon", "flame arrows", "fly", "glyph of warding", "haste",
    "intellect fortress", "life transference", "lightning arrow",
    "protection from energy", "revivify", "sending", "slow", "tiny servant",
    "water breathing",
    // 4th Level
    "arcane eye", "dimension door", "elemental bane", "fabricate",
    "faithful hound", "freedom of movement", "greater invisibility",
    "resilient sphere", "secret chest", "stone shape", "summon construct",
    // 5th Level
    "animate objects", "arcane hand", "awaken", "creation", "far step",
    "passwall", "skill empowerment", "transmute rock", "wall of light",
    "wall of stone"
].forEach(function (s) { if (SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("artificer(laserllama)") === -1) SpellsList[s].classes.push("artificer(laserllama)"); });

ClassList["artificer(laserllama)"] = {
    name: "Artificer(Laserllama)",
    regExpSearch: /^(?=.*artificer)(?=.*laserllama).*$/i,
    source: ["GMB:LL", 0],
    primaryAbility: "Intelligence",
    prereqs: "Intelligence 13",
    improvements: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
    die: 8,
    abilitySave: 4,
    spellcastingFactor: 2,
    spellcastingList: {
        class: "artificer(laserllama)",
        level: [0, 5],
    },
    spellcastingTable: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0], // lvl 0
        [2, 0, 0, 0, 0, 0, 0, 0, 0], // lvl 1
        [3, 0, 0, 0, 0, 0, 0, 0, 0], // lvl 2
        [3, 0, 0, 0, 0, 0, 0, 0, 0], // lvl 3
        [4, 2, 0, 0, 0, 0, 0, 0, 0], // lvl 4
        [4, 2, 0, 0, 0, 0, 0, 0, 0], // lvl 5
        [4, 3, 2, 0, 0, 0, 0, 0, 0], // lvl 6
        [4, 3, 2, 0, 0, 0, 0, 0, 0], // lvl 7
        [4, 3, 3, 0, 0, 0, 0, 0, 0], // lvl 8
        [4, 3, 3, 0, 0, 0, 0, 0, 0], // lvl 9
        [4, 3, 3, 0, 0, 0, 0, 0, 0], // lvl 10
        [4, 3, 3, 0, 0, 0, 0, 0, 0], // lvl 11
        [4, 3, 3, 0, 0, 0, 0, 0, 0], // lvl 12
        [4, 3, 3, 1, 0, 0, 0, 0, 0], // lvl 13
        [4, 3, 3, 1, 0, 0, 0, 0, 0], // lvl 14
        [4, 3, 3, 2, 0, 0, 0, 0, 0], // lvl 15
        [4, 3, 3, 2, 0, 0, 0, 0, 0], // lvl 16
        [4, 3, 3, 3, 1, 0, 0, 0, 0], // lvl 17
        [4, 3, 3, 3, 1, 0, 0, 0, 0], // lvl 18
        [4, 3, 3, 3, 2, 0, 0, 0, 0], // lvl 19
        [4, 3, 3, 3, 2, 0, 0, 0, 0]  // lvl 20
    ],
    spellcastingKnown: {
        cantrips: [0, 0, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        spells: "list",
        spells: [
            "", 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
        ],
        prepared: false,
    },
    saves: ["Con", "Int"],
    skillstxt: {
        primary: "Choose two from Arcana, History, Insight, Investigation, Medicine, Nature, Sleight of Hand"
    },
    armorProfs: {
        primary: [true, true, false, true],
        secondary: [true, true, false, true],
    },
    weaponProfs: {
        primary: [true, false, ["hand crossbow"]],
        secondary: [true, false, ["hand crossbow"]],
    },
    toolProfs: {
        primary: [["Tinker's tools", 1], ["Artisan's tools", 1]]
    },
    equipment: "Artificer starting equipment:" +
        "\n - Tinker's tools and a set of artisan's tools of your choice" +
        "\n - One simple weapon and a light crossbow with 20 bolts" +
        "\n - (a) studded leather or (b) scale mail" +
        "\n - (a) dungeoneer's pack or (b) scholar's pack" +
        "\n\nAlternatively, choose 5d4 x 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
    subclasses: ["Artificer Specialization", []],
    attacks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    features: {
        // infusions feature added at the end of the core class
        "infusions": (function () {
            var InfusionFeature = {
                name: "Infusions",
                minlevel: 1,
                source: [["GMB:LL", 0]],
                description: desc([
                    "I learn Infusions that allow me to imbue objects with magical properties",
                    'Use the "Choose Feature" button above to choose Infusions',
                    "During a long rest, I can replace one known Infusion with another",
                    "I can infuse one object per Infusion known at the end of each long rest",
                    "I can also use Infusions to replicate magic items I've studied"
                ]),
                toNotesPage: [{
                    name: "Infusions Known",
                    note: desc([
                        "Below are all Infusions I know. During a long rest, I can replace one Infusion I know with another Infusion I meet the prerequisites for.",
                        "I can have one infused object per Infusion known at a time."
                    ]),
                }],
                extraname: "Artificer Infusions",
                extraTimes: [2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 8, 8],
                extrachoices: [],
                additional: [
                    "2 Infusions known",
                    "3 Infusions known",
                    "3 Infusions known",
                    "3 Infusions known",
                    "4 Infusions known",
                    "4 Infusions known",
                    "4 Infusions known",
                    "5 Infusions known",
                    "5 Infusions known",
                    "5 Infusions known",
                    "6 Infusions known",
                    "6 Infusions known",
                    "6 Infusions known",
                    "7 Infusions known",
                    "7 Infusions known",
                    "7 Infusions known",
                    "8 Infusions known",
                    "8 Infusions known",
                    "8 Infusions known",
                    "8 Infusions known",
                ],
            };

            // Aggiungi infusioni standard da InfusionsLL
            var InfusionsKeys = Object.keys(InfusionsLL);
            for (var i = 0; i < InfusionsKeys.length; i++) {
                var infusionKey = InfusionsKeys[i];
                var infusionData = InfusionsLL[infusionKey];

                InfusionFeature.extrachoices.push(infusionKey);

                InfusionFeature[infusionKey] = {
                    name: infusionData.name,
                    toNotesPage: [{
                        name: infusionData.name + " Infusion",
                        note: infusionData.description,
                        amendTo: "Infusions Known"
                    }],
                    source: infusionData.source,
                    action: infusionData.action,
                    prereqeval: infusionData.prereqeval,
                    usages: infusionData.usages,
                    recovery: infusionData.recovery,
                    additional: infusionData.additional,
                    magicitemsAdd: infusionData.magicitemsAdd
                };
            }

            return InfusionFeature;
        })(),
        "magical tinker": {
            name: "Magical Tinker",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            description: desc([
                "I can use tinker's tools to cast mending cantrip and detect magic/identify as rituals",
                "My tools are the spellcasting focus and replace material components",
                "Time to craft magic items is halved when proficient with appropriate artisan's tools"
            ]),
            spellcastingBonus: {
                name: "Magical Tinker",
                spells: ["mending", "detect magic", "identify"],
                selection: ["mending", "detect magic", "identify"],
            },
            spellChanges: {
                "detect magic": {
                    ritual: true,
                    changes: "I can cast this spell as ritual thanks to my Magical Tinker feature"
                },
                "identify": {
                    ritual: true,
                    changes: "I can cast this spell as ritual thanks to my Magical Tinker feature"
                },

            }
        },
        "spellcasting": {
            name: "Spellcasting",
            source: [["GMB:LL", 0]],
            minlevel: 2,
            description: desc([
                "I can cast prepared Artificer spells using Intelligence as my spellcasting ability",
                "I prepare spells equal to Int mod + half Artificer level (rounded down)",
                "I can use tools or infused items as spellcasting focus"
            ]),
            additional: levels.map(function (n) {
                var spellsKnown = n < 3 ? 2 : n < 5 ? 3 : n < 7 ? 4 : n < 9 ? 5 : n < 11 ? 6 : n < 13 ? 7 : n < 15 ? 8 : n < 17 ? 9 : n < 19 ? 10 : 11;
                return spellsKnown + " spells known";
            })
        },
        "tinker's insight": {
            name: "Tinker's Insight",
            source: [["GMB:LL", 0]],
            minlevel: 2,
            description: desc([
                "I can attune to and use any magic item regardless of requirements",
                "I can use my Artificer spell save DC in place of a magic item's DC"
            ])
        },
        "arcane recharge": {
            name: "Arcane Recharge",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "During a short rest, I can recover spell slots of combined level equal to Int mod",
                "After 11th level, I can use this to recharge one infused or magic item instead"
            ]),
            usages: "1 per",
            recovery: "long rest"
        },
        "subclassfeature3": {
            name: "Artificer Specialization",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc('Choose an Artificer Specialization and put it in the "Class" field')
        },
        "flash of genius": {
            name: "Flash of Genius",
            source: [["GMB:LL", 0]],
            minlevel: 6,
            description: desc([
                "As a reaction when I or a creature within 30ft makes an ability check/saving throw",
                "I can add my Intelligence modifier to that roll"
            ]),
            usages: "Int mod per",
            usagescalc: "event.value = Math.max(1, What('Int Mod'));",
            recovery: "long rest",
            action: [["reaction", ""]]
        },
        "expert tinker": {
            name: "Expert Tinker",
            source: [["GMB:LL", 0]],
            minlevel: 7,
            description: desc([
                "I add double proficiency bonus to ability checks with tools I'm proficient with",
                "I can infuse magic items with Infusions (bonuses cannot exceed +3)"
            ])
        },
        "magic item mastery": {
            name: "Magic Item Mastery",
            source: [["GMB:LL", 0]],
            minlevel: 9,
            description: levels.map(function (n) {
                if (n < 9) return "";
                var items = n < 14 ? 4 : n < 18 ? 5 : 6;
                return "I can attune to up to " + items + " magic items";
            }),
            additional: levels.map(function (n) {
                if (n < 9) return "";
                var items = n < 14 ? "4 items" : n < 18 ? "5 items" : "6 items";
                return items;
            })
        },
        "masterwork inventions": {
            name: "Masterwork Inventions",
            source: [["GMB:LL", 0]],
            minlevel: 20,
            description: desc([
                "I gain +1 to all saving throws for each magic item I'm attuned to",
                "If reduced to 0 HP, I can end attunement to one item to drop to 1 HP instead"
            ])
        }
    }
};



// Alchemist subclass
AddSubClass("artificer(laserllama)", "alchemist", {
    regExpSearch: /^(?=.*alchemist).*$/i,
    subname: "Alchemist Specialization",
    fullname: "Alchemist Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with alchemist's supplies",
                "If I'm already proficient, I gain proficiency with another set of artisan's tools of my choice"
            ]),
            toolProfs: [["Alchemist's supplies", 1]]
        },
        "subclassfeature3.1": {
            name: "Alchemist Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: ["healing word", "inflict wounds", "acid arrow", "flaming sphere", "gaseous form", "mass healing word", "blight", "death ward", "cloudkill", "reincarnate"]
        },
        "subclassfeature3.2": (function () {
            var ElixirFeature = {
                name: "Alchemical Elixirs",
                source: [["GMB:LL", 0]],
                minlevel: 3,
                description: desc([
                    "I learn to craft potent Elixirs that mimic spell effects",
                    "I gain access to exclusive Elixir Infusions",
                    "During each long rest, I can spend 1 hour to create one copy of each Elixir I know",
                    "Elixirs become inert at the end of my next long rest",
                    "As an action, I can expend a spell slot to create additional Elixirs",
                    "Any creature can use an action to drink, administer, or throw an Elixir (30 ft range)",
                    "Elixirs use my Artificer Spellcasting Ability"
                ]),
                additional: levels.map(function (n) {
                    var extraInfusions = n < 5 ? 1 : n < 9 ? 2 : n < 13 ? 3 : n < 17 ? 4 : 5;
                    return "+" + extraInfusions + " Elixir Infusions";
                }),
                toNotesPage: [{
                    name: "Elixir Infusions Known",
                    note: desc([
                        "Below are all my Elixir Infusions I know.",
                    ]),
                }],
                extraname: "Elixir Infusions",
                extraTimes: ["", "", 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5],
                extrachoices: []
            };

            // Aggiungi infusioni elisir da ElixirInfusionsLL
            var ElixirKeys = Object.keys(ElixirInfusionsLL);
            for (var i = 0; i < ElixirKeys.length; i++) {
                var ElixirKey = ElixirKeys[i];
                var infusionData = ElixirInfusionsLL[ElixirKey];

                ElixirFeature.extrachoices.push(ElixirKey);

                ElixirFeature[ElixirKey] = {
                    name: infusionData.name,
                    toNotesPage: [{
                        name: infusionData.name + " Infusion",
                        note: infusionData.description,
                        amendTo: "Elixir Infusions Known"
                    }],
                    source: infusionData.source,
                    prereqeval: infusionData.prereqeval,
                    additional: infusionData.additional,
                    spellcastingBonusElsewhere: infusionData.spellcastingBonusElsewhere
                };
            }

            return ElixirFeature;
        })(),
        "subclassfeature5": {
            name: "Potent Potions",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "When an Elixir I crafted or an Artificer spell I cast deals acid, fire, necrotic, or poison damage, or restores hit points",
                "I can add my Intelligence modifier (minimum +1) to one damage or healing roll"
            ])
        },
        "subclassfeature10": {
            name: "Restorative Reagents",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "Whenever a creature willingly drinks one of my Elixirs",
                "It gains temporary hit points equal to my Artificer level"
            ]),
            additional: levels.map(function (n) {
                return "+" + n + " temp HP from Elixirs";
            })
        },
        "subclassfeature15": {
            name: "Master Alchemist",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "I am immune to effects from any Elixir I crafted (unless I wish to be affected)",
                "I can take the Use an Object action as a bonus action to create an Elixir"
            ]),
            action: [["bonus action", "Create Elixir"]]
        }
    }
});

// Armorer Subclass
AddSubClass("artificer(laserllama)", "armorer", {
    regExpSearch: /^(?=.*armorer).*$/i,
    subname: "Armorer Specialization",
    fullname: "Armorer Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with smith's tools and in heavy armor",
                "If I'm already proficient with smith's tools, I gain proficiency with another set of artisan's tools of my choice"
            ]),
            toolProfs: [["Smith's tools", 1]],
            armorProfs: [false, false, true, false]
        },
        "subclassfeature3.1": {
            name: "Armorer Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "shield", "thunderwave",
                "mirror image", "shatter",
                "lightning bolt", "thunder step",
                "fire shield", "storm sphere",
                "destructive wave", "wall of force"
            ]
        },
        "subclassfeature3.2": {
            name: "Arcane Armor",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I can modify one set of armor into Arcane Armor during a long rest",
                "Only I can use my Arcane Armor, and I can only have one set at a time",
                "I can don/doff Arcane Armor as an action, deploy/retract helmet as bonus action",
                "Ignore Strength requirements for the armor",
                "Armor cannot be removed against my will",
                "Bonus action to gain temporary HP equal to Intelligence modifier",
                "Thunder Gauntlets: simple weapons, 1d8 thunder damage, use Str or Int",
                "Creatures hit by Thunder Gauntlets have disadvantage attacking others"
            ]),
            action: [
                ["action", "Don/Doff Armor"],
                ["bonus action", "Helmet"],
                ["bonus action", "Temp HP"]
            ],
            usages: "Int mod per ",
            usagescalc: "event.value = Math.max(1, What('Int Mod'));",
            recovery: "short rest",
            additional: "1d8 thunder damage, disadvantage on attacks"
        },
        "subclassfeature5": {
            name: "Extra Attack",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "I can attack twice when I take the Attack action",
                "When I use my action to cast a spell, I can make a Thunder Gauntlet attack as a bonus action"
            ]),
            action: [["bonus action", "Thunder Gauntlet"]]
        },
        "subclassfeature5.1": {
            name: "Modular Armor",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "My Arcane Armor counts as multiple items for Infusions:",
                "- Armor (chest piece)",
                "- Boots",
                "- Helmet",
                "- Thunder Gauntlets (two individual weapons)",
                "Each of these items can bear one Infusion"
            ]),
            additional: "4 infusion slots on armor"
        },
        "subclassfeature10": {
            name: "Armorer Adept",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "My total number of Infusions Known increases by 2",
                "Both additional Infusions must be applied to pieces of my Arcane Armor"
            ]),
            additional: "+2 Infusions (armor only)"
        },
        "subclassfeature15": {
            name: "Master Armorer",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "While wearing Arcane Armor:",
                "- Walking speed increases by 10 feet",
                "- Gain flying speed equal to walking speed",
                "- Thunder Gauntlets deal 2d8 damage on hit"
            ]),
            speed: {
                walk: { bonus: "+10" },
                fly: { spd: "walk" }
            },
            additional: "2d8 thunder damage, flying speed"
        }
    }
});

//Battle Smith Subclass
AddSubClass("artificer(laserllama)", "battle smith", {
    regExpSearch: /^(?=.*battle)(?=.*smith).*$/i,
    subname: "Battle Smith Specialization",
    fullname: "Battle Smith Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with smith's tools and in heavy armor",
                "If I'm proficient with smith's tools, I gain proficiency with another set of artisan's tools",
                "When a creature within 5 feet is targeted by an attack, I can use reaction to impose disadvantage",
                "I must be wielding a shield or melee weapon to use this reaction"
            ]),
            toolProfs: [["Smith's tools", 1]],
            armorProfs: [false, false, true, false],
            action: [["reaction", "Impose Disadvantage"]]
        },
        "subclassfeature3.1": {
            name: "Battle Smith Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "sanctuary", "shield of faith",
                "restoration", "warding bond",
                "aura of vitality", "counterspell",
                "aura of purity", "death ward",
                "circle of power", "mass cure wounds"
            ]
        },
        "subclassfeature3.2": {
            name: "Steel Defender",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I create a loyal Steel Defender construct that obeys my commands",
                "Acts on my turn; use bonus action to command it to take actions",
                "Can bear one Infusion for boots, cloak, gauntlet, helmet, or armor",
                "Choose Humanoid model (proficient with shields, humanoid hands) or",
                "Quadruped model (Large beast, +10 ft speed, can be ridden as mount)",
                "If destroyed, expend spell slot and 1 minute to restore to full HP"
            ]),
            action: [["bonus action", "Command Defender"]],
            creaturesAdd: [
                ["Steel Defender (Humanoid)", false],
                ["Steel Defender (Quadruped)", false]
            ],
            additional: "Construct companion"
        },
        "subclassfeature5": {
            name: "Minor Upgrade",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "My Steel Defender gains one Minor Upgrade of my choice:",
                "Minor Arcanum: Can cast 1st-level Artificer spell 3x per rest",
                "Martial Offense: Rend damage die becomes d10, can make two attacks"
            ]),
            extraname: "Minor Upgrades",
            extrachoices: ["Minor Arcanum", "Martial Offense"],
            "minor arcanum": {
                name: "Minor Arcanum",
                description: "Steel Defender can cast 1st-level Artificer spell 3x per rest",
                additional: "1st-level spell, 3 charges"
            },
            "martial offense": {
                name: "Martial Offense",
                description: "Rend damage die becomes d10, can make two attacks or grapple/shove",
                additional: "2d10 damage or grapple/shove"
            }
        },
        "subclassfeature10": {
            name: "Modular Defender",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "My Steel Defender counts as multiple items for Infusions:",
                "- Torso (armor or cloak)",
                "- Legs (boots)",
                "- Head (helmet)",
                "- Limbs (gauntlet or melee weapon)",
                "Each item can bear one Infusion"
            ]),
            additional: "4 infusion slots on defender"
        },
        "subclassfeature10.1": {
            name: "Greater Upgrade",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "My Steel Defender gains one Greater Upgrade of my choice:",
                "Greater Arcanum: Can cast 2nd-level Artificer spell 3x per rest",
                "Limited Sentience: Int 10, speaks/writes language, follows complex orders",
                "Reinforced Plating: Resistance to bludgeoning, piercing, slashing damage"
            ]),
            extraname: "Greater Upgrades",
            extrachoices: ["Greater Arcanum", "Limited Sentience", "Reinforced Plating"],
            "greater arcanum": {
                name: "Greater Arcanum",
                description: "Steel Defender can cast 2nd-level Artificer spell 3x per rest",
                additional: "2nd-level spell, 3 charges"
            },
            "limited sentience": {
                name: "Limited Sentience",
                description: "Intelligence 10, speaks/writes language, follows complex instructions",
                additional: "Int 10, language, complex orders"
            },
            "reinforced plating": {
                name: "Reinforced Plating",
                description: "Resistance to bludgeoning, piercing, and slashing damage",
                dmgres: ["Bludgeoning", "Piercing", "Slashing"],
                additional: "Resistance to physical damage"
            }
        },
        "subclassfeature15": {
            name: "Masterwork Upgrade",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "My Steel Defender gains one Masterwork Upgrade of my choice:",
                "Arcane Ward: Allies within 15 ft gain resistance to spell damage",
                "Major Arcanum: Can cast 3rd-level Artificer spell 3x per rest",
                "Self-Destruct: Explode for force damage, cannot rebuild until long rest"
            ]),
            extraname: "Masterwork Upgrades",
            extrachoices: ["Arcane Ward", "Major Arcanum", "Self-Destruct"],
            "arcane ward": {
                name: "Arcane Ward",
                description: "Allies within 15 ft gain resistance to spell damage",
                additional: "Spell damage resistance aura"
            },
            "major arcanum": {
                name: "Major Arcanum",
                description: "Steel Defender can cast 3rd-level Artificer spell 3x per rest",
                additional: "3rd-level spell, 3 charges"
            },
            "self-destruct": {
                name: "Self-Destruct",
                description: "Explode for force damage (max 10d8), cannot rebuild until long rest",
                action: [["bonus action", "Self-Destruct"]],
                additional: "10d8 force damage explosion"
            }
        }
    }
});

// Enhanced Subclass
AddSubClass("artificer(laserllama)", "enhanced", {
    regExpSearch: /^(?=.*enhanced).*$/i,
    subname: "Enhanced Specialization",
    fullname: "Enhanced Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with leatherworker's and smith's tools",
                "If I'm already proficient with these tools, I gain proficiency with another set of artisan's tools of my choice"
            ]),
            toolProfs: [["Leatherworker's tools", 1], ["Smith's tools", 1]]
        },
        "subclassfeature3.1": {
            name: "Enhanced Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "absorb elements", "thunderous smite",
                "alter self", "spider climb",
                "blinding smite", "haste",
                "freedom of movement", "greater invisibility",
                "banishing smite", "skill empowerment"
            ]
        },
        "subclassfeature3.2": {
            name: "Modular Physique",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "My body counts as individual items for Infusions:",
                "- Head (helmet)",
                "- Torso (armor)",
                "- Arms (gauntlets)",
                "- Legs (boots)",
                "Each body part can bear one Infusion",
                "If not wearing armor, AC = 10 + Dex mod + Int mod",
                "Can use shield and still gain this benefit"
            ]),
            additional: "4 infusion slots on body"
        },
        "subclassfeature3.3": {
            name: "Hidden Blade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I have a Hidden Blade in one arm that can be extended/retracted as bonus action",
                "Simple weapon with finesse property, deals 1d10 piercing or slashing damage",
                "Considered a magical weapon, can bear one Infusion",
                "Can be used as spellcasting focus when extended"
            ]),
            action: [["bonus action", "Extend/Retract Blade"]],
            additional: "1d10 magical damage, finesse"
        },
        "subclassfeature5": {
            name: "Bonus Enhancements",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "My number of Infusions Known increases by 1",
                "This bonus Infusion must be applied to part of my body",
                "Gain another bonus Infusion at 10th and 15th level (body only)"
            ]),
            additional: levels.map(function (n) {
                return n < 5 ? "" : n < 10 ? "+1 Infusion (body)" : n < 15 ? "+2 Infusions (body)" : "+3 Infusions (body)";
            })
        },
        "subclassfeature5.1": {
            name: "Extra Attack",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "I can attack twice when I take the Attack action",
                "When I use my action to cast a spell, I can make one Hidden Blade attack as a bonus action"
            ]),
            action: [["bonus action", "Hidden Blade Attack"]]
        },
        "subclassfeature10": {
            name: "Streamlined Integration",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "For each body part bearing an Infusion:",
                "+1 bonus to Str, Dex, Con ability checks (max +5)",
                "+5 ft walking speed (max +25 ft)",
                "Hidden Blade damage increases to 2d10"
            ]),
            speed: {
                walk: { bonus: "+5" }
            },
            additional: "2d10 blade damage, +ability checks"
        },
        "subclassfeature15": {
            name: "Master Enhanced",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "I am considered both Humanoid and Construct",
                "No longer need to eat, sleep, or breathe, and no longer age",
                "To gain benefits of long rest: 4 hours of mechanical maintenance",
                "Resistant to bludgeoning, piercing, and slashing damage"
            ]),
            dmgres: ["Bludgeoning", "Piercing", "Slashing"],
            additional: "Construct type, no biological needs, physical resistance"
        }
    }
});

// Forgewright Subclass
AddSubClass("artificer(laserllama)", "forgewright", {
    regExpSearch: /^(?=.*forgewright).*$/i,
    subname: "Forgewright Specialization",
    fullname: "Forgewright Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with martial weapons and smith's tools",
                "If I'm already proficient with smith's tools, I gain proficiency with another set of artisan's tools of my choice"
            ]),
            weaponProfs: [true, true, []],
            toolProfs: [["Smith's tools", 1]]
        },
        "subclassfeature3.1": {
            name: "Forgewright Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "compelled duel", "zephyr strike",
                "cloud of daggers", "misty step",
                "blinding smite", "conjure volley",
                "fire shield", "staggering smite",
                "banishing smite", "steel wind strike"
            ]
        },
        "subclassfeature3.2": {
            name: "Arcane Armament",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I can reforge one melee weapon into an Arcane Armament during a long rest",
                "Only one Arcane Armament at a time",
                "Magical weapon, use Intelligence for attack/damage rolls",
                "Gains Thrown (20/60) property, returns to hand after thrown attack",
                "Can be used as spellcasting focus for Artificer spells",
                "Can bear one Infusion, +1 Infusion Known (must be applied to Armament)"
            ]),
            additional: "+1 Infusion (armament only), magical thrown weapon"
        },
        "subclassfeature5": {
            name: "Arcane Jolt",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "Once per turn when I hit with Arcane Armament attack:",
                "Expend spell slot to deal bonus force damage",
                "2d8 for 1st-level slot + 1d8 per slot level higher",
                "Maximum 6d8 damage"
            ]),
            additional: "Bonus force damage with spell slots"
        },
        "subclassfeature5.1": {
            name: "Extra Attack",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "I can attack twice when I take the Attack action",
                "When I use my action to cast a spell, I can make an Arcane Armament attack as a bonus action"
            ]),
            action: [["bonus action", "Arcane Armament Attack"]]
        },
        "subclassfeature10": {
            name: "Arcane Surge",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "Arcane Armament attacks deal +1d8 force damage on hit",
                "Can forgo bonus damage to make attack with advantage instead"
            ]),
            additional: "+1d8 force damage or advantage on attacks"
        },
        "subclassfeature15": {
            name: "Master Forgewright",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "As bonus action, flood weapons (Int mod, min 1) within 30 ft with power",
                "For 1 minute, these weapons deal +1d8 force damage on hit",
                "One of the weapons can be my Arcane Armament",
                "Once per long rest, or expend 3rd-level+ spell slot to use again"
            ]),
            action: [["bonus action", "Empower Weapons"]],
            usages: "1 per",
            recovery: "long rest",
            altResource: "SS 3+",
            additional: "+1d8 force damage to multiple weapons"
        }
    }
});

// Wandslinger Subclass
AddSubClass("artificer(laserllama)", "wandslinger", {
    regExpSearch: /^(?=.*wandslinger).*$/i,
    subname: "Wandslinger Specialization",
    fullname: "Wandslinger Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with woodcarver's tools",
                "If I'm already proficient with woodcarver's tools, I gain proficiency with another set of artisan's tools of my choice"
            ]),
            toolProfs: [["Woodcarver's tools", 1]]
        },
        "subclassfeature3.1": {
            name: "Wandslinger Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "shield", "thunderwave",
                "blur", "scorching ray",
                "counterspell", "lightning bolt",
                "vitriolic sphere", "wall of fire",
                "cone of cold", "wall of force"
            ]
        },
        "subclassfeature3.2": {
            name: "Arcane Sidearm",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "During a long rest, I can spend 1 hour crafting an Arcane Sidearm using woodcarver's tools",
                "Only one Arcane Sidearm at a time - crafting another causes previous ones to lose power",
                "Tiny object that can be used as spellcasting focus for Artificer spells",
                "Can bear a single Infusion meant for an arcane focus"
            ]),
            additional: "Arcane focus, holds one infusion"
        },
        "subclassfeature3.3": {
            name: "Spell Slinger",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "As an action, I can use Arcane Sidearm to produce one of these effects:",
                "• Arcane Lance: Ranged spell attack (120 ft), 1d10 + Int force damage",
                "• Shocking Burst: 5-ft radius at point (60 ft), 2d6 lightning damage, Dex save for half",
                "• Thunderous Blast: 15-ft cone (adjacent), 2d6 thunder damage, Str save or knocked back 10 ft"
            ]),
            action: [["action", "Spell Slinger"]]
        },
        "subclassfeature5": {
            name: "Arcane Duelist",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "When I use Spell Slinger action, I can produce two effects instead of one",
                "Effects can target multiple targets or the same target",
                "Number of Spell Slinger effects increases at higher levels: 3 at 10th level, 4 at 15th level",
                "When I use my action to cast an Artificer spell, I can produce one Spell Slinger effect as a bonus action"
            ]),
            action: [["bonus action", "Spell Slinger (after spell)"]],
            additional: "2 effects per action"
        },
        "subclassfeature10": {
            name: "Quickdraw",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "I add my proficiency bonus to initiative rolls",
                "When I roll initiative and aren't surprised/incapacitated, I can use my reaction to use one Spell Slinger effect"
            ]),
            action: [["reaction", "Spell Slinger (initiative)"]],
            additional: "Prof to initiative, reaction Spell Slinger"
        },
        "subclassfeature15": {
            name: "Master Wandslinger",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "When I or another creature I can see within 30 ft is targeted by spell/magical effect, I can grant it three-quarters cover as a reaction",
                "I have advantage on counterspell ability checks",
                "When I deal damage with Spell Slinger effect or Artificer spell, I can cause it to deal force damage instead"
            ]),
            action: [["reaction", "Grant Cover"]],
            additional: "Force damage conversion, cover vs spells, advantage on counterspell"
        }
    }
});

// Aeronaut Subclass
AddSubClass("artificer(laserllama)", "aeronaut", {
    regExpSearch: /^(?=.*aeronaut).*$/i,
    subname: "Aeronaut Specialization",
    fullname: "Aeronaut Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with woodcarver's tools",
                "If I'm already proficient with woodcarver's tools, I gain proficiency with another set of artisan's tools of my choice"
            ]),
            toolProfs: [["Woodcarver's tools", 1]]
        },
        "subclassfeature3.1": {
            name: "Aeronaut Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "fog cloud", "zephyr strike",
                "dust devil", "warding wind",
                "fly", "wind wall",
                "death ward", "freedom of movement",
                "control winds", "steel wind strike"
            ]
        },
        "subclassfeature3.2": {
            name: "Flying Machine",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "During a long rest, I can spend 1 hour crafting one Flying Machine using woodcarver's tools",
                "Only one Flying Machine at a time - only I can use it",
                "Can be worn over clothing or light armor",
                "Can be used as spellcasting focus for Artificer spells",
                "Grants flying speed of 20 ft and allows hovering",
                "Flying speed increases: 30 ft at 5th level, 45 ft at 10th level, 60 ft at 15th level",
                "Can bear one Infusion meant for arcane focus, boots, cloak, or tiny object"
            ]),
            speed: {
                fly: { number: 20, condition: "While wearing Flying Machine" }
            },
            additional: levels.map(n => n < 5 ? "20 ft fly" : n < 10 ? "30 ft fly" : n < 15 ? "45 ft fly" : "60 ft fly")
        },
        "subclassfeature5": {
            name: "Aerial Maneuvers",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "While wearing Flying Machine, gain bonus to Dexterity checks and saving throws",
                "Bonus equals Intelligence modifier (minimum +1)"
            ]),
            addMod: [
                {
                    type: "skill",
                    field: "Dexterity",
                    mod: "max(Int|1)",
                    text: "Aerial Maneuvers: Add Intelligence modifier to Dexterity checks and saves (minimum +1) while wearing Flying Machine"
                },
                {
                    type: "save",
                    field: "Dexterity",
                    mod: "max(Int|1)",
                    text: "Aerial Maneuvers: Add Intelligence modifier to Dexterity checks and saves (minimum +1) while wearing Flying Machine"
                }
            ]
        },
        "subclassfeature5.1": {
            name: "Extra Attack",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "I can attack twice when I take the Attack action",
                "When I use my action to cast a spell, I can make a weapon attack as a bonus action"
            ]),
            action: [["bonus action", "Weapon Attack (after spell)"]]
        },
        "subclassfeature10": {
            name: "Airborne Assault",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "When making ranged attack while flying at least 10 ft off ground:",
                "Attack deals +1d8 bonus damage on hit",
                "Can forgo bonus damage to make attack with advantage instead"
            ]),
            additional: "+1d8 damage or advantage on ranged attacks while flying"
        },
        "subclassfeature15": {
            name: "Master Aeronaut",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "While wearing Flying Machine, can take Dash action as bonus action",
                "When forced to make Dexterity save to take half damage:",
                "• On success: take no damage",
                "• On failure: take only half damage"
            ]),
            action: [["bonus action", "Dash"]],
            additional: "Improved Dexterity save protection"
        }
    }
});

// Archivist Subclass
AddSubClass("artificer(laserllama)", "archivist", {
    regExpSearch: /^(?=.*archivist).*$/i,
    subname: "Archivist Specialization",
    fullname: "Archivist Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with calligrapher's supplies",
                "If already proficient, gain proficiency with another set of artisan's tools",
                "I can speak, read, and write two additional languages of my choice"
            ]),
            toolProfs: [["Calligrapher's supplies", 1]],
            languageProfs: [2]
        },
        "subclassfeature3.1": {
            name: "Archivist Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "comprehend languages", "dissonant whispers",
                "detect thoughts", "mind spike",
                "hypnotic pattern", "tongues",
                "arcane eye", "phantasmal killer",
                "modify memory", "synaptic static"
            ]
        },
        "subclassfeature3.2": {
            name: "Artificial Mind",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "During long rest: spend 1 hour to awaken Mind in Tiny object using calligrapher's supplies",
                "Object becomes magical, counts as spellcasting focus",
                "Only one Artificial Mind at a time",
                "Magical Telephony: Telepathic communication with creatures carrying infused items within 1 mile",
                "Information Overload: Action to force Intelligence save vs psychic damage and attack disadvantage",
                "Psychic damage scales: 2d8 at 5th, 3d8 at 11th, 4d8 at 17th level",
                "Bonus Skills: Based on object material, gain proficiency in two skills:",
                "• Animal (parchment, leather, bone): Animal Handling, Insight, Perception, Survival",
                "• Mineral (gems, glass, metal, stone): Deception, Intimidation, Performance, Persuasion",
                "• Plant (paper, wood, vegetable): Arcana, History, Nature, Religion"
            ]),
            action: [["action", "Information Overload"]],
            additional: levels.map(n => n < 5 ? "1d8 psychic" : n < 11 ? "2d8 psychic" : n < 17 ? "3d8 psychic" : "4d8 psychic")
        },
        "subclassfeature5": {
            name: "Acute Overload",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "When creature fails Information Overload save: expend spell slot for bonus psychic damage",
                "2d8 for 1st-level slot + 1d8 per slot level higher (max 6d8)",
                "Add Intelligence modifier to psychic damage from Information Overload and spells cast through Artificial Mind"
            ]),
            additional: "Int to psychic damage, bonus damage with spell slots"
        },
        "subclassfeature10": {
            name: "Improved Consciousness",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "While holding Artificial Mind: add Intelligence modifier to Wisdom, Charisma, and Concentration saves",
                "Minimum +1 bonus"
            ]),
            addMod: [
                {
                    type: "save",
                    field: "Wisdom",
                    mod: "max(Int|1)",
                    text: "Improved Consciousness: Add Intelligence modifier to Wisdom saves (minimum +1) while holding Artificial Mind"
                },
                {
                    type: "save",
                    field: "Charisma",
                    mod: "max(Int|1)",
                    text: "Improved Consciousness: Add Intelligence modifier to Charisma saves (minimum +1) while holding Artificial Mind"
                },
                {
                    type: "save",
                    field: "Constitution",
                    mod: "max(Int|1)",
                    text: "Improved Consciousness: Add Intelligence modifier to Concentration saves (minimum +1) while holding Artificial Mind"
                }
            ]
        },
        "subclassfeature15": {
            name: "Master Archivist",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "Bonus action: teleport to unoccupied space within 60 ft or within 5 ft of infused object (same plane)",
                "When casting Artificer spell: Artificial Mind can concentrate on it for you",
                "Can concentrate on two Artificer spells simultaneously",
                "Total spell levels cannot exceed 5th-level",
                "Make one concentration save for both spells (no Improved Consciousness bonus)"
            ]),
            action: [["bonus action", "Teleport"]],
            additional: "Dual concentration, teleportation"
        }
    }
});

// Biomancer subclass
AddSubClass("artificer(laserllama)", "biomancer", {
    regExpSearch: /^(?=.*biomancer).*$/i,
    subname: "Biomancer Specialization",
    fullname: "Biomancer Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with leatherworker's tools and Medicine",
                "If I'm already proficient with leatherworker's tools, I gain proficiency with another set of artisan's tools of my choice"
            ]),
            toolProfs: [["Leatherworker's tools", 1]],
            skillstxt: "Gain proficiency in Medicine"
        },
        "subclassfeature3.1": {
            name: "Biomancer Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "false life", "jump",
                "enhance ability", "spider climb",
                "haste", "life transference",
                "blight", "polymorph",
                "reincarnate", "skill empowerment"
            ]
        },
        "subclassfeature3.2": (function () {
            var ModificationFeature = {
                name: "Arcane Evolution",
                source: [["GMB:LL", 0]],
                minlevel: 3,
                description: desc([
                    "During each long rest, I can spend 1 hour to modify my body with Modifications",
                    "I gain access to exclusive Biomancer Modifications",
                    "Modifications last until I replace them during a long rest",
                    "Modifications use my Artificer Spellcasting Ability for saving throws"
                ]),
                additional: levels.map(function (n) {
                    var numMods = n < 5 ? 2 : n < 10 ? 3 : n < 15 ? 4 : 5;
                    return numMods + " Modifications";
                }),
                toNotesPage: [{
                    name: "Biomancer Modifications",
                    note: desc([
                        "Below are all my active Biomancer Modifications.",
                    ]),
                }],
                extraname: "Biomancer Modifications",
                extraTimes: levels.map(function (n) {
                    return n < 5 ? 2 : n < 10 ? 3 : n < 15 ? 4 : 5;
                }),
                extrachoices: []
            };

            // Aggiungi modifiche da BiomancerModifications
            var ModificationKeys = Object.keys(BiomancerModificationsLL);
            for (var i = 0; i < ModificationKeys.length; i++) {
                var ModificationKey = ModificationKeys[i];
                var modificationData = BiomancerModificationsLL[ModificationKey];

                ModificationFeature.extrachoices.push(ModificationKey);

                ModificationFeature[ModificationKey] = {
                    name: modificationData.name,
                    toNotesPage: [{
                        name: modificationData.name + " Modification",
                        note: modificationData.description,
                        amendTo: "Biomancer Modifications"
                    }],
                    source: modificationData.source,
                    prereqeval: modificationData.prereqeval,
                    additional: modificationData.additional,
                    speed: modificationData.speed,
                    ac: modificationData.ac,
                    addMod: modificationData.addMod,
                    regen: modificationData.regen,
                    condition: modificationData.condition
                };
            }

            return ModificationFeature;
        })(),
        "subclassfeature5": {
            name: "Biomancer's Homunculus",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "I learn the Homunculus Servant Infusion, but it doesn't count against my total number of Infusions Known",
                "I replace the required gem with 1 pound of organic matter",
                "The creature type of my Homunculus changes to a monstrosity",
                "As a bonus action, I can order my Homunculus to touch a creature, sacrificing any number of its remaining hit points to restore the same amount of hit points to the target"
            ]),
            action: [["bonus action", "Heal with Homunculus"]],
            infusionKnownAdd: "Homunculus Servant"
        },
        "subclassfeature5.1": {
            name: "Extra Attack",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "I can attack twice, instead of once, whenever I take the Attack action on my turn",
                "Moreover, if I use my action to cast a spell, I can make a weapon attack as a bonus action"
            ]),
            action: [["bonus action", "Weapon Attack (after spell)"]]
        },
        "subclassfeature10": {
            name: "Monstrous Homunculus",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "When I create a Homunculus Servant, I can choose for it to be Tiny, Small, or Medium in size",
                "It gains a single Modification of my choice without a level prerequisite",
                "At 15th level, my Homunculus' Modification can be any Modification with a prerequisite of 5th-level or lower"
            ]),
            additional: "Size choice + Modification for Homunculus"
        },
        "subclassfeature10.1": {
            name: "Violent Regrowth",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "As a bonus action, I can expend a spell slot to replace one of my Modifications with another Modification",
                "My walking speed also increases by 10 feet"
            ]),
            action: [["bonus action", "Replace Modification"]],
            speed: {
                walk: { number: 10, condition: "Permanent increase" }
            }
        },
        "subclassfeature15": {
            name: "Master Biomancer",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "Whenever I target a creature with one of my Biomancer Spells, I can grant one target of that spell temporary hit points equal to my Artificer level + my Intelligence modifier",
                "During a long rest, I can forgo one of my own Modifications to instead modify one willing creature of my choice who I touch"
            ]),
            additional: "Temp HP with spells, modify other creatures"
        }
    }
});

// Chronothief subclass
AddSubClass("artificer(laserllama)", "chronothief", {
    regExpSearch: /^(?=.*chronothief).*$/i,
    subname: "Chronothief Specialization",
    fullname: "Chronothief Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with jeweler's tools",
                "If I'm already proficient with jeweler's tools, I gain proficiency with another set of artisan's tools",
                "I am always aware of the exact time on my home plane of existence",
                "Once I spend a day on another plane, I gain this benefit there as well"
            ]),
            toolProfs: [["Jeweler's tools", 1]]
        },
        "subclassfeature3.1": {
            name: "Chronothief Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known",
                "If using Explorer's Guide to Wildemount, I can replace these with Dunamancy spells of the same level"
            ]),
            spellcastingExtra: [
                "expeditious retreat", "feather fall",
                "hold person", "misty step",
                "haste", "slow",
                "banishment", "dimension door",
                "hold monster", "modify memory"
            ]
        },
        "subclassfeature3.2": {
            name: "Chronometer",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "During long rest: spend 1 hour to craft a Chronometer using jeweler's tools",
                "Tiny object resembling a timekeeping device, used as spellcasting focus",
                "Only one Chronometer at a time",
                "Can bear one Infusion meant for arcane focus, ring, or diadem",
                "While holding Chronometer, action to use abilities on creature within 60 ft:",
                "• Accelerate: Increase speed by 5 × Intelligence modifier (min 5 ft) until start of next turn",
                "• Decelerate: Charisma save or speed becomes 0 until start of next turn",
                "• Warp: Charisma save or switches places with me (can choose to fail)"
            ]),
            action: [
                ["action", "Accelerate"],
                ["action", "Decelerate"],
                ["action", "Warp"]
            ],
            additional: "Time manipulation abilities"
        },
        "subclassfeature5": {
            name: "Efficient Chronomancy",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "When using action for Chronometer ability: can use two abilities instead of one",
                "Can target multiple creatures or same creature",
                "Chronometer gains additional abilities:",
                "• Age: Charisma save or take 2d6 necrotic damage and age by 1 day",
                "• Rush: Reaction to add Intelligence modifier (min +1) to initiative roll of creature in range or self",
                "• Slip: Reaction to force target in range to re-roll attack roll, ability check, or saving throw"
            ]),
            action: [
                ["reaction", "Rush"],
                ["reaction", "Slip"],
                ["action", "Age"]
            ],
            additional: "Multiple abilities per action, new reaction options"
        },
        "subclassfeature10": {
            name: "Time Transfer",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "When creature fails save against Decelerate: can use Accelerate on another creature as part of same action",
                "When creature fails save against Age: can grant another creature temporary HP equal to necrotic damage dealt"
            ]),
            additional: "Linked time effects"
        },
        "subclassfeature15": {
            name: "Master Chronothief",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "Action: use Chronometer to cast time stop spell",
                "Once per long rest",
                "At 17th level: can expend 5th-level spell slot to use time stop again"
            ]),
            action: [["action", "Time Stop"]],
            usages: "1 per ",
            recovery: "long rest",
            additional: "Time Stop once per long rest"
        }
    }
});

// Composer subclass
AddSubClass("artificer(laserllama)", "composer", {
    regExpSearch: /^(?=.*composer).*$/i,
    subname: "Composer Specialization",
    fullname: "Composer Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with smith's tools and in Performance",
                "If I'm already proficient with smith's tools, I gain proficiency with another set of artisan's tools of my choice"
            ]),
            toolProfs: [["Smith's tools", 1]],
            skillstxt: "Gain proficiency in Performance"
        },
        "subclassfeature3.1": {
            name: "Composer Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "charm person", "thunderwave",
                "shatter", "silence",
                "beacon of hope", "fear",
                "charm monster", "dominate beast",
                "destructive wave", "dominate person"
            ]
        },
        "subclassfeature3.2": {
            name: "Musical Apparatus",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "During long rest: spend 1 hour to create Musical Apparatus using smith's tools",
                "Only one Apparatus at a time",
                "Can bear one Infusion meant for musical instrument or arcane focus",
                "Musical instrument that only I am proficient with",
                "Can be used as spellcasting focus for Artificer spells",
                "While wielding Apparatus: can cast thunderclap cantrip using it as focus",
                "Action to produce one of these effects:",
                "• Raucous Blast: Ranged spell attack (60 ft), 1d10 thunder damage and deafened until start of next turn",
                "• Ringing Strike: Melee spell attack (5 ft), 1d10 + Intelligence thunder damage (d12 if held with two hands)"
            ]),
            action: [
                ["action", "Raucous Blast"],
                ["action", "Ringing Strike"]
            ],
            additional: "Musical weapon attacks, thunderclap cantrip"
        },
        "subclassfeature5": {
            name: "Combat Virtuoso",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "When using action for Raucous Blast or Ringing Strike: can produce two effects instead of one",
                "When using action to cast spell: can produce one Raucous Blast or Ringing Strike as bonus action"
            ]),
            action: [["bonus action", "Raucous Blast/Ringing Strike (after spell)"]],
            additional: "Multiple attacks per action"
        },
        "subclassfeature5.1": {
            name: "Thunderous Note",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "When dealing thunder damage with Apparatus: can expend spell slot to knock target back",
                "Knockback: 10 ft for 1st-level slot, +10 ft per slot level above 1st",
                "Distance halved for each size above Large"
            ]),
            additional: "Knockback with spell slots"
        },
        "subclassfeature10": {
            name: "Resonant Frequency",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "Action: mark creatures (up to Intelligence modifier) within 30 ft for 1 hour",
                "Next time marked creature is hit by melee attack: attacker takes 2d8 thunder damage and cannot take reactions until start of next turn",
                "Uses: Intelligence modifier per long rest (minimum 1)"
            ]),
            action: [["action", "Mark Creatures"]],
            usages: "Int mod per ",
            usagescalc: "event.value = Math.max(1, What('Int Mod'));",
            recovery: "long rest",
            additional: "Retributive thunder damage"
        },
        "subclassfeature15": {
            name: "Master Composer",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "Immune to thunder damage and being deafened",
                "Thunderous Note knockback distance is doubled",
                "Resonant Frequency damage increases to 4d8",
                "After 1 minute practicing with musical instrument: gain proficiency with that instrument"
            ]),
            dmgres: ["Thunder"],
            savetxt: {
                immune: ["deafened"]
            },
            additional: "Thunder immunity, doubled knockback, 4d8 damage, instrument proficiency"
        }
    }
});

// Dungeoneer subclass
AddSubClass("artificer(laserllama)", "dungeoneer", {
    regExpSearch: /^(?=.*dungeoneer).*$/i,
    subname: "Dungeoneer Specialization",
    fullname: "Dungeoneer Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with carpenter's tools and mason's tools",
                "If already proficient with either, gain proficiency with another set of artisan's tools",
                "I gain proficiency with improvised weapons",
                "I can use Intelligence instead of Strength or Dexterity for attack and damage rolls with improvised weapons"
            ]),
            toolProfs: [["Carpenter's tools", 1], ["Mason's tools", 1]],
            weaponProfs: [false, false, ["Improvised weapons"]],
            addMod: [{
                type: "skill",
                field: "Attack with Improvised Weapons",
                mod: "Int",
                text: "Use Intelligence for attack and damage rolls with improvised weapons"
            }]
        },
        "subclassfeature3.1": {
            name: "Dungeoneer Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "alarm", "unseen servant",
                "cloud of daggers", "lock/unlock",
                "glyph of warding", "tiny hut",
                "guardian of faith", "resilient sphere",
                "passwall", "wall of stone"
            ]
        },
        "subclassfeature3.2": (function () {
            var DungeoncraftFeature = {
                name: "Dungeoncraft",
                source: [["GMB:LL", 0]],
                minlevel: 3,
                description: desc([
                    "During long rest: spend 1 hour with carpenter's tools to craft Dungeoncraft Objects",
                    "Number of Objects: twice Intelligence modifier (minimum 2)",
                    "Objects appear non-magical but turn to ash at end of next long rest",
                    "Can craft normal versions in 1/4 time and half cost",
                    "Objects can be used as spellcasting focus for Artificer spells",
                    "Objects use my Spell save DC for saving throws",
                    "I can take Use an Object action as a bonus action (must use Dungeoncraft Object)",
                    "Objects can bear one Infusion for items they could be improvised versions of"
                ]),
                additional: levels.map(function (n) {
                    return "Craft " + (2 * Math.max(What('Int Mod'), 1)) + " Dungeoncraft Objects";
                }),
                toNotesPage: [{
                    name: "Dungeoncraft Objects",
                    note: desc([
                        "Below are all available Dungeoncraft Objects I can create.",
                    ]),
                }],
                extraname: "Dungeoncraft Objects",
                extraTimes: levels.map(function (n) {
                    return 2 * Math.max(What('Int Mod'), 1);
                }),
                extrachoices: []
            };

            // Lista degli oggetti Dungeoncraft
            var DungeoncraftObjects = [
                "acid (1 vial)", "alchemist's fire (1 flask)", "ball bearings (1,000)",
                "block and tackle", "caltrops (200)", "chain (25 feet)", "crowbar",
                "grappling hook", "hunting trap", "ladder (10 feet)", "lock and key",
                "manacles and key", "oil (1 flask)", "pitons (10)", "portable ram",
                "rope (50 feet)", "sledgehammer", "torches (5)"
            ];

            for (var i = 0; i < DungeoncraftObjects.length; i++) {
                var objectName = DungeoncraftObjects[i];
                DungeoncraftFeature.extrachoices.push(objectName);

                DungeoncraftFeature[objectName] = {
                    name: objectName,
                    toNotesPage: [{
                        name: objectName,
                        note: "Dungeoncraft Object - turns to ash at end of next long rest",
                        amendTo: "Dungeoncraft Objects"
                    }],
                    source: [["GMB:LL", 0]]
                };
            }

            return DungeoncraftFeature;
        })(),
        "subclassfeature5": {
            name: "Extra Attack",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "I can attack twice when I take the Attack action",
                "I can take the Use an Object action in place of one or both attacks",
                "Damage dealt by my Dungeoncraft Objects counts as magical for overcoming resistances and immunities"
            ]),
            additional: "Use Object as attack, magical object damage"
        },
        "subclassfeature10": {
            name: "Arcane Improvisation",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "When casting Dungeoneer Spell: can replace material component with Dungeoncraft Object instead of expending spell slot",
                "Dungeoncraft Object is consumed by the spell",
                "Can cast each Dungeoneer Spell this way once per long rest"
            ]),
            usages: "1 use per Dungeoneer spell per ",
            recovery: "long rest",
            additional: "Replace material components with Objects"
        },
        "subclassfeature15": {
            name: "Master Dungeoneer",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "Spend 10 minutes with mason's tools to produce passwall or wall of stone without spell slot",
                "When cast this way: no concentration required, structures turn to ash at following dawn",
                "Creatures have disadvantage on saving throws against my Dungeoncraft Objects"
            ]),
            action: [["10 minutes", "Create Wall/Passage"]],
            additional: "No-concentration walls, disadvantage vs Objects"
        }
    }
});

// Gunslinger subclass
AddSubClass("artificer(laserllama)", "gunslinger", {
    regExpSearch: /^(?=.*gunslinger).*$/i,
    subname: "Gunslinger Specialization",
    fullname: "Gunslinger Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with alchemist's supplies and smith's tools",
                "If I'm already proficient with these tools, I gain proficiency with another set of artisan's tools of my choice"
            ]),
            toolProfs: [["Alchemist's supplies", 1], ["Smith's tools", 1]]
        },
        "subclassfeature3.1": {
            name: "Gunslinger Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "chaos bolt", "guiding bolt",
                "acid arrow", "arcane scorcher",
                "conjure volley", "lightning arrow",
                "banishment", "fire shield",
                "skill empowerment", "swift quiver"
            ]
        },
        "subclassfeature3.2": (function () {
            var FirearmFeature = {
                name: "Arcane Firearm",
                source: [["GMB:LL", 0]],
                minlevel: 3,
                description: desc([
                    "During long rest: spend 1 hour with smith's tools to craft one Arcane Firearm",
                    "Only usable by me, crafting another dispels previous one",
                    "Properties: martial weapon, ranged (80/320), loading",
                    "Deals 1d10 force damage, use Intelligence for attack/damage rolls",
                    "Can be used as spellcasting focus for Artificer spells",
                    "Can bear one Infusion for ranged weapon, metal rod, or Tiny object",
                    "Gains Upgrades that can be customized"
                ]),
                additional: levels.map(function (n) {
                    var numUpgrades = n < 5 ? 2 : n < 10 ? 3 : n < 15 ? 4 : 5;
                    return numUpgrades + " Upgrades";
                }),
                toNotesPage: [{
                    name: "Arcane Firearm Upgrades",
                    note: desc([
                        "Below are all my active Arcane Firearm Upgrades.",
                    ]),
                }],
                extraname: "Arcane Firearm Upgrades",
                extraTimes: levels.map(function (n) {
                    return n < 5 ? 2 : n < 10 ? 3 : n < 15 ? 4 : 5;
                }),
                extrachoices: []
            };

            // Aggiungi upgrade da GunslingerUpgrades
            var UpgradeKeys = Object.keys(GunslingerUpgrades);
            for (var i = 0; i < UpgradeKeys.length; i++) {
                var UpgradeKey = UpgradeKeys[i];
                var upgradeData = GunslingerUpgrades[UpgradeKey];

                FirearmFeature.extrachoices.push(UpgradeKey);

                FirearmFeature[UpgradeKey] = {
                    name: upgradeData.name,
                    toNotesPage: [{
                        name: upgradeData.name + " Upgrade",
                        note: upgradeData.description,
                        amendTo: "Arcane Firearm Upgrades"
                    }],
                    source: upgradeData.source,
                    prereqeval: upgradeData.prereqeval,
                    additional: upgradeData.additional,
                    action: upgradeData.action,
                    addMod: upgradeData.addMod
                };
            }

            return FirearmFeature;
        })(),
        "subclassfeature5": {
            name: "Extra Attack",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "I can attack twice, instead of once, whenever I take the Attack action",
                "If I use my action to cast a spell, I can make one Arcane Firearm attack as a bonus action"
            ]),
            action: [["bonus action", "Arcane Firearm Attack (after spell)"]]
        },
        "subclassfeature5.1": {
            name: "Increased Capacity",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "I ignore the Loading property of my Arcane Firearm",
                "I must use my bonus action to reload",
                "I can make up to six attacks with my Firearm before I must reload"
            ]),
            action: [["bonus action", "Reload"]],
            additional: "6 shots before reload"
        },
        "subclassfeature10": {
            name: "Overcharge",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "Once per turn when I hit with Arcane Firearm: expend spell slot for bonus force damage",
                "Bonus damage: 2d6 for 1st-level slot + 1d6 per slot level above 1st"
            ]),
            additional: "Bonus damage with spell slots"
        },
        "subclassfeature10.1": {
            name: "Quickdraw",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "Add Intelligence modifier (minimum +1) to initiative rolls",
                "If I roll initiative and am not surprised/incapacitated: reaction to make one Arcane Firearm attack"
            ]),
            action: [["reaction", "Attack (initiative)"]],
            addMod: [{
                type: "skill",
                field: "Init",
                mod: "max(Int|1)",
                text: "Quickdraw: Add Intelligence modifier to initiative (minimum +1)"
            }]
        },
        "subclassfeature15": {
            name: "Master Gunslinger",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "Bonus action: steady breathing for advantage on Arcane Firearm attacks until end of turn",
                "Once per turn when attacking with advantage: can forgo advantage to make one additional attack",
                "Cannot gain advantage on the bonus attack"
            ]),
            action: [["bonus action", "Steady Aim"]],
            additional: "Trading advantage for extra attacks"
        }
    }
});

// Junker subclass
AddSubClass("artificer(laserllama)", "junker", {
    regExpSearch: /^(?=.*junker).*$/i,
    subname: "Junker Specialization",
    fullname: "Junker Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with smith's tools and land vehicles",
                "If I'm already proficient with smith's tools, I gain proficiency with another set of artisan's tools of my choice"
            ]),
            toolProfs: [["Smith's tools", 1]],
            vehicleProfs: [["Land vehicles", 1]]
        },
        "subclassfeature3.1": {
            name: "Junker Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "ensnaring strike", "grease",
                "enlarge/reduce", "heat metal",
                "sonic wave", "erupting earth",
                "resilient sphere", "summon construct",
                "animate objects", "wall of force"
            ]
        },
        "subclassfeature3.2": {
            name: "Junker's Rig",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "During long rest: spend 1 hour with smith's tools to construct Rig",
                "Only one Rig at a time",
                "Repair: 10 minutes repairs HP equal to Artificer level",
                "Piloting: Bonus action to enter/exit Rig within 5 ft",
                "Pilot cannot be targeted, uses Rig's stat block",
                "Rig can be used as spellcasting focus while piloted",
                "If Rig destroyed: Pilot ejected prone, 1 hour to restore",
                "Infusions: Rig can bear one Infusion for armor, gauntlets, boots, helmet, or melee weapon",
                "Collapsible Rig: Bonus action to collapse/expand, can be worn as backpack (Str 13+ to avoid encumbrance)"
            ]),
            action: [
                ["bonus action", "Enter/Exit Rig"],
                ["bonus action", "Collapse/Expand Rig"]
            ],
            additional: "Large construct companion"
        },
        "subclassfeature5": {
            name: "Extra Attack",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "I can attack twice when I or my Rig takes the Attack action",
                "When I use my action to cast a spell, I can make a weapon attack as a bonus action"
            ]),
            action: [["bonus action", "Weapon Attack (after spell)"]]
        },
        "subclassfeature5.1": {
            name: "Modular Rig",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "Rig counts as multiple items for Infusions:",
                "- Armor (torso), Boots (legs), Helmet (head), Limbs (melee weapon/gauntlet)",
                "Each of these individual items can bear one Infusion"
            ]),
            additional: "4 Infusion slots on Rig"
        },
        "subclassfeature10": {
            name: "Hulking Strikes",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "When Rig hits target equal to its size or smaller with Slam:",
                "Can choose to knock target back 10 ft in straight line",
                "Target must make Strength save or fall prone"
            ]),
            additional: "Knockback and prone on Slam"
        },
        "subclassfeature15": {
            name: "Master Junker",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "Rig upgrades to Titanic Rig stat block with improved abilities",
                "Gains damage resistances, Immutable Form, and Titanic Transformation",
                "Titanic Transformation: Become Huge for 1 minute, bonus damage, reach, and Strength bonuses",
                "Once per dawn, or expend 5th-level spell slot to use again"
            ]),
            action: [["action", "Titanic Transformation"]],
            usages: "1 per ",
            recovery: "dawn",
            altResource: "SS 5",
            additional: "Titanic Rig upgrade"
        }
    }
});

// Junker's Rig Companion
CompanionList["junker rig"] = {
    name: "Junker's Rig",
    source: [["GMB:LL", 0]],
    size: 3, // Large
    type: "Construct",
    alignment: "Unaligned",
    ac: "10 + Int + PB",
    hp: "5 + 5 * level",
    speed: "30 ft, climb 20 ft",
    stats: [18, 8, 16, 3, 3, 3],
    saves: ["", "", "Con"],
    skills: {
        "athletics": "+ PB",
        "intimidation": "+ PB"
    },
    immune: ["poison", "psychic"],
    conditionImmune: ["charmed", "exhaustion", "poisoned"],
    senses: "",
    passive: 10,
    languages: "understands the languages of its creator but can't speak",
    pb: "owner",
    level: "owner",
    cr: "owner",
    trait: [
        {
            name: "Inanimate",
            desc: "The Rig is incapacitated without its Pilot. When it is forced to make an Intelligence, Wisdom, or Charisma ability check or saving throw, its Pilot is considered to be the target of the effect instead. Moreover, if the Pilot is concentrating on a spell when the Rig takes damage, the Pilot must make its Constitution saving throw to maintain concentration as if the Pilot had taken that damage."
        },
        {
            name: "Ironsides",
            desc: "When the Rig takes damage, it reduces the damage by its Constitution modifier (3). Acid and force damage bypass the effects of this feature."
        },
        {
            name: "Siege Engine",
            desc: "The Rig's weapon attacks and spells deal maximum possible damage, in place of rolling, when used on non-magical objects and structures."
        }
    ],
    action: [
        {
            name: "Slam",
            desc: "Melee Weapon Attack: +4 + PB to hit, reach 5 ft., one target. Hit: 2d6 + 4 bludgeoning damage."
        }
    ],
    altBase: "Junker's Rig"
};

// Titanic Rig Companion (livello 15+)
CompanionList["titanic rig"] = {
    name: "Titanic Rig",
    source: [["GMB:LL", 0]],
    size: 3, // Large (can become Huge)
    type: "Construct",
    alignment: "Unaligned",
    ac: "10 + Int + PB",
    hp: "5 + 5 * level",
    speed: "40 ft, climb 30 ft",
    stats: [22, 6, 19, 3, 3, 3],
    saves: ["", "", "Con"],
    skills: {
        "athletics": "+ PB",
        "intimidation": "+ PB"
    },
    immune: ["poison", "psychic"],
    resist: ["Bludgeoning", "Piercing", "Slashing from non-magical, non-adamantine attacks"],
    conditionImmune: ["charmed", "exhaustion", "poisoned"],
    senses: "",
    passive: 10,
    languages: "understands the languages of its creator but can't speak",
    pb: "owner",
    level: "owner",
    cr: "owner",
    trait: [
        {
            name: "Inanimate",
            desc: "The Titanic Rig is incapacitated without its Pilot. If it is forced to make an Intelligence, Wisdom, or Charisma ability check or saving throw, its Pilot is considered to be the target of the effect instead. Moreover, when the Pilot is concentrating on a spell when the Titanic Rig takes damage, the Pilot must make its Constitution saving throw to maintain concentration as if the Pilot had taken that damage."
        },
        {
            name: "Immutable Form",
            desc: "The Titanic Rig can choose to ignore any spell or effect that would alter or change its form."
        },
        {
            name: "Ironsides",
            desc: "When the Titanic Rig takes damage, it reduces the damage by its Constitution modifier (4). Acid and force damage bypass the effects of this feature."
        },
        {
            name: "Siege Engine",
            desc: "The Titanic Rig's weapon attacks and spells deal the maximum possible damage, in place of rolling, when used on non-magical objects and structures."
        }
    ],
    action: [
        {
            name: "Slam",
            desc: "Melee Weapon Attack: +6 + PB to hit, reach 5 ft., one target. Hit: 3d6 + 6 bludgeoning damage."
        },
        {
            name: "Titanic Transformation",
            desc: "The Titanic Rig becomes Huge in size, so long as there is room for it to grow. While it is Huge, its Slam attacks deal an additional 1d6 damage on hit, its reach increases by 5 ft., and it adds your INT to all Strength ability checks and saving throws. This transformation lasts for 1 minute. It ends early if the Titanic Rig is destroyed, or its Pilot uses their action to cause the Rig to revert to its normal form. The Titanic Rig can transform in this way once, and it regains the ability to do so at the following dawn. When it has no uses left, its Pilot can expend a 5th-level spell slot to use this transformation again."
        }
    ],
    altBase: "Titanic Rig"
};

// Machinist subclass
AddSubClass("artificer(laserllama)", "machinist", {
    regExpSearch: /^(?=.*machinist).*$/i,
    subname: "Machinist Specialization",
    fullname: "Machinist Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with smith's tools and Sleight of Hand",
                "If I'm already proficient with smith's tools, I gain proficiency with another set of artisan's tools of my choice"
            ]),
            toolProfs: [["Smith's tools", 1]],
            skillstxt: "Gain proficiency in Sleight of Hand"
        },
        "subclassfeature3.1": {
            name: "Machinist Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "color spray", "unseen servant",
                "cloud of daggers", "cordon of arrows",
                "spirit guardians", "tiny servant",
                "faithful hound", "summon construct",
                "animate objects", "awaken"
            ]
        },
        "subclassfeature3.2": (function () {
            var AutomatonFeature = {
                name: "Automatons",
                source: [["GMB:LL", 0]],
                minlevel: 3,
                description: desc([
                    "During long rest: spend 1 hour with smith's tools to create Automatons (Int mod, min 1)",
                    "Action + spell slot: create one inactive Automaton",
                    "Maximum Automatons: Intelligence modifier (minimum 1)",
                    "Bonus action: activate and throw Automaton to space within 30 ft",
                    "Active Automaton acts on my turn, bonus action to command",
                    "Can order to move and use Model action or Slam attack",
                    "Remains active for 1 hour or until deactivated/destroyed",
                    "Only one Automaton active at a time (increases at higher levels)",
                    "Choose Model for each Automaton when created"
                ]),
                additional: levels.map(function (n) {
                    return "Max " + Math.max(What('Int Mod'), 1) + " Automatons, " + (n < 5 ? "1 active" : n < 15 ? "2 active" : "3 active");
                }),
                toNotesPage: [{
                    name: "Automaton Models",
                    note: desc([
                        "Below are all available Automaton Models I can use.",
                    ]),
                }],
                extraname: "Automaton Models",
                extraTimes: levels.map(function (n) {
                    return n < 5 ? 1 : 2; // Improved Designs gives 2 Models at level 5
                }),
                extrachoices: []
            };

            // Aggiungi modelli da AutomatonModels
            var ModelKeys = Object.keys(AutomatonModels);
            for (var i = 0; i < ModelKeys.length; i++) {
                var ModelKey = ModelKeys[i];
                var modelData = AutomatonModels[ModelKey];

                AutomatonFeature.extrachoices.push(ModelKey);

                AutomatonFeature[ModelKey] = {
                    name: modelData.name,
                    toNotesPage: [{
                        name: modelData.name + " Model",
                        note: modelData.description,
                        amendTo: "Automaton Models"
                    }],
                    source: modelData.source,
                    prereqeval: modelData.prereqeval,
                    additional: modelData.additional,
                    action: modelData.action
                };
            }

            return AutomatonFeature;
        })(),
        "subclassfeature5": {
            name: "Automated Army",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "I can have two Automatons active at once",
                "Single bonus action to order both Automatons to move and use Model actions",
                "At 15th level: can have three Automatons active and command all with one bonus action"
            ]),
            additional: levels.map(n => n < 15 ? "2 active Automatons" : "3 active Automatons")
        },
        "subclassfeature5.1": {
            name: "Improved Designs",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "When creating Automaton: gains benefits of two Models of my choice",
                "Automaton attacks count as magical for overcoming resistances and immunities"
            ]),
            additional: "2 Models per Automaton, magical attacks"
        },
        "subclassfeature10": {
            name: "Efficient Construction",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "When expending spell slot to create Automaton: create number of Automatons equal to spell slot level",
                "Cannot exceed maximum number of Automatons"
            ]),
            additional: "Multiple Automatons per spell slot"
        },
        "subclassfeature15": {
            name: "Master Machinist",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "Reaction when forced to make save or hit by attack: switch places with active Automaton within 60 ft",
                "Automaton becomes target of triggering effect",
                "Automatons resistant to non-magical bludgeoning, piercing, and slashing damage"
            ]),
            action: [["reaction", "Switch with Automaton"]],
            additional: "Position swap, damage resistance for Automatons"
        }
    }
});

// Automaton Companion
CompanionList["machinist automaton"] = {
    name: "Automaton",
    source: [["GMB:LL", 0]],
    size: 1, // Tiny
    type: "Construct",
    alignment: "Unaligned",
    ac: "13 + Int",
    hp: "5 + level",
    speed: "25 ft",
    stats: [10, 16, 14, 4, 2, 2],
    saves: ["", "Dex", "Con"],
    skills: {},
    immune: ["poison", "psychic"],
    conditionImmune: ["charmed", "exhaustion", "poisoned"],
    senses: "",
    passive: 10,
    languages: "understands the languages you speak",
    pb: "owner",
    level: "owner",
    cr: "owner",
    trait: [
        {
            name: "Model",
            desc: "The Automaton gains the benefits of one or two Models chosen from the Machinist specialization."
        },
        {
            name: "Replaceable Parts",
            desc: "When the mending spell is cast on the Automaton, it regains 2d6 hit points."
        }
    ],
    action: [
        {
            name: "Slam",
            desc: "Melee Weapon Attack: Int + PB to hit, reach 5 ft., one target. Hit: 1d6 + 3 bludgeoning damage."
        }
    ],
    altBase: "Automaton"
};

// Mechanic subclass
AddSubClass("artificer(laserllama)", "mechanic", {
    regExpSearch: /^(?=.*mechanic).*$/i,
    subname: "Mechanic Specialization",
    fullname: "Mechanic Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with smith's tools and land vehicles",
                "If I'm already proficient with smith's tools or land vehicles, I gain proficiency with another set of artisan's tools of my choice"
            ]),
            toolProfs: [["Smith's tools", 1]],
            vehicleProfs: [["Land vehicles", 1]]
        },
        "subclassfeature3.1": {
            name: "Roadster",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I can't be knocked from a vehicle against my will while conscious",
                "Once per turn when I take bludgeoning, fire, piercing, slashing, or thunder damage: reaction to reduce damage by Intelligence modifier"
            ]),
            action: [["reaction", "Reduce Damage"]],
            additional: "Vehicle stability, damage reduction"
        },
        "subclassfeature3.2": {
            name: "Mechanic Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "grease", "zephyr strike",
                "enlarge/reduce", "heat metal",
                "haste", "thunder step",
                "freedom of movement", "fire shield",
                "creation", "steel wind strike"
            ]
        },
        "subclassfeature3.3": {
            name: "Autocycle",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "During long rest: spend 1 hour with smith's tools to construct Autocycle",
                "Medium vehicle, only one at a time",
                "Repair: 10 minutes repairs HP equal to Artificer level",
                "Properties: mount only controllable by me, uses Autocycle stat block",
                "While riding: can be used as spellcasting focus",
                "Reaction: when Autocycle attacked while riding, can become target instead",
                "Infusions: can bear one Infusion for boots (wheels), armor (chassis), or melee weapon (ram)"
            ]),
            action: [["reaction", "Intercept Attack"]],
            additional: "Custom vehicle mount"
        },
        "subclassfeature5": {
            name: "Afterburn",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "Once per turn when riding Autocycle and moving within 5 ft of creature: force Dexterity save",
                "Failed save: 1d10 + Intelligence fire damage and cannot make opportunity attacks against me this turn",
                "Autocycle capacity: up to two Medium creatures (or three Small) and 100 lbs cargo"
            ]),
            action: [["special", "Afterburn (during movement)"]],
            additional: "Movement damage, increased capacity"
        },
        "subclassfeature10": {
            name: "Expert Rider",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "While riding Autocycle:",
                "• Movement ignores all difficult terrain",
                "• Opportunity attacks against Autocycle or riders have disadvantage",
                "• When casting self-target Artificer spell: can also grant benefits to Autocycle",
                "• When moving within 5 ft of friendly creature: it can use reaction to mount if room available"
            ]),
            additional: "Enhanced riding abilities"
        },
        "subclassfeature15": {
            name: "Master Mechanic",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "Autocycle gains flying speed equal to walking speed and can hover",
                "Creatures riding Autocycle cannot be targeted by opportunity attacks while moving",
                "Afterburn damage increases to 2d10",
                "Can use Afterburn whenever moving past creature (each creature once per turn)"
            ]),
            additional: "Flight, no opportunity attacks, improved Afterburn"
        }
    }
});

// Autocycle Vehicle
CompanionList["mechanic autocycle"] = {
    name: "Autocycle",
    source: [["GMB:LL", 0]],
    size: 2, // Medium
    type: "Vehicle",
    ac: "10 + Int + PB",
    hp: "5 + 5 * level",
    speed: "30 ft",
    capacity: "1 Medium creature, 50 lb cargo",
    stats: [13, 18, 12, 0, 0, 0],
    immune: ["poison", "psychic"],
    conditionImmune: ["blinded", "charmed", "deafened", "frightened", "paralyzed", "poisoned", "unconscious"],
    trait: [
        {
            name: "Empowered Speed",
            desc: "The Autocycle gains additional speed equal to 5 times your Intelligence modifier (minimum of 5 feet)."
        },
        {
            name: "Expert Handling",
            desc: "If you are mounted on the Autocycle and not incapacitated, you add your proficiency bonus to any ability check or saving throw the Autocycle is forced to make."
        },
        {
            name: "Inanimate",
            desc: "The Autocycle is incapacitated without a rider. If it is forced to make an Intelligence, Wisdom, or Charisma ability check or saving throw, its rider is considered to be the target of the effect instead."
        },
        {
            name: "Jump",
            desc: "If the Autocycle moves at least 30 feet in a straight line, it can clear a distance of up to 60 feet when jumping over a chasm, ravine, or other gap."
        },
        {
            name: "Mechanical Momentum",
            desc: "If the Autocycle moves at least 20 ft. straight toward a creature and hits it with a Ram attack on the same turn, that target must succeed on a Strength saving throw or be knocked prone."
        },
        {
            name: "Prone Deficiency",
            desc: "If the Autocycle falls prone, it can't right itself and is incapacitated until a creature uses an action on its turn to stand the Autocycle upright."
        },
        {
            name: "Swerve",
            desc: "When the Autocycle is upright and is forced to make a Dexterity saving throw, its rider can use their reaction to grant it advantage on its saving throw."
        }
    ],
    action: [
        {
            name: "Ram",
            desc: "Melee Weapon Attack: +4 + PB to hit, reach 5 ft., 1 target. Hit: 1d10 + 4 + PB bludgeoning damage."
        }
    ],
    actionOptions: "Rider",
    altBase: "Autocycle"
};

// Puppeteer subclass
AddSubClass("artificer(laserllama)", "puppeteer", {
    regExpSearch: /^(?=.*puppeteer).*$/i,
    subname: "Puppeteer Specialization",
    fullname: "Puppeteer Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency with weaver's tools and Sleight of Hand",
                "If I'm already proficient with weaver's tools, I gain proficiency with another set of artisan's tools"
            ]),
            toolProfs: [["Weaver's tools", 1]],
            skillstxt: "Gain proficiency in Sleight of Hand"
        },
        "subclassfeature3.1": {
            name: "Puppeteer Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "ensnaring strike", "entangle",
                "crown of madness", "hold person",
                "grasping vine", "irresistible dance",
                "dominate beast", "resilient sphere",
                "dominate person", "hold monster"
            ]
        },
        "subclassfeature3.2": {
            name: "Arcane Strings",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "During long rest: spend 1 hour with weaver's tools to craft spool of Arcane Strings",
                "Tiny spool that can be wielded as whip, proficiency with it",
                "Can be used as spellcasting focus for Artificer spells",
                "Only one spool at a time, only I can wield it",
                "Always infused with Wondrous Whip Infusion (doesn't count against Infusions Known)",
                "Abilities (30 ft range, willing creatures only):",
                "• Correct: Reaction when creature misses melee attack - repeat attack against same target",
                "• Guide: Reaction when creature makes skill check I'm proficient in - add Intelligence modifier to roll",
                "• Move: Bonus action - move attached creature up to half its walking speed (no opportunity attacks)"
            ]),
            action: [
                ["reaction", "Correct"],
                ["reaction", "Guide"],
                ["bonus action", "Move"]
            ],
            additional: "Control and support abilities"
        },
        "subclassfeature5": {
            name: "Skillful Strings",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "Additional Arcane String abilities:",
                "• Channel: When casting spell - originate from target in range. If concentration required, I concentrate on it",
                "• Strike: Reaction when creature takes Attack action - cause it to make one additional attack as part of its action"
            ]),
            action: [
                ["reaction", "Strike"]
            ],
            additional: "Spell redirection, extra attacks"
        },
        "subclassfeature10": {
            name: "Nimble Fingers",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "Gain one additional reaction each round (can only be used for Arcane Strings abilities)",
                "An effect can only trigger one of my reactions",
                "Range of Arcane Strings and all abilities increases to 60 feet"
            ]),
            additional: "Extra reaction, increased range"
        },
        "subclassfeature15": {
            name: "Master Puppeteer",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "Once between each short or long rest: use Arcane Strings to cast irresistible dance without spell slot",
                "Target automatically fails its initial saving throw"
            ]),
            action: [["action", "Irresistible Dance"]],
            usages: "1 per ",
            recovery: "short rest",
            additional: "Auto-fail irresistible dance"
        }
    }
});

// Reanimator subclass
AddSubClass("artificer(laserllama)", "reanimator", {
    regExpSearch: /^(?=.*reanimator).*$/i,
    subname: "Reanimator Specialization",
    fullname: "Reanimator Artificer",
    source: [["GMB:LL", 0]],
    features: {
        "subclassfeature3": {
            name: "Tools of the Trade",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I gain proficiency in Nature and leatherworker's tools",
                "If I'm already proficient with leatherworker's tools, I gain proficiency with another set of artisan's tools of my choice"
            ]),
            toolProfs: [["Leatherworker's tools", 1]],
            skillstxt: "Gain proficiency in Nature"
        },
        "subclassfeature3.1": {
            name: "Reanimator Spells",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "I learn certain spells at specific Artificer levels",
                "These spells don't count against my total number of Spells Known"
            ]),
            spellcastingExtra: [
                "false life", "longstrider",
                "gentle repose", "locate creature",
                "life transference", "animate dead",
                "blight", "polymorph",
                "enervation", "raise dead"
            ]
        },
        "subclassfeature3.2": {
            name: "Reanimated Thrall",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc([
                "1-minute ritual with leatherworker's tools on dead creature (died within 8 hours)",
                "Rises as my Thrall - only one Thrall at a time",
                "Cannot reanimate same creature again after it dies",
                "Can raise Beasts, Humanoids, and Monstrosities",
                "CR limit: Artificer level ÷ 3 (rounded down)",
                "Thrall becomes Undead type, no Hit Dice, no rest benefits",
                "Restored to full health and abilities",
                "Acts on my turn, bonus action to command actions",
                "If Thrall can cast spells: must expend my spell slots for it to cast"
            ]),
            action: [["bonus action", "Command Thrall"]],
            additional: levels.map(n => "Max CR: " + Math.floor(n / 3))
        },
        "subclassfeature5": {
            name: "Extra Attack",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "I can attack twice when I take the Attack action",
                "I can forgo one attack to order my Thrall to make a single attack"
            ]),
            additional: "Thrall attack substitution"
        },
        "subclassfeature5.1": {
            name: "Necrotic Preservation",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: desc([
                "When casting gentle repose on eligible Thrall creature: transform into small Trinket for duration",
                "Can use Reanimated Thrall ritual on Trinket to raise that creature as Thrall"
            ]),
            additional: "Corpse preservation"
        },
        "subclassfeature10": {
            name: "Advanced Reanimations",
            source: [["GMB:LL", 0]],
            minlevel: 10,
            description: desc([
                "Can raise Aberrations, Dragons, and Giants as Thralls",
                "Still subject to CR limit (Artificer level ÷ 3)"
            ]),
            additional: "Expanded creature types"
        },
        "subclassfeature15": {
            name: "Master Reanimator",
            source: [["GMB:LL", 0]],
            minlevel: 15,
            description: desc([
                "Reaction when Thrall reduced to 0 HP but not killed outright: expend spell slot",
                "Thrall instead reduced to HP equal to 10 × spell slot level",
                "Cannot exceed Thrall's maximum HP"
            ]),
            action: [["reaction", "Save Thrall"]],
            additional: "Emergency Thrall healing"
        }
    }
});

FeatsList["inventive adept"] = {
    name: "Inventive Adept",
    source: [["GMB:LL", 0]],
    prerequisite: "Intelligence 13 or higher",
    prereqeval: function (v) { return What('Int') >= 13; },
    descriptionFull: "You have spent many days tinkering with various inventions, tool sets, and arcane forces. You gain the following benefits:\n \u2022 Increase your Intelligence score by 1, up to a maximum of 20.\n \u2022 You gain proficiency with tinker's tools. If you are already proficient, then whenever you make an ability check with tinker's tools you treat a d20 roll of 9 or lower as a 10.\n \u2022 You learn one Infusion of your choice from those available to the Alternate Artificer. At the end of each long rest, you can infuse this Infusion into one object, following the Infusion rules outlined by the Alternate Artificer class.",
    description: "[+1 int] \n\n Proficiency with tinker's tools (min. 10 on d20 to checks if already proficient) \n Learn one Artificer Infusion of my choice (2nd page \"Choose Feature\" button)",
    scores: [0, 0, 0, 1, 0, 0],
    toolProfs: [["Tinker's tools", 1]],
    bonusClassExtrachoices: [{
        class: "artificer(laserllama)",
        feature: "infusions",
        bonus: 1,
        addToExisting: true
    }]
};

// Aggiungi automazione per le caratteristiche del Forgewright
RunFunctionAtEnd(function () {
    var forgewrightSubclass = ClassSubList["artificer(laserllama)-forgewright"];

    forgewrightSubclass.calcChanges = {
        atkCalc: [
            function (fields, v, output) {
                // Applica bonus danni per Arcane Surge
                if (classes.known["artificer(laserllama)"].level >= 10 &&
                    v.WeaponName && !v.isSpell) {
                    output.extraDmg += 8; // 1d8 average
                }
            },
            "Arcane Armament deals +1d8 force damage at 10th level"
        ],

        atkAdd: [
            function (fields, v) {
                // Aggiungi proprietà Thrown alle armi riconosciute come Arcane Armament
                if (v.WeaponName && !v.isSpell && fields.Range && fields.Range.indexOf("Melee") !== -1) {
                    if (!fields.Description) fields.Description = "";
                    if (fields.Description.indexOf("Thrown") === -1) {
                        fields.Description += (fields.Description ? "; " : "") + "Thrown (20/60), returns to hand";
                    }
                }
            },
            "Arcane Armament gains Thrown property and returns to hand"
        ]
    };
});
// Aggiungi Hidden Blade come opzione di arma
RunFunctionAtEnd(function () {
    // Hidden Blade
    if (!WeaponsList["hidden blade"]) {
        WeaponsList["hidden blade"] = {
            regExpSearch: /^(?=.*hidden)(?=.*blade).*$/i,
            name: "Hidden Blade",
            source: [["GMB:LL", 0]],
            ability: 2, // Dexterity (finesse)
            type: "Simple Melee",
            damage: [1, 10, "piercing"],
            range: "Melee",
            description: "Finesse, magical; can use piercing or slashing damage; spellcasting focus when extended",
            abilitytodamage: true,
            mod: true, // Can use Intelligence instead
            finesse: true
        };
    }

    // Aggiungi le Hidden Blade alle opzioni di arma dell'Enhanced
    var enhancedSubclass = ClassSubList["artificer(laserllama)-enhanced"];

    enhancedSubclass.weaponProfs = {
        primary: [true, false, ["hidden blade"]]
    };
});

// Aggiungi automazione per l'AC del Modular Physique
RunFunctionAtEnd(function () {
    var enhancedSubclass = ClassSubList["artificer(laserllama)-enhanced"];

    enhancedSubclass.calcChanges = {
        atkAdd: [
            function (fields, v) {
                // Applica bonus danni per Streamlined Integration
                if (v.WeaponName === "hidden blade" && classes.known["artificer(laserllama)"].level >= 10) {
                    fields.Damage_Die = "2d10";
                }
            },
            "Hidden Blade damage increases to 2d10 at 10th level"
        ]
    };
});

// Aggiungi Thunder Gauntlets come opzione di arma
RunFunctionAtEnd(function () {
    // Crea le Thunder Gauntlets come opzione di arma
    if (!WeaponsList["thunder gauntlets"]) {
        WeaponsList["thunder gauntlets"] = {
            regExpSearch: /^(?=.*thunder)(?=.*gauntlet).*$/i,
            name: "Thunder Gauntlets",
            source: [["GMB:LL", 0]],
            ability: 1, // Strength
            type: "Simple Melee",
            damage: [1, 8, "thunder"],
            range: "Melee",
            description: "Use Str or Int for attack/damage; hit creatures have disadvantage attacking others",
            abilitytodamage: true,
            mod: true // Can use Intelligence instead
        };
    }

    // Aggiungi le Thunder Gauntlets alle opzioni di arma dell'Armorer
    var armorerSubclass = ClassSubList["artificer(laserllama)-armorer"];

    // Aggiungi le Thunder Gauntlets come opzione di arma
    armorerSubclass.weaponProfs = {
        primary: [true, false, ["thunder gauntlets"]]
    };
});
// Replicate Magic Item Function
RunFunctionAtEnd(function () {
    var artMi = [
        // 2nd-level artificer
        ["alchemy jug", 2],
        ["bag of holding", 2],
        ["cap of water breathing", 2],
        ["goggles of night", 2],
        ["rope of climbing", 2],
        ["sending stones", 2],
        ["wand of magic detection", 2],
        ["wand of secrets", 2],
        // 6th-level artificer
        ["boots of elvenkind", 6],
        ["cloak of elvenkind", 6],
        ["cloak of the manta ray", 6],
        ["eyes of charming", 6],
        ["gloves of thievery", 6],
        ["lantern of revealing", 6],
        ["pipes of haunting", 6],
        ["ring of water walking", 6],
        // 10th-level artificer
        ["boots of striding and springing", 10],
        ["boots of the winterlands", 10],
        ["bracers of archery", 10],
        ["brooch of shielding", 10],
        ["cloak of protection", 10],
        ["eyes of the eagle", 10],
        ["gauntlets of ogre power", 10],
        ["gloves of missile snaring", 10],
        ["gloves of swimming and climbing", 10],
        ["hat of disguise", 10],
        ["headband of intellect", 10],
        ["helm of telepathy", 10],
        ["medallion of thoughts", 10],
        ["necklace of adaptation", 10],
        ["periapt of wound closure", 10],
        ["pipes of the sewers", 10],
        ["quiver of ehlonna", 10],
        ["ring of jumping", 10],
        ["ring of mind shielding", 10],
        ["slippers of spider climbing", 10],
        ["ventilating lung", 10],
        ["winged boots", 10],
        // 14th-level artificer
        ["amulet of health", 14],
        ["arcane propulsion arm", 14],
        ["belt of giant strength", 14, "hill (str 21, rare)"],
        ["boots of levitation", 14],
        ["boots of speed", 14],
        ["bracers of defense", 14],
        ["cloak of the bat", 14],
        ["dimensional shackles", 14],
        ["gem of seeing", 14],
        ["horn of blasting", 14],
        ["ring of free action", 14],
        ["ring of protection", 14],
        ["ring of the ram", 14]
    ];

    // Aggiungi tutti gli oggetti comuni (tranne pozioni e pergamene)
    for (var mi in MagicItemsList) {
        var aMI = MagicItemsList[mi];
        if (aMI.type && !(/potion|scroll/i).test(aMI.type) &&
            ((!aMI.rarity && aMI.choices) || (aMI.rarity && aMI.rarity.toLowerCase() === "common"))
        ) {
            // Cerca nelle scelte se l'oggetto principale non ha rarità
            if (!aMI.rarity && aMI.choices) {
                for (var c = 0; c < aMI.choices.length; c++) {
                    var choiceNmLC = aMI.choices[c].toLowerCase();
                    var aMIchoice = aMI[choiceNmLC];
                    // Salta se non è rarità comune o è una pozione o pergamena
                    if (!aMIchoice || !aMIchoice.rarity || aMIchoice.rarity.toLowerCase() !== "common" || (/potion|scroll/i).test(aMIchoice.type)) continue;
                    artMi.push([mi, 0, choiceNmLC]);
                }
            } else {
                // L'oggetto principale ha rarità "common", quindi aggiungilo completo
                artMi.push([mi]);
            }
        }
    }

    var theObj = ClassList["artificer(laserllama)"].features.infusions;

    for (var a = 0; a < artMi.length; a++) {
        var MI0 = artMi[a][0];
        var MI1 = artMi[a][1];
        var MI2 = artMi[a][2];
        var anArtMi = MagicItemsList[MI0];
        if (!anArtMi) continue;

        if (MI2 && anArtMi[MI2]) {
            anArtMi = {
                name: anArtMi[MI2].name ? anArtMi[MI2].name : anArtMi.name + " [" + MI2.capitalize() + "]",
                rarity: anArtMi[MI2].rarity ? anArtMi[MI2].rarity : anArtMi.rarity,
                source: anArtMi[MI2].source ? anArtMi[MI2].source : anArtMi.source,
                attunement: anArtMi[MI2].attunement !== undefined ? anArtMi[MI2].attunement : anArtMi.attunement
            };
        }

        var theI = anArtMi.name + (MI1 ? " (prereq: level " + MI1 + " artificer)" : "");
        var theILC = theI.toLowerCase();

        if (theObj[theILC]) continue;

        theObj[theILC] = {
            name: anArtMi.name,
            description: "",
            source: anArtMi.source,
            magicitemsAdd: [anArtMi.name],
            additional: anArtMi.attunement ? "requires attunement" : undefined,
            prereqeval: MI1 && MI1 > 2 ? ClassList["artificer(laserllama)"]["prereqLvl" + MI1] : undefined,
            submenu: "Replicate Magic Item" + (MI1 ? " (prereq: level " + (" " + MI1).slice(-2) + " artificer)" : " (common magic items) [" + getLetterRange(anArtMi.name, ["A-F", "G-Q", "R-Z"]) + "]")
        };

        theObj.extrachoices.push(theI);
    }
});
// Armorer's Steel Defender
RunFunctionAtEnd(function () {
    // Steel Defender - Humanoid
    if (!CreatureList["steel defender (humanoid)"]) {
        CreatureList["steel defender (humanoid)"] = {
            name: "Steel Defender (Humanoid)",
            source: [["GMB:LL", 0]],
            size: 3, // Medium
            type: "Construct",
            alignment: "Unaligned",
            ac: "13+Prof",
            hp: "5 + 5*Artificer level",
            hd: ["Artificer level", 10],
            hdLinked: true,
            speed: "30 ft",
            scores: [16, 12, 14, 4, 10, 6],
            saves: ["Str", "Dex", "Con", "Int", "Wis", "Cha"],
            senses: "Darkvision 60 ft",
            passivePerception: "10+Prof",
            languages: "Understands the languages you speak",
            challengeRating: "1",
            proficiencyBonus: 2,
            proficiencyBonusLinked: true,
            attacksAction: 1,
            attacks: [{
                name: "Rend",
                ability: 1,
                damage: [1, 8, "force"],
                modifiers: ["3", "Prof"],
                range: "Melee (5 ft)",
                description: "Force damage attack"
            }],
            actions: [{
                name: "Repair",
                description: "Expend one Hit Die to restore 1d10 + PB hit points to itself or one construct/object within 5 ft"
            }],
            traits: [{
                name: "Constructed Nature",
                description: "Doesn't require air, food, drink, or sleep"
            }, {
                name: "Damage Immunities",
                description: "Poison, psychic"
            }, {
                name: "Condition Immunities",
                description: "Charmed, exhausted, poisoned"
            }, {
                name: "Might of the Master",
                description: "Adds your proficiency bonus to all ability checks and saving throws"
            }, {
                name: "Vigilant",
                description: "Cannot be surprised"
            }, {
                name: "Shield Proficiency",
                description: "Proficient with shields (Humanoid model only)"
            }],
            features: [],
            addMod: [{
                type: "skill",
                field: "All",
                mod: "Prof",
                text: "Might of the Master - add proficiency bonus to all ability checks"
            }, {
                type: "save",
                field: "all",
                mod: "Prof",
                text: "Might of the Master - add proficiency bonus to all saving throws"
            }],
            calcChanges: {}
        };
    }

    // Steel Defender - Quadruped  
    if (!CreatureList["steel defender (quadruped)"]) {
        CreatureList["steel defender (quadruped)"] = {
            name: "Steel Defender (Quadruped)",
            source: [["GMB:LL", 0]],
            size: 4, // Large
            type: "Construct",
            alignment: "Unaligned",
            ac: "13+Prof",
            hp: "5 + 5*Artificer level",
            hd: ["Artificer level", 10],
            hdLinked: true,
            speed: "40 ft",
            scores: [16, 12, 14, 4, 10, 6],
            saves: ["Str", "Dex", "Con", "Int", "Wis", "Cha"],
            senses: "Darkvision 60 ft",
            passivePerception: "10+Prof",
            languages: "Understands the languages you speak",
            challengeRating: "1",
            proficiencyBonus: 2,
            proficiencyBonusLinked: true,
            attacksAction: 1,
            attacks: [{
                name: "Rend",
                ability: 1,
                damage: [1, 8, "force"],
                modifiers: ["3", "Prof"],
                range: "Melee (5 ft)",
                description: "Force damage attack"
            }],
            actions: [{
                name: "Repair",
                description: "Expend one Hit Die to restore 1d10 + PB hit points to itself or one construct/object within 5 ft"
            }],
            traits: [{
                name: "Constructed Nature",
                description: "Doesn't require air, food, drink, or sleep"
            }, {
                name: "Damage Immunities",
                description: "Poison, psychic"
            }, {
                name: "Condition Immunities",
                description: "Charmed, exhausted, poisoned"
            }, {
                name: "Might of the Master",
                description: "Adds your proficiency bonus to all ability checks and saving throws"
            }, {
                name: "Vigilant",
                description: "Cannot be surprised"
            }, {
                name: "Mount",
                description: "Can be ridden as a trained mount (Quadruped model only)"
            }],
            features: [],
            addMod: [{
                type: "skill",
                field: "All",
                mod: "Prof",
                text: "Might of the Master - add proficiency bonus to all ability checks"
            }, {
                type: "save",
                field: "all",
                mod: "Prof",
                text: "Might of the Master - add proficiency bonus to all saving throws"
            }],
            calcChanges: {}
        };
    }
});

