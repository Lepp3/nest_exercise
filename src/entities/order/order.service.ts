import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { BaseService } from 'src/common/base.service';
import { z } from 'zod';
import { CreateOrderSchema, UpdateOrderSchema } from './order.schema';

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderDto = z.infer<typeof UpdateOrderSchema>;

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(@InjectRepository(Order) repo: Repository<Order>) {
    super(repo, 'Order');
  }

  async create(dto: CreateOrderDto) {
    return super.create(dto);
  }

  async update(id: string, dto: UpdateOrderDto) {
    return super.update(id, dto);
  }

  async softDelete(id: string) {
    return super.softDelete(id);
  }

  async delete(id: string) {
    return super.delete(id);
  }
}
