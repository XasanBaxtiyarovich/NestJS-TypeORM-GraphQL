import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { Category } from './entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepo.findOne(
      {
        where: { name: createCategoryDto.name }
      }
    );
    if (category) throw new ConflictException('Category Already Exists')

    return this.categoryRepo.save(createCategoryDto);
  }

  async findAll() {
    const categories = await this.categoryRepo.find();

    if (categories.length === 0) throw new NotFoundException('Categories Not Found');

    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne(
      {
        where: { id }
      }
    );
    if (!category) throw new NotFoundException('Category Not Found');

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne(
      {
        where: { id }
      }
    );
    if (!category) throw new NotFoundException('Category Not Found');

    await this.categoryRepo.update({ id }, { ...updateCategoryDto });

    return this.findOne(id);
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOne(
      {
        where: { id }
      }
    );
    if (!category) throw new NotFoundException('Category Not Found');

    await this.categoryRepo.delete(id);
    return id;
  }
}
