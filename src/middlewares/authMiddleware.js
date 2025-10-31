// middleware/auth.js
import { auth } from '../config/firebase.js';
import { unauthorized } from '../utils/response.js';

export async function authMiddleware(req, res, next) {
  try {
    const header = (req.headers.authorization || '').trim();
    const match = header.match(/^Bearer\s+(.+)$/i);
    if (!match) {
      return res.status(401).json(unauthorized('Missing or invalid Authorization header'));
    }

    const token = match[1];
    const decoded = await auth.verifyIdToken(token);

    req.user = {
      uid: decoded.uid,
      email: decoded.email || null,
      decoded,
    };
    return next();
  } catch (err) {
    const msg = err?.code === 'auth/id-token-expired'
      ? 'Token expired'
      : 'Invalid or expired token';
    return res.status(401).json(unauthorized(msg, err?.message));
  }
}
