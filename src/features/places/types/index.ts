import type { Region } from "../../regions/types/region";

export interface Place {
  id: number;
  region_id: number;
  name: string;
  price_per_hour: number | string; // API might return decimal string
  min_duration_minutes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  // Relations (optional depending on API)
  region?: Region;
}

export interface PlaceResponse {
  data: Place[];
}

export interface SinglePlaceResponse {
  data: Place;
}

export interface PlaceFilters {
  search?: string
  status: 'all' | 'active' | 'inactive'
  region_id?: number
}