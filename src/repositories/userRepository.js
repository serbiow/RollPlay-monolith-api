import { auth } from '../config/firebase.js';

export const userRepository = {
    async createUser({ email, password, displayName }) {
        const userRecord = await auth.createUser({ email, password, displayName });
        return userRecord;
    },

    async getUserById(uid) {
        const userRecord = await auth.getUser(uid);
        return userRecord;
    },

    async updateUser(uid, payload) {
        const updated = await auth.updateUser(uid, payload);
        return updated;
    },

    async deleteUser(uid) {
        await auth.deleteUser(uid);
        return { uid };
    }
};