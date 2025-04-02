
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContainerYieldFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export const ContainerYieldField = ({ id, label, value, onChange }: ContainerYieldFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>{label} (kg)</Label>
      <Input 
        id={id}
        type="number"
        value={value || 0}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
};
