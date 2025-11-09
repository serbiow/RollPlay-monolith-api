class Campaign {
    constructor(uid, userUid, name, description, players, createdAt = new Date(), updatedAt = new Date()) {
        this.uid = uid;
        this.userUid = userUid;
        this.name = name;
        this.description = description;
        this.players = players;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    toFirestore() {
        return {
            userUid: this.userUid,
            name: this.name,
            description: this.description,
            players: this.players,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return new Campaign(snapshot.id, data.userUid, data.name, data.description, data.players, data.createdAt, data.updatedAt);
    }
}

export default Campaign;

