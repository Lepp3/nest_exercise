import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Company } from '../company/company.entity';
import { User } from '../user/user.entity';
import { Warehouse } from '../warehouse/warehouse.entity';
import { Partner } from '../partner/partner.entity';
import { OrderItems } from '../orderItems/orderItems.entity';
import { Invoice } from '../invoice/invoice.entity';

export enum OrderType {
  SHIPMENT = 'shipment',
  DELIVERY = 'delivery',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'enum', enum: OrderType })
  type: OrderType;
  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  date: Date;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
  @Column({ nullable: true })
  modifiedBy: string;
  @ManyToOne(() => Company, (company) => company.orders)
  @JoinColumn({ name: 'company_id' })
  company: Company;
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.orders)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;
  @ManyToOne(() => Partner, (partner) => partner.orders)
  @JoinColumn({ name: 'partner_id' })
  partner: Partner;
  @OneToMany(() => OrderItems, (orderItem) => orderItem.order)
  orderItems: OrderItems[];
  @OneToMany(() => Invoice, (invoice) => invoice.order)
  invoices: Invoice[];
}
