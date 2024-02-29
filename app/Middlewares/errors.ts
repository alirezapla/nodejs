import { NextFunction, Request, Response } from "express";
import BadRequestError from "../Exceptions/BadRequest";
import { HttpException } from "../Exceptions/HttpException";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof HttpException) {
        const { status, message } = err;

        return res.status(status).json({ message: message });
    }

    return res.status(500).json({ errors: [{ message: "Something went wrong" }] });
};