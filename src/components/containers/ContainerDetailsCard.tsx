
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Thermometer, Droplet, Activity, LineChart, Plant, Clock, Users, CoinsIcon } from "lucide-react";
import { ContainerProject } from './ContainerCard';
import { ProjectStats } from '@/services/mock-data/containerProjects';

interface ContainerDetailsCardProps {
  container: ContainerProject & { details?: ProjectStats };
  onStake: (containerId: string) => void;
}

export const ContainerDetailsCard: React.FC<ContainerDetailsCardProps> = ({ 
  container,
  onStake
}) => {
  const { details } = container;
  const percentFilled = (container.filledTokens / container.totalTokens) * 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      maximumFractionDigits: 0 
    }).format(value);
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{container.name}</CardTitle>
            <CardDescription>{container.description}</CardDescription>
          </div>
          <Badge variant={
            container.status === 'live' ? "default" : 
            container.status === 'ico' ? "secondary" : 
            container.status === 'upcoming' ? "outline" : 
            "destructive"
          }>
            {container.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <div className="flex justify-between px-6 py-2 border-y">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Total Tokens</div>
          <div className="font-bold">{container.totalTokens.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">APY</div>
          <div className="font-bold text-green-600">{container.apy}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Runtime</div>
          <div className="font-bold">{container.runtimeDays} days</div>
        </div>
      </div>
      
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="sensors" className="flex-1">Sensors</TabsTrigger>
            <TabsTrigger value="climate" className="flex-1">Climate</TabsTrigger>
            <TabsTrigger value="staking" className="flex-1">Staking</TabsTrigger>
          </TabsList>
          
          <div className="p-4">
            <TabsContent value="overview" className="mt-0">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Funding Progress</span>
                    <span className="text-sm font-medium">{percentFilled.toFixed(1)}%</span>
                  </div>
                  <Progress value={percentFilled} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{container.filledTokens.toLocaleString()} tokens sold</span>
                    <span>{(container.totalTokens - container.filledTokens).toLocaleString()} remaining</span>
                  </div>
                </div>
                
                {details && details.salesData && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center">
                      <LineChart className="w-4 h-4 mr-1" /> Sales Performance
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-muted p-2 rounded-md">
                        <div className="text-xs text-muted-foreground">Monthly</div>
                        <div className="font-medium">{formatCurrency(details.salesData.monthly)}</div>
                      </div>
                      <div className="bg-muted p-2 rounded-md">
                        <div className="text-xs text-muted-foreground">Total</div>
                        <div className="font-medium">{formatCurrency(details.salesData.total)}</div>
                      </div>
                      <div className="bg-muted p-2 rounded-md">
                        <div className="text-xs text-muted-foreground">Growth</div>
                        <div className="font-medium text-green-600">{details.salesData.growth}%</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="sensors" className="mt-0">
              {details && details.sensors ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted p-3 rounded-md flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Thermometer className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Temperature</div>
                      <div className="font-medium">{details.sensors.temperature}°C</div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Droplet className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Humidity</div>
                      <div className="font-medium">{details.sensors.humidity}%</div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md flex items-center">
                    <div className="bg-cyan-100 p-2 rounded-full mr-3">
                      <Droplet className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Water Level</div>
                      <div className="font-medium">{details.sensors.waterLevel}%</div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md flex items-center">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <Activity className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">pH Level</div>
                      <div className="font-medium">{details.sensors.ph}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  Sensor data not available
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="climate" className="mt-0">
              {details && details.climateInfo ? (
                <div className="space-y-4">
                  <div className="bg-muted p-3 rounded-md">
                    <div className="flex items-center mb-2">
                      <Thermometer className="w-5 h-5 mr-2 text-orange-500" />
                      <div className="font-medium">Optimal Temperature</div>
                    </div>
                    <div className="text-lg ml-7">{details.climateInfo.optimalTemperature}</div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md">
                    <div className="flex items-center mb-2">
                      <Plant className="w-5 h-5 mr-2 text-green-500" />
                      <div className="font-medium">Light Hours</div>
                    </div>
                    <div className="text-lg ml-7">{details.climateInfo.lightHours} hours daily</div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md">
                    <div className="flex items-center mb-2">
                      <Droplet className="w-5 h-5 mr-2 text-blue-500" />
                      <div className="font-medium">Water Consumption</div>
                    </div>
                    <div className="text-lg ml-7">{details.climateInfo.waterConsumption}</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  Climate data not available
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="staking" className="mt-0">
              {details && details.stakingInfo ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted p-3 rounded-md">
                      <div className="text-xs text-muted-foreground">Total stAKR</div>
                      <div className="text-lg font-medium">{details.stakingInfo.totalStaked.toLocaleString()}</div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <div className="text-xs text-muted-foreground">APY</div>
                      <div className="text-lg font-medium text-green-600">{details.stakingInfo.apy}%</div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md flex justify-between items-center">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-purple-500" />
                      <div>
                        <div className="text-xs text-muted-foreground">Token Holders</div>
                        <div className="font-medium">{details.stakingInfo.holders}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-500" />
                      <div>
                        <div className="text-xs text-muted-foreground">Harvest Cycle</div>
                        <div className="font-medium">{details.stakingInfo.harvestTime}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 p-3 rounded-md">
                    <div className="flex items-center mb-2">
                      <CoinsIcon className="w-5 h-5 mr-2 text-primary" />
                      <div className="font-medium">Staking Rewards</div>
                    </div>
                    <div className="text-sm ml-7">
                      Stake your $AKR tokens to earn {container.apy}% APY paid in $AKR tokens.
                      Rewards are distributed {details.stakingInfo.harvestTime.toLowerCase()}.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  Staking data not available
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
      
      <CardFooter className="px-6 py-4 border-t">
        <Button 
          onClick={() => onStake(container.id)} 
          className="w-full"
          variant={container.status === 'live' || container.status === 'ico' ? "default" : "outline"}
          disabled={container.status === 'completed'}
        >
          {container.status === 'live' ? 'Invest Now' : 
           container.status === 'ico' ? 'Join ICO' : 
           container.status === 'upcoming' ? 'Set Reminder' : 
           'Completed'}
        </Button>
      </CardFooter>
    </Card>
  );
};
