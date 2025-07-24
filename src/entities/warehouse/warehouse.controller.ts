import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './warehouse.entity';
import { CreateWarehouseDto, UpdateWarehouseDto } from './warehouse.service';

@Controller('warehouse')
export class WarehouseController extends BaseController<
  Warehouse,
  CreateWarehouseDto,
  UpdateWarehouseDto
> {
  constructor(protected readonly warehouseService: WarehouseService) {
    super(warehouseService);
  }
}
