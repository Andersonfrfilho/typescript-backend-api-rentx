import { Response, Request } from "express";
import { container } from "tsyringe";

import { SendForgotPasswordMailUseCase } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendoForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase
    );
    await sendoForgotPasswordMailUseCase.execute(email);

    return response.send();
  }
}
export { SendForgotPasswordMailController };
