class AppError {
    constructor(message , code) {
        this.message = message;
        this.statusCode = code;
    }
}

module.exports = AppError