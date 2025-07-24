import { z } from 'zod';
import { SupportType } from './warehouse.entity';

export const CreateWarehouseSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1),
  supportType: z.enum(SupportType),
  companyId: z.uuid(),
});

export const UpdateWarehouseSchema = CreateWarehouseSchema.partial();
