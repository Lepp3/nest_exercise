import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { BaseService } from 'src/common/base.service';
import { z } from 'zod';
import { CreateOrderSchema, UpdateOrderSchema } from './order.schema';
import { AuthUser } from 'src/decorators/currentUser.decorator';

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderInput = z.infer<typeof UpdateOrderSchema>;

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(@InjectRepository(Order) repo: Repository<Order>) {
    super(repo);
  }

  async create(user: AuthUser, dto: CreateOrderInput) {
    console.log('todo');
  }
}
