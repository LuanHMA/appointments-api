import { Router } from "express";
import { CatalogController } from "../controllers/catalog";

export const catalogRoutes = Router()

const catalogController = new CatalogController()

catalogRoutes.get("/", catalogController.index.bind(catalogController))
catalogRoutes.post("/", catalogController.create.bind(catalogController))
catalogRoutes.put("/:id", catalogController.update.bind(catalogController))
catalogRoutes.delete("/:id", catalogController.delete.bind(catalogController))
