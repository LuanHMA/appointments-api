export interface AppointmentsTable {
    id: number,
    date: string,
    barber_id: number,
    service_id: number,
    customer_name: string,
    customer_phone: string,
    started_at: string,
    finished_at: string,
    status: "scheduled" | "cancelled" | "completed",
    created_at: string,
    updated_at: string
}

export type CreateAppointmentsDTO = Omit<AppointmentsTable, "id" | "created_at" | "updated_at">

export type UpdateAppointmentsDTO = Omit<AppointmentsTable, "created_at" | "updated_at">