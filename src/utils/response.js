export const ok = (data = null, message = 'OK') => ({ success: true, message, data });
export const created = (data = null, message = 'Created') => ({ success: true, message, data });
export const badRequest = (message = 'Bad Request', error = null) => ({ success: false, message, error });
export const unauthorized = (message = 'Unauthorized', error = null) => ({ success: false, message, error });
export const notFound = (message = 'Not Found', error = null) => ({ success: false, message, error });
export const serverError = (message = 'Internal Server Error', error = null) => ({ success: false, message, error });