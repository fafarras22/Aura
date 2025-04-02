
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContainerStatusFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export const ContainerStatusField = ({ id, value, onChange }: ContainerStatusFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>Status</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="maintenance">Maintenance</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
