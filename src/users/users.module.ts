import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ User ])],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
