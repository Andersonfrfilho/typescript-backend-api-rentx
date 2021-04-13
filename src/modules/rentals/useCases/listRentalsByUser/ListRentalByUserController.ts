import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserUseCase } from "@modules/rentals/useCases/listRentalsByUser/ListRentalByUserUseCase";

class ListRentalController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase
    );

    const rentals = await listRentalsByUserUseCase.execute(id);

    return response.json(rentals);
  }
}
export { ListRentalController };
