import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Switch } from '../../../components/ui/switch';

export const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    email_booking: true,
    email_marketing: false,
    system_alerts: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white border border-border p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="p-2 bg-neutral-100 rounded-full">
           <Bell size={20} className="text-neutral-700" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-primary">Notifications</h3>
          <p className="text-sm text-text-muted">Choose what you want to be notified about.</p>
        </div>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-text-primary">New Booking Alerts</p>
            <p className="text-xs text-text-muted">Receive an email when a new booking is created.</p>
          </div>
          <Switch 
            checked={settings.email_booking} 
            onCheckedChange={() => toggle('email_booking')} 
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-text-primary">System Maintenance</p>
            <p className="text-xs text-text-muted">Get notified about upcoming system downtimes.</p>
          </div>
          <Switch 
            checked={settings.system_alerts} 
            onCheckedChange={() => toggle('system_alerts')} 
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-text-primary">Marketing Updates</p>
            <p className="text-xs text-text-muted">Receive news about Vira features and updates.</p>
          </div>
          <Switch 
            checked={settings.email_marketing} 
            onCheckedChange={() => toggle('email_marketing')} 
          />
        </div>
      </div>
    </div>
  );
};