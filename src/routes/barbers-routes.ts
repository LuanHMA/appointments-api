import { Router } from "express";
import { BarbersController } from "../controllers/barbers-controller";

export const barberRoutes = Router()

const barbersController = new BarbersController()

barberRoutes.get("/", barbersController.index.bind(barbersController))
barberRoutes.post("/", barbersController.create.bind(barbersController))
barberRoutes.delete("/:id", barbersController.delete.bind(barbersController))
barberRoutes.put("/:id", barbersController.update.bind(barbersController))