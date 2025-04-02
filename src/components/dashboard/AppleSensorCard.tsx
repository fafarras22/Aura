
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type SensorStatus = "normal" | "warning" | "error";

interface AppleSensorCardProps {
  name: string; // Changed from title to name
  value: number;
  unit: string;
  icon: React.ReactNode;
  status: SensorStatus;
  progress: number;
  minValue: number;
  maxValue: number;
  lastUpdated: string;
}

export function AppleSensorCard({
  name, // Changed from title to name
  value,
  unit,
  icon,
  status,
  progress,
  minValue,
  maxValue,
  lastUpdated,
}: AppleSensorCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "normal":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-green-500";
    }
  };

  const getCardClass = () => {
    switch (status) {
      case "normal":
        return "";
      case "warning":
        return "border-yellow-200 dark:border-yellow-900";
      case "error":
        return "border-red-200 dark:border-red-900";
      default:
        return "";
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300",
        getCardClass()
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-2">
              {icon}
            </div>
            <h3 className="font-medium text-sm">{name}</h3>
          </div>
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              getStatusColor()
            )}
          />
        </div>

        <div className="mb-3">
          <div className="flex items-end">
            <span className="text-2xl font-semibold mr-1">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>

        <div className="space-y-1">
          <Progress 
            value={progress} 
            className="h-1.5" 
            indicatorClassName={getStatusColor()}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{minValue}{unit}</span>
            <span>{maxValue}{unit}</span>
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          Last updated: {new Date(lastUpdated).toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
}
