import { z } from 'zod';
import { OrderType } from './order.entity';

export const CreateOrderSchema = z.object({
  id: z.uuid().optional(),
  type: z.enum(OrderType),
  date: z.date(),
  warehouseId: z.uuid(),
  partnerId: z.uuid(),
  companyId: z.uuid(),
});

export const UpdateOrderSchema = CreateOrderSchema.partial();
