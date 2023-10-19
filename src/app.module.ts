import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env', 
        isGlobal: true 
      }
    ),

    GraphQLModule.forRoot<ApolloDriverConfig>(
      {
        driver: ApolloDriver,
        autoSchemaFile: 'schema.gql',
        sortSchema: true,
        playground: true
      }
    ),

    TypeOrmModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => (
          {
            type: config.get<'postgres'>('TYPEORM_CONNECTION'),
            host: config.get<string>('TYPEORM_HOST'),
            username: config.get<string>('TYPEORM_USERNAME'),
            password: config.get<string>("TYPEORM_PASSWORD"),
            database: config.get<string>('TYPEORM_DATABASE'),
            port: config.get<number>('TYPEORM_PORT'),
            entities: [ __dirname + 'dist/**/*.entity{ .ts, .js }'],
            synchronize: true,
            autoLoadEntities: true,
            logging: true
          }
        )
      }
    ),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
