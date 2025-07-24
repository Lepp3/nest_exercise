import { z } from 'zod';
import { UserRole } from './user.entity';

export const CreateUserSchema = z.object({
  name: z.string().min(2).optional(),
  username: z.string().min(4),
  password: z.string().min(6),
  role: z.enum(UserRole),
  companyId: z.uuid(),
});

export const UpdateUserSchema = CreateUserSchema.partial();

export type RegisterUserInput = z.infer<typeof CreateUserSchema>;
