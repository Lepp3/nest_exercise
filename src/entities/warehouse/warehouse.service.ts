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
import { Order } from '../order/order.entity';

export type CreateWarehouseInput = z.infer<typeof CreateWarehouseSchema>;
export type UpdateWarehouseInput = z.infer<typeof UpdateWarehouseSchema>;
export interface HighestStockPerWarehouse {
  warehouseName: string;
  name_of_product: string;
  max_product: number;
}

@Injectable()
export class WarehouseService extends BaseService<Warehouse> {
  constructor(
    @InjectRepository(Warehouse) repo: Repository<Warehouse>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {
    super(repo, 'Warehouse');
  }

  async create(dto: CreateWarehouseInput, companyId: string, userId: string) {
    return super.create(dto, companyId, userId);
  }

  async update(id: string, dto: UpdateWarehouseInput) {
    return super.update(id, dto);
  }

  async softDelete(id: string) {
    return super.softDelete(id);
  }

  async delete(id: string) {
    return super.delete(id);
  }

  async getHighestStockPerWarehouse(): Promise<HighestStockPerWarehouse[]> {
    const subQuery = this.orderRepo
      .createQueryBuilder('o')
      .select('w.name', 'warehouseName')
      .addSelect('p.name', 'productName')
      .addSelect(
        `
      SUM(
        CASE
          WHEN o.type = 'shipment' THEN oi.quantity
          WHEN o.type = 'delivery' THEN -oi.quantity
          ELSE 0
        END
      )`,
        'stockLevel',
      )
      .innerJoin('o.orderItems', 'oi')
      .innerJoin('oi.product', 'p')
      .innerJoin('o.warehouse', 'w')
      .where('o.deletedAt IS NULL')
      .andWhere('oi.deletedAt IS NULL')
      .andWhere('p.deletedAt IS NULL')
      .groupBy('w.name')
      .addGroupBy('p.name');

    const result = await this.orderRepo
      .createQueryBuilder()
      .select('s."warehouseName"', 'warehouseName')
      .addSelect('MIN(s."productName")', 'name_of_product')
      .addSelect('MAX(s."stockLevel")', 'max_product')
      .from(`(${subQuery.getQuery()})`, 's')
      .setParameters(subQuery.getParameters())
      .groupBy('s."warehouseName"')
      .orderBy('MAX(s."stockLevel")', 'DESC')
      .getRawMany<HighestStockPerWarehouse>();

    return result;
  }
}
