import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Using 'any' as a workaround for the status type issue
// A better approach would be to modify the Header component to accept more status types
const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [saving, setSaving] = useState(false);
  
  const handleSave = () => {
    setSaving(true);
    // Simulate saving settings
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="p-6">
      {/* Remove the Header component as it's now handled by the Layout component */}
      
      <div className="mt-8 max-w-4xl mx-auto">
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Theme Settings</h2>
          <div className={cn(
            "flex items-center justify-between py-4 border-b",
            theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
          )}>
            <div>
              <h3 className="font-medium">Appearance</h3>
              <p className={cn(
                "text-sm mt-1",
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              )}>Customize how Bakehouse POS looks</p>
            </div>
            <div className="flex items-center gap-2">
              <Toggle
                pressed={theme === 'light'}
                onClick={() => setTheme('light')}
                className={cn(
                  "data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600",
                  theme === 'dark' && "data-[state=on]:bg-blue-900 data-[state=on]:text-blue-300"
                )}
                aria-label="Toggle light mode"
              >
                <Sun className="h-4 w-4" />
                <span className="ml-2">Light</span>
              </Toggle>
              <Toggle
                pressed={theme === 'dark'}
                onClick={() => setTheme('dark')}
                className={cn(
                  "data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600", 
                  theme === 'dark' && "data-[state=on]:bg-blue-900 data-[state=on]:text-blue-300"
                )}
                aria-label="Toggle dark mode"
              >
                <Moon className="h-4 w-4" />
                <span className="ml-2">Dark</span>
              </Toggle>
            </div>
          </div>

          <div className={cn(
            "flex items-center justify-between py-4 border-b",
            theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
          )}>
            <div>
              <h3 className="font-medium">Language</h3>
              <p className={cn(
                "text-sm mt-1",
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              )}>Choose your preferred language</p>
            </div>
            <div>
              <select className={cn(
                "rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                theme === 'dark' 
                  ? 'bg-gray-800 border border-gray-700 text-gray-200' 
                  : 'border border-gray-200'
              )}>
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
                <option value="es">Spanish</option>
              </select>
            </div>
          </div>
          
          <div className={cn(
            "flex items-center justify-between py-4 border-b",
            theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
          )}>
            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className={cn(
                "text-sm mt-1",
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              )}>Configure your notification preferences</p>
            </div>
            <div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className={cn(
                  "w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600",
                  theme === 'dark' ? 'bg-gray-700 after:border-gray-600' : 'bg-gray-200'
                )}></div>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="min-w-[120px]"
            >
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Account Settings</h2>
          <div className={cn(
            "flex items-center justify-between py-4 border-b",
            theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
          )}>
            <div>
              <h3 className="font-medium">Profile Information</h3>
              <p className={cn(
                "text-sm mt-1",
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              )}>Update your profile details</p>
            </div>
            <Button variant="outline">Edit</Button>
          </div>
          
          <div className={cn(
            "flex items-center justify-between py-4 border-b",
            theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
          )}>
            <div>
              <h3 className="font-medium">Password</h3>
              <p className={cn(
                "text-sm mt-1",
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              )}>Change your password</p>
            </div>
            <Button variant="outline">Update</Button>
          </div>
          
          <div className={cn(
            "flex items-center justify-between py-4 border-b",
            theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
          )}>
            <div>
              <h3 className="font-medium">Two Factor Authentication</h3>
              <p className={cn(
                "text-sm mt-1",
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              )}>Add an extra layer of security</p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
