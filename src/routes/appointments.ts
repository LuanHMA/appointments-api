import { Router } from "express";
import { AppointmentsController } from "../controllers/appointment";

export const appointmentsRoutes = Router()

const appointmentsController = new AppointmentsController()

appointmentsRoutes.get("/", appointmentsController.index.bind(appointmentsController))
appointmentsRoutes.post("/", appointmentsController.create.bind(appointmentsController))