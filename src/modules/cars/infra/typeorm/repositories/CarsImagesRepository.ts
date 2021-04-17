import { getRepository, Repository } from "typeorm";

import { ICreateCarImageDTO } from "@modules/cars/dtos/ICreateCarImageDTO";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

class CarImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }
  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const cars_image = this.repository.create({ car_id, image_name });

    await this.repository.save(cars_image);

    return cars_image;
  }
}

export { CarImagesRepository };
