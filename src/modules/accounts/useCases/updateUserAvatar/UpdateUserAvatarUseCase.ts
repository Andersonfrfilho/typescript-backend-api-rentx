import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}
@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ user_id, avatar_file }: IRequest) {
    const user = await this.usersRepository.findById(user_id);
    await deleteFile(`./tmp/avatar/${user.avatar}`);
    if (!user) {
      throw new AppError("User not exist");
    }

    user.avatar = avatar_file;

    this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
