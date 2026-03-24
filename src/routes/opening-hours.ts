import { Router } from "express";
import { OpeningHoursController } from "../controllers/opening-hours";

export const openingHoursRoutes = Router()

const openingHoursController = new OpeningHoursController()

openingHoursRoutes.get("/", openingHoursController.index.bind(openingHoursController))
openingHoursRoutes.post("/", openingHoursController.create.bind(openingHoursController))
openingHoursRoutes.put("/:id", openingHoursController.update.bind(openingHoursController))
openingHoursRoutes.delete("/:id", openingHoursController.delete.bind(openingHoursController))