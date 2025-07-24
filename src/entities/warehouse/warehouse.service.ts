import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { BaseService } from 'src/common/base.service';
import { z } from 'zod';
import {
  CreateWarehouseSchema,
  UpdateWarehouseSchema,
} from './warehouse.schema';

export type CreateWarehouseDto = z.infer<typeof CreateWarehouseSchema>;
export type UpdateWarehouseDto = z.infer<typeof UpdateWarehouseSchema>;

@Injectable()
export class WarehouseService extends BaseService<Warehouse> {
  constructor(@InjectRepository(Warehouse) repo: Repository<Warehouse>) {
    super(repo, 'Warehouse');
  }

  async create(dto: CreateWarehouseDto) {
    return super.create(dto);
  }

  async update(id: string, dto: UpdateWarehouseDto) {
    return super.update(id, dto);
  }

  async softDelete(id: string) {
    return super.softDelete(id);
  }

  async delete(id: string) {
    return super.delete(id);
  }
}
