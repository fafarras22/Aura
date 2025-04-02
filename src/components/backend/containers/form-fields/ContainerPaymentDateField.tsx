
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContainerPaymentDateFieldProps {
  id: string;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

export const ContainerPaymentDateField = ({ id, value, onChange }: ContainerPaymentDateFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>Next Payment Due</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(new Date(value), "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => onChange(date?.toISOString())}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
