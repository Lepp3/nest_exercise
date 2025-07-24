import { z } from 'zod';
import { SupportType } from './warehouse.entity';
import { createZodDto } from 'nestjs-zod';

export const CreateWarehouseSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1),
  supportType: z.enum(SupportType),
  companyId: z.uuid(),
});

export const UpdateWarehouseSchema = CreateWarehouseSchema.partial();
export class CreateWarehouseDto extends createZodDto(CreateWarehouseSchema) {}
export class UpdateWarehouseDto extends createZodDto(UpdateWarehouseSchema) {}
