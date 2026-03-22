export interface BarberWorkingHoursTable {
    id: number
    barber_id: number
    week_day: string
    start_time: string
    end_time: string
    created_at: string
    updated_at: string
}

export type CreateBarberWorkingHours = Omit<BarberWorkingHoursTable, "id" | "created_at" | "updated_at">

export type UpdateBarberWorkingHours = Omit<BarberWorkingHoursTable, "created_at" | "updated_at">