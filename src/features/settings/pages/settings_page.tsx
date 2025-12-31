import React from 'react';
import { ProfileSettings } from '../components/profile_settings';
import { SecuritySettings } from '../components/security_settings';
import { NotificationSettings } from '../components/notification_settings';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Settings</h1>
        <p className="text-sm text-text-muted">Manage your account preferences and system configurations.</p>
      </div>

      <div className="space-y-8">
        <ProfileSettings />
        <NotificationSettings />
        <SecuritySettings />
      </div>
    </div>
  );
};