import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}
@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret.refresh) as IPayload;

    const user_id = sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret.refresh, {
      subject: sub,
      expiresIn: auth.expires_in.refresh,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_in.refresh_days
    );

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, auth.secret.token, {
      subject: user_id,
      expiresIn: auth.expires_in.token,
    });

    return {
      refresh_token,
      token,
    };
  }
}

export { RefreshTokenUseCase };
