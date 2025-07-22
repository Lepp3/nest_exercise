import { z } from 'zod';

export const CreateCompanySchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1),
  location: z.string(),
});

export const UpdateCompanySchema = CreateCompanySchema.partial();
