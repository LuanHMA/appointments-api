import { knex } from "../database/connection";
import { BarberTable, CreateBarberDTO, UpdateBarberDTO } from "../database/types/barbers-table";
import { AppError, BadRequestError } from "../errors/app-error";

export class BarbersService {
    async index() {
        const barbers = await knex<BarberTable>("barbers")
            .select()

        return barbers
    }

    async create(barber: CreateBarberDTO) {
        const barberAlreadyExists = await knex<BarberTable>("barbers")
            .where({ email: barber.email })
            .first()

        if (barberAlreadyExists) {
            throw new BadRequestError("Já existe um barbeiro cadastrado com esse e-mail")
        }

        await knex<BarberTable>("barbers")
            .insert(barber)
    }

    async update(barber: UpdateBarberDTO) {
        const barberAlreadyExists = await knex<BarberTable>("barbers")
            .where({ id: barber.id })
            .first()

        if (!barberAlreadyExists) {
            throw new BadRequestError("Barbeiro não encontrado")
        }

        await knex<BarberTable>("barbers")
            .update(barber)
            .where({ id: barber.id })
    }

    async delete(id: number) {
        const barberAlreadyExists = await knex<BarberTable>("barbers")
            .where({ id })
            .first()

        if (!barberAlreadyExists) {
            throw new BadRequestError("Barbeiro não encontrado")
        }

        await knex<BarberTable>("barbers")
            .delete()
            .where({ id })
    }
}
