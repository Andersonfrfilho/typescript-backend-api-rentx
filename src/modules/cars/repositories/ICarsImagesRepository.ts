import { ICreateCarImageDTO } from "@modules/cars/dtos/ICreateCarImageDTO";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
  create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage>;
}

export { ICarsImagesRepository };
