import { useState } from 'react';
import { Collapsible } from './components/ui/collapsible';
import { Switch } from './components/ui/switch';
import { TextArea } from './components/ui/textarea';
import { CheckboxGroup, Checkbox } from './components/ui/checkbox';

export default function SettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [bio, setBio] = useState('');
  const [terms, setTerms] = useState(false);
  
  // Checkbox Group State
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['editor']);

  return (
    <div className="max-w-xl mx-auto p-10 space-y-8 bg-neutral-50 min-h-screen">
      
      <div className="bg-white p-6 border border-neutral-200 space-y-6">
        <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2">Profile Settings</h2>

        {/* Switch */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-neutral-900">Email Notifications</span>
            <span className="text-xs text-neutral-500">Receive weekly digests.</span>
          </div>
          <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
        </div>

        {/* Text Area */}
        <TextArea 
          label="Bio" 
          placeholder="Tell us a little about yourself..." 
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          helperText={`${bio.length}/200 characters`}
        />

        {/* Collapsible */}
        <Collapsible title="Advanced Permissions">
          <CheckboxGroup
            label="Select Permissions"
            value={selectedRoles}
            onChange={setSelectedRoles}
            options={[
              { label: 'Viewer', value: 'viewer', description: 'Can only view content.' },
              { label: 'Editor', value: 'editor', description: 'Can edit content.' },
              { label: 'Admin', value: 'admin', description: 'Full access to everything.' },
            ]}
          />
        </Collapsible>

        {/* Single Checkbox (Terms) */}
        <div className="pt-4 border-t border-neutral-100">
          <Checkbox 
            checked={terms} 
            onCheckedChange={setTerms} 
            label="I agree to the Terms of Service" 
          />
        </div>

      </div>
    </div>
  );
}