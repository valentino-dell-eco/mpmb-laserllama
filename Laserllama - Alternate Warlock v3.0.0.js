/*  -WHAT IS THIS?-
    This file adds optional material to "MPMB's Character Record Sheet" found at https://www.flapkan.com/download#charactersheets
    Import this file using the "Add Extra Materials" bookmark.

    -KEEP IN MIND-
    It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
    This script requires importing the Common attributes first!
	
    -INFORMATION-
    Subject:    Classes and Feats Part 1 (Martials, Warlord, and Psion and their feat)

    Effect:     This script adds the Classes (and the Alternate versions) published by Laserllama in GM Binder under the Fan Content policy.
                By the links below are listed the classes added by this file
                REMINDER: The content in the links below may vary from what scripted in this file 'cause it may be changed with a new version release
        
            Laserllama GM Binder Profile: https://www.gmbinder.com/profile/laserllama
            Alternate Warlock (Version 3.0.0): https://www.gmbinder.com/share/-NRARRHW6KjsBfrQIzTs


    Sheet:      v13.0.06 and newer
 
    Code by:    Original script by Valentino dell'Eco
*/

var iFileName = "LaserLlama - Alternate Warlock.js";
RequiredSheetVersion("13.0.6");
if (ClassList["warlock"]) {
    ClassList["warlock"].regExpSearch = /^(?=.*warlock)(?!.*laserllama).*$/i;
    ClassSubList["warlock-the fiend"].regExpSearch = /^(?=.*(fiend|devil|demon|daemon|hell|abyss))(?=.*warlock)(?!.*laserllama).*$/i;
    ClassSubList["warlock-the archfey"].regExpSearch = /^(?=.*fey)(?=.*warlock)(?!.*laserllama).*$/i;
    ClassSubList["warlock-the great old one"].regExpSearch = /^(((?=.*(tharizdun|cthulhu))(?=.*warlock))|((?=.*(great|dread))(?=.*(ancient|old))(?=.*\b(one|entity)\b)))(?!.*laserllama).*$/i;

}
// Aggiungi la lista di incantesimi del Warlock di Laserllama
[
    // Cantrips (0 Level)
    "acid splash", "blade ward", "chill touch", "create bonfire",
    "friends", "frostbite", "green-flame blade", "guidance", "light",
    "mage hand", "minor illusion", "poison spray", "prestidigitation", "produce flame",
    "resistance", "sacred flame", "shillelagh", "shocking grasp", "spare the dying",
    "thaumaturgy", "thorn whip", "thunderclap", "toll the dead", "true strike",
    "vicious mockery", "word of radiance",
    // 1st Level
    "armor of agathys", "arms of hadar", "bane", "bless", "burning hands",
    "charm person", "command", "comprehend languages", "detect magic", "disguise self",
    "dissonant whispers", "divine favor", "ensnaring strike", "entangle", "expeditious retreat",
    "faerie fire", "false life", "feather fall", "hellish rebuke", "hex",
    "hunter's mark", "identify", "ill-omened raven", "inflict wounds", "magic missile",
    "protection from evil and good", "ray of sickness", "sanctuary", "searing smite", "shield",
    "shield of faith", "sleep", "thunderous smite", "thunderwave", "unseen servant",
    "witch bolt", "wrathful smite",
    // 2nd Level
    "aid", "alter self", "augury", "blindness/deafness", "blur",
    "branding smite", "calm emotions", "cloud of daggers", "cordon of arrows", "darkness",
    "darkvision", "detect thoughts", "enhance ability", "enlarge/reduce", "find steed",
    "find traps", "flame blade", "flaming sphere", "gentle repose", "gust of wind",
    "hold person", "invisibility", "knock", "lesser restoration", "levitate",
    "locate object", "magic mouth", "magic weapon", "mirror image", "misty step",
    "moonbeam", "pass without trace", "prayer of healing", "protection from poison", "ray of enfeeblement",
    "scorching ray", "see invisibility", "shatter", "silence", "spider climb",
    "spike growth", "spiritual weapon", "suggestion", "warding bond", "web",
    "zone of truth",
    // 3rd Level
    "animate dead", "aura of vitality", "banishment", "beacon of hope", "bestow curse",
    "blinding smite", "blink", "call lightning", "clairvoyance", "conjure animals",
    "counterspell", "create food and water", "crusader's mantle", "daylight", "dispel magic",
    "elemental weapon", "fear", "feign death", "fireball", "flame arrows",
    "fly", "gaseous form", "glyph of warding", "haste", "hunger of hadar",
    "hypnotic pattern", "lightning bolt", "magic circle", "major image", "mass healing word",
    "meld into stone", "nondetection", "phantom steed", "plant growth", "protection from energy",
    "remove curse", "revivify", "sending", "sleet storm", "slow",
    "speak with dead", "speak with plants", "spirit guardians", "stinking cloud", "summon fey",
    "summon lesser demons", "summon shadowspawn", "summon undead", "thunder step", "tiny servant",
    "tongues", "vampiric touch", "water breathing", "water walk", "wind wall",
    // 4th Level
    "arcane eye", "aura of life", "aura of purity", "banishment", "blight",
    "charm monster", "compulsion", "confusion", "conjure minor elementals", "conjure woodland beings",
    "control water", "death ward", "dimension door", "divination", "dominate beast",
    "elemental bane", "evard's black tentacles", "fabricate", "faithful hound", "fire shield",
    "freedom of movement", "giant insect", "grasping vine", "greater invisibility", "guardian of faith",
    "hallucinatory terrain", "ice storm", "leomund's secret chest", "locate creature", "mordenkainen's faithful hound",
    "mordenkainen's private sanctum", "phantasmal killer", "polymorph", "resilient sphere", "secret chest",
    "shadow of moil", "sickening radiance", "staggering smite", "stone shape", "stoneskin",
    "summon aberration", "summon construct", "summon elemental", "summon greater demon", "vitriolic sphere",
    "wall of fire",
    // 5th Level
    "animate objects", "antilife shell", "awaken", "banishing smite", "bigby's hand",
    "circle of power", "cloudkill", "commune", "commune with nature", "cone of cold",
    "conjure elemental", "conjure volley", "contact other plane", "contagion", "creation",
    "danse macabre", "dawn", "destructive wave", "dispel evil and good", "dominate person",
    "dream", "enervation", "far step", "flame strike", "geas",
    "greater restoration", "hallow", "hold monster", "holy weapon", "immolation",
    "infernal calling", "insect plague", "legend lore", "maelstrom", "mass cure wounds",
    "mislead", "modify memory", "negative energy flood", "passwall", "planar binding",
    "raise dead", "reincarnate", "scrying", "seeming", "skill empowerment",
    "steel wind strike", "swift quiver", "telekinesis", "telepathic bond", "teleportation circle",
    "transmute rock", "tree stride", "wall of force", "wall of light", "wall of stone"
].forEach(function (s) { if (SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("warlock(laserllama)") === -1) SpellsList[s].classes.push("warlock(laserllama)"); });

