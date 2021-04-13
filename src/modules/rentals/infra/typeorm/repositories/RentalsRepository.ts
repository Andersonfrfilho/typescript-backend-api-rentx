import { Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

class RentalsRepository implements IRentalsRepository {
  async findByUser(id: string): Promise<Rental[]> {
    const rental = await this.repository.find({
      where: { id },
      relations: ["car"],
    });
    return rental;
  }
  private repository: Repository<Rental>;
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({ car_id, end_date: null });
    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      user_id,
      end_date: null,
    });
    return openByCar;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ id });
    return rental;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total,
    });
    await this.repository.save(rental);
    return rental;
  }
}

export { RentalsRepository };
