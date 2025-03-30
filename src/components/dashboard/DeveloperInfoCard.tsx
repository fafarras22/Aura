
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

export const DeveloperInfoCard: React.FC = () => {
  return (
    <Card className="border-dashed border-2 border-yellow-300 rounded-xl overflow-hidden">
      <CardHeader>
        <CardTitle>Developer Information</CardTitle>
        <CardDescription>Additional information for AKAR technicians</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="font-medium">System Uptime:</div>
            <div>124 days, 7 hours, 32 minutes</div>
            <div className="font-medium">Last Maintenance:</div>
            <div>2023-06-15</div>
            <div className="font-medium">Next Scheduled Maintenance:</div>
            <div>2023-08-15</div>
            <div className="font-medium">Container ID:</div>
            <div>AKAR-40-001-JAK</div>
            <div className="font-medium">Firmware Version:</div>
            <div>v2.3.1</div>
            <div className="font-medium">Security Status:</div>
            <div className="flex items-center text-green-600">
              <Lock className="w-4 h-4 mr-1" /> Secured
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