ClassList['warlock(laserllama)'] = {
    regExpSearch: /^(?=.*warlock)(?=.*laserllama).*$/i,
    name: "Warlock (Laserllama)",
    source: [["GMB:LL", 0]],
    primaryAbility: "Intelligence, Wisdom, or Charisma",
    prereqs: "Intelligence, Wisdom, or Charisma 13",
    improvements: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
    die: 8,
    saves: ["Wis", "Int"],
    skillstxt: {
        primary: "Choose two from Arcana, Deception, History, Intimidation, Investigation, Nature, and Religion"
    },
    armorProfs: {
        primary: [true, false, false, false],
        secondary: [true, false, false, false]
    },
    weaponProfs: {
        primary: [true, false],
        secondary: [true, false]
    },
    equipment: "Warlock starting equipment:" +
        "\n \u2022 A light crossbow and 20 bolts -or- any simple weapon;" +
        "\n \u2022 A component pouch -or- an arcane focus;" +
        "\n \u2022 A scholar's pack -or- a dungeoneer's pack;" +
        "\n \u2022 Leather armor, any simple weapon, and two daggers." +
        "\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
    subclasses: ["Otherworldly Patron", []],
    spellcastingFactor: 99,
    spellcastingTable: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 0
        [0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 1
        [2, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 2
        [0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 3
        [0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 4
        [0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl 5
        [0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl 6
        [0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl 7
        [0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl 8
        [0, 0, 0, 0, 2, 0, 0, 0, 0], //lvl 9
        [0, 0, 0, 0, 2, 0, 0, 0, 0], //lvl10
        [0, 0, 0, 0, 3, 0, 0, 0, 0], //lvl11
        [0, 0, 0, 0, 3, 0, 0, 0, 0], //lvl12
        [0, 0, 0, 0, 3, 0, 0, 0, 0], //lvl13
        [0, 0, 0, 0, 3, 0, 0, 0, 0], //lvl14
        [0, 0, 0, 0, 3, 0, 0, 0, 0], //lvl15
        [0, 0, 0, 0, 3, 0, 0, 0, 0], //lvl16
        [0, 0, 0, 0, 4, 0, 0, 0, 0], //lvl17
        [0, 0, 0, 0, 4, 0, 0, 0, 0], //lvl18
        [0, 0, 0, 0, 4, 0, 0, 0, 0], //lvl19
        [0, 0, 0, 0, 4, 0, 0, 0, 0], //lvl20
    ],
    spellcastingKnown: {
        cantrips: [0, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        spells: [0, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10]
    },
    spellcastingList: {
        class: "warlock(laserllama)",
    },
    features: {
        "subclassfeature1": {
            name: "Otherworldly Patron",
            source: [["GMB:LL", 0]],
            minlevel: 2,
            description: desc('Choose the Otherworldly Patron you have a bargain with and put it in the "Class" field ')
        },
        "pact modifier": {
            name: "Pact Modifier",
            description: '\n   Use the "Choose Feature" button above to choose your Pact Modifier',
            extraname: 'Pact Modifier',
            minlevel: 1,
            choices: ["Intelligence", "Wisdom", "Charisma"],
            "intelligence": {
                name: "Pact Modifier",
                spellcastingAbility: 4,
                abilitySave: 4,
                additional: 'Intelligence',
                description: desc([
                    "My Pact modifier for my features is Intelligence",
                ])
            },
            "wisdom": {
                name: "Pact Modifier",
                spellcastingAbility: 5,
                abilitySave: 5,
                additional: 'Wisdom',
                description: desc([
                    "My Pact modifier for my features is Wisdom",
                ])
            },
            "charisma": {
                name: "Pact Modifier",
                spellcastingAbility: 6,
                abilitySave: 6,
                additional: 'Charisma',
                description: desc([
                    "My Pact modifier for my features is Charisma",
                ])
            },
            choiceDependencies: [
                {
                    feature: "pact magic"
                },
                {
                    feature: "eldritch blast"
                },
                {
                    feature: "armor of shadows"
                },
                {
                    feature: "subclassfeature2"
                },
                {
                    feature: "subclassfeature6"
                },
                {
                    feature: "subclassfeature10"
                },
                {
                    feature: "subclassfeature14"
                },
            ]
        },
        "eldritch blast": {
            name: "Eldritch Blast",
            source: [["GMB:LL", 0]],
            minlevel: 1,
            choicesNotInMenu: true,
            choices: ["Intelligence", "Wisdom", "Charisma"],
            "intelligence": {
                name: "Eldritch Blast",
                description: desc([
                    "While holding a Trinket containing an Invocation, I can use my action to make a ranged spellattack against a target I can see within 120 feet. On hit, it takes force damage equal to 1d8 + Pact modifier.",
                ]),
                weaponOptions: {
                    regExpSearch: /^(?=.*eldritch)(?=.*blast) (?=.*ll).*$/i,
                    name: "Eldritch Blast (LL)",
                    baseWeaponName: "eldritch blast ll",
                    source: [["GMB:LL", 0]],
                    ability: 4,
                    type: "eldritch blast",
                    damage: [1, 8, "force"],
                    range: "120 ft",
                    abilitytodamage: true,
                    isNotWeapon: true,
                    isAlwaysProf: true
                },
                weaponProfs: [false, false, ["eldritch blast"]],
                weaponsAdd: ["Eldritch Blast (LL)"],
            },
            "wisdom": {
                name: "Eldritch Blast",
                description: desc([
                    "While holding a Trinket containing an Invocation, I can use my action to make a ranged spellattack against a target I can see within 120 feet. On hit, it takes force damage equal to 1d8 + Pact modifier.",
                ]),
                weaponOptions: {
                    regExpSearch: /^(?=.*eldritch)(?=.*blast) (?=.*ll).*$/i,
                    name: "Eldritch Blast (LL)",
                    baseWeaponName: "eldritch blast ll",
                    source: [["GMB:LL", 0]],
                    ability: 5,
                    type: "eldritch blast",
                    damage: [1, 8, "force"],
                    range: "120 ft",
                    abilitytodamage: true,
                    isNotWeapon: true,
                    isAlwaysProf: true
                },
                weaponProfs: [false, false, ["eldritch blast"]],
                weaponsAdd: ["Eldritch Blast (LL)"],
            },
            "charisma": {
                name: "Eldritch Blast",
                description: desc([
                    "While holding a Trinket containing an Invocation, I can use my action to make a ranged spellattack against a target I can see within 120 feet. On hit, it takes force damage equal to 1d8 + Pact modifier.",
                ]),
                weaponOptions: {
                    regExpSearch: /^(?=.*eldritch)(?=.*blast) (?=.*ll).*$/i,
                    name: "Eldritch Blast (LL)",
                    baseWeaponName: "eldritch blast ll",
                    source: [["GMB:LL", 0]],
                    ability: 6,
                    type: "eldritch blast",
                    damage: [1, 8, "force"],
                    range: "120 ft",
                    abilitytodamage: true,
                    isNotWeapon: true,
                    isAlwaysProf: true
                },
                weaponProfs: [false, false, ["eldritch blast"]],
                weaponsAdd: ["Eldritch Blast (LL)"],
            }
        },
        "eldritch invocations": (function () {
            InvocationsLL = {
                name: "Eldritch Invocations",
                source: [["GMB:LL", 0]],
                minlevel: 1,
                description: desc([
                    'Use the "Choose Feature" button above to add Eldritch Invocations to the third page',
                    "Whenever I gain a warlock level, I can replace an invocation I know with another"
                ]),
                additional: levels.map(function (n) {
                    return n < 3 ? 2 : (n < 5 ? 3 : n < 7 ? 4 : n < 9 ? 5 : n < 12 ? 6 : n < 15 ? 7 : n < 18 ? 8 : 9) + " invocations known";
                }),
                extraname: "Eldritch Invocation",
                toNotesPage: [
                    {
                        name: "Invocations Known",
                        note: desc([
                            "Below are all Eldritch Invocations I know.",
                        ]),
                    },
                ],
                extrachoices: [],
                extraTimes: levels.map(function (n) {
                    return n < 3 ? 2 : (n < 5 ? 3 : n < 7 ? 4 : n < 9 ? 5 : n < 12 ? 6 : n < 15 ? 7 : n < 18 ? 8 : 9);
                }),
            };

            Object.keys(EldritchInvocationsLL).forEach(function (invocationKey) {
                var NewInvocation = EldritchInvocationsLL[invocationKey];

                InvocationsLL.extrachoices.push(NewInvocation.name);

                // Create a new object with all properties from the original invocation
                var invocationCopy = {};

                // Copy all properties from the original invocation
                Object.keys(NewInvocation).forEach(function (prop) {
                    invocationCopy[prop] = NewInvocation[prop];
                });

                // Override toNotesPage for the notes system
                invocationCopy.toNotesPage = [
                    {
                        name: NewInvocation.name,
                        note: desc(NewInvocation.description),
                        amendTo: "Invocations Known",
                    },
                ];

                // Add to the main InvocationsLL object
                InvocationsLL[invocationKey] = invocationCopy;
            });

            return InvocationsLL;
        })(),
        "pact magic": {
            name: "Pact Magic",
            source: [["GMB:LL", 0]],
            minlevel: 2,
            choicesNotInMenu: true,
            choices: ["Intelligence", "Wisdom", "Charisma"],
            "intelligence": {
                name: "Pact Magic",
                description: desc([
                    "I can cast warlock cantrips/spells that I know, using my Pact modifier (Intelligence)",
                    "I can use an arcane focus as a spellcasting focus for my warlock spells",
                    "I regain these spell slots on a short rest",
                    "Spells that I learn through Invocations count as Warlock spells for me, but do not count against my Spells Known"
                ])
            },
            "wisdom": {
                name: "Pact Magic",
                description: desc([
                    "I can cast warlock cantrips/spells that I know, using my Pact modifier (Wisdom)",
                    "I can use an arcane focus as a spellcasting focus for my warlock spells",
                    "I regain these spell slots on a short rest",
                    "Spells that I learn through Invocations count as Warlock spells for me, but do not count against my Spells Known"
                ])
            },
            "charisma": {
                name: "Pact Magic",
                description: desc([
                    "I can cast warlock cantrips/spells that I know, using my Pact modifier (Charisma)",
                    "I can use an arcane focus as a spellcasting focus for my warlock spells",
                    "I regain these spell slots on a short rest",
                    "Spells that I learn through Invocations count as Warlock spells for me, but do not count against my Spells Known"
                ])
            },
            additional: levels.map(function (n, idx) {
                var cantr = [0, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4][idx];
                var splls = [0, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15][idx];
                var slots = n < 2 ? 0 : n < 11 ? 2 : n < 17 ? 3 : 4;
                var sllvl = n < 2 ? 0 : n < 3 ? 1 : n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : 5;
                return cantr + " cantrips \u0026 " + splls + " spells known; " + slots + "\xD7 " + Base_spellLevelList[sllvl] + " spell slot";
            }),
            choiceDependencies: []
        },
        "pact focus": {
            name: "Pact Focus",
            source: [["GMB:LL", 0]],
            minlevel: 3,
            description: desc('Choose a Pact Focus (Blade, Familiar, or Tome) using the "Choose Feature" button above'),
            choices: ["Eldritch Blade", "Eldritch Familiar", "Eldritch Tome"],
            "eldritch blade": {
                name: "Eldritch Blade",
                description: desc([
                    "As an bonus action, I can conjure an eldritch blade in my empty hand; I'm proficient in its use",
                    "I can choose the type of melee weapon every time I create it, and it has those special benefits",
                    "It can be used as a Trinket for one Eldritch Invocation",
                    "I can use my Pact modifier, in place of STR or DEX, for attack and damage rolls with this weapon.",
                    "I am proficient with this weapon if I weren't already",
                    "Attacks with this weapon deal the same type of damage as my Eldritch Blast, but do not apply its other effects",
                    "I can bond one magic melee weapon as an Eldrtich Blade with a 1-hour ritual",
                    "Bonding a second magic melee weapon ends the bond for any previous one"
                ]),
                action: [["bonus action", ""]],
                calcChanges: {
                    atkCalc: [
                        function (fields, v, output) {
                            if (v.theWea.pactWeapon || ((v.isMeleeWeapon || v.theWea.isMagicWeapon || v.thisWeapon[1]) && (/\bpact\b/i).test(v.WeaponTextName))) {
                                v.pactWeapon = true;
                            }
                        }, "",
                        90
                    ],
                    atkAdd: [
                        function (fields, v) {
                            if (v.pactWeapon || v.theWea.pactWeapon || ((v.isMeleeWeapon || v.theWea.isMagicWeapon || v.thisWeapon[1]) && (/\bpact\b/i).test(v.WeaponTextName))) {
                                v.pactWeapon = true;
                                fields.Proficiency = true;
                                if (!v.theWea.isMagicWeapon && !v.thisWeapon[1] && !(/deals my eldritch blast damage type/i).test(fields.Description)) fields.Description += (fields.Description ? '; ' : '') + 'Deals my Eldritch Blast damage type';
                            };
                        },
                        "If I include the word 'Pact' in a melee or magic weapon's name, it gets treated as my Pact Focus.",
                        290
                    ]
                }
            },
            "eldritch familiar": {
                name: "Eldritch Familiar",
                description: desc([
                    "I can cast Conjure Familiar as a ritual and it can be a Aberrant, Draconic, Fiendish, or Faerie Familiar",
                    "It share my initiative and I can use a bonus action to command it",
                    "When I cast a spell or use Eldritch Blast I can choose for the spell, or any number of beams, to originate from the Familiar if I am within 60 feet of it"
                ]),
                spellcastingBonus: [{
                    name: "Eldritch Familiar",
                    spells: ["conjure familiar"],
                    selection: ["conjure familiar"],
                    firstCol: '\xAE'
                }],
                creaturesAdd: [
                    ["Aberrant Familiar", true],
                    ["Draconic Familiar", true],
                    ["Faerie Familiar", true],
                    ["Fiendish Familiar", true],
                ],
                creatureOptions: [
                    {
                        name: "Aberrant Familiar",
                        source: [["GMB:LL", 0]],
                        size: 1,
                        type: "Aberration",
                        alignment: "Chaotic Evil",
                        ac: "11+Prof",
                        hp: 5,
                        hd: [1, 4],
                        hdLinked: ["warlock(laserllama)", "warlock"],
                        minlevelLinked: ["warlock(laserllama)", "warlock"],
                        speed: "10 ft, fly 40 ft (hover)",
                        scores: [3, 16, 12, 13, 10, 8],
                        damage_resistances: "psychic",
                        saves: ["", "", "", "", "", ""],
                        // skills: {
                        //     intimidation: "",
                        //     survival: "",
                        // },
                        senses: "Darkvision 120 ft",
                        passivePerception: 12,
                        languages: "Deep Speech, understands its Warlock",
                        challengeRating: "0",
                        proficiencyBonus: 2,
                        proficiencyBonusLinked: true,
                        attacksAction: 1,
                        attacks: [
                            {
                                name: "Aberrant Whispers",
                                ability: 5,
                                damage: [1, 4, "psychic"],
                                modifiers: ["", "Prof"],
                                range: "30 feet",
                                description: "On fail, target subtract 1d4 from the first roll it makes before familiar's next turn",
                                abilitytodamage: true,
                            },
                        ],
                        features: [
                            {
                                name: "Eldritch Bond",
                                description:
                                    "I add my PB to any ability check where it is proficient or saving throw my Familiar makes (already included).",
                            },
                        ],
                        traits: [
                            {
                                name: "Magic Resistance",
                                description:
                                    "The Familiar has advantage on saves against spells and magical effects.",
                            },
                            {
                                name: "Hit Dice",
                                description:
                                    "The Familiar has a total number of d4 Hit Dice equal to your Warlock level. It also gains all the normal benefits of both short and long rest",
                            },
                        ],
                        notes: [
                            {
                                name: "The Familiar obeys the commands of its leader",
                                description: "and shares its proficiency bonus.",
                                joinString: " ",
                            },
                            {
                                name: "It takes its turn during that of its leader,",
                                description: "on the same initiative count.",
                                joinString: " ",
                            },
                            {
                                name: "It can move and take reactions on its own,",
                                description:
                                    "but only takes the Dodge action on its turn unless its leader takes a bonus action to command it to take another action.",
                                joinString: " ",
                            },
                            {
                                name: "If its leader is incapacitated,",
                                description: "the familiar can take any action, not just Dodge.",
                                joinString: " ",
                            },
                            {
                                name: "If the familiar is reduced to 0 hit points,",
                                description:
                                    "it makes death saving throws like a player character would.",
                                joinString: " ",
                            },
                        ],
                        addMod: [
                            {
                                type: "skill",
                                field: "Survival",
                                mod: "2+Prof",
                                text: "The savage companion adds my proficiency bonus to all its Survival checks.",
                            },
                            {
                                type: "save",
                                field: "All",
                                mod: "Prof",
                                text: "The savage companion adds my proficiency bonus to all its saving throws.",
                            },
                        ],
                        calcChanges: {
                            hp: function (totalHD, HDobj, prefix) {
                                //if (!classes.known.ranger && !classes.known.rangerua) return;
                                var rngrLvl = classes.known["warlock(laserllama)"]
                                    ? classes.known["warlock(laserllama)"].level
                                    : classes.known.barbarian.level;
                                var rngrLvlM = 3 * rngrLvl;
                                HDobj.alt.push(5 + rngrLvlM);
                                HDobj.altStr.push(
                                    " = 5 as a base\n + 3 \xD7 " +
                                    rngrLvl +
                                    " from three times its leader's warlock level (" +
                                    rngrLvlM +
                                    ")"
                                );
                            },
                            setAltHp: true,
                        },
                    },
                    {
                        name: "Fiendish Familiar",
                        source: [["GMB:LL", 0]],
                        size: 1,
                        type: "Fiend",
                        alignment: "Chaotic Evil",
                        ac: "11+Prof",
                        hp: 5,
                        hd: [1, 4],
                        hdLinked: ["warlock(laserllama)", "warlock"],
                        minlevelLinked: ["warlock(laserllama)", "warlock"],
                        speed: "20 ft, fly 40 ft",
                        scores: [3, 16, 12, 10, 8, 13],
                        condition_immunities: "poisoned",
                        damage_resistances: "cold, fire, poison",
                        saves: ["", "", "", "", "", ""],
                        // skills: {
                        //     intimidation: "",
                        //     survival: "",
                        // },
                        senses: "Darkvision 60 ft",
                        passivePerception: 12,
                        languages: "Abyssal, Infernal, understands its Warlock",
                        challengeRating: "0",
                        proficiencyBonus: 2,
                        proficiencyBonusLinked: true,
                        attacksAction: 1,
                        attacks: [
                            {
                                name: "Claw",
                                ability: 5,
                                damage: [1, 4, "psychic"],
                                modifiers: ["", "Prof"],
                                range: "Melee (5 ft)",
                                description: "The target must succeed on a Constitution saving throw or it is poisoned until the beginning of the Familiar's next turn.",
                                abilitytodamage: true,
                            },
                        ],
                        actions: [{
                            name: "Shapechanger",
                            description: "The Familiar can transform into a beast form that resembles a rat (speed 20 ft., climb 20 ft.), a lizard (20 ft., swim 20 ft.) a raven (20 ft., fly 60 ft.), or back to its true form. Its statistics are the same in each form, except for its speed. Its equipment is not transformed, and it reverts to its true form if it dies."
                        }],
                        features: [
                            {
                                name: "Eldritch Bond",
                                description:
                                    "I add my PB to any ability check where it is proficient or saving throw my Familiar makes (already included).",
                            },
                        ],
                        traits: [
                            {
                                name: "Magic Resistance",
                                description:
                                    "The Familiar has advantage on saves against spells and magical effects.",
                            },
                            {
                                name: "Devil's Sight",
                                description:
                                    "Magical darkness does not impede the Familiar's darkvision.",
                            },
                            {
                                name: "Hit Dice",
                                description:
                                    "The Familiar has a total number of d4 Hit Dice equal to your Warlock level. It also gains all the normal benefits of both short and long rest",
                            },
                        ],
                        notes: [
                            {
                                name: "The Familiar obeys the commands of its leader",
                                description: "and shares its proficiency bonus.",
                                joinString: " ",
                            },
                            {
                                name: "It takes its turn during that of its leader,",
                                description: "on the same initiative count.",
                                joinString: " ",
                            },
                            {
                                name: "It can move and take reactions on its own,",
                                description:
                                    "but only takes the Dodge action on its turn unless its leader takes a bonus action to command it to take another action.",
                                joinString: " ",
                            },
                            {
                                name: "If its leader is incapacitated,",
                                description: "the familiar can take any action, not just Dodge.",
                                joinString: " ",
                            },
                            {
                                name: "If the familiar is reduced to 0 hit points,",
                                description:
                                    "it makes death saving throws like a player character would.",
                                joinString: " ",
                            },
                        ],
                        addMod: [
                            {
                                type: "skill",
                                field: "Survival",
                                mod: "2+Prof",
                                text: "The savage companion adds my proficiency bonus to all its Survival checks.",
                            },
                            {
                                type: "save",
                                field: "All",
                                mod: "Prof",
                                text: "The savage companion adds my proficiency bonus to all its saving throws.",
                            },
                        ],
                        calcChanges: {
                            hp: function (totalHD, HDobj, prefix) {
                                //if (!classes.known.ranger && !classes.known.rangerua) return;
                                var rngrLvl = classes.known["warlock(laserllama)"]
                                    ? classes.known["warlock(laserllama)"].level
                                    : classes.known.barbarian.level;
                                var rngrLvlM = 3 * rngrLvl;
                                HDobj.alt.push(5 + rngrLvlM);
                                HDobj.altStr.push(
                                    " = 5 as a base\n + 3 \xD7 " +
                                    rngrLvl +
                                    " from three times its leader's warlock level (" +
                                    rngrLvlM +
                                    ")"
                                );
                            },
                            setAltHp: true,
                        },
                    },
                    {
                        name: "Faerie Familiar",
                        source: [["GMB:LL", 0]],
                        size: 1,
                        type: "Fey",
                        alignment: "Chaotic Neutral",
                        ac: "11+Prof",
                        hp: 5,
                        hd: [1, 4],
                        hdLinked: ["warlock(laserllama)", "warlock"],
                        minlevelLinked: ["warlock(laserllama)", "warlock"],
                        speed: "20 ft, fly 40 ft",
                        scores: [3, 16, 10, 8, 13, 12],
                        condition_immunities: "charmed, frightened",
                        saves: ["", "", "", "", "", ""],
                        // skills: {
                        //     intimidation: "",
                        //     survival: "",
                        // },
                        passivePerception: 13,
                        languages: "Elvish, Sylvan, understands its Warlock",
                        challengeRating: "0",
                        proficiencyBonus: 2,
                        proficiencyBonusLinked: true,
                        attacksAction: 1,
                        attacks: [
                            {
                                name: "Sting",
                                ability: 5,
                                damage: [1, 4, "piercing"],
                                modifiers: ["", "Prof"],
                                range: "Melee (5 ft)",
                                description: "The Familiar also learns the target's current emotional state and its alignment (if any).",
                                abilitytodamage: true,
                            },
                        ],
                        actions: [{
                            name: "Invisibility",
                            description: "The Familiar magically turns invisible until it attacks or forces a creature to make an ability check or saving throw. Equipment it is wearing or carrying turns invisible with it. The Familiar must concentrate on this effect as if it were concentrating on a spell."
                        }],
                        features: [
                            {
                                name: "Eldritch Bond",
                                description:
                                    "I add my PB to any ability check where it is proficient or saving throw my Familiar makes (already included).",
                            },
                        ],
                        traits: [
                            {
                                name: "Magic Resistance",
                                description:
                                    "The Familiar has advantage on saves against spells and magical effects.",
                            },
                            {
                                name: "Hit Dice",
                                description:
                                    "The Familiar has a total number of d4 Hit Dice equal to your Warlock level. It also gains all the normal benefits of both short and long rest",
                            },
                        ],
                        notes: [
                            {
                                name: "The Familiar obeys the commands of its leader",
                                description: "and shares its proficiency bonus.",
                                joinString: " ",
                            },
                            {
                                name: "It takes its turn during that of its leader,",
                                description: "on the same initiative count.",
                                joinString: " ",
                            },
                            {
                                name: "It can move and take reactions on its own,",
                                description:
                                    "but only takes the Dodge action on its turn unless its leader takes a bonus action to command it to take another action.",
                                joinString: " ",
                            },
                            {
                                name: "If its leader is incapacitated,",
                                description: "the familiar can take any action, not just Dodge.",
                                joinString: " ",
                            },
                            {
                                name: "If the familiar is reduced to 0 hit points,",
                                description:
                                    "it makes death saving throws like a player character would.",
                                joinString: " ",
                            },
                        ],
                        addMod: [
                            {
                                type: "skill",
                                field: "Survival",
                                mod: "2+Prof",
                                text: "The savage companion adds my proficiency bonus to all its Survival checks.",
                            },
                            {
                                type: "save",
                                field: "All",
                                mod: "Prof",
                                text: "The savage companion adds my proficiency bonus to all its saving throws.",
                            },
                        ],
                        calcChanges: {
                            hp: function (totalHD, HDobj, prefix) {
                                //if (!classes.known.ranger && !classes.known.rangerua) return;
                                var rngrLvl = classes.known["warlock(laserllama)"]
                                    ? classes.known["warlock(laserllama)"].level
                                    : classes.known.barbarian.level;
                                var rngrLvlM = 3 * rngrLvl;
                                HDobj.alt.push(5 + rngrLvlM);
                                HDobj.altStr.push(
                                    " = 5 as a base\n + 3 \xD7 " +
                                    rngrLvl +
                                    " from three times its leader's warlock level (" +
                                    rngrLvlM +
                                    ")"
                                );
                            },
                            setAltHp: true,
                        },
                    },
                    {
                        name: "Draconic Familiar",
                        source: [["GMB:LL", 0]],
                        size: 1,
                        type: "Dragon",
                        alignment: "Lawful Evil",
                        ac: "13+Prof",
                        hp: 5,
                        hd: [1, 4],
                        hdLinked: ["warlock(laserllama)", "warlock"],
                        minlevelLinked: ["warlock(laserllama)", "warlock"],
                        speed: "20 ft, fly 60 ft",
                        scores: [3, 16, 12, 10, 8, 13],
                        saves: ["", "", "", "", "", ""],
                        // skills: {
                        //     intimidation: "",
                        //     survival: "",
                        // },
                        damage_resistances: "Draconic Essence damage type",
                        passivePerception: 13,
                        languages: "Draconic, understands its Warlock",
                        challengeRating: "0",
                        proficiencyBonus: 2,
                        proficiencyBonusLinked: true,
                        attacksAction: 1,
                        attacks: [
                            {
                                name: "Bite",
                                ability: 5,
                                damage: [[1, 4, "piercing"]],
                                modifiers: ["", "Prof"],
                                range: "Melee (5 ft)",
                                description: "Deals 1d4 Draconic Essence extra damage on hit",
                                abilitytodamage: true,
                            },
                        ],
                        features: [
                            {
                                name: "Eldritch Bond",
                                description:
                                    "I add my PB to any ability check where it is proficient or saving throw my Familiar makes (already included).",
                            },
                        ],
                        traits: [
                            {
                                name: "Magic Resistance",
                                description:
                                    "The Familiar has advantage on saves against spells and magical effects.",
                            },
                            {
                                name: "Draconic Essence",
                                description:
                                    "When it is conjured, the Familiar's Warlock choose its Draconic Essence between the following: Acid, Cold, Fire, Poison, Lightning",
                            },
                            {
                                name: "Hit Dice",
                                description:
                                    "The Familiar has a total number of d4 Hit Dice equal to your Warlock level. It also gains all the normal benefits of both short and long rest",
                            },
                        ],
                        notes: [
                            {
                                name: "The Familiar obeys the commands of its leader",
                                description: "and shares its proficiency bonus.",
                                joinString: " ",
                            },
                            {
                                name: "It takes its turn during that of its leader,",
                                description: "on the same initiative count.",
                                joinString: " ",
                            },
                            {
                                name: "It can move and take reactions on its own,",
                                description:
                                    "but only takes the Dodge action on its turn unless its leader takes a bonus action to command it to take another action.",
                                joinString: " ",
                            },
                            {
                                name: "If its leader is incapacitated,",
                                description: "the familiar can take any action, not just Dodge.",
                                joinString: " ",
                            },
                            {
                                name: "If the familiar is reduced to 0 hit points,",
                                description:
                                    "it makes death saving throws like a player character would.",
                                joinString: " ",
                            },
                        ],
                        addMod: [
                            {
                                type: "skill",
                                field: "Survival",
                                mod: "2+Prof",
                                text: "The savage companion adds my proficiency bonus to all its Survival checks.",
                            },
                            {
                                type: "save",
                                field: "All",
                                mod: "Prof",
                                text: "The savage companion adds my proficiency bonus to all its saving throws.",
                            },
                        ],
                        calcChanges: {
                            hp: function (totalHD, HDobj, prefix) {
                                //if (!classes.known.ranger && !classes.known.rangerua) return;
                                var rngrLvl = classes.known["warlock(laserllama)"]
                                    ? classes.known["warlock(laserllama)"].level
                                    : classes.known.barbarian.level;
                                var rngrLvlM = 3 * rngrLvl;
                                HDobj.alt.push(5 + rngrLvlM);
                                HDobj.altStr.push(
                                    " = 5 as a base\n + 3 \xD7 " +
                                    rngrLvl +
                                    " from three times its leader's warlock level (" +
                                    rngrLvlM +
                                    ")"
                                );
                            },
                            setAltHp: true,
                        },
                    },
                ],
            },
            "eldritch tome": {
                name: "Eldritch Tome",
                source: [["GMB:LL", 0]],
                description: desc([
                    "I have a Book of Shadows with any Warlock spell I know contained in it, that is destroyed if I die",
                    "I gain an extra Invocation Known but I can only choose one without prereq, and it can be replaced each long rest with another without prereq",
                    "At the end of each long rest I can replace a Warlock spell I know with another one with the same level",
                    "I can cast a spell in my Tome as a Ritual if that Warlock spell has the ritual tag",
                    "I can create a copy of my Tome with 1-hour ritual destroying the previous one"
                ]),
                bonusClassExtrachoices: [
                    {
                        class: "warlock(laserllama)",
                        feature: "eldritch invocations",
                        bonus: 1,
                        filter: function (eInvocation) {
                            return eInvocation.prereq == undefined;
                        },
                    },
                ],
            }
        },
        "empowered blast": {
            name: "Empowered Blast",
            source: [["GMB:LL", 0]],
            minlevel: 5,
            description: levels.map(function (n) {
                var beams = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4];
                return "I create " + beams[n] + " beams when I use Eldritch Blast and I can direct each beams at the same target or different ones, but I make separate attack roll for each";
            })
        },
        "elder arcanum": (function () {
            // Fixed attributes
            ArcanumLL = {
                name: "Elder Arcanum",
                source: [["GMB:LL", 0]],
                minlevel: 1,
                description: desc([
                    'Use the "Choose Feature" button above to add Elder Arcanums to the third page',
                    "Cannot be replaced or unlearned once choosen"
                ]),
                additional: levels.map(function (n) {
                    return (n < 11 ? 0 : n < 13 ? 1 : n < 15 ? 2 : n < 17 ? 3 : 4) + " arcanums known";
                }),
                extraname: "Elder Arcanums",
                toNotesPage: [
                    {
                        name: "Arcanums Known",
                        note: desc([
                            "Below are all Elder Arcanums I know.",
                        ]),
                    },
                ],
                extrachoices: [],
                extraTimes: levels.map(function (n) {
                    return n < 11 ? 0 : n < 13 ? 1 : n < 15 ? 2 : n < 17 ? 3 : 4;
                }),
            };

            Object.keys(ElderArcanumsLL).forEach(function (invocationKey) {
                var NewArcanum = ElderArcanumsLL[invocationKey];

                ArcanumLL.extrachoices.push(NewArcanum.name);

                // Create a new object with all properties from the original invocation
                var invocationCopy = {};

                // Copy all properties from the original invocation
                Object.keys(NewArcanum).forEach(function (prop) {
                    invocationCopy[prop] = NewArcanum[prop];
                });

                // Override toNotesPage for the notes system
                invocationCopy.toNotesPage = [
                    {
                        name: NewArcanum.name,
                        note: desc(NewArcanum.description),
                        amendTo: "Arcanums Known",
                    },
                ];

                // Add to the main InvocationsLL object
                ArcanumLL[invocationKey] = invocationCopy;
            });

            return ArcanumLL;
        })(),
        "pact master": {
            name: "Pact Master",
            source: [["SRD", 48], ["P", 108]],
            minlevel: 20,
            description: desc("Once per long rest, I can regain all used pact magic spells slots with an action"),
            recovery: "long rest",
            actions: [["action", ""]],
            usages: 1
        }
    }
};

function returnDragonSparkDamage() {
    var type = GetFeatureChoice('subclass', 'ancient wyrm', 'subclassfeature2');
    if (!type) return [1, 10, "force"];

    var damageMap = {
        "acid": [1, 10, "acid"],
        "cold": [1, 10, "cold"],
        "fire": [1, 10, "fire"],
        "lightning": [1, 10, "lightning"],
        "poison": [1, 10, "poison"],
        "thunder": [1, 10, "thunder"],
        "radiant": [1, 10, "radiant"],
        "necrotic": [1, 10, "necrotic"],
        "force": [1, 10, "force"],
        "psychic": [1, 10, "psychic"]
    };

    return damageMap[type.toLowerCase()] || [1, 10, "force"];
}

function returnDraconicBlast(n) {
    return {
        regExpSearch: /^(?=.*draconic)(?=.*blast).*$/i,
        name: "Draconic Blast",
        source: [["GMB:LL", 0]],
        ability: n,
        type: "Special",
        damage: returnDragonSparkDamage(),
        range: "15 ft cone",
        description: "15 ft cone, Dex save or take Eldritch Blast damage (Draconic Spark type); 1s and 2s on damage dice count as 3s",
        save: "Dexterity",
        saveDC: "spell",
        isSpell: true,
        isNotWeapon: true,
        isAlwaysProf: true
    };
}

function returnBlindingDefiance(n) {
    return {
        regExpSearch: /^(?=.*blinding)(?=.*defiance).*$/i,
        name: "Blinding Defiance",
        source: [["GMB:LL", 0]],
        ability: n,
        type: "Special",
        damage: [8, 6, "radiant"],
        range: "30 ft radius",
        description: "On death save, return to life with half HP. Creatures in 30 ft: Con save or 8d6 radiant damage and blinded until end of your turn (half damage on save).",
        save: "Constitution",
        saveDC: "spell",
        isSpell: true,
        isNotWeapon: true
    };
}

// Archfey Patron
AddSubClass("warlock(laserllama)", "archfey", {
    regExpSearch: /^(?=.*archfey)(?=.*warlock).*$/i,
    subname: "Archfey Patron",
    fullname: "Archfey Warlock",
    source: ["GMB:LL", 0],
    features: {
        "subclassfeature2": {
            name: "Fey Magic",
            source: ["GMB:LL", 0],
            minlevel: 2,
            name: "Fey Magic",
            description: desc([
                "Your Patron infuses your magic with its whimsical fey power.",
                "You can choose for your Eldritch Blast beams to deal psychic damage."
            ]),
            spellcastingExtra: [
                "faerie fire", "sleep",
                "misty step", "phantasmal force",
                "fear", "hypnotic pattern",
                "hallucinatory terrain", "greater invisibility",
                "mislead", "seeming"
            ],
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                            fields.Description += (fields.Description ? '; ' : '') +
                                "Can deal psychic damage (Fey Magic)";
                        }
                    },
                    "Fey Magic: Eldritch Blast can deal psychic damage.",
                    285
                ]
            }
        },
        "subclassfeature2.1": {
            name: "Fey Presence",
            source: ["GMB:LL", 0],
            minlevel: 2,
            description: desc([
                "As an action, you can force one creature within 10 feet that can see or hear you to make a Wisdom saving throw against your Spell save DC.",
                "On a failed save, it is charmed or frightened by you (your choice) for 10 minutes.",
                "The effect ends if the creature takes damage, or if you or your allies attack it or force it to make a saving throw.",
                "You can use this feature once between each short or long rest at no cost.",
                "When you have no uses, you can expend one of your Pact Magic spell slots to use it an additional time."
            ]),
            action: ["action", ""],
            usages: 1,
            recovery: "short rest",
        },
        "subclassfeature6": {
            name: "Beguiling Blast",
            source: ["GMB:LL", 0],
            minlevel: 6,
            description: desc([
                "Your magic clouds the minds of your foes.",
                "When you deal psychic damage to a creature with Eldritch Blast, it has disadvantage on the first attack roll it makes before the start of your next turn.",
                "Any creature immune to the charmed condition is also immune to this effect."
            ]),
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                            fields.Description += (fields.Description ? '; ' : '') +
                                "Target: disadvantage on first attack before your next turn if not immune to charmed (Beguiling Blast)";
                        }
                    },
                    "Beguiling Blast: Psychic Eldritch Blast gives disadvantage on target's next attack if not immune to charmed.",
                    286
                ]
            }
        },
        "subclassfeature6.1": {
            name: "Misty Escape",
            source: ["GMB:LL", 0],
            minlevel: 6,
            description: desc([
                "When you take damage, you can use your reaction to turn invisible and teleport to an unoccupied space you can see within 60 feet.",
                "You remain invisible until the start of your next turn, or until you attack, cast a spell, or force a saving throw.",
                "Once you use this feature you must finish a short or long rest before you can use it again.",
                "When you have no uses left, you can expend one Pact Magic spell slot to use it again."
            ]),
            action: ["reaction", ""],
            usages: 1,
            recovery: "short rest",
        },
        "subclassfeature10": {
            name: "Whimsical Defense",
            source: ["GMB:LL", 0],
            minlevel: 10,
            description: desc([
                "You are immune to the charmed condition.",
                "If a creature attempts to charm you, you can use your reaction to force it to make a Wisdom saving throw against your Spell save DC.",
                "On a failed save, it suffers the effect of Fey Presence.",
                "If it is immune to the charmed condition, it instead takes psychic damage equal to your Warlock level on a failed save."
            ]),
            action: ["reaction", ""],
            savetxt: {
                immune: ["charmed"],
            },
        },
        "subclassfeature14": {
            name: "Terrible Delights",
            source: ["GMB:LL", 0],
            minlevel: 14,
            description: desc([
                "Your fey magic overwhelms even the strongest minds.",
                "Your Warlock spells and features ignore immunity to the charmed condition.",
                "However, these creatures have advantage on their saving throws to resist being charmed by you.",
                "Whenever a creature fails its saving throw against Fey Presence, you can plunge it into an illusory realm of emotion, but this enhanced effect requires your concentration.",
                "For the duration, the target can see and hear only itself, you, and this illusory reality of your creation.",
                "Each time it takes damage, it can repeat its Wisdom saving throw, ending this effect on a success.",
                "Once a creature succeeds on this saving throw it is immune to this effect for 24 hours."
            ]),
        }
    }
});

