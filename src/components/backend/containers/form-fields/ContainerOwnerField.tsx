
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContainerOwnerFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const ContainerOwnerField = ({ id, value, onChange }: ContainerOwnerFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>Owner</Label>
      <Input 
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
