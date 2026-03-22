import { Router } from "express";
import { BarbersController } from "../controllers/barbers-controller";

export const barberRoutes = Router()

const barbersController = new BarbersController()

barberRoutes.get("/", barbersController.index.bind(barbersController))