export interface OpeningHoursTable {
    id: number
    week_day: number
    opening_hour: string
    closing_hour: string
    is_open: boolean
    created_at: string
    updated_at: string
}

export type CreateOpeningHours = Omit<OpeningHoursTable, "id" | "created_at" | "updated_at" | "is_open">

export type UpdateOpeningHours = Omit<OpeningHoursTable, "created_at" | "updated_at">