import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Warehouse } from '../warehouse/warehouse.entity';
import { Partner } from '../partner/partner.entity';
import { Product } from '../product/product.entity';
import { Order } from '../order/order.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  location: string;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
  @Column({ nullable: true })
  modifiedBy: string;
  @OneToMany(() => User, (user) => user.company)
  users: User[];
  @OneToMany(() => Warehouse, (warehouse) => warehouse.company)
  warehouses: Warehouse[];
  @OneToMany(() => Partner, (partner) => partner.company)
  partners: Partner[];
  @OneToMany(() => Product, (product) => product.company)
  products: Partner[];
  @OneToMany(() => Order, (order) => order.company)
  orders: Order[];
}
