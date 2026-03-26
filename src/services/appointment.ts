import { knex } from "../database/connection";
import { AppointmentsTable, CreateAppointmentsDTO } from "../database/types/appointments-table";
import { BarberWorkingHoursTable } from "../database/types/barber-working-hours-table";
import { BarberTable } from "../database/types/barbers-table";
import { OpeningHoursTable } from "../database/types/opening-hours-table";
import { CatalogTable } from "../database/types/services-table";
import { NotFoundError } from "../errors/app-error";

export class AppointmentService {
    async index() {
        const appointments = await knex<AppointmentsTable>("appointments")
            .select()

        return appointments
    }

    async create(appointment: CreateAppointmentsDTO) {
        // Verifica se é um serviço que existe no catalogo.
        const service = await knex<CatalogTable>("catalog")
            .where({ id: appointment.catalog_id })
            .first()

        if (!service) {
            throw new NotFoundError("Servico inexistente")
        }

        // Verifica se a barbearia está aberta nesse dia
        const barbershopIsOpen = await knex<OpeningHoursTable>("opening_hours")
            .where({ week_day: appointment.week_day, is_open: true })
            .first()

        if (!barbershopIsOpen) {
            throw new NotFoundError("Barbearia fechada nesse dia")
        }

        // Verifica se o barbeiro trabalha nesse dia    
        const barberWorkingHour = await knex<BarberWorkingHoursTable>("barbers_working_hours")
            .where({
                barber_id: appointment.barber_id,
                week_day: appointment.week_day,
            })
            .andWhere("start_time", "<=", appointment.started_at)
            .andWhere("end_time", ">=", appointment.finished_at)
            .first()

        if (!barberWorkingHour) {
            throw new NotFoundError("Esse barbeiro não está trabalhando no horário desse agendamento")
        }

        // Verificar se esse horário ja foi agendado
        const appointmentExists = await knex<AppointmentsTable>("appointments")
            .where("barber_id", appointment.barber_id)
            .andWhere("status", "scheduled")
            .andWhere("started_at", "<", appointment.finished_at)
            .andWhere("finished_at", ">", appointment.started_at)
            .first()

        if (appointmentExists) {
            throw new NotFoundError("Esse horário ja foi agendado")
        }

        await knex<AppointmentsTable>("appointments")
            .insert({
                barber_id: appointment.barber_id,
                catalog_id: appointment.catalog_id,
                customer_name: appointment.customer_name,
                customer_phone: appointment.customer_phone,
                started_at: appointment.started_at,
                finished_at: appointment.finished_at,
                status: "scheduled",
            })
    }
}