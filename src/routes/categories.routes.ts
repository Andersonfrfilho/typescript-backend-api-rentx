import resolver, { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCAses/createCategory";
import { importCategoryController } from "../modules/cars/useCAses/importCategory";
import { listCategoryController } from "../modules/cars/useCAses/listCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoryController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
