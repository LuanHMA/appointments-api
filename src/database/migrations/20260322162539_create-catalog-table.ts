import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("catalog", (table) => {
        table.increments("id").primary(),
        table.string("name", 50).notNullable(),
        table.decimal("price", 10, 2).notNullable(),
        table.time("average_duration"),
        table.text("description"),
        table.timestamp("created_at").defaultTo(knex.fn.now()),
        table.specificType('updated_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("catalog")
}
