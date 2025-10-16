import { authService } from '../services/authService.js';
import { ok, created, badRequest } from '../utils/response.js';


export const authController = {
    async signUp(req, res, next) {
        try {
            const { email, password, displayName } = req.body;
            if (!email || !password) return res.status(400).json(badRequest('email e password são obrigatórios'));
            const user = await authService.signup({ email, password, displayName });
            return res.status(201).json(created(user, 'Usuário criado'));
        } catch (err) { next(err); }
    },


    async resetPassword(req, res, next) {
        try {
            const { email } = req.body;
            if (!email) return res.status(400).json(badRequest('email é obrigatório'));
            const result = await authService.resetPassword(email);
            return res.json(ok(result, 'Link de redefinição gerado'));
        } catch (err) { next(err); }
    },


    async getProfile(req, res, next) {
        try {
            const profile = await authService.getProfile(req.user.uid);
            return res.json(ok(profile));
        } catch (err) { next(err); }
    }
};