import { classToClass } from 'class-transformer';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';

class UserMap {
  static toDTO({ email, name, id, avatar, driver_license, avatar_url, password }: User): IUserResponseDTO {
    const user = classToClass({
      email, name, id, avatar, driver_license, password, avatar_url
    });
    return user
  }
}

export { UserMap };