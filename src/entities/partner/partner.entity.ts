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
import { Order } from '../order/order.entity';

export enum PartnerType {
  SUPPLIER = 'supplier',
  CUSTOMER = 'customer',
}

@Entity()
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ type: 'enum', enum: PartnerType })
  partnerType: PartnerType;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
  @Column({ nullable: true })
  modifiedBy: string;
  @ManyToOne(() => Company, (company) => company.partners)
  @JoinColumn({ name: 'company_id' })
  company: Company;
  @OneToMany(() => Order, (order) => order.warehouse)
  orders: Order[];
}
