import type { Booking, BookingResponse, BookingFilters } from '../types';
import { useGetQuery, useMutationAction } from '../../../core/hooks/queries-actions';

export const useBookings = (filters?: BookingFilters) => {
  return useGetQuery<BookingResponse>({
    key: ['bookings', filters], 
    url: '/bookings',
  });
};

// --- GET SINGLE BOOKING ---
export const useBooking = (id: string | undefined) => {
  return useGetQuery<{ data: Booking }>({
    key: ['bookings', id],
    url: `/bookings/${id}`,
    options: { enabled: !!id }
  });
};

// --- UPDATE STATUS (Approve/Reject) ---
export const useUpdateBookingStatus = (id: number, onSuccess?: () => void) => {
  return useMutationAction<Booking, { status: string }>({
    method: 'put',
    url: `/bookings/${id}/status`,
    key: ['bookings'],
    onSuccessCallback: onSuccess,
  });
};

// --- DELETE BOOKING ---
export const useDeleteBooking = (booking_id: number | null, onSuccess?: () => void) => {
  return useMutationAction<void, number>({
    method: 'delete',
    url: `/bookings/${booking_id}`,
    key: ['bookings'],
    onSuccessCallback: onSuccess,
  });
};
