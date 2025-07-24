import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderDto, UpdateOrderDto } from './order.service';

@Controller('order')
export class OrderController extends BaseController<
  Order,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(protected readonly orderService: OrderService) {
    super(orderService);
  }
}
