import { NextFunction, Request, Response } from "express";
import { AppointmentService } from "../services/appointment";
import z from "zod";

export class AppointmentsController {
    private appointmentsService = new AppointmentService()

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const appointments = await this.appointmentsService.index()

            return res.status(200).json({ message: "Agendamentos listados com sucesso", appointments })

        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const dateTimeSchema = z
                .string()
                .regex(
                    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
                    "Formato inválido. Use YYYY-MM-DD HH:mm:ss"
                );

            const bodySchema = z.object({
                barber_id: z.number().positive("Id inválido"),
                week_day: z.number().min(0).max(6),

                catalog_id: z.number().positive("Id inválido"),

                customer_name: z.string().min(1).max(100),
                customer_phone: z.string().regex(/^[0-9]{11}$/),

                started_at: dateTimeSchema,
                finished_at: dateTimeSchema,
            })
            .refine((data) => data.started_at < data.finished_at, {
                message: "Horário final deve ser maior que o inicial",
                path: ["finished_at"],
            });

            const data = bodySchema.parse(req.body)

            await this.appointmentsService.create(data)

            return res.status(201).json({ message: "Agendamento cadastrado com sucesso" })
        } catch (error) {
            next(error)
        }
    }
}