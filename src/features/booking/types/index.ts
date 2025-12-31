import type { Place } from "../../places/types";

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface UserShort {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface Booking {
  id: number;
  user_id: number;
  place_id: number;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  total_price: number | string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;

  // Relations
  user?: UserShort;
  place?: Place;
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