// Ancient Wyrm Patron
AddSubClass("warlock(laserllama)", "ancient wyrm", {
    regExpSearch: /^(?=.*ancient)(?=.*wyrm).*$/i,
    subname: "Ancient Wyrm Patron",
    fullname: "Ancient Wyrm Warlock",
    source: ["GMB:LL", 0],
    features: {
        "subclassfeature2": {
            name: "Draconic Spark",
            source: ["GMB:LL", 0],
            minlevel: 2,
            description: desc([
                'Choose your Draconic Spark with the "Choose Feature" button'
            ]),
            choicesNotInMenu: true,
            choices: ["Acid", "Cold", "Fire", "Lightning", "Poison", "Thunder", "Radiant", "Necrotic", "Force", "Psychic"],
            "acid": {
                name: "Draconic Spark: Acid",
                description: "Your Draconic Spark is acid. You gain resistance to acid damage and can change Eldritch Blast and Warlock spells damage to acid.",
                dmgres: ["Acid"],
                languageProfs: ["Draconic"],
                draconicType: "acid"
            },
            "cold": {
                name: "Draconic Spark: Cold",
                description: "Your Draconic Spark is cold. You gain resistance to cold damage and can change Eldritch Blast and Warlock spells damage to cold.",
                dmgres: ["Cold"],
                languageProfs: ["Draconic"],
                draconicType: "cold"
            },
            "fire": {
                name: "Draconic Spark: Fire",
                description: "Your Draconic Spark is fire. You gain resistance to fire damage and can change Eldritch Blast and Warlock spells damage to fire.",
                dmgres: ["Fire"],
                languageProfs: ["Draconic"],
                draconicType: "fire"
            },
            "lightning": {
                name: "Draconic Spark: Lightning",
                description: "Your Draconic Spark is lightning. You gain resistance to lightning damage and can change Eldritch Blast and Warlock spells damage to lightning.",
                dmgres: ["Lightning"],
                languageProfs: ["Draconic"],
                draconicType: "lightning"
            },
            "poison": {
                name: "Draconic Spark: Poison",
                description: "Your Draconic Spark is poison. You gain resistance to poison damage and can change Eldritch Blast and Warlock spells damage to poison.",
                dmgres: ["Poison"],
                languageProfs: ["Draconic"],
                draconicType: "poison"
            },
            "thunder": {
                name: "Draconic Spark: Thunder",
                submenu: "Ask DM first",
                description: "Your Draconic Spark is thunder. You gain resistance to thunder damage and can change Eldritch Blast and Warlock spells damage to thunder.",
                dmgres: ["Thunder"],
                languageProfs: ["Draconic"],
                draconicType: "thunder"
            },
            "radiant": {
                name: "Draconic Spark: Radiant",
                submenu: "Ask DM first",
                description: "Your Draconic Spark is radiant. You gain resistance to radiant damage and can change Eldritch Blast and Warlock spells damage to radiant.",
                dmgres: ["Radiant"],
                languageProfs: ["Draconic"],
                draconicType: "radiant"
            },
            "necrotic": {
                name: "Draconic Spark: Necrotic",
                submenu: "Ask DM first",
                description: "Your Draconic Spark is necrotic. You gain resistance to necrotic damage and can change Eldritch Blast and Warlock spells damage to necrotic.",
                dmgres: ["Necrotic"],
                languageProfs: ["Draconic"],
                draconicType: "necrotic"
            },
            "force": {
                name: "Draconic Spark: Force",
                submenu: "Ask DM first",
                description: "Your Draconic Spark is force. You gain resistance to force damage and can change Eldritch Blast and Warlock spells damage to force.",
                dmgres: ["Force"],
                languageProfs: ["Draconic"],
                draconicType: "force"
            },
            "psychic": {
                name: "Draconic Spark: Psychic",
                submenu: "Ask DM first",
                description: "Your Draconic Spark is psychic. You gain resistance to psychic damage and can change Eldritch Blast and Warlock spells damage to psychic.",
                dmgres: ["Psychic"],
                languageProfs: ["Draconic"],
                draconicType: "psychic"
            },
            spellcastingExtra: [
                "command", "burning hands",
                "dragon's breath", "scorching ray",
                "fear", "fireball",
                "dominate beast", "wall of fire",
                "conjure dragon", "dominate person"
            ],
        },
        "subclassfeature6": {
            name: "Draconic Blast",
            source: ["GMB:LL", 0],
            minlevel: 6,
            description: desc([
                "Whenever you use Eldritch Blast, you can choose to exhale a blast of elemental energy from your mouth in a 15-foot cone in place of any number of Eldritch Blast Beams.",
                "Creatures in that area must succeed on a Dexterity saving throw against your Spell save DC.",
                "On a failed save, they suffer the effects of one beam of Eldritch Blast, including damage.",
                "Damage dealt by this breath weapon is always Draconic Spark damage.",
                "Also, whenever you deal your Draconic Spark damage type with a Warlock spell or with your Eldritch Blast you can treat a roll of 1 or 2 on any of the damage dice as a 3."
            ]),
            choicesNotInMenu: true,
            "intelligence": {
                weaponOptions: returnDraconicBlast(4),
                weaponAdd: ["Draconic Blast"]
            },
            "charisma": {
                weaponOptions: returnDraconicBlast(5),
                weaponAdd: ["Draconic Blast"]
            },
            "wisdom": {
                weaponOptions: returnDraconicBlast(6),
                weaponAdd: ["Draconic Blast"]
            },
        },
        "subclassfeature10": {
            name: "Regal Presence",
            source: ["GMB:LL", 0],
            minlevel: 10,
            description: desc([
                "You have developed willpower to rival your ancient Patron.",
                "You are immune to the charmed and frightened conditions.",
                "You also learn the Beguiling Influence Invocation.",
                "It does not count against your number of Invocations Known, and it cannot be replaced.",
                "If you already know this Invocation, you gain another Eldritch Invocation of your choice."
            ]),
            savetxt: {
                immune: ["charmed", "frightened"]
            },
            bonusClassExtrachoices: [
                {
                    class: "warlock(laserllama)",
                    feature: "eldritch invocations",
                    bonus: 1,
                    filter: function (eInvocation) {
                        return eInvocation.name && eInvocation.name.toLowerCase().includes("beguiling influence");
                    },
                },
            ],
        },
        "subclassfeature14": {
            name: "Dragon Wings",
            source: ["GMB:LL", 0],
            minlevel: 14,
            description: desc([
                "As a bonus action on your turn, you can manifest (or retract) a pair of leathery Draconic Wings, which sprout from your back.",
                "While these wings are manifested, you have a flying speed equal to your walking speed.",
                "When you manifest these wings, they destroy any armor or clothing that isn't designed to accommodate your wings."
            ]),
            action: ["bonus action", ""],
            speed: {
                fly: { number: "walk", condition: "While wings are manifested" }
            }
        },
        "subclassfeature14.1": {
            name: "Ancient Blast",
            source: ["GMB:LL", 0],
            minlevel: 14,
            description: desc([
                "The full power of your Patron's Draconic Spark is realized.",
                "When you use Draconic Blast, you can choose for it to be a 25-foot cone or a 50-foot line.",
                "Finally, whenever you use Draconic Blast, you can expend one of your Pact Magic spell slots to empower that blast.",
                "On a failed save, targets take additional Draconic Spark damage equal to 1d10 per level of your Pact Magic spell slot, and they take half as much damage on a successful saving throw."
            ]),
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.WeaponName && v.WeaponName.match(/draconic blast/i)) {
                            fields.Description += (fields.Description ? '; ' : '') +
                                "25 ft cone or 50 ft line range";
                            fields.Description += (fields.Description ? '; ' : '') +
                                "Can expend spell slot: +1d10 damage per slot level (half on save)";
                        }
                    },
                    "Ancient Blast: Improved Draconic Blast options.",
                    287
                ]
            },
        }
    }
});

