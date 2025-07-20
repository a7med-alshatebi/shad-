"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Database, 
  Key,
  Save,
  RefreshCw,
  Check,
  X
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Administrator"
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    passwordLastChanged: "30 days ago",
    apiKeysCount: 3
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    securityWarnings: true,
    weeklyReports: false,
    criticalAlerts: true,
    userActivities: false,
    marketingUpdates: false
  });

  const [themeSettings, setThemeSettings] = useState({
    theme: "light",
    language: "en-US",
    timezone: "UTC-5"
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    setHasChanges(false);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleThemeChange = (field: string, value: string) => {
    setThemeSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "system", label: "System", icon: Database }
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account preferences and system configuration.
          </p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Settings Navigation */}
      <div className="grid gap-6 md:grid-cols-5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Card 
              key={tab.id}
              className={`cursor-pointer transition-colors ${
                activeTab === tab.id 
                  ? "border-blue-200 bg-blue-50" 
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <CardContent className="p-6 text-center">
                <Icon className={`h-8 w-8 mx-auto mb-2 ${
                  activeTab === tab.id ? "text-blue-600" : "text-gray-400"
                }`} />
                <h3 className="font-medium">{tab.label}</h3>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Settings Content */}
      {activeTab === "profile" && (
        <ProfileSettings 
          data={profileData}
          onChange={handleProfileChange}
        />
      )}

      {activeTab === "security" && (
        <SecuritySettings 
          data={securitySettings}
          onChange={setSecuritySettings}
        />
      )}

      {activeTab === "notifications" && (
        <NotificationSettings 
          data={notificationSettings}
          onChange={handleNotificationChange}
        />
      )}

      {activeTab === "appearance" && (
        <AppearanceSettings 
          data={themeSettings}
          onChange={handleThemeChange}
        />
      )}

      {activeTab === "system" && (
        <SystemSettings />
      )}

      {/* Save Actions */}
      {hasChanges && (
        <div className="flex justify-end space-x-4 pt-6 border-t bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center text-yellow-800">
            <span className="text-sm">You have unsaved changes</span>
          </div>
          <Button variant="outline" onClick={() => setHasChanges(false)}>
            Discard
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}
    </div>
  );
}

// Profile Settings Component
function ProfileSettings({ data, onChange }: { data: any, onChange: (field: string, value: string) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select 
            value={data.role}
            onChange={(e) => onChange("role", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Administrator</option>
            <option>Manager</option>
            <option>User</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}

// Security Settings Component
function SecuritySettings({ data, onChange }: { data: any, onChange: (data: any) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Security & Authentication
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={data.twoFactorEnabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {data.twoFactorEnabled ? "Enabled" : "Disabled"}
            </Badge>
            <Button variant="outline" size="sm">
              {data.twoFactorEnabled ? "Disable" : "Enable"}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Password</h4>
            <p className="text-sm text-gray-600">Last changed {data.passwordLastChanged}</p>
          </div>
          <Button variant="outline" size="sm">
            <Key className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </div>
        
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">API Keys</h4>
            <p className="text-sm text-gray-600">{data.apiKeysCount} active keys</p>
          </div>
          <Button variant="outline" size="sm">Manage Keys</Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Notification Settings Component
function NotificationSettings({ data, onChange }: { data: any, onChange: (field: string, value: boolean) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="font-medium">Email Notifications</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={data.emailAlerts}
                  onChange={(e) => onChange("emailAlerts", e.target.checked)}
                  className="rounded" 
                />
                <span className="text-sm">System alerts</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={data.securityWarnings}
                  onChange={(e) => onChange("securityWarnings", e.target.checked)}
                  className="rounded" 
                />
                <span className="text-sm">Security warnings</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={data.weeklyReports}
                  onChange={(e) => onChange("weeklyReports", e.target.checked)}
                  className="rounded" 
                />
                <span className="text-sm">Weekly reports</span>
              </label>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Push Notifications</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={data.criticalAlerts}
                  onChange={(e) => onChange("criticalAlerts", e.target.checked)}
                  className="rounded" 
                />
                <span className="text-sm">Critical alerts</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={data.userActivities}
                  onChange={(e) => onChange("userActivities", e.target.checked)}
                  className="rounded" 
                />
                <span className="text-sm">User activities</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={data.marketingUpdates}
                  onChange={(e) => onChange("marketingUpdates", e.target.checked)}
                  className="rounded" 
                />
                <span className="text-sm">Marketing updates</span>
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Appearance Settings Component
function AppearanceSettings({ data, onChange }: { data: any, onChange: (field: string, value: string) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="h-5 w-5 mr-2" />
          Appearance & Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Theme
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["light", "dark", "auto"].map((theme) => (
              <label key={theme} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="theme" 
                  value={theme}
                  checked={data.theme === theme}
                  onChange={(e) => onChange("theme", e.target.value)}
                  className="text-blue-600" 
                />
                <span className="text-sm capitalize">{theme}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select 
            value={data.language}
            onChange={(e) => onChange("language", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="en-US">English (US)</option>
            <option value="en-UK">English (UK)</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select 
            value={data.timezone}
            onChange={(e) => onChange("timezone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="UTC-5">UTC-5 (Eastern Time)</option>
            <option value="UTC-6">UTC-6 (Central Time)</option>
            <option value="UTC-7">UTC-7 (Mountain Time)</option>
            <option value="UTC-8">UTC-8 (Pacific Time)</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}

// System Settings Component
function SystemSettings() {
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleBackup = async () => {
    setIsBackingUp(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsBackingUp(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="h-5 w-5 mr-2" />
          System Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Database Backup</h4>
            <p className="text-sm text-gray-600">Last backup: 2 hours ago</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleBackup}
            disabled={isBackingUp}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isBackingUp ? 'animate-spin' : ''}`} />
            {isBackingUp ? "Backing up..." : "Backup Now"}
          </Button>
        </div>
        
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">System Logs</h4>
            <p className="text-sm text-gray-600">View and download system logs</p>
          </div>
          <Button variant="outline" size="sm">View Logs</Button>
        </div>
        
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Cache Management</h4>
            <p className="text-sm text-gray-600">Clear application cache</p>
          </div>
          <Button variant="outline" size="sm">Clear Cache</Button>
        </div>
      </CardContent>
    </Card>
  );
}
