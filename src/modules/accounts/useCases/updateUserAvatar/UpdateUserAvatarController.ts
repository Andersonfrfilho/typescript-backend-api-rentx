import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatar_file = request.file.filename;
    const updateUserUseCase = container.resolve(UpdateUserAvatarUseCase);
    await updateUserUseCase.execute({
      user_id: id,
      avatar_file,
    });

    return response.status(204).send();
  }
}
export { UpdateUserAvatarController };