// Fiend Patron
AddSubClass("warlock(laserllama)", "fiend", {
    regExpSearch: /^(?=.*fiend).*$/i,
    subname: "Fiend Patron",
    fullname: "Fiend Warlock",
    source: ["GMB:LL", 0],
    features: {
        "subclassfeature2": {
            name: "Fiendish Magic",
            source: ["GMB:LL", 0],
            minlevel: 2,
            description: desc([
                "Your Patron infuses your magic with infernal flame.",
                "You can choose for Eldritch Blast to deal fire damage, ignoring resistance to fire damage.",
            ]),
            spellcastingExtra: [
                "command", "hellish rebuke",
                "blindness/deafness", "flame whip",
                "bestow curse", "fireball",
                "blight", "wall of fire",
                "cloudkill", "immolation"
            ],
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                            fields.Description += (fields.Description ? '; ' : '') +
                                "Can deal fire damage ignoring resistance (Fiendish Magic)";
                        }
                    },
                    "Fiendish Magic: Eldritch Blast can deal fire damage ignoring resistance.",
                    286
                ]
            }
        },
        "subclassfeature2.1": {
            name: "Dark Vitality",
            source: ["GMB:LL", 0],
            minlevel: 2,
            description: desc([
                "You can draw vitality from death.",
                "Whenever you kill a hostile creature, you can choose to gain temporary hit points equal to your Warlock level + your Pact modifier.",
                "You can also use this feature as a reaction when a hostile creature within 10 feet of you is reduced to 0 hit points."
            ]),
            action: ["reaction", "when hostile dies within 10 ft"],
            additional: function () {
                var warlockLevel = classes.known['warlock(laserllama)'] ? classes.known['warlock(laserllama)'].level : 0;
                var pactMod = GetFeatureChoice('class', 'warlock(laserllama)', 'pact modifier');
                var modValue = 0;

                if (pactMod === "Intelligence") modValue = What('Int Mod');
                else if (pactMod === "Wisdom") modValue = What('Wis Mod');
                else modValue = What('Cha Mod');

                return "Temp HP: " + (warlockLevel + Math.max(modValue, 1));
            },
        },
        "subclassfeature6": {
            name: "Accursed Blast",
            source: ["GMB:LL", 0],
            minlevel: 6,
            description: desc([
                "Your magic scours the very soul of your foes.",
                "Whenever you deal fire damage to a creature with Eldritch Blast it cannot regain hit points or gain temporary hit points until the start of your next turn."
            ]),
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                            fields.Description += (fields.Description ? '; ' : '') +
                                "Target cannot regain HP or gain temp HP until your next turn (Accursed Blast)";
                        }
                    },
                    "Accursed Blast: Fire Eldritch Blast prevents HP recovery.",
                    287
                ]
            },
        },
        "subclassfeature6.1": {
            name: "Dark Bargain",
            source: ["GMB:LL", 0],
            minlevel: 6,
            description: desc([
                "You can sacrifice your vitality to alter fate in your favor.",
                "When you make an ability check or saving throw you can roll a d10, adding the result to your roll and reducing your hit points by the same amount.",
                "You must choose to use this feature before you roll the d20 for your ability check or saving throw."
            ]),
        },
        "subclassfeature10": {
            name: "Fiendish Resilience",
            source: ["GMB:LL", 0],
            minlevel: 10,
            description: desc([
                "At the end of each short or long rest you choose one type of damage.",
                "You gain resistance to that type of damage until the end of your next short or long rest.",
                "Damage you take from magical or silvered weapons ignores this resistance."
            ]),
        },
        "subclassfeature14": {
            name: "Hurl Through Hell",
            source: ["GMB:LL", 0],
            minlevel: 14,
            description: desc([
                "You can temporarily inflict the horrors of hell upon your foes.",
                "When you deal damage to a creature with Eldritch Blast you can teleport it to the infernal plane of your Patron where it experiences the full horror of that plane.",
                "At the end of your next turn, it returns to the space it previously occupied or the nearest unoccupied space.",
                "If the creature was not a fiend, it takes 6d10 psychic damage as it grapples with the horror.",
                "Once you use this feature you must finish a short or long rest before you can use it again."
            ]),
            usages: 1,
            recovery: "short rest",
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                            fields.Description += (fields.Description ? '; ' : '') +
                                "Option: Hurl Through Hell (non-fiends: 6d10 psychic damage) 1/short rest";

                        }
                    },
                    "Hurl Through Hell: Optional effect on Eldritch Blast hit.",
                    288
                ]
            },
        }
    }
});

