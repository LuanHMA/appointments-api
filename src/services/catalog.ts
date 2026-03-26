import { knex } from "../database/connection";
import { CatalogTable, CreateCatalogDTO, UpdateCatalogDTO } from "../database/types/services-table";
import { BadRequestError, NotFoundError } from "../errors/app-error";

export class CatalogService {
    async index() {
        const catalog = await knex<CatalogTable>("catalog")
            .select()

        return catalog
    }


    async create(data: CreateCatalogDTO) {
        const catalogAlreadyExists = await knex<CatalogTable>("catalog")
            .where({ name: data.name })
            .first()

        if (catalogAlreadyExists) {
            throw new BadRequestError("Esse produto ja foi cadastrado")
        }

        await knex<CatalogTable>("catalog")
            .insert(data)
    }

    async update(data: UpdateCatalogDTO) {
        if (!data.average_duration && !data.description && !data.price && !data.name) {
            throw new BadRequestError("Nenhuma informação foi alterada")
        }

        const catalogAlreadyExists = await knex<CatalogTable>("catalog")
            .where({ id: data.id })
            .first()

        if (!catalogAlreadyExists) {
            throw new NotFoundError("Nenhum produto com esse ID encontrado!")
        }

        await knex<CatalogTable>("catalog")
            .update(data)
            .where({ id: data.id })
    }

    async delete(id: CatalogTable["id"]) {
        const catalogAlreadyExists = await knex<CatalogTable>("catalog")
            .where({ id })
            .first()

        if (!catalogAlreadyExists) {
            throw new NotFoundError("Nenhum produto com esse ID encontrado!")
        }

        await knex<CatalogTable>("catalog")
            .delete()
            .where({ id })
    }

}