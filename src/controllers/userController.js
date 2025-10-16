import { userRepository } from '../repositories/userRepository.js';
import { ok, created, badRequest, notFound } from '../utils/response.js';


export const userController = {
    async createUser(req, res, next) {
        try {
            const { email, password, displayName } = req.body;
            if (!email || !password) return res.status(400).json(badRequest('email e password são obrigatórios'));
            const user = await userRepository.createUser({ email, password, displayName });
            return res.status(201).json(created(user, 'Usuário criado (admin)'));
        } catch (err) { next(err); }
    },


    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userRepository.getUserById(id);
            if (!user) return res.status(404).json(notFound('Usuário não encontrado'));
            return res.json(ok(user));
        } catch (err) { next(err); }
    },


    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const payload = req.body;
            const user = await userRepository.updateUser(id, payload);
            return res.json(ok(user, 'Usuário atualizado'));
        } catch (err) { next(err); }
    },


    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            await userRepository.deleteUser(id);
            return res.json(ok({ id }, 'Usuário deletado'));
        } catch (err) { next(err); }
    }
};