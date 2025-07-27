import { Controller, Post, Put, Body, Param, Get } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './warehouse.entity';
import { CreateWarehouseDto, UpdateWarehouseDto } from './warehouse.schema';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, AuthUser } from 'src/decorators/currentUser.decorator';
@ApiBearerAuth('Authorization')
@Controller('warehouse')
export class WarehouseController extends BaseController<
  Warehouse,
  CreateWarehouseDto,
  UpdateWarehouseDto
> {
  constructor(protected readonly warehouseService: WarehouseService) {
    super(warehouseService);
  }

  @Get('highest-stock')
  getHighestStock() {
    return this.warehouseService.getHighestStockPerWarehouse();
  }

  @Post()
  @ApiBody({
    type: CreateWarehouseDto,
    examples: {
      default: {
        value: {
          name: '',
          supportType: '',
          companyId: '',
        },
      },
    },
  })
  override create(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateWarehouseDto,
  ) {
    return super.create(user, dto);
  }

  @Put(':id')
  @ApiBody({
    type: UpdateWarehouseDto,
    examples: {
      default: {
        value: {
          name: '',
          supportType: '',
          companyId: '',
        },
      },
    },
  })
  override update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateWarehouseDto,
  ) {
    return super.update(user, id, dto);
  }
}
