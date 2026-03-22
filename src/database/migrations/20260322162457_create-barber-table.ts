import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("barbers", (table) => {
        table.increments("id").primary(),
        table.string("name", 100).notNullable(),
        table.string("phone", 11).notNullable(),
        table.string("email", 100).notNullable().unique(),
        table.timestamp("created_at").defaultTo(knex.fn.now()),
        table.specificType('updated_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("barbers")
}
