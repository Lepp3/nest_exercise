import { z } from 'zod';

export const CreateOrderItemsSchema = z.object({
  id: z.uuid().optional(),
  productId: z.uuid(),
  quantity: z.string(),
});

export const UpdateOrderItemsSchema = CreateOrderItemsSchema.partial();
