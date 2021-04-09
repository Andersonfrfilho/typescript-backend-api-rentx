import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "@modules/cars/useCases/createCar/CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-1234",
      category_id: "category",
      brand: "Brand",
    });
  });

  it("should not be able to create a car whit exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car",
        description: "Description Car",
        daily_rate: 100,
        fine_amount: 60,
        license_plate: "ABC-1234",
        category_id: "category",
        brand: "Brand",
      });
      await createCarUseCase.execute({
        name: "Name Car",
        description: "Description Car",
        daily_rate: 100,
        fine_amount: 60,
        license_plate: "ABC-1234",
        category_id: "category",
        brand: "Brand",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-1234",
      category_id: "category",
      brand: "Brand",
    });
    expect(car.available).toBe(true);
  });
});
