import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IResponse {
  user: {
    email: string;
    password: string;
  };
  token: string;
}
interface IRequest {
  email: string;
  password: string;
}
@injectable()
class AuthenticateUserCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not exist");
    }
    const passwordHash = await compare(password, user.password);
    if (!passwordHash) {
      throw new AppError("User not exist");
    }

    const token = sign({}, "89ba023086e37a345839e0c6a0d272eb", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user,
      token,
    };
  }
}
export { AuthenticateUserCase };
