import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, driver_license } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      password,
      email,
      driver_license,
    });
    return response.status(201).send();
  }
}
export { CreateUserController };
