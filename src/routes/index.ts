import { Router } from "express";
import { barberRoutes } from "./barbers-routes";

export const routes = Router()

routes.use("/barbers", barberRoutes)