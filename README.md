# LaserLlama content for MPMB's Character Record Sheet

Add-on scripts for [MPMB's Character Record Sheet](https://www.flapkan.com/download#charactersheets) (sheet **v13.2.3**) that add Laserllama's homebrew from [GM Binder](https://www.gmbinder.com/profile/laserllama): the Alternate classes, the original classes, their Expanded documents, and the Compendiums of Spells, Exploits, Beasts, and Dinosaurs.

## How these files were made

I updated and created these files with the help of **Claude** (Anthropic's AI assistant), working from Laserllama's latest GM Binder documents. I've checked them myself in my free time, but I may have missed some bugs. If you find one, or something doesn't match the source document, feel free to let me know on the **MPMB Discord server**.

All content belongs to Laserllama and is shared under the Fan Content Policy. Please support the author on [GM Binder](https://www.gmbinder.com/profile/laserllama) and Patreon.

## Load order

Import the files with the **"Add Extra Materials"** bookmark of the sheet, in this order:

1. **`Laserllama Common Attributes 20261019.js`**: always first. Every class file needs it.
2. Then the files you need, in any order:
   - `Laserllama Alternate Martials.js`
   - `Laserllama Alternate Half Casters.js`
   - `Laserllama Alternate Spellcasters.js`
   - `Laserllama Original Laserllama.js`
3. Optional, at any time (they also work on their own):
   - `Laserllama Compendium Beasts.js`
   - `Laserllama Compendium Dinosaurs.js`

If you import a class file before the Common Attributes, the sheet shows a warning and doesn't load it. Import the Common Attributes, then import that file again.

> **Don't load older LaserLlama scripts in the same sheet** (for example older "Common attributes", "Exploits", or single-class files). They define the same classes and functions and will conflict. Starting from a fresh sheet is recommended.

## Files

### `Laserllama Common Attributes 20261019.js`
**Updated: 2026-11-02**

The shared base for all the other files:

- The "GMB:LL" source
- Compendium of Spells v0.5 (new and alternate spells)
- Compendium of Exploits v1.0 (Martial, Savage, Devious, and Tactical Exploits)
- Fighting Styles
- Alternate Martial Multiclassing (Exploit Dice and degrees for multiclass characters)
- Mystic Talents and psionic spells
- Mercenaries (Recruit Mercenary)
- Alternate Warlock v3.2.0 + Expanded v3.2.0: Pact Foci, Eldritch Familiars, Eldritch Invocations, and Elder Arcana. They live here so that other classes or subclasses can use them too.

### `Laserllama Alternate Martials.js`
**Updated: 2026-11-02**

| Class | Version | Class field |
|---|---|---|
| Alternate Barbarian + Expanded | v2.3.0 | `Barbarian (LaserLlama)` |
| Alternate Fighter + Expanded | v3.5.1 | `Fighter (LaserLlama)` |
| Alternate Monk + Expanded | v3.1.1 | `Monk (LaserLlama)` |
| Alternate Rogue + Expanded | v2.3.0 | `Rogue (LaserLlama)` |

### `Laserllama Alternate Half Casters.js`
**Updated: 2026-11-02**

| Class | Version | Class field |
|---|---|---|
| Alternate Artificer + Expanded | v3.1.1 | `Artificer (LaserLlama)` |
| Alternate Blood Hunter | v2.2.0 | `Blood Hunter (LaserLlama)` |
| Alternate Paladin | v3.0.0 | `Paladin (LaserLlama)` |
| Alternate Ranger + Expanded | v4.4.4 | `Ranger (LaserLlama)` |

### `Laserllama Alternate Spellcasters.js`
**Updated: 2026-11-02**

| Class | Version | Class field |
|---|---|---|
| Alternate Bard | v2.0.0 | `Bard (LaserLlama)` |
| Alternate Cleric | v1.1.0 | `Cleric (LaserLlama)` |
| Alternate Druid | v1.1.0 | `Druid (LaserLlama)` |
| Alternate Sorcerer + Expanded | v4.0.1 | `Sorcerer (LaserLlama)` |
| Alternate Warlock + Expanded | v3.2.0 | `Warlock (LaserLlama)` |
| Alternate Wizard | v1.3.0 | `Wizard (LaserLlama)` |

### `Laserllama Original Laserllama.js`
**Updated: 2026-11-02**

| Class | Version | Class field |
|---|---|---|
| Commoner | v2.0.0 | `Commoner` |
| Magus + Expanded | v4.3.2 | `Magus` |
| Psion | v2.4.1 | `Psion` |
| Savant + Expanded | v5.6.1 | `Savant` |
| Shaman + Expanded | v6.0.1 | `Shaman` |
| Shifter | v2.1.0 | `Shifter` |
| Vessel | v4.0.0 | `Vessel` |
| Warlord + Expanded | v3.3.0 | `Warlord` |

### `Laserllama Compendium Beasts.js`
**Updated: 2026-10-19**

Compendium of Beasts v3.1.0: 146 creatures, named with "(LL)" (for example `Lion (LL)`) so the official versions stay available. Use them on the Companion and Wild Shape pages. Their subtypes match the Shifter's Bloodlines.

### `Laserllama Compendium Dinosaurs.js`
**Updated: 2026-10-19**

Compendium of Dinosaurs v2.1.0: 29 Ancient Beasts (for example `Tyrannosaurus Rex (LL)`). Use them only with your DM's permission.

## Using the classes

- In the Class field, type the name from the "Class field" column, optionally with the subclass, for example `Champion Fighter (LaserLlama)` or `Chivalry Warlord`.
- The Alternate classes need "LaserLlama" in the name, so the official WotC classes keep working.
- Choices such as Pact Ability, Leadership Style, Pact Focus, Invocations, Exploits, and Totem Spirits are made with the **"Choose Feature"** button. Prerequisites (level, focus, and so on) are checked by the sheet.

## Notes

- **Alternate Sorcerer and Psion:** the spell selection only offers spells up to your Spell Limit / Mental Limit (from 11th level, the Sorcerer's limit follows the highest Innate Arcanum slot).
- **Savant:** the Personality & Quirks tables are on the Notes page; pick or roll your quirks with "Choose Feature".
- **Alternate Warlock (Collective Patron):** the free Pact Spells are offered in pairs, each limited to your Slot Level when you gain them.
- **WotC content:** non-SRD official content is only used if it's already loaded in your sheet. The files don't break if it's missing.
