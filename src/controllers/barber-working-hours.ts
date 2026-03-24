import { NextFunction, Request, Response } from "express";
import { BarberWorkingHoursService } from "../services/barber-working-hours";
import z from "zod";

export class BarberWorkingHoursController {
    private barberWorkingHoursService = new BarberWorkingHoursService()
    private weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const workingHours = await this.barberWorkingHoursService.index()

            return res.status(200).json({ message: "Horários listados com sucesso", workingHours })
        } catch (error) {
            next(error)
        }
    }

    async indexByBarber(req: Request, res: Response, next: NextFunction) {
        try {
            const barber_id = z
                .string("Id inválido")
                .transform((id) => Number(id))
                .refine((id) => !Number.isNaN(id), "Id inválido")
                .parse(req.params.barber_id)

            const workingHours = await this.barberWorkingHoursService.indexByBarber(barber_id)

            return res.status(200).json({ message: "Horários listados com sucesso", workingHours })
        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                barber_id: z.number("Id inválido").positive("Id inválido"),
                week_day: z.number("Dia da semana inválido").min(0).max(6, "Deve ser um valor entre 0 e 6"),
                start_time: z.string("Horário inválido").regex(/^[0-9]{2}:[0-9]{2}$/, "Horário inválido"),
                end_time: z.string("Horário inválido").regex(/^[0-9]{2}:[0-9]{2}$/, "Horário inválido")
            })

            const { barber_id, week_day, start_time, end_time } = bodySchema.parse(req.body)

            await this.barberWorkingHoursService.create({ barber_id, week_day, start_time, end_time })

            return res.status(201).json({ message: "Horário cadastrado com sucesso" })
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                id: z.number("Id inválido").positive("Id inválido"),
                week_day: z.number("Dia da semana inválido").min(0).max(6, "Deve ser um valor entre 0 e 6"),
                start_time: z.string("Horário inválido").regex(/^[0-9]{2}:[0-9]{2}$/, "Horário inválido"),
                end_time: z.string("Horário inválido").regex(/^[0-9]{2}:[0-9]{2}$/, "Horário inválido")
            })

            const { id, week_day, start_time, end_time } = bodySchema.parse(req.body)

            await this.barberWorkingHoursService.update({ id, week_day, start_time, end_time })

            return res.status(200).json({ message: "Horário atualizado com sucesso" })
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = z
                .string("Id inválido")
                .transform((id) => Number(id))
                .refine((id) => !Number.isNaN(id), "Id inválido")
                .parse(req.params.id)

            await this.barberWorkingHoursService.delete(id)

            return res.status(201).json({ message: "Horário removido com sucesso" })
        } catch (error) {
            next(error)
        }
    }

    async deleteAllByBarber(req: Request, res: Response, next: NextFunction) {
        try {
            const barber_id = z
                .string("Id inválido")
                .transform((id) => Number(id))
                .refine((id) => !Number.isNaN(id), "Id inválido")
                .parse(req.params.barber_id)

            await this.barberWorkingHoursService.deleteAllByBarber(barber_id)

            return res.status(201).json({ message: "Horários removidos com sucesso" })
        } catch (error) {
            next(error)
        }
    }
}