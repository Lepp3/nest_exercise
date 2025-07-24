import { Controller, Param, Post, Put, Body } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { OrderItemsService } from './orderItems.service';
import { OrderItems } from './orderItems.entity';
import { CreateOrderItemsDto, UpdateOrderItemsDto } from './orderItems.schema';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

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
  @Post()
  @ApiBody({ type: CreateOrderItemsDto })
  override create(@Body() dto: CreateOrderItemsDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateOrderItemsDto })
  override update(@Param() id: string, @Body() dto: UpdateOrderItemsDto) {
    return super.update(id, dto);
  }
}
