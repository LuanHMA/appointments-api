export interface CatalogTable {
    id: number
    name: string
    price: number
    average_duration: string
    description?: string
    created_at: string
    updated_at: string
}

export type CreateCatalogDTO = Omit<CatalogTable, 'id' | 'created_at' | 'updated_at'>

export type UpdateCatalogDTO = {
    id: number
    name?: string
    price?: number
    average_duration?: string
    description?: string
}