// Great Old One Patron
AddSubClass("warlock(laserllama)", "great old one", {
    regExpSearch: /^(?=.*great)(?=.*old)(?=.*one).*$/i,
    subname: "Great Old One Patron",
    fullname: "Great Old One Warlock",
    source: ["GMB:LL", 0],
    features: {
        "subclassfeature2": {
            name: "Aberrant Magic",
            source: ["GMB:LL", 0],
            minlevel: 2,
            description: desc([
                "Your Patron infuses your magic with alien power.",
                "Whenever you fire a beam with Eldritch Blast, you can instead force a creature in range to make an Intelligence saving throw or take psychic damage equal to 1d10 + your Pact modifier.",
                "You also learn certain spells at the Warlock levels below. They are Warlock spells for you, but they don't count against your number of Spells Known, and they cannot be replaced."
            ]),
            spellcastingExtra: [
                "arms of hadar", "dissonant whispers",
                "detect thoughts", "mind whip",
                "clairvoyance", "hunger of hadar",
                "confusion", "eldritch tentacles",
                "modify memory", "telekinesis"
            ],
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                            fields.Description += (fields.Description ? '; ' : '') +
                                "Can force Int save for psychic damage (Aberrant Magic)";
                        }
                    },
                    "Aberrant Magic: Eldritch Blast can force Int save for psychic damage.",
                    286
                ]
            }
        },
        "subclassfeature2.1": {
            name: "Awakened Mind",
            source: ["GMB:LL", 0],
            minlevel: 2,
            description: desc([
                "You can telepathically communicate with any creature you can see within 60 feet.",
                "You don't need to share a language, but the target must speak at least one language to respond.",
                "You can only communicate with one creature at a time.",
                "You also gain resistance to psychic damage."
            ]),
            dmgres: ["Psychic"],
        },
        "subclassfeature6": {
            name: "Mental Lance",
            source: ["GMB:LL", 0],
            minlevel: 6,
            description: desc([
                "Once per turn when you deal psychic damage to a creature with Eldritch Blast, you scour the target's mind so it cannot take reactions until the beginning of your next turn."
            ]),
        },
        "subclassfeature6.1": {
            name: "Psionic Ward",
            source: ["GMB:LL", 0],
            minlevel: 6,
            description: desc([
                "You can repel attacks with your mental abilities.",
                "Whenever a creature you can see targets you with an attack roll, you can use your reaction to impose disadvantage on its attack roll.",
                "If it misses, you can target your attacker with one beam of your Eldritch Blast as part of the same reaction.",
                "You can use this reaction a number of times equal to your Pact modifier (a minimum of once), and you regain all of your expended uses when you finish a long rest."
            ]),
            action: ["reaction", ""],
            usagescalc: function () {
                var pactMod = GetFeatureChoice('class', 'warlock(laserllama)', 'pact modifier');
                var modValue = 0;

                if (pactMod === "Intelligence") modValue = What('Int Mod');
                else if (pactMod === "Wisdom") modValue = What('Wis Mod');
                else modValue = What('Cha Mod');

                return Math.max(modValue, 1);
            },
            recovery: "long rest",
        },
        "subclassfeature10": {
            name: "Thought Shield",
            source: ["GMB:LL", 0],
            minlevel: 10,
            description: desc([
                "Your thoughts cannot be read by telepathy or any other magic or psionic means unless you allow them to.",
                "Also, whenever you succeed on an Intelligence or Wisdom saving throw, you can deal psychic damage equal to your Warlock level to the creature that forced you to make the saving throw."
            ]),
        },
        "subclassfeature14": {
            name: "Create Thrall",
            source: ["GMB:LL", 0],
            minlevel: 14,
            description: desc([
                "As an action, you can touch one incapacitated humanoid and flood them with the mind-shattering influence of your Patron, turning it into your Thrall.",
                "This Thrall is charmed by you, and you can telepathically issue it commands so long as you are both on the same plane of existence.",
                "It obeys your commands to the best of its ability, but will not follow commands that would cause it immediate harm.",
                "It remains your Thrall until it dies or it is released from this effect by a remove curse spell or another spell of similar power.",
                "You can only have one Thrall under your control, and creating a second Thrall releases any previous Thralls from the effects of your alien influence."
            ]),
            action: ["action", ""],
        }
    }
});

