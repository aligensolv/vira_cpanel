import { useGetQuery } from "../../../core/hooks/queries-actions"

export interface DashboardMetrics {
  totalRevenue: number
  activeSpots: number
  regions_count: number
  totalBookings: number
  pendingBookings: number
  revenueTrend: number[]
  bookingsByStatus: {
    confirmed: number
    pending: number
    cancelled: number
  }
}

export const useDashboardMetrics = () => {
  const { data, isLoading, error } = useGetQuery<{ data: DashboardMetrics }>({
    key: ["dashboard", "metrics"],
    url: "/dashboard/metrics", 
  })

  return { data: data?.data, isLoading, error }
}