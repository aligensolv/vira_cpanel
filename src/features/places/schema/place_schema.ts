import { z } from 'zod';

export const placeSchema = z.object({
  name: z.string().min(1, "Place name is required").max(100),
  
  // We use coerce to ensure numbers are handled correctly from inputs
  region_id: z.coerce.number().min(1, "Region is required"),
  
  price_per_hour: z.coerce
    .number()
    .min(0, "Price cannot be negative")
    .transform(val => Number(val.toFixed(2))),
    
  min_duration_minutes: z.coerce
    .number()
    .min(15, "Minimum duration is 15 minutes")
    .default(30),
    
  is_active: z.boolean().default(true),
});

export type PlaceFormValues = z.infer<typeof placeSchema>;