// Deep One Patron
AddSubClass("warlock(laserllama)", "deep one", {
    regExpSearch: /^(?=.*deep)(?=.*one).*$/i,
    subname: "Deep One Patron",
    fullname: "Deep One Warlock",
    source: ["GMB:LL", 0],
    features: {
        "subclassfeature2": {
            name: "Deep Magic",
            source: ["GMB:LL", 0],
            minlevel: 2,
            spellcastingExtra: [
                "create or destroy water", "torrent",
                "gust of wind", "shatter",
                "tidal wave", "sleet storm",
                "control water", "eldritch tentacles",
                "cone of cold", "maelstrom"
            ],
            description: desc([
                "Your Patron has infused your magic with the ancient power of the depths.",
                "You can choose for your Eldritch Blast to deal cold damage.",
            ]),
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                            fields.Description += (fields.Description ? '; ' : '') +
                                "Can deal cold damage (Deep Magic)";
                        }
                    },
                    "Deep Magic: Eldritch Blast can deal cold damage.",
                    286
                ]
            },
        },
        "subclassfeature2.1": {
            name: "Grasp of the Deep",
            source: ["GMB:LL", 0],
            minlevel: 2,
            choicesNotInMenu: true,
            choices: ["Intelligence", "Wisdom", "Charisma"],
            description: desc([
                "You can call forth a tendril of your Patron.",
                "As a bonus action, you can conjure a spectral Tentacle in an unoccupied space you can see within 30 feet.",
                "Combat: As a bonus action, you can move the Tentacle up to 30 feet and make a melee spell attack (1d8 cold damage). If target is Large or smaller, you can grapple it.",
                "Grappling: Grappled creature can use action to escape with Strength (Athletics) or Dexterity (Acrobatics) check vs your Spell save DC.",
                "Duration: Tentacle lasts 1 minute. Dismiss with bonus action or if you conjure another.",
            ]),
            action: ["bonus action", ""],
            recovery: "long rest",
            "intelligence": {
                usagescalc: "event.value = Math.max(1, What('Int Mod'));",
                weaponOptions: {
                    regExpSearch: /^(?=.*grasp)(?=.*deep)(?=.*tentacle).*$/i,
                    name: "Deep One Tentacle",
                    source: [["GMB:LL", 0]],
                    ability: 4,
                    type: "Natural",
                    damage: [1, 8, "cold"],
                    range: "Melee (10 ft)",
                    description: "Bonus action to conjure/move. Melee spell attack: 1d8 cold damage. Can grapple Large or smaller creatures.",
                    isSpell: true,
                    isNotWeapon: true,
                    isAlwaysProf: true
                },
                weaponAdd: ["Deep One Tentacle"]
            },
            "wisdom": {
                usagescalc: "event.value = Math.max(1, What('Wis Mod'));",
                weaponOptions: {
                    regExpSearch: /^(?=.*grasp)(?=.*deep)(?=.*tentacle).*$/i,
                    name: "Deep One Tentacle",
                    source: [["GMB:LL", 0]],
                    ability: 5,
                    type: "Natural",
                    damage: [1, 8, "cold"],
                    range: "Melee (10 ft)",
                    description: "Bonus action to conjure/move. Melee spell attack: 1d8 cold damage. Can grapple Large or smaller creatures.",
                    isSpell: true,
                    isNotWeapon: true,
                    isAlwaysProf: true
                },
                weaponAdd: ["Deep One Tentacle"]
            },
            "charisma": {
                usagescalc: "event.value = Math.max(1, What('Cha Mod'));",
                weaponOptions: {
                    regExpSearch: /^(?=.*grasp)(?=.*deep)(?=.*tentacle).*$/i,
                    name: "Deep One Tentacle",
                    source: [["GMB:LL", 0]],
                    ability: 6,
                    type: "Natural",
                    damage: [1, 8, "cold"],
                    range: "Melee (10 ft)",
                    description: "Bonus action to conjure/move. Melee spell attack: 1d8 cold damage. Can grapple Large or smaller creatures.",
                    isSpell: true,
                    isNotWeapon: true,
                    isAlwaysProf: true
                },
                weaponAdd: ["Deep One Tentacle"]
            }
        },
        "subclassfeature2.2": {
            name: "Scion of the Deep",
            source: ["GMB:LL", 0],
            minlevel: 2,
            description: desc([
                "Your Pact with the depths has altered your physiology.",
                "You learn the Gift of the Deep Ones Eldritch Invocation.",
                "It does not count against your number of Invocations Known, and it cannot be replaced with another Invocation.",
                "If you already know Gift of the Deep Ones, you learn another Eldritch Invocation of your choice."
            ]),
            bonusClassExtrachoices: [
                {
                    class: "warlock(laserllama)",
                    feature: "eldritch invocations",
                    bonus: 1,
                    filter: function (eInvocation) {
                        return eInvocation.name && eInvocation.name.toLowerCase().includes("gift of the deep ones");
                    },
                },
            ]
        },
        "subclassfeature6": {
            name: "Oceanic Grasp",
            source: ["GMB:LL", 0],
            minlevel: 6,
            description: desc([
                "Your oceanic magic freezes your foes down to their bones.",
                "Whenever you deal cold damage with Eldritch Blast, your Tentacles, or with a Warlock spell of 1st-level or higher, its speed is halved until the start of your next turn.",
                "This effect does not stack with Lance of Lethargy."
            ]),
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if ((v.WeaponName && v.WeaponName.match(/eldritch blast|tentacle/i)) ||
                            (v.isSpell && !v.WeaponName && fields.Description && fields.Description.includes("cold"))) {
                            if (!fields.Description.includes("speed halved")) {
                                fields.Description += (fields.Description ? '; ' : '') +
                                    "Target's speed halved until your next turn (Oceanic Grasp)";
                            }
                        }
                    },
                    "Oceanic Grasp: Cold damage from Eldritch Blast, Tentacles, or spells halves target's speed.",
                    287
                ]
            }
        },
        "subclassfeature6.1": {
            name: "Thalassic Speech",
            source: ["GMB:LL", 0],
            minlevel: 6,
            description: desc([
                "Your eldritch connection to the depths grants you mystical abilities.",
                "You gain resistance to cold damage.",
                "While you are submerged in water any other creature that is also submerged in water can understand your speech, and you can understand its speech as if you both shared a language in common."
            ]),
            dmgres: ["Cold"]
        },
        "subclassfeature10": {
            name: "Greater Tentacles",
            source: ["GMB:LL", 0],
            minlevel: 10,
            description: desc([
                "You can summon more of your Oceanic Patron's presence.",
                "When you cast eldritch tentacles, your concentration cannot be broken by taking damage.",
                "Also, when you conjure a Tentacle with Grasp of the Deep, it is improved:",
                "- Can grapple targets that are Huge or smaller",
                "- Can move up to 30 feet while grappling Medium or smaller targets",
                "- Deals additional 1d8 cold damage on hit",
                "- Creatures grappled have disadvantage on saves vs your Warlock spells"
            ]),
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.WeaponName && v.WeaponName.match(/tentacle/i)) {
                            if (!fields.Description.includes("2d8 cold damage")) {
                                fields.Description = fields.Description.replace("1d8 cold damage", "2d8 cold damage");
                                fields.Description += (fields.Description ? '; ' : '') +
                                    "Improved: grapple Huge/smaller, grappled targets: disadvantage on saves vs your spells";
                            }
                        }
                    },
                    "Greater Tentacles: Improved Tentacle damage and abilities.",
                    288
                ]
            }
        },
        "subclassfeature14": {
            name: "Unleash the Depths",
            source: ["GMB:LL", 0],
            minlevel: 14,
            description: desc([
                "You can bring the full power of your Patron to the surface, if only for a short time.",
                "As an action, you can use Grasp of the Deep to conjure up to five spectral Tentacles each in its own unoccupied space of your choice you can see within 30 feet.",
                "As an action, including the action you used to conjure the Tentacles, you can make one spell attack with each Tentacle against a target within 10 feet of it.",
                "If a target is grappled by more than one Tentacle it is restrained.",
                "A restrained target can escape from all Tentacles with a single ability check.",
                "Once you use this feature you finish a long rest before you can use it again.",
                "When you have no uses left, you can expend one of your Pact Magic spell slots to use it again."
            ]),
            action: ["action", ""],
            usages: 1,
            recovery: "long rest",
        }
    }
});

// Darklord Patron
AddSubClass("warlock(laserllama)", "darklord", {
    regExpSearch: /^(?=.*darklord).*$/i,
    subname: "Darklord Patron",
    fullname: "Darklord Warlock",
    source: ["GMB:LL", 0],
    features: {
        "subclassfeature2": {
            name: "Darklord Magic",
            source: ["GMB:LL", 0],
            minlevel: 2,
            choicesNotInMenu: true,
            choices: ["Intelligence", "Wisdom", "Charisma"],
            spellcastingExtra: [
                "hex", "inflict wounds",
                "blur", "shadow blade",
                "fear", "haste",
                "freedom of movement", "phantasmal killer",
                "dream", "negative energy flood"
            ],
            description: desc([
                "Your Patron infuses your magic with the dark powers of the Shadowfell.",
                "You can choose for your Eldritch Blast to deal necrotic damage."
            ]),
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                            fields.Description += (fields.Description ? '; ' : '') +
                                "Can deal necrotic damage (Darklord Magic)";
                        }
                    },
                    "Darklord Magic: Eldritch Blast can deal necrotic damage.",
                    286
                ]
            }
        },
        "subclassfeature2.1": {
            name: "Fell Curse",
            source: ["GMB:LL", 0],
            minlevel: 2,
            choicesNotInMenu: true,
            choices: ["Intelligence", "Wisdom", "Charisma"],
            usages: 1,
            recovery: "long rest",
            description: levels.map(function (n) {
                if (n < 14) return desc([
                    "Whenever you cast the hex spell it gains the following additional benefits:",
                    "- Your concentration cannot be broken by taking damage.",
                    "- Your attack rolls against the target of your hex spell score a critical hit on a roll of 19 or 20 on the d20.",
                    "- If the target of your hex is reduced to 0 hit points, you can instantly end your hex to gain temporary hit points equal to your Warlock level + your Intelligence modifier.",
                    "- Once per long rest you can cast hex at the level of your Pact Magic spell slots without expending a spell slot."
                ])
                return desc([
                    "Whenever you cast the hex spell it gains the following additional benefits:",
                    "- The spell no longer requires your concentration, but you can only have one instance of hex active at one time.",
                    "- Whenever time the target of your hex damages you, you reduce it by your Pact Modifier (minimum of 1).",
                    "- Your Shadow shares all the benefits from your hex spell.",
                    "- Your attack rolls against the target of your hex spell score a critical hit on a roll of 19 or 20 on the d20.",
                    "- If the target of your hex is reduced to 0 hit points, you can instantly end your hex to gain temporary hit points equal to your Warlock level + your Intelligence modifier.",
                    "- Once per long rest you can cast hex at the level of your Pact Magic spell slots without expending a spell slot."
                ])
            }),
            spellChanges: {
                "hex": {
                    changes: levels.map(function (n) {
                        if (n < 14) return desc([
                            "Whenever you cast the hex spell it gains the following additional benefits:",
                            "- Your concentration cannot be broken by taking damage.",
                            "- Your attack rolls against the target of your hex spell score a critical hit on a roll of 19 or 20 on the d20.",
                            "- If the target of your hex is reduced to 0 hit points, you can instantly end your hex to gain temporary hit points equal to your Warlock level + your Intelligence modifier.",
                            "- Once per long rest you can cast hex at the level of your Pact Magic spell slots without expending a spell slot."
                        ])
                        return desc([
                            "Whenever you cast the hex spell it gains the following additional benefits:",
                            "- The spell no longer requires your concentration, but you can only have one instance of hex active at one time.",
                            "- Whenever time the target of your hex damages you, you reduce it by your Pact Modifier (minimum of 1).",
                            "- Your Shadow shares all the benefits from your hex spell.",
                            "- Your attack rolls against the target of your hex spell score a critical hit on a roll of 19 or 20 on the d20.",
                            "- If the target of your hex is reduced to 0 hit points, you can instantly end your hex to gain temporary hit points equal to your Warlock level + your Intelligence modifier.",
                            "- Once per long rest you can cast hex at the level of your Pact Magic spell slots without expending a spell slot."
                        ])
                    })
                }
            },
        },
        "subclassfeature2.2": {
            name: "Shadow Warrior",
            source: ["GMB:LL", 0],
            minlevel: 2,
            description: desc([
                "You gain the Armor of Shadows Eldritch Invocation.",
                "It does not count against your number of Invocations Known, but it cannot be replaced with another Eldritch Invocation.",
                "If you already know this Eldritch Invocation, then you learn another Invocation of your choice."
            ]),
            bonusClassExtrachoices: [
                {
                    class: "warlock(laserllama)",
                    feature: "eldritch invocations",
                    bonus: 1,
                    filter: function (eInvocation) {
                        return eInvocation.name && eInvocation.name.toLowerCase().includes("armor of shadows");
                    },
                },
            ]
        },
        "subclassfeature6": {
            name: "Living Shadow",
            source: ["GMB:LL", 0],
            minlevel: 6,
            description: desc([
                "As an action, you can expend a Pact Magic spell slot to bring your shadow to life with dark magic.",
                "It uses the Shadow stat block from the Monster Manual, but its maximum hit points increase by your Warlock level and it uses your Warlock spell attack modifier for its attack rolls.",
                "In combat, it acts during your turn. The Shadow can move and use its reaction on its own, but it will only take the Dodge action unless you use your bonus action to order it to take an action in its stat block or another action.",
                "Your Shadow remains animated for 1 minute. It returns to you as a normal shadow after this time, or sooner if it is slain or if you use a bonus action to end this effect."
            ]),
            action: ["action", ""],
        },
        "subclassfeature10": {
            name: "Dread Mantle",
            source: ["GMB:LL", 0],
            minlevel: 10,
            description: desc([
                "You have advantage on your death saving throws, and you gain resistance to necrotic damage."
            ]),
            savetxt: {
                advantage: ["Death saving throws"],
            },
            dmgres: ["Necrotic"]
        },
        "subclassfeature14": {
            name: "Right Hand of Dread",
            source: ["GMB:LL", 0],
            minlevel: 14,
            description: "Fell Curse improved (see feature)"
        }
    }
});

