import { HttpException } from "./HttpException";

export default class NotFoundError extends HttpException {
    private static readonly _statusCode = 404;
    private readonly _code: number;

    constructor(params?: { code?: number, message?: string, context?: { [key: string]: any } }) {
        const { code, message } = params || {};
        super(code || NotFoundError._statusCode, message || "Not Found");
        this._code = code || NotFoundError._statusCode;

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    get errors() {
        return [{ message: this.message }];
    }

    get statusCode() {
        return this._code;
    }

}