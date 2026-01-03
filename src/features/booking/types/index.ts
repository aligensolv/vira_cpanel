import type { Place } from "../../places/types";

// Updated Status Enum based on your schema
export type BookingStatus = 'INITIAL' | 'ACTIVE' | 'CANCELLED' | 'COMPLETED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface UserShort {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface Payment {
  id: number;
  amount: number | string;
  method: string | null;
  status: PaymentStatus;
  paid_at: string | null;
}

export interface BookingExtension {
  id: number;
  from_minutes: number;
  to_minutes: number;
  old_end_time: string;
  new_end_time: string;
  price_before: number | string;
  price_after: number | string;
  created_at: string;
}

export interface Booking {
  id: number;
  user_id: number;
  place_id: number;
  
  start_time: string;
  end_time: string;
  
  requested_duration_minutes: number;
  actual_duration_minutes: number;
  
  price_per_hour: number | string;
  total_price: number | string;
  
  status: BookingStatus;
  
  created_at: string;
  updated_at: string;

  // Relations
  user?: UserShort;
  place?: Place;
  payment?: Payment | null;
  extensions?: BookingExtension[];
}

export interface BookingResponse {
  data: Booking[];
  meta?: {
    total: number;
    page: number;
    last_page: number;
  };
}

export interface BookingFilters {
  status?: string;
  place_id?: string;
  region_id?: string;
  date_from?: string;
  date_to?: string;
}