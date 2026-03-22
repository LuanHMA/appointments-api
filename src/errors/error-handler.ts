import { NextFunction, Request, Response } from "express";
import { AppError } from "./app-error";

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    console.log(error)

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: "Erro interno do servidor!" })
}