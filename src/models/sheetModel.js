// models/Sheet.js
class Sheet {
    constructor({
        uid,
        userUid,
        campaignUid,
        name,
        characterClass,
        subclass = null,
        level,
        race,
        species = null,
        alignment,
        background,
        xp = 0,

        proficiencyBonus = null,
        inspirationHeroica = false,

        attributes = {},                // { str:{score,mod,saveProficient,saveBonus}, ... }
        skills = {},                    // { athletics:{ability,proficient,bonus}, ... }

        passivePerception = null,
        size = "Médio",
        speed = { walk: 9, swim: 0, fly: 0, climb: 0, burrow: 0 },
        initiative = 0,

        ac = {
            value: 10,
            breakdown: { base: 10, dex: 0, armor: 0, shield: 0, misc: 0 },
            shieldEquipped: false
        },

        hp = {
            current: 1,
            max: 1,
            temp: 0,
            hitDice: { type: "d8", max: 1, spent: 0 }
        },

        deathSaves = { successes: 0, failures: 0 },

        equipmentProficiencies = {
            armor: { light: false, medium: false, heavy: false, shields: false },
            weapons: { simple: false, martial: false },
            tools: []
        },

        languages = [],
        treinamentoEProfEquip = { armadura: [], armas: [], ferramentas: [] },

        weapons = [],                   // [{ name, bonusOrDC, damageType, notes }]

        features = {
            classFeatures: [],
            speciesTraits: [],
            feats: []
        },

        inventory = {
            equipment: [],
            magicItemsAttuned: [],        // até 3, se quiser validar
            coins: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 }
        },

        spellcasting = {
            hasSpellcasting: false,
            spellcastingAbility: null,    // "int" | "wis" | "cha"
            spellSaveDC: null,
            spellAttackBonus: null,
            spellcastingMod: null,
            preparedCount: null,
            cantrips: [],
            spellsByLevel: {
                "0": { slots: { total: 0, expended: 0 }, spells: [] },
                "1": { slots: { total: 0, expended: 0 }, spells: [] },
                "2": { slots: { total: 0, expended: 0 }, spells: [] },
                "3": { slots: { total: 0, expended: 0 }, spells: [] },
                "4": { slots: { total: 0, expended: 0 }, spells: [] },
                "5": { slots: { total: 0, expended: 0 }, spells: [] },
                "6": { slots: { total: 0, expended: 0 }, spells: [] },
                "7": { slots: { total: 0, expended: 0 }, spells: [] },
                "8": { slots: { total: 0, expended: 0 }, spells: [] },
                "9": { slots: { total: 0, expended: 0 }, spells: [] }
            },
            spellNotes: ""
        },

        appearance = "",
        backstoryPersonality = "",
        ideals = "",
        bonds = "",
        flaws = "",
        notes = "",

        createdAt = new Date(),
        updatedAt = new Date(),
        schemaVersion = 2
    }) {
        this.uid = uid;
        this.userUid = userUid;
        this.campaignUid = campaignUid;
        this.name = name;
        this.characterClass = characterClass;
        this.subclass = subclass;
        this.level = level;
        this.race = race;
        this.species = species;
        this.alignment = alignment;
        this.background = background;
        this.xp = xp;

        this.proficiencyBonus = proficiencyBonus;
        this.inspirationHeroica = inspirationHeroica;

        this.attributes = attributes;
        this.skills = skills;

        this.passivePerception = passivePerception;
        this.size = size;
        this.speed = speed;
        this.initiative = initiative;

        this.ac = ac;
        this.hp = hp;
        this.deathSaves = deathSaves;

        this.equipmentProficiencies = equipmentProficiencies;
        this.languages = languages;
        this.treinamentoEProfEquip = treinamentoEProfEquip;

        this.weapons = weapons;
        this.features = features;

        this.inventory = inventory;
        this.spellcasting = spellcasting;

        this.appearance = appearance;
        this.backstoryPersonality = backstoryPersonality;
        this.ideals = ideals;
        this.bonds = bonds;
        this.flaws = flaws;

        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.schemaVersion = schemaVersion;
    }

    toFirestore() {
        return {
            userUid: this.userUid,
            campaignUid: this.campaignUid,
            name: this.name,
            characterClass: this.characterClass,
            subclass: this.subclass,
            level: this.level,
            race: this.race,
            species: this.species,
            alignment: this.alignment,
            background: this.background,
            xp: this.xp,

            proficiencyBonus: this.proficiencyBonus,
            inspirationHeroica: this.inspirationHeroica,

            attributes: this.attributes,
            skills: this.skills,

            passivePerception: this.passivePerception,
            size: this.size,
            speed: this.speed,
            initiative: this.initiative,

            ac: this.ac,
            hp: this.hp,
            deathSaves: this.deathSaves,

            equipmentProficiencies: this.equipmentProficiencies,
            languages: this.languages,
            treinamentoEProfEquip: this.treinamentoEProfEquip,

            weapons: this.weapons,
            features: this.features,

            inventory: this.inventory,
            spellcasting: this.spellcasting,

            appearance: this.appearance,
            backstoryPersonality: this.backstoryPersonality,
            ideals: this.ideals,
            bonds: this.bonds,
            flaws: this.flaws,

            notes: this.notes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            schemaVersion: this.schemaVersion
        };
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options) || {};
        return new Sheet({
            uid: snapshot.id,
            ...data
        });
    }
}

export default Sheet;
