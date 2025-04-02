
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ContainerData } from "./types";
import {
  ContainerNameField,
  ContainerOwnerField,
  ContainerStatusField,
  ContainerLocationField,
  ContainerPaymentDateField,
  ContainerYieldField,
  ContainerActiveToggleField
} from "./form-fields";

interface ContainerCardProps {
  container: Partial<ContainerData>;
  index: number;
  onUpdate: (id: string, field: keyof ContainerData, value: any) => void;
  onRemove: (id: string) => void;
}

export const ContainerCard = ({ 
  container, 
  index, 
  onUpdate, 
  onRemove 
}: ContainerCardProps) => {
  return (
    <Card className="border-dashed">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Container {index + 1}</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onRemove(container.id!)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ContainerNameField 
            id={`container-name-${container.id}`}
            value={container.name || ''}
            onChange={(value) => onUpdate(container.id!, 'name', value)}
          />
          
          <ContainerOwnerField 
            id={`owner-${container.id}`}
            value={container.owner || ''}
            onChange={(value) => onUpdate(container.id!, 'owner', value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ContainerStatusField 
            id={`status-${container.id}`}
            value={container.status || ''}
            onChange={(value) => onUpdate(container.id!, 'status', value)}
          />
          
          <ContainerLocationField 
            id={`location-${container.id}`}
            value={container.location || ''}
            onChange={(value) => onUpdate(container.id!, 'location', value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ContainerPaymentDateField 
            id={`next-payment-${container.id}`}
            value={container.nextPaymentDue}
            onChange={(value) => onUpdate(container.id!, 'nextPaymentDue', value)}
          />
          
          <ContainerYieldField 
            id={`current-yield-${container.id}`}
            label="Current Yield"
            value={container.currentYield || 0}
            onChange={(value) => onUpdate(container.id!, 'currentYield', value)}
          />
          
          <ContainerYieldField 
            id={`projected-yield-${container.id}`}
            label="Projected Yield"
            value={container.projectedYield || 0}
            onChange={(value) => onUpdate(container.id!, 'projectedYield', value)}
          />
        </div>
        
        <ContainerActiveToggleField 
          id={`active-switch-${container.id}`}
          value={container.status || ''}
          onChange={(value) => onUpdate(container.id!, 'status', value)}
        />
      </CardContent>
    </Card>
  );
};
