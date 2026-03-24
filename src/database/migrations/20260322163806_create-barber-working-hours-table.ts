import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("barber_working_hours", (table) => {
        table.increments("id").primary(),
        table.integer("barber_id").unsigned().references("id").inTable("barbers").notNullable(),
        table.integer("week_day").notNullable(),
        table.time("start_time").notNullable(),
        table.time("end_time").notNullable(),
        table.timestamp("created_at").defaultTo(knex.fn.now()),
        table.specificType('updated_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    })
}


export async function down(knex: Knex): Promise<void> {
}

