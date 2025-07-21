import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from '../company/company.entity';

export enum SupportType {
  LIQUID = 'liquid',
  SOLID = 'solid',
}

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: SupportType })
  supportType: SupportType;

  @ManyToOne(() => Company, (company) => company.warehouses)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  companyId: string;
}
