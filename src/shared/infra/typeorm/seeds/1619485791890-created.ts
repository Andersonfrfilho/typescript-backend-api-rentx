import {getConnection, MigrationInterface, QueryRunner} from "typeorm";
import {UserFactory} from '@shared/infra/typeorm/factories';

export class created1619485791890 implements MigrationInterface {

  public async up(): Promise<void> {
    const userFactory = new UserFactory();
    const users = userFactory.generate({ quantity: 5 });
    await getConnection('seed').getRepository('users').save(users);
  }

  public async down(): Promise<void> {
    await getConnection('seed').getRepository('users').delete({});
  }

}
