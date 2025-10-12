class Sheet {
    constructor(uid, userUid, name, characterClass, level, race, alignment, background, attributes, skills, hp, ac, speed, initiative, inventory, spells, features, notes, createdAt = new Date(), updatedAt = new Date()) {
        this.uid = uid;
        this.userUid = userUid;
        this.name = name;
        this.characterClass = characterClass;
        this.level = level;
        this.race = race;
        this.alignment = alignment;
        this.background = background;
        this.attributes = attributes;
        this.skills = skills;
        this.hp = hp;
        this.ac = ac;
        this.speed = speed;
        this.initiative = initiative;
        this.inventory = inventory;
        this.spells = spells;
        this.features = features;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    toFirestore() {
        return {
            userUid: this.userUid,
            name: this.name,
            characterClass: this.characterClass,
            level: this.level,
            race: this.race,
            alignment: this.alignment,
            background: this.background,
            attributes: this.attributes,
            skills: this.skills,
            hp: this.hp,
            ac: this.ac,
            speed: this.speed,
            initiative: this.initiative,
            inventory: this.inventory,
            spells: this.spells,
            features: this.features,
            notes: this.notes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return new Sheet(
            snapshot.id,
            data.userUid,
            data.name,
            data.characterClass,
            data.level,
            data.race,
            data.alignment,
            data.background,
            data.attributes,
            data.skills,
            data.hp,
            data.ac,
            data.speed,
            data.initiative,
            data.inventory,
            data.spells,
            data.features,
            data.notes,
            data.createdAt,
            data.updatedAt
        );
    }
}

export default Sheet;

