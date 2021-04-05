import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";

class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification> {
    const category = await this.repository.findOne({ name });
    return category;
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ description, name });

    await this.repository.save(specification);
  }
}

export { SpecificationsRepository };
