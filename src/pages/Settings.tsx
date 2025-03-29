
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { useToast } from "@/hooks/use-toast";
import { Bell, Building, Key, Lock, Mail, RefreshCw, Save, Settings as SettingsIcon, User, Users } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const { isDeveloperMode } = useDeveloperMode();
  const { toast } = useToast();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [timezone, setTimezone] = useState("Asia/Jakarta");
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        
        {isDeveloperMode && (
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" /> Save All Settings
          </Button>
        )}
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          {isDeveloperMode && <TabsTrigger value="system">System Config</TabsTrigger>}
          {isDeveloperMode && <TabsTrigger value="users">User Management</TabsTrigger>}
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <SettingsIcon className="mr-2 h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Configure your AKAR FarmWatch general preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="farmName">Farm Name</Label>
                  <Input 
                    id="farmName" 
                    defaultValue="AKAR Vertical Farm - Jakarta" 
                    disabled={!isDeveloperMode}
                  />
                </div>
                
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!isDeveloperMode}
                  >
                    <option value="Asia/Jakarta">Asia/Jakarta (GMT+7)</option>
                    <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                    <option value="Asia/Hong_Kong">Asia/Hong Kong (GMT+8)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select 
                    id="language"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="en">English</option>
                    <option value="id">Bahasa Indonesia</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <div className="text-sm text-muted-foreground">
                      Enable dark mode for the interface
                    </div>
                  </div>
                  <Switch id="dark-mode" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={!isDeveloperMode}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure how you receive alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications about important farm events
                  </div>
                </div>
                <Switch 
                  id="notifications" 
                  checked={notificationsEnabled} 
                  onCheckedChange={setNotificationsEnabled} 
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-alerts">Email Alerts</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive alerts via email
                    </div>
                  </div>
                  <Switch 
                    id="email-alerts" 
                    checked={emailAlerts} 
                    onCheckedChange={setEmailAlerts}
                    disabled={!notificationsEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-alerts">SMS Alerts</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive alerts via SMS
                    </div>
                  </div>
                  <Switch 
                    id="sms-alerts" 
                    checked={smsAlerts} 
                    onCheckedChange={setSmsAlerts}
                    disabled={!notificationsEnabled}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="alert-email">Alert Email</Label>
                <Input 
                  id="alert-email" 
                  type="email" 
                  placeholder="you@example.com" 
                  disabled={!notificationsEnabled || !emailAlerts}
                />
              </div>
              
              <div>
                <Label htmlFor="alert-phone">Phone Number (for SMS)</Label>
                <Input 
                  id="alert-phone" 
                  type="tel" 
                  placeholder="+62..." 
                  disabled={!notificationsEnabled || !smsAlerts}
                />
              </div>
              
              <div>
                <Label>Alert Priority</Label>
                <div className="pt-2">
                  <Slider 
                    defaultValue={[2]} 
                    max={3} 
                    step={1}
                    disabled={!notificationsEnabled}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Low (information only)</span>
                    <span>Medium (warnings)</span>
                    <span>High (all alerts)</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Account Settings
              </CardTitle>
              <CardDescription>
                Update your account information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="AKAR Farm User" />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="user@example.com" />
                </div>
                
                <div className="flex items-center gap-4">
                  <Button variant="outline">
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input 
                  id="companyName" 
                  defaultValue="AKAR Vertical Farming" 
                  disabled={!isDeveloperMode}
                />
              </div>
              
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input 
                  id="contactEmail" 
                  type="email" 
                  defaultValue="contact@akar.com" 
                  disabled={!isDeveloperMode}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* System Config Tab - Admin Only */}
        {isDeveloperMode && (
          <TabsContent value="system" className="space-y-4 mt-6">
            <Card className="border-dashed border-2 border-yellow-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SettingsIcon className="mr-2 h-5 w-5" />
                  System Configuration (Admin Only)
                </CardTitle>
                <CardDescription>
                  Advanced system configuration settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="apiUrl">API Endpoint URL</Label>
                    <Input id="apiUrl" defaultValue="https://api.akar-farm.com/v1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex">
                      <Input 
                        id="apiKey" 
                        type="password" 
                        defaultValue="••••••••••••••••" 
                        className="rounded-r-none"
                      />
                      <Button variant="secondary" className="rounded-l-none">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="debug-mode">Debug Mode</Label>
                      <div className="text-sm text-muted-foreground">
                        Enable detailed logging for troubleshooting
                      </div>
                    </div>
                    <Switch id="debug-mode" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="backup-enabled">Automatic Backups</Label>
                      <div className="text-sm text-muted-foreground">
                        Enable automatic data backups
                      </div>
                    </div>
                    <Switch id="backup-enabled" defaultChecked />
                  </div>
                  
                  <div>
                    <Label htmlFor="sensor-interval">Sensor Polling Interval (seconds)</Label>
                    <Input id="sensor-interval" type="number" defaultValue="30" min="5" max="3600" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>
                  Save System Configuration
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
        
        {/* User Management Tab - Admin Only */}
        {isDeveloperMode && (
          <TabsContent value="users" className="space-y-4 mt-6">
            <Card className="border-dashed border-2 border-yellow-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  User Management (Admin Only)
                </CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md divide-y">
                    {/* User 1 */}
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">AKAR Admin</div>
                        <div className="text-sm text-muted-foreground">admin@akar.com</div>
                        <div className="text-xs mt-1">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                            Administrator
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    
                    {/* User 2 */}
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Farm Manager</div>
                        <div className="text-sm text-muted-foreground">manager@akar.com</div>
                        <div className="text-xs mt-1">
                          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            Manager
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    
                    {/* User 3 */}
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Client User</div>
                        <div className="text-sm text-muted-foreground">client@example.com</div>
                        <div className="text-xs mt-1">
                          <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                            Client
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <Key className="mr-2 h-4 w-4" />
                    Add New User
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Settings;
