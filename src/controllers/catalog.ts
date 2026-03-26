import { Request, Response, NextFunction } from "express"
import { CatalogService } from "../services/catalog"
import z from "zod"

export class CatalogController {
    private catalogService = new CatalogService()

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const catalog = await this.catalogService.index()

            return res.status(200).json({ message: "Catálogo listado com sucesso", catalog })
        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name: z.string("Nome inválido").max(50, "O nome deve ter no máximo 50 caracteres"),
                description: z.string("Descrição inválida").max(500, "A descrição deve ter no máximo 500 caracteres").optional(),
                price: z.number("Preço inválido").positive("Preço inválido"),
                average_duration: z.string("Duração inválida").regex(/^[0-9]{2}:[0-9]{2}$/, "Duração inválida")
            })

            const data = bodySchema.parse(req.body)

            await this.catalogService.create(data)

            return res.status(201).json({ message: "Produto cadastrado com sucesso" })
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = z
                .string("Id inválido")
                .transform((id) => Number(id))
                .refine((value) => !isNaN(value), "Id inválido")
                .parse(req.params.id)

            const bodySchema = z.object({
                name: z.string("Nome inválido").max(50, "O nome deve ter no máximo 50 caracteres").optional(),
                description: z.string("Descrição inválida").max(500, "A descrição deve ter no máximo 500 caracteres").optional(),
                price: z.number("Preço inválido").positive("Preço inválido").optional(),
                average_duration: z.string("Duração inválida").regex(/^[0-9]{2}:[0-9]{2}$/, "Duração inválida").optional()
            })

            const data = bodySchema.parse(req.body)

            await this.catalogService.update({ id, ...data })

            return res.status(200).json({ message: "Produto atualizado com sucesso" })
        } catch (error) {
            next(error)
        }
    }


    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = z
                .string("Id inválido")
                .transform((id) => Number(id))
                .refine((value) => !isNaN(value), "Id inválido")
                .parse(req.params.id)

            await this.catalogService.delete(id)

            return res.status(200).json({ message: "Produto removido com sucesso" })
        } catch (error) {
            next(error)
        }
    }
}