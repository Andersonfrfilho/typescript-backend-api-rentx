import { getMongoRepository, MongoRepository } from "typeorm";

import { ICreateNotificationDTO } from "@modules/notifications/dtos/ICreateNotificationDTO";
import { Notification } from "@modules/notifications/infra/typeorm/schemas/Notification";
import { INotificationsRepository } from "@modules/notifications/repositories/INotificationsRepository";

class NotificationsRepository implements INotificationsRepository {
  private repository: MongoRepository<Notification>;

  constructor() {
    this.repository = getMongoRepository(Notification, "mongo");
  }
  async create({ content,receipt_id }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.repository.create({ content,receipt_id });

    await this.repository.save(notification);

    return notification;
  }
}

export { NotificationsRepository };
