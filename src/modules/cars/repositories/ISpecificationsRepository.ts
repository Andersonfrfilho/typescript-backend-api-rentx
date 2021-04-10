import { ICreateSpecificationsDTO } from "@modules/cars/dtos/ICreateSpecificationsDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ISpecificationsRepository {
  create({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
export { ISpecificationsRepository };
