import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.findOne(
      { 
        where: { email: createUserDto.email }
      }
    );

    if (user) throw new BadRequestException('Email aleardy exists');

    return this.userRepo.save(createUserDto);
  }

  async findAll() {
    const users = await this.userRepo.find()

    if (users.length === 0) throw new NotFoundException('Users not found');

    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne(
      {
        where: {id}
      }
    );
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({where: {id}});
    if (!user) throw new NotFoundException('User not found');

    await this.userRepo.update({ id }, {...updateUserDto});
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({where: {id}});
    if (!user) throw new NotFoundException('User not found');

    await this.userRepo.delete(id);
    return id;
  }
}