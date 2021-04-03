import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const categoriesRepository = null;
const createCategoryUseCase = new CreateSpecificationUseCase(
  categoriesRepository
);
const createCategoryController = new CreateSpecificationController(
  createCategoryUseCase
);

export { createCategoryController };
