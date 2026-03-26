import { Router } from "express";
import { barberRoutes } from "./barbers";
import { barberWorkingHoursRoutes } from "./barber-working-hours";
import { openingHoursRoutes } from "./opening-hours";
import { catalogRoutes } from "./catalog";
import { appointmentsRoutes } from "./appointments";

export const routes = Router()

routes.use("/barbers", barberRoutes)
routes.use("/barbers-working-hours", barberWorkingHoursRoutes)
routes.use("/opening-hours", openingHoursRoutes)
routes.use("/catalog", catalogRoutes)
routes.use("/appointments", appointmentsRoutes)