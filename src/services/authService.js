import { auth } from '../config/firebase.js';
import UserRepository from '../repositories/userRepository.js';
import User from '../models/userModel.js';
import AppError from '../utils/AppError.js';

const userRepository = new UserRepository();

export const authService = {
    async signup({ email, password, displayName }) {
        try {
            // Cria o usuário só no Firebase Auth
            const userRecord = await auth.createUser({
                email,
                password,
                displayName
            });

            // Chama a userRepository pra criar o doc no Firestore
            const user = new User(userRecord.uid, displayName, email);
            return userRepository.createUser(userRecord.uid, user);
        } catch (err) {
            if (err.code === 'auth/email-already-exists' || err.code === 'auth/email-already-in-use') {
                throw new AppError('Este email já está cadastrado. Tente fazer login ou use outro email.', 409);
            }
            throw new AppError(err.message || 'Erro ao criar usuário', 400);
        }
    },

    async resetPassword(email) {
        const link = await auth.generatePasswordResetLink(email);
        return { email, link };
    },

    async getProfile(uid) {
        return userRepository.getUserByUid(uid);
    }
};