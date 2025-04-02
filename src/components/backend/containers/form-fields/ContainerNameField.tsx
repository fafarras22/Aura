
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContainerNameFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const ContainerNameField = ({ id, value, onChange }: ContainerNameFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>Container Name</Label>
      <Input 
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