// Exalted Patron
AddSubClass("warlock(laserllama)", "exalted", {
    regExpSearch: /^(?=.*exalted).*$/i,
    subname: "Exalted Patron",
    fullname: "Exalted Warlock",
    source: ["GMB:LL", 0],
    features: {
        "subclassfeature2": {
            name: "Celestial Light",
            source: ["GMB:LL", 0],
            minlevel: 2,
            description: desc([
                "When you fire a beam of your Eldritch Blast, you can instead choose to channel a beam of healing light at one creature you can see within range, restoring hit points to the target.",
                "You can do so a number of times equal to 1 + your Warlock level, and you regain all uses when you finish a long rest."
            ]),
            usagescalc: function () {
                var warlockLevel = classes.known['warlock(laserllama)'] ? classes.known['warlock(laserllama)'].level : 0;
                return 1 + warlockLevel;
            },
            recovery: "long rest",
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                            fields.Description += (fields.Description ? '; ' : '') +
                                "Can heal instead (Celestial Light)";
                        }
                    },
                    "Celestial Light: Eldritch Blast can heal instead of damage.",
                    286
                ]
            }
        },
        "subclassfeature2.1": {
            name: "Exalted Magic",
            source: ["GMB:LL", 0],
            minlevel: 2,
            choicesNotInMenu: true,
            choices: ["Intelligence", "Wisdom", "Charisma"],
            spellcastingExtra: [
                "cure wounds", "guiding bolt",
                "flaming sphere", "restoration",
                "daylight", "revivify",
                "guardian of faith", "wall of fire",
                "conjure celestial", "flame strike"
            ],
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                            fields.Description += (fields.Description ? '; ' : '') +
                                "Can deal radiant damage (Exalted Magic)";
                        }
                    },
                    "Exalted Magic: Eldritch Blast can deal radiant damage.",
                    286
                ]
            },
        },
        "subclassfeature6": {
            name: "Radiant Conduit",
            source: ["GMB:LL", 0],
            minlevel: 6,
            description: desc([
                "You gain resistance to radiant damage, and when you use Celestial Light, you can expend multiple uses (up to your Pact Modifier) at one time to restore 1d10 hit points to your target for each use expended.",
                "In addition, you can expend one of your Pact Magic spell slots as a bonus action to regain expended uses of Celestial Light equal to the level of that Pact Magic spell slot."
            ]),
            dmgres: ["Radiant"],
            action: ["bonus action", "Recover Celestial Light uses (SS lvl)"]
        },
        "subclassfeature10": {
            name: "Celestial Fortitude",
            source: ["GMB:LL", 0],
            minlevel: 10,
            description: desc([
                "Your divine presence fortifies you and your allies.",
                "Each time you finish a short or long rest you gain temporary hit points equal to your Warlock level + your Pact modifier.",
                "You can also choose up to five creatures who completed the short or long rest with you to gain temporary hit points equal to half your Warlock level + your Pact modifier."
            ]),
            choicesNotInMenu: true,
            choices: ["Intelligence", "Wisdom", "Charisma"],
            "intelligence": {
                additional: function () {
                    var warlockLevel = classes.known['warlock(laserllama)'] ? classes.known['warlock(laserllama)'].level : 0;
                    var intMod = What('Int Mod');
                    var selfHP = warlockLevel + Math.max(intMod, 0);
                    var allyHP = Math.floor(warlockLevel / 2) + Math.max(intMod, 0);
                    return "Self: " + selfHP + " temp HP, Allies: " + allyHP + " temp HP";
                }
            },
            "wisdom": {
                additional: function () {
                    var warlockLevel = classes.known['warlock(laserllama)'] ? classes.known['warlock(laserllama)'].level : 0;
                    var wisMod = What('Wis Mod');
                    var selfHP = warlockLevel + Math.max(wisMod, 0);
                    var allyHP = Math.floor(warlockLevel / 2) + Math.max(wisMod, 0);
                    return "Self: " + selfHP + " temp HP, Allies: " + allyHP + " temp HP";
                }
            },
            "charisma": {
                additional: function () {
                    var warlockLevel = classes.known['warlock(laserllama)'] ? classes.known['warlock(laserllama)'].level : 0;
                    var chaMod = What('Cha Mod');
                    var selfHP = warlockLevel + Math.max(chaMod, 0);
                    var allyHP = Math.floor(warlockLevel / 2) + Math.max(chaMod, 0);
                    return "Self: " + selfHP + " temp HP, Allies: " + allyHP + " temp HP";
                }
            }
        },
        "subclassfeature14": {
            name: "Blinding Defiance",
            source: ["GMB:LL", 0],
            minlevel: 14,
            description: desc([
                "The heavenly power infused in you through your Pact allows you to resist death.",
                "When you make a death saving throw, you can choose to instantly return to life with half your maximum hit points, stand up, and unleash a burst of radiant light.",
                "When you do, creatures of your choice within 30 feet must make a Constitution saving throw against your Spell save DC.",
                "On a failed save, creatures take 8d6 radiant damage and are blinded until the end of your current turn. On a success, they take half as much radiant damage and are not blinded.",
                "Once you use this feature to return to life you must finish a long rest before you can use it again.",
                "If you have no uses left, you can expend a Pact Magic spell slot to use it again."
            ]),
            usages: 1,
            recovery: "long rest",
            recharge: "spell slot",
            savetxt: {
                text: ["Blinding Defiance: On death save, return to life with half HP and 8d6 radiant damage/30 ft (Con save for half/no blind)"]
            },
            choicesNotInMenu: true,
            choices: ["Intelligence", "Wisdom", "Charisma"],
            "intelligence": {
                weaponOptions: returnBlindingDefiance(4),
                weaponAdd: ["Blinding Defiance"]
            },
            "wisdom": {
                weaponOptions: returnBlindingDefiance(5),
                weaponAdd: ["Blinding Defiance"]
            },
            "charisma": {
                weaponOptions: returnBlindingDefiance(6),
                weaponAdd: ["Blinding Defiance"]
            },
        }
    }
});

// Noble Genie Patron
AddSubClass("warlock(laserllama)", "noble genie", {
    regExpSearch: /^(?=.*noble)(?=.*genie).*$/i,
    subname: "Noble Genie",
    fullname: "Noble Genie Warlock",
    source: ["GMB:LL", 0],
    features: {
        "subclassfeature2": {
            name: "Noble Magic",
            source: ["GMB:LL", 0],
            minlevel: 2,
            description: desc([
                'Choose your type of Genie for Noble Magic with the "Choose Feature" button'
            ]),
            choices: ["Dao (Earth)", "Djinn (Air)", "Efreeti (Fire)", "Marid (Water)"],
            "dao (earth)": {
                name: "Dao Noble Magic",
                description: desc([
                    "You can choose for your Eldritch Blast to deal bludgeoning damage."
                ]),
                calcChanges: {
                    atkAdd: [
                        function (fields, v) {
                            if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                                fields.Description += (fields.Description ? '; ' : '') +
                                    "Can deal bludgeoning damage (Noble Magic)";
                            }
                        },
                        "Darklord Magic: Eldritch Blast can deal bludgeoning damage.",
                        286
                    ]
                }
            },
            "djinn (air)": {
                name: "Djinn Noble Magic",
                description: desc([
                    "You can choose for your Eldritch Blast to deal thunder damage."
                ]),
                calcChanges: {
                    atkAdd: [
                        function (fields, v) {
                            if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                                fields.Description += (fields.Description ? '; ' : '') +
                                    "Can deal thunder damage (Noble Magic)";
                            }
                        },
                        "Darklord Magic: Eldritch Blast can deal thunder damage.",
                        286
                    ]
                }
            },
            "efreeti (fire)": {
                name: "Efreeti Noble Magic",
                description: desc([
                    "You can choose for your Eldritch Blast to deal fire damage."
                ]),
                calcChanges: {
                    atkAdd: [
                        function (fields, v) {
                            if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                                fields.Description += (fields.Description ? '; ' : '') +
                                    "Can deal fire damage (Noble Magic)";
                            }
                        },
                        "Darklord Magic: Eldritch Blast can deal fire damage.",
                        286
                    ]
                }
            },
            "marid (water)": {
                name: "Marid Noble Magic",
                description: desc([
                    "You can choose for your Eldritch Blast to deal cold damage."
                ]),
                calcChanges: {
                    atkAdd: [
                        function (fields, v) {
                            if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                                fields.Description += (fields.Description ? '; ' : '') +
                                    "Can deal cold damage (Noble Magic)";
                            }
                        },
                        "Darklord Magic: Eldritch Blast can deal cold damage.",
                        286
                    ]
                }
            },
            choiceDependencies: [{
                feature: "subclassfeature6" // Ethereal Nature
            }]
        },
        "subclassfeature2.1": {
            name: "Genie's Vessel",
            source: ["GMB:LL", 0],
            minlevel: 2,
            description: desc([
                "Your Patron has given you a mystical Vessel as a sign of your Pact.",
                "This Vessel is a Tiny object that appears as a container of your choice.",
                "Your Vessel can be used as a Trinket for one of your Eldritch Invocations,",
                "and if it is lost, it reappears next to you at the end of your next short or long rest.",
                "Within this Vessel is an extradimensional space the size of a 20-foot cube.",
                "As an action, you can put a Medium or smaller object inside this space by holding it to your Vessel's opening.",
                "While you are holding your Vessel you can use an action to enter it.",
                "You can remain inside for a number of hours equal to half your Warlock level,",
                "but you can leave it early as an action, appearing in the unoccupied space closest to it."
            ]),
            action: [["action", " (enter/leave Vessel)"]]
        },
        "subclassfeature6": {
            name: "Ethereal Nature",
            source: ["GMB:LL", 0],
            minlevel: 6,
            description: desc([
                "Your elemental magics have begun to physically change you.",
                "You gain resistance to the damage type of your Noble Genie.",
                "Also, once per turn when you deal the damage type of your Noble Genie",
                "to a creature with Eldritch Blast, you can force it to make a",
                "Charisma saving throw against your Spell save DC.",
                "On a failed save, you instantly switch places with the target."
            ]),
            choices: ["dao (earth)", "djinn (air)", "efreeti (fire)", "marid (water)"],
            choicesNotInMenu: true,
            "dao (earth)": {
                name: "Ethereal Nature (Dao)",
                description: desc([
                    "You gain resistance to bludgeoning damage.",
                    "Once per turn when you deal bludgeoning damage with Eldritch Blast,",
                    "you can force the target to make a Charisma saving throw.",
                    "On a failed save, you instantly switch places with the target."
                ]),
                dmgres: ["Bludgeoning"]
            },
            "djinn (air)": {
                name: "Ethereal Nature (Djinn)",
                description: desc([
                    "You gain resistance to thunder damage.",
                    "Once per turn when you deal thunder damage with Eldritch Blast,",
                    "you can force the target to make a Charisma saving throw.",
                    "On a failed save, you instantly switch places with the target."
                ]),
                dmgres: ["Thunder"]
            },
            "efreeti (fire)": {
                name: "Ethereal Nature (Efreeti)",
                description: desc([
                    "You gain resistance to fire damage.",
                    "Once per turn when you deal fire damage with Eldritch Blast,",
                    "you can force the target to make a Charisma saving throw.",
                    "On a failed save, you instantly switch places with the target."
                ]),
                dmgres: ["Fire"]
            },
            "marid (water)": {
                name: "Ethereal Nature (Marid)",
                description: desc([
                    "You gain resistance to cold damage.",
                    "Once per turn when you deal cold damage with Eldritch Blast,",
                    "you can force the target to make a Charisma saving throw.",
                    "On a failed save, you instantly switch places with the target."
                ]),
                dmgres: ["Cold"]
            }
        },
        "subclassfeature10": {
            name: "Mystical Sanctuary",
            source: ["GMB:LL", 0],
            minlevel: 10,
            description: desc([
                "When you enter your Vessel, you can bring up to five willing creatures within 30 feet with you.",
                "They remain in the Vessel for 1 hour, but are expelled early if you leave the Vessel,",
                "or if you use your action to expel them from the Vessel.",
                "Creatures within your Vessel gain the benefits of a short rest after 10 minutes",
                "of light activity, instead of 1 hour."
            ])
        },
        "subclassfeature14": {
            name: "Limited Wish",
            source: ["GMB:LL", 0],
            minlevel: 14,
            description: desc([
                "You can call on your Patron to alter reality.",
                "As an action, you can use your Vessel to cast a spell of your choice",
                "of 6th-level or lower from any spell list, so long as it has a",
                "casting time of one action or bonus action.",
                "You do not need to expend a spell slot, and your Vessel replaces",
                "all material components.",
                "Once you use this feature you must finish three long rests",
                "before you can use it again."
            ]),
            additional: "3 long rests",
            action: [["action", ""]],
            usages: 1,
        }
    }
});

