import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getMockAlerts } from "@/services/mockDataService";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Bell, BellOff, Info, AlertTriangle, AlertCircle, Check, Mail, Smartphone, Users, History } from "lucide-react";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const Alerts = () => {
  const { isDeveloperMode } = useDeveloperMode();
  const alerts = getMockAlerts();
  const { toast } = useToast();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState(true);
  
  // Filter by alert type
  const infoAlerts = alerts.filter(alert => alert.type === 'info');
  const warningAlerts = alerts.filter(alert => alert.type === 'warning');
  const errorAlerts = alerts.filter(alert => alert.type === 'error');

  const getAlertIcon = (type: 'info' | 'warning' | 'error') => {
    switch (type) {
      case 'info': return <Info className="h-5 w-5" />;
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
      case 'error': return <AlertCircle className="h-5 w-5" />;
    }
  };

  const handleClearAll = () => {
    toast({
      title: "All Alerts Cleared",
      description: "All alerts have been marked as read.",
    });
  };

  const handleTestAlarm = () => {
    toast({
      variant: "destructive",
      title: "Test Alarm Triggered",
      description: "This is a test of the alarm system. No action needed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">System Alerts</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleClearAll}>
            <Check className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          {isDeveloperMode && (
            <Button variant="destructive" onClick={handleTestAlarm}>
              Test Alarm
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium flex items-center">
              <Info className="mr-2 h-5 w-5 text-blue-500" />
              Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{infoAlerts.length}</div>
            <p className="text-sm text-muted-foreground">System information and updates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warningAlerts.length}</div>
            <p className="text-sm text-muted-foreground">Conditions needing attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
              Critical
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{errorAlerts.length}</div>
            <p className="text-sm text-muted-foreground">Issues requiring immediate action</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure how you receive alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <Label htmlFor="notifications">Push Notifications</Label>
              </div>
              <Switch 
                id="notifications" 
                checked={notificationsEnabled} 
                onCheckedChange={setNotificationsEnabled} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <Label htmlFor="email">Email Alerts</Label>
              </div>
              <Switch 
                id="email" 
                checked={emailAlertsEnabled} 
                onCheckedChange={setEmailAlertsEnabled} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <Label htmlFor="sms">SMS Alerts</Label>
              </div>
              <Switch 
                id="sms" 
                checked={smsAlertsEnabled} 
                onCheckedChange={setSmsAlertsEnabled} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>History of system alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <BellOff className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <p className="mt-2 text-muted-foreground">No alerts to display</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map(alert => (
                <Alert key={alert.id} variant={
                  alert.type === 'error' ? 'destructive' : 
                  alert.type === 'warning' ? 'default' : 'default'
                }>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div>
                        <AlertTitle className="flex items-center gap-2">
                          {alert.title}
                          {!alert.isRead && <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800">New</Badge>}
                        </AlertTitle>
                        <AlertDescription className="mt-1">{alert.message}</AlertDescription>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline">{alert.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(parseISO(alert.timestamp), 'MMM d, h:mm a')}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isDeveloperMode && (
                      <Button size="sm" variant="ghost">Resolve</Button>
                    )}
                  </div>
                </Alert>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {isDeveloperMode && (
        <Card className="border-dashed border-2 border-yellow-300">
          <CardHeader>
            <CardTitle>Alert System Configuration (Admin Only)</CardTitle>
            <CardDescription>Advanced settings for the alert system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Configure Alert Thresholds
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Alert Recipients
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <History className="mr-2 h-4 w-4" />
                  View Alert Logs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Alerts;
