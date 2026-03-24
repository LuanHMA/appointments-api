import { NextFunction, Response, Request } from "express";
import { OpeningHoursService } from "../services/opening-hours";
import z from "zod";

export class OpeningHoursController {
    private openingHoursService = new OpeningHoursService()

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const openingHours = await this.openingHoursService.index()

            return res.status(200).json({ message: "Horários listados com sucesso", openingHours })
        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                week_day: z.number("Dia da semana inválido").min(0).max(6, "Deve ser um valor entre 0 e 6"),
                opening_hour: z
                    .string("Horário inválido")
                    .regex(/^[0-9]{2}:[0-9]{2}$/, "Horário inválido")
                    .refine((value) => {
                        const [hours] = value.split(":")
                        return Number(hours) >= 0 && Number(hours) <= 23
                    }, "O horário deve ser entre 00:00 e 23:59"),
                closing_hour: z
                    .string("Horário inválido")
                    .regex(/^[0-9]{2}:[0-9]{2}$/, "Horário inválido")
                    .refine((value) => {
                        const [hours] = value.split(":")
                        return Number(hours) >= 0 && Number(hours) <= 23
                    }, "O horário deve ser entre 00:00 e 23:59"),
            })

            const { week_day, opening_hour, closing_hour } = bodySchema.parse(req.body)

            await this.openingHoursService.create({ week_day, opening_hour, closing_hour })

            return res.status(201).json({ message: "Horário cadastrado com sucesso" })
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                week_day: z.number("Dia da semana inválido").min(0).max(6, "Deve ser um valor entre 0 e 6"),
                opening_hour: z
                    .string("Horário inválido")
                    .regex(/^[0-9]{2}:[0-9]{2}$/, "Horário inválido")
                    .refine((value) => {
                        const [hours] = value.split(":")
                        return Number(hours) >= 0 && Number(hours) <= 23
                    }, "O horário deve ser entre 00:00 e 23:59"),
                closing_hour: z
                    .string("Horário inválido")
                    .regex(/^[0-9]{2}:[0-9]{2}$/, "Horário inválido")
                    .refine((value) => {
                        const [hours] = value.split(":")
                        return Number(hours) >= 0 && Number(hours) <= 23
                    }, "O horário deve ser entre 00:00 e 23:59"),
                is_open: z.boolean("Deve ser um boolean"),
            })

            const id = z
                .string("Id inválido")
                .transform((id) => Number(id))
                .refine((id) => !isNaN(id), "Id inválido")
                .parse(req.params.id)

            const { week_day, opening_hour, closing_hour, is_open } = bodySchema.parse(req.body)

            await this.openingHoursService.update({ week_day, opening_hour, closing_hour, id, is_open })

            return res.status(201).json({ message: "Horário atualizado com sucesso" })
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = z
                .string("Id inválido")
                .transform((id) => Number(id))
                .refine((id) => !isNaN(id), "Id inválido")
                .parse(req.params.id)

            await this.openingHoursService.delete(id)

            return res.status(200).json({ message: "Horário removido com sucesso" })

        } catch (error) {
            next(error)
        }
    }
}