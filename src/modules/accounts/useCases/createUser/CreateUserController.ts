import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateUserUserCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, driver_license } = request.body;
    const createUserUseCase = container.resolve(CreateUserUserCase);

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
