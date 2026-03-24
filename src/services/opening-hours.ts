import { knex } from "../database/connection";
import { CreateOpeningHours, OpeningHoursTable, UpdateOpeningHours } from "../database/types/opening-hours-table";
import { BadRequestError, NotFoundError } from "../errors/app-error";

export class OpeningHoursService {
    async index() {
        const openingHours = await knex<OpeningHoursTable>("opening_hours")
            .select()
            .orderBy("week_day")

        return openingHours
    }

    async create(data: CreateOpeningHours) {
        const openingHoursAlreadyExists = await knex<OpeningHoursTable>("opening_hours")
            .where({ week_day: data.week_day })
            .first()

        if (openingHoursAlreadyExists) {
            throw new BadRequestError("Esse dia da semana ja foi cadastrado")
        }

        await knex<OpeningHoursTable>("opening_hours")
            .insert(data)
    }

    async update(data: UpdateOpeningHours) {
        const openingHoursAlreadyExists = await knex<OpeningHoursTable>("opening_hours")
            .where({ id: data.id })
            .first()

        if (!openingHoursAlreadyExists) {
            throw new NotFoundError("Nenhum registro encontrado com esse id")
        }

        await knex<OpeningHoursTable>("opening_hours").update(data).where({ id: data.id })
    }

    async delete(id: OpeningHoursTable["id"]) {
        const openingHoursAlreadyExists = await knex<OpeningHoursTable>("opening_hours")
            .where({ id })
            .first()

        if (!openingHoursAlreadyExists) {
            throw new NotFoundError("Nenhum registro encontrado com esse id")
        }

        await knex<OpeningHoursTable>("opening_hours").delete().where({ id })
    }
}