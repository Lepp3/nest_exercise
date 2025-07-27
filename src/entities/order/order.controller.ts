import { Controller, Put, Post, Body, Param } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderDto, UpdateOrderDto } from './order.schema';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CurrentUser, AuthUser } from 'src/decorators/currentUser.decorator';

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
  @ApiBody({
    type: CreateOrderDto,
    examples: {
      default: {
        value: {
          type: '',
          date: '',
          warehouseId: '',
          partnerId: '',
        },
      },
    },
  })
  override create(@CurrentUser() user: AuthUser, @Body() dto: CreateOrderDto) {
    return super.create(user, dto);
  }

  @Put(':id')
  @ApiBody({
    type: UpdateOrderDto,
    examples: {
      default: {
        value: {
          type: '',
          date: '',
          warehouseId: '',
          partnerId: '',
        },
      },
    },
  })
  override update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateOrderDto,
  ) {
    return super.update(user, id, dto);
  }
}
