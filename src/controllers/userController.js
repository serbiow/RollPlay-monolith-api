import UserService from '../services/userService.js';
import { ok, created, badRequest, notFound } from '../utils/response.js';

const userService = new UserService();

export const userController = {
    async createUser(req, res, next) {
        try {
            const { email, password, displayName } = req.body;
            if (!email || !password) return res.status(400).json(badRequest('email e password são obrigatórios'));

            // enviar objeto de dados; service cria o user no Auth e usa o UID gerado
            const user = await userService.createUser({ email, password, displayName });
            return res.status(201).json(created(user, 'Usuário criado com sucessoooooo.'));
        } catch (err) {
            next(err);
        }
    },

    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.getUserByUid(id);
            if (!user) return res.status(404).json(notFound('Usuário não encontrado.'));
            return res.json(ok(user));
        } catch (err) {
            next(err);
        }
    },

    async getUserByEmail(req, res, next) {
        try {
            const { email } = req.params;
            const user = await userService.getUserByEmail(email);
            if (!user) return res.status(404).json(notFound('Usuário não encontrado.'));
            return res.json(ok(user));
        } catch (err) {
            next(err);
        }
    },

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(ok(users));
        } catch (err) {
            next(err);
        }
    },

    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const payload = req.body;
            const user = await userService.updateUser(id, payload);
            return res.json(ok(user, 'Usuário atualizado com sucesso.'));
        } catch (err) {
            next(err);
        }
    },

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            await userService.deleteUser(id);
            return res.json(ok({ id }, 'Usuário deletado com sucesso.'));
        } catch (err) {
            next(err);
        }
    },

    async deactivateUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.deactivateUser(id);
            return res.json(ok(user, 'Usuário desativado com sucesso.'));
        } catch (err) {
            next(err);
        }
    },

    async reactivateUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.reactivateUser(id);
            return res.json(ok(user, 'Usuário reativado com sucesso.'));
        } catch (err) {
            next(err);
        }
    }
};