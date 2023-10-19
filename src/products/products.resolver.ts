import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Resolver('products')
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  async createProduct (@Args('createProduct') createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Query(() => [Product]) 
  async findAllProducts (): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  async findOneProduct (@Args('id', { type: () => ID }) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  async updateProduct (
    @Args('id', { type: () => ID }) id: number,
    @Args('updateProduct') updateProductDto: UpdateProductDto
  ): Promise <Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Mutation(() => Number)
  async removeProduct (
    @Args('id', { type: () => ID }) id: number 
  ): Promise<number> {
    return this.productsService.remove(id);
  }
}
