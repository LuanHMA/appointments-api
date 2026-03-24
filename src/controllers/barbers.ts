import { NextFunction, Request, Response } from "express"
import z from "zod"
import { BarbersService } from "../services/barbers"

export class BarbersController {
    private barbersService = new BarbersService()

    async index(_: Request, res: Response, next: NextFunction) {
        try {
            const barbers = await this.barbersService.index()

            return res.status(200).json({ message: "Barbeiros listados com sucesso", barbers })

        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name: z.string("Nome inválido"),
                phone: z.string("Telefone inválido").regex(/^[1-9]{2}9[0-9]{8}$/, "Telefone inválido"),
                email: z
                    .string("Email inválido")
                    .regex(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        , "Email inválido")
            })

            const { name, phone, email } = bodySchema.parse(req.body)

            await this.barbersService.create({ name, phone, email })

            return res.status(201).json({ message: "Barbeiro cadastrado com sucesso" })
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            name: z.string("Nome inválido"),
            phone: z.string("Telefone inválido").regex(/^[1-9]{2}9[0-9]{8}$/, "Telefone inválido"),
        })

        const id = z
            .string("Id inválido")
            .transform((id) => Number(id))
            .refine((id) => !Number.isNaN(id), "Id inválido")
            .parse(req.params.id)

        const { name, phone } = bodySchema.parse(req.body)

        await this.barbersService.update({ id, name, phone })

        return res.status(200).json({ message: "Barbeiro atualizado com sucesso" })
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = z
                .string("Id inválido")
                .transform((id) => Number(id))
                .refine((id) => !Number.isNaN(id), "Id inválido")
                .parse(req.params.id)

            await this.barbersService.delete(id)

            return res.status(201).json({ message: "Barbeiro removido com sucesso" })
        } catch (error) {
            next(error)
        }
    }
}