// Undying Patron
AddSubClass("warlock(laserllama)", "undying", {
    regExpSearch: /^(?=.*undying).*$/i,
    subname: "Undying Patron",
    fullname: "Undying Warlock",
    source: ["GMB:LL", 0],
    features: {
        "subclassfeature2": {
            name: "Undying Magic",
            source: ["GMB:LL", 0],
            minlevel: 2,
            description: desc([
                "Your Patron infuses your magic with undead power.",
                "You can choose for your Eldritch Blast to deal necrotic damage."
            ]),
            spellcastingExtra: [
                "cause fear", "ray of sickness",
                "blindness/deafness", "ray of enfeeblement",
                "fear", "phantom steed",
                "blight", "death ward",
                "antilife shell", "contagion"
            ],
            calcChanges: {
                atkAdd: [
                    function (fields, v) {
                        if (v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                            if (!fields.Description.includes("necrotic damage")) {
                                fields.Description += (fields.Description ? '; ' : '') +
                                    "Can deal necrotic damage (Undying Magic)";
                            }
                        }
                    },
                    "Undying Magic: Eldritch Blast can deal necrotic damage.",
                    286
                ]
            }
        },
        "subclassfeature2.1": {
            name: "Necrotic Husk",
            source: ["GMB:LL", 0],
            minlevel: 2,
            choicesNotInMenu: true,
            description: desc([
                "As a bonus action, you can infuse your flesh with the power of undeath, decaying into the Necrotic Husk of your living body.",
                "While you are transformed you gain the benefits below:",
                "- When you transform you gain temporary hit points equal to your Warlock level + your Pact modifier (minimum of 1).",
                "- You are immune to the frightened condition.",
                "- Once per turn when you hit a creature with an attack, you can force it to make a Wisdom saving throw against your Warlock Spell save DC. On a failed save, the creature is frightened of you until the start of your next turn.",
                "This transformation lasts for 1 minute, but you can end it early as a bonus action.",
                "Once you transform, you must finish a short or long rest before you can do so again.",
                "If you have no use left, you can expend a Pact Magic spell slot to transform."
            ]),
            action: ["bonus action", ""],
            recovery: "short rest",
            savetxt: {
                immune: ["frightened"],
            },
            choices: ["Intelligence", "Wisdom", "Charisma"],
            "intelligence": {
                usagescalc: "event.value = Math.max(1, What('Int Mod'));",
                additional: function () {
                    var warlockLevel = classes.known['warlock(laserllama)'] ? classes.known['warlock(laserllama)'].level : 0;
                    var intMod = What('Int Mod');
                    return "Temp HP: " + (warlockLevel + Math.max(intMod, 1));
                }
            },
            "wisdom": {
                usagescalc: "event.value = Math.max(1, What('Wis Mod'));",
                additional: function () {
                    var warlockLevel = classes.known['warlock(laserllama)'] ? classes.known['warlock(laserllama)'].level : 0;
                    var wisMod = What('Wis Mod');
                    return "Temp HP: " + (warlockLevel + Math.max(wisMod, 1));
                }
            },
            "charisma": {
                usagescalc: "event.value = Math.max(1, What('Cha Mod'));",
                additional: function () {
                    var warlockLevel = classes.known['warlock(laserllama)'] ? classes.known['warlock(laserllama)'].level : 0;
                    var chaMod = What('Cha Mod');
                    return "Temp HP: " + (warlockLevel + Math.max(chaMod, 1));
                }
            }
        },
        "subclassfeature2.2": {
            name: "Touch of the Grave",
            source: ["GMB:LL", 0],
            minlevel: 2,
            description: desc([
                "The magic infused in you by your Pact makes you appear to other undead as one of their own.",
                "Undead of a CR equal to your Warlock level or lower are not hostile toward you until you say or do something hostile toward them."
            ])
        },
        "subclassfeature6": {
            name: "Lifedrinker",
            source: ["GMB:LL", 0],
            minlevel: 6,
            description: desc([
                "Your Pact allows you to feed on the vitality of the living.",
                "Once per turn when you deal necrotic damage to a creature that is not construct or undead, you gain temporary hit points equal to half the necrotic damage dealt.",
                "In Necrotic Husk form, you can add these to the temporary hit points from Necrotic Husk, but your temporary hit points cannot exceed your Warlock level + your Pact modifier."
            ]),
        },
        "subclassfeature6.1": {
            name: "Unsettling Visage",
            source: ["GMB:LL", 0],
            minlevel: 6,
            description: desc([
                "When you force a creature within 30 feet that can see you to make a saving throw to resist being frightened while you are in your Necrotic Husk form, it has disadvantage on its roll."
            ]),
        },
        "subclassfeature10": {
            name: "Unnatural Resilience",
            source: ["GMB:LL", 0],
            minlevel: 10,
            description: desc([
                "You gain resistance to necrotic damage.",
                "In your Necrotic Husk form you are immune to necrotic damage, and resistant to bludgeoning, piercing, and slashing damage from non-magical and non-silvered attacks."
            ]),
            dmgres: ["Necrotic"],
            savetxt: {
                text: ["Necrotic Husk form: immune to necrotic, resist B/P/S from non-magical/non-silvered"]
            }
        },
        "subclassfeature14": {
            name: "Unending Life",
            source: ["GMB:LL", 0],
            minlevel: 14,
            description: desc([
                "If you are reduced to 0 hit points but not killed outright, you instead gain hit points equal to your level.",
                "Once you use this feature you must finish a long rest before you use it again.",
                "Lastly, if you begin your turn with less than half of your total hit points, but at least 1 hit point, you regain hit points equal to your Pact Modifier (minimum of 1 hit point)."
            ]),
            usages: 1,
            recovery: "long rest",
        }
    }
});

// Aggiungi automazione per Eldritch Blast
RunFunctionAtEnd(function () {
    ClassList["warlock(laserllama)"].calcChanges = {
        atkCalc: [
            function (fields, v, output) {
                // Applica bonus danni per Empowered Blast
                if (v.isSpell && v.WeaponName && v.WeaponName.match(/eldritch blast/i)) {
                    var warlockLevel = classes.known["warlock(laserllama)"] ? classes.known["warlock(laserllama)"].level : 0;
                    var beams = warlockLevel < 5 ? 1 : warlockLevel < 11 ? 2 : warlockLevel < 17 ? 3 : 4;

                    // Se è un attacco multiplo, dividi il bonus
                    if (v.isMultiAttack) {
                        output.extraDmg += 0; // Il bonus viene applicato per ogni raggio separatamente
                    }
                }
            },
            "Eldritch Blast creates multiple beams at higher levels"
        ]
    };


});

//Add Blasphemous Prayer Invocation divided by different Cleric's Channel Divinities
RunFunctionAtEnd(function () {
    warlock_invs = ClassList["warlock(laserllama)"].features["eldritch invocations"];
    ClericSubclasses = ClassList.cleric.subclasses[1];

    var allBlasphemousKeys = [];

    for (var i = 0; i < ClericSubclasses.length; i++) {
        subclass = ClericSubclasses[i];
        NewChanDiv = ClassSubList[subclass].features["subclassfeature2"];

        var invocKey = NewChanDiv.name.toLowerCase();
        allBlasphemousKeys.push(invocKey);

        if (warlock_invs[invocKey]) {
            continue;
        }


        warlock_invs[invocKey] = {
            name: NewChanDiv.name,
            source: NewChanDiv.source,
            description: NewChanDiv.description.replace("cleric level", "warlock level"),
            action: NewChanDiv.action,
            additional: NewChanDiv.additional,
            usages: 1,
            toNotesPage: [
                {
                    name: NewChanDiv.name,
                    additional: "Blasphemous Prayer",
                    note: NewChanDiv.description.replace("cleric level", "warlock level").replace("holy symbol", "eldritch tome"),
                    amendTo: "Invocations Known",
                }],
            recovery: "short rest",
            submenu: "[Blasphemous Prayer]",
            prereqeval: (function (currentKey, allKeys) {
                return function (v) {
                    // Controlla se il warlock soddisfa i prerequisiti di base
                    var hasBasePrereq = classes.known['warlock(laserllama)'] &&
                        classes.known['warlock(laserllama)'].level >= 5 &&
                        GetFeatureChoice('class', 'warlock(laserllama)', 'pact focus') == 'eldritch tome';

                    if (!hasBasePrereq) return false;

                    // Ottieni tutte le invocazioni attualmente scelte
                    var currentInvocations = [];

                    // Prova a ottenere le invocazioni dal character sheet
                    if (v && v.invocationChoices) {
                        currentInvocations = v.invocationChoices;
                    } else if (classes && classes.known['warlock(laserllama)']) {
                        // Prova un approccio alternativo
                        var warlockClass = classes.known['warlock(laserllama)'];
                        if (warlockClass.featureChoices && warlockClass.featureChoices['eldritch invocations']) {
                            currentInvocations = warlockClass.featureChoices['eldritch invocations'];
                        }
                    }

                    // Se non possiamo determinare le invocazioni attuali, permettiamo la selezione
                    if (!currentInvocations || currentInvocations.length === 0) return true;

                    // Conta quante invocazioni Blasphemous Prayer sono già state scelte
                    var blasphemousCount = 0;
                    for (var j = 0; j < currentInvocations.length; j++) {
                        var invocName = currentInvocations[j];
                        if (typeof invocName === 'string') {
                            invocName = invocName.toLowerCase();
                            // Controlla se questa è un'invocazione Blasphemous Prayer
                            if (allKeys.includes(invocName) && invocName !== currentKey) {
                                blasphemousCount++;
                            }
                        }
                    }

                    // Se c'è già un'altra invocazione Blasphemous Prayer scelta, non permettere questa
                    return blasphemousCount === 0;
                };
            })(invocKey, allBlasphemousKeys),
        };

        warlock_invs.extrachoices.push(invocKey);
    }
});

//Add Elder Focus Arcanum to the warlock
RunFunctionAtEnd(function () {
    warlock_arcs = ClassList["warlock(laserllama)"].features["elder arcanum"];
    warlock_arcs["elder focus"] = {
        name: "Elder Focus",
        source: ["GMB:LL", 0],
        allowDuplicates: true,
        prereqeval: function (v) {
            return classes.known['warlock(laserllama)'] &&
                classes.known['warlock(laserllama)'].level >= 11;
        },
        bonusClassExtrachoices: [
            {
                class: "warlock(laserllama)",
                feature: "pact focus",
                bonus: 1
            },
        ],
        description: "You gain an additional Pact Focus of your choice. You cannot select the same Pact Focus more than once. You can learn this Elder Arcanum more than once, but you must select a different Pact Focus each time you learn it."
    };
});

// Aggiungi automazione per Pact Ability
RunFunctionAtEnd(function () {
    // Crea una variabile per tracciare l'abilità del Patto scelta
    if (!CurrentSources.LLWarlockPactAbility) {
        CurrentSources.LLWarlockPactAbility = "cha";
    }

    // Aggiungi un selettore per l'abilità del Patto
    ClassList["warlock(laserllama)"].spellcastingAbility = "\n \u2022 Choose your Pact Ability: Intelligence, Wisdom, or Charisma";
});