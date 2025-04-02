
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ContainerActiveToggleFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const ContainerActiveToggleField = ({ id, value, onChange }: ContainerActiveToggleFieldProps) => {
  const isActive = value === 'active';
  
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        checked={isActive}
        onCheckedChange={(checked) => 
          onChange(checked ? 'active' : 'inactive')
        }
      />
      <Label htmlFor={id}>
        Container is {isActive ? 'active' : 'inactive'}
      </Label>
    </div>
  );
};
