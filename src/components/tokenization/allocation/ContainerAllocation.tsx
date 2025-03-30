
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ContainerAllocation } from './types';

interface ContainerAllocationTabsProps {
  containerAllocations: ContainerAllocation[];
}

export const ContainerAllocationTabs: React.FC<ContainerAllocationTabsProps> = ({ containerAllocations }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Container-Specific Allocation</CardTitle>
        <CardDescription>Detailed breakdown of fund usage per container</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="container1">
          <TabsList className="grid grid-cols-3 mb-6">
            {containerAllocations.map((container) => (
              <TabsTrigger key={container.id} value={`container${container.id}`}>
                {container.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {containerAllocations.map((container) => (
            <TabsContent key={container.id} value={`container${container.id}`}>
              <div className="space-y-4">
                {container.allocations.map((allocation, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{allocation.category}</span>
                      <div className="text-right">
                        <span className="text-sm">{allocation.percentage}%</span>
                        <p className="text-xs text-muted-foreground">
                          IDR {(allocation.amount).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Progress value={allocation.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
