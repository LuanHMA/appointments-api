import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.renameTable("barber_working_hours", "barbers_working_hours")
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.renameTable("barbers_working_hours", "barber_working_hours")
}

