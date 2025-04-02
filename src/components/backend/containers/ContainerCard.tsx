
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContainerData } from "./types";

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
          <div>
            <Label htmlFor={`container-name-${container.id}`}>Container Name</Label>
            <Input 
              id={`container-name-${container.id}`}
              value={container.name}
              onChange={(e) => onUpdate(container.id!, 'name', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor={`owner-${container.id}`}>Owner</Label>
            <Input 
              id={`owner-${container.id}`}
              value={container.owner}
              onChange={(e) => onUpdate(container.id!, 'owner', e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`status-${container.id}`}>Status</Label>
            <Select 
              value={container.status} 
              onValueChange={(value) => onUpdate(container.id!, 'status', value)}
            >
              <SelectTrigger id={`status-${container.id}`}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor={`location-${container.id}`}>Location</Label>
            <Input 
              id={`location-${container.id}`}
              value={container.location}
              onChange={(e) => onUpdate(container.id!, 'location', e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor={`next-payment-${container.id}`}>Next Payment Due</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !container.nextPaymentDue && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {container.nextPaymentDue ? (
                    format(new Date(container.nextPaymentDue), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={container.nextPaymentDue ? new Date(container.nextPaymentDue) : undefined}
                  onSelect={(date) => onUpdate(container.id!, 'nextPaymentDue', date?.toISOString())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label htmlFor={`current-yield-${container.id}`}>Current Yield (kg)</Label>
            <Input 
              id={`current-yield-${container.id}`}
              type="number"
              value={container.currentYield || 0}
              onChange={(e) => onUpdate(container.id!, 'currentYield', parseFloat(e.target.value))}
            />
          </div>
          
          <div>
            <Label htmlFor={`projected-yield-${container.id}`}>Projected Yield (kg)</Label>
            <Input 
              id={`projected-yield-${container.id}`}
              type="number"
              value={container.projectedYield || 0}
              onChange={(e) => onUpdate(container.id!, 'projectedYield', parseFloat(e.target.value))}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id={`active-switch-${container.id}`}
            checked={container.status === 'active'}
            onCheckedChange={(checked) => 
              onUpdate(container.id!, 'status', checked ? 'active' : 'inactive')
            }
          />
          <Label htmlFor={`active-switch-${container.id}`}>
            Container is {container.status === 'active' ? 'active' : 'inactive'}
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};
