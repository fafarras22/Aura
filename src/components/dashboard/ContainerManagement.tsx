
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, AlertTriangle, ArrowDownToLine, Check, MoreVertical } from "lucide-react";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from 'date-fns';

export function ContainerManagement() {
  const { getContainerData, toggleContainerOperation, sendPaymentReminder, isDeveloperMode } = useDeveloperMode();
  const allContainers = getContainerData();
  
  // Don't show this component for non-admin users
  if (!isDeveloperMode) {
    return null;
  }

  return (
    <Card className="border-yellow-200 dark:border-yellow-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
          Container Management (Admin Only)
        </CardTitle>
        <CardDescription>
          Monitor and control all container operations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allContainers.map((container) => (
            <div key={container.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{container.name}</div>
                <div className="text-sm text-muted-foreground">Owner: {container.owner}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant={
                      container.status === 'active' ? 'success' :
                      container.status === 'maintenance' ? 'secondary' : 'destructive'
                    }
                  >
                    {container.status}
                  </Badge>
                  {container.nextPaymentDue && new Date(container.nextPaymentDue) < new Date() && (
                    <Badge variant="destructive">Payment Overdue</Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground">Next Payment</span>
                  <span className="font-medium">
                    {container.nextPaymentDue 
                      ? format(new Date(container.nextPaymentDue), 'MMM dd, yyyy') 
                      : 'N/A'}
                  </span>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={() => toggleContainerOperation(container.id, container.status !== 'active')}
                    >
                      {container.status === 'active' ? 'Deactivate' : 'Activate'} Container
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => sendPaymentReminder(container.id)}>
                      Send Payment Reminder
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Switch 
                  checked={container.status === 'active'} 
                  onCheckedChange={(checked) => toggleContainerOperation(container.id, checked)}
                  aria-label="Toggle container status"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" size="sm">
          <ArrowDownToLine className="w-4 h-4 mr-2" />
          Export Report
        </Button>
        <Button size="sm">
          <Check className="w-4 h-4 mr-2" />
          Apply Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
