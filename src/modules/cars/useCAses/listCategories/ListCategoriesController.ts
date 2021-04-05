import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    const all = await listCategoriesUseCase.execute();
    return response.json(all);
  }
}
export { ListCategoriesController };
