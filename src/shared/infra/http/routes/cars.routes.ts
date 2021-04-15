import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarsSpecifications/CreateCarsSpecificationsController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ListCategoriesController } from "@modules/cars/useCases/uploadCarImages/upoloadCarImagesController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const carsRoutes = Router();
const upload = multer(uploadConfig);
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listCategoriesController = new ListCategoriesController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);
carsRoutes.get(
  "/available",
  ensureAuthenticated,
  ensureAdmin,
  listAvailableCarsController.handle
);
carsRoutes.post("/specifications/:id", createCarSpecificationController.handle);
carsRoutes.post(
  "/images",
  upload.array("images"),
  listCategoriesController.handle
);
export { carsRoutes };
