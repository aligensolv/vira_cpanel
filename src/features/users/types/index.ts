export interface User {
  id: number
  name: string
  email: string
  total_bookings: number
  has_active_booking: boolean
  created_at: string
}

export interface UserResponse {
  data: User[]
  meta?: {
    total: number
    page: number
    last_page: number
  }
}

export interface UserFilters {
  search?: string
}