import React from 'react';
import { type BookingStatus } from '../types';

export const BookingStatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
  const styles = {
    initial: 'bg-amber-50 text-amber-700 border-amber-100',
    active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
    completed: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  };

  return (
    <span className={`
      px-2 py-0.5 text-[10px] uppercase font-bold tracking-wide rounded-none border
      ${styles[status.toLowerCase() as keyof typeof styles] || styles.initial}
    `}>
      {status}
    </span>
  );
};