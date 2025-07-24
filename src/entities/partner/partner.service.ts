import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from './partner.entity';
import { BaseService } from 'src/common/base.service';
import { z } from 'zod';
import { Order } from '../order/order.entity';
import { CreatePartnerSchema, UpdatePartnerSchema } from './partner.schema';

export type CreatePartnerInput = z.infer<typeof CreatePartnerSchema>;
export type UpdatePartnerInput = z.infer<typeof UpdatePartnerSchema>;

export interface MostLoyalCustomer {
  companyId: string;
  customerName: string;
  totalOrders: string;
}

@Injectable()
export class PartnerService extends BaseService<Partner> {
  constructor(
    @InjectRepository(Partner) repo: Repository<Partner>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {
    super(repo, 'Partner');
  }

  async create(dto: CreatePartnerInput) {
    return super.create(dto);
  }

  async update(id: string, dto: UpdatePartnerInput) {
    return super.update(id, dto);
  }

  async softDelete(id: string) {
    return super.softDelete(id);
  }

  async delete(id: string) {
    return super.delete(id);
  }

  async getMostLoyalCustomer(): Promise<MostLoyalCustomer | null> {
    const result = await this.repo
      .createQueryBuilder('o')
      .select('o.company_id', 'companyId')
      .addSelect('c.name', 'customerName')
      .addSelect('COUNT(o.id)', 'totalOrders')
      .innerJoin('o.partner', 'c')
      .where('o.type = :type', { type: 'delivery' })
      .andWhere('o.deleted_at IS NULL')
      .andWhere('c.deleted_at IS NULL')
      .groupBy('o.companyId')
      .addGroupBy('c.name')
      .orderBy('COUNT(o.id)', 'DESC')
      .limit(1)
      .getRawOne<MostLoyalCustomer>();

    return result ?? null;
  }
}
