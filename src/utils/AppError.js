class AppError extends Error {
    constructor(message, status = 500, details = null) {
        super(message);
        this.name = 'AppError';
        this.status = status;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
