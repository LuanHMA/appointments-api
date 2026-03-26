export interface AppointmentsTable {
    id: number,
    barber_id: number,
    catalog_id: number,
    customer_name: string,
    customer_phone: string,
    started_at: string,
    finished_at: string,
    status: "scheduled" | "cancelled" | "completed",
    created_at: string,
    updated_at: string
}

export type CreateAppointmentsDTO = {
    barber_id: number,
    catalog_id: number,
    customer_name: string,
    customer_phone: string,
    started_at: string,
    finished_at: string,
    week_day: number
}

export type UpdateAppointmentsDTO = Omit<AppointmentsTable, "created_at" | "updated_at">