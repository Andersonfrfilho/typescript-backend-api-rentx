import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCAses/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

// specificationsRoutes.get("/", (request, response) => {
//   const all = specificationsRepository.list();
//   return response.status(201).send(all);
// });

export { specificationsRoutes };
