import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CompanyModule } from './entities/company/company.module';

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
        };
      },
    }),
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
