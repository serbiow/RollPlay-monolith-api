import { serverError, badRequest } from '../utils/response.js';

export function errorHandler(err, req, res, next) {
    console.error('[ERROR]', err);


    const status = err.status || 500;
    const payload = status >= 500
        ? serverError(err.message, process.env.NODE_ENV === 'development' ? err.stack : undefined)
        : badRequest(err.message, err?.details);


    return res.status(status).json(payload);
}