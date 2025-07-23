import { z } from 'zod';
import { UserRole } from 'src/entities/user/user.entity';

export const RegisterSchema = z.object({
  name: z.string().min(4),
  username: z.string().min(6),
  password: z.string().min(6),
  role: z.enum(UserRole),
  company_id: z.uuid().optional(),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
