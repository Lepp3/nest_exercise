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

export enum CompanyStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  location: string;
  @Column({ type: 'enum', enum: CompanyStatus })
  status: CompanyStatus;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @Column({ nullable: true })
  modifiedBy: string;
  @OneToMany(() => User, (user) => user.company)
  users: User[];
  @OneToMany(() => Warehouse, (warehouse) => warehouse.company)
  warehouses: Warehouse[];
}
