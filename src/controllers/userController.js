import UserService from "../services/userService.js";

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async createUser(req, res) {
        const { uid, displayName, email } = req.body;

        if (!uid || !displayName || !email) {
            return res.status(400).json({ message: "Dados inválidos para criação de usuário." });
        }

        try {
            const newUser = { uid, displayName, email };
            const result = await this.userService.createUser(uid, newUser);
            return res.status(201).json({ message: "Usuário criado com sucesso!", user: result });
        } catch (error) {
            console.error("[UserController::createUser]:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async getUserByUid(req, res) {
        const { uid } = req.params;

        if (!uid) {
            return res.status(400).json({ message: "UID do usuário inválido." });
        }

        try {
            const user = await this.userService.getUserByUid(uid);
            return res.status(200).json({ user });
        } catch (error) {
            console.error("[UserController::getUserByUid]:", error);
            return res.status(404).json({ message: error.message });
        }
    }

    async getUserByEmail(req, res) {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: "Email do usuário inválido." });
        }

        try {
            const user = await this.userService.getUserByEmail(email);
            return res.status(200).json({ user });
        } catch (error) {
            console.error("[UserController::getUserByEmail]:", error);
            return res.status(404).json({ message: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).json({ users });
        } catch (error) {
            console.error("[UserController::getAllUsers]:", error);
            return res.status(500).json({ message: "Erro ao buscar usuários." });
        }
    }

    async updateUser(req, res) {
        const { uid } = req.params;
        const userData = req.body;

        if (!uid || !userData) {
            return res.status(400).json({ message: "Dados inválidos para atualização de usuário." });
        }

        try {
            const updatedUser = await this.userService.updateUser(uid, userData);
            return res.status(200).json({ message: "Usuário atualizado com sucesso!", user: updatedUser });
        } catch (error) {
            console.error("[UserController::updateUser]:", error);
            return res.status(404).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        const { uid } = req.params;

        if (!uid) {
            return res.status(400).json({ message: "UID do usuário inválido." });
        }

        try {
            const result = await this.userService.deleteUser(uid);
            return res.status(200).json(result);
        } catch (error) {
            console.error("[UserController::deleteUser]:", error);
            return res.status(404).json({ message: error.message });
        }
    }

    async deactivateUser(req, res) {
        const { uid } = req.params;

        if (!uid) {
            return res.status(400).json({ message: "UID do usuário inválido." });
        }

        try {
            const deactivatedUser = await this.userService.deactivateUser(uid);
            return res.status(200).json({ message: "Usuário desativado com sucesso!", user: deactivatedUser });
        } catch (error) {
            console.error("[UserController::deactivateUser]:", error);
            return res.status(404).json({ message: error.message });
        }
    }

    async reactivateUser(req, res) {
        const { uid } = req.params;

        if (!uid) {
            return res.status(400).json({ message: "UID do usuário inválido." });
        }

        try {
            const reactivatedUser = await this.userService.reactivateUser(uid);
            return res.status(200).json({ message: "Usuário reativado com sucesso!", user: reactivatedUser });
        } catch (error) {
            console.error("[UserController::reactivateUser]:", error);
            return res.status(404).json({ message: error.message });
        }
    }
}

export default UserController;

