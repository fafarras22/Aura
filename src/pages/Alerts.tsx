
import React, { useState } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  MoreVertical, 
  Filter 
} from "lucide-react";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Alert, getMockAlerts } from "@/services/mock-data";

const Alerts = () => {
  const { isDeveloperMode } = useDeveloperMode();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Get alert data
  const alerts = getMockAlerts();
  
  // Filter alerts based on active filter
  const filteredAlerts = activeFilter === "all" 
    ? alerts 
    : alerts.filter(alert => {
        if (activeFilter === "unread") return !alert.isRead;
        return alert.type === activeFilter;
      });
  
  // Get alert icon based on type
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  // Get badge variant based on alert type
  const getAlertVariant = (type: string) => {
    switch (type) {
      case "warning":
        return "secondary"; // using secondary instead of warning
      case "error":
        return "destructive";
      case "info":
      default:
        return "default";
    }
  };
  
  return (
    <div className="space-y-6">
      <AppHeader setShowWalletModal={setShowWalletModal} />
      <div className="pt-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Alerts & Notifications</h1>
            <p className="text-sm text-muted-foreground">
              Stay updated with important events and alerts from your containers
            </p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setActiveFilter("all")}>
                All Alerts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("unread")}>
                Unread Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("error")}>
                Critical Alerts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("warning")}>
                Warnings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("info")}>
                Information
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alerts
            </CardTitle>
            <CardDescription>
              {filteredAlerts.length} {activeFilter !== "all" ? activeFilter : ""} alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredAlerts.length > 0 ? (
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className={`p-4 border rounded-lg ${!alert.isRead ? "bg-muted/30" : ""}`}
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{alert.title}</h3>
                            <Badge variant={getAlertVariant(alert.type)} className="capitalize">
                              {alert.type}
                            </Badge>
                            {!alert.isRead && (
                              <span className="h-2 w-2 rounded-full bg-blue-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {alert.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <span>Container: {alert.containerNumber}</span>
                            <span>•</span>
                            <span>
                              {typeof alert.timestamp === 'string' 
                                ? alert.timestamp 
                                : new Date(alert.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark as {alert.isRead ? "unread" : "read"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Dismiss</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-3" />
                <h3 className="text-lg font-medium">No alerts found</h3>
                <p className="text-muted-foreground">
                  There are no {activeFilter !== "all" ? activeFilter : ""} alerts at this time
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;
