import { Specification } from "../../model/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";

class SpecificationsRepository implements ISpecificationRepository {
  private specification: Specification[];

  constructor() {
    this.specification = [];
  }

  findByName(name: string): Specification {
    const category = this.specification.find(
      (specification) => specification.name === name
    );
    return category;
  }

  create({ description, name }: ICreateSpecificationDTO): void {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });
    this.specification.push(specification);
  }
}

export { SpecificationsRepository };
