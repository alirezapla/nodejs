import { HttpException } from "./HttpException";

export default class BadRequestError extends HttpException {
    private static readonly _statusCode = 400;
    private readonly _code: number;

    constructor(params?: { code?: number, message?: string, context?: { [key: string]: any } }) {
        const { code, message } = params || {};
        super(code || BadRequestError._statusCode, message || "Bad request");
        this._code = code || BadRequestError._statusCode;

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    get errors() {
        return [{ message: this.message }];
    }

    get statusCode() {
        return this._code;
    }

}