class Campaign {
    constructor(uid, userUid, name, description, players, npcs=[], mapas=[], notas=[], sessoes=[], createdAt = new Date(), updatedAt = new Date()) {
        this.uid = uid;
        this.userUid = userUid;
        this.name = name;
        this.description = description;
        this.players = players;
        this.npcs = npcs;
        this.mapas = mapas;
        this.notas = notas;
        this.sessoes = sessoes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    toFirestore() {
        return {
            userUid: this.userUid,
            name: this.name,
            description: this.description,
            players: this.players,
            npcs: this.npcs,
            mapas: this.mapas,
            notas: this.notas,
            sessoes: this.sessoes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return new Campaign(snapshot.id, data.userUid, data.name, data.description, data.players, data.npcs, data.mapas, data.notas, data.sessoes, data.createdAt, data.updatedAt);
    }
}

export default Campaign;

