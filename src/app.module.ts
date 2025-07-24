import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { CompanyModule } from './entities/company/company.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './entities/user/user.module';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/authGuard';

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
          // autoLoadEntities: true,
          entities: [__dirname + '/**/*.entity.{ts,js}'],
          synchronize: false,
          retryAttempts: 4,
          logging: true,
        };
      },
    }),
    CompanyModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard, JwtAuthGuard],
})
export class AppModule {}
