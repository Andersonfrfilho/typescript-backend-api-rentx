import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IFindAllAvailableCarsDTO } from "@modules/cars/dtos/IFindAllAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable({
    brand,
    category_id,
    name,
  }: IFindAllAvailableCarsDTO): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;
}

export { ICarsRepository };
