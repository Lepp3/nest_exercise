import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { BaseService } from 'src/common/base.service';
import { z } from 'zod';
import { CreateProductSchema, UpdateProductSchema } from './product.schema';
import { OrderItems } from '../orderItems/orderItems.entity';

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export interface TopSellingProduct {
  productName: string;
  totalSold: number;
}

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product) repo: Repository<Product>,
    @InjectRepository(OrderItems)
    private readonly orderItemsRepo: Repository<OrderItems>,
  ) {
    super(repo);
  }

  async getTopSellingProducts(
    companyId: string,
  ): Promise<TopSellingProduct[] | string> {
    const result = await this.orderItemsRepo
      .createQueryBuilder('oi')
      .select('p.name', 'productName')
      .addSelect('SUM(oi.quantity)', 'totalSold')
      .innerJoin('oi.order', 'o')
      .innerJoin('oi.product', 'p')
      .where('o.type = :type', { type: 'delivery' })
      .andWhere('o.companyId = :companyId', { companyId })
      .andWhere('oi.deletedAt IS NULL')
      .andWhere('o.deletedAt IS NULL')
      .andWhere('p.deletedAt IS NULL')
      .groupBy('p.name')
      .orderBy('SUM(oi.quantity)', 'DESC')
      .getRawMany<TopSellingProduct>();

    return result.length > 0 ? result : 'No bestsellers yet';
  }
}
