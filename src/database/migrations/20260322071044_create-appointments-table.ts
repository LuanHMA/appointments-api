import type { Knex } from "knex";



export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("appointments", (table) => {
        table.increments("id").primary(),
        table.integer("barber_id").references("id").inTable("barbers").notNullable(),
        table.integer("service_id").references("id").inTable('services').notNullable(),
        table.string("customer_name", 100).notNullable(),
        table.string("customer_phone", 11).notNullable(),
        table.timestamp("started_at").notNullable(),
        table.timestamp("finished_at").notNullable(),
        table.enum("status", ["scheduled", "cancelled", "completed"])
        table.timestamp("created_at").defaultTo(knex.fn.now()),
        table.specificType('updated_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("appointments")
}

