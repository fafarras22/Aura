
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Save, RefreshCw, Bell, Clock, Database, Globe, Server } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SystemSettingsForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settingsTab, setSettingsTab] = useState("general");
  
  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    farmName: "AKAR Vertical Farm - Jakarta",
    companyName: "PT Tumbuh Dimana Sadja",
    contactEmail: "contact@akar.com",
    timezone: "Asia/Jakarta",
    language: "en",
    darkMode: false
  });
  
  // API settings
  const [apiSettings, setApiSettings] = useState({
    apiUrl: "https://api.akar-farm.com/v1",
    apiKey: "••••••••••••••••",
    debugMode: false,
    autoBackup: true,
    sensorPollingInterval: 30
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    enableNotifications: true,
    emailAlerts: true,
    smsAlerts: false,
    alertEmail: "alerts@akar.com",
    alertPhone: "+62812345678",
    alertPriority: 2
  });
  
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('system_settings')
          .select('*')
          .single();
          
        if (error && error.code !== 'PGRST116') {
          // PGRST116 means no rows returned, which is fine for initial setup
          throw error;
        }
        
        if (data) {
          // Update state with fetched settings
          setGeneralSettings({
            farmName: data.farm_name || generalSettings.farmName,
            companyName: data.company_name || generalSettings.companyName,
            contactEmail: data.contact_email || generalSettings.contactEmail,
            timezone: data.timezone || generalSettings.timezone,
            language: data.language || generalSettings.language,
            darkMode: data.dark_mode || generalSettings.darkMode
          });
          
          setApiSettings({
            apiUrl: data.api_url || apiSettings.apiUrl,
            apiKey: data.api_key ? "••••••••••••••••" : apiSettings.apiKey,
            debugMode: data.debug_mode || apiSettings.debugMode,
            autoBackup: data.auto_backup || apiSettings.autoBackup,
            sensorPollingInterval: data.sensor_polling_interval || apiSettings.sensorPollingInterval
          });
          
          setNotificationSettings({
            enableNotifications: data.enable_notifications || notificationSettings.enableNotifications,
            emailAlerts: data.email_alerts || notificationSettings.emailAlerts,
            smsAlerts: data.sms_alerts || notificationSettings.smsAlerts,
            alertEmail: data.alert_email || notificationSettings.alertEmail,
            alertPhone: data.alert_phone || notificationSettings.alertPhone,
            alertPriority: data.alert_priority || notificationSettings.alertPriority
          });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast({
          title: "Error fetching settings",
          description: "Please try again or check your connection.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, [toast]);
  
  const handleSaveSettings = async () => {
    setLoading(true);
    
    try {
      // Transform data for database
      const settingsData = {
        id: 1, // Use a static ID for system settings
        farm_name: generalSettings.farmName,
        company_name: generalSettings.companyName,
        contact_email: generalSettings.contactEmail,
        timezone: generalSettings.timezone,
        language: generalSettings.language,
        dark_mode: generalSettings.darkMode,
        
        api_url: apiSettings.apiUrl,
        api_key: apiSettings.apiKey !== "••••••••••••••••" ? apiSettings.apiKey : undefined, // Only update if changed
        debug_mode: apiSettings.debugMode,
        auto_backup: apiSettings.autoBackup,
        sensor_polling_interval: apiSettings.sensorPollingInterval,
        
        enable_notifications: notificationSettings.enableNotifications,
        email_alerts: notificationSettings.emailAlerts,
        sms_alerts: notificationSettings.smsAlerts,
        alert_email: notificationSettings.alertEmail,
        alert_phone: notificationSettings.alertPhone,
        alert_priority: notificationSettings.alertPriority,
        
        last_updated: new Date().toISOString()
      };
      
      // Save to Supabase using upsert
      const { error } = await supabase
        .from('system_settings')
        .upsert(settingsData);
        
      if (error) throw error;
      
      toast({
        title: "Settings saved",
        description: "Your system settings have been successfully updated.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error saving settings",
        description: "Please try again or check your connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default values? This action cannot be undone.")) {
      // Reset to default values (you could get these from a constant)
      setGeneralSettings({
        farmName: "AKAR Vertical Farm - Jakarta",
        companyName: "PT Tumbuh Dimana Sadja",
        contactEmail: "contact@akar.com",
        timezone: "Asia/Jakarta",
        language: "en",
        darkMode: false
      });
      
      setApiSettings({
        apiUrl: "https://api.akar-farm.com/v1",
        apiKey: "••••••••••••••••",
        debugMode: false,
        autoBackup: true,
        sensorPollingInterval: 30
      });
      
      setNotificationSettings({
        enableNotifications: true,
        emailAlerts: true,
        smsAlerts: false,
        alertEmail: "alerts@akar.com",
        alertPhone: "+62812345678",
        alertPriority: 2
      });
      
      toast({
        title: "Settings reset",
        description: "All settings have been reset to their default values.",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">System Settings</CardTitle>
        <CardDescription>
          Configure system-wide settings for AKAR FarmWatch.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={settingsTab} onValueChange={setSettingsTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">
              <Globe className="mr-2 h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="api">
              <Server className="mr-2 h-4 w-4" />
              API & System
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name</Label>
                <Input 
                  id="farmName" 
                  value={generalSettings.farmName}
                  onChange={(e) => setGeneralSettings({...generalSettings, farmName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input 
                  id="companyName" 
                  value={generalSettings.companyName}
                  onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input 
                id="contactEmail" 
                type="email"
                value={generalSettings.contactEmail}
                onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select 
                  value={generalSettings.timezone}
                  onValueChange={(value) => setGeneralSettings({...generalSettings, timezone: value})}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Jakarta">Asia/Jakarta (GMT+7)</SelectItem>
                    <SelectItem value="Asia/Singapore">Asia/Singapore (GMT+8)</SelectItem>
                    <SelectItem value="Asia/Hong_Kong">Asia/Hong Kong (GMT+8)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={generalSettings.language}
                  onValueChange={(value) => setGeneralSettings({...generalSettings, language: value})}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="darkMode">Dark Mode</Label>
                <div className="text-sm text-muted-foreground">
                  Enable dark mode for the interface
                </div>
              </div>
              <Switch 
                id="darkMode" 
                checked={generalSettings.darkMode}
                onCheckedChange={(checked) => setGeneralSettings({...generalSettings, darkMode: checked})}
              />
            </div>
          </TabsContent>
          
          {/* API Settings */}
          <TabsContent value="api" className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="apiUrl">API Endpoint URL</Label>
              <Input 
                id="apiUrl" 
                value={apiSettings.apiUrl}
                onChange={(e) => setApiSettings({...apiSettings, apiUrl: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex">
                <Input 
                  id="apiKey" 
                  type="password" 
                  value={apiSettings.apiKey}
                  onChange={(e) => setApiSettings({...apiSettings, apiKey: e.target.value})}
                  className="rounded-r-none"
                />
                <Button 
                  variant="secondary" 
                  className="rounded-l-none"
                  onClick={() => {
                    setApiSettings({...apiSettings, apiKey: Math.random().toString(36).substring(2, 15)});
                    toast({
                      title: "API Key Regenerated",
                      description: "Remember to save your settings to apply this change.",
                    });
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sensorPollingInterval">Sensor Polling Interval (seconds)</Label>
              <Input 
                id="sensorPollingInterval" 
                type="number"
                min="5"
                max="3600"
                value={apiSettings.sensorPollingInterval}
                onChange={(e) => setApiSettings({...apiSettings, sensorPollingInterval: parseInt(e.target.value)})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="debugMode">Debug Mode</Label>
                <div className="text-sm text-muted-foreground">
                  Enable detailed logging for troubleshooting
                </div>
              </div>
              <Switch 
                id="debugMode" 
                checked={apiSettings.debugMode}
                onCheckedChange={(checked) => setApiSettings({...apiSettings, debugMode: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoBackup">Automatic Backups</Label>
                <div className="text-sm text-muted-foreground">
                  Enable automatic data backups
                </div>
              </div>
              <Switch 
                id="autoBackup" 
                checked={apiSettings.autoBackup}
                onCheckedChange={(checked) => setApiSettings({...apiSettings, autoBackup: checked})}
              />
            </div>
            
            <div className="p-4 bg-muted/40 rounded-md">
              <h3 className="font-medium mb-2 flex items-center">
                <Database className="mr-2 h-4 w-4" />
                Database Information
              </h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Database Type:</span>
                  <span>PostgreSQL (Supabase)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Connection Status:</span>
                  <span className="text-green-500">Connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Backup:</span>
                  <span>Today, 04:30 AM</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableNotifications">Enable Notifications</Label>
                <div className="text-sm text-muted-foreground">
                  Receive notifications about important farm events
                </div>
              </div>
              <Switch 
                id="enableNotifications" 
                checked={notificationSettings.enableNotifications}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, enableNotifications: checked})}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailAlerts">Email Alerts</Label>
                <div className="text-sm text-muted-foreground">
                  Receive alerts via email
                </div>
              </div>
              <Switch 
                id="emailAlerts" 
                checked={notificationSettings.emailAlerts}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailAlerts: checked})}
                disabled={!notificationSettings.enableNotifications}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alertEmail">Alert Email</Label>
              <Input 
                id="alertEmail" 
                type="email"
                value={notificationSettings.alertEmail}
                onChange={(e) => setNotificationSettings({...notificationSettings, alertEmail: e.target.value})}
                disabled={!notificationSettings.enableNotifications || !notificationSettings.emailAlerts}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="smsAlerts">SMS Alerts</Label>
                <div className="text-sm text-muted-foreground">
                  Receive alerts via SMS
                </div>
              </div>
              <Switch 
                id="smsAlerts" 
                checked={notificationSettings.smsAlerts}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsAlerts: checked})}
                disabled={!notificationSettings.enableNotifications}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alertPhone">Phone Number (for SMS)</Label>
              <Input 
                id="alertPhone" 
                type="tel"
                value={notificationSettings.alertPhone}
                onChange={(e) => setNotificationSettings({...notificationSettings, alertPhone: e.target.value})}
                disabled={!notificationSettings.enableNotifications || !notificationSettings.smsAlerts}
                placeholder="+62..."
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="alertPriority">Alert Priority</Label>
              <Select 
                value={notificationSettings.alertPriority.toString()}
                onValueChange={(value) => setNotificationSettings({...notificationSettings, alertPriority: parseInt(value)})}
                disabled={!notificationSettings.enableNotifications}
              >
                <SelectTrigger id="alertPriority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Low (information only)</SelectItem>
                  <SelectItem value="2">Medium (warnings)</SelectItem>
                  <SelectItem value="3">High (all alerts)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-4 bg-muted/40 rounded-md">
              <h3 className="font-medium mb-2 flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Notification Schedule
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="daily-digest" className="rounded" defaultChecked />
                  <Label htmlFor="daily-digest" className="text-sm">Send daily digest at 8:00 AM</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="critical-alerts" className="rounded" defaultChecked />
                  <Label htmlFor="critical-alerts" className="text-sm">Send critical alerts immediately</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="weekly-summary" className="rounded" defaultChecked />
                  <Label htmlFor="weekly-summary" className="text-sm">Send weekly summary on Monday</Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleResetSettings}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset to Default
        </Button>
        <Button onClick={handleSaveSettings} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
};
