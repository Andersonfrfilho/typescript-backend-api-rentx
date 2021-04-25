import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ICacheProvider } from "@shared/container/providers/CacheProvider/ICacheProvider";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}
  async execute(): Promise<Category[]> {
    let categories = await this.cacheProvider.recover<Category[]>('categories:list')
    if(!categories){
      categories = await this.categoriesRepository.list();

    }
    await this.cacheProvider.save("categories:list",JSON.stringify(categories))
    return categories;
  }
}
export { ListCategoriesUseCase };
