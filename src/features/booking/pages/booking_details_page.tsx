import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Ban, Trash2, User, MapPin, Clock, Calendar, DollarSign } from 'lucide-react';
import { useBooking, useUpdateBookingStatus, useDeleteBooking } from '../hooks/use-bookings';
import { Button } from '../../../components/ui/button';
import { BookingStatusBadge } from '../components/booking_status_badge';
import { DangerDialog } from '../../../components/ui/dialog';
import { ApproveBookingDialog, CancelBookingDialog } from '../components/booking_dialogs';
import moment from 'moment'

export const BookingDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = React.useState(false);

  const [showApprove, setShowApprove] = React.useState(false);
  const [showCancel, setShowCancel] = React.useState(false);

  const { data, isLoading } = useBooking(id);
  const booking = data?.data;

  // Mutations
  const updateStatus = useUpdateBookingStatus(Number(id));
  const deleteBooking = useDeleteBooking((Number(id)), () => navigate('/bookings'));

  const handleStatus = (status: 'confirmed' | 'cancelled') => {
    // Calling mutation logic here (assuming hook supports it or needs refactor to useMutation directly)
    // For this example:
    console.log(`Setting status to ${status}`);
    // updateStatus.mutate({ status }); 
  };

  if (isLoading) return <div>Loading...</div>;
  if (!booking) return <div>Booking not found</div>;

  return (
    <div className="space-y-6 pb-20">
      
      {/* HEADER Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/bookings')}>
             <ArrowLeft size={20} />
          </Button>
          <div>
            <div className="flex items-center gap-3">
               <h1 className="text-2xl font-bold text-text-primary">Booking #{booking.id}</h1>
               <BookingStatusBadge status={booking.status} />
            </div>
            <p className="text-sm text-text-muted">Created on {new Date(booking.created_at).toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {booking.status === 'pending' && (
            <Button 
              leftIcon={<CheckCircle2 size={16}/>} 
              onClick={() => setShowApprove(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white border-transparent"
            >
              Approve
            </Button>
          )}
          
          {booking.status !== 'cancelled' && booking.status !== 'completed' && (
            <Button 
              variant="outline-danger" 
              leftIcon={<Ban size={16}/>}
              onClick={() => setShowCancel(true)}
            >
              Cancel Order
            </Button>
          )}

          <Button 
            variant="danger" 
            size="icon" 
            onClick={() => setShowDelete(true)}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION 1: USER */}
          <div className="bg-white border border-border p-6">
             <h3 className="text-sm font-bold uppercase text-text-muted tracking-wide mb-4 flex items-center gap-2">
               <User size={16}/> Customer Information
             </h3>
             <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-text-muted block">Name</label>
                  <p className="font-medium text-text-primary">{booking.user?.name}</p>
                </div>
                <div>
                  <label className="text-xs text-text-muted block">Email</label>
                  <p className="font-medium text-text-primary">{booking.user?.email}</p>
                </div>
                <div>
                  <label className="text-xs text-text-muted block">Phone</label>
                  <p className="font-medium text-text-primary">{booking.user?.phone || 'N/A'}</p>
                </div>
             </div>
          </div>

          {/* SECTION 2: PLACE & TIME */}
          <div className="bg-white border border-border p-6">
             <h3 className="text-sm font-bold uppercase text-text-muted tracking-wide mb-4 flex items-center gap-2">
               <MapPin size={16}/> Reservation Details
             </h3>
             <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-border pb-4">
                   <div>
                      <p className="font-bold text-lg text-text-primary">{booking.place?.name}</p>
                      <p className="text-sm text-text-muted">ID: {booking.place_id}</p>
                   </div>
                   {/* Could add Map/Region info here */}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="text-xs text-text-muted block mb-1 flex items-center gap-1"><Calendar size={12}/> Start Time</label>
                      <p className="font-mono text-sm">{moment(booking.start_time).format('MMMM Do, YYYY, h:mm a')}</p>
                   </div>
                   <div>
                      <label className="text-xs text-text-muted block mb-1 flex items-center gap-1"><Clock size={12}/> Duration</label>
                      <p className="font-mono text-sm">{booking.duration_minutes} Minutes</p>
                   </div>
                   <div>
                      <label className="text-xs text-text-muted block mb-1 flex items-center gap-1"><Calendar size={12}/> End Time</label>
                      <p className="font-mono text-sm">{moment(booking.end_time).format('MMMM Do, YYYY, h:mm a')}</p>
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Right Column: Financials */}
        <div className="lg:col-span-1">
           <div className="bg-white border border-border p-6 sticky top-6">
              <h3 className="text-sm font-bold uppercase text-text-muted tracking-wide mb-6 flex items-center gap-2">
                <DollarSign size={16}/> Payment Summary
              </h3>

              <div className="space-y-3 text-sm">
                 <div className="flex justify-between">
                    <span className="text-text-muted">Rate / Hour</span>
                    <span className="font-mono text-text-primary">
                       ${booking.place?.price_per_hour ? Number(booking.place.price_per_hour).toFixed(2) : '0.00'}
                    </span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-text-muted">Billable Hours</span>
                    <span className="font-mono text-text-primary">
                       {Math.ceil(booking.duration_minutes / 60)} hrs
                    </span>
                 </div>
                 <div className="border-t border-border my-2" />
                 <div className="flex justify-between items-end">
                    <span className="font-bold text-text-primary">Total Paid</span>
                    <span className="font-bold text-xl text-text-primary tracking-tight">
                       ${Number(booking.total_price).toFixed(2)}
                    </span>
                 </div>
              </div>

              {/* Status Banner */}
              <div className={`mt-6 p-4 text-center border ${
                 booking.status === 'confirmed' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
                 booking.status === 'pending' ? 'bg-amber-50 border-amber-100 text-amber-800' :
                 'bg-neutral-50 border-neutral-200 text-neutral-600'
              }`}>
                 <p className="text-xs uppercase font-bold">Payment Status</p>
                 <p className="font-medium">{booking.status === 'confirmed' ? 'Paid & Verified' : 'Pending'}</p>
              </div>

           </div>
        </div>

      </div>

      {
        showApprove && (
            <ApproveBookingDialog 
                bookingId={Number(id)} 
                onClose={() => setShowApprove(false)} 
            />
        )
      }

       {
        showCancel && (
            <CancelBookingDialog 
                bookingId={Number(id)} 
                onClose={() => setShowCancel(false)} 
            />
        )
       }

      <DangerDialog 
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => deleteBooking.mutate(booking.id)}
        title="Delete Booking"
        description="Permanently remove this booking record? This cannot be undone."
      />
    </div>
  );
};