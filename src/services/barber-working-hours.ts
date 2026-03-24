import { knex } from "../database/connection";
import { BarberWorkingHoursTable, CreateBarberWorkingHours, UpdateBarberWorkingHours } from "../database/types/barber-working-hours-table";
import { BarberTable } from "../database/types/barbers-table";
import { BadRequestError, NotFoundError } from "../errors/app-error";

export class BarberWorkingHoursService {
    async index() {
        const workingHours = await knex<BarberWorkingHoursTable>("barbers_working_hours AS bwh")
            .select(
                "bwh.id",
                "bwh.barber_id",
                "b.name",
                "bwh.week_day",
                "bwh.start_time",
                "bwh.end_time",
            )
            .innerJoin("barbers AS b", "b.id", "bwh.barber_id")

        return workingHours
    }

    async indexByBarber(barber_id: BarberWorkingHoursTable["barber_id"]) {
        const workingHours = await knex<BarberWorkingHoursTable>("barbers_working_hours AS bwh")
            .select(
                "bwh.id",
                "bwh.barber_id",
                "b.name",
                "bwh.start_time",
                "bwh.end_time",
                "bwh.week_day",
            )
            .innerJoin("barbers AS b", "b.id", "bwh.barber_id")
            .where({ barber_id })
            .orderBy("bwh.week_day")

        return workingHours
    }

    async create(barber: CreateBarberWorkingHours) {
        const barberAlreadyExists = await knex<BarberTable>("barbers")
            .where({ id: barber.barber_id })
            .first()

        if (!barberAlreadyExists) {
            throw new NotFoundError("Nenhum barbeiro encontrado com esse id")
        }

        const weekDayHasBeenRegistered = await knex<BarberWorkingHoursTable>("barbers_working_hours")
            .where({ barber_id: barber.barber_id, week_day: barber.week_day })
            .first()

        if (weekDayHasBeenRegistered) {
            throw new BadRequestError("Esse dia da semana ja foi cadastrado")
        }



        await knex<BarberWorkingHoursTable>("barbers_working_hours")
            .insert(barber)

        return true
    }

    async update(working_hours: UpdateBarberWorkingHours) {
        const alreadyExists = await knex<BarberWorkingHoursTable>("barbers_working_hours")
            .where({ id: working_hours.id })
            .first()

        if (!alreadyExists) {
            throw new NotFoundError("Nenhum registro encontrado com esse id")
        }

        await knex<BarberWorkingHoursTable>("barbers_working_hours")
            .update({
                end_time: working_hours.end_time,
                start_time: working_hours.start_time,
                week_day: working_hours.week_day,
            })
            .where({ id: working_hours.id })

        return true
    }

    async delete(id: BarberWorkingHoursTable["id"]) {
        const alreadyExists = await knex<BarberWorkingHoursTable>("barbers_working_hours")
            .where({ id })

        if (!alreadyExists) {
            throw new NotFoundError("Nenhum registro encontrado com esse id")
        }

        await knex<BarberWorkingHoursTable>("barbers_working_hours")
            .delete()
            .where({ id })

        return true
    }

    async deleteAllByBarber(barber_id: BarberWorkingHoursTable["barber_id"]) {
        const alreadyExists = await knex<BarberWorkingHoursTable>("barbers_working_hours")
            .where({ barber_id })


        if (!alreadyExists) {
            throw new NotFoundError("Nenhum registro encontrado com o id desse barbeiro")
        }

        await knex<BarberWorkingHoursTable>("barbers_working_hours")
            .delete()
            .where({ barber_id })
    }
}