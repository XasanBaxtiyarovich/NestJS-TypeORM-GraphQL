import { Repository } from 'typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private readonly productRepo: Repository<Product>) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepo.findOne(
      {
        where: {name: createProductDto.name}
      }
    );
    if (product) throw new ConflictException('Product Already Exists');

    return this.productRepo.save(createProductDto);
  }

  async findAll() {
    const products = await this.productRepo.find();
    
    if(products.length === 0) throw new NotFoundException("Products Not Found");

    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(
      {
        where: { id }
      }
    );
    if(!product) throw new NotFoundException('Product Not Found');

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOne(
      {
        where: { id }
      }
    );
    if(!product) throw new NotFoundException('Product Not Found');

    await this.productRepo.update({id}, {...updateProductDto})
    return this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.productRepo.findOne(
      {
        where: { id }
      }
    );
    if(!product) throw new NotFoundException('Product Not Found');
    
    await this.productRepo.delete(id);
    return id;
  }
}
