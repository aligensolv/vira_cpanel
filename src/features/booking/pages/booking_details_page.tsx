import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Ban, Trash2, MapPin, 
  Clock, Calendar, DollarSign, CreditCard, History,
  Mail, Phone, Hash, Users
} from 'lucide-react';

// Hooks
import { useBooking, useUpdateBookingStatus, useDeleteBooking } from '../hooks/use-bookings';

// Components
import { Button } from '../../../components/ui/button';
import { BookingStatusBadge } from '../components/booking_status_badge';
import { PaymentStatusBadge } from '../components/payment_status_badge';
import { DangerDialog } from '../../../components/ui/dialog';
import { StatCard } from '../../../components/ui/stat_card';
import { type BookingExtension } from '../types';
import type { ColumnDef } from '../../../components/ui/datatable';
import DataTable from '../../../components/ui/datatable';

export const BookingDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  // Queries
  const { data, isLoading } = useBooking(id);
  const booking = data?.data;

  // Mutations
  const updateStatus = useUpdateBookingStatus(Number(id));
  const deleteBooking = useDeleteBooking(Number(id), () => navigate('/bookings'));

  const handleCancel = () => {
    updateStatus.mutate({ status: 'CANCELLED' });
    setShowCancel(false);
  };

  // --- EXTENSIONS TABLE COLUMNS ---
  const extensionColumns: ColumnDef<BookingExtension>[] = [
    { 
      header: 'Added Duration', 
      cell: (item) => <div className="flex items-center gap-1 font-bold text-text-primary"> +{item.to_minutes - item.from_minutes}M</div> 
    },
    { 
      header: 'New End Time', 
      cell: (item) => <span className="font-mono text-sm text-text-muted">{new Date(item.new_end_time).toLocaleTimeString()}</span> 
    },
    { 
      header: 'Cost Added', 
      align: 'right',
      cell: (item) => (
        <span className="font-mono text-success bg-success/10 px-1 border border-emerald-100">
          +${(Number(item.price_after) - Number(item.price_before)).toFixed(2)}
        </span>
      )
    },
    { 
      header: 'Timestamp', 
      align: 'right',
      cell: (item) => <span className="text-sm text-text-muted">{new Date(item.created_at).toLocaleString()}</span> 
    }
  ];

  if (isLoading) return <div className="p-8 text-sm text-text-muted uppercase tracking-wide animate-pulse">Loading booking data...</div>;
  if (!booking) return <div className="p-8 text-destructive font-bold">Booking #{id} not found</div>;

  const isExtended = booking.extensions && booking.extensions.length > 0;

  return (
    <div className="space-y-6 pb-20">
      
      {/* --- 1. HEADER (Squared & Clean) --- */}
      <div className=" flex flex-col md:flex-row justify-between gap-4 border-b pb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/bookings')}>
             <ArrowLeft size={20} />
          </Button>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
               <h1 className="text-2xl font-bold text-text-primary tracking-tight">Booking #{booking.id}</h1>
               <BookingStatusBadge status={booking.status} />
            </div>
            <div className="flex items-center gap-3 text-xs text-text-muted uppercase tracking-wide font-medium">
               <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(booking.created_at).toLocaleDateString()}</span>
               <span className="w-px h-3 bg-border"/>
               <span className="flex items-center gap-1"><Clock size={12}/> {new Date(booking.created_at).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Admin Controls */}
          {booking.status === 'ACTIVE' || booking.status === 'INITIAL' ? (
             <Button 
               variant="outline-danger" 
               leftIcon={<Ban size={16}/>}
               onClick={() => setShowCancel(true)}
             >
               Cancel Order
             </Button>
          ) : null}

          <Button 
            variant="danger" 
            size="icon" 
            onClick={() => setShowDelete(true)}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>

      {/* --- 2. KEY METRICS (Using StatCard) --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <StatCard 
            title="Total Revenue" 
            value={`$${Number(booking.total_price).toFixed(2)}`} 
            icon={<DollarSign size={20}/>}
            trend={{ value: "Final", isPositive: true, label: "Invoiced" }}
         />
         <StatCard 
            title="Duration" 
            value={`${booking.actual_duration_minutes}m`} 
            icon={<Clock size={20}/>}
            trend={isExtended ? { value: `${booking.actual_duration_minutes - booking.requested_duration_minutes}m`, isPositive: true, label: "Extended" } : undefined}
         />
         <StatCard 
            title="Hourly Rate" 
            value={`$${Number(booking.price_per_hour).toFixed(2)}`} 
            icon={<Hash size={20}/>}
            trend={{ value: "Fixed", isPositive: undefined, label: "Base Rate" }}
         />
         <StatCard 
            title="Payment" 
            value={booking.payment?.status || 'N/A'} 
            icon={<CreditCard size={20}/>}
            trend={{ 
               value: booking.payment?.method || 'Unknown', 
               isPositive: booking.payment?.status === 'PAID', 
               label: "Method" 
            }}
         />
      </div>


      {/* --- 3. MAIN LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (Details) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* A. MERGED: Involved Parties (Customer & Place) */}
          <div className="bg-white border border-border">
             <div className="px-6 py-4 border-b border-border bg-secondary">
                <h3 className="text-xs font-bold uppercase text-secondary-foreground tracking-widest flex items-center gap-2">
                  <Users size={14}/> Involved Parties
                </h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                
                {/* Customer Section */}
                <div className="p-6 flex flex-col gap-4">
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-neutral-900 text-white flex items-center justify-center font-bold text-xl shrink-0">
                        {booking.user?.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="font-bold text-text-primary text-lg truncate" title={booking.user?.name}>
                           {booking.user?.name}
                         </p>
                         <p className="text-xs text-text-muted uppercase font-semibold mt-1">Customer</p>
                      </div>
                   </div>
                   
                   <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3 text-sm group">
                         <div className="w-8 h-8 flex items-center justify-center bg-background border border-border text-text-muted group-hover:text-primary transition-colors">
                            <Mail size={14}/>
                         </div>
                         <span className="text-text-primary truncate">{booking.user?.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm group">
                         <div className="w-8 h-8 flex items-center justify-center bg-background border border-border text-text-muted group-hover:text-primary transition-colors">
                            <Phone size={14}/>
                         </div>
                         <span className="text-text-primary">{booking.user?.phone || 'No Phone Provided'}</span>
                      </div>
                   </div>
                </div>

                {/* Spot Section */}
                <div className="p-6 flex flex-col gap-4">
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-background border border-border text-text-muted flex items-center justify-center shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="font-bold text-text-primary text-lg truncate" title={booking.place?.name}>
                           {booking.place?.name}
                         </p>
                         <p className="text-xs text-text-muted uppercase font-semibold mt-1">
                           Region: {booking.place?.region?.name ?? 'Unknown'}
                         </p>
                      </div>
                   </div>

                   <div className="pt-2 mt-auto">
                      <Button 
                         variant="primary" 
                         size="sm" 
                         className="w-full justify-between group"
                         onClick={() => navigate(`/places/edit/${booking.place_id}`)}
                      >
                         <span className='uppercase'>Manage Spot</span>
                      </Button>
                   </div>
                </div>

             </div>
          </div>

          {/* B. Timeline Visualization */}
          <div className="bg-white border border-border p-0">
             <div className="px-6 py-4 border-b border-border bg-secondary">
                <h3 className="text-xs font-bold uppercase text-secondary-foreground tracking-widest flex items-center gap-2">
                  <History size={14}/> Session Timeline
                </h3>
             </div>
             <div className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-0 relative">
                   {/* Line */}
                   <div className="hidden md:block absolute top-1/2 left-10 right-10 h-px bg-border -z-0" />
                   
                   {/* Start Point */}
                   <div className="z-10 bg-white pr-4 text-center md:text-left">
                      <span className="text-[10px] font-bold uppercase text-success bg-success/10 px-2 py-1 border border-success">Check In</span>
                      <p className="font-mono text-xl font-bold text-text-primary mt-2">
                        {new Date(booking.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                      <p className="text-xs text-text-muted">{new Date(booking.start_time).toLocaleDateString()}</p>
                   </div>

                   {/* Duration Badge */}
                   <div className="z-10 bg-white px-2">
                      <div className="bg-primary text-primary-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                         {booking.actual_duration_minutes} Mins
                      </div>
                   </div>

                   {/* End Point */}
                   <div className="z-10 bg-white pl-4 text-center md:text-right">
                      <span className="text-[10px] font-bold uppercase text-text-muted bg-neutral-100 px-2 py-1 border border-neutral-200">Check Out</span>
                      <p className="font-mono text-xl font-bold text-text-primary mt-2">
                        {new Date(booking.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                      <p className="text-xs text-text-muted">{new Date(booking.end_time).toLocaleDateString()}</p>
                   </div>
                </div>
             </div>
          </div>

          {/* C. Extensions Table (Using DataTable for consistency) */}
          {isExtended && booking.extensions && (
            <DataTable
               title="Time Extensions"
               description="History of duration added to this booking."
               data={booking.extensions}
               columns={extensionColumns}
               // No pagination needed for small list
               pagination={undefined} 
            />
          )}
        </div>

        {/* RIGHT COLUMN (Financials - Sticky) */}
        <div className="lg:col-span-1 space-y-6">
           
           {/* INVOICE CARD */}
           <div className="bg-white border border-border sticky top-6">
              <div className="px-6 py-4 border-b border-border bg-secondary">
                  <h3 className="text-xs font-bold uppercase text-secondary-foreground tracking-widest flex items-center gap-2">
                     <DollarSign size={14}/> Invoice Summary
                  </h3>
              </div>
              
              <div className="p-6 space-y-4">
                 {/* Line Items */}
                 <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                       <span className="text-text-muted">Rate / Hour</span>
                       <span className="font-mono text-text-primary">${Number(booking.price_per_hour).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-text-muted">Base Duration</span>
                       <span className="font-mono text-text-primary">{booking.requested_duration_minutes}m</span>
                    </div>
                    
                    {isExtended && (
                      <div className="flex justify-between p-1 -mx-1">
                         <span className="font-medium">Extension Fees</span>
                         <span className="font-mono font-bold bg-success/10 px-2 py-0.5">
                            +${(Number(booking.total_price) - (Number(booking.price_per_hour) * Math.ceil(booking.requested_duration_minutes/60))).toFixed(2)}
                         </span>
                      </div>
                    )}
                 </div>

                 {/* Divider */}
                 <div className="border-t border-dashed border-border" />

                 {/* Total */}
                 <div className="flex justify-between items-end">
                    <span className="font-bold text-text-primary uppercase text-xs tracking-wider">Total Due</span>
                    <span className="font-mono text-xl font-bold text-text-primary tracking-tight">
                       ${Number(booking.total_price).toFixed(2)}
                    </span>
                 </div>
              </div>

              {/* Payment Status Footer */}
              <div className="px-6 py-4 bg-neutral-50 border-t border-border">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-text-muted">Payment Status</span>
                    {booking.payment ? <PaymentStatusBadge status={booking.payment.status} /> : <span className="text-xs text-text-muted">None</span>}
                 </div>
                 {booking.payment && (
                    <div className="text-xs text-text-muted font-mono flex flex-col gap-1">
                       <div className="flex justify-between">
                          <span>Method:</span>
                          <span className="text-text-primary uppercase">{booking.payment.method}</span>
                       </div>
                    </div>
                 )}
              </div>
           </div>

        </div>
      </div>

      {/* --- DIALOGS --- */}
      <DangerDialog 
        isOpen={showCancel}
        onClose={() => setShowCancel(false)}
        onConfirm={handleCancel}
        title="Cancel Active Booking"
        description="Are you sure? This will immediately invalidate the user's access code. If payment was collected, a refund must be processed manually."
        isLoading={updateStatus.isPending}
      />

      <DangerDialog 
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => deleteBooking.mutate(booking.id)}
        title="Delete Record"
        description="Permanently delete this booking history? This action cannot be undone."
        isLoading={deleteBooking.isPending}
      />

    </div>
  );
};