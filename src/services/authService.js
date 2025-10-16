import { auth } from '../config/firebase.js';
import { userRepository } from '../repositories/userRepository.js';


export const authService = {
    async signup({ email, password, displayName }) {
        const user = await userRepository.createUser({ email, password, displayName });
        return user;
    },


    async resetPassword(email) {
        const link = await auth.generatePasswordResetLink(email);
        return { email, link };
    },


    async getProfile(uid) {
        const user = await userRepository.getUserById(uid);
        return user;
    }
};