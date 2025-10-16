import { auth } from '../config/firebase.js';
import { unauthorized } from '../utils/response.js';

export async function authMiddleware(req, res, next) {
    try {
        const header = req.headers.authorization || '';
        const [scheme, token] = header.split(' ');


        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json(unauthorized('Missing or invalid Authorization header'));
        }


        const decoded = await auth.verifyIdToken(token);
        req.user = { uid: decoded.uid, email: decoded.email, decoded };
        return next();
    } catch (err) {
        return res.status(401).json(unauthorized('Invalid or expired token', err.message));
    }
}