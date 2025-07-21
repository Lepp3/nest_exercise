import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { Company } from './entities/company/company.entity';
import { User } from './entities/user/user.entity';
import { Warehouse } from './entities/warehouse/warehouse.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const db = config.get<{
          host: string;
          port: number;
          username: string;
          password: string;
          name: string;
        }>('database');

        return {
          type: 'postgres',
          host: db?.host,
          port: db?.port,
          username: db?.username,
          password: db?.password,
          database: db?.name,
          autoLoadEntities: true,
          synchronize: false,
          retryAttempts: 4,
          logging: true,
          namingStrategy: new SnakeNamingStrategy(),
          entities: [Company, User, Warehouse],
        };
      },
    }),
    TypeOrmModule.forFeature([Company, User, Warehouse]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
