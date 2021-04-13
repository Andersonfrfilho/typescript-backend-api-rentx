import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
}
export { IRentalsRepository };
