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
import { Invoice } from '../invoice/invoice.entity';

export enum UserRole {
  OWNER = 'owner',
  OPERATOR = 'operator',
  VIEWER = 'viewer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.VIEWER })
  role: UserRole;
  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'companyId' })
  company: Company;
  @Column({ nullable: true })
  modifiedBy: string;
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
  @OneToMany(() => Invoice, (invoice) => invoice.user)
  invoices: Invoice[];
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
