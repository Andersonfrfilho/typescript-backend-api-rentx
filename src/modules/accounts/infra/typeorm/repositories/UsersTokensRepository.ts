import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await this.repository.findOne({ refresh_token });
    return userToken;
  }
  async deleteById(user_token_id: string): Promise<void> {
    await this.repository.delete(user_token_id);
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const users_tokens = await this.repository.findOne({
      where: { user_id, refresh_token },
    });
    return users_tokens;
  }
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const user_token = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });
    await this.repository.save(user_token);
    return user_token;
  }
}
export { UsersTokensRepository };
