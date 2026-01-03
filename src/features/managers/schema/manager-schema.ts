import { z } from 'zod';

export const managerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal('')),
  password_confirmation: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal('')),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Password and password confirmation must match",
    path: ['password_confirmation']
})

export type ManagerFormValues = z.infer<typeof managerSchema>;