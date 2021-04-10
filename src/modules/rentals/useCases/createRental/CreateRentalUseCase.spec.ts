import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUSeCase } from "@modules/rentals/useCases/createRental/CreateRentalUseCase";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

let createRentalUseCase: CreateRentalUSeCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayJsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUSeCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });
  // it("should be able to create a new rental", async () => {
  //   const rental = await createRentalUseCase.execute({
  //     user_id: "1234",
  //     car_id: "12345",
  //     expected_return_date: dayAdd24Hours,
  //   });

  // expect(rental).toHaveProperty("id");
  // expect(rental).toHaveProperty("start_date");
  // });

  it("should not be able to create a new rental if there is another open to them same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "12345",
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123456",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "12345",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
