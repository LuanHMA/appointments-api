import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("opening_hours", (table) => {
        table.increments("id").primary(),
        table.integer("week_day").notNullable(),
        table.time("opening_hour").notNullable(),
        table.time("closing_hour").notNullable(),
        table.boolean("is_open").defaultTo(false)
        table.timestamp("created_at").defaultTo(knex.fn.now()),
        table.specificType('updated_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("opening_hours")
}
