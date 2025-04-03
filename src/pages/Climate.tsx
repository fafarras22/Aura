import React, { useState } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ClimateMonitoringCard } from "@/components/dashboard/ClimateMonitoringCard";
import { AlertCircle } from "lucide-react";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { getMockClimateData } from "@/services/mock-data";

const Climate = () => {
  const { isDeveloperMode } = useDeveloperMode();
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  // Get climate data
  const climateData = getMockClimateData();
  
  return (
    <div className="space-y-6">
      <AppHeader setShowWalletModal={setShowWalletModal} />
      <div className="pt-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Climate Control</h1>
            <p className="text-sm text-muted-foreground">
              Monitor and manage your container's climate systems
            </p>
          </div>
          
          <Badge variant={climateData.status === 'normal' ? 'success' : 'secondary'} className="capitalize">
            {climateData.status}
          </Badge>
        </div>
        
        {isDeveloperMode && (
          <Alert className="my-4 bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-900 dark:text-amber-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-sm font-medium">Developer Mode Active</AlertTitle>
            <AlertDescription className="text-xs">
              You are viewing aggregated climate data from all containers. In normal mode, only your container's data would be visible.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="overview" className="space-y-6 mt-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="humidity">Humidity</TabsTrigger>
            <TabsTrigger value="co2">CO₂ Levels</TabsTrigger>
            <TabsTrigger value="light">Light</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Climate Overview</CardTitle>
                  <CardDescription>
                    Full climate data from all sensors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ClimateMonitoringCard climateData={climateData} />
                </CardContent>
              </Card>
              
              {/* Additional climate control UI could be added here */}
            </div>
          </TabsContent>
          
          <TabsContent value="temperature">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Management</CardTitle>
                <CardDescription>
                  Monitor and control container temperature
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Temperature specific content */}
                <p>Temperature specific controls and data would go here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tab contents would go here */}
        </Tabs>
      </div>
    </div>
  );
};

export default Climate;
