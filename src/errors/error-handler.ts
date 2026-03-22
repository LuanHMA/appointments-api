import { NextFunction, Request, Response } from "express";
import { AppError } from "./app-error";
import { ZodError } from "zod";

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    console.log(error)

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
    }

    if (error instanceof ZodError) {
        return res.status(400).json({
            message: "Houve um errro de validação",
            validation_errors: error.issues.map((inssue) => {
                return {
                    path: inssue.path[0],
                    error: inssue.message
                }
            })
        })
    }

    return res.status(500).json({ message: "Erro interno do servidor!" })
}