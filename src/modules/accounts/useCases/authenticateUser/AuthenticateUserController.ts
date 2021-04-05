import { Response, Request } from "express";
import { container } from "tsyringe";

import { AuthenticateUserCase } from "./AuthenticateUserUseCase";

class AuthenticatedUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUserCase = container.resolve(AuthenticateUserCase);

    const authenticateInfo = await authenticateUserCase.execute({
      email,
      password,
    });

    return response.json(authenticateInfo);
  }
}
export { AuthenticatedUserController };
