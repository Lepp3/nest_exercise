import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItems } from './orderItems.entity';
import { BaseService } from 'src/common/base.service';
import { z } from 'zod';
import {
  CreateOrderItemsSchema,
  UpdateOrderItemsSchema,
} from './orderItems.schema';

export type CreateOrderItemsInput = z.infer<typeof CreateOrderItemsSchema>;
export type UpdateOrderItemsInput = z.infer<typeof UpdateOrderItemsSchema>;

@Injectable()
export class OrderItemsService extends BaseService<OrderItems> {
  constructor(@InjectRepository(OrderItems) repo: Repository<OrderItems>) {
    super(repo, 'OrderItems');
  }

  async create(dto: CreateOrderItemsInput) {
    return super.create(dto);
  }

  async update(id: string, dto: UpdateOrderItemsInput) {
    return super.update(id, dto);
  }

  async softDelete(id: string) {
    return super.softDelete(id);
  }

  async delete(id: string) {
    return super.delete(id);
  }
}
