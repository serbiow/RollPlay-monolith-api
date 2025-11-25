class User {
    constructor(uid, displayName, email, title='', bio='', userPhoto='', isActive = true, createdAt = new Date(), updatedAt = new Date()) {
        this.uid = uid;
        this.displayName = displayName;
        this.email = email;
        this.title = title;
        this.bio = bio;
        this.userPhoto = userPhoto;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    toFirestore() {
        return {
            displayName: this.displayName,
            email: this.email,
            title: this.title,
            bio: this.bio,
            userPhoto: this.userPhoto,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return new User(snapshot.id, data.displayName, data.email, data.title, data.bio, data.userPhoto, data.isActive, data.createdAt, data.updatedAt);
    }
}

export default User;

