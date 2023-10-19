import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Category } from './entities/category.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Resolver('categories')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  async createCategory (@Args('createCategory') createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Query(() => [Category]) 
  async findAllCategory(): Promise<Category[]>  {
    return this.categoriesService.findAll();
  }

  @Query(() => Category)
  async findOneCategory (@Args('id', { type: () => ID }) id: number): Promise<Category> {
    return this.categoriesService.findOne(+id);
  }

  @Mutation(() => Category)
  async updateCategory (
    @Args('id', { type: () => ID }) id: number,
    @Args('updateCategory') updateCategoryDto: UpdateCategoryDto
  ): Promise <Category> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Mutation(() => Number)
  async removeCategory (
    @Args('id', { type: () => ID }) id: number 
  ): Promise<number> {
    return this.categoriesService.remove(+id);
  }
}
