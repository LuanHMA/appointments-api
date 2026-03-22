import { NextFunction, Request, Response } from "express"
import z from "zod"
import { BarbersService } from "../services/barbers-service"

export class BarbersController {
    private barbersService = new BarbersService()

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const barbers = await this.barbersService.index()

            console.log(barbers)
            return res.status(200).json({ message: "Barbeiros listados com sucesso", barbers })

        } catch (error) {
            next(error)
        }
    }
}