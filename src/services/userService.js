import UserRepository from "../repositories/userRepository.js";
import User from "../models/userModel.js";
import { auth } from "../config/firebase.js";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    // agora recebe um objeto { email, password, displayName }
    async createUser(userData) {
        const { email, password, displayName } = userData || {};
        if (!email || !password) {
            throw new Error("email e password são obrigatórios.");
        }

        // prevenir duplicação no Firestore (opcional, Auth já falhará se email existir)
        const existingByEmail = await this.userRepository.getUserByEmail(email);
        if (existingByEmail) {
            throw new Error("User with this email already exists.");
        }

        // cria usuário no Firebase Auth para gerar UID aleatório
        let userRecord;
        try {
            userRecord = await auth.createUser({
                email,
                password,
                displayName,
            });
        } catch (err) {
            // traduzir erro comum
            if (err.code === 'auth/email-already-exists' || err.code === 'auth/email-already-in-use') {
                throw new Error('Email já está em uso.');
            }
            throw err;
        }

        const uid = userRecord.uid;
        const newUser = new User(uid, displayName, email);
        return this.userRepository.createUser(uid, newUser);
    }

    async getUserByUid(uid) {
        const user = await this.userRepository.getUserByUid(uid);
        if (!user) {
            throw new Error("User not found.");
        }
        return user;
    }

    async getUserByEmail(email) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error("User not found.");
        }
        return user;
    }

    async getAllUsers() {
        return this.userRepository.getAllUsers();
    }

    async updateUser(uid, userData) {
        const existingUser = await this.userRepository.getUserByUid(uid);
        if (!existingUser) {
            throw new Error("User not found.");
        }
        // Atualizar apenas os campos fornecidos
        const updatedData = { ...existingUser.toFirestore(), ...userData, updatedAt: new Date() };
        return this.userRepository.updateUser(uid, updatedData);
    }

    async deleteUser(uid) {
        const existingUser = await this.userRepository.getUserByUid(uid);
        if (!existingUser) {
            throw new Error("User not found.");
        }
        // opcional: remover do Firebase Auth também
        try {
            await auth.deleteUser(uid);
        } catch (err) {
            // se não existir no Auth, apenas prosseguir com remoção no Firestore
        }
        return this.userRepository.deleteUser(uid);
    }

    async deactivateUser(uid) {
        const existingUser = await this.userRepository.getUserByUid(uid);
        if (!existingUser) {
            throw new Error("User not found.");
        }
        return this.userRepository.deactivateUser(uid);
    }

    async reactivateUser(uid) {
        const existingUser = await this.userRepository.getUserByUid(uid);
        if (!existingUser) {
            throw new Error("User not found.");
        }
        return this.userRepository.reactivateUser(uid);
    }
}

export default UserService;

