import { Router } from "express";
import { barberRoutes } from "./barbers";
import { barberWorkingHoursRoutes } from "./barber-working-hours";

export const routes = Router()

routes.use("/barbers", barberRoutes)
routes.use("/barbers-working-hours", barberWorkingHoursRoutes)