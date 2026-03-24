import { Router } from "express";
import { BarberWorkingHoursController } from "../controllers/barber-working-hours";

export const barberWorkingHoursRoutes = Router()

const barberWorkingHoursController = new BarberWorkingHoursController()

barberWorkingHoursRoutes.get("/", barberWorkingHoursController.index.bind(barberWorkingHoursController))
barberWorkingHoursRoutes.post("/", barberWorkingHoursController.create.bind(barberWorkingHoursController))
barberWorkingHoursRoutes.put("/", barberWorkingHoursController.update.bind(barberWorkingHoursController))
barberWorkingHoursRoutes.delete("/:id", barberWorkingHoursController.delete.bind(barberWorkingHoursController))
barberWorkingHoursRoutes.delete("/:barber_id/all", barberWorkingHoursController.deleteAllByBarber.bind(barberWorkingHoursController))
barberWorkingHoursRoutes.get("/:barber_id/all", barberWorkingHoursController.indexByBarber.bind(barberWorkingHoursController))
