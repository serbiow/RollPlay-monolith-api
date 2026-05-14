class Campaign {
    constructor(uid, userUid, name, description, players=[], npcs=[], mapas=[], notas=[], sessoes=[], createdAt = new Date(), updatedAt = new Date(), system = 'D&D 5e') {
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
        this.system = system;
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
            system: this.system,
        };
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return new Campaign(
            snapshot.id,
            data.userUid,
            data.name,
            data.description,
            data.players,
            data.npcs,
            data.mapas,
            data.notas,
            data.sessoes,
            data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
            data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt,
            data.system || 'D&D 5e'
        );
    }
}

export default Campaign;

