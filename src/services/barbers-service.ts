import { knex } from "../database/connection";

export class BarbersService {
    async index() {
        const barbers = await knex("barbers")   
            .select()

        return barbers
    }
}