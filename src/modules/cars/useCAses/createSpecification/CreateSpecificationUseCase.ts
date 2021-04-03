import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  // private categoriesRepository: CategoriesRepository;
  constructor(private categoriesRepository: ISpecificationRepository) {
    // this.categoriesRepository = categoriesRepository;
  }

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
