import { BarberWorkingHoursTable } from "../database/types/barber-working-hours-table"
import { OpeningHoursTable } from "../database/types/opening-hours-table"

type BussinesHours = {
    opening_hour: OpeningHoursTable["opening_hour"],
    closing_hour: OpeningHoursTable["closing_hour"]
}

type BarberHours = {
    start_time: BarberWorkingHoursTable["start_time"],
    end_time: BarberWorkingHoursTable["end_time"]
}

export const isShiftWithinOperatingHours = (bussinesHours: BussinesHours, barberHours: BarberHours) => {
    const bussinesStartHour = Number(bussinesHours.opening_hour.split(":")[0])
    const bussinesEndHour = Number(bussinesHours.closing_hour.split(":")[0])

    const barberStartHour = Number(barberHours.start_time.split(":")[0])
    const barberEndHour = Number(barberHours.end_time.split(":")[0])

    return barberStartHour >= bussinesStartHour && barberEndHour <= bussinesEndHour
}