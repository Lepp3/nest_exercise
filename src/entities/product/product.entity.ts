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
import { SupportType } from '../warehouse/warehouse.entity';
import { OrderItems } from '../orderItems/orderItems.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ type: 'enum', enum: SupportType })
  type: SupportType;
  @Column()
  code: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: string;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
  @Column({ nullable: true })
  modifiedBy: string;
  @ManyToOne(() => Company, (company) => company.products)
  @JoinColumn({ name: 'companyId' })
  company: Company;
  @OneToMany(() => OrderItems, (orderItem) => orderItem.product)
  orderItems: OrderItems[];
}
