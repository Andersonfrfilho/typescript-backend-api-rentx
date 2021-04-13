import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IUpdateAvailableDTO } from "@modules/cars/dtos/IUpdateAvailableDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    license_plate,
    fine_amount,
    daily_rate,
    category_id,
    brand,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      license_plate,
      fine_amount,
      daily_rate,
      category_id,
      brand,
      id,
    });

    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable({ brand, category_id, name }): Promise<Car[]> {
    const cars = this.cars.filter(
      (car) =>
        car.available ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
    );

    return cars;
  }

  async findById(car_id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === car_id);

    return car;
  }
  async updateAvailable({ id, available }: IUpdateAvailableDTO): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}
export { CarsRepositoryInMemory };
