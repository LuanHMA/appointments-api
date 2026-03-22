export interface ServicesTable {
    id: number
    name: string
    price: number
    average_duration: string
    description: string
    created_at: string
    updated_at: string
}

export type CreateServicesDTO = Omit<ServicesTable, 'id' | 'created_at' | 'updated_at'>

export type UpdateServicesDTO = Omit<ServicesTable, 'created_at' | 'updated_at'>