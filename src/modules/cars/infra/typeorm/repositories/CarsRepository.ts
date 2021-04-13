import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IFindAllAvailableCarsDTO } from "@modules/cars/dtos/IFindAllAvailableCarsDTO";
import { IUpdateAvailableDTO } from "@modules/cars/dtos/IUpdateAvailableDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    description,
    name,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      description,
      name,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } });
    return car;
  }

  async findAvailable({
    brand,
    category_id,
    name,
  }: IFindAllAvailableCarsDTO): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("foundCars")
      .where("available = :available", { available: true });
    if (brand) {
      carsQuery.andWhere("foundCars.brand = :brand", { brand: true });
    }
    if (name) {
      carsQuery.andWhere("foundCars.name = :name", { name });
    }
    if (category_id) {
      carsQuery.andWhere("foundCars.category_id = :category_id", {
        category_id,
      });
    }
    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);

    return car;
  }
  async updateAvailable({ available, id }: IUpdateAvailableDTO): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
