import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Resolver('users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser (@Args('createUser') createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Query(() => [User]) 
  async findAllUsers (): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async findOneUser (@Args('id', { type: () => ID }) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser (
    @Args('id', { type: () => ID }) id: number,
    @Args('updateUser') updateUserDto: UpdateUserDto
  ): Promise <User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Mutation(() => Number)
  async removeUser (
    @Args('id', { type: () => ID }) id: number 
  ): Promise<number> {
    return this.usersService.remove(id)
  }
}
