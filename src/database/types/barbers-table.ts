export interface BarberTable {
    id: number
    name: string
    email: string
    phone: string
    created_at: string
    updated_at: string
}

export type CreateBarberDTO = Omit<BarberTable, "id" | "created_at" | "updated_at">

export type UpdateBarberDTO = Omit<BarberTable, "created_at" | "updated_at" | "email">