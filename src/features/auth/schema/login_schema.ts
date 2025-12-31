// src/features/auth/schema/loginSchema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Password must be at least 4 characters" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;