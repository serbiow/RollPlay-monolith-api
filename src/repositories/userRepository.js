import { db } from '../config/firebase.js';
import User from '../models/userModel.js';

class UserRepository {
    constructor() {
        this.collection = db.collection('users');
    }

    async createUser(uid, userData) {
        const userRef = this.collection.doc(uid);
        await userRef.set(userData.toFirestore());
        return { uid, ...userData.toFirestore() };
    }

    async getUserByUid(uid) {
        const doc = await this.collection.doc(uid).get();
        if (!doc.exists) {
            return null;
        }
        return User.fromFirestore(doc);
    }

    async getUserByEmail(email) {
        const snapshot = await this.collection.where('email', '==', email).get();
        if (snapshot.empty) {
            return null;
        }
        const doc = snapshot.docs[0];
        return User.fromFirestore(doc);
    }

    async getAllUsers() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => User.fromFirestore(doc));
    }

    async updateUser(uid, userData) {
        const userRef = this.collection.doc(uid);
        await userRef.update(userData);
        const updatedDoc = await userRef.get();
        return User.fromFirestore(updatedDoc);
    }

    async deleteUser(uid) {
        await this.collection.doc(uid).delete();
        return { message: 'User deleted successfully' };
    }

    async deactivateUser(uid) {
        const userRef = this.collection.doc(uid);
        await userRef.update({ isActive: false });
        const updatedDoc = await userRef.get();
        return User.fromFirestore(updatedDoc);
    }

    async reactivateUser(uid) {
        const userRef = this.collection.doc(uid);
        await userRef.update({ isActive: true });
        const updatedDoc = await userRef.get();
        return User.fromFirestore(updatedDoc);
    }
}

export default UserRepository;

