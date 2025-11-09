import admin from 'firebase-admin';
import { db } from '../config/firebase.js';
import User from "../models/userModel.js";

class UserRepository {
    constructor() {
        this.collection = db.collection('user');
    }

    async createUser(uid, userData) {
        // aceita tanto instância de User quanto dados puros
        const user = userData instanceof User ? userData : new User(uid, userData?.displayName ?? null, userData?.email ?? null);
        const ref = this.collection.doc(uid);
        await ref.set(user.toFirestore(), { merge: false });
        return { uid, ...user.toFirestore() };
    }

    async getUserByUid(uid) {
        const doc = await this.collection.doc(uid).get();
        console.log("Fala gurizada");
        return doc.exists ? User.fromFirestore(doc) : null;
    }

    async getUserByEmail(email) {
        const snap = await this.collection.where('email', '==', email).limit(1).get();
        if (snap.empty) return null;
        return User.fromFirestore(snap.docs[0]);
    }

    async getAllUsers() {
        const snap = await this.collection.get();
        return snap.docs.map((d) => User.fromFirestore(d)).filter(Boolean);
    }

    async updateUser(uid, partialData) {
        await this.collection.doc(uid).set(partialData, { merge: true });
        const updated = await this.collection.doc(uid).get();
        return User.fromFirestore(updated);
    }

    async deleteUser(uid) {
        await this.collection.doc(uid).delete();
        return { message: 'User deleted successfully' };
    }

    async deactivateUser(uid) {
        const now = admin.firestore.FieldValue.serverTimestamp();
        await this.collection.doc(uid).set(
            {
                active: false,
                deactivatedAt: now,
                updatedAt: now,
            },
            { merge: true }
        );
        const doc = await this.collection.doc(uid).get();
        return User.fromFirestore(doc);
    }

    async reactivateUser(uid) {
        const now = admin.firestore.FieldValue.serverTimestamp();
        await this.collection.doc(uid).set(
            {
                active: true,
                reactivatedAt: now,
                updatedAt: now,
                deactivatedAt: admin.firestore.FieldValue.delete(),
            },
            { merge: true }
        );
        const doc = await this.collection.doc(uid).get();
        return User.fromFirestore(doc);
    }
}

export default UserRepository;