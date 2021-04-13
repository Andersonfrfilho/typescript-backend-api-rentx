import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}
@injectable()
class CreateRentalUSeCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<Rental> {
    const MINIMUM_HOUR = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      expected_return_date,
      dateNow
    );

    if (compare < MINIMUM_HOUR) {
      throw new AppError("invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    await this.carsRepository.updateAvailable({ id: car_id, available: false });

    return rental;
  }
}
export { CreateRentalUSeCase };
