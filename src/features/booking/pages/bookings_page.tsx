import React, { useState } from 'react';
import { useBookings } from '../hooks/use-bookings';
import { BookingsList } from '../components/bookings_list';
import { BookingStats } from '../components/bookings_stats';
import { BookingFiltersBar } from '../components/booking_filters';
import { type BookingFilters } from '../types';

export const BookingsPage: React.FC = () => {
  const [filters, setFilters] = useState<BookingFilters>({});
  
  // Pass filters to hook
  const { data, isLoading } = useBookings(filters);
  const bookings = data?.data || [];

  return (
    <div className="space-y-6 pb-20">
      {/* <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Bookings</h1>
        <p className="text-sm text-text-muted">Monitor and manage spot reservations.</p>
      </div> */}

      <BookingStats bookings={bookings} isLoading={isLoading} />
      
      <BookingFiltersBar 
        filters={filters} 
        onChange={setFilters} 
        onReset={() => setFilters({})} 
      />

      <BookingsList data={bookings} isLoading={isLoading} />
    </div>
  );
};