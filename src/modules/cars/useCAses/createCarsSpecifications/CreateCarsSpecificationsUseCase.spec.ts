import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory copy";
import { CreateCarsSpecificationsUseCase } from "@modules/cars/useCases/createCarsSpecifications/CreateCarsSpecificationsUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarsSpecificationsUseCase: CreateCarsSpecificationsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
describe("Create CarsSpecification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarsSpecificationsUseCase = new CreateCarsSpecificationsUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able to add a new specification to a none exist the car", async () => {
    const car_id = "12345";
    const specifications_id = ["12345"];
    await expect(
      createCarsSpecificationsUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists!"));
  });

  it("should be able to add a new specification to a none exist the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-1234",
      category_id: "category",
      brand: "Brand",
    });
    const specification = await specificationsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
    });

    const specificationsCars = await createCarsSpecificationsUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
