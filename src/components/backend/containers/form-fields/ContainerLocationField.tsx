
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContainerLocationFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const ContainerLocationField = ({ id, value, onChange }: ContainerLocationFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>Location</Label>
      <Input 
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
