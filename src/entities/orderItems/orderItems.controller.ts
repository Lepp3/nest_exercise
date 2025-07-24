import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { OrderItemsService } from './orderItems.service';
import { OrderItems } from './orderItems.entity';
import { CreateOrderItemsDto, UpdateOrderItemsDto } from './orderItems.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('Authorization')
@Controller('order-items')
export class OrderItemsController extends BaseController<
  OrderItems,
  CreateOrderItemsDto,
  UpdateOrderItemsDto
> {
  constructor(protected readonly orderItemsService: OrderItemsService) {
    super(orderItemsService);
  }
}
