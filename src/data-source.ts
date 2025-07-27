import { DataSource } from 'typeorm';
import { Company } from './entities/company/company.entity';
import { User } from './entities/user/user.entity';
import { Warehouse } from './entities/warehouse/warehouse.entity';
import { Partner } from './entities/partner/partner.entity';
import { Product } from './entities/product/product.entity';
import { Order } from './entities/order/order.entity';
import { OrderItems } from './entities/orderItems/orderItems.entity';
import { Invoice } from './entities/invoice/invoice.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, Warehouse, Partner, Product, Order, OrderItems, Invoice],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
});
