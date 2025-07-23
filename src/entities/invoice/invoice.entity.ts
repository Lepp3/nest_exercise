import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Order } from '../order/order.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  date: Date;
  @Column()
  invoiceNumber: string;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
  @Column({ nullable: true })
  modifiedBy: string;
  @ManyToOne(() => User, (user) => user.invoices)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => Order, (order) => order.invoices)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
