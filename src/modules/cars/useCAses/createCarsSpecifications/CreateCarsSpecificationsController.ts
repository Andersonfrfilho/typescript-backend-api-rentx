import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateCarsSpecificationsUseCase } from "@modules/cars/useCases/createCarsSpecifications/CreateCarsSpecificationsUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;
    const createCarSpecificationUseCase = container.resolve(
      CreateCarsSpecificationsUseCase
    );

    const car = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return response.status(201).send(car);
  }
}
export { CreateCarSpecificationController };
