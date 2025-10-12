import UserRepository from "../repositories/userRepository.js";
import User from "../models/userModel.js";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(uid, userData) {
        const existingUser = await this.userRepository.getUserByUid(uid);
        if (existingUser) {
            throw new Error("User with this UID already exists.");
        }
        const newUser = new User(uid, userData.displayName, userData.email);
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
        // Update only provided fields
        const updatedData = { ...existingUser.toFirestore(), ...userData, updatedAt: new Date() };
        return this.userRepository.updateUser(uid, updatedData);
    }

    async deleteUser(uid) {
        const existingUser = await this.userRepository.getUserByUid(uid);
        if (!existingUser) {
            throw new Error("User not found.");
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

