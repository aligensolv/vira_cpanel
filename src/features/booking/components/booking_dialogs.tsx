import React from 'react';
import { ConfirmDialog, DangerDialog } from '../../../components/ui/dialog';
import { useUpdateBookingStatus } from '../hooks/use-bookings';

interface BookingDialogProps {
  bookingId: number | null;
  onClose: () => void;
  onSuccess?: () => void;
}

// --- APPROVE DIALOG ---
export const ApproveBookingDialog: React.FC<BookingDialogProps> = ({ 
  bookingId, 
  onClose,
  onSuccess 
}) => {
  // We initialize the hook. Note: Hooks cannot be called conditionally, 
  // so this component should only be rendered when needed or the hook handles null IDs gracefully.
  // In our architecture, we usually render this component conditionally (e.g. {selectedId && <Dialog ... />})
  
  const { mutate, isPending } = useUpdateBookingStatus(bookingId || 0, () => {
    if (onSuccess) onSuccess();
    onClose();
  });

  if (!bookingId) return null;

  return (
    <ConfirmDialog
      isOpen={!!bookingId}
      onClose={onClose}
      title="Approve Booking Request?"
      description={`Are you sure you want to approve booking #${bookingId}? This will confirm the reservation and notify the customer.`}
      onConfirm={() => mutate({ status: 'confirmed' })}
      isLoading={isPending}
    />
  );
};

// --- CANCEL DIALOG ---
export const CancelBookingDialog: React.FC<BookingDialogProps> = ({ 
  bookingId, 
  onClose,
  onSuccess 
}) => {
  const { mutate, isPending } = useUpdateBookingStatus(bookingId || 0, () => {
    if (onSuccess) onSuccess();
    onClose();
  });

  if (!bookingId) return null;

  return (
    <DangerDialog
      isOpen={!!bookingId}
      onClose={onClose}
      title="Cancel Booking?"
      description={`Are you sure you want to cancel booking #${bookingId}? This action sends a cancellation notice to the user.`}
      onConfirm={() => mutate({ status: 'cancelled' })}
      isLoading={isPending}
    />
  );
};