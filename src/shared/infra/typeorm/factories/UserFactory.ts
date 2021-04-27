import faker from 'faker';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

interface IUserInterfaceFactory {
  quantity: number;
}

class UserFactory {
  public generate({ quantity = 1 }: IUserInterfaceFactory): Omit<User, 'id'>[] {
    const arrayUsers = Array.from(
      { length: quantity },
      (): Omit<User, 'id'> => ({
        name: faker.name.findName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        driver_license: faker.name.jobType(),
        isAdmin: faker.datatype.boolean(),
      }),
    );
    return arrayUsers;
  }
}
export {UserFactory};
