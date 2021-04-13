import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalByUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalController = new ListRentalController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalsRoutes.get("/user", ensureAuthenticated, listRentalController.handle);

export { rentalsRoutes };
