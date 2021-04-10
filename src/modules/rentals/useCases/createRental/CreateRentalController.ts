import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateRentalUSeCase } from "@modules/rentals/useCases/createRental/CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response) {
    const { car_id, expected_return_date } = request.body;
    const { id } = request.user;
    const createRentalUseCase = container.resolve(CreateRentalUSeCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      expected_return_date,
      user_id: id,
    });

    return response.send(201).json(rental);
  }
}
export { CreateRentalController };
