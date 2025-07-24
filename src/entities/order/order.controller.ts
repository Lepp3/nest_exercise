import { Controller, Put, Post, Body, Param } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderDto, UpdateOrderDto } from './order.schema';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('Authorization')
@Controller('order')
export class OrderController extends BaseController<
  Order,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(protected readonly orderService: OrderService) {
    super(orderService);
  }

  @Post()
  @ApiBody({ type: CreateOrderDto })
  override create(@Body() dto: CreateOrderDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateOrderDto })
  override update(@Param() id: string, @Body() dto: UpdateOrderDto) {
    return super.update(id, dto);
  }
}
