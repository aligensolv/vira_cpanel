import { z } from 'zod';

export const regionSchema = z.object({
  name: z.string().min(1, "Region name is required").max(50, "Name is too long"),
});

export type RegionFormValues = z.infer<typeof regionSchema>;