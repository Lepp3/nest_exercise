import { z } from 'zod';
import { UserRole } from './user.entity';

export const UpdateUserSchema = z.object({
  name: z.string().min(2).optional(),
  username: z.string().min(4).optional(),
  password: z.string().min(6).optional(),
  role: z.enum(UserRole).optional(),
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
