"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(message) {
        super(message);
        this.baseName = "ApplicationError";
        this.code = 500;
        this.getResponseMessage = () => {
            return {
                message: this.message,
            };
        };
        this.name = "ApplicationError";
    }
}
exports.ApplicationError = ApplicationError;
ApplicationError.isApplicationError = (error) => {
    return (error instanceof ApplicationError || error.baseName === "ApplicationError");
};
//# sourceMappingURL=index.js.map