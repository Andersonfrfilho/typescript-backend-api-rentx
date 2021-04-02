import { CategoriesRepository } from "../../repositories/Implementations/CategoriesRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryUseCase = new CreateSpecificationUseCase(
  categoriesRepository
);
const createCategoryController = new CreateSpecificationController(
  createCategoryUseCase
);

export { createCategoryController };
