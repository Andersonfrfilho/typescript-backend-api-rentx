import { Response, Request } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUSeCase } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalUseCase";

class DevolutionRentalController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUSeCase);

    const rental = await devolutionRentalUseCase.execute({
      id,
      user_id,
    });

    return response.send(201).json(rental);
  }
}
export { DevolutionRentalController };
