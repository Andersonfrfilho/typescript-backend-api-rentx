import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "A3",
      description: "Carro bonito",
      daily_rate: 140.0,
      license_plate: "DEF-1212",
      brand: "Audi",
      fine_amount: 100,
      category_id: "7316dc9e-2395-4cb2-b1d0-62a0004beb63",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "A3",
      description: "Carro bonito",
      daily_rate: 140.0,
      license_plate: "DEF-1212",
      brand: "Car_brand",
      fine_amount: 100,
      category_id: "7316dc9e-2395-4cb2-b1d0-62a0004beb63",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "A3",
      description: "Carro bonito",
      daily_rate: 140.0,
      license_plate: "DEF-1212",
      brand: "Car_brand",
      fine_amount: 100,
      category_id: "7316dc9e-2395-4cb2-b1d0-62a0004beb63",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "A3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "A3",
      description: "Carro bonito",
      daily_rate: 140.0,
      license_plate: "DEF-1212",
      brand: "Car_brand",
      fine_amount: 100,
      category_id: "7316dc9e-2395-4cb2-b1d0-62a0004beb63",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "7316dc9e-2395-4cb2-b1d0-62a0004beb63",
    });

    expect(cars).toEqual([car]);
  });
});
