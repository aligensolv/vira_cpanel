import React from 'react';
import { type PaymentStatus } from '../types';

export const PaymentStatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  const styles = {
    PENDING: 'bg-secondary/10 text-secondary',
    PAID: 'bg-success/10 text-success',
    FAILED: 'bg-rose-50 text-rose-700',
    REFUNDED: 'bg-purple-50 text-purple-700',
  };

  return (
    <span className={`
      px-2 py-0.5 text-[10px] uppercase font-bold tracking-wide border-none rounded-none
      ${styles[status] || styles.PENDING}
    `}>
      {status}
    </span>
  );
};