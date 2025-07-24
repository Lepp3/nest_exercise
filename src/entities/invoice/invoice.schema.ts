import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CreateInvoiceSchema = z.object({
  id: z.uuid().optional(),
  date: z.date(),
  orderId: z.uuid(),
});

export const UpdateInvoiceSchema = CreateInvoiceSchema.partial();
export class CreateInvoiceDto extends createZodDto(CreateInvoiceSchema) {}
export class UpdateInvoiceDto extends createZodDto(UpdateInvoiceSchema) {}
