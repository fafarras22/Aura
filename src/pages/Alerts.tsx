
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, ChevronDown, AlertCircle, Filter, Calendar, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppleButton } from '@/components/ui/apple-button';

type AlertSeverity = 'warning' | 'error' | 'info';

interface Alert {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  severity: AlertSeverity;
  containerNumber: string;
  resolved: boolean;
}

const Alerts = () => {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [smsNotifications, setSmsNotifications] = useState<boolean>(false);
  const [currentAlerts, setCurrentAlerts] = useState<Alert[]>(mockAlerts);

  const resolveAlert = (id: string) => {
    setCurrentAlerts(currentAlerts.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
  };

  const filteredAlerts = currentAlerts.filter(alert => {
    if (selectedTab === "resolved") return alert.resolved;
    if (selectedTab === "unresolved") return !alert.resolved;
    if (selectedTab === "critical") return alert.severity === "error" && !alert.resolved;
    return true;
  });

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Monitor system alerts and manage your notification preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Alerts</DialogTitle>
                <DialogDescription>
                  Customize which alerts you want to see.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="col-span-2">Time Range</Label>
                  <Select defaultValue="today">
                    <SelectTrigger className="col-span-2">
                      <SelectValue placeholder="Select Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Last 7 days</SelectItem>
                      <SelectItem value="month">Last 30 days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="col-span-2">Severity</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="col-span-2">
                      <SelectValue placeholder="Select Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="error">Critical</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="info">Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="col-span-2">Container</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="col-span-2">
                      <SelectValue placeholder="Select Container" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Containers</SelectItem>
                      <SelectItem value="c001">Container 001</SelectItem>
                      <SelectItem value="c002">Container 002</SelectItem>
                      <SelectItem value="c003">Container 003</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Apply Filters</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Bell size={16} />
                Alert Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Alert Settings</DialogTitle>
                <DialogDescription>
                  Customize how you receive alerts and notifications.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <Switch 
                    id="notifications" 
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    disabled={!notificationsEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <Switch 
                    id="sms-notifications" 
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                    disabled={!notificationsEnabled}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="col-span-2">Minimum Alert Level</Label>
                  <Select defaultValue="warning">
                    <SelectTrigger className="col-span-2">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Information</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Settings</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedTab} className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center pt-10 pb-10">
                <CheckCircle size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Alerts Found</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  There are no alerts matching your current filter criteria. Adjust your filters or check back later.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAlerts.map(alert => (
              <AlertCard 
                key={alert.id} 
                alert={alert} 
                onResolve={() => resolveAlert(alert.id)} 
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AlertCard = ({ alert, onResolve }: { alert: Alert, onResolve: () => void }) => {
  const getBadgeVariant = (severity: AlertSeverity) => {
    switch (severity) {
      case "error": return "destructive";
      case "warning": return "warning";
      case "info": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <Card className={`${alert.resolved ? 'opacity-70' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle size={16} className={`${
                alert.severity === "error" ? "text-destructive" : 
                alert.severity === "warning" ? "text-amber-500" : "text-blue-500"
              }`} />
              {alert.title}
            </CardTitle>
            <CardDescription className="flex items-center mt-1 gap-2">
              <span>Container {alert.containerNumber}</span>
              <span>•</span>
              <span>{alert.timestamp.toLocaleString()}</span>
            </CardDescription>
          </div>
          <Badge variant={getBadgeVariant(alert.severity)}>
            {alert.severity.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{alert.message}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button variant="ghost" size="sm" className="gap-1">
          <Calendar size={14} />
          View History
        </Button>
        {!alert.resolved && (
          <AppleButton onClick={onResolve} size="sm" variant="green">
            Mark as Resolved
          </AppleButton>
        )}
      </CardFooter>
    </Card>
  );
};

// Mock data
const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "Temperature Exceeds Threshold",
    message: "Container 001 has recorded a temperature of 32°C, exceeding the safe threshold of 28°C for current crops.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    severity: "error",
    containerNumber: "001",
    resolved: false
  },
  {
    id: "2",
    title: "Water Level Low",
    message: "Container 002 water reservoir is at 15% capacity. Refill recommended within the next 12 hours.",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    severity: "warning",
    containerNumber: "002",
    resolved: false
  },
  {
    id: "3",
    title: "CO2 Level Warning",
    message: "Container 001 CO2 levels have been fluctuating between 600-1000 ppm over the last 6 hours.",
    timestamp: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
    severity: "warning",
    containerNumber: "001",
    resolved: true
  },
  {
    id: "4",
    title: "System Maintenance Complete",
    message: "Scheduled maintenance on Container 003 completed successfully. All systems operational.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    severity: "info",
    containerNumber: "003",
    resolved: true
  },
  {
    id: "5",
    title: "Humidity Level Critical",
    message: "Container 002 humidity has dropped to 30%, significantly below the 50-60% required range.",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    severity: "error",
    containerNumber: "002",
    resolved: false
  }
];

export default Alerts;
