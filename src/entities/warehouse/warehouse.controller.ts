import { Controller, Post, Put, Body, Param } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './warehouse.entity';
import { CreateWarehouseDto, UpdateWarehouseDto } from './warehouse.schema';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
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

  @Post()
  @ApiBody({ type: CreateWarehouseDto })
  override create(@Body() dto: CreateWarehouseDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateWarehouseDto })
  override update(@Param() id: string, @Body() dto: UpdateWarehouseDto) {
    return super.update(id, dto);
  }
}
