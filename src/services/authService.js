import { auth } from '../config/firebase.js';
import UserRepository from '../repositories/userRepository.js';
import User from '../models/userModel.js';

const userRepository = new UserRepository();

export const authService = {
    async signup({ email, password, displayName }) {
        // Cria o usuário só no Firebase Auth
        const userRecord = await auth.createUser({
            email,
            password,
            displayName
        });

        // Chama a userRepository pra criar o doc no Firestore
        const user = new User(userRecord.uid, displayName, email);
        return userRepository.createUser(userRecord.uid, user);
    },

    async resetPassword(email) {
        const link = await auth.generatePasswordResetLink(email);
        return { email, link };
    },

    async getProfile(uid) {
        return userRepository.getUserByUid(uid);
    }
};