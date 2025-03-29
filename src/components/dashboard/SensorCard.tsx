
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type SensorStatus = 'normal' | 'warning' | 'error';

interface SensorCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: ReactNode;
  status: SensorStatus;
  progress?: number;
  minValue?: number;
  maxValue?: number;
  lastUpdated?: string;
}

export function SensorCard({
  title,
  value,
  unit,
  icon,
  status,
  progress,
  minValue,
  maxValue,
  lastUpdated,
}: SensorCardProps) {
  const statusColors = {
    normal: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  const cardClass = cn(
    "sensor-card",
    status === "warning" && "border-yellow-300 dark:border-yellow-700",
    status === "error" && "border-red-300 dark:border-red-700"
  );

  return (
    <Card className={cardClass}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <Badge variant="outline" className={statusColors[status]}>
          {status === 'normal' ? 'Normal' : status === 'warning' ? 'Warning' : 'Critical'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-xl text-gray-500">{unit}</div>
          <div className="text-akar-green p-2 rounded-full bg-akar-lightgreen/20">{icon}</div>
        </div>
        
        {progress !== undefined && (
          <div className="space-y-1">
            <Progress 
              value={progress} 
              className={cn(
                status === "warning" && "bg-yellow-200 dark:bg-yellow-950",
                status === "error" && "bg-red-200 dark:bg-red-950"
              )}
            />
            {minValue !== undefined && maxValue !== undefined && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>{minValue}</span>
                <span>{maxValue}</span>
              </div>
            )}
          </div>
        )}
        
        {lastUpdated && (
          <div className="mt-4 text-xs text-gray-500">
            Last updated: {lastUpdated}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
